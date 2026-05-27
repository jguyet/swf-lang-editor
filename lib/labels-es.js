/**
 * Traduccion espanola del glosario de campos por tipo de archivo.
 * Misma estructura que labels.js -- solo se traducen los valores.
 * Las claves (patrones) son identicas.
 *
 * Convencion: sin caracteres acentuados (ASCII puro), conforme
 * al archivo i18n.js existente en el proyecto.
 */

const ALIGNMENT_ES = {
  A: 'Datos de alineamiento',
  'A.a': 'Alineamientos (por ID)',
  'A.a.*': 'Alineamiento',
  'A.a.*.n': 'Nombre',
  'A.a.*.c': 'Puede ser elegido por el jugador',
  'A.o': 'Ordenes (por ID)',
  'A.o.*': 'Orden',
  'A.o.*.n': 'Nombre',
  'A.o.*.a': 'ID de alineamiento padre',
  'A.s': 'Especializaciones (por ID)',
  'A.s.*': 'Especializacion',
  'A.s.*.n': 'Nombre',
  'A.s.*.d': 'Descripcion',
  'A.s.*.av': 'Valor de alineamiento minimo',
  'A.s.*.f': 'IDs de hazanas desbloqueadas',
  'A.s.*.o': 'ID de orden',
  'A.f': 'Hazanas (por ID)',
  'A.f.*': 'Hazana',
  'A.f.*.n': 'Nombre',
  'A.f.*.e': 'IDs de efectos de la hazana',
  'A.f.*.g': 'ID de sub-hazana / grupo',
  'A.fe': 'Efectos de hazanas (por ID)',
  'A.fe.*': 'Efecto de hazana',
  'A.fe.*.d': 'Plantilla de descripcion del efecto',
  'A.b': 'Niveles de equilibrio de alineamiento',
  'A.b.*': 'Entrada de nivel de equilibrio',
  'A.b.*.n': 'Nombre',
  'A.b.*.d': 'Descripcion',
  'A.jo': 'Matriz unirse-orden [alineamiento][orden]',
  'A.jo.*': 'Fila por alineamiento',
  'A.jo.*.*': 'Un miembro de este alineamiento puede unirse a esta orden',
  'A.at': 'Matriz de ataque [alineamiento A][alineamiento B]',
  'A.at.*': 'Fila por alineamiento',
  'A.at.*.*': 'A puede atacar a B',
  'A.g': 'Matriz de ganancia PvP [alineamiento A][alineamiento B]',
  'A.g.*': 'Fila por alineamiento',
  'A.g.*.*': 'A puede ver la ganancia PvP de B',
};

