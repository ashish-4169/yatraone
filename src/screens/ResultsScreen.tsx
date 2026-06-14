import { useState, useEffect, useCallback, useMemo } from 'react';
import { Clock, Shield, Leaf, ArrowRightLeft, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { Route } from '../data/mockData';

const aiInsights = [
  "Peak hour detected — Route 2 saves 8 minutes by avoiding congested roads.",
  "Safe Mode ON — Showing only routes with safety score above 80%.",
  "Bus 14 running 6 min late — your metro connection is still safe.",
  "Eco tip: Route 3 saves 1.6kg more CO₂ than Route 1. Switch for green points.",
  "High demand zone — fare locked now to protect you from surge pricing."
];

interface ResultsScreenProps {
  routes: Route[];
  selectedRouteId: number | null;
  setSelectedRouteId: (id: number) => void;
  aiInsight?: string;
}

export function ResultsScreen({ routes, selectedRouteId, setSelectedRouteId, aiInsight }: ResultsScreenProps) {
  const [expandedCard, setExpandedCard] = useState<number | null>(null);
  const [lockTime] = useState(Date.now() + 9 * 60 * 1000 + 45 * 1000);

  const randomInsight = useMemo(() => {
    return aiInsights[Math.floor(Math.random() * aiInsights.length)];
  }, []);

  const formatTime = useCallback(() => {
    const diff = Math.max(0, lockTime - Date.now());
    const mins = Math.floor(diff / 60000);
    const secs = Math.floor((diff % 60000) / 1000);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }, [lockTime]);

  const [, setTimeDisplay] = useState(formatTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeDisplay(formatTime());
    }, 1000);
    return () => clearInterval(interval);
  }, [formatTime]);

  const getSegmentColor = (type: string) => {
    switch (type) {
      case 'metro':
        return 'bg-blue-500';
      case 'bus':
        return 'bg-coral-orange';
      case 'auto':
        return 'bg-purple-500';
      default:
        return 'bg-gray-400';
    }
  };

  const getSegmentPillColor = (type: string) => {
    switch (type) {
      case 'metro':
        return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'bus':
        return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'auto':
        return 'bg-purple-100 text-purple-700 border-purple-200';
      default:
        return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-deep-indigo px-4 pt-12 pb-6">
        <h1 className="text-white font-bold text-xl">Route Results</h1>
        <p className="text-gray-300 text-sm mt-1">Connaught Place {'->'} Cyber City</p>
      </div>

      {/* AI Insight Card */}
      <div className="px-4 -mt-2">
        <div className="bg-ai-indigo rounded-xl p-4 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={18} />
            <span className="font-semibold">AI Insight</span>
            <span className="bg-cyan-400 text-ai-indigo text-xs font-bold px-2 py-0.5 rounded-full ml-auto">
              Live
            </span>
          </div>
          <p className="text-sm text-indigo-100">
            {aiInsight || randomInsight}
          </p>
        </div>
      </div>

      {/* Route Cards */}
      <div className="px-4 mt-4 space-y-3">
        {routes.map((route) => (
          <div
            key={route.id}
            onClick={() => setSelectedRouteId(route.id)}
            className={`bg-white rounded-xl shadow-sm border-2 p-4 cursor-pointer transition-all ${
              selectedRouteId === route.id ? 'border-cyan-400' : 'border-gray-100'
            }`}
          >
            {/* Top Row */}
            <div className="flex items-center gap-2 mb-3">
              <div className="w-10 h-10 rounded-full bg-coral-orange flex items-center justify-center">
                <span className="text-white font-bold text-lg">{route.score}</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {route.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                      tag === 'Fastest'
                        ? 'bg-green-100 text-green-700'
                        : tag === 'Cheapest'
                        ? 'bg-blue-100 text-blue-700'
                        : tag === 'Eco'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
                {!route.onTime && (
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-yellow-100 text-yellow-700">
                    {route.lateMinutes} min late
                  </span>
                )}
              </div>
              {route.onTime && (
                <span className="ml-auto text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                  On Time
                </span>
              )}
            </div>

            {/* Time and Price */}
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center gap-1.5">
                <Clock size={16} className="text-gray-400" />
                <span className="font-bold text-lg text-dark-text">{route.duration}</span>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500">Total</span>
                <span className="font-bold text-lg text-dark-text ml-1">₹{route.price}</span>
              </div>
            </div>

            <p className="text-sm text-gray-500 mb-3">{route.timeRange}</p>

            {/* Segment Bar */}
            <div className="flex h-2 rounded-full overflow-hidden mb-3">
              {route.segments.map((segment, i) => (
                <div
                  key={i}
                  className={`${getSegmentColor(segment.type)} ${i < route.segments.length - 1 ? 'mr-0.5' : ''}`}
                  style={{ flex: segment.duration ? 1 : 0.3 }}
                />
              ))}
            </div>

            {/* Segment Pills */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {route.segments.map((segment, i) => (
                <span
                  key={i}
                  className={`text-xs font-medium px-2 py-0.5 rounded-full border flex items-center gap-1 ${getSegmentPillColor(segment.type)}`}
                >
                  {segment.label}
                  {segment.crowd && (
                    <span className="text-orange-600"> * {segment.crowd}</span>
                  )}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Shield size={14} className="text-ai-indigo" />
                <span>Safety {route.safety}%</span>
              </div>
              <div className="flex items-center gap-1">
                <Leaf size={14} className="text-success-green" />
                <span>CO2 Saved {route.co2Saved} kg</span>
              </div>
              <div className="flex items-center gap-1">
                <ArrowRightLeft size={14} className="text-gray-500" />
                <span>{route.transfers}</span>
              </div>
            </div>

            {/* Price Lock Banner */}
            {route.priceLocked && selectedRouteId === route.id && (
              <div className="mt-3 bg-green-50 rounded-lg p-2.5 flex items-center justify-between">
                <span className="text-sm text-green-700 font-medium">Price locked for {formatTime()}</span>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              </div>
            )}

            {/* Why Recommended */}
            <div className="mt-3">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedCard(expandedCard === route.id ? null : route.id);
                }}
                className="flex items-center gap-1 text-sm text-ai-indigo font-medium"
              >
                Why Recommended?
                {expandedCard === route.id ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              {expandedCard === route.id && (
                <p className="mt-2 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
                  This route optimizes for your selected preferences. It combines fast metro
                  connectivity with minimal transfers, ensuring a safe and efficient journey.
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
