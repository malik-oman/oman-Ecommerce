import React, { useContext, useEffect, useState, useRef } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import { useLocation } from 'react-router-dom'
import { Search, X, SlidersHorizontal, TrendingUp, Clock, Sparkles } from 'lucide-react'

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext)
  const [visible, setVisible] = useState(false)
  const [isFocused, setIsFocused] = useState(false)
  const [recentSearches, setRecentSearches] = useState(['Summer Collection', 'Nike Shoes', 'Casual Wear'])
  const [trendingSearches] = useState(['Winter Sale', 'New Arrivals', 'Best Sellers'])
  const inputRef = useRef(null)
  const location = useLocation()

  // Original functionality preserved
  useEffect(() => {
    if (location.pathname.includes('collection')) {
      setVisible(true)
    } else {
      setVisible(false)
    }
  }, [location])

  // Focus input when shown
  useEffect(() => {
    if (showSearch && visible && inputRef.current) {
      setTimeout(() => inputRef.current.focus(), 100)
    }
  }, [showSearch, visible])

  const clearSearch = () => {
    setSearch('')
    inputRef.current?.focus()
  }

  const handleRecentClick = (term) => {
    setSearch(term)
  }

  return showSearch && visible ? (
    <div className='fixed inset-0 z-50'>
      {/* Backdrop with blur */}
      <div 
        className='absolute inset-0 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300'
        onClick={() => setShowSearch(false)}
      />

      {/* Search Container */}
      <div className='absolute top-0 left-0 right-0 bg-white shadow-2xl animate-in slide-in-from-top-10 duration-500'>
        <div className='max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8'>
          
          {/* Main Search Input */}
          <div className='relative'>
            {/* Glow effect */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-2xl blur opacity-0 transition-opacity duration-300 ${isFocused ? 'opacity-100' : ''}`} />
            
            <div className={`relative flex items-center gap-4 bg-gray-50 rounded-2xl border-2 px-6 py-4 transition-all duration-300 ${isFocused ? 'border-gray-900 bg-white shadow-lg' : 'border-gray-200'}`}>
              <Search className={`w-6 h-6 transition-colors duration-300 ${isFocused ? 'text-gray-900' : 'text-gray-400'}`} />
              
              <input 
                ref={inputRef}
                value={search} 
                onChange={(e) => setSearch(e.target.value)} 
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                className='flex-1 bg-transparent outline-none text-lg text-gray-900 placeholder:text-gray-400 font-medium'
                type="text" 
                placeholder='Search for products, brands, and more...' 
              />
              
              {search && (
                <button 
                  onClick={clearSearch}
                  className='p-2 rounded-full hover:bg-gray-200 transition-colors duration-200'
                >
                  <X className='w-5 h-5 text-gray-500' />
                </button>
              )}
              
              <button className='hidden sm:flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl font-semibold text-sm hover:bg-gray-800 transition-colors duration-200'>
                Search
              </button>
            </div>
          </div>

          {/* Search Suggestions */}
          <div className='mt-8 grid grid-cols-1 md:grid-cols-2 gap-8'>
            {/* Recent Searches */}
            <div className='space-y-4'>
              <div className='flex items-center gap-2 text-gray-500'>
                <Clock className='w-4 h-4' />
                <span className='text-sm font-semibold uppercase tracking-wide'>Recent Searches</span>
              </div>
              <div className='flex flex-wrap gap-2'>
                {recentSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentClick(term)}
                    className='group flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full text-sm text-gray-700 transition-all duration-200'
                  >
                    <span>{term}</span>
                    <ArrowUpRight className='w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity' />
                  </button>
                ))}
              </div>
            </div>

            {/* Trending Searches */}
            <div className='space-y-4'>
              <div className='flex items-center gap-2 text-gray-500'>
                <TrendingUp className='w-4 h-4' />
                <span className='text-sm font-semibold uppercase tracking-wide'>Trending Now</span>
              </div>
              <div className='flex flex-wrap gap-2'>
                {trendingSearches.map((term, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentClick(term)}
                    className='group flex items-center gap-2 px-4 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-full text-sm text-amber-800 transition-all duration-200'
                  >
                    <Sparkles className='w-3 h-3 text-amber-500' />
                    <span>{term}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Filters Quick Access */}
          <div className='mt-8 pt-6 border-t border-gray-100'>
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2 text-gray-500'>
                <SlidersHorizontal className='w-4 h-4' />
                <span className='text-sm font-semibold uppercase tracking-wide'>Quick Filters</span>
              </div>
              <div className='flex gap-3'>
                {['All', 'Men', 'Women', 'Kids', 'Accessories'].map((filter, index) => (
                  <button
                    key={index}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${index === 0 ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                  >
                    {filter}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button 
            onClick={() => setShowSearch(false)}
            className='absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors duration-200 group'
          >
            <X className='w-6 h-6 text-gray-400 group-hover:text-gray-900 transition-colors' />
          </button>
        </div>

        {/* Bottom Gradient Line */}
        <div className='h-1 bg-gradient-to-r from-gray-900 via-gray-600 to-gray-900' />
      </div>
    </div>
  ) : null
}

export default SearchBar