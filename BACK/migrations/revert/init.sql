-- Revert ludautisme:init from pg

BEGIN;

DROP TABLE "article";

DROP TABLE "reference_to_category";

DROP TABLE "reference_to_image";

DROP TABLE "image";

DROP TABLE "reference";

DROP TABLE "category";

DROP TABLE "booking";

DROP TABLE "permanency";

DROP TABLE "user";

DROP TABLE "role";

COMMIT;
