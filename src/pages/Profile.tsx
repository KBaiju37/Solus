import React from 'react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { Heart, ShoppingBag, Award, ShieldAlert, Sparkles, MapPin } from 'lucide-react';

export const Profile: React.FC = () => {
  const { orders, wishlist, navigateTo } = useShop();

  // Find wishlist products
  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  // Default stats for David Goggins theme
  const athleteStats = {
    name: 'DAVID GOGGINS',
    tier: 'WARRIOR CLASS // ELITE',
    status: 'ACTIVE TRAINING',
    location: 'SANS COMFORT ZONE',
    completedSessions: 42,
    disciplineScore: 98
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-neutral-900 dark:text-white py-12 transition-colors duration-300 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Profile Header */}
        <div className="mb-10">
          <span className="font-mono text-xs font-bold tracking-widest text-neutral-450 dark:text-neutral-500 uppercase">
            SOLUS ATHLETE LOGS
          </span>
          <h1 className="font-oswald text-3xl sm:text-4xl font-bold tracking-[0.2em] uppercase mt-2">
            ATHLETE PROFILE
          </h1>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left panel: Athlete Card (4 cols) */}
          <div className="col-span-1 lg:col-span-4 space-y-6">
            <div className="border border-neutral-200 dark:border-neutral-850 p-6 bg-neutral-50/50 dark:bg-[#111111]/30">
              
              {/* Profile Bio */}
              <div className="flex flex-col items-center text-center pb-6 border-b border-neutral-200 dark:border-neutral-800">
                <div className="w-20 h-20 bg-neutral-900 dark:bg-white text-white dark:text-black flex items-center justify-center font-oswald font-bold text-2xl tracking-widest border border-neutral-300 dark:border-neutral-700 mb-4 select-none">
                  {athleteStats.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h2 className="font-oswald text-base font-bold tracking-widest uppercase text-neutral-905 dark:text-white">
                  {athleteStats.name}
                </h2>
                <div className="mt-1 flex items-center gap-1.5 text-[10px] font-mono text-neutral-450 dark:text-neutral-550">
                  <Award size={12} />
                  <span>{athleteStats.tier}</span>
                </div>
                <div className="mt-3 flex items-center gap-1 text-[10px] font-mono text-neutral-500">
                  <MapPin size={10} />
                  <span>{athleteStats.location}</span>
                </div>
              </div>

              {/* Training Logs */}
              <div className="pt-6 space-y-4 font-mono text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-450 dark:text-neutral-550 uppercase">TRAINING STATUS</span>
                  <span className="text-green-500 font-bold uppercase flex items-center gap-1">
                    <Sparkles size={10} /> {athleteStats.status}
                  </span>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-neutral-450 dark:text-neutral-550 uppercase">DISCIPLINE SCORE</span>
                  <span className="font-bold text-neutral-900 dark:text-white">{athleteStats.disciplineScore}%</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-neutral-450 dark:text-neutral-550 uppercase">COMPLETED SESSIONS</span>
                  <span className="font-bold text-neutral-900 dark:text-white">{athleteStats.completedSessions}</span>
                </div>

                {/* Progress bar */}
                <div className="space-y-1.5 pt-2">
                  <div className="flex justify-between text-[10px] text-neutral-400 dark:text-neutral-600">
                    <span>PROGRESS TO NEXT TIER</span>
                    <span>91%</span>
                  </div>
                  <div className="w-full bg-neutral-200 dark:bg-neutral-800 h-1 rounded-none overflow-hidden">
                    <div className="bg-neutral-900 dark:bg-white h-full" style={{ width: '91%' }} />
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* Right Panel: Orders & Wishlists (8 cols) */}
          <div className="col-span-1 lg:col-span-8 space-y-8">
            
            {/* Wishlist Section */}
            <div className="border border-neutral-200 dark:border-neutral-850 p-6 bg-neutral-50/20 dark:bg-[#161616]/30">
              <h3 className="font-oswald text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-900 pb-2">
                <Heart size={14} className="text-red-500" /> STARRED GEAR ({wishlistProducts.length})
              </h3>

              {wishlistProducts.length === 0 ? (
                <div className="py-6 text-center text-neutral-450 dark:text-neutral-500 font-mono text-xs">
                  NO STARRED EQUIPMENT DETECTED. VISIT THE CATALOGUE.
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {wishlistProducts.map(p => (
                    <div
                      key={p.id}
                      onClick={() => navigateTo('product', p.id)}
                      className="group flex flex-col border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 cursor-pointer overflow-hidden transition-all duration-300"
                    >
                      <div className="aspect-[4/5] bg-neutral-100 dark:bg-[#161616] overflow-hidden">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-3">
                        <span className="font-oswald font-bold text-xs uppercase tracking-wider block line-clamp-1">
                          {p.name}
                        </span>
                        <span className="font-mono text-xs font-bold mt-1 block">
                          ${p.price}.00
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Order History Section */}
            <div className="border border-neutral-200 dark:border-neutral-850 p-6 bg-neutral-50/20 dark:bg-[#161616]/30">
              <h3 className="font-oswald text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-900 pb-2">
                <ShoppingBag size={14} /> ACQUISITION RECORD ({orders.length})
              </h3>

              {orders.length === 0 ? (
                <div className="py-10 text-center flex flex-col items-center justify-center gap-3">
                  <ShieldAlert size={24} className="text-neutral-400 dark:text-neutral-600" />
                  <p className="font-mono text-xs text-neutral-450 dark:text-neutral-500 uppercase">
                    NO ACQUISITION INVOICES DETECTED.
                  </p>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="mt-2 border border-black dark:border-white px-5 py-2 font-oswald text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
                  >
                    Open Shop Flow
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map(order => (
                    <div
                      key={order.id}
                      className="border border-neutral-200 dark:border-neutral-800 p-4 bg-white dark:bg-[#111111]/70 space-y-3"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-xs font-mono border-b border-neutral-100 dark:border-neutral-900 pb-2">
                        <div>
                          <span className="font-bold text-neutral-900 dark:text-white">{order.id}</span>
                          <span className="text-neutral-400 dark:text-neutral-600 ml-3">{order.date}</span>
                        </div>
                        <div className="mt-1 sm:mt-0">
                          <span className="bg-neutral-900 text-white dark:bg-white dark:text-black font-bold px-2 py-0.5 text-[9px] uppercase tracking-wider">
                            STATUS: PREPARING PROTOCOL
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        {order.items.map((item, idx) => (
                          <div key={idx} className="flex justify-between items-center text-xs">
                            <span className="text-neutral-600 dark:text-neutral-450">
                              {item.name} ({item.color} / {item.size}) x{item.quantity}
                            </span>
                            <span className="font-mono text-neutral-900 dark:text-white">
                              ${item.price * item.quantity}.00
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="flex justify-between text-xs font-bold pt-2 border-t border-neutral-100 dark:border-neutral-900">
                        <span className="uppercase text-[10px] tracking-wider text-neutral-450 dark:text-neutral-500 font-bold">
                          Grand Total Amount
                        </span>
                        <span className="font-mono">${order.total}.00</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
