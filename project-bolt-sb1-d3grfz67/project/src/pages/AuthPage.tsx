import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    remember: false,
  });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
  });
  
  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setLoginForm({
      ...loginForm,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setRegisterForm({
      ...registerForm,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login form submitted:', loginForm);
    // Here would go actual login logic
  };
  
  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Register form submitted:', registerForm);
    // Here would go actual registration logic
  };

  return (
    <div className="container-custom py-12">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex">
          <button
            className={`flex-1 py-4 text-center font-medium text-gray-700 transition-colors ${
              activeTab === 'login'
                ? 'bg-white border-b-2 border-primary-600 text-primary-700'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('login')}
          >
            تسجيل الدخول
          </button>
          <button
            className={`flex-1 py-4 text-center font-medium text-gray-700 transition-colors ${
              activeTab === 'register'
                ? 'bg-white border-b-2 border-primary-600 text-primary-700'
                : 'bg-gray-50 hover:bg-gray-100'
            }`}
            onClick={() => setActiveTab('register')}
          >
            إنشاء حساب
          </button>
        </div>
        
        {/* Login Form */}
        {activeTab === 'login' && (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">مرحباً بعودتك!</h1>
            
            <form onSubmit={handleLoginSubmit}>
              <div className="mb-4">
                <label htmlFor="login-email" className="block text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
              
              <div className="mb-4">
                <div className="flex justify-between mb-2">
                  <label htmlFor="login-password" className="text-gray-700">
                    كلمة المرور
                  </label>
                  <a href="#" className="text-primary-600 text-sm hover:text-primary-800">
                    نسيت كلمة المرور؟
                  </a>
                </div>
                <input
                  id="login-password"
                  type="password"
                  name="password"
                  value={loginForm.password}
                  onChange={handleLoginChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="أدخل كلمة المرور"
                />
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="remember"
                    checked={loginForm.remember}
                    onChange={handleLoginChange}
                    className="ml-2 accent-primary-600"
                  />
                  <span className="text-gray-700">تذكرني</span>
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full btn btn-primary py-3"
              >
                تسجيل الدخول
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <span className="text-gray-600">ليس لديك حساب؟</span>
              <button
                onClick={() => setActiveTab('register')}
                className="text-primary-600 font-medium hover:text-primary-800 mr-1"
              >
                إنشاء حساب جديد
              </button>
            </div>
          </div>
        )}
        
        {/* Register Form */}
        {activeTab === 'register' && (
          <div className="p-6">
            <h1 className="text-2xl font-bold mb-6 text-center">إنشاء حساب جديد</h1>
            
            <form onSubmit={handleRegisterSubmit}>
              <div className="mb-4">
                <label htmlFor="register-name" className="block text-gray-700 mb-2">
                  الاسم الكامل
                </label>
                <input
                  id="register-name"
                  type="text"
                  name="name"
                  value={registerForm.name}
                  onChange={handleRegisterChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="register-email" className="block text-gray-700 mb-2">
                  البريد الإلكتروني
                </label>
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  value={registerForm.email}
                  onChange={handleRegisterChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="أدخل بريدك الإلكتروني"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="register-password" className="block text-gray-700 mb-2">
                  كلمة المرور
                </label>
                <input
                  id="register-password"
                  type="password"
                  name="password"
                  value={registerForm.password}
                  onChange={handleRegisterChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="أدخل كلمة المرور"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="register-confirm-password" className="block text-gray-700 mb-2">
                  تأكيد كلمة المرور
                </label>
                <input
                  id="register-confirm-password"
                  type="password"
                  name="confirmPassword"
                  value={registerForm.confirmPassword}
                  onChange={handleRegisterChange}
                  required
                  className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="أعد إدخال كلمة المرور"
                />
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="acceptTerms"
                    checked={registerForm.acceptTerms}
                    onChange={handleRegisterChange}
                    required
                    className="ml-2 accent-primary-600"
                  />
                  <span className="text-gray-700">
                    أوافق على{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-800">
                      شروط الاستخدام
                    </a>{' '}
                    و{' '}
                    <a href="#" className="text-primary-600 hover:text-primary-800">
                      سياسة الخصوصية
                    </a>
                  </span>
                </label>
              </div>
              
              <button
                type="submit"
                className="w-full btn btn-primary py-3"
              >
                إنشاء حساب
              </button>
            </form>
            
            <div className="mt-6 text-center">
              <span className="text-gray-600">لديك حساب بالفعل؟</span>
              <button
                onClick={() => setActiveTab('login')}
                className="text-primary-600 font-medium hover:text-primary-800 mr-1"
              >
                تسجيل الدخول
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthPage;