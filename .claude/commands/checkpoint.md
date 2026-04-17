# /checkpoint

Run this before every `/clear` or `/compact`. It audits implementation status,
commits that audit to `docs/architecture.yaml` and `CLAUDE.md`, updates project
memory, then gives a compact-ready verdict.

---

## Steps — work through each in order

### 1. Audit implementation status

For each route and engine module, check the actual file contents:

| File | How to judge |
|------|-------------|
| `app/page.tsx` | stub if it just returns "coming soon" markup; done if it renders quiz flow |
| `app/results/page.tsx` | stub if no RankedThinker rendering; done if it reads sessionStorage and renders cards |
| `app/dialogue/[thinkerId]/page.tsx` | stub if no chat loop; done if it calls `/api/dialogue` |
| `app/api/dialogue/route.ts` | done if it calls Anthropic and returns text |
| `lib/engine/*.ts` | done if logic is extracted from prototype; stub if placeholder |

Classify each as `stub | wip | done`.

### 2. Update `docs/architecture.yaml`

Edit the `implementation_status` block to reflect current reality.
Update `# Last updated:` date at the top.

### 3. Update `CLAUDE.md`

Edit the `## Current phase` section:
- One-line summary of what phase we're in
- Bullet list of what's done and what's next (max 5 bullets)
- Update `_Last updated_` date

### 4. Update project memory

Overwrite `/Users/jimhawker/.claude/projects/-Users-jimhawker-great-thinking/memory/project-great-thinking.md`
with a fresh summary reflecting current phase and next steps.

### 5. Compact verdict

Report one of:
- **CLEAR NOW** — status is accurate, CLAUDE.md is fresh, memory updated
- **UPDATE FIRST** — list what still needs updating before clearing

---

## When to run proactively

Run `/checkpoint` without being asked if:
- You have just completed a page or engine module
- You are about to start a new major feature
- Context usage is visibly high
