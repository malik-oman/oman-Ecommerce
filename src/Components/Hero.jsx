import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { ArrowRight, Sparkles } from 'lucide-react'

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef(null)

  useEffect(() => {
    // Trigger entrance animation
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: (e.clientX - rect.left) / rect.width,
          y: (e.clientY - rect.top) / rect.height,
        })
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div 
      ref={heroRef}
      className="relative min-h-[90vh] w-full overflow-hidden bg-gradient-to-br from-gray-50 via-white to-gray-100"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-gradient-to-r from-purple-200/30 to-pink-200/30 blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${mousePosition.x * 50}px, ${mousePosition.y * 50}px)`,
            top: '-10%',
            right: '-10%',
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full bg-gradient-to-r from-blue-200/20 to-cyan-200/20 blur-3xl transition-transform duration-1000 ease-out"
          style={{
            transform: `translate(${-mousePosition.x * 30}px, ${-mousePosition.y * 30}px)`,
            bottom: '-10%',
            left: '-5%',
          }}
        />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center min-h-[90vh] max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* HERO LEFT SIDE - Content */}
        <div className={`w-full lg:w-1/2 flex flex-col justify-center py-12 lg:py-0 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
        }`}>
          <div className="space-y-8 max-w-xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span className="text-sm font-semibold text-gray-700 tracking-wide uppercase">
                New Collection 2024
              </span>
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-[2px] w-12 bg-gradient-to-r from-gray-900 to-gray-400 rounded-full" />
                <span className="text-sm font-bold text-gray-500 tracking-[0.2em] uppercase">
                  Our Best Sellers
                </span>
              </div>
              
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-gray-900 leading-[1.1] tracking-tight">
                Latest{' '}
                <span className="relative inline-block">
                  <span className="relative z-10">Arrivals</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-gradient-to-r from-amber-200 to-orange-200 -skew-x-6 -z-0 opacity-70" />
                </span>
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed max-w-md">
                Discover our curated collection of premium styles. Elevate your wardrobe with pieces designed for the modern individual.
              </p>
            </div>

          

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-gray-200">
              {[
                { value: '50K+', label: 'Happy Customers' },
                { value: '200+', label: 'New Arrivals' },
                { value: '4.9', label: 'Rating' },
              ].map((stat, index) => (
                <div key={index} className="space-y-1">
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* HERO RIGHT SIDE - Image */}
        <div className={`w-full lg:w-1/2 relative flex items-center justify-center py-12 lg:py-0 transition-all duration-1000 delay-300 ease-out ${
          isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
        }`}>
          <div className="relative w-full max-w-lg lg:max-w-xl">
            {/* Decorative Ring */}
            <div className="absolute inset-0 bg-gradient-to-tr from-gray-200 to-gray-100 rounded-[3rem] rotate-6 scale-95 opacity-50" />
            <div className="absolute inset-0 bg-gradient-to-bl from-gray-100 to-white rounded-[3rem] -rotate-3 scale-95 opacity-50" />
            
            {/* Main Image Container */}
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-[2.5rem] blur opacity-25 group-hover:opacity-40 transition duration-500" />
              <div className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl">
                <img 
                  src={assets.hero_img} 
                  alt="Latest Fashion Arrivals" 
                  className="w-full h-auto object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Floating Badge on Image */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-lg transform transition-all duration-500 hover:scale-105 hover:-translate-y-1">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gray-900 rounded-xl flex items-center justify-center">
                      <span className="text-white font-bold text-lg">%</span>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-gray-900">Special Offer</p>
                      <p className="text-xs text-gray-500">Up to 40% off</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-white rounded-2xl shadow-xl flex items-center justify-center transform rotate-12 animate-pulse">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">New</p>
                <p className="text-xs text-gray-500">Season</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none" />
    </div>
  )
}

export default Hero