import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'
import { Heart, Eye, ShoppingBag, Star, ArrowUpRight } from 'lucide-react'

const ProductItem = ({id, image, name, price}) => {
  const {currency} = useContext(ShopContext)
  const [isHovered, setIsHovered] = useState(false)
  const [isLiked, setIsLiked] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <Link 
      className='group relative block'
      to={`/product/${id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Container */}
      <div className='relative aspect-[3/4] overflow-hidden rounded-2xl bg-gray-100'>
        {/* Skeleton Loader */}
        {!imageLoaded && (
          <div className='absolute inset-0 bg-gray-200 animate-pulse' />
        )}
        
        {/* Main Image */}
        <img 
          className={`w-full h-full object-cover transition-all duration-700 ease-out ${
            isHovered ? 'scale-110' : 'scale-100'
          } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          src={image[0]} 
          alt={name}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Overlay Gradient */}
        <div className={`absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent transition-opacity duration-500 ${
          isHovered ? 'opacity-100' : 'opacity-0'
        }`} />

        {/* Top Actions */}
        <div className={`absolute top-3 right-3 flex flex-col gap-2 transition-all duration-300 ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
        }`}>
          {/* Wishlist Button */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
              setIsLiked(!isLiked)
            }}
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${
              isLiked 
                ? 'bg-red-500 text-white shadow-lg shadow-red-500/30' 
                : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white'
            }`}
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>

          {/* Quick View */}
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className='w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 flex items-center justify-center transition-all duration-300 hover:bg-white hover:scale-110'
          >
            <Eye className='w-5 h-5' />
          </button>
        </div>

        {/* Bottom Action Bar */}
        <div className={`absolute bottom-0 left-0 right-0 p-4 transition-all duration-500 ${
          isHovered ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'
        }`}>
          <button
            onClick={(e) => {
              e.preventDefault()
              e.stopPropagation()
            }}
            className='w-full py-3 bg-white text-gray-900 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors shadow-lg'
          >
            <ShoppingBag className='w-4 h-4' />
            Add to Cart
          </button>
        </div>

        {/* Badge - New Arrival */}
        <div className='absolute top-3 left-3'>
          <span className='px-3 py-1.5 bg-gray-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-full'>
            New
          </span>
        </div>

        {/* Rating */}
        <div className='absolute bottom-3 left-3 flex items-center gap-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg'>
          <Star className='w-3 h-3 text-amber-400 fill-amber-400' />
          <span className='text-xs font-semibold text-gray-700'>4.8</span>
        </div>
      </div>

      {/* Product Info */}
      <div className='pt-4 space-y-2'>
        {/* Name */}
        <h3 className='text-[15px] font-medium text-gray-900 leading-snug line-clamp-2 group-hover:text-gray-600 transition-colors duration-300'>
          {name}
        </h3>

        {/* Price Row */}
        <div className='flex items-center justify-between'>
          <div className='flex items-baseline gap-1'>
            <span className='text-lg font-bold text-gray-900'>{currency}{price}</span>
            <span className='text-sm text-gray-400 line-through'>
              {currency}{(price * 1.2).toFixed(0)}
            </span>
          </div>
          
          {/* Arrow Icon */}
          <div className={`w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center transition-all duration-300 ${
            isHovered ? 'bg-gray-900 text-white rotate-45' : 'text-gray-400'
          }`}>
            <ArrowUpRight className='w-4 h-4' />
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductItem