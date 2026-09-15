(() => {
  const header = document.querySelector(".site-header");
  const toggle = document.querySelector(".nav-toggle");
  const mobileNav = document.querySelector(".mobile-nav");
  const faqItems = document.querySelectorAll(".faq-item");
  const reveals = document.querySelectorAll(".reveal");
  const heroImg = document.querySelector(".hero-media img");
  const whoMosaics = document.querySelectorAll(".who-mosaic");

  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 40);

    if (heroImg && window.scrollY < window.innerHeight) {
      heroImg.style.transform = `scale(${1.1 - Math.min(window.scrollY / window.innerHeight, 1) * 0.06}) translateY(${window.scrollY * 0.18}px)`;
    }
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  if (toggle && mobileNav) {
    toggle.addEventListener("click", () => {
      const open = mobileNav.classList.toggle("open");
      toggle.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      mobileNav.setAttribute("aria-hidden", String(!open));
      document.body.style.overflow = open ? "hidden" : "";
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        mobileNav.classList.remove("open");
        toggle.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        mobileNav.setAttribute("aria-hidden", "true");
        document.body.style.overflow = "";
      });
    });
  }

  faqItems.forEach((item) => {
    const button = item.querySelector(".faq-q");
    if (!button) return;
    button.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      faqItems.forEach((other) => other.classList.remove("open"));
      if (!isOpen) item.classList.add("open");
    });
  });

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );
    reveals.forEach((el) => revealObserver.observe(el));

    if (whoMosaics.length) {
      const mosaicObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add("is-live");
            mosaicObserver.unobserve(entry.target);
          });
        },
        { threshold: 0.18 }
      );
      whoMosaics.forEach((section) => mosaicObserver.observe(section));
    }
  } else {
    reveals.forEach((el) => el.classList.add("visible"));
    whoMosaics.forEach((section) => section.classList.add("is-live"));
  }

  const form = document.querySelector(".contact-form");
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const note = form.querySelector(".form-note");
      if (note) {
        note.hidden = false;
        note.textContent = "Thank you. We’ll get back to you shortly.";
      }
      form.reset();
    });
  }

  const serviceItems = document.querySelectorAll(".service-item[data-image]");
  const previewImg = document.querySelector(".service-preview-img");
  if (serviceItems.length && previewImg) {
    let swapTimer;

    const setPreview = (item) => {
      const next = item.getAttribute("data-image");
      if (!next || previewImg.getAttribute("src") === next) return;

      previewImg.classList.add("is-switching");
      clearTimeout(swapTimer);
      swapTimer = setTimeout(() => {
        previewImg.src = next;
        previewImg.classList.remove("is-switching");
      }, 220);

      serviceItems.forEach((el) => el.classList.remove("is-active"));
      item.classList.add("is-active");
    };

    serviceItems.forEach((item) => {
      item.addEventListener("mouseenter", () => setPreview(item));
      item.addEventListener("focus", () => setPreview(item));
    });
  }
})();
