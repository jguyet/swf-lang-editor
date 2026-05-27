# Documentation — Fichiers Lang SWF Dofus 1.29

> Reference technique de chaque fichier `lang/swf/*.swf` du client Dofus 1.29 (AS2).
> Chaque section correspond a un type de fichier editable dans l'editeur.


---

---

## `alignment`

**Fichier** : `alignment_<lang>_<version>.swf` — **Variable racine** : `A`

| Section | Description |
|---|---|
| `A.a` | Alignements (Bonta, Brakmar, Neutre, Mercenaire) avec `n` = nom. |
| `A.o` | Ordres d'alignement avec `n` = nom, `a` = ID alignement parent. |
| `A.s` | Specialisations avec `n`, `d`, `av` = valeur d'alignement min, `f` = dons, `o` = ID ordre. |
| `A.f` | Dons avec `n`, `e` = IDs d'effets, `g` = ID groupe. |
| `A.fe` | Effets de dons avec `d` = description. |
| `A.b` | Niveaux d'equilibre d'alignement. |
| `A.jo` | Matrice : un membre d'un alignement peut-il rejoindre un ordre ? |
| `A.at` | Matrice d'attaque : un alignement peut-il attaquer un autre ? |
| `A.g` | Matrice de gain PvP entre alignements. |

---

## `audio`

**Fichier** : `audio_<lang>_<version>.swf` — **Variables racine** : `AUMC`, `AUEC`, `AUAC`, `AUM`, `AUE`, `AUA`

| Section | Description |
|---|---|
| `AUMC` | Musiques : nom interne → ID. |
| `AUEC` | Effets sonores : nom interne → ID. |
| `AUAC` | Ambiances : nom interne → ID. |
| `AUM` | Fichiers de musique par ID. |
| `AUE` | Fichiers d'effets sonores par ID. |
| `AUA` | Fichiers d'ambiance par ID. |

---

## `classes`

**Fichier** : `classes_<lang>_<version>.swf` — **Variable racine** : `G`

Chaque classe `G[classID]` contient :

| Cle | Description |
|---|---|
| `sn` | Nom court (ex : "Feca"). |
| `ln` | Nom long (ex : "Le bouclier Feca"). |
| `d` | Description longue en HTML (lore de la classe). |
| `sd` | Description courte (une ligne, selecteur de classe). |
| `ep` | Version minimum ou cette classe est jouable. |
| `s` | Tableau des IDs de sorts de la classe (21 sorts). |
| `cc` | Profil de corps-a-corps par defaut (meme structure que les niveaux de sorts). |
| `b10`-`b15` | Tables de cout de boost par caracteristique (Force, Vitalite, Sagesse, Chance, Agilite, Intelligence). Chaque table = tableau de paliers `[seuil, cout_par_point, points_par_achat]`. |

---

## `crafts`

**Fichier** : `crafts_<lang>_<version>.swf` — **Variable racine** : `CR`

Recettes d'artisanat. Chaque entree `CR[itemID]` definit les ingredients pour fabriquer un objet.

| Cle | Description |
|---|---|
| `r` | Ingredients : `[[itemID1, quantite], [itemID2, quantite], ...]`. |
| `s` | ID de la competence utilisee. |
| `l` | Niveau requis. |

---

## `dialog`

**Fichier** : `dialog_<lang>_<version>.swf` — **Variable racine** : `D`

### `D.q` — Questions des PNJ (par ID)

Le texte que dit le PNJ quand le joueur lui parle.

### `D.a` — Reponses du joueur (par ID)

Les options de reponse cliquables affichees au joueur.

---

## `dungeons`

**Fichier** : `dungeons_<lang>_<version>.swf` — **Variable racine** : `DU`

| Cle | Description |
|---|---|
| `n` | Nom du donjon. |

---

## `effects`

**Fichier** : `effects_<lang>_<version>.swf` — **Variable racine** : `E`

Chaque effet `E[effectID]` decrit un bonus ou une action applicable a un objet ou un sort.

| Cle | Description |
|---|---|
| `d` | Modele de description (ex : `"+#1{~1~2 a }#2 Force"`). `#1`, `#2` sont remplaces par les valeurs calculees. |
| `c` | Caracteristique affectee (Force, Sagesse, Vitalite, etc.). |
| `o` | Operateur (`+` ou `-`). |
| `e` | Element d'attaque (Neutre, Feu, Eau, Terre, Air). |
| `j` | Booleen — format de des (NdM+B). |

