export type TransportMode = 'metro' | 'bus' | 'auto' | 'walk' | 'taxi' | 'car';

// CO₂ emission factors per km (kg CO₂ equivalent)
// Source logic: CHETNA-Road 2025 dataset methodology
export const CO2_PER_KM: Record<TransportMode, number> = {
  metro: 0.041,   // Electric rail, Delhi grid factor
  bus:   0.082,   // Diesel DTC bus, avg occupancy 40
  auto:  0.176,   // CNG auto, single occupancy
  walk:  0.000,   // Zero emission
  taxi:  0.192,   // Petrol/CNG cab, avg 1.2 passengers
  car:   0.210,   // Private petrol car, single occupancy
};

// What the user would have taken (baseline for "saved" calc)
const BASELINE_MODE: TransportMode = 'car';

export interface Co2Result {
  totalEmission: number;   // kg CO₂ this journey actually emits
  baselineEmission: number; // kg CO₂ if they took a car
  co2Saved: number;        // baseline − actual (always positive if better than car)
  treesEquivalent: number; // trees absorb ~22 kg CO₂/year
  greenPoints: number;     // gamified: 1 point per 0.1 kg saved, rounded
}

export function calculateCo2(
  segments: Array<{ mode: TransportMode; distanceKm: number }>
): Co2Result {
  const totalDistanceKm = segments.reduce((sum, s) => sum + s.distanceKm, 0);
  const totalEmission = segments.reduce(
    (sum, s) => sum + CO2_PER_KM[s.mode] * s.distanceKm,
    0
  );
  const baselineEmission = CO2_PER_KM[BASELINE_MODE] * totalDistanceKm;
  const co2Saved = Math.max(0, baselineEmission - totalEmission);
  const treesEquivalent = +(co2Saved / 22).toFixed(3);
  const greenPoints = Math.round(co2Saved * 10);

  return {
    totalEmission: +totalEmission.toFixed(3),
    baselineEmission: +baselineEmission.toFixed(3),
    co2Saved: +co2Saved.toFixed(2),
    treesEquivalent,
    greenPoints,
  };
}

// Monthly aggregate helper (for Carbon Dashboard screen)
export function monthlyCo2Summary(dailyJourneys: Co2Result[]): {
  totalSaved: number;
  greenPoints: number;
  treesEquivalent: number;
} {
  const totalSaved = dailyJourneys.reduce((s, j) => s + j.co2Saved, 0);
  const greenPoints = dailyJourneys.reduce((s, j) => s + j.greenPoints, 0);
  return {
    totalSaved: +totalSaved.toFixed(2),
    greenPoints,
    treesEquivalent: +(totalSaved / 22).toFixed(2),
  };
}
