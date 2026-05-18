/**
 * Kenneth Vemagiri - Main script.
 * Footer year, mobile nav, scroll state, inline contact form (Formspree).
 */
(function () {
  "use strict";

  // Always start at top on reload/navigate (avoids scroll position restore with scroll-snap)
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }

  function scrollToElement(el, behavior) {
    if (!el) return;
    el.scrollIntoView({
      block: "start",
      behavior: behavior || "auto"
    });
  }

  function scrollToHashTarget(behavior) {
    var hash = window.location.hash;
    if (!hash || hash.length < 2) {
      window.scrollTo(0, 0);
      return;
    }
    var id = decodeURIComponent(hash.slice(1));
    var target = document.getElementById(id);
    if (!target) return;
    requestAnimationFrame(function () {
      scrollToElement(target, behavior);
    });
  }

  window.addEventListener("pageshow", function (ev) {
    // Don't interfere with bfcache restores
    if (ev && ev.persisted) return;
    try {
      var nav = performance.getEntriesByType && performance.getEntriesByType("navigation");
      var navType = nav && nav[0] && nav[0].type;
      if (navType === "reload" || navType === "navigate") {
        scrollToHashTarget();
      }
    } catch (e) {
      scrollToHashTarget();
    }
  });

  window.addEventListener("kv-site-content-mounted", function () {
    if (!window.location.hash) return;
    requestAnimationFrame(function () {
      scrollToHashTarget("auto");
    });
  });

  // --- Hero: fade-in on load ---
  var heroReveal = document.querySelector(".hero-reveal");
  if (heroReveal) {
    function showHero() {
      heroReveal.classList.add("hero-ready");
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", showHero);
    } else {
      requestAnimationFrame(showHero);
    }
  }

  // --- Hero skill logos: random order (synced pairs), reshuffle each marquee loop ---
  var skillLogoTrack = document.querySelector(".skill-logo-marquee-track");
  var skillLogoUlMain =
    skillLogoTrack &&
    skillLogoTrack.querySelector(".skill-logo-row--marquee:not(.skill-logo-row--dup)");
  var skillLogoUlDup =
    skillLogoTrack && skillLogoTrack.querySelector(".skill-logo-row.skill-logo-row--dup");

  function shuffleSkillLogoMarqueePair() {
    if (!skillLogoUlMain || !skillLogoUlDup) return;
    var mainLis = Array.prototype.slice.call(skillLogoUlMain.children);
    var dupLis = Array.prototype.slice.call(skillLogoUlDup.children);
    var n = mainLis.length;
    if (n < 2 || dupLis.length !== n) return;

    var order = [];
    for (var i = 0; i < n; i++) order.push(i);
    for (var k = n - 1; k > 0; k--) {
      var j = Math.floor(Math.random() * (k + 1));
      var tmp = order[k];
      order[k] = order[j];
      order[j] = tmp;
    }

    var fragM = document.createDocumentFragment();
    var fragD = document.createDocumentFragment();
    order.forEach(function (idx) {
      fragM.appendChild(mainLis[idx]);
      fragD.appendChild(dupLis[idx]);
    });
    skillLogoUlMain.appendChild(fragM);
    skillLogoUlDup.appendChild(fragD);
  }

  function initSkillLogoShuffle() {
    shuffleSkillLogoMarqueePair();
    if (!skillLogoTrack || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }
    skillLogoTrack.addEventListener("animationiteration", function (ev) {
      if (ev.target === skillLogoTrack) {
        shuffleSkillLogoMarqueePair();
      }
    });
  }

  if (skillLogoTrack && skillLogoUlMain && skillLogoUlDup) {
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", initSkillLogoShuffle);
    } else {
      initSkillLogoShuffle();
    }
  }

  // --- Scroll reveal: Projects, Contact ---
  var revealEls = document.querySelectorAll(".reveal");
  if (revealEls.length && "IntersectionObserver" in window) {
    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("reveal-in");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  }

  // --- Footer: current year ---
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // --- Mobile nav: hamburger toggle, close on link click ---
  var navToggle = document.querySelector(".nav-toggle");
  var navLinks = document.querySelector(".nav-links");

  if (navToggle && navLinks) {
    function closeMobileNav() {
      navToggle.setAttribute("aria-expanded", "false");
      navLinks.classList.remove("is-open");
      document.body.style.overflow = "";
    }

    navToggle.addEventListener("click", function () {
      var expanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !expanded);
      navLinks.classList.toggle("is-open");
      document.body.style.overflow = expanded ? "" : "hidden";
    });

    // Close menu when clicking a link or the Back button (for mobile)
    navLinks.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        closeMobileNav();
      });
    });
    var navClose = document.querySelector(".nav-close");
    if (navClose) {
      navClose.addEventListener("click", closeMobileNav);
    }
  }

  // --- About: scroll reveal. Show immediately if section already in view on load (no blank); else when user scrolls it into view. ---
  var aboutSection = document.getElementById("about");
  var bioContent = document.querySelector(".bio-content");
  if (aboutSection && bioContent) {
    var aboutFirstCheck = true;
    var aboutPreviouslyIntersecting = false;
    var aboutObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var nowIntersecting = entry.isIntersecting;
          if (aboutFirstCheck) {
            aboutFirstCheck = false;
            aboutPreviouslyIntersecting = nowIntersecting;
            if (nowIntersecting) bioContent.classList.add("in-view");
            return;
          }
          if (nowIntersecting && !aboutPreviouslyIntersecting) {
            bioContent.classList.add("in-view");
          }
          aboutPreviouslyIntersecting = nowIntersecting;
        });
      },
      { threshold: 0.05, rootMargin: "0px 0px 0px 0px", root: null }
    );
    aboutObserver.observe(aboutSection);
  }

  // --- Scroll: set aria-current on nav link for the section in view ---
  var sections = document.querySelectorAll("section[id]");
  var navAnchors = document.querySelectorAll(".nav-links a[href^='#']");

  function updateActiveNav() {
    var scrollY = window.scrollY || window.pageYOffset;
    var headerHeight = document.querySelector(".site-header")?.offsetHeight || 80;

    sections.forEach(function (section) {
      var id = section.getAttribute("id");
      var top = section.offsetTop - headerHeight;
      var height = section.offsetHeight;

      if (scrollY >= top && scrollY < top + height) {
        navAnchors.forEach(function (anchor) {
          if (anchor.getAttribute("href") === "#" + id) {
            anchor.setAttribute("aria-current", "page");
          } else {
            anchor.removeAttribute("aria-current");
          }
        });
      }
    });
  }

  if (sections.length && navAnchors.length) {
    window.addEventListener("scroll", updateActiveNav, { passive: true });
    updateActiveNav();
  }

  // --- Contact: inline form (email validation + Formspree submit) ---
  var contactInlineForm = document.getElementById("contact-inline-form");
  var contactInlinePanel = document.getElementById("contact-inline-panel");
  var contactInlineSuccess = document.getElementById("contact-inline-success");
  var contactInlineError = document.getElementById("contact-inline-error");
  var contactInlineSubmit = document.getElementById("contact-inline-submit");
  var contactInlineSubmitText = contactInlineSubmit && contactInlineSubmit.querySelector(".contact-inline-submit-text");
  var contactInlineSubmitSending = contactInlineSubmit && contactInlineSubmit.querySelector(".contact-inline-submit-sending");

  var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  var disposableDomains = [
    "mailinator.com", "guerrillamail.com", "10minutemail.com", "temp-mail.org", "throwaway.email",
    "fakeinbox.com", "trashmail.com", "yopmail.com", "mailnesia.com", "tempmail.com",
    "getnada.com", "sharklasers.com", "guerrillamail.info", "maildrop.cc", "tempail.com"
  ];

  function isValidName(name) {
    var trimmed = (name || "").trim();
    if (!trimmed) return { valid: false, message: "Name is required." };
    return { valid: true };
  }

  function isValidEmail(email) {
    var trimmed = (email || "").trim().toLowerCase();
    if (!trimmed) return { valid: false, message: "Email is required." };
    if (!emailRegex.test(trimmed)) return { valid: false, message: "Please enter a valid email address." };
    var domain = trimmed.split("@")[1] || "";
    if (disposableDomains.indexOf(domain) !== -1) {
      return { valid: false, message: "Please use a permanent email address (disposable emails are not accepted)." };
    }
    return { valid: true };
  }

  function isValidMessage(message) {
    var trimmed = (message || "").trim();
    if (!trimmed) return { valid: false, message: "Message is required." };
    return { valid: true };
  }

  function clearContactField(input, errorEl) {
    if (input) {
      input.classList.remove("is-invalid");
      input.setAttribute("aria-invalid", "false");
    }
    if (errorEl) errorEl.textContent = "";
  }

  function clearContactValidation(form) {
    clearContactField(form.querySelector("#contact-name"), form.querySelector("#contact-name-error"));
    clearContactField(form.querySelector("#contact-email"), form.querySelector("#contact-email-error"));
    clearContactField(form.querySelector("#contact-message"), form.querySelector("#contact-message-error"));
  }

  function showContactError(input, errorEl, result) {
    if (!input || !errorEl) return;
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
    errorEl.textContent = result.message;
  }

  function setInlineSending(form, sending) {
    if (!form || !contactInlineSubmit) return;
    form.classList.toggle("is-sending", sending);
    contactInlineSubmit.disabled = sending;
    if (contactInlineSubmitText) contactInlineSubmitText.hidden = sending;
    if (contactInlineSubmitSending) contactInlineSubmitSending.hidden = !sending;
  }

  if (contactInlineForm && contactInlinePanel && contactInlineSuccess) {
    contactInlineForm.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
        contactInlineForm.requestSubmit();
      }
    });
    contactInlineForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var form = e.target;
      if (contactInlineError) contactInlineError.setAttribute("hidden", "");
      clearContactValidation(form);

      var nameInput = form.querySelector("#contact-name");
      var nameError = form.querySelector("#contact-name-error");
      var emailInput = form.querySelector("#contact-email");
      var emailError = form.querySelector("#contact-email-error");
      var messageInput = form.querySelector("#contact-message");
      var messageError = form.querySelector("#contact-message-error");
      var nameResult = isValidName(nameInput ? nameInput.value : "");
      var emailResult = isValidEmail(emailInput ? emailInput.value : "");
      var messageResult = isValidMessage(messageInput ? messageInput.value : "");
      var firstInvalid = null;

      if (!nameResult.valid) {
        showContactError(nameInput, nameError, nameResult);
        firstInvalid = nameInput;
      }
      if (!emailResult.valid) {
        showContactError(emailInput, emailError, emailResult);
        if (!firstInvalid) firstInvalid = emailInput;
      }
      if (!messageResult.valid) {
        showContactError(messageInput, messageError, messageResult);
        if (!firstInvalid) firstInvalid = messageInput;
      }
      if (firstInvalid) {
        firstInvalid.focus();
        return;
      }

      var action = form.getAttribute("action");
      if (!action || action.indexOf("YOUR_FORM_ID") !== -1) {
        setInlineSending(form, true);
        setTimeout(function () {
          setInlineSending(form, false);
          contactInlinePanel.setAttribute("hidden", "");
          contactInlineSuccess.removeAttribute("hidden");
          form.reset();
        }, 900);
        return;
      }

      setInlineSending(form, true);
      var formData = new FormData(form);
      fetch(action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            contactInlinePanel.setAttribute("hidden", "");
            contactInlineSuccess.removeAttribute("hidden");
            form.reset();
          } else {
            throw new Error("Submit failed");
          }
        })
        .catch(function () {
          if (contactInlineError) contactInlineError.removeAttribute("hidden");
        })
        .finally(function () {
          setInlineSending(form, false);
        });
    });

    ["#contact-name", "#contact-email", "#contact-message"].forEach(function (selector) {
      var inputEl = contactInlineForm.querySelector(selector);
      if (!inputEl) return;
      inputEl.addEventListener("input", function () {
        var errorId = this.getAttribute("aria-describedby");
        clearContactField(this, errorId ? document.getElementById(errorId) : null);
      });
    });
  }

  // --- Calendly: popup scheduling (widget.js loads async; fallback opens new tab) ---
  function openCalendlyPopup(url) {
    if (!url || typeof url !== "string") return;
    var trimmed = url.trim();
    if (!trimmed) return;
    if (window.Calendly && typeof window.Calendly.initPopupWidget === "function") {
      window.Calendly.initPopupWidget({ url: trimmed });
    } else {
      window.open(trimmed, "_blank", "noopener,noreferrer");
    }
  }

  document.querySelectorAll(".js-calendly-popup").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var url = btn.getAttribute("data-calendly-url") || "";
      openCalendlyPopup(url);
    });
  });

})();
