-- Deploy ludautisme:seeding to pg

BEGIN;

INSERT INTO "role" ("name") VALUES
('user'),
('admin');

COMMIT;