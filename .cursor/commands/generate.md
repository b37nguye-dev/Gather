You are a senior full-stack engineer building a social scheduling app. Here is the PRD:
# Product Requirements Document (PRD) / Business Requirements Document (BRD)
## Social Scheduling + Event Discovery Platform

**Project Name:** Gather (Working Title)  
**Version:** 1.0  
**Last Updated:** March 4, 2026  
**Author:** Product Team  
**Status:** Pre-Development (MVP Planning)

---

## Executive Summary

Gather is a social scheduling platform that solves the last-mile coordination problem for friend groups. Rather than letting "we should hang" remain a dormant idea, Gather bridges three critical gaps: matching calendars across friends, computing optimal meeting windows using intelligent algorithms, and surfacing nearby events that can turn a time slot into an actual shared experience.

The app combines elements of LettuceMeet (availability matching), Howbout (persistent social calendar), and Meetup (hyperlocal event discovery) into a single unified platform with a novel B2B monetization layer where local businesses pay per confirmed group attendance.

**Target Market:** Urban friend groups aged 18–40, primarily concentrated in tier-1 North American cities (initial focus: Toronto, Canada)  
**Primary Revenue Model:** B2B event partnership (Cost Per RSVP) + sponsored listings + optional supporter purchase  
**MVP Timeline:** 9 months (4 phases)  
**Initial Target:** 10,000 active users by end of Year 1

---

## Part 1: Problem Statement

### The Problem

Modern friend groups struggle to convert social intent into coordinated action due to:

1. **Calendar Fragmentation** — Friends use Google Calendar, Outlook, Apple Calendar, or no structured calendar at all. No single source of truth for "when is everyone free?"
2. **Coordination Overhead** — Even after finding a mutual free slot, there's no organic next step. "Are we meeting or not?" remains ambiguous.
3. **Passivity of Social Discovery** — Event apps (Meetup, Eventbrite, Instagram) show events, but don't answer the fundamental question: "Which of these events can I actually go to with my friends?"
4. **No Social Persistence** — Polling tools like Doodle and LettuceMeet are one-off; there's no friend graph or memory of past successful meetups.

**Result:** Studies show 73% of young adults (18–35) "wish they spent more time with friends" but cite logistics as the primary blocker, not desire [cite:implied from retention research].

### Market Validation

- **Scheduling Apps Market:** $663M (2025) → projected **$1.81B (2033)** at 13.46% CAGR [web:31]
- **Hyperlocal Social Apps:** $320M (2025) → projected **$1.9B (2033)** at similar CAGR [web:31]
- **Gamification Impact:** Retention increases by **100–150%** when social leaderboards are present [web:16][web:20]
- **Toronto Market Size:** 2.9M metro population with high event density (Eventbrite hosts 50,000+ events/year in Greater Toronto Area)

---

## Part 2: Product Overview

### Core Concept

Gather operates on three mutually reinforcing layers:

#### Layer 1: Social Calendar
Friends create persistent connections within the app and share calendar availability (either by syncing Google/Outlook/Apple calendars, or by manually inputting free/busy blocks). Privacy is granular—the app shows only free/busy by default, with optional transparency toggles for specific friend connections.

#### Layer 2: Smart Availability Matching
A weighted-scoring algorithm computes optimal meeting windows across the friend group. The algorithm factors in:
- Number of free friends (scored by group size thresholds)
- User preferences (evening vs. morning bias)
- Recency (prefer slots closer to today)
- Event proximity bonus (boost score if high-rated events align with the slot)

Output: Ranked list of "best meeting times" with confidence scores.

#### Layer 3: Event Discovery Map
Once a time slot is identified, the app surfaces a hyperlocal map of events happening at that specific time and place. Events come from multiple sources:
- **Public APIs:** Eventbrite, Ticketmaster, Google Places, Meetup
- **B2B Partners:** Local businesses (venues, restaurants, gyms, galleries) that pay to be featured
- **One-tap RSVP:** Locks the time slot and pushes calendar invites to all group members' calendars

### Differentiation vs. Competitors

| Feature | LettuceMeet | Howbout | Meetup | Doodle | **Gather** |
|---|---|---|---|---|---|
| Social graph (persistent) | ❌ | ✅ | Partial | ❌ | ✅ |
| Calendar sync (multi-platform) | Google/Outlook | Google/Apple/Outlook | ❌ | ❌ | Google/Outlook/Apple + Manual |
| Weighted availability algorithm | Grid only | Binary | ❌ | Poll | ✅ Weighted scoring |
| Event discovery map | ❌ | ❌ | ✅ (primary focus) | ❌ | ✅ + B2B layer |
| Smart nudges (contextual prompts) | Basic | Partial | ❌ | ❌ | ✅ Triggered by algo |
| Gamification (leaderboard, streaks) | ❌ | ❌ | Partial | ❌ | ✅ Core mechanic |
| B2B event partnership monetization | ❌ | ❌ | Yes (ad-only) | ❌ | ✅ CPR + listings |
| Privacy controls (tiered) | Standard | Standard | Standard | Standard | ✅ 3-tier opt-in |

