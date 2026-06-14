import { MapPin, Navigation, Share2, AlertTriangle, Clock } from 'lucide-react';
import { JourneyStep, RouteSegment } from '../data/mockData';

interface DetailScreenProps {
  steps: JourneyStep[];
  onShareLocation: () => void;
  onBook: () => void;
  onSOS: () => void;
}

export function DetailScreen({ steps, onShareLocation, onBook, onSOS }: DetailScreenProps) {
  const getStepColor = (index: number, total: number) => {
    if (index === 0) return 'bg-green-500';
    if (index === total - 1) return 'bg-purple-500';
    return 'bg-blue-500';
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
    <div className="flex flex-col min-h-screen bg-gray-50 pb-36">
      {/* Header */}
      <div className="bg-deep-indigo px-4 pt-12 pb-6">
        <h1 className="text-white font-bold text-xl">Journey Details</h1>
        <p className="text-gray-300 text-sm mt-1">48 min {'·'} ₹62 {'·'} 2 transfers</p>
      </div>

      {/* Live Update Banner */}
      <div className="px-4 -mt-2">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-start gap-3">
          <AlertTriangle size={20} className="text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <div className="flex items-center gap-2">
              <span className="font-semibold text-amber-800">Live Update</span>
              <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
            </div>
            <p className="text-sm text-amber-700 mt-1">
              Bus 14 is 6 minutes late - metro connection remains safe.
            </p>
          </div>
        </div>
      </div>

      {/* Route Map Card */}
      <div className="px-4 mt-4">
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <Navigation size={18} className="text-ai-indigo" />
            <span className="font-semibold text-dark-text">Route Map</span>
          </div>

          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <div className="flex-1 h-0.5 bg-gray-200 relative">
              <div className="absolute inset-y-0 left-0 w-1/4 bg-gray-400" />
              <div className="absolute inset-y-0 left-1/4 w-2/5 bg-blue-500" />
              <div className="absolute inset-y-0 left-[65%] w-1/5 bg-coral-orange" />
              <div className="absolute inset-y-0 right-0 w-[15%] bg-gray-400" />
            </div>
            <div className="w-3 h-3 rounded-full bg-purple-500" />
          </div>

          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>Walk</span>
            <span>Metro 17m</span>
            <span>Bus 8m</span>
            <span>Walk</span>
          </div>
        </div>
      </div>

      {/* Step-by-Step Journey */}
      <div className="px-4 mt-6">
        <h2 className="font-semibold text-dark-text mb-4">Step-by-Step Journey</h2>

        <div className="relative">
          {/* Connecting line */}
          <div className="absolute left-4 top-6 bottom-6 w-0.5 bg-gray-200" />

          <div className="space-y-4">
            {steps.map((step, index) => (
              <div key={step.id} className="flex gap-4">
                <div className="relative z-10">
                  <div
                    className={`w-8 h-8 rounded-full ${getStepColor(index, steps.length)} flex items-center justify-center shadow-sm`}
                  >
                    <MapPin size={14} className="text-white" />
                  </div>
                </div>
                <div className="flex-1 bg-white rounded-xl border border-gray-100 p-3 shadow-sm">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-dark-text">{step.location}</span>
                    {step.safety !== undefined && (
                      <span
                        className={`text-xs font-medium px-2 py-0.5 rounded-full ${
                          step.safety >= 80
                            ? 'bg-green-100 text-green-700'
                            : 'bg-yellow-100 text-yellow-700'
                        }`}
                      >
                        {step.safety}% safe
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-500 mt-1 flex items-center gap-1.5">
                    <Clock size={12} />
                    {step.time}
                  </p>
                  <p className="text-sm text-gray-600 mt-1">{step.description}</p>
                  {step.segment && (
                    <span
                      className={`inline-block mt-2 text-xs font-medium px-2 py-1 rounded-full border ${getSegmentPillColor(step.segment.type)}`}
                    >
                      {step.segment.label}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Share Live Location Button */}
      <div className="px-4 mt-6">
        <button
          onClick={onShareLocation}
          className="w-full bg-ai-indigo text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2"
        >
          <Share2 size={18} />
          Share Live Location
        </button>
      </div>

      {/* Fixed Bottom Book Button */}
      <div className="fixed bottom-16 left-0 right-0 flex justify-center pointer-events-none">
        <div className="w-full max-w-[390px] px-4 py-3 bg-white border-t border-gray-100 pointer-events-auto">
          <button
            onClick={onBook}
            className="w-full bg-coral-orange text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-coral-orange/25"
          >
            Book This Journey — ₹62
          </button>
        </div>
      </div>

      {/* SOS Button */}
      <div className="fixed bottom-36 right-0 left-0 flex justify-end pointer-events-none">
        <div className="w-full max-w-[390px] pr-4 pointer-events-auto">
          <button
            onClick={onSOS}
            className="w-14 h-14 rounded-full bg-[#DC2626] text-white font-bold text-sm shadow-lg animate-pulse-sos flex items-center justify-center"
          >
            SOS
          </button>
        </div>
      </div>
    </div>
  );
}
