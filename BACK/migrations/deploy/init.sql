-- Deploy ludautisme:init to pg

BEGIN;

CREATE TABLE "test" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY
);

COMMIT;
