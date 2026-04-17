# /context-hygiene

Run this at the start of a session, after a major phase, or before `/compact`.
It reviews freshness of CLAUDE.md and `docs/architecture.yaml`, then produces a compact-readiness verdict.

---

## Checklist — work through each item in order

### 1. Check CLAUDE.md freshness
- Read `CLAUDE.md`
- Is "Current phase" accurate? (e.g. still says "V1 scaffold" when V1 is done?)
- Are any key invariants stale? (model version changed? scope expanded?)
- Are all skills in the table still the right ones?
- **If stale:** edit CLAUDE.md — update phase, invariants, or skill table. Update `_Last updated_` date.

### 2. Check architecture.yaml vs repo
- Run Glob on `ontology/`, `engine/`, `ui/` to list actual files
- Compare against `architecture.modules` in `docs/architecture.yaml`
- Are all new files listed? Are removed files gone?
- Are any new API calls not captured?
- **If stale:** run `/visual-architecture update` to sync and re-render

### 3. Check skill files
- Are `.claude/skills/coding-conventions.md` and `.claude/skills/ontology-conventions.md` accurate for the current codebase?
- **If a new domain was added** (e.g. backend, auth, deployment): create a new skill file in `.claude/skills/` and add it to the CLAUDE.md table

### 4. Compact verdict
Report one of:
- **COMPACT NOW** — context has covered ≥3 files or a major feature; everything is up to date
- **UPDATE FIRST** — list what still needs updating before compacting
- **NO ACTION** — session was exploratory only; no structural changes made

---

## When to run this (without being asked)

Run `/context-hygiene` proactively if:
- You are about to start work on a V1.1 feature after completing V1 scaffold
- You have just written or edited more than 3 structural files in one session
- The user asks "where are we?" or "what's the current state?"
- Context usage is visibly high and a `/compact` is likely needed

---

## After compacting

The new session will load fresh context from:
1. `CLAUDE.md` (index + invariants + current phase)
2. Whichever skill files are relevant to the next task

The new session will NOT automatically load `docs/architecture.yaml` — tell the user to reference it explicitly if architecture context is needed.
