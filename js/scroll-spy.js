window.addEventListener("DOMContentLoaded", () => {
  const zones = Array.from(document.querySelectorAll(".spy-zone[data-spy-target]"));
  const sections = Array.from(document.querySelectorAll("[data-nav-title]"));

  if (zones.length === 0 || sections.length === 0) return;

  let currentActiveId = "";

  const hideZone = (zone) => {
    zone.classList.remove("active");

    if (window.gsap) {
      gsap.killTweensOf(zone);
      gsap.set(zone, {
        autoAlpha: 0,
        y: 8,
        pointerEvents: "none"
      });
    } else {
      zone.style.opacity = "0";
      zone.style.visibility = "hidden";
      zone.style.transform = "translateY(8px)";
      zone.style.pointerEvents = "none";
    }
  };

  const showZone = (zone) => {
    zone.classList.add("active");

    if (window.gsap) {
      gsap.killTweensOf(zone);
      gsap.fromTo(
        zone,
        { autoAlpha: 0, y: 8 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.35,
          ease: "power2.out",
          onStart: () => {
            zone.style.pointerEvents = "auto";
          }
        }
      );
    } else {
      zone.style.opacity = "1";
      zone.style.visibility = "visible";
      zone.style.transform = "translateY(0)";
      zone.style.pointerEvents = "auto";
    }
  };

  const setActiveSection = (section) => {
    if (!section || section.id === currentActiveId) return;

    currentActiveId = section.id;

    zones.forEach((zone) => {
      if (zone.dataset.spyTarget === currentActiveId) {
        showZone(zone);
      } else {
        hideZone(zone);
      }
    });
  };

  const getMostVisibleSection = () => {
    const checkLine = window.innerHeight * 0.48;
    let best = sections[0];
    let bestDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionCenter = rect.top + rect.height * 0.5;
      const distance = Math.abs(sectionCenter - checkLine);

      if (distance < bestDistance) {
        bestDistance = distance;
        best = section;
      }
    });

    return best;
  };

  const updateSpy = () => setActiveSection(getMostVisibleSection());

  zones.forEach(hideZone);
  updateSpy();

  window.addEventListener("scroll", updateSpy, { passive: true });
  window.addEventListener("resize", updateSpy);

  zones.forEach((zone) => {
    zone.addEventListener("click", (event) => {
      const target = document.querySelector(zone.getAttribute("href"));
      if (!target) return;

      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
});
