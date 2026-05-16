-- Migration 002: Core schema
-- Run this second in Supabase SQL Editor

-- ─────────────────────────────────────────
-- raw_posts
-- Stores every ingested post/article before processing
-- ─────────────────────────────────────────
create table if not exists raw_posts (
  id              uuid primary key default uuid_generate_v4(),
  source          text not null check (source in ('reddit', 'x', 'news', 'google_trends')),
  external_id     text not null,                        -- platform-native ID (reddit post ID, tweet ID, etc.)
  author          text,
  content         text not null,
  url             text,
  location_name   text,                                 -- extracted location string e.g. "Echo Park, Los Angeles"
  lat             double precision,
  lng             double precision,
  embedding       vector(1536),                         -- text-embedding-3-small / voyage-3 compatible
  metadata        jsonb default '{}'::jsonb,            -- platform-specific fields (upvotes, subreddit, etc.)
  ingested_at     timestamptz not null default now(),
  created_at      timestamptz not null default now(),   -- original post timestamp

  -- prevent duplicate ingestion
  unique (source, external_id)
);

-- ANN index for embedding similarity search
create index if not exists raw_posts_embedding_idx
  on raw_posts using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- Filter by source + time efficiently
create index if not exists raw_posts_source_created_idx
  on raw_posts (source, created_at desc);

-- Location-based queries
create index if not exists raw_posts_location_idx
  on raw_posts (lat, lng)
  where lat is not null and lng is not null;


-- ─────────────────────────────────────────
-- narratives
-- LLM-labeled clusters of related posts
-- ─────────────────────────────────────────
create table if not exists narratives (
  id                  uuid primary key default uuid_generate_v4(),
  label               text not null,                    -- e.g. "LAPD Overtime Budget Scrutiny"
  summary             text not null,                    -- 2-3 sentence LLM summary
  category            text,                             -- e.g. "Public Safety", "Housing", "Transit"
  centroid_embedding  vector(1536),                     -- mean embedding of cluster, used for semantic search
  volume              integer not null default 0,       -- total post count
  velocity_pct        double precision default 0,       -- % change vs previous period
  velocity_dir        text check (velocity_dir in ('up', 'down', 'flat')) default 'flat',
  sentiment           jsonb not null default '{"positive": 0, "neutral": 0, "negative": 0}'::jsonb,
  emotions            text[] default '{}',              -- e.g. ['anger', 'frustration', 'hope']
  sources             text[] default '{}',              -- e.g. ['reddit', 'news']
  is_active           boolean not null default true,
  first_seen_at       timestamptz not null default now(),
  peak_at             timestamptz,
  last_updated_at     timestamptz not null default now()
);

-- ANN index for RAG retrieval (find narratives similar to a user query)
create index if not exists narratives_embedding_idx
  on narratives using ivfflat (centroid_embedding vector_cosine_ops)
  with (lists = 50);

-- Dashboard queries: active narratives ordered by volume
create index if not exists narratives_active_volume_idx
  on narratives (is_active, volume desc)
  where is_active = true;

-- Category filtering
create index if not exists narratives_category_idx
  on narratives (category)
  where is_active = true;


-- ─────────────────────────────────────────
-- narrative_posts
-- Many-to-many: which posts belong to which narrative
-- ─────────────────────────────────────────
create table if not exists narrative_posts (
  narrative_id  uuid not null references narratives (id) on delete cascade,
  post_id       uuid not null references raw_posts (id) on delete cascade,
  relevance     double precision default 1.0,           -- cosine similarity to cluster centroid
  added_at      timestamptz not null default now(),

  primary key (narrative_id, post_id)
);

create index if not exists narrative_posts_post_idx
  on narrative_posts (post_id);


-- ─────────────────────────────────────────
-- narrative_snapshots
-- Time-series history for trend charts
-- ─────────────────────────────────────────
create table if not exists narrative_snapshots (
  id            uuid primary key default uuid_generate_v4(),
  narrative_id  uuid not null references narratives (id) on delete cascade,
  snapshot_at   timestamptz not null default now(),
  volume        integer not null default 0,
  sentiment     jsonb not null default '{"positive": 0, "neutral": 0, "negative": 0}'::jsonb
);

create index if not exists narrative_snapshots_narrative_time_idx
  on narrative_snapshots (narrative_id, snapshot_at desc);


-- ─────────────────────────────────────────
-- query_cache
-- Memoizes processed pipeline results to avoid re-scraping
-- ─────────────────────────────────────────
create table if not exists query_cache (
  query_hash    text primary key,                       -- SHA-256 of normalized query string
  query_text    text not null,
  result        jsonb not null,
  created_at    timestamptz not null default now(),
  ttl_seconds   integer not null default 900            -- 15 min default
);

-- Expired cache cleanup index
create index if not exists query_cache_created_idx
  on query_cache (created_at);


-- ─────────────────────────────────────────
-- Auto-update last_updated_at on narratives
-- ─────────────────────────────────────────
create or replace function update_narrative_timestamp()
returns trigger as $$
begin
  new.last_updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger narratives_updated_at
  before update on narratives
  for each row execute function update_narrative_timestamp();


-- ─────────────────────────────────────────
-- Helper: match narratives by embedding similarity
-- Used by the RAG chat pipeline
-- ─────────────────────────────────────────
create or replace function match_narratives(
  query_embedding vector(1536),
  match_threshold double precision default 0.5,
  match_count     integer default 5
)
returns table (
  id                  uuid,
  label               text,
  summary             text,
  category            text,
  volume              integer,
  sentiment           jsonb,
  emotions            text[],
  sources             text[],
  similarity          double precision
)
language sql stable
as $$
  select
    n.id,
    n.label,
    n.summary,
    n.category,
    n.volume,
    n.sentiment,
    n.emotions,
    n.sources,
    1 - (n.centroid_embedding <=> query_embedding) as similarity
  from narratives n
  where
    n.is_active = true
    and n.centroid_embedding is not null
    and 1 - (n.centroid_embedding <=> query_embedding) > match_threshold
  order by n.centroid_embedding <=> query_embedding
  limit match_count;
$$;


-- ─────────────────────────────────────────
-- Helper: get sample posts for a narrative
-- Returns top posts by engagement for source attribution
-- ─────────────────────────────────────────
create or replace function get_narrative_posts(
  p_narrative_id  uuid,
  p_limit         integer default 5
)
returns table (
  id          uuid,
  source      text,
  author      text,
  content     text,
  url         text,
  metadata    jsonb,
  created_at  timestamptz
)
language sql stable
as $$
  select
    rp.id,
    rp.source,
    rp.author,
    rp.content,
    rp.url,
    rp.metadata,
    rp.created_at
  from raw_posts rp
  join narrative_posts np on np.post_id = rp.id
  where np.narrative_id = p_narrative_id
  order by (rp.metadata->>'engagement')::int desc nulls last, rp.created_at desc
  limit p_limit;
$$;


-- ─────────────────────────────────────────
-- RLS: disabled for single-tenant MVP
-- Re-enable and add policies before multi-user launch
-- ─────────────────────────────────────────
alter table raw_posts           disable row level security;
alter table narratives          disable row level security;
alter table narrative_posts     disable row level security;
alter table narrative_snapshots disable row level security;
alter table query_cache         disable row level security;
