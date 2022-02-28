-- Deploy ludautisme:seeding to pg

BEGIN;

INSERT INTO "role" ("name") VALUES
('user'),
('admin');

INSERT INTO "user" ("email", "member_number", "phone", "first_name", "last_name", "adress_number", "adress_street", "adress_zipcode", "adress_city", "password", "id_role") VALUES
('corentin@grr.la', 121, '0761916300', 'corentin', 'kertesz', 4, 'rue dieudonné costes', 29200, 'brest', 'productowner', 2),
('arnaud@grr.la', 57, '0648975213', 'arnaud', 'peybernes', 17, 'rue des jonquilles', 14700, 'pau', 'scrummaster', 2),
('thibault@grr.la', 21, '0749831522', 'thibault', 'lallement', 85, 'boulevard de la choucroute', 65410, 'castre', 'referent', 2 ),
('romain@grr.la', 94, '0647855463', 'romain', 'perdriat', 22, 'impasse des matelots', 29200, 'brest', 'gitmaster', 2),
('xavier@grr.la', 76, '0749881254', 'xavier', 'leplatre', 45, 'rue du verdon', 45164, 'bayeux', 'leadfront', 2),
('stephanie.poulesquen@orange.fr', 107, '0685164926', 'stéphanie', 'severe', 6, 'residence goas huella', 29460, 'irvillac', 'test', 1),
('hledizes@gmail.com', 108,'0663690249', 'héléne', 'le dizes', 2325, 'route de kergoat', 29630, 'plougasnou', 'abcdef', 1);

INSERT INTO "permanency" ("perm_date") VALUES
('2022-01-04'),
('2022-02-05'),
('2022-03-10'),
('2022-04-06');

INSERT INTO "booking" ("date_start", "delivered", "max_return_date", "closed", "nb_prolongation", "id_permanency", "id_user") VALUES
('2022-02-01', false, null, false, 0, 2, 6),
('2022-02-01', true, '2022-05-05', false, 0, 2, 7),
('2022-02-02', true, '2022-05-05', true, 0, 2, 5),
('2021-10-10', true, '2022-01-10', false, 3, 1, 4),
('2021-10-10', false, null, false, 0, 1, 1);

INSERT INTO "category" ("name", "description", "main") VALUES
('jeux', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices mollis libero eget molestie.', true),
('apprentissage', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices mollis libero eget molestie.', true),
('autonomie', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices mollis libero eget molestie.', true),
('media', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices mollis libero eget molestie.', true),
('livre', null, false),
('bois', null, false);

INSERT INTO "reference" ("name", "valorisation", "id_category") VALUES
('animaux à lacer', 10, 1),
('declic mai-juin 2012', 5, 4),
('le coffret écriture lecture', 30, 2),
('ma journée', 12, 3);

INSERT INTO "image" ("url", "alternative_text") VALUES
('https://static.alipson.fr/vilac.4/vilac-jeu-de-lacage--mes-animaux-a-lacer.134448-1.600.jpg', 'animaux a lacer'),
('https://bb.ca/catalogue_images/580x358/2209708_1.png', 'animaux à lacer'),
('http://www.lepaysdesmerveilles.com/wp-content/uploads/2016/09/coffret-ecriture-lecture-montessori-grapheme-rugueux-balthazar.jpg', 'coffret lecture ecriture'),
('https://img.scoop.it/CtEd9UP0K3g6EJKiCAkmPoXXXL4j3HpexhjNOf_P3YmryPKwJ94QGRtDb3Sbc6KY', 'ma journée');

INSERT INTO "reference_to_image" ("id_ref", "id_image") VALUES
(1, 1),
(1, 2),
(3, 3),
(4, 4);

INSERT INTO "reference_to_category" ("id_ref", "id_category") VALUES
(2, 5),
(3, 6),
(1, 6);

INSERT INTO "article" ("ref_number", "origin", "date_buy", "available", "id_booking", "id_ref") VALUES
(19, 'achat fnac', '2019-06-14', false, 2, 4),
(27, 'don adherent', '2020-04-15', true, null, 1),
(215, 'tombé du ciel', '2021-12-24', false, null, 4),
(418, 'achat leclerc', '2022-07-24', false, 2, 3),
(314, 'don asso', '2017-01-06', true, null, 4);

COMMIT;
