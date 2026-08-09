# Proyecto: Web de presentación freelance — Joaco

## Qué es esto
Landing page de una página. Es la carta de presentación de Joaco como freelance de
desarrollo web. Sirve para que cualquier prospecto (de cualquier rubro) entienda qué
hace, cuánto cuesta, cómo es el proceso, y lo contacte. NO es un sitio para un cliente
puntual — es la vidriera del negocio.

## Cómo trabajar en este proyecto
No preguntes primero por decisiones de diseño o de copy sin antes investigar qué
funciona (buscar en la web tendencias actuales, ejemplos de sitios freelance/dev que
conviertan bien, prácticas de UX para landing pages de servicios). Proponé con
fundamento, no solo con gusto personal. Preguntá solo lo que la investigación no
pueda resolver (preferencias puramente personales, datos que solo Joaco tiene: número
de WhatsApp real, precios, etc). Ojo: acá decía "fotos" y estaba mal — no van fotos de
Joaco en el sitio, ver "Qué NO hacer".

## Perfil de Joaco
Estudiante avanzado de Tecnólogo en Informática (UTU, Uruguay), último año, perfil
dev. Sabe HTML/CSS/JS. Sin experiencia freelance previa — este es el primer negocio.

## Rubro y posicionamiento
El mensaje central de esta web es **general** — "desarrollo web para pequeños
negocios y profesionales independientes" — no menciona un rubro específico. El rubro
principal donde va a salir a buscar clientes activamente es **salud** (nutricionistas,
psicólogos, fisioterapeutas — profesionales independientes con consultorio propio).
Gastronomía queda como secundario/oportunista, no se menciona ni se diseña para eso
todavía. El rubro específico solo debe aparecer más adelante en la sección de
portfolio/casos, cuando haya piezas de ejemplo reales — no en el mensaje principal.

## Contenido (primera persona, español neutro/profesional — NO rioplatense informal,
esto lo va a leer un cliente, no es una charla informal)

**Bio / apertura**
Estudiante avanzado de Tecnólogo en Informática (UTU), desarrollo web para pequeños
negocios y profesionales independientes.

**Gancho / problema que resuelve**
Un cliente te busca, entra a tu web y no encuentra cómo contactarte, o la ve desde el
celular y no carga bien. Ahí ya lo perdiste, antes de que sepa lo que hacés. Armo
sitios simples y rápidos donde contactarte es lo más fácil de la página, se ven bien
desde cualquier celular, y transmiten la misma seriedad que tu negocio tiene en
persona.

**Paquete** (**precio de introducción** — dejarlo explícito en la web como temporal y
que va a subir, no como precio fijo permanente. Sin vocabulario de descuento: nada de
"oferta", "promoción" ni "rebaja", que asocian el trabajo con lo barato y hacen más
difícil cobrar el precio pleno después)
- **USD 90, paquete único**: una página (quién sos, qué ofrecés, cómo te contactan,
  ubicación si aplica) + sección de servicios detallada + preguntas frecuentes +
  reserva de turnos o WhatsApp directo.

**Un solo paquete es una decisión de negocio deliberada (agosto de 2026), no un
estado transitorio.** Antes eran dos —Presencia USD 90 y Completo USD 130— y se
unificaron en uno solo con el alcance completo. Dos consecuencias, las
dos obligatorias:
- **No proponer volver a partirlo en dos.** Ni "básico y completo", ni una opción
  más barata, ni sacar algo del alcance para venderlo como extra pago.
- **No sugerir subir el precio salvo que Joaco lo pida.** Que la web lo anuncie
  como precio de introducción es una decisión sobre *cómo se comunica*, para poder
  subirlo algún día sin quedar mal con nadie. No es una invitación a proponer la
  suba, ni un pendiente a levantar en cada sesión.

