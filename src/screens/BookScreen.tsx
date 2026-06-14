import { useState } from 'react';
import { Check, ChevronDown, ChevronUp, CreditCard, Wallet } from 'lucide-react';

export function BookScreen() {
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'wallet'>('upi');
  const [priceExpanded, setPriceExpanded] = useState(false);
  const [booking, setBooking] = useState(false);
  const [booked, setBooked] = useState(false);
  const [bookedItems, setBookedItems] = useState<string[]>([]);

  const handleBook = () => {
    if (booking || booked) return;
    setBooking(true);

    const items = ['Bus', 'Metro', 'Auto'];
    items.forEach((item, index) => {
      setTimeout(() => {
        setBookedItems((prev) => [...prev, item]);
        if (index === items.length - 1) {
          setTimeout(() => {
            setBooking(false);
            setBooked(true);
          }, 500);
        }
      }, (index + 1) * 500);
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-deep-indigo px-4 pt-12 pb-6">
        <h1 className="text-white font-bold text-xl">Book & Pay</h1>
      </div>

      <div className="px-4 -mt-2 space-y-4">
        {/* Segment Breakdown */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-coral-orange" />
                <span className="text-dark-text">Bus 14</span>
              </div>
              <span className="font-semibold text-dark-text">₹18</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-blue-500" />
                <span className="text-dark-text">Metro Yellow Line</span>
              </div>
              <span className="font-semibold text-dark-text">₹30</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-purple-500" />
                <span className="text-dark-text">Auto</span>
              </div>
              <span className="font-semibold text-dark-text">₹14</span>
            </div>
          </div>

          <div className="border-t border-gray-200 mt-4 pt-3">
            <div className="flex items-center justify-between">
              <span className="font-bold text-dark-text text-lg">Total</span>
              <span className="font-bold text-dark-text text-lg">₹62</span>
            </div>
          </div>
        </div>

        {/* Savings Card */}
        <div className="bg-success-green rounded-xl p-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-100 text-sm">You're saving</p>
              <p className="text-2xl font-bold mt-1">₹24 vs Taxi</p>
            </div>
            <div className="bg-white text-success-green font-semibold px-3 py-1 rounded-full text-sm">
              -28%
            </div>
          </div>
        </div>

        {/* Why This Price */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <button
            onClick={() => setPriceExpanded(!priceExpanded)}
            className="flex items-center justify-between w-full text-left"
          >
            <span className="font-medium text-dark-text">Why this price?</span>
            {priceExpanded ? (
              <ChevronUp size={18} className="text-gray-400" />
            ) : (
              <ChevronDown size={18} className="text-gray-400" />
            )}
          </button>
          {priceExpanded && (
            <p className="mt-3 text-sm text-gray-600 bg-gray-50 rounded-lg p-3">
              Fixed fare calculated from real-time demand data. No surge pricing ever. Price locked
              for 10 minutes.
            </p>
          )}
        </div>

        {/* Driver Info */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <p className="text-xs text-gray-500 uppercase tracking-wide mb-3">Your Auto Driver</p>
          <div className="flex items-start gap-4">
            <div className="w-14 h-14 rounded-full bg-ai-indigo flex items-center justify-center text-white font-bold text-lg">
              RK
            </div>
            <div className="flex-1">
              <p className="font-semibold text-dark-text text-lg">Rahul Kumar</p>
              <p className="text-sm text-gray-600 mt-0.5">4.8 Rating</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                  <Check size={12} />
                  Verified Driver
                </span>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full flex items-center gap-1">
                  <Check size={12} />
                  Police Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <p className="text-sm font-medium text-dark-text mb-3">Payment Method</p>
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setPaymentMethod('upi')}
              className={`flex-1 py-2 rounded-lg font-medium text-sm border transition-all ${
                paymentMethod === 'upi'
                  ? 'bg-ai-indigo text-white border-ai-indigo'
                  : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              UPI
            </button>
            <button
              onClick={() => setPaymentMethod('card')}
              className={`flex-1 py-2 rounded-lg font-medium text-sm border transition-all ${
                paymentMethod === 'card'
                  ? 'bg-ai-indigo text-white border-ai-indigo'
                  : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              Card
            </button>
            <button
              onClick={() => setPaymentMethod('wallet')}
              className={`flex-1 py-2 rounded-lg font-medium text-sm border transition-all ${
                paymentMethod === 'wallet'
                  ? 'bg-ai-indigo text-white border-ai-indigo'
                  : 'bg-white text-gray-600 border-gray-200'
              }`}
            >
              Wallet
            </button>
          </div>

          {paymentMethod === 'upi' && (
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <CreditCard size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-dark-text">Google Pay</p>
                <p className="text-sm text-gray-500">9876543210@paytm</p>
              </div>
            </div>
          )}

          {paymentMethod === 'card' && (
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <CreditCard size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-dark-text">**** 4532</p>
                <p className="text-sm text-gray-500">Visa Credit Card</p>
              </div>
            </div>
          )}

          {paymentMethod === 'wallet' && (
            <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gray-100 flex items-center justify-center">
                <Wallet size={20} className="text-gray-600" />
              </div>
              <div>
                <p className="font-medium text-dark-text">YatraOne Wallet</p>
                <p className="text-sm text-gray-500">Balance: ₹150</p>
              </div>
            </div>
          )}
        </div>

        {/* Book Button */}
        {!booked ? (
          <button
            onClick={handleBook}
            disabled={booking}
            className={`w-full bg-coral-orange text-white font-semibold py-3.5 rounded-xl shadow-lg shadow-coral-orange/25 mt-4 ${
              booking ? 'opacity-80' : ''
            }`}
          >
            {booking ? (
              <div className="flex items-center justify-center gap-3">
                {['Bus', 'Metro', 'Auto'].map((item) => (
                  <span key={item} className="flex items-center gap-1">
                    {item}
                    {bookedItems.includes(item) && <Check size={16} className="text-green-300" />}
                  </span>
                ))}
              </div>
            ) : (
              `Book All - Pay ₹62`
            )}
          </button>
        ) : (
          <div className="bg-success-green rounded-xl p-6 text-center mt-4">
            <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mx-auto mb-3">
              <Check size={32} className="text-success-green" />
            </div>
            <p className="text-white font-bold text-xl">Journey Booked!</p>
            <p className="text-green-100 mt-1">Your journey details have been sent</p>
          </div>
        )}
      </div>
    </div>
  );
}
