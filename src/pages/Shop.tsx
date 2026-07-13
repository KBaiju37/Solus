import React, { useState } from 'react';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';

export const Shop: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = [
    { name: 'All', label: '📦 All Gear' },
    { name: 'Oversized', label: '🧥 Oversized' },
    { name: 'Compression', label: '🧬 Compression' },
    { name: 'Performance', label: '🏋️ Performance' },
    { name: 'Running', label: '🏃 Running' }
  ];

  // Filters calculation
  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-neutral-900 dark:text-white py-12 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-left mb-12">
          <span className="font-mono text-xs font-bold tracking-widest text-neutral-450 dark:text-neutral-500 uppercase">
            SOLUS APP DESIGN / CATALOGUE
          </span>
          <h1 className="font-oswald text-3xl sm:text-5xl font-bold tracking-[0.2em] uppercase mt-2">
            ATHLETE EQUIPMENT
          </h1>
          <p className="text-neutral-500 dark:text-neutral-400 text-sm max-w-md mt-2 leading-relaxed">
            Minimal aesthetics. Maximum endurance. Filter gear specifically designed for your training focus.
          </p>
        </div>

        {/* Filter Toolbar */}
        <div className="space-y-6 mb-12">
          
          {/* Category Navigation Pills */}
          <div className="flex flex-wrap gap-2 border-b border-neutral-100 dark:border-neutral-900 pb-6">
            {categories.map((cat) => (
              <button
                key={cat.name}
                onClick={() => setSelectedCategory(cat.name)}
                className={`px-5 py-2.5 font-oswald text-xs font-bold tracking-wider uppercase transition-all duration-300 rounded-none cursor-pointer border ${
                  selectedCategory === cat.name
                    ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-black dark:border-white'
                    : 'bg-transparent text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            <div className="relative flex-grow max-w-md">
              <span className="absolute inset-y-0 left-3 flex items-center text-neutral-400 pointer-events-none">
                <Search size={16} />
              </span>
              <input
                type="text"
                placeholder="Search gear (e.g. hoodie, compression, ripstop)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 text-sm font-sans bg-neutral-50 dark:bg-[#161616] border border-neutral-200 dark:border-neutral-800 focus:outline-none focus:border-black dark:focus:border-white text-neutral-900 dark:text-white rounded-none transition-colors"
              />
            </div>
            
            <div className="flex items-center gap-2 text-xs font-mono text-neutral-450 dark:text-neutral-500 text-left">
              <SlidersHorizontal size={14} />
              <span>SHOWING {filteredProducts.length} OF {products.length} INSTRUMENTS</span>
            </div>
          </div>

        </div>

        {/* Product Catalog Grid */}
        {filteredProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-neutral-200 dark:border-neutral-800">
            <h3 className="font-oswald text-base font-bold tracking-widest uppercase text-neutral-400 mb-2">
              No Equipment Matches Search
            </h3>
            <p className="text-xs text-neutral-550 dark:text-neutral-500 max-w-xs">
              Discipline is quiet, but search query is empty. Try using simple terms like "hoodie" or changing collections.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-6 border border-black dark:border-white px-6 py-2 font-oswald text-xs font-bold tracking-wider uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
