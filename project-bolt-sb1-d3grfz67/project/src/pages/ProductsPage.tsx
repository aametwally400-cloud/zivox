import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Filter, ChevronDown, GridIcon, List, Star, Search } from 'lucide-react';
import { products, getCategories, Product } from '../data/products';
import { useCart } from '../contexts/CartContext';

const ProductsPage: React.FC = () => {
  const { addToCart } = useCart();
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories] = useState<string[]>(getCategories());
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = useState<string>('featured');
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    searchParams.get('category') || null
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  // Update filters when URL parameters change
  useEffect(() => {
    const category = searchParams.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, [searchParams]);

  // Apply filters
  useEffect(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => product.category === selectedCategory);
    }
    
    // Apply price range filter
    result = result.filter(
      product => product.price >= priceRange[0] && product.price <= priceRange[1]
    );
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        product => 
          product.name.toLowerCase().includes(query) || 
          product.description.toLowerCase().includes(query)
      );
    }
    
    // Apply rating filter
    if (selectedRating) {
      result = result.filter(product => product.rating >= selectedRating);
    }
    
    // Apply sorting
    switch (sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'rating':
        result.sort((a, b) => b.rating - a.rating);
        break;
      default: // featured
        result.sort((a, b) => b.rating - a.rating);
    }
    
    setFilteredProducts(result);
  }, [selectedCategory, priceRange, searchQuery, selectedRating, sortBy]);

  const formatCategoryName = (category: string): string => {
    const categoryMap: Record<string, string> = {
      'hoodies': 'هوديز',
      'tshirts': 'تيشيرتات',
      'pants': 'بناطيل',
      'jackets': 'جاكيتات',
      'accessories': 'اكسسوارات',
      'sets': 'أطقم'
    };
    
    return categoryMap[category] || category;
  };

  const handleAddToCart = (event: React.MouseEvent, product: Product) => {
    event.preventDefault();
    event.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div className="pb-12">
      {/* Page header */}
      <div className="bg-primary-700 text-white py-8">
        <div className="container-custom">
          <h1 className="text-2xl md:text-3xl font-bold mb-2">Skilz Store - منتجاتنا</h1>
          <p className="text-primary-100">اكتشف مجموعتنا الواسعة من الملابس العصرية</p>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile filter button */}
          <div className="lg:hidden mb-4">
            <button
              onClick={() => setIsFilterOpen(!isFilterOpen)}
              className="w-full flex items-center justify-center py-3 px-4 bg-gray-100 rounded-lg text-gray-700 font-medium"
            >
              <Filter size={18} className="ml-2" />
              {isFilterOpen ? 'إخفاء الفلتر' : 'عرض الفلتر'}
            </button>
          </div>

          {/* Sidebar filters */}
          <div className={`lg:w-1/4 ${isFilterOpen ? 'block' : 'hidden'} lg:block`}>
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-bold text-lg mb-4 pb-2 border-b">البحث</h3>
              <div className="relative">
                <input
                  type="text"
                  placeholder="ابحث عن منتجات..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full p-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
                <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-bold text-lg mb-4 pb-2 border-b">التصنيفات</h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setSelectedCategory(null)}
                    className={`w-full text-right py-2 hover:text-primary-600 ${
                      selectedCategory === null ? 'text-primary-600 font-medium' : 'text-gray-700'
                    }`}
                  >
                    جميع المنتجات
                  </button>
                </li>
                {categories.map((category) => (
                  <li key={category}>
                    <button
                      onClick={() => setSelectedCategory(category)}
                      className={`w-full text-right py-2 hover:text-primary-600 ${
                        selectedCategory === category ? 'text-primary-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      {formatCategoryName(category)}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-bold text-lg mb-4 pb-2 border-b">السعر</h3>
              <div className="mb-2 flex justify-between text-sm text-gray-500">
                <span>{priceRange[0]} ج.م</span>
                <span>{priceRange[1]} ج.م</span>
              </div>
              <input
                type="range"
                min={0}
                max={1000}
                step={10}
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="w-full accent-primary-600"
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h3 className="font-bold text-lg mb-4 pb-2 border-b">التقييم</h3>
              <ul className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <li key={rating}>
                    <button
                      onClick={() => setSelectedRating(rating === selectedRating ? null : rating)}
                      className={`w-full text-right py-2 flex items-center hover:text-primary-600 ${
                        selectedRating === rating ? 'text-primary-600 font-medium' : 'text-gray-700'
                      }`}
                    >
                      <div className="flex items-center">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                        <span className="mr-2">وأعلى</span>
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product list */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 mr-2 rounded-md ${viewMode === 'grid' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <GridIcon size={20} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md ${viewMode === 'list' ? 'bg-primary-100 text-primary-700' : 'text-gray-600 hover:bg-gray-100'}`}
                >
                  <List size={20} />
                </button>
                <span className="mr-4 text-gray-600">
                  عرض {filteredProducts.length} منتج
                </span>
              </div>

              <div className="flex items-center">
                <label htmlFor="sort" className="text-gray-600 ml-2">
                  ترتيب حسب:
                </label>
                <div className="relative">
                  <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-gray-50 border border-gray-300 text-gray-700 py-2 px-4 pr-8 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  >
                    <option value="featured">الأكثر شهرة</option>
                    <option value="price-asc">السعر: من الأقل للأعلى</option>
                    <option value="price-desc">السعر: من الأعلى للأقل</option>
                    <option value="name-asc">الاسم: أ-ي</option>
                    <option value="name-desc">الاسم: ي-أ</option>
                    <option value="rating">التقييم</option>
                  </select>
                  <ChevronDown className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                </div>
              </div>
            </div>

            {/* Products grid/list */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white rounded-lg shadow-sm p-8 text-center">
                <div className="text-4xl mb-4">🔎</div>
                <h3 className="text-xl font-bold mb-2">لا توجد منتجات</h3>
                <p className="text-gray-600 mb-4">
                  لم نتمكن من العثور على منتجات تطابق معايير البحث الخاصة بك
                </p>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setPriceRange([0, 1000]);
                    setSearchQuery('');
                    setSelectedRating(null);
                  }}
                  className="btn btn-primary"
                >
                  إعادة ضبط الفلاتر
                </button>
              </div>
            ) : viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="product-card group"
                  >
                    <div className="relative aspect-square overflow-hidden rounded-t-lg">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.oldPrice && (
                        <div className="absolute top-2 right-2 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                          خصم {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 text-gray-800 group-hover:text-primary-600 transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {product.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-primary-700 block">
                            {product.price} ج.م
                          </span>
                          {product.oldPrice && (
                            <span className="text-gray-500 line-through text-sm">
                              {product.oldPrice} ج.م
                            </span>
                          )}
                        </div>
                        <div className="flex items-center">
                          <span className="text-yellow-500">★</span>
                          <span className="mr-1 text-gray-600 text-sm">
                            {product.rating}
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleAddToCart(e, product)}
                        className="mt-3 w-full py-2 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                      >
                        إضافة للسلة
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="space-y-6">
                {filteredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to={`/products/${product.id}`}
                    className="product-card group flex flex-col sm:flex-row"
                  >
                    <div className="relative sm:w-1/3 aspect-video sm:aspect-square rounded-t-lg sm:rounded-r-none sm:rounded-l-lg overflow-hidden">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      {product.oldPrice && (
                        <div className="absolute top-2 right-2 bg-accent-500 text-white text-xs font-bold px-2 py-1 rounded-md">
                          خصم {Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                        </div>
                      )}
                    </div>
                    <div className="p-4 sm:p-6 sm:w-2/3 flex flex-col">
                      <h3 className="font-bold text-xl mb-2 text-gray-800 group-hover:text-primary-600 transition-colors">
                        {product.name}
                      </h3>
                      <p className="text-gray-600 mb-4">{product.description}</p>
                      <div className="mt-auto">
                        <div className="flex flex-wrap items-center gap-4 mb-4">
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                size={16}
                                className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                              />
                            ))}
                            <span className="mr-1 text-gray-600 text-sm">
                              ({product.rating})
                            </span>
                          </div>
                          <span className="text-gray-500 text-sm border-r border-gray-300 pr-4">
                            المخزون: {product.stockCount} قطعة
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-xl font-bold text-primary-700 block">
                              {product.price} ج.م
                            </span>
                            {product.oldPrice && (
                              <span className="text-gray-500 line-through text-sm">
                                {product.oldPrice} ج.م
                              </span>
                            )}
                          </div>
                          <button
                            onClick={(e) => handleAddToCart(e, product)}
                            className="py-2 px-6 bg-primary-600 text-white rounded-md hover:bg-primary-700 transition-colors"
                          >
                            إضافة للسلة
                          </button>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination - Basic example */}
            <div className="mt-8 flex justify-center">
              <nav className="inline-flex rounded-md shadow">
                <button className="py-2 px-4 border border-gray-300 bg-white text-gray-700 rounded-r-md hover:bg-gray-50">
                  التالي
                </button>
                <button className="py-2 px-4 border-t border-b border-gray-300 bg-white text-gray-700">
                  2
                </button>
                <button className="py-2 px-4 border-t border-b border-gray-300 bg-primary-600 text-white">
                  1
                </button>
                <button className="py-2 px-4 border border-gray-300 bg-white text-gray-700 rounded-l-md hover:bg-gray-50">
                  السابق
                </button>
              </nav>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;