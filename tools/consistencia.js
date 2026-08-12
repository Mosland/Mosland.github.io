/* ══════════════════════════════════════════════════════════════════════════
   Reglas de consistencia entre archivos.

   Hay valores que viven en varios archivos a la vez y tienen que decir lo
   mismo. Hasta ahora eso dependía de que alguien se acordara de leer el
   README entero antes de tocar algo, y falló: en agosto de 2026 se
   encontraron tres reglas ya desincronizadas al mismo tiempo.

   Esto no reemplaza a tools/verificar.js y no lo incluye. Son dos cosas
   distintas:
     · verificar.js   abre la página en Chromium y mira cómo se ve.
                      Tarda ~20s y necesita servidor y Playwright.
     · consistencia.js compara texto entre archivos. No abre nada, no
                      necesita servidor ni dependencias, corre en
                      milisegundos.

   USO
     node tools/consistencia.js

   SALIDA
     Sale con código 1 si alguna regla no se cumple, así que sirve de portón
     antes de comitear.

   ⚠ REGLA DE DISEÑO: si un anclaje no aparece, ESO ES UNA FALLA, no un
     salto. Un chequeo que se saltea en silencio cuando alguien reescribe la
     frase que buscaba es peor que no tener chequeo: da verde sin haber
     mirado nada. Por eso cada extracción reporta "no encontré el anclaje"
     como error.

   ⚠ LO QUE ESTE ARCHIVO NO PUEDE CUBRIR: las métricas de las familias
     `fallback` del CSS, que tienen que recalcularse si se cambia una fuente.
     Salen de leer el binario del .woff2 y compararlo con Arial. Sigue
     dependiendo de que alguien lo haga a mano; está documentado en el README.

   ── QUÉ COMPARA CADA ASERCIÓN ─────────────────────────────────────────────

   1. PRECIO — seis lugares en tres archivos, todos el mismo número.
      index.html: el total del presupuesto, "priceRange" y "price" del JSON-LD.
      CLAUDE.md:  el bullet del paquete único y el de "no volver a dos paquetes".
      README.md:  el bullet del paquete único en "Decisiones que conviene no romper".
      ⚠ Se extrae cada uno por su frase exacta y NO contando apariciones del
        número: los tres archivos tienen además menciones históricas de los dos
        paquetes viejos (Presencia 90 / Completo 130) y ejemplos de búsqueda que
        no son precios y no se tocan. En README.md la línea del bullet contiene
        las dos cosas a la vez.

   2. WHATSAPP — el número aparece cuatro veces en index.html (hero,
      presupuesto, contacto, CTA flotante) y las cuatro tienen que ser el mismo.
      Se verifica el número y también que sigan siendo cuatro: si aparece un
      quinto botón, la regla 7 pasa a importar.

   3. PRECIO DE INTRODUCCIÓN — la idea aparece en tres lugares de index.html
      (etiqueta de paquetes, pregunta frecuente de precios, "Sobre mí") y los
      tres tienen que decir lo mismo. Además, CLAUDE.md prohíbe el vocabulario
      de descuento: se verifica que no haya entrado ninguna de esas palabras.

   4. FONDO — el mismo negro está escrito a mano en cinco lugares: la meta
      theme-color de index.html y de 404.html, la variable --bg de
      css/styles.css, la variable --bg de tools/og-image.html, y el rect del
      favicon. Los cinco tienen que coincidir.

   5. DOMINIO — el host aparece en siete lugares: cuatro en index.html
      (canonical, og:url, og:image, url del JSON-LD), más robots.txt,
      sitemap.xml y el "En vivo" del README. Se compara el host y no la URL
      entera, porque og:image apunta a un archivo y no a la raíz.

   6. CALENDLY — el rango de precio del plan pago está en
      .claude/rules/entrega-clientes.md y dos veces en entrega/reserva-de-turnos.md
      (una en el texto y otra en la plantilla que se le manda al cliente). Es
      precio de un tercero: que coincidan entre sí no lo vuelve vigente, solo
      evita que se contradigan.

   7. CTA → ANCLA — todo botón con id terminado en "Cta" tiene que estar
      vigilado por js/main.js, si no la barra flotante aparece pegada arriba de
      él. El id "floatingCta" queda afuera a propósito: es la barra misma, no
      un ancla que la esconda.

   8. ORDEN DE .step--pay::before — tiene que ir DESPUÉS de .step::before en
      css/styles.css. Las dos reglas tienen la misma especificidad (0,1,1), así
      que decide el orden en el archivo: invertirlo hace que el pizarra se lleve
      puesto el ámbar del paso 5.
      Esto ya lo detecta verificar.js, pero solo por efecto: falla la aserción
      "el número del paso 5 tiene que ser ámbar", que también falla por otras
      cinco causas y no nombra ésta. Acá se chequea la causa directamente, así
      el mensaje dice qué pasó.
      ⚠ Punto ciego propio: si algún día se resuelve con !important o subiendo
        la especificidad, el orden deja de importar y esta aserción pasa a pedir
        algo que ya no hace falta.

   9. IMAGEN DE OG — el nombre del PNG está escrito en cuatro lugares: la meta
      og:image de index.html, el $out de tools/build-og.ps1, el comentario de
      encabezado de ese mismo script, y el <title> de tools/og-image.html. Además
      se verifica que el archivo exista de verdad en assets/.
      La regla existe porque WhatsApp y Facebook cachean la imagen scrapeada por
      mucho tiempo: al cambiar el diseño hay que renombrar el archivo, y ahí es
      donde se olvida alguna de las cuatro menciones. El síntoma no se ve en el
      sitio — se ve al pegar el link en un chat, días después, y ya es tarde.

  10. CATÁLOGO — qué puede escribir este proyecto en el repo de herramientas
      (C:\ClaudeMCPsPlugingsSkillsETC), según los deny de .claude/settings.json.
      ⚠ ESTA REGLA TIENE OTRA FORMA QUE LAS NUEVE DE ARRIBA. No compara un dato
        entre dos archivos: es un invariante sobre uno solo. Está acá igual
        porque falla del mismo modo que las otras — en silencio.
      Verifica que proyectos/surgamezombie/ siga denegado (es de otro proyecto de
      Joaco) y que proyectos/webpersonal/ siga escribible (si alguien mete un
      deny amplio tipo proyectos/**, este proyecto deja de poder anotar sus
      decisiones de herramientas y nada avisa).
      ⚠ LO QUE ESTA REGLA NO PUEDE CUBRIR: los deny atan las herramientas de
        edición, no el shell. Un `git add -A` corrido dentro del catálogo se
        lleva cambios de cualquier carpeta igual. Contra eso solo hay una regla
        escrita, y está en CLAUDE.md, en "Herramientas externas".
   ══════════════════════════════════════════════════════════════════════════ */
