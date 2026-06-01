window.addEventListener("DOMContentLoaded", () => {
  const zones = Array.from(document.querySelectorAll(".spy-zone[data-spy-target]"));
  const sections = Array.from(document.querySelectorAll("[data-nav-title]"));

  if (zones.length === 0 || sections.length === 0) return;

  const setActiveSection = (section) => {
    const activeId = section.id;

    zones.forEach((zone) => {
      const shouldActivate = zone.dataset.spyTarget === activeId;
      if (zone.classList.contains("active") === shouldActivate) return;

      zone.classList.toggle("active", shouldActivate);

      if (shouldActivate && window.gsap) {
        gsap.fromTo(
          zone,
          { y: 8, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: "power2.out" }
        );
      }
    });
  };

  const getMostVisibleSection = () => {
    const viewportMiddle = window.innerHeight * 0.45;
    let best = sections[0];
    let bestDistance = Infinity;

    sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const sectionMiddle = rect.top + rect.height * 0.35;
      const distance = Math.abs(sectionMiddle - viewportMiddle);

      if (distance < bestDistance) {
        bestDistance = distance;
        best = section;
      }
    });

    return best;
  };

  const updateSpy = () => setActiveSection(getMostVisibleSection());

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
