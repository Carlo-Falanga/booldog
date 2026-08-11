USE booldog;

INSERT INTO animal_types (name, slug) VALUES
('Cane', 'cane'),
('Gatto', 'gatto');

INSERT INTO brands (name, slug, logo_url) VALUES
('Catit', 'catit', 'catit.png'),
('Ferplast', 'ferplast', 'ferplast.png'),
('Flexi', 'flexi', 'flexi.png'),
('Hunter', 'hunter', 'hunter.png'),
('Hurtta', 'hurtta', 'hurtta.png'),
('Julius-K9', 'julius-k9', 'julius-k9.png'),
('Kong', 'kong', 'kong.png'),
('Ruffwear', 'ruffwear', 'ruffwear.png'),
('Stefanplast', 'stefanplast', 'stefanplast.png'),
('Trixie', 'trixie', 'trixie.png');

-- looked up by slug, so the file survives a change in the ids
INSERT INTO products
    (brand_id, animal_type_id, name, slug, description, price, color, material, size, stock, img_url, category, is_featured)
VALUES
((SELECT id FROM brands WHERE slug = 'catit'), (SELECT id FROM animal_types WHERE slug = 'gatto'),
 'Catit Senses 2.0 Circuit Deluxe', 'catit-circuit-deluxe',
 'Pista a circuito con pallina luminosa, componibile su piu livelli per tenere il gatto attivo anche da solo.',
 34.90, 'Grigio', 'Plastica', 'Unica', 18, 'catit-circuit-deluxe.jpg', 'giochi', TRUE),

((SELECT id FROM brands WHERE slug = 'catit'), (SELECT id FROM animal_types WHERE slug = 'gatto'),
 'Catit Flower Fountain', 'catit-flower-fountain',
 'Fontanella da 3 litri con filtro a carboni attivi e tre modalita di flusso, per invogliare il gatto a bere di piu.',
 29.50, 'Bianco', 'Plastica', '3L', 25, 'catit-flower-fountain.jpg', 'ciotole', TRUE),

((SELECT id FROM brands WHERE slug = 'catit'), (SELECT id FROM animal_types WHERE slug = 'gatto'),
 'Catit Jumbo Hooded Litter Box', 'catit-jumbo-litter',
 'Lettiera chiusa di grandi dimensioni con filtro antiodore e sportello removibile.',
 44.00, 'Grigio', 'Plastica', 'Jumbo', 12, 'catit-jumbo-litter.jpg', 'lettiere', FALSE),

((SELECT id FROM brands WHERE slug = 'catit'), (SELECT id FROM animal_types WHERE slug = 'gatto'),
 'Catit Sleepyhead Bed', 'catit-sleepyhead',
 'Cuccia imbottita a conchiglia, con bordo alto che fa da appoggio per la testa.',
 27.90, 'Grigio', 'Poliestere', 'M', 20, 'catit-sleepyhead.jpg', 'cucce', FALSE),

((SELECT id FROM brands WHERE slug = 'catit'), (SELECT id FROM animal_types WHERE slug = 'gatto'),
 'Catit Vesper Mountain', 'catit-vesper-mountain',
 'Albero tiragraffi in MDF con cuccia superiore, piattaforme e pali rivestiti in sisal.',
 129.00, 'Noce', 'MDF', 'Unica', 6, 'catit-vesper-mountain.jpg', 'tiragraffi', TRUE),