const ITEMS_ES = {
  I: 'Base de datos de Objetos',
  'I.u': 'Plantillas de objetos (por ID)',
  'I.u.*': 'Plantilla de objeto',
  'I.u.*.n': 'Nombre (patron, decodificado via I.us)',
  'I.u.*.d': 'Descripcion (patron, decodificado via I.us)',
  'I.u.*.t': 'ID de tipo (ver I.t)',
  'I.u.*.l': 'Nivel',
  'I.u.*.g': 'GFX / ID de icono',
  'I.u.*.p': 'Precio base (en kamas)',
  'I.u.*.w': 'Peso (en pods)',
  'I.u.*.s': 'ID de panoplia (si aplica)',
  'I.u.*.u': 'ID de script de uso (objeto usable)',
  'I.u.*.ut': 'ID de script de uso con objetivo',
  'I.u.*.fm': 'Forjamagueable (mejorable por forjamagia)',
  'I.u.*.tw': 'Dos manos',
  'I.u.*.et': 'Eterea (se degrada al usarse)',
  'I.u.*.h': 'Oculto (no visible para el jugador)',
  'I.u.*.m': 'Maldito (no puede soltarse ni destruirse)',
  'I.u.*.c': 'Condiciones de uso (cadena de patron, & = Y / | = O)',
  'I.u.*.ep': 'Version regional/episodica minima requerida',
  'I.u.*.e': 'Estadisticas de arma (solo para armas)',
  'I.u.*.e.0': 'Dano bonus en golpe critico',
  'I.u.*.e.1': 'Coste en PA (Puntos de Accion)',
  'I.u.*.e.2': 'Alcance minimo',
  'I.u.*.e.3': 'Alcance maximo',
  'I.u.*.e.4': 'Probabilidad de golpe critico (1 de cada N)',
  'I.u.*.e.5': 'Probabilidad de fallo critico (1 de cada N)',
  'I.u.*.e.6': 'Solo en linea (booleano)',
  'I.u.*.e.7': 'Linea de vision requerida (booleano)',
  'I.us': 'Diccionario de cadenas unicas (decodificador de patrones)',
  'I.us.*': 'Entrada del diccionario',
  'I.t': 'Tipos de objetos (por ID)',
  'I.t.*': 'Tipo de objeto',
  'I.t.*.n': 'Nombre',
  'I.t.*.t': 'ID de super-tipo (ver I.st)',
  'I.t.*.z': 'Zona de efecto (pares forma+tamano, usados para armas)',
  'I.st': 'Super-tipos de objetos (por ID)',
  'I.st.*': 'Etiqueta de super-tipo',
  'I.ss': 'Mapa de ranuras por super-tipo',
  'I.ss.*': 'IDs de ranuras para este super-tipo',
};

const ITEMSETS_ES = {
  IS: 'Panoplias (por ID)',
  'IS.*': 'Panoplia',
  'IS.*.n': 'Nombre',
  'IS.*.d': 'Descripcion',
  'IS.*.i': 'IDs de objetos de la panoplia (array)',
  'IS.*.i.*': 'ID de objeto',
};

const INTERACTIVEOBJECTS_ES = {
  IO: 'Base de datos de Objetos interactivos',
  'IO.g': 'Asociacion GFX a ID de datos',
  'IO.g.*': 'ID de datos para este GFX',
  'IO.d': 'Definiciones de objetos (por ID de datos)',
  'IO.d.*': 'Objeto interactivo',
  'IO.d.*.n': 'Nombre',
};

const HOUSES_ES = {
  H: 'Base de datos de Casas',
  'H.h': 'Casas (por ID)',
  'H.h.*': 'Casa',
  'H.h.*.n': 'Nombre',
  'H.m': 'ID de casa por mapa',
  'H.m.*': 'ID de casa para este mapa',
  'H.d': 'Puertas por mapa',
  'H.d.*': 'Puertas del mapa',
  'H.d.*.*': 'Puerta (la clave es "c"+numeroDeCelda)',
  'H.ids': 'Lista de habilidades de interior',
};

const DUNGEONS_ES = {
  DU: 'Mazmorras (por ID)',
  'DU.*': 'Mazmorra',
  'DU.*.n': 'Nombre',
};

const SPELLS_ES = {
  S: 'Hechizos (por ID)',
  'S.*': 'Hechizo',
  'S.*.n': 'Nombre',
  'S.*.d': 'Descripcion',
  'S.*.l1': 'Estadisticas nivel 1 (array)',
  'S.*.l2': 'Estadisticas nivel 2 (array)',
  'S.*.l3': 'Estadisticas nivel 3 (array)',
  'S.*.l4': 'Estadisticas nivel 4 (array)',
  'S.*.l5': 'Estadisticas nivel 5 (array)',
  'S.*.l6': 'Estadisticas nivel 6 (array)',
  'S.*.l1.0': 'Efectos (golpe normal)',
  'S.*.l1.1': 'Efectos (golpe critico)',
  'S.*.l1.2': 'Coste en PA (Puntos de Accion)',
  'S.*.l1.3': 'Alcance minimo',
  'S.*.l1.4': 'Alcance maximo',
  'S.*.l1.5': 'Probabilidad de golpe critico',
  'S.*.l1.6': 'Probabilidad de fallo critico',
  'S.*.l1.7': 'Solo en linea (booleano)',
  'S.*.l1.8': 'Linea de vision (booleano)',
};

