import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

// Single consistent nav menu matching the mockup exactly
export const CATEGORIES = [
  { id: 'beranda', label: 'Beranda' },
  { id: 'terbaru', label: 'Terbaru' },
  { id: 'hiburan', label: 'Hiburan' },
  { id: 'gaya-hidup', label: 'Gaya Hidup' },
  { id: 'olahraga', label: 'Olahraga' },
  { id: 'nasional', label: 'Nasional' },
  { id: 'internasional', label: 'Internasional' },
];

const Navbar = ({ activeCategory, onCategoryChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Trigger scrolled state when scrolling down
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
        isScrolled ? 'bg-[#2196F3] shadow-md border-[#2196F3]' : 'bg-white border-b border-gray-100'
      }`}
    >
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex justify-between items-center h-14">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 flex-shrink-0">
            <img
              src="/Logo.png"
              alt="Berita Kini"
              className={`w-7 h-7 object-contain transition-all ${isScrolled ? 'brightness-0 invert' : ''}`}
            />
            <span className={`font-bold text-[15px] tracking-tight transition-colors ${isScrolled ? 'text-white' : 'text-gray-900'}`}>
              Berita Kini
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {CATEGORIES.map((cat, idx) => {
              const isActive = activeCategory === cat.id;
              
              let textClass = '';
              if (isScrolled) {
                textClass = isActive ? 'text-white font-bold' : 'text-white/80 hover:text-white font-medium';
              } else {
                textClass = isActive ? 'text-[#2196F3] font-bold' : 'text-gray-700 hover:text-[#2196F3] font-medium';
              }

              return (
                <button
                  key={`${cat.id}-${idx}`}
                  onClick={() => onCategoryChange && onCategoryChange(cat.id)}
                  className={`px-3 py-2 text-[13px] transition-colors whitespace-nowrap ${textClass}`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden p-2 rounded-md transition-colors ${
              isScrolled ? 'text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-[400px] shadow-lg border-t' : 'max-h-0'
        } ${isScrolled ? 'bg-[#2196F3] border-white/10' : 'bg-white border-gray-100'}`}
      >
        <div className="px-4 py-2 space-y-0.5">
          {CATEGORIES.map((cat, idx) => {
            const isActive = activeCategory === cat.id;

            let btnClass = '';
            if (isScrolled) {
              btnClass = isActive ? 'bg-white/20 text-white font-bold' : 'text-white/90 hover:bg-white/10 font-medium';
            } else {
              btnClass = isActive ? 'bg-blue-50 text-[#2196F3] font-bold' : 'text-gray-600 hover:bg-gray-50 font-medium';
            }

            return (
              <button
                key={`${cat.id}-mob-${idx}`}
                onClick={() => {
                  onCategoryChange && onCategoryChange(cat.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2.5 rounded-md text-sm transition-colors ${btnClass}`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
