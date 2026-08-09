# Proyecto: Web de presentación freelance — Joaco

## Qué es esto

Landing page de una sola página: la carta de presentación de Joaco como freelance de
desarrollo web. Sirve para que cualquier prospecto entienda qué hace, cuánto cuesta, cómo
es el proceso, y lo contacte. **Es la vidriera del negocio, no el sitio de un cliente.**

Este archivo guarda el **porqué** de las decisiones. El **cómo** se hace cada tarea está en
`README.md`; **qué hay hecho hoy** en `ESTADO.md`; **qué falta** en `PLAN.md`.

## Cómo trabajar acá

- **Investigá antes de proponer.** Para cualquier cambio de copy o de diseño: al menos una
  búsqueda web sobre qué funciona, y **la fuente citada en la propuesta**. Si no la citaste,
  no investigaste. Preguntá solo lo que la investigación no pueda resolver: preferencias
  personales y datos que solo Joaco tiene.
- **Push inmediato.** Cada commit se pushea en el mismo comando. No se acumulan commits
  locales. Va directo a `main`: **este repo no usa ramas.**
- **Avisá la expansión de alcance en el mismo mensaje.** Si en el camino se hizo algo fuera
  de lo pedido, se dice **en el mensaje en que se entrega** —qué se hizo de más y por qué—.
  No en un mensaje aparte, no después.
- **Mantené `ESTADO.md` y `PLAN.md`.** Si un cambio deja `ESTADO.md` viejo, se actualiza en
  el mismo commit. ⚠ Su sección 6 **no se edita a mano**: se regenera con el servidor
  levantado en 8899 —`node tools/verificar.js 8899 --resumen` y `node tools/consistencia.js`.
  Lo que quede pendiente va a `PLAN.md`, no a un comentario en el código.
- **Usá `/plan` antes de:** tocar más de dos archivos, cambiar el precio o copy ya
  publicado, o instalar cualquier herramienta. No para un typo ni un cambio de una línea.
- **Un dato que aparece en dos archivos es una regla de consistencia nueva.** Antes de
  duplicar algo, conviene apuntarlo en `tools/consistencia.js`.

## Perfil y posicionamiento

Estudiante avanzado de Tecnólogo en Informática (UTU, Uruguay), último año, perfil dev.
Sabe HTML/CSS/JS. **Sin experiencia freelance previa — este es el primer negocio.**

El mensaje central de la web es **general**: "desarrollo web para pequeños negocios y
profesionales independientes". El rubro donde va a buscar clientes activamente es **salud**
(nutricionistas, psicólogos, fisioterapeutas), y gastronomía queda como secundario — pero
**nada de eso se nombra en el sitio**. El rubro específico solo aparece más adelante, en la
sección de portfolio, cuando existan piezas reales.

## El negocio

**Paquete único: USD 90**, precio de introducción. Incluye una página (quién sos, qué
ofrecés, cómo te contactan, ubicación si aplica) + sección de servicios detallada +
preguntas frecuentes + reserva de turnos o WhatsApp directo.

**Un solo paquete es una decisión de negocio deliberada (agosto de 2026), no un estado
transitorio.** Antes eran dos —Presencia USD 90 y Completo USD 130— y se unificaron en uno
con el alcance completo. De ahí salen dos prohibiciones, abajo en "Qué NO hacer".

⚠ **Cambiar el precio toca SEIS lugares en tres archivos, y uno de ellos no se encuentra
buscando `"USD 90"`.** El procedimiento completo está en `.claude/rules/precio.md` —
**leelo antes de tocar el precio**, no después.

**Proceso**

1. Charla breve por WhatsApp o llamada (15-20 min) para entender qué necesita.
2. Propuesta por escrito (qué incluye, plazo y precio). No se programa nada hasta que el
   cliente la aprueba.
3. Se arma el sitio completo en un enlace de prueba, para que lo vea funcionando antes de
   pagar nada.
4. Hasta dos rondas de cambios incluidas. Si quiere más, se cotizan aparte.
5. Si le gusta, paga el precio acordado y se migra a su dominio. Si después de los ajustes
   no es lo que buscaba, no paga nada.

**Garantía:** no se cobra nada por adelantado. El cliente ve el sitio terminado y
funcionando antes de decidir. Si no lo convence después de los ajustes, no debe nada.

**Las tres promesas comerciales que la web ya hace** (plazo de 5 a 10 días; cambios chicos
sin costo el primer mes; rondas extra cotizadas aparte) están en
`.claude/rules/copy-web.md`. Son compromisos con el cliente, no ideas a revisar.

**"Reserva de turnos" es la agenda del propio cliente**, en su cuenta, no en una de Joaco.
Tiene riesgo de falla silenciosa y límites de plan gratuito que hay que avisarle **antes**
de cerrar el trato. Todo eso, con el checklist de entrega, está en
`.claude/rules/entrega-clientes.md` y en `entrega/reserva-de-turnos.md`.

**Contacto:** WhatsApp como canal principal, **+598 98 436 346** (en `wa.me` va como
`59898436346`). Es el número real, no un placeholder.

## Dirección de diseño

Minimalista, tema oscuro, alto contraste, mucho espacio en negro. Mobile-first: la mayoría
entra desde el celular.

**Dos colores con roles fijos** (agosto de 2026; antes era un solo acento): pizarra frío
para la estructura del documento, que **nunca es accionable**, y un único acento ámbar
`#FFB454` reservado para lo accionable y para el momento del pago. ⚠ **La regla que
sostiene el sistema: el texto de lectura no se tiñe** —`--text` y `--muted` quedan
neutros—, porque si el cuerpo también se va al azul la página se vuelve monocroma fría y
esto deja de leerse como dos colores con roles distintos.

