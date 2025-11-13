import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="container-custom py-12">
        <div className="bg-white rounded-lg shadow-sm p-8 text-center max-w-2xl mx-auto">
          <div className="text-primary-600 mb-4">
            <ShoppingBag size={64} className="mx-auto" />
          </div>
          <h1 className="text-2xl font-bold mb-4">سلة التسوق فارغة</h1>
          <p className="text-gray-600 mb-6">
            لم تقم بإضافة أي منتجات إلى سلة التسوق الخاصة بك بعد.
          </p>
          <Link 
            to="/products" 
            className="btn btn-primary inline-flex items-center px-6 py-3"
          >
            تصفح المنتجات
            <ArrowLeft size={18} className="mr-2" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container-custom py-12">
      <h1 className="text-2xl md:text-3xl font-bold mb-8">سلة التسوق</h1>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-right">المنتج</th>
                  <th className="py-3 px-4 text-right hidden md:table-cell">السعر</th>
                  <th className="py-3 px-4 text-right">الكمية</th>
                  <th className="py-3 px-4 text-right">المجموع</th>
                  <th className="py-3 px-4"><span className="sr-only">الإجراءات</span></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.product.id} className="border-b border-gray-200">
                    <td className="py-4 px-4">
                      <div className="flex items-center">
                        <Link to={`/products/${item.product.id}`} className="relative w-16 h-16 mr-4 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={item.product.images[0]} 
                            alt={item.product.name} 
                            className="w-full h-full object-cover"
                          />
                        </Link>
                        <div>
                          <Link 
                            to={`/products/${item.product.id}`} 
                            className="font-medium text-gray-800 hover:text-primary-600 line-clamp-1"
                          >
                            {item.product.name}
                          </Link>
                          <span className="text-sm text-gray-500 md:hidden block mt-1">
                            {item.product.price} ر.س
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 hidden md:table-cell">
                      <span className="font-medium">
                        {item.product.price} ر.س
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex items-center border border-gray-300 rounded-md w-28">
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)} 
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-12 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)} 
                          className="px-3 py-1 text-gray-600 hover:bg-gray-100 transition-colors"
                          disabled={item.quantity >= item.product.stockCount}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="font-medium text-primary-700">
                        {(item.product.price * item.quantity).toFixed(2)} ر.س
                      </span>
                    </td>
                    <td className="py-4 px-4 text-center">
                      <button 
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-gray-500 hover:text-red-600 transition-colors p-1"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-6 flex justify-between">
            <Link to="/products" className="inline-flex items-center text-primary-600 hover:text-primary-800">
              <ArrowLeft size={16} className="ml-1" />
              العودة للتسوق
            </Link>
          </div>
        </div>
        
        {/* Order summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200">ملخص الطلب</h2>
            
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-700">
                <span>عدد المنتجات:</span>
                <span>{cart.length}</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>مجموع المنتجات:</span>
                <span>{totalPrice.toFixed(2)} ر.س</span>
              </div>
              <div className="flex justify-between text-gray-700">
                <span>الشحن:</span>
                <span className="text-green-600">مجاني</span>
              </div>
              <div className="pt-3 mt-3 border-t border-gray-200">
                <div className="flex justify-between font-bold text-lg">
                  <span>المجموع الكلي:</span>
                  <span className="text-primary-700">{totalPrice.toFixed(2)} ر.س</span>
                </div>
                <p className="text-sm text-gray-500 mt-1">شامل الضريبة</p>
              </div>
            </div>
            
            <Link 
              to="/checkout" 
              className="btn btn-primary w-full py-3 text-center block"
            >
              متابعة الشراء
            </Link>
            
            <div className="mt-6 space-y-4">
              <div className="flex items-center">
                <div className="p-2 bg-primary-100 text-primary-700 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <span className="text-sm text-gray-600">دفع آمن 100%</span>
              </div>
              <div className="flex items-center">
                <div className="p-2 bg-primary-100 text-primary-700 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <span className="text-sm text-gray-600">ضمان استرجاع المال</span>
              </div>
              <div className="flex items-center">
                <div className="p-2 bg-primary-100 text-primary-700 rounded-full mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"></rect>
                    <polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon>
                    <circle cx="5.5" cy="18.5" r="2.5"></circle>
                    <circle cx="18.5" cy="18.5" r="2.5"></circle>
                  </svg>
                </div>
                <span className="text-sm text-gray-600">شحن سريع</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;