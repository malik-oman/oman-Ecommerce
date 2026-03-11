import React, { useContext, useState, useEffect, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import Title from './Title'
import ProductItem from './ProductItem'
import { ArrowRight, Sparkles, Layers, ChevronLeft, ChevronRight } from 'lucide-react'

const RelatedProducts = ({category, subCategory}) => {
  const {products} = useContext(ShopContext)
  const [related, setRelated] = useState([])
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredIndex, setHoveredIndex] = useState(null)
  const sectionRef = useRef(null)

  // Original functionality preserved
  useEffect(() => {
    if (products.length > 0) {
      let productsCopy = products.slice()
      productsCopy = productsCopy.filter((item) => category === item.category)
      productsCopy = productsCopy.filter((item) => subCategory === item.subCategory)
      setRelated(productsCopy.slice(0, 5))
    }
  }, [products])

  // Scroll animation
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

  return (
    <section 
      ref={sectionRef}
      className='relative py-20 overflow-hidden'
    >
      {/* Background Decoration */}
      <div className='absolute inset-0 pointer-events-none'>
        <div className='absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-purple-100/50 to-transparent rounded-full blur-3xl' />
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-orange-100/50 to-transparent rounded-full blur-3xl' />
      </div>

      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        {/* Header Section */}
        <div className={`flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className='text-center sm:text-left'>
            {/* Badge */}
            <div className='inline-flex items-center gap-2 px-4 py-2 mb-4 bg-white rounded-full shadow-sm border border-gray-100'>
              <Layers className='w-4 h-4 text-purple-500' />
              <span className='text-sm font-semibold text-gray-700 uppercase tracking-wide'>
                You May Also Like
              </span>
            </div>

            {/* Title */}
            <div className='relative inline-block'>
              <h2 className='text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 tracking-tight'>
                Related{' '}
                <span className='relative inline-block'>
                  <span className='relative z-10 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 to-gray-600'>
                    Products
                  </span>
                  <Sparkles className='absolute -top-4 -right-6 w-5 h-5 text-amber-400 animate-pulse' />
                </span>
              </h2>
              <div className='absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-gray-900 to-transparent rounded-full' />
            </div>

            {/* Subtitle */}
            <p className='mt-4 text-gray-500 max-w-md'>
              Discover more items from the same collection. Curated just for you based on your interests.
            </p>
          </div>

          {/* View All Link */}
          <Link 
            to='/collection'
            className='group flex items-center gap-2 px-6 py-3 bg-gray-900 text-white rounded-full font-semibold text-sm hover:bg-gray-800 transition-all duration-300 hover:shadow-lg hover:shadow-gray-900/20 self-center sm:self-auto'
          >
            View All
            <ArrowRight className='w-4 h-4 transition-transform duration-300 group-hover:translate-x-1' />
          </Link>
        </div>

        {/* Products Grid */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-8'>
          {related.map((item, index) => (
            <div
              key={item._id}
              className={`transform transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
              style={{ transitionDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              {/* Product Card Wrapper */}
              <div className={`relative transition-all duration-500 ${hoveredIndex !== null && hoveredIndex !== index ? 'scale-95 opacity-70' : 'scale-100 opacity-100'}`}>
                {/* Glow Effect */}
                <div className={`absolute -inset-3 bg-gradient-to-r from-gray-200 to-gray-100 rounded-3xl blur-xl opacity-0 transition-opacity duration-500 pointer-events-none ${hoveredIndex === index ? 'opacity-60' : ''}`} />
                
                {/* Product Item */}
                <div className='relative z-10'>
                  <ProductItem 
                    id={item._id} 
                    name={item.name} 
                    price={item.price} 
                    image={item.image}
                  />
                </div>

                {/* Index Number */}
                <div className={`absolute -top-3 -left-3 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold shadow-lg transition-all duration-300 ${hoveredIndex === index ? 'scale-110' : 'scale-100'}`}>
                  0{index + 1}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className={`mt-16 flex flex-wrap justify-center gap-8 pt-8 border-t border-gray-200 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {[
            { value: related.length, label: 'Related Items' },
            { value: category, label: 'Category' },
            { value: subCategory, label: 'Style' }
          ].map((stat, index) => (
            <div key={index} className='text-center px-6'>
              <p className='text-2xl font-bold text-gray-900'>
                {typeof stat.value === 'number' ? `0${stat.value}` : stat.value}
              </p>
              <p className='text-sm text-gray-500 uppercase tracking-wide'>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default RelatedProducts