# /visual-architecture

Render the current system state as Mermaid diagrams, or update `docs/architecture.yaml` to reflect recent changes.

## Usage

- `/visual-architecture` — render all three views from current YAML
- `/visual-architecture update` — update YAML first, then render
- `/visual-architecture [user-journey|business-logic|architecture]` — render one view

---

## Step 1 — Read the source

Always read `docs/architecture.yaml` before rendering or updating. It is the single source of truth.

---

## Step 2 — Render as Mermaid

Produce all three diagrams unless a specific view is requested.

### View 1: User Journey
```
flowchart TD
  %% Generated from user_journey.steps
  %% Show planned steps with dashed border and (v1.1) label
```

Render each step as a node. Use `-->` for `next` edges. Planned steps use `-.->` dashed arrows and append `(v1.1)` to the label. Add a `subgraph V1.1 [Planned — V1.1]` block around planned nodes.

### View 2: Business Logic
```
flowchart LR
  %% Generated from business_logic.processes and ontology_files
  %% Ontology files as data nodes ([(label)]); processes as action nodes ([label])
```

Show ontology files as cylindrical nodes feeding into processes. Show process outputs as terminal nodes. Mark `status: v1.1` nodes with a dashed style.

### View 3: System Architecture
```
flowchart LR
  %% Generated from architecture
  %% Group engine/* and ui/* in subgraphs
  %% Show API calls as labelled edges to Anthropic node
  %% Show storage keys as a data node
```

Show `index.html` → `engine/*` → `ui/*` as layered subgraphs. Draw labelled arrows from `dialogue.js` → Anthropic API for each call in `architecture.api.calls`. Show `storage.keys` as a separate data node connected to `dialogue.js`.

---

## Step 3 — Write diagrams to docs/architecture.md

After rendering, write all three diagrams to `docs/architecture.md` using this template:

```markdown
# Architecture Diagrams

_Generated from `docs/architecture.yaml` — do not edit directly. Run `/visual-architecture` to regenerate._

---

## User Journey

\`\`\`mermaid
<diagram>
\`\`\`

---

## Business Logic

\`\`\`mermaid
<diagram>
\`\`\`

---

## System Architecture

\`\`\`mermaid
<diagram>
\`\`\`
```

---

## Step 4 — Updating the YAML

When called with `update`, or when you identify that `docs/architecture.yaml` is stale relative to the codebase:

1. Read current repo file structure (use Glob on `ontology/`, `engine/`, `ui/`)
2. Diff against `architecture.yaml` — new files, removed files, changed API calls
3. Apply minimal edits using the Edit tool — do not rewrite the whole file
4. Bump `version` (patch for corrections, minor for new entries)
5. Update `# Last updated:` date
6. Render updated diagrams

---

## Schema reference

When editing `docs/architecture.yaml`, preserve this structure exactly:

```yaml
version: "MAJOR.MINOR.PATCH"
user_journey:
  steps:
    - id: string          # snake_case
      label: string       # human readable
      next: [id, ...]     # step ids
      notes: string       # optional
      internal: true      # optional, omit if false
  planned:
    - id: string
      inserts_after: id
      status: v1.1        # always v1.1 for planned items

business_logic:
  ontology_files:
    - file: filename.json
      contains: string
  processes:
    - name: string
      input: string
      output: string
      rule: string        # optional
      status: v1.1        # optional

architecture:
  frontend:
    shell: filename
    modules:
      engine: [filename, ...]
      ui: [filename, ...]
  api:
    provider: string
    model: string
    calls:
      - name: string
        trigger: string
        type: multi-turn | single-shot
        system_prompt: string
        max_tokens: number
        status: v1.1      # optional
  storage:
    adapter: string
    keys: [string, ...]
```
