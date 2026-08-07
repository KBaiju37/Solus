import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, CartItem, Order, GAEventLog } from '../types';

interface ShopContextType {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  cart: CartItem[];
  addToCart: (product: Product, size: string, color: string, qty?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  orders: Order[];
  addOrder: (order: Order) => void;
  
  // Custom router state
  activePage: 'home' | 'shop' | 'product' | 'checkout' | 'thank-you' | 'profile' | 'admin' | 'about' | 'contact';
  selectedProductId: string | null;
  navigateTo: (page: 'home' | 'shop' | 'product' | 'checkout' | 'thank-you' | 'profile' | 'admin' | 'about' | 'contact', productId?: string | null) => void;
  
  // Coupons
  appliedCoupon: string | null;
  couponDiscount: number; // percentage (e.g. 10 or 20)
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  
  // GA4
  ga4Id: string;
  setGa4Id: (id: string) => void;
  eventLogs: GAEventLog[];
  clearLogs: () => void;
  trackGAEvent: (eventName: string, payload: any) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
  }
}

let globalLastTrackedPath = '';

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load initial states from localStorage
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    const stored = localStorage.getItem('solus_theme');
    return (stored === 'light' ? 'light' : 'dark') as 'dark' | 'light';
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const stored = localStorage.getItem('solus_cart');
    return stored ? JSON.parse(stored) : [];
  });

  const [wishlist, setWishlist] = useState<string[]>(() => {
    const stored = localStorage.getItem('solus_wishlist');
    return stored ? JSON.parse(stored) : [];
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const stored = localStorage.getItem('solus_orders');
    return stored ? JSON.parse(stored) : [];
  });

  const [ga4Id, setGa4IdState] = useState<string>(() => {
    return localStorage.getItem('solus_ga4_id') || 'G-N41ZLSTMTV';
  });

  const [eventLogs, setEventLogs] = useState<GAEventLog[]>([]);

  // Simple SPA Route State
  const [activePage, setActivePage] = useState<'home' | 'shop' | 'product' | 'checkout' | 'thank-you' | 'profile' | 'admin' | 'about' | 'contact'>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  // Coupon state
  const [appliedCoupon, setAppliedCoupon] = useState<string | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('solus_theme', theme);
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('solus_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('solus_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('solus_orders', JSON.stringify(orders));
  }, [orders]);

  // Inject/Update GA4 script
  useEffect(() => {
    if (!ga4Id) return;
    
    // Remove previous scripts if existing
    const prevScript = document.getElementById('ga4-tag');
    const prevConfig = document.getElementById('ga4-config');
    if (prevScript) prevScript.remove();
    if (prevConfig) prevConfig.remove();

    // Create script Gtag
    const script = document.createElement('script');
    script.id = 'ga4-tag';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${ga4Id}`;
    document.head.appendChild(script);

    // Config gtag
    const configScript = document.createElement('script');
    configScript.id = 'ga4-config';
    configScript.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      window.gtag = function(){dataLayer.push(arguments);}
      window.gtag('js', new Date());
      window.gtag('config', '${ga4Id}');
    `;
    document.head.appendChild(configScript);
  }, [ga4Id]);

  const setGa4Id = (id: string) => {
    localStorage.setItem('solus_ga4_id', id);
    setGa4IdState(id);
    trackGAEvent('configure_ga4', { measurement_id: id });
  };

  // Telemetry track function
  const trackGAEvent = (eventName: string, payload: any) => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog: GAEventLog = {
      id: Math.random().toString(36).substring(2, 9),
      timestamp,
      eventName,
      payload
    };

    setEventLogs(prev => [newLog, ...prev]);
    console.log(`[GA4] Event Tracked: ${eventName}`, payload);

    if (window.gtag) {
      window.gtag('event', eventName, payload);
    }
  };

  // Listen to active page navigation and trigger GA4 page view
  useEffect(() => {
    let pagePath = `/${activePage}`;
    if (activePage === 'product' && selectedProductId) {
      pagePath += `/${selectedProductId}`;
    }

    if (globalLastTrackedPath === pagePath) {
      return;
    }
    globalLastTrackedPath = pagePath;

    trackGAEvent('page_view', {
      page_title: `SOLUS | ${activePage.toUpperCase()}`,
      page_path: pagePath,
      page_location: window.location.origin + pagePath
    });
    
    // Scroll window to top on page navigation
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activePage, selectedProductId]);

  // Actions
  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const navigateTo = (page: 'home' | 'shop' | 'product' | 'checkout' | 'thank-you' | 'profile' | 'admin' | 'about' | 'contact', productId: string | null = null) => {
    setActivePage(page);
    setSelectedProductId(productId);
  };

  const addToCart = (product: Product, size: string, color: string, qty = 1) => {
    const itemId = `${product.id}-${size}-${color.replace(/\s+/g, '-').toLowerCase()}`;
    
    setCart(prev => {
      const existing = prev.find(item => item.id === itemId);
      if (existing) {
        const updated = prev.map(item =>
          item.id === itemId ? { ...item, quantity: item.quantity + qty } : item
        );
        return updated;
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          name: product.name,
          price: product.price,
          size,
          color,
          quantity: qty,
          image: product.image
        }
      ];
    });

    trackGAEvent('add_to_cart', {
      currency: 'USD',
      value: product.price * qty,
      items: [
        {
          item_id: product.id,
          item_name: product.name,
          item_category: product.category,
          price: product.price,
          quantity: qty,
          item_variant: `${color} / ${size}`
        }
      ]
    });
  };

  const removeFromCart = (itemId: string) => {
    const item = cart.find(i => i.id === itemId);
    if (!item) return;

    setCart(prev => prev.filter(i => i.id !== itemId));

    trackGAEvent('remove_from_cart', {
      currency: 'USD',
      value: item.price * item.quantity,
      items: [
        {
          item_id: item.productId,
          item_name: item.name,
          price: item.price,
          quantity: item.quantity,
          item_variant: `${item.color} / ${item.size}`
        }
      ]
    });
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const item = cart.find(i => i.id === itemId);
    const oldQty = item ? item.quantity : 0;
    const diff = quantity - oldQty;

    setCart(prev =>
      prev.map(i => (i.id === itemId ? { ...i, quantity } : i))
    );

    if (item && diff !== 0) {
      if (diff > 0) {
        trackGAEvent('add_to_cart', {
          currency: 'USD',
          value: item.price * diff,
          items: [{ item_id: item.productId, item_name: item.name, price: item.price, quantity: diff }]
        });
      } else {
        trackGAEvent('remove_from_cart', {
          currency: 'USD',
          value: item.price * Math.abs(diff),
          items: [{ item_id: item.productId, item_name: item.name, price: item.price, quantity: Math.abs(diff) }]
        });
      }
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const isStarred = prev.includes(productId);
      if (isStarred) {
        trackGAEvent('remove_from_wishlist', { item_id: productId });
        return prev.filter(id => id !== productId);
      } else {
        trackGAEvent('add_to_wishlist', { item_id: productId });
        return [...prev, productId];
      }
    });
  };

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const applyCoupon = (code: string): boolean => {
    const formatted = code.toUpperCase().trim();
    if (formatted === 'DISCIPLINE') {
      setAppliedCoupon('DISCIPLINE');
      setCouponDiscount(10);
      trackGAEvent('apply_promotion', { promotion_id: 'DISCIPLINE', discount_percent: 10 });
      return true;
    } else if (formatted === 'SILENCE') {
      setAppliedCoupon('SILENCE');
      setCouponDiscount(20);
      trackGAEvent('apply_promotion', { promotion_id: 'SILENCE', discount_percent: 20 });
      return true;
    }
    return false;
  };

  const removeCoupon = () => {
    if (appliedCoupon) {
      trackGAEvent('remove_promotion', { promotion_id: appliedCoupon });
    }
    setAppliedCoupon(null);
    setCouponDiscount(0);
  };

  const clearLogs = () => {
    setEventLogs([]);
  };

  return (
    <ShopContext.Provider
      value={{
        theme,
        toggleTheme,
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        wishlist,
        toggleWishlist,
        orders,
        addOrder,
        activePage,
        selectedProductId,
        navigateTo,
        appliedCoupon,
        couponDiscount,
        applyCoupon,
        removeCoupon,
        ga4Id,
        setGa4Id,
        eventLogs,
        clearLogs,
        trackGAEvent
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (context === undefined) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
