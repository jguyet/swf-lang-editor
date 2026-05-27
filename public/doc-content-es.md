# Documentacion — Archivos Lang SWF Dofus 1.29

> Referencia tecnica de cada archivo `lang/swf/*.swf` del cliente Dofus 1.29 (AS2).
> Cada seccion corresponde a un tipo de archivo editable en el editor.


---

---

## `alignment`

**Archivo**: `alignment_<lang>_<version>.swf` — **Variable raiz**: `A`

| Seccion | Descripcion |
|---|---|
| `A.a` | Alineamientos (Bonta, Brakmar, Neutral, Mercenario) con `n` = nombre. |
| `A.o` | Ordenes de alineamiento con `n` = nombre, `a` = ID de alineamiento padre. |
| `A.s` | Especializaciones con `n`, `d`, `av` = valor minimo de alineamiento, `f` = dones, `o` = ID de orden. |
| `A.f` | Dones con `n`, `e` = IDs de efectos, `g` = ID de grupo. |
| `A.fe` | Efectos de dones con `d` = descripcion. |
| `A.b` | Niveles de equilibrio de alineamiento. |
| `A.jo` | Matriz: puede un miembro de un alineamiento unirse a una orden? |
| `A.at` | Matriz de ataque: puede un alineamiento atacar a otro? |
| `A.g` | Matriz de ganancia PvP entre alineamientos. |

---

## `audio`

**Archivo**: `audio_<lang>_<version>.swf` — **Variables raiz**: `AUMC`, `AUEC`, `AUAC`, `AUM`, `AUE`, `AUA`

| Seccion | Descripcion |
|---|---|
| `AUMC` | Musicas: nombre interno → ID. |
| `AUEC` | Efectos de sonido: nombre interno → ID. |
| `AUAC` | Ambientes: nombre interno → ID. |
| `AUM` | Archivos de musica por ID. |
| `AUE` | Archivos de efectos de sonido por ID. |
| `AUA` | Archivos de ambiente por ID. |

---

## `classes`

**Archivo**: `classes_<lang>_<version>.swf` — **Variable raiz**: `G`

Cada clase `G[classID]` contiene:

| Clave | Descripcion |
|---|---|
| `sn` | Nombre corto (ej: "Feca"). |
| `ln` | Nombre largo (ej: "El escudo Feca"). |
| `d` | Descripcion larga en HTML (historia de la clase). |
| `sd` | Descripcion corta (una linea, selector de clase). |
| `ep` | Version minima en la que esta clase es jugable. |
| `s` | Tabla de IDs de hechizos de la clase (21 hechizos). |
| `cc` | Perfil de cuerpo a cuerpo por defecto (misma estructura que los niveles de hechizos). |
| `b10`-`b15` | Tablas de costo de mejora por caracteristica (Fuerza, Vitalidad, Sabiduria, Suerte, Agilidad, Inteligencia). Cada tabla = tabla de umbrales `[umbral, costo_por_punto, puntos_por_compra]`. |

---

## `crafts`

**Archivo**: `crafts_<lang>_<version>.swf` — **Variable raiz**: `CR`

Recetas de artesania. Cada entrada `CR[itemID]` define los ingredientes para fabricar un objeto.

| Clave | Descripcion |
|---|---|
| `r` | Ingredientes: `[[itemID1, cantidad], [itemID2, cantidad], ...]`. |
| `s` | ID de la habilidad utilizada. |
| `l` | Nivel requerido. |

---

## `dialog`

**Archivo**: `dialog_<lang>_<version>.swf` — **Variable raiz**: `D`

### `D.q` — Preguntas de los PNJ (por ID)

El texto que dice el PNJ cuando el jugador le habla.

### `D.a` — Respuestas del jugador (por ID)

Las opciones de respuesta clicables mostradas al jugador.

---

## `dungeons`

**Archivo**: `dungeons_<lang>_<version>.swf` — **Variable raiz**: `DU`

| Clave | Descripcion |
|---|---|
| `n` | Nombre de la mazmorra. |

---

## `effects`

**Archivo**: `effects_<lang>_<version>.swf` — **Variable raiz**: `E`

Cada efecto `E[effectID]` describe un bonus o una accion aplicable a un objeto o hechizo.

