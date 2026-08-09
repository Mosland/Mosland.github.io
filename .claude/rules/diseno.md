---
paths:
  - "css/styles.css"
  - "index.html"
  - "404.html"
  - "tools/og-image.html"
---

# Sistema de diseño

Minimalista, tema oscuro fijo (no conmutable). Mobile-first: la mayoría entra desde el
celular. El mapa de qué hay hecho está en `ESTADO.md` §5; acá está el porqué y las reglas.

## Dos colores con roles fijos

Decisión de agosto de 2026 — antes era un solo acento.

- **Pizarra frío** — la estructura del documento: superficies, espinazo, reglas, números de
  paso, etiquetas, el marcador del acordeón. **Nunca es accionable.**
- **Ámbar `#FFB454`** — reservado para lo accionable y para el momento del pago. Está
  racionado a propósito: si se usa de más, deja de señalar.

⚠ **La regla que sostiene todo el sistema: el texto de lectura no se tiñe.** `--text` y
`--muted` quedan neutros. Si el cuerpo también se va al azul, la página se vuelve monocroma
fría y esto deja de leerse como dos colores con roles distintos, para leerse como un filtro
encima.

## El espinazo

Es la línea vertical que recorre la página entera, y **su única gracia es no cortarse
nunca**. Vive en `.spine`, adentro de cada `.container`, y lleva el padding vertical de la
sección. Cualquier cambio de layout que la interrumpa rompe lo único que hace.

## Tipografía

**Bricolage Grotesque** (títulos) y **Hanken Grotesk** (cuerpo), self-hosted en
`assets/fonts/`.

⚠ **Pesan ~40 KB más que las anteriores y fue deliberado.** Las dos caras viejas (Space
Grotesk e Inter) son las más asociadas a los sitios generados con IA, y estaban usadas
juntas. Se pagó ese peso por identidad visual, con los ojos abiertos. **Si una auditoría de
performance encuentra las fuentes como lo más pesado del sitio: ya se sabe, y se quedan.**

## Reglas verificables

- **Cero peticiones a dominios externos.** Lo chequea `tools/consistencia.js`.
- **Los ratios de contraste** los verifica `tools/verificar.js` (14 aserciones). Si el
  script falla, manda el script — no el criterio visual.
- **El CTA de contacto (WhatsApp) tiene que verse sin scrollear.**
- Nada de imágenes pesadas ni animaciones que retrasen la carga. Hay un solo momento
  animado: al cargar.

## No mezclar direcciones de diseño

Este estilo dark-minimalista es de **esta** web. Las futuras piezas de portfolio para
clientes de salud son un proyecto aparte con su propia dirección (cálida, clara). No se
copia el estilo de acá para allá.
