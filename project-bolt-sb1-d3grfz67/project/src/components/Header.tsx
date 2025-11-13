import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Search, User, Menu, X } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { cart } = useCart();
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const categories = [
    { id: 1, name: 'هوديز', path: '/products?category=hoodies' },
    { id: 2, name: 'تيشيرتات', path: '/products?category=tshirts' },
    { id: 3, name: 'بناطيل', path: '/products?category=pants' },
    { id: 4, name: 'جاكيتات', path: '/products?category=jackets' },
    { id: 5, name: 'اكسسوارات', path: '/products?category=accessories' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-600">Skilz Store</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 space-x-reverse">
            <Link to="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              الرئيسية
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              المنتجات
            </Link>
            <a href="#" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              العروض
            </a>
            <a href="#" className="text-gray-700 hover:text-primary-600 px-3 py-2 text-sm font-medium">
              تواصل معنا
            </a>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4 space-x-reverse">
            <button 
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-gray-700 hover:text-primary-600 p-2 rounded-full hover:bg-gray-100"
            >
              <Search size={20} />
            </button>
            
            <Link to="/auth" className="text-gray-700 hover:text-primary-600 p-2 rounded-full hover:bg-gray-100">
              <User size={20} />
            </Link>
            
            <Link to="/cart" className="text-gray-700 hover:text-primary-600 p-2 rounded-full hover:bg-gray-100 relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-full hover:bg-gray-100" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        {isSearchOpen && (
          <div className="py-4 border-t border-gray-100 animate-fadeIn">
            <div className="relative">
              <input 
                type="text" 
                placeholder="ابحث عن منتجات..." 
                className="w-full p-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 py-2 animate-slideDown">
            <div className="flex flex-col space-y-1">
              <Link to="/" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md">
                الرئيسية
              </Link>
              <Link to="/products" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md">
                المنتجات
              </Link>
              <a href="#" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md">
                العروض
              </a>
              <a href="#" className="text-gray-700 hover:text-primary-600 px-3 py-2 rounded-md">
                تواصل معنا
              </a>
            </div>
          </div>
        )}

        {/* Categories Navigation */}
        <div className="hidden md:flex border-t border-gray-200 overflow-x-auto">
          <div className="py-3 flex space-x-8 space-x-reverse">
            {categories.map(category => (
              <Link 
                key={category.id}
                to={category.path} 
                className="text-sm text-gray-700 hover:text-primary-600 whitespace-nowrap"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;