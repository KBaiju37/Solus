import React from 'react';
import { useShop } from '../context/ShopContext';

export const Footer: React.FC = () => {
  const { navigateTo } = useShop();

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
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer">
                  Contact Us
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Support Directory */}
          <div>
            <h4 className="font-oswald text-xs font-bold tracking-[0.2em] text-neutral-800 dark:text-neutral-200 uppercase mb-4">
              Connect
            </h4>
            <ul className="space-y-2 text-xs font-mono text-neutral-500 dark:text-neutral-400">
              <li>EMAIL: support@soluswear.com</li>
              <li>PHONE: +91 98765 43210</li>
              <li>ADDRESS: Pune, Maharashtra, India</li>
            </ul>
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

    </footer>
  );
};
