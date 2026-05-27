# Documentation — Lang SWF Files Dofus 1.29

> Technical reference for each `lang/swf/*.swf` file of the Dofus 1.29 client (AS2).
> Each section corresponds to a file type editable in the editor.


---

---

## `alignment`

**File**: `alignment_<lang>_<version>.swf` — **Root variable**: `A`

| Section | Description |
|---|---|
| `A.a` | Alignments (Bonta, Brakmar, Neutral, Mercenary) with `n` = name. |
| `A.o` | Alignment orders with `n` = name, `a` = parent alignment ID. |
| `A.s` | Specializations with `n`, `d`, `av` = minimum alignment value, `f` = gifts, `o` = order ID. |
| `A.f` | Gifts with `n`, `e` = effect IDs, `g` = group ID. |
| `A.fe` | Gift effects with `d` = description. |
| `A.b` | Alignment balance levels. |
| `A.jo` | Matrix: can a member of an alignment join an order? |
| `A.at` | Attack matrix: can one alignment attack another? |
| `A.g` | PvP gain matrix between alignments. |

---

## `audio`

**File**: `audio_<lang>_<version>.swf` — **Root variables**: `AUMC`, `AUEC`, `AUAC`, `AUM`, `AUE`, `AUA`

| Section | Description |
|---|---|
| `AUMC` | Music tracks: internal name → ID. |
| `AUEC` | Sound effects: internal name → ID. |
| `AUAC` | Ambient sounds: internal name → ID. |
| `AUM` | Music files by ID. |
| `AUE` | Sound effect files by ID. |
| `AUA` | Ambient sound files by ID. |

---

## `classes`

**File**: `classes_<lang>_<version>.swf` — **Root variable**: `G`

Each class `G[classID]` contains:

| Key | Description |
|---|---|
| `sn` | Short name (e.g. "Feca"). |
| `ln` | Long name (e.g. "The Feca Shield"). |
| `d` | Long HTML description (class lore). |
| `sd` | Short description (one line, class selector). |
| `ep` | Minimum version where this class is playable. |
| `s` | Array of the class spell IDs (21 spells). |
| `cc` | Default close-combat profile (same structure as spell levels). |
| `b10`-`b15` | Boost cost tables per characteristic (Strength, Vitality, Wisdom, Chance, Agility, Intelligence). Each table = array of thresholds `[threshold, cost_per_point, points_per_purchase]`. |

---

## `crafts`

**File**: `crafts_<lang>_<version>.swf` — **Root variable**: `CR`

Crafting recipes. Each entry `CR[itemID]` defines the ingredients to craft an item.

| Key | Description |
|---|---|
| `r` | Ingredients: `[[itemID1, quantity], [itemID2, quantity], ...]`. |
| `s` | ID of the skill used. |
| `l` | Required level. |

---

## `dialog`

**File**: `dialog_<lang>_<version>.swf` — **Root variable**: `D`

### `D.q` — NPC questions (by ID)

The text the NPC says when the player talks to them.

### `D.a` — Player answers (by ID)

The clickable reply options displayed to the player.

---

## `dungeons`

**File**: `dungeons_<lang>_<version>.swf` — **Root variable**: `DU`

| Key | Description |
|---|---|
| `n` | Dungeon name. |

---

## `effects`

**File**: `effects_<lang>_<version>.swf` — **Root variable**: `E`

Each effect `E[effectID]` describes a bonus or action applicable to an item or spell.

| Key | Description |
|---|---|
| `d` | Description template (e.g. `"+#1{~1~2 to }#2 Strength"`). `#1`, `#2` are replaced by the computed values. |
| `c` | Affected characteristic (Strength, Wisdom, Vitality, etc.). |
| `o` | Operator (`+` or `-`). |
| `e` | Attack element (Neutral, Fire, Water, Earth, Air). |
| `j` | Boolean — dice format (NdM+B). |

**Additional variables**: `EDMG` = IDs of boost-able damage effects, `EHEL` = IDs of boost-able healing effects.

### Item effect decoding

Effects are stored as a hexadecimal string: `"7d#1#14##"` → ID=125, min=1, max=20. The `PatternDecoder` replaces `#1` and `#2` in the text template.

---

## `emotes`

**File**: `emotes_<lang>_<version>.swf` — **Root variable**: `EM`

| Key | Description |
|---|---|
| `n` | Emote name (Greet, Sit, Applaud, etc.). |
| `s` | Chat shortcut to trigger the emote. |

