import React, { useState, useEffect, useRef } from "react";
import { Send, Sparkles, CheckCircle, Mail, ArrowRight, Gift } from "lucide-react";

const NewsLetter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!email) return;
    
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsSuccess(true);
    setEmail("");
    
    // Reset success message after 5 seconds
    setTimeout(() => setIsSuccess(false), 5000);
  };

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden"
    >
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] animate-pulse delay-1000" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-full blur-3xl" />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-20" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }} />

      <div className="relative z-10 max-w-4xl mx-auto px-6 sm:px-8">
        {/* Badge */}
        <div className={`flex justify-center mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
            <Gift className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-semibold text-white/90 tracking-wide uppercase">
              Exclusive Offer
            </span>
          </div>
        </div>

        {/* Heading */}
        <div className={`text-center mb-6 transition-all duration-1000 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Subscribe Now &{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
                Get 20% Off
              </span>
              <Sparkles className="absolute -top-6 -right-8 w-6 h-6 text-amber-400 animate-pulse" />
            </span>
          </h2>
        </div>

        {/* Description */}
        <p className={`text-center text-lg sm:text-xl text-gray-300/80 max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          Join our newsletter and be the first to discover new arrivals, 
          exclusive offers, and special discounts curated just for you.
        </p>

        {/* Form Container */}
        <div className={`transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {!isSuccess ? (
            <form 
              onSubmit={onSubmitHandler} 
              className="relative max-w-xl mx-auto"
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-1 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl blur opacity-0 transition-opacity duration-500 ${isFocused ? 'opacity-30' : ''}`} />
              
              <div className="relative flex flex-col sm:flex-row items-center gap-3 p-2 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 focus-within:border-white/40 transition-all duration-300">
                {/* Email Icon */}
                <div className="hidden sm:flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 text-gray-400">
                  <Mail className="w-5 h-5" />
                </div>

                {/* Input */}
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter your email address" 
                  className="flex-1 w-full bg-transparent text-white placeholder:text-gray-400 text-base sm:text-lg px-4 py-3 outline-none"
                  required 
                />

                {/* Submit Button */}
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full sm:w-auto group relative flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-white font-semibold text-base px-8 py-4 rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                  <span className="relative flex items-center gap-2">
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <>
                        <span>Subscribe</span>
                        <Send className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </span>
                </button>
              </div>

              {/* Privacy Note */}
              <p className="text-center text-sm text-gray-400 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </form>
          ) : (
            /* Success State */
            <div className="max-w-xl mx-auto p-8 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 text-center animate-in zoom-in-95 duration-300">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Welcome Aboard!</h3>
              <p className="text-gray-300">
                Check your inbox for your exclusive 20% discount code.
              </p>
            </div>
          )}
        </div>

        {/* Trust Indicators */}
        <div className={`flex flex-wrap justify-center gap-8 mt-12 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { value: "50K+", label: "Subscribers" },
            { value: "4.9", label: "Rating" },
            { value: "100%", label: "Free" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;