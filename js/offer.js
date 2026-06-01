window.addEventListener("DOMContentLoaded", () => {
  if (!window.gsap) return;
  if (window.ScrollTrigger) gsap.registerPlugin(ScrollTrigger);

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

  function replayOfferIntro() {
    gsap.killTweensOf([
      ".char",
      ".btn-solid-green",
      ".main-image-wrapper",
      ".main-image",
      ".solution-pagination",
      ".word",
      ".content-desc",
      ".pill-tag",
      ".cta-group",
      ".sub-image-wrapper"
    ]);

    gsap.set(".char", { y: "110%" });
    gsap.set(".word", { y: "110%" });
    gsap.set(".btn-solid-green", { x: 40, opacity: 0 });
    gsap.set(".main-image-wrapper", { clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)" });
    gsap.set(".main-image", { scale: 1.08 });
    gsap.set(".solution-pagination", { x: -20, opacity: 0 });
    gsap.set(".content-desc", { y: 20, opacity: 0 });
    gsap.set(".pill-tag", { scale: 0.8, opacity: 0 });
    gsap.set(".cta-group", { y: 20, opacity: 0 });
    gsap.set(".sub-image-wrapper", { scale: 0.8, opacity: 0 });

    const tlSection2 = gsap.timeline();

    tlSection2.to(".char", { y: "0%", duration: 0.8, stagger: 0.03, ease: "expo.out" }, 0.05);
    tlSection2.to(".btn-solid-green", { x: 0, opacity: 1, duration: 0.8, ease: "back.out(1.5)" }, 0.2);
    tlSection2.to(".main-image-wrapper", { clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 1.2, ease: "power4.inOut" }, 0.3);
    tlSection2.to(".main-image", { scale: 1, duration: 1.2, ease: "power4.inOut" }, 0.3);
    tlSection2.to(".solution-pagination", { x: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.65);
    tlSection2.to(".word", { y: "0%", duration: 0.8, stagger: 0.05, ease: "power3.out" }, 0.5);
    tlSection2.to(".content-desc", { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }, 0.75);
    tlSection2.to(".pill-tag", { scale: 1, opacity: 1, duration: 0.6, stagger: 0.08, ease: "back.out(1.5)" }, 0.9);
    tlSection2.to(".cta-group", { y: 0, opacity: 1, duration: 0.6, ease: "power3.out" }, 1.1);
    tlSection2.to(".sub-image-wrapper", { scale: 1, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }, 1.0);
  }

  if (window.ScrollTrigger) {
    ScrollTrigger.create({
      trigger: "#brandSolution",
      start: "top 55%",
      end: "bottom 45%",
      onEnter: replayOfferIntro,
      onEnterBack: replayOfferIntro
    });
  } else {
    replayOfferIntro();
  }
});
