/**
 * Traduction francaise du glossaire de champs par type de fichier.
 * Meme structure que labels.js -- seules les valeurs sont traduites.
 * Les cles (patterns) sont identiques.
 *
 * Convention : pas de caracteres accentues (ASCII pur), conformement
 * au fichier i18n.js existant dans le projet.
 */

const ALIGNMENT_FR = {
  A: 'Donnees d\'alignement',
  'A.a': 'Alignements (par ID)',
  'A.a.*': 'Alignement',
  'A.a.*.n': 'Nom',
  'A.a.*.c': 'Peut etre choisi par le joueur',
  'A.o': 'Ordres (par ID)',
  'A.o.*': 'Ordre',
  'A.o.*.n': 'Nom',
  'A.o.*.a': 'ID d\'alignement parent',
  'A.s': 'Specialisations (par ID)',
  'A.s.*': 'Specialisation',
  'A.s.*.n': 'Nom',
  'A.s.*.d': 'Description',
  'A.s.*.av': 'Valeur d\'alignement minimale',
  'A.s.*.f': 'IDs de dons debloquees',
  'A.s.*.o': 'ID d\'ordre',
  'A.f': 'Dons (par ID)',
  'A.f.*': 'Don',
  'A.f.*.n': 'Nom',
  'A.f.*.e': 'IDs d\'effets du don',
  'A.f.*.g': 'ID de sous-don / groupe',
  'A.fe': 'Effets de dons (par ID)',
  'A.fe.*': 'Effet de don',
  'A.fe.*.d': 'Modele de description de l\'effet',
  'A.b': 'Niveaux d\'equilibre d\'alignement',
  'A.b.*': 'Entree de niveau d\'equilibre',
  'A.b.*.n': 'Nom',
  'A.b.*.d': 'Description',
  'A.jo': 'Matrice rejoindre-ordre [alignement][ordre]',
  'A.jo.*': 'Ligne par alignement',
  'A.jo.*.*': 'Un membre de cet alignement peut-il rejoindre cet ordre',
  'A.at': 'Matrice d\'attaque [alignement A][alignement B]',
  'A.at.*': 'Ligne par alignement',
  'A.at.*.*': 'A peut-il attaquer B',
  'A.g': 'Matrice de gain PvP [alignement A][alignement B]',
  'A.g.*': 'Ligne par alignement',
  'A.g.*.*': 'A peut-il voir le gain PvP de B',
};

const ITEMS_FR = {
  I: 'Base de donnees des objets',
  'I.u': 'Modeles d\'objets (par ID)',
  'I.u.*': 'Modele d\'objet',
  'I.u.*.n': 'Nom (motif, decode via I.us)',
  'I.u.*.d': 'Description (motif, decode via I.us)',
  'I.u.*.t': 'ID de type (voir I.t)',
  'I.u.*.l': 'Niveau',
  'I.u.*.g': 'GFX / ID d\'icone',
  'I.u.*.p': 'Prix de base (en kamas)',
  'I.u.*.w': 'Poids (en pods)',
  'I.u.*.s': 'ID de panoplie (si applicable)',
  'I.u.*.u': 'ID de script d\'utilisation (objet utilisable)',
  'I.u.*.ut': 'ID de script d\'utilisation ciblee',
  'I.u.*.fm': 'Forgemagiable (ameliorable par forgemagie)',
  'I.u.*.tw': 'Arme deux mains',
  'I.u.*.et': 'Etheree (se degrade a l\'utilisation)',
  'I.u.*.h': 'Cache (non visible par le joueur)',
  'I.u.*.m': 'Maudit (ne peut pas etre pose/detruit)',
  'I.u.*.c': 'Conditions d\'utilisation (chaine de motif, & = ET / | = OU)',
  'I.u.*.ep': 'Version regionale/episodique minimale requise',
  'I.u.*.e': 'Statistiques d\'arme (uniquement pour les armes)',
  'I.u.*.e.0': 'Degats bonus sur coup critique',
  'I.u.*.e.1': 'Cout en PA',
  'I.u.*.e.2': 'Portee minimale',
  'I.u.*.e.3': 'Portee maximale',
  'I.u.*.e.4': 'Chance de coup critique (1 sur N)',
  'I.u.*.e.5': 'Chance d\'echec critique (1 sur N)',
  'I.u.*.e.6': 'En ligne uniquement (booleen)',
  'I.u.*.e.7': 'Ligne de vue requise (booleen)',
  'I.us': 'Dictionnaire de chaines uniques (decodeur de motifs)',
  'I.us.*': 'Entree du dictionnaire',
  'I.t': 'Types d\'objets (par ID)',
  'I.t.*': 'Type d\'objet',
  'I.t.*.n': 'Nom',
  'I.t.*.t': 'ID de super-type (voir I.st)',
  'I.t.*.z': 'Zone d\'effet (paires forme+taille, utilisees pour les armes)',
  'I.st': 'Super-types d\'objets (par ID)',
  'I.st.*': 'Libelle de super-type',
  'I.ss': 'Carte des emplacements par super-type',
  'I.ss.*': 'IDs d\'emplacements pour ce super-type',
};

