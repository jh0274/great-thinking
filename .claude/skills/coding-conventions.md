# Coding Conventions

Load this when writing or reviewing any code in this project.

---

## Stack

- Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS
- No additional UI component libraries in V1
- Ontology data lives in `/ontology/*.json` — imported server-side, never fetched client-side

## Language

- TypeScript throughout — strict mode
- Named exports only, no default exports (except Next.js page/layout files which require default export)
- File names: `kebab-case.ts` / `kebab-case.tsx`
- JSON ontology ids: `kebab-case` strings (e.g. `"id": "change-rupture"`)
- CSS: Tailwind utility classes only — no custom CSS files in V1

## Naming

- Functions and variables: `camelCase`
- React components: `PascalCase`
- Types/interfaces: `PascalCase`

## File responsibilities

Each file in `/lib/engine/` owns exactly one concern. Never mix:
- Rendering logic → `/app/` components only
- Data / scoring logic → `/lib/engine/` only
- System prompts → `/lib/engine/prompts.ts` only
- Anthropic API calls → `/app/api/` route handlers only (never in client components)

## API calls

- All Anthropic SDK calls in `/app/api/dialogue/route.ts` only
- Client components call `/api/dialogue` via `fetch` — never import the Anthropic SDK client-side
- API key read from `process.env.ANTHROPIC_API_KEY` in route handler only

## State management

- V1: React `useState` + `useReducer` + `sessionStorage` for quiz/dialogue state
- Auth + persistent cross-session state deferred to V1.1

## Error handling

No try/catch in V1 engine logic — let errors surface. Route handlers may return `{ error }` JSON with appropriate status codes.

## Comments

Comment non-obvious logic only. System prompt strings, scoring rules, and premise extraction logic need comments. JSX and event handlers do not.

## Prototype reference

Before implementing any logic, check `philosophical-interlocutor.html` for the working version. Extract the pattern — do not reinterpret it.
