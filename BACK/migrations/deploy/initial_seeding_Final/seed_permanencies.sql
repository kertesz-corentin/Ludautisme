BEGIN;

INSERT INTO "permanency" ("perm_date","active") VALUES
('2022-01-04', false),
('2022-02-05', false),
('2022-03-10', true),
('infinity', false),
('infinity', false);

COMMIT;