# PyroDekho (Next.js)

Next.js version of the PyroDekho frontend, replacing the React + Vite app in `../Frontend`.
Work happens on the `feature/nextjs-migration` branch; `main` still runs the Vite app.

## Getting started

```bash
cd pyrodekho-next
npm install
cp .env.example .env.local   # set NEXT_PUBLIC_API_BASE_URL
npm run dev                  # http://localhost:3000
```

Run the backend (`cd ../Backend && npm run server`) first so pages have data.

For Google login to return to the Next.js app locally, set `CLIENT_URL=http://localhost:3000`
in `Backend/.env`. The Google callback URL itself does not change.

## Environment

| Variable | Used by | Notes |
|----------|---------|-------|
| `NEXT_PUBLIC_API_BASE_URL` | Browser + server | Replaces `VITE_API_BASE_URL` |
| `API_BASE_URL` | Server only (optional) | Internal API URL for server rendering, e.g. `http://localhost:5000/api` on the VPS |

## Structure

```
src/
├── app/            # routes (App Router): page.js per URL, layout.js, not-found.js, error.js
├── components/     # Header, Footer, cards, HeroSlider, AdminRoute...
├── context/        # AuthContext, SearchContext (client)
├── lib/api.js      # server-side data fetching (cached, refreshed every minute)
├── views/          # client-side page bodies (forms, login, admin)
├── styles/         # per-page CSS, same as the Vite app
└── utils/
```

## How it differs from the Vite app

- Product lists, product details and page text are rendered on the server, so search
  engines see the full content instead of an empty `<div id="root">`.
- Every page has its own `<title>` and description (`metadata` / `generateMetadata`).
- Navigation uses real links (`next/link`), including "View Details" on product cards.
  Logged-out visitors are still sent to the login page when they click it.
- Product images use `next/image` with a Cloudinary loader (responsive sizes).
- The "Book Now" button on a product passes the product name as `/book?product=...`
  instead of router state.
- Unknown URLs return a proper 404 page; admin pages are marked `noindex`.

URLs are unchanged from the Vite app (including `/eventParties` and `/:category/:slug`).
