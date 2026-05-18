/**
 * Loads data/site-content.json and renders featured projects on the homepage and related pages.
 */
(function () {
  "use strict";

  var HIRE_QUERY_KEY = "hireSearchQuery";

  var STOPWORDS = {
    the: true,
    and: true,
    for: true,
    are: true,
    but: true,
    not: true,
    you: true,
    all: true,
    any: true,
    can: true,
    had: true,
    her: true,
    was: true,
    one: true,
    our: true,
    out: true,
    day: true,
    get: true,
    has: true,
    him: true,
    how: true,
    its: true,
    let: true,
    may: true,
    new: true,
    now: true,
    old: true,
    see: true,
    two: true,
    way: true,
    who: true,
    boy: true,
    did: true,
    put: true,
    say: true,
    she: true,
    too: true,
    use: true,
    that: true,
    this: true,
    with: true,
    from: true,
    they: true,
    will: true,
    have: true,
    been: true,
    were: true,
    what: true,
    when: true,
    your: true,
    into: true,
    just: true,
    like: true,
    some: true,
    than: true,
    them: true,
    very: true,
    also: true,
    back: true,
    only: true,
    over: true,
    such: true,
    work: true,
    must: true,
    both: true,
    each: true,
    make: true,
    most: true,
    team: true,
    role: true,
    job: true,
    year: true,
    experience: true,
    looking: true,
    build: true,
    strong: true,
    ideal: true,
    candidate: true,
    responsibilities: true,
    requirements: true,
    skills: true,
    plus: true,
    remote: true,
    hybrid: true,
    london: true,
    uk: true,
    etc: true
  };

  /**
   * QUERY_ALIAS: vocabulary collapse. Map many JD/portfolio words onto a small
   * canonical set so synonyms collide without an LLM. Run AFTER `stem` so
   * plural / -ing / -ed forms also resolve.
   */
  var QUERY_ALIAS = {
    gpt: "llm",
    chatgpt: "llm",
    openai: "llm",
    anthropic: "llm",
    claude: "llm",
    gemini: "llm",
    grok: "llm",
    llms: "llm",
    llama: "llm",
    mistral: "llm",
    bedrock: "llm",
    nlp: "llm",
    chatbot: "llm",
    chatbots: "llm",
    copilot: "llm",
    transformer: "llm",
    transformers: "llm",
    foundation: "llm",
    generative: "llm",
    genai: "llm",
    embedding: "rag",
    embeddings: "rag",
    vector: "rag",
    vectors: "rag",
    retrieval: "rag",
    retriever: "rag",
    pinecone: "rag",
    chroma: "rag",
    weaviate: "rag",
    qdrant: "rag",
    faiss: "rag",
    langchain: "rag",
    llamaindex: "rag",
    chunking: "rag",
    chunk: "rag",
    pipeline: "rag",
    pipelines: "rag",
    rerank: "rag",
    reranker: "rag",
    rerankers: "rag",
    semantic: "rag",
    agent: "agent",
    agents: "agent",
    agentic: "agent",
    automation: "agent",
    workflow: "agent",
    workflows: "agent",
    orchestration: "agent",
    orchestrator: "agent",
    tooluse: "agent",
    function: "agent",
    functions: "agent",
    safety: "safety",
    guardrail: "safety",
    guardrails: "safety",
    injection: "safety",
    redteam: "safety",
    redteaming: "safety",
    governance: "safety",
    compliance: "safety",
    privacy: "safety",
    eval: "eval",
    evals: "eval",
    evaluation: "eval",
    evaluations: "eval",
    benchmark: "eval",
    benchmarks: "eval",
    test: "eval",
    testing: "eval",
    qa: "eval",
    observability: "ops",
    observable: "ops",
    monitoring: "ops",
    metrics: "ops",
    logging: "ops",
    tracing: "ops",
    traces: "ops",
    slo: "ops",
    slos: "ops",
    sla: "ops",
    sre: "ops",
    pytorch: "ml",
    tensorflow: "ml",
    scikit: "ml",
    sklearn: "ml",
    pandas: "ml",
    numpy: "ml",
    jupyter: "ml",
    notebook: "ml",
    notebooks: "ml",
    classification: "ml",
    regression: "ml",
    typescript: "ts",
    javascript: "js",
    mlops: "mlops",
    api: "api",
    apis: "api",
    rest: "api",
    restful: "api",
    graphql: "api",
    frontend: "frontend",
    "front-end": "frontend",
    ui: "frontend",
    backend: "backend",
    "back-end": "backend",
    server: "backend",
    fullstack: "fullstack",
    "full-stack": "fullstack",
    devops: "devops",
    docker: "docker",
    container: "docker",
    containers: "docker",
    kubernetes: "kubernetes",
    k8s: "kubernetes",
    cloud: "cloud",
    aws: "cloud",
    azure: "cloud",
    gcp: "cloud",
    serverless: "cloud",
    lambda: "cloud",
    netlify: "cloud",
    vercel: "cloud",
    react: "react",
    reactjs: "react",
    nextjs: "react",
    "next.js": "react",
    vue: "vue",
    vuejs: "vue",
    node: "nodejs",
    nodejs: "nodejs",
    express: "nodejs",
    py: "python",
    python: "python",
    sql: "sql",
    postgres: "sql",
    postgresql: "sql",
    mysql: "sql",
    sqlite: "sql",
    documentai: "docai",
    ocr: "docai",
    pdf: "docai",
    pdfs: "docai",
    document: "docai",
    documents: "docai",
    extraction: "docai",
    parser: "docai",
    parsing: "docai",
    healthcare: "healthcare",
    medical: "healthcare",
    clinic: "healthcare",
    clinical: "healthcare",
    patient: "healthcare",
    patients: "healthcare",
    prompt: "prompt",
    prompts: "prompt",
    prompting: "prompt"
  };

  function stem(t) {
    if (!t) return t;
    var len = t.length;
    if (len <= 4) return t;
    if (/ies$/.test(t)) return t.slice(0, -3) + "y";
    if (/sses$/.test(t)) return t.slice(0, -2);
    if (/ses$/.test(t)) return t.slice(0, -2);
    if (/ing$/.test(t) && len > 5) return t.slice(0, -3);
    if (/ed$/.test(t) && len > 4 && !/eed$/.test(t)) return t.slice(0, -2);
    if (/s$/.test(t) && len > 4 && !/ss$/.test(t) && !/us$/.test(t) && !/is$/.test(t)) {
      return t.slice(0, -1);
    }
    return t;
  }

  function tokenize(text) {
    if (!text) return [];
    return String(text)
      .toLowerCase()
      .replace(/[^a-z0-9+#]+/g, " ")
      .split(/\s+/)
      .filter(function (w) {
        return w.length > 2 && !STOPWORDS[w];
      });
  }

  function expandOne(t, out) {
    if (!t) return;
    out[t] = true;
    var s = stem(t);
    if (s && s !== t) out[s] = true;
    var aliasT = QUERY_ALIAS[t];
    if (aliasT) out[aliasT] = true;
    var aliasS = QUERY_ALIAS[s];
    if (aliasS) out[aliasS] = true;
  }

  function expandQueryTokens(tokens) {
    var set = {};
    tokens.forEach(function (t) {
      expandOne(t, set);
    });
    return Object.keys(set);
  }

  function tokenSet(tokens) {
    var set = {};
    tokens.forEach(function (t) {
      expandOne(t, set);
    });
    return set;
  }

  /**
   * Build {href -> writingItem} once per mount so a project's
   * `relatedWriting: [href, ...]` can pull tokens from kicker/title/excerpt/meta.
   */
  function buildWritingIndex(writingHome) {
    var idx = {};
    (writingHome || []).forEach(function (w) {
      if (w && w.href) idx[w.href] = w;
    });
    return idx;
  }

  function writingTextForProject(p, writingByHref) {
    var hrefs = p.relatedWriting || [];
    var parts = [];
    hrefs.forEach(function (href) {
      var w = writingByHref[href];
      if (!w) return;
      if (w.kicker) parts.push(w.kicker);
      if (w.title) parts.push(w.title);
      if (w.excerpt) parts.push(w.excerpt);
      if (w.meta) parts.push(w.meta);
    });
    return parts.join(" ");
  }

  function projectMatchBuckets(p, writingByHref) {
    var kwRaw = (p.searchKeywords || []).join(" ");
    var stackRaw = (p.stack || []).join(" ").replace(/\//g, " ");
    var bodyRaw = [p.title, p.tagline, p.metric, p.badge].filter(Boolean).join(" ");
    var writingRaw = writingByHref ? writingTextForProject(p, writingByHref) : "";
    return {
      kw: tokenSet(tokenize(kwRaw)),
      stack: tokenSet(tokenize(stackRaw)),
      body: tokenSet(tokenize(bodyRaw)),
      writing: tokenSet(tokenize(writingRaw))
    };
  }

  /**
   * Weighted overlap. Tuning rationale:
   *  - kw (curated): strongest signal for recruiter intent.
   *  - stack: tech the project demonstrably uses.
   *  - writing: themes proven by long-form posts (richer than tagline).
   *  - body: short tile copy; weakest single source.
   */
  function scoreProjectAgainstQuery(queryTokensArr, buckets) {
    var sKw = 0;
    var sStack = 0;
    var sWriting = 0;
    var sBody = 0;
    queryTokensArr.forEach(function (qt) {
      if (buckets.kw[qt]) sKw += 1;
      if (buckets.stack[qt]) sStack += 1;
      if (buckets.writing && buckets.writing[qt]) sWriting += 1;
      if (buckets.body[qt]) sBody += 1;
    });
    return 4 * sKw + 3 * sStack + 2 * sWriting + sBody;
  }

  function readHireQuery() {
    try {
      var q = sessionStorage.getItem(HIRE_QUERY_KEY);
      return q ? String(q).trim() : "";
    } catch (e) {
      return "";
    }
  }

  function clearHireQuery() {
    try {
      sessionStorage.removeItem(HIRE_QUERY_KEY);
    } catch (e) {}
  }

  function setHireMatchBanner(rawQuery, maxScore) {
    var el = document.getElementById("hire-match-banner");
    if (!el) return;
    var preview =
      rawQuery.length > 120 ? rawQuery.slice(0, 117).trim() + "..." : rawQuery;
    el.textContent =
      maxScore > 0
        ? "Work sorted by match to your search: " + preview
        : "No strong keyword overlap with this portfolio yet; showing all projects. Search was: " + preview;
    el.hidden = false;
    el.classList.add("reveal-in");
    el.classList.toggle("hire-match-banner--weak", maxScore <= 0);
    el.setAttribute("aria-live", "polite");
  }

  function hideHireMatchBanner() {
    var el = document.getElementById("hire-match-banner");
    if (!el) return;
    el.hidden = true;
    el.textContent = "";
    el.classList.remove("hire-match-banner--weak");
    el.classList.remove("reveal-in");
  }

  function escapeHtml(s) {
    if (s == null) return "";
    var d = document.createElement("div");
    d.textContent = s;
    return d.innerHTML;
  }

  function externalLinkAttrs(href) {
    if (href && /^https?:\/\//i.test(href)) {
      return ' target="_blank" rel="noopener noreferrer"';
    }
    return "";
  }

  function renderProjectTile(p, opts) {
    opts = opts || {};
    var hireMatchClass = opts.hireMatch ? " project-tile-hire-match" : "";
    var featured = p.featured ? " project-tile-featured" : "";
    var badgeClass = p.badgeSoon ? " project-tile-badge-soon" : "";
    var mediaHref = escapeHtml(p.mediaHref);
    var caseHref = escapeHtml(p.caseHref || p.mediaHref);
    var mediaRel = externalLinkAttrs(p.mediaHref);
    var caseRel = externalLinkAttrs(p.caseHref || p.mediaHref);
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
      hireMatchClass +
      '">' +
      '<a href="' +
      mediaHref +
      '"' +
      mediaRel +
      ' class="project-tile-media" tabindex="-1" aria-hidden="true">' +
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
      '"' +
      caseRel +
      '>' +
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

  function projectsEmptyPlaceholder() {
    return (
      '<article class="project-tile project-tile-placeholder" aria-label="Featured project: coming soon">' +
      '<div class="project-tile-image placeholder-tile" aria-hidden="true">' +
      '<svg class="placeholder-tile-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 8v8M8 12h8"/></svg>' +
      '<span class="placeholder-tile-text">Your project here</span>' +
      "</div>" +
      '<div class="project-tile-content">' +
      '<span class="project-tile-badge project-tile-badge-soon">Coming soon</span>' +
      "<h3 class=\"project-tile-title\">Featured project</h3>" +
      "<p class=\"project-tile-tagline\">A new case study will be added here soon.</p>" +
      "</div>" +
      "</article>"
    );
  }

  var WORK_ROTATOR_SLOTS = 4;
  var WORK_ROTATOR_INTERVAL_MS = 7000;

  function shuffleProjects(projects) {
    var list = projects.slice();
    for (var i = list.length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = list[i];
      list[i] = list[j];
      list[j] = tmp;
    }
    return list;
  }

  function workGridProjects(ordered, offset, slots) {
    var visible = [];
    var n = ordered.length;
    if (!n) return visible;
    var count = Math.min(slots, n);
    for (var i = 0; i < count; i++) {
      visible.push(ordered[(offset + i) % n]);
    }
    return visible;
  }

  function workGridHtml(ordered, offset, slots) {
    return workGridProjects(ordered, offset, slots)
      .map(function (p) {
        return renderProjectTile(p);
      })
      .join("");
  }

  function setWorkGridHtml(grid, html, animate) {
    if (!animate || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      grid.innerHTML = html;
      return;
    }
    grid.classList.add("projects-grid--fade");
    grid.style.opacity = "0";
    window.setTimeout(function () {
      grid.innerHTML = html;
      requestAnimationFrame(function () {
        grid.style.opacity = "1";
      });
    }, 280);
  }

  function orderedProjects(projects) {
    var featured = projects.filter(function (p) {
      return !!p.featured;
    });
    var rest = projects.filter(function (p) {
      return !p.featured;
    });
    return featured.concat(rest);
  }

  function mountMoreAppsGrid(grid, projects) {
    if (!grid) return;
    if (!projects.length) {
      grid.innerHTML = projectsEmptyPlaceholder();
      return;
    }
    grid.innerHTML = orderedProjects(projects)
      .map(function (p) {
        return renderProjectTile(p);
      })
      .join("");
  }

  function mountWorkRotator(grid, projects) {
    var slots = Math.min(WORK_ROTATOR_SLOTS, projects.length);
    var ordered = shuffleProjects(projects);
    var offset = Math.floor(Math.random() * ordered.length);
    var paused = false;
    var timer = null;

    function renderFrame(animate) {
      setWorkGridHtml(grid, workGridHtml(ordered, offset, slots), !!animate);
    }

    function tick() {
      if (paused || ordered.length <= 1) return;
      offset = (offset + 1) % ordered.length;
      renderFrame(true);
    }

    renderFrame(false);

    if (ordered.length <= 1) return;

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timer = window.setInterval(tick, WORK_ROTATOR_INTERVAL_MS);
    }

    grid.addEventListener("mouseenter", function () {
      paused = true;
    });
    grid.addEventListener("mouseleave", function () {
      paused = false;
    });
    grid.addEventListener("focusin", function () {
      paused = true;
    });
    grid.addEventListener("focusout", function (e) {
      if (!grid.contains(e.relatedTarget)) paused = false;
    });

    return function stop() {
      if (timer) window.clearInterval(timer);
    };
  }

  /**
   * Hire page: live portfolio matches on the same page.
   * Reuses scoring + renderProjectTile so visuals match the Work grid exactly.
   * Empty input → centered hero. Non-empty → all projects sorted by match,
   * banner, and `.hire-main--has-results` morphs the layout to top-aligned.
   */
  function mountHire(data) {
    var input = document.getElementById("hire-search-query");
    var results = document.getElementById("hire-results");
    var grid = document.getElementById("hire-results-grid");
    var banner = document.getElementById("hire-results-banner");
    var main = document.getElementById("hire-main");
    var form = document.getElementById("hire-search-form");
    if (!input || !results || !grid) return;

    var projects = (data.projects || []).slice();
    if (!projects.length) return;
    var writingByHref = buildWritingIndex(data.writingHome);

    function setLayoutHasResults(active) {
      if (!main) return;
      main.classList.toggle("hire-main--has-results", !!active);
    }

    function setBanner(rawQuery, maxScore) {
      if (!banner) return;
      var preview =
        rawQuery.length > 120 ? rawQuery.slice(0, 117).trim() + "..." : rawQuery;
      banner.textContent =
        maxScore > 0
          ? "Work sorted by match to your search: " + preview
          : "No strong keyword overlap with this portfolio yet; showing all projects. Search was: " +
            preview;
      banner.hidden = false;
      banner.classList.toggle("hire-match-banner--weak", maxScore <= 0);
    }

    function clearResults() {
      grid.innerHTML = "";
      results.hidden = true;
      if (banner) {
        banner.hidden = true;
        banner.textContent = "";
        banner.classList.remove("hire-match-banner--weak");
      }
      setLayoutHasResults(false);
    }

    function update() {
      var raw = (input.value || "").trim();
      if (!raw) {
        clearResults();
        return;
      }
      var rawTokens = tokenize(raw);
      var qExpanded = expandQueryTokens(rawTokens);
      if (!qExpanded.length && rawTokens.length) qExpanded = rawTokens.slice();

      var scored = projects.map(function (p, i) {
        var b = projectMatchBuckets(p, writingByHref);
        var score = qExpanded.length
          ? scoreProjectAgainstQuery(qExpanded, b)
          : 0;
        return { p: p, i: i, score: score, featured: !!p.featured };
      });
      var maxScore = 0;
      scored.forEach(function (r) {
        if (r.score > maxScore) maxScore = r.score;
      });
      scored.sort(function (a, b) {
        if (b.score !== a.score) return b.score - a.score;
        if (Boolean(b.featured) !== Boolean(a.featured))
          return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
        return a.i - b.i;
      });
      grid.innerHTML = scored
        .map(function (r) {
          return renderProjectTile(r.p, {
            hireMatch: r.score > 0 && maxScore > 0
          });
        })
        .join("");
      results.hidden = false;
      setBanner(raw, maxScore);
      setLayoutHasResults(true);
    }

    function scrollResultsIntoView() {
      if (!results || results.hidden) return;
      requestAnimationFrame(function () {
        results.scrollIntoView({ block: "start", behavior: "smooth" });
      });
    }

    var debounceId = null;
    input.addEventListener("input", function () {
      if (debounceId) clearTimeout(debounceId);
      debounceId = setTimeout(update, 120);
    });

    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (debounceId) clearTimeout(debounceId);
        update();
        scrollResultsIntoView();
      });
    }

    requestAnimationFrame(function () {
      input.focus();
    });

    update();
  }

  function mount(data) {
    var writingByHref = buildWritingIndex(data.writingHome);
    var grid = document.getElementById("projects-grid-root");
    if (grid) {
      var projects = data.projects || [];
      if (projects.length) {
        var hireQ = readHireQuery();
        if (hireQ) {
          var rawTokens = tokenize(hireQ);
          var qExpanded = expandQueryTokens(rawTokens);
          if (!qExpanded.length && rawTokens.length) {
            qExpanded = rawTokens.slice();
          }
          var scored = projects.map(function (p, i) {
            var buckets = projectMatchBuckets(p, writingByHref);
            var score =
              qExpanded.length > 0
                ? scoreProjectAgainstQuery(qExpanded, buckets)
                : 0;
            return {
              p: p,
              i: i,
              score: score,
              featured: !!p.featured
            };
          });
          var maxScore = 0;
          scored.forEach(function (row) {
            if (row.score > maxScore) maxScore = row.score;
          });
          scored.sort(function (a, b) {
            if (b.score !== a.score) return b.score - a.score;
            if (Boolean(b.featured) !== Boolean(a.featured))
              return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
            return a.i - b.i;
          });
          setHireMatchBanner(hireQ, maxScore);
          clearHireQuery();
          grid.innerHTML =
            scored
              .map(function (row) {
                return renderProjectTile(row.p, {
                  hireMatch: row.score > 0 && maxScore > 0
                });
              })
              .join("");
        } else {
          hideHireMatchBanner();
          mountWorkRotator(grid, projects);
        }
      } else {
        hideHireMatchBanner();
        grid.innerHTML = projectsEmptyPlaceholder();
      }
    }

    mountMoreAppsGrid(
      document.getElementById("more-apps-grid-root"),
      data.projects || []
    );

    mountHire(data);
    try {
      window.dispatchEvent(new Event("kv-site-content-mounted"));
    } catch (e) {}
  }

  var url = "data/site-content.json";
  fetch(url)
    .then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    })
    .then(mount)
    .catch(function () {
      hideHireMatchBanner();
      var grid = document.getElementById("projects-grid-root");
      if (grid && !grid.querySelector(".project-tile")) {
        grid.innerHTML =
          '<p class="content-load-error" role="alert">Could not load site content. Serve the site over HTTP (e.g. <code>npm run dev</code>) and ensure <code>data/site-content.json</code> exists.</p>';
      }
      var moreAppsGrid = document.getElementById("more-apps-grid-root");
      if (moreAppsGrid && !moreAppsGrid.querySelector(".project-tile")) {
        moreAppsGrid.innerHTML =
          '<p class="content-load-error" role="alert">Could not load site content. Serve the site over HTTP (e.g. <code>npm run dev</code>) and ensure <code>data/site-content.json</code> exists.</p>';
      }
      var hireResults = document.getElementById("hire-results");
      var hireBanner = document.getElementById("hire-results-banner");
      if (hireResults && hireBanner) {
        hireResults.hidden = false;
        hireBanner.hidden = false;
        hireBanner.classList.add("hire-match-banner--weak");
        hireBanner.textContent =
          "Could not load portfolio content. Try refreshing or open the homepage Work section.";
      }
    });
})();
