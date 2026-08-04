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

---

## Dónde se edita cada cosa

| Qué querés cambiar | Dónde |
|---|---|
| Textos y preguntas frecuentes | `index.html` |
| Precio | `index.html`, pero son **3 lugares** — ver abajo |
| Colores, tamaños, espaciados | `css/styles.css` — las variables están todas arriba de todo en `:root` |
| Número de WhatsApp | `index.html`, buscar `wa.me/` — aparece **4 veces** (hero, la tarjeta de precio, contacto y el CTA flotante) |
| Mail de contacto | `index.html`, buscar `mailto:` |
| Imagen que se ve al compartir el link | `tools/og-image.html` — ver abajo |

### Cambiar un precio

El precio es de introducción y va a subir, así que esto lo vas a hacer. Aparece en
**cuatro lugares** y hay que tocarlos todos.

En `index.html`, tres:

1. La tarjeta de precio (`card__price`).
2. `"priceRange"` en el bloque JSON-LD de arriba de todo.
3. `"price"` del `Offer`, en ese mismo bloque.

El 2 y el 3 son los datos que lee Google. Si quedan viejos, el sitio se contradice a
sí mismo: una cosa en la página, otra en el resultado de búsqueda.

En `CLAUDE.md`, uno:

4. El bullet del paquete en la lista de arriba.

Ese no lo ve nadie que entre al sitio, pero es la fuente de verdad que lee Claude.
Si queda viejo, el precio viejo vuelve solo la próxima vez que le pidas un cambio.

`README.md` no lleva precios: este instructivo es todo lo que hay acá.

⚠ **Buscar `USD 90` no encuentra la tarjeta.** En el HTML la moneda va en su propio
elemento —`<span class="card__cur">USD</span>90`— así que entre `USD` y el número
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

**Si cambiás el diseño, cambiale el nombre al archivo** (`og-image-v3.png`, etc.) y
actualizá la meta `og:image` de `index.html`. WhatsApp y Facebook cachean la imagen por
mucho tiempo: si pisás el mismo nombre, siguen mostrando la vieja durante días.

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

## Cuando haya trabajos para mostrar

Dentro de `index.html`, buscando `PORTFOLIO`, hay una sección entera comentada con el HTML
y el CSS ya resueltos. Hay que descomentarla, poner las capturas en `assets/trabajos/` y
completar los textos. Es el único lugar de la web donde se nombra un rubro concreto.

Las capturas conviene guardarlas en `.webp` y a un ancho de 800px como máximo, para que
el sitio siga cargando rápido.

> Ojo al descomentar: ese bloque todavía trae un `<p class="eyebrow">Trabajos</p>`, y la
> clase `.eyebrow` ya no existe en el CSS (se sacaron las etiquetas de sección porque
> repetían el título de abajo). Hay que borrar esa línea, el `<h2>` alcanza.

---

## Decisiones que conviene no romper

- **Cero dependencias externas.** Nada de Google Fonts por CDN, nada de librerías. Las
  fuentes están self-hosted en `assets/fonts/`. Es lo que mantiene la carga rápida.
- **La página funciona sin JavaScript.** `js/main.js` solo agrega animaciones y el CTA
  flotante de WhatsApp. Si no carga, el sitio se ve completo igual.
- **Un solo CTA por pantalla.** El header no lleva botón de WhatsApp a propósito: ya está
  el del hero y el flotante, y un tercero no agregaba nada. Si se saca el flotante, el
  tramo entre el hero y contacto se queda sin ningún contacto a la vista.
- **Un solo color de acento.** El ámbar `#FFB454`. Incluso los botones de WhatsApp van en
  ámbar y no en verde: sumar un segundo color rompe el sistema.
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
  distintos: GitHub puede cambiar sus condiciones y esa cuenta la terminaría pagando el
  cliente, y una promesa abierta te deja de proveedor de hosting permanente de cada sitio
  que entregaste. Misma lógica para cualquier servicio de terceros que entres a usar.
- **La barra fija de WhatsApp solo aparece si no hay otro CTA en pantalla.** `js/main.js`
  vigila cuatro anclas: el botón del hero, el de la tarjeta de precio (`#paqueteCta`),
  el de contacto (`#contactoCta`) y el footer. **Si se agrega otro CTA importante al
  cuerpo, hay que sumarlo a esa lista**, si no la barra flotante aparece pegada arriba
  del botón nuevo y quedan los dos juntos. Ya pasó tres veces —con el header, con el
  hero y con la tarjeta de precio— y el síntoma siempre es el mismo, así que si ves dos
  botones de WhatsApp juntos, lo que falta es un ancla.
