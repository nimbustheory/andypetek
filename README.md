# AndyPetek.com

Personal website and content platform for Andy Petek — creative entrepreneur, founder of Nimbus Labs, and daydreamer.

## Tech Stack

- **Framework:** React 18 + TypeScript
- **Build:** Vite
- **Styling:** Tailwind CSS
- **Animation:** Framer Motion
- **Content:** MDX (Markdown + React components)
- **Routing:** React Router
- **Deployment:** Vercel

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
andypetek/
├── public/
│   └── images/
│       ├── posts/          # Post images organized by slug
│       ├── books/          # Book cover images
│       ├── media/          # Headshots and press images
│       └── site/           # Site-wide assets
├── src/
│   ├── components/
│   │   ├── layout/         # Header, Footer, Layout
│   │   ├── ui/             # Reusable UI components
│   │   └── content/        # MDX components (Image, ImageGrid, etc.)
│   ├── pages/              # Route pages
│   ├── content/
│   │   ├── posts/          # Blog posts (MDX)
│   │   ├── books/          # Book pages (MDX)
│   │   └── pages/          # Static pages (MDX)
│   ├── lib/                # Utilities and helpers
│   └── styles/             # Global CSS
└── ...config files
```

## Content System

Posts are written in MDX with frontmatter:

```mdx
---
title: "Post Title"
subtitle: "Optional subtitle"
date: 2025-01-15
section: business  # daydreamer | business
category: community-tech
tags:
  - nimbus-labs
  - apps
template: case-study  # standard | case-study | review | photo-essay | long-read
hero: /images/posts/post-slug/hero.jpg
excerpt: "Short description for cards and SEO."
featured: true
draft: false
---

Your content here...
```

### Content Sections

**The Daydreamer** (creative, personal)
- creativity, musings, film, books

**The Business** (professional, substantial)
- building-things, creative-business, community-tech, beverage-world

## Design System

### Colors

- **Surface:** Warm dark backgrounds (#0d0c0a → #252220)
- **Text:** Warm off-white (#f5f2ed) with muted variants
- **Accent:** Daydreamer gradient (amber → red → pink)

### Typography

- **Display:** Instrument Serif (headlines)
- **Body:** Plus Jakarta Sans (content)
- **Mono:** JetBrains Mono (tags, code)

### Key Classes

- `.text-gradient` — Daydreamer gradient text
- `.prose-custom` — Article content styling
- `.card-hover` — Card hover effects
- `.glow` — Accent glow effect

## Deployment

Connected to Vercel for automatic deployments:

1. Push to `main` branch
2. Vercel builds and deploys automatically
3. Preview deployments for PRs

## Admin Panel

The site includes a built-in admin panel at `/admin` for managing content without touching code.

### Features

- **Films:** Search TMDB, click to add to your film diary
- **Books:** Search Google Books, add with optional Bookshop.org affiliate link
- **Currently:** Edit all 6 homepage cards (Building, Projects, Design, Reading, Location)

### Setup

1. Create a GitHub Personal Access Token at https://github.com/settings/tokens
   - Select `repo` scope (full control of private repositories)
2. Add these environment variables to Vercel:

```
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx
VITE_GITHUB_REPO=yourusername/andypetek
VITE_ADMIN_PASSWORD=your_secure_password
```

3. Visit `yoursite.com/admin` and enter your password

### How It Works

The admin panel commits changes directly to your GitHub repo via the GitHub API. Vercel detects the commit and automatically rebuilds your site. Changes typically go live within 30-60 seconds.

## Next Steps

- [ ] Add actual headshots to /public/images/media/
- [ ] Configure Vercel environment variables (VITE_TMDB_API_KEY)
- [ ] Set up custom domain (AndyPetek.com)
- [ ] Add more content to film log
- [ ] Implement search functionality
- [ ] Add RSS feed
- [ ] Set up analytics
- [ ] Create sitemap

## Image Directories

```
public/images/
├── apps/
│   └── cinephile/        # App screenshots (c1.jpg - c10.jpg)
├── currently/            # Currently section backgrounds
│   ├── cinephile.jpg     # Building card background
│   ├── jazz-alley.jpg    # Projects card background  
│   ├── chainline.jpg     # Design card background
│   ├── reading.jpg       # Reading card background
│   ├── seattle.jpg       # Location card background
│   └── watching.jpg      # Fallback for watching (uses film poster when available)
├── posts/                # Blog post images
├── books/                # Book covers
├── media/                # Headshots and press
└── site/                 # Site assets
```

### Cinéphile Screenshots
Place your 10 App Store screenshots in `/public/images/apps/cinephile/`:
- c1.jpg through c10.jpg

### Currently Section
Each card has a background image. Add images to `/public/images/currently/` matching the filenames in `currently.json`.

## Currently Section

The homepage "Currently" section pulls from `src/content/currently.json`:

```json
{
  "building": {
    "title": "Cinéphile",
    "description": "Personal film companion app — launching January 2026",
    "link": "/films",
    "image": "/images/currently/cinephile.jpg"
  },
  "projects": {
    "title": "Jazz Alley Membership App",
    "description": "Digital membership for Seattle's legendary jazz venue",
    "link": "/writing/building-apps-for-jazz-clubs",
    "image": "/images/currently/jazz-alley.jpg"
  },
  "design": {
    "title": "Chainline Brewing Rebrand",
    "description": "Full identity system for Kirkland brewery",
    "link": null,
    "image": "/images/currently/chainline.jpg"
  },
  "reading": {
    "title": "Tomorrow, and Tomorrow, and Tomorrow",
    "author": "Gabrielle Zevin",
    "link": null,
    "image": "/images/currently/reading.jpg"
  },
  "location": {
    "city": "Seattle",
    "status": "Home base",
    "image": "/images/currently/seattle.jpg",
    "upcoming": [
      { "city": "San Francisco", "dates": "Jan 5-12" },
      { "city": "Napa", "dates": "Jan 12-15" }
    ]
  },
  "latestApp": {
    "name": "Cinéphile",
    "tagline": "Your personal film companion",
    "description": "...",
    "appStoreLink": "https://apps.apple.com/app/cinephile",
    "screenshots": [
      { "url": "/images/apps/cinephile/screen-1.png", "alt": "..." }
    ]
  }
}
```

**Watching** is pulled automatically from `films-2026.json`.

### Required Images

**Currently Section** (`/public/images/currently/`):
- `cinephile.jpg` - Building card background
- `jazz-alley.jpg` - Projects card background  
- `chainline.jpg` - Design card background
- `watching.jpg` - Fallback when no film logged
- `reading.jpg` - Reading card background
- `seattle.jpg` - Location card background

**Recommended size:** 400x600px (3:4 aspect ratio), JPG

**App Screenshots** (`/public/images/apps/cinephile/`):
- `screen-1.png` through `screen-4.png`
- Size: 1170x2532px (iPhone screenshot size)

## Film Log

The site displays a live film diary from `src/content/films-2026.json`. Click any poster to see full details including cast, crew, trailers, and streaming availability.

### Film Data Structure

```json
{
  "year": 2026,
  "goal": 250,
  "films": [
    { "title": "The Brutalist", "date": "2026-01-15" },
    { "title": "Nosferatu", "date": "2026-01-14" }
  ],
  "lists": {
    "james-cameron": {
      "title": "My James Cameron Rankings",
      "description": "Every Cameron film, ranked",
      "films": [
        { "title": "Aliens", "rank": 1 },
        { "title": "Terminator 2", "rank": 2 }
      ]
    }
  }
}
```

### Adding a Film

Just add an entry to the `films` array in `films-2026.json`:

```json
{ "title": "Film Title", "date": "2026-01-15" }
```

The site automatically fetches posters, metadata, streaming info, trailers, and cast from TMDB.

### Environment Variables

For TMDB API to work, set in `.env.local` (local dev) and Vercel dashboard (production):

```
VITE_TMDB_API_KEY=your_key_here
```

## Daily Workflow with Claude

Send Claude a message like:

```
ARTICLE:
Title: What Beer Can Design Taught Me About Constraints
Section: daydreamer  
Category: creativity
Tags: design, beverage
Excerpt: Fitting a brand onto aluminum.
Images: hero.jpg (in /public/images/posts/beer-can/)