---

## `fightChallenge`

**File**: `fightChallenge_<lang>_<version>.swf` — **Root variable**: `FC`

Combat challenges (bonus challenges during fights).

| Key | Description |
|---|---|
| `n` | Challenge name (e.g. "Statue", "Zombie", "Versatile"). |
| `d` | Description of the condition to fulfill. |

---

## `guilds`

**File**: `guilds_<lang>_<version>.swf` — **Root variable**: `GU`

Guild boosts per characteristic. Keys with suffix `m` = maximum boost value.

Guild rights (binary flags): 1=Leader, 2=Boosts, 4=Rights, 8=Invite, 16=Ban, 32=General XP, 128=Collector, 256=Own XP, 512=Collect.

---

## `hints`

**File**: `hints_<lang>_<version>.swf` — **Root variables**: `HI`, `HIC`

### `HI` — Map hints (list)

| Key | Description |
|---|---|
| `n` | Point of interest name (Zaap, Bank, Blacksmith, etc.). |
| `c` | Category ID (references `HIC`). |
| `m` | Map ID. |
| `g` | Pictogram ID. |
| `x`, `y` | Coordinates on the world map. |

### `HIC` — Hint categories (by ID)

| Key | Description |
|---|---|
| `n` | Category name (Transport, Commerce, Miscellaneous, etc.). |

---

## `houses`

**File**: `houses_<lang>_<version>.swf` — **Root variable**: `H`

| Section | Description |
|---|---|
| `H.h` | Houses by ID: `n` = name. |
| `H.m` | House ID by map. |
| `H.d` | Doors by map (key = `c` + cell number). |
| `H.ids` | Skills available inside. |

Guild sharing flags: 1=Visible, 2/4=Door emblem, 8/16=Door access, 32/64=Chest access, 128=Teleportation.

---

## `interactiveobjects`

**File**: `interactiveobjects_<lang>_<version>.swf` — **Root variable**: `IO`

| Section | Description |
|---|---|
| `IO.g` | GFX → data ID mapping. |
| `IO.d` | Interactive object definitions by ID: `n` = name (Tree, Wheat, Anvil, etc.). |

---

## `items`

**File**: `items_<lang>_<version>.swf` — **Root variable**: `I`

Contains the complete database of all game items (equipment, consumables, resources).

### `I.u` — Items (by ID)

Each item `I.u[itemID]` has these fields:

| Key | Description |
|---|---|
| `n` | Item name. Can be a number (index into `I.us` for the actual text). |
| `nn` | Name in uppercase (used in chat and alerts). |
| `d` | Item description. Can also be an index into `I.us`. |
| `t` | Item type ID (references `I.t`). |
| `g` | Graphic sprite ID (GFX). |
| `l` | Minimum level required to equip the item. |
| `p` | Base price in kamas. |
| `w` | Weight in pods. |
| `fm` | Boolean — smithmageable (can receive runes via smithmagic). |
| `s` | Item set ID (references the `itemsets` file). Absent if the item does not belong to any set. |
| `c` | Equipment conditions (e.g. `"CA>100"` = Strength > 100). `&` = AND, `|` = OR. |
| `ce` | Boolean — ceremonial item (skin/appearance only). |
| `et` | Boolean — ethereal weapon (degrades on use). |
| `tw` | Boolean — two-handed weapon (prevents carrying a shield). |
| `ep` | Equipment position (slot on the character). |
| `h` | Boolean — hidden item (invisible in the player inventory). |
| `u` | Boolean — usable on self. |
| `ut` | Boolean — usable on a target. |
| `m` | Boolean — cursed (cannot be dropped or destroyed). |
| `e` | Weapon stats (array): `[CC bonus, AP cost, min range, max range, CC chance (1/N), EC chance (1/N), in-line, line of sight]`. |

### `I.us` — String dictionary

Indexed text table: when `I.u[id].n` is a number, the actual text is `I.us[that_number]`.

### `I.t` — Item types (by ID)

| Key | Description |
|---|---|
| `n` | Type name (Amulet, Ring, Boot, Cape, Hat, etc.). |
| `t` | Super-type ID (references `I.st`). |
| `z` | Effect zone for weapons (shape+size pairs). |

### `I.st` — Item super-types (by ID)

Generic name: `Equipment`, `Consumable`, `Resource`, etc.

### `I.ss` — Slots by super-type

