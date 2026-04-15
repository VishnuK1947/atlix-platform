# Atlix MVP — Product Requirements Document

**Version:** 0.1 (First Pass)
**Last Updated:** March 30, 2026
**Authors:** Vishnu, David, Margaret, Kirtisub, Eric

---

## 1. Overview

Atlix is a Bloomberg Terminal for digital narratives. The MVP will demonstrate real-time narrative intelligence by scraping public discourse, clustering emerging topics, analyzing sentiment, and surfacing structured insights through an interactive dashboard — starting with a single metro area (Los Angeles).

**Core thesis:** Cultural narratives behave like markets — they can be measured, tracked, compared, and forecasted in real time. No existing tool does this for policymakers and institutional stakeholders.

---

## 2. Target Users (MVP)

**Primary:** Policymakers and government staff (city/state level) who need to understand what constituents care about *right now* without waiting for polling data or consulting reports.

**Secondary:** NGO and think tank analysts who monitor public discourse around specific issues (immigration, housing, climate, etc.).

**Validation contacts:** Former Louisiana state rep (via Eric), USC professor / former Biden deputy chief (via Eric), former city council member (via Kirtisub).

---

## 3. Problem Statement

Policymakers and institutional stakeholders lack real-time visibility into how narratives form, cluster, intensify, and spread across digital platforms. Existing tools are either built for marketers (Brandwatch, Meltwater), deliver static consulting reports on 6-figure retainers, or require manual media monitoring. There is no structured, real-time system that treats public discourse as measurable signal — creating a critical blind spot for people who need to act on public sentiment before it becomes crisis.

---

## 4. MVP Scope

### 4.1 Geographic Focus
- **LA metro area only.** Prove the system works at city scale before expanding.
- Geographic filtering by neighborhood/district where data permits.

### 4.2 Data Sources (Priority Order)
1. **Reddit** — r/LosAngeles, r/California, local subreddits. Rich discussion threads, easy API access.
2. **News RSS/APIs** — LA Times, local outlets, AP/Reuters filtered to LA. Establishes "institutional narrative" baseline.
3. **X (Twitter/X API)** — Geo-filtered posts and trending topics. Good for real-time spikes.
4. **Google Trends** — Regional interest data as a supplementary signal.

> **Out of scope for MVP:** TikTok, Instagram, Facebook Groups, YouTube (harder to scrape, higher cost, regulatory risk). Add in v2.

### 4.3 Core Features

#### A. Live Topic Detection & Clustering
- Ingest data from sources above on a recurring schedule (target: every 15–30 min for social, hourly for news).
- Use LLM-based clustering to group posts/articles into coherent **narrative threads** (not just keyword matching).
- Surface the **top N active narratives** for the region, ranked by volume and velocity.
- Each narrative gets a card showing: title/summary, volume (post count), velocity (rate of change), top sources, and sample posts.

#### B. Sentiment & Emotion Analysis
- Per-narrative sentiment scoring: positive / negative / neutral breakdown.
- Emotion tagging where signal is strong: fear, anger, hope, frustration, humor.
- Week-over-week sentiment shift indicators.

#### C. Dashboard UI
- **Card-based layout** — each narrative is a card, similar to Perplexity's answer cards. Clean, scannable.
- **Trend view** — time-series charts showing narrative volume over the past 7–30 days.
- **Filters** — by topic category (housing, crime, transit, immigration, etc.), time range, source platform, sentiment polarity.
- **Source attribution** — every insight links back to original posts/articles. Transparency is a core product value.

#### D. Chat / Query Interface
- Natural language query bar: *"What are people in LA saying about the new metro line?"*
- Returns a structured answer with citations pulled from ingested data (RAG over the narrative database).
- This is the "killer demo feature" — makes the product feel magical in a pitch.

### 4.4 Explicitly Out of Scope (MVP)
- Polarization index / cross-community comparison (v2)
- Demographic inference or segmentation
- Multi-region or international coverage
- Predictive forecasting ("this narrative will go mainstream in X days")
- Tiered SaaS pricing / billing system
- Mobile app
- User accounts and auth (single-tenant demo is fine for MVP)

---

## 5. Technical Architecture (High Level)

### 5.1 Data Pipeline (On-Demand)

All scraping and analysis is triggered by user queries — no background workers or scheduled jobs.

```
[User Query]  ←  Chat interface or dashboard search
        │
        ▼
[API Layer]  ←  FastAPI
        │
        ▼
[Live Scrapers / API Clients]  ←  Reddit, News, X, Google Trends
        │
        ▼
[Processing (in request)]
   ├── Deduplication
   ├── Entity extraction (locations, people, orgs)
   ├── Embedding generation (for clustering)
   ├── Sentiment / emotion classification
   └── Narrative clustering (embedding similarity + LLM labeling)
        │
        ▼
[Cache to Supabase]  ←  Store results for repeat queries / historical comparison
        │
        ▼
[Response]  ←  Structured cards + citations back to frontend
```

