import { Leaf, TreePine, Gift, BarChart3 } from 'lucide-react';
import { weeklyCo2Data } from '../data/mockData';

export function CarbonScreen() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-deep-indigo px-4 pt-12 pb-6">
        <h1 className="text-white font-bold text-xl">Carbon Dashboard</h1>
        <p className="text-gray-300 text-sm mt-1">Your environmental impact</p>
      </div>

      <div className="px-4 -mt-2 space-y-4">
        {/* Eco Streak Badge */}
        <div className="bg-success-green rounded-full px-4 py-2 flex items-center justify-center gap-2">
          <span>🔥</span>
          <span className="text-white font-semibold">5-Day Eco Streak</span>
          <span>🔥</span>
        </div>

        {/* Main Carbon Card */}
        <div className="bg-gradient-to-br from-success-green to-green-700 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-start gap-3 mb-4">
            <Leaf size={32} className="text-green-200" />
            <div>
              <p className="text-green-200 text-sm">This Month</p>
              <p className="text-4xl font-bold mt-1">4.2 kg</p>
              <p className="text-green-200 text-sm">CO₂ Saved</p>
            </div>
          </div>

          <div className="border-t border-green-500 pt-4 mt-4">
            <div className="flex items-center gap-3">
              <TreePine size={24} className="text-green-200" />
              <div>
                <p className="text-green-200 text-xs">Equivalent to</p>
                <p className="font-semibold text-lg">1 Tree Planted</p>
              </div>
            </div>
          </div>
        </div>

        {/* Green Wallet Card */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Gift size={18} className="text-success-green" />
              <h3 className="font-semibold text-dark-text">Green Wallet</h3>
            </div>
          </div>
          <p className="text-xs text-gray-500 mb-3">Earn points for eco-friendly trips</p>

          <div className="flex items-end justify-between mb-2">
            <span className="text-2xl font-bold text-success-green">124 Points</span>
          </div>

          <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
            <div className="h-full bg-success-green rounded-full" style={{ width: '62%' }} />
          </div>

          <p className="text-xs text-gray-500 mb-3">76 points to next reward</p>

          <button className="w-full bg-success-green text-white font-semibold py-2.5 rounded-lg flex items-center justify-center gap-2">
            <Gift size={16} />
            Redeem ₹12 Off
          </button>
        </div>

        {/* Weekly CO₂ Chart */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 size={18} className="text-success-green" />
            <h3 className="font-semibold text-dark-text">This Week's CO₂ Savings</h3>
          </div>

          <div className="flex items-end justify-between h-32">
            {weeklyCo2Data.map((data, index) => (
              <div key={index} className="flex flex-col items-center gap-2 flex-1">
                <div
                  className="w-6 bg-success-green rounded-t-sm"
                  style={{ height: `${data.value * 100}px` }}
                />
                <span className="text-xs text-gray-500">{data.day}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between mt-2 text-xs text-gray-500">
            <span>0 kg</span>
            <span>1.5 kg</span>
          </div>
        </div>

        {/* Mode Breakdown */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <h3 className="font-semibold text-dark-text mb-3">Mode Breakdown</h3>
          <div className="flex gap-2">
            <span className="text-sm bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full">
              🚇 Metro 45%
            </span>
            <span className="text-sm bg-orange-100 text-orange-700 px-3 py-1.5 rounded-full">
              🚌 Bus 40%
            </span>
            <span className="text-sm bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full">
              🛺 Auto 15%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
