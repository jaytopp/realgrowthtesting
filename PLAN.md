# Real Growth Customer Journey App — Product Plan

## Vision

A vertical, game-like web app where customers progress through a single path — one step at a time — building every marketing asset they need from book to launch. Each step unlocks only after the previous one is completed. No skipping. No jumping ahead. Just focused, guided forward momentum.

---

## Core Mechanic: The Vertical Unlock System

The entire app is a **single vertical tower** of steps. Think of it like a game level map — you can see what's ahead, but everything below your current step is locked.

### How It Works

```
 [7.4] Schedule strategy call             🔒 LOCKED
 [7.3] Download all assets                🔒 LOCKED
 [7.2] Launch checklist                   🔒 LOCKED
 [7.1] Review asset library               🔒 LOCKED
  ─── PHASE 7: LAUNCH ─────────────────────────
 [6.4] Ad creative brief                  🔒 LOCKED
 [6.3] Ad headlines & hooks               🔒 LOCKED
 [6.2] Ad copy variations                 🔒 LOCKED
 [6.1] Ad strategy                        🔒 LOCKED
  ─── PHASE 6: ADS & TRAFFIC ──────────────────
       ...
  ─── PHASE 2: BOOK ───────────────────────────
 [1.4] Brand voice & tone                 🔒 LOCKED
 [1.3] Core message & mechanism           🔒 LOCKED
 [1.2] Customer avatar                    🔒 LOCKED
 [1.1] Brand discovery               ← ✅ YOU ARE HERE
  ─── PHASE 1: FOUNDATION ─────────────────────
```

### Rules

