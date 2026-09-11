// Boton flotante "Ir al inicio" para apps Pake.
// Inyectado via --inject. Navega al origin del sitio.
(function () {
  var ID = "pake-home-fab";

  function makeHome() {
    if (document.getElementById(ID)) return;
    if (!document.body && !document.documentElement) return;

    var b = document.createElement("div");
    b.id = ID;
    b.textContent = "\u2302"; // ⌂
    b.title = "Ir al inicio (Alt+Inicio)";
    b.style.cssText =
      "position:fixed;right:14px;bottom:14px;z-index:2147483647;" +
      "width:42px;height:42px;border-radius:50%;" +
      "background:rgba(30,30,30,0.78);color:#fff;" +
      "font:20px/42px sans-serif;text-align:center;cursor:pointer;" +
      "box-shadow:0 2px 10px rgba(0,0,0,0.4);user-select:none;" +
      "transition:opacity .2s;opacity:0.75";
    b.addEventListener("mouseenter", function () { b.style.opacity = "1"; });
    b.addEventListener("mouseleave", function () { b.style.opacity = "0.75"; });
    b.addEventListener("click", function () {
      try { window.location.href = window.location.origin; }
      catch (e) { window.location.reload(); }
    });

    (document.body || document.documentElement).appendChild(b);
  }

  function bindKey() {
    document.addEventListener("keydown", function (e) {
      // Alt + Home  ->  ir al inicio
      if (e.altKey && e.key === "Home") {
        e.preventDefault();
        try { window.location.href = window.location.origin; }
        catch (err) { window.location.reload(); }
      }
    }, true);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () { makeHome(); bindKey(); });
  } else {
    makeHome();
    bindKey();
  }
})();
