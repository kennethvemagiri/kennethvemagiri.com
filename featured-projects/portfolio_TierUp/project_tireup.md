# TierUp AI

**An AI-powered job search engine for international students navigating visa-sponsored markets.**

Built by [@KennethVemagiri](https://kennethvemagiri.com)

---

## The Problem

As an international student in the UK, every job search starts with the same question: *"Will they sponsor my visa?"* The answer is rarely upfront. You apply to 50 roles, hear back from 3, and two of them don't sponsor.

The manual process looked like this: copy a company name → paste it into the Home Office register → check → repeat. Then tailor a CV. Then write a cover letter. For every single role.

TierUp is the tool that should have existed.

> TierUp doesn't just find jobs — it tells you **which ones are worth your time** before you spend an hour applying.

---

## Key Stats

| Metric | Value |
|---|---|
| Visa sponsor companies checked | 50,000+ |
| AI match score range | 0 → 10 |
| Time per search | ~15 seconds |
| Streaming protocol | SSE (real-time) |

---

## Features

### Live LinkedIn Scraping
Pulls real postings via Apify actors — not cached job board data. Fresh listings on every search.

### GPT-4o CV Matching
Every result gets a 0–10 fit score with strengths, gaps, ATS keywords, and a concrete improvement tip before you apply.

### Visa Sponsor Check
Automatically badges UK Skilled Worker licensed employers against the Home Office register. No more tab-switching.

### CV & Cover Letter Generation
Paste a job URL or description → get a tailored rewrite with STAR bullets and a 350-word cover letter, streamed to your screen.

### Application Tracker
Kanban board from Saved → Applied → Interviewing → Offer or Rejected. Star your top picks.

### Web Search Fallback
No Apify token? GPT-4o uses DuckDuckGo + page fetch as tools — still finds and scores jobs via an agentic loop.

---

## How the Search Works

Results stream to the browser in real time — cards appear as they arrive, not after a loading spinner.

1. **User submits search** — FastAPI opens an SSE stream. The browser starts listening.
2. **Apify actor launches** — A LinkedIn search URL is built from your filters. The scraper polls every 2 seconds, with a 35s timeout.
3. **Raw cards stream in** — Each job (title, company, location) appears in the UI immediately — no scores yet, but you're already scanning.
4. **GPT-4o scores in parallel** — Your profile + all listings go into one prompt. Scores, fit analysis, gap warnings, and ATS tips come back.
5. **Visa check runs** — Each company name is normalised and matched against 50,000+ entries in the Home Office register.
6. **Cards update live** — Score pills, visa badges, and analysis text appear on each card. Done.

Without Apify, the system falls back to GPT-4o's **tool-calling capability** — DuckDuckGo search + page fetch, orchestrated as an agentic loop.

---

## Architecture

Full-stack, async-first, single-file database. No over-engineering.

| Layer | Technology |
|---|---|
| Backend | FastAPI — async endpoints, SSE streaming via generators (Python 3.12+, aiosqlite, uvicorn) |
| AI | GPT-4o — job analysis, CV generation, and agentic web search with tool-calling |
| Scraping | Apify Cloud — LinkedIn jobs actor with start-poll-abort pattern. Fallback: DuckDuckGo via ddgs + requests |
| Frontend | Next.js 14 — file-based routing, TypeScript, Tailwind CSS. SSE consumed via ReadableStream |
| Database | SQLite — single-file, zero config. Applications, sponsors, profiles, search history (async via aiosqlite) |
| API | 14 endpoints across 6 routers — RESTful for CRUD, SSE for streaming. Next.js rewrites proxy `/api/*` to FastAPI |

### The Visa Matching Engine

The Home Office publishes a CSV of 50,000+ licensed sponsors. TierUp imports it into SQLite, normalises every company name (lowercase, punctuation stripped), and runs a two-pass match:

```sql
-- 1. Exact normalised match
SELECT * FROM sponsors WHERE name_norm = normalize('Google')

-- 2. Fuzzy fallback — catches "Google UK Ltd"
SELECT * FROM sponsors WHERE name_norm LIKE '%google%'
```

Every job card gets a green **✓ Visa Sponsor** badge or a red warning — automatically.

---

## API Surface

14 endpoints across 6 routers.

```
# Core (SSE streaming)
POST   /api/jobs/search         # Job search + real-time scoring
POST   /api/cv/optimize         # Tailored CV + cover letter
POST   /api/cv/batch            # Batch CV generation

# Application tracker (CRUD)
GET    /api/tracker             # List all saved applications
POST   /api/tracker             # Save a new application
PATCH  /api/tracker/:id         # Update status, notes, starred
DELETE /api/tracker/:id         # Remove application

# Visa sponsors
POST   /api/sponsors/import     # Load Home Office CSV into DB
GET    /api/sponsors/check      # Check if company sponsors visas

# Profile + Activity
GET    /api/profile             # Read user profile
POST   /api/profile             # Save profile
GET    /api/activity            # Aggregate stats + recent log
```

---

## Before vs After

| | Before (Manual) | After (TierUp) |
|---|---|---|
| Find a job | Open LinkedIn, search, open job | Type a role, hit search |
| Check visa | Copy company → Home Office register → search → check variations | Automatic badge on every card |
| Apply | Tailor CV manually, write cover letter from scratch | Click "CV Package" → tailored CV + cover letter streamed to screen |
| Total time | **Hours per batch** | **Under 2 minutes** |

---

## Design Decisions

**SSE over WebSockets** — one-directional stream is all job search needs. WebSockets would be over-engineering for a unidirectional data flow. Simpler, fewer failure modes.

**SQLite over Postgres** — this is a personal tool. Single-file database means zero infrastructure, instant setup, and the entire state fits in one `autojob.db` file you can back up with copy-paste.

**Apify over custom scraping** — LinkedIn blocks scrapers aggressively. Apify handles proxy rotation, browser fingerprinting, and CAPTCHA solving. Focus went to the AI layer, not fighting anti-bot systems.

**GPT-4o as an agent, not just a scorer** — the web search fallback uses tool-calling to run DuckDuckGo searches and fetch pages in an agentic loop. The AI decides what to search, when to fetch a page, and when it has enough data to score.

**Normalised sponsor matching** — exact matching fails when LinkedIn says "Google" but the register says "Google UK Limited." Normalisation + fuzzy LIKE catches these edge cases without needing a vector database.

> Every decision was driven by the same principle: **what gets a working product into my hands fastest?**

---

## What I Learned

### SSE Streaming Is Underrated
Most developers reach for WebSockets by default. For server-to-client data flow — which is exactly what AI streaming responses are — Server-Sent Events are simpler, auto-reconnect out of the box, and work through proxies without extra config.

```python
async def search_generator():
    yield sse_event("status", {"message": "Scraping LinkedIn..."})
    jobs = await scrape_linkedin(params)
    for job in jobs:
        yield sse_event("job", job)       # card appears immediately
    scores = await score_with_gpt4o(jobs, profile)
    yield sse_event("jobs", scores)       # cards update with AI analysis
```

### AI Tool-Calling Changes Everything
The web search fallback isn't a hardcoded scraper — it's GPT-4o deciding what to search, evaluating results, fetching pages, and reasoning about which jobs match. The AI orchestrates its own tool calls. The tools were defined, the goal was set, and the AI handled the rest.

### Build for Yourself First
This started as a terminal script. Then it got a FastAPI wrapper. Then a frontend. The product grew from a real need, not a spec doc. That's why every feature exists — it was needed.

---

## Links

- [GitHub Repository](https://github.com/kennethvemagiri/tierup-ai)
- [Portfolio](https://kennethvemagiri.com)

---

*I didn't build TierUp because I wanted a portfolio project. I built it because applying for jobs as an international student shouldn't feel like a second full-time job.*
