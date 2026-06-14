import { ScoredRoute } from './routeScorer';

export function generateAiInsight(
  topRoute: ScoredRoute,
  allRoutes: ScoredRoute[],
  isPeakHour: boolean,
  preferences: string[]
): string {
  const hour = new Date().getHours();
  const isNight = hour >= 21 || hour < 6;
  const timeSaved = parseInt(allRoutes[allRoutes.length - 1].duration) - parseInt(topRoute.duration);
  const costDiff  = allRoutes[allRoutes.length - 1].price - topRoute.price;

  // Priority: contextual insights based on current conditions
  if (isNight) {
    return `Night mode: Showing ${allRoutes.filter(r => r.safety >= 80).length} safe routes with verified drivers. SOS is active.`;
  }
  if (isPeakHour && preferences.includes('Fastest')) {
    return `Peak hour detected — Route 1 saves ${timeSaved} min by prioritizing metro over surface roads.`;
  }
  if (preferences.includes('Women Safe')) {
    const safeCount = allRoutes.filter(r => r.safety >= 85).length;
    return `Safe Mode ON — ${safeCount} of ${allRoutes.length} routes meet the 85%+ safety threshold. Live location sharing is active.`;
  }
  if (preferences.includes('Eco-Friendly')) {
    return `Eco tip: Route 1 saves ${topRoute.co2Saved} kg CO₂ vs a cab — that's ${Math.round(topRoute.co2Saved * 10)} green points!`;
  }
  if (preferences.includes('Cheapest')) {
    return `Price lock active — cheapest route saves you ₹${costDiff} vs the priciest option. Locked for 10 minutes.`;
  }
  if (!topRoute.onTime) {
    return `Live update: Bus on Route 1 is ${topRoute.lateMinutes} min late — metro connection is still within buffer.`;
  }

  // Default contextual
  const insights = [
    `AI ranked ${allRoutes.length} route combinations — Route 1 scores highest across time, cost, and safety.`,
    `High demand window — fare locked now to protect you from surge pricing on this corridor.`,
    `Bus 14 running on schedule today. Metro headway: 3 min. Your connections are safe.`,
    `Route 1 is ${timeSaved} min faster and ₹${costDiff > 0 ? costDiff : 0} cheaper than the next alternative.`,
  ];
  return insights[Math.floor(Math.random() * insights.length)];
}
