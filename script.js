// Sicherstellen, dass DOM bereit ist
document.addEventListener("DOMContentLoaded", () => {
  /* ============ Burger-Menü ============ */
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks   = document.getElementById("nav-links");

  function toggleMenu(forceOpen = null){
    const willOpen = forceOpen !== null ? forceOpen : !navLinks.classList.contains("show");
    navLinks.classList.toggle("show", willOpen);
    menuToggle.setAttribute("aria-expanded", String(willOpen));
    menuToggle.textContent = willOpen ? "✖" : "☰";
  }

  menuToggle.addEventListener("click", (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Menü schließen beim Klick außerhalb
  document.addEventListener("click", (e) => {
    if (navLinks.classList.contains("show") && !navLinks.contains(e.target) && e.target !== menuToggle) {
      toggleMenu(false);
    }
  });

  // Menü schließen bei ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && navLinks.classList.contains("show")) toggleMenu(false);
  });

  // Menü schließen beim Klick auf Link
  navLinks.querySelectorAll("a").forEach(a => {
    a.addEventListener("click", () => toggleMenu(false));
  });

  /* ============ Logo klick → nach oben (Home) ============ */
  const logo = document.getElementById("logo");
  if (logo){
    logo.addEventListener("click", (e) => {
      // Standardanker reicht, aber wir sorgen für sanftes Scrollen:
      const home = document.getElementById("home");
      if (home){
        e.preventDefault();
        home.scrollIntoView({ behavior: "smooth", block: "start" });
        toggleMenu(false);
      }
    });
  }

  /* ============ Typing Effekt ============ */
  const words = ["moderne Websites", "responsive Designs", "klaren Code"];
  const typingSpan = document.querySelector(".typing");
  let wordIndex = 0, charIndex = 0, deleting = false;

  function typeLoop(){
    const current = words[wordIndex];
    if (!deleting){
      typingSpan.textContent = current.slice(0, ++charIndex);
      if (charIndex === current.length){
        deleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      typingSpan.textContent = current.slice(0, --charIndex);
      if (charIndex === 0){
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
      }
    }
    setTimeout(typeLoop, deleting ? 50 : 100);
  }
  if (typingSpan) typeLoop();

  /* ============ Reveal bei Scroll (IntersectionObserver) ============ */
  const revealEls = document.querySelectorAll(".reveal");
  const revObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        entry.target.classList.add("active");
        revObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revObs.observe(el));

  /* ============ Active-Nav beim Scroll ============ */
  const sections = document.querySelectorAll("section");
  const navAnchors = document.querySelectorAll(".nav-links a");
  const spyObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting){
        const id = entry.target.getAttribute("id");
        navAnchors.forEach(a => {
          a.classList.toggle("active", a.getAttribute("href") === `#${id}`);
        });
      }
    });
  }, { threshold: 0.6 });
  sections.forEach(s => spyObs.observe(s));

  /* ============ Scroll-to-Top Button ============ */
  const scrollBtn = document.getElementById("scrollTopBtn");
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = (window.scrollY > 500) ? "flex" : "none";
  });
  scrollBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
});
