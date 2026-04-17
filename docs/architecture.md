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
  subgraph pages [App Router Pages]
    root["/ — app/page.tsx\nQuiz elicitation flow"]
    results_page["/results — app/results/page.tsx\nRanked thinker cards"]
    dialogue_page["/dialogue/[thinkerId]\nSocratic dialogue"]
  end

  subgraph server [Server]
    api_route["/api/dialogue\napp/api/dialogue/route.ts\nreads ANTHROPIC_API_KEY"]

    subgraph engine [lib/engine/]
      elicitation_ts["elicitation.ts"]
      scorer_ts["scorer.ts"]
      router_ts["router.ts"]
      prompts_ts["prompts.ts"]
    end

    subgraph ontology [ontology/]
      dim["dimensions.json"]
      think["thinkers.json"]
      prem["premises.json"]
      mv["moves.json"]
    end
  end

  root --> elicitation_ts
  root --> scorer_ts
  root --> router_ts
  dialogue_page --> api_route
  api_route --> prompts_ts
  engine --> ontology

  Anthropic["Anthropic API\nclaude-sonnet-4-20250514"]
  api_route -->|"dialogue_turn\nmulti-turn, ≤200 tok"| Anthropic
  api_route -.->|"premise_extraction (v1.1)\nsingle-shot, 5 tok"| Anthropic

  storage[("sessionStorage (v1)\nposition_profile\ndialogue_history_{id}\n---\nserver session (v1.1)\npremise_state {P1..P8}")]
  dialogue_page --> storage
```
