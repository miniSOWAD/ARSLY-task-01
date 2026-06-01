window.addEventListener("DOMContentLoaded", () => {
  if (!window.gsap) return;

  const ctaHeading = document.getElementById("splitCtaHeading");

  if (ctaHeading && !ctaHeading.classList.contains("is-split")) {
    const ctaWords = ctaHeading.innerHTML
      .split("<br>")
      .map(line => {
        return line
          .split(" ")
          .map(word => `<span class="word-wrap-cta"><span class="word-cta">${word}</span></span>`)
          .join(" ");
      })
      .join("<br>");

    ctaHeading.innerHTML = ctaWords;
    ctaHeading.classList.add("is-split");
  }

  gsap.set(".cta-section", { filter: "blur(15px)", opacity: 0 });
  gsap.set(".word-cta", { y: "110%" });
  gsap.set(".floating-img", { scale: 0, opacity: 0, rotation: () => gsap.utils.random(-15, 15) });

  const tlCta = gsap.timeline({ delay: 0.15 });

  tlCta.to(".cta-section", { filter: "blur(0px)", opacity: 1, duration: 1.4, ease: "power2.out" }, 0);
  tlCta.fromTo(".cta-eyebrow-wrapper", { y: -20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }, 0.25);
  tlCta.to(".word-cta", { y: "0%", duration: 0.9, stagger: 0.08, ease: "expo.out" }, 0.45);
  tlCta.fromTo(".cta-contact-info span", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.75, stagger: 0.1, ease: "power2.out" }, 0.8);
  tlCta.fromTo(".btn-green-pill, .btn-white-circle", { scale: 0.5, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.75, stagger: 0.1, ease: "back.out(1.8)" }, 1.0);
  tlCta.fromTo(".floating-img", { scale: 0, opacity: 0, rotation: () => gsap.utils.random(-15, 15) }, { scale: 1, opacity: 1, rotation: 0, duration: 1, stagger: 0.15, ease: "back.out(1.5)" }, 0.7);

  gsap.utils.toArray(".floating-img").forEach((img, i) => {
    gsap.to(img, {
      y: () => gsap.utils.random(-25, 25),
      x: () => gsap.utils.random(-10, 10),
      rotation: () => gsap.utils.random(-5, 5),
      duration: () => gsap.utils.random(3, 6),
      ease: "sine.inOut",
      yoyo: true,
      repeat: -1,
      delay: 1.6 + i * 0.2
    });
  });

  gsap.to(".glow-red", { x: 50, y: 50, scale: 1.1, duration: 8, ease: "sine.inOut", yoyo: true, repeat: -1 });
  gsap.to(".glow-purple", { x: -50, y: -50, scale: 1.2, duration: 10, ease: "sine.inOut", yoyo: true, repeat: -1, delay: 2 });

  document.querySelectorAll(".btn-green-pill, .btn-white-circle").forEach(btn => {
    btn.addEventListener("mouseenter", () => {
      gsap.to(btn, { scale: 1.08, boxShadow: "0 0 35px rgba(200, 255, 0, 0.35)", duration: 0.3, ease: "power2.out" });
    });

    btn.addEventListener("mouseleave", () => {
      gsap.to(btn, { scale: 1, boxShadow: "0 0 0 rgba(200, 255, 0, 0)", duration: 0.3, ease: "power2.out" });
    });
  });
});
