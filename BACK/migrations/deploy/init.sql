-- Deploy ludautisme:init to pg

BEGIN;

CREATE TABLE "role" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL
);
CREATE TABLE "user" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "email" TEXT NOT NULL UNIQUE,
    "member_number" INT NOT NULL UNIQUE,
    "phone" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "adress_number" INT NOT NULL,
    "adress_street" TEXT NOT NULL,
    "adress_zipcode" INT NOT NULL,
    "adress_city" TEXT NOT NULL,
    "password" TEXT,
    "cotisation_ok" BOOLEAN DEFAULT false,
    "cotisation_expiration" DATE,
    "caution_ok" BOOLEAN DEFAULT false,
    "caution_expiration" DATE,
    "archived" BOOLEAN DEFAULT false,
    "id_role" INT REFERENCES "role"("id"),
    "created_at" TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE "permanency" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "perm_date" DATE,
    "published" BOOLEAN DEFAULT false
);

CREATE TABLE "booking" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "date_start" DATE,
    "delivered" BOOLEAN DEFAULT false,
    "max_return_date" DATE,
    "closed" BOOLEAN DEFAULT false,
    "nb_prolongation" INTEGER DEFAULT 0,
    "id_permanency" INT REFERENCES "permanency"("id"),
    "id_user" INT REFERENCES "user"("id")
);

CREATE TABLE "category" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "main" BOOLEAN DEFAULT false
);

CREATE TABLE "reference" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL UNIQUE,
    "description" TEXT,
    "valorisation" INT,
    "id_category" INT REFERENCES "category"("id")
);

CREATE TABLE "image" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "url" TEXT NOT NULL,
    "alternative_text" TEXT
);

CREATE TABLE "reference_to_image" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "id_ref" INT REFERENCES "reference"("id"),
    "id_image" INT REFERENCES "image"("id")
);

CREATE TABLE "reference_to_category" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "id_ref" INT REFERENCES "reference"("id"),
    "id_category" INT REFERENCES "category"("id")
);

CREATE TABLE "article" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "ref_number" INT NOT NULL UNIQUE,
    "origin" TEXT,
    "date_buy" DATE,
    "available" BOOLEAN DEFAULT true,
    "archived" BOOLEAN DEFAULT false,
    "id_booking" INT REFERENCES "booking"("id"),
    "id_ref" INT REFERENCES "reference"("id") NOT NULL,
    "created_at" TIMESTAMPTZ DEFAULT NOW()
);

COMMIT;