**Al cambiar el precio hay que tocar SEIS lugares, repartidos en tres archivos.** El
precio de introducción va a subir cuando Joaco lo decida, así que esto va a pasar.
Los lugares se nombran por su función y no por lo que dicen hoy: si este
procedimiento repitiera el número, cada corrección del conteo agregaría un lugar más
que mantener.
- En `index.html`, **tres**: el total del presupuesto de `#paquetes`
  (`quote__total`), y dentro del JSON-LD de `ProfessionalService` los campos
  `priceRange` y `Offer.price`. Si alguno queda viejo, el sitio se contradice a sí
  mismo en el resultado de búsqueda.
- En **este mismo archivo**, **dos**: el bullet del paquete único en "Paquete", más
  arriba, y el bullet de "No proponer volver a dos paquetes" en "Qué NO hacer". Si
  quedan viejos es peor que en la web, porque el próximo que lea este CLAUDE.md toma
  el precio viejo como fuente de verdad y lo vuelve a propagar.
- En `README.md`, **uno**: el bullet del paquete único en "Decisiones que conviene no
  romper". Este es el que faltaba: hasta el 7/8/2026 este mismo párrafo afirmaba que
  el README no tenía precios, y sí los tenía.

**Y dos cosas que NO se tocan**, que es la trampa del otro lado:
- Las menciones históricas de los dos paquetes viejos, acá y en el README. Describen
  lo que había antes de unificarlos; actualizarlas borra el registro de por qué no
  hay que volver a partir el paquete en dos.
- Los ejemplos de búsqueda de este procedimiento y del README, donde el número
  aparece como texto de ejemplo y no como precio.

Es el mismo riesgo de desincronización por el que se eliminó el bloque `FAQPage`.
Verificado por grep el 7/8/2026 buscando el número pelado en todo el repo: aparte de
los seis, lo único que sale es un canal de color en `tools/og-image.html` y los
ejemplos de búsqueda. `css/styles.css` no aparece: su único match es un ratio de
contraste con un punto delante, que la búsqueda del número pelado no encuentra. La
imagen de OG no muestra precios.

⚠ **Buscar `"USD 90"` no encuentra el total.** El markup es
`<span class="quote__cur">USD</span>90`, con la moneda en su propio elemento: hay
que buscar el número pelado.

**Qué significa "reserva de turnos"** (definido en agosto de 2026 — antes estaba
vendido sin definir; venía del paquete Completo, que ya no existe como opción
separada porque su alcance es el del paquete único):
- Es la agenda online **del propio cliente** (Calendly, Google Calendar u otra),
  conectada desde el sitio. La cuenta es suya: Joaco la configura, no es titular.
  Que sea suya es lo que evita quedar atado a mantener cuentas ajenas, y lo que
  hace que si un día deja de trabajar con él, la agenda siga funcionando.
- **Embed o enlace se decide por cliente**, no hay una regla fija. El embed inline
  está disponible en el plan gratuito de Calendly y convierte mejor que mandar al
  visitante fuera del dominio, así que se usa cuando la reserva es la acción
  principal de esa página. Enlace cuando es secundaria. La regla de "cero
  dependencias externas" es de esta landing, no de los sitios de clientes: acá no
  aplica.
- **Los planes gratuitos aprietan rápido en salud.** Calendly free da 1 tipo de
  evento, 1 calendario conectado y sin recordatorios automáticos (eso es plan pago,
  del orden de USD 10-12 por usuario al mes). Google Calendar en cuentas personales
  y Business Starter queda en una sola página de reserva y sin recordatorios
  automáticos por mail. Un nutricionista con "primera consulta" y "seguimiento" ya
  son dos tipos de evento: se pasó. Y sin recordatorios, hay no-shows. Ese costo es
  del cliente y **se le avisa ANTES de cerrar el trato**, no cuando se topa con el
  límite.
