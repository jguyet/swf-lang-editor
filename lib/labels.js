/**
 * Per-file-type field glossary, reverse-engineered from the Dofus 1.29 AS2
 * client classes (`Kisin/lkisin.swf`, `dofus.utils.DofusTranslator` and the
 * `dofus.datacenter.*` classes).
 *
 * Each file type maps a list of patterns. A pattern is a path matched against
 * the JSON tree of the parsed AS2; numeric/string indices are matched by `*`.
 *
 *   {pattern: 'A.a',          label: 'Alignments'}
 *   {pattern: 'A.a.*',        label: 'Alignment',     plural: false}
 *   {pattern: 'A.a.*.n',      label: 'Name'}
 *
 * Lookup walks the path and returns the longest matching pattern.
 */

const ALIGNMENT = {
  A: 'Alignment data',
  'A.a': 'Alignments (by ID)',
  'A.a.*': 'Alignment',
  'A.a.*.n': 'Name',
  'A.a.*.c': 'Can be chosen by player',
  'A.o': 'Orders (by ID)',
  'A.o.*': 'Order',
  'A.o.*.n': 'Name',
  'A.o.*.a': 'Parent alignment ID',
  'A.s': 'Specializations (by ID)',
  'A.s.*': 'Specialization',
  'A.s.*.n': 'Name',
  'A.s.*.d': 'Description',
  'A.s.*.av': 'Minimum alignment value',
  'A.s.*.f': 'Feat IDs unlocked',
  'A.s.*.o': 'Order ID',
  'A.f': 'Feats (by ID)',
  'A.f.*': 'Feat',
  'A.f.*.n': 'Name',
  'A.f.*.e': 'Feat effect IDs',
  'A.f.*.g': 'Sub-feat / group ID',
  'A.fe': 'Feat effects (by ID)',
  'A.fe.*': 'Feat effect',
  'A.fe.*.d': 'Effect description template',
  'A.b': 'Alignment balance levels',
  'A.b.*': 'Balance level entry',
  'A.b.*.n': 'Name',
  'A.b.*.d': 'Description',
  'A.jo': 'Join-order matrix [alignment][order]',
  'A.jo.*': 'Per-alignment row',
  'A.jo.*.*': 'Can member of alignment join this order',
  'A.at': 'Attack matrix [alignment A][alignment B]',
  'A.at.*': 'Per-alignment row',
  'A.at.*.*': 'Can A attack B',
  'A.g': 'PvP-gain view matrix [alignment A][alignment B]',
  'A.g.*': 'Per-alignment row',
  'A.g.*.*': 'Can A see PvP gain from B',
};

const ITEMS = {
  I: 'Items database',
  'I.u': 'Item templates (by ID)',
  'I.u.*': 'Item template',
  'I.u.*.n': 'Name (pattern, decoded via I.us)',
  'I.u.*.d': 'Description (pattern, decoded via I.us)',
  'I.u.*.t': 'Type ID (see I.t)',
  'I.u.*.l': 'Level',
  'I.u.*.g': 'GFX / icon ID',
  'I.u.*.p': 'Base price (in kamas)',
  'I.u.*.w': 'Weight (in pods)',
  'I.u.*.s': 'Item set ID (if any)',
  'I.u.*.u': 'Use script ID (item is usable)',
  'I.u.*.ut': 'Targeted-use script ID',
  'I.u.*.fm': 'Forgemagable (smithmagic enhanceable)',
  'I.u.*.tw': 'Two-handed weapon',
  'I.u.*.et': 'Ethereal (degrades on use)',
  'I.u.*.h': 'Hidden (not shown to player)',
  'I.u.*.m': 'Cursed (cannot be dropped/destroyed)',
  'I.u.*.c': 'Usage conditions (pattern string, & = AND / | = OR)',
  'I.u.*.ep': 'Minimum regional/episodic version required',
  'I.u.*.e': 'Weapon stats (only for weapons)',
  'I.u.*.e.0': 'Critical hit bonus damage',
  'I.u.*.e.1': 'AP cost',
  'I.u.*.e.2': 'Range min',
  'I.u.*.e.3': 'Range max',
  'I.u.*.e.4': 'Critical hit chance (1 in N)',
  'I.u.*.e.5': 'Critical failure chance (1 in N)',
  'I.u.*.e.6': 'Line only (boolean)',
  'I.u.*.e.7': 'Line of sight required (boolean)',
  'I.us': 'Unic string dictionary (pattern decoder)',
  'I.us.*': 'Dictionary entry',
  'I.t': 'Item types (by ID)',
  'I.t.*': 'Item type',
  'I.t.*.n': 'Name',
  'I.t.*.t': 'Super-type ID (see I.st)',
  'I.t.*.z': 'Effect zone (shape+size pairs, used for weapons)',
  'I.st': 'Item super-types (by ID)',
  'I.st.*': 'Super-type label',
  'I.ss': 'Slot map per super-type',
  'I.ss.*': 'Slot IDs for super-type',
};

