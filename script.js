document.addEventListener("DOMContentLoaded", () => {
  // === Burger-Menü ===
  const menuToggle = document.getElementById("menu-toggle");
  const navLinks = document.getElementById("nav-links");

  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("show");
    menuToggle.textContent = navLinks.classList.contains("show") ? "✖" : "☰";
  });

  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("show");
      menuToggle.textContent = "☰";
    });
  });

  // === Logo → Scroll to Home ===
  const logo = document.getElementById("logo");
  logo.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("home").scrollIntoView({ behavior: "smooth" });
  });

  // === Typing Effekt ===
  const words = ["moderne Websites", "klare Interfaces", "responsives Design"];
  const typingEl = document.querySelector(".typing");
  let i = 0, j = 0, deleting = false;
  function typing() {
    if (!deleting && j < words[i].length) {
      typingEl.textContent += words[i][j++];
    } else if (deleting && j > 0) {
      typingEl.textContent = typingEl.textContent.slice(0, --j);
    } else if (!deleting && j === words[i].length) {
      deleting = true;
      setTimeout(typing, 1200);
      return;
    } else if (deleting && j === 0) {
      deleting = false;
      i = (i + 1) % words.length;
    }
    setTimeout(typing, deleting ? 60 : 100);
  }
  typing();

  // === Scroll-Reveal ===
  const revealEls = document.querySelectorAll(".reveal");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => observer.observe(el));

  // === Scroll-to-Top ===
  const scrollBtn = document.getElementById("scrollTopBtn");
  window.addEventListener("scroll", () => {
    scrollBtn.style.display = window.scrollY > 400 ? "flex" : "none";
  });
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // === Active Nav Highlight ===
  const sections = document.querySelectorAll("section");
  const navAnchors = document.querySelectorAll(".nav-links a");
  const spy = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navAnchors.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
      }
    });
  }, { threshold: 0.6 });
  sections.forEach(s => spy.observe(s));
});
