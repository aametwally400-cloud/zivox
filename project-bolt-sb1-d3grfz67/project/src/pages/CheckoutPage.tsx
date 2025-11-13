import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { CreditCard, CheckCircle } from 'lucide-react';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  country: string;
  postcode: string;
  paymentMethod: 'credit-card' | 'cash';
  saveInfo: boolean;
}

const CheckoutPage: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState<'shipping' | 'payment' | 'confirmation'>('shipping');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: 'السعودية',
    postcode: '',
    paymentMethod: 'credit-card',
    saveInfo: true,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    });
  };

  const handleShippingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
    window.scrollTo(0, 0);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      setStep('confirmation');
      clearCart();
      window.scrollTo(0, 0);
    }, 1500);
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  if (cart.length === 0 && step !== 'confirmation') {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container-custom py-12">
      {step === 'confirmation' ? (
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary-100 text-primary-600 mb-6">
            <CheckCircle size={32} />
          </div>
          <h1 className="text-2xl font-bold mb-4">تم تأكيد طلبك بنجاح!</h1>
          <p className="text-gray-600 mb-6">
            شكراً لك على الطلب. سيتم إرسال تفاصيل الطلب إلى بريدك الإلكتروني.
            رقم الطلب الخاص بك هو: <span className="font-semibold">#ORD-2025-{Math.floor(100000 + Math.random() * 900000)}</span>
          </p>
          <div className="bg-gray-50 rounded-lg p-6 text-right mb-8">
            <h3 className="font-bold mb-4">معلومات الطلب</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">الاسم:</span>
                <span>{formData.firstName} {formData.lastName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">البريد الإلكتروني:</span>
                <span>{formData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">العنوان:</span>
                <span>{formData.address}, {formData.city}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">طريقة الدفع:</span>
                <span>
                  {formData.paymentMethod === 'credit-card' ? 'بطاقة ائتمان' : 'الدفع عند الاستلام'}
                </span>
              </div>
            </div>
          </div>
          <button 
            onClick={handleBackToHome}
            className="btn btn-primary px-8 py-3"
          >
            العودة للصفحة الرئيسية
          </button>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <div className="mb-6">
              <div className="flex items-center justify-between">
                <h1 className="text-2xl md:text-3xl font-bold">إتمام الطلب</h1>
                <div className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 'shipping' || step === 'payment' || step === 'confirmation' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    1
                  </div>
                  <div className={`w-16 h-1 ${step === 'payment' || step === 'confirmation' ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 'payment' || step === 'confirmation' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    2
                  </div>
                  <div className={`w-16 h-1 ${step === 'confirmation' ? 'bg-primary-600' : 'bg-gray-200'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${step === 'confirmation' ? 'bg-primary-600 text-white' : 'bg-gray-200 text-gray-700'}`}>
                    3
                  </div>
                </div>
              </div>
            </div>

            {step === 'shipping' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">معلومات الشحن</h2>
                
                <form onSubmit={handleShippingSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label htmlFor="firstName" className="block text-gray-700 mb-2">الاسم الأول <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-gray-700 mb-2">الاسم الأخير <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-gray-700 mb-2">البريد الإلكتروني <span className="text-red-500">*</span></label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-gray-700 mb-2">رقم الهاتف <span className="text-red-500">*</span></label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label htmlFor="address" className="block text-gray-700 mb-2">العنوان <span className="text-red-500">*</span></label>
                      <textarea
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      ></textarea>
                    </div>
                    <div>
                      <label htmlFor="city" className="block text-gray-700 mb-2">المدينة <span className="text-red-500">*</span></label>
                      <input
                        type="text"
                        id="city"
                        name="city"
                        required
                        value={formData.city}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="postcode" className="block text-gray-700 mb-2">الرمز البريدي</label>
                      <input
                        type="text"
                        id="postcode"
                        name="postcode"
                        value={formData.postcode}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                    <div>
                      <label htmlFor="country" className="block text-gray-700 mb-2">البلد <span className="text-red-500">*</span></label>
                      <select
                        id="country"
                        name="country"
                        required
                        value={formData.country}
                        onChange={handleInputChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value="السعودية">السعودية</option>
                        <option value="الإمارات">الإمارات</option>
                        <option value="قطر">قطر</option>
                        <option value="الكويت">الكويت</option>
                        <option value="البحرين">البحرين</option>
                        <option value="عمان">عمان</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <Link to="/cart" className="text-primary-600 hover:text-primary-800">العودة إلى سلة التسوق</Link>
                    <button type="submit" className="btn btn-primary py-3 px-8">متابعة إلى الدفع</button>
                  </div>
                </form>
              </div>
            )}

            {step === 'payment' && (
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">معلومات الدفع</h2>
                
                <form onSubmit={handlePaymentSubmit}>
                  <div className="mb-6">
                    <div className="text-lg font-bold mb-4">اختر طريقة الدفع</div>
                    
                    <div className="space-y-4">
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="credit-card"
                          checked={formData.paymentMethod === 'credit-card'}
                          onChange={handleInputChange}
                          className="ml-3 accent-primary-600"
                        />
                        <div className="flex items-center">
                          <CreditCard className="ml-3 text-primary-600" size={24} />
                          <div>
                            <span className="font-medium">بطاقة ائتمان</span>
                            <p className="text-sm text-gray-500">Visa, Mastercard, American Express</p>
                          </div>
                        </div>
                      </label>
                      
                      <label className="flex items-center p-4 border border-gray-300 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cash"
                          checked={formData.paymentMethod === 'cash'}
                          onChange={handleInputChange}
                          className="ml-3 accent-primary-600"
                        />
                        <div className="flex items-center">
                          <div className="ml-3 w-6 h-6 flex items-center justify-center bg-gray-200 rounded-full text-gray-700">
                            <span className="text-sm font-bold">₽</span>
                          </div>
                          <div>
                            <span className="font-medium">الدفع عند الاستلام</span>
                            <p className="text-sm text-gray-500">ادفع نقداً عند استلام طلبك</p>
                          </div>
                        </div>
                      </label>
                    </div>
                  </div>
                  
                  {formData.paymentMethod === 'credit-card' && (
                    <div className="border border-gray-300 rounded-lg p-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label htmlFor="cardNumber" className="block text-gray-700 mb-2">رقم البطاقة <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            id="cardNumber"
                            placeholder="**** **** **** ****"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label htmlFor="cardName" className="block text-gray-700 mb-2">الاسم على البطاقة <span className="text-red-500">*</span></label>
                          <input
                            type="text"
                            id="cardName"
                            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label htmlFor="expiry" className="block text-gray-700 mb-2">تاريخ الانتهاء <span className="text-red-500">*</span></label>
                            <input
                              type="text"
                              id="expiry"
                              placeholder="MM/YY"
                              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                          <div>
                            <label htmlFor="cvc" className="block text-gray-700 mb-2">CVC <span className="text-red-500">*</span></label>
                            <input
                              type="text"
                              id="cvc"
                              placeholder="***"
                              className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        name="saveInfo"
                        checked={formData.saveInfo}
                        onChange={handleInputChange}
                        className="ml-2 accent-primary-600"
                      />
                      <span className="text-gray-700">حفظ معلوماتي للمرة القادمة</span>
                    </label>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <button 
                      type="button" 
                      onClick={() => setStep('shipping')}
                      className="text-primary-600 hover:text-primary-800"
                    >
                      العودة إلى معلومات الشحن
                    </button>
                    <button 
                      type="submit" 
                      className="btn btn-primary py-3 px-8 flex items-center"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          جاري إتمام الطلب...
                        </>
                      ) : 'إتمام الطلب'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
          
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-bold mb-4 pb-2 border-b border-gray-200">ملخص الطلب</h2>
              
              <div className="max-h-64 overflow-y-auto mb-4">
                {cart.map((item) => (
                  <div key={item.product.id} className="flex py-3 border-b border-gray-100">
                    <div className="w-16 h-16 rounded-md overflow-hidden mr-3 flex-shrink-0">
                      <img 
                        src={item.product.images[0]} 
                        alt={item.product.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-grow">
                      <h3 className="text-sm font-medium line-clamp-1">{item.product.name}</h3>
                      <p className="text-gray-500 text-sm">الكمية: {item.quantity}</p>
                      <span className="font-medium text-sm text-primary-700">
                        {(item.product.price * item.quantity).toFixed(2)} ر.س
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-700">
                  <span>المجموع الفرعي:</span>
                  <span>{totalPrice.toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>ضريبة القيمة المضافة (15%):</span>
                  <span>{(totalPrice * 0.15).toFixed(2)} ر.س</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>الشحن:</span>
                  <span className="text-green-600">مجاني</span>
                </div>
                <div className="pt-3 mt-3 border-t border-gray-200">
                  <div className="flex justify-between font-bold text-lg">
                    <span>المجموع الكلي:</span>
                    <span className="text-primary-700">{(totalPrice * 1.15).toFixed(2)} ر.س</span>
                  </div>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <h3 className="font-medium mb-2">طرق الدفع المتاحة</h3>
                <div className="flex space-x-2 space-x-reverse">
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                  <div className="w-12 h-8 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;