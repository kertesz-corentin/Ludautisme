BEGIN;

INSERT INTO "booking" ("delivered", "closed", "nb_prolongation", "id_permanency", "id_user") VALUES
( false, false, 0, 3, 6),
( true, false, 0, 3, 1),
( true, true, 0, 3, 5),
( true, false, 3, 4, 4),
( false, false, 0, 4, 1),
( false, false, 0, 1, 1),
( false, false, 0, 2, 1);

COMMIT;