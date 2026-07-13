import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Terminal, Database, Trash2, ChevronUp, ChevronDown, Check, Wifi } from 'lucide-react';

export const Footer: React.FC = () => {
  const { ga4Id, setGa4Id, eventLogs, clearLogs, navigateTo } = useShop();
  const [tempId, setTempId] = useState(ga4Id);
  const [isConsoleExpanded, setIsConsoleExpanded] = useState(false);
  const [isConsoleVisible, setIsConsoleVisible] = useState(false); // Collapsed & Hidden by default
  const [saveSuccess, setSaveSuccess] = useState(false);

  const handleSaveId = (e: React.FormEvent) => {
    e.preventDefault();
    setGa4Id(tempId.trim());
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2000);
  };

  return (
    <footer className="border-t border-neutral-200 bg-neutral-100 text-neutral-600 dark:border-neutral-900 dark:bg-[#0B0B0B] dark:text-neutral-400 mt-auto transition-colors duration-300">
      
      {/* Brand & Editorial Section */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 text-left">
          {/* Logo & Philosophy */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="font-oswald text-xl font-bold tracking-[0.25em] text-neutral-900 dark:text-white uppercase mb-4">
              SOLUS
            </h3>
            <p className="text-sm max-w-md leading-relaxed text-neutral-500 dark:text-neutral-400">
              Built in Silence. We do not sell motivation; we design discipline. In the quiet hours of raw work, you are your only competition. Timeless luxury sportswear crafted for the warrior-athlete.
            </p>
          </div>

          {/* Quick Nav */}
          <div>
            <h4 className="font-oswald text-xs font-bold tracking-[0.2em] text-neutral-800 dark:text-neutral-200 uppercase mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm font-medium">
              <li>
                <button onClick={() => navigateTo('home')} className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer">
                  Silence Home
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer">
                  Apparel Catalog
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('profile')} className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer">
                  Athlete Profile
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('admin')} className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer">
                  Store Portal
                </button>
              </li>
            </ul>
          </div>

          {/* Dynamic GA4 Config Field */}
          <div>
            <h4 className="font-oswald text-xs font-bold tracking-[0.2em] text-neutral-800 dark:text-neutral-200 uppercase mb-4">
              GA4 Analytics Setup
            </h4>
            <p className="text-xs text-neutral-500 dark:text-neutral-550 mb-3 leading-relaxed">
              Dynamically load Google Analytics by entering your Measurement ID below.
            </p>
            <form onSubmit={handleSaveId} className="space-y-2">
              <input
                type="text"
                placeholder="G-XXXXXXXXXX"
                value={tempId}
                onChange={(e) => setTempId(e.target.value)}
                className="w-full px-3 py-2 text-xs font-mono bg-white dark:bg-[#161616] border border-neutral-300 dark:border-neutral-800 focus:outline-none focus:border-black dark:focus:border-white text-neutral-950 dark:text-white rounded-none"
              />
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-1.5 bg-neutral-900 dark:bg-white text-white dark:text-black py-2 font-oswald text-[10px] font-bold tracking-widest uppercase hover:opacity-90 transition-opacity rounded-none cursor-pointer"
              >
                {saveSuccess ? (
                  <>
                    <Check size={12} /> Configured
                  </>
                ) : (
                  'Inject GA4 Script'
                )}
              </button>
            </form>
            <button
              type="button"
              onClick={() => setIsConsoleVisible(prev => !prev)}
              className="w-full mt-2 flex items-center justify-center gap-1.5 border border-neutral-300 dark:border-neutral-800 text-neutral-800 dark:text-neutral-300 py-2 font-oswald text-[10px] font-bold tracking-widest uppercase hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-colors rounded-none cursor-pointer"
            >
              {isConsoleVisible ? 'Hide Event Console' : 'Show Event Console'}
            </button>
          </div>
        </div>

        {/* Legal bar */}
        <div className="border-t border-neutral-200 dark:border-neutral-850 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-neutral-500 dark:text-neutral-600 gap-4 text-left">
          <span>&copy; {new Date().getFullYear()} SOLUS Brand. All rights reserved.</span>
          <div className="flex gap-6">
            <span className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer">Terms of Discipline</span>
            <span className="hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer">Logistics & Shipping</span>
          </div>
        </div>
      </div>

      {/* GA4 Event Logs Console Overlay Panel */}
      {isConsoleVisible && (
        <div className="border-t border-neutral-300 bg-neutral-200 dark:border-neutral-900 dark:bg-[#080808] w-full text-left">
          <div className="mx-auto max-w-7xl">
            {/* Header click bar */}
            <div
              onClick={() => setIsConsoleExpanded(!isConsoleExpanded)}
              className="flex items-center justify-between px-4 py-3 bg-neutral-300 dark:bg-[#111111] hover:bg-neutral-400/50 dark:hover:bg-[#161616] cursor-pointer border-b border-neutral-400 dark:border-neutral-800 transition-colors"
            >
              <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-800 dark:text-neutral-200">
                <Terminal size={14} className="text-neutral-600 dark:text-neutral-400" />
                <span>GA4 TELEMETRY EVENT CONSOLE</span>
                {ga4Id ? (
                  <span className="flex items-center gap-1 bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] px-2 py-0.5 border border-green-500/20 font-bold">
                    <Wifi size={10} /> Active: {ga4Id}
                  </span>
                ) : (
                  <span className="bg-neutral-500/10 text-neutral-500 text-[10px] px-2 py-0.5 border border-neutral-500/20 font-bold">
                    Idle (No ID)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    clearLogs();
                  }}
                  className="flex items-center gap-1 text-[10px] text-neutral-500 hover:text-red-500 transition-colors font-mono cursor-pointer"
                  title="Clear Logs"
                >
                  <Trash2 size={12} /> Clear
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsConsoleVisible(false);
                  }}
                  className="flex items-center gap-1 text-[10px] text-neutral-500 hover:text-red-500 transition-colors font-mono cursor-pointer font-bold"
                  title="Hide Console"
                >
                  Hide
                </button>
                {isConsoleExpanded ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
              </div>
            </div>

            {/* Console Window */}
            {isConsoleExpanded && (
              <div className="p-4 font-mono text-xs overflow-y-auto max-h-56 h-56 bg-neutral-900 text-green-400 dark:bg-[#070707]">
                {eventLogs.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-neutral-500 dark:text-neutral-600 gap-1.5">
                    <Database size={24} />
                    <span>No events tracked yet. Browse the catalog, add products to cart, or purchase to trigger GA4 events.</span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {eventLogs.map((log) => (
                      <div key={log.id} className="border-b border-neutral-800 pb-2 last:border-b-0">
                        <div className="flex justify-between items-center text-neutral-450 dark:text-neutral-500 text-[10px]">
                          <span>Timestamp: {log.timestamp}</span>
                          <span className="bg-green-500/10 text-green-400 px-1 border border-green-500/20 font-bold">
                            [GA4] Event Tracked
                          </span>
                        </div>
                        <div className="text-white dark:text-green-300 font-bold mt-0.5">
                          event: {log.eventName}
                        </div>
                        <pre className="text-neutral-300 dark:text-neutral-450 overflow-x-auto text-[10px] bg-black/40 p-2 mt-1 whitespace-pre-wrap rounded-none">
                          {JSON.stringify(log.payload, null, 2)}
                        </pre>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </footer>
  );
};
