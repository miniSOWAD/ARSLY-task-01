window.addEventListener("DOMContentLoaded", () => {
  if (window.gsap) {
    gsap.fromTo(".welcome-title", { y: 70, opacity: 0, filter: "blur(12px)" }, { y: 0, opacity: 1, filter: "blur(0px)", duration: 1, ease: "expo.out" });
    gsap.fromTo(".welcome-subtitle", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, delay: 0.35, ease: "power3.out" });
  }

  setTimeout(() => {
    window.location.href = "home.html";
  }, 2000);
});
