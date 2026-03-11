import React, { useEffect, useRef, useState } from 'react'
import { assets } from '../assets/assets'
import { RefreshCcw, ShieldCheck, Headphones, ArrowRight } from 'lucide-react'

const OurPolicy = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const policies = [
    {
      icon: assets.exchange_icon,
      lucideIcon: RefreshCcw,
      title: "Easy Exchange Policy",
      description: "We offer hassle free exchange policy within 30 days",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-100"
    },
    {
      icon: assets.quality_icon,
      lucideIcon: ShieldCheck,
      title: "7 Days Return Policy",
      description: "We provide 7 days free return policy no questions asked",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-100"
    },
    {
      icon: assets.support_icon || assets.exchange_icon,
      lucideIcon: Headphones,
      title: "Best Customer Support",
      description: "We provide 24/7 customer support via chat & email",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-100"
    }
  ]

  return (
    <section 
      ref={sectionRef}
      className="relative py-24 overflow-hidden bg-gradient-to-b from-gray-50 to-white"
    >
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-100/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-1000 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white rounded-full shadow-sm border border-gray-100">
            <ShieldCheck className="w-4 h-4 text-green-500" />
            <span className="text-sm font-semibold text-gray-700 tracking-wide uppercase">
              Shop with Confidence
            </span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Our{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
              Promise
            </span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-600 text-lg">
            We are committed to providing you with the best shopping experience possible
          </p>
        </div>

        {/* Policies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {policies.map((policy, index) => {
            const LucideIcon = policy.lucideIcon
            return (
              <div
                key={index}
                className={`group relative transition-all duration-700 ease-out ${
                  isVisible 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className={`relative p-8 rounded-3xl border-2 transition-all duration-500 ${
                  hoveredIndex === index 
                    ? `${policy.bgColor} ${policy.borderColor} shadow-2xl scale-105` 
                    : 'bg-white border-gray-100 shadow-lg hover:shadow-xl'
                }`}>
                  {/* Gradient Background on Hover */}
                  <div className={`absolute inset-0 rounded-3xl bg-gradient-to-br ${policy.color} opacity-0 transition-opacity duration-500 ${
                    hoveredIndex === index ? 'opacity-5' : ''
                  }`} />

                  {/* Icon Container */}
                  <div className="relative mb-6">
                    <div className={`w-20 h-20 mx-auto rounded-2xl flex items-center justify-center transition-all duration-500 ${
                      hoveredIndex === index 
                        ? `bg-gradient-to-br ${policy.color} shadow-lg scale-110 rotate-3` 
                        : 'bg-gray-100'
                    }`}>
                      {/* Original Icon */}
                      <img 
                        src={policy.icon} 
                        alt={policy.title}
                        className={`w-10 h-10 transition-all duration-500 ${
                          hoveredIndex === index ? 'brightness-0 invert' : ''
                        }`} 
                      />
                    </div>
                    
                    {/* Floating Badge */}
                    <div className={`absolute -top-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-500 ${
                      hoveredIndex === index 
                        ? `bg-gradient-to-br ${policy.color} text-white scale-100 opacity-100` 
                        : 'bg-gray-200 text-gray-400 scale-0 opacity-0'
                    }`}>
                      <LucideIcon className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="relative text-center">
                    <h3 className={`text-xl font-bold mb-3 transition-colors duration-300 ${
                      hoveredIndex === index ? 'text-gray-900' : 'text-gray-800'
                    }`}>
                      {policy.title}
                    </h3>
                    <p className="text-gray-500 leading-relaxed mb-4">
                      {policy.description}
                    </p>

                    {/* Learn More Link */}
                    <button className={`inline-flex items-center gap-2 text-sm font-semibold transition-all duration-300 ${
                      hoveredIndex === index 
                        ? `bg-gradient-to-r ${policy.color} bg-clip-text text-transparent translate-x-0 opacity-100` 
                        : 'text-gray-400 translate-x-2 opacity-0'
                    }`}>
                      Learn more
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Bottom Gradient Line */}
                  <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 rounded-full bg-gradient-to-r ${policy.color} transition-all duration-500 ${
                    hoveredIndex === index ? 'w-1/2 opacity-100' : 'w-0 opacity-0'
                  }`} />
                </div>
              </div>
            )
          })}
        </div>

        {/* Bottom Trust Badge */}
        <div className={`mt-16 text-center transition-all duration-1000 delay-500 ease-out ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 border-2 border-white flex items-center justify-center text-xs font-bold text-gray-600">
                  {i}K
                </div>
              ))}
            </div>
            <div className="text-left">
              <p className="text-sm font-bold text-gray-900">Trusted by 10,000+ Customers</p>
              <p className="text-xs text-gray-500">Join our happy shopping community</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default OurPolicy