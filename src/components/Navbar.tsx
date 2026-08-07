import React from 'react';
import { useShop } from '../context/ShopContext';
import { Moon, Sun, ShoppingBag, User, BarChart2, Heart } from 'lucide-react';

interface NavbarProps {
  onOpenCart: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCart }) => {
  const { theme, toggleTheme, cart, wishlist, activePage, navigateTo } = useShop();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-40 w-full border-b border-neutral-200 bg-white/80 backdrop-blur-md dark:border-neutral-800 dark:bg-[#0A0A0A]/85 text-neutral-900 dark:text-white transition-all duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <button
              onClick={() => navigateTo('home')}
              className="font-oswald text-2xl font-bold tracking-[0.25em] text-neutral-900 dark:text-white hover:opacity-85 transition-opacity"
            >
              SOLUS
            </button>
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex space-x-8">
            <button
              onClick={() => navigateTo('home')}
              className={`font-oswald text-sm font-medium tracking-[0.15em] uppercase hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors py-2 border-b-2 ${
                activePage === 'home' ? 'border-neutral-950 dark:border-white' : 'border-transparent'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className={`font-oswald text-sm font-medium tracking-[0.15em] uppercase hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors py-2 border-b-2 ${
                activePage === 'shop' ? 'border-neutral-950 dark:border-white' : 'border-transparent'
              }`}
            >
              Shop
            </button>
            <button
              onClick={() => navigateTo('profile')}
              className={`font-oswald text-sm font-medium tracking-[0.15em] uppercase hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors py-2 border-b-2 ${
                activePage === 'profile' ? 'border-neutral-950 dark:border-white' : 'border-transparent'
              }`}
            >
              Athlete Profile
            </button>
            <button
              onClick={() => navigateTo('admin')}
              className={`font-oswald text-sm font-medium tracking-[0.15em] uppercase hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors py-2 border-b-2 ${
                activePage === 'admin' ? 'border-neutral-950 dark:border-white' : 'border-transparent'
              }`}
            >
              Portal
            </button>
            <button
              onClick={() => navigateTo('about')}
              className={`font-oswald text-sm font-medium tracking-[0.15em] uppercase hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors py-2 border-b-2 ${
                activePage === 'about' ? 'border-neutral-950 dark:border-white' : 'border-transparent'
              }`}
            >
              About
            </button>
            <button
              onClick={() => navigateTo('contact')}
              className={`font-oswald text-sm font-medium tracking-[0.15em] uppercase hover:text-neutral-500 dark:hover:text-neutral-400 transition-colors py-2 border-b-2 ${
                activePage === 'contact' ? 'border-neutral-950 dark:border-white' : 'border-transparent'
              }`}
            >
              Contact
            </button>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-6">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Switch to Concrete Mode' : 'Switch to Silence Mode'}
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Wishlist Link */}
            <button
              onClick={() => navigateTo('profile')}
              className="relative p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
              title="View Wishlist"
            >
              <Heart size={20} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center bg-black dark:bg-white text-[9px] font-bold text-white dark:text-black rounded-none">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* User Profile Link */}
            <button
              onClick={() => navigateTo('profile')}
              className="hidden sm:inline-block p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
              title="Athlete Profile"
            >
              <User size={20} />
            </button>

            {/* Admin Link */}
            <button
              onClick={() => navigateTo('admin')}
              className="hidden sm:inline-block p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
              title="Store Manager Portal"
            >
              <BarChart2 size={20} />
            </button>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative p-2 text-neutral-600 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white transition-colors cursor-pointer"
              title="Open Cart"
            >
              <ShoppingBag size={20} />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center bg-black dark:bg-white text-[9px] font-bold text-white dark:text-black rounded-none">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};