**Variables supplementaires** : `EDMG` = IDs des effets de degats boost-ables, `EHEL` = IDs des effets de soins boost-ables.

### Decodage des effets sur les objets

Les effets sont stockes sous forme de chaine hexadecimale : `"7d#1#14##"` → ID=125, min=1, max=20. Le `PatternDecoder` remplace `#1` et `#2` dans le modele de texte.

---

## `emotes`

**Fichier** : `emotes_<lang>_<version>.swf` — **Variable racine** : `EM`

| Cle | Description |
|---|---|
| `n` | Nom de l'emote (Saluer, S'asseoir, Applaudir, etc.). |
| `s` | Raccourci chat pour declencher l'emote. |

---

## `fightChallenge`

**Fichier** : `fightChallenge_<lang>_<version>.swf` — **Variable racine** : `FC`

Defis de combat (challenges bonus en combat).

| Cle | Description |
|---|---|
| `n` | Nom du defi (ex : "Statue", "Zombie", "Versatile"). |
| `d` | Description de la condition a remplir. |

---

## `guilds`

**Fichier** : `guilds_<lang>_<version>.swf` — **Variable racine** : `GU`

Boosts de guilde par caracteristique. Les cles avec suffixe `m` = valeur max du boost.

Droits de guilde (flags binaires) : 1=Chef, 2=Boosts, 4=Droits, 8=Inviter, 16=Bannir, 32=XP general, 128=Percepteur, 256=Son XP, 512=Collecter.

---

## `hints`

**Fichier** : `hints_<lang>_<version>.swf` — **Variables racine** : `HI`, `HIC`

### `HI` — Indices de carte (liste)

| Cle | Description |
|---|---|
| `n` | Nom du point d'interet (Zaap, Banque, Forgeron, etc.). |
| `c` | ID de la categorie (reference `HIC`). |
| `m` | ID de la carte. |
| `g` | ID du pictogramme. |
| `x`, `y` | Coordonnees sur la carte du monde. |

### `HIC` — Categories d'indices (par ID)

| Cle | Description |
|---|---|
| `n` | Nom de la categorie (Transport, Commerce, Divers, etc.). |

---

## `houses`

**Fichier** : `houses_<lang>_<version>.swf` — **Variable racine** : `H`

| Section | Description |
|---|---|
| `H.h` | Maisons par ID : `n` = nom. |
| `H.m` | ID de maison par carte. |
| `H.d` | Portes par carte (cle = `c` + numero de cellule). |
| `H.ids` | Competences disponibles a l'interieur. |

Flags de partage guilde : 1=Visible, 2/4=Embleme porte, 8/16=Acces porte, 32/64=Acces coffres, 128=Teleportation.

---

## `interactiveobjects`

**Fichier** : `interactiveobjects_<lang>_<version>.swf` — **Variable racine** : `IO`

| Section | Description |
|---|---|
| `IO.g` | Correspondance GFX → ID de donnees. |
| `IO.d` | Definitions des objets interactifs par ID : `n` = nom (Arbre, Ble, Enclume, etc.). |

---

## `items`

**Fichier** : `items_<lang>_<version>.swf` — **Variable racine** : `I`

Contient la base de donnees complete de tous les objets du jeu (equipements, consommables, ressources).

### `I.u` — Objets (par ID)

Chaque objet `I.u[itemID]` possede ces champs :

