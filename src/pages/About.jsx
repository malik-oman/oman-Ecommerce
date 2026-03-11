import React, { useEffect, useRef, useState } from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import NewsLetter from '../Components/NewsLetter'
import { 
  ShieldCheck, 
  Zap, 
  Headphones, 
  Award, 
  Users, 
  Globe, 
  TrendingUp,
  Heart,
  Sparkles,
  ArrowRight,
  CheckCircle2
} from 'lucide-react'

const About = () => {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const stats = [
    { icon: Users, value: "50K+", label: "Happy Customers" },
    { icon: Globe, value: "25+", label: "Countries Served" },
    { icon: Award, value: "4.9", label: "Average Rating" },
    { icon: TrendingUp, value: "99%", label: "Satisfaction Rate" },
  ]

  const features = [
    {
      icon: ShieldCheck,
      title: "Quality Assurance",
      description: "We meticulously select and review each product to ensure it meets our high-quality standards before reaching our customers.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: Zap,
      title: "Convenience",
      description: "Our user-friendly platform allows customers to browse, shop, and checkout quickly and securely. Shopping with us is designed to be easy and stress-free.",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50"
    },
    {
      icon: Headphones,
      title: "Exceptional Service",
      description: "Our dedicated support team is always ready to assist you with fast responses and reliable solutions, ensuring a smooth and satisfying experience.",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50"
    }
  ]

  const values = [
    "Customer First Approach",
    "Transparency in Operations",
    "Sustainable Practices",
    "Continuous Innovation"
  ]

  return (
    <div ref={sectionRef} className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-purple-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-orange-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white rounded-full shadow-sm border border-gray-100">
              <Heart className="w-4 h-4 text-red-500 fill-red-500" />
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Our Story
              </span>
            </div>
            
            <div className="relative inline-block">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                About{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                    Us
                  </span>
                  <Sparkles className="absolute -top-4 -right-6 w-5 h-5 text-amber-400 animate-pulse" />
                </span>
              </h1>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-gray-900 to-transparent rounded-full" />
            </div>
          </div>

          {/* Main Content Grid */}
          <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Image Side */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  src={assets.about_img} 
                  alt="About Forever Commerce" 
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105"
                />
                {/* Overlay Badge */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">Trusted Brand</p>
                      <p className="text-xs text-gray-500">Since 2020</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Content Side */}
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="text-lg text-gray-600 leading-relaxed">
                  Forever Commerce is built with a simple mission — to deliver quality products 
                  with trust, reliability, and a seamless shopping experience. We believe that 
                  online shopping should be fast, secure, and enjoyable for everyone.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Our platform carefully selects trending and high-quality products to ensure 
                  customer satisfaction at every step. From browsing to checkout, we focus 
                  on performance, responsiveness, and user-friendly design.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  At Forever Commerce, we value transparency, customer support, and long-term 
                  relationships. Our goal is not just to sell products, but to build a community 
                  that shops with confidence.
                </p>
              </div>

              {/* Mission Box */}
              <div className="relative p-6 bg-gray-900 rounded-2xl overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-amber-500/20 to-orange-500/20 rounded-full blur-2xl" />
                <div className="relative z-10">
                  <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-amber-400" />
                    Our Mission
                  </h3>
                  <p className="text-gray-300 leading-relaxed">
                    To deliver quality products with trust, speed, and reliability. 
                    We strive to make online shopping easy, secure, and enjoyable for everyone.
                  </p>
                </div>
              </div>

              {/* Values List */}
              <div className="grid grid-cols-2 gap-3">
                {values.map((value, index) => (
                  <div key={index} className="flex items-center gap-2 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className={`mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {stats.map((stat, index) => (
              <div key={index} className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl transform rotate-1 group-hover:rotate-2 transition-transform duration-300" />
                <div className="relative p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-xl bg-gray-50 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-colors duration-300">
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative inline-block">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight">
                Why{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                  Choose Us
                </span>
              </h2>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-gray-900 to-gray-400 rounded-full" />
            </div>
            <p className="mt-4 text-gray-500 max-w-xl mx-auto">
              Discover what makes us different and why thousands of customers trust us
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group relative transition-all duration-700 delay-${index * 100} ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className={`absolute -inset-2 bg-gradient-to-r ${feature.color} rounded-3xl blur-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500`} />
                <div className={`relative h-full p-8 ${feature.bgColor} rounded-2xl border border-gray-100 hover:border-transparent transition-all duration-300 hover:shadow-xl`}>
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 shadow-lg transform group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                    <feature.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:${feature.color} transition-all duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {feature.description}
                  </p>
                  <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                    <span>Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <NewsLetter />
      </div>
    </div>
  )
}

export default About