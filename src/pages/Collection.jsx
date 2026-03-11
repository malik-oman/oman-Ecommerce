import React, { useContext, useEffect, useState, useRef } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../Components/Title";
import ProductItem from "../Components/ProductItem";
import { 
  SlidersHorizontal, 
  ChevronDown, 
  Grid3X3, 
  LayoutGrid, 
  Search,
  X,
  Filter,
  ArrowUpDown,
  Check
} from "lucide-react";

const Collection = () => {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relavent');
  const [isVisible, setIsVisible] = useState(false);
  const [gridView, setGridView] = useState('compact');
  const sectionRef = useRef(null);

  // Original functionality preserved
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.price - b.price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  };

  // Effects - Original functionality
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // Scroll animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Clear all filters
  const clearFilters = () => {
    setCategory([]);
    setSubCategory([]);
    setSortType('relavent');
  };

  const hasActiveFilters = category.length > 0 || subCategory.length > 0;

  return (
    <div ref={sectionRef} className="min-h-screen bg-gray-50/30">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header Section */}
        <div className={`mb-8 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {/* Breadcrumb & Title */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                <span className="hover:text-gray-900 cursor-pointer transition-colors">Home</span>
                <span>/</span>
                <span className="text-gray-900 font-medium">Collection</span>
              </div>
              <Title text1={"ALL"} text2={"COLLECTIONS"} />
            </div>

            {/* Results Count */}
            <div className="flex items-center gap-3 text-sm text-gray-600 bg-white px-4 py-2 rounded-full shadow-sm border border-gray-100">
              <Grid3X3 className="w-4 h-4" />
              <span className="font-medium">{filterProducts.length}</span>
              <span>products found</span>
            </div>
          </div>

          {/* Active Filters Display */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 mb-4 animate-in slide-in-from-top-2 duration-300">
              <span className="text-sm text-gray-500 mr-2">Active filters:</span>
              {[...category, ...subCategory].map((filter, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-900 text-white text-xs rounded-full"
                >
                  {filter}
                  <button 
                    onClick={() => {
                      if (category.includes(filter)) {
                        setCategory(prev => prev.filter(c => c !== filter));
                      } else {
                        setSubCategory(prev => prev.filter(s => s !== filter));
                      }
                    }}
                    className="hover:bg-white/20 rounded-full p-0.5 transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
              <button 
                onClick={clearFilters}
                className="text-xs text-red-500 hover:text-red-700 font-medium ml-2 transition-colors"
              >
                Clear all
              </button>
            </div>
          )}
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:w-72 flex-shrink-0 transition-all duration-500 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilter(!showFilter)}
              className="lg:hidden w-full flex items-center justify-between p-4 bg-white rounded-xl shadow-sm border border-gray-100 mb-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gray-900 flex items-center justify-center">
                  <Filter className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <span className="block font-semibold text-gray-900">Filters</span>
                  <span className="text-xs text-gray-500">
                    {category.length + subCategory.length} selected
                  </span>
                </div>
              </div>
              <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform duration-300 ${showFilter ? 'rotate-180' : ''}`} />
            </button>

            {/* Filter Content */}
            <div className={`space-y-4 ${showFilter ? 'block' : 'hidden'} lg:block`}>
              {/* Categories */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-50">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                      <span className="text-purple-600 font-bold text-xs">01</span>
                    </span>
                    Categories
                  </h3>
                </div>
                <div className="p-5 space-y-3">
                  {['Men', 'Women', 'Kids'].map((cat) => (
                    <label 
                      key={cat} 
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div className={`relative w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                        category.includes(cat) 
                          ? 'bg-gray-900 border-gray-900' 
                          : 'border-gray-300 group-hover:border-gray-400'
                      }`}>
                        {category.includes(cat) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <input 
                        type="checkbox" 
                        value={cat} 
                        checked={category.includes(cat)}
                        onChange={toggleCategory}
                        className="hidden"
                      />
                      <span className={`text-sm transition-colors duration-200 ${
                        category.includes(cat) ? 'text-gray-900 font-medium' : 'text-gray-600'
                      }`}>
                        {cat}
                      </span>
                      <span className="ml-auto text-xs text-gray-400">
                        {products.filter(p => p.category === cat).length}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Type */}
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-5 border-b border-gray-50">
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    <span className="w-8 h-8 rounded-lg bg-amber-100 flex items-center justify-center">
                      <span className="text-amber-600 font-bold text-xs">02</span>
                    </span>
                    Type
                  </h3>
                </div>
                <div className="p-5 space-y-3">
                  {['Topwear', 'Bottomwear', 'Winterwear'].map((type) => (
                    <label 
                      key={type} 
                      className="flex items-center gap-3 cursor-pointer group"
                    >
                      <div className={`relative w-5 h-5 rounded border-2 transition-all duration-200 flex items-center justify-center ${
                        subCategory.includes(type) 
                          ? 'bg-gray-900 border-gray-900' 
                          : 'border-gray-300 group-hover:border-gray-400'
                      }`}>
                        {subCategory.includes(type) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <input 
                        type="checkbox" 
                        value={type} 
                        checked={subCategory.includes(type)}
                        onChange={toggleSubCategory}
                        className="hidden"
                      />
                      <span className={`text-sm transition-colors duration-200 ${
                        subCategory.includes(type) ? 'text-gray-900 font-medium' : 'text-gray-600'
                      }`}>
                        {type}
                      </span>
                      <span className="ml-auto text-xs text-gray-400">
                        {products.filter(p => p.subCategory === type).length}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range Hint */}
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-5 text-white">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4" />
                  Price Range
                </h4>
                <p className="text-sm text-gray-300 mb-3">Products from $10 to $500</p>
                <div className="h-1 bg-white/20 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full" />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 p-4 bg-white rounded-xl shadow-sm border border-gray-100 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              {/* Grid Toggle */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 mr-2">View:</span>
                <button 
                  onClick={() => setGridView('compact')}
                  className={`p-2 rounded-lg transition-all duration-200 ${gridView === 'compact' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setGridView('comfortable')}
                  className={`p-2 rounded-lg transition-all duration-200 ${gridView === 'comfortable' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
                >
                  <LayoutGrid className="w-4 h-4" />
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-500 hidden sm:block">Sort by:</span>
                <div className="relative">
                  <select 
                    onChange={(e) => setSortType(e.target.value)} 
                    value={sortType}
                    className="appearance-none bg-gray-50 border border-gray-200 text-gray-900 text-sm rounded-xl px-4 py-2.5 pr-10 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent cursor-pointer hover:bg-gray-100 transition-colors min-w-[160px]"
                  >
                    <option value="relavent">Most Relevant</option>
                    <option value="low-high">Price: Low to High</option>
                    <option value="high-low">Price: High to Low</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-4 gap-y-8 transition-all duration-500 ${
              gridView === 'compact' 
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
            }`}>
              {filterProducts.map((item, index) => (
                <div
                  key={item._id}
                  className={`transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                  style={{ transitionDelay: `${Math.min(index * 50, 500)}ms` }}
                >
                  <ProductItem 
                    name={item.name} 
                    id={item._id} 
                    price={item.price} 
                    image={item.image} 
                  />
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filterProducts.length === 0 && (
              <div className="text-center py-20">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-500 mb-4">Try adjusting your filters or search terms</p>
                <button 
                  onClick={clearFilters}
                  className="px-6 py-2 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            )}

            {/* Load More */}
            {filterProducts.length > 0 && filterProducts.length >= 12 && (
              <div className="text-center mt-12">
                <button className="px-8 py-3 bg-white border-2 border-gray-200 text-gray-900 rounded-full font-medium hover:border-gray-900 hover:bg-gray-50 transition-all duration-300">
                  Load More Products
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Collection;