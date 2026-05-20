-- Application table: posts
-- Uses uuid_generate_v7() which requires pg_uuidv7 extension
-- Enable extension at database level: CREATE EXTENSION IF NOT EXISTS pg_uuidv7;

CREATE TABLE IF NOT EXISTS post (
  id         UUID PRIMARY KEY DEFAULT uuid_generate_v7(),
  title      VARCHAR(255) NOT NULL,
  content    TEXT NOT NULL DEFAULT '',
  author_id  UUID NOT NULL REFERENCES "user"(id) ON DELETE CASCADE,
  published  BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_post_author_id ON post(author_id);
CREATE INDEX IF NOT EXISTS idx_post_published ON post(published);
