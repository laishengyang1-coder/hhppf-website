/**
 * H&H Website Scroll Animations (Deep-link & Viewport Safe)
 */
(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReducedMotion) {
    document.body.classList.add("reduced-motion");
    return;
  }

  const header = document.querySelector(".site-header");
  let ticking = false;

  function updateHeader() {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 40);
    }
    ticking = false;
  }

  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHeader);
        ticking = true;
      }
    },
    { passive: true },
  );
  updateHeader();

  function revealElement(el) {
    el.classList.add("is-visible");
    const staggerChildren = el.querySelectorAll(".stagger-child");
    staggerChildren.forEach((child, index) => {
      child.style.transitionDelay = `${Math.min(index * 60, 300)}ms`;
      child.classList.add("is-visible");
    });
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < window.innerHeight * 0.92) {
          revealElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      root: null,
      rootMargin: "0px 0px -6% 0px",
      threshold: 0.05,
    },
  );

  function initScrollAnimations() {
    const fadeUpElements = document.querySelectorAll(
      [
        ".intro-band .section-kicker",
        ".intro-band h2",
        ".intro-band .intro-copy",
        ".strength .split-heading",
        ".quality-heading",
        ".products .split-heading",
        ".spec-hub",
        ".product-cta",
        ".color-system-heading",
        ".color-board",
        ".applications .split-heading",
        ".partner-grid > div",
      ].join(","),
    );

    const staggerGroups = [
      [".story-pillars", "article"],
      [".stat-grid", "article"],
      [".capability-row", "article"],
      [".certification-grid", ".cert-card"],
      [".product-grid", ".product-card"],
      [".finish-showcase-grid", ".finish-card"],
      [".application-grid", "figure"],
    ];

    fadeUpElements.forEach((el) => {
      el.classList.add("fade-up-element");
      if (el.getBoundingClientRect().top < window.innerHeight) {
        revealElement(el);
      } else {
        observer.observe(el);
      }
    });

    staggerGroups.forEach(([containerSel, childSel]) => {
      document.querySelectorAll(containerSel).forEach((container) => {
        container.querySelectorAll(childSel).forEach((child) => child.classList.add("stagger-child"));
        if (container.getBoundingClientRect().top < window.innerHeight) {
          revealElement(container);
        } else {
          observer.observe(container);
        }
      });
    });

    // Ensure hash navigation (#products, #partner, etc.) never leaves passed sections hidden
    function revealPassedElements() {
      document.querySelectorAll(".fade-up-element:not(.is-visible)").forEach((el) => {
        if (el.getBoundingClientRect().top <= window.innerHeight + 80) {
          revealElement(el);
          observer.unobserve(el);
        }
      });
      staggerGroups.forEach(([containerSel]) => {
        document.querySelectorAll(containerSel).forEach((container) => {
          if (container.getBoundingClientRect().top <= window.innerHeight + 80) {
            revealElement(container);
            observer.unobserve(container);
          }
        });
      });
    }

    window.addEventListener("hashchange", () => setTimeout(revealPassedElements, 120));
    if (window.location.hash) {
      setTimeout(revealPassedElements, 150);
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initScrollAnimations);
  } else {
    initScrollAnimations();
  }
})();
