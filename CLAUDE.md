# Great Thinking — Philosophical Interlocutor

A web app that elicits a user's philosophical position profile, matches them to historical thinkers, and runs Socratic dialogue to probe load-bearing premises.

> **Prototype reference:** `philosophical-interlocutor.html` is the authoritative logic source. Extract from it — do not rewrite.

---

## Skills — load these when relevant

| Skill | File | Load when… |
|-------|------|------------|
| Coding conventions | `.claude/skills/coding-conventions.md` | Writing or reviewing any JS/HTML |
| Ontology conventions | `.claude/skills/ontology-conventions.md` | Editing files in `/ontology/` |
| Visual architecture | `.claude/commands/visual-architecture.md` | Structural changes or architecture questions |
| Context hygiene | `.claude/commands/context-hygiene.md` | Start of session or after major phase |
| Checkpoint | `.claude/commands/checkpoint.md` | Before every `/clear` or `/compact` |

---

## Key invariants

- V1 scope: 7 thinkers, 6 dimensions, 8 premises — no additions
- API model: `claude-sonnet-4-20250514`
- Stack: Next.js (App Router), React, TypeScript, Tailwind — no additional UI libraries in V1
- Anthropic calls server-side only — via `/api/dialogue` route handler (key never on client)
- Forced-choice elicitation only — no free-text parsing in V1

---

## Current phase

`V1 implementation` — Engine and ontology complete; pages are stubs awaiting UI wiring.

- Done: ontology JSON, all `lib/engine/` modules, `/api/dialogue` route
- Next: wire elicitation flow on `/` (quiz → sessionStorage → `/results`)
- Then: `/results` ranked thinker cards, `/dialogue/[id]` chat interface

_Last updated: 2026-04-17_
