import React, { useContext, useEffect, useRef, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Truck, Tag, ShieldCheck, Sparkles } from "lucide-react";

const CartTotal = () => {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const subtotal = getCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + delivery_fee;
  const isFreeShipping = subtotal > 200;

  return (
    <div 
      ref={cardRef}
      className={`w-full transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="relative bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-gray-100 overflow-hidden">
        {/* Decorative Top Gradient */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900" />
        
        {/* Sparkle Decoration */}
        <div className="absolute top-4 right-4">
          <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
        </div>

        <div className="p-6 sm:p-8">
          {/* Header */}
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center">
              <Tag className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Order Summary</h2>
              <p className="text-sm text-gray-500">Review your cart totals</p>
            </div>
          </div>

          {/* Calculation Rows */}
          <div className="space-y-4">
            {/* Subtotal */}
            <div className="flex items-center justify-between py-3 group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center group-hover:bg-gray-100 transition-colors">
                  <span className="text-xs font-semibold text-gray-400">01</span>
                </div>
                <span className="text-gray-600 font-medium">Subtotal</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">
                {currency}{subtotal.toFixed(2)}
              </span>
            </div>

            {/* Divider */}
            <div className="relative h-px bg-gray-100">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
            </div>

            {/* Shipping */}
            <div className="flex items-center justify-between py-3 group">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center group-hover:bg-blue-100 transition-colors">
                  <Truck className="w-4 h-4 text-blue-500" />
                </div>
                <div>
                  <span className="text-gray-600 font-medium block">Shipping Fee</span>
                  {isFreeShipping && subtotal > 0 && (
                    <span className="text-xs text-green-600 font-medium">Free shipping unlocked!</span>
                  )}
                </div>
              </div>
              <div className="text-right">
                {subtotal === 0 ? (
                  <span className="text-lg font-semibold text-gray-400">Free</span>
                ) : (
                  <span className={`text-lg font-semibold ${isFreeShipping ? 'text-green-600 line-through text-base' : 'text-gray-900'}`}>
                    {currency}{delivery_fee.toFixed(2)}
                  </span>
                )}
                {isFreeShipping && subtotal > 0 && (
                  <span className="block text-sm font-bold text-green-600">FREE</span>
                )}
              </div>
            </div>

            {/* Free Shipping Progress */}
            {subtotal > 0 && !isFreeShipping && (
              <div className="bg-blue-50 rounded-xl p-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-blue-700 font-medium">Add more for free shipping</span>
                  <span className="text-blue-900 font-bold">{currency}{(200 - subtotal).toFixed(2)} away</span>
                </div>
                <div className="h-2 bg-blue-200 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500"
                    style={{ width: `${Math.min((subtotal / 200) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Divider */}
            <div className="relative h-px bg-gray-200 my-4">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-300 to-transparent" />
            </div>

            {/* Total */}
            <div className="bg-gray-900 rounded-xl p-5 text-white relative overflow-hidden group">
              {/* Background Glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
              
              <div className="relative z-10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center backdrop-blur-sm">
                    <ShieldCheck className="w-5 h-5 text-amber-400" />
                  </div>
                  <div>
                    <span className="text-gray-400 text-sm font-medium block">Total Amount</span>
                    <span className="text-xs text-gray-500">Including all taxes</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold tracking-tight">
                    {currency}{total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="grid grid-cols-3 gap-3 mt-6 pt-6 border-t border-gray-100">
            {[
              { icon: ShieldCheck, label: "Secure Checkout" },
              { icon: Truck, label: "Fast Delivery" },
              { icon: Tag, label: "Best Prices" },
            ].map((item, index) => (
              <div key={index} className="text-center group">
                <div className="w-10 h-10 mx-auto rounded-full bg-gray-50 flex items-center justify-center mb-2 group-hover:bg-gray-100 transition-colors">
                  <item.icon className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-[10px] sm:text-xs text-gray-500 font-medium leading-tight block">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;