List of valid slot IDs for each super-type.

---

## `itemsets`

**File**: `itemsets_<lang>_<version>.swf` — **Root variables**: `IS`, `ISTA`

Contains item sets (groups of items that grant bonuses when combined).

### `IS` — Item sets (by ID)

| Key | Description |
|---|---|
| `n` | Item set name (e.g. "Bouftou Set"). |
| `d` | Item set description. |
| `i` | Array of IDs of items that make up the set. |

### `ISTA` — Set bonuses

Statistics granted for each combination of equipped pieces (2 pieces, 3 pieces, etc.).

---

## `jobs`

**File**: `jobs_<lang>_<version>.swf` — **Root variable**: `J`

| Key | Description |
|---|---|
| `n` | Job name (Lumberjack, Miner, Blacksmith, etc.). |
| `d` | Job description. |
| `g` | Graphic icon ID. |
| `s` | Related other specialization. |

---

## `kb`

**File**: `kb_<lang>_<version>.swf` — **Root variables**: `KBC`, `KBA`, `KBD`, `KBT`

Knowledge base / in-game help.

| Section | Description |
|---|---|
| `KBC` | Categories: `n` = name. |
| `KBA` | Articles: `n` = title, `c` = content. |
| `KBD` | Triggers (conditions to display an article). |
| `KBT` | Contextual tips. |

---

## `lang`

**File**: `lang_<lang>_<version>.swf` — **No single root variable**

Special file that contains all the client interface strings: buttons, menus, error messages, system dialogs, etc. These are simple variables (e.g. `ACCEPT = "Accept"`, `CANCEL = "Cancel"`).

| Section | Description |
|---|---|
| `C` | Key/value configuration (language-specific parameters). |
| `CNS` | Default console shortcuts. |
| `COM` | Server community labels. |
| `CSR` | List of censored words. |
| `ABR` | Abuse report reasons. |
| `WEIGHTS` | File size catalog (loading screen). |

---

## `maps`

**File**: `maps_<lang>_<version>.swf` — **Root variable**: `MA`

Contains geographic data: maps, sub-areas, areas, and super-areas.

### `MA.m` — Maps (by mapID)

| Key | Description |
|---|---|
| `x` | X coordinate on the world map. |
| `y` | Y coordinate on the world map. |
| `sa` | Sub-area ID (references `MA.sa`). |
| `c` | Maximum number of players in a challenge. |
| `t` | Maximum number of players per team. |
| `d` | Dungeon ID (if the map is part of one). |

### `MA.sa` — Sub-areas (by ID)

| Key | Description |
|---|---|
| `n` | Sub-area name (e.g. "Bouftou Corner"). |
| `a` | Parent area ID (references `MA.a`). |
| `m` | Associated music tracks. |

### `MA.a` — Areas (by ID)

| Key | Description |
|---|---|
| `n` | Area name (e.g. "Amakna"). |
| `sua` | Parent super-area ID (references `MA.sua`). |

### `MA.sua` — Super-areas (by ID)

| Key | Description |
|---|---|
| `n` | Super-area name (e.g. "World of Twelve"). |

---

## `monsters`

**File**: `monsters_<lang>_<version>.swf` — **Root variables**: `M`, `MR`, `MSR`

### `M` — Monsters (by ID)

| Key | Description |
|---|---|
| `n` | Monster name. |
| `b` | Category (e.g. 78 = Boss). |
| `k` | Boolean — can be expelled from a monster group. |
| `a` | Alignment (Bonta, Brakmar, Neutral). |
| `g1` to `g5` | Stats per grade. Each grade contains `l` (level) and `r` (resistances per element). |

### `MR` — Monster races (by ID)

| Key | Description |
|---|---|
| `n` | Race name (Bouftou, Tofu, Chafer, etc.). |

### `MSR` — Monster super-races (by ID)

| Key | Description |
|---|---|
| `n` | Super-race name. |

---

## `names`

**File**: `names_<lang>_<version>.swf` — **Root variable**: `NF`

| Section | Description |
|---|---|
| `NF.n` | Family names (by ID). |
| `NF.f` | First names (by ID). |

Used to generate random character names.

---

## `npc`

**File**: `npc_<lang>_<version>.swf` — **Root variable**: `N`

### `N.d` — NPCs (by ID)

| Key | Description |
|---|---|
| `n` | NPC name (e.g. "Otomai"). |
| `a` | Array of available action IDs on this NPC. |

