export type TransportMode = 'metro' | 'bus' | 'auto' | 'walk';

interface SafetyFactors {
  mode: TransportMode;
  hour: number;          // 0-23
  crowdLevel: 'Low' | 'Moderate' | 'High';
  isWomenSafeRoute?: boolean;
}

// Base safety scores by mode (derived from SafetiPin + NCRB logic)
const MODE_BASE_SCORE: Record<TransportMode, number> = {
  metro: 92,   // Highest — CCTV, staff, enclosed
  bus:   74,   // Variable — depends on route, crowd
  auto:  78,   // Driver-dependent — verified badge helps
  walk:  68,   // Lowest — exposure to environment
};

// Lighting factor: well-lit areas (metro stations, major roads) add bonus
const LIGHTING_BONUS: Record<TransportMode, number> = {
  metro: 5,    // Stations always lit
  bus:   2,    // Major stops lit, varies
  auto:  1,    // Open vehicle, ambient light
  walk:  0,    // No control
};

// Crowd modifier: high crowd on metro = safer; high crowd on bus = less safe
function crowdModifier(mode: TransportMode, crowd: 'Low' | 'Moderate' | 'High'): number {
  if (mode === 'metro') {
    return crowd === 'High' ? 2 : crowd === 'Moderate' ? 1 : -1;
  }
  if (mode === 'bus') {
    return crowd === 'High' ? -4 : crowd === 'Moderate' ? 0 : 2;
  }
  // auto / walk
  return crowd === 'High' ? 1 : 0;
}

// Late-night penalty (9pm–5am)
function lateNightPenalty(hour: number): number {
  if (hour >= 21 || hour < 5) return 12;
  if (hour >= 19 || hour < 7) return 5;
  return 0;
}

// Women-safe bonus: verified drivers, pink coach routes
function womenSafeBonus(mode: TransportMode, isWomenSafe: boolean): number {
  if (!isWomenSafe) return 0;
  if (mode === 'metro') return 4;   // Pink coach
  if (mode === 'auto')  return 6;   // Verified driver
  if (mode === 'bus')   return 2;
  return 0;
}

export function calculateSafetyScore(factors: SafetyFactors): number {
  const base      = MODE_BASE_SCORE[factors.mode];
  const lighting  = LIGHTING_BONUS[factors.mode];
  const crowd     = crowdModifier(factors.mode, factors.crowdLevel);
  const night     = lateNightPenalty(factors.hour);
  const womens    = womenSafeBonus(factors.mode, factors.isWomenSafeRoute ?? false);

  const raw = base + lighting + crowd - night + womens;
  return Math.min(100, Math.max(0, Math.round(raw)));
}

// Convenience: get safety score for a full journey segment
export function getSegmentSafety(
  mode: TransportMode,
  isPeakHour: boolean,
  isNight: boolean,
  womenSafe: boolean
): number {
  const hour = isNight ? 22 : isPeakHour ? 9 : 14;
  const crowd = isPeakHour
    ? (mode === 'metro' ? 'High' : mode === 'bus' ? 'High' : 'Moderate')
    : 'Low';
  return calculateSafetyScore({ mode, hour, crowdLevel: crowd, isWomenSafeRoute: womenSafe });
}
