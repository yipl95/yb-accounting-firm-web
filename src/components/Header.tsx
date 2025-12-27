import React, { useState } from 'react';
import { Menu, X, MessageCircle } from 'lucide-react';
import { useStore } from '../store/useStore';

export const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { openModal } = useStore();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const navItems = [
    { name: '首页', href: '#home' },
    { name: '服务项目', href: '#services' },
    { name: '关于我们', href: '#about' },
    { name: '联系我们', href: '#contact' },
  ];

  return (
    <header className="fixed w-full bg-white/95 backdrop-blur-sm shadow-sm z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <span className="text-2xl font-bold text-primary flex items-center gap-2">
              <span className="bg-primary text-white p-1 rounded-lg">YB</span>
              元宝会计
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-primary font-medium transition-colors"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={openModal}
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
            >
              <MessageCircle size={18} />
              立即咨询
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-600 hover:text-gray-900 focus:outline-none p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </a>
            ))}
            <div className="px-3 py-3">
              <button
                onClick={() => {
                  openModal();
                  setIsMenuOpen(false);
                }}
                className="w-full bg-primary text-white px-4 py-3 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                立即咨询
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
