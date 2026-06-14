import { Route } from '../data/mockData';

export type Preference = 'Fastest' | 'Cheapest' | 'Eco-Friendly' | 'Women Safe' | 'Accessible' | 'Least Transfers';

// Weight sets for each preference mode
const WEIGHT_PRESETS: Record<Preference, WeightSet> = {
  'Fastest':         { time: 0.50, cost: 0.20, safety: 0.15, eco: 0.10, transfers: 0.05 },
  'Cheapest':        { time: 0.15, cost: 0.55, safety: 0.15, eco: 0.10, transfers: 0.05 },
  'Eco-Friendly':    { time: 0.15, cost: 0.15, safety: 0.15, eco: 0.50, transfers: 0.05 },
  'Women Safe':      { time: 0.10, cost: 0.10, safety: 0.65, eco: 0.05, transfers: 0.10 },
  'Accessible':      { time: 0.10, cost: 0.15, safety: 0.30, eco: 0.10, transfers: 0.35 },
  'Least Transfers': { time: 0.20, cost: 0.15, safety: 0.20, eco: 0.10, transfers: 0.35 },
};

interface WeightSet {
  time: number;
  cost: number;
  safety: number;
  eco: number;
  transfers: number;
}

// Merge weights when multiple preferences selected
function mergeWeights(preferences: Preference[]): WeightSet {
  if (preferences.length === 0) return WEIGHT_PRESETS['Fastest'];

  const merged: WeightSet = { time: 0, cost: 0, safety: 0, eco: 0, transfers: 0 };
  preferences.forEach(pref => {
    const w = WEIGHT_PRESETS[pref];
    (Object.keys(w) as (keyof WeightSet)[]).forEach(k => {
      merged[k] += w[k] / preferences.length;
    });
  });
  return merged;
}

// Normalize a value to 0–100 scale given array min/max
function normalize(value: number, min: number, max: number, invert = false): number {
  if (max === min) return 100;
  const norm = ((value - min) / (max - min)) * 100;
  return invert ? 100 - norm : norm;
}

export interface ScoredRoute extends Route {
  compositeScore: number;
  breakdown: {
    timeScore: number;
    costScore: number;
    safetyScore: number;
    ecoScore: number;
    transferScore: number;
  };
  aiExplanation: string;
}

export function scoreAndRankRoutes(routes: Route[], preferences: Preference[]): ScoredRoute[] {
  return assignTags(scoreRoutes(routes, preferences));
}

export function scoreRoutes(routes: Route[], preferences: Preference[]): ScoredRoute[] {
  const weights = mergeWeights(preferences);

  // Extract mins/maxes for normalization
  const durations = routes.map(r => parseInt(r.duration));   // "48 min" → 48
  const prices    = routes.map(r => r.price);
  const safeties  = routes.map(r => r.safety);
  const co2s      = routes.map(r => r.co2Saved);
  const transfers = routes.map(r => typeof r.transfers === 'number' ? r.transfers : parseInt(String(r.transfers)));

  const minD = Math.min(...durations), maxD = Math.max(...durations);
  const minP = Math.min(...prices),    maxP = Math.max(...prices);
  const minS = Math.min(...safeties),  maxS = Math.max(...safeties);
  const minE = Math.min(...co2s),      maxE = Math.max(...co2s);
  const minT = Math.min(...transfers), maxT = Math.max(...transfers);

  const scored: ScoredRoute[] = routes.map(route => {
    const dur = parseInt(route.duration);
    const trn = typeof route.transfers === 'number' ? route.transfers : parseInt(String(route.transfers));

    const timeScore     = normalize(dur,          minD, maxD, true);   // lower duration = higher score
    const costScore     = normalize(route.price,  minP, maxP, true);   // lower price = higher score
    const safetyScore   = normalize(route.safety, minS, maxS, false);  // higher safety = higher score
    const ecoScore      = normalize(route.co2Saved, minE, maxE, false);// higher co2saved = higher score
    const transferScore = normalize(trn,          minT, maxT, true);   // fewer transfers = higher score

    const compositeScore = Math.round(
      weights.time      * timeScore +
      weights.cost      * costScore +
      weights.safety    * safetyScore +
      weights.eco       * ecoScore +
      weights.transfers * transferScore
    );

    const aiExplanation = generateExplanation(route, { timeScore, costScore, safetyScore, ecoScore, transferScore }, weights, preferences);

    return { ...route, compositeScore, breakdown: { timeScore, costScore, safetyScore, ecoScore, transferScore }, aiExplanation };
  });

  // Sort descending by composite score
  return scored.sort((a, b) => b.compositeScore - a.compositeScore);
}

// Dynamic AI explanation generator
function generateExplanation(
  route: Route,
  scores: Record<string, number>,
  weights: WeightSet,
  prefs: Preference[]
): string {
  const topFactor = Object.entries(weights).sort(([,a],[,b]) => b - a)[0][0];

  const templates: Record<string, string> = {
    time:      `This route is ${Math.round(scores.timeScore)}% faster than alternatives for your travel window. Metro connectivity ensures minimal road congestion delays.`,
    cost:      `At ₹${route.price}, this route saves you the most vs a cab (avg ₹86 for this distance). Price is locked — no surge.`,
    safety:    `Safety score ${route.safety}% — above the 80% threshold required for Safe Mode. Includes verified auto driver and well-lit metro stations.`,
    eco:       `Saves ${route.co2Saved} kg CO₂ vs a private car — that's ${Math.round(route.co2Saved * 10)} green points added to your wallet.`,
    transfers: `Only ${route.transfers} transfer${route.transfers === 1 ? '' : 's'} required. Fewer connection points means lower risk of missing a service.`,
  };

  return templates[topFactor] ?? `Optimized for ${prefs.join(' + ')} with a composite score of ${route.safety}.`;
}

// Auto-assign tags based on scored rankings
export function assignTags(scoredRoutes: ScoredRoute[]): ScoredRoute[] {
  const withTags = scoredRoutes.map(r => ({ ...r, tags: [...r.tags] }));

  // Clear auto-generated tags, keep manual ones
  withTags.forEach(r => {
    r.tags = r.tags.filter(t => !['Fastest','Cheapest','Eco','Balanced'].includes(t));
  });

  // Re-assign based on actual data
  const fastestIdx  = withTags.reduce((bi, r, i, arr) => parseInt(r.duration) < parseInt(arr[bi].duration) ? i : bi, 0);
  const cheapestIdx = withTags.reduce((bi, r, i, arr) => r.price < arr[bi].price ? i : bi, 0);
  const ecoIdx      = withTags.reduce((bi, r, i, arr) => r.co2Saved > arr[bi].co2Saved ? i : bi, 0);

  withTags[fastestIdx].tags.push('Fastest');
  withTags[cheapestIdx].tags.push('Cheapest');
  withTags[ecoIdx].tags.push('Eco');
  if (fastestIdx !== cheapestIdx && fastestIdx !== ecoIdx && cheapestIdx !== ecoIdx) {
    // Third route gets Balanced if it didn't get any tag
    const tagged = new Set([fastestIdx, cheapestIdx, ecoIdx]);
    withTags.forEach((r, i) => { if (!tagged.has(i) && r.tags.length === 0) r.tags.push('Balanced'); });
  }

  return withTags;
}
