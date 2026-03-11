/**
 * erotik.com Onboarding – Embeddable Widget
 *
 * Usage:
 *   <div id="erotik-onboarding"></div>
 *   <script src="embed.js"></script>
 *   <script>
 *     ErotikOnboarding.init({
 *       container: '#erotik-onboarding',
 *       lang: 'de',                         // 'de' | 'en'
 *       onComplete: function(data) { ... },  // callback with user preferences
 *       onClose: function() { ... }          // callback when user closes
 *     });
 *   </script>
 */
(function (global) {
  "use strict";

  var ErotikOnboarding = {
    /**
     * Initialise the onboarding widget inside a given container.
     */
    init: function (options) {
      var opts = options || {};
      var containerSelector = opts.container || "#erotik-onboarding";
      var lang = opts.lang || "de";
      var onComplete = opts.onComplete || function () {};
      var onClose = opts.onClose || function () {};

      var container = document.querySelector(containerSelector);
      if (!container) {
        console.error("[ErotikOnboarding] Container not found:", containerSelector);
        return;
      }

      // Load stylesheet
      if (!document.querySelector('link[href*="style.css"]')) {
        var link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = "style.css";
        document.head.appendChild(link);
      }

      // Fetch HTML, inject, and boot scripts
      fetch("index.html")
        .then(function (res) { return res.text(); })
        .then(function (html) {
          // Extract only the #onboarding-app div
          var parser = new DOMParser();
          var doc = parser.parseFromString(html, "text/html");
          var appNode = doc.getElementById("onboarding-app");

          if (!appNode) {
            console.error("[ErotikOnboarding] Could not find #onboarding-app in index.html");
            return;
          }

          // Add embed class for constrained height
          appNode.classList.add("onboarding--embed");
          container.appendChild(appNode);

          // Load i18n + app scripts
          loadScript("i18n.js", function () {
            loadScript("app.js", function () {
              // Set language
              if (typeof applyTranslations === "function") {
                applyTranslations(lang);
              }
            });
          });

          // Listen for custom events
          document.addEventListener("onboarding:complete", function (e) {
            onComplete(e.detail);
          });

          document.addEventListener("onboarding:close", function () {
            onClose();
          });
        })
        .catch(function (err) {
          console.error("[ErotikOnboarding] Failed to load:", err);
        });
    },
  };

  function loadScript(src, callback) {
    var script = document.createElement("script");
    script.src = src;
    script.onload = callback || function () {};
    document.body.appendChild(script);
  }

  global.ErotikOnboarding = ErotikOnboarding;
})(window);
