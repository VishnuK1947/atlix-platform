# Atlix Demo MVP — Frontend-Only Spec

**Version:** 0.1-demo
**Last Updated:** April 2, 2026
**Goal:** Ship a compelling frontend demo by April 3 with zero backend, zero API calls, and zero database. All data is hardcoded mock data.

---

## 1. What This Is

A static Next.js app that simulates the full Atlix experience using mock data. The goal is to make the product feel real enough to demo to policymakers and judges in a 5-minute walkthrough. No auth, no real data, no API keys needed.

---

## 2. Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **No backend. No Supabase. No API calls.**

---

## 3. Pages

### 3.1 Dashboard (`/`)

The main view. Shows the narrative intelligence feed for LA.

**Layout:**
- Top: header bar with "Atlix" logo, city selector (hardcoded to "Los Angeles"), and date range toggle (7d / 30d — cosmetic only)
- Left sidebar: filter panel (topic category, sentiment polarity, source platform — all cosmetic, no real filtering needed for demo)
- Main content: grid of narrative cards

**Narrative Cards (mock ~8–10 cards):**

Each card shows:
- Narrative title (e.g. "LAPD Overtime Budget Scrutiny")
- 1–2 sentence summary
- Volume badge (e.g. "2,341 posts")
- Velocity indicator (e.g. "↑ 38% this week" in green, or "↓ 12%" in red)
- Sentiment bar: green/gray/red proportional bar showing % positive / neutral / negative
- Emotion tags: small pills like `anger`, `frustration`, `hope`
- Source icons: Reddit / X / News logos
- "View Details" button → navigates to detail page

**Mock narratives to include (LA-themed):**
1. LAPD Overtime Budget Scrutiny — high volume, negative sentiment, anger/frustration
2. Metro Expansion Public Support — medium volume, positive sentiment, hope
3. Wildfire Recovery Funding Delays — high volume, mixed sentiment, fear/frustration
4. Short-Term Rental Crackdown (Airbnb) — medium volume, mixed, frustration
5. LA 2028 Olympics Preparedness — medium volume, positive, excitement
6. Homeless Shelter Siting Conflict (Echo Park) — high volume, negative, anger
7. Teacher Strike Threat — medium volume, negative, frustration
8. EV Charging Infrastructure Gaps — low volume, neutral, mild frustration

---

### 3.2 Narrative Detail (`/narrative/[id]`)

Clicking "View Details" on any card opens this page.

**Layout:**
- Back button
- Narrative title + summary (2–3 sentences)
- Sentiment + emotion breakdown (bigger version of the bar)
- **Trend chart:** Recharts line chart showing volume over the past 14 days (mock data array, just hardcode values)
- **Sample posts section:** 3–5 mock quote cards, each with:
  - Platform icon (Reddit/X/News)
  - Username (anonymized, e.g. "u/lalocal_4823")
  - Post text snippet
  - Upvotes / engagement count
  - Link (dead href="#" is fine)
- **Related narratives:** 2–3 linked cards to other mock narratives

---

### 3.3 Chat Interface (`/chat`)

Accessible via a "Ask Atlix" button in the header.

**Layout:**
- Full-page chat UI
- Input bar at the bottom: "Ask anything about LA public discourse..."
- On submit: shows a typing indicator (brief setTimeout delay), then renders a hardcoded response

**Mock Q&A pairs to hardcode (match on substring of query, fallback to default):**

| If query contains... | Response |
|---|---|
| "metro" / "transit" | Returns summary about Metro Expansion narrative with 3 mock citations |
| "homeless" / "housing" | Returns summary about Echo Park narrative with citations |
| "wildfire" / "fire" | Returns wildfire recovery narrative summary with citations |
| "lapd" / "police" | Returns LAPD budget narrative summary |
| anything else | Generic: "Based on current discourse in Los Angeles, the top active narrative is [LAPD Overtime Budget Scrutiny]. Here's what people are saying..." |

Each response renders as a structured card with:
- Answer paragraph
- Inline citation chips (e.g. `[Reddit · r/LosAngeles]`, `[LA Times]`) — cosmetic only

---

## 4. Mock Data Structure

Put all mock data in `/src/data/mockNarratives.ts`. Each narrative object:

```ts
{
  id: string
  title: string
  summary: string
  volume: number          // total post count
  velocityPct: number     // e.g. 38 means +38%
  velocityDir: 'up' | 'down'
  sentiment: { positive: number; neutral: number; negative: number }  // must sum to 100
  emotions: string[]      // e.g. ['anger', 'frustration']
  sources: ('reddit' | 'x' | 'news')[]
  category: string        // e.g. 'Public Safety', 'Transit', 'Housing'
  trendData: { day: string; volume: number }[]  // 14 entries
  samplePosts: {
    platform: 'reddit' | 'x' | 'news'
    username: string
    text: string
    engagement: number
  }[]
}
```

---

## 5. Visual Style

- Dark background (`#0a0a0a` or similar) — Bloomberg Terminal aesthetic
- Cards: dark gray (`#1a1a1a`) with subtle border
- Accent color: electric blue (`#3b82f6`) for highlights, links, active states
- Sentiment: green = positive, gray = neutral, red = negative
- Velocity up = green, velocity down = red
- Font: Inter or system-ui

---

## 6. What to Skip

- No real filtering logic (filter UI can exist but doesn't need to do anything)
- No auth
- No loading states (or use a hardcoded 1s delay on chat only)
- No responsive/mobile design
- No error states
- No tests

---

## 7. Demo Flow (5-minute walkthrough)

1. Open dashboard → "Here's what's happening in LA right now"
2. Point to LAPD card → high volume, negative sentiment spike
3. Click into detail → show trend chart, show sample posts, "this is where the data comes from"
4. Navigate to Echo Park card → different emotional profile
5. Switch to chat → type "What are people saying about the wildfire recovery?"
6. Show structured answer with citations → "This is the killer feature — natural language over public discourse"