**Las fuentes son Bricolage Grotesque y Hanken Grotesk, self-hosted, y pesan ~40 KB más que
las anteriores a propósito**: las viejas eran las dos caras más asociadas a los sitios
generados con IA. Se pagó ese peso por identidad visual. Si una auditoría de performance
las encuentra: ya se sabe, y se quedan.

El detalle operativo —el espinazo, qué verifica cada script— está en
`.claude/rules/diseno.md`, y el mapa de lo que hay hecho en `ESTADO.md` §5.

## Stack, deploy y dónde viven los sitios de clientes

Sitio estático simple: HTML/CSS/JS plano, sin build, sin dependencias, sin una sola
petición a un dominio externo. Deploy en GitHub Pages con subdominio `github.io`.
**DigitalPlat FreeDomain** es un upgrade gratis sobre `mosland.github.io`, **solo para uso
personal, nunca para sitios de clientes** (si el servicio cierra, se cae el sitio).

**Son dos plataformas distintas y no se mezclan** (decidido en agosto de 2026, ya cerrado):

- **GitHub Pages queda solo para esta web.** Dos motivos, cada uno alcanza solo: sus
  *Terms for Additional Products and Features* dicen que Pages "is not intended for or
  allowed to be used as a free web hosting service to run your online business", y alojar
  ahí el negocio de un tercero es exactamente eso — quien interpreta la cláusula es GitHub,
  y lo que puede hacer es bajar el sitio. Y solo se permite **un user site por cuenta**, que
  este repo ya ocupa.
- **Los sitios de clientes van en Cloudflare Pages, en una cuenta del propio cliente.** El
  detalle está en `.claude/rules/entrega-clientes.md`.

Lo que **sí** se reusa para clientes es el approach: mostrarlo publicado y funcionando en
un subdominio gratis antes de cobrar nada. Lo que **no** se reusa es la plataforma.

## Herramientas externas

**No instalar ni proponer ninguna herramienta nueva —MCP, plugin, skill o servicio— sin
preguntarle a Joaco primero.** Y antes de evaluar algo nuevo, **buscar si ya se evaluó**:
los motivos completos de cada rechazo, y los diferidos, viven en **Notion, página *Skills
Plugins MCP*, sección *Proyecto Web Personal***. No proponer nada de esa lista sin revisar
ahí primero si cambió el motivo.

Qué hay instalado hoy y con qué alcance: `ESTADO.md` §8. Todo va en **project scope**, en
archivos commiteados, para que viaje a la otra computadora.

⚠ **Si `tools/verificar.js` reporta que falta cada elemento del sitio, uno por uno, no se
rompió la landing: hay algo más escuchando en el puerto 8000.** La salida es correr todo en
otro puerto — está en el README, con los comandos.

## Qué NO hacer

- **No poner fotos de Joaco en el sitio.** Ni en el hero, ni en "Sobre mí", ni como marca,
  ni en la imagen de OG. Es una preferencia personal y está decidida: no hace falta
  justificarla, no hay que proponer variantes con foto ni volver a levantarlo como mejora,
  **aunque la evidencia de conversión diga que una foto real del prestador ayuda** — ese
  dato ya se conoce y la decisión es igual. Las capturas de trabajos en portfolio son otra
  cosa y sí van, cuando existan piezas reales.
- **No mencionar el rubro salud (ni ningún rubro) en el mensaje principal.**
- **No presentar el precio de introducción como precio fijo** sin aclarar que va a subir,
  ni con lenguaje de oferta/promoción/promo/rebaja/descuento. Esas cinco palabras las
  chequea `tools/consistencia.js`.
- **No proponer volver a dos paquetes.** El paquete único de USD 90 es una decisión de
  agosto de 2026, no un recorte temporal ni algo a optimizar. Nada de "básico y completo",
  ni una opción más barata, ni mover algo del alcance a un extra pago.
- **No sugerir subir el precio salvo que Joaco lo pida explícitamente.** Que la web diga
  "precio de introducción" define cómo se comunica para poder subirlo algún día sin quedar
  mal; no es un pendiente a levantar en cada sesión.
- **No agregar formularios de contacto** sin alternativa de WhatsApp visible.
- **No copiar el estilo dark-minimalista** para futuras piezas de portfolio de clientes de
  salud — ese es un proyecto aparte con su propia dirección (cálida, clara).
- **No volver a agregar el JSON-LD de `FAQPage`.** Se sacó en agosto de 2026: desde agosto
  de 2023 Google limita los rich results de FAQ a sitios de gobierno y salud reconocidos,
  así que esta landing nunca fue elegible, y en mayo de 2026 se retiró del todo. Era doble
  edición de cada pregunta a cambio de nada.
- **No prometer en la web que el hosting es gratis**, ni afirmar nada sobre el plan gratuito
  de un tercero a futuro, ni comprometerse a sostener el hosting indefinidamente. La web
  promete una sola cosa: que el sitio queda publicado y funcionando, y que eso no se cobra.
  Son dos riesgos distintos: el proveedor puede cambiar sus condiciones y esa cuenta la
  termina pagando el cliente, y una promesa abierta deja a Joaco de proveedor de hosting
  permanente de cada sitio que entregó. ⚠ **Que ya esté decidido dónde viven los sitios de
  clientes no habilita a anunciarlo en la web:** resuelve dónde se publica, no cambia lo que
  se promete.
