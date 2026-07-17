// Navegação de slides: setas, espaço, clique nas bordas, hash, fullscreen, índice.
(function () {
  var slides = Array.prototype.slice.call(document.querySelectorAll(".slide"));
  var bar = document.querySelector(".deck-bar > i");
  var hud = document.querySelector(".deck-hud");
  var i = 0;

  function show(n) {
    i = Math.max(0, Math.min(slides.length - 1, n));
    slides.forEach(function (s, k) { s.classList.toggle("active", k === i); });
    if (bar) bar.style.width = ((i + 1) / slides.length * 100) + "%";
    if (hud) hud.textContent = (i + 1) + " / " + slides.length;
    if (history.replaceState) history.replaceState(null, "", "#" + (i + 1));
    var a = slides[i]; if (a) a.scrollTop = 0;
    var logo = document.querySelector(".deck-mark");
    if (logo && a) logo.style.opacity = a.classList.contains("cover") ? "0" : (logo.classList.contains("deck-mark-logo") ? ".85" : ".6");
  }

  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight" || e.key === "PageDown" || e.key === " ") { show(i + 1); e.preventDefault(); }
    else if (e.key === "ArrowLeft" || e.key === "PageUp") { show(i - 1); e.preventDefault(); }
    else if (e.key === "Home") show(0);
    else if (e.key === "End") show(slides.length - 1);
    else if (e.key === "f" || e.key === "F") {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen && document.documentElement.requestFullscreen();
      else document.exitFullscreen && document.exitFullscreen();
    }
  });

  // clique: metade direita avança, esquerda volta (ignora links/botões)
  document.querySelector(".deck").addEventListener("click", function (e) {
    if (e.target.closest("a, button, .dm-fold, summary, code, pre")) return;
    show(e.clientX > window.innerWidth / 2 ? i + 1 : i - 1);
  });

  var start = parseInt((location.hash || "").replace("#", ""), 10);
  show(isNaN(start) ? 0 : start - 1);
})();
