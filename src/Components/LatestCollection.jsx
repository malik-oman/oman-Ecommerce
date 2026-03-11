import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import ProductItem from "./ProductItem";
import { useNavigate } from "react-router-dom";

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const sectionRef = useRef(null);

  const navigate = useNavigate()

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

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
      className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-gray-50/50 to-white"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-100/50 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-100/50 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300">
            <TrendingUp className="w-4 h-4 text-green-500" />
            <span className="text-sm font-semibold text-gray-700 tracking-wide uppercase">
              Trending Now
            </span>
          </div>

          {/* Title */}
          <div className="relative inline-block mb-6">
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
              Latest{' '}
              <span className="relative inline-block">
                <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900">
                  Collection
                </span>
                <span className="absolute -bottom-2 left-0 w-full h-3 bg-gradient-to-r from-amber-200 to-orange-200 -skew-x-6 opacity-60" />
              </span>
            </h2>
            <Sparkles className="absolute -top-6 -right-8 w-6 h-6 text-amber-400 animate-pulse" />
          </div>

          {/* Description */}
          <p className="max-w-2xl mx-auto text-base sm:text-lg text-gray-600 leading-relaxed">
            Discover our handpicked selection of premium products. Each piece is carefully 
            curated to bring you the finest quality and latest trends in modern design.
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 gap-y-8">
          {latestProducts.map((item, index) => (
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
              {/* Wrapper with hover effects - pointer-events-none taake ProductItem ka onClick kaam kare */}
              <div className={`relative group transition-all duration-500 ${
                hoveredIndex !== null && hoveredIndex !== index 
                  ? 'scale-95 opacity-70' 
                  : 'scale-100 opacity-100'
              }`}>
                {/* Hover Glow Effect - pointer-events-none */}
                <div className={`absolute -inset-2 bg-gradient-to-r from-gray-200 to-gray-100 rounded-2xl blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none ${
                  hoveredIndex === index ? 'opacity-50' : ''
                }`} />
                
                {/* ProductItem - Ab iska onClick kaam karega */}
                <div className="relative z-10">
                  <ProductItem 
                    id={item._id} 
                    name={item.name} 
                    image={item.image} 
                    price={item.price}
                  />
                </div>
                
                {/* Quick View Badge - pointer-events-none taake click interfere na kare */}
                <div className={`absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-900 shadow-lg transform transition-all duration-300 pointer-events-none ${
                  hoveredIndex === index 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 -translate-y-2'
                }`}>
                  Quick View
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-700 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <button onClick={() =>navigate('/collection')} className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full font-semibold text-base overflow-hidden transition-all duration-300 hover:shadow-2xl hover:scale-105 active:scale-95">
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2">
              View All Products
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </span>
          </button>
          
          <p className="mt-4 text-sm text-gray-500">
            Showing {latestProducts.length} of {products.length} products
          </p>
        </div>

        {/* Features Bar */}
        <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-t border-gray-200 transition-all duration-1000 delay-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {[
            { icon: "🚚", title: "Free Shipping", desc: "On orders over $50" },
            { icon: "✨", title: "Premium Quality", desc: "Handpicked items" },
            { icon: "🔄", title: "Easy Returns", desc: "30-day policy" },
            { icon: "🔒", title: "Secure Payment", desc: "100% protected" },
          ].map((feature, index) => (
            <div 
              key={index} 
              className="text-center group cursor-default"
            >
              <div className="text-3xl mb-2 transform transition-transform duration-300 group-hover:scale-110">
                {feature.icon}
              </div>
              <h4 className="font-semibold text-gray-900 mb-1">{feature.title}</h4>
              <p className="text-sm text-gray-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestCollection;