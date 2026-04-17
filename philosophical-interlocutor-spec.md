# Philosophical Interlocutor — Build Spec
## Context for coding agent

The `.html` file in this repo is a working single-file prototype. It contains a complete elicitation flow, thinker-selection logic, persistent dialogue engine, and seven thinker system prompts. Build from it, not past it. Every architectural decision below should be understood as an extension of what already works in that file.

---

## What the prototype does (baseline)

1. **Elicitation** — 6 forced-choice questions surface a position profile across 6 dimensions: causal base, mechanism of change, human nature, institutions vs power, epistemic confidence, method.
2. **Profile** — answers are stored as a flat object `{base, change, nature, institution, epistemic, method}` with controlled vocabularies per dimension.
3. **Thinker selection** — each of 7 thinkers (Marx, Aristotle, Hobbes, Hume, Kant, Rawls, Hayek) has a fixed profile on the same 6 dimensions. The user's profile is scored against each thinker's profile to produce a classification: structural neighbour, destabiliser, or structural opponent. Hume is always classified as destabiliser regardless of score.
4. **Dialogue** — the user selects a thinker. A system prompt encoding that thinker's historical voice and characteristic move is sent to `claude-sonnet-4-20250514` along with the user's full position profile and conversation history. The thinker asks one question per turn, labels the move in brackets, stays in historical voice.
5. **Persistence** — user profile and per-thinker dialogue history are stored via `window.storage` (Claude artifact storage API) and reloaded on return.

---

## Ontology (v1)

The ontology is the data layer the engine runs on. In v1 it lives in static JS objects. In the repo it should be extracted to versioned JSON files in `/ontology/`.

### Dimensions and vocabularies

Six dimensions, each with 3–4 fixed values:

```
base:        material | psychological | institutional | ideational
change:      rupture | design | gradual | emergent
nature:      fixed | variable | capacity
institution: reflects | independent | mutual | cultural
epistemic:   confident | moderate | sceptical | reject
method:      rationalist | intuitionist | critical | dialectical
```

### Thinker profiles

Each thinker is an object with:
- `id`, `name`, `dates`
- `profile` — values on all 6 dimensions (same vocabulary as above)
- `characteristicMove` — the named operation this thinker performs (see moves below)
- `premiseTargets[]` — the 2–3 premises this thinker most reliably attacks (see premise list below)
- `systemPromptFn(answers)` — function that returns the full system prompt string, taking the user's answers as input so the profile is embedded

### Move primitives (7)

```
destabilisation   Remove a load-bearing premise without replacing the framework
inversion         Preserve the architecture, reverse the causal base
absorption        Incorporate a prior framework as a special case
rejection         Refuse a foundational premise from outside the framework
extension         Apply an existing framework to new terrain
reduction         Collapse complex motivation to a single mechanism
foreclosure       Build a structure that makes certain subsequent moves unavailable
```

Each thinker's system prompt should name their characteristic move explicitly and instruct the model to label each turn with the move being performed.

### Premise list (v1 — 8 core premises)

These are the load-bearing assumptions beneath the 6-dimension positions. In v1 they are referenced by thinker system prompts but not yet stored as explicit user state.

```
P1  norms-self-sustaining     Norms can hold without coercive enforcement
P2  causal-necessity          We can observe that A causes B, not merely that A and B co-occur
P3  unified-self              There is a coherent rational agent stable enough to ground theory
P4  property-post-political   Who owns what is prior to politics; politics distributes within those facts
P5  abstraction-valid         We can reason about principles by abstracting from class and interest
P6  improvement-designable    Correct analysis enables deliberate production of better arrangements
P7  history-directional       Historical development has an immanent logic that can be known
P8  telos-fixed               Human nature has a stable end that determines what counts as flourishing
```

Thinker–premise attack matrix:

| Thinker   | Primary targets     | Move applied                        |
|-----------|---------------------|-------------------------------------|
| Hobbes    | P1, P6              | Reduction + foreclosure             |
| Hume      | P2, P3              | Destabilisation                     |
| Marx      | P4, P5              | Ideology critique (inversion)       |
| Aristotle | P5, P8              | Teleological question               |
| Kant      | P3, P5              | Transcendental question             |
| Rawls     | P4, P5              | Original position (extension)       |
| Hayek     | P2, P6              | Knowledge problem (destabilisation) |

---

## Pipeline (v1)

```
elicitation (6 questions)
    → position profile {base, change, nature, institution, epistemic, method}
    → score against thinker profiles
    → classify each thinker as neighbour | destabiliser | opponent
    → display ranked thinker cards
    → user selects thinker
    → load system prompt with embedded profile
    → dialogue (multi-turn, history persisted)
```

### Scoring

