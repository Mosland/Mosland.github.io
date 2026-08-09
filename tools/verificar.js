/* ══════════════════════════════════════════════════════════════════════════
   Verificación automática de la landing.

   Corre las comprobaciones que son tediosas de hacer a mano y fáciles de
   romper sin darse cuenta. No reemplaza mirar el sitio: reemplaza acordarse
   de mirar todas estas cosas, una por una, cada vez. (Acá había un conteo y se
   sacó: cada bloque nuevo obligaba a corregirlo, y el conteo viejo es peor que
   no tener conteo.)

   USO
     1. Levantar el sitio:   python -m http.server 8000
     2. En otra terminal:    node tools/verificar.js
        (otro puerto:        node tools/verificar.js 8899)

   REQUISITO
     Playwright, que NO es una dependencia del sitio —el sitio sigue sin una
     sola dependencia externa— sino una herramienta de desarrollo. Si no lo
     tenés:

        npm install playwright
        npx playwright install chromium

     Este archivo no lo referencia ninguna página; GitHub Pages lo publica
     como publica todo tools/, y no pasa nada porque no hace nada en el
     navegador de un visitante.

   SALIDA
     Sale con código 1 si alguna comprobación falla, así que sirve de portón
     antes de comitear. Las capturas van a una carpeta temporal del sistema y
     la ruta se imprime al final: no ensucian el repo.
   ══════════════════════════════════════════════════════════════════════════ */
'use strict';

const path = require('path');
const os = require('os');
const fs = require('fs');

let chromium;
try {
  ({ chromium } = require('playwright'));
} catch (e) {
  console.error('\nFalta Playwright. Instalalo con:\n');
  console.error('  npm install playwright');
  console.error('  npx playwright install chromium\n');
  process.exit(1);
}

/* Los flags se filtran antes de leer el puerto: sin esto,
   `node tools/verificar.js --resumen` tomaría "--resumen" como número de puerto.
   Así el orden no importa: 8899 --resumen y --resumen 8899 son lo mismo. */
const ARGS = process.argv.slice(2);
const RESUMEN = ARGS.includes('--resumen');
const SUELTOS = ARGS.filter((a) => !a.startsWith('--'));

const PUERTO = SUELTOS[0] || process.env.PUERTO || '8000';
const URL = `http://127.0.0.1:${PUERTO}/index.html`;
const OUT = fs.mkdtempSync(path.join(os.tmpdir(), 'verificar-landing-'));

const AMBAR = 'rgb(255, 180, 84)';
let fallas = 0;

/* Registro de bloques, para --resumen. La cantidad de aserciones no se puede
   contar leyendo el archivo: dos de ellas están adentro de bucles (los ratios
   de contraste y los anchos del desborde), así que el número real solo se sabe
   corriendo. Por eso el resumen se genera durante la corrida y no aparte. */
const bloques = [];
let actual = null;

function bloque(nombre) {
  actual = { nombre, total: 0, fallas: 0 };
  bloques.push(actual);
  console.log('\n' + nombre);
}

function check(bien, texto, detalle) {
  if (!bien) fallas++;
  if (actual) {
    actual.total++;
    if (!bien) actual.fallas++;
  }
  const marca = bien ? 'OK  ' : '*** FALLA ***  ';
  console.log('  ' + marca + texto + (detalle !== undefined ? ': ' + detalle : ''));
}

/* Tabla markdown, para pegar en ESTADO.md sin transcribir nada a mano. */
function imprimirResumen() {
  const total = bloques.reduce((n, b) => n + b.total, 0);
  console.log('\n\n─── RESUMEN (markdown, para ESTADO.md) ───\n');
  console.log('| Bloque | Aserciones | Estado |');
  console.log('|---|---:|---|');
  for (const b of bloques) {
    console.log(`| ${b.nombre.split(' — ')[0]} | ${b.total} | ${b.fallas ? '❌ ' + b.fallas : '✅'} |`);
  }
  console.log(`| **Total** | **${total}** | **${fallas ? '❌ ' + fallas : '✅'}** |`);
}

