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
    function closeNav() {
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("is-open");
      document.body.style.overflow = "";
    }
    navToggle.addEventListener("click", function () {
      var open = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !open);
      navLinks.classList.toggle("is-open");
      document.body.style.overflow = open ? "" : "hidden";
    });
    navLinks.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", closeNav);
    });
    var navClose = document.querySelector(".nav-close");
    if (navClose) navClose.addEventListener("click", closeNav);
  }

  // --- Active nav link on scroll ---
  var sections = document.querySelectorAll("section[id]");
  var navAnchors = document.querySelectorAll(".nav-links a[href^='#']");
  function updateActiveNav() {
    var header = document.querySelector(".site-header");
    var headerHeight = header ? header.offsetHeight : 80;
    var scrollY = window.scrollY || window.pageYOffset;
    sections.forEach(function (section) {
      var id = section.getAttribute("id");
      if (!id) return;
      var top = section.offsetTop - headerHeight;
      var height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(function (a) {
          if (a.getAttribute("href") === "#" + id) {
            a.setAttribute("aria-current", "page");
          } else {
            a.removeAttribute("aria-current");
          }
        });
      }
    });
  }
  if (sections.length && navAnchors.length) {
    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();
  }

  // Contributions: show current month as "Last 30 days" label (e.g. "Mar 2026")
  var contribPeriod = document.getElementById("contrib-period");
  if (contribPeriod) {
    var d = new Date();
    var monthName = d.toLocaleString("en-GB", { month: "short" });
    var year = d.getFullYear();
    contribPeriod.textContent = "Last 30 days · " + monthName + " " + year;
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

  // ========== Current project: set name, brief, Git URL, and Live URL here ==========
  (function () {
    var CURRENT_PROJECT = {
      name: "—",           // e.g. "MedWorkFlow"
      brief: "—",          // e.g. "Healthcare workflow automation for medical teams."
      git: "#",            // e.g. "https://github.com/you/repo"
      live: "#"            // e.g. "https://app.example.com"
    };
    var nameEl = document.getElementById("current-project-name");
    var briefEl = document.getElementById("current-project-brief");
    var gitEl = document.getElementById("current-project-git");
    var liveEl = document.getElementById("current-project-live");
    if (nameEl) nameEl.textContent = CURRENT_PROJECT.name;
    if (briefEl) briefEl.textContent = CURRENT_PROJECT.brief;
    if (gitEl) { gitEl.href = CURRENT_PROJECT.git; gitEl.querySelector(".current-project-link-label").textContent = "Git"; }
    if (liveEl) { liveEl.href = CURRENT_PROJECT.live; liveEl.querySelector(".current-project-link-label").textContent = "Live"; }
  })();

  // ========== Skills timeline ==========
  (function () {
    var container = document.getElementById('skills-timeline');
    if (!container) return;

    var YEAR_START = 2020;
    var YEAR_END = 2026;
    var LABEL_W = 72;
    var ROW_H = 36;
    var YEAR_W = 96;
    var PAD_TOP = 26;
    var PAD_BOTTOM = 8;

    var categories = [
      {
        name: 'Languages',
        color: '#58a6ff',
        skills: [
          { name: 'Python',       year: 2020.0, prof: 3 },
          { name: 'JavaScript',   year: 2020.4, prof: 3 },
          { name: 'HTML / CSS',   year: 2020.7, prof: 3 },
          { name: 'SQL',          year: 2021.2, prof: 2 },
          { name: 'TypeScript',   year: 2022.3, prof: 2 },
        ]
      },
      {
        name: 'Frontend',
        color: '#d2a8ff',
        skills: [
          { name: 'React',          year: 2022.0, prof: 2 },
          { name: 'Vite',           year: 2023.0, prof: 2 },
          { name: 'Tailwind CSS',   year: 2023.3, prof: 2 },
          { name: 'Framer Motion',  year: 2023.7, prof: 1 },
          { name: 'Three.js',       year: 2024.2, prof: 1 },
        ]
      },
      {
        name: 'Backend',
        color: '#3fb950',
        skills: [
          { name: 'REST APIs',  year: 2021.0, prof: 2 },
          { name: 'Node.js',    year: 2022.1, prof: 2 },
          { name: 'Flask',      year: 2022.5, prof: 1 },
          { name: 'FastAPI',    year: 2023.2, prof: 2 },
        ]
      },
      {
        name: 'Data / ML',
        color: '#ffa657',
        skills: [
          { name: 'Pandas',       year: 2020.1, prof: 3 },
          { name: 'NumPy',        year: 2020.5, prof: 3 },
          { name: 'Scikit-learn', year: 2021.1, prof: 2 },
          { name: 'TensorFlow',   year: 2021.6, prof: 2 },
          { name: 'PyTorch',      year: 2022.4, prof: 2 },
        ]
      },
      {
        name: 'AI / LLM',
        color: '#ff7b72',
        skills: [
          { name: 'Prompt Engineering', year: 2023.0, prof: 3 },
          { name: 'OpenAI API',         year: 2023.2, prof: 3 },
          { name: 'LangChain',          year: 2023.5, prof: 2 },
          { name: 'RAG',                year: 2024.0, prof: 2 },
          { name: 'Fine-tuning',        year: 2024.5, prof: 2 },
        ]
      },
      {
        name: 'DevOps',
        color: '#79c0ff',
        skills: [
          { name: 'Git',            year: 2020.2, prof: 3 },
          { name: 'Docker',         year: 2023.0, prof: 2 },
          { name: 'Netlify',        year: 2023.4, prof: 2 },
          { name: 'GitHub Actions', year: 2024.1, prof: 1 },
        ]
      },
    ];

    var profR = [0, 3, 5, 7];
    var YEARS = YEAR_END - YEAR_START;
    var CHART_W = YEARS * YEAR_W;
    var SVG_W = LABEL_W + CHART_W + 20;
    var SVG_H = PAD_TOP + categories.length * ROW_H + PAD_BOTTOM;
    var NS = 'http://www.w3.org/2000/svg';

    function mk(tag, attrs) {
      var el = document.createElementNS(NS, tag);
      Object.keys(attrs).forEach(function (k) { el.setAttribute(k, attrs[k]); });
      return el;
    }

    var svg = mk('svg', {
      width: '100%',
      viewBox: '0 0 ' + SVG_W + ' ' + SVG_H,
      preserveAspectRatio: 'xMinYMin meet',
      style: 'display:block',
      'aria-hidden': 'true'
    });

    // Year grid lines + labels
    for (var y = YEAR_START; y <= YEAR_END; y++) {
      var gx = LABEL_W + (y - YEAR_START) * YEAR_W;
      svg.appendChild(mk('line', {
        x1: gx, y1: PAD_TOP - 6,
        x2: gx, y2: SVG_H - PAD_BOTTOM,
        stroke: '#30363d', 'stroke-width': 1
      }));
      var yt = mk('text', {
        x: gx, y: PAD_TOP - 10,
        'text-anchor': 'middle',
        fill: '#8b949e',
        'font-family': '"JetBrains Mono",monospace',
        'font-size': '11'
      });
      yt.textContent = y;
      svg.appendChild(yt);
    }

    // Category rows
    categories.forEach(function (cat, i) {
      var rowY = PAD_TOP + i * ROW_H;
      var midY = rowY + ROW_H / 2;

      // Alternating row tint
      if (i % 2 === 0) {
        svg.appendChild(mk('rect', {
          x: 0, y: rowY, width: SVG_W, height: ROW_H,
          fill: 'rgba(255,255,255,0.018)'
        }));
      }

      // Category label
      var lbl = mk('text', {
        x: LABEL_W - 10, y: midY + 4,
        'text-anchor': 'end',
        fill: '#8b949e',
        'font-family': '"JetBrains Mono",monospace',
        'font-size': '11'
      });
      lbl.textContent = cat.name;
      svg.appendChild(lbl);

      // Left separator
      svg.appendChild(mk('line', {
        x1: LABEL_W, y1: rowY, x2: LABEL_W, y2: rowY + ROW_H,
        stroke: '#30363d', 'stroke-width': 1
      }));

      // Skill dots
      cat.skills.forEach(function (skill) {
        var cx = LABEL_W + (skill.year - YEAR_START) * YEAR_W;
        var r = profR[skill.prof] || 5;
        var c = mk('circle', {
          cx: cx, cy: midY, r: r,
          fill: cat.color, opacity: '0.88',
          tabindex: '0',
          'aria-label': skill.name + ' – since ' + Math.floor(skill.year),
          style: 'cursor:pointer;outline:none;'
        });
        c.dataset.name = skill.name;
        c.dataset.year = Math.floor(skill.year);
        c.dataset.prof = skill.prof;
        c.dataset.color = cat.color;
        svg.appendChild(c);
      });
    });

    container.appendChild(svg);

    // Tooltip
    var tip = document.createElement('div');
    tip.className = 'skills-timeline-tooltip';
    tip.style.display = 'none';
    document.body.appendChild(tip);

    var profLabel = ['', 'Learning', 'Proficient', 'Expert'];

    function showTip(e, el) {
      tip.innerHTML =
        '<strong>' + el.dataset.name + '</strong><br>' +
        '<span style="color:#8b949e">Since ' + el.dataset.year + ' &nbsp;·&nbsp; ' + (profLabel[el.dataset.prof] || '') + '</span>';
      tip.style.display = 'block';
      moveTip(e);
    }

    function moveTip(e) {
      var tx = e.clientX + 14;
      var ty = e.clientY - 8;
      if (tx + 180 > window.innerWidth) tx = e.clientX - 190;
      tip.style.left = tx + 'px';
      tip.style.top = ty + 'px';
    }

    svg.addEventListener('mouseover', function (e) {
      if (e.target.tagName === 'circle') showTip(e, e.target);
    });
    svg.addEventListener('mousemove', function (e) {
      if (e.target.tagName === 'circle') moveTip(e);
    });
    svg.addEventListener('mouseout', function (e) {
      if (e.target.tagName === 'circle') tip.style.display = 'none';
    });
    svg.addEventListener('focusin', function (e) {
      if (e.target.tagName === 'circle') {
        var r = e.target.getBoundingClientRect();
        var fe = { clientX: r.left + r.width / 2, clientY: r.top };
        showTip(fe, e.target);
      }
    });
    svg.addEventListener('focusout', function () { tip.style.display = 'none'; });
  })();

  // ========== PLACEHOLDER: Last played – Spotify, YouTube, Podcast APIs ==========
  // When you have APIs, set text (or innerHTML) on these elements:
  // Spotify:  #last-played-spotify-title, #last-played-spotify-subtitle
  // YouTube: #last-played-youtube-title, #last-played-youtube-subtitle
  // Podcast: #last-played-podcast-title, #last-played-podcast-subtitle
  // Example: document.getElementById("last-played-spotify-title").textContent = data.track;
  //          document.getElementById("last-played-spotify-subtitle").textContent = data.artist;

  // ========== PLACEHOLDER: Contributions – last 30 days only ==========
  // API should return an array of 30 numbers (count per day, oldest first).
  // Set data-level on each .contrib-cell: 0 = none, 1–4 = intensity (CSS colors them).
  // Example: for each cell, cell.setAttribute("data-level", levelFromCount(count));
  // function fetchContributions() {
  //   fetch("YOUR_CONTRIB_API_OR_PROXY?days=30")
  //     .then(function (res) { return res.json(); })
  //     .then(function (data) {
  //       var cells = document.querySelectorAll("#contrib-grid .contrib-cell");
  //       var placeholder = document.getElementById("contrib-placeholder");
  //       if (!cells.length) return;
  //       data.forEach(function (count, i) {
  //         if (cells[i]) cells[i].setAttribute("data-level", count === 0 ? "0" : Math.min(4, Math.ceil(count / 5)).toString());
  //       });
  //       if (placeholder) placeholder.style.display = "none";
  //     })
  //     .catch(function () {});
  // }
  // fetchContributions();
})();
