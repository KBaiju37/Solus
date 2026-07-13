import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ArrowRight, Lock, Copy, Check } from 'lucide-react';

export const Home: React.FC = () => {
  const { navigateTo } = useShop();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyToClipboard = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const collections = [
    {
      title: 'Oversized',
      tagline: 'Structural Geometry',
      img: '/images/hoodie.png',
      filter: 'Oversized'
    },
    {
      title: 'Compression',
      tagline: 'Second-Skin Armor',
      img: '/images/compression.png',
      filter: 'Compression'
    },
    {
      title: 'Performance',
      tagline: 'Form Meets Function',
      img: '/images/joggers.png',
      filter: 'Performance'
    },
    {
      title: 'Running',
      tagline: 'Featherlight Speed',
      img: '/images/shorts.png',
      filter: 'Running'
    }
  ];

  return (
    <div className="bg-white dark:bg-[#0A0A0A] text-neutral-900 dark:text-white transition-colors duration-300">
      
      {/* Cinematic Fullscreen Hero Banner */}
      <div className="relative h-[90vh] w-full overflow-hidden bg-neutral-950">
        <img
          src="/images/hero.png"
          alt="SOLUS Warrior Athlete"
          className="absolute inset-0 h-full w-full object-cover object-center opacity-45 select-none"
        />
        
        {/* Editorial Text Overlay */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-12 md:p-24 bg-gradient-to-t from-black/80 via-black/20 to-transparent">
          <div className="max-w-3xl text-left space-y-6">
            <span className="font-mono text-xs font-bold tracking-[0.3em] text-neutral-400 uppercase">
              // SOLUS PHILOSOPHY
            </span>
            <h1 className="font-oswald text-4xl sm:text-6xl md:text-7xl font-bold tracking-[0.25em] leading-none text-white uppercase">
              BUILT IN SILENCE
            </h1>
            <p className="font-sans text-base sm:text-lg text-neutral-300 max-w-xl leading-relaxed">
              The strongest battles are the ones no one sees. Real growth happens in the quiet dark, far away from applause. You are your only competition.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <button
                onClick={() => navigateTo('shop')}
                className="bg-white text-black font-oswald text-xs font-bold tracking-[0.2em] px-8 py-4 uppercase border border-transparent hover:bg-neutral-200 transition-all flex items-center gap-3 cursor-pointer"
              >
                Enter Shop <ArrowRight size={14} />
              </button>
              <button
                onClick={() => {
                  const section = document.getElementById('philosophy');
                  section?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="border border-white text-white font-oswald text-xs font-bold tracking-[0.2em] px-8 py-4 uppercase hover:bg-white hover:text-black transition-all cursor-pointer"
              >
                Our Manifesto
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Story Editorial block */}
      <section id="philosophy" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-neutral-200 dark:border-neutral-900">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 text-left">
          <div>
            <span className="font-mono text-xs font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
              01 // THE MANIFESTO
            </span>
            <h2 className="font-oswald text-3xl sm:text-4xl font-bold tracking-[0.2em] uppercase mt-4 mb-8">
              DISCIPLINE IS PERMANENT
            </h2>
            <blockquote className="border-l-2 border-black dark:border-white pl-6 font-sans italic text-lg sm:text-xl text-neutral-600 dark:text-neutral-300 mb-6 leading-relaxed">
              &ldquo;Motivation gets you started; discipline keeps you going. Motivation is temporary—it fades when the temperature drops and the fatigue sets in. Discipline is absolute. It is the commitment made to yourself in the silence.&rdquo;
            </blockquote>
          </div>
          <div className="flex flex-col justify-center space-y-6">
            <p className="text-neutral-550 dark:text-neutral-400 leading-relaxed text-sm">
              SOLUS was born from a singular conviction: that greatness does not require a crowd. The warrior-athlete operates in quiet alignment. We reject loud colors, flashy branding, and marketing noise. Instead, we design structural, premium silhouettes made of durable double-knit cottons, high-compression meshes, and tailored technical stretch materials.
            </p>
            <p className="text-neutral-550 dark:text-neutral-400 leading-relaxed text-sm">
              Each garment is engineered as utility armor, designed to endure the test of sweat, cold, and friction. There are no gimmicks. Only focus.
            </p>
          </div>
        </div>
      </section>

      {/* Discipline Passes Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-b border-neutral-200 dark:border-neutral-900 text-left">
        <div className="mb-10">
          <span className="font-mono text-xs font-bold tracking-widest text-neutral-400 dark:text-neutral-500">
            02 // DISCIPLINE PASSES
          </span>
          <h2 className="font-oswald text-3xl font-bold tracking-[0.2em] uppercase mt-2">
            ACTIVE ENTRANCE VOUCHERS
          </h2>
          <p className="text-neutral-500 dark:text-neutral-450 text-xs mt-1">
            Click on a pass to copy the discipline code. Apply at cart checkout.
          </p>
        </div>

        {/* Coupons Horizontal Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Code 1 */}
          <div
            onClick={() => copyToClipboard('DISCIPLINE')}
            className="group relative border border-dashed border-neutral-350 bg-neutral-50/50 hover:bg-neutral-900 hover:text-white dark:border-neutral-850 dark:bg-[#111111]/45 dark:hover:bg-white dark:hover:text-black p-6 transition-all duration-300 cursor-pointer text-left flex flex-col justify-between h-40 rounded-none"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-oswald text-xs font-bold tracking-widest uppercase opacity-75">
                  10% OFF APPAREL
                </span>
                <Lock size={12} className="opacity-50" />
              </div>
              <h3 className="font-oswald text-2xl font-bold tracking-widest uppercase mt-4">
                DISCIPLINE
              </h3>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono opacity-65 pt-4 border-t border-dashed border-neutral-300 dark:border-neutral-800">
              <span>ACTIVE STATUS</span>
              <span className="flex items-center gap-1">
                {copiedCode === 'DISCIPLINE' ? (
                  <>
                    <Check size={10} /> COPIED
                  </>
                ) : (
                  <>
                    <Copy size={10} /> COPY CODE
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Code 2 */}
          <div
            onClick={() => copyToClipboard('SILENCE')}
            className="group relative border border-dashed border-neutral-350 bg-neutral-50/50 hover:bg-neutral-900 hover:text-white dark:border-neutral-850 dark:bg-[#111111]/45 dark:hover:bg-white dark:hover:text-black p-6 transition-all duration-300 cursor-pointer text-left flex flex-col justify-between h-40 rounded-none"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="font-oswald text-xs font-bold tracking-widest uppercase opacity-75">
                  20% OFF ORDERS
                </span>
                <Lock size={12} className="opacity-50" />
              </div>
              <h3 className="font-oswald text-2xl font-bold tracking-widest uppercase mt-4">
                SILENCE
              </h3>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono opacity-65 pt-4 border-t border-dashed border-neutral-300 dark:border-neutral-800">
              <span>ACTIVE STATUS</span>
              <span className="flex items-center gap-1">
                {copiedCode === 'SILENCE' ? (
                  <>
                    <Check size={10} /> COPIED
                  </>
                ) : (
                  <>
                    <Copy size={10} /> COPY CODE
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Shipping Pass */}
          <div className="border border-dashed border-neutral-300 bg-neutral-50/20 dark:border-neutral-800 dark:bg-[#111111]/20 p-6 flex flex-col justify-between h-40 rounded-none">
            <div>
              <div className="flex items-center justify-between">
                <span className="font-oswald text-xs font-bold tracking-widest uppercase opacity-75">
                  GLOBAL DISPATCH
                </span>
                <Lock size={12} className="opacity-30" />
              </div>
              <h3 className="font-oswald text-xl font-bold tracking-widest uppercase mt-4 text-neutral-500 dark:text-neutral-400">
                AUTO-APPLIED FREE SHIPPING
              </h3>
            </div>
            <div className="flex items-center justify-between text-[10px] font-mono opacity-50 pt-4 border-t border-dashed border-neutral-300 dark:border-neutral-800">
              <span>NO CODE REQUIRED</span>
              <span>SHIPS GLOBAL</span>
            </div>
          </div>

        </div>
      </section>

      {/* Core Collections Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-left">
        <div className="mb-12">
          <span className="font-mono text-xs font-bold tracking-widest text-neutral-400 dark:text-neutral-500">
            03 // GEAR CATEGORIES
          </span>
          <h2 className="font-oswald text-3xl font-bold tracking-[0.2em] uppercase mt-2">
            CORE COLLECTIONS
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.map((col) => (
            <div
              key={col.title}
              onClick={() => {
                // Navigate to shop page, and let's store search/filter logic if needed (handled in Shop page or we can set it in context)
                navigateTo('shop');
              }}
              className="group relative aspect-[3/4] w-full overflow-hidden bg-neutral-900 border border-neutral-200 dark:border-neutral-850 cursor-pointer rounded-none"
            >
              <img
                src={col.img}
                alt={col.title}
                className="h-full w-full object-cover object-center opacity-60 group-hover:opacity-40 transition-opacity duration-500"
              />
              <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                <span className="font-mono text-[9px] font-bold tracking-widest text-neutral-300 uppercase">
                  {col.tagline}
                </span>
                <h3 className="font-oswald text-xl font-bold tracking-widest text-white uppercase mt-1">
                  {col.title}
                </h3>
                <span className="mt-4 flex items-center gap-2 font-oswald text-[10px] font-bold tracking-widest text-white uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  Shop Collection <ArrowRight size={12} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
