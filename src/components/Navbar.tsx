import React, { useState, useEffect } from 'react';
import { ScreenRoute } from '../types';
import { GoldenTotoLogo } from './GoldenTotoLogo';
import { 
  Menu, 
  X, 
  CalendarCheck, 
  ChevronRight 
} from 'lucide-react';

interface NavbarProps {
  currentRoute: ScreenRoute;
  onNavigate: (route: ScreenRoute, modelSlug?: string) => void;
  onOpenAnalytics?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRoute,
  onNavigate,
  onOpenAnalytics,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; route: ScreenRoute }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Models', route: 'home' },
    { label: 'Compare', route: 'compare' },
    { label: 'Test Ride', route: 'test-ride' },
    { label: 'Dealers', route: 'dealers' },
    { label: 'About', route: 'about' },
    { label: 'FAQ', route: 'service' },
  ];

  const handleLinkClick = (route: ScreenRoute, label: string) => {
    if (label === 'Models') {
      const el = document.getElementById('models-showcase');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      } else {
        onNavigate('home');
      }
    } else if (label === 'FAQ') {
      onNavigate('service');
    } else {
      onNavigate(route);
    }
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF6F0]/95 backdrop-blur-md py-2.5 border-b border-[#E8DCD4] shadow-sm'
          : 'bg-[#FAF6F0] py-3.5 border-b border-[#EFE5DC]/80'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo matching Reference Image */}
        <button
          id="nav-logo-btn"
          onClick={() => onNavigate('home')}
          className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-[#8B263E] rounded-xl cursor-pointer"
        >
          <GoldenTotoLogo className="h-11 sm:h-12" variant="maroon" />
        </button>

        {/* Desktop Navigation Links (Center) matching Reference Image */}
        <nav className="hidden lg:flex items-center gap-7 xl:gap-9">
          {navLinks.map((item) => {
            const isHomeActive = currentRoute === 'home' && item.label === 'Home';
            const isCompareActive = currentRoute === 'compare' && item.label === 'Compare';
            const isTestRideActive = currentRoute === 'test-ride' && item.label === 'Test Ride';
            const isDealersActive = currentRoute === 'dealers' && item.label === 'Dealers';
            const isAboutActive = currentRoute === 'about' && item.label === 'About';
            const isFaqActive = currentRoute === 'service' && item.label === 'FAQ';

            const isActive = isHomeActive || isCompareActive || isTestRideActive || isDealersActive || isAboutActive || isFaqActive;

            return (
              <button
                key={item.label}
                id={`nav-link-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={() => handleLinkClick(item.route, item.label)}
                className={`relative py-1 text-sm font-medium transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#8B263E] font-semibold'
                    : 'text-[#4A2D35] hover:text-[#8B263E]'
                }`}
              >
                <span>{item.label}</span>
                {/* Active indicator underline as in reference */}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#8B263E] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Button matching Reference Image: "Book a Test Ride" */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            id="nav-book-test-ride-btn"
            onClick={() => onNavigate('test-ride')}
            className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#8B263E] hover:bg-[#731E32] text-white font-medium text-xs sm:text-sm tracking-wide transition-all shadow-sm active:scale-95 cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4" />
            <span>Book a Test Ride</span>
          </button>
        </div>

        {/* Mobile Menu Trigger */}
        <div className="flex sm:hidden items-center gap-2">
          <button
            onClick={() => onNavigate('test-ride')}
            className="px-3.5 py-1.5 rounded-full bg-[#8B263E] text-white text-xs font-semibold"
          >
            Book Ride
          </button>

          <button
            id="mobile-menu-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 min-w-[42px] min-h-[42px] flex items-center justify-center rounded-xl bg-[#F5ECE8] text-[#8B263E] border border-[#E2D2CA]"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div 
          id="mobile-nav-panel"
          className="lg:hidden bg-[#FAF6F0] border-b border-[#E8DCD4] px-5 py-6 shadow-xl space-y-4 max-h-[calc(100vh-70px)] overflow-y-auto animate-in slide-in-from-top-2 duration-200"
        >
          <div className="space-y-1">
            {navLinks.map((item) => (
              <button
                key={item.label}
                onClick={() => handleLinkClick(item.route, item.label)}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-left text-sm font-medium text-[#3A141E] hover:bg-[#F3E7E2]"
              >
                <span>{item.label}</span>
                <ChevronRight className="w-4 h-4 text-[#8B263E]/60" />
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E8DCD4] space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onNavigate('test-ride');
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-full bg-[#8B263E] text-white font-bold text-sm shadow-md"
            >
              <CalendarCheck className="w-4 h-4" />
              <span>Book a Free Test Ride</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