For each thinker, count matching dimensions. Hume always = destabiliser. Otherwise: ≥3 matches = neighbour, <3 = opponent. Ties broken by total mismatches (more mismatches = more useful opponent).

### System prompt structure (per thinker)

Each prompt must specify:
1. Voice and source texts (which specific works set the register)
2. Characteristic move (named, with definition)
3. The user's position profile (embedded at call time)
4. Opening instruction: identify the most premise-vulnerable commitment in the profile and press on it
5. Turn rules: one question per response, move label in brackets, stay in voice, under 150 words

---

## V1 repo structure

```
/ontology
  dimensions.json        vocabulary for all 6 dimensions + display labels
  premises.json          8 core premises with id, statement, thinker_targets[]
  thinkers.json          7 thinkers with profile, move, premise_targets[], avatar
  moves.json             7 move primitives with id, name, definition

/engine
  elicitation.js         question flow, reveal text, position capture
  scorer.js              profile → thinker scores → classification
  router.js              returns ranked [{thinker, classification, attackVector}]
  dialogue.js            API call, history management, storage read/write
  prompts.js             systemPromptFn per thinker

/ui
  quiz.js                question rendering, option selection, progress
  results.js             thinker card rendering, engagement buttons
  chat.js                message rendering, typing indicator, input handling

index.html               shell, imports, layout, CSS
```

The prototype `.html` file is the authoritative reference for all logic. Extract, don't rewrite.

---

## V1.1 extensions

Three additions in priority order. Each is independent — they can ship separately.

### 1. Targeted follow-up question (highest priority)

After the 6 questions, fire one additional question that probes the most premise-revealing answer in the profile. The follow-up is selected by a lookup table keyed on the answer to the most philosophically loaded dimension for the user's specific combination.

Example: if `institution = cultural` (your answer), fire:
> "Does that hold even when the powerful actively resist the cultural shift — when the people with most to lose from the new norm control the institutions that would enforce it?"

A "yes" answer confirms P1 (norms-self-sustaining) and sharpens the routing to Hobbes or Marx. A "no" answer reveals a tension with the original Q4 answer that itself becomes a dialogue target.

Implementation: add `followUp.json` mapping `{dimension: {value: {question, yes_premise, no_premise, tension_flag}}}`. The follow-up fires after Q6, before the results screen. One question only.

### 2. Internal inconsistency detection

Some position combinations imply contradictory premises. These are the most productive dialogue targets because the user is already in tension with themselves before the thinker arrives.

Known productive tensions:
- `institution = cultural` + `epistemic = confident` → you think culture determines institutions but also that social structure is knowable and designable. These pull in opposite directions.
- `change = design` + `nature = variable` → you want to design institutions but deny the fixed human nature that would make designed outcomes predictable.
- `method = dialectical` + `epistemic = confident` → dialectical thinking implies that contradictions are irreducible; high epistemic confidence implies they can be resolved.

Implementation: add `tensions.json` mapping `{dimension_a.value_a + dimension_b.value_b: {tension_description, recommended_thinker, attack_vector}}`. Surface detected tensions on the results screen as a distinct card above the thinker grid: "Your profile contains a structural tension — [thinker] is well-placed to press on it."

### 3. Premise state write-back

Currently the dialogue stores conversation history but not premise state. If a user concedes P1 in a dialogue with Hobbes, the system doesn't register it. This means dialogues with other thinkers start from scratch rather than from the updated position.

Implementation:
- Add `premise_state.json` to user storage: `{P1: {status: 'held'|'conceded'|'contested'|'unknown'}, ...}`
- After each dialogue turn where the thinker presses a specific premise, run a lightweight extraction call to the API: "Based on the user's last response, has premise P1 been held, conceded, or left contested? Answer in one word."
- Write the result back to premise state.
- Inject current premise state into all subsequent system prompts: "The user has already conceded P1 (norms require enforcement) in a prior dialogue with Hobbes. Do not re-establish this — proceed from the concession."

This makes the system cumulative across sessions and across thinkers. It is the feature that most distinguishes the experience from a series of isolated chatbot conversations.

---

## What not to build in v1 or v1.1

- Do not add more than 7 thinkers in v1. The system prompt quality degrades with thinkers whose philosophical moves are less distinct. Candidates for v2: Nietzsche, Wittgenstein, Foucault, Sen.
- Do not build a graph visualisation layer in v1. The move graph built in the prototype conversation is a separate tool. It can be linked from the results screen but should not be integrated into the dialogue flow.
- Do not replace forced-choice elicitation with free-text elicitation in v1. Free-text input requires the API to parse positions, which adds latency, cost, and classification errors. The forced-choice vocabulary is a feature: it guarantees the profile is comparable across users and sessions.
