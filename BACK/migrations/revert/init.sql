-- Revert ludautisme:init from pg

BEGIN;

DROP TABLE "test";

COMMIT;
