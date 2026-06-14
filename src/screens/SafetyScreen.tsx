import { useState } from 'react';
import { Shield, Check, UserPlus, Phone, AlertTriangle } from 'lucide-react';

const trustedContacts = [
  { id: 1, initials: 'MA', name: 'Mom', phone: '+91 98765 43210', notify: true },
  { id: 2, initials: 'PS', name: 'Priya Singh', phone: '+91 87654 32109', notify: true },
  { id: 3, initials: 'RK', name: 'Rahul Kumar', phone: '+91 76543 21098', notify: false },
];

export function SafetyScreen() {
  const [safeRoutesOnly, setSafeRoutesOnly] = useState(true);
  const [contacts, setContacts] = useState(trustedContacts);

  const toggleNotify = (id: number) => {
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, notify: !c.notify } : c))
    );
  };

  const handleSOS = () => {
    alert('🆘 Emergency services notified. Location shared with all trusted contacts.');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 pb-24">
      {/* Header */}
      <div className="bg-deep-indigo px-4 pt-12 pb-6 flex items-center gap-3">
        <Shield size={24} className="text-white" />
        <h1 className="text-white font-bold text-xl">Women Safety</h1>
      </div>

      <div className="px-4 -mt-2 space-y-4">
        {/* Safe Routes Toggle */}
        <div className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Shield size={22} className="text-success-green" />
              <div>
                <p className="font-semibold text-dark-text">Safe Routes Only</p>
                <p className="text-xs text-gray-500 mt-0.5">
                  Only shows routes with safety score 80%+
                </p>
              </div>
            </div>
            <button
              onClick={() => setSafeRoutesOnly(!safeRoutesOnly)}
              className={`relative w-12 h-7 rounded-full transition-colors ${
                safeRoutesOnly ? 'bg-success-green' : 'bg-gray-300'
              }`}
            >
              <div
                className={`absolute top-1 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                  safeRoutesOnly ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Trusted Contacts Section */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-dark-text">Trusted Contacts</h2>
            <button className="text-xs text-ai-indigo font-medium flex items-center gap-1">
              <UserPlus size={14} />
              Add
            </button>
          </div>

          <div className="space-y-3">
            {contacts.map((contact) => (
              <div
                key={contact.id}
                className="bg-white rounded-xl border border-gray-100 p-4 shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-ai-indigo flex items-center justify-center text-white font-bold text-sm">
                    {contact.initials}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-dark-text">{contact.name}</p>
                    <p className="text-sm text-gray-500 flex items-center gap-1 mt-0.5">
                      <Phone size={12} />
                      {contact.phone}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-500">Notify</span>
                    <button
                      onClick={() => toggleNotify(contact.id)}
                      className={`relative w-10 h-6 rounded-full transition-colors ${
                        contact.notify ? 'bg-success-green' : 'bg-gray-300'
                      }`}
                    >
                      <div
                        className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                          contact.notify ? 'translate-x-5' : 'translate-x-1'
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Driver Card */}
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
                  <Shield size={12} />
                  Police Verified
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* SOS Section */}
        <div className="mt-4">
          <button
            onClick={handleSOS}
            className="w-full bg-[#DC2626] text-white font-bold py-4 rounded-xl shadow-lg animate-pulse-sos flex flex-col items-center justify-center"
          >
            <AlertTriangle size={28} className="mb-1" />
            <span className="text-lg">🆘 Emergency SOS</span>
            <span className="text-xs text-red-200 mt-1">
              Tap to alert contacts + call helpline
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
