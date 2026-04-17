# AndyPetek.com — Project Manifest

## Project Overview

A personal platform for Andy Petek—entrepreneur, creative strategist, and founder of Nimbus Labs. The site serves as a **trust engine**: a body of work that legitimizes Andy as a thought leader, makes him bookable for media opportunities, and supports the launch of new ventures.

This is not a portfolio site or a traditional blog. It's a **magazine-style editorial platform** with a modern tech aesthetic that reflects Andy's position as a tech founder while showcasing 15 years of cross-industry entrepreneurial experience.

---

## Core Purpose

1. **Build credibility** — A content library that answers "who is this guy?" through demonstrated expertise rather than credential lists
2. **Enable discoverability** — Structured content that can be linked, shared, and referenced in specific contexts
3. **Support media opportunities** — Function as a media kit for podcast bookings, speaking, and publicity
4. **Promote projects** — Books, Nimbus Labs, and ongoing work without being salesy

---

## Brand Context

- **Daydreamer** is Andy's personal brand/ethos, not a separate company
- **Nimbus Labs** is the tech company (separate site, linked from here)
- **Daydreamer Beverage** — Instagram for design work (wineries/breweries)
- **Daydreamer Entertainment** — Former podcast network, now dormant
- **Social handle:** Andy.The.Daydreamer

The site should feel like *Andy* with Daydreamer as the personality/voice threading through.

---

## Site Architecture

### Pages

1. **Home**
   - Not a typical landing page
   - Immediately signals "this is a person who thinks and writes"
   - Featured/recent content prominent
   - Subtle introduction to who Andy is
   - Dynamic, magazine-cover feel

2. **About**
   - Narrative story, not a CV
   - The "fighter" narrative — persistence over luck
   - How the journey connects: beverage → design → podcasting → tech
   - The Daydreamer Method as philosophy
   - Current focus: Nimbus Labs and community tech

3. **Writing** (Content Library)
   - Two distinct content modes, filterable
   - Card grid with hover states
   - Search functionality
   - Section/category filtering
   
   **The Daydreamer** — lighter, creative, personal
   - **Creativity** — design work, photography, art, beer cans, visual projects
   - **Musings** — travel, observations, anecdotes, personal essays, life lessons
   - **Film** — reviews, essays, industry fascination (250/year viewer)
   - **Books & Reading** — reviews, recommendations, literary interests
   
   **The Business** — substantial, professional, promotional
   - **Building Things** — entrepreneurship, startups, lessons learned, frameworks
   - **Creative Business** — strategy, marketing, branding, the Daydreamer Method
   - **Community & Tech** — Nimbus Labs, apps, nonprofits, arts organizations, case studies
   - **Beverage World** — industry insights, professional commentary, market analysis
   
   **Navigation UX:**
   - Writing page has prominent toggle/tabs: "The Daydreamer" | "The Business"
   - Default view shows mixed feed (all content, chronological)
   - Selecting a section filters to that mode
   - Within each section, category pills allow further filtering
   - Tags work across both sections for cross-cutting themes

4. **Books**
   - Dedicated page for published/forthcoming work
   - Known manuscripts:
     - The Daydreamer Method
     - Business Quest: Your Hero's Journey from Idea to Empire
     - Beverage industry book (21st century)
   - Each book gets a mini-landing section
   - Purchase links, excerpts, related articles

5. **Media / Speaking**
   - Explicit "book me" page
   - Professional headshots (multiple options)
   - Bio snippets (50 word, 150 word, 300 word versions)
   - Topic expertise / speaking topics
   - Past appearances (when available)
   - Contact/booking info

6. **Work / Projects** (Optional, may fold into Writing)
   - Case studies for major projects
   - Links to Nimbus Labs
   - Featured apps/software

---

## Content System

### Article Templates

Five distinct templates, selected when creating a post:

1. **Standard Post**
   - Text-forward
   - Optional hero image
   - Pull quotes auto-styled
   - Images drop into predefined positions based on count
   - Good for: essays, opinions, short insights, musings