| Cle | Description |
|---|---|
| `n` | Nom de l'objet. Peut etre un nombre (index dans `I.us` pour le texte reel). |
| `nn` | Nom en majuscules (utilise dans le chat et les alertes). |
| `d` | Description de l'objet. Peut aussi etre un index dans `I.us`. |
| `t` | ID du type d'objet (reference `I.t`). |
| `g` | ID du sprite graphique (GFX). |
| `l` | Niveau minimum requis pour equiper l'objet. |
| `p` | Prix de base en kamas. |
| `w` | Poids en pods. |
| `fm` | Booleen — forgemagiable (peut recevoir des runes via la forgemagie). |
| `s` | ID de panoplie (reference le fichier `itemsets`). Absent si l'objet n'appartient a aucune panoplie. |
| `c` | Conditions d'equipement (ex : `"CA>100"` = Force > 100). `&` = ET, `|` = OU. |
| `ce` | Booleen — objet ceremoniel (skin/apparence uniquement). |
| `et` | Booleen — arme etheree (se degrade a l'utilisation). |
| `tw` | Booleen — arme a deux mains (bloque le port du bouclier). |
| `ep` | Position d'equipement (emplacement sur le personnage). |
| `h` | Booleen — objet cache (invisible dans l'inventaire joueur). |
| `u` | Booleen — utilisable sur soi-meme. |
| `ut` | Booleen — utilisable sur une cible. |
| `m` | Booleen — maudit (ne peut pas etre jete ni detruit). |
| `e` | Statistiques d'arme (tableau) : `[CC bonus, cout PA, portee min, portee max, chance CC (1/N), chance EC (1/N), en ligne, ligne de vue]`. |

### `I.us` — Dictionnaire de chaines

Table de textes indexes : quand `I.u[id].n` est un nombre, le vrai texte est `I.us[ce_nombre]`.

### `I.t` — Types d'objets (par ID)

| Cle | Description |
|---|---|
| `n` | Nom du type (Amulette, Anneau, Botte, Cape, Chapeau, etc.). |
| `t` | ID du super-type (reference `I.st`). |
| `z` | Zone d'effet pour les armes (paires forme+taille). |

### `I.st` — Super-types d'objets (par ID)

Nom generique : `Equipement`, `Consommable`, `Ressource`, etc.

### `I.ss` — Emplacements par super-type

Liste des IDs d'emplacements valides pour chaque super-type.

---

## `itemsets`

**Fichier** : `itemsets_<lang>_<version>.swf` — **Variable racine** : `IS`, `ISTA`

Contient les panoplies (ensembles d'objets qui donnent des bonus quand combines).

### `IS` — Panoplies (par ID)

| Cle | Description |
|---|---|
| `n` | Nom de la panoplie (ex : "Panoplie du Bouftou"). |
| `d` | Description de la panoplie. |
| `i` | Tableau des IDs des objets qui composent la panoplie. |

### `ISTA` — Bonus de panoplie

Statistiques accordees pour chaque combinaison de pieces equipees (2 pieces, 3 pieces, etc.).

---

## `jobs`

**Fichier** : `jobs_<lang>_<version>.swf` — **Variable racine** : `J`

| Cle | Description |
|---|---|
| `n` | Nom du metier (Bucheron, Mineur, Forgeron, etc.). |
| `d` | Description du metier. |
| `g` | ID de l'icone graphique. |
| `s` | Autre specialisation liee. |

---

## `kb`

**Fichier** : `kb_<lang>_<version>.swf` — **Variables racine** : `KBC`, `KBA`, `KBD`, `KBT`

Base de connaissances / aide en jeu.

| Section | Description |
|---|---|
| `KBC` | Categories : `n` = nom. |
| `KBA` | Articles : `n` = titre, `c` = contenu. |
| `KBD` | Declencheurs (conditions pour afficher un article). |
| `KBT` | Astuces contextuelles. |

---

## `lang`

**Fichier** : `lang_<lang>_<version>.swf` — **Pas de variable racine unique**

Fichier special qui contient toutes les chaines d'interface du client : boutons, menus, messages d'erreur, dialogues systeme, etc. Ce sont des variables simples (ex : `ACCEPT = "Accepter"`, `CANCEL = "Annuler"`).

| Section | Description |
|---|---|
| `C` | Configuration par cle/valeur (parametres specifiques a la langue). |
| `CNS` | Raccourcis console par defaut. |
| `COM` | Labels des communautes de serveurs. |
| `CSR` | Liste de mots censures. |
| `ABR` | Raisons de signalement d'abus. |
| `WEIGHTS` | Catalogue des tailles de fichiers (ecran de chargement). |

---

## `maps`

**Fichier** : `maps_<lang>_<version>.swf` — **Variable racine** : `MA`

Contient les donnees geographiques : cartes, sous-zones, zones et super-zones.

### `MA.m` — Cartes (par mapID)

| Cle | Description |
|---|---|
| `x` | Coordonnee X sur la carte du monde. |
| `y` | Coordonnee Y sur la carte du monde. |
| `sa` | ID de la sous-zone (reference `MA.sa`). |
| `c` | Nombre max de joueurs en defi. |
| `t` | Nombre max de joueurs par equipe. |
| `d` | ID du donjon (si la carte en fait partie). |

### `MA.sa` — Sous-zones (par ID)

| Cle | Description |
|---|---|
| `n` | Nom de la sous-zone (ex : "Coin des Bouftous"). |
| `a` | ID de la zone parente (reference `MA.a`). |
| `m` | Musiques associees. |

### `MA.a` — Zones (par ID)

| Cle | Description |
|---|---|
| `n` | Nom de la zone (ex : "Amakna"). |
| `sua` | ID de la super-zone parente (reference `MA.sua`). |

### `MA.sua` — Super-zones (par ID)

| Cle | Description |
|---|---|
| `n` | Nom de la super-zone (ex : "Monde des Douze"). |

---

## `monsters`

**Fichier** : `monsters_<lang>_<version>.swf` — **Variables racine** : `M`, `MR`, `MSR`

### `M` — Monstres (par ID)

| Cle | Description |
|---|---|
| `n` | Nom du monstre. |
| `b` | Categorie (ex : 78 = Boss). |
| `k` | Booleen — peut etre expulse d'un groupe de monstres. |
| `a` | Alignement (Bonta, Brakmar, Neutre). |
| `g1` a `g5` | Stats par grade. Chaque grade contient `l` (niveau) et `r` (resistances par element). |

### `MR` — Races de monstres (par ID)

| Cle | Description |
|---|---|
| `n` | Nom de la race (Bouftou, Tofu, Chafer, etc.). |

### `MSR` — Super-races de monstres (par ID)

| Cle | Description |
|---|---|
| `n` | Nom de la super-race. |

---

## `names`

**Fichier** : `names_<lang>_<version>.swf` — **Variable racine** : `NF`

| Section | Description |
|---|---|
| `NF.n` | Noms de famille (par ID). |
| `NF.f` | Prenoms (par ID). |

Utilise pour generer des noms de personnages aleatoires.

---

## `npc`

**Fichier** : `npc_<lang>_<version>.swf` — **Variable racine** : `N`

### `N.d` — PNJ (par ID)

| Cle | Description |
|---|---|
| `n` | Nom du PNJ (ex : "Otomai"). |
| `a` | Tableau des IDs d'actions disponibles sur ce PNJ. |

### `N.a` — Actions des PNJ (par ID)

Texte des actions : 1 = Echanger, 3 = Discuter, 4/5/6 = Acheter/Vendre.

---

## `pvp`

**Fichier** : `pvp_<lang>_<version>.swf` — **Variable racine** : `PP`

| Section | Description |
|---|---|
| `PP.hp` | Bornes de points d'honneur par grade. |
| `PP.maxdp` | Points de deshonneur maximum. |
| `PP.grds` | Grades par camp d'alignement. Chaque grade : `nl` = nom long, `nc` = nom court. |

---

## `quests`

**Fichier** : `quests_<lang>_<version>.swf` — **Variable racine** : `Q`

Systeme de quetes structure en 3 niveaux : Quetes > Etapes > Objectifs.

### `Q.q` — Quetes (par ID)

Nom de la quete. Les flags `isAccountQuest` et `isRepeatableQuest` sont geres cote serveur.

### `Q.s` — Etapes (par ID)

| Cle | Description |
|---|---|
| `n` | Nom de l'etape. |
| `d` | Description de l'etape. |
| `r` | Recompenses : `r[0]` = XP, `r[1]` = Kamas, `r[2]` = Objets `[[itemID, qte], ...]`, `r[3]` = Emotes, `r[4]` = Metiers, `r[5]` = Sorts. |

### `Q.o` — Objectifs (par ID)

| Cle | Description |
|---|---|
| `t` | ID du type d'objectif (reference `Q.t`). |
| `p` | Parametres selon le type. |
| `x`, `y` | Coordonnees pour la boussole (si applicable). |

### `Q.t` — Types d'objectifs (par ID)

Texte-modele de l'objectif. Types : 0/4 = texte libre, 1/9/10 = parler a un PNJ, 2/3 = livrer des objets, 5 = decouvrir une zone, 6/7 = tuer des monstres, 8 = utiliser un objet, 12 = escorter/vaincre.

---

## `ranks`

**Fichier** : `ranks_<lang>_<version>.swf` — **Variable racine** : `R`

Rangs de guilde par ID : `n` = nom du rang (Apprenti, Bras droit, Chef, etc.).

---

## `rides`

**Fichier** : `rides_<lang>_<version>.swf` — **Variables racine** : `RI`, `RIA`

### `RI` — Montures (par ID)

| Cle | Description |
|---|---|
| `n` | Nom du modele de monture. |
| `g` | ID du sprite graphique. |
| `c1`, `c2`, `c3` | Couleurs par defaut (primaire, secondaire, tertiaire). |

### `RIA` — Capacites de montures (par ID)

| Cle | Description |
|---|---|
| `n` | Nom de la capacite (ex : Cameleon = capacite 9). |

---

## `scripts`

**Fichier** : `scripts_<lang>_<version>.swf` — **Variable racine** : `SCR`

Textes des tutoriels et dialogues scriptes. Chaque `SCR[id]` = texte.

---

## `servers`

**Fichier** : `servers_<lang>_<version>.swf` — **Variables racine** : `SR`, `SRP`, `SRPW`, `SRC`, `SRVT`, `SRVC`

| Section | Description |
|---|---|
| `SR` | Serveurs par ID : `n` = nom, `d` = description. |
| `SRP` | Labels de population (Faible, Moyen, Eleve, Complet). |
| `SRPW` | Poids de population par ID. |
| `SRC` | Communautes de serveurs : `n` = nom interne, `d` = nom affiche. |
| `SRVT` | Templates de texte serveur : `l` = label de reference, `d` = valeur par defaut. |
| `SRVC` | Surcharges de texte par serveur (cle = textID|serverID). |

Types de serveurs (`t`) : 0 = Classique, 1 = Hardcore, 3 = 1.29, 4 = Retro, 5 = Mono-compte, 6 = Temporis.

---

## `shortcuts`

**Fichier** : `shortcuts_<lang>_<version>.swf` — **Variables racine** : `SSC`, `SH`, `SST`, `SSK`

| Section | Description |
|---|---|
| `SSC` | Categories de raccourcis (par ID). |
| `SH` | Raccourcis (par ID). |
| `SST` | Ensembles de raccourcis. |
| `SSK` | Touches clavier (cle = setID|raccourci). |

---

## `skills`

**Fichier** : `skills_<lang>_<version>.swf` — **Variable racine** : `SK`

Chaque competence `SK[skillID]` represente une action interactive (recolter, forger, etc.).

| Cle | Description |
|---|---|
| `d` | Nom/description de la competence. |
| `j` | ID du metier associe (reference `jobs`). |
| `c` | Conditions d'utilisation. |
| `i` | ID de l'objet recolte ou fabrique. |
| `io` | ID de l'objet interactif associe (arbre, enclume, etc.). |
| `cl` | Liste des IDs d'objets que cette competence peut creer. |
| `f` | Niveau de forgemagie requis. |

---

## `speakingitems`

**Fichier** : `speakingitems_<lang>_<version>.swf` — **Variables racine** : `SIM`, `SIT`

Objets parlants (familiers et objets vivants qui affichent des messages).

| Section | Description |
|---|---|
| `SIM` | Messages par ID (ce que l'objet dit). |
| `SIT` | Declencheurs par ID (quand l'objet parle). |

---

## `spells`

**Fichier** : `spells_<lang>_<version>.swf` — **Variable racine** : `S`

Contient tous les sorts du jeu. Chaque sort `S[spellID]` a des metadonnees globales et 6 niveaux (`l1` a `l6`).

### Metadonnees du sort

| Cle | Description |
|---|---|
| `n` | Nom du sort. |
| `d` | Description du sort. |
| `i` | ID de l'icone graphique. |
| `b` | ID de la classe qui possede le sort. |
| `c` | Categorie (1=Commun, 2=Rare, 3=Epique, 4=Legendaire). |
| `t` | Type de sort. |
| `o` | Origine du sort. |
| `p` | Booleen — sort passif. |
| `g` | Booleen — le cooldown affecte toute l'equipe. |

### Niveaux `l1` a `l6` — Tableau de 21 valeurs

| Index | Description |
|---|---|
| `0` | Effets sur coup normal (tableau de chaines d'effets). |
| `1` | Effets sur coup critique (tableau de chaines d'effets). |
| `2` | Cout en PA (Points d'Action). |
| `3` | Portee minimale. |
| `4` | Portee maximale. |
| `5` | Chance de coup critique (1 chance sur N). |
| `6` | Chance d'echec critique (1 chance sur N). |
| `7` | Booleen — lancer en ligne droite uniquement. |
| `8` | Booleen — necessite une ligne de vue. |
| `9` | Booleen — doit viser une case vide. |
| `10` | Booleen — la portee peut etre augmentee par les stats. |
| `11` | ID de classe requise (0 = aucune restriction). |
| `12` | Nombre max de lancers par tour. |
| `13` | Nombre max de lancers par tour par cible. |
| `14` | Cooldown (tours d'attente entre deux utilisations). |
| `15` | Zones d'effet codees (decodage via `ank.utils.Compressor.decode64()`). |
| `16` | Etats requis pour lancer (tableau d'IDs d'etats). |
| `17` | Etats interdisant le lancer (tableau d'IDs d'etats). |
| `18` | Niveau de personnage minimum pour ce palier du sort. |
| `19` | Booleen — un echec critique met fin au tour. |
| `20` | ID interne du niveau de sort. |

---

## `states`

**Fichier** : `states_<lang>_<version>.swf` — **Variable racine** : `ST`

Etats de combat par ID. Chaque etat `ST[stateID]` contient `n` = nom de l'etat.

Ces etats modifient les stats en temps reel (resistances, degats). Exemples Temporis : `STATE_TEMPORIS_1_NEW_SRAM`, `STATE_TEMPORIS_1_NEW_PANDAWA`.

---

## `subtitles`

**Fichier** : `subtitles_<lang>_<version>.swf` — **Variable racine** : `SUB`

Sous-titres des cinematiques/trailers. Chaque `SUB[trailerID]` = tableau de lignes de sous-titres.

---

## `timezones`

**Fichier** : `timezones_<lang>_<version>.swf` — **Variable racine** : `T`

Labels des fuseaux horaires par ID.

---

## `tips`

**Fichier** : `tips_<lang>_<version>.swf` — **Variable racine** : `TI`

Astuces affichees sur l'ecran de chargement. Chaque `TI[id]` = texte de l'astuce.

---

## `titles`

**Fichier** : `titles_<lang>_<version>.swf` — **Variable racine** : `PT`

| Cle | Description |
|---|---|
| `t` | Texte du titre (peut contenir `%1` remplace par un nom de monstre). |
| `c` | Couleur du titre (valeur RGB en entier). |
| `pt` | Type : 0 = texte brut, 1 = nom de monstre injecte dans `%1`. |

---

## Annexes techniques

### Systeme de chaines indexees (`fetchString`)

Pour economiser de la memoire, beaucoup de noms/descriptions ne sont pas stockes en texte brut mais comme un numero. Le client appelle `fetchString(numero)` qui cherche dans `I.us[numero]`. Si le texte contient des tokens serveur (`SRVT:12`), ils sont remplaces par le nom local du serveur.

### Decodage des effets d'objets

Les effets sont transmis en hexadecimal : `"7d#1#14##"`. Le client split par `#`, convertit en decimal (7d=125, 1=1, 14=20), cherche le modele de texte dans `E[125]`, et remplace `#1`/`#2` par les valeurs. Les blocs `{~1~2 ...}` sont conditionnels (affiches uniquement si les parametres existent).

### Protocole reseau (AKS)

Chaque paquet entrant/sortant commence par 1-2 lettres : `H` = Connexion, `A` = Compte, `c` = Chat, `D` = Dialogues PNJ, `S` = Sorts, `O` = Inventaire, `J` = Metiers, `E` = Echanges, `g` = Guildes, `W` = Zaaps, `Q` = Quetes, `R` = Montures, `P` = Groupe, `GA` = Actions de combat.

---

*Documentation generee par retro-ingenierie du client ActionScript 2 de Dofus 1.29.*
