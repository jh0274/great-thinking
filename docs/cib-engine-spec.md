# CIB Engine Spec
## Cross-Impact Balance Analysis for the Philosophical Interlocutor

---

## What it is

The CIB engine is the ontological reasoning layer that sits beneath all three
product surfaces — personal dialogue, portrait generation, and political position
analysis. It replaces the v1 dimension-mismatch scorer with a weighted,
evidence-grounded model of philosophical relationships that can do four things
the mismatch scorer cannot:

1. Score the internal coherence of any position profile — not just compare
   two profiles against each other
2. Identify which dimension-value combinations are historically attested vs
   philosophically coherent but empirically unoccupied
3. Weight tension scores by scholarly confidence — a high-tension cross-impact
   with contested evidence drives routing less than a moderate-tension cross-impact
   with strong consensus
4. Generate explainable routing decisions — the system can say why it routed
   to a specific thinker, citing the documented succession that makes that
   thinker's attack historically grounded

The CIB engine does not replace the thinker system prompts, the structural
portrait template, or the dialogue turn logic. Those remain the quality ceiling
for each product surface. The CIB engine determines what gets routed where and
on what grounds — it improves targeting precision and epistemic credibility,
not generation quality directly.

---

## How it works

### The cross-impact matrix

The matrix encodes the influence of every dimension-value state on every other
dimension-value state across the 6 ontological dimensions. Each entry is:

```json
{
  "from": "epistemic.confident",
  "to": "method.rationalist",
  "score": 2,
  "direction": "supports",
  "mechanism": "High epistemic confidence about social structure tends to co-occur with rationalist method — confidence that correct analysis is possible implies reason is the instrument capable of producing it",
  "historical_evidence": [
    {
      "transition": "Hobbes — geometric method from fixed human nature",
      "description": "Hobbes derives political conclusions geometrically from axioms about human motivation, treating confidence in the method as equivalent to confidence in the conclusions",
      "citations": [
        "Skinner, Q. (1996) Reason and Rhetoric in the Philosophy of Hobbes, ch.6",
        "Tuck, R. (1989) Hobbes, ch.3"
      ]
    },
    {
      "transition": "Marx — historical materialism as science",
      "description": "Marx's confidence in historical materialism as a science of society is inseparable from his rationalist method of deriving historical laws from analysis of productive relations",
      "citations": [
        "Cohen, G.A. (1978) Karl Marx's Theory of History, ch.1",
        "Elster, J. (1985) Making Sense of Marx, ch.1"
      ]
    }
  ],
  "counter_evidence": [
    {
      "description": "Hegel combines very high epistemic confidence with a dialectical rather than rationalist method — suggesting the correlation is strong but not necessary",
      "citation": "Pippin, R. (1989) Hegel's Idealism, introduction"
    }
  ],
  "confidence": 0.80
}
```

**Score scale:** −2 (strongly contradicts) to +2 (strongly supports). Zero-impact
pairs are omitted. The matrix is asymmetric — the influence of A on B need not
equal the influence of B on A.

**Confidence scale:** 0.0–1.0. Reflects how well the cross-impact claim is
supported by scholarly consensus on the relevant succession.

- 0.9–1.0: Direct documented succession, thinker's own testimony, and
  substantial secondary literature agreement
- 0.7–0.89: Strong secondary literature support, no significant dissent
- 0.5–0.69: Defensible but contested in the literature
- 0.3–0.49: Speculative, minority view, or extrapolated from thin evidence
- Below 0.3: Not included — insufficient grounds

### Coherence scoring

The coherence score of a profile measures its internal consistency — the sum
of all pairwise cross-impacts between the dimension-value states it contains,
weighted by confidence:

```
coherence(profile) = Σ score(dimA.valA, dimB.valB) × confidence(dimA.valA, dimB.valB)
                     for all pairs (dimA, dimB) in profile where dimA ≠ dimB
```

A high positive score indicates a mutually reinforcing profile — the kind occupied
by canonical thinkers whose positions cohere tightly (Hobbes, Hume, Marx each
score highly on their own profiles). A negative score indicates internal tension —
the kind found in political coalitions assembled for electoral rather than
philosophical reasons.

### Tension scoring between profiles

The tension score between two profiles measures how much philosophical pressure
one can apply to the other — the sum of cross-impacts between differing
dimension-value pairs, weighted by confidence:

```
tension(profileA, profileB) = Σ |score(dimA.valA, dimA.valB)| × confidence(...)
                               for all dimensions dim where profileA[dim] ≠ profileB[dim]
```