const ITEMSETS = {
  IS: 'Item sets (by ID)',
  'IS.*': 'Item set',
  'IS.*.n': 'Name',
  'IS.*.d': 'Description',
  'IS.*.i': 'Item IDs in the set (array)',
  'IS.*.i.*': 'Item ID',
};

const INTERACTIVEOBJECTS = {
  IO: 'Interactive objects database',
  'IO.g': 'GFX → data-ID mapping',
  'IO.g.*': 'Data ID for this GFX',
  'IO.d': 'Object definitions (by data ID)',
  'IO.d.*': 'Interactive object',
  'IO.d.*.n': 'Name',
};

const HOUSES = {
  H: 'Houses database',
  'H.h': 'Houses (by ID)',
  'H.h.*': 'House',
  'H.h.*.n': 'Name',
  'H.m': 'House ID per map',
  'H.m.*': 'House ID for this map',
  'H.d': 'Doors per map',
  'H.d.*': 'Map doors',
  'H.d.*.*': 'Door (key is "c"+cellNumber)',
  'H.ids': 'Indoor skills list',
};

const DUNGEONS = {
  DU: 'Dungeons (by ID)',
  'DU.*': 'Dungeon',
  'DU.*.n': 'Name',
};

const SPELLS = {
  S: 'Spells (by ID)',
  'S.*': 'Spell',
  'S.*.n': 'Name',
  'S.*.d': 'Description',
  'S.*.l1': 'Level 1 stats (array)',
  'S.*.l2': 'Level 2 stats (array)',
  'S.*.l3': 'Level 3 stats (array)',
  'S.*.l4': 'Level 4 stats (array)',
  'S.*.l5': 'Level 5 stats (array)',
  'S.*.l6': 'Level 6 stats (array)',
  'S.*.l1.0': 'Effects (normal hit)',
  'S.*.l1.1': 'Effects (critical hit)',
  'S.*.l1.2': 'AP cost',
  'S.*.l1.3': 'Range min',
  'S.*.l1.4': 'Range max',
  'S.*.l1.5': 'Critical-hit chance',
  'S.*.l1.6': 'Critical-failure chance',
  'S.*.l1.7': 'Line only (boolean)',
  'S.*.l1.8': 'Line of sight (boolean)',
};

const EFFECTS = {
  E: 'Effects (by ID)',
  'E.*': 'Effect',
  'E.*.d': 'Description template',
  'E.*.c': 'Characteristic key',
  'E.*.o': 'Operator (+, -, etc.)',
  'E.*.e': 'Element ID',
  'E.*.t': 'Effect type label',
  'E.*.j': 'Jet/dice mode flag',
  EDMG: 'Boosted damaging effects (IDs)',
  EHEL: 'Boosted healing effects (IDs)',
};

const JOBS = {
  J: 'Jobs (by ID)',
  'J.*': 'Job',
  'J.*.n': 'Name',
  'J.*.d': 'Description',
  'J.*.s': 'Skills associated with the job',
  'J.*.g': 'GFX / icon ID',
};

const CRAFTS = {
  CR: 'Crafts (by item ID)',
  'CR.*': 'Craft',
  'CR.*.r': 'Recipe ingredients ([itemID, qty])',
  'CR.*.s': 'Skill ID',
  'CR.*.l': 'Required level',
};

