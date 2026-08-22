ALTER TABLE assessment_results
  ADD COLUMN IF NOT EXISTS clerk_user_id TEXT;

UPDATE assessment_results AS results
SET clerk_user_id = users.clerk_user_id
FROM app_users AS users
WHERE results.user_id = users.id
  AND results.clerk_user_id IS NULL;

ALTER TABLE assessment_results
  ALTER COLUMN clerk_user_id SET NOT NULL;

CREATE INDEX IF NOT EXISTS assessment_results_clerk_user_id_idx
  ON assessment_results(clerk_user_id);
