import React from 'react';
import { ScreenRoute } from '../types';
import { GoldenTotoLogo } from './GoldenTotoLogo';
import { 
  Instagram, 
  Facebook, 
  Youtube, 
  Linkedin 
} from 'lucide-react';

interface FooterProps {
  onNavigate: (route: ScreenRoute, modelSlug?: string) => void;
  onOpenAnalytics?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
}) => {
  return (
    <footer id="golden-toto-footer" className="bg-[#FAF6F0] border-t border-[#EBDCD4] text-[#5A3E45] text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-12 gap-8 lg:gap-8 items-start">
          
          {/* Column 1 (4 cols): Golden Toto Logo Medallion matching Reference */}
          <div className="lg:col-span-4 space-y-3">
            <button
              onClick={() => onNavigate('home')}
              className="focus:outline-none text-left"
              aria-label="Golden Toto Home"
            >
              <GoldenTotoLogo className="h-16 sm:h-20" variant="maroon" />
            </button>
          </div>

          {/* Column 2 (2 cols): Quick Links matching Reference */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-[#2D1219] font-sans">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#5A3E45]">
              <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="hover:text-[#8B263E] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button 
                  onClick={() => {
                    const el = document.getElementById('models-showcase');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                    else onNavigate('home');
                  }} 
                  className="hover:text-[#8B263E] transition-colors cursor-pointer"
                >
                  Models
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('compare')} 
                  className="hover:text-[#8B263E] transition-colors cursor-pointer"
                >
                  Compare
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('test-ride')} 
                  className="hover:text-[#8B263E] transition-colors cursor-pointer"
                >
                  Test Ride
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('dealers')} 
                  className="hover:text-[#8B263E] transition-colors cursor-pointer"
                >
                  Dealers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3 (2 cols): Company matching Reference */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-[#2D1219] font-sans">
              Company
            </h4>
            <ul className="space-y-2 text-xs text-[#5A3E45]">
              <li>
                <button 
                  onClick={() => onNavigate('about')} 
                  className="hover:text-[#8B263E] transition-colors cursor-pointer"
                >
                  About Us
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('service')} 
                  className="hover:text-[#8B263E] transition-colors cursor-pointer"
                >
                  Service & Warranty
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('service')} 
                  className="hover:text-[#8B263E] transition-colors cursor-pointer"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button 
                  onClick={() => onNavigate('enquiry')} 
                  className="hover:text-[#8B263E] transition-colors cursor-pointer"
                >
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4 (2 cols): Follow Us & Slogan matching Reference */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs sm:text-sm font-bold text-[#2D1219] font-sans">
              Follow Us
            </h4>
            <div className="flex items-center gap-3.5 text-[#8B263E]">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram"
                className="hover:opacity-80 transition-opacity"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook"
                className="hover:opacity-80 transition-opacity"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="YouTube"
                className="hover:opacity-80 transition-opacity"
              >
                <Youtube className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="LinkedIn"
                className="hover:opacity-80 transition-opacity"
              >
                <Linkedin className="w-4 h-4" />
              </a>
            </div>

            <p className="text-xs text-[#73525A] pt-2 font-normal leading-relaxed">
              A Cleaner Tomorrow, <br />
              Starts with You.
            </p>
          </div>

          {/* Column 5 (2 cols): Leaf Emblem & Rights matching Reference */}
          <div className="lg:col-span-2 text-left sm:text-right space-y-2 flex flex-col sm:items-end justify-center">
            {/* Decorative Leaf Ornament SVG in Maroon */}
            <div className="text-[#8B263E]" aria-hidden="true">
              <svg width="44" height="32" viewBox="0 0 50 36" fill="currentColor">
                <path d="M 25 2 C 28 12, 38 16, 48 14 C 42 24, 30 28, 25 34 C 20 28, 8 24, 2 14 C 12 16, 22 12, 25 2 Z" opacity="0.9" />
                <path d="M 16 16 C 9 13, 3 19, 7 25 C 12 24, 15 20, 16 16 Z" opacity="0.7" />
                <path d="M 34 16 C 41 13, 47 19, 43 25 C 38 24, 35 20, 34 16 Z" opacity="0.7" />
              </svg>
            </div>
            <p className="font-serif font-bold text-sm text-[#2D1219]">
              Golden Toto
            </p>
            <p className="text-[11px] text-[#8C6D75]">
              All rights reserved.
            </p>
          </div>

        </div>

        {/* Bottom subtle copyright */}
        <div className="mt-10 pt-6 border-t border-[#EBDCD4] flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#8C6D75]">
          <p>© {new Date().getFullYear()} Golden Toto EV. Clean Ride • A Brighter Tomorrow.</p>
          <p className="text-[10px]">Electric Toto For A Greener India • Made with care for Indian roads.</p>
        </div>
      </div>
    </footer>
  );
};
