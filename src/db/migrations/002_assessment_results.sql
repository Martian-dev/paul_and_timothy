CREATE TABLE IF NOT EXISTS assessment_results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES app_users(id) ON DELETE CASCADE,
  assessment_type TEXT NOT NULL CHECK (assessment_type IN ('ministry_calling', 'spiritual_gifts', 'apest')),
  answers JSONB NOT NULL,
  result JSONB NOT NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS assessment_results_user_id_idx ON assessment_results(user_id);
CREATE INDEX IF NOT EXISTS assessment_results_type_idx ON assessment_results(assessment_type);
