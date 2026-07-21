# PrimeAxis Technologies Website

A modern, full-stack marketing website and admin CMS for **PrimeAxis Technologies** — a technology solutions company specializing in Zoho ERP & CRM, custom software, mobile apps, AI automation, and digital marketing.

The public site showcases services, portfolio, case studies, and team information. The admin portal lets each team member manage their own projects while sharing a central contact inbox.

## Tech Stack

| Layer | Technologies |
|--------|----------------|
| Frontend | React 19, Vite 8, React Router 7 |
| Styling | Tailwind CSS v4, custom CSS |
| Animation | Framer Motion, GSAP, Three.js |
| Backend | Firebase Auth, Firestore |
| Images | Cloudinary (optional) or in-browser compression |
| Contact | Firestore inquiries + optional Web3Forms email |

## Features

### Public website

- **Homepage** — Hero, about (video), services, portfolio ring, case studies, team, process, tech stack, testimonials, FAQ, contact
- **About** (`/about`) — Company story, values, capabilities, journey
- **Portfolio** (`/portfolio`) — Published project grid
- **Case studies** (`/case-studies`, `/case-studies/:slug`) — Full project showcases with live solution preview, image gallery, business impact cards, and tech stack
- **Team** (`/team`) — Leadership and specialist profiles
- **Blog** (`/blog`) — Blog listing and posts
- **Contact form** — Saves to Firestore; optional email notification via Web3Forms
- **WhatsApp chat** — Floating support button

### Admin CMS (`/admin`)

- **Authentication** — Email/password signup; accounts require manual activation in Firebase Console
- **Personal workspaces** — Each admin sees and manages **only their own projects**
- **Shared inbox** — Contact messages visible to **all active admins**
- **Project editor** — Title, descriptions, tech stack, features, team, SEO, business impact metrics, draft/publish
- **Image uploads** — 1 cover image + 3 showcase slots + up to 5 extra gallery photos
- **Business impact** — Section intro (plain text) + up to 6 percentage impact cards
- **Roles** — Developer, Business Analyst, Marketing (with different permissions)

## Getting Started

### Prerequisites

- Node.js 18+
- A [Firebase](https://console.firebase.google.com) project (Spark/free tier works)

### Install & run

```bash
npm install
cp .env.example .env.local   # then fill in your Firebase keys
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) for the public site and [http://localhost:5173/admin/login](http://localhost:5173/admin/login) for the admin portal.

### Build

```bash
npm run build    # output in dist/
npm run preview  # preview production build locally
npm run lint     # run oxlint
```

## Environment variables

Copy `.env.example` to `.env.local`:

| Variable | Required | Description |
|----------|----------|-------------|
| `VITE_FIREBASE_*` | Yes | Firebase web app config |
| `VITE_CLOUDINARY_CLOUD_NAME` | No | Cloudinary cloud name for CDN uploads |
| `VITE_CLOUDINARY_UPLOAD_PRESET` | No | Cloudinary unsigned upload preset |
| `VITE_WEB3FORMS_ACCESS_KEY` | No | Email alerts when contact form is submitted |

Without Cloudinary, images are auto-compressed and stored as data URLs in Firestore.

## Firebase setup

1. Create a Firebase project and enable **Authentication** (Email/Password) and **Firestore**.
2. Add your web app and copy config values into `.env.local`.
3. Deploy security rules and indexes:

```bash
firebase deploy --only firestore:rules,firestore:indexes
```

4. **Activate admin accounts** — After signup, set `active: true` on the user's document in the `admins` collection (Firebase Console). Optionally set `role` to `developer`, `analyst`, or `marketing`.

## Project structure

```
src/
├── components/       # UI components (public + admin)
├── constants/        # CMS options, team data, case study samples
├── context/          # Auth and inquiries providers
├── hooks/            # Published projects hook
├── lib/              # Firebase, Cloudinary, image helpers
├── pages/            # Route pages
│   └── admin/        # Admin CMS pages
├── services/         # Firestore CRUD (projects, inquiries, admins)
├── styles/           # Case study & admin CSS
└── utils/            # Project adapter, impact metrics, URLs
```

## Key routes

| Route | Description |
|-------|-------------|
| `/` | Homepage |
| `/about` | About company page |
| `/portfolio` | Portfolio listing |
| `/case-studies/:slug` | Case study detail |
| `/team` | Team page |
| `/admin/dashboard` | Admin dashboard |
| `/admin/projects` | My projects list |
| `/admin/projects/new` | Create project |
| `/admin/messages` | Contact inbox (shared) |

## Admin workflow

1. Register at `/admin/register` and wait for account activation.
2. Create a project at **Add Project**.
3. Add cover image, showcase photos, business impact metrics, and project details.
4. Click **Publish** — the project appears on the homepage portfolio, `/portfolio`, and `/case-studies/:slug`.
5. Monitor contact submissions in **Contact Messages**.

## License

Private — PrimeAxis Technologies. All rights reserved.
