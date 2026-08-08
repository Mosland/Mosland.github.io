# Entrega de la reserva de turnos

Las dos piezas que `CLAUDE.md` marca como **obligatorias en la entrega** cuando un
sitio de cliente lleva reserva de turnos: la prueba de punta a punta y lo que hay que
dejarle dicho por escrito.

Esto no decide nada nuevo. Es la instrumentación de lo que ya está definido en
`CLAUDE.md`, sección "Qué significa reserva de turnos". Si algo de acá contradice ese
archivo, manda `CLAUDE.md`.

**Por qué existen las dos piezas.** El riesgo es de falla silenciosa, el mismo por el
que no se usan formularios de contacto: si al cliente se le vence la prueba, se le
desconecta el calendario o cierra la cuenta, **el botón de reservar sigue visible y no
reserva nada**, y no se entera ni él ni la persona que quiso sacar turno. No se
arregla con una regla de diseño. Se arregla probando antes de publicar y dejando por
escrito qué parte depende de él.

---

## 1. Checklist de prueba de punta a punta

Se corre **antes de publicar**, en el orden de abajo. Si algo falla, no se publica
hasta resolverlo.

### ☐ 1. La cuenta de agenda es del cliente, no tuya

Confirmá que el titular de la cuenta de Calendly / Google Calendar / la que sea es el
cliente: su mail, su contraseña. Vos la configuraste, no sos titular.

No es un detalle administrativo. Es lo que evita quedar atado a mantener cuentas
ajenas, y lo que hace que si un día deja de trabajar con vos, la agenda le siga
funcionando.

⚠ Si por apuro la abriste vos con tu mail "para después pasársela", **eso es lo
primero que hay que corregir**, antes de seguir con el resto de la prueba.

### ☐ 2. Reservá de verdad, como si fueras un paciente

Desde el sitio, no desde el panel de la agenda. Entrá como entraría cualquiera y sacá
un turno real.

Probá la forma que quedó elegida para ese cliente — embed inline o enlace, que se
decide caso por caso según si la reserva es la acción principal de esa página o es
secundaria.

### ☐ 3. El turno aparece en el calendario del cliente

Abrí el calendario del cliente y verificá que el turno está ahí, con la fecha y la
hora correctas. Que la reserva muestre una pantalla de confirmación no alcanza: lo que
se está probando es que llegue del otro lado.

### ☐ 4. Llega la notificación, si el plan la incluye

Si el plan tiene recordatorios o avisos automáticos, confirmá que llegan. **Si el plan
no los incluye, no hay nada que probar acá** — pero sí hay algo que anotar, y va en el
paso 5.

### ☐ 5. Anotá los límites del plan que usa ESE cliente

No los límites en general: los del plan concreto que quedó configurado. Tres datos
como mínimo:

| Qué anotar | Por qué importa |
|---|---|
| Tipos de evento | Calendly gratuito da **1**. Un nutricionista con "primera consulta" y "seguimiento" ya necesita dos: se pasó |
| Calendarios conectados | Calendly gratuito da **1** |
| Recordatorios automáticos | En los planes gratuitos **no hay**. Sin recordatorios, hay ausencias |

Google Calendar en cuentas personales y en Business Starter queda en **una sola página
de reserva y sin recordatorios automáticos por mail**.

El plan pago de Calendly está del orden de **USD 10-12 por usuario al mes** (valor de
agosto de 2026 — confirmá el precio vigente antes de decírselo). **Ese costo es del
cliente**, y según `CLAUDE.md` se le avisa **antes de cerrar el trato**, no cuando se
topa con el límite. Para cuando llega esta entrega, la conversación ya tiene que estar
hecha: lo de acá abajo es dejarla por escrito, no darle la noticia.

### ☐ 6. Cancelá el turno de prueba

Que no le quede un turno inventado en la agenda.

---

## 2. Lo que tiene que quedarle dicho por escrito

No es un mail armado: es el contenido que tiene que quedar registrado en algún lado
que el cliente pueda releer. `CLAUDE.md` no fija por qué canal, así que sirve
cualquiera que deje registro escrito.

**Son tres cosas y las tres tienen que estar:**

1. Que la cuenta de la agenda es suya.
2. Qué pasa si la desactiva o deja de pagarla — que el botón sigue visible, no reserva
   nada, y que el sitio no lo puede detectar.
3. Qué límites tiene su plan actual, en concreto.

### Texto modelo

Adaptalo a cada cliente; lo que está entre corchetes se completa con los datos del
paso 5. El registro es el del sitio: primera persona, profesional, sin tecnicismos.

> **La agenda es tuya.**
> La cuenta de [Calendly / Google Calendar] donde caen los turnos está a tu nombre,
> con tu mail y tu contraseña. Yo la configuré, pero el titular sos vos: no dependés
> de mí para usarla ni para cambiarla, y si algún día dejamos de trabajar juntos,
> sigue funcionando igual.
>
> **Si esa cuenta se desactiva, el botón deja de reservar y no se nota.**
> Si cerrás la cuenta, se te vence una prueba paga o se desconecta el calendario, el
> botón de reservar del sitio va a seguir viéndose exactamente igual que hoy, pero no
> va a reservar nada. El sitio no lo puede detectar ni avisarte: para él el botón
> sigue ahí. Vos no te enterás, y la persona que quiso sacar turno tampoco, porque ve
> la misma pantalla de siempre y se queda pensando que ya tiene la hora. Por eso te lo
> dejo por escrito: si vas a tocar algo de esa cuenta, avisame o probá el botón
> después.
>
> **Los límites del plan que estás usando hoy.**
> Estás en [plan]. Eso te da [N] tipo(s) de evento, [N] calendario(s) conectado(s) y
> [con / sin] recordatorios automáticos. En la práctica: [si más adelante querés
> separar "primera consulta" de "seguimiento", son dos tipos de evento y este plan da
> uno solo] y [sin recordatorios automáticos es esperable que haya más ausencias].
> Pasar al plan que los incluye cuesta alrededor de USD [10-12] por mes y lo pagás vos
> directo a [proveedor]: no es algo que yo cobre ni administre.

⚠ **El tercer punto no se escribe en genérico.** "Tu plan tiene algunos límites" no
sirve: la idea es que sepa exactamente cuál es el techo antes de chocarlo. Los números
salen del paso 5 de la prueba, del plan que quedó configurado para él.
