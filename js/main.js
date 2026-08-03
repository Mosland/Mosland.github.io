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

  /* ── Barra de WhatsApp fija en móvil ──────────────────────────────────────
     Aparece cuando el botón del hero deja de verse, así el CTA siempre está
     a un toque de distancia sin tapar la primera pantalla.
     ─────────────────────────────────────────────────────────────────────── */
  var mobileCta = document.getElementById('mobileCta');
  var heroActions = document.querySelector('.hero__actions');

  if (mobileCta && heroActions) {
    mobileCta.hidden = false;   // el CSS lo mantiene fuera de pantalla hasta .is-visible

    new IntersectionObserver(function (entries) {
      mobileCta.classList.toggle('is-visible', !entries[0].isIntersecting);
    }, { threshold: 0 }).observe(heroActions);
  }
})();
