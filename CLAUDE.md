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
| Context hygiene | `.claude/commands/context-hygiene.md` | Start of session, before `/compact`, after major phase |

---

## Key invariants

- V1 scope: 7 thinkers, 6 dimensions, 8 premises — no additions
- API model: `claude-sonnet-4-20250514`
- No frameworks, no build step, no npm in V1 — vanilla JS + ES modules
- Forced-choice elicitation only — no free-text parsing in V1

---

## Current phase

`V1 scaffold` — extracting prototype HTML into structured repo per spec.

_Last updated: 2026-04-17_
