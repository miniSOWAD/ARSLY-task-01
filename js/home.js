window.addEventListener("DOMContentLoaded", () => {
  if (!window.gsap) return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

  const assetsFolder = [
    {
      image: "https://images.unsplash.com/photo-1618761714954-0b8cd0026356?q=80&w=800&auto=format&fit=crop",
      subtitle: "Horizon Redesign",
      title: "Website UI/UX Design",
      tags: ["UI/UX Design", "2020"]
    },
    {
      image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac?q=80&w=1200&auto=format&fit=crop",
      subtitle: "VR Experience",
      title: "Virtual Reality Setup",
      tags: ["3D Render", "2021"]
    },
    {
      image: "https://images.unsplash.com/photo-1616469829581-73993eb86b02?q=80&w=1000&auto=format&fit=crop",
      subtitle: "Fintech Startup",
      title: "Mobile App Design",
      tags: ["App Design", "2022"]
    },
    {
      image: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=800&auto=format&fit=crop",
      subtitle: "Studio Branding",
      title: "Creative Portfolio",
      tags: ["Branding", "2023"]
    },
    {
      image: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=800&auto=format&fit=crop",
      subtitle: "Web Platform",
      title: "Dashboard UI",
      tags: ["Web App", "2024"]
    }
  ];

  const carousel = document.getElementById("carousel");
  if (!carousel) return;

  const totalItems = assetsFolder.length;

  assetsFolder.forEach((asset, index) => {
    const pageNum = String(index + 1).padStart(2, "0");
    const totalStr = String(totalItems).padStart(2, "0");

    carousel.insertAdjacentHTML("beforeend", `
      <div class="card">
        <div class="card-img-wrapper">
          <img src="${asset.image}" alt="${asset.title}">
        </div>
        <div class="left-content">
          <p class="left-subtitle"><span class="dot"></span> ${asset.subtitle}</p>
          <h3 class="left-title">${asset.title}</h3>
        </div>
        <div class="right-content">
          <div class="right-pagination">${pageNum}<span>/${totalStr}</span></div>
          <div class="right-tags">
            <span class="tag">${asset.tags[0]}</span>
            <span class="tag">${asset.tags[1]}</span>
          </div>
        </div>
      </div>
    `);
  });

  const cards = document.querySelectorAll(".card");
  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");

  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      if (!ring || !dot) return;
      gsap.to(ring, { width: 64, height: 64, borderColor: "rgba(255,255,255,0.8)", duration: 0.3 });
      gsap.to(dot, { scale: 0, duration: 0.2 });
    });

    card.addEventListener("mouseleave", () => {
      if (!ring || !dot) return;
      gsap.to(ring, { width: 36, height: 36, borderColor: "rgba(255,255,255,0.4)", duration: 0.3 });
      gsap.to(dot, { scale: 1, duration: 0.2 });
    });
  });

  const titleEl = document.querySelector(".section-title");
  if (titleEl && !titleEl.classList.contains("is-split")) {
    const rawText = titleEl.textContent;
    titleEl.innerHTML = rawText.split("").map(char => {
      return char === " "
        ? "&nbsp;"
        : `<span class="char-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="char-s1" style="display:inline-block;">${char}</span></span>`;
    }).join("");
    titleEl.classList.add("is-split");
  }

  function replayHomeIntro() {
    gsap.killTweensOf(".char-s1");
    gsap.fromTo(".char-s1", { y: "110%" }, {
      y: "0%",
      duration: 0.8,
      stagger: 0.03,
      ease: "expo.out"
    });

    gsap.fromTo(".section-eyebrow", { y: 14, opacity: 0 }, {
      y: 0,
      opacity: 1,
      duration: 0.55,
      ease: "power2.out"
    });
  }

  if (window.ScrollTrigger) {
    ScrollTrigger.create({
      trigger: "#featuredWorks",
      start: "top 55%",
      end: "bottom 45%",
      onEnter: replayHomeIntro,
      onEnterBack: replayHomeIntro
    });
  } else {
    replayHomeIntro();
  }

  let currentIndex = 0;
  let isAnimating = false;
  let autoPlayTimer;
  let isHoveringPhotos = false;

  function getPosition(index, current) {
    let diff = index - current;
    if (diff < -Math.floor(totalItems / 2)) diff += totalItems;
    if (diff > Math.floor(totalItems / 2)) diff -= totalItems;
    return diff;
  }

  function updateCarousel(animDuration = 0.8) {
    cards.forEach((card, i) => {
      const pos = getPosition(i, currentIndex);
      const imgWrapper = card.querySelector(".card-img-wrapper");
      const leftText = card.querySelector(".left-content");
      const rightText = card.querySelector(".right-content");

      gsap.set(card, { visibility: "visible" });

      if (pos === 0) {
        gsap.to(card, { xPercent: 0, scale: 1, zIndex: 5, opacity: 1, duration: animDuration, ease: "power3.inOut" });
        gsap.to(imgWrapper, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: animDuration, ease: "power3.inOut" });
        gsap.to([leftText, rightText], { opacity: 0, duration: animDuration / 2 });
      } else if (pos === -1) {
        gsap.to(card, { xPercent: -96, scale: 0.85, zIndex: 2, opacity: 1, duration: animDuration, ease: "power3.inOut" });
        gsap.to(imgWrapper, { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 0%)", duration: animDuration, ease: "power3.inOut" });
        gsap.to(leftText, { opacity: 1, delay: animDuration / 3, duration: animDuration / 1.5 });
        gsap.to(rightText, { opacity: 0, duration: animDuration / 2 });
      } else if (pos === 1) {
        gsap.to(card, { xPercent: 96, scale: 0.85, zIndex: 2, opacity: 1, duration: animDuration, ease: "power3.inOut" });
        gsap.to(imgWrapper, { clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 100%)", duration: animDuration, ease: "power3.inOut" });
        gsap.to(leftText, { opacity: 0, duration: animDuration / 2 });
        gsap.to(rightText, { opacity: 1, delay: animDuration / 3, duration: animDuration / 1.5 });
      } else if (pos < -1) {
        gsap.to(card, { xPercent: -140, scale: 0.6, zIndex: 1, opacity: 0, duration: animDuration, ease: "power3.inOut" });
      } else {
        gsap.to(card, { xPercent: 140, scale: 0.6, zIndex: 1, opacity: 0, duration: animDuration, ease: "power3.inOut" });
      }
    });
  }

  function lockAnimation(duration) {
    isAnimating = true;
    setTimeout(() => isAnimating = false, duration * 1000 + 50);
  }

  function triggerNext(duration) {
    if (isAnimating) return;
    currentIndex = (currentIndex + 1) % totalItems;
    updateCarousel(duration);
    lockAnimation(duration);
  }

  function triggerPrev(duration) {
    if (isAnimating) return;
    currentIndex = (currentIndex - 1 + totalItems) % totalItems;
    updateCarousel(duration);
    lockAnimation(duration);
  }

  function startAutoPlay() {
    clearInterval(autoPlayTimer);
    autoPlayTimer = setInterval(() => triggerNext(0.8), 2500);
  }

  updateCarousel(0);
  startAutoPlay();

  carousel.addEventListener("mouseenter", () => {
    isHoveringPhotos = true;
    clearInterval(autoPlayTimer);
  });

  carousel.addEventListener("mouseleave", () => {
    isHoveringPhotos = false;
    startAutoPlay();
  });

  carousel.addEventListener("wheel", (e) => {
    if (!isHoveringPhotos) return;
    e.preventDefault();
    if (e.deltaY > 20) triggerNext(0.2);
    else if (e.deltaY < -20) triggerPrev(0.2);
  }, { passive: false });
});
