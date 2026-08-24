/* =====================================================
   JS — idioma, menú móvil, scroll reveal
===================================================== */
(function(){
  "use strict";

  /* ---------- 1. Selector de idioma ES/EN ---------- */
  var translatable = document.querySelectorAll('[data-es]');
  var langBtns = document.querySelectorAll('[data-lang-btn]');

  function applyLang(lang){
    translatable.forEach(function(el){
      var txt = el.getAttribute('data-' + lang);
      if(txt !== null){ el.innerHTML = txt; }
    });
    langBtns.forEach(function(b){
      b.classList.toggle('active', b.getAttribute('data-lang-btn') === lang);
    });
    document.documentElement.lang = lang;
  }

  langBtns.forEach(function(btn){
    btn.addEventListener('click', function(){
      applyLang(btn.getAttribute('data-lang-btn'));
    });
  });

  /* ---------- 2. Menú móvil ---------- */
  var burger = document.getElementById('burgerBtn');
  var mobileMenu = document.getElementById('mobileMenu');
  burger.addEventListener('click', function(){
    var isOpen = mobileMenu.classList.toggle('open');
    burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });
  mobileMenu.querySelectorAll('a').forEach(function(link){
    link.addEventListener('click', function(){
      mobileMenu.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ---------- 3. Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    var io = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if(entry.isIntersecting){
          entry.target.classList.add('in-view');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function(el){ io.observe(el); });
  } else {
    revealEls.forEach(function(el){ el.classList.add('in-view'); });
  }

  /* ---------- 4. Copiar correo ---------- */
  var copyBtn = document.getElementById('copyEmailBtn');
  var copyMsg = document.getElementById('copyMsg');
  var email = 'MaximilianoCaceres.py@gmail.com';
  copyBtn.addEventListener('click', function(){
    var lang = document.documentElement.lang || 'es';
    function showMsg(){
      copyMsg.textContent = lang === 'en' ? 'Email copied ✓' : 'Correo copiado ✓';
      setTimeout(function(){ copyMsg.textContent = ''; }, 2200);
    }
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(email).then(showMsg).catch(function(){
        window.location.href = 'mailto:' + email;
      });
    } else {
      window.location.href = 'mailto:' + email;
    }
  });

  /* ---------- 5. Año dinámico en footer ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();

})();
