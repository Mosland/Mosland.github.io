# Web de presentación — Joaquín Moas

Landing de una sola página. HTML, CSS y JavaScript plano: sin build, sin dependencias,
sin una sola petición a un dominio externo.

**En vivo:** https://mosland.github.io

---

## Ver el sitio en la computadora

Abrir `index.html` directo en el navegador funciona, pero para que las fuentes carguen
bien conviene levantar un servidor local:

```
cd C:\WebPersonal
python -m http.server 8000
```

Y entrar a http://localhost:8000

⚠ En esta computadora el 8000 lo puede tener tomado el MCP de godot-ai. Si lo que
cargás no es la landing, probá con otro puerto (`python -m http.server 8899`).

---

## Dónde se edita cada cosa

| Qué querés cambiar | Dónde |
|---|---|
| Textos y preguntas frecuentes | `index.html` |
| Precio | `index.html`, pero son **3 lugares** — ver abajo |
| Colores, tamaños, espaciados | `css/styles.css` — las variables están todas arriba de todo en `:root` |
| Número de WhatsApp | `index.html`, buscar `wa.me/` — aparece **4 veces** (hero, el presupuesto, contacto y el CTA flotante) |
| Mail de contacto | `index.html`, buscar `mailto:` |
| Imagen que se ve al compartir el link | `tools/og-image.html` — ver abajo |

### Cambiar un precio

El precio es de introducción y va a subir, así que esto lo vas a hacer. Aparece en
**seis lugares**, repartidos en tres archivos, y hay que tocarlos todos.

En `index.html`, tres:

1. El total del presupuesto (`quote__total`).
2. `"priceRange"` en el bloque JSON-LD de arriba de todo.
3. `"price"` del `Offer`, en ese mismo bloque.

El 2 y el 3 son los datos que lee Google. Si quedan viejos, el sitio se contradice a
sí mismo: una cosa en la página, otra en el resultado de búsqueda.

En `CLAUDE.md`, dos:

4. El bullet del paquete único, en la sección "Paquete".
5. El bullet de "No proponer volver a dos paquetes", en "Qué NO hacer".

Esos dos no los ve nadie que entre al sitio, pero son la fuente de verdad que lee
Claude. Si quedan viejos, el precio viejo vuelve solo la próxima vez que le pidas un
cambio.

En este mismo `README.md`, uno:

6. El bullet del paquete único, en "Decisiones que conviene no romper", al final.

Este es el que faltaba. Hasta el 7/8/2026 acá decía que el README no llevaba precios,
y era mentira: los llevaba, y el procedimiento mandaba justamente a no mirarlo.

**Lo que NO hay que tocar**, que es el error del otro lado: las menciones de los dos
paquetes viejos (Presencia y Completo) son historia, no precios vigentes — si las
actualizás, borrás el registro de por qué el paquete no se vuelve a partir en dos. Y
el número que aparece abajo como ejemplo de búsqueda tampoco es un precio.

⚠ **Buscar `USD 90` no encuentra el total.** En el HTML la moneda va en su propio
elemento —`<span class="quote__cur">USD</span>90`— así que entre `USD` y el número
hay una etiqueta, no un espacio. Buscá **el número pelado** (`90`). Es la trampa más
fácil de pisar: la búsqueda parece andar, encuentra el JSON-LD y el `CLAUDE.md`, y
te deja viejo justo el precio que ve el cliente.

La forma rápida de no olvidarte ninguno es buscar el número viejo en todo el repo
antes de dar por terminado el cambio. Lo que aparezca en `css/styles.css` y en
`tools/og-image.html` ignoralo: son breakpoints y medidas, no precios.

### Cambiar el número de WhatsApp

Los enlaces tienen esta forma:

```
https://wa.me/59898436346?text=Hola%20Joaqu%C3%ADn%2C%20vi%20tu%20web...
```

- El número va **sin `+`, sin espacios y sin el 0 inicial**: Uruguay es `598`, así que
  el `098 436 346` se escribe `59898436346`.
