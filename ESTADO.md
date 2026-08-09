# Estado del proyecto

Mapa de qué hay hecho y cómo está armado. **No decide ni argumenta nada**: cada cosa
apunta a dónde vive su porqué. Para qué falta, ver `PLAN.md`. Tabla de ruteo al final.

## 1. Qué es esto

La web de presentación de Joaquín Moas como freelance de desarrollo web. **Es la
vidriera del negocio, no el sitio de un cliente.** Una sola página, HTML/CSS/JS plano,
sin build, sin dependencias y sin una petición a un dominio externo. Publicada en
GitHub Pages en `mosland.github.io`. Quien entra tiene que entender qué hace, cuánto
sale, cómo es el proceso, y escribirle por WhatsApp.

## 2. Cuán fresco es esto

Verificado el **9 de agosto de 2026**, commit **`c2579be`**. La sección 6 se regenera
corriendo, no se edita a mano — con el servidor levantado en 8899:

```
node tools/verificar.js 8899 --resumen
node tools/consistencia.js
```

Si algo de acá contradice al código, **manda el código**: este archivo está viejo.

## 3. Mapa del repo

**El sitio publicado**
- `index.html` — la landing entera (482 l). Incluye el JSON-LD y el bloque de
  portfolio comentado.
- `404.html` — página de error; reusa `styles.css` y agrega lo suyo inline.
- `css/styles.css` — hoja única (856 l), con los tokens arriba de todo en `:root`.
- `js/main.js` — 82 l, todo mejora progresiva: año del footer y CTA flotante.
- `assets/` — favicon, imagen de OG, y las dos fuentes self-hosted en `fonts/`.

**Infraestructura de publicación** — `robots.txt` (permite todo salvo `/entrega/`),
`sitemap.xml` (una sola URL) y `.nojekyll` (que Pages no procese el sitio con Jekyll).

**Herramientas de desarrollo** — no son parte del sitio
- `tools/verificar.js` — abre la página en Chromium y comprueba cómo se ve. Necesita
  servidor y Playwright.
- `tools/consistencia.js` — compara texto entre archivos. Sin servidor ni
  dependencias, corre en milisegundos.
- `tools/og-image.html` — ⚠ **no es una página del sitio.** Es la fuente que se
  rasteriza para generar el PNG de OG, junto con `tools/build-og.ps1`.

**Documentación** — `CLAUDE.md` (el porqué), `README.md` (el cómo), y este archivo.

**Material para clientes** — ⚠ rol propio: ni sitio ni herramienta.
`entrega/reserva-de-turnos.md` es el checklist y el texto modelo que se usan **con un
cliente** al entregarle un sitio con reserva de turnos. Está terminado y sin estrenar.

**Configuración de Claude Code** — `.mcp.json`, `.claude/settings.json` y
`playwright-mcp.config.json`, commiteados a propósito. Ver sección 8.

## 4. El sitio: qué secciones tiene

Ocho secciones en `index.html`, en este orden:

| Ancla | Qué hace |
|---|---|
| *(hero, sin id)* | Titular, subtítulo, CTA de WhatsApp y la garantía como señal de confianza. Más el resumen del proceso en cinco renglones |
| `#problema` | El costo de no tener una web que funcione. Empatía antes de vender |
| `#paquetes` | El presupuesto: qué incluye y el total. Una sola tarjeta |
| `#proceso` | Los cinco pasos. Único lugar numerado de la página |
| `#garantia` | No se cobra nada por adelantado |
| `#preguntas` | Siete preguntas frecuentes en `<details>` nativo, cero JavaScript |
| `#sobre-mi` | Quién es Joaco y por qué eso le conviene al cliente |
| `#contacto` | WhatsApp como canal principal, mail como alternativa. **Sin formulario** |

Más el **CTA flotante** (`#floatingCta`), que aparece solo cuando no hay ningún otro
CTA en pantalla, y `404.html` aparte.

## 5. Sistema de diseño, en una pantalla

**Dos colores con rol fijo, y no se pisan:**
- **Pizarra frío** — la estructura del documento: superficies, espinazo, reglas,
  números de paso, etiquetas, el marcador del acordeón. **Nunca es accionable.**
- **Ámbar `#FFB454`** — solo lo accionable y el momento del pago. Está racionado.

La regla que sostiene el sistema: **el texto de lectura no se tiñe.** `--text` y
`--muted` quedan neutros.

**El espinazo** es la línea vertical que recorre la página entera y su única gracia es
no cortarse nunca. Vive en `.spine`, adentro de cada `.container`, y lleva el padding
vertical de la sección.

**Las fuentes** son Bricolage Grotesque (títulos) y Hanken Grotesk (cuerpo),
self-hosted. Pesan más que las anteriores y fue a propósito.

Mobile-first, tema oscuro fijo (no conmutable), y el CTA de contacto visible sin
scrollear. → El porqué de todo esto está en `CLAUDE.md`.

## 6. Qué está protegido por máquina y qué no

*Generado el 9/8/2026 con los dos comandos de la sección 2.*

