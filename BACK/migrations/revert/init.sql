-- Revert ludautisme:init from pg

BEGIN;

DROP VIEW IF EXISTS "full_perm" CASCADE;

DROP TABLE IF EXISTS "article_to_booking" CASCADE;

DROP TABLE IF EXISTS "article" CASCADE;

DROP TABLE IF EXISTS "reference_to_category" CASCADE;

DROP TABLE IF EXISTS "reference_to_image" CASCADE;

DROP TABLE IF EXISTS "image" CASCADE;

DROP TABLE IF EXISTS "reference" CASCADE;

DROP TABLE IF EXISTS "category" CASCADE;

DROP TABLE IF EXISTS "booking" CASCADE;

DROP TABLE IF EXISTS "permanency" CASCADE;

DROP TABLE IF EXISTS "temptoken" CASCADE;

DROP TABLE IF EXISTS "user" CASCADE;

DROP TABLE IF EXISTS "role" CASCADE;


COMMIT;
