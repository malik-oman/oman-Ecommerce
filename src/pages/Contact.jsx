import React, { useEffect, useRef, useState } from 'react'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import NewsLetter from '../Components/NewsLetter'
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  ArrowRight,
  MessageCircle,
  Users,
  Briefcase,
  Sparkles,
  ExternalLink,
  CheckCircle2
} from 'lucide-react'

const Contact = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    setIsSubmitting(false)
    setIsSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
    
    setTimeout(() => setIsSubmitted(false), 5000)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Our Store",
      details: ["BCG Chowk Multan", "Jutt Drink Corner"],
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["(+92) 311-7343706"],
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["support@forevercommerce.com"],
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-purple-50"
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Sat: 9AM - 8PM", "Sunday: 10AM - 6PM"],
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50"
    }
  ]

  return (
    <div ref={sectionRef} className="min-h-screen bg-gray-50/30">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        {/* Background Decorations */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-white rounded-full shadow-sm border border-gray-100">
              <MessageCircle className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-semibold text-gray-700 uppercase tracking-wide">
                Get in Touch
              </span>
            </div>

            <div className="relative inline-block">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 tracking-tight">
                Contact{' '}
                <span className="relative inline-block">
                  <span className="relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600">
                    Us
                  </span>
                  <Sparkles className="absolute -top-4 -right-6 w-5 h-5 text-amber-400 animate-pulse" />
                </span>
              </h1>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-gray-900 to-transparent rounded-full" />
            </div>

            <p className="mt-6 text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed">
              We're here to help and answer any question you might have. 
              We look forward to hearing from you.
            </p>
          </div>

          {/* Contact Cards Grid */}
          <div className={`grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {contactInfo.map((info, index) => (
              <div 
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-500 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${info.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                  <info.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{info.title}</h3>
                <div className="space-y-1">
                  {info.details.map((detail, idx) => (
                    <p key={idx} className="text-gray-600 text-sm">{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Main Content - Image & Form */}
          <div className={`grid lg:grid-cols-2 gap-12 items-start transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            {/* Image Side */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-gray-200 to-gray-100 rounded-3xl blur-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <img 
                  className="w-full h-auto object-cover transform transition-transform duration-700 group-hover:scale-105" 
                  src={assets.contact_img} 
                  alt="Forever Commerce Store"
                />
                {/* Floating Badge */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                      <CheckCircle2 className="w-6 h-6 text-green-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">We're Open</p>
                      <p className="text-xs text-gray-500">Visit us today!</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Form Side */}
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 lg:p-10">
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Send us a Message</h2>
                <p className="text-gray-500">Fill out the form below and we'll get back to you shortly.</p>
              </div>

              {isSubmitted ? (
                <div className="text-center py-12 animate-in zoom-in-95 duration-300">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-green-400 to-emerald-500 flex items-center justify-center">
                    <CheckCircle2 className="w-10 h-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600">Thank you for reaching out. We'll respond within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Your Name</label>
                      <input 
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                        placeholder="John Doe"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-semibold text-gray-700">Email Address</label>
                      <input 
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-semibold text-gray-700">Message</label>
                    <textarea 
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all resize-none"
                      placeholder="How can we help you?"
                    />
                  </div>

                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full group flex items-center justify-center gap-3 bg-gray-900 text-white py-4 rounded-xl font-semibold hover:bg-gray-800 disabled:opacity-70 transition-all duration-300 shadow-lg shadow-gray-900/20 hover:shadow-xl"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Careers Section */}
          <div className={`mt-20 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl p-8 lg:p-12 overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10" style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                backgroundSize: '40px 40px'
              }} />
              
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
                    <Briefcase className="w-8 h-8 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white mb-2">Careers at Forever</h3>
                    <p className="text-gray-300 max-w-md">
                      Join our growing team of passionate individuals. We're always looking for talented people to help us shape the future of e-commerce.
                    </p>
                  </div>
                </div>
                
                <button className="group flex items-center gap-3 px-8 py-4 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg">
                  <span>Explore Jobs</span>
                  <ExternalLink className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </button>
              </div>
            </div>
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

export default Contact