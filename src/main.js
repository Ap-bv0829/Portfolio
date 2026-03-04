import "./style.css";

// Navbar scroll effect
const navbar = document.querySelector("#navbar");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

// Scroll Reveal Animation with Intersection Observer
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal");
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add reveal class to sections and observe them
document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
  observer.observe(el);
});

// Update CSS for reveal animations
const revealStyles = `
.reveal-on-scroll {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
}

.reveal-on-scroll.reveal {
  opacity: 1;
  transform: translateY(0);
}
`;
const styleSheet = document.createElement("style");
styleSheet.innerText = revealStyles;
document.head.appendChild(styleSheet);

// Typing effect for Hero
const title = document.querySelector("h1");
const text = title.innerText;
title.innerText = "";
let i = 0;

function type() {
  if (i < text.length) {
    title.innerText += text.charAt(i);
    i++;
    setTimeout(type, 100);
  }
}

window.addEventListener("load", type);
