import React from 'react';
import { Dumbbell, Shield, Target, Zap } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-neutral-900 dark:text-white transition-colors duration-300">
      
      {/* Upper Section Split */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center text-left">
          
          {/* Brand Philosophy - Left (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <span className="font-mono text-xs font-bold tracking-[0.25em] text-neutral-450 dark:text-neutral-500 uppercase">
              SOLUS ORIGINS
            </span>
            
            <h1 className="font-oswald text-4xl sm:text-6xl font-bold tracking-[0.2em] leading-none uppercase">
              ABOUT SOLUS
            </h1>
            
            <p className="font-mono text-xs font-bold tracking-[0.15em] text-neutral-500 dark:text-neutral-400 uppercase">
              // MORE THAN A BRAND. IT'S A STANDARD.
            </p>
            
            <div className="space-y-6 text-sm text-neutral-600 dark:text-neutral-350 leading-relaxed pt-4">
              <p>
                SOLUS was born from a simple belief — the strongest battles are the ones no one sees. We create performance wear for those who train in silence, stay consistent, and let their results do the talking.
              </p>
              <p>
                Every product is designed with purpose, built with premium materials, and tested by real athletes. This is not just about looking good. It's about showing up every day, for yourself.
              </p>
            </div>
          </div>
          
          {/* Athlete back image - Right (5 cols) */}
          <div className="lg:col-span-5 aspect-[4/5] bg-neutral-100 dark:bg-neutral-900 border border-neutral-250 dark:border-neutral-850 overflow-hidden">
            <img
              src="/images/about_back.jpg"
              alt="SOLUS Athlete Training Back View"
              className="w-full h-full object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
            />
          </div>
          
        </div>
      </section>
      
      {/* Bottom Grid Features - 4 columns */}
      <section className="border-t border-neutral-200 dark:border-neutral-900 bg-neutral-55/50 dark:bg-[#111111]/15 py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
            
            {/* Pillar 1 */}
            <div className="flex gap-4">
              <div className="text-neutral-950 dark:text-white flex-shrink-0 mt-1">
                <Dumbbell size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="font-oswald text-sm font-bold tracking-widest uppercase">
                  PERFORMANCE FIRST
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Engineered for intense training and everyday performance.
                </p>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="flex gap-4">
              <div className="text-neutral-950 dark:text-white flex-shrink-0 mt-1">
                <Shield size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="font-oswald text-sm font-bold tracking-widest uppercase">
                  PREMIUM QUALITY
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  High-grade fabrics and durable craftsmanship you can trust.
                </p>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="flex gap-4">
              <div className="text-neutral-950 dark:text-white flex-shrink-0 mt-1">
                <Target size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="font-oswald text-sm font-bold tracking-widest uppercase">
                  ATHLETE FOCUSED
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  Built for athletes. Backed by real workouts, real results.
                </p>
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="flex gap-4">
              <div className="text-neutral-950 dark:text-white flex-shrink-0 mt-1">
                <Zap size={24} />
              </div>
              <div className="space-y-1">
                <h3 className="font-oswald text-sm font-bold tracking-widest uppercase">
                  BUILT IN SILENCE
                </h3>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                  We don't chase attention. We earn respect.
                </p>
              </div>
            </div>
            
          </div>
        </div>
      </section>

    </div>
  );
};