- **Riesgo de falla silenciosa** — es el mismo motivo por el que no se usan
  formularios: si al cliente se le vence la prueba, se le desconecta el calendario o
  cierra la cuenta, el botón de reservar sigue visible y no reserva nada, y él no se
  entera. No se arregla con una regla de diseño. Se arregla con dos cosas, ambas
  obligatorias en la entrega:
  1. Probar la reserva de punta a punta —reservar de verdad y verificar que el turno
     aparece en el calendario del cliente— **en dos momentos, los dos obligatorios**:
     antes de publicar en el enlace de prueba, y **de nuevo después de migrar al
     dominio propio del cliente** (paso 5 del Proceso). No alcanza con el primero: si
     el embed de la agenda tiene restricción por dominio, anda en el subdominio de
     prueba y se rompe en el dominio final, que es la misma falla silenciosa un rato
     más tarde.
  2. Dejarle por escrito qué parte depende de él: que la cuenta es suya, que si la
     desactiva el botón deja de funcionar, y que eso el sitio no lo puede detectar.

  El checklist con el que se corre esto está en `entrega/reserva-de-turnos.md`, junto
  con el texto modelo del punto 2.

**Proceso**
1. Charla breve por WhatsApp o llamada (15-20 min) para entender qué necesita.
2. Propuesta por escrito (qué incluye, plazo y precio). No se programa nada hasta que
   el cliente la aprueba.
3. Se arma el sitio completo en un enlace de prueba, para que lo vea funcionando
   antes de pagar nada.
4. Hasta dos rondas de cambios incluidas. Si quiere más, se cotizan aparte.
5. Si le gusta, paga el precio acordado y se migra a su dominio. Si después de los
   ajustes no es lo que buscaba, no paga nada.

**Tres promesas comerciales que la web ya hace**, y que hasta ahora vivían solo en
`index.html` (las dos primeras en las preguntas frecuentes). Son compromisos con el
cliente, no ideas a revisar: si algo del sitio o de una propuesta las contradice, lo
que está mal es lo otro.
- **Plazo de entrega: entre 5 y 10 días** desde la primera charla, según cuánto
  material tenga listo el cliente. Si tiene apuro por una fecha puntual, se coordina.
- **Durante el primer mes después de publicar, los cambios chicos van sin costo** —un
  precio, un horario, un texto—. Pasado ese mes se ven por cambio puntual, siempre con
  el precio arreglado de antemano. Ojo que esto es *además* de las dos rondas, que son
  antes de publicar: son dos cosas distintas y la web las distingue.
- Las rondas más allá de las dos incluidas **se cotizan aparte**, pasándole el precio
  antes de tocar nada. Es lo mismo que dice el punto 4 de acá arriba — está anotado
  para que se sepa que ya está cubierto y no se agregue de nuevo.

**Garantía**
No se cobra nada por adelantado. El cliente ve el sitio terminado y funcionando antes
de decidir. Si no lo convence después de los ajustes, no debe nada.

**Portfolio / casos**
Sección vacía por ahora, o directamente omitida hasta que existan piezas reales.
Cuando existan (proyectos de ejemplo en el rubro salud), van acá con capturas —
es el único lugar donde el rubro específico se nombra.

**Contacto**
WhatsApp como canal principal. El número real ya está confirmado y publicado:
+598 98 436 346, que en los enlaces `wa.me` va como `59898436346` (sin `+`, sin
espacios y sin el 0 inicial). No es un placeholder — no lo reemplaces por uno.
Sin formulario de contacto que pueda fallar silenciosamente — si hay formulario,
que también muestre el WhatsApp como alternativa visible.

## Dirección de diseño
- Minimalista, tema oscuro.
- Tipografía con personalidad, no system font genérica — elegir algo que transmita
  intención, no un default. Hoy son **Bricolage Grotesque** (títulos) y **Hanken
  Grotesk** (cuerpo), self-hosted en `assets/fonts/`.
  **El cambio de fuentes engordó la carga y fue a propósito.** Antes eran Space
  Grotesk e Inter y pesaban **68,9 KB** entre las dos (22.288 + 48.256 bytes);
  las de ahora pesan **109,0 KB** (Bricolage 76.888 + Hanken 34.704 bytes). Son
  **40,1 KB más, un 58%**. No es un descuido ni algo a optimizar: las dos caras
  viejas son las más asociadas a los sitios generados con IA, y estaban usadas
  juntas. Se pagó ese peso por identidad visual, con los ojos abiertos. Si alguien
  audita la performance y encuentra las fuentes como el archivo más pesado del
  sitio: ya se sabe, y la respuesta es que se queda. Medido el 8/8/2026 sobre los
  archivos reales; los pesos viejos salen de `git show c978b49^`.