[your content]

FILM: Anora
LIST: james-cameron (if adding to a film list)

BOOK: Project Hail Mary by Andy Weir
BOOKSHOP: https://bookshop.org/p/books/... (optional - I can get from dashboard)

CURRENTLY:
- Building: JoyRead - Book tracking app launching February
- Location: San Francisco (Working remotely, Jan 5-12)
```

Claude will provide:
1. The MDX file to create
2. Updated `films-2026.json` with your new film added
3. Updated `books-2026.json` with your new book added
4. Updated `currently.json` with any changes
5. Bash commands to run:

```bash
cd ~/path/to/andypetek
git add -A && git commit -m "Add: Beer can design post + Anora + Project Hail Mary" && git push
```

Vercel auto-deploys on push.

### Film Review Articles

When writing a film review as a blog post, use the review template:

```yaml
---
title: "The Brutalist"
section: daydreamer
category: film
template: review
reviewOf:
  title: "The Brutalist"
  year: 2024
  type: film
  creator: "Brady Corbet"
  creatorRole: "Director"
---
```

The poster will be automatically fetched and clicking it opens the film modal.

## Reading Log & Bookshop Affiliate

Books are tracked in `src/content/books-2026.json`:

```json
{
  "year": 2026,
  "goal": 52,
  "affiliateShop": "https://bookshop.org/shop/joyread-club",
  "books": [
    { 
      "title": "Tomorrow, and Tomorrow, and Tomorrow", 
      "author": "Gabrielle Zevin",
      "date": "2026-01-15",
      "bookshopUrl": "https://bookshop.org/p/books/..." 
    }
  ]
}
```

**Affiliate Links:**
- Each book can have a direct `bookshopUrl` from your Bookshop.org affiliate dashboard
- If no direct URL provided, links to your shop: https://bookshop.org/shop/joyread-club
- Book covers and metadata are pulled automatically from Google Books API

**Adding a book to your daily message:**
```
BOOK: Tomorrow, and Tomorrow, and Tomorrow by Gabrielle Zevin
BOOKSHOP: https://bookshop.org/p/books/... (optional direct affiliate link)
```

---

Built with too much coffee and Claude.
