import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Cell } from 'recharts';
import { Database, Plus, Minus, TrendingUp, DollarSign, Package, ShoppingCart } from 'lucide-react';

export const Admin: React.FC = () => {
  const { orders } = useShop();

  // Simulated Stock levels (initially stored in local state, synced to localStorage)
  const [stockLevels, setStockLevels] = useState<{ [key: string]: number }>(() => {
    const stored = localStorage.getItem('solus_admin_stock');
    if (stored) return JSON.parse(stored);
    
    // Default levels
    return {
      'solus-heavyweight-hoodie': 48,
      'solus-tactical-compression': 14,
      'solus-obsidian-joggers': 32,
      'solus-aerorunning-shorts': 9
    };
  });

  useEffect(() => {
    localStorage.setItem('solus_admin_stock', JSON.stringify(stockLevels));
  }, [stockLevels]);

  const updateStock = (productId: string, amount: number) => {
    setStockLevels(prev => ({
      ...prev,
      [productId]: Math.max(0, prev[productId] + amount)
    }));
  };

  // Chart Data 1: Sales History
  const salesHistoryData = [
    { month: 'Jan', revenue: 8400 },
    { month: 'Feb', revenue: 11200 },
    { month: 'Mar', revenue: 15600 },
    { month: 'Apr', revenue: 14205 },
    { month: 'May', revenue: 19800 },
    { month: 'Jun', revenue: 24500 },
    { month: 'Jul', revenue: 29000 + orders.reduce((acc, o) => acc + o.total, 0) } // Dynamic updates based on sessions!
  ];

  // Chart Data 2: Product Category Performance
  const categoryPerformanceData = [
    { category: 'Oversized', revenue: 14500 },
    { category: 'Compression', revenue: 9800 },
    { category: 'Performance', revenue: 12400 },
    { category: 'Running', revenue: 6700 }
  ];

  // Add session orders value to category data dynamically
  orders.forEach(order => {
    order.items.forEach(item => {
      const prod = products.find(p => p.id === item.productId);
      if (prod) {
        const catData = categoryPerformanceData.find(c => c.category === prod.category);
        if (catData) {
          catData.revenue += item.price * item.quantity;
        }
      }
    });
  });

  const totalSessionRevenue = orders.reduce((acc, order) => acc + order.total, 0);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-neutral-900 dark:text-white py-12 transition-colors duration-300 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-10">
          <span className="font-mono text-xs font-bold tracking-widest text-neutral-455 dark:text-neutral-500 uppercase">
            SOLUS BACKOFFICE PORTAL
          </span>
          <h1 className="font-oswald text-3xl sm:text-4xl font-bold tracking-[0.2em] uppercase mt-2">
            STORE MANAGER PANEL
          </h1>
        </div>

        {/* Top metrics dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
          
          {/* Card 1 */}
          <div className="border border-neutral-200 dark:border-neutral-850 p-6 bg-neutral-55 dark:bg-[#161616]/40">
            <div className="flex justify-between items-start text-neutral-400 dark:text-neutral-550 mb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Total Analytics Revenue</span>
              <DollarSign size={16} />
            </div>
            <h3 className="font-mono text-2xl font-bold text-neutral-900 dark:text-white">
              ${94705 + totalSessionRevenue}.00
            </h3>
            <span className="text-[10px] font-mono text-green-500 font-bold block mt-1 uppercase">
              +14.2% VS LAST QUARTER
            </span>
          </div>

          {/* Card 2 */}
          <div className="border border-neutral-200 dark:border-neutral-850 p-6 bg-neutral-55 dark:bg-[#161616]/40">
            <div className="flex justify-between items-start text-neutral-400 dark:text-neutral-550 mb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Active Orders</span>
              <ShoppingCart size={16} />
            </div>
            <h3 className="font-mono text-2xl font-bold text-neutral-900 dark:text-white">
              {482 + orders.length}
            </h3>
            <span className="text-[10px] font-mono text-green-500 font-bold block mt-1 uppercase">
              {orders.length} PLACED IN ACTIVE SESSION
            </span>
          </div>

          {/* Card 3 */}
          <div className="border border-neutral-200 dark:border-neutral-850 p-6 bg-neutral-55 dark:bg-[#161616]/40">
            <div className="flex justify-between items-start text-neutral-400 dark:text-neutral-550 mb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Total Stock Remaining</span>
              <Package size={16} />
            </div>
            <h3 className="font-mono text-2xl font-bold text-neutral-900 dark:text-white">
              {Object.values(stockLevels).reduce((acc, cur) => acc + cur, 0)} units
            </h3>
            <span className="text-[10px] font-mono text-neutral-500 block mt-1 uppercase">
              ACROSS 4 MAIN EQUIPMENT GROUPS
            </span>
          </div>

          {/* Card 4 */}
          <div className="border border-neutral-200 dark:border-neutral-850 p-6 bg-neutral-55 dark:bg-[#161616]/40">
            <div className="flex justify-between items-start text-neutral-400 dark:text-neutral-550 mb-4">
              <span className="font-mono text-[10px] uppercase tracking-widest font-bold">Active Conversion Rate</span>
              <TrendingUp size={16} />
            </div>
            <h3 className="font-mono text-2xl font-bold text-neutral-900 dark:text-white">
              3.84%
            </h3>
            <span className="text-[10px] font-mono text-neutral-500 block mt-1 uppercase">
              +0.25% DEVIATION FROM HISTORIC AVERAGE
            </span>
          </div>

        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          
          {/* Chart 1: Sales History */}
          <div className="border border-neutral-200 dark:border-neutral-850 p-6 bg-neutral-55 dark:bg-[#111111]/30">
            <h3 className="font-oswald text-xs font-bold tracking-widest uppercase mb-6 pb-2 border-b border-neutral-200 dark:border-neutral-800">
              SOLUS HISTORICAL REVENUE FLOW (USD)
            </h3>
            <div className="h-72 w-full text-xs font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesHistoryData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                  <XAxis dataKey="month" stroke="#888888" tickLine={false} />
                  <YAxis stroke="#888888" tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#161616',
                      borderColor: '#262626',
                      color: '#ffffff',
                      fontFamily: 'monospace'
                    }}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#ffffff" strokeWidth={2} dot={{ fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Chart 2: Category Revenue Performance */}
          <div className="border border-neutral-200 dark:border-neutral-850 p-6 bg-neutral-55 dark:bg-[#111111]/30">
            <h3 className="font-oswald text-xs font-bold tracking-widest uppercase mb-6 pb-2 border-b border-neutral-200 dark:border-neutral-800">
              CATEGORY REVENUE METRIC CHART (USD)
            </h3>
            <div className="h-72 w-full text-xs font-mono">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={categoryPerformanceData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#262626" />
                  <XAxis dataKey="category" stroke="#888888" tickLine={false} />
                  <YAxis stroke="#888888" tickLine={false} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#161616',
                      borderColor: '#262626',
                      color: '#ffffff',
                      fontFamily: 'monospace'
                    }}
                  />
                  <Bar dataKey="revenue" fill="#444444">
                    {categoryPerformanceData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={index % 2 === 0 ? '#8c8c8c' : '#ffffff'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

        </div>

        {/* Bottom split: Stock Adjuster & Live Orders */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Stock inventory controller (5 cols) */}
          <div className="col-span-1 lg:col-span-5 border border-neutral-200 dark:border-neutral-850 p-6 bg-neutral-50/20 dark:bg-[#161616]/30">
            <h3 className="font-oswald text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-900 pb-2">
              <Database size={14} /> LIVE STOCK ADJUSTMENT ENGINE
            </h3>
            
            <div className="space-y-4">
              {products.map(prod => {
                const stock = stockLevels[prod.id] || 0;
                return (
                  <div key={prod.id} className="flex justify-between items-center bg-white dark:bg-[#111111] p-3 border border-neutral-200 dark:border-neutral-850 text-xs">
                    <div className="text-left max-w-[200px]">
                      <span className="font-oswald font-bold uppercase tracking-wider block line-clamp-1">{prod.name}</span>
                      <span className="text-[10px] text-neutral-450 dark:text-neutral-500 font-mono">
                        CAT: {prod.category} / PRICE: ${prod.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Controls */}
                      <div className="flex items-center border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900 h-8">
                        <button
                          onClick={() => updateStock(prod.id, -1)}
                          className="h-full w-8 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <Minus size={10} />
                        </button>
                        <span className={`font-mono text-xs w-8 text-center select-none font-bold ${
                          stock <= 10 ? 'text-red-500' : 'text-neutral-900 dark:text-white'
                        }`}>{stock}</span>
                        <button
                          onClick={() => updateStock(prod.id, 1)}
                          className="h-full w-8 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                        >
                          <Plus size={10} />
                        </button>
                      </div>

                      {/* Stock alerts */}
                      <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 uppercase ${
                        stock === 0
                          ? 'bg-red-500/10 text-red-500 border border-red-500/20'
                          : stock <= 10
                          ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20'
                          : 'bg-green-500/10 text-green-550 dark:text-green-400 border border-green-500/20'
                      }`}>
                        {stock === 0 ? 'Out of Stock' : stock <= 10 ? 'Low Stock' : 'Secure'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Live Orders console list (7 cols) */}
          <div className="col-span-1 lg:col-span-7 border border-neutral-200 dark:border-neutral-850 p-6 bg-neutral-50/20 dark:bg-[#161616]/30">
            <h3 className="font-oswald text-xs font-bold tracking-widest uppercase mb-6 flex items-center gap-2 border-b border-neutral-100 dark:border-neutral-900 pb-2">
              <ShoppingCart size={14} /> LIVE TRANSACTION LOGGER ({orders.length} ACTIVE)
            </h3>

            {orders.length === 0 ? (
              <div className="py-16 text-center text-neutral-450 dark:text-neutral-500 font-mono text-xs">
                NO INCOMING PURCHASES DETECTED. SIMULATE CHECKOUT TO POPULATE LOGGER.
              </div>
            ) : (
              <div className="space-y-4 max-h-[360px] overflow-y-auto pr-1">
                {orders.map(order => (
                  <div key={order.id} className="border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-[#111111] p-4 text-xs font-mono">
                    <div className="flex justify-between items-center border-b border-neutral-100 dark:border-neutral-900 pb-2 mb-2">
                      <span className="font-bold text-neutral-900 dark:text-white">{order.id}</span>
                      <span className="text-neutral-500">{order.date}</span>
                    </div>
                    
                    <div className="space-y-1 mb-3 text-left">
                      <div className="flex justify-between">
                        <span className="text-neutral-450">Customer Email:</span>
                        <span>{order.shippingDetails.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-450">Customer Name:</span>
                        <span>{order.shippingDetails.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-neutral-450">Coupon Applied:</span>
                        <span className={order.couponUsed ? 'text-green-500 font-bold' : ''}>
                          {order.couponUsed || 'NONE'}
                        </span>
                      </div>
                    </div>

                    <div className="border-t border-neutral-100 dark:border-neutral-900 pt-2 flex justify-between items-center font-bold">
                      <span className="uppercase text-[9px] tracking-widest text-neutral-450">Invoice Total</span>
                      <span>${order.total}.00</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
};