'use strict';

const fs = require('fs');
const path = require('path');

const RAIZ = path.join(__dirname, '..');
const cache = new Map();

function leer(rel) {
  if (!cache.has(rel)) cache.set(rel, fs.readFileSync(path.join(RAIZ, rel), 'utf8'));
  return cache.get(rel);
}

let fallas = 0;

function check(bien, texto, detalle) {
  if (!bien) fallas++;
  const marca = bien ? 'OK  ' : '*** FALLA ***  ';
  console.log('  ' + marca + texto + (detalle !== undefined ? ': ' + detalle : ''));
}

/* Extrae un valor por su anclaje. Si el anclaje no está, cuenta como falla y
   devuelve null: quiere decir que alguien reescribió la frase y este chequeo
   dejó de mirar lo que creía mirar. */
function extraer(rel, regex, queEs) {
  const m = leer(rel).match(regex);
  if (!m) {
    fallas++;
    console.log(`  *** FALLA ***  ${queEs}: no encontré el anclaje en ${rel} ` +
                `(¿se reescribió la frase? hay que actualizar el regex de este script)`);
    return null;
  }
  return m[1];
}

/* Compara una lista de {donde, valor} y reporta el desacuerdo con los valores
   de cada lado, que es lo que hace falta para arreglarlo sin adivinar. */
