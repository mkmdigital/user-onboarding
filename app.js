/**
 * erotik.com – VOD Customer Onboarding
 * Main application logic
 */
(function () {
  "use strict";

  const TOTAL_STEPS = 8;
  let currentStep = 1;
  let currentLang = "de";

  // User selections state
  const state = {
    contentLanguage: null,
    contentInterests: [],
    budget: null,
    categories: {},
  };

  // ---- DOM references ----
  const app = document.getElementById("onboarding-app");
  const progressBar = document.getElementById("progress-bar");
  const langButtons = document.querySelectorAll(".lang-btn");
  const summaryContent = document.getElementById("summary-content");

  // ---- Initialization ----
  function init() {
    updateProgress();
    bindLangToggle();
    bindNavigation();
    bindOptionCards();
    bindCategoryButtons();
    bindFinish();
    bindFaqAccordion();
    bindSupportLinks();
    setLang("de");
  }

  // ---- Progress bar ----
  function updateProgress() {
    const pct = (currentStep / TOTAL_STEPS) * 100;
    progressBar.style.width = pct + "%";
  }

  // ---- Step navigation ----
  function goToStep(step) {
    if (step < 1 || step > TOTAL_STEPS) return;

    const allSteps = document.querySelectorAll(".onboarding__step");
    allSteps.forEach((s) => (s.hidden = true));

    const target = document.querySelector('[data-step="' + step + '"]');
    if (target) {
      target.hidden = false;
      currentStep = step;
      updateProgress();

      if (step === TOTAL_STEPS) {
        renderSummary();
      }
    }
  }

  function bindNavigation() {
    app.addEventListener("click", function (e) {
      const nextBtn = e.target.closest("[data-next]");
      const prevBtn = e.target.closest("[data-prev]");

      if (nextBtn) {
        goToStep(currentStep + 1);
      } else if (prevBtn) {
        goToStep(currentStep - 1);
      }
    });
  }

  // ---- Language toggle ----
  function setLang(lang) {
    currentLang = lang;
    langButtons.forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-lang") === lang);
    });
    applyTranslations(lang);
    // Re-render summary if on that step
    if (currentStep === TOTAL_STEPS) {
      renderSummary();
    }
  }

  function bindLangToggle() {
    langButtons.forEach((btn) => {
      btn.addEventListener("click", function () {
        setLang(this.getAttribute("data-lang"));
      });
    });
  }

  // ---- Option cards (single & multi select) ----
  function bindOptionCards() {
    app.addEventListener("click", function (e) {
      const card = e.target.closest(".option-card");
      if (!card) return;

      const container = card.closest(".onboarding__options");
      if (!container) return;

      const name = container.getAttribute("data-name");
      const type = container.getAttribute("data-type");
      const value = card.getAttribute("data-value");

      if (type === "single") {
        // Deselect all in this group, select this one
        container.querySelectorAll(".option-card").forEach((c) => c.classList.remove("selected"));
        card.classList.add("selected");
        state[name] = value;

        // Auto-advance after short delay for single-select
        setTimeout(function () {
          goToStep(currentStep + 1);
        }, 250);
      } else if (type === "multi") {
        card.classList.toggle("selected");
        // Update state array
        const selected = [];
        container.querySelectorAll(".option-card.selected").forEach(function (c) {
          selected.push(c.getAttribute("data-value"));
        });
        state[name] = selected;
      }
    });
  }

  // ---- Category go/neutral/nogo buttons ----
  function bindCategoryButtons() {
    app.addEventListener("click", function (e) {
      const catBtn = e.target.closest(".cat-btn");
      if (!catBtn) return;

      const row = catBtn.closest(".category-row");
      if (!row) return;

      const category = row.getAttribute("data-category");
      const action = catBtn.getAttribute("data-action");

      // Toggle: if same button is active, deactivate
      const wasActive = catBtn.classList.contains("active");

      // Deselect all in this row
      row.querySelectorAll(".cat-btn").forEach((b) => b.classList.remove("active"));

      if (!wasActive) {
        catBtn.classList.add("active");
        state.categories[category] = action;
      } else {
        delete state.categories[category];
      }
    });
  }

  // ---- Summary rendering ----
  function renderSummary() {
    const none = t("summary.none");

    // Content language
    const langMap = {
      de: t("language.german"),
      en: t("language.english"),
      fr: t("language.french"),
      es: t("language.spanish"),
      any: t("language.any"),
    };

    // Interest labels
    const interestMap = {
      movies: t("interests.movies"),
      series: t("interests.series"),
      clips: t("interests.clips"),
      livecams: t("interests.livecams"),
      amateur: t("interests.amateur"),
      premium: t("interests.premium"),
    };

    // Budget labels
    const budgetMap = {
      free: t("budget.free"),
      low: t("budget.low"),
      medium: t("budget.medium"),
      high: t("budget.high"),
      flexible: t("budget.flexible"),
    };

    // Category labels
    const catLabelMap = {
      romantic: t("categories.romantic"),
      hardcore: t("categories.hardcore"),
      fetish: t("categories.fetish"),
      bdsm: t("categories.bdsm"),
      lesbian: t("categories.lesbian"),
      gay: t("categories.gay"),
      milf: t("categories.milf"),
      anal: t("categories.anal"),
      threesome: t("categories.threesome"),
      voyeur: t("categories.voyeur"),
    };

    // Build go / nogo lists
    const goList = [];
    const nogoList = [];
    Object.entries(state.categories).forEach(function (entry) {
      var cat = entry[0];
      var action = entry[1];
      var label = catLabelMap[cat] || cat;
      if (action === "go") goList.push(label);
      else if (action === "nogo") nogoList.push(label);
    });

    var html = "";

    // Content language
    html +=
      '<div class="summary__section">' +
      '<div class="summary__section-title">' + t("summary.contentLanguage") + "</div>" +
      '<div class="summary__section-value">' + (langMap[state.contentLanguage] || none) + "</div>" +
      "</div>";

    // Interests
    var interestLabels = (state.contentInterests || []).map(function (v) {
      return interestMap[v] || v;
    });
    html +=
      '<div class="summary__section">' +
      '<div class="summary__section-title">' + t("summary.contentInterests") + "</div>" +
      '<div class="summary__section-value">' + (interestLabels.length > 0 ? interestLabels.join(", ") : none) + "</div>" +
      "</div>";

    // Budget
    html +=
      '<div class="summary__section">' +
      '<div class="summary__section-title">' + t("summary.budget") + "</div>" +
      '<div class="summary__section-value">' + (budgetMap[state.budget] || none) + "</div>" +
      "</div>";

    // Go-To categories
    html +=
      '<div class="summary__section">' +
      '<div class="summary__section-title">' + t("summary.categoriesGoTo") + "</div>" +
      '<div class="summary__section-value">' +
      (goList.length > 0
        ? goList.map(function (l) { return '<span class="summary__tag summary__tag--go">' + l + "</span>"; }).join(" ")
        : none) +
      "</div>" +
      "</div>";

    // No-Go categories
    html +=
      '<div class="summary__section">' +
      '<div class="summary__section-title">' + t("summary.categoriesNoGo") + "</div>" +
      '<div class="summary__section-value">' +
      (nogoList.length > 0
        ? nogoList.map(function (l) { return '<span class="summary__tag summary__tag--nogo">' + l + "</span>"; }).join(" ")
        : none) +
      "</div>" +
      "</div>";

    summaryContent.innerHTML = html;
  }

  // ---- Finish button ----
  function bindFinish() {
    document.getElementById("btn-finish").addEventListener("click", function () {
      var payload = {
        contentLanguage: state.contentLanguage,
        contentInterests: state.contentInterests,
        budget: state.budget,
        categories: state.categories,
      };

      // Dispatch custom event for embedding integrations
      var event = new CustomEvent("onboarding:complete", { detail: payload });
      document.dispatchEvent(event);

      console.log("Onboarding complete:", JSON.stringify(payload, null, 2));
      alert(currentLang === "de"
        ? "Vielen Dank! Dein personalisiertes Erlebnis wird vorbereitet."
        : "Thank you! Your personalised experience is being prepared.");
    });
  }

  // ---- FAQ accordion (only one open at a time) ----
  function bindFaqAccordion() {
    var faqList = document.getElementById("faq-list");
    if (!faqList) return;

    faqList.addEventListener("click", function (e) {
      var clickedDetails = e.target.closest("details");
      if (!clickedDetails) return;

      faqList.querySelectorAll("details[open]").forEach(function (d) {
        if (d !== clickedDetails) d.removeAttribute("open");
      });
    });
  }

  // ---- Support links (dispatch custom event for chat) ----
  function bindSupportLinks() {
    app.addEventListener("click", function (e) {
      var chatLink = e.target.closest('[data-action="open-chat"]');
      if (chatLink) {
        e.preventDefault();
        document.dispatchEvent(new CustomEvent("onboarding:openChat"));
      }
    });
  }

  // ---- Close button ----
  document.getElementById("btn-close").addEventListener("click", function () {
    var event = new CustomEvent("onboarding:close");
    document.dispatchEvent(event);

    if (confirm(currentLang === "de"
      ? "Möchtest du das Onboarding wirklich abbrechen?"
      : "Do you really want to cancel the onboarding?")) {
      console.log("Onboarding cancelled.");
    }
  });

  // ---- Start ----
  init();
})();
