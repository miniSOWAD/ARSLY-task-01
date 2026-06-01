window.addEventListener("DOMContentLoaded", () => {
  const goHome = () => {
    sessionStorage.setItem("miniSOWADWelcomeSeen", "true");
    window.location.href = "home.html";
  };

  if (window.gsap) {
    const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

    tl.fromTo(
      ".welcome-title",
      { y: 80, opacity: 0, filter: "blur(14px)" },
      { y: 0, opacity: 1, filter: "blur(0px)", duration: 0.8 }
    )
      .fromTo(
        ".welcome-subtitle",
        { y: 22, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.55 },
        "-=0.45"
      )
      .to(
        ".welcome-page",
        { opacity: 0, filter: "blur(16px)", duration: 0.45, ease: "power2.inOut" },
        1.55
      );
  }

  setTimeout(goHome, 2000);
});
