BEGIN;

INSERT INTO "article_to_booking"("id_booking","id_article") VALUES
(1,1),
(1,2),
(1,3),
(5,4),
(5,5),
(2,6),
(3,7),
(6,10),
(6,9),
(7,10);

COMMIT;