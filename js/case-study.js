(function () {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  var nodes = document.querySelectorAll(".essay-page .fade-in");
  if (!nodes.length) return;

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.15 }
  );

  nodes.forEach(function (el) {
    observer.observe(el);
  });
})();
