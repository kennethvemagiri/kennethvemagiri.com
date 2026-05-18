/**
 * Productive version – Kenneth Vemagiri
 * Footer year, mobile nav, hero time. API placeholders for Last Played & Contributions.
 */

(function () {
  "use strict";

  // --- Footer year ---
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- Hero time (London) ---
  function setHeroTime() {
    var el = document.getElementById("hero-time");
    if (!el) return;
    var d = new Date();
    var opts = {
      timeZone: "Europe/London",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZoneName: "short"
    };
    try {
      el.textContent = d.toLocaleTimeString("en-GB", opts);
    } catch (e) {
      el.textContent = d.toUTCString().replace(/.*\s(\d{2}:\d{2}).*/, "$1 GMT");
    }
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", setHeroTime);
  } else {
    setHeroTime();
  }
  setInterval(setHeroTime, 60000);

  // --- Mobile nav ---
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");
  if (navToggle && navLinks) {
    var navBackdrop = document.querySelector(".nav-backdrop");
    if (!navBackdrop) {
      navBackdrop = document.createElement("button");
      navBackdrop.type = "button";
      navBackdrop.className = "nav-backdrop";
      navBackdrop.setAttribute("aria-label", "Close menu");
      document.body.appendChild(navBackdrop);
    }

    var focusableSelector =
      'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

    function getNavFocusables() {
      return Array.prototype.slice.call(
        navLinks.querySelectorAll(focusableSelector)
      );
    }

    function trapNavFocus(event) {
      if (event.key !== "Tab" || navToggle.getAttribute("aria-expanded") !== "true") {
        return;
      }
      var focusables = getNavFocusables();
      if (!focusables.length) return;
      var first = focusables[0];
      var last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    function closeNav() {
      var hadFocus = document.activeElement;
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("is-open");
      navBackdrop.classList.remove("is-visible");
      document.body.style.overflow = "";
      document.removeEventListener("keydown", trapNavFocus);
      if (hadFocus && navLinks.contains(hadFocus)) {
        navToggle.focus();
      }
    }

    function openNav() {
      navToggle.setAttribute("aria-expanded", "true");
      navLinks.classList.add("is-open");
      navBackdrop.classList.add("is-visible");
      document.body.style.overflow = "hidden";
      document.addEventListener("keydown", trapNavFocus);
      var focusables = getNavFocusables();
      if (focusables.length) {
        focusables[0].focus();
      }
    }

    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      if (open) {
        closeNav();
      } else {
        openNav();
      }
    });

    navBackdrop.addEventListener("click", closeNav);

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && navToggle.getAttribute("aria-expanded") === "true") {
        event.preventDefault();
        closeNav();
      }
    });

    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
    var navClose = document.querySelector(".nav-close");
    if (navClose) navClose.addEventListener("click", closeNav);
  }

  function trimProductiveNav() {
    if (!document.body.classList.contains("productive-version-page")) return;

    var logo = document.querySelector(".site-header .nav-logo");
    if (logo) logo.setAttribute("href", "../index.html#home");

    var removeLabels = {
      Work: true,
      About: true,
      Contact: true
    };

    document.querySelectorAll(".site-header .nav-links li").forEach(function (li) {
      var anchor = li.querySelector("a");
      if (!anchor) return;
      if (removeLabels[(anchor.textContent || "").trim()]) {
        li.remove();
      }
    });
  }

  function localizeProductiveNav() {
    trimProductiveNav();
  }

  var sections = document.querySelectorAll("section[id], article[id]");
  var navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

  function updateActiveNav() {
    var header = document.querySelector(".site-header");
    var headerHeight = header ? header.offsetHeight : 80;
    var scrollY = window.scrollY || window.pageYOffset;
    var activeId = "";
    sections.forEach(function (section) {
      var id = section.getAttribute("id");
      if (!id) return;
      var top = section.offsetTop - headerHeight;
      var height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        activeId = id;
      }
    });
    navAnchors.forEach(function (anchor) {
      if (anchor.getAttribute("href") === "#" + activeId) {
        anchor.setAttribute("aria-current", "page");
      } else {
        anchor.removeAttribute("aria-current");
      }
    });
  }

  function initProductivePageNav() {
    localizeProductiveNav();
    if (sections.length && navAnchors.length) {
      window.addEventListener("scroll", updateActiveNav, { passive: true });
      updateActiveNav();
    }
  }

  // Contributions: show current month beside the last-14-days label (e.g. "MAY 2026")
  var contribPeriod = document.getElementById("contrib-period");
  if (contribPeriod) {
    var d = new Date();
    var monthName = d.toLocaleString("en-GB", { month: "short" }).toUpperCase();
    var year = d.getFullYear();
    contribPeriod.textContent = monthName + " " + year;
  }

  function initTimelineCompression() {
    var board = document.querySelector(".dual-timeline-board");
    if (!board) return;

    var babyStart = 2000;
    var babyEnd = 2007;
    var endYear = 2026;
    var babyShare = 0.07;

    function timelineYearToPercent(year) {
      if (year <= babyEnd) {
        if (year <= babyStart) return 0;
        return ((year - babyStart) / (babyEnd - babyStart)) * babyShare * 100;
      }
      return (
        babyShare * 100 +
        ((year - babyEnd) / (endYear - babyEnd)) * (100 - babyShare * 100)
      );
    }

    function babyReveal(year) {
      if (year > babyEnd) return { opacity: 1, blur: 0 };
      var progress = (year - babyStart) / (babyEnd - babyStart);
      if (progress < 0) progress = 0;
      return { opacity: progress, blur: (1 - progress) * 4 };
    }

    board.querySelectorAll(".dual-timeline-years span").forEach(function (span) {
      var year = parseInt(span.textContent, 10);
      if (Number.isNaN(year)) return;
      var reveal = babyReveal(year);
      span.style.opacity = String(reveal.opacity);
      span.style.filter = reveal.blur > 0 ? "blur(" + reveal.blur.toFixed(2) + "px)" : "none";
    });

    board.querySelectorAll(".dual-timeline-pin[data-year]").forEach(function (pin) {
      var year = parseInt(pin.getAttribute("data-year"), 10);
      if (Number.isNaN(year)) return;
      pin.style.left = timelineYearToPercent(year) + "%";
      var reveal = babyReveal(year);
      pin.style.opacity = String(reveal.opacity);
      pin.style.filter = reveal.blur > 0 ? "blur(" + reveal.blur.toFixed(2) + "px)" : "none";
    });
  }

  function initTimelineYearActivate() {
    var board = document.querySelector(".dual-timeline-board");
    if (!board) return;

    var yearTargets = board.querySelectorAll(".dual-timeline-years span");
    var pinTargets = board.querySelectorAll(".dual-timeline-pin[data-year]");

    yearTargets.forEach(function (span) {
      if (window.getComputedStyle(span).visibility === "hidden") return;
      span.setAttribute("role", "button");
      span.setAttribute("tabindex", "0");
    });

    function clearActive() {
      board.querySelectorAll(".is-year-active").forEach(function (el) {
        el.classList.remove("is-year-active");
      });
    }

    function activateYear(year) {
      if (Number.isNaN(year)) return;
      clearActive();
      yearTargets.forEach(function (span) {
        if (parseInt(span.textContent, 10) === year) {
          span.classList.add("is-year-active");
        }
      });
      pinTargets.forEach(function (pin) {
        if (parseInt(pin.getAttribute("data-year"), 10) === year) {
          pin.classList.add("is-year-active");
        }
      });
    }

    function activateFromTarget(target) {
      if (!target) return;
      if (target.matches(".dual-timeline-years span")) {
        activateYear(parseInt(target.textContent, 10));
        return;
      }
      var pin = target.closest(".dual-timeline-pin[data-year]");
      if (pin) {
        activateYear(parseInt(pin.getAttribute("data-year"), 10));
      }
    }

    board.addEventListener("click", function (event) {
      activateFromTarget(
        event.target.closest(".dual-timeline-years span, .dual-timeline-pin[data-year]")
      );
    });

    board.addEventListener("pointerleave", clearActive);

    board.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      var yearSpan = event.target.closest(".dual-timeline-years span");
      if (!yearSpan) return;
      event.preventDefault();
      activateFromTarget(yearSpan);
    });
  }

  function initTimelineScrollPan() {
    var scroller = document.querySelector(".dual-timeline-scroll");
    if (!scroller) return;

    var prefersReduced =
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    var isDragging = false;
    var activePointerId = null;
    var startX = 0;
    var startScrollLeft = 0;
    var dragged = false;

    function canScroll() {
      return scroller.scrollWidth > scroller.clientWidth + 1;
    }

    function stopDrag(pointerId) {
      if (activePointerId != null && pointerId !== activePointerId) return;
      isDragging = false;
      activePointerId = null;
      scroller.classList.remove("is-dragging");
    }

    scroller.addEventListener("pointerdown", function (event) {
      if (!canScroll()) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      if (event.target.closest(".dual-timeline-years span, .dual-timeline-pin[data-year]")) {
        return;
      }

      isDragging = true;
      dragged = false;
      activePointerId = event.pointerId;
      startX = event.clientX;
      startScrollLeft = scroller.scrollLeft;
      scroller.classList.add("is-dragging");
      scroller.setPointerCapture(event.pointerId);
    });

    scroller.addEventListener("pointermove", function (event) {
      if (!isDragging || event.pointerId !== activePointerId) return;
      var delta = event.clientX - startX;
      if (Math.abs(delta) > 3) dragged = true;
      event.preventDefault();
      scroller.scrollLeft = startScrollLeft - delta;
    });

    scroller.addEventListener("pointerup", function (event) {
      stopDrag(event.pointerId);
    });

    scroller.addEventListener("pointercancel", function (event) {
      stopDrag(event.pointerId);
    });

    scroller.addEventListener(
      "click",
      function (event) {
        if (!dragged) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        dragged = false;
      },
      true
    );

    scroller.addEventListener("keydown", function (event) {
      if (!canScroll()) return;
      var step = Math.max(40, Math.round(scroller.clientWidth * 0.15));
      if (event.key === "ArrowLeft") {
        scroller.scrollLeft -= step;
        event.preventDefault();
      } else if (event.key === "ArrowRight") {
        scroller.scrollLeft += step;
        event.preventDefault();
      } else if (event.key === "Home") {
        scroller.scrollLeft = 0;
        event.preventDefault();
      } else if (event.key === "End") {
        scroller.scrollLeft = scroller.scrollWidth;
        event.preventDefault();
      }
    });

    if (!prefersReduced) {
      scroller.addEventListener(
        "wheel",
        function (event) {
          if (!canScroll()) return;
          if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
          scroller.scrollLeft += event.deltaY;
          event.preventDefault();
        },
        { passive: false }
      );
    }
  }

  function bootProductivePage() {
    initProductivePageNav();
    initTimelineCompression();
    initTimelineYearActivate();
    initTimelineScrollPan();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", bootProductivePage);
  } else {
    bootProductivePage();
  }

  var FEATURED_PROJECT_COUNT = 3;

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function resolveSitePath(path) {
    if (!path) return "#";
    if (/^https?:\/\//i.test(path)) return path;
    return "../" + String(path).replace(/^\//, "");
  }

  function externalLinkAttrs(href) {
    if (href && /^https?:\/\//i.test(href)) {
      return ' target="_blank" rel="noopener noreferrer"';
    }
    return "";
  }

  function shuffleAndPick(items, count) {
    var pool = items.slice();
    var i = pool.length;
    while (i > 1) {
      i -= 1;
      var j = Math.floor(Math.random() * (i + 1));
      var temp = pool[i];
      pool[i] = pool[j];
      pool[j] = temp;
    }
    return pool.slice(0, Math.min(count, pool.length));
  }

  function renderFeaturedProjectCard(project) {
    var featured = project.featured ? " project-tile-featured" : "";
    var badgeClass = project.badgeSoon ? " project-tile-badge-soon" : "";
    var mediaHref = resolveSitePath(project.mediaHref);
    var caseHref = resolveSitePath(project.caseHref || project.mediaHref);
    var mediaRel = externalLinkAttrs(project.mediaHref);
    var caseRel = externalLinkAttrs(project.caseHref || project.mediaHref);
    var tileClass = escapeHtml(project.tileClass || "project-tile-generic");
    var stackItems = (project.stack || [])
      .map(function (tech) {
        return "<li>" + escapeHtml(tech) + "</li>";
      })
      .join("");
    var actions = (project.actions || [])
      .map(function (action) {
        var rel = action.external ? ' target="_blank" rel="noopener noreferrer"' : "";
        return (
          '<a href="' +
          escapeHtml(resolveSitePath(action.href)) +
          '"' +
          rel +
          ">" +
          escapeHtml(action.label) +
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
      escapeHtml(mediaHref) +
      '"' +
      mediaRel +
      ' class="project-tile-media" tabindex="-1" aria-hidden="true">' +
      '<div class="project-tile-image">' +
      "<picture>" +
      '<source type="image/webp" srcset="' +
      escapeHtml(resolveSitePath(project.imageWebp)) +
      '">' +
      '<img src="' +
      escapeHtml(resolveSitePath(project.imageFallback)) +
      '" alt="" width="' +
      Number(project.imageW || 200) +
      '" height="' +
      Number(project.imageH || 200) +
      '" loading="lazy" decoding="async">' +
      "</picture>" +
      "</div>" +
      "</a>" +
      '<div class="project-tile-content">' +
      '<span class="project-tile-badge' +
      badgeClass +
      '">' +
      escapeHtml(project.badge) +
      "</span>" +
      '<h3 class="project-tile-title"><a href="' +
      escapeHtml(caseHref) +
      '"' +
      caseRel +
      ">" +
      escapeHtml(project.title) +
      "</a></h3>" +
      '<p class="project-tile-tagline">' +
      escapeHtml(project.tagline) +
      "</p>" +
      '<ul class="project-tile-stack" aria-label="Tech stack">' +
      stackItems +
      "</ul>" +
      '<p class="project-tile-metric">' +
      escapeHtml(project.metric) +
      "</p>" +
      '<div class="project-tile-actions">' +
      actions +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function renderFeaturedProjects() {
    var root = document.getElementById("featured-projects-root");
    if (!root) return;
    fetch("../data/site-content.json", { credentials: "same-origin" })
      .then(function (res) {
        if (!res.ok) throw new Error("site-content");
        return res.json();
      })
      .then(function (data) {
        var featured = (data.projects || []).filter(function (project) {
          return !!project.featured;
        });
        if (!featured.length) return;
        var chosen = shuffleAndPick(featured, FEATURED_PROJECT_COUNT);
        root.innerHTML = chosen.map(renderFeaturedProjectCard).join("");
      })
      .catch(function () {});
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderFeaturedProjects);
  } else {
    renderFeaturedProjects();
  }

  // ========== Impression / visitor counter (IP-based when API is connected) ==========
  // Replace VISITOR_COUNT_API with your endpoint. API should: count by IP (or fingerprint),
  // return { "count": 6157 } (or similar). Frontend only displays the number.
  var visitorCountEl = document.getElementById("visitor-count");
  if (visitorCountEl) {
    var VISITOR_COUNT_API = ""; // e.g. "https://your-api.com/visit" or serverless function URL
    if (VISITOR_COUNT_API) {
      fetch(VISITOR_COUNT_API, { method: "GET", credentials: "omit" })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          var n = data.count != null ? data.count : data.visitors;
          if (typeof n === "number" && n >= 0) {
            visitorCountEl.textContent = n.toLocaleString();
          }
        })
        .catch(function () {
          visitorCountEl.textContent = "—";
        });
    } else {
      visitorCountEl.textContent = "—";
    }
  }

  // ========== Current project: driven by data/site-content.json ==========
  // Mark exactly one project with "currentBuild": true (or we fall back to the first
  // featured project that has a GitHub action). Edit title, tagline, and actions there.
  (function () {
    var nameEl = document.getElementById("current-project-name");
    var briefEl = document.getElementById("current-project-brief");
    var gitEl = document.getElementById("current-project-git");
    if (!nameEl || !briefEl || !gitEl) return;

    function githubHrefFromProject(p) {
      if (!p || !Array.isArray(p.actions)) return "";
      for (var i = 0; i < p.actions.length; i++) {
        var a = p.actions[i];
        if (!a || !a.href) continue;
        var href = String(a.href).trim();
        var lab = String(a.label || "").toLowerCase();
        if (href.indexOf("github.com") !== -1 || lab === "github") return href;
      }
      return "";
    }

    function applyProject(p) {
      if (!p) return;
      var name = String(p.title || "").trim();
      var brief = String(p.tagline || p.metric || "").trim();
      var gitUrl = githubHrefFromProject(p);
      nameEl.textContent = name || "—";
      briefEl.textContent = brief || "Add the build you are shipping right now.";
      if (gitUrl) {
        gitEl.href = gitUrl;
        gitEl.removeAttribute("aria-disabled");
        gitEl.classList.remove("is-placeholder");
        gitEl.setAttribute("aria-label", "Open " + name + " on GitHub");
      } else {
        gitEl.href = "#";
        gitEl.setAttribute("aria-disabled", "true");
        gitEl.classList.add("is-placeholder");
        gitEl.removeAttribute("aria-label");
      }
    }

    function pickProject(projects) {
      if (!projects || !projects.length) return null;
      var flagged = projects.filter(function (p) {
        return p && p.currentBuild;
      });
      if (flagged.length) return flagged[0];
      for (var j = 0; j < projects.length; j++) {
        var q = projects[j];
        if (q && q.featured && githubHrefFromProject(q)) return q;
      }
      return null;
    }

    var dataUrl = new URL("../data/site-content.json", window.location.href).toString();
    fetch(dataUrl, { credentials: "same-origin" })
      .then(function (res) {
        if (!res.ok) throw new Error("bad status");
        return res.json();
      })
      .then(function (data) {
        var p = pickProject(data && data.projects);
        applyProject(p);
      })
      .catch(function () {
        /* keep HTML defaults when JSON missing (e.g. wrong base path) */
      });
  })();

  // ========== Last played: multiple YouTube URLs, random pick every 2–3 h ==========
  (function () {
    /**
     * Add as many entries as you like. Each rotation picks a random video (never the
     * same as the previous pick when there are 2+). Interval until next pick is random
     * between 2h and 3h, persisted in localStorage so it survives refresh.
     *
     * Back-compat: a lone `youtube` + optional `title` still works as a one-item list.
     */
    var LAST_PLAYED = {
      videos: [
        { youtube: "https://www.youtube.com/watch?v=RnOWJoHU_NY", title: "" }
        // { youtube: "https://youtu.be/VIDEO_ID", title: "Talk title" },
      ]
    };

    var STORAGE_KEY = "kv-dev-last-played-rot";
    var MIN_ROT_MS = 2 * 60 * 60 * 1000;
    var MAX_ROT_MS = 3 * 60 * 60 * 1000;

    function randomRotationMs() {
      return MIN_ROT_MS + Math.random() * (MAX_ROT_MS - MIN_ROT_MS);
    }

    function getYouTubeVideoId(url) {
      if (!url) return "";
      try {
        var parsed = new URL(url.trim());
        if (parsed.hostname === "youtu.be") {
          return parsed.pathname.replace(/^\//, "").split(/[/?#]/)[0];
        }
        var fromQuery = parsed.searchParams.get("v");
        if (fromQuery) return fromQuery;
        var pathMatch = parsed.pathname.match(/\/(?:embed|shorts|live)\/([^/?#]+)/);
        if (pathMatch) return pathMatch[1];
      } catch (error) {
        return "";
      }
      return "";
    }

    function normalizeVideos(cfg) {
      var list = cfg.videos;
      if (Array.isArray(list) && list.length) {
        return list
          .map(function (item) {
            if (typeof item === "string") {
              return { youtube: item.trim(), title: "" };
            }
            if (!item || typeof item !== "object") return null;
            var y = (item.youtube || item.url || "").trim();
            return y ? { youtube: y, title: (item.title || "").trim() } : null;
          })
          .filter(Boolean);
      }
      var single = (cfg.youtube || "").trim();
      if (single) return [{ youtube: single, title: (cfg.title || "").trim() }];
      return [];
    }

    function playlistHash(entries) {
      return entries
        .map(function (e) {
          return e.youtube;
        })
        .join("|");
    }

    function readState() {
      try {
        var raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return null;
        var o = JSON.parse(raw);
        if (typeof o.index !== "number" || typeof o.nextAt !== "number") return null;
        return o;
      } catch (e) {
        return null;
      }
    }

    function writeState(o) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(o));
      } catch (e) {}
    }

    function pickRandomIndexExcluding(n, exclude) {
      if (n <= 1) return 0;
      var i;
      var guard = 0;
      do {
        i = Math.floor(Math.random() * n);
        guard++;
      } while (i === exclude && guard < 50);
      return i;
    }

    function resolveRotation(entries, hash) {
      var now = Date.now();
      var n = entries.length;
      var st = readState();
      var idx;
      var nextAt;

      if (!st || st.hash !== hash || st.index < 0 || st.index >= n) {
        idx = Math.floor(Math.random() * n);
        nextAt = now + randomRotationMs();
        writeState({ index: idx, nextAt: nextAt, hash: hash });
        return { entry: entries[idx], nextAt: nextAt };
      }

      if (now >= st.nextAt) {
        idx = pickRandomIndexExcluding(n, st.index);
        nextAt = now + randomRotationMs();
        writeState({ index: idx, nextAt: nextAt, hash: hash });
        return { entry: entries[idx], nextAt: nextAt };
      }

      return { entry: entries[st.index], nextAt: st.nextAt };
    }

    var link = document.getElementById("last-played-link");
    var thumb = document.getElementById("last-played-thumb");
    var caption = document.getElementById("last-played-caption");
    if (!link || !thumb || !caption) return;

    var entries = normalizeVideos(LAST_PLAYED).filter(function (e) {
      return getYouTubeVideoId(e.youtube);
    });
    if (!entries.length) return;

    var hash = playlistHash(entries);
    var rotateTimer = null;

    function applyEntry(entry) {
      var youtubeUrl = entry.youtube.trim();
      var videoId = getYouTubeVideoId(youtubeUrl);
      if (!videoId) return;

      link.href = youtubeUrl;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.removeAttribute("aria-disabled");
      link.removeAttribute("tabindex");
      link.classList.remove("is-placeholder");
      link.setAttribute("aria-label", "Watch last played video on YouTube");

      thumb.src = "https://i.ytimg.com/vi/" + videoId + "/hqdefault.jpg";
      thumb.alt = entry.title ? entry.title + " thumbnail" : "YouTube video thumbnail";

      caption.textContent = entry.title || "Watch on YouTube";
    }

    function scheduleRotate(nextAt) {
      if (rotateTimer) {
        clearTimeout(rotateTimer);
        rotateTimer = null;
      }
      var delay = Math.max(5000, nextAt - Date.now());
      rotateTimer = window.setTimeout(runRotation, delay);
    }

    function runRotation() {
      var r = resolveRotation(entries, hash);
      applyEntry(r.entry);
      scheduleRotate(r.nextAt);
    }

    runRotation();

    document.addEventListener("visibilitychange", function () {
      if (document.visibilityState !== "visible") return;
      runRotation();
    });
  })();

  // ========== Contributions: last 14 days (/api/github-contributions → Netlify Function) ==========
  (function () {
    var cells = document.querySelectorAll("#contrib-grid .contrib-cell");
    var placeholder = document.getElementById("contrib-placeholder");
    if (!cells.length) return;

    function countToLevel(count) {
      if (!count || count <= 0) return "0";
      return String(Math.min(4, Math.ceil(count / 5)));
    }

    var apiPath = "/api/github-contributions";
    fetch(apiPath, { credentials: "same-origin" })
      .then(function (res) {
        if (!res.ok) throw new Error("bad status");
        return res.json();
      })
      .then(function (data) {
        var arr = data && data.counts;
        if (!Array.isArray(arr) || arr.length !== 14) throw new Error("bad payload");
        arr.forEach(function (count, i) {
          if (cells[i]) cells[i].setAttribute("data-level", countToLevel(count));
        });
        if (placeholder) placeholder.style.display = "none";
      })
      .catch(function () {
        /* keep placeholder when API missing (e.g. local static serve) */
      });
  })();
})();
