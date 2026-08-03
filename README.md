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
| Textos, precios, preguntas frecuentes | `index.html` |
| Colores, tamaños, espaciados | `css/styles.css` — las variables están todas arriba de todo en `:root` |
| Número de WhatsApp | `index.html`, buscar `wa.me/` — aparece **6 veces** (header, hero, las dos tarjetas de precio, contacto y la barra fija de móvil) |
| Mail de contacto | `index.html`, buscar `mailto:` |
| Imagen que se ve al compartir el link | `assets/og-image.png` (1200×630) |

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

---

## Decisiones que conviene no romper

- **Cero dependencias externas.** Nada de Google Fonts por CDN, nada de librerías. Las
  fuentes están self-hosted en `assets/fonts/`. Es lo que mantiene la carga rápida.
- **La página funciona sin JavaScript.** `js/main.js` solo agrega animaciones y la barra
  de WhatsApp de abajo. Si no carga, el sitio se ve completo igual.
- **Un solo color de acento.** El ámbar `#FFB454`. Incluso los botones de WhatsApp van en
  ámbar y no en verde: sumar un segundo color rompe el sistema.
- **Sin formulario de contacto.** Un formulario en un sitio estático necesita un servicio
  externo que puede fallar en silencio y hacerte perder consultas sin que te enteres.
- **Los precios se anuncian como "de introducción", nunca como oferta ni promoción.**
  Está así a propósito. Anunciar la suba desde ahora permite subirlos después sin quedar
  mal con nadie, y el vocabulario de descuento ("oferta", "promoción", "rebaja") haría que
  el cliente asocie el trabajo con lo barato y se resista al precio pleno más adelante.
  La palabra aparece en tres lugares que tienen que decir lo mismo: la etiqueta de la
  sección de paquetes, la pregunta frecuente sobre precios y la sección "Sobre mí".
- **Las preguntas frecuentes están duplicadas en el `<head>`.** Hay un bloque `FAQPage` en
  JSON-LD para que Google las muestre en el resultado de búsqueda. Si editás una pregunta
  o una respuesta, hay que tocarla en los dos lugares o el dato queda mintiendo.
- **La barra fija de WhatsApp solo aparece si no hay otro CTA en pantalla.** `js/main.js`
  vigila el botón del hero, el de contacto y el footer. Si se agrega otro CTA importante,
  conviene sumarlo a esa lista para que la barra no quede duplicando un botón que ya se ve.
