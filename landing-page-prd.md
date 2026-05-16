# Atlix Landing Page — Product Requirements Document

**Version:** 1.0  
**Date:** May 5, 2026  
**Authors:** Vishnu Kadaba  

---

## 1. Purpose

Design and ship a public-facing landing page for Atlix that communicates the product's value clearly, creates immediate visual credibility, and drives demo requests from policymakers and institutional stakeholders.

The landing page is the first impression Atlix makes on people who hear about it through word-of-mouth, conference mentions, or outreach. It must feel like a serious intelligence product — not a startup project.

---

## 2. Goals

| Goal | Metric |
|---|---|
| Drive demo requests | ≥ 1 "Book a Demo" submission per week post-launch |
| Communicate value in <10 seconds | Bounce rate < 55% |
| Build credibility with institutional buyers | Time on page > 1:30 avg |
| Support pitch outreach | Can be shared as a URL in cold emails |

---

## 3. Target Audience

**Primary:** City/state-level policymakers and their staff — chief of staff, policy directors, comms leads. They're time-starved, skeptical of "AI" claims, and need to justify tools to leadership. They respond to specificity, credibility signals, and clear ROI.

**Secondary:** NGO analysts, think tank researchers, academic policy programs. More willing to explore, respond well to data rigor messaging.

**What they are NOT:** Marketers, brand managers, PR agencies. Do not use language like "brand monitoring" or "social listening" — that signals wrong-category product.

---

## 4. Design Direction

### 4.1 Aesthetic Reference

