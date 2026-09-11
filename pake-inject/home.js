// Barra flotante de navegacion para apps Pake: atras, adelante, inicio, recargar.
// Inyectado via --inject.
(function () {
  var ID = "pake-nav-bar";

  function makeNav() {
    if (document.getElementById(ID)) return;
    if (!document.body && !document.documentElement) return;

    var bar = document.createElement("div");
    bar.id = ID;
    bar.style.cssText =
      "position:fixed;right:14px;bottom:14px;z-index:2147483647;" +
      "display:flex;gap:6px;opacity:0.72;transition:opacity .2s";
    bar.addEventListener("mouseenter", function () {
      bar.style.opacity = "1";
    });
    bar.addEventListener("mouseleave", function () {
      bar.style.opacity = "0.72";
    });

    function mkBtn(label, title, fn) {
      var b = document.createElement("div");
      b.textContent = label;
      b.title = title;
      b.style.cssText =
        "width:38px;height:38px;border-radius:50%;" +
        "background:rgba(30,30,30,0.80);color:#fff;" +
        "font:18px/38px sans-serif;text-align:center;cursor:pointer;" +
        "box-shadow:0 2px 10px rgba(0,0,0,0.4);user-select:none";
      b.addEventListener("click", fn);
      return b;
    }

    bar.appendChild(
      mkBtn("\u2190", "Atras", function () {
        history.back();
      }),
    );
    bar.appendChild(
      mkBtn("\u2192", "Adelante", function () {
        history.forward();
      }),
    );
    bar.appendChild(
      mkBtn("\u2302", "Ir al inicio", function () {
        try {
          location.href = location.origin;
        } catch (e) {
          location.reload();
        }
      }),
    );
    bar.appendChild(
      mkBtn("\u21bb", "Recargar", function () {
        location.reload();
      }),
    );

    (document.body || document.documentElement).appendChild(bar);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", makeNav);
  } else {
    makeNav();
  }
})();
