# Ontology Conventions

Load this when editing any file in `/ontology/`.

---

## File contracts

| File | Shape |
|------|-------|
| `dimensions.json` | `[{id, values: string[], display_labels: {value: label}}]` |
| `thinkers.json` | `[{id, name, dates, profile: {dim: value}, characteristicMove, premiseTargets: [id]}]` |
| `premises.json` | `[{id, label, statement, thinker_targets: [thinkerId]}]` |
| `moves.json` | `[{id, name, definition}]` |

## Invariants — never violate these

- Every value in `thinkers[].profile` must exist in the matching dimension's `values[]`
- Every id in `thinkers[].premiseTargets` must exist in `premises[].id`
- Hume's `characteristicMove` must stay `"destabilisation"` — the scorer overrides Hume's score regardless, but the label must be consistent
- **No new thinkers, dimensions, or premises in V1** — the vocabulary is closed

## Versioning

Each ontology file has a top-level `"version"` field (semver string):
- Patch bump: correcting a value, fixing a typo
- Minor bump: adding a new entry (V1.1+)

Update the version on every change. Do not add changelog comments inside the JSON.

## Source of truth

If a value in the ontology disagrees with the prototype HTML, the spec (`philosophical-interlocutor-spec.md`) is the arbiter. Cross-check the spec, not the HTML, when there is ambiguity.