| Clave | Descripcion |
|---|---|
| `d` | Modelo de descripcion (ej: `"+#1{~1~2 a }#2 Fuerza"`). `#1`, `#2` son reemplazados por los valores calculados. |
| `c` | Caracteristica afectada (Fuerza, Sabiduria, Vitalidad, etc.). |
| `o` | Operador (`+` o `-`). |
| `e` | Elemento de ataque (Neutral, Fuego, Agua, Tierra, Aire). |
| `j` | Booleano — formato de dados (NdM+B). |

**Variables adicionales**: `EDMG` = IDs de efectos de dano mejorables, `EHEL` = IDs de efectos de curacion mejorables.

### Decodificacion de efectos en objetos

Los efectos se almacenan como cadena hexadecimal: `"7d#1#14##"` → ID=125, min=1, max=20. El `PatternDecoder` reemplaza `#1` y `#2` en el modelo de texto.

---

## `emotes`

**Archivo**: `emotes_<lang>_<version>.swf` — **Variable raiz**: `EM`

| Clave | Descripcion |
|---|---|
| `n` | Nombre de la emote (Saludar, Sentarse, Aplaudir, etc.). |
| `s` | Atajo de chat para activar la emote. |

---

## `fightChallenge`

**Archivo**: `fightChallenge_<lang>_<version>.swf` — **Variable raiz**: `FC`

Desafios de combate (desafios bonus durante los combates).

| Clave | Descripcion |
|---|---|
| `n` | Nombre del desafio (ej: "Estatua", "Zombie", "Versatil"). |
| `d` | Descripcion de la condicion a cumplir. |

---

## `guilds`

**Archivo**: `guilds_<lang>_<version>.swf` — **Variable raiz**: `GU`

Mejoras de gremio por caracteristica. Las claves con sufijo `m` = valor maximo de la mejora.

Derechos de gremio (flags binarios): 1=Lider, 2=Mejoras, 4=Derechos, 8=Invitar, 16=Expulsar, 32=XP general, 128=Recaudador, 256=XP propio, 512=Recolectar.

---

## `hints`

**Archivo**: `hints_<lang>_<version>.swf` — **Variables raiz**: `HI`, `HIC`

### `HI` — Indices de mapa (lista)

| Clave | Descripcion |
|---|---|
| `n` | Nombre del punto de interes (Zaap, Banco, Herrero, etc.). |
| `c` | ID de la categoria (referencia `HIC`). |
| `m` | ID del mapa. |
| `g` | ID del pictograma. |
| `x`, `y` | Coordenadas en el mapa del mundo. |

### `HIC` — Categorias de indices (por ID)

| Clave | Descripcion |
|---|---|
| `n` | Nombre de la categoria (Transporte, Comercio, Varios, etc.). |

---

## `houses`

**Archivo**: `houses_<lang>_<version>.swf` — **Variable raiz**: `H`

| Seccion | Descripcion |
|---|---|
| `H.h` | Casas por ID: `n` = nombre. |
| `H.m` | ID de casa por mapa. |
| `H.d` | Puertas por mapa (clave = `c` + numero de celda). |
| `H.ids` | Habilidades disponibles en el interior. |

Flags de comparticion de gremio: 1=Visible, 2/4=Emblema de puerta, 8/16=Acceso a puerta, 32/64=Acceso a cofres, 128=Teletransportacion.

---

## `interactiveobjects`

**Archivo**: `interactiveobjects_<lang>_<version>.swf` — **Variable raiz**: `IO`

| Seccion | Descripcion |
|---|---|
| `IO.g` | Correspondencia GFX → ID de datos. |
| `IO.d` | Definiciones de objetos interactivos por ID: `n` = nombre (Arbol, Trigo, Yunque, etc.). |

---

## `items`

**Archivo**: `items_<lang>_<version>.swf` — **Variable raiz**: `I`

Contiene la base de datos completa de todos los objetos del juego (equipamiento, consumibles, recursos).

### `I.u` — Objetos (por ID)

Cada objeto `I.u[itemID]` tiene estos campos:

