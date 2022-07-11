BEGIN;

CREATE TABLE "referencetest" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "valorisation" INT,
    "main_category" INT REFERENCES "category"("id")
);

COMMIT;
