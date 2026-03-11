import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import { Award, TrendingUp, Star, ArrowRight } from "lucide-react";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);

  // Original functionality preserved
  useEffect(() => {
    const bestProduct = products.filter((item) => item.bestseller);
    setBestSeller(bestProduct.slice(0, 5));
  }, [products]);

  // Scroll animation trigger
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

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="relative py-20 overflow-hidden bg-white"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-30">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgb(209 213 219) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-amber-100/50 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-100/50 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 mb-6 bg-gradient-to-r from-amber-50 to-orange-50 rounded-full border border-amber-100 shadow-sm hover:shadow-md transition-all duration-300 group">
            <Award className="w-5 h-5 text-amber-500 group-hover:scale-110 transition-transform duration-300" />
            <span className="text-sm font-bold text-amber-700 tracking-wide uppercase">
              Customer Favorites
            </span>
          </div>

          {/* Title */}
          <div className="relative inline-block mb-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              Best{" "}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">
                  Sellers
                </span>
                <svg className="absolute -bottom-2 left-0 w-full h-3 text-amber-200 -z-0" viewBox="0 0 200 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.00025 6.99997C25.7509 9.37499 83.7353 5.37499 198.001 2.37499" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
                </svg>
              </span>
            </h2>
            <Star className="absolute -top-4 -right-6 w-6 h-6 text-amber-400 fill-amber-400 animate-pulse" />
          </div>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 leading-relaxed">
            Explore the most popular picks that everyone is talking about. Quality
            you can trust, style you'll love. Handpicked favorites from our community.
          </p>
        </div>

        {/* Products Grid - Original functionality preserved */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8">
          {bestSeller.map((item, index) => (
            <div
              key={item._id}
              className={`transform transition-all duration-700 ease-out ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-12'
              }`}
              style={{ 
                transitionDelay: `${index * 100}ms`,
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Rank Badge */}
              <div className="relative">
                {index < 3 && (
                  <div className={`absolute -top-3 -left-3 z-20 w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-lg transform transition-all duration-300 ${
                    index === 0 ? 'bg-gradient-to-br from-yellow-400 to-amber-500 scale-110' :
                    index === 1 ? 'bg-gradient-to-br from-gray-300 to-gray-400' :
                    'bg-gradient-to-br from-orange-400 to-amber-600'
                  } ${hoveredIndex === index ? 'scale-125 rotate-12' : ''}`}>
                    #{index + 1}
                  </div>
                )}
                
                {/* Product Card Wrapper */}
                <div className={`relative group transition-all duration-500 ${
                  hoveredIndex !== null && hoveredIndex !== index 
                    ? 'scale-95 opacity-70' 
                    : 'scale-100 opacity-100'
                }`}>
                  {/* Glow Effect */}
                  <div className={`absolute -inset-2 bg-gradient-to-r from-amber-100 to-orange-100 rounded-2xl blur-xl opacity-0 transition-opacity duration-500 pointer-events-none ${
                    hoveredIndex === index ? 'opacity-60' : 'group-hover:opacity-40'
                  }`} />
                  
                  {/* Original ProductItem - Functionality preserved */}
                  <div className="relative z-10">
                    <ProductItem 
                      id={item._id} 
                      name={item.name} 
                      image={item.image} 
                      price={item.price}
                    />
                  </div>

                  {/* Best Seller Tag */}
                  <div className={`absolute top-2 right-2 flex items-center gap-1 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full text-xs font-bold text-amber-600 shadow-md transform transition-all duration-300 pointer-events-none border border-amber-100 ${
                    hoveredIndex === index 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 -translate-y-2'
                  }`}>
                    <TrendingUp className="w-3 h-3" />
                    HOT
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>


        {/* Trust Indicators */}
        <div className={`mt-16 flex flex-wrap justify-center gap-8 text-center transition-all duration-1000 delay-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {[
            { value: "50K+", label: "Happy Customers" },
            { value: "4.9", label: "Average Rating" },
            { value: "100%", label: "Authentic Products" }
          ].map((stat, index) => (
            <div key={index} className="px-6 py-4 bg-gray-50 rounded-2xl hover:bg-amber-50 transition-colors duration-300">
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BestSeller;