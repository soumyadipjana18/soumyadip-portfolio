# Soumyadip Jana — Portfolio

A fast, dependency-free portfolio for a Machine Learning Engineer — dark/light AI theme,
animated neural-network hero background, typing role animation, skill badges, filterable
project grid, and a contact section. Pure HTML/CSS/JS — no build step, so it deploys instantly
on Vercel or GitHub Pages.

## 📁 Structure
```
portfolio/
├── index.html        → all page content
├── style.css         → design system (tokens, layout, animations)
├── script.js         → interactivity (theme toggle, neural canvas, filters, typing, form)
├── vercel.json        → clean URLs config
├── assets/
│   └── profile.jpeg  → your photo
└── resume.pdf         → ⚠️ ADD YOUR OWN RESUME HERE (placeholder not included)
```

## ✏️ Before you deploy — quick edits

1. **Resume**: Drop your actual resume PDF into the project root as `resume.pdf`
   (the "Download Resume" button links to it). Until then, that button will 404.
2. **Projects**: The 6 project cards in `index.html` (`#projects` section) are
   realistic placeholders matching your listed skills. Replace the titles, bullet
   points, tech stacks, and the `<a href="#">` GitHub links with your real repos.
3. **Contact form**: It currently just shows a confirmation message locally — it
   does **not** send real email. To make it functional:
   - Sign up at [emailjs.com](https://www.emailjs.com) (free tier is enough)
   - In `script.js`, inside the `contactForm.addEventListener('submit', ...)` block,
     uncomment and fill in the EmailJS snippet with your Service ID, Template ID, and Public Key.
   - Add `<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>`
     before `script.js` in `index.html`, then call `emailjs.init('YOUR_PUBLIC_KEY')`.
4. **Stats**: Update the `data-count` numbers in the "Statistics" section of
   `index.html` once you have real project/certificate counts.

## 🚀 Deploy to Vercel (from GitHub)

```bash
# 1. Initialize git and push to a new GitHub repo
cd portfolio
git init
git add .
git commit -m "Initial portfolio site"
git branch -M main
git remote add origin https://github.com/soumyadipjana18/portfolio.git
git push -u origin main
```

Then:
1. Go to [vercel.com/new](https://vercel.com/new)
2. Import the `portfolio` GitHub repo
3. Framework Preset: **Other** (it's static — no build command needed)
4. Click **Deploy**

That's it — Vercel will give you a live URL (e.g. `soumyadip-portfolio.vercel.app`).
Every future `git push` to `main` auto-redeploys.

## 🎨 Design system
- **Colors**: AI-theme dark palette (`#0F172A` background, `#3B82F6` primary,
  `#06B6D4` secondary, `#8B5CF6` accent) with a full light-mode variant via the
  moon/sun toggle in the navbar.
- **Type**: Space Grotesk (headings) + Inter (body).
- **Signature element**: a live, animated neural-network canvas behind the hero —
  nodes drift and connect with faint lines, echoing the "AI/ML" theme without
  being distracting. Respects `prefers-reduced-motion`.

## ♿ Accessibility & performance
- Keyboard-focusable nav, buttons, and form fields
- Respects reduced-motion preference (canvas + animations pause)
- No external JS framework — loads fast even on slow connections
- Fully responsive: mobile burger menu, stacked grids, fluid type scale