- Lo que va después de `?text=` es el mensaje que le aparece ya escrito al cliente. Está
  redactado desde el punto de vista de él, no tuyo, y cada botón manda un mensaje distinto
  para que sepas de qué sección vino la consulta.
- Si cambiás ese texto, hay que codificarlo para URL: los espacios son `%20`, la coma es
  `%2C`, la `í` es `%C3%ADn`.

### Cambiar la imagen que se ve al compartir el link

La imagen no se edita con un editor de fotos: se edita el HTML que la genera.

1. Tocar `tools/og-image.html`.
2. Regenerar el PNG:

```
powershell -ExecutionPolicy Bypass -File tools\build-og.ps1
```

Usa Edge headless, que ya viene con Windows — no hay que instalar nada.

**Todo el contenido tiene que quedar dentro del cuadrado del medio.** WhatsApp no muestra
la imagen 1200×630 entera: recorta un cuadrado al centro, y lo que se sale de ahí llega
cortado al celular. En `og-image.html` hay una clase `guides` que dibuja la zona segura
encima para poder revisarlo en el navegador.

**Si cambiás el diseño, cambiale el nombre al archivo** (`og-image-v4.png`, etc.) y
actualizá tanto el `$out` de `tools/build-og.ps1` como la meta `og:image` de
`index.html`. WhatsApp y Facebook cachean la imagen por mucho tiempo: si pisás el mismo
nombre, siguen mostrando la vieja durante días.

---

## Revisar que no se rompió nada

`tools/verificar.js` corre de una las comprobaciones que son tediosas a mano y
fáciles de romper sin darse cuenta. Conviene pasarlo antes de publicar.

```
python -m http.server 8000          en una terminal
node tools/verificar.js             en otra
```

⚠ **Si el 8000 está ocupado, el síntoma engaña.** Acá lo toma el MCP de godot-ai, y
Windows deja que los dos procesos escuchen el mismo puerto: el script no dice "puerto
ocupado", dice que **falta cada elemento del sitio**. Para eso `verificar.js` acepta el
puerto como argumento — `python -m http.server 8899` y `node tools/verificar.js 8899`.

Sale con código 1 si algo falla, y deja las capturas en una carpeta temporal cuya
ruta imprime al final (no ensucia el repo). Chequea:

- que el ámbar siga en **los tres puntos del pago** —el renglón "Recién ahí pagás",
  el número del paso 5 y el cierre de la garantía— y que la estructura siga en
  pizarra. Es lo más fácil de romper del sistema de dos colores;
- que el **espinazo** sea una línea sola, sin cortes y toda en la misma x;
- los **cuatro estados de la barra flotante** de WhatsApp;
- que no haya **desborde horizontal** en 360, 390, 768, 1024 y 1440;
- que todo lo tabulable tenga **foco visible** y que la barra escondida no lo reciba;
- que con **`prefers-reduced-motion`** la entrada no corra y el contenido se vea;
- que **sin JavaScript** la página se vea entera.

Necesita Playwright, que **no** es una dependencia del sitio —el sitio sigue sin
ninguna— sino una herramienta de desarrollo:

```
npm install playwright
npx playwright install chromium
```

Eso crea `node_modules/` y `package.json` en la carpeta. Los dos están en el
`.gitignore` justamente para que no se cuelen en un commit.

---

## Publicar los cambios

```
git add -A
git commit -m "Descripción del cambio"
git push
```

GitHub Pages republica solo, en menos de un minuto.

### Si el repo todavía no está conectado a GitHub

1. Crear en GitHub un repositorio **público** llamado exactamente `Mosland.github.io`
   (ese nombre hace que el sitio quede en la raíz del dominio y no en un subdirectorio).
2. No marcar ninguna opción de inicializar con README.
3. Después, acá:

```
git remote add origin https://github.com/Mosland/Mosland.github.io.git
git branch -M main
git push -u origin main
```