const SKILLS = {
  SK: 'Skills (by ID)',
  'SK.*': 'Skill',
  'SK.*.c': 'Cost',
  'SK.*.cl': 'Crafted item IDs',
  'SK.*.d': 'Description',
  'SK.*.i': 'Icon ID',
  'SK.*.io': 'Interactive-object ID',
  'SK.*.j': 'Job ID',
  'SK.*.f': 'Forgemagus required level',
};

const DIALOG = {
  D: 'Dialog texts',
  'D.q': 'NPC questions (by ID)',
  'D.q.*': 'Question text',
  'D.a': 'Player answers (by ID)',
  'D.a.*': 'Answer text',
};

const NPC = {
  N: 'NPC texts',
  'N.d': 'NPCs (by ID)',
  'N.d.*': 'NPC',
  'N.d.*.n': 'Name',
  'N.d.*.a': 'Action IDs available on this NPC',
  'N.a': 'NPC action labels (by ID)',
  'N.a.*': 'Action label',
};

const MONSTERS = {
  M: 'Monsters (by ID)',
  'M.*': 'Monster',
  'M.*.n': 'Name',
  'M.*.a': 'Alignment ID',
  'M.*.k': 'Kickable from group',
  'M.*.g1': 'Grade 1 stats',
  'M.*.g2': 'Grade 2 stats',
  'M.*.g3': 'Grade 3 stats',
  'M.*.g4': 'Grade 4 stats',
  'M.*.g5': 'Grade 5 stats',
  'M.*.g1.l': 'Level',
  'M.*.g1.r': 'Resistances (array, by element)',
  'M.*.g2.l': 'Level',
  'M.*.g2.r': 'Resistances (array, by element)',
  'M.*.g3.l': 'Level',
  'M.*.g3.r': 'Resistances (array, by element)',
  'M.*.g4.l': 'Level',
  'M.*.g4.r': 'Resistances (array, by element)',
  'M.*.g5.l': 'Level',
  'M.*.g5.r': 'Resistances (array, by element)',
};

const MONSTERS_RACES = {
  MR: 'Monster races (by ID)',
  'MR.*': 'Race',
  'MR.*.n': 'Name',
  MSR: 'Monster super-races (by ID)',
  'MSR.*': 'Super-race',
  'MSR.*.n': 'Name',
};

const TIMEZONES = {
  T: 'Timezones',
  'T.*': 'Timezone label',
};

const CLASSES = {
  G: 'Player classes / breeds (by ID)',
  'G.*': 'Class',
  'G.*.sn': 'Short name (e.g. "Féca")',
  'G.*.ln': 'Long name (e.g. "Le bouclier Féca")',
  'G.*.d': 'Long HTML description (lore)',
  'G.*.sd': 'Short description (one-liner shown on the breed picker)',
  'G.*.ep': 'Minimum regional/episodic version where this class is playable',
  'G.*.s': 'Class spell IDs (typically 21, one per spell slot)',
  'G.*.s.*': 'Spell ID',
  'G.*.cc': 'Default close-combat profile (used when no weapon equipped)',
  'G.*.cc.0': 'Normal-hit effects template',
  'G.*.cc.1': 'Critical-hit effects template',
  'G.*.cc.2': 'AP cost',
  'G.*.cc.3': 'Range min',
  'G.*.cc.4': 'Range max',
  'G.*.cc.5': 'Critical-hit chance (1 in N)',
  'G.*.cc.6': 'Critical-failure chance (1 in N)',
  'G.*.cc.7': 'Line only (boolean)',
  'G.*.cc.8': 'Line of sight (boolean)',
  'G.*.cc.9': 'Required states (state IDs)',
  'G.*.cc.10': 'Forbidden states (state IDs)',
  'G.*.b10': 'Strength (Force) boost cost table',
  'G.*.b11': 'Vitality boost cost table',
  'G.*.b12': 'Wisdom (Sagesse) boost cost table',
  'G.*.b13': 'Chance boost cost table',
  'G.*.b14': 'Agility (Agilité) boost cost table',
  'G.*.b15': 'Intelligence boost cost table',
  'G.*.b10.*': 'Boost tier [threshold, cost-per-point, points-per-purchase]',
  'G.*.b11.*': 'Boost tier [threshold, cost-per-point, points-per-purchase]',
  'G.*.b12.*': 'Boost tier [threshold, cost-per-point, points-per-purchase]',
  'G.*.b13.*': 'Boost tier [threshold, cost-per-point, points-per-purchase]',
  'G.*.b14.*': 'Boost tier [threshold, cost-per-point, points-per-purchase]',
  'G.*.b15.*': 'Boost tier [threshold, cost-per-point, points-per-purchase]',
};

