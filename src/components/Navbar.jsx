/* eslint-disable react-refresh/only-export-components */
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

// Default nav (shown at top, before scroll) — matches Home.png mockup
const NAV_DEFAULT = [
  { id: 'terbaru', label: 'Beranda' },
  { id: 'terbaru', label: 'Terbaru' },
  { id: 'hiburan', label: 'Hiburan' },
  { id: 'gaya-hidup', label: 'Gaya Hidup' },
  { id: 'olahraga', label: 'Olahraga' },
  { id: 'nasional', label: 'Nasional' },
  { id: 'internasional', label: 'Internasional' },
];

// Scrolled nav — matches Home - Scroll.png mockup
const NAV_SCROLLED = [
  { id: 'terbaru', label: 'Beranda' },
  { id: 'ekonomi', label: 'Kesehatan' },
  { id: 'teknologi', label: 'Otomotif' },
  { id: 'hiburan', label: 'Politik' },
  { id: 'olahraga', label: 'Olahraga' },
  { id: 'nasional', label: 'Nasional' },
  { id: 'internasional', label: 'Internasional' },
];

// Full category list for mobile and programmatic use
export const CATEGORIES = [
  { id: 'terbaru', label: 'Beranda' },
  { id: 'terbaru', label: 'Terbaru' },
  { id: 'nasional', label: 'Nasional' },
  { id: 'internasional', label: 'Internasional' },
  { id: 'ekonomi', label: 'Ekonomi' },
  { id: 'olahraga', label: 'Olahraga' },
  { id: 'teknologi', label: 'Teknologi' },
  { id: 'hiburan', label: 'Hiburan' },
  { id: 'gaya-hidup', label: 'Gaya Hidup' },
];

const Navbar = ({ activeCategory, onCategoryChange }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentNav = isScrolled ? NAV_SCROLLED : NAV_DEFAULT;

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white shadow-md border-b border-gray-100'
          : 'bg-white border-b border-gray-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Logo — uses the custom Logo.png */}
          <Link to="/" className="flex items-center gap-2.5 flex-shrink-0">
            <img
              src="/Logo.png"
              alt="Berita Kini"
              className="w-8 h-8 object-contain"
            />
            <span className="font-bold text-lg text-slate-900 tracking-tight">
              Berita Kini
            </span>
          </Link>

          {/* Desktop Navigation — changes items on scroll */}
          <nav className="hidden md:flex items-center gap-0.5">
            {currentNav.map((cat, idx) => {
              const isActive =
                (cat.label === 'Beranda' && (activeCategory === 'terbaru' || !activeCategory)) ||
                activeCategory === cat.id;
              return (
                <button
                  key={`${cat.id}-${idx}`}
                  onClick={() => onCategoryChange && onCategoryChange(cat.id)}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                    isActive && idx === 0
                      ? 'text-sky-500'
                      : isActive
                      ? 'text-sky-500'
                      : 'text-slate-600 hover:text-sky-500'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Menu"
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 overflow-hidden transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-[500px] shadow-lg' : 'max-h-0'
        }`}
      >
        <div className="px-4 py-2 space-y-0.5">
          {CATEGORIES.map((cat, idx) => (
            <button
              key={`${cat.id}-mob-${idx}`}
              onClick={() => {
                onCategoryChange && onCategoryChange(cat.id);
                setIsMobileMenuOpen(false);
              }}
              className={`block w-full text-left px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                activeCategory === cat.id
                  ? 'bg-sky-50 text-sky-500'
                  : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
