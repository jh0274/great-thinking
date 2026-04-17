import type { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    text: "A country is experiencing rising inequality. What is the most useful place to look for an explanation?",
    context: "Not what you think should be done — just where you'd start investigating.",
    opts: [
      { label: "The structure of the economy", sub: "Who owns what, how production is organised, the rules governing labour and capital.", dim: 'base', val: 'material' },
      { label: "Human nature and incentives", sub: "People are self-interested; inequality follows from how those interests play out without constraint.", dim: 'base', val: 'psychological' },
      { label: "Political and legal institutions", sub: "The rules and rights frameworks in place — who has access to courts, contracts, representation.", dim: 'base', val: 'institutional' },
      { label: "Culture and ideas", sub: "What a society believes about merit, desert, and fairness shapes outcomes as much as material structures.", dim: 'base', val: 'ideational' },
    ],
    reveal: {
      material: "<strong>Causal base: material/productive.</strong> You treat economic structure as the foundation from which political and cultural facts derive. This is Marx's move — and broadly the move of political economy from Smith through Keynes to Piketty.",
      psychological: "<strong>Causal base: psychological/natural.</strong> You treat human motivation as the invariant foundation. Hobbes, Hume, and the rational-choice tradition all share this starting point.",
      institutional: "<strong>Causal base: institutional/rational.</strong> You treat designed frameworks as causally primary. Rawls, Kant, and the liberal tradition locate the lever here.",
      ideational: "<strong>Causal base: ideational/cultural.</strong> You treat ideas and norms as relatively autonomous causes. Weber, Hegel, and Durkheim all share versions of this.",
    },
  },
  {
    text: "Imagine a deeply unjust society. What would actually change it?",
    context: "Think about the mechanism, not the desired outcome.",
    opts: [
      { label: "Organised collective conflict", sub: "The people most harmed have to build power and force change against resistance from those who benefit.", dim: 'change', val: 'rupture' },
      { label: "Better institutions, designed well", sub: "The right constitutional arrangements, legal frameworks, and incentive structures produce just outcomes.", dim: 'change', val: 'design' },
      { label: "Gradual shifts in norms and culture", sub: "Change happens slowly as habits, expectations, and shared understandings shift across generations.", dim: 'change', val: 'gradual' },
      { label: "You can't reliably engineer it", sub: "Attempts to design social change tend to make things worse. Order emerges; it isn't built.", dim: 'change', val: 'emergent' },
    ],
    reveal: {
      rupture: "<strong>Mechanism: rupture.</strong> Structural change requires organised conflict. Shared by Marx — and in a different form by Hegel's dialectic.",
      design: "<strong>Mechanism: institutional design.</strong> The lever is rational construction of frameworks. Rawls, Hobbes, and Kant all share this.",
      gradual: "<strong>Mechanism: gradual formation.</strong> Change accumulates through habit and convention. Aristotle, Hume, and Burke share this mechanism.",
      emergent: "<strong>Mechanism: spontaneous order.</strong> Deliberate design is the problem, not the solution. Hayek's position.",
    },
  },
  {
    text: "Is there a fixed human nature, or does it vary across history and societies?",
    context: "Not about genetics vs culture — about whether your explanatory framework has a fixed anchor point in human psychology.",
    opts: [
      { label: "Fixed — the same drives appear everywhere", sub: "Self-preservation, social recognition, fear, desire. History varies; human nature doesn't.", dim: 'nature', val: 'fixed' },
      { label: "Variable — humans are shaped by their conditions", sub: "What people want, fear, and value is produced by the social structures they inhabit.", dim: 'nature', val: 'variable' },
      { label: "Fixed capacities, variable content", sub: "Reason, sociability, and language are constant; their content is historically shaped.", dim: 'nature', val: 'capacity' },
    ],
    reveal: {
      fixed: "<strong>Fixed human nature.</strong> You share the premise of Hobbes, Hume, and the rational-choice tradition. Vulnerability: even the 'fixed' self is harder to pin down than it looks — Hume showed this.",
      variable: "<strong>Historically variable nature.</strong> Marx's position precisely. Human nature is what productive relations make of it. Vulnerability: without any fixed anchor, it becomes hard to criticise any social arrangement from outside it.",
      capacity: "<strong>Fixed capacities, variable content.</strong> Aristotle's and Kant's shared position. Reason and sociability are universal; their realisation is culturally specific.",
    },
  },
  {
    text: "What is the relationship between political institutions and economic power?",
    context: "Where does the causal arrow point between the state and the economy?",
    opts: [
      { label: "Institutions reflect economic power", sub: "The legal and political system tends to encode and protect the interests of whoever controls production and capital.", dim: 'institution', val: 'reflects' },
      { label: "Institutions are relatively independent", sub: "Good constitutional design can constrain economic power. The state is a genuine check, not just a mirror.", dim: 'institution', val: 'independent' },
      { label: "They are mutually constitutive", sub: "Economic and political power shape each other continuously — neither is simply 'base' or 'superstructure'.", dim: 'institution', val: 'mutual' },
      { label: "Both are downstream of culture", sub: "What a society believes about property, authority, and legitimacy is causally prior to both.", dim: 'institution', val: 'cultural' },
    ],
    reveal: {
      reflects: "<strong>Institutions reflect economic power.</strong> Marx's superstructure thesis. The state is an instrument of the ruling class — not independent.",
      independent: "<strong>Institutions are relatively independent.</strong> The liberal position from Kant through Rawls. Constitutional design can constrain economic power.",
      mutual: "<strong>Mutual constitution.</strong> Weber's position. Neither base nor superstructure is simply prior.",
      cultural: "<strong>Cultural primacy.</strong> Hegel's move. Ideas about legitimacy are causally prior to both economic and political arrangements.",
    },
  },
  {
    text: "How confident are you that a small group of people could design a significantly better society?",
    context: "Assume good intentions and high intelligence. Does that make social engineering feasible in principle?",
    opts: [
      { label: "Yes — correct analysis enables correct action", sub: "Understanding the causal structure of society is hard but possible.", dim: 'epistemic', val: 'confident' },
      { label: "Partly — principles yes, outcomes no", sub: "We can agree on just frameworks; we cannot engineer specific outcomes from within them.", dim: 'epistemic', val: 'moderate' },
      { label: "No — the required knowledge doesn't exist accessibly", sub: "Society is too complex; knowledge is dispersed, tacit, and uncodifiable.", dim: 'epistemic', val: 'sceptical' },
      { label: "The question is wrong — improvement isn't a design problem", sub: "Better societies emerge from practice and conflict, not blueprints.", dim: 'epistemic', val: 'reject' },
    ],
    reveal: {
      confident: "<strong>High epistemic confidence.</strong> You share the premise of Marx (historical materialism as science) and Hobbes (geometry of politics). Vulnerability: Hume's challenge applies — do you have access to causal necessity, or just observed regularities?",
      moderate: "<strong>Moderate confidence.</strong> Late Rawls's position — overlapping consensus, not metaphysics. Kant too: reason can establish principles but not engineer outcomes.",
      sceptical: "<strong>Epistemic scepticism.</strong> Hayek's position, grounded in Hume. The knowledge problem: centralised knowledge is always a fraction of the dispersed, tacit knowledge operating in a functioning society.",
      reject: "<strong>Reject the design frame.</strong> Marx again, differently: revolutionary practice, not social engineering. Also Aristotle: improvement comes from habituation, not blueprints.",
    },
  },
  {
    text: "When your deepest political commitments conflict with an argument you can't immediately refute — what do you do?",
    context: "This is about the relationship between intuition and theory in your own thinking.",
    opts: [
      { label: "Follow the argument — intuitions can be wrong", sub: "If a valid argument leads somewhere uncomfortable, the right response is to update the intuition.", dim: 'method', val: 'rationalist' },
      { label: "Trust the intuition — there's a flaw in the argument", sub: "Strong moral intuitions are evidence. A conclusion that violates them probably has a hidden premise.", dim: 'method', val: 'intuitionist' },
      { label: "Interrogate the hidden assumption", sub: "The conflict is diagnostic — it reveals what premise is doing unexamined work.", dim: 'method', val: 'critical' },
      { label: "Sit with the tension — both may be tracking something real", sub: "Genuine contradictions in our thinking often reflect genuine contradictions in social reality.", dim: 'method', val: 'dialectical' },
    ],
    reveal: {
      rationalist: "<strong>Methodological rationalism.</strong> Kant's and Rawls's approach — reason is the court of appeal. Risk: reason can be captured by ideology just as intuitions can.",
      intuitionist: "<strong>Methodological intuitionism.</strong> Rawls's reflective equilibrium, and Burke's conservatism. Intuitions are data, not noise. Risk: intuitions are often class-specific — Hume's point about custom masquerading as reason.",
      critical: "<strong>Critical method.</strong> The move of ideology critique — Marx, Frankfurt School, and also Kant's critical philosophy.",
      dialectical: "<strong>Dialectical method.</strong> Hegel's and Marx's shared approach. Contradictions in thought track contradictions in reality.",
    },
  },
];
