/**
 * erotik.com Onboarding – Internationalization (DE / EN)
 */
const translations = {
  de: {
    // Step 1 – Welcome
    "welcome.title": "Willkommen bei erotik.com",
    "welcome.subtitle": "Hilf uns, dein Erlebnis zu personalisieren. Es dauert nur eine Minute.",
    "welcome.start": "Los geht's",

    // Step 2 – Content language
    "language.title": "In welcher Sprache schaust du am liebsten?",
    "language.german": "Deutsch",
    "language.english": "Englisch",
    "language.french": "Französisch",
    "language.spanish": "Spanisch",
    "language.any": "Egal / Alle",

    // Step 3 – Content interests
    "interests.title": "Welche Art von Content interessiert dich?",
    "interests.subtitle": "Wähle alles aus, was dich anspricht.",
    "interests.movies": "Filme",
    "interests.series": "Serien",
    "interests.clips": "Clips & Kurzvideos",
    "interests.livecams": "Live-Cams",
    "interests.amateur": "Amateur",
    "interests.premium": "Premium / Studio",

    // Step 4 – Budget
    "budget.title": "Wie viel möchtest du monatlich ausgeben?",
    "budget.free": "Nur kostenlose Inhalte",
    "budget.low": "Bis 10 € / Monat",
    "budget.medium": "10–30 € / Monat",
    "budget.high": "30+ € / Monat",
    "budget.flexible": "Flexibel / Keine Grenze",

    // Step 5 – Categories
    "categories.title": "Was sind deine Vorlieben?",
    "categories.subtitle": "Markiere Kategorien als Favorit oder No-Go.",
    "categories.romantic": "Romantik",
    "categories.hardcore": "Hardcore",
    "categories.fetish": "Fetisch",
    "categories.bdsm": "BDSM",
    "categories.lesbian": "Lesbisch",
    "categories.gay": "Schwul",
    "categories.milf": "MILF",
    "categories.anal": "Anal",
    "categories.threesome": "Dreier / Gruppensex",
    "categories.voyeur": "Voyeur",

    // Step 6 – Summary
    "summary.title": "Deine Auswahl im Überblick",
    "summary.subtitle": "Hier siehst du deine Präferenzen. Du kannst sie jederzeit in deinem Profil ändern.",
    "summary.finish": "Erlebnis starten",
    "summary.contentLanguage": "Content-Sprache",
    "summary.contentInterests": "Content-Interessen",
    "summary.budget": "Budget",
    "summary.categoriesGoTo": "Go-To Kategorien",
    "summary.categoriesNoGo": "No-Go Kategorien",
    "summary.none": "Keine Auswahl",

    // Navigation
    "nav.back": "Zurück",
    "nav.next": "Weiter",
  },

  en: {
    // Step 1 – Welcome
    "welcome.title": "Welcome to erotik.com",
    "welcome.subtitle": "Help us personalise your experience. It only takes a minute.",
    "welcome.start": "Let's go",

    // Step 2 – Content language
    "language.title": "What language do you prefer to watch in?",
    "language.german": "German",
    "language.english": "English",
    "language.french": "French",
    "language.spanish": "Spanish",
    "language.any": "Any / All",

    // Step 3 – Content interests
    "interests.title": "What type of content are you interested in?",
    "interests.subtitle": "Select everything that appeals to you.",
    "interests.movies": "Movies",
    "interests.series": "Series",
    "interests.clips": "Clips & Short Videos",
    "interests.livecams": "Live Cams",
    "interests.amateur": "Amateur",
    "interests.premium": "Premium / Studio",

    // Step 4 – Budget
    "budget.title": "How much would you like to spend per month?",
    "budget.free": "Free content only",
    "budget.low": "Up to €10 / month",
    "budget.medium": "€10–30 / month",
    "budget.high": "€30+ / month",
    "budget.flexible": "Flexible / No limit",

    // Step 5 – Categories
    "categories.title": "What are your preferences?",
    "categories.subtitle": "Mark categories as favourite or no-go.",
    "categories.romantic": "Romantic",
    "categories.hardcore": "Hardcore",
    "categories.fetish": "Fetish",
    "categories.bdsm": "BDSM",
    "categories.lesbian": "Lesbian",
    "categories.gay": "Gay",
    "categories.milf": "MILF",
    "categories.anal": "Anal",
    "categories.threesome": "Threesome / Group",
    "categories.voyeur": "Voyeur",

    // Step 6 – Summary
    "summary.title": "Your selection at a glance",
    "summary.subtitle": "Here are your preferences. You can change them anytime in your profile.",
    "summary.finish": "Start your experience",
    "summary.contentLanguage": "Content Language",
    "summary.contentInterests": "Content Interests",
    "summary.budget": "Budget",
    "summary.categoriesGoTo": "Go-To Categories",
    "summary.categoriesNoGo": "No-Go Categories",
    "summary.none": "No selection",

    // Navigation
    "nav.back": "Back",
    "nav.next": "Next",
  },
};

/**
 * Apply translations to all elements with [data-i18n]
 */
function applyTranslations(lang) {
  const t = translations[lang];
  if (!t) return;

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (t[key]) {
      el.textContent = t[key];
    }
  });

  document.documentElement.setAttribute("data-lang", lang);
  document.documentElement.setAttribute("lang", lang);
}

/**
 * Get a single translation string
 */
function t(key, lang) {
  const currentLang = lang || document.documentElement.getAttribute("data-lang") || "de";
  return (translations[currentLang] && translations[currentLang][key]) || key;
}