This replaces the v1 mismatch count. A dimension difference that has a
high-confidence cross-impact score drives tension more than a dimension difference
with a low-confidence score, even if the raw scores are equal.

### Gap finding

A gap is a position profile that:
1. Has a positive coherence score (is internally consistent)
2. Is not occupied by any placed thinker or figure in the library
3. Has at least one dimension-value state that is not isolated
   (has at least one non-zero cross-impact with another state in the profile)

Gaps are ranked by coherence score — the highest-scoring unoccupied profiles
are the most philosophically natural positions that no one has yet been placed at.
These are the candidates for thinker discovery: figures from intellectual history
who should be in the library but aren't yet.

---

## What it adds to the business logic of v1

### v1 business logic (mismatch scorer)

```
user answers 6 questions
  → position profile {dim: value, ...}
  → for each thinker: count dimensions where profile differs
  → rank thinkers by mismatch count
  → classify: Hume always destabiliser; ≥3 mismatches = opponent; else neighbour
  → display thinker cards
  → user selects thinker
  → dialogue
```

Problems with this logic:

- Two profiles with the same mismatch count are treated identically even if
  one has mismatches on high-tension dimensions and the other on low-tension ones
- The system cannot distinguish between a coherent profile and an incoherent one
  — a user who answers `institution=reflects` + `change=design` gets the same
  routing as one whose profile is internally consistent
- Routing decisions are unexplainable — the system cannot say why it chose
  a particular thinker beyond "most mismatches"
- All mismatches are equal — a mismatch on `base` (the most fundamental dimension)
  counts the same as a mismatch on `method` (the most peripheral)

### CIB business logic (replacement)

```
user answers 6 questions
  → position profile
  → coherence score: flag internal tensions if score < threshold
  → if tensions detected: surface on results screen with description
  → for each thinker: compute weighted tension score using cross-impact matrix
  → rank thinkers by weighted tension score
  → for top 3 thinkers: identify primary attack dimension and premise target
  → classify: by tension score thresholds calibrated to known thinker pairs
  → display thinker cards with attack vector description
  → user selects thinker
  → dialogue opens on highest-confidence premise target
```

The same logic applies to figure profiles in the portrait pipeline and political
position profiles in the analysis pipeline — coherence scoring, weighted tension
ranking, explainable routing. The CIB engine is the shared substrate for all three.

### Specific business logic additions by product surface

**Personal dialogue:**
- Internal inconsistency detection surfaces before thinker selection, not after —
  the user sees their tensions before engaging with any thinker
- Opening question targeting improves — the thinker opens on the highest-confidence
  premise target, not just the most mismatched dimension
- Routing decisions are explainable to the user: "Hume is your primary challenger
  because your epistemic confidence is the position his characteristic move has
  most historically targeted — this tension has been philosophically productive
  since Hume's Treatise forced Kant into eleven years of reconsideration"

**Portrait articles:**
- Portrait generation prompt includes the cited succession evidence, allowing
  the thinker to reference the historical force of their attack
- Figure incoherences are cross-validated against the matrix — hand-curated
  incoherences that contradict the matrix are flagged for review
- Portrait quality improves on the specificity and accuracy dimensions of the
  evaluation rubric (see Sprint 2 spec measurement framework)

**Political position analysis (Sprint 3):**
- Coherence scoring identifies which dimension combinations in a political
  platform are most internally contradictory — this is the primary analytical
  output for political position work
- Gap finding identifies which coherent positions a platform does not occupy —
  productive for showing what a more philosophically consistent version of the
  platform would look like

---

## The research agent process for matrix population and tuning

### Why this requires a research agent

Populating the cross-impact matrix with cited scholarly evidence is a structured
retrieval and synthesis task — not a creative or judgment task at the level of
the system prompts or figure profiles. Each matrix entry requires:

1. Identifying the relevant secondary literature on the succession between
   two thinkers or positions
2. Finding specific page references that support or contest the cross-impact claim
3. Assessing scholarly consensus to assign a confidence score
4. Identifying counter-evidence that should lower confidence

This is precisely the kind of task a research agent with web search and document
retrieval can perform systematically and at scale — far faster than manual research
and with consistent citation formatting.

### Research agent workflow per matrix entry

For each non-zero cross-impact pair:

```
1. FORMULATE the historical claim
   "Thinkers who held [from_state] historically tended to move toward/away
   from [to_state]. What is the scholarly evidence for or against this?"

2. RETRIEVE relevant secondary literature
   Search: "[thinker A] influence on [thinker B]"
   Search: "[dimension concept] in history of philosophy"
   Search: "[from_state] [to_state] philosophical succession"
   Prioritise: Cambridge History of Philosophy volumes, Stanford Encyclopedia
   of Philosophy, major monographs on relevant thinkers

3. ASSESS consensus
   Does the literature agree on the direction and strength of the succession?
   Are there significant dissenting views?
   Is the succession directly documented (thinker B cites thinker A) or
   inferred from intellectual history?

4. ASSIGN confidence score
   Direct documented succession + scholarly consensus → 0.85–0.95
   Strong secondary literature, minor dissent → 0.70–0.84
   Contested in literature → 0.50–0.69
   Speculative or thin evidence → 0.30–0.49
   Below 0.30 → exclude entry

5. FORMAT entry with citations
   All citations in: Author (Year) Title, page range format
   Minimum 2 citations per entry above 0.7 confidence
   At least 1 counter-evidence citation per entry where dissent exists
```

### Priority order for matrix population

The research agent should populate entries in order of routing impact — the
cross-impacts most likely to drive routing decisions in the three product surfaces:

**Tier 1 — Core successions (populate first):**
These are the historically best-documented transitions and the ones most
frequently triggered by user and figure profiles:

- `epistemic.confident → method.rationalist` (Hobbes, Marx)
- `epistemic.sceptical → change.emergent` (Hume, Hayek)
- `base.material → change.rupture` (Marx)
- `nature.fixed → change.design` (Hobbes, Rawls)
- `institution.reflects → change.rupture` (Marx)
- `institution.independent → change.design` (Kant, Rawls)
- `method.dialectical → change.rupture` (Hegel, Marx)

**Tier 2 — Key tension pairs (populate second):**
These drive the most productive dialogue routings and portrait pairings:

- `base.material × institution.reflects` (Marx internal coherence)
- `nature.fixed × change.design` (Hobbes internal coherence)
- `epistemic.confident × method.intuitionist` (Reform/Farage incoherence)
- `institution.reflects × change.design` (Musk incoherence)
- `base.ideational × epistemic.confident` (Hegel exception)

**Tier 3 — Coverage completion (populate third):**
Remaining non-zero pairs to complete the matrix. Lower priority because
they affect gap-finding and political analysis more than routing.

### Validation process

After each batch of matrix entries is populated by the research agent:

1. Run coherence scoring on all 7 placed thinkers — each should score positively
   on their own profile (canonical thinkers are internally consistent)
2. Run tension scoring on all known historical pairs (Hume→Kant,
   Hegel→Marx, Kant→Rawls) — documented successors should score high tension
   with high confidence
