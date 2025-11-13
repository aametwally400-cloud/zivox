import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Truck, ShieldCheck, Clock, CreditCard, MessageCircle, Instagram } from 'lucide-react';
import { getFeaturedProducts, getDiscountedProducts } from '../data/products';

const HomePage: React.FC = () => {
  const featuredProducts = getFeaturedProducts(4);
  const discountedProducts = getDiscountedProducts(4);

  return (
    <div className="pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-primary-700 to-primary-900 text-white py-12 md:py-20 overflow-hidden relative">
        <div className="container-custom relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                Skilz Store
              </h1>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-primary-100">
                أحدث صيحات الموضة
              </h2>
              <p className="text-lg md:text-xl mb-6 text-primary-100">
                اكتشف مجموعتنا الحصرية من الملابس العصرية والأنيقة بأفضل الأسعار
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  to="/products" 
                  className="btn btn-primary bg-accent-500 hover:bg-accent-600 px-6 py-3 inline-flex items-center"
                >
                  تسوق الآن
                  <ArrowLeft className="mr-2" size={18} />
                </Link>
                <a 
                  href="https://wa.me/01500823448" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-outline border-white text-white hover:bg-white/10 px-6 py-3 inline-flex items-center"
                >
                  <MessageCircle className="ml-2" size={18} />
                  تواصل معنا
                </a>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center animate-float">
              <img 
                src="/files_4725149-1750797314656-image.png" 
                alt="Skilz Store - ملابس عصرية" 
                className="w-full max-w-md rounded-lg shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent-500 rounded-full translate-x-1/2 translate-y-1/2"></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center p-4 bg-gray-50 rounded-lg transition-transform hover:scale-105">
              <div className="p-3 bg-primary-100 text-primary-700 rounded-full mr-4">
                <Truck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">توصيل سريع</h3>
                <p className="text-gray-600 text-sm">توصيل مجاني داخل القاهرة</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg transition-transform hover:scale-105">
              <div className="p-3 bg-primary-100 text-primary-700 rounded-full mr-4">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">ضمان الجودة</h3>
                <p className="text-gray-600 text-sm">منتجات أصلية 100%</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg transition-transform hover:scale-105">
              <div className="p-3 bg-primary-100 text-primary-700 rounded-full mr-4">
                <MessageCircle size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">دعم واتساب</h3>
                <p className="text-gray-600 text-sm">خدمة عملاء سريعة</p>
              </div>
            </div>

            <div className="flex items-center p-4 bg-gray-50 rounded-lg transition-transform hover:scale-105">
              <div className="p-3 bg-primary-100 text-primary-700 rounded-full mr-4">
                <CreditCard size={24} />
              </div>
              <div>
                <h3 className="font-bold text-lg mb-1">دفع آمن</h3>
                <p className="text-gray-600 text-sm">طرق دفع متعددة</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">منتجات مميزة</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              اكتشف مجموعتنا المميزة من الملابس العصرية والأنيقة
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map(product => (
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
                      {product.price} ج.م
                    </span>
                    <div className="flex items-center">
                      <span className="text-yellow-500">★</span>
                      <span className="ml-1 text-gray-600 text-sm">{product.rating}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/products" className="btn btn-primary px-8 py-3 inline-block">
              عرض جميع المنتجات
            </Link>
          </div>
        </div>
      </section>

      {/* Discount Section */}
      <section className="py-12 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">عروض خاصة</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              احصل على خصومات مميزة على مجموعة من منتجاتنا لفترة محدودة
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {discountedProducts.slice(0, 2).map(product => (
              <Link 
                key={product.id} 
                to={`/products/${product.id}`} 
                className="group bg-gray-50 rounded-lg overflow-hidden flex flex-col md:flex-row"
              >
                <div className="md:w-2/5 overflow-hidden">
                  <img 
                    src={product.images[0]} 
                    alt={product.name}
                    className="w-full h-64 md:h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="md:w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <div className="inline-block px-3 py-1 bg-accent-100 text-accent-800 rounded-full text-sm font-medium mb-3">
                      خصم {Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100)}%
                    </div>
                    <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 line-clamp-2">{product.description}</p>
                  </div>
                  <div>
                    <div className="flex items-center mb-4">
                      <span className="text-xl font-bold text-primary-700 ml-2">
                        {product.price} ج.م
                      </span>
                      <span className="text-gray-500 line-through text-sm">
                        {product.oldPrice} ج.م
                      </span>
                    </div>
                    <span className="inline-block text-primary-600 font-medium group-hover:translate-x-2 transition-transform">
                      اطلب الآن
                      <ArrowLeft className="inline mr-1" size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">تسوق حسب التصنيف</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              تصفح منتجاتنا حسب الفئة للعثور على ما تبحث عنه بسهولة
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link 
              to="/products?category=hoodies" 
              className="relative rounded-lg overflow-hidden h-64 group"
            >
              <img 
                src="/files_4725149-1750797344849-image.png" 
                alt="هوديز"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white mb-1">هوديز</h3>
                <span className="text-primary-300 inline-flex items-center">
                  تسوق الآن
                  <ArrowLeft className="mr-1" size={16} />
                </span>
              </div>
            </Link>

            <Link 
              to="/products?category=tshirts" 
              className="relative rounded-lg overflow-hidden h-64 group"
            >
              <img 
                src="https://images.pexels.com/photos/8532616/pexels-photo-8532616.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="تيشيرتات"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white mb-1">تيشيرتات</h3>
                <span className="text-primary-300 inline-flex items-center">
                  تسوق الآن
                  <ArrowLeft className="mr-1" size={16} />
                </span>
              </div>
            </Link>

            <Link 
              to="/products?category=pants" 
              className="relative rounded-lg overflow-hidden h-64 group"
            >
              <img 
                src="https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="بناطيل"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-90"></div>
              <div className="absolute bottom-0 left-0 p-6">
                <h3 className="text-xl font-bold text-white mb-1">بناطيل</h3>
                <span className="text-primary-300 inline-flex items-center">
                  تسوق الآن
                  <ArrowLeft className="mr-1" size={16} />
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 bg-primary-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">تواصل معنا</h2>
            <p className="text-gray-600 mb-6">
              لديك استفسار؟ تواصل معنا عبر الواتساب للحصول على أسرع رد
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="https://wa.me/01500823448" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-primary inline-flex items-center px-6 py-3"
              >
                <MessageCircle className="ml-2" size={18} />
                واتساب: 015 00823448
              </a>
              <a 
                href="https://www.instagram.com/skilz_store?fbclid=IwY2xjawLH689leHRuA2FlbQIxMABicmlkETE0OEVRV2lIN3FpOHhPcXZrAR712owZYuiSU35wa-QTsFx-eEACuAPe7OVtQo-IH7ft6zBJJwjjxMybs28fbg_aem_wyF-VxDFpg3rDc1f6RDLeQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-outline inline-flex items-center px-6 py-3"
              >
                <Instagram className="ml-2" size={18} />
                تابعنا على انستجرام
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;