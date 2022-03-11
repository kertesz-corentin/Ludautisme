-- Deploy ludautisme:seeding to pg

BEGIN;

INSERT INTO "role" ("name") VALUES
('user'),
('admin');

INSERT INTO "user" ("email", "member_number", "phone", "first_name", "last_name", "adress_number", "adress_street", "adress_zipcode", "adress_city", "password", "id_role") VALUES
('corentin@grr.la', 121, '0761916300', 'corentin', 'kertesz', 4, 'rue dieudonné costes', 29200, 'brest', '$2b$10$C/Wplc9TYxtuHP.mM8Ym.ugo7vR5OnHW2VFvLQK4MEQEQZXNVAI8m', 2),
('arnaud@grr.la', 57, '0648975213', 'arnaud', 'peybernes', 17, 'rue des jonquilles', 14700, 'pau', '$2b$10$tQ1j.ZsG7JwAuoIiqok44.X31/HvrQ8tsGq8t7QYkhJ0EJWvrxeFi', 2),
('thibault@grr.la', 21, '0749831522', 'thibault', 'lallement', 85, 'boulevard de la choucroute', 65410, 'castre', '$2b$10$Q/65PAx2Ciz6UY8qbGv89.u2mUIrarvxZ/jFoeIndRJCaqD7A0LuK', 2 ),
('romain@grr.la', 94, '0647855463', 'romain', 'perdriat', 22, 'impasse des matelots', 29200, 'brest', '$2b$10$zPmeea90s/s8deR.SymiZ.fWNX/cfZscTLdiGFuiD.3YwlM4ZrH16', 2),
('xavier@grr.la', 76, '0749881254', 'xavier', 'leplatre', 45, 'rue du verdon', 45164, 'bayeux', '$2b$10$dvFGQv3mRlEJw6ckT4q2q.gU.VvkfnkeV2Jp9CffFWRWBnaI3sQXi', 2),
('user@grr.la', 107, '0685164926', 'stéphanie', 'severe', 6, 'residence goas huella', 29460, 'irvillac', '$2b$10$H5eSsaHtOYnSnt5CIRMCcOEDwLaSO9HHeWmsZSkYYYdISw4GFMrF6', 1),
('hledizes@gmail.com', 108,'0663690249', 'héléne', 'le dizes', 2325, 'route de kergoat', 29630, 'plougasnou', 'abcdef', 1);

INSERT INTO "permanency" ("perm_date","active") VALUES
('2022-01-04', false),
('2022-02-05', false),
('2022-03-10', true),
('2022-04-06', false);

INSERT INTO "booking" ( "delivered", "closed", "nb_prolongation", "id_permanency", "id_user") VALUES
( false, false, 0, 3, 6),
( true, false, 0, 3, 1),
( true, true, 0, 3, 5),
( true, false, 3, 4, 4),
( false, false, 0, 4, 1),
( false, false, 0, 1, 1),
( false, false, 0, 2, 1);

INSERT INTO "category" ("name", "description", "main") VALUES
('jeux', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices mollis libero eget molestie.', true),
('apprentissage', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices mollis libero eget molestie.', true),
('autonomie', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices mollis libero eget molestie.', true),
('media', 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec ultrices mollis libero eget molestie.', true),
('livre', null, false),
('bois', null, false);

INSERT INTO "reference" ("name", "valorisation", "main_category") VALUES
('animaux à lacer', 10, 1),
('declic mai-juin 2012', 5, 4),
('le coffret écriture lecture', 30, 2),
('ma journée', 12, 3),
('Apprendre a coder avec OClock', 6000, 2);

INSERT INTO "image" ("url","title", "alternative_text","main") VALUES
('https://static.alipson.fr/vilac.4/vilac-jeu-de-lacage--mes-animaux-a-lacer.134448-1.600.jpg', 'animaux a lacer', 'jouet représantant des animaux a lacer', true),
('https://bb.ca/catalogue_images/580x358/2209708_1.png', 'animaux à lacer', 'un autre jeux avec des animaux a lacer', false),
('http://www.lepaysdesmerveilles.com/wp-content/uploads/2016/09/coffret-ecriture-lecture-montessori-grapheme-rugueux-balthazar.jpg', 'coffret lecture ecriture', 'un coffret pour apprendre a écrire', false),
('https://img.scoop.it/CtEd9UP0K3g6EJKiCAkmPoXXXL4j3HpexhjNOf_P3YmryPKwJ94QGRtDb3Sbc6KY', 'ma journée', 'un livre qui explique les étapes dans une journée', true),
('https://wp.oclock.io/wp-content/uploads/2022/01/Oclock-_-cinq-ans-en-chiffres_OG.jpg', 'apprendre a coder', 'un livre qui explique les étapes pour coder', true);

INSERT INTO "reference_to_image" ("id_ref", "id_image") VALUES
(1, 1),
(1, 2),
(3, 3),
(4, 4),
(5, 4),
(5, 3),
(5, 2);

INSERT INTO "reference_to_category" ("id_ref", "id_category") VALUES
(1, 5),
(2, 6),
(3, 2),
(4, 5),
(5, 2);

INSERT INTO "article" ("number", "origin", "date_buy", "available", "id_ref") VALUES
(19, 'achat fnac', '2019-06-14', true, 4),
(27, 'don adherent', '2020-04-15', true, 1),
(28, 'don adherent', '2020-04-15', true, 1),
(29, 'don adherent', '2020-04-15', true, 1),
(215, 'tombé du ciel', '2021-12-24', true, 4),
(216, 'tombé du ciel', '2021-12-24', true, 4),
(217, 'tombé du ciel', '2021-12-24', true, 2),
(418, 'achat leclerc', '2022-07-24', true, 3),
(314, 'don asso', '2017-01-06', true, 4),
(612, 'don asso', '2017-01-06', true, 5),
(613, 'don asso', '2017-01-06', true, 5),
(614, 'don asso', '2017-01-06', true, 5),
(315, 'don asso', '2017-01-06', true, 5);

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
