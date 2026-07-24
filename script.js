(function(){
  "use strict";

  // Año en el footer
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Menú móvil
  var toggle = document.getElementById("navToggle");
  var links = document.getElementById("navLinks");
  if (toggle && links){
    toggle.addEventListener("click", function(){
      var open = links.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function(a){
      a.addEventListener("click", function(){
        links.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Línea de "boot" — pequeño efecto de estado del sistema al cargar.
  // Respeta prefers-reduced-motion: si el usuario lo prefiere, muestra el
  // mensaje final directamente sin la secuencia.
  var bootEl = document.getElementById("bootLine");
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var steps = [
    { ok: true,  text: "cargando portfolio..." },
    { ok: true,  text: "perfil.md — encontrado" },
    { ok: false, text: "proyectos/ — vacío, en construcción" },
    { ok: true,  text: "listo. bienvenido/a." }
  ];

  function renderStep(i){
    if (!bootEl) return;
    var s = steps[i];
    var tag = s.ok
      ? '<span class="ok">[OK]</span>'
      : '<span style="color:var(--amber)">[PENDING]</span>';
    bootEl.innerHTML = tag + ' <span>' + s.text + '</span>';
  }

  if (reduceMotion || steps.length === 0){
    renderStep(steps.length - 1);
  } else {
    var i = 0;
    renderStep(0);
    var interval = setInterval(function(){
      i++;
      if (i >= steps.length){
        clearInterval(interval);
        return;
      }
      renderStep(i);
    }, 650);
  }
})();