const EFFECTS_ES = {
  E: 'Efectos (por ID)',
  'E.*': 'Efecto',
  'E.*.d': 'Plantilla de descripcion',
  'E.*.c': 'Clave de caracteristica',
  'E.*.o': 'Operador (+, -, etc.)',
  'E.*.e': 'ID de elemento',
  'E.*.t': 'Etiqueta de tipo de efecto',
  'E.*.j': 'Indicador de modo dado/tirada',
  EDMG: 'IDs de Efectos de Dano mejorados',
  EHEL: 'IDs de Efectos de Curacion mejorados',
};

const JOBS_ES = {
  J: 'Oficios (por ID)',
  'J.*': 'Oficio',
  'J.*.n': 'Nombre',
  'J.*.d': 'Descripcion',
  'J.*.s': 'Habilidades asociadas al oficio',
  'J.*.g': 'GFX / ID de icono',
};

const CRAFTS_ES = {
  CR: 'Recetas (por ID de objeto)',
  'CR.*': 'Receta',
  'CR.*.r': 'Ingredientes ([ID objeto, cantidad])',
  'CR.*.s': 'ID de habilidad',
  'CR.*.l': 'Nivel requerido',
};

const SKILLS_ES = {
  SK: 'Habilidades (por ID)',
  'SK.*': 'Habilidad',
  'SK.*.c': 'Coste',
  'SK.*.cl': 'IDs de objetos fabricados',
  'SK.*.d': 'Descripcion',
  'SK.*.i': 'ID de icono',
  'SK.*.io': 'ID de objeto interactivo',
  'SK.*.j': 'ID de oficio',
  'SK.*.f': 'Nivel de forjamagia requerido',
};

const DIALOG_ES = {
  D: 'Textos de Dialogos',
  'D.q': 'Preguntas de PNJ (por ID)',
  'D.q.*': 'Texto de pregunta',
  'D.a': 'Respuestas del jugador (por ID)',
  'D.a.*': 'Texto de respuesta',
};

const NPC_ES = {
  N: 'Textos de PNJ',
  'N.d': 'PNJ (por ID)',
  'N.d.*': 'PNJ',
  'N.d.*.n': 'Nombre',
  'N.d.*.a': 'IDs de acciones disponibles en este PNJ',
  'N.a': 'Etiquetas de acciones de PNJ (por ID)',
  'N.a.*': 'Etiqueta de accion',
};

const MONSTERS_ES = {
  M: 'Monstruos (por ID)',
  'M.*': 'Monstruo',
  'M.*.n': 'Nombre',
  'M.*.a': 'ID de alineamiento',
  'M.*.k': 'Puede ser expulsado del grupo',
  'M.*.g1': 'Estadisticas grado 1',
  'M.*.g2': 'Estadisticas grado 2',
  'M.*.g3': 'Estadisticas grado 3',
  'M.*.g4': 'Estadisticas grado 4',
  'M.*.g5': 'Estadisticas grado 5',
  'M.*.g1.l': 'Nivel',
  'M.*.g1.r': 'Resistencias (array, por elemento)',
  'M.*.g2.l': 'Nivel',
  'M.*.g2.r': 'Resistencias (array, por elemento)',
  'M.*.g3.l': 'Nivel',
  'M.*.g3.r': 'Resistencias (array, por elemento)',
  'M.*.g4.l': 'Nivel',
  'M.*.g4.r': 'Resistencias (array, por elemento)',
  'M.*.g5.l': 'Nivel',
  'M.*.g5.r': 'Resistencias (array, por elemento)',
};

const MONSTERS_RACES_ES = {
  MR: 'Razas de monstruos (por ID)',
  'MR.*': 'Raza',
  'MR.*.n': 'Nombre',
  MSR: 'Super-razas de monstruos (por ID)',
  'MSR.*': 'Super-raza',
  'MSR.*.n': 'Nombre',
};