4. En GitHub: **Settings → Pages → Source: Deploy from a branch → main → / (root)**.

El archivo `.nojekyll` de la raíz existe para que GitHub Pages no procese el sitio con
Jekyll y suba los archivos tal cual.

---

## Clonar el repo en otra computadora

Para ver el sitio no hace falta nada: es HTML plano. Lo que sí viaja con el repo es la
configuración de Claude Code —`.mcp.json` y `.claude/settings.json`— y ahí hay tres
cosas que conviene saber antes de la primera vez.

**1. Hacen falta Node y el navegador de Playwright.** Son dos cosas, no una, y la
segunda es la que se olvida.

```
node --version                                  tiene que responder algo
npx @playwright/mcp@latest install-browser chromium   descarga el navegador
```

La descarga son unos 307 MB (el navegador y su headless shell) y ocupa cerca de
700 MB en disco. Es una sola vez por máquina.

⚠ **Ese comando no es `npx playwright install chromium`**, que es el que usa
`tools/verificar.js` más arriba en este mismo archivo. Parecen lo mismo y no lo son:
cada uno instala la versión de chromium que necesita *su* paquete, y si instalás la
del otro el MCP falla pidiendo un número de build distinto
(`expected executable at ...\chromium-1237\...`). Si usás las dos herramientas, se
instalan las dos: ocupan lugar aparte y no se pisan.

`.mcp.json` levanta Playwright con `npx @playwright/mcp@latest`, así que sin Node no
hay `npx` y el servidor no arranca. Pero aunque Node esté, **el servidor arranca igual
sin navegador y dice `✔ Connected`**: el error recién aparece en la primera navegación,
como `Chromium distribution ... is not found`. Esa es la trampa — "conectado" no
significa que funcione, así que no alcanza con mirar el estado del servidor.

El archivo `playwright-mcp.config.json` de la raíz es el que fuerza el chromium propio
de Playwright. Sin él, Playwright busca el Chrome del sistema, que en Windows puede
perfectamente no estar instalado aunque tengas Edge.

**2. La primera vez pide aprobar dos cosas.** Claude Code no confía en la configuración
que viene adentro de un repo hasta que se lo autorizás, así que al abrir la carpeta va
a preguntar por el servidor de `.mcp.json` (Playwright) y por el marketplace de plugins
que declara `.claude/settings.json`. Se aprueba una vez por máquina y no vuelve a
preguntar. Que pregunte no es un error, es el comportamiento normal.

**3. Los permisos son un subconjunto, a propósito.** `.claude/settings.json` trae
aprobados cinco grupos y nada más: `git`, `gh`, el servidor local de preview, las
herramientas de Playwright que no ejecutan código arbitrario, y `WebSearch`. Todo lo
demás va a preguntar la primera vez y se aprueba en el momento.

`WebSearch` está ahí porque el `CLAUDE.md` pide investigar antes de proponer diseño o
copy, y sin el permiso esa instrucción se traba en una pregunta cada vez. Se había
sacado y se devolvió por eso. **No es la lista completa que
había antes de mudar la configuración al repo:** esa tenía unas sesenta reglas, y la
mayoría eran rutas temporales con identificadores de sesiones muertas y dominios de
búsquedas puntuales que no se van a repetir. Copiarlas enteras era mudar la basura de
una máquina a la otra.

⚠ **`.claude/settings.local.json` no viaja y no tiene que viajar.** Ahí van las cosas
que son de esa computadora y de ninguna otra, como la aprobación del `.mcp.json`. Está
en el `.gitignore` del repo para que un `git add -A` no se lo lleve por delante.

---

## Cuando haya trabajos para mostrar

Dentro de `index.html`, buscando `PORTFOLIO`, hay una sección entera comentada con el HTML
y el CSS ya resueltos. Hay que descomentarla, poner las capturas en `assets/trabajos/` y
completar los textos. Es el único lugar de la web donde se nombra un rubro concreto.

