/* ══════════════════════════════════════════════════════════════════════════
   Joaquín Moas — JS de la landing

   Todo lo de acá es mejora progresiva: si este archivo no carga o falla, la
   página se ve y funciona igual. No hay contenido que dependa de JavaScript.
   El acordeón de preguntas usa <details> nativo y no toca este archivo.

   Antes había dos cosas más y las dos se fueron con el rediseño:
     · el borde del header al hacer scroll, que dejó de existir cuando el header
       dejó de ser fijo;
     · el revelado al entrar en pantalla, que aplicaba el mismo desplazamiento y
       la misma duración a cada bloque de la página.
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Año del footer ───────────────────────────────────────────────────── */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* Lo que queda necesita IntersectionObserver. Si no está, salimos: la barra
     flotante simplemente no aparece y la página sigue teniendo el botón del
     hero, el del paquete y el de contacto. */
  if (!('IntersectionObserver' in window)) return;

  /* ── CTA de WhatsApp flotante ─────────────────────────────────────────────
     Rellena los huecos: solo se muestra cuando la página no tiene ningún CTA
     propio a la vista. Corre en todos los anchos, y desde que el header no está
     fijo es el único contacto permanente que hay.
     Se vigilan cuatro anclas.

       .hero__actions  el botón del hero, para no tapar la primera pantalla.
       #paqueteCta     el botón del presupuesto. Mismo criterio que el de
                       contacto: se vigila el botón y no la sección, que arranca
                       con el título, la bajada y la nota de precio introductorio
                       antes de llegar al presupuesto. Sin esta ancla la barra
                       quedaba pegada justo arriba del botón, duplicándolo.
       #contactoCta    el botón de la sección de contacto. Se vigila el botón y
                       no la sección entera: la sección arranca con bastante
                       aire, y esconder la barra ahí dejaría un tramo con el
                       botón todavía fuera de pantalla y sin ningún CTA visible.
       .site-footer    en pantallas bajas el botón de contacto puede salir por
                       arriba antes de que termine el documento, y la barra
                       volvería a asomar justo después de haberse ido.

     Si se agrega otro CTA importante al cuerpo, va también acá. El síntoma de
     que falta uno es siempre el mismo: la barra flotante pegada a un botón que
     ya se ve.
     ─────────────────────────────────────────────────────────────────────── */
  var floatingCta = document.getElementById('floatingCta');
  var anchors = [];

  var heroActions = document.querySelector('.hero__actions');
  var paqueteCta = document.getElementById('paqueteCta');
  var contactoCta = document.getElementById('contactoCta');
  var footer = document.querySelector('.site-footer');

  if (heroActions) anchors.push(heroActions);
  if (paqueteCta) anchors.push(paqueteCta);
  if (contactoCta) anchors.push(contactoCta);
  if (footer) anchors.push(footer);

  if (floatingCta && anchors.length) {
    floatingCta.hidden = false;   // el CSS lo mantiene fuera de pantalla hasta .is-visible

    var onScreen = [];          // en pantalla o no, una posición por ancla

    var ctaObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        var i = anchors.indexOf(entry.target);
        if (i > -1) onScreen[i] = entry.isIntersecting;
      });

      var alguno = false;
      for (var k = 0; k < anchors.length; k++) if (onScreen[k]) alguno = true;

      floatingCta.classList.toggle('is-visible', !alguno);
    }, { threshold: 0 });

    for (var n = 0; n < anchors.length; n++) ctaObserver.observe(anchors[n]);
  }
})();
