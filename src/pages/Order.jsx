import React, { useContext, useEffect, useRef, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../Components/Title'
import { 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  ChevronRight,
  Calendar,
  Box,
  ArrowUpRight,
  Download,
  Printer
} from 'lucide-react'

const Order = () => {
  const { products, currency } = useContext(ShopContext)
  const [isVisible, setIsVisible] = useState(false)
  const [expandedOrder, setExpandedOrder] = useState(null)
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

  // Order status steps
  const orderSteps = [
    { status: 'Order Placed', icon: Box, completed: true },
    { status: 'Processing', icon: Clock, completed: true },
    { status: 'Shipped', icon: Truck, completed: false },
    { status: 'Delivered', icon: CheckCircle2, completed: false }
  ]

  const orders = products.slice(1, 4).map((item, index) => ({
    ...item,
    orderId: `#ORD-${2026000 + index}`,
    date: '25 Jul, 2026',
    quantity: 1,
    size: 'M',
    status: index === 0 ? 'Ready To Ship' : index === 1 ? 'Shipped' : 'Delivered',
    statusColor: index === 0 ? 'bg-amber-500' : index === 1 ? 'bg-blue-500' : 'bg-green-500',
    progress: index === 0 ? 50 : index === 1 ? 75 : 100
  }))

  return (
    <div ref={sectionRef} className="min-h-screen bg-gray-50/30">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Header */}
        <div className={`mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center shadow-lg">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <Title text1={'MY'} text2={'ORDERS'} />
                <p className="text-sm text-gray-500 mt-1">
                  {orders.length} active {orders.length === 1 ? 'order' : 'orders'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-gray-400 transition-colors">
                <Download className="w-4 h-4" />
                Export
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:border-gray-400 transition-colors">
                <Printer className="w-4 h-4" />
                Print
              </button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {orders.map((order, index) => (
            <div 
              key={index}
              className={`group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-700 hover:shadow-lg ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Order Header */}
              <div className="p-6 border-b border-gray-100 bg-gray-50/50">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-bold text-gray-900">{order.orderId}</span>
                    <span className="flex items-center gap-1.5 text-xs text-gray-500">
                      <Calendar className="w-3.5 h-3.5" />
                      {order.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${order.statusColor} text-white`}>
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Content */}
              <div className="p-6">
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Product Info */}
                  <div className="flex-1 flex gap-4">
                    <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
                      <img 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                        src={order.image[0]} 
                        alt={order.name} 
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 line-clamp-2 mb-2">
                        {order.name}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="text-lg font-bold text-gray-900">{currency}{order.price}</span>
                        <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-medium uppercase">
                          Qty: {order.quantity}
                        </span>
                        <span className="px-2 py-1 bg-gray-100 rounded-lg text-xs font-medium uppercase">
                          Size: {order.size}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress & Actions */}
                  <div className="lg:w-80 space-y-4">
                    {/* Progress Bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Order Progress</span>
                        <span className="font-medium text-gray-900">{order.progress}%</span>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${order.statusColor}`}
                          style={{ width: `${order.progress}%` }}
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-gray-800 transition-colors">
                        <Truck className="w-4 h-4" />
                        Track Order
                      </button>
                      <button 
                        onClick={() => setExpandedOrder(expandedOrder === index ? null : index)}
                        className="px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-700 hover:border-gray-400 transition-colors"
                      >
                        <ChevronRight className={`w-5 h-5 transition-transform duration-300 ${expandedOrder === index ? 'rotate-90' : ''}`} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Expanded Details */}
                {expandedOrder === index && (
                  <div className="mt-6 pt-6 border-t border-gray-100 animate-in slide-in-from-top-2 duration-300">
                    {/* Timeline */}
                    <div className="relative">
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200" />
                      <div className="space-y-6">
                        {orderSteps.map((step, stepIndex) => (
                          <div key={stepIndex} className="relative flex items-start gap-4 pl-12">
                            <div className={`absolute left-0 w-8 h-8 rounded-full flex items-center justify-center ${stepIndex < (order.progress / 25) ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-400'}`}>
                              <step.icon className="w-4 h-4" />
                            </div>
                            <div>
                              <p className={`font-semibold ${stepIndex < (order.progress / 25) ? 'text-gray-900' : 'text-gray-400'}`}>
                                {step.status}
                              </p>
                              <p className="text-xs text-gray-500">
                                {stepIndex < (order.progress / 25) ? 'Completed' : 'Pending'}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="mt-6 p-4 bg-gray-50 rounded-xl">
                      <div className="flex items-start gap-3">
                        <MapPin className="w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-1">Shipping Address</p>
                          <p className="text-sm text-gray-600">
                            BCG Chowk Multan, Jutt Drink Corner<br />
                            Multan, Punjab, Pakistan
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty State (if no orders) */}
        {orders.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
              <Package className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No orders yet</h3>
            <p className="text-gray-500 mb-6">Start shopping to see your orders here</p>
            <button className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors">
              Browse Products
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default Order