const TIMEZONES_ES = {
  T: 'Zonas horarias',
  'T.*': 'Etiqueta de zona horaria',
};

const CLASSES_ES = {
  G: 'Clases / razas de jugador (por ID)',
  'G.*': 'Clase',
  'G.*.sn': 'Nombre corto (ej. "Feca")',
  'G.*.ln': 'Nombre largo (ej. "El escudo Feca")',
  'G.*.d': 'Descripcion HTML larga (trasfondo)',
  'G.*.sd': 'Descripcion corta (mostrada en el selector de clase)',
  'G.*.ep': 'Version regional/episodica minima en la que esta clase es jugable',
  'G.*.s': 'IDs de hechizos de la clase (normalmente 21, uno por ranura)',
  'G.*.s.*': 'ID de hechizo',
  'G.*.cc': 'Perfil de combate cuerpo a cuerpo predeterminado (sin arma equipada)',
  'G.*.cc.0': 'Plantilla de efectos golpe normal',
  'G.*.cc.1': 'Plantilla de efectos golpe critico',
  'G.*.cc.2': 'Coste en PA (Puntos de Accion)',
  'G.*.cc.3': 'Alcance minimo',
  'G.*.cc.4': 'Alcance maximo',
  'G.*.cc.5': 'Probabilidad de golpe critico (1 de cada N)',
  'G.*.cc.6': 'Probabilidad de fallo critico (1 de cada N)',
  'G.*.cc.7': 'Solo en linea (booleano)',
  'G.*.cc.8': 'Linea de vision (booleano)',
  'G.*.cc.9': 'Estados requeridos (IDs de estados)',
  'G.*.cc.10': 'Estados prohibidos (IDs de estados)',
  'G.*.b10': 'Tabla de coste de mejoras de Fuerza',
  'G.*.b11': 'Tabla de coste de mejoras de Vitalidad',
  'G.*.b12': 'Tabla de coste de mejoras de Sabiduria',
  'G.*.b13': 'Tabla de coste de mejoras de Suerte',
  'G.*.b14': 'Tabla de coste de mejoras de Agilidad',
  'G.*.b15': 'Tabla de coste de mejoras de Inteligencia',
  'G.*.b10.*': 'Nivel de mejora [umbral, coste-por-punto, puntos-por-compra]',
  'G.*.b11.*': 'Nivel de mejora [umbral, coste-por-punto, puntos-por-compra]',
  'G.*.b12.*': 'Nivel de mejora [umbral, coste-por-punto, puntos-por-compra]',
  'G.*.b13.*': 'Nivel de mejora [umbral, coste-por-punto, puntos-por-compra]',
  'G.*.b14.*': 'Nivel de mejora [umbral, coste-por-punto, puntos-por-compra]',
  'G.*.b15.*': 'Nivel de mejora [umbral, coste-por-punto, puntos-por-compra]',
};

const EMOTES_ES = {
  EM: 'Emociones (por ID)',
  'EM.*': 'Emocion',
  'EM.*.n': 'Nombre',
  'EM.*.s': 'Atajo de chat',
};

const GUILDS_ES = {
  GU: 'Datos de Gremios',
  'GU.b': 'Mejoras por caracteristica',
  'GU.b.*': 'Valor de mejora (clave+"m" = valor maximo)',
};

const NAMES_ES = {
  NF: 'Banco de Nombres de personaje',
  'NF.n': 'Apellidos (por ID)',
  'NF.n.*': 'Apellido',
  'NF.f': 'Nombres de pila (por ID)',
  'NF.f.*': 'Nombre de pila',
};

const RANKS_ES = {
  R: 'Rangos de gremio (por ID)',
  'R.*': 'Rango',
  'R.*.n': 'Nombre',
};

const TIPS_ES = {
  TI: 'Consejos de pantalla de carga',
  'TI.*': 'Texto de consejo',
};

