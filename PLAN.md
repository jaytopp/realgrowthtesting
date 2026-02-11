# Real Growth Customer Journey App — Product Plan

## Vision

A step-by-step web application that guides customers through the entire process of building their marketing engine: writing a book, creating lead magnets, building funnels, and launching campaigns — with every asset they need produced along the way.

---

## Core Concept

The app works like a **guided quest system**. Customers move through sequential phases, each containing discrete steps. Every step either:

1. **Collects input** (answers, preferences, uploads)
2. **Generates an asset** (using AI + templates)
3. **Reviews / refines** (edit, approve, or regenerate)

Progress is saved. Customers can pause and return. Each phase unlocks the next.

---

## Phases & Steps

### Phase 1 — Foundation & Brand Clarity

| Step | What the customer does | Asset produced |
|------|----------------------|----------------|
| 1.1 | Answer brand discovery questions (audience, niche, transformation promise) | **Brand Brief** document |
| 1.2 | Define ideal reader / customer avatar | **Customer Avatar** profile |
| 1.3 | Clarify core message & unique mechanism | **Core Message Framework** |
| 1.4 | Choose brand voice & tone | **Voice & Tone Guide** |

### Phase 2 — Book Planning & Writing

| Step | What the customer does | Asset produced |
|------|----------------------|----------------|
| 2.1 | Select book type (authority book, lead-gen book, signature framework book) | Book type selection locked in |
| 2.2 | Guided outline builder — title, subtitle, chapter themes | **Book Outline** |
| 2.3 | Chapter-by-chapter writing prompts + AI draft generation | **Draft Chapters** (iterative) |
| 2.4 | Review & edit each chapter in a rich text editor | **Edited Manuscript** |
| 2.5 | Generate front/back matter (foreword, about the author, CTA pages) | **Complete Manuscript** |
| 2.6 | Choose cover direction, upload or generate cover mockup | **Book Cover Asset** |

### Phase 3 — Lead Magnet & Content Assets

| Step | What the customer does | Asset produced |
|------|----------------------|----------------|
| 3.1 | Select lead magnet type (checklist, cheat sheet, mini-course, quiz) | Lead magnet type locked in |
| 3.2 | AI generates lead magnet content from book + brand brief | **Lead Magnet PDF / Content** |
| 3.3 | Create a "book hook" — short pitch paragraph for ads & social | **Book Hook Copy** |
| 3.4 | Generate email welcome sequence (3–5 emails) | **Welcome Email Sequence** |
| 3.5 | Generate social media announcement posts (5–10 posts) | **Social Media Post Kit** |

### Phase 4 — Funnel Building

| Step | What the customer does | Asset produced |
|------|----------------------|----------------|
| 4.1 | Select funnel type (free + shipping book funnel, webinar funnel, lead magnet funnel) | Funnel type locked in |
| 4.2 | AI generates opt-in / landing page copy | **Landing Page Copy** |
| 4.3 | AI generates thank-you / confirmation page copy | **Thank-You Page Copy** |
| 4.4 | AI generates upsell / order bump copy (if applicable) | **Upsell Page Copy** |
| 4.5 | AI generates sales page copy for core offer | **Sales Page Copy** |
| 4.6 | Review full funnel flow in a visual preview | **Funnel Copy Package** (all pages) |

### Phase 5 — Email & Nurture Sequences

| Step | What the customer does | Asset produced |
|------|----------------------|----------------|
| 5.1 | Define core offer & pricing | **Offer Brief** |
| 5.2 | AI generates nurture email sequence (7–14 emails) | **Nurture Sequence** |
| 5.3 | AI generates cart-open / launch sequence (5–7 emails) | **Launch Sequence** |
| 5.4 | AI generates abandoned cart / follow-up sequence | **Follow-Up Sequence** |

### Phase 6 — Ads & Traffic

| Step | What the customer does | Asset produced |
|------|----------------------|----------------|
| 6.1 | Define ad budget & platform (Facebook, Instagram, YouTube, etc.) | Ad strategy selection |
| 6.2 | AI generates ad copy variations (3–5 versions) | **Ad Copy Set** |
| 6.3 | AI generates ad headlines & hooks | **Ad Headlines Kit** |
| 6.4 | Provide guidance on creative (image/video) with specs | **Ad Creative Brief** |

### Phase 7 — Launch Checklist & Go-Live

| Step | What the customer does | Asset produced |
|------|----------------------|----------------|
| 7.1 | Review all assets in a single dashboard | **Asset Library** (organized exports) |
| 7.2 | Walk through go-live checklist | **Launch Checklist** |
| 7.3 | Download all assets (ZIP or individual) | **Export Package** |
| 7.4 | Schedule a strategy call or join community (optional CTA) | — |

---

## App Architecture

### Recommended Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | **Next.js 14 (App Router)** | Server components, API routes, great DX |
| Language | **TypeScript** | Type safety across the stack |
| Styling | **Tailwind CSS + shadcn/ui** | Rapid UI development, polished components |
| Database | **PostgreSQL** (via Supabase or Neon) | Relational data, row-level security |
| ORM | **Prisma** | Type-safe DB access, migrations |
| Auth | **NextAuth.js (Auth.js v5)** | Flexible auth with multiple providers |
| AI | **OpenAI API / Anthropic API** | Content generation engine |
| Rich Text Editor | **Tiptap** or **Novel** | Book chapter editing |
| File Storage | **S3-compatible** (Supabase Storage / AWS S3) | PDF exports, cover images, downloads |
| PDF Generation | **@react-pdf/renderer** or **Puppeteer** | Lead magnets, book exports |
| Deployment | **Vercel** | Zero-config Next.js hosting |
| Payments (optional) | **Stripe** | Gating access to the journey |

