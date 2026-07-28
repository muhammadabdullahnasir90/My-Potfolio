# Muhammad Abdullah Nasir — Portfolio

A dark "fintech-terminal" themed portfolio built with plain HTML/CSS/JS (no build step, no frameworks needed).

## Run it
Just open `index.html` in a browser — no server required. For best results (so relative asset paths and the resume download work perfectly), you can also serve it locally:

```bash
cd portfolio
python3 -m http.server 8000
# then open http://localhost:8000
```

## What's inside
- `index.html` — page structure & content (pulled from your resume)
- `css/style.css` — the "Circuit Ledger" theme (dark, signal-green accent, glass panels)
- `js/script.js` — all interactivity:
  - Boot-sequence preloader
  - Custom cursor (desktop only)
  - Live animated particle-network background (canvas, reacts to your mouse)
  - 3D cursor-tilt hover on every card and button (`data-tilt`)
  - Scroll-reveal animations (IntersectionObserver)
  - Animated stat counters
  - Active-section nav highlighting + mobile menu
  - Contact form that hands off to the visitor's email client (no backend)
- `assets/Muhammad_Abdullah_Nasir_Resume.pdf` — wired to the "Résumé" button (real download)

## Buttons & links — what's live right now
- **Résumé** (nav) → downloads your uploaded PDF ✅ working
- **GitHub / LinkedIn / Email / Phone** → your real resume details ✅ working
- **Fraud Detection & EastlyAI "View on GitHub"** → currently point to your GitHub profile (`github.com/muhammadabdullahnasir90`) since no specific repo URLs were given — swap in the exact repo links once you have them (see below)
- **POS System** → labeled "Currently live in market" (non-clickable badge, since it's presumably not publicly hosted) + a "Request a demo" button that opens a pre-filled email
- **E-Stamp App** → "Request case study" button, opens a pre-filled email (since it's a private client project)
- **Contact form** → opens the visitor's email client with their message pre-filled (fully static sites can't send email server-side without a backend or a service like Formspree)

## Easiest customizations
Open `js/script.js` and edit the `projects` array near the top — each project has `title`, `desc`, `stack`, `features`, and `actions` (label + href). To point a button at a real live link:

```js
actions: [
  { label: 'View Live Demo', href: 'https://your-real-link.com', primary: true, external: true },
]
```

To swap the accent color, open `css/style.css` and change `--signal: #00E6A0;` at the top of the file.

## Deploying
This is a fully static site — drag the folder into **Netlify**, **Vercel**, or **GitHub Pages** and it's live in under a minute.
