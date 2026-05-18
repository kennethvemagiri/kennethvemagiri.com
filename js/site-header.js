/**
 * Shared site header for all public pages.
 */
(function () {
  "use strict";

  var CV_HREF =
    "https://drive.google.com/file/d/1QpQsFC5iXIy58hskv6QNXf7R0Y5VuiGV/view?usp=sharing";

  function assetRoot() {
    var path = window.location.pathname.replace(/\\/g, "/");
    if (/\/featured-projects\/[^/]+\//.test(path) || /\/insights\/[^/]+\//.test(path)) {
      return "../../";
    }
    if (/\/blog\//.test(path) || /\/productive_version\//.test(path)) {
      return "../";
    }
    return "";
  }

  function isHomePage() {
    if (assetRoot()) return false;
    var path = window.location.pathname.replace(/\\/g, "/");
    return (
      path === "/" ||
      path === "" ||
      /\/index\.html$/i.test(path)
    );
  }

  function homeHref(section) {
    var root = assetRoot();
    if (isHomePage()) return "#" + section;
    return root + "index.html#" + section;
  }

  function isProductiveVersionPage() {
    return /\/productive_version\/?/i.test(
      window.location.pathname.replace(/\\/g, "/")
    );
  }

  function render() {
    var header = document.querySelector("header.site-header");
    if (!header) return;

    var root = assetRoot();
    var hireCurrent =
      /\/hire\.html$/i.test(window.location.pathname) ? ' aria-current="page"' : "";
    var switchNavItem = isProductiveVersionPage()
      ? '<li><a href="' + root + 'index.html#home">Portfolio</a></li>'
      : '<li><a href="' +
        root +
        'productive_version/">Developer View</a></li>';
    var brandMarkup = isProductiveVersionPage()
      ? '<div class="nav-brand">' +
        '<a href="' +
        homeHref("home") +
        '" class="nav-logo">KV</a>' +
        '<p class="nav-availability" aria-label="Open to work">' +
        '<span class="nav-availability-dot" aria-hidden="true"></span>' +
        "Open to Work</p></div>"
      : '<a href="' +
        homeHref("home") +
        '" class="nav-logo">KV</a>';

    header.innerHTML =
      '<nav class="nav" aria-label="Main navigation">' +
      brandMarkup +
      '<button class="nav-toggle" aria-label="Toggle menu" aria-expanded="false">' +
      "<span></span><span></span><span></span>" +
      "</button>" +
      '<ul class="nav-links" id="nav-links">' +
      '<li class="nav-close-wrap"><button type="button" class="nav-close" aria-label="Close menu">← Back</button></li>' +
      '<li><a href="' +
      homeHref("work") +
      '">Work</a></li>' +
      '<li><a href="' +
      homeHref("about") +
      '">About</a></li>' +
      '<li><a href="' +
      root +
      'hire.html"' +
      hireCurrent +
      ">Hire Me</a></li>" +
      '<li><a href="' +
      homeHref("contact") +
      '">Contact</a></li>' +
      '<li><a href="' +
      CV_HREF +
      '" class="nav-cv" target="_blank" rel="noopener noreferrer">View CV</a></li>' +
      switchNavItem +
      "</ul></nav>";
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", render);
  } else {
    render();
  }
})();