const ITEMSETS_FR = {
  IS: 'Panoplies (par ID)',
  'IS.*': 'Panoplie',
  'IS.*.n': 'Nom',
  'IS.*.d': 'Description',
  'IS.*.i': 'IDs des objets de la panoplie (tableau)',
  'IS.*.i.*': 'ID d\'objet',
};

const INTERACTIVEOBJECTS_FR = {
  IO: 'Base de donnees des objets interactifs',
  'IO.g': 'Association GFX vers ID de donnees',
  'IO.g.*': 'ID de donnees pour ce GFX',
  'IO.d': 'Definitions des objets (par ID de donnees)',
  'IO.d.*': 'Objet interactif',
  'IO.d.*.n': 'Nom',
};

const HOUSES_FR = {
  H: 'Base de donnees des maisons',
  'H.h': 'Maisons (par ID)',
  'H.h.*': 'Maison',
  'H.h.*.n': 'Nom',
  'H.m': 'ID de maison par carte',
  'H.m.*': 'ID de maison pour cette carte',
  'H.d': 'Portes par carte',
  'H.d.*': 'Portes de la carte',
  'H.d.*.*': 'Porte (la cle est "c"+numeroDeCellule)',
  'H.ids': 'Liste des competences interieures',
};

const DUNGEONS_FR = {
  DU: 'Donjons (par ID)',
  'DU.*': 'Donjon',
  'DU.*.n': 'Nom',
};

const SPELLS_FR = {
  S: 'Sorts (par ID)',
  'S.*': 'Sort',
  'S.*.n': 'Nom',
  'S.*.d': 'Description',
  'S.*.l1': 'Statistiques niveau 1 (tableau)',
  'S.*.l2': 'Statistiques niveau 2 (tableau)',
  'S.*.l3': 'Statistiques niveau 3 (tableau)',
  'S.*.l4': 'Statistiques niveau 4 (tableau)',
  'S.*.l5': 'Statistiques niveau 5 (tableau)',
  'S.*.l6': 'Statistiques niveau 6 (tableau)',
  'S.*.l1.0': 'Effets (coup normal)',
  'S.*.l1.1': 'Effets (coup critique)',
  'S.*.l1.2': 'Cout en PA',
  'S.*.l1.3': 'Portee minimale',
  'S.*.l1.4': 'Portee maximale',
  'S.*.l1.5': 'Chance de coup critique',
  'S.*.l1.6': 'Chance d\'echec critique',
  'S.*.l1.7': 'En ligne uniquement (booleen)',
  'S.*.l1.8': 'Ligne de vue (booleen)',
};

const EFFECTS_FR = {
  E: 'Effets (par ID)',
  'E.*': 'Effet',
  'E.*.d': 'Modele de description',
  'E.*.c': 'Cle de caracteristique',
  'E.*.o': 'Operateur (+, -, etc.)',
  'E.*.e': 'ID d\'element',
  'E.*.t': 'Libelle du type d\'effet',
  'E.*.j': 'Indicateur de mode jet/des',
  EDMG: 'IDs des effets de degats ameliores',
  EHEL: 'IDs des effets de soins ameliores',
};

const JOBS_FR = {
  J: 'Metiers (par ID)',
  'J.*': 'Metier',
  'J.*.n': 'Nom',
  'J.*.d': 'Description',
  'J.*.s': 'Competences associees au metier',
  'J.*.g': 'GFX / ID d\'icone',
};

const CRAFTS_FR = {
  CR: 'Recettes (par ID d\'objet)',
  'CR.*': 'Recette',
  'CR.*.r': 'Ingredients ([ID objet, quantite])',
  'CR.*.s': 'ID de competence',
  'CR.*.l': 'Niveau requis',
};