| Clave | Descripcion |
|---|---|
| `n` | Nombre del objeto. Puede ser un numero (indice en `I.us` para el texto real). |
| `nn` | Nombre en mayusculas (usado en el chat y las alertas). |
| `d` | Descripcion del objeto. Tambien puede ser un indice en `I.us`. |
| `t` | ID del tipo de objeto (referencia `I.t`). |
| `g` | ID del sprite grafico (GFX). |
| `l` | Nivel minimo requerido para equipar el objeto. |
| `p` | Precio base en kamas. |
| `w` | Peso en pods. |
| `fm` | Booleano — forjable con runas (puede recibir runas via forjamagia). |
| `s` | ID de panoplia (referencia el archivo `itemsets`). Ausente si el objeto no pertenece a ninguna panoplia. |
| `c` | Condiciones de equipamiento (ej: `"CA>100"` = Fuerza > 100). `&` = Y, `|` = O. |
| `ce` | Booleano — objeto ceremonial (solo skin/apariencia). |
| `et` | Booleano — arma eterea (se degrada al usarse). |
| `tw` | Booleano — arma de dos manos (impide llevar escudo). |
| `ep` | Posicion de equipamiento (ranura en el personaje). |
| `h` | Booleano — objeto oculto (invisible en el inventario del jugador). |
| `u` | Booleano — usable sobre uno mismo. |
| `ut` | Booleano — usable sobre un objetivo. |
| `m` | Booleano — maldito (no puede ser tirado ni destruido). |
| `e` | Estadisticas de arma (tabla): `[bonus CC, costo PA, alcance min, alcance max, probabilidad CC (1/N), probabilidad EC (1/N), en linea, linea de vision]`. |

### `I.us` — Diccionario de cadenas

Tabla de textos indexados: cuando `I.u[id].n` es un numero, el texto real es `I.us[ese_numero]`.

### `I.t` — Tipos de objetos (por ID)

| Clave | Descripcion |
|---|---|
| `n` | Nombre del tipo (Amuleto, Anillo, Bota, Capa, Sombrero, etc.). |
| `t` | ID del super-tipo (referencia `I.st`). |
| `z` | Zona de efecto para las armas (pares forma+tamanio). |

### `I.st` — Super-tipos de objetos (por ID)

Nombre generico: `Equipamiento`, `Consumible`, `Recurso`, etc.

### `I.ss` — Ranuras por super-tipo

Lista de IDs de ranuras validas para cada super-tipo.

---

## `itemsets`

**Archivo**: `itemsets_<lang>_<version>.swf` — **Variables raiz**: `IS`, `ISTA`

Contiene las panoplias (conjuntos de objetos que otorgan bonificaciones cuando se combinan).

### `IS` — Panoplias (por ID)

| Clave | Descripcion |
|---|---|
| `n` | Nombre de la panoplia (ej: "Panoplia del Bouftou"). |
| `d` | Descripcion de la panoplia. |
| `i` | Tabla de IDs de los objetos que componen la panoplia. |

### `ISTA` — Bonificaciones de panoplia

Estadisticas otorgadas por cada combinacion de piezas equipadas (2 piezas, 3 piezas, etc.).

---

## `jobs`

**Archivo**: `jobs_<lang>_<version>.swf` — **Variable raiz**: `J`

| Clave | Descripcion |
|---|---|
| `n` | Nombre del oficio (Lenador, Minero, Herrero, etc.). |
| `d` | Descripcion del oficio. |
| `g` | ID del icono grafico. |
| `s` | Otra especializacion relacionada. |

---

## `kb`

**Archivo**: `kb_<lang>_<version>.swf` — **Variables raiz**: `KBC`, `KBA`, `KBD`, `KBT`

Base de conocimientos / ayuda en el juego.

| Seccion | Descripcion |
|---|---|
| `KBC` | Categorias: `n` = nombre. |
| `KBA` | Articulos: `n` = titulo, `c` = contenido. |
| `KBD` | Disparadores (condiciones para mostrar un articulo). |
| `KBT` | Consejos contextuales. |

---

## `lang`

**Archivo**: `lang_<lang>_<version>.swf` — **Sin variable raiz unica**

Archivo especial que contiene todas las cadenas de interfaz del cliente: botones, menus, mensajes de error, dialogos del sistema, etc. Son variables simples (ej: `ACCEPT = "Aceptar"`, `CANCEL = "Cancelar"`).

| Seccion | Descripcion |
|---|---|
| `C` | Configuracion por clave/valor (parametros especificos del idioma). |
| `CNS` | Atajos de consola por defecto. |
| `COM` | Etiquetas de comunidades de servidores. |
| `CSR` | Lista de palabras censuradas. |
| `ABR` | Razones de reporte de abuso. |
| `WEIGHTS` | Catalogo de tamanos de archivos (pantalla de carga). |

---

## `maps`

**Archivo**: `maps_<lang>_<version>.swf` — **Variable raiz**: `MA`

Contiene los datos geograficos: mapas, sub-zonas, zonas y super-zonas.

### `MA.m` — Mapas (por mapID)