2. **Case Study**
   - Structured sections: Context, Challenge, Approach, Outcome
   - Project metadata sidebar (client type, industry, year, role)
   - Image gallery with consistent layout
   - Good for: client work, app launches, project retrospectives, beer can designs

3. **Review**
   - Hero image (poster/cover art)
   - Metadata block (title, year, director/author, rating)
   - Structured but flexible body
   - Optional "Connections" section for cross-domain insights
   - Good for: film reviews, book reviews

4. **Photo Essay / Work Feature**
   - Image-dominant layout
   - Large images with captions
   - Minimal text, maximum visual
   - Good for: design work showcases, packaging galleries, event coverage

5. **Long Read / Book Excerpt**
   - Chapter-style formatting
   - Drop caps
   - Wider margins for readability
   - Reading progress indicator
   - Estimated read time
   - Good for: book excerpts, serialized content, deep dives

### Automatic Image Layouts

Within each template, images arrange based on quantity uploaded:
- 1 image → full-bleed or large centered
- 2 images → side-by-side
- 3 images → grid (1 large + 2 small, or 3 equal)
- 4+ images → masonry or carousel
- All images get subtle hover effects, lightbox on click

### Content Metadata

Each post includes:
- Title
- Subtitle (optional)
- Publish date
- Category (primary)
- Tags (multiple)
- Template type
- Hero image (optional)
- Excerpt (for cards/previews)
- Reading time (auto-calculated)

---

## Design System

### Aesthetic Direction

**Magazine meets tech startup.** Editorial sophistication of Stripe Press or Airbnb Design, personal voice of a premium Substack, interactions of a modern SaaS product.

### Visual Principles

- **Dark mode default** (light mode option)
- **Editorial typography** — confident, large, well-spaced
- **Signature gradient** — Daydreamer brand gradient used as accent throughout
- **Generous whitespace** — content breathes
- **Subtle depth** — shadows, layering, glass effects where appropriate
- **Motion as personality** — everything has considered animation

### Typography

- **Display font** — distinctive, used for headlines and hero text
- **Body font** — highly readable, clean sans-serif
- **Mono font** — for metadata, tags, code snippets
- Large headline sizes (clamp for responsiveness)
- Comfortable line height (1.6-1.8 for body)

### Color System

- **Background:** Deep dark (not pure black)
- **Surface:** Slightly elevated dark
- **Text:** Off-white primary, muted for secondary
- **Accent:** Gradient (define specific colors — suggest warm/cool contrast)
- **Semantic:** Success, warning, error states

### Interactions & Micro-interactions

- Smooth page transitions (fade or slide)
- Scroll-triggered animations (headers, images fade/slide in)
- Hover states on all interactive elements
- Custom cursor (optional, subtle)
- Loading states that feel intentional
- Magnetic buttons (subtle pull effect)
- Text reveal animations on headlines
- Progress indicators for long reads
- Parallax on hero images (subtle)

### Components

- Navigation (sticky, transforms on scroll)
- Article cards (multiple sizes: featured, standard, compact)
- Tag/category pills
- Pull quotes
- Image containers (with loading states, aspect ratios)
- Author bio block
- Related posts section
- Newsletter signup (for future)
- Footer with links and social

---

## Technical Stack

### Core

- **Framework:** React 18+ with Vite
- **Styling:** Tailwind CSS + custom CSS for complex animations
- **Routing:** React Router
- **Deployment:** Vercel (via Git)
- **Domain:** AndyPetek.com

### Backend / Content

- **Content:** MDX files in repo (no database for content)
- **Database:** Supabase (only if needed later for contact forms, analytics, etc.)
- **Image Storage:** `/public/images/` in repo (migrate to Cloudflare R2 if needed)
- **CDN:** Cloudflare (for domain, caching, optional R2)

### Content Management