const SKILLS_FR = {
  SK: 'Competences (par ID)',
  'SK.*': 'Competence',
  'SK.*.c': 'Cout',
  'SK.*.cl': 'IDs des objets fabriques',
  'SK.*.d': 'Description',
  'SK.*.i': 'ID d\'icone',
  'SK.*.io': 'ID d\'objet interactif',
  'SK.*.j': 'ID de metier',
  'SK.*.f': 'Niveau de forgemagie requis',
};

const DIALOG_FR = {
  D: 'Textes de dialogues',
  'D.q': 'Questions PNJ (par ID)',
  'D.q.*': 'Texte de question',
  'D.a': 'Reponses du joueur (par ID)',
  'D.a.*': 'Texte de reponse',
};

const NPC_FR = {
  N: 'Textes PNJ',
  'N.d': 'PNJ (par ID)',
  'N.d.*': 'PNJ',
  'N.d.*.n': 'Nom',
  'N.d.*.a': 'IDs des actions disponibles sur ce PNJ',
  'N.a': 'Libelles des actions PNJ (par ID)',
  'N.a.*': 'Libelle d\'action',
};

const MONSTERS_FR = {
  M: 'Monstres (par ID)',
  'M.*': 'Monstre',
  'M.*.n': 'Nom',
  'M.*.a': 'ID d\'alignement',
  'M.*.k': 'Peut etre expulse du groupe',
  'M.*.g1': 'Statistiques grade 1',
  'M.*.g2': 'Statistiques grade 2',
  'M.*.g3': 'Statistiques grade 3',
  'M.*.g4': 'Statistiques grade 4',
  'M.*.g5': 'Statistiques grade 5',
  'M.*.g1.l': 'Niveau',
  'M.*.g1.r': 'Resistances (tableau, par element)',
  'M.*.g2.l': 'Niveau',
  'M.*.g2.r': 'Resistances (tableau, par element)',
  'M.*.g3.l': 'Niveau',
  'M.*.g3.r': 'Resistances (tableau, par element)',
  'M.*.g4.l': 'Niveau',
  'M.*.g4.r': 'Resistances (tableau, par element)',
  'M.*.g5.l': 'Niveau',
  'M.*.g5.r': 'Resistances (tableau, par element)',
};

const MONSTERS_RACES_FR = {
  MR: 'Races de monstres (par ID)',
  'MR.*': 'Race',
  'MR.*.n': 'Nom',
  MSR: 'Super-races de monstres (par ID)',
  'MSR.*': 'Super-race',
  'MSR.*.n': 'Nom',
};

const TIMEZONES_FR = {
  T: 'Fuseaux horaires',
  'T.*': 'Libelle de fuseau horaire',
};

const CLASSES_FR = {
  G: 'Classes / races de joueur (par ID)',
  'G.*': 'Classe',
  'G.*.sn': 'Nom court (ex. "Feca")',
  'G.*.ln': 'Nom long (ex. "Le bouclier Feca")',
  'G.*.d': 'Description HTML longue (lore)',
  'G.*.sd': 'Description courte (affichee dans le selecteur de classe)',
  'G.*.ep': 'Version regionale/episodique minimale ou cette classe est jouable',
  'G.*.s': 'IDs des sorts de la classe (generalement 21, un par emplacement)',
  'G.*.s.*': 'ID de sort',
  'G.*.cc': 'Profil de corps-a-corps par defaut (sans arme equipee)',
  'G.*.cc.0': 'Modele d\'effets coup normal',
  'G.*.cc.1': 'Modele d\'effets coup critique',
  'G.*.cc.2': 'Cout en PA',
  'G.*.cc.3': 'Portee minimale',
  'G.*.cc.4': 'Portee maximale',
  'G.*.cc.5': 'Chance de coup critique (1 sur N)',
  'G.*.cc.6': 'Chance d\'echec critique (1 sur N)',
  'G.*.cc.7': 'En ligne uniquement (booleen)',
  'G.*.cc.8': 'Ligne de vue (booleen)',
  'G.*.cc.9': 'Etats requis (IDs d\'etats)',
  'G.*.cc.10': 'Etats interdits (IDs d\'etats)',
  'G.*.b10': 'Table de cout des boosts de Force',
  'G.*.b11': 'Table de cout des boosts de Vitalite',
  'G.*.b12': 'Table de cout des boosts de Sagesse',
  'G.*.b13': 'Table de cout des boosts de Chance',
  'G.*.b14': 'Table de cout des boosts d\'Agilite',
  'G.*.b15': 'Table de cout des boosts d\'Intelligence',
  'G.*.b10.*': 'Palier de boost [seuil, cout-par-point, points-par-achat]',
  'G.*.b11.*': 'Palier de boost [seuil, cout-par-point, points-par-achat]',
  'G.*.b12.*': 'Palier de boost [seuil, cout-par-point, points-par-achat]',
  'G.*.b13.*': 'Palier de boost [seuil, cout-par-point, points-par-achat]',
  'G.*.b14.*': 'Palier de boost [seuil, cout-par-point, points-par-achat]',
  'G.*.b15.*': 'Palier de boost [seuil, cout-par-point, points-par-achat]',
};

