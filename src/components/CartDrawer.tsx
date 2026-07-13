import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Trash2, Plus, Minus, ShieldCheck, Ticket } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, onClose }) => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    navigateTo,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    trackGAEvent
  } = useShop();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState(false);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (couponDiscount / 100));
  
  // Shipping calculation (free shipping auto-applied)
  const shipping = 0; 
  const total = subtotal - discountAmount + shipping;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    
    const success = applyCoupon(couponInput);
    if (success) {
      setCouponInput('');
      setCouponError(false);
    } else {
      setCouponError(true);
      setTimeout(() => setCouponError(false), 3000);
    }
  };

  const handleCheckoutClick = () => {
    if (cart.length === 0) return;
    
    trackGAEvent('begin_checkout', {
      currency: 'USD',
      value: total,
      coupon: appliedCoupon || undefined,
      items: cart.map(item => ({
        item_id: item.productId,
        item_name: item.name,
        price: item.price,
        quantity: item.quantity,
        item_variant: `${item.color} / ${item.size}`
      }))
    });

    onClose();
    navigateTo('checkout');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/75 cursor-pointer"
          />

          {/* Drawer Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed top-0 right-0 z-50 h-full w-full max-w-md bg-white dark:bg-[#111111] text-neutral-900 dark:text-white border-l border-neutral-200 dark:border-neutral-850 shadow-2xl flex flex-col rounded-none"
          >
            {/* Header */}
            <div className="flex h-20 items-center justify-between px-6 border-b border-neutral-200 dark:border-neutral-800">
              <h2 className="font-oswald text-lg font-bold tracking-[0.2em] uppercase">
                Order Cart ({cart.reduce((acc, item) => acc + item.quantity, 0)})
              </h2>
              <button
                onClick={onClose}
                className="p-2 text-neutral-500 hover:text-neutral-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-grow overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-center">
                  <p className="font-oswald text-sm font-bold tracking-widest text-neutral-400 uppercase mb-4">
                    Your Cart is Empty
                  </p>
                  <button
                    onClick={() => {
                      onClose();
                      navigateTo('shop');
                    }}
                    className="border border-black dark:border-white px-6 py-2.5 font-oswald text-xs font-bold tracking-widest uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
                  >
                    Browse Collections
                  </button>
                </div>
              ) : (
                cart.map(item => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-neutral-100 dark:border-neutral-900 pb-5 last:border-b-0"
                  >
                    <div className="h-20 w-16 flex-shrink-0 overflow-hidden bg-neutral-100 dark:bg-neutral-900">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="flex flex-col flex-grow text-left">
                      <h4 className="font-oswald text-sm font-bold tracking-wide uppercase line-clamp-1">
                        {item.name}
                      </h4>
                      <p className="text-xs text-neutral-400 dark:text-neutral-500 mt-0.5">
                        {item.color} / {item.size}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity Counter */}
                        <div className="flex items-center border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 px-2.5 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                          >
                            <Minus size={10} />
                          </button>
                          <span className="font-mono text-xs px-2 font-bold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 px-2.5 hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                          >
                            <Plus size={10} />
                          </button>
                        </div>

                        {/* Price & Delete */}
                        <div className="flex items-center gap-4">
                          <span className="font-mono text-sm font-bold">${item.price * item.quantity}.00</span>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-neutral-400 hover:text-red-500 transition-colors cursor-pointer"
                            title="Remove item"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom Actions & Summary */}
            {cart.length > 0 && (
              <div className="border-t border-neutral-200 dark:border-neutral-800 p-6 bg-neutral-50 dark:bg-[#0D0D0D]">
                {/* Promo Code Form */}
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 px-3 py-2 text-xs uppercase tracking-wider mb-4 font-mono">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Ticket size={12} /> {appliedCoupon} (-{couponDiscount}%)
                    </span>
                    <button
                      onClick={removeCoupon}
                      className="text-green-700 dark:text-green-300 font-bold hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyCoupon} className="flex gap-2 mb-4">
                    <input
                      type="text"
                      placeholder="Discipline Code (e.g. SILENCE)"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className={`flex-grow px-3 py-2 text-xs font-mono bg-white dark:bg-neutral-900 border ${
                        couponError
                          ? 'border-red-500 text-red-500 focus:outline-none'
                          : 'border-neutral-300 dark:border-neutral-700 text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white'
                      } rounded-none`}
                    />
                    <button
                      type="submit"
                      className="bg-neutral-900 text-white dark:bg-white dark:text-black font-oswald text-xs font-bold px-4 py-2 hover:bg-neutral-800 dark:hover:bg-neutral-200 tracking-wider uppercase rounded-none cursor-pointer"
                    >
                      Apply
                    </button>
                  </form>
                )}

                {/* Subtotals */}
                <div className="space-y-2 text-sm font-medium">
                  <div className="flex justify-between">
                    <span className="text-neutral-400 dark:text-neutral-500">Order Subtotal</span>
                    <span className="font-mono text-neutral-900 dark:text-white">${subtotal}.00</span>
                  </div>
                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-green-600 dark:text-green-400">
                      <span>Discipline Discount</span>
                      <span className="font-mono">-${discountAmount}.00</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-400 dark:text-neutral-500">Shipping</span>
                    <span className="font-mono text-green-600 dark:text-green-400 uppercase text-xs font-bold">
                      {shipping === 0 ? 'Auto-Applied Free' : `$${shipping}.00`}
                    </span>
                  </div>
                  <div className="flex justify-between text-base font-bold border-t border-neutral-200 dark:border-neutral-800 pt-3 mt-1">
                    <span className="uppercase tracking-widest text-sm">Grand Total</span>
                    <span className="font-mono">${total}.00</span>
                  </div>
                </div>

                {/* Secure Checkout Button */}
                <button
                  onClick={handleCheckoutClick}
                  className="mt-6 flex w-full items-center justify-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-black py-4 font-oswald text-xs font-bold tracking-[0.2em] uppercase hover:opacity-90 transition-opacity rounded-none cursor-pointer"
                >
                  <ShieldCheck size={16} /> Secure Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
