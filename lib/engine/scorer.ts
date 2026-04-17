import type { PositionProfile, Classification, Thinker } from './types';

const DIMS = ['base', 'change', 'nature', 'institution', 'epistemic', 'method'] as const;

export function scoreThinker(thinker: Thinker, profile: PositionProfile): number {
  return DIMS.filter(d => profile[d] && thinker.profile[d] === profile[d]).length;
}

export function classifyThinker(thinker: Thinker, profile: PositionProfile): Classification {
  if (thinker.id === 'hume') return 'destab';
  const s = scoreThinker(thinker, profile);
  if (s >= 2) return 'neighbour';
  return 'opponent';
}
