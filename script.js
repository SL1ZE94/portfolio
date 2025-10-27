// ==== Helpers ================================================================
function $(sel, root = document) { return root.querySelector(sel); }
function $all(sel, root = document) { return Array.from(root.querySelectorAll(sel)); }

// ==== Burger-Menü ============================================================
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = $("#menu-toggle");
  const navLinks = $("#nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("show");
      menuToggle.textContent = navLinks.classList.contains("show") ? "✖" : "☰";
    });
    // Links klicken -> Menü zu
    $all("a", navLinks).forEach(a => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("show");
        menuToggle.textContent = "☰";
      });
    });
  }

  // ==== Logo → Home ==========================================================
  const logo = $("#logo");
  if (logo) {
    logo.addEventListener("click", (e) => {
      e.preventDefault();
      const home = $("#home");
      if (home) home.scrollIntoView({ behavior: "smooth", block: "start" });
      navLinks?.classList.remove("show");
      if (menuToggle) menuToggle.textContent = "☰";
    });
  }

  // ==== Scroll-to-Top ========================================================
  const scrollBtn = $("#scrollTopBtn");
  if (scrollBtn) {
    window.addEventListener("scroll", () => {
      scrollBtn.style.display = window.scrollY > 400 ? "flex" : "none";
    });
    scrollBtn.addEventListener("click", () =>
      window.scrollTo({ top: 0, behavior: "smooth" })
    );
  }

  // ==== Scroll-Reveal ========================================================
  const revealEls = $all(".reveal");
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revObs.observe(el));

  // ==== Active Nav on Scroll =================================================
  const sections = $all("section");
  const navAnchors = $all(".nav-links a");
  const spyObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navAnchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
      }
    });
  }, { threshold: 0.6 });
  sections.forEach(s => spyObs.observe(s));

  // ==== Typing Effekt (mit Sprache) =========================================
  const typingEl = $(".typing");
  let typingTimer = null;
  let wordsDE = ["moderne Websites", "klare Interfaces", "responsives Design"];
  let wordsEN = ["modern websites", "clean interfaces", "responsive design"];
  let currentWords = wordsDE;
  let wi = 0, ci = 0, deleting = false;

  function startTyping() {
    if (!typingEl) return;
    // Reset
    clearTimeout(typingTimer);
    typingEl.textContent = "";
    wi = 0; ci = 0; deleting = false;
    loopTyping();
  }

  function loopTyping() {
    const word = currentWords[wi];
    if (!deleting && ci < word.length) {
      typingEl.textContent += word[ci++];
    } else if (!deleting && ci === word.length) {
      deleting = true;
      typingTimer = setTimeout(loopTyping, 1200);
      return;
    } else if (deleting && ci > 0) {
      typingEl.textContent = word.slice(0, --ci);
    } else {
      deleting = false;
      wi = (wi + 1) % currentWords.length;
    }
    typingTimer = setTimeout(loopTyping, deleting ? 50 : 100);
  }

  // ==== Sprachumschaltung ====================================================
  const langSwitch = $("#langSwitch");
  const transEls = $all(".tr");

  function applyTranslations(lang) {
    transEls.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text != null) el.textContent = text;
    });
    // Typing-Wortliste wechseln und Effekt neu starten
    currentWords = (lang === "en") ? wordsEN : wordsDE;
    startTyping();
    // Navi schließen auf Handy
    navLinks?.classList.remove("show");
    if (menuToggle) menuToggle.textContent = "☰";
  }

  // Initial: Sprache aus localStorage oder 'de'
  let lang = localStorage.getItem("lang") || "de";
  if (langSwitch) langSwitch.checked = (lang === "en");
  applyTranslations(lang);

  // Switch Listener
  if (langSwitch) {
    langSwitch.addEventListener("change", () => {
      lang = langSwitch.checked ? "en" : "de";
      localStorage.setItem("lang", lang);
      applyTranslations(lang);
    });
  }

  // Tippen starten (falls noch nicht gestartet)
  startTyping();
});
