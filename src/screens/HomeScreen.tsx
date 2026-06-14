import { MapPin, Clock, ArrowUpDown, Shield, Search } from 'lucide-react';
import { preferenceOptions } from '../data/mockData';
import { Preference } from '../engine/routeScorer';

interface HomeScreenProps {
  preferences: Preference[];
  togglePreference: (pref: Preference) => void;
  safeMode: boolean;
  setSafeMode: (value: boolean) => void;
  onSearch: () => void;
}

export function HomeScreen({
  preferences,
  togglePreference,
  safeMode,
  setSafeMode,
  onSearch,
}: HomeScreenProps) {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Header */}
      <div className="bg-deep-indigo px-4 pt-12 pb-6">
        <h1 className="text-white font-bold text-xl">YatraOne *</h1>
        <p className="text-gray-300 text-sm mt-1">AI-Powered Journey Planner</p>
      </div>

      <div className="flex-1 px-4 -mt-2 pb-24">
        {/* Search Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-4">
          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-coral-orange flex-shrink-0" />
            <input
              type="text"
              placeholder="From - Enter source"
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-dark-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coral-orange/20"
              defaultValue="Connaught Place"
            />
          </div>

          <div className="flex justify-center my-2">
            <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
              <ArrowUpDown size={18} className="text-gray-400 rotate-90" />
            </button>
          </div>

          <div className="flex items-center gap-3">
            <MapPin size={20} className="text-success-green flex-shrink-0" />
            <input
              type="text"
              placeholder="To - Enter destination"
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-dark-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-coral-orange/20"
              defaultValue="Cyber City"
            />
          </div>

          <div className="mt-4 flex items-center gap-3">
            <Clock size={20} className="text-gray-500 flex-shrink-0" />
            <button className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-dark-text text-left">
              Leave Now
            </button>
          </div>
        </div>

        {/* Preferences Section */}
        <div className="mt-6">
          <p className="text-xs text-gray-500 font-medium mb-3">PREFERENCES</p>
          <div className="flex flex-wrap gap-2">
            {preferenceOptions.map((pref) => (
              <button
                key={pref}
                onClick={() => togglePreference(pref as Preference)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                  preferences.includes(pref as Preference)
                    ? 'bg-coral-orange text-white'
                    : 'bg-white border border-gray-300 text-gray-600'
                }`}
              >
                {pref}
              </button>
            ))}
          </div>
        </div>

        {/* Safe Mode Toggle */}
        <div className="mt-6 bg-gray-50 rounded-xl p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield size={20} className="text-ai-indigo" />
              <div>
                <p className="font-semibold text-dark-text">Safe Mode</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Filters safe routes & shares live location
                </p>
              </div>
            </div>
            <button
              onClick={() => setSafeMode(!safeMode)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                safeMode ? 'bg-success-green' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  safeMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Search Button */}
        <button
          onClick={onSearch}
          className="mt-6 w-full bg-coral-orange text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-coral-orange/25 flex items-center justify-center gap-2"
        >
          <Search size={18} />
          Search Routes
        </button>
      </div>
    </div>
  );
}