**MDX-first approach** — all content lives in the repo as MDX files (markdown + React components). This provides:
- Version control for all content
- Write/edit in VS Code
- No database errors or CRUD complexity
- Portable and backed up via Git
- Components for rich editorial layouts within markdown

### Folder Structure

```
/content
  /posts
    building-apps-for-jazz-clubs.mdx
    the-daydreamer-method-explained.mdx
    lessons-from-running-a-cidery.mdx
  /books
    daydreamer-method.mdx
    business-quest.mdx
    beverage-industry.mdx
  /pages
    about.mdx
    media.mdx

/public
  /images
    /posts
      /[post-slug]
        hero.jpg
        image-01.jpg
        image-02.jpg
    /books
      daydreamer-method-cover.jpg
      business-quest-cover.jpg
    /media
      headshot-01.jpg
      headshot-02.jpg
    /site
      og-image.jpg
      logo.svg
```

### Frontmatter Schema

**Standard fields (all posts):**
```yaml
---
title: "Post Title"
subtitle: "Optional subtitle"
date: 2025-12-28
updated: 2025-12-30  # optional
section: daydreamer  # daydreamer | business (determines content mode)
category: creativity  # specific category within section
tags:
  - photography
  - seattle
  - travel
template: standard  # standard | case-study | review | photo-essay | long-read
hero: /images/posts/post-slug/hero.jpg
excerpt: "Short description for cards and SEO."
featured: true  # optional, for homepage featuring
draft: false  # optional, hides from production
---
```

**Section + Category combinations:**
- `section: daydreamer` → categories: creativity, musings, film, books
- `section: business` → categories: building-things, creative-business, community-tech, beverage-world

**Additional fields for reviews (template: review):**
```yaml
---
# ... standard fields above, plus:
reviewOf:
  title: "The Brutalist"
  year: 2024
  type: film  # film | book | album | other
  creator: "Brady Corbet"  # director, author, artist
  creatorRole: "Director"  # Director, Author, Artist, etc.
  image: /images/posts/brutalist-review/poster.jpg
  rating: 4.5  # out of 5, optional
  link: "https://letterboxd.com/..."  # optional external link
---
```

### MDX Image Components

Custom React components available within MDX files for editorial layouts:

- `<Image />` — single image with optional caption, loading states
- `<ImageGrid>` — wraps multiple images, auto-arranges based on count
  - 2 images → side-by-side
  - 3 images → triptych (1 large + 2 small, or 3 equal)
  - 4+ images → 2x2 grid or masonry
- `<ImageGallery />` — clickable thumbnails with lightbox
- `<FullBleed />` — edge-to-edge dramatic image with optional caption
- `<ImageLeft />` / `<ImageRight />` — float image with text wrap
- `<Callout />` — styled blockquote/highlight box
- `<PullQuote />` — large editorial quote

**Example MDX usage:**

```mdx
---
title: "Building Apps for Jazz Clubs"
template: case-study
hero: /images/posts/jazz-alley/hero.jpg
---

The project started with a simple question...

<ImageGrid>
  <Image src="/images/posts/jazz-alley/app-home.jpg" alt="App home screen" />
  <Image src="/images/posts/jazz-alley/membership.jpg" alt="Membership card" />
</ImageGrid>

What we discovered was...

<FullBleed src="/images/posts/jazz-alley/venue.jpg" caption="The historic venue" />

<PullQuote>The best software disappears into the experience.</PullQuote>
```

### Image Hosting Strategy

**Phase 1:** Images in repo (`/public/images/`)
- Simplest setup
- Optimized at build time
- Works immediately

**Phase 2 (if needed):** Migrate to Cloudflare R2
- When repo gets heavy with images
- Images served via CDN
- MDX files don't change, just update base paths

### Key Libraries

- `framer-motion` — animations and page transitions
- `@mdx-js/mdx` + `@mdx-js/react` — MDX processing
- `gray-matter` — frontmatter parsing
- `react-intersection-observer` — scroll animations
- `date-fns` — date formatting
- `reading-time` — auto-calculate read time
- `yet-another-react-lightbox` — image gallery lightbox
- `sharp` — build-time image optimization