((SELECT id FROM brands WHERE slug = 'ferplast'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Ferplast Atlas 20', 'ferplast-atlas-20',
 'Trasportino rigido per cani di taglia piccola, con maniglia e griglia frontale in acciaio.',
 39.90, 'Blu', 'Plastica', 'S', 15, 'ferplast-atlas-20.jpg', 'trasportini', FALSE),

((SELECT id FROM brands WHERE slug = 'ferplast'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Ferplast Jolie L', 'ferplast-jolie-l',
 'Cuccia ovale con cuscino sfoderabile e lavabile in lavatrice.',
 54.00, 'Marrone', 'Poliestere', 'L', 10, 'ferplast-jolie-l.jpg', 'cucce', FALSE),

((SELECT id FROM brands WHERE slug = 'ferplast'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Ferplast Roller Cabin', 'ferplast-roller-cabin',
 'Trasportino trolley con ruote e maniglia telescopica, utilizzabile anche come zaino.',
 89.90, 'Grigio', 'Plastica', 'M', 7, 'ferplast-roller-cabin.jpg', 'trasportini', TRUE),

((SELECT id FROM brands WHERE slug = 'ferplast'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Ferplast Siesta Deluxe 8', 'ferplast-siesta-8',
 'Cuccia rigida lavabile, adatta anche da usare come base per un cuscino su misura.',
 47.50, 'Bianco', 'Plastica', 'L', 14, 'ferplast-siesta-8.jpg', 'cucce', FALSE),

((SELECT id FROM brands WHERE slug = 'ferplast'), (SELECT id FROM animal_types WHERE slug = 'gatto'),
 'Ferplast Skyscraper', 'ferplast-skyscraper',
 'Tiragraffi a colonna alto 180 cm con tre cucce e piattaforme a diverse altezze.',
 159.00, 'Beige', 'Sisal', 'XL', 4, 'ferplast-skyscraper.jpg', 'tiragraffi', FALSE),

((SELECT id FROM brands WHERE slug = 'ferplast'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Ferplast Vega 2L', 'ferplast-vega-2l',
 'Distributore automatico di acqua da 2 litri con base antiscivolo.',
 18.90, 'Trasparente', 'Plastica', '2L', 30, 'ferplast-vega-2l.jpg', 'ciotole', FALSE),

((SELECT id FROM brands WHERE slug = 'flexi'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Flexi New Comfort L', 'flexi-comfort-l',
 'Guinzaglio avvolgibile a corda da 8 metri per cani fino a 50 kg, con freno a pulsante.',
 32.90, 'Nero', 'Nylon', 'L', 22, 'flexi-comfort-l.jpg', 'guinzagli', TRUE),

((SELECT id FROM brands WHERE slug = 'flexi'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Flexi New Classic Tape M', 'flexi-tape-m',
 'Guinzaglio avvolgibile a fettuccia da 5 metri per cani fino a 25 kg.',
 24.90, 'Rosso', 'Nylon', 'M', 26, 'flexi-tape-m.jpg', 'guinzagli', FALSE),

((SELECT id FROM brands WHERE slug = 'hunter'), (SELECT id FROM animal_types WHERE slug = 'gatto'),
 'Hunter Collare Gatto Oro', 'hunter-collare-gatto-oro',
 'Collare per gatto con chiusura di sicurezza a sgancio rapido e campanellino removibile.',
 14.50, 'Oro', 'Pelle', 'Unica', 35, 'hunter-collare-gatto-oro.jpg', 'collari', FALSE),

((SELECT id FROM brands WHERE slug = 'hunter'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Hunter Collare Nappa M', 'hunter-collare-nappa-m',
 'Collare in pelle nappa cucita a mano, morbido sul pelo e con fibbia in ottone.',
 36.00, 'Cognac', 'Pelle', 'M', 16, 'hunter-collare-nappa-m.jpg', 'collari', TRUE),

((SELECT id FROM brands WHERE slug = 'hunter'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Hunter Guinzaglio Doppio', 'hunter-guinzaglio-doppio',
 'Guinzaglio regolabile su tre lunghezze, utilizzabile anche a tracolla.',
 41.00, 'Nero', 'Pelle', 'Unica', 11, 'hunter-guinzaglio-doppio.jpg', 'guinzagli', FALSE),

((SELECT id FROM brands WHERE slug = 'hurtta'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Hurtta Active Harness M', 'hurtta-active-m',
 'Pettorina a Y con imbottitura leggera, pensata per le uscite lunghe e le corse.',
 49.90, 'Verde', 'Poliestere', 'M', 13, 'hurtta-active-m.jpg', 'pettorine', FALSE),

((SELECT id FROM brands WHERE slug = 'hurtta'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Hurtta Casual Padded Harness L', 'hurtta-casual-l',
 'Pettorina imbottita con inserti riflettenti su tutto il perimetro.',
 44.90, 'Blu', 'Poliestere', 'L', 17, 'hurtta-casual-l.jpg', 'pettorine', FALSE),

((SELECT id FROM brands WHERE slug = 'hurtta'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Hurtta Torrent Coat 35', 'hurtta-torrent-35',
 'Impermeabile antivento con apertura per la pettorina e chiusura regolabile sul collo.',
 69.00, 'Nero', 'Poliestere', '35 cm', 8, 'hurtta-torrent-35.jpg', 'abbigliamento', TRUE),

((SELECT id FROM brands WHERE slug = 'julius-k9'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Julius-K9 Collare M', 'julius-k9-collare-m',
 'Collare con maniglia di controllo e banda riflettente, abbinabile alla pettorina IDC.',
 22.90, 'Nero', 'Nylon', 'M', 24, 'julius-k9-collare-m.jpg', 'collari', FALSE),

((SELECT id FROM brands WHERE slug = 'julius-k9'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Julius-K9 IDC Powerharness XL', 'julius-k9-idc-xl',
 'Pettorina con etichette intercambiabili in velcro e maniglia dorsale rinforzata.',
 59.90, 'Nero', 'Nylon', 'XL', 9, 'julius-k9-idc-xl.jpg', 'pettorine', TRUE),

((SELECT id FROM brands WHERE slug = 'julius-k9'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Julius-K9 IDC Lumino L', 'julius-k9-lumino-l',
 'Pettorina fosforescente che si ricarica con la luce del giorno, per le uscite serali.',
 64.90, 'Giallo', 'Nylon', 'L', 6, 'julius-k9-lumino-l.jpg', 'pettorine', FALSE),

((SELECT id FROM brands WHERE slug = 'kong'), (SELECT id FROM animal_types WHERE slug = 'gatto'),
 'Kong Cat Wobbler', 'kong-cat-wobbler',
 'Dispenser di croccantini che oscilla senza cadere, rallenta il pasto e tiene occupato il gatto.',
 16.90, 'Grigio', 'Plastica', 'Unica', 28, 'kong-cat-wobbler.jpg', 'giochi', FALSE),

((SELECT id FROM brands WHERE slug = 'kong'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Kong Classic XL', 'kong-classic-xl',
 'Il gioco in gomma naturale da riempire con snack, resistente ai masticatori insistenti.',
 21.50, 'Rosso', 'Gomma', 'XL', 32, 'kong-classic-xl.jpg', 'giochi', TRUE),

((SELECT id FROM brands WHERE slug = 'kong'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Kong Wobbler L', 'kong-wobbler-l',
 'Dispenser oscillante per croccantini, si smonta in due parti per il lavaggio.',
 26.90, 'Rosso', 'Plastica', 'L', 19, 'kong-wobbler-l.jpg', 'giochi', FALSE),

((SELECT id FROM brands WHERE slug = 'ruffwear'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Ruffwear Front Range Harness M', 'ruffwear-front-range-m',
 'Pettorina con doppio attacco, frontale e dorsale, e imbottitura distribuita sul torace.',
 54.90, 'Arancione', 'Nylon', 'M', 15, 'ruffwear-front-range-m.jpg', 'pettorine', TRUE),

((SELECT id FROM brands WHERE slug = 'ruffwear'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Ruffwear Grip Trex Boots L', 'ruffwear-grip-trex-l',
 'Scarpette da trekking con suola Vibram, vendute in set da quattro.',
 79.90, 'Arancione', 'Gomma', 'L', 5, 'ruffwear-grip-trex-l.jpg', 'abbigliamento', FALSE),

((SELECT id FROM brands WHERE slug = 'ruffwear'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Ruffwear Highlands Bed L', 'ruffwear-highlands-l',
 'Materassino da campeggio arrotolabile, con fondo impermeabile e sacca di trasporto.',
 99.00, 'Verde', 'Poliestere', 'L', 7, 'ruffwear-highlands-l.jpg', 'cucce', FALSE),

((SELECT id FROM brands WHERE slug = 'ruffwear'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Ruffwear Knot-a-Leash', 'ruffwear-knot-a-leash',
 'Guinzaglio in corda da arrampicata con moschettone a ghiera bloccabile.',
 42.90, 'Blu', 'Nylon', 'Unica', 18, 'ruffwear-knot-a-leash.jpg', 'guinzagli', FALSE),

((SELECT id FROM brands WHERE slug = 'stefanplast'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Stefanplast Grooming Box', 'stefanplast-grooming-box',
 'Box porta accessori per la toelettatura, con vassoio estraibile e scomparti interni.',
 23.90, 'Grigio', 'Plastica', 'Unica', 21, 'stefanplast-grooming-box.jpg', 'toelettatura', FALSE),

((SELECT id FROM brands WHERE slug = 'trixie'), (SELECT id FROM animal_types WHERE slug = 'gatto'),
 'Trixie Boxy S-M', 'trixie-boxy-sm',
 'Lettiera con bordo alto e paletta agganciata al bordo, semplice da svuotare.',
 19.90, 'Grigio', 'Plastica', 'S-M', 27, 'trixie-boxy-sm.jpg', 'lettiere', FALSE),

((SELECT id FROM brands WHERE slug = 'trixie'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Trixie Flip Board', 'trixie-flip-board',
 'Gioco di attivita mentale di livello 2: il cane deve aprire gli sportelli per arrivare al premio.',
 17.50, 'Blu', 'Plastica', 'Unica', 23, 'trixie-flip-board.jpg', 'giochi', FALSE),

((SELECT id FROM brands WHERE slug = 'trixie'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Trixie Harvey XL', 'trixie-harvey-xl',
 'Cuccia rettangolare in tessuto stampato, con cuscino reversibile.',
 74.90, 'Beige', 'Cotone', 'XL', 8, 'trixie-harvey-xl.jpg', 'cucce', FALSE),

((SELECT id FROM brands WHERE slug = 'trixie'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Trixie King of the City Coat M', 'trixie-king-coat-m',
 'Cappottino trapuntato con inserti riflettenti e apertura per il guinzaglio.',
 33.90, 'Nero', 'Poliestere', 'M', 12, 'trixie-king-coat-m.jpg', 'abbigliamento', FALSE),

((SELECT id FROM brands WHERE slug = 'trixie'), (SELECT id FROM animal_types WHERE slug = 'cane'),
 'Trixie Slow Feeder XL', 'trixie-slow-feeder-xl',
 'Ciotola con labirinto interno che rallenta il pasto dei cani che mangiano troppo in fretta.',
 15.90, 'Grigio', 'Plastica', 'XL', 29, 'trixie-slow-feeder-xl.jpg', 'ciotole', FALSE);

-- relative dates, otherwise they go stale. SCADUTO is expired on purpose
INSERT INTO coupons (code, value, valid_from, valid_to, min_cart_amount) VALUES
('BENVENUTO10', 10.00, NOW() - INTERVAL 1 MONTH, NOW() + INTERVAL 6 MONTH, 50.00),
('ESTATE5', 5.00, NOW() - INTERVAL 1 MONTH, NOW() + INTERVAL 6 MONTH, NULL),
('SPEDIZIONE15', 15.00, NOW() - INTERVAL 1 MONTH, NOW() + INTERVAL 6 MONTH, 120.00),
('SCADUTO', 20.00, NOW() - INTERVAL 1 YEAR, NOW() - INTERVAL 6 MONTH, NULL);
