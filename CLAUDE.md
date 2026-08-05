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
unificaron en uno solo de USD 90 con el alcance completo. Dos consecuencias, las
dos obligatorias:
- **No proponer volver a partirlo en dos.** Ni "básico y completo", ni una opción
  más barata, ni sacar algo del alcance para venderlo como extra pago.
- **No sugerir subir el precio salvo que Joaco lo pida.** Que la web lo anuncie
  como precio de introducción es una decisión sobre *cómo se comunica*, para poder
  subirlo algún día sin quedar mal con nadie. No es una invitación a proponer la
  suba, ni un pendiente a levantar en cada sesión.

**Al cambiar el precio hay que tocar CUATRO lugares.** El precio de introducción va
a subir cuando Joaco lo decida, así que esto va a pasar.
- En `index.html`, tres: el total del presupuesto de `#paquetes` (`quote__total`), y
  dentro del JSON-LD de `ProfessionalService` el campo `priceRange` y el
  `Offer.price`. Si alguno queda viejo, el sitio se contradice a sí mismo en el
  resultado de búsqueda.
- En **este mismo archivo**, uno: el bullet de la lista de acá arriba. Si queda
  viejo es peor que en la web, porque el próximo que lea este CLAUDE.md toma el
  precio viejo como fuente de verdad y lo vuelve a propagar.

Es el mismo riesgo de desincronización por el que se eliminó el bloque `FAQPage`.
Verificado por grep el 4/8/2026: no hay ningún otro lugar en el repo con el
precio. `README.md` no contiene precios, solo el instructivo para cambiarlos. Lo
que aparece en `css/styles.css` y `tools/og-image.html` al buscar "90" son pesos
de fuente y medidas, no precios; la imagen de OG no muestra precios.

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
  1. Probar la reserva de punta a punta antes de publicar (reservar de verdad y
     verificar que el turno aparece en el calendario del cliente).
  2. Dejarle por escrito qué parte depende de él: que la cuenta es suya, que si la
     desactiva el botón deja de funcionar, y que eso el sitio no lo puede detectar.

**Proceso**
1. Charla breve por WhatsApp o llamada (15-20 min) para entender qué necesita.
2. Propuesta por escrito (qué incluye, plazo y precio). No se programa nada hasta que
   el cliente la aprueba.
3. Se arma el sitio completo en un enlace de prueba, para que lo vea funcionando
   antes de pagar nada.
4. Hasta dos rondas de cambios incluidas. Si quiere más, se cotizan aparte.
5. Si le gusta, paga el precio acordado y se migra a su dominio. Si después de los
   ajustes no es lo que buscaba, no paga nada.

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
  intención, no un default.
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
- Este mismo approach (deploy gratis en un subdominio antes de cobrar) es el que se
  va a reusar después para entregar los sitios de clientes reales antes del pago —
  tenerlo en cuenta si se arma algo reutilizable para eso.

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
  GitHub puede cambiar sus condiciones y esa cuenta la terminaría pagando el
  cliente, y una promesa abierta deja a Joaco de proveedor de hosting permanente de
  cada sitio que entregó. Mientras siga abierta la decisión de dónde van a vivir los
  sitios de clientes, la web no puede adelantarla.