const EMOTES = {
  EM: 'Emotes (by ID)',
  'EM.*': 'Emote',
  'EM.*.n': 'Name',
  'EM.*.s': 'Chat shortcut',
};

const GUILDS = {
  GU: 'Guild data',
  'GU.b': 'Per-characteristic boosts',
  'GU.b.*': 'Boost value (key+"m" = max value)',
};

const NAMES = {
  NF: 'Character name pool',
  'NF.n': 'Family / last names (by ID)',
  'NF.n.*': 'Family name',
  'NF.f': 'First names (by ID)',
  'NF.f.*': 'First name',
};

const RANKS = {
  R: 'Guild ranks (by ID)',
  'R.*': 'Rank',
  'R.*.n': 'Name',
};

const TIPS = {
  TI: 'Loading-screen tips',
  'TI.*': 'Tip text',
};

const SHORTCUTS = {
  SSC: 'Shortcut categories (by ID)',
  'SSC.*': 'Category label',
  SH: 'Shortcuts (by ID)',
  'SH.*': 'Shortcut',
  SST: 'Shortcut sets',
  'SST.*': 'Set entry',
  SSK: 'Shortcut keys (key = setID|shortcut)',
  'SSK.*': 'Key binding',
};

const SERVERS = {
  SR: 'Servers (by ID)',
  'SR.*': 'Server',
  'SR.*.n': 'Name',
  'SR.*.d': 'Description',
  SRP: 'Server populations (by ID)',
  'SRP.*': 'Population label',
  SRPW: 'Server population weights (by ID)',
  'SRPW.*': 'Weight',
  SRC: 'Server communities (by ID)',
  'SRC.*': 'Community',
  'SRC.*.n': 'Internal name',
  'SRC.*.d': 'Displayed name',
  SRVT: 'Server-specific text templates (by ID)',
  'SRVT.*': 'Template',
  'SRVT.*.l': 'Lookup label (referenced as `SRVT:label`)',
  'SRVT.*.d': 'Default value',
  SRVC: 'Server-specific text overrides (key = textID|serverID)',
  'SRVC.*': 'Override value',
};

const QUESTS = {
  Q: 'Quests',
  'Q.q': 'Quests (by ID)',
  'Q.q.*': 'Quest',
  'Q.q.*.n': 'Name',
  'Q.q.*.d': 'Description',
  'Q.s': 'Quest steps (by ID)',
  'Q.s.*': 'Step',
  'Q.s.*.n': 'Name',
  'Q.s.*.d': 'Description',
  'Q.s.*.r': 'Rewards text',
  'Q.o': 'Quest objectives (by ID)',
  'Q.o.*': 'Objective',
  'Q.o.*.x': 'Map x (if positional)',
  'Q.o.*.y': 'Map y (if positional)',
  'Q.t': 'Objective types (by ID)',
  'Q.t.*': 'Type label',
};

const STATES = {
  ST: 'Character states (by ID)',
  'ST.*': 'State',
  'ST.*.n': 'Name',
};

const PVP = {
  PP: 'PvP data',
  'PP.hp': 'Honor-point bounds per grade',
  'PP.hp.*': 'Lower bound for this grade',
  'PP.maxdp': 'Maximum disgrace points',
  'PP.grds': 'Grades per alignment side',
  'PP.grds.*': 'Side (alignment) grades list',
  'PP.grds.*.*': 'Grade entry',
  'PP.grds.*.*.nl': 'Long name',
  'PP.grds.*.*.nc': 'Short name',
};