---

## Part 3: Core Features (MVP)

### 3.1 User Authentication & Onboarding

**Feature:** Multi-account sign-up (email, Google, Apple ID, Microsoft)

- Email/password option for users without existing accounts
- OAuth options for Google, Apple, Microsoft to reduce friction
- Profile creation: name, photo, email, notification preferences
- Privacy preference selection on first launch (calendar visibility level)

**Acceptance Criteria:**
- Sign-up flow completes in <2 minutes
- OAuth scopes are minimal (only `freebusy` for calendar, never full event read)
- User can choose calendar sync or manual input on first login
- Privacy tiers are clearly explained with examples (e.g., "Your partner will see your event titles; your coworker will only see 'Busy'")

---

### 3.2 Social Graph & Friend Connections

**Feature:** Persistent friend connections with role/relationship tags

- Users can search for friends by email or username
- Send/accept friend invitations
- Option to tag relationships ("close friend," "coworker," "family") to apply different privacy rules per connection
- Block/unfriend mechanics
- See friend's free/busy availability (respecting privacy tier)

**Acceptance Criteria:**
- Friend search completes in <1 second (indexed by email)
- Invitations have expiry (7 days, then expire)
- Privacy tier applies immediately upon connection; users can adjust per-friend at any time
- Block list prevents blocked users from seeing your free/busy data

---

### 3.3 Manual Availability Grid (Fallback)

**Feature:** Drag-select availability on a time grid without requiring calendar sync

- Users select their availability manually by day/hour
- Grid shows a full week (Mon–Sun) with 30-minute or 1-hour time blocks
- Drag to select contiguous free blocks (e.g., Friday 6PM–10PM)
- Availability refreshes weekly (or user can manually update)
- Export/copy current grid to clipboard for sharing in group chat

**Acceptance Criteria:**
- Grid selection is intuitive and completes in <3 minutes
- Visual feedback (highlighting, color contrast) is clear for selected blocks
- User can save multiple availability profiles (e.g., "This Week" vs. "General")
- Mobile responsiveness: grid is readable and selectable on phones (scroll if needed, not smushed)

---

### 3.4 Group Creation & Management

**Feature:** Create/join friend groups with shared goals

- User creates a group (e.g., "Weekend Warriors", "Board Game Crew") and invites members
- Group admin can set preferences: target group size, preferred time windows, interest categories
- Members join and their availability automatically feeds into the group's matching engine
- View group member list with real-time free/busy status
- Archive/delete groups

**Acceptance Criteria:**
- Group creation takes <2 minutes
- Invitations are sent via email or shareable link (7-day expiry)
- Group page shows member list with initials/avatars and their current availability status
- Admin can see historical meetups and leaderboard data for the group

---

### 3.5 Weighted Availability Matching Algorithm

**Feature:** Core engine that identifies optimal meeting windows

**Algorithm Overview:**

For each 30-minute time slot \(t\) across the next 4 weeks:

\[
\text{Score}(t) = \sum_{i=1}^{n} w_i \cdot \text{Free}_i(t) + \lambda \cdot \text{EventScore}(t) + \beta \cdot \text{RecencyBonus}(t)
\]

Where:
- \(w_i\) = weight for friend \(i\) (core friends: 1.0; peripheral: 0.5)
- \(\text{Free}_i(t)\) = binary: 1 if friend \(i\) is free, 0 if busy
- \(\lambda\) = event relevance multiplier (0.2 by default, configurable)
- \(\text{EventScore}(t)\) = relevance of nearby events at time \(t\) (0–1 scale)
- \(\beta\) = recency multiplier (slots within 3 days get +0.3 boost)

Output: Ranked list of top 5 time slots with confidence scores

**Acceptance Criteria:**
- Algorithm runs in <500ms for groups up to 10 members, 4-week horizon
- Top recommendation appears at least 70% of the time when majority of group is free
- Algorithm respects user-set preferred time windows (e.g., "only evenings")
- Tie-breaking logic: if two slots have equal scores, prefer the earlier slot (sooner = more actionable)

---

### 3.6 Smart Nudges (Contextual Notifications)

**Feature:** Organic, contextual prompts to meet up (triggered by algorithm + user consent)

