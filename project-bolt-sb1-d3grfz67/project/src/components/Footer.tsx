import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, MessageCircle } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white pt-12 pb-8 font-tajawal">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Store Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Skilz Store</h3>
            <p className="text-gray-300 mb-4">
              متجرك الأول للملابس العصرية والأنيقة. نقدم أحدث صيحات الموضة بأفضل الأسعار.
            </p>
            <div className="flex space-x-4 space-x-reverse">
              <a 
                href="https://www.facebook.com/profile.php?id=61563851471255" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a 
                href="https://www.instagram.com/skilz_store?fbclid=IwY2xjawLH689leHRuA2FlbQIxMABicmlkETE0OEVRV2lIN3FpOHhPcXZrAR712owZYuiSU35wa-QTsFx-eEACuAPe7OVtQo-IH7ft6zBJJwjjxMybs28fbg_aem_wyF-VxDFpg3rDc1f6RDLeQ" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a 
                href="https://wa.me/01500823448" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-white transition-colors"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">روابط سريعة</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">الصفحة الرئيسية</Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white transition-colors">المنتجات</Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">العروض الخاصة</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">سياسة الخصوصية</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">شروط الاستخدام</a>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-lg font-bold mb-4">التصنيفات</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=hoodies" className="text-gray-300 hover:text-white transition-colors">هوديز</Link>
              </li>
              <li>
                <Link to="/products?category=tshirts" className="text-gray-300 hover:text-white transition-colors">تيشيرتات</Link>
              </li>
              <li>
                <Link to="/products?category=pants" className="text-gray-300 hover:text-white transition-colors">بناطيل</Link>
              </li>
              <li>
                <Link to="/products?category=jackets" className="text-gray-300 hover:text-white transition-colors">جاكيتات</Link>
              </li>
              <li>
                <Link to="/products?category=accessories" className="text-gray-300 hover:text-white transition-colors">اكسسوارات</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">اتصل بنا</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 space-x-reverse">
                <MapPin size={18} className="mt-0.5 flex-shrink-0 text-primary-400" />
                <span className="text-gray-300">القاهرة، مصر</span>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse">
                <Phone size={18} className="flex-shrink-0 text-primary-400" />
                <a 
                  href="tel:01500823448" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  015 00823448
                </a>
              </li>
              <li className="flex items-center space-x-3 space-x-reverse">
                <MessageCircle size={18} className="flex-shrink-0 text-primary-400" />
                <a 
                  href="https://wa.me/01500823448" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  واتساب: 015 00823448
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Skilz Store. جميع الحقوق محفوظة.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;