const SHORTCUTS_ES = {
  SSC: 'Categorias de Atajos (por ID)',
  'SSC.*': 'Etiqueta de categoria',
  SH: 'Atajos (por ID)',
  'SH.*': 'Atajo',
  SST: 'Conjuntos de atajos',
  'SST.*': 'Entrada de conjunto',
  SSK: 'Teclas de atajos (clave = ID conjunto|atajo)',
  'SSK.*': 'Asignacion de tecla',
};

const SERVERS_ES = {
  SR: 'Servidores (por ID)',
  'SR.*': 'Servidor',
  'SR.*.n': 'Nombre',
  'SR.*.d': 'Descripcion',
  SRP: 'Poblaciones de servidores (por ID)',
  'SRP.*': 'Etiqueta de poblacion',
  SRPW: 'Pesos de poblacion de servidores (por ID)',
  'SRPW.*': 'Peso',
  SRC: 'Comunidades de servidores (por ID)',
  'SRC.*': 'Comunidad',
  'SRC.*.n': 'Nombre interno',
  'SRC.*.d': 'Nombre mostrado',
  SRVT: 'Plantillas de texto especificas del servidor (por ID)',
  'SRVT.*': 'Plantilla',
  'SRVT.*.l': 'Etiqueta de busqueda (referenciada como `SRVT:etiqueta`)',
  'SRVT.*.d': 'Valor predeterminado',
  SRVC: 'Sustituciones de texto especificas del servidor (clave = ID texto|ID servidor)',
  'SRVC.*': 'Valor de sustitucion',
};

const QUESTS_ES = {
  Q: 'Misiones',
  'Q.q': 'Misiones (por ID)',
  'Q.q.*': 'Mision',
  'Q.q.*.n': 'Nombre',
  'Q.q.*.d': 'Descripcion',
  'Q.s': 'Pasos de mision (por ID)',
  'Q.s.*': 'Paso',
  'Q.s.*.n': 'Nombre',
  'Q.s.*.d': 'Descripcion',
  'Q.s.*.r': 'Texto de recompensas',
  'Q.o': 'Objetivos de mision (por ID)',
  'Q.o.*': 'Objetivo',
  'Q.o.*.x': 'X del mapa (si es posicional)',
  'Q.o.*.y': 'Y del mapa (si es posicional)',
  'Q.t': 'Tipos de objetivos (por ID)',
  'Q.t.*': 'Etiqueta de tipo',
};

const STATES_ES = {
  ST: 'Estados del personaje (por ID)',
  'ST.*': 'Estado',
  'ST.*.n': 'Nombre',
};

const PVP_ES = {
  PP: 'Datos de PvP',
  'PP.hp': 'Limites de puntos de honor por grado',
  'PP.hp.*': 'Limite inferior para este grado',
  'PP.maxdp': 'Puntos de deshonor maximos',
  'PP.grds': 'Grados por bando de alineamiento',
  'PP.grds.*': 'Lista de grados del bando (alineamiento)',
  'PP.grds.*.*': 'Entrada de grado',
  'PP.grds.*.*.nl': 'Nombre largo',
  'PP.grds.*.*.nc': 'Nombre corto',
};

const HINTS_ES = {
  HI: 'Pistas / marcadores de mapa (lista)',
  'HI.*': 'Pista',
  'HI.*.n': 'Nombre',
  'HI.*.c': 'ID de categoria',
  'HI.*.m': 'ID de mapa',
  'HI.*.g': 'ID GFX',
  'HI.*.x': 'Coordenada X',
  'HI.*.y': 'Coordenada Y',
  HIC: 'Categorias de pistas (por ID)',
  'HIC.*': 'Categoria',
  'HIC.*.n': 'Nombre',
};