const HINTS = {
  HI: 'Hints / map markers (list)',
  'HI.*': 'Hint',
  'HI.*.n': 'Name',
  'HI.*.c': 'Category ID',
  'HI.*.m': 'Map ID',
  'HI.*.g': 'GFX ID',
  'HI.*.x': 'X coordinate',
  'HI.*.y': 'Y coordinate',
  HIC: 'Hint categories (by ID)',
  'HIC.*': 'Category',
  'HIC.*.n': 'Name',
};

const MOUNTS = {
  RI: 'Mount templates (by ID)',
  'RI.*': 'Mount',
  'RI.*.n': 'Name',
  'RI.*.g': 'GFX ID (clip filename)',
  'RI.*.c1': 'Default color 1',
  'RI.*.c2': 'Default color 2',
  'RI.*.c3': 'Default color 3',
  RIA: 'Mount capacities/abilities (by ID)',
  'RIA.*': 'Capacity',
  'RIA.*.n': 'Name',
};

const KNOWLEDGEBASE = {
  KBC: 'KB categories (by ID)',
  'KBC.*': 'Category',
  'KBC.*.n': 'Name',
  KBA: 'KB articles (by ID)',
  'KBA.*': 'Article',
  'KBA.*.n': 'Title',
  'KBA.*.c': 'Content',
  KBD: 'KB triggers',
  'KBD.*': 'Trigger entry',
  KBT: 'KB tips (by ID)',
  'KBT.*': 'Tip text',
};

const AUDIO = {
  AUMC: 'Music keyname → ID',
  'AUMC.*': 'Music ID',
  AUEC: 'SFX keyname → ID',
  'AUEC.*': 'SFX ID',
  AUAC: 'Ambient keyname → ID',
  'AUAC.*': 'Ambient ID',
  AUM: 'Music files (by ID)',
  'AUM.*': 'Music file / metadata',
  AUE: 'SFX files (by ID)',
  'AUE.*': 'SFX file / metadata',
  AUA: 'Ambient files (by ID)',
  'AUA.*': 'Ambient file / metadata',
};

const SUBTITLES = {
  SUB: 'Subtitles per trailer',
  'SUB.*': 'Trailer subtitles (by index)',
  'SUB.*.*': 'Subtitle line',
};

const SCRIPTS = {
  SCR: 'Tutorial / scripted dialog text (by ID)',
  'SCR.*': 'Tutorial text',
};

const SPEAKINGITEMS = {
  SIM: 'Speaking-item messages (by ID)',
  'SIM.*': 'Message',
  SIT: 'Speaking-item triggers (by ID)',
  'SIT.*': 'Trigger',
};

const FIGHTCHALLENGE = {
  FC: 'Fight challenges (by ID)',
  'FC.*': 'Challenge',
  'FC.*.n': 'Name',
  'FC.*.d': 'Description',
};

const TITLES = {
  PT: 'Player titles (by ID)',
  'PT.*': 'Title',
  'PT.*.t': 'Title text template (may contain %1)',
  'PT.*.c': 'Title text colour (RGB int)',
  'PT.*.pt': 'Parameter type (0 = plain string, 1 = monster ID)',
};

const MAPS = {
  MA: 'Map / area data',
  'MA.m': 'Maps (by map ID)',
  'MA.m.*': 'Map info',
  'MA.m.*.c': 'Max players in challenge',
  'MA.m.*.t': 'Max players in team',
  'MA.m.*.x': 'X coordinate',
  'MA.m.*.y': 'Y coordinate',
  'MA.m.*.sa': 'Sub-area ID',
  'MA.a': 'Areas (by ID)',
  'MA.a.*': 'Area',
  'MA.a.*.n': 'Name',
  'MA.a.*.sua': 'Super-area ID',
  'MA.sua': 'Super-areas (by ID)',
  'MA.sua.*': 'Super-area',
  'MA.sua.*.n': 'Name',
  'MA.sa': 'Sub-areas (by ID)',
  'MA.sa.*': 'Sub-area',
  'MA.sa.*.n': 'Name',
  'MA.sa.*.a': 'Parent area ID',
};

const LANG = {
  C: 'Per-language config (key → value)',
  'C.*': 'Config entry',
  CNS: 'Default console shortcuts',
  'CNS.*': 'Shortcut entry',
  COM: 'Server communities (label list)',
  'COM.*': 'Community label',
  CSR: 'Censored words list',
  'CSR.*': 'Word',
  ABR: 'Abuse-report reasons',
  'ABR.*': 'Reason',
  WEIGHTS: 'File-size catalogue (used by the loading screen)',
  'WEIGHTS.*': 'Byte size for this lang module',
};