| Clave | Descripcion |
|---|---|
| `x` | Coordenada X en el mapa del mundo. |
| `y` | Coordenada Y en el mapa del mundo. |
| `sa` | ID de la sub-zona (referencia `MA.sa`). |
| `c` | Numero maximo de jugadores en un desafio. |
| `t` | Numero maximo de jugadores por equipo. |
| `d` | ID de la mazmorra (si el mapa forma parte de una). |

### `MA.sa` — Sub-zonas (por ID)

| Clave | Descripcion |
|---|---|
| `n` | Nombre de la sub-zona (ej: "Rincon de los Bouftous"). |
| `a` | ID de la zona padre (referencia `MA.a`). |
| `m` | Musicas asociadas. |

### `MA.a` — Zonas (por ID)

| Clave | Descripcion |
|---|---|
| `n` | Nombre de la zona (ej: "Amakna"). |
| `sua` | ID de la super-zona padre (referencia `MA.sua`). |

### `MA.sua` — Super-zonas (por ID)

| Clave | Descripcion |
|---|---|
| `n` | Nombre de la super-zona (ej: "Mundo de los Doce"). |

---

## `monsters`

**Archivo**: `monsters_<lang>_<version>.swf` — **Variables raiz**: `M`, `MR`, `MSR`

### `M` — Monstruos (por ID)

| Clave | Descripcion |
|---|---|
| `n` | Nombre del monstruo. |
| `b` | Categoria (ej: 78 = Jefe). |
| `k` | Booleano — puede ser expulsado de un grupo de monstruos. |
| `a` | Alineamiento (Bonta, Brakmar, Neutral). |
| `g1` a `g5` | Estadisticas por grado. Cada grado contiene `l` (nivel) y `r` (resistencias por elemento). |

### `MR` — Razas de monstruos (por ID)

| Clave | Descripcion |
|---|---|
| `n` | Nombre de la raza (Bouftou, Tofu, Chafer, etc.). |

### `MSR` — Super-razas de monstruos (por ID)

| Clave | Descripcion |
|---|---|
| `n` | Nombre de la super-raza. |

---

## `names`

**Archivo**: `names_<lang>_<version>.swf` — **Variable raiz**: `NF`

| Seccion | Descripcion |
|---|---|
| `NF.n` | Apellidos (por ID). |
| `NF.f` | Nombres de pila (por ID). |

Se usa para generar nombres de personajes aleatorios.

---

## `npc`

**Archivo**: `npc_<lang>_<version>.swf` — **Variable raiz**: `N`

### `N.d` — PNJ (por ID)

| Clave | Descripcion |
|---|---|
| `n` | Nombre del PNJ (ej: "Otomai"). |
| `a` | Tabla de IDs de acciones disponibles en este PNJ. |

### `N.a` — Acciones de los PNJ (por ID)

Texto de las acciones: 1 = Intercambiar, 3 = Hablar, 4/5/6 = Comprar/Vender.

---

## `pvp`

**Archivo**: `pvp_<lang>_<version>.swf` — **Variable raiz**: `PP`

| Seccion | Descripcion |
|---|---|
| `PP.hp` | Limites de puntos de honor por grado. |
| `PP.maxdp` | Puntos de deshonor maximos. |
| `PP.grds` | Grados por faccion de alineamiento. Cada grado: `nl` = nombre largo, `nc` = nombre corto. |

---

## `quests`

**Archivo**: `quests_<lang>_<version>.swf` — **Variable raiz**: `Q`

Sistema de misiones estructurado en 3 niveles: Misiones > Etapas > Objetivos.

### `Q.q` — Misiones (por ID)

Nombre de la mision. Los flags `isAccountQuest` e `isRepeatableQuest` se gestionan en el lado del servidor.

### `Q.s` — Etapas (por ID)

| Clave | Descripcion |
|---|---|
| `n` | Nombre de la etapa. |
| `d` | Descripcion de la etapa. |
| `r` | Recompensas: `r[0]` = XP, `r[1]` = Kamas, `r[2]` = Objetos `[[itemID, cant], ...]`, `r[3]` = Emotes, `r[4]` = Oficios, `r[5]` = Hechizos. |

### `Q.o` — Objetivos (por ID)

| Clave | Descripcion |
|---|---|
| `t` | ID del tipo de objetivo (referencia `Q.t`). |
| `p` | Parametros segun el tipo. |
| `x`, `y` | Coordenadas para la brujula (si aplica). |

### `Q.t` — Tipos de objetivos (por ID)