**`tools/verificar.js` — 39 aserciones sobre la página renderizada**

| Bloque | Aserciones | Estado |
|---|---:|---|
| ÁMBAR | 3 | ✅ |
| PIZARRA | 3 | ✅ |
| CONTRASTE | 14 | ✅ |
| ESPINAZO | 2 | ✅ |
| CTA FLOTANTE | 4 | ✅ |
| DESBORDE HORIZONTAL | 5 | ✅ |
| FOCO | 3 | ✅ |
| REDUCED MOTION | 2 | ✅ |
| SIN JAVASCRIPT | 3 | ✅ |
| **Total** | **39** | **✅** |

**`tools/consistencia.js` — 13 aserciones sobre 9 reglas entre archivos**

Precio · WhatsApp · Introducción · Fondo · Dominio · Calendly · CTA→ancla · Orden en
el CSS · Imagen de OG.

**Las once reglas de consistencia: diez cubiertas, una no.** Nueve las cubre
`consistencia.js` y una `verificar.js` (los ratios de contraste). La del orden en el
CSS está en los dos: directa en `consistencia.js`, por efecto en `verificar.js`.

❌ **La que falta: las métricas `fallback` de las fuentes.** Salen de leer el binario
del `.woff2` y compararlo con Arial, así que al cambiar una fuente sigue dependiendo
de que alguien las recalcule a mano. Está anotado en el README y en el encabezado de
`consistencia.js` para que no parezca olvido.

## 7. Decisiones cerradas

Índice, no argumento. Están acá porque **alguien podría reabrirlas sin darse cuenta**;
el porqué de cada una está en `CLAUDE.md`.

| Decisión | Desde |
|---|---|
| Un solo paquete de USD 90. No se vuelve a partir en dos | ago 2026 |
| El precio se anuncia como "de introducción", nunca como oferta ni promoción | ago 2026 |
| No van fotos de Joaco en el sitio. Las capturas de portfolio sí | — |
| Sin formulario de contacto: puede fallar en silencio | — |
| El mensaje principal no menciona ningún rubro | — |
| Sin JSON-LD de `FAQPage`: era doble edición a cambio de nada | ago 2026 |
| Los sitios de clientes van en Cloudflare Pages, en cuenta del cliente, con dominio comprado por él | ago 2026 |
| GitHub Pages queda solo para esta web | ago 2026 |
| "Reserva de turnos" es la agenda del propio cliente, no una cuenta de Joaco | ago 2026 |
| Dos colores con roles fijos; el texto de lectura no se tiñe | ago 2026 |
| El header no es fijo, y hay un solo momento animado: al cargar | — |
| La web no promete que el hosting sea gratis ni sostenerlo indefinidamente | — |

## 8. Herramientas y configuración

**Activo:** Playwright MCP (`.mcp.json`), y dos plugins en `.claude/settings.json` —
**frontend-design** (sin versión fija, puede cambiar sin aviso) y
**claude-md-management** v1.0.0. Los tres en project scope, commiteados, así que
viajan a la otra computadora. Lo que **no** viaja es la aprobación por máquina:
`.claude/settings.local.json` está gitignoreado a propósito.

**Deshabilitado:** `godot-ai`, desde `/mcp`, el 9/8/2026. Sigue declarado en scope
usuario, así que vuelve si se lo reactiva y en otra computadora nace activo. Escucha
en el puerto 8000 y choca con el servidor de preview — ver el README.

**Sin instalar:** cinco herramientas diferidas, cada una con su disparador, y once
rechazadas. → Los motivos completos están en Notion, página **Skills Plugins MCP**,
sección *Proyecto Web Personal*. **No proponer nada nuevo sin preguntarle a Joaco.**

## 9. Lo que existe pero no está activo

- **La sección de portfolio.** El HTML y el CSS ya están resueltos, comentados en
  `index.html` (buscar `PORTFOLIO`). Es el único lugar de la web donde se nombra un
  rubro concreto. Falta que existan piezas reales.
- **`assets/trabajos/`** — la carpeta **no existe todavía**. La nombran el bloque
  comentado y el README.
- **`entrega/reserva-de-turnos.md`** — terminado y sin estrenar: no hay clientes.
- ⚠ Dentro del bloque comentado, la captura de ejemplo lleva `alt=""`. Está bien
  mientras no se muestre, pero **una pieza de portfolio no es decorativa**: hay que
  escribirle un `alt` real al descomentarla.

---

## Dónde vive cada cosa

| Tipo de información | Va en |
|---|---|
| El **porqué** de una decisión de negocio o de diseño | `CLAUDE.md` |
| El **cómo** se hace una tarea (editar, verificar, publicar, clonar) | `README.md` |
| **Qué hay hoy** y cómo está armado | `ESTADO.md` — este archivo |
| **Qué falta** y en qué orden | `PLAN.md` |
| Motivos de las herramientas **rechazadas**, y las diferidas | Notion → *Skills Plugins MCP* |

Un dato que aparece en dos de estos archivos es una regla de consistencia nueva. Antes
de duplicar algo, conviene apuntar.
