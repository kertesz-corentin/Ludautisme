BEGIN;

INSERT INTO "category" ("id","name", "main") OVERRIDING SYSTEM VALUE VALUES
    (0,'Outils Pédagogiques','true'),
    (1,'Médiathèque','true'),
    (2,'Motricité globale','true'),
    (3,'Motricité fine','true'),
    (4,'Outils Sensoriels','true'),
    (5,'Aide à l''autonomie','true'),
    (6,'Jeux Symboliques','true'),
    (7,'Instrument de musique','true'),
    (8,'renforçateur','false'),
    (9,'Mallette école','false'),
    (10,'Mallette de base','false'),
    (11,'encastrement ','false'),
    (12,'puzzle','false'),
    (13,'livre ','false'),
    (14,'CD','false'),
    (15,'mathématique','false'),
    (16,'langage','false'),
    (17,'graphisme','false'),
    (18,'écriture','false'),
    (19,'lecture','false'),
    (20,'manuel scolaire ','false'),
    (21,'upbility','false');

COMMIT;