const EMOTES_FR = {
  EM: 'Emotes (par ID)',
  'EM.*': 'Emote',
  'EM.*.n': 'Nom',
  'EM.*.s': 'Raccourci de tchat',
};

const GUILDS_FR = {
  GU: 'Donnees de guilde',
  'GU.b': 'Boosts par caracteristique',
  'GU.b.*': 'Valeur de boost (cle+"m" = valeur maximale)',
};

const NAMES_FR = {
  NF: 'Pool de noms de personnages',
  'NF.n': 'Noms de famille (par ID)',
  'NF.n.*': 'Nom de famille',
  'NF.f': 'Prenoms (par ID)',
  'NF.f.*': 'Prenom',
};

const RANKS_FR = {
  R: 'Rangs de guilde (par ID)',
  'R.*': 'Rang',
  'R.*.n': 'Nom',
};

const TIPS_FR = {
  TI: 'Astuces de l\'ecran de chargement',
  'TI.*': 'Texte d\'astuce',
};

const SHORTCUTS_FR = {
  SSC: 'Categories de raccourcis (par ID)',
  'SSC.*': 'Libelle de categorie',
  SH: 'Raccourcis (par ID)',
  'SH.*': 'Raccourci',
  SST: 'Ensembles de raccourcis',
  'SST.*': 'Entree d\'ensemble',
  SSK: 'Touches de raccourcis (cle = ID ensemble|raccourci)',
  'SSK.*': 'Association de touche',
};

const SERVERS_FR = {
  SR: 'Serveurs (par ID)',
  'SR.*': 'Serveur',
  'SR.*.n': 'Nom',
  'SR.*.d': 'Description',
  SRP: 'Populations des serveurs (par ID)',
  'SRP.*': 'Libelle de population',
  SRPW: 'Poids de population des serveurs (par ID)',
  'SRPW.*': 'Poids',
  SRC: 'Communautes de serveurs (par ID)',
  'SRC.*': 'Communaute',
  'SRC.*.n': 'Nom interne',
  'SRC.*.d': 'Nom affiche',
  SRVT: 'Modeles de texte specifiques au serveur (par ID)',
  'SRVT.*': 'Modele',
  'SRVT.*.l': 'Libelle de recherche (reference en tant que `SRVT:libelle`)',
  'SRVT.*.d': 'Valeur par defaut',
  SRVC: 'Remplacements de texte specifiques au serveur (cle = ID texte|ID serveur)',
  'SRVC.*': 'Valeur de remplacement',
};

const QUESTS_FR = {
  Q: 'Quetes',
  'Q.q': 'Quetes (par ID)',
  'Q.q.*': 'Quete',
  'Q.q.*.n': 'Nom',
  'Q.q.*.d': 'Description',
  'Q.s': 'Etapes de quete (par ID)',
  'Q.s.*': 'Etape',
  'Q.s.*.n': 'Nom',
  'Q.s.*.d': 'Description',
  'Q.s.*.r': 'Texte des recompenses',
  'Q.o': 'Objectifs de quete (par ID)',
  'Q.o.*': 'Objectif',
  'Q.o.*.x': 'X de la carte (si positionnel)',
  'Q.o.*.y': 'Y de la carte (si positionnel)',
  'Q.t': 'Types d\'objectifs (par ID)',
  'Q.t.*': 'Libelle de type',
};

const STATES_FR = {
  ST: 'Etats du personnage (par ID)',
  'ST.*': 'Etat',
  'ST.*.n': 'Nom',
};