const MOUNTS_ES = {
  RI: 'Plantillas de Monturas (por ID)',
  'RI.*': 'Montura',
  'RI.*.n': 'Nombre',
  'RI.*.g': 'ID GFX (nombre del clip)',
  'RI.*.c1': 'Color predeterminado 1',
  'RI.*.c2': 'Color predeterminado 2',
  'RI.*.c3': 'Color predeterminado 3',
  RIA: 'Capacidades/aptitudes de monturas (por ID)',
  'RIA.*': 'Capacidad',
  'RIA.*.n': 'Nombre',
};

const KNOWLEDGEBASE_ES = {
  KBC: 'Categorias de la Base de conocimiento (por ID)',
  'KBC.*': 'Categoria',
  'KBC.*.n': 'Nombre',
  KBA: 'Articulos de la Base de conocimiento (por ID)',
  'KBA.*': 'Articulo',
  'KBA.*.n': 'Titulo',
  'KBA.*.c': 'Contenido',
  KBD: 'Disparadores de la Base de conocimiento',
  'KBD.*': 'Entrada de disparador',
  KBT: 'Consejos de la Base de conocimiento (por ID)',
  'KBT.*': 'Texto de consejo',
};

const AUDIO_ES = {
  AUMC: 'Nombre de clave de musica a ID',
  'AUMC.*': 'ID de musica',
  AUEC: 'Nombre de clave de efecto de sonido a ID',
  'AUEC.*': 'ID de efecto de sonido',
  AUAC: 'Nombre de clave de ambiente a ID',
  'AUAC.*': 'ID de ambiente',
  AUM: 'Archivos de musica (por ID)',
  'AUM.*': 'Archivo de musica / metadatos',
  AUE: 'Archivos de efectos de sonido (por ID)',
  'AUE.*': 'Archivo de efecto de sonido / metadatos',
  AUA: 'Archivos de ambiente (por ID)',
  'AUA.*': 'Archivo de ambiente / metadatos',
};

const SUBTITLES_ES = {
  SUB: 'Subtitulos por trailer',
  'SUB.*': 'Subtitulos del trailer (por indice)',
  'SUB.*.*': 'Linea de subtitulo',
};

const SCRIPTS_ES = {
  SCR: 'Texto de tutorial / dialogo con guion (por ID)',
  'SCR.*': 'Texto de tutorial',
};

const SPEAKINGITEMS_ES = {
  SIM: 'Mensajes de Objetos parlantes (por ID)',
  'SIM.*': 'Mensaje',
  SIT: 'Disparadores de Objetos parlantes (por ID)',
  'SIT.*': 'Disparador',
};

const FIGHTCHALLENGE_ES = {
  FC: 'Desafios de combate (por ID)',
  'FC.*': 'Desafio',
  'FC.*.n': 'Nombre',
  'FC.*.d': 'Descripcion',
};

const TITLES_ES = {
  PT: 'Titulos del jugador (por ID)',
  'PT.*': 'Titulo',
  'PT.*.t': 'Plantilla de texto del titulo (puede contener %1)',
  'PT.*.c': 'Color del texto del titulo (entero RGB)',
  'PT.*.pt': 'Tipo de parametro (0 = cadena simple, 1 = ID de monstruo)',
};

const MAPS_ES = {
  MA: 'Datos de Mapas / zonas',
  'MA.m': 'Mapas (por ID de mapa)',
  'MA.m.*': 'Informacion del mapa',
  'MA.m.*.c': 'Numero maximo de jugadores en desafio',
  'MA.m.*.t': 'Numero maximo de jugadores por equipo',
  'MA.m.*.x': 'Coordenada X',
  'MA.m.*.y': 'Coordenada Y',
  'MA.m.*.sa': 'ID de sub-zona',
  'MA.a': 'Zonas (por ID)',
  'MA.a.*': 'Zona',
  'MA.a.*.n': 'Nombre',
  'MA.a.*.sua': 'ID de super-zona',
  'MA.sua': 'Super-zonas (por ID)',
  'MA.sua.*': 'Super-zona',
  'MA.sua.*.n': 'Nombre',
  'MA.sa': 'Sub-zonas (por ID)',
  'MA.sa.*': 'Sub-zona',
  'MA.sa.*.n': 'Nombre',
  'MA.sa.*.a': 'ID de zona padre',
};

