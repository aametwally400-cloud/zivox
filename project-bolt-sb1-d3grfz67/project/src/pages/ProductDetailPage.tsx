import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Minus, Plus, ShoppingCart, Heart, Share2, Star, Check } from 'lucide-react';
import { getProductById, getFeaturedProducts, Product } from '../data/products';
import { useCart } from '../contexts/CartContext';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'specifications' | 'reviews'>('description');
  
  useEffect(() => {
    if (id) {
      const productData = getProductById(parseInt(id, 10));
      setProduct(productData);
      
      // Reset state when product changes
      setQuantity(1);
      setActiveImage(0);
      setActiveTab('description');
      
      // Get related products (using featured products as a simple substitute)
      setRelatedProducts(getFeaturedProducts(4).filter(p => p.id !== parseInt(id, 10)));
    }
  }, [id]);
  
  if (!product) {
    return (
      <div className="container-custom py-12 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
          <div className="h-64 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
        </div>
      </div>
    );
  }
  
  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };
  
  const increaseQuantity = () => {
    if (quantity < product.stockCount) {
      setQuantity(quantity + 1);
    }
  };
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const discountPercentage = product.oldPrice 
    ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100) 
    : 0;

  return (
    <div className="pb-12">
      {/* Breadcrumb */}
      <div className="bg-gray-100 py-3">
        <div className="container-custom">
          <div className="flex items-center text-sm text-gray-600">
            <Link to="/" className="hover:text-primary-600">الرئيسية</Link>
            <span className="mx-2">/</span>
            <Link to="/products" className="hover:text-primary-600">المنتجات</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-800 font-medium">{product.name}</span>
          </div>
        </div>
      </div>
      
      {/* Product detail section */}
      <section className="py-8">
        <div className="container-custom">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
              {/* Product images */}
              <div>
                <div className="mb-4 rounded-lg overflow-hidden aspect-square">
                  <img 
                    src={product.images[activeImage]} 
                    alt={product.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                
                <div className="flex space-x-2 space-x-reverse">
                  {product.images.map((image, index) => (
                    <button 
                      key={index} 
                      className={`border-2 rounded-md overflow-hidden w-16 h-16 ${
                        activeImage === index ? 'border-primary-600' : 'border-gray-200'
                      }`}
                      onClick={() => setActiveImage(index)}
                    >
                      <img 
                        src={image} 
                        alt={`${product.name} - صورة ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
              
              {/* Product info */}
              <div className="flex flex-col">
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
                  {product.name}
                </h1>
                
                <div className="flex items-center mb-4">
                  <div className="flex">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star 
                        key={i} 
                        size={18} 
                        className={i < Math.floor(product.rating) 
                          ? 'text-yellow-400 fill-yellow-400' 
                          : 'text-gray-300'
                        } 
                      />
                    ))}
                  </div>
                  <span className="mr-2 text-gray-600 text-sm">{product.rating} (24 تقييم)</span>
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center mb-2">
                    <span className="text-2xl font-bold text-primary-700">
                      {product.price} ر.س
                    </span>
                    {product.oldPrice && (
                      <>
                        <span className="mr-3 text-gray-500 line-through">
                          {product.oldPrice} ر.س
                        </span>
                        <span className="mr-3 bg-accent-100 text-accent-800 text-sm font-medium px-2 py-0.5 rounded">
                          خصم {discountPercentage}%
                        </span>
                      </>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm text-green-600">
                    <Check size={16} className="ml-1" />
                    <span>متوفر في المخزون - {product.stockCount} قطعة</span>
                  </div>
                </div>
                
                <div className="border-t border-b border-gray-200 py-4 mb-6">
                  <div
                    className={`text-gray-700 ${isDescriptionExpanded ? '' : 'line-clamp-3'}`}
                  >
                    {product.description}
                  </div>
                  {product.description.length > 150 && (
                    <button
                      onClick={() => setIsDescriptionExpanded(!isDescriptionExpanded)}
                      className="text-primary-600 hover:text-primary-700 font-medium text-sm mt-2"
                    >
                      {isDescriptionExpanded ? 'عرض أقل' : 'عرض المزيد'}
                    </button>
                  )}
                </div>
                
                {/* Features */}
                {product.features && (
                  <div className="mb-6">
                    <h3 className="font-bold text-lg mb-3">المميزات:</h3>
                    <ul className="space-y-1">
                      {product.features.map((feature, index) => (
                        <li key={index} className="flex items-start">
                          <Check size={16} className="ml-2 text-primary-600 mt-1 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                
                {/* Quantity selector and add to cart */}
                <div className="mt-auto">
                  <div className="flex items-center mb-4">
                    <span className="ml-4 font-medium">الكمية:</span>
                    <div className="flex items-center border border-gray-300 rounded-md">
                      <button 
                        onClick={decreaseQuantity} 
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                        disabled={quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-12 text-center">{quantity}</span>
                      <button 
                        onClick={increaseQuantity} 
                        className="px-3 py-2 text-gray-600 hover:bg-gray-100 transition-colors"
                        disabled={quantity >= product.stockCount}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    <button 
                      onClick={handleAddToCart}
                      className="flex-1 btn btn-primary py-3 flex items-center justify-center"
                    >
                      <ShoppingCart size={18} className="ml-2" />
                      إضافة إلى السلة
                    </button>
                    <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                      <Heart size={20} className="text-gray-600" />
                    </button>
                    <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                      <Share2 size={20} className="text-gray-600" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="border-t border-gray-200">
              <div className="flex border-b border-gray-200">
                <button 
                  onClick={() => setActiveTab('description')}
                  className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                    activeTab === 'description' 
                      ? 'border-b-2 border-primary-600 text-primary-600' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  الوصف
                </button>
                <button 
                  onClick={() => setActiveTab('specifications')}
                  className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                    activeTab === 'specifications' 
                      ? 'border-b-2 border-primary-600 text-primary-600' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  المواصفات
                </button>
                <button 
                  onClick={() => setActiveTab('reviews')}
                  className={`px-6 py-3 font-medium text-sm focus:outline-none ${
                    activeTab === 'reviews' 
                      ? 'border-b-2 border-primary-600 text-primary-600' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                >
                  التقييمات
                </button>
              </div>
              
              <div className="p-6">
                {activeTab === 'description' && (
                  <div className="prose max-w-none">
                    <p className="mb-4">{product.description}</p>
                    <p className="text-gray-700">
                      يتميز {product.name} بتصميم أنيق وجودة عالية، مما يجعله خيارًا مثاليًا لاحتياجاتك اليومية. تم تصنيعه باستخدام أفضل المواد لضمان المتانة والأداء الممتاز على المدى الطويل.
                    </p>
                  </div>
                )}
                
                {activeTab === 'specifications' && (
                  <div>
                    {product.specifications ? (
                      <table className="w-full text-right">
                        <tbody>
                          {Object.entries(product.specifications).map(([key, value]) => (
                            <tr key={key} className="border-b border-gray-200">
                              <th className="py-3 pl-4 text-gray-600 font-medium w-1/3">{key}</th>
                              <td className="py-3 pr-4 text-gray-800">{value}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <p className="text-gray-600">لا توجد مواصفات متاحة لهذا المنتج.</p>
                    )}
                  </div>
                )}
                
                {activeTab === 'reviews' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-lg font-bold">تقييمات العملاء</h3>
                      <button className="btn btn-primary">إضافة تقييم</button>
                    </div>
                    
                    <div className="space-y-6">
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-bold">أحمد محمد</h4>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={i < 5 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm mb-1">
                          منتج رائع ويستحق السعر! جودة عالية وتصميم أنيق.
                        </p>
                        <span className="text-gray-500 text-xs">15 مايو، 2025</span>
                      </div>
                      
                      <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex justify-between mb-2">
                          <h4 className="font-bold">سارة عبدالله</h4>
                          <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star 
                                key={i} 
                                size={16} 
                                className={i < 4 ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm mb-1">
                          وصل المنتج بسرعة والتغليف كان ممتاز. المنتج يعمل بشكل جيد حتى الآن.
                        </p>
                        <span className="text-gray-500 text-xs">3 مايو، 2025</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Related products */}
      <section className="py-8">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-6">منتجات ذات صلة</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <Link 
                key={product.id} 
                to={`/products/${product.id}`} 
                className="product-card group"
              >
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary-700">
                      {product.price} ر.س
                    </span>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="mr-1 text-gray-600 text-sm">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProductDetailPage;