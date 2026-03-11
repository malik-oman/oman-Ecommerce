import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../Components/Title'
import { assets } from '../assets/assets'
import CartTotal from '../Components/CartTotal'
import { 
  Trash2, 
  Minus, 
  Plus, 
  ShoppingBag, 
  ArrowRight, 
  Package, 
  ShieldCheck, 
  Truck,
  Heart,
  ChevronLeft
} from 'lucide-react'

const Cart = () => {
  const { products, currency, cartItem, updateQuantity, navigate } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [updatingItems, setUpdatingItems] = useState({})
  const sectionRef = useRef(null)

  // Original functionality preserved
  useEffect(() => {
    const tempData = []
    for (const items in cartItem) {
      for (const item in cartItem[items]) {
        if (cartItem[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItem[items][item]
          })
        }
      }
    }
    setCartData(tempData)
  }, [cartItem])

  // Scroll animation
  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Enhanced quantity update with loading state
  const handleQuantityChange = (id, size, newValue) => {
    if (newValue === '' || newValue === '0') return
    
    setUpdatingItems(prev => ({ ...prev, [`${id}-${size}`]: true }))
    
    // Simulate brief loading for smooth feel
    setTimeout(() => {
      updateQuantity(id, size, Number(newValue))
      setUpdatingItems(prev => ({ ...prev, [`${id}-${size}`]: false }))
    }, 150)
  }

  // Increment/Decrement handlers
  const handleIncrement = (id, size, currentQty) => {
    handleQuantityChange(id, size, currentQty + 1)
  }

  const handleDecrement = (id, size, currentQty) => {
    if (currentQty > 1) {
      handleQuantityChange(id, size, currentQty - 1)
    }
  }

  // Remove item with animation
  const handleRemove = (id, size) => {
    setUpdatingItems(prev => ({ ...prev, [`${id}-${size}`]: true }))
    setTimeout(() => {
      updateQuantity(id, size, 0)
    }, 200)
  }

  return (
    <div ref={sectionRef} className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Breadcrumb */}
          <button 
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors mb-4 group"
          >
            <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Continue Shopping
          </button>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <Title text1={'YOUR'} text2={'CART'} />
                <p className="text-sm text-gray-500 mt-1">
                  {cartData.length} {cartData.length === 1 ? 'item' : 'items'} in your cart
                </p>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Secure</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-blue-500" />
                <span>Free Shipping</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items - Left Side */}
          <div className="lg:col-span-2 space-y-4">
            {cartData.length === 0 ? (
              /* Empty State */
              <div className={`bg-white rounded-2xl shadow-sm border border-gray-100 p-12 text-center transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gray-100 flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Your cart is empty</h3>
                <p className="text-gray-500 mb-6">Looks like you haven't added anything yet</p>
                <button 
                  onClick={() => navigate('/collection')}
                  className="px-8 py-3 bg-gray-900 text-white rounded-full font-medium hover:bg-gray-800 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              /* Cart Items List */
              cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id)
                const isUpdating = updatingItems[`${item._id}-${item.size}`]
                
                return (
                  <div 
                    key={index}
                    className={`group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-500 hover:shadow-md ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'} ${isUpdating ? 'opacity-50' : 'opacity-100'}`}
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="p-4 sm:p-6">
                      <div className="flex gap-4 sm:gap-6">
                        {/* Product Image */}
                        <div className="relative flex-shrink-0">
                          <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-xl overflow-hidden bg-gray-100">
                            <img 
                              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                              src={productData.image[0]} 
                              alt={productData.name} 
                            />
                          </div>
                          {/* Mobile Remove Button */}
                          <button 
                            onClick={() => handleRemove(item._id, item.size)}
                            className="lg:hidden absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-50 text-red-500 flex items-center justify-center shadow-sm"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start gap-4">
                            <div>
                              <h3 
                                onClick={() => navigate(`/product/${item._id}`)}
                                className="text-base sm:text-lg font-semibold text-gray-900 cursor-pointer hover:text-gray-600 transition-colors line-clamp-2"
                              >
                                {productData.name}
                              </h3>
                              <div className="flex items-center gap-3 mt-2">
                                <span className="text-lg font-bold text-gray-900">
                                  {currency}{productData.price}
                                </span>
                                <span className="text-sm text-gray-400 line-through">
                                  {currency}{(productData.price * 1.2).toFixed(0)}
                                </span>
                              </div>
                            </div>
                            
                            {/* Desktop Remove Button */}
                            <button 
                              onClick={() => handleRemove(item._id, item.size)}
                              className="hidden lg:flex items-center gap-2 px-3 py-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors group/remove"
                            >
                              <Trash2 className="w-4 h-4 group-hover/remove:scale-110 transition-transform" />
                              <span className="text-sm font-medium">Remove</span>
                            </button>
                          </div>

                          {/* Size & Quantity Row */}
                          <div className="flex flex-wrap items-center gap-4 mt-4">
                            {/* Size Badge */}
                            <div className="flex items-center gap-2">
                              <span className="text-sm text-gray-500">Size:</span>
                              <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-sm font-medium text-gray-900 uppercase">
                                {item.size}
                              </span>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-500">Qty:</span>
                              <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                                <button 
                                  onClick={() => handleDecrement(item._id, item.size, item.quantity)}
                                  disabled={item.quantity <= 1}
                                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                                >
                                  <Minus className="w-4 h-4" />
                                </button>
                                <input 
                                  type="number" 
                                  min={1}
                                  value={item.quantity}
                                  onChange={(e) => handleQuantityChange(item._id, item.size, e.target.value)}
                                  className="w-12 h-10 text-center text-sm font-semibold text-gray-900 border-x border-gray-200 outline-none"
                                />
                                <button 
                                  onClick={() => handleIncrement(item._id, item.size, item.quantity)}
                                  className="w-10 h-10 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                                >
                                  <Plus className="w-4 h-4" />
                                </button>
                              </div>
                            </div>

                            {/* Item Total */}
                            <div className="ml-auto">
                              <span className="text-sm text-gray-500">Total:</span>
                              <span className="ml-2 text-lg font-bold text-gray-900">
                                {currency}{(productData.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })
            )}

            {/* Save for Later / Continue Shopping */}
            {cartData.length > 0 && (
              <div className={`flex flex-wrap gap-3 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <button className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-full text-gray-700 font-medium hover:border-gray-900 hover:bg-gray-50 transition-all">
                  <Heart className="w-4 h-4" />
                  Save for Later
                </button>
                <button 
                  onClick={() => navigate('/collection')}
                  className="flex items-center gap-2 px-6 py-3 border-2 border-gray-200 rounded-full text-gray-700 font-medium hover:border-gray-900 hover:bg-gray-50 transition-all"
                >
                  <Package className="w-4 h-4" />
                  Add More Items
                </button>
              </div>
            )}
          </div>

          {/* Order Summary - Right Side */}
          <div className={`lg:col-span-1 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="sticky top-24 space-y-4">
              <CartTotal />
              
              {/* Checkout Button */}
              <button 
                onClick={() => navigate('/place-order')}
                disabled={cartData.length === 0}
                className="w-full group flex items-center justify-center gap-3 bg-gray-900 text-white py-4 rounded-xl font-semibold text-base hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg shadow-gray-900/20 hover:shadow-xl hover:shadow-gray-900/30"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {/* Secure Checkout Note */}
              <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
                <ShieldCheck className="w-4 h-4 text-green-500" />
                <span>Secure SSL Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart