import React from 'react';
import { useShop } from '../context/ShopContext';
import { CheckCircle2, ShoppingBag, Truck, Calendar, Sparkles } from 'lucide-react';

export const ThankYou: React.FC = () => {
  const { orders, navigateTo } = useShop();

  // Get the most recent order or fall back to mock
  const latestOrder = orders[0] || {
    id: 'SLS-98431',
    date: new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    items: [
      {
        id: 'mock-1',
        productId: 'solus-heavyweight-hoodie',
        name: 'SOLUS Heavyweight Hoodie',
        price: 140,
        size: 'M',
        color: 'Obsidian Black',
        quantity: 1,
        image: '/images/hoodie.png'
      }
    ],
    subtotal: 140,
    discount: 0,
    shipping: 0,
    total: 140,
    shippingDetails: {
      fullName: 'David Goggins',
      email: 'discipline@solus.com',
      address: '404 Silence Boulevard',
      city: 'Concrete Gyms',
      postalCode: '10001'
    }
  };

  const disciplineQuotes = [
    {
      text: "HE WHO CONQUERS HIMSELF IS THE MIGHTIEST WARRIOR.",
      author: "Seneca"
    },
    {
      text: "MOTIVATION IS TEMPORARY. DISCIPLINE IS PERMANENT.",
      author: "SOLUS Manifesto"
    },
    {
      text: "IN THE SILENCE OF THE WORK, THE TRUE CHARACTER IS REVEALED.",
      author: "Warrior Philosophy"
    },
    {
      text: "YOU MUST BUILD A CALLOUSED MIND. REAL GROWTH STARTS WHEN YOU ESCAPE COMFORT.",
      author: "David Goggins"
    },
    {
      text: "DISCIPLINE IS THE BRIDGE BETWEEN INTENTION AND ACCOMPLISHMENT.",
      author: "Jim Rohn"
    }
  ];

  // Select a quote based on the order ID to keep it deterministic per load or order
  const quoteIndex = latestOrder.id
    ? latestOrder.id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0) % disciplineQuotes.length
    : 0;
  const quote = disciplineQuotes[quoteIndex];

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-neutral-900 dark:text-white py-16 transition-colors duration-300 text-left">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        
        {/* Success Banner */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center justify-center text-neutral-950 dark:text-white mb-2">
            <CheckCircle2 size={56} className="text-neutral-900 dark:text-white" />
          </div>
          <span className="block font-mono text-xs font-bold tracking-[0.3em] text-neutral-450 dark:text-neutral-500 uppercase">
            TRANSACTION AUTHORIZATION SUCCESSFUL
          </span>
          <h1 className="font-oswald text-3xl sm:text-5xl font-bold tracking-[0.2em] uppercase leading-none">
            ORDER SECURED
          </h1>
          <p className="font-mono text-xs font-bold text-neutral-500 dark:text-neutral-400">
            ORDER IDENTIFIER: {latestOrder.id}
          </p>
        </div>

        {/* Motivational Discipline Quote Block */}
        <div className="border-t border-b border-dashed border-neutral-300 dark:border-neutral-800 py-8 px-6 my-10 bg-neutral-50 dark:bg-[#111111]/30 text-center space-y-4">
          <div className="inline-flex text-neutral-400 dark:text-neutral-600">
            <Sparkles size={16} />
          </div>
          <h2 className="font-oswald text-base sm:text-xl font-bold tracking-widest text-neutral-900 dark:text-white uppercase max-w-2xl mx-auto leading-relaxed">
            &ldquo;{quote.text}&rdquo;
          </h2>
          <span className="block font-mono text-[10px] tracking-widest text-neutral-450 dark:text-neutral-500 uppercase">
            — {quote.author}
          </span>
        </div>

        {/* Invoice details grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          
          {/* Left Panel: Receipt List */}
          <div className="border border-neutral-200 dark:border-neutral-850 p-6">
            <h3 className="font-oswald text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-900 pb-2">
              <ShoppingBag size={14} /> Receipt Invoice
            </h3>
            
            <div className="space-y-4 mb-6">
              {latestOrder.items.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center text-xs">
                  <div className="text-left">
                    <span className="font-oswald font-bold uppercase tracking-wider block">{item.name}</span>
                    <span className="text-[10px] text-neutral-400 dark:text-neutral-500 font-mono">
                      Size: {item.size} / Qty: {item.quantity}
                    </span>
                  </div>
                  <span className="font-mono font-bold">${item.price * item.quantity}.00</span>
                </div>
              ))}
            </div>

            {/* Price Calculations */}
            <div className="border-t border-neutral-100 dark:border-neutral-900 pt-4 space-y-2 text-xs font-medium">
              <div className="flex justify-between">
                <span className="text-neutral-450 dark:text-neutral-500">Items Subtotal</span>
                <span className="font-mono">${latestOrder.subtotal}.00</span>
              </div>
              {latestOrder.discount > 0 && (
                <div className="flex justify-between text-green-600 dark:text-green-400">
                  <span>Applied Pass Discount</span>
                  <span className="font-mono">-${latestOrder.discount}.00</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-neutral-450 dark:text-neutral-500">Shipping Fees</span>
                <span className="font-mono text-green-600 dark:text-green-400 font-bold uppercase">
                  Free
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold border-t border-neutral-100 dark:border-neutral-900 pt-3 mt-1">
                <span className="uppercase tracking-widest text-xs">Grand Total</span>
                <span className="font-mono">${latestOrder.total}.00</span>
              </div>
            </div>
          </div>

          {/* Right Panel: Delivery Status */}
          <div className="border border-neutral-200 dark:border-neutral-850 p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-oswald text-xs font-bold tracking-widest uppercase mb-4 flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-900 pb-2">
                <Truck size={14} /> Logistics Protocol
              </h3>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-bold">
                    Recipient Athlete
                  </span>
                  <span className="font-medium text-neutral-800 dark:text-neutral-200 text-sm block mt-0.5">
                    {latestOrder.shippingDetails.fullName}
                  </span>
                </div>

                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-bold">
                    Delivery Destination
                  </span>
                  <span className="text-neutral-800 dark:text-neutral-200 block mt-0.5">
                    {latestOrder.shippingDetails.address}
                  </span>
                  <span className="text-neutral-800 dark:text-neutral-200 block">
                    {latestOrder.shippingDetails.city}, {latestOrder.shippingDetails.postalCode}
                  </span>
                </div>

                <div>
                  <span className="block font-mono text-[9px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-bold">
                    Electronic Contact
                  </span>
                  <span className="font-mono text-neutral-800 dark:text-neutral-200 block mt-0.5">
                    {latestOrder.shippingDetails.email}
                  </span>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-100 dark:border-neutral-900 pt-4 mt-6 flex items-center gap-2 text-[10px] text-neutral-500 dark:text-neutral-600 font-mono">
              <Calendar size={12} />
              <span>ESTIMATED DELIVERY: 2-3 BUSINESS DAYS</span>
            </div>
          </div>

        </div>

        {/* Action Button */}
        <div className="text-center pt-4">
          <button
            onClick={() => navigateTo('shop')}
            className="bg-neutral-900 dark:bg-white text-white dark:text-black px-10 py-4 font-oswald text-xs font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-opacity rounded-none cursor-pointer"
          >
            Return to Apparel Catalog
          </button>
        </div>

      </div>
    </div>
  );
};
