export type DimensionId = 'base' | 'change' | 'nature' | 'institution' | 'epistemic' | 'method';

export type PositionProfile = Record<DimensionId, string>;

export type Classification = 'neighbour' | 'destab' | 'opponent';

export interface QuestionOption {
  label: string;
  sub: string;
  dim: DimensionId;
  val: string;
}

export interface Question {
  text: string;
  context: string;
  opts: QuestionOption[];
  reveal: Record<string, string>;
}

export interface ThinkerProfile {
  base: string;
  change: string;
  nature: string;
  institution: string;
  epistemic: string;
  method: string;
}

export interface ThinkerAvatar {
  bg: string;
  fg: string;
  init: string;
}

export interface Thinker {
  id: string;
  name: string;
  dates: string;
  avatar: ThinkerAvatar;
  profile: ThinkerProfile;
  characteristicMove: string;
  premiseTargets: string[];
  desc: string;
  shared: string;
  challenges: string;
  moveLegend: string;
}

export interface RankedThinker {
  thinker: Thinker;
  classification: Classification;
  score: number;
}