Las capturas conviene guardarlas en `.webp` y a un ancho de 800px como máximo, para que
el sitio siga cargando rápido.

> El bloque ya viene con el `<div class="spine">` puesto, que es lo que hace que la
> línea vertical siga sin cortarse cuando la sección entre en juego. Si lo sacás, la
> página queda con un hueco en el espinazo justo ahí.

---

## Decisiones que conviene no romper

- **Cero dependencias externas.** Nada de Google Fonts por CDN, nada de librerías. Las
  fuentes están self-hosted en `assets/fonts/`. Es lo que mantiene la carga rápida.
- **La página funciona sin JavaScript.** `js/main.js` solo pone el año del footer y el
  CTA flotante de WhatsApp. Si no carga, el sitio se ve completo igual.
- **El espinazo.** La línea vertical que recorre la página de arriba abajo es el
  elemento que le da identidad, y para que funcione tiene que ser **continua**. Vive en
  `.spine`, que va adentro de cada `.container` y **lleva el padding vertical de la
  sección** —por eso `.section` tiene `padding-block: 0`—: así los tramos de secciones
  contiguas se tocan y no queda un hueco entre una y otra. Si agregás una sección, va
  con su `.spine`. Si te aparece un corte en la línea, es que alguna sección se quedó
  sin él o recuperó su propio padding vertical.
- **El ámbar está racionado.** Llegó a estar en doce lugares distintos y ahí dejó de ser
  un acento. Ahora se usa para los CTA y para el momento del pago —el renglón "Recién
  ahí pagás", el número del paso 5 y el cierre de la garantía—, que es el diferencial
  del negocio. Sumar un uso más le quita fuerza a los que ya están.
- **Un solo momento animado, y es al cargar.** No hay revelado al hacer scroll: lo
  había, con el mismo desplazamiento y la misma duración para cada bloque de la
  página, y esa uniformidad era una de las cosas que la hacían leer como generada con
  IA. Lo que sí hay es una entrada orquestada en el hero: se traza el espinazo y
  recién después entra lo que cuelga de él, escalonado. Termina a los 0,9s y no se
  mueve nada más. Es CSS puro, así que corre igual con JavaScript desactivado.
  ⚠ El título anima `transform` y **no** opacidad, a propósito: es el elemento del
  LCP, y si arranca en `opacity: 0` el navegador no lo cuenta como pintado y la
  métrica se va atrás toda la animación.
- **El header no es fijo.** Un header sin menú, que solo lleva el nombre, no se gana
  quedarse pegado: comía alto de pantalla justo donde el fold de celular tiene que
  llegar al botón de WhatsApp. El contacto siempre a mano lo resuelve la barra flotante.
- **Las fuentes son Bricolage Grotesque (títulos) y Hanken Grotesk (cuerpo).** Antes
  eran Space Grotesk e Inter, que son las dos caras más asociadas a los sitios generados
  con IA y estaban usadas juntas. Si algún día cambiás una, hay que **recalcular las
  métricas de la familia `fallback`** que está justo abajo en el CSS (`size-adjust`,
  `ascent-override`, `descent-override`): esos números salen de las métricas reales del
  archivo contra las de Arial y son los que evitan que el texto salte cuando la fuente
  termina de cargar. Heredar los viejos rompe eso en silencio.
- **Un solo CTA por pantalla.** El header no lleva botón de WhatsApp a propósito: ya está
  el del hero y el flotante, y un tercero no agregaba nada. Si se saca el flotante, el
  tramo entre el hero y contacto se queda sin ningún contacto a la vista.
