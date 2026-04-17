# Productive version – To-do list

## What we have left to do (overview)

- **Contact “Schedule a free call”**: The first option in “Get in Touch” uses `href="#"`. Replace with your Cal.com (or Calendly) booking URL when ready, or replace that block with an embedded calendar widget.
- **Calendar widget (later)**: If you want the in-page calendar to look like the Cal.com reference (dark theme, three panels: meeting details | calendar | time slots), use the checklist below.
- **Form backend**: Contact form “Send a Message” uses `action="#"`. Hook it up to Formspree, a serverless function, or your own API.
- **APIs (optional)**: Last played (e.g. Spotify), Contributions (e.g. GitHub) – see README “Where to add integrations”.
- **Content**: Add more experience entries, project repo links, and any extra sections you want.

---

## Calendar: make it look like the reference (for later)

Use this when you’re ready to build or embed a Cal.com-style scheduler on the site.

### 1. HTML structure (in Contact “Send a Message” or a dedicated block)

- [ ] **Three-panel layout** inside the contact/scheduling area:
  - **Left – Meeting details**: Avatar, host name, meeting title (e.g. “Chat with Kenneth”), short description, duration (e.g. 30m), platform (e.g. Google Meet), timezone dropdown.
  - **Middle – Calendar**: Month + year label, prev/next month arrows, SUN–SAT headers, date grid (clickable cells), distinct styles for selected / available / past dates.
  - **Right – Time slots**: Selected day label (e.g. “Sat 07”), 12h/24h toggle, vertical list of selectable time-slot buttons (e.g. 14:30, 15:00, …).

### 2. CSS styling (match dark Cal.com look)

- [ ] Dark backgrounds for the section and each panel (e.g. `--bg`, `--bg-elevated`, `--bg-card`).
- [ ] Light text and muted secondary text; clear selected state (e.g. white background, dark text for selected date and 12h/24h active).
- [ ] Button-style for: month arrows, date cells, time slots, 12h/24h toggle.
- [ ] Spacing and borders so the three panels read clearly; keep layout responsive (e.g. stack on small screens).

### 3. JavaScript (basic interactivity)

- [ ] **Month navigation**: Previous/next month updates the calendar grid and label.
- [ ] **Date selection**: Clicking a date highlights it and loads time slots for that day (can be placeholder slots at first).
- [ ] **Time slots**: Render a list for the selected date; optional: load from an API later.
- [ ] **12h/24h toggle**: Switch time slot labels between 12-hour and 24-hour format.
- [ ] **Timezone**: Dropdown or selector; use to format times (optional for v1).

### 4. Integration (when you go live)

- [ ] Either **embed** Cal.com (or similar) in an iframe and style the page around it, **or** keep the custom UI and wire “Confirm” to your booking API (e.g. Cal.com API) so the calendar both looks and works like the reference.

---

*Update this file as you complete items or change priorities.*