---

## Development Phases

### Phase 1: Foundation
- Project setup (Vite, React, Tailwind, routing)
- Design system tokens (colors, typography, spacing)
- Core layout components (nav, footer, page containers)
- Dark/light mode toggle
- Basic page shells (Home, About, Writing, Books, Media)

### Phase 2: Design System Components
- Button variants
- Card components (article cards in multiple sizes)
- Typography components (headlines, body, pull quotes)
- Image components with loading states
- Tag/category pills
- Navigation with scroll behavior

### Phase 3: Content Templates
- Standard post template
- Case study template
- Photo essay template
- Long read template
- Automatic image layout logic

### Phase 4: Content Infrastructure
- MDX processing pipeline
- Frontmatter parsing and validation
- Content fetching utilities (get all posts, get by slug, filter by category)
- Image optimization pipeline (sharp at build time)
- RSS feed generation
- Sitemap generation

### Phase 5: Interactions & Polish
- Page transitions
- Scroll animations
- Micro-interactions
- Loading states
- Performance optimization

### Phase 6: Launch Prep
- SEO setup (meta tags, OpenGraph, structured data)
- Analytics integration
- Final content migration
- Testing across devices

---

## Content Strategy Notes

- **Publishing cadence:** Multiple times per week
- **No email subscription initially** — focus on building library
- **Content serves multiple purposes:**
  - Shareable reference material
  - Demonstration of expertise
  - Support for business development
  - Foundation for future book promotion

- **Theme over industry:** Posts organized by insight/lesson, not client sector
- **Diversity as feature:** Cross-industry experience shows battle-tested ideas

---

## Voice & Positioning

### The Core Truth

Andy is a creative polymath and solopreneur who has operated for 15 years as a one-person operation that delivers like a 30-person company. This is a feature, not a bug. The site should not pretend to be an agency or a large operation—it should present Andy as what he is: a deeply experienced generalist who personally cares about every project.

### The Imposter Syndrome Problem

Previous attempts at self-presentation failed because listing accomplishments across disparate industries either:
- Sounds unbelievable ("this can't all be one person")
- Implies wealth/success that doesn't match reality
- Feels like bragging

### The Solution: Show, Don't List

Instead of credential walls, the content library demonstrates expertise through *doing*. A film review shows critical thinking. A case study shows craft. A beer can breakdown shows design mastery. The diversity becomes evidence of a curious, rigorous mind rather than a suspicious resume.

### The Two-Section Strategy

The "Daydreamer" and "Business" split serves multiple purposes:

1. **Permission to be light:** Not every post needs to justify expertise. Travel anecdotes and film reviews can exist without business lessons attached.

2. **Different entry points:** A potential client finds the business content first. A podcast booker might discover the personality content. Both paths lead to the full picture.

3. **Gradual revelation:** The Daydreamer section is where personal truth can live—travel essays that mention hard years, film reviews that reveal inner life, musings that touch on what the journey has cost. The memoir emerges in fragments over time, without requiring a dedicated confessional.

4. **Proof of range:** The existence of both sections demonstrates exactly who Andy is—someone who thinks seriously about business AND watches 250 films a year AND designs beer cans. The eclecticism becomes undeniable.

### Tone Guidelines

- **Confident but not performative** — Direct about skills without puffing up. "I'm genuinely great at this" is fine; "I'm a visionary leader" is not.
- **Warm and approachable** — The person behind the work is present and likable.
- **Intellectually curious** — Ideas connect across domains. A film review might illuminate a business principle.
- **Self-aware without self-deprecating** — Acknowledge the unusual path without undermining it. Moving away from humor-as-shield toward genuine self-respect.
- **Irreverent where appropriate** — Not everything needs to be serious. The eccentric entrepreneur voice is an asset.

### Who This Attracts

