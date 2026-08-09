---
paths:
  - "entrega/**"
---

# Entrega a clientes: reserva de turnos y hosting

El checklist ejecutable y el texto modelo están en `entrega/reserva-de-turnos.md`. Acá está
el porqué y los compromisos.

## Qué significa "reserva de turnos"

Definido en agosto de 2026 — antes se vendía sin definir.

- Es la agenda online **del propio cliente** (Calendly, Google Calendar u otra), conectada
  desde el sitio. **La cuenta es suya: Joaco la configura, no es titular.** Eso es lo que
  evita quedar atado a mantener cuentas ajenas, y lo que hace que si un día deja de
  trabajar con él, la agenda siga funcionando.
- **Embed o enlace se decide por cliente**, no hay regla fija. El embed inline está en el
  plan gratuito de Calendly y convierte mejor que mandar al visitante fuera del dominio:
  se usa cuando la reserva es la acción principal de esa página. Enlace cuando es
  secundaria. ⚠ La regla de "cero dependencias externas" es de **esta** landing, no de los
  sitios de clientes: acá no aplica.

## ⚠ Los planes gratuitos aprietan rápido en salud

- **Calendly free:** 1 tipo de evento, 1 calendario conectado, **sin recordatorios
  automáticos** (eso es plan pago, del orden de USD 10-12 por usuario al mes).
- **Google Calendar** en cuentas personales y Business Starter: una sola página de reserva
  y sin recordatorios automáticos por mail.

Un nutricionista con "primera consulta" y "seguimiento" ya son dos tipos de evento: se
pasó. Y sin recordatorios, hay no-shows.

**Ese costo es del cliente y se le avisa ANTES de cerrar el trato** — no cuando se topa con
el límite.

## ⚠ Riesgo de falla silenciosa

Es el mismo motivo por el que no se usan formularios: si al cliente se le vence la prueba,
se le desconecta el calendario o cierra la cuenta, **el botón de reservar sigue visible y
no reserva nada, y él no se entera.**

No se arregla con una regla de diseño. Se arregla con dos cosas, **las dos obligatorias en
la entrega**:

1. **Probar la reserva de punta a punta** —reservar de verdad y verificar que el turno
   aparece en el calendario del cliente— **en dos momentos, los dos obligatorios**:
   - antes de publicar, en el enlace de prueba;
   - **de nuevo después de migrar al dominio propio del cliente** (paso 5 del proceso).

   ⚠ No alcanza con el primero: si el embed de la agenda tiene restricción por dominio,
   anda en el subdominio de prueba y se rompe en el dominio final. Es la misma falla
   silenciosa, un rato más tarde.
2. **Dejarle por escrito qué parte depende de él**: que la cuenta es suya, que si la
   desactiva el botón deja de funcionar, y que eso el sitio no lo puede detectar.

## Dónde vive el sitio del cliente

**Cloudflare Pages, gratis, en una cuenta que abre y de la que es titular el CLIENTE.**
Joaco ayuda a configurarla porque es sencillo, pero no queda como dueño ni pagando nada.
Mismo principio que la agenda, y por los mismos dos motivos: no quedar de proveedor de
hosting permanente, y que si el cliente se va, el sitio siga siendo suyo.

**El dominio lo compra el cliente, donde quiera.** Si no tiene preferencia, se le puede
sugerir Cloudflare Registrar (cobra el registro sin margen, y le queda todo en la misma
cuenta). Es sugerencia, no requisito: el sitio anda igual con el dominio comprado en
cualquier lado, y anda igual sin dominio propio.

⚠ **GitHub Pages no se usa para sitios de clientes.** Ver `CLAUDE.md`.