### Data Model (Core Entities)

```
User
├── id, email, name, avatar, plan_tier
│
├── Journey (one active journey per user)
│   ├── id, current_phase, current_step, status
│   │
│   ├── BrandBrief
│   │   └── audience, niche, transformation, voice_tone, message_framework
│   │
│   ├── CustomerAvatar
│   │   └── name, demographics, pain_points, desires, objections
│   │
│   ├── Book
│   │   ├── title, subtitle, type, cover_url
│   │   └── Chapters[]
│   │       └── order, title, content, status (draft/reviewed/final)
│   │
│   ├── LeadMagnet
│   │   └── type, title, content, pdf_url
│   │
│   ├── Funnel
│   │   ├── type
│   │   └── FunnelPages[]
│   │       └── page_type (landing, thank_you, upsell, sales), copy, status
│   │
│   ├── EmailSequences[]
│   │   └── sequence_type (welcome, nurture, launch, followup)
│   │       └── Emails[]
│   │           └── subject, body, order, status
│   │
│   ├── AdCopy[]
│   │   └── platform, headline, body, hook, variation_number
│   │
│   └── Assets[] (generated files)
│       └── type, name, url, phase, step
```

### Key UI Patterns

1. **Journey Sidebar** — Always-visible left panel showing all phases and steps with completion state (locked / active / done)
2. **Step View** — Main content area with the current step's form, AI generation, or editor
3. **Asset Preview Panel** — Slide-out panel to preview any previously generated asset
4. **Progress Bar** — Top-level progress indicator across all phases
5. **AI Generation UX** — "Generate" button → streaming text output → "Accept / Regenerate / Edit" controls

### Page Structure

```
/                       → Marketing landing page (public)
/login                  → Auth page
/dashboard              → Journey overview + progress
/journey/[phase]/[step] → Individual step view
/assets                 → Asset library / downloads
/settings               → Account settings
```

---

## AI Generation Strategy

Each "generate" step follows the same pattern:

1. **Gather context** — Pull all previously completed data (brand brief, avatar, book outline, etc.)
2. **Build prompt** — Slot context into a step-specific system prompt template
3. **Stream response** — Display AI output in real-time to the user
4. **Allow editing** — User can manually refine in a rich text editor
5. **Save & advance** — Mark step complete, unlock next step

Prompt templates should be stored as versioned content so they can be improved without code deploys (database or CMS-driven).

---

## Implementation Phases (Build Order)

### Milestone 1 — Skeleton & Auth
- Next.js project setup with TypeScript, Tailwind, shadcn/ui
- Database schema + Prisma setup
- Authentication (email/password + Google OAuth)
- Journey sidebar + step navigation (all steps visible, most locked)
- Dashboard page with journey progress

### Milestone 2 — Phase 1 (Foundation)
- Brand discovery questionnaire forms
- Customer avatar builder
- Core message framework generator (first AI integration)
- Voice & tone selector
- Asset storage for Phase 1 outputs

### Milestone 3 — Phase 2 (Book Writing)
- Book type selector
- Outline builder (drag-and-drop chapter ordering)
- Chapter-by-chapter AI draft generation with streaming
- Rich text editor for chapter editing
- Manuscript assembly + front/back matter generation
- Cover upload or AI mockup

### Milestone 4 — Phase 3 & 4 (Lead Magnets + Funnels)
- Lead magnet type selector + AI generation
- Book hook copy generator
- Email welcome sequence generator
- Funnel type selector
- Landing page / thank-you / upsell / sales page copy generators
- Funnel visual preview

### Milestone 5 — Phase 5 & 6 (Emails + Ads)
- Offer brief form
- Nurture / launch / follow-up email sequence generators
- Ad copy + headline generators
- Ad creative brief builder

### Milestone 6 — Phase 7 (Launch & Export)
- Asset library dashboard with search/filter
- PDF export for all text assets
- ZIP download of full asset package
- Launch checklist with interactive checkboxes
- Optional CTA integrations (Calendly, community link)

### Milestone 7 — Polish & Scale
- Mobile responsive refinements
- Onboarding tour
- Analytics / usage tracking
- Stripe payment integration (if gating access)
- Admin dashboard for monitoring user journeys

---

## Open Questions to Decide

1. **Pricing model** — Is this a one-time purchase, subscription, or bundled with an existing offer?
2. **AI provider** — OpenAI (GPT-4o), Anthropic (Claude), or allow user choice?
3. **Multi-journey support** — Can a user run multiple journeys (e.g., for different books)?
4. **Collaboration** — Will teams/coaches need to view or edit a customer's journey?
5. **White-labeling** — Should the app be brandable for partners/affiliates?
6. **Existing integrations** — Any current tools (ConvertKit, Kajabi, ClickFunnels) that exports should feed into?

---

## Summary

This app turns the overwhelming process of "write a book, build a funnel, launch a business" into a guided, linear experience where every step produces a tangible asset. The AI does the heavy lifting on first drafts; the customer refines and owns the output. By the end, they have a complete marketing system — book, lead magnet, funnel copy, email sequences, and ad copy — ready to deploy.
