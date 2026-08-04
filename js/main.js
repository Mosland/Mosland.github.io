/* ══════════════════════════════════════════════════════════════════════════
   Joaquín Moas — JS de la landing

   Todo lo de acá es mejora progresiva: si este archivo no carga o falla, la
   página se ve y funciona igual. No hay contenido que dependa de JavaScript.
   El acordeón de preguntas usa <details> nativo y no toca este archivo.
   ══════════════════════════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ── Año del footer ───────────────────────────────────────────────────── */
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  /* ── Borde del header al hacer scroll ─────────────────────────────────── */
  var header = document.getElementById('header');
  if (header) {
    var ticking = false;
    var onScroll = function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        header.classList.toggle('is-stuck', window.scrollY > 8);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* A partir de acá todo necesita IntersectionObserver. Si no está, salimos:
     el contenido ya es visible porque el <head> no agregó la clase .js. */
  if (!('IntersectionObserver' in window)) return;

  /* ── Revelado al entrar en pantalla ───────────────────────────────────── */
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var reveals = document.querySelectorAll('.reveal');

  if (reduced) {
    // Nada de animación: se muestran todos de una.
    for (var i = 0; i < reveals.length; i++) reveals[i].classList.add('is-visible');
  } else {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);   // una sola vez por elemento
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });

    for (var j = 0; j < reveals.length; j++) revealObserver.observe(reveals[j]);
  }

  /* ── CTA de WhatsApp flotante ─────────────────────────────────────────────
     Rellena los huecos: solo se muestra cuando la página no tiene ningún CTA
     propio a la vista. Corre en todos los anchos —antes se apagaba en desktop
     porque el header tenía su propio botón, y ese botón ya no está.
     Se vigilan tres anclas.

       .hero__actions  el botón del hero, para no tapar la primera pantalla.
       #contactoCta    el botón de la sección de contacto. Se vigila el botón y
                       no la sección entera: la sección arranca con bastante
                       padding, y esconder la barra ahí dejaría un tramo con el
                       botón todavía fuera de pantalla y sin ningún CTA visible.
       .site-footer    en pantallas bajas el botón de contacto puede salir por
                       arriba antes de que termine el documento, y la barra
                       volvería a asomar justo después de haberse ido.
     ─────────────────────────────────────────────────────────────────────── */
  var floatingCta = document.getElementById('floatingCta');
  var anchors = [];

  var heroActions = document.querySelector('.hero__actions');
  var contactoCta = document.getElementById('contactoCta');
  var footer = document.querySelector('.site-footer');

  if (heroActions) anchors.push(heroActions);
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
