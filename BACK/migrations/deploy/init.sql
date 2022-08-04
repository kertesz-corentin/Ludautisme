BEGIN;

CREATE TABLE "role" (
    "id" SERIAL UNIQUE,
    "name" TEXT NOT NULL
);
CREATE TABLE "user" (
    "id" SERIAL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "member_number" INT NOT NULL UNIQUE,
    "phone" TEXT,
    "first_name" TEXT,
    "last_name" TEXT,
    "adress_number" TEXT NOT NULL,
    "adress_street" TEXT NOT NULL,
    "adress_zipcode" INT NOT NULL,
    "adress_city" TEXT NOT NULL,
    "password" TEXT ,
    "cotisation_status" BOOLEAN DEFAULT false,
    "cotisation_expiration" DATE,
    "caution_status" BOOLEAN DEFAULT false,
    "caution_expiration" DATE,
    "archived" BOOLEAN DEFAULT false,
    "id_role" INT REFERENCES "role"("id"),
    "created_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "permanency" (
    "id" SERIAL UNIQUE,
    "perm_date" DATE,
    "active" BOOLEAN DEFAULT false,
    "published" BOOLEAN DEFAULT false
);



CREATE TABLE "category" (
    "id" SERIAL UNIQUE,
    "name" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "main" BOOLEAN DEFAULT false
);

CREATE TABLE "reference" (
    "id" SERIAL UNIQUE,
    "name" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "valorisation" INT,
    "main_category" INT REFERENCES "category"("id")
);

CREATE TABLE "image" (
    "id" SERIAL UNIQUE,
    "url" TEXT NOT NULL,
    "title" TEXT,
    "alternative_text" TEXT,
    "main" BOOLEAN
);

CREATE TABLE "reference_to_image" (
    "id" SERIAL UNIQUE,
    "id_ref" INT REFERENCES "reference"("id") NOT NULL,
    "id_image" INT NOT NULL REFERENCES "image"("id")  ON DELETE CASCADE
);

CREATE TABLE "reference_to_category" (
    "id" SERIAL UNIQUE,
    "id_ref" INT REFERENCES "reference"("id"),
    "id_category" INT REFERENCES "category"("id")
);

CREATE TABLE "article" (
    "id" SERIAL UNIQUE,
    "number" INT NOT NULL UNIQUE,
    "origin" TEXT,
    "date_buy" DATE,
    "available" BOOLEAN DEFAULT true,
    "archived" BOOLEAN DEFAULT false,
    "id_ref" INT REFERENCES "reference"("id") NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT NOW()
);
CREATE TABLE "temptoken"(
    "id" SERIAL UNIQUE,
    "email_user" TEXT REFERENCES "user"("email"),
    "temptoken" TEXT NOT NULL
);

CREATE TABLE "reference_to_cart"(
    "id" SERIAL UNIQUE,
    "id_user" INT REFERENCES "user"("id"),
    "id_ref" INT REFERENCES "reference"("id")
);

CREATE TABLE "booking" (
    "id" SERIAL UNIQUE,
    "delivered" BOOLEAN DEFAULT false,
    "closed" BOOLEAN DEFAULT false,
    "nb_prolongation" INTEGER DEFAULT 0,
    "id_permanency" INT REFERENCES "permanency"("id"),
    "id_user" INT REFERENCES "user"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "article_to_booking"(
    "id" SERIAL UNIQUE,
    "returned" BOOLEAN DEFAULT true,
    "id_article" INT REFERENCES "article"("id"),
    "id_booking" INT REFERENCES "booking"("id") ON DELETE CASCADE
);

CREATE TABLE "favorite_user_to_reference"(
    "id" SERIAL UNIQUE,
    "id_user" INT REFERENCES "user"("id"),
    "id_ref" INT REFERENCES "reference"("id"),
    UNIQUE ("id_user","id_ref")
);








DROP VIEW IF EXISTS "full_perm";
CREATE OR REPLACE VIEW "full_perm" AS
SELECT * ,
    LEAD(id,1) OVER(ORDER BY id) AS next_id,
    LEAD(perm_date,1) OVER(ORDER BY perm_date) AS next_date
    FROM "permanency";

COMMIT;
