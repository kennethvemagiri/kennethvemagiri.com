/**
 * Kenneth Vemagiri – Main script.
 * Footer year, mobile nav, scroll state, about bio filter, contact modal (Formspree).
 */
(function () {
  "use strict";

  // Always start at top on reload/navigate (avoids scroll position restore with scroll-snap)
  if ("scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  window.addEventListener("pageshow", function (ev) {
    // Don't interfere with bfcache restores
    if (ev && ev.persisted) return;
    try {
      var nav = performance.getEntriesByType && performance.getEntriesByType("navigation");
      var navType = nav && nav[0] && nav[0].type;
      if (navType === "reload" || navType === "navigate") {
        window.scrollTo(0, 0);
      }
    } catch (e) {
      window.scrollTo(0, 0);
    }
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

  // --- About: filter (For developers / Explain like I'm a newbie) ---
  var bioFilterBtns = document.querySelectorAll(".bio-filter-btn");
  var bioViews = document.querySelectorAll(".bio-view");
  bioFilterBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var view = btn.getAttribute("data-bio-view");
      if (!view) return;
      bioFilterBtns.forEach(function (b) {
        var isActive = b.getAttribute("data-bio-view") === view;
        b.classList.toggle("is-active", isActive);
        b.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
      bioViews.forEach(function (v) {
        var match = v.getAttribute("data-view") === view;
        if (match) {
          v.removeAttribute("hidden");
        } else {
          v.setAttribute("hidden", "");
        }
      });
    });
  });

  // --- Work: tabs (Projects / Writing) ---
  var workTabBtns = document.querySelectorAll(".work-tab-btn");
  var workViews = document.querySelectorAll(".work-view");
  workTabBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var view = btn.getAttribute("data-work-view");
      if (!view) return;
      workTabBtns.forEach(function (b) {
        var isActive = b.getAttribute("data-work-view") === view;
        b.classList.toggle("is-active", isActive);
        b.setAttribute("aria-pressed", isActive ? "true" : "false");
      });
      workViews.forEach(function (v) {
        var match = v.getAttribute("data-view") === view;
        if (match) v.removeAttribute("hidden");
        else v.setAttribute("hidden", "");
      });
    });
  });

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

  // --- Get in touch popup: open/close modal ---
  var openContactBtn = document.getElementById("open-contact-modal");
  var contactModal = document.getElementById("contact-modal");
  var contactModalBackdrop = document.getElementById("contact-modal-backdrop");
  var closeContactBtn = document.getElementById("close-contact-modal");

  var focusBeforeModal = null;

  function getFocusableElements(container) {
    var selector = "a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex=\"-1\"])";
    return Array.prototype.slice.call(container.querySelectorAll(selector));
  }

  function trapFocus(e) {
    if (e.key !== "Tab" || !contactModal || !contactModal.classList.contains("is-open")) return;
    var focusable = getFocusableElements(contactModal);
    if (focusable.length === 0) return;
    var first = focusable[0];
    var last = focusable[focusable.length - 1];
    if (e.shiftKey) {
      if (document.activeElement === first) {
        e.preventDefault();
        last.focus();
      }
    } else {
      if (document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  }

  function openContactModal() {
    if (!contactModal) return;
    focusBeforeModal = document.activeElement;
    contactModal.classList.add("is-open");
    contactModal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", trapFocus);
    var focusable = getFocusableElements(contactModal);
    var firstInput = contactModal.querySelector("#contact-modal-name");
    if (firstInput) {
      firstInput.focus();
    } else if (closeContactBtn) {
      closeContactBtn.focus();
    } else if (focusable.length > 0) {
      focusable[0].focus();
    }
  }

  function closeContactModal() {
    if (!contactModal) return;
    contactModal.classList.remove("is-open");
    contactModal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", trapFocus);
    if (focusBeforeModal && typeof focusBeforeModal.focus === "function") {
      focusBeforeModal.focus();
    }
  }

  var contactForm = document.getElementById("contact-modal-form");
  var contactModalBox = contactModal ? contactModal.querySelector(".contact-modal-box") : null;
  var contactModalSuccess = document.getElementById("contact-modal-success");
  var contactModalSubmitError = document.getElementById("contact-modal-submit-error");

  if (openContactBtn) {
    openContactBtn.addEventListener("click", function (e) {
      e.preventDefault();
      openContactModal();
      if (contactModalSubmitError) contactModalSubmitError.setAttribute("hidden", "");
    });
  }

  function hasContactFormContent() {
    if (!contactForm) return false;
    var name = (contactForm.querySelector("#contact-modal-name") || {}).value || "";
    var email = (contactForm.querySelector("#contact-modal-email") || {}).value || "";
    var message = (contactForm.querySelector("#contact-modal-message") || {}).value || "";
    return (name.trim() !== "" || email.trim() !== "" || message.trim() !== "");
  }

  function onCloseContactModal() {
    if (hasContactFormContent() && !confirm("You have unsaved changes. Close anyway?")) {
      return;
    }
    closeContactModal();
    if (contactModalBox) contactModalBox.classList.remove("is-sent");
    if (contactModalSuccess) contactModalSuccess.setAttribute("hidden", "");
    if (contactModalSubmitError) contactModalSubmitError.setAttribute("hidden", "");
    if (contactForm) contactForm.classList.remove("is-sending");
  }

  if (closeContactBtn) closeContactBtn.addEventListener("click", onCloseContactModal);
  if (contactModalBackdrop) contactModalBackdrop.addEventListener("click", onCloseContactModal);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && contactModal && contactModal.classList.contains("is-open")) {
      onCloseContactModal();
    }
  });

  // --- Contact form: email validation (format + disposable blocklist) + Formspree submit ---
  var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*\.[a-zA-Z]{2,}$/;
  var disposableDomains = [
    "mailinator.com", "guerrillamail.com", "10minutemail.com", "temp-mail.org", "throwaway.email",
    "fakeinbox.com", "trashmail.com", "yopmail.com", "mailnesia.com", "tempmail.com",
    "getnada.com", "sharklasers.com", "guerrillamail.info", "maildrop.cc", "tempail.com"
  ];

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

  function clearContactValidation(form) {
    var emailInput = form.querySelector("#contact-modal-email");
    var emailError = form.querySelector("#contact-modal-email-error");
    if (emailInput) { emailInput.classList.remove("is-invalid"); emailInput.setAttribute("aria-invalid", "false"); }
    if (emailError) emailError.textContent = "";
  }

  function showContactError(input, errorEl, result) {
    if (!input || !errorEl) return;
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
    errorEl.textContent = result.message;
  }

  if (contactForm && contactModalBox && contactModalSuccess) {
    contactForm.addEventListener("keydown", function (e) {
      if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
        e.preventDefault();
        contactForm.requestSubmit();
      }
    });
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var form = e.target;
      if (contactModalSubmitError) contactModalSubmitError.setAttribute("hidden", "");
      clearContactValidation(form);

      var emailInput = form.querySelector("#contact-modal-email");
      var emailError = form.querySelector("#contact-modal-email-error");

      var emailResult = isValidEmail(emailInput ? emailInput.value : "");

      if (!emailResult.valid) {
        showContactError(emailInput, emailError, emailResult);
        return;
      }

      var action = form.getAttribute("action");
      // Demo mode: no real Formspree ID → show success state without sending
      if (!action || action.indexOf("YOUR_FORM_ID") !== -1) {
        form.classList.add("is-sending");
        setTimeout(function () {
          form.classList.remove("is-sending");
          contactModalBox.classList.add("is-sent");
          contactModalSuccess.removeAttribute("hidden");
          setTimeout(function () {
            onCloseContactModal();
            contactModalBox.classList.remove("is-sent");
            contactModalSuccess.setAttribute("hidden", "");
            form.reset();
          }, 2200);
        }, 1200);
        return;
      }
      form.classList.add("is-sending");
      var formData = new FormData(form);
      fetch(action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" }
      })
        .then(function (res) {
          if (res.ok) {
            contactModalBox.classList.add("is-sent");
            contactModalSuccess.removeAttribute("hidden");
            form.reset();
            setTimeout(function () {
              onCloseContactModal();
              contactModalBox.classList.remove("is-sent");
              contactModalSuccess.setAttribute("hidden", "");
            }, 2200);
          } else {
            throw new Error("Submit failed");
          }
        })
        .catch(function () {
          form.classList.remove("is-sending");
          if (contactModalSubmitError) {
            contactModalSubmitError.removeAttribute("hidden");
          }
        })
        .finally(function () {
          form.classList.remove("is-sending");
        });
    });

    var emailInputEl = contactForm.querySelector("#contact-modal-email");
    if (emailInputEl) {
      emailInputEl.addEventListener("input", function () {
        this.classList.remove("is-invalid");
        this.setAttribute("aria-invalid", "false");
        var err = contactForm.querySelector("#contact-modal-email-error");
        if (err) err.textContent = "";
      });
    }
    // Message field: live character count (0/2000)
    var messageEl = contactForm.querySelector("#contact-modal-message");
    var charCountEl = document.getElementById("contact-modal-char-count");
    if (messageEl && charCountEl) {
      function updateCharCount() {
        charCountEl.textContent = (messageEl.value || "").length;
      }
      messageEl.addEventListener("input", updateCharCount);
      messageEl.addEventListener("change", updateCharCount);
      updateCharCount();
    }
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
