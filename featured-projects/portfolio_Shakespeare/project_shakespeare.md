# Shakespeare — Terminal Transcript Tool

**Type:** Personal side project  
**Stack:** Python 3 · CLI · youtube_transcript_api · yt-dlp  
**GitHub:** https://github.com/kennethvemagiri/Shakespeare  
**Portfolio page:** `featured-projects/portfolio_Shakespeare/shakespeare-portfolio.html`

---

## What It Does

Shakespeare is a zero-config command-line tool that turns any YouTube URL into a clean, searchable `.txt` transcript file. Paste a URL, get a formatted file named after the video, move on.

Key behaviours:
- Extracts the full transcript via `youtube_transcript_api`
- Formats raw segments into natural paragraphs using a **silence-gap heuristic** (splits on speaker pauses > 2 seconds)
- Fetches the video title with `yt-dlp` (falls back to the video ID)
- Saves the output as `<Video Title>.txt` in a local transcripts folder
- Auto-deletes files after **7 days** to keep the folder clean
- Shows clickable folder links via OSC 8 hyperlinks in the terminal

---

## The Problem It Solves

| Pain point | Detail |
|---|---|
| Can't search video | No way to Ctrl+F a 40-min tutorial for one specific answer |
| Rewatching wastes hours | Scrubbing through video to re-find a section every time |
| Notes go stale | Manual notes miss context; you never capture everything first time |
| Raw captions aren't readable | Auto-captions are an unstructured wall of text |

---

## Architecture

```
Shakespeare.lnk  →  .bat  →  Python Script  →  youtube_transcript_api  →  .txt
```

Single Python script launched via a Windows `.lnk` shortcut pointing to a `.bat` launcher. No web framework, no config file, no Docker, no database.

---

## Tech Stack

| Tool | Purpose |
|---|---|
| `youtube_transcript_api` | Fetches raw transcript segments from YouTube's internal API |
| `yt-dlp` | Fetches the video title; falls back to video ID when unavailable |
| `threading` | Powers the braille-dot spinner (`⠋⠙⠹⠸⠼⠴`) as a context manager |
| `re` | Regex URL parsing — handles `/watch?v=`, `youtu.be/`, `/embed/`, `/shorts/` |
| ANSI + OSC 8 | Colour-coded terminal output and clickable hyperlinks |
| `os / time / datetime` | File age tracking, expiry dates, and 7-day auto-cleanup |

---

## Notable Code Patterns

### Context Manager Spinner
Braille-frame animation runs on a background thread. `__enter__` starts it; `__exit__` signals a stop event and joins cleanly — no orphan threads.

```python
class Spinner:
    _FRAMES = ['⠋', '⠙', '⠹', '⠸', '⠼', '⠴']

    def __enter__(self):
        self._thread.start()
        return self

    def __exit__(self, *_):
        self._stop.set()
        self._thread.join()
```

### Silence-Gap Paragraph Splitting
Instead of dumping all segments as one block, the script detects pauses > 2 seconds between segments and uses them as paragraph breaks, mirroring how a speaker naturally groups ideas.

```python
for snippet in transcript:
    if prev_end and (snippet.start - prev_end) > 2.0:
        paragraphs.append(" ".join(current))
        current = []
    current.append(snippet.text)
```

### 4-Format URL Parser
Handles every common YouTube URL shape with four sequential regex patterns so the tool accepts any link a user might paste.

```python
for pattern in (
    r"(?:v=)([a-zA-Z0-9_-]{11})",          # /watch?v=
    r"(?:youtu\.be/)([a-zA-Z0-9_-]{11})",   # youtu.be/
    r"(?:embed/)([a-zA-Z0-9_-]{11})",       # /embed/
    r"(?:shorts/)([a-zA-Z0-9_-]{11})",      # /shorts/
):
```

---

## Target Audience

- **Students** studying from tutorials who need searchable notes without rewatching hours of content
- **Developers** following coding walkthroughs who want to copy commands and snippets directly from a transcript
- **Content creators** researching topics via YouTube who need raw text to reference, quote, or build on
- **Anyone** who watches long-form YouTube and wants to turn passive watching into searchable knowledge

---

## Portfolio Integration

Registered in `data/site-content.json` as a **featured** project with:
- `tileClass`: `project-tile-shakespeare`
- Badge: `Side project`
- Tagline: *"YouTube URLs to clean, searchable transcripts in the terminal."*
- Metric copy: *"Formatted .txt export · 7-day auto-cleanup"*
- Related writing: `blog/chunking-unstructured-documents.html`, `blog/llm-observability-production.html`
- Search keywords cover: `cli`, `python`, `youtube transcript`, `automation`, `tui`, `batch script`, `threading`, `regex`, `video to text`, and more

### Portfolio Page Assets

| File | Purpose |
|---|---|
| `shakespeare-portfolio.html` | Full case study / portfolio page |
| `hero-tile.webp` | Project tile image shown on homepage grid |
| `cover.png` | Fallback image (PNG) |
| `shakespeare-icon.png` | Round icon displayed in the case study hero |

---

## Local Usage Flow

1. Double-click `Shakespeare.lnk` (Windows shortcut)
2. Batch file opens a terminal and launches the Python script
3. Paste a YouTube URL (or type `H` for history, `Q` to quit)
4. Script fetches title + transcript, formats paragraphs, saves `.txt`
5. Terminal prints file size, expiry date, and a clickable folder link