Modelo de texto del objetivo. Tipos: 0/4 = texto libre, 1/9/10 = hablar con un PNJ, 2/3 = entregar objetos, 5 = descubrir una zona, 6/7 = matar monstruos, 8 = usar un objeto, 12 = escoltar/vencer.

---

## `ranks`

**Archivo**: `ranks_<lang>_<version>.swf` — **Variable raiz**: `R`

Rangos de gremio por ID: `n` = nombre del rango (Aprendiz, Brazo derecho, Lider, etc.).

---

## `rides`

**Archivo**: `rides_<lang>_<version>.swf` — **Variables raiz**: `RI`, `RIA`

### `RI` — Monturas (por ID)

| Clave | Descripcion |
|---|---|
| `n` | Nombre del modelo de montura. |
| `g` | ID del sprite grafico. |
| `c1`, `c2`, `c3` | Colores por defecto (primario, secundario, terciario). |

### `RIA` — Habilidades de monturas (por ID)

| Clave | Descripcion |
|---|---|
| `n` | Nombre de la habilidad (ej: Camaleon = habilidad 9). |

---

## `scripts`

**Archivo**: `scripts_<lang>_<version>.swf` — **Variable raiz**: `SCR`

Textos de tutoriales y dialogos con guion. Cada `SCR[id]` = texto.

---

## `servers`

**Archivo**: `servers_<lang>_<version>.swf` — **Variables raiz**: `SR`, `SRP`, `SRPW`, `SRC`, `SRVT`, `SRVC`

| Seccion | Descripcion |
|---|---|
| `SR` | Servidores por ID: `n` = nombre, `d` = descripcion. |
| `SRP` | Etiquetas de poblacion (Bajo, Medio, Alto, Completo). |
| `SRPW` | Pesos de poblacion por ID. |
| `SRC` | Comunidades de servidores: `n` = nombre interno, `d` = nombre mostrado. |
| `SRVT` | Plantillas de texto de servidor: `l` = etiqueta de referencia, `d` = valor por defecto. |
| `SRVC` | Sobreescrituras de texto por servidor (clave = textID|serverID). |

Tipos de servidores (`t`): 0 = Clasico, 1 = Hardcore, 3 = 1.29, 4 = Retro, 5 = Mono-cuenta, 6 = Temporis.

---

## `shortcuts`

**Archivo**: `shortcuts_<lang>_<version>.swf` — **Variables raiz**: `SSC`, `SH`, `SST`, `SSK`

| Seccion | Descripcion |
|---|---|
| `SSC` | Categorias de atajos (por ID). |
| `SH` | Atajos (por ID). |
| `SST` | Conjuntos de atajos. |
| `SSK` | Teclas del teclado (clave = setID|atajo). |

---

## `skills`

**Archivo**: `skills_<lang>_<version>.swf` — **Variable raiz**: `SK`

Cada habilidad `SK[skillID]` representa una accion interactiva (recolectar, forjar, etc.).

| Clave | Descripcion |
|---|---|
| `d` | Nombre/descripcion de la habilidad. |
| `j` | ID del oficio asociado (referencia `jobs`). |
| `c` | Condiciones de uso. |
| `i` | ID del objeto recolectado o fabricado. |
| `io` | ID del objeto interactivo asociado (arbol, yunque, etc.). |
| `cl` | Lista de IDs de objetos que esta habilidad puede crear. |
| `f` | Nivel de forjamagia requerido. |

---

## `speakingitems`

**Archivo**: `speakingitems_<lang>_<version>.swf` — **Variables raiz**: `SIM`, `SIT`

Objetos parlantes (familiares y objetos vivos que muestran mensajes).

| Seccion | Descripcion |
|---|---|
| `SIM` | Mensajes por ID (lo que dice el objeto). |
| `SIT` | Disparadores por ID (cuando habla el objeto). |

---

## `spells`

**Archivo**: `spells_<lang>_<version>.swf` — **Variable raiz**: `S`

Contiene todos los hechizos del juego. Cada hechizo `S[spellID]` tiene metadatos globales y 6 niveles (`l1` a `l6`).

### Metadatos del hechizo

| Clave | Descripcion |
|---|---|
| `n` | Nombre del hechizo. |
| `d` | Descripcion del hechizo. |
| `i` | ID del icono grafico. |
| `b` | ID de la clase que posee el hechizo. |
| `c` | Categoria (1=Comun, 2=Raro, 3=Epico, 4=Legendario). |
| `t` | Tipo de hechizo. |
| `o` | Origen del hechizo. |
| `p` | Booleano — hechizo pasivo. |
| `g` | Booleano — el enfriamiento afecta a todo el equipo. |

