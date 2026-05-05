/* ============================================
   Scrollytelling Engine — vanilla JS
   No deps, no build step.
   ============================================ */

(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function activateStep(stepEl) {
    const stepsContainer = stepEl.closest(".scrolly__steps");
    if (!stepsContainer) return;

    // Toggle active class on steps
    stepsContainer.querySelectorAll(".step").forEach((s) => {
      s.classList.toggle("is-active", s === stepEl);
    });

    // Update sticky visual on the same scrolly section
    const scrolly = stepsContainer.closest(".scrolly");
    if (!scrolly) return;
    const stepId = stepEl.dataset.step;
    scrolly.querySelectorAll(".visual-state").forEach((v) => {
      v.classList.toggle("is-active", v.dataset.state === stepId);
    });
  }

  function initScrollytelling() {
    const steps = document.querySelectorAll(".step");
    if (!steps.length) return;

    // Activate first step immediately so the visual isn't blank on load
    activateStep(steps[0]);

    if (prefersReduced) {
      // No observer needed; just make all steps visible
      steps.forEach((s) => s.classList.add("is-active"));
      // Show first visual only
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry whose top is closest to the activation line (50% viewport)
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length === 0) return;
        // Pick the topmost visible step
        visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        const topEntry = visible[0];
        if (topEntry && topEntry.target) {
          activateStep(topEntry.target);
        }
      },
      {
        // Activation line: middle of viewport
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    steps.forEach((s) => observer.observe(s));
  }

  // Handle ?returnTo=#step-N: scroll to that step on load
  function handleReturnTo() {
    const params = new URLSearchParams(window.location.search);
    const ret = params.get("returnTo");
    if (!ret) return;
    // Allow both "#step-2" and "step-2"
    const id = ret.startsWith("#") ? ret.slice(1) : ret;
    const target = document.getElementById(id);
    if (target) {
      // Defer so layout settles
      requestAnimationFrame(() => {
        target.scrollIntoView({ behavior: prefersReduced ? "auto" : "smooth", block: "start" });
      });
    }
  }

  // Build cross-page links with returnTo param
  function tagReturnLinks() {
    document.querySelectorAll("[data-link-to]").forEach((a) => {
      const target = a.dataset.linkTo;
      const fromStep = a.closest(".step");
      if (fromStep && fromStep.id) {
        const sep = target.includes("?") ? "&" : "?";
        a.setAttribute("href", target + sep + "returnTo=" + encodeURIComponent("#" + fromStep.id));
      } else {
        a.setAttribute("href", target);
      }
    });
  }

  // Init
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      tagReturnLinks();
      initScrollytelling();
      handleReturnTo();
    });
  } else {
    tagReturnLinks();
    initScrollytelling();
    handleReturnTo();
  }
})();
