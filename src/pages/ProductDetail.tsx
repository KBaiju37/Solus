import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { products } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Star, Shield, ArrowLeft, Plus, Minus, Check, Heart } from 'lucide-react';

export const ProductDetail: React.FC = () => {
  const { selectedProductId, navigateTo, addToCart, wishlist, toggleWishlist, trackGAEvent } = useShop();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  // Gallery and options state
  const [activeImage, setActiveImage] = useState(product.image);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState(product.colors[0]?.name || '');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'materials' | 'shipping'>('details');
  const [addedNotification, setAddedNotification] = useState(false);

  // Sync active image when product changes
  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedSize(product.sizes[1] || 'M');
      setSelectedColor(product.colors[0]?.name || '');
      setQuantity(1);

      // GA4 view_item event trigger
      trackGAEvent('view_item', {
        currency: 'USD',
        value: product.price,
        items: [
          {
            item_id: product.id,
            item_name: product.name,
            item_category: product.category,
            price: product.price,
            item_variant: `${product.colors[0]?.name || ''} / ${product.sizes[1] || 'M'}`
          }
        ]
      });
    }
  }, [selectedProductId, product]);

  const handleAddToCart = () => {
    addToCart(product, selectedSize, selectedColor, quantity);
    setAddedNotification(true);
    setTimeout(() => setAddedNotification(false), 3500);
  };

  // Filter related items (exclude current item)
  const relatedItems = products
    .filter(p => p.id !== product.id)
    .slice(0, 3);

  const reviews = [
    {
      author: 'Marcus V.',
      rating: 5,
      date: 'June 18, 2026',
      title: 'Indestructible structure.',
      content: 'I’ve washed this heavy hoodie 15 times now. The double-knit loopback fabric hasn’t shrunk or lost its shape at all. Holds its geometric shoulder profile like day one. This is genuine high-end design, not average sportswear.'
    },
    {
      author: 'Helena S.',
      rating: 5,
      date: 'May 04, 2026',
      title: 'Absolute premium lockdown.',
      content: 'The compression top fits like a second skin armor. Highly durable stitches and no chafing during intense deadlift sessions. The concrete color palette looks incredibly sharp in clean lighting. Highly recommended.'
    },
    {
      author: 'Devon K.',
      rating: 4,
      date: 'April 22, 2026',
      title: 'Built to last.',
      content: 'You can immediately feel the density of the ripstop stitching on these shorts. They are lightweight yet feel completely tear-proof. The waistband zipped pocket is fully waterproof and fits a pro phone easily.'
    }
  ];

  const isStarred = wishlist.includes(product.id);

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-neutral-900 dark:text-white py-12 transition-colors duration-300 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigateTo('shop')}
          className="flex items-center gap-2 text-xs font-mono text-neutral-500 hover:text-neutral-950 dark:hover:text-white mb-8 transition-colors cursor-pointer uppercase"
        >
          <ArrowLeft size={14} /> Back to Apparel Catalog
        </button>

        {/* Product Workspace Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          
          {/* Gallery - Left (5 cols) */}
          <div className="col-span-1 lg:col-span-7 space-y-4">
            <div className="aspect-[4/5] bg-neutral-100 dark:bg-[#161616] overflow-hidden border border-neutral-200 dark:border-neutral-850">
              <img
                src={activeImage}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
            </div>
            
            {/* Gallery Thumbnails */}
            <div className="flex gap-4">
              <button
                onClick={() => setActiveImage(product.image)}
                className={`w-24 aspect-[4/5] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border transition-all ${
                  activeImage === product.image ? 'border-neutral-900 dark:border-white ring-1 ring-neutral-400' : 'border-neutral-250 dark:border-neutral-800'
                }`}
              >
                <img src={product.image} className="w-full h-full object-cover" alt="" />
              </button>
              <button
                onClick={() => setActiveImage(product.hoverImage)}
                className={`w-24 aspect-[4/5] overflow-hidden bg-neutral-100 dark:bg-neutral-900 border transition-all ${
                  activeImage === product.hoverImage ? 'border-neutral-900 dark:border-white ring-1 ring-neutral-400' : 'border-neutral-250 dark:border-neutral-800'
                }`}
              >
                <img src={product.hoverImage} className="w-full h-full object-cover" alt="" />
              </button>
            </div>
          </div>

          {/* Details - Right (5 cols) */}
          <div className="col-span-1 lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Category */}
              <span className="font-mono text-xs font-bold tracking-widest text-neutral-400 dark:text-neutral-500 uppercase">
                SOLUS // {product.category}
              </span>

              {/* Title & Wishlist */}
              <div className="flex items-start justify-between mt-2 mb-4">
                <h1 className="font-oswald text-2xl sm:text-3xl font-bold tracking-wider uppercase text-neutral-900 dark:text-white">
                  {product.name}
                </h1>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className="p-2 border border-neutral-200 dark:border-neutral-850 text-neutral-900 dark:text-white hover:bg-neutral-900 dark:hover:bg-white hover:text-white dark:hover:text-black transition-all rounded-none cursor-pointer"
                >
                  <Heart size={16} fill={isStarred ? "currentColor" : "none"} className={isStarred ? "text-red-500" : ""} />
                </button>
              </div>

              {/* Ratings */}
              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center text-amber-500">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < Math.floor(product.rating) ? 'currentColor' : 'none'}
                      className={i < Math.floor(product.rating) ? 'text-amber-500' : 'text-neutral-300 dark:text-neutral-700'}
                    />
                  ))}
                </div>
                <span className="font-mono text-xs font-bold text-neutral-850 dark:text-neutral-200">
                  {product.rating} / 5.0
                </span>
                <span className="text-xs text-neutral-450 dark:text-neutral-500">
                  ({product.reviewCount} verified logs)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="font-mono text-2xl font-bold text-neutral-900 dark:text-white">
                  ${product.price}.00
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-sm text-neutral-400 dark:text-neutral-600 line-through">
                    ${product.originalPrice}.00
                  </span>
                )}
              </div>

              {/* Description */}
              <p className="text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Customizer options */}
              <div className="space-y-6 pt-6 border-t border-neutral-150 dark:border-neutral-850 mb-8">
                {/* Colors Selection */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-450 dark:text-neutral-500 font-bold mb-2">
                    Fabric Finish: {selectedColor}
                  </label>
                  <div className="flex gap-3">
                    {product.colors.map(color => (
                      <button
                        key={color.name}
                        onClick={() => setSelectedColor(color.name)}
                        className={`px-3 py-1.5 text-xs font-medium border flex items-center gap-2 cursor-pointer transition-all ${
                          selectedColor === color.name
                            ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black font-bold'
                            : 'border-neutral-200 dark:border-neutral-850 hover:border-neutral-400 dark:hover:border-neutral-600'
                        }`}
                      >
                        <span className={`w-3.5 h-3.5 border border-black/10 ${color.class}`} />
                        {color.name}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sizing Selection */}
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-450 dark:text-neutral-500 font-bold mb-2">
                    Apparel Size: {selectedSize}
                  </label>
                  <div className="flex gap-2">
                    {product.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`w-12 h-10 font-mono text-xs border flex items-center justify-center cursor-pointer transition-all ${
                          selectedSize === size
                            ? 'border-neutral-900 bg-neutral-900 text-white dark:border-white dark:bg-white dark:text-black font-bold'
                            : 'border-neutral-200 dark:border-neutral-850 hover:border-neutral-400 dark:hover:border-neutral-600'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="space-y-4 pt-6 border-t border-neutral-150 dark:border-neutral-850 mt-auto">
              
              {/* Quantity incrementer */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-neutral-200 dark:border-neutral-850 bg-neutral-50 dark:bg-neutral-900 h-12">
                  <button
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="h-full w-12 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <Minus size={12} />
                  </button>
                  <span className="font-mono text-sm font-bold w-12 text-center select-none">{quantity}</span>
                  <button
                    onClick={() => setQuantity(prev => prev + 1)}
                    className="h-full w-12 flex items-center justify-center hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                  >
                    <Plus size={12} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-grow bg-neutral-900 dark:bg-white text-white dark:text-black h-12 font-oswald text-xs font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-opacity flex items-center justify-center gap-2 rounded-none cursor-pointer"
                >
                  Acquire Gear
                </button>
              </div>

              {/* Added to cart notification toast */}
              {addedNotification && (
                <div className="bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 px-4 py-3 text-xs uppercase tracking-wider font-mono flex items-center gap-2">
                  <Check size={14} /> Added to order cart ({quantity} {product.name} - size {selectedSize}).
                </div>
              )}

              {/* Quality Shield */}
              <div className="flex items-center gap-3 text-xs text-neutral-450 dark:text-neutral-500 font-mono mt-4">
                <Shield size={16} />
                <span>SOLUS LIFETIME STITCH WARRANTY ACTIVATED</span>
              </div>
            </div>

          </div>
        </div>

        {/* Spec Tabs & Accordions */}
        <div className="border-t border-neutral-200 dark:border-neutral-900 pt-12 mb-20">
          <div className="flex gap-8 border-b border-neutral-100 dark:border-neutral-900 pb-4 mb-6">
            {(['details', 'materials', 'shipping'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`font-oswald text-xs font-bold tracking-[0.2em] uppercase transition-colors cursor-pointer border-b-2 pb-2 -mb-5 ${
                  activeTab === tab ? 'border-neutral-950 dark:border-white text-neutral-905 dark:text-white' : 'border-transparent text-neutral-450 dark:text-neutral-500 hover:text-neutral-900 dark:hover:text-white'
                }`}
              >
                {tab === 'details' ? 'Specifications' : tab === 'materials' ? 'Material Details' : 'Shipment Protocols'}
              </button>
            ))}
          </div>

          <div className="min-h-32 text-sm text-neutral-550 dark:text-neutral-400 leading-relaxed max-w-3xl">
            {activeTab === 'details' && (
              <ul className="list-disc list-inside space-y-2">
                {product.details.map((detail, idx) => (
                  <li key={idx}>{detail}</li>
                ))}
              </ul>
            )}
            {activeTab === 'materials' && (
              <p>{product.materials}</p>
            )}
            {activeTab === 'shipping' && (
              <p>{product.shipping}</p>
            )}
          </div>
        </div>

        {/* Verified reviews */}
        <div className="border-t border-neutral-200 dark:border-neutral-900 pt-12 mb-20">
          <h2 className="font-oswald text-xl font-bold tracking-widest uppercase mb-8">
            DURABILITY LOGS ({reviews.length})
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="border border-neutral-200 dark:border-neutral-850 p-6 bg-neutral-50/50 dark:bg-[#111111]/30 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono text-xs font-bold text-neutral-850 dark:text-white uppercase">
                      {rev.author}
                    </span>
                    <span className="text-[10px] text-neutral-450 dark:text-neutral-500">
                      {rev.date}
                    </span>
                  </div>
                  <div className="flex items-center text-amber-500 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={10} fill={i < rev.rating ? 'currentColor' : 'none'} />
                    ))}
                  </div>
                  <h4 className="font-oswald text-xs font-bold tracking-wider uppercase mb-2">
                    &ldquo;{rev.title}&rdquo;
                  </h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-relaxed">
                    {rev.content}
                  </p>
                </div>
                <div className="text-[10px] text-neutral-400 dark:text-neutral-500 border-t border-neutral-200 dark:border-neutral-850 pt-4 mt-6 uppercase tracking-wider font-mono">
                  VERIFIED STRENGTH CHECK // PASSED
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Related items */}
        <div className="border-t border-neutral-200 dark:border-neutral-900 pt-12">
          <h2 className="font-oswald text-xl font-bold tracking-widest uppercase mb-8">
            RELATED INSTRUMENTS
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedItems.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
