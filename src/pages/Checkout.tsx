import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ShieldCheck, ArrowLeft, Ticket, CreditCard, Lock, Loader2, Info } from 'lucide-react';

export const Checkout: React.FC = () => {
  const {
    cart,
    clearCart,
    navigateTo,
    appliedCoupon,
    couponDiscount,
    applyCoupon,
    removeCoupon,
    addOrder,
    trackGAEvent
  } = useShop();

  // Form Fields
  const [shippingDetails, setShippingDetails] = useState({
    fullName: 'David Goggins',
    email: 'discipline@solus.com',
    address: '404 Silence Boulevard',
    city: 'Concrete Gyms',
    postalCode: '10001'
  });

  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '4111 2222 3333 4444',
    expiry: '12/29',
    cvv: '000',
    cardName: 'DAVID GOGGINS'
  });

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState(false);

  // Bank verification simulation
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStep, setVerificationStep] = useState(0);

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = Math.round(subtotal * (couponDiscount / 100));
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

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    // Start verification
    setIsVerifying(true);
    setVerificationStep(1);

    // Step 1: Encrypting
    setTimeout(() => {
      setVerificationStep(2);
      // Step 2: Contacting payment networks
      setTimeout(() => {
        setVerificationStep(3);
        // Step 3: Bank approval received
        setTimeout(() => {
          setVerificationStep(4);
          // Step 4: Finalizing order
          setTimeout(() => {
            const orderId = 'SLS-' + Math.floor(100000 + Math.random() * 90000);
            const newOrder = {
              id: orderId,
              date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              }),
              items: [...cart],
              subtotal,
              discount: discountAmount,
              shipping,
              total,
              couponUsed: appliedCoupon || undefined,
              shippingDetails
            };

            // 1. Add order to context
            addOrder(newOrder);

            // 2. Track purchase event in GA4
            trackGAEvent('purchase', {
              transaction_id: orderId,
              value: total,
              currency: 'USD',
              coupon: appliedCoupon || undefined,
              shipping: shipping,
              items: cart.map(item => ({
                item_id: item.productId,
                item_name: item.name,
                price: item.price,
                quantity: item.quantity,
                item_variant: `${item.color} / ${item.size}`
              }))
            });

            // 3. Clear cart
            clearCart();

            // 4. Navigate to success page
            setIsVerifying(false);
            navigateTo('thank-you');
          }, 800);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-[#0A0A0A] text-neutral-900 dark:text-white">
        <h2 className="font-oswald text-2xl font-bold tracking-widest uppercase mb-4 text-neutral-450">
          No Pending Orders
        </h2>
        <p className="text-xs text-neutral-500 max-w-xs mb-8">
          Your order list is empty. Add apparel to proceed to secure checkout.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="border border-black dark:border-white px-8 py-3 font-oswald text-xs font-bold tracking-wider uppercase hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all cursor-pointer"
        >
          Apparel Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] text-neutral-900 dark:text-white py-12 transition-colors duration-300 text-left relative">
      
      {/* Dynamic 3DS bank verification modal */}
      {isVerifying && (
        <div className="fixed inset-0 z-50 bg-black/95 flex flex-col items-center justify-center text-center p-4">
          <div className="max-w-md w-full border border-neutral-800 bg-[#0F0F0F] p-8 flex flex-col items-center">
            <Loader2 size={48} className="text-white animate-spin mb-6" />
            
            <h3 className="font-oswald text-lg font-bold tracking-[0.2em] text-white uppercase mb-2">
              SECURE BANK AUTHORIZATION
            </h3>
            <p className="text-[10px] font-mono text-neutral-400 mb-8 uppercase tracking-widest">
              Standard 3D-Secure 2.0 Gateway Protocol
            </p>

            {/* Stepped secure logs */}
            <div className="w-full bg-[#050505] border border-neutral-900 p-4 font-mono text-[10px] space-y-2 text-left text-neutral-350">
              <div className="flex items-center justify-between">
                <span>[SSL] HANDSHAKE ESTABLISHED</span>
                <span className="text-green-500 font-bold">OK</span>
              </div>
              
              {verificationStep >= 1 && (
                <div className="flex items-center justify-between">
                  <span>[SEC] ENCRYPTING CARD DATA...</span>
                  <span className="text-amber-500 font-bold animate-pulse">RUNNING</span>
                </div>
              )}
              {verificationStep >= 2 && (
                <div className="flex items-center justify-between">
                  <span>[BANK] COMMUNICATING VIA SECURE SWIFT...</span>
                  <span className="text-amber-500 font-bold animate-pulse font-mono">WAITING</span>
                </div>
              )}
              {verificationStep >= 3 && (
                <div className="flex items-center justify-between">
                  <span>[AUTH] CARD NETWORK OK // FUNDS DETECTED</span>
                  <span className="text-green-500 font-bold">APPROVED</span>
                </div>
              )}
              {verificationStep >= 4 && (
                <div className="flex items-center justify-between">
                  <span>[SYS] GENERATING INVOICE RECEIPT...</span>
                  <span className="text-green-500 font-bold">SAVING</span>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-2 mt-8 text-[9px] font-mono text-neutral-500 uppercase">
              <Lock size={12} />
              <span>AES-256 PCI-DSS COMPLIANT INTERACTION</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Page Layout */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Back Link */}
        <button
          onClick={() => navigateTo('shop')}
          className="flex items-center gap-2 text-xs font-mono text-neutral-550 hover:text-neutral-900 dark:hover:text-white mb-8 transition-colors cursor-pointer uppercase"
        >
          <ArrowLeft size={14} /> Back to Catalog
        </button>

        {/* Page Title */}
        <div className="mb-10">
          <span className="font-mono text-xs font-bold tracking-widest text-neutral-450 dark:text-neutral-500 uppercase">
            SOLUS CHECKOUT INTERFACE
          </span>
          <h1 className="font-oswald text-3xl sm:text-4xl font-bold tracking-[0.2em] uppercase mt-2">
            SECURE ACQUISITION
          </h1>
        </div>

        {/* Checkout Forms Split */}
        <form onSubmit={handleCheckoutSubmit} className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column: Form Details (7 cols) */}
          <div className="col-span-1 lg:col-span-7 space-y-8">
            
            {/* Step 1: Shipping Details */}
            <div className="border border-neutral-200 dark:border-neutral-850 p-6 bg-neutral-50/20 dark:bg-[#161616]/30">
              <h3 className="font-oswald text-sm font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
                <span className="font-mono text-xs border border-neutral-350 dark:border-neutral-700 px-1.5 py-0.5">1</span>
                Athlete Shipping Protocol
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-450 dark:text-neutral-550 font-bold mb-1.5">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingDetails.fullName}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, fullName: e.target.value })}
                    className="w-full px-3 py-2 text-sm font-sans bg-white dark:bg-[#111] border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white rounded-none"
                  />
                </div>
                
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-450 dark:text-neutral-550 font-bold mb-1.5">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={shippingDetails.email}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, email: e.target.value })}
                    className="w-full px-3 py-2 text-sm font-sans bg-white dark:bg-[#111] border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white rounded-none"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-450 dark:text-neutral-550 font-bold mb-1.5">
                    Delivery Address
                  </label>
                  <input
                    type="text"
                    required
                    value={shippingDetails.address}
                    onChange={(e) => setShippingDetails({ ...shippingDetails, address: e.target.value })}
                    className="w-full px-3 py-2 text-sm font-sans bg-white dark:bg-[#111] border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white rounded-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-450 dark:text-neutral-550 font-bold mb-1.5">
                      City / Region
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingDetails.city}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, city: e.target.value })}
                      className="w-full px-3 py-2 text-sm font-sans bg-white dark:bg-[#111] border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white rounded-none"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-450 dark:text-neutral-550 font-bold mb-1.5">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      value={shippingDetails.postalCode}
                      onChange={(e) => setShippingDetails({ ...shippingDetails, postalCode: e.target.value })}
                      className="w-full px-3 py-2 text-sm font-sans bg-white dark:bg-[#111] border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white rounded-none font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Step 2: Payment Details */}
            <div className="border border-neutral-200 dark:border-neutral-850 p-6 bg-neutral-50/20 dark:bg-[#161616]/30">
              <h3 className="font-oswald text-sm font-bold tracking-widest uppercase mb-6 flex items-center gap-2">
                <span className="font-mono text-xs border border-neutral-350 dark:border-neutral-700 px-1.5 py-0.5">2</span>
                Secure Billing Protocol
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-450 dark:text-neutral-550 font-bold mb-1.5">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    required
                    value={paymentDetails.cardName}
                    onChange={(e) => setPaymentDetails({ ...paymentDetails, cardName: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 text-sm font-sans bg-white dark:bg-[#111] border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white rounded-none uppercase font-mono"
                  />
                </div>

                <div>
                  <label className="block text-[10px] uppercase tracking-widest text-neutral-450 dark:text-neutral-550 font-bold mb-1.5">
                    Card Number
                  </label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-3 flex items-center text-neutral-400 pointer-events-none">
                      <CreditCard size={14} />
                    </span>
                    <input
                      type="text"
                      required
                      value={paymentDetails.cardNumber}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })}
                      className="w-full pl-10 pr-3 py-2 text-sm font-sans bg-white dark:bg-[#111] border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white rounded-none font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-450 dark:text-neutral-550 font-bold mb-1.5">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="MM/YY"
                      value={paymentDetails.expiry}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, expiry: e.target.value })}
                      className="w-full px-3 py-2 text-sm font-sans bg-white dark:bg-[#111] border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white rounded-none font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase tracking-widest text-neutral-450 dark:text-neutral-550 font-bold mb-1.5">
                      Security Code (CVV)
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      required
                      value={paymentDetails.cvv}
                      onChange={(e) => setPaymentDetails({ ...paymentDetails, cvv: e.target.value })}
                      className="w-full px-3 py-2 text-sm font-sans bg-white dark:bg-[#111] border border-neutral-300 dark:border-neutral-800 text-neutral-900 dark:text-white focus:outline-none focus:border-black dark:focus:border-white rounded-none font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Order summary & coupon validations (5 cols) */}
          <div className="col-span-1 lg:col-span-5">
            <div className="border border-neutral-200 dark:border-neutral-850 p-6 bg-neutral-50 dark:bg-[#111111]/40 sticky top-24">
              <h3 className="font-oswald text-sm font-bold tracking-widest uppercase mb-6 pb-4 border-b border-neutral-200 dark:border-neutral-800">
                Acquisition Invoice Summary
              </h3>

              {/* Items List */}
              <div className="space-y-4 max-h-56 overflow-y-auto mb-6">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-3 justify-between items-center text-xs">
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-12 bg-neutral-100 dark:bg-neutral-900 flex-shrink-0">
                        <img src={item.image} className="w-full h-full object-cover" alt="" />
                      </div>
                      <div className="text-left">
                        <span className="font-oswald font-bold uppercase tracking-wider block">{item.name}</span>
                        <span className="text-[10px] text-neutral-450 dark:text-neutral-500 font-mono">
                          {item.color} / {item.size} (x{item.quantity})
                        </span>
                      </div>
                    </div>
                    <span className="font-mono font-bold">${item.price * item.quantity}.00</span>
                  </div>
                ))}
              </div>

              {/* Coupon inputs */}
              <div className="border-t border-b border-neutral-200 dark:border-neutral-800 py-4 mb-6">
                {appliedCoupon ? (
                  <div className="flex items-center justify-between bg-green-500/10 border border-green-500/30 text-green-600 dark:text-green-400 px-3 py-2 text-xs uppercase tracking-wider font-mono">
                    <span className="flex items-center gap-1 font-bold">
                      <Ticket size={12} /> {appliedCoupon} CODE ACTIVE
                    </span>
                    <button
                      type="button"
                      onClick={removeCoupon}
                      className="text-green-700 dark:text-green-300 font-bold hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <div className="flex gap-2">
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
                      type="button"
                      onClick={handleApplyCoupon}
                      className="bg-neutral-900 text-white dark:bg-white dark:text-black font-oswald text-xs font-bold px-4 py-2 hover:bg-neutral-800 dark:hover:bg-neutral-200 tracking-wider uppercase rounded-none cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                )}
                {couponError && (
                  <p className="text-[10px] text-red-500 font-mono mt-1 text-left uppercase">
                    Verification Error: Code does not exist in databases.
                  </p>
                )}
              </div>

              {/* Pricing Breakdowns */}
              <div className="space-y-3 text-xs mb-6 font-medium">
                <div className="flex justify-between">
                  <span className="text-neutral-450 dark:text-neutral-500">Gear Subtotal</span>
                  <span className="font-mono">${subtotal}.00</span>
                </div>
                {couponDiscount > 0 && (
                  <div className="flex justify-between text-green-600 dark:text-green-400">
                    <span>Discount (-{couponDiscount}%)</span>
                    <span className="font-mono">-${discountAmount}.00</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-neutral-450 dark:text-neutral-500 font-medium">Logistics & Shipping</span>
                  <span className="font-mono text-green-600 dark:text-green-400 font-bold uppercase text-[10px]">
                    Auto-Applied Free
                  </span>
                </div>
                
                <div className="flex justify-between text-sm font-bold border-t border-neutral-200 dark:border-neutral-850 pt-3 mt-1">
                  <span className="uppercase tracking-widest text-xs">Total Amount</span>
                  <span className="font-mono text-neutral-900 dark:text-white">${total}.00</span>
                </div>
              </div>

              {/* Submit Checkout Button */}
              <button
                type="submit"
                className="w-full flex items-center justify-center gap-2 bg-neutral-900 dark:bg-white text-white dark:text-black py-4 font-oswald text-xs font-bold tracking-[0.25em] uppercase hover:opacity-90 transition-opacity rounded-none cursor-pointer"
              >
                <ShieldCheck size={16} /> Authorize Order
              </button>

              <div className="flex gap-2 items-start mt-4 text-[10px] text-neutral-500 dark:text-neutral-600 leading-normal">
                <Info size={14} className="flex-shrink-0 mt-0.5" />
                <span>By placing an order, you accept that transactions are simulated and telemetry scripts will record e-commerce event triggers.</span>
              </div>

            </div>
          </div>

        </form>

      </div>
    </div>
  );
};