**Nudge Types:**

1. **Availability Match Nudge:** "You and 3 friends are free Friday 7–9 PM. Shall we find an event?"
2. **Event Recommendation Nudge:** "Comedy show at The Rec Room Friday at 8 PM matches your group's vibe. Interest?"
3. **Streak Warning Nudge:** "Your crew hasn't met in 2 weeks. One more week and your 4-week streak is history 🔥"
4. **Low-Friction Invite:** User can tap "Yes" → automatically locks time + pushes calendar invites to all

**Acceptance Criteria:**
- Nudges are sent max 2x per week per group (avoid spam)
- Users can opt out of nudges per group or globally
- Nudge copy is casual, emoji-friendly, and <100 characters
- Tapping "Yes" requires only 1 click; tapping "No" dismisses with option to "Ask later"

---

### 3.7 Manual Event Planning (No Map Integration Yet)

**Feature:** Users can manually propose a time and see who's available

- User selects a specific date/time and proposes it to the group
- App shows real-time availability of each group member at that slot
- Visual indicator: green (free), yellow (maybe), red (busy)
- Group chat thread or comment section per proposal

**Acceptance Criteria:**
- Proposal interface is simple: pick date/time, then see instant availability
- Availability updates in real-time if members change their calendars
- Users can comment on proposals ("I'm down!" or "Can't make it this week")
- Proposals auto-finalize after 7 days or when 70% of group confirms

---

## Part 4: Phase 2 Features (Calendar Integration)

### 4.1 Google Calendar OAuth Integration

**Feature:** One-click Google Calendar sync for automatic availability detection