function todosIguales(lista, queEs, normalizar) {
  const vivos = lista.filter((x) => x.valor !== null);
  if (vivos.length !== lista.length) return;          // ya se reportó el anclaje faltante

  const norm = (v) => (normalizar ? normalizar(v) : v);
  const distintos = [...new Set(vivos.map((x) => norm(x.valor)))];

  if (distintos.length === 1) {
    check(true, `${queEs} — ${vivos.length} lugares`, distintos[0]);
    return;
  }
  check(false, `${queEs} — ${vivos.length} lugares`,
        'hay ' + distintos.length + ' valores distintos');
  for (const x of vivos) console.log(`        ${norm(x.valor)}   ← ${x.donde}`);
}

/* ── 1. PRECIO ─────────────────────────────────────────────────────────── */
console.log('\nPRECIO — seis lugares en tres archivos');
todosIguales([
  { donde: 'index.html · total del presupuesto',
    valor: extraer('index.html', /class="quote__total"><span class="quote__cur">USD<\/span>(\d+)</, 'precio') },
  { donde: 'index.html · JSON-LD priceRange',
    valor: extraer('index.html', /"priceRange":\s*"USD (\d+)"/, 'precio') },
  { donde: 'index.html · JSON-LD Offer.price',
    valor: extraer('index.html', /"price":\s*"(\d+)"/, 'precio') },
  { donde: 'CLAUDE.md · bullet del paquete único',
    valor: extraer('CLAUDE.md', /\*\*Paquete único: USD (\d+)\*\*/, 'precio') },
  { donde: 'CLAUDE.md · "no volver a dos paquetes"',
    valor: extraer('CLAUDE.md', /El paquete único de USD (\d+) es una decisión/, 'precio') },
  { donde: 'README.md · decisiones que no se rompen',
    valor: extraer('README.md', /- \*\*Un solo paquete de USD (\d+), y es decisión tomada\.\*\*/, 'precio') },
], 'el precio');

/* ── 2. WHATSAPP ───────────────────────────────────────────────────────── */
console.log('\nWHATSAPP — el número, cuatro veces en index.html');
{
  const nums = [...leer('index.html').matchAll(/wa\.me\/(\d+)/g)].map((m) => m[1]);
  const unicos = [...new Set(nums)];
  check(nums.length === 4, 'aparece cuatro veces', nums.length + ' apariciones');
  check(unicos.length === 1, 'las cuatro con el mismo número',
        unicos.length === 1 ? unicos[0] : unicos.join(' / '));
}

/* ── 3. PRECIO DE INTRODUCCIÓN ─────────────────────────────────────────── */
console.log('\nINTRODUCCIÓN — cómo se anuncia el precio');
{
  const html = leer('index.html');
  const visible = html.replace(/<!--[\s\S]*?-->/g, '');   // fuera los comentarios
  const veces = (visible.match(/introducci[óo]n/gi) || []).length;
  check(veces === 3, 'la idea aparece en los tres lugares', veces + ' apariciones');

  const prohibidas = [...visible.matchAll(/\b(ofertas?|promoci[óo]n|promo|rebajas?|descuentos?)\b/gi)]
    .map((m) => m[0]);
  check(prohibidas.length === 0, 'sin vocabulario de descuento',
        prohibidas.length ? prohibidas.join(', ') : 'ninguna palabra prohibida');
}

