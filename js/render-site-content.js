/**
 * Loads data/site-content.json and renders Featured projects + Writing on the homepage.
 * Admin: edit JSON via /admin/, export, replace data/site-content.json, redeploy.
 */
(function () {
  "use strict";

  function escapeHtml(s) {
    if (s == null) return "";
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function renderProjectTile(p) {
    var featured = p.featured ? " project-tile-featured" : "";
    var badgeClass = p.badgeSoon ? " project-tile-badge-soon" : "";
    var mediaHref = escapeHtml(p.mediaHref);
    var caseHref = escapeHtml(p.caseHref || p.mediaHref);
    var title = escapeHtml(p.title);
    var tagline = escapeHtml(p.tagline);
    var metric = escapeHtml(p.metric);
    var badge = escapeHtml(p.badge);
    var tileClass = escapeHtml(p.tileClass || "project-tile-generic");

    var stackItems = (p.stack || [])
      .map(function (tech) {
        return "<li>" + escapeHtml(tech) + "</li>";
      })
      .join("");

    var actions = (p.actions || [])
      .map(function (a) {
        var rel = a.external ? ' target="_blank" rel="noopener noreferrer"' : "";
        return (
          '<a href="' +
          escapeHtml(a.href) +
          '"' +
          rel +
          ">" +
          escapeHtml(a.label) +
          "</a>"
        );
      })
      .join("");

    return (
      '<article class="project-tile ' +
      tileClass +
      featured +
      '">' +
      '<a href="' +
      mediaHref +
      '" class="project-tile-media" tabindex="-1" aria-hidden="true">' +
      '<div class="project-tile-image">' +
      "<picture>" +
      '<source type="image/webp" srcset="' +
      escapeHtml(p.imageWebp) +
      '">' +
      '<img src="' +
      escapeHtml(p.imageFallback) +
      '" alt="" width="' +
      Number(p.imageW || 200) +
      '" height="' +
      Number(p.imageH || 200) +
      '" loading="lazy" decoding="async">' +
      "</picture>" +
      "</div>" +
      "</a>" +
      '<div class="project-tile-content">' +
      '<span class="project-tile-badge' +
      badgeClass +
      '">' +
      badge +
      "</span>" +
      '<h3 class="project-tile-title"><a href="' +
      caseHref +
      '">' +
      title +
      "</a></h3>" +
      '<p class="project-tile-tagline">' +
      tagline +
      "</p>" +
      '<ul class="project-tile-stack" aria-label="Tech stack">' +
      stackItems +
      "</ul>" +
      '<p class="project-tile-metric">' +
      metric +
      "</p>" +
      '<div class="project-tile-actions">' +
      actions +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function moreAppsTile() {
    return (
      '<a href="more-apps.html" class="project-tile project-tile-more-apps project-tile-link" aria-label="More apps and ideas — view pipeline projects">' +
      '<div class="project-tile-image placeholder-tile" aria-hidden="true">' +
      '<svg class="placeholder-tile-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>' +
      '<span class="placeholder-tile-text">More ideas</span>' +
      "</div>" +
      '<div class="project-tile-content">' +
      '<span class="project-tile-badge project-tile-badge-soon">In the pipeline</span>' +
      "<h3>More apps &amp; ideas</h3>" +
      "<p>Tools, products and experiments I'm working on. Reach out if you'd like to hear more or collaborate.</p>" +
      "</div>" +
      "</a>"
    );
  }

  function renderWritingCard(w) {
    return (
      "<li>" +
      '<article class="writing-card">' +
      '<a href="' +
      escapeHtml(w.href) +
      '" class="writing-card-link">' +
      '<span class="writing-card-kicker">' +
      escapeHtml(w.kicker) +
      "</span>" +
      '<h3 class="writing-card-title">' +
      escapeHtml(w.title) +
      "</h3>" +
      '<p class="writing-card-excerpt">' +
      escapeHtml(w.excerpt) +
      "</p>" +
      '<span class="writing-card-meta">' +
      escapeHtml(w.meta) +
      "</span>" +
      "</a>" +
      "</article>" +
      "</li>"
    );
  }

  function mount(data) {
    var grid = document.getElementById("projects-grid-root");
    if (grid) {
      var projects = data.projects || [];
      if (projects.length) {
        // Static “best of” — recruiters should see top projects immediately.
        var featured = projects.filter(function (p) {
          return !!p.featured;
        });
        var rest = projects.filter(function (p) {
          return !p.featured;
        });
        var ordered = featured.concat(rest);
        var top = ordered.slice(0, 3);
        grid.innerHTML = top.map(renderProjectTile).join("") + moreAppsTile();
      } else {
        grid.innerHTML =
          '<p class="content-load-error" role="status">No projects to show yet.</p>';
      }
    }

    var writingUl = document.getElementById("writing-list-root");
    if (writingUl && data.writingHome && data.writingHome.length) {
      writingUl.innerHTML = data.writingHome.slice(0, 4).map(renderWritingCard).join("");
    }
  }

  var url = "data/site-content.json";
  fetch(url)
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(mount)
    .catch(function () {
      var grid = document.getElementById("projects-grid-root");
      if (grid && !grid.querySelector(".project-tile")) {
        grid.innerHTML =
          '<p class="content-load-error" role="alert">Could not load site content. Serve the site over HTTP (e.g. <code>npm run dev</code>) and ensure <code>data/site-content.json</code> exists.</p>';
      }
    });
})();
