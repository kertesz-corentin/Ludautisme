BEGIN;

INSERT INTO "image" ("url","title", "alternative_text","main") VALUES
('https://static.alipson.fr/vilac.4/vilac-jeu-de-lacage--mes-animaux-a-lacer.134448-1.600.jpg', 'animaux a lacer', 'jouet représantant des animaux a lacer', true),
('https://bb.ca/catalogue_images/580x358/2209708_1.png', 'animaux à lacer', 'un autre jeux avec des animaux a lacer', false),
('http://www.lepaysdesmerveilles.com/wp-content/uploads/2016/09/coffret-ecriture-lecture-montessori-grapheme-rugueux-balthazar.jpg', 'coffret lecture ecriture', 'un coffret pour apprendre a écrire', false),
('https://img.scoop.it/CtEd9UP0K3g6EJKiCAkmPoXXXL4j3HpexhjNOf_P3YmryPKwJ94QGRtDb3Sbc6KY', 'ma journée', 'un livre qui explique les étapes dans une journée', true),
('https://wp.oclock.io/wp-content/uploads/2022/01/Oclock-_-cinq-ans-en-chiffres_OG.jpg', 'apprendre a coder', 'un livre qui explique les étapes pour coder', true),
('../public/src/components/public/game1647436382653.png', 'game', 'image jeu par défaut', false);

COMMIT;