# Watillery

Static marketing site for Watillery. Plain HTML, CSS and vanilla JS, no build step.
Serve `index.html` with any static server:

```bash
python -m http.server 5599
# then visit http://localhost:5599
```

## Layout

| File | Purpose |
| --- | --- |
| `index.html` | Single page: hero, Why Choose Us, About, Events, Reviews, Contact, footer |
| `style.css` | Base styles (legacy, trimmed) |
| `sections.css` | Newer components: waves, Why / Events / Reviews, developer panel |
| `auth-styles.css` | Sign in / register modal and the signed-in user menu |
| `main.js` | Navigation, modals, auth flow, contact, newsletter, checkout demo |
| `database.js` | Client-side data store (localStorage). Stand-in for a real backend |
| `admin-panel.js` | Developer panel: products, images, colours, tags, stock, events |
| `events.js` | Homepage Events section, backed by localStorage |
| `team.js` | Our Team modal roster |
| `products.js` | Product catalogue plus built-in / custom / override merge |
| `cart.js` | Cart state |
| `slideshow.js` | About-section slideshow |
| `tools/scrape-images.mjs` | One-off: pulls content images from watillery.com into `newimg/` |

## Developer panel

Sign in with an address listed in `ADMIN_EMAILS` (`database.js`) to unlock
**Developer Panel** in the user menu. From there you can add products (image
uploads, colour picks across ROYGBIV plus White / Black / Brown / Gray / Pink,
tags and stock status) and manage the homepage Events section. Everything saves
to localStorage until the backend is connected.

Demo admin login: `info@watillery.com` / `admin!`

## Still needs a backend or third-party service

Stubbed client-side for now:

- Accounts, unique-email enforcement, sessions (localStorage only)
- Email verification (EmailJS templates wired but unverified)
- "Continue with Google" (needs a Google OAuth client id and token verification)
- Product and event persistence beyond one browser
- Real customer reviews feeding the Reviews section

## Assets

`newimg/` holds content images scraped from the current watillery.com for
sorting into the rebuild (`newimg/_manifest.csv` maps each file to its source).
Raw `.mov` marketing footage is gitignored; it is too large for GitHub.
