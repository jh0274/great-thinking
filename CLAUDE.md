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

`V1.1 planning` — V1 complete. CIB engine spec received; beginning implementation planning.

- Done: ontology JSON, all `lib/engine/` modules, `/api/dialogue` route, quiz (`/`), results (`/results`), dialogue (`/dialogue/[id]`)
- CIB engine spec at `docs/cib-engine-spec.md` — replaces mismatch scorer with weighted cross-impact matrix; adds coherence scoring, explainable routing, gap finding
- Next: `ontology/cross-impact-matrix.json` schema → `lib/engine/cib.ts` (coherenceScore, tensionScore, findGaps) → swap scorer/router → `/succession` visual
- Research agent matrix population (Tier 1+2 citations) runs parallel to code implementation
- Spec invariant: `/engine/cib.js` → use `lib/engine/cib.ts` (TypeScript, project convention)

_Last updated: 2026-04-18_
