// === Navbar Scroll Effekt ===
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(17, 17, 17, 0.85)";
  } else {
    navbar.style.background = "rgba(17, 17, 17, 0.9)";
  }
});

// === Typing Effekt ===
const words = ["moderne Websites", "responsive Designs", "klaren Code"];
let i = 0;
let timer;

function typingEffect() {
  let word = words[i].split("");
  const loopTyping = function() {
    if (word.length > 0) {
      document.querySelector(".typing").textContent += word.shift();
      timer = setTimeout(loopTyping, 100);
    } else {
      setTimeout(deletingEffect, 1500);
    }
  };
  loopTyping();
}

function deletingEffect() {
  let word = words[i].split("");
  const loopDeleting = function() {
    if (word.length > 0) {
      word.pop();
      document.querySelector(".typing").textContent = word.join("");
      timer = setTimeout(loopDeleting, 50);
    } else {
      i = (i + 1) % words.length;
      typingEffect();
    }
  };
  loopDeleting();
}
typingEffect();

// === Scroll Reveal Effekt ===
window.addEventListener("scroll", reveal);

function reveal() {
  const elements = document.querySelectorAll(".reveal");
  for (const el of elements) {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;
    const visiblePoint = 100;
    if (elementTop < windowHeight - visiblePoint) {
      el.classList.add("active");
    }
  }
}
// === Scroll-to-Top Button ===
const scrollBtn = document.getElementById("scrollTopBtn");

// Anzeigen / Verstecken beim Scrollen
window.addEventListener("scroll", () => {
  if (window.scrollY > 400) {
    scrollBtn.style.display = "flex";
  } else {
    scrollBtn.style.display = "none";
  }
});

// Sanft nach oben scrollen
scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