**Implementation:**
- OAuth 2.0 flow using Google Calendar API `calendar.v3.freeBusy` endpoint
- Request scopes: `calendar.readonly` (read-only, never modifying user's calendar)
- Fetch free/busy for next 4 weeks, twice daily refresh
- User's Google Calendar events populate the app's availability engine
- Privacy: raw event details never stored; only binary busy/free blocks are retained

**User Flow:**
1. User clicks "Connect Google Calendar"
2. OAuth consent screen appears (permissions clearly listed)
3. App fetches free/busy data and dismisses the login flow
4. User sees "Google Calendar connected ✓" with option to disconnect anytime

**Acceptance Criteria:**
- OAuth flow completes in <30 seconds
- Free/busy data syncs within 5 minutes of a user updating their Google Calendar
- User can disconnect at any time; free/busy data is purged from app
- No event details (titles, descriptions, attendees) are ever stored by Gather
- Error handling if calendar is not found or permissions revoked

---

### 4.2 Microsoft Graph (Outlook/Teams) Integration

**Feature:** Support for Outlook calendars and Teams presence

**Implementation:**
- OAuth 2.0 flow using Microsoft Graph API `me/calendar/getSchedule` endpoint
- Request scopes: `Calendars.Read` (read-only)
- Fetch free/busy for next 4 weeks, twice daily refresh
- Integration with Teams presence (optional): show if user is "in a meeting" on Teams, bias toward "busy" status

**Acceptance Criteria:**
- OAuth flow matches Google integration UX
- Free/busy data syncs within 5 minutes
- Teams presence integration is optional (user can opt in/out)
- Works with both personal Outlook and corporate Office 365 accounts

---

### 4.3 Apple EventKit (iOS Native)

**Feature:** Direct integration with native iOS Calendar app

**Implementation:**
- Use native iOS EventKit framework (no OAuth required; permission prompt on first launch)
- Access local device calendar events and extract free/busy data
- Sync runs daily or on-demand when user opens the app
- No cloud sync of raw events; free/busy data stays on device and sent to app server

**Acceptance Criteria:**
- Permission prompt is clear: "Gather needs access to your calendar to match you with friends"
- Free/busy data syncs within 2 minutes of app launch
- User can revoke permissions in iOS Settings; app gracefully falls back to manual input
- Works offline; data is cached on device

---

### 4.4 Weighted Availability Algorithm (Production Version)

**Feature:** Enhanced algorithm with learned user preferences

**Enhancements:**
- Historical preference learning: if a user always accepts "Friday evening" invitations but declines "Monday morning," algorithm weights accordingly
- Poly-group optimization: if a user is in multiple friend groups, algorithm prevents double-booking
- Dynamic weighting: friends who frequently coordinate together get slightly higher weights (discovered via historical data)
- Seasonality: summer weekends rank higher; winter weekday evenings rank lower (configurable)

**Acceptance Criteria:**
- Algorithm runs in <1 second for groups up to 20 members
- Top recommendation matches user acceptance rate >75% (A/B test vs. random)
- Learned preferences improve recommendation quality by week 4 (measured via acceptance rate)

---

## Part 5: Phase 3 Features (Events Map)

### 5.1 Eventbrite & Ticketmaster API Integration

**Feature:** Real-time event feed from major ticketing platforms

**Implementation:**
- Fetch events within 15 km of user's location
- Filter by event type (music, comedy, food, sports, arts, outdoor, nightlife)
- Match events to recommended time slots from availability algorithm
- Show event details: title, time, venue, price, ticket availability, user ratings
- Link to external ticketing page for purchase (affiliate tracking optional)

**Data Model:**
```
Event {
  id: string
  title: string
  description: string
  start_time: ISO8601
  end_time: ISO8601
  venue: { name, address, lat, lng }
  category: enum (MUSIC, COMEDY, FOOD, SPORTS, ARTS, OUTDOOR, NIGHTLIFE)
  price_range: { min, max, currency }
  image_url: string
  ticket_url: string
  rating: float (0–5)
  popularity_score: float (0–100, for ranking)
}
```

**Acceptance Criteria:**
- Events populate within 3 seconds of app load
- Filters work instantly (<500ms) for category/price/distance
- Only events within user-selected time window are shown
- Mobile-friendly event cards with CTAs

---

### 5.2 B2B Partner Event Feed

**Feature:** Local businesses can list their own events directly on Gather

**Implementation:**
- Separate B2B partner portal (web dashboard) for businesses to create/manage events
- Business submits: event title, date/time, venue address, category, description, image
- Events appear on user-facing map with "Partner Event" badge
- Analytics dashboard for businesses: impressions, clicks, RSVP count, attributed foot traffic (if integrated with POS systems)

**Business Portal Features:**
- Event creation/editing (CRUD)
- Promotional options: featured placement (paid), sponsored nudges (paid)
- Scheduling: recurring events (e.g., "Trivia Night every Friday")
- Discount/promo codes tied to Gather RSVPs (attribution)

**Acceptance Criteria:**
- Business can create an event in <5 minutes
- Event appears on user map within 1 hour of submission
- Partner events are clearly distinguished from public events (badge, color coding)
- Businesses can track RSVP attribution (e.g., "50 people RSVP'd via Gather to our Friday trivia")

---

### 5.3 Mapbox Event Discovery Map

**Feature:** Interactive, clustered map of events at recommended time slots

**Implementation:**
- Mapbox GL JS for rendering
- Events clustered by density; clicking a cluster zooms and spreads events
- Radius-based filtering: show events within user-selected radius (1 km, 5 km, 10 km)
- Heat map overlay (optional): shows event density by area
- Bottom sheet (mobile) or side panel (desktop) showing event list sorted by relevance/rating

**Acceptance Criteria:**
- Map renders in <2 seconds
- Clustering algorithm groups 50+ events into <10 visible clusters
- Zoom/pan is smooth and responsive
- Filters (category, price, distance, time) update map in <500ms
- Mobile UX: bottom sheet scrolls independently from map, swipeable to expand

---

### 5.4 One-Tap RSVP Integration

**Feature:** Confirm event attendance for the entire group with one action

**Implementation:**
- User taps "RSVP" on an event card
- App shows: "Invite [Group Name] to [Event]?" with option to adjust group members
- User confirms; app does three things atomically:
  1. Creates an event in user's native calendar
  2. Sends calendar invites to all group members (via email or in-app notification)
  3. Records RSVP data for leaderboard + B2B attribution
- Each group member receives notification; they can accept/decline independently

**Calendar Invite Format:**
- Title: "[Event Title] with [Friend1], [Friend2], ..."
- Description: "RSVPed via Gather | [Event URL]"
- Time: matches event time exactly
- Location: venue address
- Attendees: all group members

**Acceptance Criteria:**
- RSVP completes in <3 seconds end-to-end
- Calendar invites arrive within 1 minute
- All group members receive the same calendar invite (no duplicates)
- RSVP data is reliably stored for leaderboard calculation

---

## Part 6: Phase 4 Features (Monetization & Gamification)

### 6.1 Group Leaderboard & Streaks

**Feature:** Gamified tracking of group meetup frequency

**Leaderboard Mechanics:**

1. **Monthly Meetup Score:** Groups earn 10 points per confirmed meetup (all members attended)
2. **Streak Counter:** Groups earn bonus +5 points if they meet at least once per week for consecutive weeks
3. **Engagement Bonus:** +2 points for each event category completed (e.g., "3 comedy shows" unlocks "Comedy Master" badge)
4. **Ranking:** Leaderboard is city-based (Toronto leaderboard shows top 100 groups)

**Display:**
- Top 10 groups visible globally on app home screen
- Groups can see their own rank + trending (up/down from last month)
- Streaks reset at month-end; new season begins
- Archive view: see historical performance

**Acceptance Criteria:**
- Leaderboard data updates within 1 hour of confirmed meetup
- Streaks are clearly explained (when they reset, how they're calculated)
- Mobile layout shows top 5 groups in an easy-to-scan card view
- Groups can opt out of public leaderboard (remain hidden)

---

### 6.2 Badges & Achievements

**Feature:** Unlockable badges for group behaviors

**Badge Types:**

| Badge | Unlock Condition | Visual |
|---|---|---|
| **First Meetup** | Attend 1 event together | 🎉 |
| **Regulars** | RSVP'd to the same venue 3 times | 🏠 |
| **Night Owls** | 5+ meetups between 8PM–11:59PM | 🌙 |
| **Foodies** | 5+ food/restaurant events | 🍽️ |
| **Culture Crew** | 5+ arts/theater/gallery events | 🎭 |
| **Active Lifestyle** | 5+ outdoor/sports events | ⛰️ |
| **Comedy Club Kings** | 5+ comedy shows | 😂 |
| **4-Week Streak** | Meet at least once per week for 4 weeks | 🔥 |
| **Diversity Masters** | Meetups across 5+ event categories | 🌈 |

**Display:**
- Badges shown on group profile (public badge shelf)
- Badge earned → celebration screen + push notification
- Hovering over badge shows progress toward next tier (e.g., "3/5 food events for Foodies badge")

**Acceptance Criteria:**
- Badge unlock conditions are automatically detected from RSVP data
- New badges can be added in-app (no app update required)
- Badge progress is visible and motivating
- Notifications for near-unlock (e.g., "1 more comedy show for Comedy Club Kings!")

---

### 6.3 B2B Monetization: Cost Per RSVP (CPR) Model

**Feature:** Businesses pay per confirmed group RSVP

**How It Works:**

1. **Business Signs Up:** Venue (bar, restaurant, gallery, gym) registers on the B2B partner portal
2. **Event Creation:** Business creates recurring events (e.g., "Trivia Night, Every Friday 8 PM")
3. **Pricing:** Sets CPR rate ($2–$5 per RSVP group, configurable)
4. **Promotion:** Business can feature their event (pay $50/week) or sponsor a nudge (pay per send)
5. **Attribution:** Gather tracks which RSVPs came from the app; business invoiced monthly
6. **Analytics:** Business dashboard shows foot traffic attribution, per-RSVP conversion rates, demographic insights

**Example Scenario:**
- The Rec Room sets a CPR of $3 per group RSVP
- Gather sends 50 smart nudges to groups on Friday: "The Rec Room has trivia + $10 group deals tonight"
- 20 groups RSVP (= 60–80 people estimated)
- The Rec Room pays Gather: 20 groups × $3 = $60

**Acceptance Criteria:**
- CPR rate can be adjusted by business (0–$10 range)
- Featured placement pricing is simple and flat ($50–$200/week depending on city tier)
- Business dashboard shows accurate RSVP count and estimated foot traffic
- Invoice generation is automated (sent monthly via email + Stripe)
- Business can track ROI: [Revenue from Gather RSVPs] / [CPR costs]

---

### 6.4 Featured Event Listings & Sponsored Nudges

**Feature:** Premium placement options for B2B partners

**Featured Listings:**
- Event appears at the top of the map/list for a city/region
- Badge: "Featured by [Business Name]"
- Weekly/monthly pricing tiers (Toronto: $100/week, $350/month)
- Auto-renewal with payment method on file

**Sponsored Smart Nudges:**
- Business chooses: "I want to sponsor a nudge to groups looking for [EVENT_CATEGORY]"
- Nudge is sent to targeted group segments (geography, interest, frequency)
- Cost: $50–$500 per nudge batch (based on audience size + geography)
- Example: "Comedy lovers of Toronto: [Venue Name] has a standout show Friday 9 PM. $5 off with this nudge!"

**Acceptance Criteria:**
- Businesses can activate/deactivate featured listings within 1 click
- Nudge targeting is simple (category, geography, group size range)
- Billing is transparent: show estimated reach before committing
- Budgets: business can set a monthly spend cap

---

### 6.5 Optional One-Time Supporter Purchase

**Feature:** Ad-free experience + cosmetic customization (optional, one-time)

**Pricing:** $4.99 CAD one-time (or $2.99 if purchased within first 30 days)

**Includes:**
- Remove all sponsored event promotions and nudges (see only organic events)
- Custom group avatars + group themes (color customization)
- Export group meetup history to PDF (for memories)
- Early access to new features (beta tester status)

**Acceptance Criteria:**
- Supporter purchase is prompted once (not aggressive/recurring)
- Supporters are clearly labeled with a badge
- Purchase is tied to account (transfers if user logs in from new device)
- Receipt and refund policy are clear

---

## Part 7: Technical Architecture (Overview)

### 7.1 Technology Stack

| Layer | Technology | Rationale |
|---|---|---|
| **Frontend (Web)** | React 18 + TypeScript + Tailwind CSS | Modern, maintainable, rapid iteration |
| **Frontend (Mobile)** | React Native (Expo) | Code sharing across iOS/Android |
| **Backend API** | Node.js + Express + GraphQL | Fast development, real-time subscriptions for calendar sync |
| **Database** | PostgreSQL (user/group data) + Redis (session/cache) | Relational + caching for performance |
| **Calendar Integration** | Google Calendar API, Microsoft Graph, Apple EventKit | Native SDKs |
| **Mapping** | Mapbox GL JS | Superior clustering + customization |
| **Event Data** | Eventbrite API, Ticketmaster API | Primary public event sources |
| **Authentication** | Auth0 or Firebase Auth | Multi-OAuth, PIPEDA-compliant |
| **Hosting** | AWS (EC2, RDS, S3) or Google Cloud | Scalability, multi-region support |
| **Monitoring** | Sentry (errors), DataDog (performance) | Real-time alerting |

### 7.2 Privacy & Security

**Data Classification:**

1. **Public:** Group name, location, public leaderboard rank
2. **Private:** Friend list, calendar data (free/busy only), group membership
3. **Sensitive:** Email, password hash, payment info (stored via Stripe)

**Compliance:**
- PIPEDA (Personal Information Protection and Electronic Documents Act) — Canadian data residency
- Data retention: free/busy data purged after 4 weeks; raw calendar never stored
- OAuth scopes: minimal (read-only, no write access to user's calendar)
- Encryption: TLS 1.2+ for all data in transit; AES-256 for data at rest

**User Consent:**
- Privacy tier selection on signup (clear, not buried)
- Per-friend privacy override at any time
- Annual privacy audit + user notification of any policy changes

---

## Part 8: Go-To-Market Strategy

### 8.1 MVP Launch Market: Toronto

**Why Toronto:**
- 2.9M metro population with high event density
- Strong downtown core with walkable neighborhoods (King West, Entertainment District, Distillery District)
- High event volume: 50,000+ events/year on Eventbrite
- Tech-savvy demographic (3 major universities: U of T, Ryerson, York)
- Existing networks (Gather team presence for on-ground B2B outreach)

**Launch Sequence:**
1. **Months 1–2:** Soft launch (500 internal testers, gather feedback)
2. **Month 3:** Public launch (press release, product hunt, local tech blogs)
3. **Months 3–6:** Acquire first 5,000 users via referral + organic
4. **Months 6–9:** B2B outreach to Toronto venues; on-board 50+ partners
5. **Month 12:** Evaluate expansion to Vancouver, Montreal, Calgary

### 8.2 User Acquisition Channels

| Channel | Timeline | CAC (Est.) | Rationale |
|---|---|---|---|
| **Organic/Referral** | Month 1 onwards | $0 (self-sustaining) | Friend invites generate viral coefficient >1 |
| **ProductHunt launch** | Month 3 | $0–$200 (paid boost optional) | High-intent tech audience |
| **Local SEO (Google My Business)** | Month 2 onwards | $0 (owned) | "Find friends to meet up with Toronto" |
| **University partnerships** | Month 3 onwards | $0–$5k (sponsorship) | U of T, Ryerson events/clubs |
| **Instagram/TikTok seeding** | Month 2 onwards | $1–$3k (creator partnerships) | Viral leaderboard clips, group highlights |
| **B2B partner co-marketing** | Month 6 onwards | $0 (partner expense) | Venues promote via their email/socials |

**Referral Mechanics:**
- Invite friends via email or shareable link
- Referrer + referee each get $0 value bonus (badge "Ambassador") or entry into monthly $100 gift card drawing
- Monthly "Group Referral Challenge": top 5 groups that bring most new members win free tickets to partner venues

### 8.3 B2B Partner Acquisition

**Target Partners:** Bars, restaurants, comedy clubs, galleries, fitness studios in Toronto

**Pitch:**
- "Stop paying for Facebook ads that don't convert. Pay only for foot traffic that shows up."
- "50 CPR per RSVP group = estimated 150–200 people per week with predictable, measurable attendance."
- "Our leaderboard turns your events into a social competition — groups meet more frequently to rack up points."

**Outreach Cadence:**
- Month 6: Email outreach to 500+ venues (templates, pitch deck)
- Month 7: Phone calls to warm leads
- Month 8: In-person demos at 20 top venues
- Month 9: Contracts with 50+ partners (goal)

**Success Metrics for Partners:**
- RSVP attribution (how many people came because of Gather)
- ROI: revenue generated vs. CPR costs paid
- Repeat RSVP rate: what % of groups return after first visit

---

## Part 9: Success Metrics & KPIs

### 9.1 User Metrics

| Metric | Month 3 Target | Month 6 Target | Month 12 Target |
|---|---|---|---|
| **Total Users** | 2,000 | 5,000 | 10,000 |
| **Monthly Active Users (MAU)** | 600 | 2,000 | 5,000 |
| **Groups Created** | 300 | 1,000 | 2,500 |
| **Avg. Meetups/Group/Month** | 0.5 | 1.2 | 2.0 |
| **Calendar Sync Adoption %** | 20% | 50% | 70% |
| **Retention (Day 7)** | 30% | 40% | 50% |
| **Retention (Day 30)** | 15% | 25% | 35% |

### 9.2 Business Metrics

| Metric | Month 6 Target | Month 9 Target | Month 12 Target |
|---|---|---|---|
| **B2B Partners Onboarded** | 10 | 30 | 50+ |
| **Total B2B Revenue (CPR + Featured)** | $5k | $25k | $75k |
| **Avg CPR Rate** | $3.50 | $3.25 | $3.00 |
| **Total RSVPs via App** | 500 | 2,500 | 7,500 |
| **Supporter Purchase Conversion %** | 2% | 3% | 5% |

### 9.3 Product Metrics

| Metric | Target | How Measured |
|---|---|---|
| **Algorithm Top-1 Accuracy** | >70% | % of time users accept top recommendation |
| **Nudge Open Rate** | >25% | % of nudges that generate app opens |
| **Nudge RSVP Conversion** | >5% | % of nudges that convert to RSVPs |
| **Calendar Sync Reliability** | >99% | % of syncs that complete without error |
| **Map Load Time** | <2s | P95 latency for map render |
| **Leaderboard Update Latency** | <1hr | Time from RSVP confirmation to leaderboard update |

---

## Part 10: Risk Assessment & Mitigation

| Risk | Severity | Probability | Impact | Mitigation |
|---|---|---|---|---|
| **Cold Start Problem** (no friends on app = no value) | High | High | App dies before reaching critical mass | Referral invite flow; one-time events joinable without friends |
| **Calendar Permission Fatigue** | Medium | High | Users avoid syncing calendars, limiting algorithm accuracy | Manual grid fallback; nudge after 2nd meetup, not day 1 |
| **B2B Partner Acquisition Difficulty** | Medium | High | Revenue dries up; can't sustain development | Start with high-frequency venues (bars, gyms); offer free trial (first 100 RSVPs free) |
| **Apple EventKit iOS-Only** | Low | High | Android users can't sync Apple Calendar | Manual input fallback + Google Calendar prioritization on Android |
| **Privacy Regulation (PIPEDA)** | Medium | Medium | Legal liability if data handling violates law | Minimal data retention (4 weeks); read-only OAuth scopes; annual privacy audits |
| **Churn in Month 2–3** | High | Medium | New users get bored after trying once or twice | Gamification (badges, streaks) + smart nudges + leaderboard competition |
| **Competitor Copying** (Meetup/Eventbrite adding calendar sync) | Medium | Medium | Market share loss | Lock in via network effects (leaderboard, streaks); superior UX |
| **Server/Data Loss** | Low | Low | Total service outage, users leave forever | Multi-region backups (AWS); daily snapshots; 99.95% SLA commitment |

---

## Part 11: Timeline & Milestones

### Phase 1: MVP (Months 1–3)
- ✅ Authentication + onboarding
- ✅ Social graph (friend connections)
- ✅ Manual availability grid
- ✅ Group creation + management
- ✅ Basic availability matching
- ✅ Smart nudges (v1)
- **Milestone:** Launch soft beta to 500 users

### Phase 2: Calendar Sync (Months 4–6)
- ✅ Google Calendar OAuth
- ✅ Microsoft Graph (Outlook) OAuth
- ✅ Apple EventKit (iOS)
- ✅ Weighted availability algorithm (production)
- ✅ Calendar sync reliability testing
- **Milestone:** 5,000 users; 50% calendar adoption

### Phase 3: Events Map (Months 7–9)
- ✅ Eventbrite + Ticketmaster API integration
- ✅ Mapbox event discovery map
- ✅ One-tap RSVP + calendar integration
- ✅ B2B partner portal (basic)
- ✅ Partner event feed integration
- **Milestone:** 50+ B2B partners; first $25k revenue

### Phase 4: Monetization & Gamification (Months 10–12)
- ✅ Leaderboard + streaks
- ✅ Badges & achievements
- ✅ B2B CPR attribution system
- ✅ Featured listings + sponsored nudges
- ✅ One-time supporter purchase
- ✅ Business analytics dashboard
- **Milestone:** 10,000 users; $75k+ monthly recurring revenue

---

## Part 12: Success Criteria (Definition of Done)

The MVP is ready for public launch when:

1. ✅ **Manual availability grid** allows users to input free/busy in <3 minutes
2. ✅ **Friend connections** work reliably; invitations are sent and accepted
3. ✅ **Groups function** with 3+ members without crashes
4. ✅ **Availability algorithm** identifies top recommendations in <1 second
5. ✅ **Smart nudges** are sent reliably and users tap them 25%+ of the time
6. ✅ **Mobile responsiveness** works on iPhone + Android (no major UI breaks)
7. ✅ **Authentication** handles signup/login without friction
8. ✅ **Data privacy** is enforced (no raw calendar data stored; OAuth minimal scopes)
9. ✅ **Error handling** is graceful (no crashes, helpful error messages)
10. ✅ **Onboarding** completes in <5 minutes with clear value proposition shown
11. ✅ **Day-7 retention** in beta is >30% (users return after first week)
12. ✅ **Day-30 retention** in beta is >15% (users return after first month)

---

## Part 13: Future Roadmap (Post-MVP)

### Q2 2027
- **AI Interest Matching:** Infer group vibe from historical meetup data
- **Split Cost Tools:** Group ticket purchases + payment splitting (Stripe integration)
- **Memory Feed:** Photo/recap walls per meetup; feeds into badge system

### Q3 2027
- **Cross-City Planning:** Groups can propose meetup cities (e.g., group spanning Toronto + Montreal)
- **Corporate/Team Social Layer:** B2B2C offering for companies hosting team social events
- **API for Third Parties:** Allow other apps to query Gather's event recommendations

### Q4 2027 & Beyond
- **Expansion to Vancouver, Montreal, Calgary**
- **International expansion (UK, Australia)**
- **Smart event recommendations** (ML model based on group history + event embeddings)
- **Social features:** Group chat, shared photo albums, event reviews

---

## Appendix: Glossary

| Term | Definition |
|---|---|
| **CPR** | Cost Per RSVP — B2B billing model where venues pay per group that RSVPs |
| **Smart Nudge** | Contextual notification fired when availability match + event intersection occurs |
| **Weighted Scoring** | Algorithm that ranks time slots by multiple factors (group size, user preference, event proximity) |
| **Calendar Sync** | Automatic fetching of free/busy data from user's external calendar (Google, Outlook, Apple) |
| **Leaderboard** | Monthly ranking of groups by meetup frequency + engagement |
| **Streak** | Consecutive weeks a group meets at least once per week |
| **B2B Partner** | Local business (venue, restaurant, gym, gallery) that lists events and pays CPR |
| **RSVP** | Confirmed attendance for an event; generates calendar invite for all group members |
| **Privacy Tier** | User's chosen level of calendar transparency (free/busy only, titles visible, full details) |
| **Event Clustering** | Grouping geographically proximate events on map for simplified visualization |

---

## Appendix: References

[web:31] Grand View Research. (2025). Scheduling Apps Market Size & Share Report. https://www.grandviewresearch.com  
[web:16] StriveCloud. (2026). Gamification in Apps: 9 Examples to Increase Engagement. https://www.strivecloud.io  
[web:20] MoldStudy. (2025). Gamification in Social Media Apps. https://moldstud.com  
[web:45] Google. Google Calendar API Documentation. https://developers.google.com/workspace/calendar  
[web:36] Microsoft. Microsoft Graph API Documentation. https://docs.microsoft.com/en-us/graph  
[web:1] LettuceMeet. https://lettucemeet.com  
[web:6] Howbout. Shared Calendar App. https://howbout.app  
[web:9] Eventi. Event Discovery App. https://www.eventimeetup.com  
[web:37] MoldStudy. (2024). Monetizing Hyperlocal Apps. https://moldstud.com  
[web:40] Seeker. (n.d.). The Future of Hyperlocal Event Discovery. https://products.seeker.io  
[web:43] BPlan AI. (2025). Hyperlocal News Reporting App Business Plan. https://bplan.ai

---

**Document Version:** 1.0  
**Last Updated:** March 4, 2026  
**Prepared By:** Product Team  
**Status:** Ready for Engineering Review