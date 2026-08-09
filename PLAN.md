# Qué falta

Qué viene y en qué orden. **No describe lo que ya hay** —eso es `ESTADO.md`— ni argumenta
decisiones —eso es `CLAUDE.md`—. Un ítem que se cierra baja a la sección 7 con su hash.

## 1. Los pilares, y en cuál estamos

| # | Pilar | Estado |
|---|---|---|
| **1** | **Sitio** — esta web | **ACTIVO — estamos acá, en la etapa de repaso** |
| 2 | Portfolio — piezas reales en salud | trabado |
| 3 | Clientes / outreach | no arrancado |

⚠ **El pilar 1 NO está cerrado.** El sitio está publicado y funcionando —39 aserciones de
render, 13 reglas de consistencia— pero falta el **repaso completo con mejoras** que Joaco
quiere hacer antes de darlo por terminado. Ese repaso todavía no arrancó y no tiene detalle.

## 2. Ahora

*Tope de 5. Si entra uno y hay 5, sale otro — la lista no se amplía.*

1. **Definir el alcance del repaso de mejoras del sitio.** Es lo que desbloquea todo el
   pilar 1. Se define en otra sesión, con Joaco.
2. **Verificar que las cuatro reglas de `.claude/rules/` cargan de verdad.** En sesión
   nueva, `/context` y confirmar que aparecen bajo *Memory files*. Se escribieron con la
   forma `paths:` documentada, pero **nunca se verificó**: la prueba del 9/8/2026 salió
   inconcluyente porque el directorio no existía al arrancar esa sesión. Si no cargan, es
   un cambio de una línea por archivo.
   ⚠ **Al verificar textos en `index.html`, buscar sin el espacio: el sitio escribe
   `10&nbsp;días`, así que un grep de `"10 días"` da falso negativo.** Es la misma trampa
   que la de `"USD 90"` en `.claude/rules/precio.md`, y ya causó un falso negativo el
   9/8/2026.
3. **Commitear el set de la reescritura de `CLAUDE.md`** (el archivo, las cuatro reglas,
   los dos anclajes de `consistencia.js` y este archivo).

## 3. Después

*En orden. El orden es la información.*

1. **Ejecutar el repaso de mejoras**, una vez definido su alcance en el punto 1 de "Ahora".
2. **Cerrar el pilar 1.** Recién ahí el sitio se considera terminado.
3. **Cubrir las métricas `fallback` de las fuentes** — la única de las once reglas de
   consistencia que ninguna herramienta verifica. Va después del repaso porque el repaso
   podría tocar las fuentes y obligar a recalcularlas igual.

## 4. Los pilares en detalle

**Pilar 1 — Sitio**
La vidriera del negocio. Publicada en `mosland.github.io`, verificada por
`tools/verificar.js` y `tools/consistencia.js`.
→ **Trigger de cierre:** que el repaso de mejoras esté hecho y Joaco lo dé por terminado.
No hay otro criterio: pasar las aserciones no alcanza, ya las pasa.

**Pilar 2 — Portfolio**
Piezas reales en el rubro salud, con capturas. Es el **único lugar de la web donde se
nombra un rubro concreto**. El HTML y el CSS ya están resueltos y comentados en
`index.html` (buscar `PORTFOLIO`).
→ **Trigger de arranque:** que exista al menos una pieza real.
→ Hoy: trabado, ver sección 6.

**Pilar 3 — Clientes / outreach**
Salir a buscar clientes activamente, en salud.
→ **Trigger de arranque:** que el portfolio esté publicado. Depende del pilar 2.

## 5. Decidido pero sin agendar

*Se va a hacer; no se sabe cuándo. Sin orden a propósito.*

- **Borrar la memoria automática `commits-directo-a-main.md`.** La regla de push inmediato
  y de no usar ramas ya está en `CLAUDE.md`, así que la memoria quedó duplicada.
- **Sacar el conector de Gmail.** Cero llamadas en 23 sesiones (medido el 9/8/2026). No
  ahorra contexto —es *deferred*—, es una conexión menos que mantener.
- **Reevaluar el plugin `claude-md-management`.** Lleva cero usos desde que se instaló el
  8/8/2026. Se conservó porque la reescritura de `CLAUDE.md` era su caso de uso; si esa
  reescritura terminó sin invocarlo, se saca.
- **Apagar `godot-ai` en los otros proyectos.** Está deshabilitado en este desde el
  9/8/2026, pero `/mcp disable` es por proyecto y el servidor sigue declarado en scope
  usuario: nace activo en cualquier máquina nueva.
- **Mirar Workers (Static Assets)** si Cloudflare Pages deja de alcanzar para los sitios de
  clientes. Migrar es trivial —son los mismos archivos estáticos—. **No hay nada que hacer
  hoy con esto.**

## 6. Trabado esperando algo externo

*Nada de acá depende de Joaco.*

| Qué | Espera | De quién |
|---|---|---|
| Piezas de portfolio | que existan trabajos reales para mostrar | primeros clientes |
| `assets/trabajos/` — la carpeta no existe | lo mismo | primeros clientes |
| Estrenar `entrega/reserva-de-turnos.md` | un cliente que necesite reserva de turnos | primer cliente con agenda |

⚠ Cuando se descomente el bloque `PORTFOLIO`, la captura de ejemplo lleva `alt=""`. Está
bien mientras no se muestre, pero **una pieza de portfolio no es decorativa**: hay que
escribirle un `alt` real.

## 7. Cerrado

| Qué | Commit |
|---|---|
| `ESTADO.md` — el mapa de qué hay hecho | `13e146e` |
| Flag `--resumen` en `verificar.js` | `c2579be` |
| Regla del nombre del PNG de OG | `4fcbd76` |
| "promo" sumado al vocabulario de precio prohibido | `4841c54` |
| `tools/consistencia.js` — chequeo mecánico entre archivos | `7edf37e` |
| Cerrado dónde viven los sitios de clientes (Cloudflare, cuenta del cliente) | `8a7943c` |
| Plantilla de entrega de la reserva de turnos | `a50351f` |
| Reescritura de `CLAUDE.md` + `.claude/rules/` | *(sin commitear)* |
