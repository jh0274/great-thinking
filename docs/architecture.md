# Architecture Diagrams

_Generated from `docs/architecture.yaml` — do not edit directly. Run `/visual-architecture` to regenerate._

---

## User Journey

```mermaid
flowchart TD
  elicitation["6 forced-choice questions"]
  scoring["Score profile against 7 thinker profiles"]
  results["Ranked thinker cards\n(neighbour / destabiliser / opponent)"]
  thinker_select["User selects thinker"]
  dialogue["Multi-turn Socratic dialogue"]

  elicitation --> scoring
  scoring --> results
  results --> thinker_select
  thinker_select --> dialogue
  dialogue -.-> thinker_select

  subgraph V1.1 [Planned — V1.1]
    follow_up["1 targeted follow-up question (v1.1)"]
    tension_card["Internal inconsistency card on results screen (v1.1)"]
  end

  elicitation -.-> follow_up -.-> scoring
  results -.-> tension_card -.-> thinker_select
```

---

## Business Logic

```mermaid
flowchart LR
  dimensions[(dimensions.json\n6 dimensions × 3-4 values)]
  thinkers[(thinkers.json\n7 thinkers: profile, move, targets)]
  premises[(premises.json\n8 premises: id, statement, targets)]
  moves[(moves.json\n7 move primitives)]

  dimensions --> Scoring
  thinkers --> Scoring
  Scoring["Scoring\n≥3 matching = neighbour\nHume always = destabiliser"]
  Scoring --> ranked["[{thinker, classification, attackVector}] ranked"]

  thinkers --> DialogueTurn
  prompts["SystemPrompt(thinker, profile)"]
  history["ConversationHistory"]
  prompts --> DialogueTurn
  history --> DialogueTurn
  DialogueTurn["DialogueTurn"] --> response["1 question + move label\n≤150 words"]

  premises -.-> PremiseExtraction
  PremiseExtraction:::planned
  PremiseExtraction["PremiseExtraction (v1.1)"] -.-> premise_status["held | conceded | contested"]

  dimensions -.-> TensionDetection
  TensionDetection:::planned
  TensionDetection["TensionDetection (v1.1)"] -.-> tension_out["Contradictory pairs → recommended thinker"]

  classDef planned stroke-dasharray: 5 5
```

---

## System Architecture

```mermaid
flowchart LR
  subgraph frontend [Frontend]
    index["index.html"]

    subgraph engine [engine/]
      elicitation_js["elicitation.js"]
      scorer_js["scorer.js"]
      router_js["router.js"]
      dialogue_js["dialogue.js"]
      prompts_js["prompts.js"]
    end

    subgraph ui [ui/]
      quiz_js["quiz.js"]
      results_js["results.js"]
      chat_js["chat.js"]
    end

    index --> elicitation_js
    index --> scorer_js
    index --> router_js
    index --> dialogue_js
    index --> prompts_js
    index --> quiz_js
    index --> results_js
    index --> chat_js
  end

  Anthropic["Anthropic API\nclaude-sonnet-4-20250514"]
  dialogue_js -->|"dialogue_turn\nmulti-turn, ≤200 tok"| Anthropic
  dialogue_js -.->|"premise_extraction (v1.1)\nsingle-shot, 5 tok"| Anthropic

  storage[("window.storage\nposition_profile\ndialogue_history_{id}\npremise_state (v1.1)")]
  dialogue_js --> storage
```
