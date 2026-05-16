-- Migration 001: Enable required extensions
-- Run this first in Supabase SQL Editor

-- Vector similarity search (for embeddings)
create extension if not exists vector;

-- UUID generation
create extension if not exists "uuid-ossp";

-- Full-text search improvements
create extension if not exists pg_trgm;
