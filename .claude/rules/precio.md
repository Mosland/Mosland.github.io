---
paths:
  - "index.html"
  - "README.md"
  - "CLAUDE.md"
---

# Cambiar el precio: toca SEIS lugares en tres archivos

El precio de introducción va a subir cuando Joaco lo decida, así que esto va a pasar. Los
lugares se nombran **por su función y no por lo que dicen hoy**: si este procedimiento
repitiera el número, cada corrección del conteo agregaría un lugar más que mantener.

## Los seis

**En `index.html`, tres:**
1. El total del presupuesto de `#paquetes` (`quote__total`).
2. Dentro del JSON-LD de `ProfessionalService`, el campo `priceRange`.
3. Dentro del mismo JSON-LD, el campo `Offer.price`.

Si alguno queda viejo, el sitio se contradice a sí mismo en el resultado de búsqueda.

**En `CLAUDE.md`, dos:**

4. El bullet del paquete único, en la sección del negocio.
5. El bullet de "No proponer volver a dos paquetes", en "Qué NO hacer".

⚠ Si estos quedan viejos es **peor** que en la web: el próximo que lea `CLAUDE.md` toma el
precio viejo como fuente de verdad y lo vuelve a propagar.

**En `README.md`, uno:**

6. El bullet del paquete único en "Decisiones que conviene no romper". Este es el que
   faltaba: hasta el 7/8/2026 el propio procedimiento afirmaba que el README no tenía
   precios, y sí los tenía.

## ⚠ La trampa de la búsqueda

**Buscar `"USD 90"` NO encuentra el total.** El markup es
`<span class="quote__cur">USD</span>90`, con la moneda en su propio elemento. **Hay que
buscar el número pelado.**

Verificado por grep el 7/8/2026 sobre todo el repo: aparte de los seis, el número pelado
solo aparece en un canal de color de `tools/og-image.html` y en los ejemplos de búsqueda.
`css/styles.css` no aparece — su único match es un ratio de contraste con un punto delante,
que la búsqueda del número pelado no encuentra. La imagen de OG no muestra precios.

## Y dos cosas que NO se tocan

Es la trampa del otro lado:

- **Las menciones históricas de los dos paquetes viejos**, en `CLAUDE.md` y en el README.
  Describen lo que había antes de unificarlos. Actualizarlas borra el registro de por qué
  no hay que volver a partir el paquete en dos.
- **Los ejemplos de búsqueda** de este procedimiento y del README, donde el número aparece
  como texto de ejemplo y no como precio.

Es el mismo riesgo de desincronización por el que se eliminó el bloque `FAQPage`.
