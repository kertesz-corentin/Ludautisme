BEGIN;

INSERT INTO "user" ("email", "member_number", "phone", "first_name", "last_name", "adress_number", "adress_street", "adress_zipcode", "adress_city", "password", "id_role") VALUES
('corentin@grr.la', -1, '0756412893', 'corentin', 'kertesz', 8, 'rue jean jaures', 29200, 'brest', '$2b$10$C/Wplc9TYxtuHP.mM8Ym.ugo7vR5OnHW2VFvLQK4MEQEQZXNVAI8m', 2),
('arnaud@grr.la', -2, '0648975213', 'arnaud', 'peybernes', 17, 'rue des jonquilles', 14700, 'pau', '$2b$10$tQ1j.ZsG7JwAuoIiqok44.X31/HvrQ8tsGq8t7QYkhJ0EJWvrxeFi', 2),
('user@grr.la', -6, '0654975812', 'lucile', 'douce', 6, 'residence des hiboux', 29460, 'plougastel-daoulas', '$2b$10$H5eSsaHtOYnSnt5CIRMCcOEDwLaSO9HHeWmsZSkYYYdISw4GFMrF6', 1),
('demo@grr.la', -7,'0663690249', 'ramdom', 'user', 23, 'route des fakes', 29630, 'saint renan', 'abcdef', 1);

COMMIT;
