window.addEventListener("DOMContentLoaded", () => {
  if (!window.gsap) return;

  const sectionTitle = document.getElementById("splitSectionTitle");
  if (sectionTitle && !sectionTitle.classList.contains("is-split")) {
    const titleText = sectionTitle.textContent;
    sectionTitle.innerHTML = titleText.split("").map(char => {
      return char === " " ? "&nbsp;" : `<span class="char-wrap" style="display:inline-block;overflow:hidden;vertical-align:bottom;"><span class="char" style="display:inline-block;">${char}</span></span>`;
    }).join("");
    sectionTitle.classList.add("is-split");
  }

  const heading = document.getElementById("splitHeading");
  if (heading && !heading.classList.contains("is-split")) {
    const headingWords = heading.innerHTML.split("<br>").map(line => {
      return line.split(" ").map(word => `<span class="word-wrap" style="display:inline-block;overflow:hidden;vertical-align:top;"><span class="word" style="display:inline-block;">${word}</span></span>`).join(" ");
    }).join("<br>");
    heading.innerHTML = headingWords;
    heading.classList.add("is-split");
  }

  gsap.set(".eyebrow-accent-line, .long-faint-line", { scaleX: 0, transformOrigin: "left center" });

  const tlSection2 = gsap.timeline({ delay: 0.15 });

  tlSection2.to(".eyebrow-accent-line", { scaleX: 1, duration: 0.4, ease: "power3.out" }, 0);
  tlSection2.to(".long-faint-line", { scaleX: 1, duration: 0.8, ease: "power3.inOut" }, 0.2);
  tlSection2.from(".eyebrow-text", { y: -15, opacity: 0, duration: 0.5, ease: "power2.out" }, 0.2);
  tlSection2.from(".char", { y: "110%", duration: 0.8, stagger: 0.03, ease: "expo.out" }, 0.3);
  tlSection2.from(".btn-solid-green", { x: 40, opacity: 0, duration: 0.8, ease: "back.out(1.5)" }, 0.5);
  tlSection2.to(".main-image-wrapper", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.2, ease: "power4.inOut" }, 0.6);
  tlSection2.to(".main-image", { scale: 1, duration: 1.2, ease: "power4.inOut" }, 0.6);
  tlSection2.from(".solution-pagination", { x: -20, opacity: 0, duration: 0.8, ease: "power2.out" }, 1.0);
  tlSection2.from(".word", { y: "110%", duration: 0.8, stagger: 0.05, ease: "power3.out" }, 0.8);
  tlSection2.from(".content-desc", { y: 20, opacity: 0, duration: 0.8, ease: "power2.out" }, 1.0);
  tlSection2.from(".pill-tag", { scale: 0.8, opacity: 0, duration: 0.6, stagger: 0.08, ease: "back.out(1.5)" }, 1.2);
  tlSection2.from(".cta-group", { y: 20, opacity: 0, duration: 0.6, ease: "power3.out" }, 1.4);
  tlSection2.from(".sub-image-wrapper", { scale: 0.8, opacity: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }, 1.3);
});