- **Dos colores con roles fijos** (decisión de agosto de 2026; antes era un solo
  acento). **Pizarra frío** para la estructura del documento: superficies,
  espinazo, reglas, números de paso, etiquetas, el marcador del acordeón. Nunca es
  accionable. Y **un único acento ámbar `#FFB454`** reservado para lo accionable y
  para el momento del pago. La regla que sostiene el sistema: **el texto de lectura
  no se tiñe** —`--text` y `--muted` quedan neutros—, porque si el cuerpo también se
  va al azul la página se vuelve monocroma fría y esto deja de leerse como dos
  colores con roles distintos para leerse como un filtro encima. Alto contraste,
  mucho espacio en negro.
- Mobile-first: la mayoría de quien visite esto lo va a hacer desde el celular.
- Rápido: nada de imágenes pesadas ni animaciones que retrasen la carga.
- CTA de contacto (WhatsApp) visible sin scrollear, no escondido al final.

## Stack y deploy
- Sitio estático simple: HTML/CSS/JS plano (o herramienta liviana si aporta
  velocidad de desarrollo, pero sin pasarse de complejidad para una landing de una
  página).
- Deploy en GitHub Pages, gratis, con subdominio `github.io` para arrancar. Dominio
  propio (opcional, con costo) se evalúa más adelante, no ahora.
- **DigitalPlat FreeDomain**: upgrade gratis sobre `mosland.github.io`, **solo uso
  personal, nunca para sitios de clientes** (si el servicio cierra, se cae el sitio).
- Lo que **sí** se reusa para los sitios de clientes es el approach: mostrarlo
  publicado y funcionando en un subdominio gratis antes de cobrar nada. Lo que **no**
  se reusa es la plataforma — ver acá abajo.

### Dónde viven los sitios de clientes (decidido en agosto de 2026)

Esto estuvo abierto un tiempo y ya está cerrado. **Son dos plataformas distintas y no
se mezclan.**

**GitHub Pages queda solo para esta web, la de presentación de Joaco.** No se usa para
sitios de clientes, por dos motivos independientes de los que cada uno alcanza solo:
- Los *Terms for Additional Products and Features* de GitHub dicen que Pages "is not
  intended for or allowed to be used as a free web hosting service to run your online
  business". Alojar ahí el negocio de un tercero es exactamente eso. Quien interpreta
  la cláusula es GitHub, no nosotros, y lo que puede hacer es bajar el sitio.
- Solo se permite **un user/org site por cuenta**, y el de Joaco ya lo ocupa este repo.

**Los sitios de clientes van en Cloudflare Pages, gratis, en una cuenta que abre y de
la que es titular el CLIENTE.** Joaco ayuda a configurarla porque es sencillo, pero no
queda como dueño de la cuenta ni pagando nada. Es el mismo principio que ya rige para
la agenda de turnos, y por los mismos dos motivos: es lo que evita quedar de proveedor
de hosting permanente de cada sitio entregado, y lo que hace que si un día el cliente
deja de trabajar con Joaco, el sitio siga siendo suyo y se lo pueda llevar sin
depender de nadie.

**El dominio propio lo compra el cliente, donde quiera.** Si no tiene preferencia, se
le puede sugerir Cloudflare Registrar: cobra el precio del registro sin margen encima,
y si ya va a usar Cloudflare Pages le queda todo en la misma cuenta. Es una sugerencia
y no un requisito — el sitio anda igual con el dominio comprado en cualquier lado, y
anda igual sin dominio propio.

**Trigger a futuro, no ahora:** si algún día Cloudflare Pages deja de alcanzar, mirar
**Workers (Static Assets)**. Es donde Cloudflare está poniendo la inversión —su propia
doc recomienda arrancar ahí los proyectos nuevos y aclara que Pages sigue soportado
pero sin trabajo de features nuevo— y migrar es trivial porque son los mismos archivos
estáticos. **No hay nada que hacer hoy con esto**: es para cuando aparezca el
problema, no un pendiente a levantar en cada sesión.