### `N.a` — NPC actions (by ID)

Action text: 1 = Trade, 3 = Talk, 4/5/6 = Buy/Sell.

---

## `pvp`

**File**: `pvp_<lang>_<version>.swf` — **Root variable**: `PP`

| Section | Description |
|---|---|
| `PP.hp` | Honor point bounds per grade. |
| `PP.maxdp` | Maximum dishonor points. |
| `PP.grds` | Grades per alignment faction. Each grade: `nl` = long name, `nc` = short name. |

---

## `quests`

**File**: `quests_<lang>_<version>.swf` — **Root variable**: `Q`

Quest system structured in 3 levels: Quests > Steps > Objectives.

### `Q.q` — Quests (by ID)

Quest name. The `isAccountQuest` and `isRepeatableQuest` flags are handled server-side.

### `Q.s` — Steps (by ID)

| Key | Description |
|---|---|
| `n` | Step name. |
| `d` | Step description. |
| `r` | Rewards: `r[0]` = XP, `r[1]` = Kamas, `r[2]` = Items `[[itemID, qty], ...]`, `r[3]` = Emotes, `r[4]` = Jobs, `r[5]` = Spells. |

### `Q.o` — Objectives (by ID)

| Key | Description |
|---|---|
| `t` | Objective type ID (references `Q.t`). |
| `p` | Parameters depending on the type. |
| `x`, `y` | Coordinates for the compass (if applicable). |

### `Q.t` — Objective types (by ID)

Objective text template. Types: 0/4 = free text, 1/9/10 = talk to an NPC, 2/3 = deliver items, 5 = discover an area, 6/7 = kill monsters, 8 = use an item, 12 = escort/defeat.

---

## `ranks`

**File**: `ranks_<lang>_<version>.swf` — **Root variable**: `R`

Guild ranks by ID: `n` = rank name (Apprentice, Right-hand, Leader, etc.).

---

## `rides`

**File**: `rides_<lang>_<version>.swf` — **Root variables**: `RI`, `RIA`

### `RI` — Mounts (by ID)

| Key | Description |
|---|---|
| `n` | Mount model name. |
| `g` | Graphic sprite ID. |
| `c1`, `c2`, `c3` | Default colors (primary, secondary, tertiary). |

### `RIA` — Mount abilities (by ID)

| Key | Description |
|---|---|
| `n` | Ability name (e.g. Chameleon = ability 9). |

---

## `scripts`

**File**: `scripts_<lang>_<version>.swf` — **Root variable**: `SCR`

Tutorial texts and scripted dialogs. Each `SCR[id]` = text.

---

## `servers`

**File**: `servers_<lang>_<version>.swf` — **Root variables**: `SR`, `SRP`, `SRPW`, `SRC`, `SRVT`, `SRVC`

| Section | Description |
|---|---|
| `SR` | Servers by ID: `n` = name, `d` = description. |
| `SRP` | Population labels (Low, Medium, High, Full). |
| `SRPW` | Population weights by ID. |
| `SRC` | Server communities: `n` = internal name, `d` = displayed name. |
| `SRVT` | Server text templates: `l` = reference label, `d` = default value. |
| `SRVC` | Text overrides per server (key = textID|serverID). |

Server types (`t`): 0 = Classic, 1 = Hardcore, 3 = 1.29, 4 = Retro, 5 = Mono-account, 6 = Temporis.

---

## `shortcuts`

**File**: `shortcuts_<lang>_<version>.swf` — **Root variables**: `SSC`, `SH`, `SST`, `SSK`

| Section | Description |
|---|---|
| `SSC` | Shortcut categories (by ID). |
| `SH` | Shortcuts (by ID). |
| `SST` | Shortcut sets. |
| `SSK` | Keyboard keys (key = setID|shortcut). |

---

## `skills`

**File**: `skills_<lang>_<version>.swf` — **Root variable**: `SK`

Each skill `SK[skillID]` represents an interactive action (harvest, forge, etc.).

| Key | Description |
|---|---|
| `d` | Skill name/description. |
| `j` | Associated job ID (references `jobs`). |
| `c` | Usage conditions. |
| `i` | ID of the harvested or crafted item. |
| `io` | ID of the associated interactive object (tree, anvil, etc.). |
| `cl` | List of item IDs this skill can create. |
| `f` | Required smithmagic level. |

---

## `speakingitems`

**File**: `speakingitems_<lang>_<version>.swf` — **Root variables**: `SIM`, `SIT`