/* ── 4. FONDO ──────────────────────────────────────────────────────────── */
console.log('\nFONDO — el mismo negro, escrito a mano en cinco lugares');
todosIguales([
  { donde: 'index.html · meta theme-color',
    valor: extraer('index.html', /<meta name="theme-color" content="(#[0-9A-Fa-f]{6})"/, 'fondo') },
  { donde: '404.html · meta theme-color',
    valor: extraer('404.html', /<meta name="theme-color" content="(#[0-9A-Fa-f]{6})"/, 'fondo') },
  { donde: 'css/styles.css · --bg',
    valor: extraer('css/styles.css', /--bg:\s*(#[0-9A-Fa-f]{6})/, 'fondo') },
  { donde: 'tools/og-image.html · --bg',
    valor: extraer('tools/og-image.html', /--bg:\s*(#[0-9A-Fa-f]{6})/, 'fondo') },
  { donde: 'assets/favicon.svg · rect de fondo',
    valor: extraer('assets/favicon.svg', /<rect[^>]*fill="(#[0-9A-Fa-f]{6})"/, 'fondo') },
], 'el negro del fondo', (v) => v.toUpperCase());

/* ── 5. DOMINIO ────────────────────────────────────────────────────────── */
console.log('\nDOMINIO — el host, en siete lugares');
todosIguales([
  { donde: 'index.html · canonical',
    valor: extraer('index.html', /<link rel="canonical" href="https:\/\/([^/"]+)/, 'dominio') },
  { donde: 'index.html · og:url',
    valor: extraer('index.html', /<meta property="og:url" content="https:\/\/([^/"]+)/, 'dominio') },
  { donde: 'index.html · og:image',
    valor: extraer('index.html', /<meta property="og:image" content="https:\/\/([^/"]+)/, 'dominio') },
  { donde: 'index.html · JSON-LD url',
    valor: extraer('index.html', /"url":\s*"https:\/\/([^/"]+)/, 'dominio') },
  { donde: 'robots.txt · Sitemap',
    valor: extraer('robots.txt', /Sitemap:\s*https:\/\/([^/\s]+)/, 'dominio') },
  { donde: 'sitemap.xml · loc',
    valor: extraer('sitemap.xml', /<loc>https:\/\/([^/<]+)/, 'dominio') },
  { donde: 'README.md · En vivo',
    valor: extraer('README.md', /\*\*En vivo:\*\*\s*https:\/\/([^/\s]+)/, 'dominio') },
], 'el host', (v) => v.toLowerCase());

/* ── 6. CALENDLY ───────────────────────────────────────────────────────── */
console.log('\nCALENDLY — el rango del plan pago, en dos archivos');
todosIguales([
  { donde: '.claude/rules/entrega-clientes.md · planes gratuitos',
    valor: extraer('.claude/rules/entrega-clientes.md', /USD (\d+-\d+) por usuario al mes/, 'rango de Calendly') },
  { donde: 'entrega/reserva-de-turnos.md · paso 5',
    valor: extraer('entrega/reserva-de-turnos.md', /\*\*USD (\d+-\d+) por usuario al mes\*\*/, 'rango de Calendly') },
  { donde: 'entrega/reserva-de-turnos.md · texto modelo',
    valor: extraer('entrega/reserva-de-turnos.md', /USD \[(\d+-\d+)\] por mes/, 'rango de Calendly') },
], 'el rango de Calendly');

/* ── 7. CTA → ANCLA ────────────────────────────────────────────────────── */
console.log('\nCTA — todo botón con id ...Cta vigilado por js/main.js');
{
  const ids = [...leer('index.html').matchAll(/id="(\w*Cta)"/g)].map((m) => m[1]);
  const aVigilar = ids.filter((id) => id !== 'floatingCta');
  const js = leer('js/main.js');
  const huerfanos = aVigilar.filter((id) => !js.includes(`'${id}'`));

  check(aVigilar.length > 0, 'hay botones que vigilar', aVigilar.join(', '));
  check(huerfanos.length === 0, 'todos referenciados en js/main.js',
        huerfanos.length
          ? huerfanos.join(', ') + ' — sin ancla, la barra flotante va a aparecer encima'
          : 'ninguno huérfano');
}

/* ── 8. ORDEN DE .step--pay::before ────────────────────────────────────── */
console.log('\nORDEN EN EL CSS — .step--pay::before después de .step::before');
{
  const css = leer('css/styles.css');
  const base = css.indexOf('.step::before');
  const pago = css.indexOf('.step--pay::before');

  if (base === -1 || pago === -1) {
    fallas++;
    console.log('  *** FALLA ***  no encontré una de las dos reglas en css/styles.css');
  } else {
    const linea = (i) => css.slice(0, i).split('\n').length;
    check(pago > base, '.step--pay::before va después',
          `.step::before en la línea ${linea(base)}, .step--pay::before en la ${linea(pago)}` +
          (pago > base ? '' : ' — invertido: el pizarra se lleva puesto el ámbar del paso 5'));
  }
}

