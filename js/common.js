window.addEventListener("DOMContentLoaded", () => {
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
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
});