Speaking items (familiars and living items that display messages).

| Section | Description |
|---|---|
| `SIM` | Messages by ID (what the item says). |
| `SIT` | Triggers by ID (when the item speaks). |

---

## `spells`

**File**: `spells_<lang>_<version>.swf` — **Root variable**: `S`

Contains all game spells. Each spell `S[spellID]` has global metadata and 6 levels (`l1` to `l6`).

### Spell metadata

| Key | Description |
|---|---|
| `n` | Spell name. |
| `d` | Spell description. |
| `i` | Graphic icon ID. |
| `b` | ID of the class that owns the spell. |
| `c` | Category (1=Common, 2=Rare, 3=Epic, 4=Legendary). |
| `t` | Spell type. |
| `o` | Spell origin. |
| `p` | Boolean — passive spell. |
| `g` | Boolean — cooldown affects the entire team. |

### Levels `l1` to `l6` — Array of 21 values

| Index | Description |
|---|---|
| `0` | Effects on normal hit (array of effect strings). |
| `1` | Effects on critical hit (array of effect strings). |
| `2` | AP cost (Action Points). |
| `3` | Minimum range. |
| `4` | Maximum range. |
| `5` | Critical hit chance (1 in N). |
| `6` | Critical failure chance (1 in N). |
| `7` | Boolean — straight-line cast only. |
| `8` | Boolean — requires line of sight. |
| `9` | Boolean — must target an empty cell. |
| `10` | Boolean — range can be increased by stats. |
| `11` | Required class ID (0 = no restriction). |
| `12` | Maximum casts per turn. |
| `13` | Maximum casts per turn per target. |
| `14` | Cooldown (turns to wait between uses). |
| `15` | Encoded effect zones (decoded via `ank.utils.Compressor.decode64()`). |
| `16` | States required to cast (array of state IDs). |
| `17` | States preventing the cast (array of state IDs). |
| `18` | Minimum character level for this spell tier. |
| `19` | Boolean — a critical failure ends the turn. |
| `20` | Internal spell level ID. |

---

## `states`

**File**: `states_<lang>_<version>.swf` — **Root variable**: `ST`

Combat states by ID. Each state `ST[stateID]` contains `n` = state name.

These states modify stats in real time (resistances, damage). Temporis examples: `STATE_TEMPORIS_1_NEW_SRAM`, `STATE_TEMPORIS_1_NEW_PANDAWA`.

---

## `subtitles`

**File**: `subtitles_<lang>_<version>.swf` — **Root variable**: `SUB`

Cinematic/trailer subtitles. Each `SUB[trailerID]` = array of subtitle lines.

---

## `timezones`

**File**: `timezones_<lang>_<version>.swf` — **Root variable**: `T`

Time zone labels by ID.

---

## `tips`

**File**: `tips_<lang>_<version>.swf` — **Root variable**: `TI`

Tips displayed on the loading screen. Each `TI[id]` = tip text.

---

## `titles`

**File**: `titles_<lang>_<version>.swf` — **Root variable**: `PT`

| Key | Description |
|---|---|
| `t` | Title text (may contain `%1` replaced by a monster name). |
| `c` | Title color (RGB value as integer). |
| `pt` | Type: 0 = plain text, 1 = monster name injected into `%1`. |

---

## Technical appendix

### Indexed string system (`fetchString`)

To save memory, many names/descriptions are not stored as plain text but as a number. The client calls `fetchString(number)` which looks up `I.us[number]`. If the text contains server tokens (`SRVT:12`), they are replaced by the local server name.

### Item effect decoding

Effects are transmitted in hexadecimal: `"7d#1#14##"`. The client splits by `#`, converts to decimal (7d=125, 1=1, 14=20), looks up the text template in `E[125]`, and replaces `#1`/`#2` with the values. The `{~1~2 ...}` blocks are conditional (displayed only if the parameters exist).

### Network protocol (AKS)

Each incoming/outgoing packet starts with 1-2 letters: `H` = Connection, `A` = Account, `c` = Chat, `D` = NPC Dialogs, `S` = Spells, `O` = Inventory, `J` = Jobs, `E` = Exchanges, `g` = Guilds, `W` = Zaaps, `Q` = Quests, `R` = Mounts, `P` = Group, `GA` = Combat actions.

---

*Documentation generated by reverse engineering the ActionScript 2 client of Dofus 1.29.*