- **Dos colores, con un rol cada uno.** El **pizarra frío** es la estructura del
  documento: superficies, espinazo, reglas, números de paso, etiquetas, el marcador
  del acordeón. El **ámbar `#FFB454`** es solo lo accionable y el momento del pago
  —los botones, el renglón "Recién ahí pagás", el número del paso 5, el cierre de la
  garantía—. Incluso los botones de WhatsApp van en ámbar y no en verde. Lo que
  sostiene el sistema es que **el texto de lectura queda neutro**: si el cuerpo
  también se tiñe de azul, la página se vuelve monocroma fría y esto pasa a leerse
  como un filtro encima en vez de como dos colores con roles distintos.
  ⚠ En el CSS, `.step--pay::before` tiene que quedar **después** de `.step::before`,
  si no el pizarra se lleva puesto el ámbar del paso 5.
- **No van fotos de Joaco.** Ni en el hero, ni en "Sobre mí", ni como marca. Está
  decidido y no es una discusión de diseño. Las capturas de trabajos del portfolio
  son otra cosa y sí van.
- **Sin formulario de contacto.** Un formulario en un sitio estático necesita un servicio
  externo que puede fallar en silencio y hacerte perder consultas sin que te enteres.
- **Un solo paquete de USD 90, y es decisión tomada.** Antes eran dos (Presencia USD 90
  y Completo USD 130) y se unificaron en agosto de 2026 en uno solo con el alcance
  completo. No es un recorte temporal ni algo a medio hacer: no lo partas de nuevo en
  dos, no agregues una opción más barata y no muevas nada del alcance a un extra pago.
  El precio se cambia cuando Joaco lo decida, no porque parezca bajo.
- **El precio se anuncia como "de introducción", nunca como oferta ni promoción.**
  Está así a propósito. Anunciar la suba desde ahora permite subirlo después sin quedar
  mal con nadie, y el vocabulario de descuento ("oferta", "promoción", "rebaja") haría que
  el cliente asocie el trabajo con lo barato y se resista al precio pleno más adelante.
  La palabra aparece en tres lugares que tienen que decir lo mismo: la etiqueta de la
  sección de paquetes, la pregunta frecuente sobre precios y la sección "Sobre mí".
- **Las preguntas frecuentes se editan en un solo lugar.** Antes estaban duplicadas en un
  bloque `FAQPage` en el `<head>` para que Google las mostrara en el resultado de
  búsqueda. Se sacó: eso solo funcionaba para sitios de gobierno y salud reconocidos
  desde 2023, así que esta web nunca fue elegible, y en mayo de 2026 Google lo retiró
  del todo. Era editar cada pregunta dos veces a cambio de nada. No lo vuelvas a agregar.
- **El otro bloque JSON-LD (`ProfessionalService`) sí se queda**, pero no porque esté
  comprobado que sirva —para un servicio sin dirección física Google no muestra gran
  cosa— sino porque no duplica ningún texto editable salvo los precios. Por eso el
  procedimiento de cambio de precio de más arriba.
- **Lo que la web promete del hosting está acotado a propósito.** Dice "el sitio te lo
  dejo publicado y funcionando, y eso no te lo cobro". No dice que el hosting sea gratis,
  ni que lo vaya a ser siempre, ni que vos te hagas cargo de mantenerlo. Son dos riesgos
  distintos: el proveedor puede cambiar sus condiciones y esa cuenta la terminaría
  pagando el cliente, y una promesa abierta te deja de proveedor de hosting permanente
  de cada sitio que entregaste. Misma lógica para cualquier servicio de terceros que
  entres a usar.
- **La barra fija de WhatsApp solo aparece si no hay otro CTA en pantalla.** `js/main.js`
  vigila cuatro anclas: el botón del hero, el de el presupuesto (`#paqueteCta`),
  el de contacto (`#contactoCta`) y el footer. **Si se agrega otro CTA importante al
  cuerpo, hay que sumarlo a esa lista**, si no la barra flotante aparece pegada arriba
  del botón nuevo y quedan los dos juntos. Ya pasó tres veces —con el header, con el
  hero y con el presupuesto— y el síntoma siempre es el mismo, así que si ves dos
  botones de WhatsApp juntos, lo que falta es un ancla.
