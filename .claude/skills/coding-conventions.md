# Coding Conventions

Load this when writing or reviewing any JS or HTML in this project.

---

## Language

- Vanilla JS only — no frameworks, no transpilers, no npm
- ES modules (`type="module"`) throughout — named exports only, no default exports
- No TypeScript in V1 — the ontology JSON files are the schema

## Naming

- Functions and variables: `camelCase`
- File names: `kebab-case.js`
- JSON ontology ids: `kebab-case` strings (e.g. `"id": "change-rupture"`)
- CSS classes: `kebab-case`

## File responsibilities

Each file in `/engine/` and `/ui/` owns exactly one concern. Never mix:
- Rendering logic → `/ui/` only
- Data / scoring logic → `/engine/` only
- System prompts → `prompts.js` only (not scattered across engine files)

## JSON imports

Import ontology JSON directly with `import data from '../ontology/foo.json' assert { type: 'json' }`.
No transformation layer, no fetch calls for local data.

## Error handling

No try/catch around API calls in V1 — let errors surface to the console.
Add handling in V1.1 only where the spec explicitly calls for it.

## Comments

Comment non-obvious logic only. System prompt strings, scoring rules, and premise extraction logic need comments. DOM manipulation and event handlers do not.

## Prototype reference

Before implementing any logic, check `philosophical-interlocutor.html` for the working version. Extract the pattern — do not reinterpret it.