3. Check that the top-ranked challenger for each thinker's profile is their
   documented historical interlocutor (Hume's top challenger should be Kant
   or vice versa; Marx's top challenger should be Hegel or vice versa)
4. Flag any entry where the automated result contradicts the expected outcome
   — these are candidates for confidence score revision or counter-evidence addition

---

## First test — visual succession paths with scholarly citations

### What this test demonstrates

The first public-facing test of the CIB engine is a visualisation of the
historical succession paths between thinkers, rendered as a directed graph
where every edge is a documented cross-impact with cited scholarly evidence.

This test serves three purposes simultaneously:

**Technical validation:** Does the matrix, once populated with scholarly citations,
produce coherence and tension scores that correctly recover known intellectual
relationships? If Hume scores as Kant's highest-tension challenger and Hegel
scores as Marx's highest-tension challenger, the matrix is working. If it doesn't,
the scoring function or the matrix entries need revision.

**Scholarly review instrument:** The visual is the interface through which
domain experts can critique the methodology. A Kant scholar can look at the
Hume→Kant edge, read the cited evidence, assess whether the confidence score
is correct, and propose revisions. This review process is what turns the matrix
from a defensible first draft into a scholarly consensus document.

**Product demonstration:** The visual is the clearest demonstration of what
the CIB engine adds over a simple mismatch scorer — it shows the intellectual
history as a structured causal system rather than a set of pairwise comparisons,
and it shows that the system's routing decisions are grounded in the same
scholarly sources a philosopher would cite.

### Visual specification

A directed graph where:

**Nodes** are thinkers (not dimension-value states — those are the underlying
mechanism but the visual shows thinkers for legibility). Each node shows:
- Thinker name and dates
- Their profile summary (6 dimension values in small text)
- Their coherence score (how internally consistent their profile is)
- Colour coded by causal base dimension value

**Edges** are documented cross-impact successions between thinkers. Each edge shows:
- Direction of succession
- Move type (inversion, absorption, destabilisation, etc.) colour-coded
- Confidence score shown as edge opacity — high confidence = fully opaque,
  low confidence = semi-transparent
- Citation count shown as a small number on the edge
- Click to expand: full mechanism description, all citations, counter-evidence

**Layout:** Roughly chronological left-to-right so the visual reads as intellectual
history. Thinkers who are primarily sources (Hume, Hobbes, Aristotle) on the left;
thinkers who are primarily respondents (Rawls, Hayek) on the right; thinkers who
are both (Kant, Marx) in the middle.

**Filters:**
- By move type: show only inversions, only absorptions, etc.
- By confidence: show only edges above a confidence threshold
- By thinker: highlight all edges connected to a selected thinker
- By dimension: show only edges driven by a specific dimension tension

**Scholar review mode:**
A mode accessible to reviewers that shows each edge's full evidence record
and allows proposing revisions via a structured form:
- Proposed confidence score change
- Additional citations
- Counter-evidence
- Reason for revision

Proposed revisions are queued for research agent verification before
being committed to the matrix.

### Specific succession paths to validate in the first test

These are the highest-confidence successions that should be clearly visible
and correctly rendered in the first version of the visual:

**Hume → Kant (destabilisation → transcendental response)**
Confidence target: 0.95
Key citations: Kant, Prolegomena (1783), preface; Kemp Smith (1918)
Commentary on Kant's Critique, pp.84-92; Longuenesse (1998) Kant and
the Capacity to Judge, ch.1
Visual: strong opaque edge, destabilisation move type, Kant's node
positioned as direct response

**Hegel → Marx (inversion)**
Confidence target: 0.95
Key citations: Marx, Capital Vol.1 (1873 afterword); McLellan (1969)
The Young Hegelians and Karl Marx, ch.3; Avineri (1968) The Social and
Political Thought of Karl Marx, ch.1; Kolakowski (1978) Main Currents
of Marxism Vol.1, ch.7
Visual: strong opaque edge, inversion move type

**Kant → Rawls (absorption)**
Confidence target: 0.90
Key citations: Rawls (1980) Kantian Constructivism in Moral Theory,
Journal of Philosophy 77(9); O'Neill (1989) Constructions of Reason,
ch.10; Pogge (1989) Realizing Rawls, ch.1
Visual: strong opaque edge, absorption move type

**Hume → Hayek (absorption)**
Confidence target: 0.90
Key citations: Hayek (1973) Law, Legislation and Liberty Vol.1, pp.20-24;
Hayek (1960) The Constitution of Liberty, ch.4; Gray (1984) Hayek on
Liberty, ch.2
Visual: strong opaque edge, absorption move type

**Hobbes → Rawls via Locke (extension)**
Confidence target: 0.85
Key citations: Rawls (1971) A Theory of Justice, §§1-4; Dunn (1969)
The Political Thought of John Locke, introduction; Laslett introduction
to Locke Two Treatises (1960 Cambridge edition)
Visual: two-step edge (Hobbes→Locke→Rawls) or direct with Locke as
intermediate node, extension move type

**Aristotle → MacIntyre (revival)**
Confidence target: 0.80
Key citations: MacIntyre (1981) After Virtue, ch.12-13; Finnis (1980)
Natural Law and Natural Rights, ch.1
Visual: long-range edge spanning centuries, revival/extension move type,
semi-opaque to indicate temporal gap

### Definition of done for the first test

- [ ] Research agent has populated Tier 1 and Tier 2 matrix entries with citations
- [ ] All 7 thinker profiles score positively on their own coherence score
- [ ] The 5 documented successors listed above rank as top-2 tension scorers
  for their predecessors
- [ ] Visual renders correctly with all 7 thinkers as nodes
- [ ] All 5 primary succession edges visible with correct move types and opacity
- [ ] Click-to-expand shows citations for at least the 5 primary edges
- [ ] Scholar review mode accessible and functional
- [ ] At least one external reviewer (philosophy-literate) has reviewed the
  Hume→Kant and Hegel→Marx edges and confirmed or revised confidence scores

The CIB engine should be implemented as a standalone module (`/engine/cib.js`)
with no dependencies on the UI layer, so it can be tested independently of
any product surface and shared across all three.
