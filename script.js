// === Sprachumschaltung ===
document.addEventListener("DOMContentLoaded", () => {
  const langSwitch = document.getElementById("langSwitch");
  const transEls = document.querySelectorAll(".tr");

  function applyTranslations(lang) {
    transEls.forEach(el => {
      const text = el.getAttribute(`data-${lang}`);
      if (text) el.textContent = text;
    });
  }

  // Sprache aus localStorage laden oder Standard DE
  let lang = localStorage.getItem("lang") || "de";
  if (langSwitch) {
    langSwitch.checked = (lang === "en");
  }
  applyTranslations(lang);

  // Umschalten
  if (langSwitch) {
    langSwitch.addEventListener("change", () => {
      const langNow = langSwitch.checked ? "en" : "de";
      localStorage.setItem("lang", langNow);
      applyTranslations(langNow);
    });
  }

  // === Burger Menü ===
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    // Menü schließt sich, wenn man Link klickt
    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // === Scroll-To-Top Button ===
  const scrollTopBtn = document.getElementById("scrollTopBtn");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      scrollTopBtn.style.display = "block";
    } else {
      scrollTopBtn.style.display = "none";
    }
  });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // === Scroll Reveal ===
  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const windowHeight = window.innerHeight;
    revealElements.forEach(el => {
      const elementTop = el.getBoundingClientRect().top;
      if (elementTop < windowHeight - 100) {
        el.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll();

  // === Logo-Click → zurück zum Start ===
  const logo = document.getElementById("logo");
  if (logo) {
    logo.addEventListener("click", e => {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (navLinks) navLinks.classList.remove("active");
    });
  }

  // === Typing Effekt ===
  const typing = document.querySelector(".typing");
  if (typing) {
    const words = ["Websites", "Landing Pages", "Frontend Designs"];
    let wordIndex = 0;
    let charIndex = 0;
    let currentWord = "";
    let deleting = false;

    function typeEffect() {
      currentWord = words[wordIndex];
      if (!deleting) {
        typing.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        if (charIndex === currentWord.length) {
          deleting = true;
          setTimeout(typeEffect, 1200);
          return;
        }
      } else {
        typing.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        if (charIndex === 0) {
          deleting = false;
          wordIndex = (wordIndex + 1) % words.length;
        }
      }
      setTimeout(typeEffect, deleting ? 70 : 120);
    }
    typeEffect();
  }
});
