import React, { useContext, useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import RelatedProducts from "../Components/RelatedProducts";
import { 
  Heart, 
  Share2, 
  Truck, 
  ShieldCheck, 
  RefreshCcw, 
  Star,
  ChevronRight,
  Minus,
  Plus,
  ShoppingBag,
  CheckCircle2,
  AlertCircle
} from "lucide-react";

const Product = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState('description');
  const [isVisible, setIsVisible] = useState(false);
  const [showAddedMessage, setShowAddedMessage] = useState(false);
  const sectionRef = useRef(null);

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        return null;
      }
    });
  };

  useEffect(() => {
    fetchProductData();
    setIsVisible(true);
  }, [productId, products]);

  // Handle add to cart with feedback
  const handleAddToCart = () => {
    if (!size) {
      alert("Please select a size first");
      return;
    }
    addToCart(productData._id, size);
    setShowAddedMessage(true);
    setTimeout(() => setShowAddedMessage(false), 2000);
  };

  // Buy now handler
  const handleBuyNow = () => {
    if (!size) {
      alert("Please select a size first");
      return;
    }
    addToCart(productData._id, size);
    navigate('/cart');
  };

  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-gray-200 border-t-gray-900 rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div ref={sectionRef} className="min-h-screen bg-gray-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <div className={`flex items-center gap-2 text-sm text-gray-500 mb-8 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <span className="hover:text-gray-900 cursor-pointer" onClick={() => navigate('/')}>Home</span>
          <ChevronRight className="w-4 h-4" />
          <span className="hover:text-gray-900 cursor-pointer" onClick={() => navigate('/collection')}>Collection</span>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900 font-medium truncate max-w-[200px]">{productData.name}</span>
        </div>

        {/* Main Product Section */}
        <div className={`grid lg:grid-cols-2 gap-12 lg:gap-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100 group">
              <img 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                src={image} 
                alt={productData.name} 
              />
              
              {/* Top Actions */}
              <div className="absolute top-4 right-4 flex gap-2">
                <button 
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${isWishlisted ? 'bg-red-500 text-white' : 'bg-white/90 backdrop-blur-sm text-gray-700 hover:bg-white'}`}
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
                </button>
                <button className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm text-gray-700 flex items-center justify-center hover:bg-white transition-all duration-300">
                  <Share2 className="w-5 h-5" />
                </button>
              </div>

              {/* Badges */}
              <div className="absolute top-4 left-4 flex flex-col gap-2">
                <span className="px-3 py-1.5 bg-gray-900 text-white text-xs font-bold rounded-full">
                  New Arrival
                </span>
                <span className="px-3 py-1.5 bg-amber-500 text-white text-xs font-bold rounded-full">
                  -20% OFF
                </span>
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
              {productData.image.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setImage(item)}
                  className={`relative flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden transition-all duration-300 ${image === item ? 'ring-2 ring-gray-900 ring-offset-2' : 'opacity-60 hover:opacity-100'}`}
                >
                  <img src={item} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Title & Rating */}
            <div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 leading-tight mb-3">
                {productData.name}
              </h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star 
                      key={star} 
                      className={`w-5 h-5 ${star <= 4 ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} 
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-500">(122 reviews)</span>
                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
                  In Stock
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {currency}{productData.price}
                </span>
                <span className="text-xl text-gray-400 line-through">
                  {currency}{(productData.price * 1.25).toFixed(0)}
                </span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 text-sm font-semibold rounded-full">
                  Save 25%
                </span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed text-base">
              {productData.description}
            </p>

            {/* Size Selection */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-gray-900">Select Size</span>
                <button className="text-sm text-gray-500 hover:text-gray-900 underline">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {productData.sizes.map((item, index) => (
                  <button
                    key={index}
                    onClick={() => setSize(item)}
                    className={`relative w-14 h-14 rounded-xl font-semibold text-sm transition-all duration-300 ${item === size 
                      ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20 scale-105' 
                      : 'bg-white border-2 border-gray-200 text-gray-700 hover:border-gray-400'}`}
                  >
                    {item}
                    {item === size && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                        <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                      </span>
                    )}
                  </button>
                ))}
              </div>
              {!size && (
                <p className="flex items-center gap-2 text-sm text-amber-600">
                  <AlertCircle className="w-4 h-4" />
                  Please select a size to continue
                </p>
              )}
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4">
              <span className="font-semibold text-gray-900">Quantity</span>
              <div className="flex items-center border-2 border-gray-200 rounded-xl overflow-hidden">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 h-12 flex items-center justify-center font-semibold text-gray-900 border-x-2 border-gray-200">
                  {quantity}
                </span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                onClick={handleAddToCart}
                className="flex-1 group relative flex items-center justify-center gap-3 bg-gray-900 text-white py-4 rounded-xl font-semibold text-base overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-gray-900/20"
              >
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-gray-800 to-gray-900 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5" />
                  Add to Cart
                </span>
              </button>
              
              <button 
                onClick={handleBuyNow}
                className="flex-1 flex items-center justify-center gap-3 bg-amber-500 text-white py-4 rounded-xl font-semibold text-base hover:bg-amber-600 transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/20"
              >
                Buy Now
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Added to Cart Message */}
            {showAddedMessage && (
              <div className="flex items-center gap-2 p-4 bg-green-50 text-green-700 rounded-xl animate-in slide-in-from-top-2 duration-300">
                <CheckCircle2 className="w-5 h-5" />
                <span className="font-medium">Added to cart successfully!</span>
              </div>
            )}

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
              {[
                { icon: Truck, title: "Free Delivery", desc: "On orders over $50" },
                { icon: ShieldCheck, title: "Secure Payment", desc: "100% protected" },
                { icon: RefreshCcw, title: "Easy Returns", desc: "7 days return" }
              ].map((badge, index) => (
                <div key={index} className="text-center group">
                  <div className="w-12 h-12 mx-auto mb-2 rounded-full bg-gray-100 flex items-center justify-center group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                    <badge.icon className="w-5 h-5" />
                  </div>
                  <p className="text-xs font-semibold text-gray-900">{badge.title}</p>
                  <p className="text-[10px] text-gray-500">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Tabs Section */}
        <div className={`mt-20 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex border-b border-gray-200">
            {['description', 'reviews', 'shipping'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-8 py-4 text-sm font-semibold capitalize transition-all duration-300 relative ${activeTab === tab ? 'text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
              >
                {tab === 'reviews' ? 'Reviews (122)' : tab}
                {activeTab === tab && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-900 rounded-full" />
                )}
              </button>
            ))}
          </div>

          <div className="py-8">
            {activeTab === 'description' && (
              <div className="prose prose-gray max-w-none">
                <p className="text-gray-600 leading-relaxed mb-4">
                  I had a great shopping experience on this store. The website is
                  fast, clean, and very easy to use. Product quality was exactly as
                  shown in the pictures. Highly recommended!
                </p>
                <p className="text-gray-600 leading-relaxed">
                  At Forever, customer satisfaction is our top priority. Our dedicated
                  support team is always ready to assist you with any questions, order
                  inquiries, or product details. We ensure quick responses, clear
                  communication, and reliable solutions to make your shopping
                  experience smooth and stress-free.
                </p>
              </div>
            )}
            
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                {[1, 2, 3].map((review) => (
                  <div key={review} className="flex gap-4 p-4 bg-white rounded-xl border border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-gray-200 flex-shrink-0" />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-900">Customer {review}</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-3 h-3 text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm text-gray-500 mb-2">2 days ago</p>
                      <p className="text-gray-600 text-sm">Great product! Exactly as described and fast shipping.</p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'shipping' && (
              <div className="space-y-4 text-gray-600">
                <p>Free standard shipping on all orders over $50.</p>
                <p>Estimated delivery: 3-5 business days.</p>
                <p>Express shipping available at checkout.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className={`mt-12 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <RelatedProducts 
            category={productData.category} 
            subCategory={productData.subCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default Product;