Inspired by [Halo Health](https://halohealth.app/): clean sectioned layout, high whitespace, punchy headlines, strong conversion focus, trust signals embedded throughout.

### 4.2 Visual Identity

**Color palette:**
- Background: Near-black (`#0A0A0F`) — dark mode as default
- Primary accent: Electric indigo (`#6366F1`) or deep cobalt blue
- Secondary accent: Muted teal or cyan (`#22D3EE`) for data/chart callouts
- Text: Off-white (`#F8F8FA`), muted gray (`#94A3B8`) for subtext
- Card backgrounds: Slightly lighter dark (`#12121A`) with subtle border glow

**Typography:**
- Headlines: A geometric sans (Inter, Geist, or Sohne) — bold, tight tracking
- Body: Same family, regular weight, generous line height
- Data callouts: Monospace (JetBrains Mono or similar) — reinforces "intelligence terminal" feel

**Motion:**
- Subtle scroll-triggered fade-ins for sections
- Smooth number counters on stats
- Soft animated gradient or particle mesh on hero background (low noise, not distracting)
- No aggressive pop-ins or parallax — keep it readable and fast

**Overall feel:** Bloomberg meets linear.app. Data-serious, not flashy. Premium without being cold.

---

## 5. Page Sections

### Section 1 — Hero

**Goal:** Communicate the core value proposition in 5 seconds. Capture the "Bloomberg Terminal for narratives" concept without jargon.

**Layout:** Full-viewport, centered, dark background with an animated gradient mesh or subtle particle field. Navigation bar floats above.

**Headline (H1):**
> "The pulse of public discourse. In real time."

**Subheadline:**
> Atlix turns digital conversations into structured intelligence — so policymakers can act before a narrative becomes a crisis.

**CTAs:**
- Primary: "Book a Demo" (filled button, indigo)
- Secondary: "See it in action ↓" (text link, scrolls to product section)

**Visual:**
- A live-looking animated dashboard mockup — cards scrolling or updating in real time, a trend line ticking up, a chat query being typed and answered. Conveys the product is alive.

---

### Section 2 — The Problem

**Goal:** Create the "aha" moment — the buyer recognizes their own pain.

**Layout:** Two-column. Left: bold problem statement. Right: 3 bullet points expanding on it.

**Headline:**
> "You're reading yesterday's news."

**Body:**
> Polling takes weeks. Consulting reports take months. Media monitoring tools were built for brand managers — not the people trying to govern.  
> 
> By the time you understand what your constituents are angry about, the narrative has already moved.

**Supporting bullets:**
- Traditional polling lags public sentiment by 2–4 weeks
- Existing social tools (Brandwatch, Meltwater) don't understand policy narratives
- No tool today treats public discourse as a structured, trackable signal

---

### Section 3 — Product Overview

**Goal:** Show what Atlix actually does, without overwhelming. Three clear capabilities.

**Layout:** Three horizontal cards, icon + headline + one-line description. Below: a large annotated product screenshot or interactive demo embed.

**Card 1 — Narrative Detection**
> "Know what's forming before it trends."  
> Atlix clusters thousands of posts into coherent narrative threads — ranked by volume, velocity, and sentiment shift.

**Card 2 — Sentiment Intelligence**
> "Not just what they're saying. How they feel."  
> Every narrative carries a real-time emotional fingerprint — fear, frustration, hope, anger — with week-over-week tracking.

**Card 3 — Natural Language Query**
> "Ask questions. Get answers with sources."  
> Type "What are people in LA saying about the Metro expansion?" and get a structured briefing with citations — in seconds.

**Visual below cards:** Full-width annotated screenshot of the dashboard — cards, trend charts, chat interface. Annotations pointing to key features. Clean, not cluttered.

---

### Section 4 — Data & Trust

**Goal:** Pre-empt the skepticism institutional buyers will have about AI-generated insights. Establish rigor.

**Layout:** Dark card, centered, with 3 stat callouts and a short trust paragraph.

**Stat callouts (in monospace font):**
- `5–15` narrative clusters per query
- `< 15s` end-to-end query response
- `3+` data sources (Reddit, News, X)

**Paragraph:**
> Every insight Atlix surfaces is traceable to a source. No black-box summaries. No manufactured consensus. You can click through to the original posts, articles, and discussions behind every narrative card.

**Sub-note:** "Data sourced from public platforms only. Atlix does not infer demographics, generate counter-narratives, or support influence operations — by design."

---

### Section 5 — Use Cases

**Goal:** Help buyers picture themselves using the product.

**Layout:** 2-column alternating sections (image left / text right, then flip).

**Use Case 1 — City Government**
> A chief of staff wants to know what neighborhoods are buzzing about transit funding before a city council vote. They query Atlix, get a narrative map of the conversation, and walk into the meeting prepared.

**Use Case 2 — Policy Analysts**
> A housing policy researcher at a think tank tracks how the narrative around rent control has shifted over the past 30 days across Reddit and local news — and spots a spike in frustration tied to a specific legislative development.

**Use Case 3 — Crisis Comms**
> A communications director monitors sentiment on a major public health announcement in real time, catching an emerging counter-narrative 48 hours before it reaches mainstream media.

---

### Section 6 — Testimonial / Validation

**Goal:** Social proof from credible voices. Even one strong quote is enough.

**Layout:** Centered, large pull-quote with headshot and title.

> "Tools like this are exactly what city government needs. We're always operating on delayed information — this changes that."  
> — [Name], Former [Title], [City/State]

*(Use actual validation contact quotes once secured. Placeholder is fine for launch.)*

---

### Section 7 — CTA Section

**Goal:** Final push to convert.

**Layout:** Full-width dark section, centered text, one primary CTA.

**Headline:**
> "Stop reacting. Start anticipating."

**Body:**
> Atlix is in early access. We're working with a small number of policy teams and research organizations to shape the product.

**CTA:** "Request Early Access" → opens a simple form (name, org, email, use case — 4 fields max)

---

### Section 8 — Footer

- Logo + tagline: "Atlix — Narrative Intelligence for the Public Sector"
- Links: About, Product, Request Access, Contact
- Legal: Privacy Policy, Terms
- Small note: "Built in LA."

---

## 6. Navigation

**Sticky top nav, minimal:**
- Logo (left)
- Links: Product, Use Cases, About (center, hidden on mobile)
- "Book a Demo" button (right, always visible)

Nav background: transparent on load, blurs to dark on scroll.

---

## 7. Copy Principles

- **No AI buzzwords in headlines.** Don't say "AI-powered" or "machine learning." Say what the product does.
- **Policy-speak over startup-speak.** "Narrative intelligence" not "social listening." "Institutional stakeholders" not "enterprise clients."
- **Active and urgent.** Every headline implies action or consequence.
- **Cite specifics.** Numbers, timelines, and source names beat vague claims.
- **Ethical framing is a feature.** The data transparency and anti-manipulation commitments belong in the copy — they are genuine differentiators with this audience.

---

## 8. Technical Requirements

| Requirement | Spec |
|---|---|
| Framework | Next.js (App Router) + Tailwind CSS |
| Hosting | Vercel (free tier is fine for MVP) |
| CTA form backend | Supabase table or Formspree (no auth needed) |
| Analytics | Plausible or Vercel Analytics (privacy-respecting, fits audience) |
| Performance | Lighthouse score ≥ 90 on mobile and desktop |
| Responsiveness | Full mobile support — some buyers will share the URL on their phone |
| Domain | atlix.io or similar (to confirm) |
| OG tags | Custom OG image for clean link previews in email/Slack shares |

---

## 9. Pages in Scope

| Page | Priority |
|---|---|
| `/` — Landing page | P0 |
| `/demo` or modal — Demo request form | P0 |
| `/about` — Team + mission | P1 |
| `/privacy` — Privacy policy | P1 |

---

## 10. Out of Scope

- Product login / auth
- Blog or press section
- Pricing page (no pricing yet)
- Localization

---

## 11. Success Criteria

| Metric | Target |
|---|---|
| Lighthouse performance score | ≥ 90 |
| Mobile-responsive | Yes |
| Demo request form functional | Yes |
| Time to first contentful paint | < 1.5s |
| Copy reviewed by at least one validation contact | Yes before wide share |

---

## 12. Open Questions

1. **Domain** — Is atlix.io available? What's the preferred domain?
2. **Dashboard screenshot** — Do we use a live embed, a video, or a static annotated screenshot? Static is fastest to ship.
3. **Validation quotes** — Which contacts have given verbal approval that can become attributed quotes?
4. **Logo/brand assets** — Is there a finalized wordmark and icon, or does this need to be designed alongside the page?
5. **Launch timing** — Is the goal to have this live before the GSSC demo, or is it for post-demo follow-up?
