# Pronto — PromptWorkbench

## The Problem

Everyone uses AI. Almost nobody prompts it well.

You type a rough idea into ChatGPT. You get a generic response. You retry. You rephrase. You give up. The problem was never the model — it was the *input*.

| Without Pronto | With Pronto |
|---|---|
| Vague brief → generic eight-hundred-word output → three retries → still thin | Same brief with role, audience, format, and constraints baked in → paste once → usable first answer |

> Pronto doesn't make AI smarter. It makes your **input** smarter.

---

## What It Is

A prompt polisher. Not a chatbot, not a wrapper, not another AI competing with ChatGPT. It sits *before* whatever model you use and makes the input better.

### How It Works

1. **Paste** — Type your rough prompt: messy, vague, shorthand. That's fine.
2. **Polish** — Pronto structures it with grammar, role, context, format, and constraints.
3. **Tweak** — Click the highlighted words to edit. It re-polishes instantly.
4. **Use** — Copy. Paste into ChatGPT, Claude, Gemini, or whatever you already use.

### What You Get

- **5 tone modes**: Default, Professional, Friendly, Detailed, Creative. Each one changes how the prompt is structured, not just word choice.
- **Interactive keywords**: Green highlights lock domain terms. Red highlights are editable slots. Click, type, and Pronto re-polishes immediately.
- **AI + Basic modes**: Basic fixes grammar and punctuation on the spot. AI mode adds full prompt engineering (role, context, task, format, constraints).
- **Works with every major model**: ChatGPT, Claude, Gemini, Grok, Llama, Midjourney. The output stays model-agnostic.
- **No account needed**: Twenty free polishes per hour. No signup, no credit card, nothing stored.
- **Privacy-first**: Prompts are processed and discarded. Nothing saved for training.

---

## Tone Modes

Each tone mode runs a different system prompt under the hood — it doesn't just swap adjectives. It changes sentence structure, vocabulary level, and how much detail lands in the prompt.

| Mode | Description |
|---|---|
| **Professional** | Concise, polite, unambiguous. Strips filler, tightens language, keeps it direct. |
| **Friendly** | Warm and approachable without sacrificing clarity. Good for community posts, onboarding copy, user-facing content. |
| **Detailed** | Expands with context, goals, constraints, and output format. For complex tasks where the model needs more to work with. |
| **Creative** | Encourages imaginative, varied outputs while keeping requirements explicit. For brainstorms, content ideas, anything that needs range. |
| **Concise** | Strips everything to the raw ask. No roles, no formatting, no politeness. Just the core instruction in one or two sentences. |

---

## Under the Hood

No React, no build step, no framework overhead. Vanilla JS frontend, Express backend, local AI via Ollama, optional Supabase for auth. The product is the prompt logic. Everything else is plumbing.

| Layer | Tech |
|---|---|
| **Frontend** | Pure HTML, CSS, vanilla JS — no bundler, no transpiler, ships as-is |
| **Backend** | Express with rate limiting, security headers, and structured logging |
| **AI** | Ollama (local, no API keys, no data leaving your machine) + OpenAI fallback |
| **Database** | Supabase for optional auth and prompt history — skip it and the product still runs |
| **Deployment** | Vercel — one push to main and it's live |

> The "AI" in Pronto is not the model. It is the system prompt: tightly written instructions that train a general-purpose model to behave like a **prompt engineering specialist.**

---

## Roadmap

Ordered by impact, not ease.

1. **Prompt Templates** — Pre-built structures for common tasks: blog writing, code review, email drafting, data analysis. Solve the cold-start problem.
2. **Model Selection** — Pick which model powers your polish: Claude, GPT-4, Gemini, or keep it local. Different models, different strengths.
3. **Prompt History** — Save, search, and reuse past polishes. Build a personal prompt library over time.
4. **Team Collaboration** — Shared prompt libraries, custom tone presets, and brand voice enforcement across an org.
5. **API Access** — Embed Pronto's polish into your own apps. One POST endpoint, structured prompts back.
6. **Desktop App** — System-tray app for Windows. Highlight text anywhere, hit a shortcut, get a better prompt.

---

The AI has the talent. But without a clear prompt, it's just guessing. Pronto turns guessing into engineering.

**[Try it live →](https://pronto-liard-one.vercel.app/index.html)**

