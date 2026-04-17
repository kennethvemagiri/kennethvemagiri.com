/**
 * Local admin for portfolio content. Change ADMIN_SECRET before publishing.
 * Run: npm run dev → open /admin/
 */
(function () {
  "use strict";

  var ADMIN_SECRET = "thisisme";
  var STORAGE_OK = "kv_admin_ok";

  var state = { version: 1, projects: [], writingHome: [] };

  function storageGet(key) {
    try {
      return window.sessionStorage.getItem(key);
    } catch (err) {
      return null;
    }
  }

  function storageSet(key, value) {
    try {
      window.sessionStorage.setItem(key, value);
    } catch (err) {
      /* private mode or blocked storage — unlock still works this session */
    }
  }

  function storageRemove(key) {
    try {
      window.sessionStorage.removeItem(key);
    } catch (err) {
      /* ignore */
    }
  }

  /** Resolves correctly for /admin, /admin/, and subpaths (unlike a static "../" string). */
  function getDataUrl() {
    try {
      return new URL("../data/site-content.json", window.location.href).href;
    } catch (err) {
      return "../data/site-content.json";
    }
  }

  function escAttr(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;")
      .replace(/"/g, "&quot;")
      .replace(/</g, "&lt;");
  }

  function escTextarea(s) {
    return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
  }

  function emptyProject() {
    return {
      tileClass: "project-tile-custom",
      featured: false,
      mediaHref: "featured-projects/MyProject/",
      imageWebp: "",
      imageFallback: "",
      imageW: 200,
      imageH: 200,
      badge: "",
      badgeSoon: false,
      title: "New project",
      caseHref: "featured-projects/MyProject/",
      tagline: "",
      stack: [],
      metric: "",
      actions: [
        { label: "Case study", href: "featured-projects/MyProject/", external: false }
      ]
    };
  }

  function emptyWriting() {
    return {
      href: "blog/my-post.html",
      kicker: "Topic",
      title: "Post title",
      excerpt: "Short excerpt for the homepage card.",
      meta: "~5 min read"
    };
  }

  function renderActionRows(actions) {
    return (actions || [])
      .map(function (a, j) {
        return (
          '<div class="admin-action-block" data-action-i="' +
          j +
          '">' +
          '<div class="admin-row"><label>Action label<input type="text" class="a-label" value="' +
          escAttr(a.label) +
          '"></label></div>' +
          '<div class="admin-row"><label>URL<input type="text" class="a-href" value="' +
          escAttr(a.href) +
          '"></label></div>' +
          '<div class="admin-row-inline"><label><input type="checkbox" class="a-ext"' +
          (a.external ? " checked" : "") +
          '> Opens in new tab</label>' +
          '<button type="button" class="admin-remove-action danger">Remove action</button></div></div>'
        );
      })
      .join("");
  }

  function renderProjectCard(p, idx) {
    return (
      '<details class="admin-item admin-project-card" data-i="' +
      idx +
      '" open>' +
      '<summary class="admin-item-summary">' +
      '<span class="admin-item-title">' +
      escAttr(p.title || "Untitled project") +
      "</span>" +
      '<span class="admin-item-sub">' +
      escAttr(p.badge || "") +
      "</span>" +
      '<span class="admin-item-actions">' +
      '<button type="button" class="admin-move-up" aria-label="Move project up">↑</button>' +
      '<button type="button" class="admin-move-down" aria-label="Move project down">↓</button>' +
      '<button type="button" class="admin-remove danger" aria-label="Remove project">Remove</button>' +
      "</span>" +
      "</summary>" +
      '<div class="admin-card admin-item-body">' +
      '<div class="admin-row"><label>Title<input type="text" class="f-title" value="' +
      escAttr(p.title) +
      '"></label></div>' +
      '<div class="admin-row"><label>Tile CSS class (e.g. project-tile-mwf)<input type="text" class="f-tileClass" value="' +
      escAttr(p.tileClass) +
      '"></label></div>' +
      '<div class="admin-row admin-row-inline"><label><input type="checkbox" class="f-featured"' +
      (p.featured ? " checked" : "") +
      '> Highlight tile (featured)</label>' +
      '<label><input type="checkbox" class="f-badgeSoon"' +
      (p.badgeSoon ? " checked" : "") +
      '> Badge “soon” style</label></div>' +
      '<div class="admin-row"><label>Badge text<input type="text" class="f-badge" value="' +
      escAttr(p.badge) +
      '"></label></div>' +
      '<div class="admin-row"><label>Tagline / description<textarea class="f-tagline">' +
      escTextarea(p.tagline) +
      "</textarea></label></div>" +
      '<div class="admin-row"><label>Metric line<textarea class="f-metric">' +
      escTextarea(p.metric) +
      "</textarea></label></div>" +
      '<div class="admin-row"><label>Media & case study base URL<input type="text" class="f-mediaHref" value="' +
      escAttr(p.mediaHref) +
      '"></label></div>' +
      '<div class="admin-row"><label>Case / title link (if different)<input type="text" class="f-caseHref" value="' +
      escAttr(p.caseHref || p.mediaHref) +
      '"></label></div>' +
      '<div class="admin-row"><label>Image WebP path<input type="text" class="f-imageWebp" value="' +
      escAttr(p.imageWebp) +
      '"></label></div>' +
      '<div class="admin-row"><label>Image PNG path<input type="text" class="f-imageFallback" value="' +
      escAttr(p.imageFallback) +
      '"></label></div>' +
      '<div class="admin-row admin-row-inline"><label>W<input type="number" class="f-imageW" value="' +
      Number(p.imageW || 200) +
      '"></label>' +
      '<label>H<input type="number" class="f-imageH" value="' +
      Number(p.imageH || 200) +
      '"></label></div>' +
      '<div class="admin-row"><label>Stack (comma-separated)<input type="text" class="f-stack" value="' +
      escAttr((p.stack || []).join(", ")) +
      '"></label></div>' +
      '<div class="admin-actions-wrap"><strong>Links</strong>' +
      renderActionRows(p.actions) +
      '<button type="button" class="admin-add-action">+ Add action</button></div>' +
      "</div>" +
      "</details>"
    );
  }

  function renderWritingCard(w, idx) {
    return (
      '<details class="admin-item admin-writing-card" data-wi="' +
      idx +
      '" open>' +
      '<summary class="admin-item-summary">' +
      '<span class="admin-item-title">' +
      escAttr(w.title || "Untitled writing") +
      "</span>" +
      '<span class="admin-item-sub">' +
      escAttr(w.meta || "") +
      "</span>" +
      '<span class="admin-item-actions">' +
      '<button type="button" class="w-move-up" aria-label="Move writing up">↑</button>' +
      '<button type="button" class="w-move-down" aria-label="Move writing down">↓</button>' +
      '<button type="button" class="w-remove danger" aria-label="Remove writing">Remove</button>' +
      "</span>" +
      "</summary>" +
      '<div class="admin-card admin-item-body">' +
      '<div class="admin-row"><label>Post URL (from site root)<input type="text" class="w-href" value="' +
      escAttr(w.href) +
      '"></label></div>' +
      '<div class="admin-row"><label>Kicker<input type="text" class="w-kicker" value="' +
      escAttr(w.kicker) +
      '"></label></div>' +
      '<div class="admin-row"><label>Title<input type="text" class="w-title" value="' +
      escAttr(w.title) +
      '"></label></div>' +
      '<div class="admin-row"><label>Excerpt<textarea class="w-excerpt">' +
      escTextarea(w.excerpt) +
      "</textarea></label></div>" +
      '<div class="admin-row"><label>Meta line<input type="text" class="w-meta" value="' +
      escAttr(w.meta) +
      '"></label></div>' +
      "</div>" +
      "</details>"
    );
  }

  function renderAll() {
    var pf = document.getElementById("projects-form");
    var wf = document.getElementById("writing-form");
    pf.innerHTML = state.projects.map(renderProjectCard).join("");
    wf.innerHTML = state.writingHome.map(renderWritingCard).join("");
    bindCards();
  }

  function readActions(fs) {
    var blocks = fs.querySelectorAll(".admin-action-block");
    var out = [];
    blocks.forEach(function (b) {
      var lab = b.querySelector(".a-label");
      var href = b.querySelector(".a-href");
      var ext = b.querySelector(".a-ext");
      if (!lab || !href) return;
      out.push({
        label: lab.value.trim(),
        href: href.value.trim(),
        external: !!(ext && ext.checked)
      });
    });
    return out.length ? out : [{ label: "Link", href: "#", external: false }];
  }

  function readStateFromDom() {
    var projects = [];
    document.querySelectorAll(".admin-project-card").forEach(function (fs) {
      projects.push({
        tileClass: fs.querySelector(".f-tileClass").value.trim() || "project-tile-custom",
        featured: fs.querySelector(".f-featured").checked,
        mediaHref: fs.querySelector(".f-mediaHref").value.trim(),
        imageWebp: fs.querySelector(".f-imageWebp").value.trim(),
        imageFallback: fs.querySelector(".f-imageFallback").value.trim(),
        imageW: Number(fs.querySelector(".f-imageW").value) || 200,
        imageH: Number(fs.querySelector(".f-imageH").value) || 200,
        badge: fs.querySelector(".f-badge").value.trim(),
        badgeSoon: fs.querySelector(".f-badgeSoon").checked,
        title: fs.querySelector(".f-title").value.trim(),
        caseHref: fs.querySelector(".f-caseHref").value.trim() || fs.querySelector(".f-mediaHref").value.trim(),
        tagline: fs.querySelector(".f-tagline").value.trim(),
        stack: fs
          .querySelector(".f-stack")
          .value.split(",")
          .map(function (s) {
            return s.trim();
          })
          .filter(Boolean),
        metric: fs.querySelector(".f-metric").value.trim(),
        actions: readActions(fs)
      });
    });

    var writingHome = [];
    document.querySelectorAll(".admin-writing-card").forEach(function (fs) {
      writingHome.push({
        href: fs.querySelector(".w-href").value.trim(),
        kicker: fs.querySelector(".w-kicker").value.trim(),
        title: fs.querySelector(".w-title").value.trim(),
        excerpt: fs.querySelector(".w-excerpt").value.trim(),
        meta: fs.querySelector(".w-meta").value.trim()
      });
    });

    return { version: 1, projects: projects, writingHome: writingHome };
  }

  function bindCards() {
    document.getElementById("projects-form").onclick = function (e) {
      var t = e.target;
      var card = t.closest(".admin-project-card");
      if (!card) return;
      if (t.tagName === "BUTTON") e.preventDefault();
      var i = Number(card.dataset.i);
      if (t.classList.contains("admin-move-up") && i > 0) {
        state = readStateFromDom();
        var tmp = state.projects[i - 1];
        state.projects[i - 1] = state.projects[i];
        state.projects[i] = tmp;
        renderAll();
      } else if (t.classList.contains("admin-move-down") && i < state.projects.length - 1) {
        state = readStateFromDom();
        var tmp = state.projects[i + 1];
        state.projects[i + 1] = state.projects[i];
        state.projects[i] = tmp;
        renderAll();
      } else if (t.classList.contains("admin-remove")) {
        if (confirm("Remove this project from the JSON?")) {
          state = readStateFromDom();
          state.projects.splice(i, 1);
          renderAll();
        }
      } else if (t.classList.contains("admin-remove-action")) {
        var blocks = card.querySelectorAll(".admin-action-block");
        if (blocks.length <= 1) {
          alert("Keep at least one action.");
          return;
        }
        t.closest(".admin-action-block").remove();
      } else if (t.classList.contains("admin-add-action")) {
        var wrap = card.querySelector(".admin-actions-wrap");
        var div = document.createElement("div");
        div.className = "admin-action-block";
        div.innerHTML =
          '<div class="admin-row"><label>Action label<input type="text" class="a-label" value="Link"></label></div>' +
          '<div class="admin-row"><label>URL<input type="text" class="a-href" value="#"></label></div>' +
          '<div class="admin-row-inline"><label><input type="checkbox" class="a-ext"> Opens in new tab</label>' +
          '<button type="button" class="admin-remove-action danger">Remove action</button></div>';
        wrap.insertBefore(div, t);
      }
    };

    document.getElementById("writing-form").onclick = function (e) {
      var t = e.target;
      var card = t.closest(".admin-writing-card");
      if (!card) return;
      if (t.tagName === "BUTTON") e.preventDefault();
      var i = Number(card.dataset.wi);
      if (t.classList.contains("w-move-up") && i > 0) {
        state = readStateFromDom();
        var tmp = state.writingHome[i - 1];
        state.writingHome[i - 1] = state.writingHome[i];
        state.writingHome[i] = tmp;
        renderAll();
      } else if (t.classList.contains("w-move-down") && i < state.writingHome.length - 1) {
        state = readStateFromDom();
        var tmp = state.writingHome[i + 1];
        state.writingHome[i + 1] = state.writingHome[i];
        state.writingHome[i] = tmp;
        renderAll();
      } else if (t.classList.contains("w-remove")) {
        if (confirm("Remove this writing card?")) {
          state = readStateFromDom();
          state.writingHome.splice(i, 1);
          renderAll();
        }
      }
    };
  }

  function setStatus(msg) {
    var el = document.getElementById("admin-status");
    if (el) el.textContent = msg || "";
  }

  function loadFromServer() {
    var url = getDataUrl();
    setStatus("Loading…");
    fetch(url, { credentials: "same-origin" })
      .then(function (r) {
        if (!r.ok) throw new Error(String(r.status));
        return r.json();
      })
      .then(function (data) {
        state.version = data.version || 1;
        state.projects = data.projects || [];
        state.writingHome = data.writingHome || [];
        renderAll();
        setStatus("Loaded.");
      })
      .catch(function () {
        setStatus(
          "Could not load JSON (" +
            url +
            "). Serve the site over HTTP from the repo root (npm run dev) or use Import."
        );
        renderAll();
      });
  }

  function exportJson() {
    state = readStateFromDom();
    var blob = new Blob([JSON.stringify(state, null, 2)], { type: "application/json" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "site-content.json";
    a.click();
    URL.revokeObjectURL(a.href);
    setStatus("Exported. Replace data/site-content.json in the repo.");
  }

  var adminInited = false;

  /** Highlight nav link for the section nearest the top of the viewport */
  function setupSectionNavSpy() {
    var navRoot = document.getElementById("admin-nav");
    if (!navRoot || typeof IntersectionObserver === "undefined") return;

    var links = navRoot.querySelectorAll("a.admin-nav-link");
    var sections = document.querySelectorAll("[data-admin-section]");
    if (!links.length || !sections.length) return;

    var byId = {};
    links.forEach(function (a) {
      var href = a.getAttribute("href") || "";
      if (href.indexOf("#") === 0) {
        byId[href.slice(1)] = a;
      }
    });

    function clearActive() {
      links.forEach(function (el) {
        el.classList.remove("is-active");
      });
    }

    var observer = new IntersectionObserver(
      function (entries) {
        var visible = entries
          .filter(function (en) {
            return en.isIntersecting;
          })
          .sort(function (a, b) {
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });
        if (!visible.length) return;
        var id = visible[0].target.id;
        var link = byId[id];
        if (!link) return;
        clearActive();
        link.classList.add("is-active");
      },
      { root: null, threshold: 0, rootMargin: "-10% 0px -50% 0px" }
    );

    sections.forEach(function (sec) {
      observer.observe(sec);
    });

    if (sections[0] && sections[0].id && byId[sections[0].id]) {
      clearActive();
      byId[sections[0].id].classList.add("is-active");
    }
  }

  function applyGateThenInit() {
    if (adminInited) {
      loadFromServer();
      return;
    }
    adminInited = true;

    document.getElementById("btn-reload").addEventListener("click", function () {
      loadFromServer();
    });
    document.getElementById("btn-export").addEventListener("click", exportJson);
    document.getElementById("btn-add-project").addEventListener("click", function () {
      state = readStateFromDom();
      state.projects.push(emptyProject());
      renderAll();
    });
    document.getElementById("btn-add-writing").addEventListener("click", function () {
      state = readStateFromDom();
      state.writingHome.push(emptyWriting());
      renderAll();
    });

    var expProjects = document.getElementById("btn-projects-expand");
    var colProjects = document.getElementById("btn-projects-collapse");
    if (expProjects && colProjects) {
      expProjects.addEventListener("click", function () {
        document.querySelectorAll(".admin-project-card").forEach(function (d) {
          d.open = true;
        });
      });
      colProjects.addEventListener("click", function () {
        document.querySelectorAll(".admin-project-card").forEach(function (d) {
          d.open = false;
        });
      });
    }

    var expWriting = document.getElementById("btn-writing-expand");
    var colWriting = document.getElementById("btn-writing-collapse");
    if (expWriting && colWriting) {
      expWriting.addEventListener("click", function () {
        document.querySelectorAll(".admin-writing-card").forEach(function (d) {
          d.open = true;
        });
      });
      colWriting.addEventListener("click", function () {
        document.querySelectorAll(".admin-writing-card").forEach(function (d) {
          d.open = false;
        });
      });
    }
    document.getElementById("file-import").addEventListener("change", function (ev) {
      var f = ev.target.files[0];
      if (!f) return;
      var reader = new FileReader();
      reader.onload = function () {
        try {
          var data = JSON.parse(reader.result);
          state.version = data.version || 1;
          state.projects = data.projects || [];
          state.writingHome = data.writingHome || [];
          renderAll();
          setStatus("Imported " + f.name);
        } catch (err) {
          alert("Invalid JSON: " + err.message);
        }
        ev.target.value = "";
      };
      reader.readAsText(f);
    });

    loadFromServer();
    setupSectionNavSpy();
  }

  function syncGateChrome() {
    var gateOpen = !document.getElementById("admin-gate").hidden;
    document.body.classList.toggle("admin-gate-open", gateOpen);
  }

  function tryUnlock() {
    var passEl = document.getElementById("admin-pass");
    var pass = String(passEl.value || "").trim();
    var err = document.getElementById("admin-gate-err");
    var secret = String(ADMIN_SECRET || "").trim();
    if (pass === secret) {
      storageSet(STORAGE_OK, "1");
      err.hidden = true;
      passEl.value = "";
      document.getElementById("admin-gate").hidden = true;
      document.getElementById("admin-app").hidden = false;
      syncGateChrome();
      applyGateThenInit();
    } else {
      err.hidden = false;
      passEl.select();
    }
  }

  function initAdminShell() {
    var gate = document.getElementById("admin-gate");
    var app = document.getElementById("admin-app");
    var gateForm = document.getElementById("admin-gate-form");
    var lockBtn = document.getElementById("admin-lock");

    if (!gate || !app || !gateForm || !lockBtn) {
      return;
    }

    function showGate() {
      gate.hidden = false;
      app.hidden = true;
      syncGateChrome();
    }

    function showApp() {
      gate.hidden = true;
      app.hidden = false;
      syncGateChrome();
      applyGateThenInit();
    }

    if (storageGet(STORAGE_OK) === "1") {
      showApp();
    } else {
      showGate();
      gateForm.addEventListener("submit", function (e) {
        e.preventDefault();
        tryUnlock();
      });
    }

    lockBtn.addEventListener("click", function () {
      storageRemove(STORAGE_OK);
      location.reload();
    });
  }

  function boot() {
    initAdminShell();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