const COMMON = {
  FILE_BEGIN: 'Internal marker — must remain true',
  FILE_END: 'Internal marker — must remain true',
  VERSION: 'Lang file version (filename suffix)',
};

export const LABELS = {
  alignment: { ...COMMON, ...ALIGNMENT },
  items: { ...COMMON, ...ITEMS },
  itemsets: { ...COMMON, ...ITEMSETS },
  interactiveobjects: { ...COMMON, ...INTERACTIVEOBJECTS },
  houses: { ...COMMON, ...HOUSES },
  dungeons: { ...COMMON, ...DUNGEONS },
  spells: { ...COMMON, ...SPELLS },
  effects: { ...COMMON, ...EFFECTS },
  jobs: { ...COMMON, ...JOBS },
  crafts: { ...COMMON, ...CRAFTS },
  skills: { ...COMMON, ...SKILLS },
  dialog: { ...COMMON, ...DIALOG },
  npc: { ...COMMON, ...NPC },
  monsters: { ...COMMON, ...MONSTERS, ...MONSTERS_RACES },
  timezones: { ...COMMON, ...TIMEZONES },
  classes: { ...COMMON, ...CLASSES },
  emotes: { ...COMMON, ...EMOTES },
  guilds: { ...COMMON, ...GUILDS },
  names: { ...COMMON, ...NAMES },
  ranks: { ...COMMON, ...RANKS },
  tips: { ...COMMON, ...TIPS },
  shortcuts: { ...COMMON, ...SHORTCUTS },
  servers: { ...COMMON, ...SERVERS },
  quests: { ...COMMON, ...QUESTS },
  states: { ...COMMON, ...STATES },
  pvp: { ...COMMON, ...PVP },
  hints: { ...COMMON, ...HINTS },
  rides: { ...COMMON, ...MOUNTS },
  kb: { ...COMMON, ...KNOWLEDGEBASE },
  audio: { ...COMMON, ...AUDIO },
  subtitles: { ...COMMON, ...SUBTITLES },
  scripts: { ...COMMON, ...SCRIPTS },
  speakingitems: { ...COMMON, ...SPEAKINGITEMS },
  fightChallenge: { ...COMMON, ...FIGHTCHALLENGE },
  titles: { ...COMMON, ...TITLES },
  maps: { ...COMMON, ...MAPS },
  lang: { ...COMMON, ...LANG },
};

/**
 * Look up a label for a path inside a parsed file.
 *
 * @param {string} type   the file type (e.g. 'items')
 * @param {(string|number)[]} pathArr path through the parsed tree
 * @returns {string|null}
 */
export function labelFor(type, pathArr) {
  const map = LABELS[type];
  if (!map) return null;
  // Each segment that is numeric may match either the literal index (e.g. "2")
  // or the wildcard "*". Walk from longest path to shortest, and at each length
  // enumerate the cartesian product of literal-vs-wildcard for numeric segments,
  // preferring the most specific (most literal) variants first.
  for (let len = pathArr.length; len > 0; len--) {
    const slice = pathArr.slice(0, len).map((p) => {
      if (typeof p === 'number') return { lit: String(p), wild: '*', isNum: true };
      if (typeof p === 'string' && /^\d+$/.test(p)) return { lit: p, wild: '*', isNum: true };
      return { lit: p, wild: p, isNum: false };
    });
    const numericIdx = slice.map((s, i) => (s.isNum ? i : -1)).filter((i) => i >= 0);
    // Enumerate from "all literal" (mask 0) to "all wildcard" (mask 2^N-1).
    const N = numericIdx.length;
    for (let mask = 0; mask < (1 << N); mask++) {
      const built = slice.map((s) => s.lit);
      for (let bit = 0; bit < N; bit++) {
        if (mask & (1 << bit)) built[numericIdx[bit]] = '*';
      }
      const key = built.join('.');
      if (map[key]) return map[key];
    }
  }
  return null;
}
