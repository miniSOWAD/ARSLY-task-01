# miniSOWAD Task Site - Structured Version

This version splits the original single HTML file into a cleaner static project.

## Pages

- `index.html` - Welcome screen. Redirects to Home after 2 seconds.
- `home.html` - Section 1 / Featured Works carousel.
- `what-we-offer.html` - Section 2 / Strong Brand Solution.
- `start-project.html` - Section 3 / CTA section.

## Shared files

- `css/styles.css` - All shared and section CSS.
- `js/common.js` - Custom cursor and shared hover behavior.
- `js/welcome.js` - Welcome screen animation and redirect.
- `js/home.js` - Featured Works carousel data and animation.
- `js/offer.js` - What We Offer section animation.
- `js/cta.js` - CTA section animation.

## How to run

Open `index.html` in your browser. For best behavior, use VS Code Live Server.

## Notes

- Duplicate GSAP CDN imports were removed.
- ScrollTrigger is loaded once before page scripts.
- The navbar appears on the three main pages.
- The CTA section no longer depends on CSS-only hidden state. JS sets and reveals it safely.
