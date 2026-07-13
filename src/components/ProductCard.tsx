import React, { useState } from 'react';
import type { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Star, Plus, Minus, Eye } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { cart, addToCart, updateQuantity, wishlist, toggleWishlist, navigateTo } = useShop();
  
  // Local card configuration state
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[1] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || '');
  const [isHovered, setIsHovered] = useState(false);

  // Check if this specific size and color is in the cart
  const cartItemId = `${product.id}-${selectedSize}-${selectedColor.replace(/\s+/g, '-').toLowerCase()}`;
  const cartItem = cart.find(item => item.id === cartItemId);
  const isInCart = !!cartItem;
  const quantity = cartItem ? cartItem.quantity : 0;

  const isStarred = wishlist.includes(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product, selectedSize, selectedColor, 1);
  };

  const handleIncrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(cartItemId, quantity + 1);
  };

  const handleDecrement = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(cartItemId, quantity - 1);
  };

  const handleCardClick = () => {
    navigateTo('product', product.id);
  };

  return (
    <div
      className="group relative flex flex-col border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-[#161616] overflow-hidden text-left transition-all duration-300 rounded-none cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Product Image Area */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <img
          src={isHovered ? product.hoverImage : product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-out scale-100 group-hover:scale-105"
        />
        
        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-4 left-4 bg-black text-white dark:bg-white dark:text-black font-oswald text-xs font-bold tracking-wider px-2 py-1 uppercase rounded-none">
            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
          </div>
        )}

        {/* Wishlist Trigger */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-[#0A0A0A]/85 border border-neutral-200 dark:border-neutral-800 text-neutral-800 dark:text-white hover:bg-neutral-900 hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300 rounded-none z-10"
        >
          <Heart size={16} fill={isStarred ? "currentColor" : "none"} className={isStarred ? "text-red-500" : ""} />
        </button>

        {/* Quick View Overlay (Visual Cue) */}
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="font-oswald text-xs font-bold tracking-[0.2em] text-white bg-black/80 px-4 py-2 uppercase flex items-center gap-2 border border-neutral-700">
            <Eye size={14} /> View Details
          </span>
        </div>
      </div>

      {/* Details Area */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Rating and Reviews */}
        <div className="flex items-center gap-1.5 text-xs text-neutral-500 dark:text-neutral-400 mb-2">
          <div className="flex items-center text-amber-500">
            <Star size={12} fill="currentColor" />
          </div>
          <span className="font-medium text-neutral-800 dark:text-neutral-200">{product.rating}</span>
          <span>({product.reviewCount})</span>
        </div>

        {/* Product Title */}
        <h3 className="font-oswald text-base font-semibold tracking-wider text-neutral-900 dark:text-white uppercase mb-1 line-clamp-1">
          {product.name}
        </h3>

        {/* Prices */}
        <div className="flex items-baseline gap-2 mb-3">
          <span className="font-mono text-sm font-bold text-neutral-900 dark:text-white">
            ${product.price}.00
          </span>
          {product.originalPrice && (
            <span className="font-mono text-xs text-neutral-400 dark:text-neutral-600 line-through">
              ${product.originalPrice}.00
            </span>
          )}
        </div>

        {/* Product Customizer (Visible always or on hover for elegance) */}
        <div className="space-y-3 pt-3 border-t border-neutral-100 dark:border-neutral-800 mt-auto">
          {/* Colors */}
          <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-medium">Color</span>
            <div className="flex gap-1.5">
              {product.colors.map(color => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color.name)}
                  className={`w-3.5 h-3.5 border transition-all ${
                    selectedColor === color.name
                      ? 'border-neutral-900 scale-110 ring-1 ring-neutral-400 dark:border-white dark:ring-neutral-600'
                      : 'border-transparent hover:scale-105'
                  } ${color.class}`}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Sizes */}
          <div className="flex items-center justify-between" onClick={(e) => e.stopPropagation()}>
            <span className="text-[10px] uppercase tracking-wider text-neutral-400 dark:text-neutral-500 font-medium">Size</span>
            <div className="flex gap-1">
              {product.sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`px-1.5 py-0.5 text-[10px] font-mono border transition-all ${
                    selectedSize === size
                      ? 'bg-neutral-900 text-white border-neutral-900 dark:bg-white dark:text-black dark:border-white font-bold'
                      : 'bg-transparent text-neutral-600 dark:text-neutral-400 border-neutral-200 dark:border-neutral-800 hover:border-neutral-400 dark:hover:border-neutral-600'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Dynamic Quick Add Button / Counter */}
          <div onClick={(e) => e.stopPropagation()} className="pt-1">
            {isInCart ? (
              <div className="flex h-10 w-full items-center justify-between bg-neutral-900 text-white dark:bg-white dark:text-black font-mono text-sm border border-transparent">
                <button
                  onClick={handleDecrement}
                  className="flex h-full w-12 items-center justify-center hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  <Minus size={14} />
                </button>
                <span className="font-bold">{quantity}</span>
                <button
                  onClick={handleIncrement}
                  className="flex h-full w-12 items-center justify-center hover:bg-neutral-800 dark:hover:bg-neutral-200 transition-colors"
                >
                  <Plus size={14} />
                </button>
              </div>
            ) : (
              <button
                onClick={handleAdd}
                className="flex h-10 w-full items-center justify-center gap-2 border border-neutral-900 text-neutral-900 hover:bg-neutral-900 hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black font-oswald text-xs font-bold tracking-widest uppercase transition-all duration-300"
              >
                <Plus size={14} /> Add To Order
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