(async () => {
  let browser;
  try {
    browser = await chromium.launch();
  } catch (e) {
    console.error('No se pudo abrir Chromium. Corré: npx playwright install chromium');
    process.exit(1);
  }

  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();

  try {
    await page.goto(URL, { waitUntil: 'networkidle', timeout: 10000 });
  } catch (e) {
    console.error(`\nNo respondió ${URL}`);
    console.error('¿Está levantado el servidor?  python -m http.server ' + PUERTO + '\n');
    await browser.close();
    process.exit(1);
  }

  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(1200);   // que termine la entrada del hero

  /* ── Los tres usos del ámbar que marcan el momento del pago ───────────────
     Es lo más fácil de romper del sistema de dos colores: alcanza con escribir
     una regla de estructura después de estas para que el pizarra se las lleve
     puestas. Ya pasó una vez con el número del paso 5. */
  bloque('ÁMBAR — el momento del pago (los tres tienen que ser ámbar)');
  const color = await page.evaluate(() => {
    const c = (sel, pseudo) => {
      const el = document.querySelector(sel);
      return el ? getComputedStyle(el, pseudo || null).color : 'NO EXISTE';
    };
    return {
      renglon:  c('.hero-ledger__pay'),
      paso5:    c('.step--pay', '::before'),
      garantia: c('.guarantee__kicker'),
      paso1:    c('.step:first-child', '::before'),
      badge:    c('.badge'),
      marcador: c('.qa summary', '::after'),
    };
  });
  check(color.renglon === AMBAR,  'renglón "Recién ahí pagás"', color.renglon);
  check(color.paso5 === AMBAR,    'número del paso 5', color.paso5);
  check(color.garantia === AMBAR, 'cierre de la garantía', color.garantia);

  bloque('PIZARRA — la estructura (ninguno debe ser ámbar)');
  check(color.paso1 !== AMBAR,    'número del paso 1', color.paso1);
  check(color.badge !== AMBAR,    'etiqueta de precios', color.badge);
  check(color.marcador !== AMBAR, 'marcador del acordeón', color.marcador);

  /* ── Contraste real contra los ratios anotados en styles.css ──────────────
     La tabla del encabezado del CSS y la nota del pie declaran trece ratios
     calculados a mano una vez. Un comentario no se entera de que el color
     cambió: sigue diciendo el número viejo y nadie lo nota. Acá se recalculan
     con la fórmula de luminancia relativa de WCAG 2.1, sobre los colores que la
     página realmente está usando —leídos del DOM, no copiados acá— así que si
     alguien toca un color o un fondo, esto falla en vez de dejar el comentario
     mintiendo. El margen de 0,05 es por los dos decimales de la anotación. */
  bloque('CONTRASTE — los ratios anotados en styles.css');

  const paleta = await page.evaluate(() => {
    const raiz = getComputedStyle(document.documentElement);
    const v = (n) => raiz.getPropertyValue(n).trim();
    const pie = document.querySelector('.site-footer__meta');
    return {
      bg: v('--bg'), panel: v('--bg-alt'), presupuesto: v('--surface'),
      text: v('--text'), muted: v('--muted'),
      structure: v('--structure'), accent: v('--accent'),
      pie: pie ? getComputedStyle(pie).color : null,
    };
  });

  const canales = (c) => {
    const s = String(c).trim();
    if (s[0] !== '#') return s.match(/\d+(?:\.\d+)?/g).slice(0, 3).map(Number);
    return s.length === 4
      ? [1, 2, 3].map((i) => parseInt(s[i] + s[i], 16))
      : [1, 3, 5].map((i) => parseInt(s.substr(i, 2), 16));
  };
  const luminancia = (c) => {
    const [r, g, b] = canales(c).map((n) => {
      const x = n / 255;
      return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };
  const contraste = (a, b) => {
    const [alto, bajo] = [luminancia(a), luminancia(b)].sort((x, y) => y - x);
    return (alto + 0.05) / (bajo + 0.05);
  };

  const MARGEN = 0.05;
  const AA = 4.5;

  const anotados = [
    { que: '--text sobre el fondo',            color: paleta.text,      fondo: paleta.bg,          esperado: 15.90 },
    { que: '--text sobre el panel',            color: paleta.text,      fondo: paleta.panel,       esperado: 14.77 },
    { que: '--text sobre el presupuesto',      color: paleta.text,      fondo: paleta.presupuesto, esperado: 13.54 },
    { que: '--muted sobre el fondo',           color: paleta.muted,     fondo: paleta.bg,          esperado:  6.97 },
    { que: '--muted sobre el panel',           color: paleta.muted,     fondo: paleta.panel,       esperado:  6.47 },
    { que: '--muted sobre el presupuesto',     color: paleta.muted,     fondo: paleta.presupuesto, esperado:  5.93 },
    { que: '--structure sobre el fondo',       color: paleta.structure, fondo: paleta.bg,          esperado:  8.19 },
    { que: '--structure sobre el panel',       color: paleta.structure, fondo: paleta.panel,       esperado:  7.60 },
    { que: '--structure sobre el presupuesto', color: paleta.structure, fondo: paleta.presupuesto, esperado:  6.97 },
    { que: '--accent sobre el fondo',          color: paleta.accent,    fondo: paleta.bg,          esperado: 11.03 },
    { que: '--accent sobre el panel',          color: paleta.accent,    fondo: paleta.panel,       esperado: 10.25 },
    /* El meta del pie no sale de una variable: lo pisa .site-footer__meta con un
       color propio. Se lee del elemento, que es donde vive el valor real. */
    { que: 'el meta del pie sobre el fondo',   color: paleta.pie,       fondo: paleta.bg,          esperado:  4.58 },
    /* El que había antes en el pie. No está en el CSS vivo, pero el comentario
       afirma que daba 3.85 y que por eso se cambió: si el fondo se toca, ese
       número deja de ser cierto y el motivo del cambio queda mal contado. */
    { que: '#6E6E77, el viejo del pie',        color: '#6E6E77',        fondo: paleta.bg,          esperado:  3.85, bajoAA: true },
  ];

  for (const a of anotados) {
    const r = contraste(a.color, a.fondo);
    check(Math.abs(r - a.esperado) <= MARGEN, a.que,
          r.toFixed(2) + ':1 (anotado ' + a.esperado.toFixed(2) + ':1)');
  }

  /* La tabla del CSS afirma, arriba de los números, que todo pasa AA. El
     #6E6E77 queda afuera a propósito: está anotado justamente como el que no
     llegaba. */
  const flojos = anotados
    .filter((a) => !a.bajoAA && contraste(a.color, a.fondo) < AA)
    .map((a) => a.que);
  check(flojos.length === 0, 'todos por encima del ' + AA + ':1 de WCAG AA',
        flojos.length ? flojos.join(', ') : 'ninguno por debajo');

  /* ── Continuidad del espinazo ─────────────────────────────────────────────
     Es el elemento firma y su única gracia es no cortarse nunca. Se corta si
     una sección se queda sin .spine o si recupera su propio padding vertical. */
  bloque('ESPINAZO — tiene que ser una línea sola');
  const tramos = await page.evaluate(() => [...document.querySelectorAll('.spine')].map(el => {
    const r = el.getBoundingClientRect();
    const top = r.top + window.scrollY;
    return { x: +r.left.toFixed(1), top: +top.toFixed(1), bottom: +(top + r.height).toFixed(1) };
  }));
  const cortes = [];
  for (let i = 1; i < tramos.length; i++) {
    if (Math.abs(tramos[i].top - tramos[i - 1].bottom) > 0.6) {
      cortes.push(`${tramos[i - 1].bottom} → ${tramos[i].top}`);
    }
  }
  const equis = [...new Set(tramos.map(t => t.x))];
  check(cortes.length === 0, `${tramos.length} tramos contiguos`, cortes.length ? 'cortes en ' + cortes.join(', ') : 'sin cortes');
  check(equis.length === 1, 'todos alineados en la misma x', equis.join(', '));
  if (tramos.length) console.log(`      recorrido: y=${tramos[0].top} → y=${tramos[tramos.length - 1].bottom}`);

  /* ── CTA flotante ─────────────────────────────────────────────────────────
     Vigila cuatro anclas. Si se agrega un CTA al cuerpo y no se suma a la
     lista de js/main.js, la barra aparece pegada arriba del botón nuevo. */
  bloque('CTA FLOTANTE — los cuatro estados');
  const visible = () => page.evaluate(() => document.getElementById('floatingCta').classList.contains('is-visible'));
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);
  check(!(await visible()), 'oculto con el CTA del hero en pantalla');
  await page.evaluate(() => window.scrollTo(0, 1400));
  await page.waitForTimeout(600);
  check(await visible(), 'visible en el tramo sin CTA propio');
  await page.locator('#paqueteCta').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  check(!(await visible()), 'oculto sobre #paqueteCta');
  await page.locator('#contactoCta').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  check(!(await visible()), 'oculto sobre #contactoCta');

  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(OUT, 'desktop-completa.png'), fullPage: true });
  await ctx.close();

  /* ── Desborde horizontal ──────────────────────────────────────────────────
     El body tiene overflow-x: hidden, así que un desborde no se ve pero
     igual rompe el ancho. Hay que medirlo, no mirarlo. */
  bloque('DESBORDE HORIZONTAL');
  for (const ancho of [360, 390, 768, 1024, 1440]) {
    const c = await browser.newContext({ viewport: { width: ancho, height: 900 } });
    const p = await c.newPage();
    await p.goto(URL, { waitUntil: 'networkidle' });
    const m = await p.evaluate(() => ({
      cliente: document.documentElement.clientWidth,
      scroll: document.documentElement.scrollWidth,
    }));
    check(m.cliente === m.scroll, `${ancho}px`, `client=${m.cliente} scroll=${m.scroll}`);
    if (ancho === 390) await p.screenshot({ path: path.join(OUT, 'celular-fold.png') });
    await c.close();
  }

  /* ── Foco visible en todo lo tabulable ───────────────────────────────────── */
  bloque('FOCO');
  {
    const c = await browser.newContext({ viewport: { width: 1440, height: 900 } });
    const p = await c.newPage();
    await p.goto(URL, { waitUntil: 'networkidle' });
    const paradas = [];
    for (let i = 0; i < 40; i++) {
      await p.keyboard.press('Tab');
      const info = await p.evaluate(() => {
        const el = document.activeElement;
        if (!el || el === document.body) return null;
        const cs = getComputedStyle(el);
        return { tag: el.tagName.toLowerCase(), outline: cs.outlineStyle, ancho: cs.outlineWidth };
      });
      if (!info) break;
      paradas.push(info);
    }
    const sinFoco = paradas.filter(x => x.outline === 'none' || parseFloat(x.ancho) === 0);
    check(paradas.length > 0, `${paradas.length} paradas de foco`);
    check(sinFoco.length === 0, 'todas con contorno visible', sinFoco.length ? `${sinFoco.length} sin contorno` : 'ninguna sin contorno');

    const flotante = await p.evaluate(() => {
      const el = document.querySelector('#floatingCta a');
      el.focus();
      return document.activeElement === el;
    });
    check(!flotante, 'el CTA flotante escondido no recibe foco');
    await c.close();
  }

  /* ── prefers-reduced-motion ───────────────────────────────────────────────── */
  bloque('REDUCED MOTION');
  {
    const c = await browser.newContext({ reducedMotion: 'reduce', viewport: { width: 1440, height: 900 } });
    const p = await c.newPage();
    await p.goto(URL, { waitUntil: 'networkidle' });
    const m = await p.evaluate(() => ({
      titulo: getComputedStyle(document.querySelector('.hero__title')).animationName,
      espinazo: getComputedStyle(document.querySelector('.hero .spine'), '::before').animationName,
      opacidad: getComputedStyle(document.querySelector('.hero__sub')).opacity,
    }));
    check(m.titulo === 'none' && m.espinazo === 'none', 'la entrada del hero no corre');
    check(parseFloat(m.opacidad) === 1, 'el contenido está visible igual');
    await c.close();
  }

  /* ── Sin JavaScript ───────────────────────────────────────────────────────
     La página tiene que verse entera. La entrada del hero es CSS, así que
     además tiene que seguir corriendo. */
  bloque('SIN JAVASCRIPT');
  {
    const c = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 1440, height: 900 } });
    const p = await c.newPage();
    await p.goto(URL, { waitUntil: 'load' });
    await p.waitForTimeout(1400);
    const m = await p.evaluate(() => {
      const secs = [...document.querySelectorAll('main section')];
      const ocultas = secs.filter(s => {
        const cs = getComputedStyle(s);
        return cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.99;
      }).map(s => s.id);
      return {
        secciones: secs.length,
        ocultas,
        flotanteOculto: document.getElementById('floatingCta').hasAttribute('hidden'),
        opacidadBajada: getComputedStyle(document.querySelector('.hero__sub')).opacity,
      };
    });
    check(m.ocultas.length === 0, `las ${m.secciones} secciones se ven`, m.ocultas.length ? 'ocultas: ' + m.ocultas.join(', ') : 'ninguna oculta');
    check(m.flotanteOculto, 'la barra flotante queda oculta sin JS');
    check(parseFloat(m.opacidadBajada) === 1, 'la entrada del hero terminó igual (es CSS)');
    await p.screenshot({ path: path.join(OUT, 'sin-js.png'), fullPage: true });
    await c.close();
  }

  await browser.close();

  console.log('\nCapturas en: ' + OUT);
  if (fallas) {
    console.log(`\n${fallas} comprobación(es) fallaron.\n`);
    process.exitCode = 1;
  } else {
    console.log('\nTodo en orden.\n');
  }

  if (RESUMEN) imprimirResumen();
})();