- Nonprofits and arts organizations who want a partner, not a vendor
- Small businesses who value personal attention over process
- Media/podcast bookers looking for interesting, multifaceted guests
- Fellow entrepreneurs who relate to the solopreneur struggle
- People in beverage/film/arts who share specific interests

### Who This Filters Out

- People looking for a "real" company with staff and offices
- Clients who want the cheapest option
- Anyone uncomfortable with personality-forward branding

This filtering is intentional and healthy.

---

## Personal Context (For Reference)

- **Film:** Watches 250+ movies per year. Genuine passion, not casual. Goal is deeper involvement in entertainment industry via film festivals and conventions.
- **Beer can design:** One of the best in the country. Hard to step away from, but graphic design is declining with AI. This work should be showcased proudly, not hidden.
- **Entertainment industry goals:** Using free tech solutions for film festivals and comic cons as an entry point. Seeking board positions, sponsorships, industry relationships.
- **The fighter narrative:** More rock-bottom moments than big wins. Persistence over luck. This is relatable and trustworthy to target audiences.
- **Solopreneur reality:** Never more than 3-5 staff, often just Andy. Network of trade partners, interns, volunteers. Delivers big results with lean operation.
- **Unemployable by design:** Resume is uncategorizable—too varied, too weird, too much. This isn't a fallback to entrepreneurship; it's identity. The traditional job market has no box for someone who's done all this. That's not a bug, it's the whole point. The people who hire Andy aren't looking for a conventional candidate—they're looking for someone who's *been through it* and can't be compared to anyone else.
- **The "real job" pressure:** Has faced external pressure and internal moments of doubt about getting traditional employment. But the path is the path now—it's who he is, not just what he does.
- **Weird guy energy:** Doesn't take success too seriously. Has a different definition of success than most. Wants the site to feel genuine to this—not performed quirkiness, but actual personality.

---

## Personality & Tone in Design

The site should feel like a person lives here—not a polished corporate presence, but someone with actual opinions, humor, and warmth.

### Microcopy with Voice

Small moments of personality throughout:
- **404 page:** "This page doesn't exist. Neither does work-life balance."
- **Footer:** "Made by one guy in Seattle who should probably be sleeping"
- **Loading states:** "Brewing..." or other contextual phrases
- **Empty search:** "Nothing here. Story of my twenties."
- **Contact page:** Something human, not corporate

### Unexpected Details

- **"Currently" section:** What Andy is watching, reading, building, obsessing over. Updated regularly. Shows the real, in-progress person.
- **Rotating elements:** Random taglines, mood indicators, small surprises that signal this isn't static
- **Easter eggs:** Rewards for people who explore

### Visual Warmth

- Dark mode but not cold—warm accent colors, not sterile tech-bro blue
- Photography that's candid, not stock-polished
- Design that feels crafted by a designer, not a template
- Space for imperfection and personality

### The About Page Approach

Opens with confident weirdness, not polished bio. Something like:

> "I've started more businesses than I can count, lost everything twice, designed beer cans for a living, watched 250 movies last year, and somehow ended up building software for jazz clubs and film festivals. I don't know what to call that, but I'm done apologizing for it."

Not self-deprecating. Confident in its own uncategorizability.

### Potential Standalone Piece

Early content could include something like "What I Mean By Success" — defining terms on his own terms. Sets expectations, filters audience, attracts the right people.

---

## Open Questions

1. Specific gradient colors for Daydreamer brand?
2. Preferred display typeface?
3. Image optimization approach (build-time with sharp vs. Cloudflare transforms)?
4. Any existing brand assets to incorporate?
5. Timeline/priority for launch?

---

## Reference Sites (To Discuss)

- Stripe Press (editorial quality)
- Airbnb Design (tech + storytelling)
- Notion's blog (clean, systematic)
- Linear's website (interactions, dark mode)
- Vercel's blog (developer aesthetic)

---

*Manifest created: December 2025*
*Ready to begin Phase 1 when Andy is at desktop*