## Herramientas de Claude Code en este proyecto

Inventario de qué está instalado, qué está postergado y qué se descartó. Sirve para
dos cosas: que una máquina nueva sepa qué esperar, y que no se vuelva a proponer algo
que ya se evaluó y se rechazó. Verificado el 8/8/2026 probando cada cosa con una
acción real, no leyendo los archivos de configuración.

**Todo va en project scope**, en archivos que se commitean, para que viaje a la otra
computadora. El `enabledPlugins` del scope de usuario está vacío a propósito.

⚠ **MCP y plugin no son lo mismo, y se confunden fácil.** Un MCP es un servidor que se
declara en `.mcp.json` y se habilita por máquina. Un plugin viene de un marketplace, se
declara en `.claude/settings.json` y aporta skills o comandos. Archivos distintos,
aprobación distinta.

**Activos**
- **Playwright MCP** (Microsoft) — el único servidor MCP del proyecto. Declarado en
  `.mcp.json` y habilitado por máquina en `.claude/settings.local.json`. Ojo que su
  chromium no es el mismo que el de `tools/verificar.js`: ver el README.
- **frontend-design** — **plugin, no MCP**, del marketplace `claude-plugins-official`.
  Aporta una skill de dirección de diseño. Estuvo anotado como "frontend-design MCP" y
  no existe tal servidor; `.mcp.json` tiene uno solo y es Playwright. Instalado sin
  versión fija (queda como `unknown`), así que su contenido puede cambiar sin aviso.
- **claude-md-management** — plugin del mismo marketplace, versión 1.0.0. Aporta la
  skill `claude-md-improver` y el comando `/revise-claude-md`. Estaba habilitado en
  `.claude/settings.json` desde el 7/8/2026 sin figurar en ningún inventario.

**Fuera del inventario del proyecto, pero corre igual: `godot-ai`**

No es parte de esta configuración y por eso no está en la lista de arriba: es un
servidor MCP de **scope usuario**, declarado en `~/.claude.json`, que corre en
cualquier proyecto que se abra en esta computadora. Va acá igual porque **puede romper
las pruebas locales de este repo**: escucha en el **puerto 8000**, el mismo que usan el
servidor de preview y `tools/verificar.js`. Windows permite que los dos procesos hagan
bind al mismo puerto, así que el servidor de preview arranca sin quejarse y las
conexiones caen en cualquiera de los dos.

⚠ El síntoma no se parece a un problema de puerto: `verificar.js` reporta que **falta
cada elemento del sitio**, uno por uno, como si la landing se hubiera roto entera. Ya
pasó una vez, verificado el 8/8/2026. La salida es correr todo en otro puerto
(`python -m http.server 8899` y `node tools/verificar.js 8899`); está documentado en el
README.

**Diferidos, con el disparador que los activaría**
- **impeccable** — cuando arranque el trabajo con clientes. ⚠ **Reemplaza a
  frontend-design, no se suman:** mismo asiento de dirección estética.
- **task-observer** — mismo disparador que impeccable. Necesita volumen de sesiones
  para rendir.
- **emil-design-eng** — si hace falta refinar animación. Cobertura parcial en
  HTML/CSS plano: parte del skill asume React.
- **Figma MCP** — cuando un cliente pase un archivo de Figma. El costo es el seat de
  Figma, no el MCP.
- **Claude Design** — en la fase de outreach.

Diferido acá significa que **no está instalado**. No dejan rastro en ninguna
configuración, así que esta lista es el único lugar donde consta que se los consideró.

**Evaluados y rechazados para este proyecto**
Superpowers, Context7, agent-browser, Strix, Claude Web Builder, The Architect,
ui-ux-pro-max-skill, 21st.dev MCP, taste-skill, Vercel y **GitHub MCP**.