const PVP_FR = {
  PP: 'Donnees PvP',
  'PP.hp': 'Bornes des points d\'honneur par grade',
  'PP.hp.*': 'Borne inferieure pour ce grade',
  'PP.maxdp': 'Points de deshonneur maximaux',
  'PP.grds': 'Grades par camp d\'alignement',
  'PP.grds.*': 'Liste de grades du camp (alignement)',
  'PP.grds.*.*': 'Entree de grade',
  'PP.grds.*.*.nl': 'Nom long',
  'PP.grds.*.*.nc': 'Nom court',
};

const HINTS_FR = {
  HI: 'Indices / marqueurs de carte (liste)',
  'HI.*': 'Indice',
  'HI.*.n': 'Nom',
  'HI.*.c': 'ID de categorie',
  'HI.*.m': 'ID de carte',
  'HI.*.g': 'ID GFX',
  'HI.*.x': 'Coordonnee X',
  'HI.*.y': 'Coordonnee Y',
  HIC: 'Categories d\'indices (par ID)',
  'HIC.*': 'Categorie',
  'HIC.*.n': 'Nom',
};

const MOUNTS_FR = {
  RI: 'Modeles de montures (par ID)',
  'RI.*': 'Monture',
  'RI.*.n': 'Nom',
  'RI.*.g': 'ID GFX (nom du clip)',
  'RI.*.c1': 'Couleur par defaut 1',
  'RI.*.c2': 'Couleur par defaut 2',
  'RI.*.c3': 'Couleur par defaut 3',
  RIA: 'Capacites/aptitudes des montures (par ID)',
  'RIA.*': 'Capacite',
  'RIA.*.n': 'Nom',
};

const KNOWLEDGEBASE_FR = {
  KBC: 'Categories de la base de connaissances (par ID)',
  'KBC.*': 'Categorie',
  'KBC.*.n': 'Nom',
  KBA: 'Articles de la base de connaissances (par ID)',
  'KBA.*': 'Article',
  'KBA.*.n': 'Titre',
  'KBA.*.c': 'Contenu',
  KBD: 'Declencheurs de la base de connaissances',
  'KBD.*': 'Entree de declencheur',
  KBT: 'Astuces de la base de connaissances (par ID)',
  'KBT.*': 'Texte d\'astuce',
};

const AUDIO_FR = {
  AUMC: 'Nom de cle musique vers ID',
  'AUMC.*': 'ID de musique',
  AUEC: 'Nom de cle son vers ID',
  'AUEC.*': 'ID de son',
  AUAC: 'Nom de cle ambiance vers ID',
  'AUAC.*': 'ID d\'ambiance',
  AUM: 'Fichiers musicaux (par ID)',
  'AUM.*': 'Fichier musical / metadonnees',
  AUE: 'Fichiers sons (par ID)',
  'AUE.*': 'Fichier son / metadonnees',
  AUA: 'Fichiers d\'ambiance (par ID)',
  'AUA.*': 'Fichier d\'ambiance / metadonnees',
};

const SUBTITLES_FR = {
  SUB: 'Sous-titres par bande-annonce',
  'SUB.*': 'Sous-titres de la bande-annonce (par index)',
  'SUB.*.*': 'Ligne de sous-titre',
};

const SCRIPTS_FR = {
  SCR: 'Texte de tutoriel / dialogue scripte (par ID)',
  'SCR.*': 'Texte de tutoriel',
};

const SPEAKINGITEMS_FR = {
  SIM: 'Messages des objets parlants (par ID)',
  'SIM.*': 'Message',
  SIT: 'Declencheurs des objets parlants (par ID)',
  'SIT.*': 'Declencheur',
};

const FIGHTCHALLENGE_FR = {
  FC: 'Defis de combat (par ID)',
  'FC.*': 'Defi',
  'FC.*.n': 'Nom',
  'FC.*.d': 'Description',
};

const TITLES_FR = {
  PT: 'Titres du joueur (par ID)',
  'PT.*': 'Titre',
  'PT.*.t': 'Modele de texte du titre (peut contenir %1)',
  'PT.*.c': 'Couleur du texte du titre (entier RGB)',
  'PT.*.pt': 'Type de parametre (0 = chaine simple, 1 = ID de monstre)',
};

