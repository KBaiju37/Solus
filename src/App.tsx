import React, { useState } from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { Navbar } from './components/Navbar';
import { CartDrawer } from './components/CartDrawer';
import { Footer } from './components/Footer';

// Pages
import { Home } from './pages/Home';
import { Shop } from './pages/Shop';
import { ProductDetail } from './pages/ProductDetail';
import { Checkout } from './pages/Checkout';
import { ThankYou } from './pages/ThankYou';
import { Profile } from './pages/Profile';
import { Admin } from './pages/Admin';
import { About } from './pages/About';
import { Contact } from './pages/Contact';

import './App.css'; // Muted css imports are fine

const MainAppContent: React.FC = () => {
  const { activePage } = useShop();
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Render active page view
  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return <Home />;
      case 'shop':
        return <Shop />;
      case 'product':
        return <ProductDetail />;
      case 'checkout':
        return <Checkout />;
      case 'thank-you':
        return <ThankYou />;
      case 'profile':
        return <Profile />;
      case 'admin':
        return <Admin />;
      case 'about':
        return <About />;
      case 'contact':
        return <Contact />;
      default:
        return <Home />;
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-neutral-900 dark:text-white flex flex-col font-sans transition-colors duration-300">
      
      {/* Navigation */}
      <Navbar onOpenCart={() => setIsCartOpen(true)} />

      {/* Main Page Workspace */}
      <main className="flex-grow">
        {renderActivePage()}
      </main>

      {/* Cart Slider Drawer Overlay */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Editorial Footer + Console Debugger */}
      <Footer />

    </div>
  );
};

function App() {
  return (
    <ShopProvider>
      <MainAppContent />
    </ShopProvider>
  );
}

export default App;
