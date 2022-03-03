-- Revert ludautisme:init from pg

BEGIN;

DROP TABLE IF EXISTS "article";

DROP TABLE IF EXISTS "reference_to_category";

DROP TABLE IF EXISTS "reference_to_image";

DROP TABLE IF EXISTS "image";

DROP TABLE IF EXISTS "reference";

DROP TABLE IF EXISTS "category";

DROP TABLE IF EXISTS "booking";

DROP TABLE IF EXISTS "permanency";

DROP TABLE IF EXISTS "temptoken";

DROP TABLE IF EXISTS "user";

DROP TABLE IF EXISTS "role";

COMMIT;
