/*
  Nellie's Neat Nest LLC
  Website Interactions

  Controls:
  - Mobile menu if added later
  - Fade-in animations on scroll
  - Current year replacement
  - Hero slideshow
*/

document.addEventListener("DOMContentLoaded", () => {
  /* ---------- Mobile Menu ---------- */
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
    });
  }

  /* ---------- Fade-In Animations ---------- */
  const animatedItems = document.querySelectorAll(
    ".card, .price-card, .process-step, .review-card, .policy, .contact-card, .service-box, .highlight, .cta, .hero-slideshow-wrap, .hero-content"
  );

  animatedItems.forEach((item) => {
    item.classList.add("fade-in");
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    {
      threshold: 0.12,
    }
  );

  animatedItems.forEach((item) => observer.observe(item));

  /* ---------- Current Year ---------- */
  const yearItems = document.querySelectorAll(".current-year");

  yearItems.forEach((item) => {
    item.textContent = new Date().getFullYear();
  });

  /* ---------- Hero Slideshow ---------- */
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".slide-dot");

  let currentSlide = 0;
  let slideTimer;

  function showSlide(index) {
    if (!slides.length || !dots.length) return;

    slides.forEach((slide) => slide.classList.remove("active"));
    dots.forEach((dot) => dot.classList.remove("active"));

    slides[index].classList.add("active");
    dots[index].classList.add("active");
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  if (slides.length > 0 && dots.length > 0) {
    showSlide(currentSlide);

    slideTimer = setInterval(nextSlide, 6000);

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentSlide = index;
        showSlide(currentSlide);

        clearInterval(slideTimer);
        slideTimer = setInterval(nextSlide, 6000);
      });
    });
  }
});