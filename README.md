# PyroDekho

PyroDekho is a full-stack web platform for browsing and booking pyrotechnic and special-effects products: cold pyro and fog machines for weddings, clubs, stage shows and birthdays, plus indoor, outdoor and cracker categories. Visitors can browse products and videos, send enquiries and book events. Admins add products and videos.

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 19, Vite 7, React Router 7, Tailwind CSS 4, Axios, Swiper, react-hot-toast |
| Backend  | Node.js, Express 5, Mongoose 9 (MongoDB) |
| Auth     | JWT, bcryptjs, Google OAuth 2.0 (`google-auth-library`), httpOnly cookie |
| Media    | Cloudinary (product images and videos), express-fileupload |
| Email    | Nodemailer (Gmail), used for password-reset links |
| Deploy   | GitHub Actions, then SSH deploy to a Hostinger VPS |

## Project Structure

```
PyroDekho/
├── Backend/
│   ├── config/          # cloudinary, google OAuth client, admin email list
│   ├── controllers/     # auth, product, video, enquiry logic
│   ├── middleware/      # verifyToken, isAdmin
│   ├── models/          # User, Product, Video, Enquiry, EventEnquiry, Slider
│   ├── routes/          # auth, products, videos, enquiries
│   ├── utils/           # email sender, reset-password template
│   └── server.js        # Express app entry point
├── Frontend/
│   ├── public/
│   └── src/
│       ├── components/  # Header, Footer, HeroSlider, cards, AdminRoute...
│       ├── context/     # AuthContext, SearchContext
│       ├── pages/       # Home, Indoor, Outdoor, Crackers, ProductDetail, auth pages...
│       ├── styles/      # per-page CSS
│       └── utils/       # optimizeImage (Cloudinary), helpers
└── .github/workflows/deploy-production.yml
```

## Features

- Home page with hero slider, categorised product sections and videos
- Category pages: Indoor, Outdoor, Crackers, Event & Parties
- Product detail pages with technical specs and image zoom (login required)
- Search and filters across products
- Email/password signup and login, plus **Sign in with Google**
- Forgot and reset password via emailed link (15 minute expiry)
- Event booking and general enquiry forms
- Admin-only pages to add products and videos (Cloudinary uploads)
- Performance: Cloudinary image transformations, lazy-loaded images, gzip compression, cached home endpoint

## Getting Started

### Prerequisites

- Node.js 18 or later
- A MongoDB database (local or Atlas)
- A Cloudinary account
- A Gmail account with an app password (for reset emails)
- A Google Cloud OAuth client (for Google login)

### 1. Clone

```bash
git clone https://github.com/Pyro-Dekho/PyroDekho.git
cd PyroDekho
```

### 2. Backend

```bash
cd Backend
npm install
```

Create `Backend/.env`:

```env
PORT=5000
MONGO_URI=<mongodb connection string>
JWT_SECRET=<long random string>

CLIENT_URL=http://localhost:5173

EMAIL_USER=<gmail address>
EMAIL_PASS=<gmail app password>

CLOUD_NAME=<cloudinary cloud name>
CLOUDINARY_API_KEY=<key>
CLOUDINARY_API_SECRET=<secret>
FOLDER_NAME=<cloudinary folder>

GOOGLE_CLIENT_ID=<google client id>
GOOGLE_CLIENT_SECRET=<google client secret>
GOOGLE_CALLBACK_URL=http://localhost:5000/api/auth/google/callback
```

Run the server (nodemon):

```bash
npm run server
```

The API runs at `http://localhost:5000`.

### 3. Frontend

```bash
cd Frontend
npm install
```

Create `Frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

```bash
npm run dev      # development server
npm run build    # production build to dist/
```

### Google OAuth setup

In Google Cloud Console, create an OAuth client (Web application) and add the value of `GOOGLE_CALLBACK_URL` as an authorised redirect URI. Add the production callback URL as well when deploying.

## API Reference

Base URL: `/api`

### Auth (`/api/auth`)

| Method | Endpoint            | Description |
|--------|---------------------|-------------|
| POST   | `/signup`           | Create an account |
| POST   | `/login`            | Login, returns a JWT |
| POST   | `/forgot-password`  | Email a reset link |
| POST   | `/reset-password`   | Set a new password using the token |
| GET    | `/google`           | Start Google OAuth |
| GET    | `/google/callback`  | Google OAuth callback; sets a cookie and redirects to the client |
| GET    | `/me`               | Current user (from cookie) |

### Products (`/api/products`)

| Method | Endpoint      | Access | Description |
|--------|---------------|--------|-------------|
| GET    | `/home`       | Public | Products grouped by home-page category |
| GET    | `/?category=` | Public | List products, optionally by category |
| GET    | `/:slug`      | Public | Single product |
| POST   | `/create`     | Admin  | Create a product (multipart, image upload) |

### Videos (`/api/videos`)

| Method | Endpoint       | Access | Description |
|--------|----------------|--------|-------------|
| GET    | `/?type=`      | Public | List videos (`home`, `event`, `cracker`) |
| POST   | `/upload`      | Admin  | Upload a video to Cloudinary |

### Enquiries

| Method | Endpoint             | Description |
|--------|----------------------|-------------|
| POST   | `/api/enquiry`       | General enquiry |
| POST   | `/api/Eventenquiry`  | Event booking enquiry |

## Admin Access

Admin rights are controlled by the email list in `Backend/config/admin.js`. Add an email there to make that account an admin.

## Deployment

Pushing to `main` runs `.github/workflows/deploy-production.yml`. It connects to the VPS over SSH and runs `./deploy.sh` in `/var/www/PyroDekho`.

Required GitHub Actions secrets: `VPS_HOST`, `VPS_PORT`, `VPS_USER`, `VPS_SSH_KEY`, `VPS_KNOWN_HOSTS`.

Make sure the VPS `.env` files contain all the variables above, with production URLs for `CLIENT_URL` and `GOOGLE_CALLBACK_URL`.

## Security Notes

- Never commit `.env` files (they are gitignored).
- Use a strong `JWT_SECRET` and rotate any credentials that have been exposed.
- Use a Gmail app password, not your account password.

## License

Private project. All rights reserved.
