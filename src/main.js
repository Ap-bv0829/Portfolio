
// Navbar scroll effect
const navbar = document.querySelector("#navbar");
if (navbar) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });
}

// Dynamic Navigation Active State
const currentPath = window.location.pathname;
const navLinks = document.querySelectorAll(".nav-items a");

navLinks.forEach(link => {
  // Remove preexisting active classes
  link.classList.remove("active");
  const linkPath = new URL(link.href).pathname;

  if (currentPath === linkPath || (currentPath === '/' && linkPath === '/index.html')) {
    link.classList.add("active");
  }
});

// Floating Particles Generator
function createParticles() {
  const particleCount = window.innerWidth > 768 ? 15 : 8;

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');

    const size = Math.random() * 60 + 20;
    const duration = Math.random() * 8 + 6;
    const floatDistance = Math.random() * 100 + 50;
    const color = ['var(--primary)', 'var(--secondary)', 'var(--accent)'][Math.floor(Math.random() * 3)];

    particle.style.width = size + 'px';
    particle.style.height = size + 'px';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.background = color;
    particle.style.setProperty('--duration', duration + 's');
    particle.style.setProperty('--float-distance', floatDistance + 'px');
    particle.style.opacity = '0.1';
    particle.style.position = 'fixed';
    particle.style.zIndex = '0';

    document.body.appendChild(particle);
  }
}

// Cursor Tracer Effect
function initCursorTracer() {
  if (window.innerWidth < 768) return; // Disable on mobile

  const tracer = document.createElement('div');
  tracer.classList.add('cursor-tracer');
  document.body.appendChild(tracer);

  document.addEventListener('mousemove', (e) => {
    tracer.classList.add('active');
    tracer.style.left = e.clientX + 'px';
    tracer.style.top = e.clientY + 'px';
  });

  document.addEventListener('mouseleave', () => {
    tracer.classList.remove('active');
  });
}

// Initialize on load
window.addEventListener('load', () => {
  createParticles();
  initCursorTracer();
});

// Scroll Reveal Animation with Intersection Observer
const observerOptions = {
  threshold: 0.1,
};

const observer = new IntersectionObserver((entries) => {
  let delay = 0;
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add("reveal");
      }, delay);
      delay += 100; // Stagger effect
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Add reveal class to sections and observe them
document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
  observer.observe(el);
});


// Typing effect for Hero
const title = document.querySelector("#hero-title");
if (title) {
  const fullText = "Anna Patricia Bolor Vida";
  const cursor = title.querySelector(".cursor");
  title.innerHTML = `<span class="text"></span>`;
  title.appendChild(cursor);

  const textContainer = title.querySelector(".text");
  let i = 0;

  function type() {
    if (i < fullText.length) {
      textContainer.textContent += fullText.charAt(i);
      i++;
      setTimeout(type, 80);
    }
  }

  window.addEventListener("load", type);
}

// Contact Form Handling
const contactForm = document.getElementById("contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector(".form-submit");
    const submitText = submitBtn.querySelector(".submit-text");
    const submitLoader = submitBtn.querySelector(".submit-loader");
    const formMessage = contactForm.querySelector(".form-message");

    // Get form data
    const formData = new FormData(contactForm);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    // Validate
    if (!data.name || !data.email || !data.message) {
      showMessage("Please fill in all fields", "error");
      return;
    }

    // Disable submit button
    submitBtn.disabled = true;
    submitText.style.display = "none";
    submitLoader.style.display = "inline-block";

    try {
      // Send via Formspree
      const FORMSPREE_ID = "xdawnaaj";

      const response = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          message: data.message,
        }),
      });

      if (response.ok) {
        showMessage(
          "🎉 Packet sent successfully! I'll get back to you soon.",
          "success"
        );
        contactForm.reset();
      } else {
        showMessage(
          "Error sending message. Please try again or contact directly.",
          "error"
        );
      }
    } catch (error) {
      console.error("Send error:", error);
      showMessage(
        "Connection error. Opening email client as fallback...",
        "error"
      );

      // Fallback: Open mailto link
      const subject = `New message from ${data.name}`;
      const body = `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`;
      window.location.href = `mailto:annapatriciavida12@gmail.com?subject=${encodeURIComponent(
        subject
      )}&body=${encodeURIComponent(body)}`;
    } finally {
      // Re-enable submit button
      submitBtn.disabled = false;
      submitText.style.display = "inline";
      submitLoader.style.display = "none";
    }

    function showMessage(msg, type) {
      formMessage.textContent = msg;
      formMessage.className = `form-message ${type}`;
      formMessage.style.display = "block";

      // Auto-hide after 5 seconds
      setTimeout(() => {
        formMessage.style.display = "none";
      }, 5000);
    }
  });
}