### Niveles `l1` a `l6` — Tabla de 21 valores

| Indice | Descripcion |
|---|---|
| `0` | Efectos en golpe normal (tabla de cadenas de efectos). |
| `1` | Efectos en golpe critico (tabla de cadenas de efectos). |
| `2` | Costo en PA (Puntos de Accion). |
| `3` | Alcance minimo. |
| `4` | Alcance maximo. |
| `5` | Probabilidad de golpe critico (1 en N). |
| `6` | Probabilidad de fallo critico (1 en N). |
| `7` | Booleano — lanzamiento solo en linea recta. |
| `8` | Booleano — requiere linea de vision. |
| `9` | Booleano — debe apuntar a una celda vacia. |
| `10` | Booleano — el alcance puede ser aumentado por las estadisticas. |
| `11` | ID de clase requerida (0 = sin restriccion). |
| `12` | Numero maximo de lanzamientos por turno. |
| `13` | Numero maximo de lanzamientos por turno por objetivo. |
| `14` | Enfriamiento (turnos de espera entre usos). |
| `15` | Zonas de efecto codificadas (decodificacion via `ank.utils.Compressor.decode64()`). |
| `16` | Estados requeridos para lanzar (tabla de IDs de estados). |
| `17` | Estados que impiden el lanzamiento (tabla de IDs de estados). |
| `18` | Nivel minimo de personaje para este nivel del hechizo. |
| `19` | Booleano — un fallo critico termina el turno. |
| `20` | ID interno del nivel de hechizo. |

---

## `states`

**Archivo**: `states_<lang>_<version>.swf` — **Variable raiz**: `ST`

Estados de combate por ID. Cada estado `ST[stateID]` contiene `n` = nombre del estado.

Estos estados modifican las estadisticas en tiempo real (resistencias, dano). Ejemplos de Temporis: `STATE_TEMPORIS_1_NEW_SRAM`, `STATE_TEMPORIS_1_NEW_PANDAWA`.

---

## `subtitles`

**Archivo**: `subtitles_<lang>_<version>.swf` — **Variable raiz**: `SUB`

Subtitulos de cinematicas/trailers. Cada `SUB[trailerID]` = tabla de lineas de subtitulos.

---

## `timezones`

**Archivo**: `timezones_<lang>_<version>.swf` — **Variable raiz**: `T`

Etiquetas de zonas horarias por ID.

---

## `tips`

**Archivo**: `tips_<lang>_<version>.swf` — **Variable raiz**: `TI`

Consejos mostrados en la pantalla de carga. Cada `TI[id]` = texto del consejo.

---

## `titles`

**Archivo**: `titles_<lang>_<version>.swf` — **Variable raiz**: `PT`

| Clave | Descripcion |
|---|---|
| `t` | Texto del titulo (puede contener `%1` reemplazado por un nombre de monstruo). |
| `c` | Color del titulo (valor RGB como entero). |
| `pt` | Tipo: 0 = texto plano, 1 = nombre de monstruo inyectado en `%1`. |

---

## Anexos tecnicos

### Sistema de cadenas indexadas (`fetchString`)

Para ahorrar memoria, muchos nombres/descripciones no se almacenan como texto plano sino como un numero. El cliente llama a `fetchString(numero)` que busca en `I.us[numero]`. Si el texto contiene tokens del servidor (`SRVT:12`), son reemplazados por el nombre local del servidor.

### Decodificacion de efectos de objetos

Los efectos se transmiten en hexadecimal: `"7d#1#14##"`. El cliente divide por `#`, convierte a decimal (7d=125, 1=1, 14=20), busca el modelo de texto en `E[125]`, y reemplaza `#1`/`#2` por los valores. Los bloques `{~1~2 ...}` son condicionales (mostrados solo si los parametros existen).

### Protocolo de red (AKS)

Cada paquete entrante/saliente comienza con 1-2 letras: `H` = Conexion, `A` = Cuenta, `c` = Chat, `D` = Dialogos de PNJ, `S` = Hechizos, `O` = Inventario, `J` = Oficios, `E` = Intercambios, `g` = Gremios, `W` = Zaaps, `Q` = Misiones, `R` = Monturas, `P` = Grupo, `GA` = Acciones de combate.

---

*Documentacion generada por ingenieria inversa del cliente ActionScript 2 de Dofus 1.29.*