**GitHub MCP se rechazó porque el acceso a GitHub ya existe por otro lado:**
`.claude/settings.json` aprueba `Bash(gh *)` y `PowerShell(gh *)`, así que el CLI `gh`
cubre PRs, issues y lo demás sin sumar un servidor más que arrancar, aprobar y
mantener. El rechazo se apoya en que ese permiso está: si algún día se saca, hay que
reevaluarlo.

No volver a proponer nada de la lista de rechazados salvo que haya cambiado el motivo
por el que se descartó.

**Motivos completos de cada rechazo: ver Notion, página Skills Pluging MCP, sección
Proyecto Web Personal. No proponer nada de esta lista sin revisar ahí primero si
cambió el motivo.** Los motivos viven allá a propósito, para no cargar en cada sesión
algo que se consulta rara vez.

**No instalar ni proponer ninguna herramienta externa nueva —MCP, plugin, skill o
servicio— sin preguntarle a Joaco primero.** Y cuando haga falta evaluar algo nuevo,
**buscar antes en esa misma página de Notion si ya se evaluó**, en vez de investigar
de cero: ahí están también los diferidos, los que quedaron en pausa y los que se
miraron y no entraron en ninguna lista de acá.

## Qué NO hacer
- **No poner fotos de Joaco en el sitio.** Ni en el hero, ni en "Sobre mí", ni como
  marca, ni en la imagen de OG. Es una preferencia personal y está decidida: no hace
  falta justificarla, no hay que proponer variantes con foto ni volver a levantarlo
  como oportunidad de mejora, aunque la evidencia de conversión diga que una foto
  real del prestador ayuda —ese dato ya se conoce y la decisión es igual—. Las
  capturas de trabajos en la sección de portfolio son otra cosa y sí van, cuando
  existan piezas reales.
- No mencionar el rubro salud (ni ningún rubro) en el mensaje principal.
- No presentar el precio de introducción como precio fijo sin aclarar que va a subir,
  ni presentarlo con lenguaje de oferta/promoción/descuento.
- **No proponer volver a dos paquetes.** El paquete único de USD 90 es una decisión
  de negocio tomada en agosto de 2026, no un recorte temporal ni algo a optimizar.
  Nada de "básico y completo", ni una opción más barata, ni mover algo del alcance
  a un extra pago.
- **No sugerir subir el precio salvo que Joaco lo pida explícitamente.** Que la web
  diga "precio de introducción" define cómo se comunica el precio para poder subirlo
  algún día sin quedar mal; no es un pendiente a levantar en cada sesión.
- No agregar formularios de contacto sin alternativa de WhatsApp visible.
- No copiar el estilo dark-minimalista para futuras piezas de portfolio de clientes
  de salud — ese es un proyecto aparte con su propia dirección de diseño (cálida,
  clara), no se mezcla con este.
- No volver a agregar el JSON-LD de `FAQPage`. Se sacó en agosto de 2026: desde
  agosto de 2023 Google limita los rich results de FAQ a sitios de gobierno y salud
  reconocidos, así que esta landing nunca fue elegible, y en mayo de 2026 se retiró
  del todo. Era doble edición de cada pregunta a cambio de nada.
- No prometer en la web que el hosting es gratis, ni afirmar nada sobre el plan
  gratuito de un tercero a futuro, ni comprometerse a sostener el hosting de forma
  indefinida. La web promete una sola cosa: que el sitio queda publicado y
  funcionando, y que eso no se cobra. Son dos riesgos distintos y los dos importan:
  el proveedor puede cambiar sus condiciones y esa cuenta la terminaría pagando el
  cliente, y una promesa abierta deja a Joaco de proveedor de hosting permanente de
  cada sitio que entregó. ⚠ **Que ya esté decidido dónde viven los sitios de clientes
  no habilita a anunciarlo en la web.** La decisión resuelve dónde se publica; no
  cambia lo que se promete, y los dos riesgos de arriba siguen igual de vivos. Si
  algún día se quiere cambiar ese texto, es una decisión aparte y la toma Joaco.