/* ── 9. IMAGEN DE OG ───────────────────────────────────────────────────── */
console.log('\nIMAGEN DE OG — el nombre del PNG, en cuatro lugares');
{
  const nombres = [
    { donde: 'index.html · meta og:image',
      valor: extraer('index.html', /<meta property="og:image" content="https:\/\/[^/]+\/assets\/([^"]+)"/, 'nombre del OG') },
    { donde: 'tools/build-og.ps1 · $out',
      valor: extraer('tools/build-og.ps1', /\$out\s*=\s*Join-Path \$root 'assets\\([^']+)'/, 'nombre del OG') },
    { donde: 'tools/build-og.ps1 · encabezado',
      valor: extraer('tools/build-og.ps1', /# Genera assets\/(\S+) a partir de/, 'nombre del OG') },
    { donde: 'tools/og-image.html · title',
      valor: extraer('tools/og-image.html', /<title>Fuente de assets\/([^<]+)<\/title>/, 'nombre del OG') },
  ];
  todosIguales(nombres, 'el nombre del PNG');

  /* Que las cuatro menciones coincidan no sirve de nada si apuntan a un archivo
     que no existe: sería el mismo link roto, escrito cuatro veces igual. */
  const alguno = nombres.find((n) => n.valor !== null);
  if (alguno) {
    const existe = fs.existsSync(path.join(RAIZ, 'assets', alguno.valor));
    check(existe, 'el archivo existe en assets/',
          alguno.valor + (existe ? '' : ' — no está en el disco'));
  }
}

/* ── 10. CATÁLOGO ──────────────────────────────────────────────────────── */
console.log('\nCATÁLOGO — qué puede escribir este proyecto en el repo de herramientas');
{
  const CAT = 'ClaudeMCPsPlugingsSkillsETC';
  let deny = null;

  try {
    const cfg = JSON.parse(leer('.claude/settings.json'));
    deny = cfg.permissions && cfg.permissions.deny;
  } catch (e) {
    deny = null;
  }

  /* Mismo criterio que extraer(): si no está lo que se venía a mirar, eso es una
     falla. Un deny vacío o ausente no es "nada que chequear" — es el guard
     entero caído. */
  if (!Array.isArray(deny) || deny.length === 0) {
    fallas++;
    console.log('  *** FALLA ***  no encontré permissions.deny en .claude/settings.json ' +
                '(sin esa lista, el catálogo entero queda escribible desde este proyecto)');
  } else {
    const reglas = deny.filter((r) => r.includes(CAT));
    check(reglas.length > 0, 'hay deny sobre el catálogo', reglas.length + ' reglas');

    /* La carpeta del otro proyecto de Joaco. Si esto se afloja, este proyecto
       puede escribirle encima y no hay ningún error que lo delate. */
    const otro = reglas.some((r) => r.includes('proyectos/surgamezombie'));
    check(otro, 'proyectos/surgamezombie/ denegado',
          otro ? 'cerrado' : 'ABIERTO — este proyecto puede escribir en la carpeta de otro proyecto');

    /* Y el lado inverso: que no se haya cerrado de más. Un deny sobre la propia
       carpeta, o uno amplio sobre proyectos/, corta la anotación de decisiones
       de herramientas sin avisar. */
    const propia = reglas.filter((r) => /proyectos\/webpersonal|proyectos\/\*/.test(r));
    check(propia.length === 0, 'proyectos/webpersonal/ sigue escribible',
          propia.length === 0 ? 'sin deny encima' : 'lo tapa: ' + propia.join(', '));
  }
}

/* ── Cierre ────────────────────────────────────────────────────────────── */
if (fallas) {
  console.log(`\n${fallas} regla(s) de consistencia no se cumplen.\n`);
  process.exitCode = 1;
} else {
  console.log('\nTodo coincide.\n');
}
