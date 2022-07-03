BEGIN;

INSERT INTO "user" ("email", "member_number", "phone", "first_name", "last_name", "adress_number", "adress_street", "adress_zipcode", "adress_city", "password", "id_role") VALUES
('corentin@grr.la', 121, '0756412893', 'corentin', 'kertesz', 8, 'rue jean jaures', 29200, 'brest', '$2b$10$C/Wplc9TYxtuHP.mM8Ym.ugo7vR5OnHW2VFvLQK4MEQEQZXNVAI8m', 2),
('arnaud@grr.la', 57, '0648975213', 'arnaud', 'peybernes', 17, 'rue des jonquilles', 14700, 'pau', '$2b$10$tQ1j.ZsG7JwAuoIiqok44.X31/HvrQ8tsGq8t7QYkhJ0EJWvrxeFi', 2),
('thibault@grr.la', 21, '0749831522', 'thibault', 'lallement', 85, 'boulevard de la choucroute', 65410, 'castre', '$2b$10$Q/65PAx2Ciz6UY8qbGv89.u2mUIrarvxZ/jFoeIndRJCaqD7A0LuK', 2 ),
('romain@grr.la', 94, '0647855463', 'romain', 'perdriat', 22, 'impasse des matelots', 29200, 'brest', '$2b$10$zPmeea90s/s8deR.SymiZ.fWNX/cfZscTLdiGFuiD.3YwlM4ZrH16', 2),
('xavier@grr.la', 76, '0749881254', 'xavier', 'leplatre', 45, 'rue du verdon', 45164, 'bayeux', '$2b$10$dvFGQv3mRlEJw6ckT4q2q.gU.VvkfnkeV2Jp9CffFWRWBnaI3sQXi', 2),
('user@grr.la', 107, '0654975812', 'lucile', 'douce', 6, 'residence des hiboux', 29460, 'plougastel-daoulas', '$2b$10$H5eSsaHtOYnSnt5CIRMCcOEDwLaSO9HHeWmsZSkYYYdISw4GFMrF6', 1),
('demo@grr.la', 108,'0663690249', 'ramdom', 'user', 23, 'route des fakes', 29630, 'saint renan', 'abcdef', 1);

COMMIT;