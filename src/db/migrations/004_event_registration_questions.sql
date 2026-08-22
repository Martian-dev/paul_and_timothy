ALTER TABLE event_registrations
  ADD COLUMN IF NOT EXISTS additional_questions JSONB NOT NULL DEFAULT '{}'::jsonb;
