import type { Question } from './types';

export const QUESTIONS: Question[] = [
  {
    text: "Artificial intelligence is rapidly automating work across industries — from logistics and legal research to medical diagnosis and software development. What is the most useful place to look for an explanation of why some people benefit enormously and others lose their livelihoods?",
    context: "Not what you think should be done — and not 'all of the above'. If you had to bet your analysis on one lever, which would give you the most explanatory power?",
    opts: [
      {
        label: "The structure of capital ownership",
        sub: "Follow who owns the models, the data, the compute — and you have your explanation. Psychology, policy, and culture are downstream of that ownership structure.",
        dim: 'base', val: 'material',
      },
      {
        label: "Human nature and the drive to maximise",
        sub: "The incentive to automate is as old as self-interest. Ownership structures, regulations, and cultural narratives emerge from this — not the other way around.",
        dim: 'base', val: 'psychological',
      },
      {
        label: "The legal and regulatory frameworks in place",
        sub: "Change patent law, labour protections, and tax policy — and the same technology produces radically different distributions. Ownership and psychology operate within whatever rules are set.",
        dim: 'base', val: 'institutional',
      },
      {
        label: "The ideas that make automation seem inevitable",
        sub: "The consensus that efficiency always justifies disruption is causally prior to ownership, incentives, and rules. Without that legitimating idea, none of the rest follows in the way it does.",
        dim: 'base', val: 'ideational',
      },
    ],
    reveal: {
      material: "<strong>Causal base: material/productive.</strong> You treat ownership of the means of production as foundational — a position Marx identified with the analysis of capital itself. In 2025, the question is who owns the large language models, the compute, the training data. The analysis he began with textile mills applies to data centres.",
      psychological: "<strong>Causal base: psychological/natural.</strong> You treat human motivation as the invariant foundation. This is Hobbes's and Hume's move — and the move of every rational-choice framework. The algorithm didn't create the incentive to automate; it just accelerated it.",
      institutional: "<strong>Causal base: institutional/rational.</strong> You treat designed frameworks as causally primary. Rawls, Kant, and the liberal tradition locate the lever here. Patents, labour law, and corporate governance rules are the real architecture — change them and the gains flow differently.",
      ideational: "<strong>Causal base: ideational/cultural.</strong> You treat ideas and norms as relatively autonomous causes. Weber, Hegel, and Durkheim all share versions of this. The cultural consensus that 'technology is neutral' and 'disruption is progress' is doing causal work before any algorithm runs.",
    },
  },
  {
    text: "For thirty years, international negotiations, market mechanisms, and awareness campaigns have failed to reduce global carbon emissions fast enough to prevent dangerous warming. What would actually produce the transformation needed?",
    context: "Think about the primary mechanism — not what would help at the margins, but what would actually drive the transformation. Pick the lever you'd put your weight behind.",
    opts: [
      {
        label: "Organised political confrontation that makes the status quo untenable",
        sub: "Without movements that impose real political costs — litigation, disruption, sustained pressure — incumbent interests will absorb and neutralise everything else.",
        dim: 'change', val: 'rupture',
      },
      {
        label: "Better international institutions and policy architecture",
        sub: "Get the framework right — carbon pricing, enforceable agreements, regulatory standards — and the incentives do the work. Without the architecture, everything else is voluntarism.",
        dim: 'change', val: 'design',
      },
      {
        label: "Shifting norms, investment patterns, and cultural expectations",
        sub: "The real driver is cultural: when the next generation treats fossil fuels the way previous ones came to treat leaded petrol, the politics and economics follow. You can't legislate that shift — it accumulates.",
        dim: 'change', val: 'gradual',
      },
      {
        label: "Decentralised innovation responding to price signals",
        sub: "The falling cost of renewables — achieved without central planning — is the most powerful climate force of the last decade. Let the signals work rather than replacing them with design.",
        dim: 'change', val: 'emergent',
      },
    ],
    reveal: {
      rupture: "<strong>Mechanism: rupture.</strong> Structural change requires organised conflict. Marx's position — and in a different form, Hegel's dialectic. The fact that thirty years of incremental approaches have failed is, on this view, not surprising: the interests that benefit from fossil fuels are structurally embedded, not merely persuadable.",
      design: "<strong>Mechanism: institutional design.</strong> The lever is rational construction of frameworks. Rawls, Hobbes, and Kant all share this. The Paris Agreement represents this bet; whether it can be made to work is the central question for this tradition.",
      gradual: "<strong>Mechanism: gradual formation.</strong> Change accumulates through habit, convention, and shifting norms. Aristotle, Hume, and Burke share this mechanism. The question is whether the pace of gradual change is compatible with a physical deadline.",
      emergent: "<strong>Mechanism: spontaneous order.</strong> Deliberate design is the problem, not the solution. Hayek's position. The falling cost of renewables is the strongest contemporary evidence for this view — and the strongest challenge to it.",
    },
  },
  {
    text: "Social media platforms designed to connect people have also demonstrably amplified polarisation, outrage, and coordinated disinformation on a global scale. What does this tell us about human nature?",
    context: "Not whether the platforms are good or bad — but what their effects reveal about what people fundamentally are.",
    opts: [
      {
        label: "It reveals fixed drives that technology merely surfaces",
        sub: "Tribalism, status-seeking, and outrage are features of human psychology that the algorithm didn't create — it found and exploited them at scale.",
        dim: 'nature', val: 'fixed',
      },
      {
        label: "It reveals how malleable humans are to their engineered environment",
        sub: "People aren't naturally like this. The behaviour is produced by specific incentive structures. Change the design and you change the person.",
        dim: 'nature', val: 'variable',
      },
      {
        label: "Fixed capacities for reason and sociability, distorted by the medium",
        sub: "Humans have stable capacities for deliberation and connection, but platforms have systematically undermined the conditions under which those capacities function well.",
        dim: 'nature', val: 'capacity',
      },
    ],
    reveal: {
      fixed: "<strong>Fixed human nature.</strong> You share the premise of Hobbes, Hume, and the rational-choice tradition. Social media is a mirror held up to what we always were. Vulnerability: if the drives are fixed, the only lever is institutional constraint — which requires accepting something uncomfortably close to Hobbes's conclusions about sovereign power.",
      variable: "<strong>Historically variable nature.</strong> Marx's position precisely. What people want, fear, and value is produced by the structures they inhabit. Change the incentive architecture and you change the psychology. Vulnerability: if behaviour is entirely produced by design, the designers have an alarming degree of power — and accountability for it.",
      capacity: "<strong>Fixed capacities, variable content.</strong> Aristotle's and Kant's shared position. Reason and sociability are universal; platforms have distorted their expression without eliminating the underlying capacity. This is the implicit premise of most contemporary platform regulation arguments.",
    },
  },
  {
    text: "The largest technology companies — Google, Meta, Amazon, Microsoft — now control infrastructure, information flows, and economic activity at a scale comparable to nation states. What is the relationship between that power and the democratic institutions meant to govern it?",
    context: "Where does the primary causal weight sit? Not which factor plays a role — they all do — but which one would you pull first if you wanted to change the outcome?",
    opts: [
      {
        label: "Regulations tend to encode and protect platform interests",
        sub: "Antitrust law, data policy, tax treatment — these reflect what large capital needs. That's not a failure of regulation; it's what regulation does when economic power is sufficiently concentrated. Change the ownership structure and the rules follow.",
        dim: 'institution', val: 'reflects',
      },
      {
        label: "Well-designed institutions can and do constrain platform power",
        sub: "The EU has demonstrably forced behavioural change on American platforms through GDPR and the Digital Markets Act. Constitutional design can check economic power — the ownership structure doesn't determine the outcome.",
        dim: 'institution', val: 'independent',
      },
      {
        label: "Platform power and state power are mutually constitutive",
        sub: "Platforms and states reshape each other continuously — neither is simply upstream. You can't read off the political outcome from the economic structure, or vice versa. The dynamic between them is the explanation.",
        dim: 'institution', val: 'mutual',
      },
      {
        label: "Both are downstream of what we believe about data, privacy, and progress",
        sub: "The consensus that data extraction is a fair exchange for free services — that efficiency justifies surveillance — is causally prior to the platforms and the laws alike. Change that belief at scale and everything else shifts.",
        dim: 'institution', val: 'cultural',
      },
    ],
    reveal: {
      reflects: "<strong>Institutions reflect economic power.</strong> Marx's superstructure thesis. The state is an instrument of whoever controls the dominant means of production — in 2025, that means compute, data, and distribution infrastructure. Regulatory capture isn't a failure of the system; it is the system.",
      independent: "<strong>Institutions are relatively independent.</strong> The liberal position from Kant through Rawls. The EU's regulatory posture toward American platforms is the strongest contemporary evidence for this view — constitutional design can, if imperfectly, constrain economic power.",
      mutual: "<strong>Mutual constitution.</strong> Weber's position. Neither is simply prior. The Chinese state's relationship with its tech sector and the American state's relationship with Silicon Valley illustrate the same dynamic in different registers.",
      cultural: "<strong>Cultural primacy.</strong> Hegel's move. Ideas about legitimacy — that data extraction is a fair exchange for free services, that growth justifies disruption — are causally prior to both the platforms and the laws. Change the ideas and the rest follows.",
    },
  },
  {
    text: "During COVID-19, governments with expert scientific advice, significant state capacity, and genuine political will still produced wildly divergent outcomes — and most made consequential errors. Could a well-resourced group of experts, in principle, design significantly better pandemic policy?",
    context: "Assume genuine expertise and good faith. The question is whether the knowledge required for good policy is accessible in principle.",
    opts: [
      {
        label: "Yes — better analysis and coordination would have produced better outcomes",
        sub: "The failures were failures of execution, political interference, and institutional dysfunction — not of the knowability of the problem.",
        dim: 'epistemic', val: 'confident',
      },
      {
        label: "Better principles yes, but not predictable outcomes",
        sub: "We can establish what a just emergency framework looks like. We cannot predict how a novel pathogen behaves inside specific social and economic systems.",
        dim: 'epistemic', val: 'moderate',
      },
      {
        label: "No — the required knowledge was dispersed, tacit, and unavailable to any centre",
        sub: "Epidemiology, supply chains, behavioural responses, economic ripple effects — no group could hold all of this or act on it fast enough.",
        dim: 'epistemic', val: 'sceptical',
      },
      {
        label: "The design frame is wrong — better outcomes came from adaptation, not blueprints",
        sub: "The most effective responses emerged from distributed learning — clinicians, communities, firms — not from central planning. The question assumes the wrong model.",
        dim: 'epistemic', val: 'reject',
      },
    ],
    reveal: {
      confident: "<strong>High epistemic confidence.</strong> You share the premise of Marx (historical materialism as science) and Hobbes (politics as geometry). The COVID failures, on this view, were contingent — better-insulated expertise would have done better. Vulnerability: Hume's challenge applies with full force to epidemiological modelling. Constant conjunction is not causation.",
      moderate: "<strong>Moderate confidence.</strong> Late Rawls's position — reason can establish principles but not engineer specific outcomes. Kant too: the conditions of possibility for just emergency governance can be specified; the outcomes cannot be controlled.",
      sceptical: "<strong>Epistemic scepticism.</strong> Hayek's position applied directly. The knowledge required for pandemic policy — local, practical, real-time, behavioural — is precisely the kind that cannot be centralised. Sweden and Taiwan reached different conclusions from different local knowledge, and both were partly right.",
      reject: "<strong>Reject the design frame.</strong> Marx differently: improvement comes from practice, not blueprints. Also Aristotle: phronesis is the practical wisdom of people embedded in situations, not theoretical knowledge applied from outside. The best responses were adaptive, not designed.",
    },
  },
  {
    text: "You hold a strong commitment to free expression. A careful argument is put to you that unrestricted speech on large platforms causes measurable, documented harm to identifiable groups — and you find you cannot immediately refute it. What do you do?",
    context: "This is about how you handle the tension between a held commitment and a difficult argument in your own thinking.",
    opts: [
      {
        label: "Follow the argument — intuitions can be wrong",
        sub: "If a valid argument leads somewhere uncomfortable, the right response is to update the intuition. Discomfort is not evidence against the conclusion.",
        dim: 'method', val: 'rationalist',
      },
      {
        label: "Trust the intuition — there's a flaw in the argument",
        sub: "Strong commitments are evidence. A conclusion that violates a deeply held principle probably has a hidden premise worth finding.",
        dim: 'method', val: 'intuitionist',
      },
      {
        label: "Interrogate the hidden assumption",
        sub: "The conflict is diagnostic — it reveals what premise is doing unexamined work. Whose definition of harm? Whose conception of speech?",
        dim: 'method', val: 'critical',
      },
      {
        label: "Sit with the tension — both may be tracking something real",
        sub: "Free expression and protection from harm are genuine goods in genuine tension. The contradiction in thought may reflect a contradiction in the social reality itself.",
        dim: 'method', val: 'dialectical',
      },
    ],
    reveal: {
      rationalist: "<strong>Methodological rationalism.</strong> Kant's and Rawls's approach — reason is the court of appeal. Risk: reason operating under ideological pressure can rationalise any conclusion — which is Hume's point about custom masquerading as reason, and the Frankfurt School's point about instrumental rationality.",
      intuitionist: "<strong>Methodological intuitionism.</strong> Rawls's reflective equilibrium, and Burke's conservatism. Strong intuitions are data, not noise. Risk: intuitions about free speech are not class-neutral — whose intuitions count, and whose are treated as irrational?",
      critical: "<strong>Critical method.</strong> The move of ideology critique — Marx, Frankfurt School, and Kant's critical philosophy. The conflict is diagnostic. In this case: whose definition of harm is being used? What power relations does that definition leave undisturbed?",
      dialectical: "<strong>Dialectical method.</strong> Hegel's and Marx's shared approach. Genuine contradictions in thought track genuine contradictions in social reality. Free expression and protection from harm are both real social goods in real tension — and the tension is not a failure of reasoning but a feature of the situation.",
    },
  },
];
