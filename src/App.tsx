import { useState, useCallback } from 'react';
import { Home, BarChart2, MapPin, Shield, CreditCard, Leaf } from 'lucide-react';
import { HomeScreen } from './screens/HomeScreen';
import { ResultsScreen } from './screens/ResultsScreen';
import { DetailScreen } from './screens/DetailScreen';
import { SafetyScreen } from './screens/SafetyScreen';
import { BookScreen } from './screens/BookScreen';
import { CarbonScreen } from './screens/CarbonScreen';
import { mockRoutes, mockJourneySteps, Route } from './data/mockData';
import { scoreAndRankRoutes, Preference } from './engine/routeScorer';
import { generateAiInsight } from './engine/aiInsights';

type TabType = 'home' | 'results' | 'detail' | 'safety' | 'book' | 'carbon';

const tabs: { id: TabType; label: string; icon: typeof Home }[] = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'results', label: 'Results', icon: BarChart2 },
  { id: 'detail', label: 'Detail', icon: MapPin },
  { id: 'safety', label: 'Safety', icon: Shield },
  { id: 'book', label: 'Book', icon: CreditCard },
  { id: 'carbon', label: 'Carbon', icon: Leaf },
];

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home');
  const [preferences, setPreferences] = useState<Preference[]>(['Fastest']);
  const [safeMode, setSafeMode] = useState(true);
  const [selectedRouteId, setSelectedRouteId] = useState<number | null>(null);
  const [rankedRoutes, setRankedRoutes] = useState<Route[]>(mockRoutes);
  const [aiInsight, setAiInsight] = useState<string>('');

  const togglePreference = useCallback((pref: Preference) => {
    setPreferences((prev) =>
      prev.includes(pref) ? prev.filter((p) => p !== pref) : [...prev, pref]
    );
  }, []);

  const handleSearch = useCallback(() => {
    const hour = new Date().getHours();
    const isPeakHour = (hour >= 8 && hour <= 10) || (hour >= 17 && hour <= 20);

    // Run the scoring engine with current preferences
    const scored = scoreAndRankRoutes(mockRoutes, preferences);

    // If Women Safe is selected, boost safety filter
    const filtered = preferences.includes('Women Safe')
      ? scored.map((r) => ({ ...r, safety: Math.min(100, r.safety + 5) }))
      : scored;

    setRankedRoutes(filtered);
    setSelectedRouteId(filtered[0]?.id ?? 1);

    // Generate AI insight based on top route + preferences
    const insight = generateAiInsight(filtered[0], filtered, isPeakHour, preferences);
    setAiInsight(insight);

    setActiveTab('results');
  }, [preferences]);

  const handleShareLocation = useCallback(() => {
    alert('📍 Live location shared with Priya (trusted contact)');
  }, []);

  const handleBook = useCallback(() => {
    setActiveTab('book');
  }, []);

  const handleSOS = useCallback(() => {
    alert('🆘 Emergency services notified. Location shared with trusted contact.');
  }, []);

  const handleRouteSelect = useCallback((id: number) => {
    setSelectedRouteId(id);
    setActiveTab('detail');
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center font-sans">
      <div className="w-full max-w-[390px] bg-white relative min-h-screen shadow-2xl">
        <div className="pb-16">
          {activeTab === 'home' && (
            <HomeScreen
              preferences={preferences}
              togglePreference={togglePreference}
              safeMode={safeMode}
              setSafeMode={setSafeMode}
              onSearch={handleSearch}
            />
          )}
          {activeTab === 'results' && (
            <ResultsScreen
              routes={rankedRoutes}
              selectedRouteId={selectedRouteId}
              setSelectedRouteId={handleRouteSelect}
              aiInsight={aiInsight}
            />
          )}
          {activeTab === 'detail' && (
            <DetailScreen
              steps={mockJourneySteps}
              onShareLocation={handleShareLocation}
              onBook={handleBook}
              onSOS={handleSOS}
            />
          )}
          {activeTab === 'safety' && <SafetyScreen />}
          {activeTab === 'book' && <BookScreen />}
          {activeTab === 'carbon' && <CarbonScreen />}
        </div>

        {/* Bottom Navigation Bar */}
        <div className="fixed bottom-0 left-0 right-0 flex justify-center">
          <div className="w-full max-w-[390px] bg-white border-t border-gray-200">
            <div className="flex justify-around py-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex flex-col items-center py-1 px-2 rounded-lg transition-all ${
                      isActive ? 'text-coral-orange' : 'text-gray-400'
                    }`}
                  >
                    <Icon
                      size={20}
                      strokeWidth={isActive ? 2.5 : 2}
                      className={isActive ? 'text-coral-orange' : 'text-gray-400'}
                    />
                    <span className="text-[10px] mt-0.5 font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
