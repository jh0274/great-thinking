import type { PositionProfile, RankedThinker, Classification } from './types';
import thinkersData from '@/ontology/thinkers.json';
import { scoreThinker, classifyThinker } from './scorer';

const ORDER: Record<Classification, number> = { neighbour: 0, destab: 1, opponent: 2 };

export function rankThinkers(profile: PositionProfile): RankedThinker[] {
  return [...thinkersData.thinkers]
    .map(thinker => ({
      thinker,
      classification: classifyThinker(thinker, profile),
      score: scoreThinker(thinker, profile),
    }))
    .sort((a, b) =>
      ORDER[a.classification] - ORDER[b.classification] || b.score - a.score
    );
}