Results are cached in Supabase so repeated or similar queries can pull from stored data instead of re-scraping. Over time this passively builds a historical dataset as users interact with the system.

### 5.2 Key Technical Decisions

| Decision | Recommendation | Rationale |
|---|---|---|
| **Language** | Python (backend/pipeline), TypeScript (frontend) | Team familiarity, ecosystem for NLP/ML |
| **LLM Provider** | Anthropic (Claude API) | Strong at classification, summarization, clustering labels. Use Haiku for high-volume classification, Sonnet for summarization and chat. |
| **Embeddings** | Voyage AI or OpenAI `text-embedding-3-small` | Cost-efficient, good clustering performance |
| **Database** | Supabase (Postgres + pgvector) | Managed Postgres with pgvector built-in, plus free auth, REST API, and dashboard. One service for structured data + vector search. |
| **Hosting** | Railway or Render (MVP) | Fast deploy, free/cheap tiers, no DevOps overhead |
| **Frontend** | Next.js + Tailwind + Recharts | Fast to build, good charting, clean UI |

### 5.3 Narrative Clustering Approach
1. Generate embeddings for each ingested post/article.
2. Run incremental clustering (e.g., HDBSCAN or agglomerative clustering) on rolling windows (24h, 7d).
3. For each cluster, use an LLM call to generate a human-readable narrative label and summary.
4. Track clusters over time — merge/split as narratives evolve.
5. Store cluster metadata: creation time, peak time, volume trajectory, sentiment arc.

### 5.4 Chat / RAG Pipeline
1. User query → embed with same model.
2. Retrieve top-k relevant narrative clusters + underlying posts via vector similarity.
3. Feed retrieved context into Claude Sonnet with a structured prompt.
4. Return answer with inline source citations.

---

## 6. Data & Ethical Considerations

- **Only public data.** No private messages, no login-walled content, no scraping that violates ToS.
- **Source attribution is mandatory.** Every data point traces back to its origin. Users should be able to verify claims.
- **No demographic inference.** MVP does not attempt to guess race, age, income, etc. from posts.
- **No manipulation tooling.** The platform is read-only intelligence. It does not generate counter-narratives, astroturf content, or influence operations. This is a hard product boundary.
- **Bias documentation.** Acknowledge in the UI that data skews toward platforms ingested (Reddit skews younger/male, X skews political). Don't present platform samples as ground truth for "what people think."

---

## 7. MVP Success Criteria

| Metric | Target |
|---|---|
| Narratives detected per query | 5–15 distinct clusters |
| End-to-end query response time | < 15 seconds |
| Sentiment accuracy (spot-check) | > 80% agreement with manual review |
| Demo readiness | Compelling 5-minute live demo for GSSC judges |

---

## 8. Milestones

| Phase | Deliverable | Owner |
|---|---|---|
| **Week 1** | Supabase schema + Reddit & News API scraper functions | Vishnu, David |
| **Week 1** | Embedding generation + clustering prototype (on single query) | Vishnu, David |
| **Week 2** | Sentiment/emotion classification pipeline | Vishnu, David |
| **Week 2** | Dashboard UI: card layout, trend charts, filters | Margaret (design), Jef (implementation) |
| **Week 3** | Chat/query interface (RAG) wired end-to-end | Vishnu, David |
| **Week 3** | UI polish, source attribution, loading states | Margaret, Jef |
| **Week 4** | End-to-end integration, bug fixes, demo prep | All |
| **Week 4** | Pitch deck finalization | Eric, Kirtisub |

---

## 9. Open Questions

1. **Reddit API rate limits** — Free tier gives 100 requests/min. Enough for MVP? May need to apply for higher tier.
2. **X API access** — Basic tier is $100/mo for 10k posts. Worth it for MVP or defer to v2?
3. **Clustering granularity** — How do we define "one narrative" vs. sub-narratives? Need to experiment and calibrate.
4. **Customer demo format** — Are we showing a live product or a guided walkthrough? Affects polish priorities.
5. **International expansion sequencing** — Jakarta, Seoul, and India mentioned as future markets. Which first?

---

## 10. Future Roadmap (Post-MVP)

- **Polarization index:** Measure how differently two communities talk about the same topic.
- **Cross-platform spread tracking:** Detect when a narrative jumps from Reddit → X → mainstream news.
- **Multi-region support:** Expand beyond LA to other US metros, then international.
- **Tiered SaaS pricing:** Free (weekly digest) → Pro (live dashboard) → Enterprise (API + custom dashboards).
- **Background ingestion pipeline:** Scheduled scraping to build historical data, enable proactive narrative detection and alerting without user-initiated queries.
- **TikTok / YouTube ingestion:** Video transcript analysis for narrative detection.
- **Alerting system:** Configurable spike detection with email/Slack/webhook notifications.
