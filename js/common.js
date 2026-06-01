window.addEventListener("DOMContentLoaded", () => {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
  }

  const instantWelcomeOverlay = document.getElementById("instantWelcomeOverlay");
  if (instantWelcomeOverlay) {
    const alreadySeen = sessionStorage.getItem("miniSOWADWelcomeSeen") === "true";

    if (alreadySeen) {
      instantWelcomeOverlay.remove();
    } else {
      document.body.classList.add("welcome-lock");

      if (window.gsap) {
        const tl = gsap.timeline();
        tl.fromTo(
          "#instantWelcomeOverlay .welcome-title",
          { y: 80, opacity: 0, filter: "blur(14px)" },
          { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8, ease: "expo.out" }
        )
          .fromTo(
            "#instantWelcomeOverlay .welcome-subtitle",
            { y: 22, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.55, ease: "power3.out" },
            "-=0.45"
          )
          .to(
            "#instantWelcomeOverlay",
            { opacity: 0, filter: "blur(16px)", duration: 0.45, ease: "power2.inOut" },
            1.55
          );
      }

      setTimeout(() => {
        sessionStorage.setItem("miniSOWADWelcomeSeen", "true");
        instantWelcomeOverlay.remove();
        document.body.classList.remove("welcome-lock");
      }, 2000);
    }
  }

  const dot = document.getElementById("cursorDot");
  const ring = document.getElementById("cursorRing");

  if (!dot || !ring || !window.gsap) return;

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx;
  let ry = my;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  gsap.ticker.add(() => {
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    gsap.set(dot, { x: mx, y: my });
    gsap.set(ring, { x: rx, y: ry });
  });

  document.querySelectorAll("a, button").forEach((item) => {
    item.addEventListener("mouseenter", () => {
      gsap.to(ring, { width: 50, height: 50, borderColor: "#c8ff00", duration: 0.3 });
      gsap.to(dot, { backgroundColor: "#c8ff00", scale: 1, duration: 0.2 });
    });

    item.addEventListener("mouseleave", () => {
      gsap.to(ring, { width: 36, height: 36, borderColor: "rgba(255,255,255,0.4)", duration: 0.3 });
      gsap.to(dot, { backgroundColor: "#fff", scale: 1, duration: 0.2 });
    });
  });

  const floatingBookButton = document.querySelector(".floating-book-button");
  if (floatingBookButton && window.gsap) {
    gsap.to(floatingBookButton, {
      y: 0,
      scale: 1,
      opacity: 1,
      duration: 0.9,
      ease: "back.out(1.7)",
      delay: 0.45
    });

    floatingBookButton.addEventListener("mouseenter", () => {
      gsap.to(floatingBookButton, {
        scale: 1.1,
        rotation: 2,
        duration: 0.35,
        ease: "power2.out"
      });
    });

    floatingBookButton.addEventListener("mouseleave", () => {
      gsap.to(floatingBookButton, {
        scale: 1,
        rotation: 0,
        duration: 0.35,
        ease: "power2.out"
      });
    });
  }

});