const LANG_ES = {
  C: 'Configuracion por idioma (clave a valor)',
  'C.*': 'Entrada de configuracion',
  CNS: 'Atajos de consola predeterminados',
  'CNS.*': 'Entrada de atajo',
  COM: 'Comunidades de servidores (lista de etiquetas)',
  'COM.*': 'Etiqueta de comunidad',
  CSR: 'Lista de palabras censuradas',
  'CSR.*': 'Palabra',
  ABR: 'Motivos de reporte de abuso',
  'ABR.*': 'Motivo',
  WEIGHTS: 'Catalogo de tamanos de archivo (usado por la pantalla de carga)',
  'WEIGHTS.*': 'Tamano en bytes para este modulo de idioma',
};

const COMMON_ES = {
  FILE_BEGIN: 'Marcador interno -- debe permanecer verdadero',
  FILE_END: 'Marcador interno -- debe permanecer verdadero',
  VERSION: 'Version del archivo de idioma (sufijo del nombre de archivo)',
};

export const LABELS_ES = {
  alignment: { ...COMMON_ES, ...ALIGNMENT_ES },
  items: { ...COMMON_ES, ...ITEMS_ES },
  itemsets: { ...COMMON_ES, ...ITEMSETS_ES },
  interactiveobjects: { ...COMMON_ES, ...INTERACTIVEOBJECTS_ES },
  houses: { ...COMMON_ES, ...HOUSES_ES },
  dungeons: { ...COMMON_ES, ...DUNGEONS_ES },
  spells: { ...COMMON_ES, ...SPELLS_ES },
  effects: { ...COMMON_ES, ...EFFECTS_ES },
  jobs: { ...COMMON_ES, ...JOBS_ES },
  crafts: { ...COMMON_ES, ...CRAFTS_ES },
  skills: { ...COMMON_ES, ...SKILLS_ES },
  dialog: { ...COMMON_ES, ...DIALOG_ES },
  npc: { ...COMMON_ES, ...NPC_ES },
  monsters: { ...COMMON_ES, ...MONSTERS_ES, ...MONSTERS_RACES_ES },
  timezones: { ...COMMON_ES, ...TIMEZONES_ES },
  classes: { ...COMMON_ES, ...CLASSES_ES },
  emotes: { ...COMMON_ES, ...EMOTES_ES },
  guilds: { ...COMMON_ES, ...GUILDS_ES },
  names: { ...COMMON_ES, ...NAMES_ES },
  ranks: { ...COMMON_ES, ...RANKS_ES },
  tips: { ...COMMON_ES, ...TIPS_ES },
  shortcuts: { ...COMMON_ES, ...SHORTCUTS_ES },
  servers: { ...COMMON_ES, ...SERVERS_ES },
  quests: { ...COMMON_ES, ...QUESTS_ES },
  states: { ...COMMON_ES, ...STATES_ES },
  pvp: { ...COMMON_ES, ...PVP_ES },
  hints: { ...COMMON_ES, ...HINTS_ES },
  rides: { ...COMMON_ES, ...MOUNTS_ES },
  kb: { ...COMMON_ES, ...KNOWLEDGEBASE_ES },
  audio: { ...COMMON_ES, ...AUDIO_ES },
  subtitles: { ...COMMON_ES, ...SUBTITLES_ES },
  scripts: { ...COMMON_ES, ...SCRIPTS_ES },
  speakingitems: { ...COMMON_ES, ...SPEAKINGITEMS_ES },
  fightChallenge: { ...COMMON_ES, ...FIGHTCHALLENGE_ES },
  titles: { ...COMMON_ES, ...TITLES_ES },
  maps: { ...COMMON_ES, ...MAPS_ES },
  lang: { ...COMMON_ES, ...LANG_ES },
};
