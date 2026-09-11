// Barra flotante de navegacion para apps Pake.
// - Botones: atras, adelante, inicio, recargar
// - Se oculta sola cuando no mueves el mouse
// - Se puede arrastrar (agarra el asa de la izquierda)
(function () {
  var ID = "pake-nav-bar";
  var POS_KEY = "pake_nav_pos_v1";

  function makeNav() {
    if (document.getElementById(ID)) return;
    if (!document.body && !document.documentElement) return;

    var bar = document.createElement("div");
    bar.id = ID;
    bar.style.cssText =
      "position:fixed;z-index:2147483647;display:flex;gap:6px;align-items:center;" +
      "padding:4px 6px;border-radius:24px;background:rgba(20,20,20,0.55);" +
      "opacity:0;transition:opacity .3s ease;";

    // restaurar posicion guardada
    var saved = null;
    try { saved = JSON.parse(localStorage.getItem(POS_KEY)); } catch (e) {}
    if (saved && typeof saved.left === "number" && typeof saved.top === "number") {
      bar.style.left = saved.left + "px";
      bar.style.top = saved.top + "px";
    } else {
      bar.style.right = "14px";
      bar.style.bottom = "14px";
    }

    // asa de arrastre
    var handle = document.createElement("div");
    handle.textContent = "\u22ee\u22ee"; // ⋮⋮
    handle.title = "Arrastrar";
    handle.style.cssText =
      "cursor:move;color:#c9c9c9;font:16px/36px sans-serif;padding:0 2px;user-select:none";
    bar.appendChild(handle);

    function mkBtn(label, title, fn) {
      var b = document.createElement("div");
      b.textContent = label;
      b.title = title;
      b.style.cssText =
        "width:36px;height:36px;border-radius:50%;background:rgba(45,45,45,0.95);" +
        "color:#fff;font:17px/36px sans-serif;text-align:center;cursor:pointer;user-select:none";
      b.addEventListener("click", fn);
      return b;
    }
    bar.appendChild(mkBtn("\u2190", "Atras", function () { history.back(); }));
    bar.appendChild(mkBtn("\u2192", "Adelante", function () { history.forward(); }));
    bar.appendChild(mkBtn("\u2302", "Ir al inicio", function () {
      try { location.href = location.origin; } catch (e) { location.reload(); }
    }));
    bar.appendChild(mkBtn("\u21bb", "Recargar", function () { location.reload(); }));

    (document.body || document.documentElement).appendChild(bar);

    // ---- auto ocultar / mostrar con el mouse ----
    var hideTimer = null;
    function show() { bar.style.opacity = "0.92"; }
    function scheduleHide() {
      clearTimeout(hideTimer);
      hideTimer = setTimeout(function () {
        if (!bar.matches(":hover")) bar.style.opacity = "0";
      }, 2500);
    }
    document.addEventListener("mousemove", function () { show(); scheduleHide(); }, true);
    bar.addEventListener("mouseenter", function () { show(); clearTimeout(hideTimer); });
    bar.addEventListener("mouseleave", scheduleHide);
    scheduleHide();

    // ---- arrastrar ----
    var dragging = false, sx = 0, sy = 0, sl = 0, st = 0;
    handle.addEventListener("mousedown", function (e) {
      dragging = true;
      var r = bar.getBoundingClientRect();
      sx = e.clientX; sy = e.clientY; sl = r.left; st = r.top;
      bar.style.right = "auto"; bar.style.bottom = "auto";
      bar.style.left = r.left + "px"; bar.style.top = r.top + "px";
      e.preventDefault();
    });
    document.addEventListener("mousemove", function (e) {
      if (!dragging) return;
      var nl = Math.max(0, Math.min(window.innerWidth - 40, sl + (e.clientX - sx)));
      var nt = Math.max(0, Math.min(window.innerHeight - 40, st + (e.clientY - sy)));
      bar.style.left = nl + "px";
      bar.style.top = nt + "px";
    });
    document.addEventListener("mouseup", function () {
      if (!dragging) return;
      dragging = false;
      try {
        localStorage.setItem(POS_KEY, JSON.stringify({
          left: parseInt(bar.style.left, 10),
          top: parseInt(bar.style.top, 10)
        }));
      } catch (e) {}
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", makeNav);
  } else {
    makeNav();
  }
})();
