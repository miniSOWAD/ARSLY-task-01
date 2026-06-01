# miniSOWAD Task Site - Single Page Scroll Spy

Open `index.html` with VS Code Live Server.

Flow:
1. `index.html` shows the welcome screen.
2. After 2 seconds it redirects to `home.html`.
3. `home.html` contains all three sections in one scrollable page.

Navbar behavior:
- The navbar is divided into three visual areas.
- Left area shows `HOME` only when the Home section is active.
- Middle area shows `WHAT WE OFFER` only when the What We Offer section is active.
- Right area shows `START YOUR PROJECT WITH US` only when the CTA section is active.
- The duplicate CTA internal eyebrow line has been removed, so there is only one section-label navbar.

Final patch:
- Scroll spy now hides inactive nav labels with GSAP inline-state control, so only the current section name remains visible.
- Section entrance animations replay on both downward and upward scroll re-entry.


## Floating Book Button

The fixed bottom-right book button is inside `home.html` near the end of the body.
Change this line to your own destination:

```html
href="https://example.com"
```

The button styling is in `css/styles.css` under `Floating Book Link Button`.
The entrance and hover motion is in `js/common.js`.


## Welcome behavior
Open `index.html` first. It shows the welcome animation for 2 seconds, stores a session flag, then opens `home.html`. If someone opens `home.html` directly, it shows the same 2-second welcome overlay once for that browser tab. To test the welcome again, close/reopen the tab or clear sessionStorage in DevTools.
