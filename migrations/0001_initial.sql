CREATE TABLE IF NOT EXISTS city_cache (
  query TEXT PRIMARY KEY,
  response_html TEXT NOT NULL,
  status_code INTEGER NOT NULL DEFAULT 200,
  expires_at INTEGER NOT NULL,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_city_cache_expires_at
  ON city_cache (expires_at);

CREATE TABLE IF NOT EXISTS api_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  route TEXT NOT NULL,
  status_code INTEGER NOT NULL,
  error_message TEXT,
  created_at INTEGER NOT NULL DEFAULT (unixepoch())
);

CREATE INDEX IF NOT EXISTS idx_api_events_created_at
  ON api_events (created_at);