const MAPS_FR = {
  MA: 'Donnees de carte / zone',
  'MA.m': 'Cartes (par ID de carte)',
  'MA.m.*': 'Informations de carte',
  'MA.m.*.c': 'Nombre maximum de joueurs en defi',
  'MA.m.*.t': 'Nombre maximum de joueurs par equipe',
  'MA.m.*.x': 'Coordonnee X',
  'MA.m.*.y': 'Coordonnee Y',
  'MA.m.*.sa': 'ID de sous-zone',
  'MA.a': 'Zones (par ID)',
  'MA.a.*': 'Zone',
  'MA.a.*.n': 'Nom',
  'MA.a.*.sua': 'ID de super-zone',
  'MA.sua': 'Super-zones (par ID)',
  'MA.sua.*': 'Super-zone',
  'MA.sua.*.n': 'Nom',
  'MA.sa': 'Sous-zones (par ID)',
  'MA.sa.*': 'Sous-zone',
  'MA.sa.*.n': 'Nom',
  'MA.sa.*.a': 'ID de zone parente',
};

const LANG_FR = {
  C: 'Configuration par langue (cle vers valeur)',
  'C.*': 'Entree de configuration',
  CNS: 'Raccourcis console par defaut',
  'CNS.*': 'Entree de raccourci',
  COM: 'Communautes de serveurs (liste de libelles)',
  'COM.*': 'Libelle de communaute',
  CSR: 'Liste de mots censures',
  'CSR.*': 'Mot',
  ABR: 'Motifs de signalement d\'abus',
  'ABR.*': 'Motif',
  WEIGHTS: 'Catalogue de tailles de fichiers (utilise par l\'ecran de chargement)',
  'WEIGHTS.*': 'Taille en octets pour ce module de langue',
};

const COMMON_FR = {
  FILE_BEGIN: 'Marqueur interne -- doit rester vrai',
  FILE_END: 'Marqueur interne -- doit rester vrai',
  VERSION: 'Version du fichier de langue (suffixe du nom de fichier)',
};

export const LABELS_FR = {
  alignment: { ...COMMON_FR, ...ALIGNMENT_FR },
  items: { ...COMMON_FR, ...ITEMS_FR },
  itemsets: { ...COMMON_FR, ...ITEMSETS_FR },
  interactiveobjects: { ...COMMON_FR, ...INTERACTIVEOBJECTS_FR },
  houses: { ...COMMON_FR, ...HOUSES_FR },
  dungeons: { ...COMMON_FR, ...DUNGEONS_FR },
  spells: { ...COMMON_FR, ...SPELLS_FR },
  effects: { ...COMMON_FR, ...EFFECTS_FR },
  jobs: { ...COMMON_FR, ...JOBS_FR },
  crafts: { ...COMMON_FR, ...CRAFTS_FR },
  skills: { ...COMMON_FR, ...SKILLS_FR },
  dialog: { ...COMMON_FR, ...DIALOG_FR },
  npc: { ...COMMON_FR, ...NPC_FR },
  monsters: { ...COMMON_FR, ...MONSTERS_FR, ...MONSTERS_RACES_FR },
  timezones: { ...COMMON_FR, ...TIMEZONES_FR },
  classes: { ...COMMON_FR, ...CLASSES_FR },
  emotes: { ...COMMON_FR, ...EMOTES_FR },
  guilds: { ...COMMON_FR, ...GUILDS_FR },
  names: { ...COMMON_FR, ...NAMES_FR },
  ranks: { ...COMMON_FR, ...RANKS_FR },
  tips: { ...COMMON_FR, ...TIPS_FR },
  shortcuts: { ...COMMON_FR, ...SHORTCUTS_FR },
  servers: { ...COMMON_FR, ...SERVERS_FR },
  quests: { ...COMMON_FR, ...QUESTS_FR },
  states: { ...COMMON_FR, ...STATES_FR },
  pvp: { ...COMMON_FR, ...PVP_FR },
  hints: { ...COMMON_FR, ...HINTS_FR },
  rides: { ...COMMON_FR, ...MOUNTS_FR },
  kb: { ...COMMON_FR, ...KNOWLEDGEBASE_FR },
  audio: { ...COMMON_FR, ...AUDIO_FR },
  subtitles: { ...COMMON_FR, ...SUBTITLES_FR },
  scripts: { ...COMMON_FR, ...SCRIPTS_FR },
  speakingitems: { ...COMMON_FR, ...SPEAKINGITEMS_FR },
  fightChallenge: { ...COMMON_FR, ...FIGHTCHALLENGE_FR },
  titles: { ...COMMON_FR, ...TITLES_FR },
  maps: { ...COMMON_FR, ...MAPS_FR },
  lang: { ...COMMON_FR, ...LANG_FR },
};