1. **One active step at a time.** Only the current step is interactive. Everything above is locked (greyed out, no click). Everything below is completed (green checkmark, reviewable but not editable).
2. **Completion gates.** Each step has a clear completion condition — submit a form, approve an AI draft, or finalize an edit. Until that condition is met, the "Continue" button stays disabled.
3. **No skipping.** The URL `/journey/step/14` returns a redirect to whatever step the user is actually on if they haven't reached step 14 yet.
4. **Visible progress.** The user can always scroll the vertical map to see what's coming — it builds anticipation — but locked steps show only the title and a lock icon, not the content.
5. **Completed steps are reviewable.** Tapping a completed step expands it to show the asset produced, but it's read-only (with an option to request a revision that doesn't break the chain).
6. **Phase milestones.** When all steps in a phase complete, the user gets a milestone celebration screen (confetti, summary of what they built, preview of what's next).

---

## The Vertical Map: All 30 Steps

The user sees this as a single scrollable vertical path. Steps are numbered globally (1–30) so there's a clear sense of "I'm on step 12 of 30."

### Phase 1 — Foundation (Steps 1–4)

| # | Step | What happens | Completion gate |
|---|------|-------------|-----------------|
| 1 | **Brand Discovery** | Answer questions: who you serve, your niche, the transformation you deliver | All fields filled + submitted |
| 2 | **Customer Avatar** | Build your ideal reader/buyer profile: demographics, pains, desires, objections | Avatar approved |
| 3 | **Core Message & Mechanism** | Define your unique message, framework name, and differentiator | Message framework approved |
| 4 | **Voice & Tone** | Pick from voice/tone presets or describe your own; see a sample paragraph generated in that voice | Voice selection confirmed |

**Phase 1 Milestone:** "Your foundation is set. Here's your Brand Brief." → downloadable one-pager.

### Phase 2 — Book (Steps 5–12)

| # | Step | What happens | Completion gate |
|---|------|-------------|-----------------|
| 5 | **Book Type** | Choose: authority book, lead-gen book, or signature framework book | Type selected |
| 6 | **Title & Subtitle** | AI suggests options based on brand brief; user picks or writes their own | Title confirmed |
| 7 | **Chapter Outline** | AI generates chapter titles + one-line descriptions; user reorders, adds, removes | Outline approved |
| 8 | **Chapter 1 Draft** | AI writes first chapter draft; user reviews in editor | Chapter marked as done |
| 9 | **Chapters 2–N Drafts** | Repeats for each chapter (sub-steps within this step, one chapter at a time) | All chapters marked done |
| 10 | **Front & Back Matter** | AI generates foreword, about the author, dedication, CTA pages | All sections approved |
| 11 | **Manuscript Review** | Full manuscript shown in reading view; user does final approval | Manuscript approved |
| 12 | **Book Cover** | Upload a cover or use AI to generate a cover concept/mockup | Cover confirmed |

**Phase 2 Milestone:** "Your book is done. Here's your complete manuscript." → downloadable PDF.

### Phase 3 — Lead Magnet & Content (Steps 13–17)

| # | Step | What happens | Completion gate |
|---|------|-------------|-----------------|
| 13 | **Lead Magnet Type** | Choose: checklist, cheat sheet, mini-course, quiz, sample chapter | Type selected |
| 14 | **Lead Magnet Content** | AI generates the lead magnet from your book + brand brief | Content approved |
| 15 | **Book Hook** | AI writes a short punchy pitch paragraph for ads and social | Hook approved |
| 16 | **Welcome Email Sequence** | AI generates 3–5 welcome emails for new subscribers | All emails approved |
| 17 | **Social Media Posts** | AI generates 5–10 launch/announcement posts | Posts approved |

**Phase 3 Milestone:** "Your content engine is built." → downloadable asset pack.

### Phase 4 — Funnel (Steps 18–23)

| # | Step | What happens | Completion gate |
|---|------|-------------|-----------------|
| 18 | **Funnel Type** | Choose: free + shipping book funnel, webinar funnel, or lead magnet funnel | Type selected |
| 19 | **Landing Page Copy** | AI generates headline, subhead, bullets, CTA, social proof sections | Copy approved |
| 20 | **Thank-You Page Copy** | AI generates confirmation + next-step page | Copy approved |
| 21 | **Upsell / Order Bump Copy** | AI generates upsell offer copy (skippable if funnel type doesn't need it) | Copy approved or skipped |
| 22 | **Sales Page Copy** | AI generates long-form sales page for core offer | Copy approved |
| 23 | **Funnel Review** | Visual flow showing all pages in sequence; final approval | Funnel approved |

**Phase 4 Milestone:** "Your funnel is mapped out." → downloadable copy doc.

### Phase 5 — Email Sequences (Steps 24–27)

| # | Step | What happens | Completion gate |
|---|------|-------------|-----------------|
| 24 | **Offer Brief** | Define your core offer, pricing, bonuses, guarantee | Brief submitted |
| 25 | **Nurture Sequence** | AI generates 7–14 value/story emails | All emails approved |
| 26 | **Launch Sequence** | AI generates 5–7 cart-open / urgency emails | All emails approved |
| 27 | **Follow-Up Sequence** | AI generates 3–5 abandoned cart / last-chance emails | All emails approved |

**Phase 5 Milestone:** "Your email machine is loaded." → downloadable email swipe file.

### Phase 6 — Ads & Traffic (Steps 28–30)

| # | Step | What happens | Completion gate |
|---|------|-------------|-----------------|
| 28 | **Ad Strategy** | Pick platform(s), set budget range, define campaign goal | Strategy confirmed |
| 29 | **Ad Copy & Headlines** | AI generates 3–5 ad copy variations with headlines and hooks | Ads approved |
| 30 | **Ad Creative Brief** | AI generates specs, image/video direction, and creative guidelines | Brief approved |

**Phase 6 Milestone:** "Your traffic plan is ready."

### Phase 7 — Launch (Steps 31–33)

| # | Step | What happens | Completion gate |
|---|------|-------------|-----------------|
| 31 | **Asset Library Review** | See every asset you've created, organized by phase | Reviewed |
| 32 | **Launch Checklist** | Interactive checklist: domain, email provider connected, funnel live, ads submitted, etc. | All items checked |
| 33 | **Download & Go Live** | Download everything as a ZIP; optional: book a strategy call | Downloaded |

**Final Milestone:** "You did it. Your entire marketing system is built." → celebration screen + CTA.

---

## UI Design: The Vertical Tower

### Layout

```
┌─────────────────────────────────────────────────┐
│  LOGO          Step 12 of 33       [progress ━━━━━━━━━━━━░░░░░░░] 36%  │
├────────────────┬────────────────────────────────┤
│                │                                │
│  VERTICAL MAP  │       ACTIVE STEP CONTENT      │
│                │                                │
│  ✅ 1 Brand    │  ┌──────────────────────────┐  │
│  ✅ 2 Avatar   │  │                          │  │
│  ✅ 3 Message  │  │   Book Cover             │  │
│  ✅ 4 Voice    │  │                          │  │
│  ── PHASE 1 ── │  │   Upload your cover or   │  │
│  ✅ 5 Type     │  │   generate a concept...  │  │
│  ✅ 6 Title    │  │                          │  │
│  ✅ 7 Outline  │  │   [Upload]  [Generate]   │  │
│  ✅ 8 Ch.1     │  │                          │  │
│  ✅ 9 Ch.2-N   │  │                          │  │
│  ✅ 10 Matter  │  │                          │  │
│  ✅ 11 Review  │  │                          │  │
│  → 12 Cover    │  │   ┌──────────────────┐   │  │
│  ── PHASE 2 ── │  │   │  [Continue →]    │   │  │
│  🔒 13 Lead    │  │   └──────────────────┘   │  │
│  🔒 14 Content │  └──────────────────────────┘  │
│  🔒 15 Hook    │                                │
│  🔒 ...        │                                │
│                │                                │
└────────────────┴────────────────────────────────┘
```

### Visual States for Each Step

| State | Icon | Appearance | Behavior |
|-------|------|-----------|----------|
| **Completed** | ✅ | Green text, checkmark | Click to expand and review (read-only) |
| **Current** | → | Highlighted, pulsing indicator | Full interactive content in main panel |
| **Locked** | 🔒 | Grey text, lock icon | Shows title only, not clickable |

### Mobile Layout

On mobile, the vertical map becomes a **collapsible top bar** showing "Step 12 of 33 — Book Cover" with a dropdown to see the full map. The main content fills the screen.

### Key Interactions

1. **Continue Button** — Always at the bottom of the active step. Disabled until the completion gate is met. This is the ONLY way to advance.
2. **Phase Milestone Screens** — Full-screen celebration when a phase completes. Shows a summary card of everything built in that phase + a "Start Phase X" button.
3. **Review Mode** — Clicking a completed step in the sidebar slides open a read-only preview of that asset. A small "Request Revision" link lets them flag it for re-editing (which pauses forward progress until resolved).
4. **AI Generation Flow** — "Generate" button → streaming text appears → "Accept" / "Regenerate" / "Edit manually" → once accepted, Continue button activates.

---

## Progression Engine (Backend Logic)

### Step State Machine

Each step for a user has exactly one state:

```
LOCKED → ACTIVE → COMPLETED
```

- Only ONE step can be `ACTIVE` at a time per user.
- When a step moves to `COMPLETED`, the next step automatically moves from `LOCKED` to `ACTIVE`.
- The journey record tracks `current_step_number` (integer 1–33).

### Data Model

```
User
├── id, email, name, avatar_url, created_at

Journey
├── id, user_id, current_step (int 1–33), started_at, completed_at
├── status: "in_progress" | "completed"

StepCompletion
├── id, journey_id, step_number (int 1–33)
├── completed_at, time_spent_seconds
├── data (JSONB — stores the inputs/outputs for that step)

Asset
├── id, journey_id, step_number, phase_number
├── type: "brand_brief" | "avatar" | "manuscript" | "lead_magnet" | ...
├── title, content_json, file_url
├── created_at
```

The `StepCompletion.data` JSONB field stores everything step-specific:
- Step 1 → `{ audience: "...", niche: "...", transformation: "..." }`
- Step 8 → `{ chapter_number: 1, title: "...", content: "...", word_count: 2340 }`
- Step 19 → `{ headline: "...", subhead: "...", bullets: [...], cta: "..." }`

This keeps the schema flat — no dozens of tables. One step = one row in `StepCompletion` with flexible data.

### API Design

```
GET  /api/journey              → current journey state + current_step
GET  /api/journey/step/:num    → step data (returns 403 if step is locked)
POST /api/journey/step/:num    → submit/complete a step (validates completion gate)
POST /api/journey/step/:num/generate  → trigger AI generation for this step
GET  /api/journey/assets       → all completed assets
```

The `POST /api/journey/step/:num` endpoint enforces the rules:
- Rejects if `num !== journey.current_step` (can't skip or go back)
- Validates that all required fields are present
- Creates `StepCompletion` row
- Advances `journey.current_step` to `num + 1`
- Returns the updated journey state

### Route Protection

```
/journey/step/[num]  →  middleware checks:
  1. Is user authenticated?
  2. Does user have an active journey?
  3. Is [num] === journey.current_step?
     - If num < current_step → show read-only review
     - If num === current_step → show active step
     - If num > current_step → redirect to /journey/step/{current_step}
```

---

## Tech Stack

| Layer | Technology | Rationale |
|-------|-----------|-----------|
| Framework | **Next.js 14 (App Router)** | Server components, API routes, middleware for route protection |
| Language | **TypeScript** | Type safety across the stack |
| Styling | **Tailwind CSS + shadcn/ui** | Rapid UI, polished components, easy theming |
| Database | **PostgreSQL** (via Supabase or Neon) | Relational + JSONB for flexible step data |
| ORM | **Prisma** | Type-safe queries, migrations |
| Auth | **NextAuth.js v5** | Email/password + OAuth |
| AI | **Anthropic Claude API** | Content generation engine |
| Rich Text Editor | **Tiptap** | Chapter editing, email editing |
| File Storage | **S3-compatible** (Supabase Storage) | PDFs, cover images, exports |
| PDF Generation | **@react-pdf/renderer** | Asset exports |
| Animations | **Framer Motion** | Step transitions, milestone celebrations, progress animations |
| Deployment | **Vercel** | Zero-config Next.js hosting |
| Payments | **Stripe** | Access gating |

---

## Build Milestones

### Milestone 1 — The Skeleton (Vertical Tower + Auth)
- Next.js project scaffolding
- Auth (sign up, log in, session)
- Database schema: User, Journey, StepCompletion, Asset
- Vertical map sidebar component with all 33 steps (all locked except step 1)
- Step routing + middleware (redirect logic for locked steps)
- "Continue" button wiring
- Step state machine (LOCKED → ACTIVE → COMPLETED)

### Milestone 2 — Phase 1 Playable (Steps 1–4)
- Step 1: Brand discovery form
- Step 2: Customer avatar builder
- Step 3: Core message generator (first AI integration)
- Step 4: Voice & tone selector with live preview
- Phase 1 milestone celebration screen
- Asset storage for Brand Brief PDF

### Milestone 3 — Phase 2 Playable (Steps 5–12)
- Book type selector
- Title generator with AI suggestions
- Outline builder
- Chapter-by-chapter AI drafting with streaming
- Rich text editor for chapter refinement
- Manuscript assembly view
- Cover upload / generation
- Phase 2 milestone celebration

### Milestone 4 — Phases 3 & 4 Playable (Steps 13–23)
- Lead magnet flow
- Book hook, welcome emails, social posts generators
- Funnel type selector + all funnel page copy generators
- Funnel visual preview
- Phase 3 & 4 milestone celebrations

### Milestone 5 — Phases 5 & 6 Playable (Steps 24–30)
- Offer brief form
- All email sequence generators (nurture, launch, follow-up)
- Ad strategy + copy + creative brief generators
- Phase 5 & 6 milestone celebrations

### Milestone 6 — Phase 7 + Polish (Steps 31–33)
- Asset library with organized downloads
- Interactive launch checklist
- ZIP export
- Final celebration screen
- Mobile responsive pass
- Onboarding welcome screen
- Stripe integration for access gating

---

## Open Questions

1. **Pricing model** — One-time purchase, subscription, or bundled with an existing program?
2. **AI provider** — Claude, GPT-4o, or configurable?
3. **Revision policy** — Can users revise completed steps? If so, does it re-lock downstream steps?
4. **Multi-journey** — One journey per user, or can they start fresh for a second book?
5. **Coach access** — Do coaches/admins need to view a customer's progress?
6. **Integrations** — Export to ConvertKit, ClickFunnels, Kajabi, etc.?
7. **Time estimates** — Show estimated time per step (e.g., "~10 min") on the locked steps?

---

## Summary

This is a **33-step vertical game** where customers climb from zero to a fully built marketing system. One step at a time. No overwhelm, no skipping, no decision fatigue. Each step produces a real asset. Each phase ends with a celebration. By step 33, they have a book, a lead magnet, funnel copy, email sequences, ad copy, and a launch checklist — all generated with AI, refined by them, and ready to deploy.
