import React from 'react';
import { 
  Leaf, 
  Users, 
  Settings, 
  ArrowRight, 
  CalendarCheck, 
  MessageCircle 
} from 'lucide-react';

interface AboutSectionProps {
  onExploreModels: () => void;
  onBookTestRide?: () => void;
  onViewDealers: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({
  onExploreModels,
  onBookTestRide,
  onViewDealers,
}) => {
  const handleWhatsAppChat = () => {
    const message = encodeURIComponent("Hello Golden Toto! I'm interested in booking a test ride and learning more about your EV models.");
    window.open(`https://wa.me/919830123456?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="about-brand-section" className="floral-wash py-12 sm:py-16 bg-[#fcf8f5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-14">
        
        {/* Section 5: Split About Container matching Reference Image */}
        <div className="grid grid-cols-1 lg:grid-cols-12 rounded-3xl overflow-hidden shadow-lg border border-[#EBDCD4]">
          
          {/* Left Split (7 cols): Floral Arch Photo & Story */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-10 flex flex-col md:flex-row items-center gap-6 sm:gap-10">
            
            {/* Arched Lifestyle Photo Frame with Floral Theme */}
            <div className="relative w-48 sm:w-56 h-64 sm:h-76 shrink-0 rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#EBDCD4] shadow-md bg-[#F6ECE8] flex items-center justify-center">
              <img
                src="./assets/shanta-about.jpg"
                alt="A Cleaner, Brighter Tomorrow with Golden Toto"
                className="w-full h-full object-cover object-center"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  // Clean fallback if needed
                  e.currentTarget.src = "./assets/shanta-about.jpg";
                }}
              />
              {/* Subtle floral tone overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#8B263E]/25 via-transparent to-transparent pointer-events-none" />
              
              {/* Soft decorative flower cluster at base */}
              <div className="absolute -bottom-2 -right-2 w-16 h-16 pointer-events-none opacity-80">
                <svg viewBox="0 0 50 50" fill="#E8A7B3">
                  <circle cx="25" cy="25" r="8" fill="#8B263E" opacity="0.6" />
                  <circle cx="15" cy="20" r="7" />
                  <circle cx="35" cy="20" r="7" />
                  <circle cx="25" cy="10" r="7" />
                  <circle cx="20" cy="35" r="7" />
                  <circle cx="30" cy="35" r="7" />
                </svg>
              </div>
            </div>

            {/* Story Text matching Reference Image Exactly */}
            <div className="space-y-4 text-left">
              <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#8B263E] block">
                ABOUT GOLDEN TOTO
              </span>

              <h3 className="text-3xl sm:text-4xl font-serif font-normal text-[#2D1219] leading-tight">
                A Cleaner, <br />
                Brighter Tomorrow
              </h3>

              <p className="text-xs sm:text-sm text-[#5A3E45] leading-relaxed">
                At Golden Toto, we believe in mobility that respects people and the planet. Our electric vehicles are designed for real Indian roads — reliable, stylish, and affordable.
              </p>

              <div className="pt-2">
                <button
                  id="about-our-story-btn"
                  onClick={onViewDealers}
                  className="px-7 py-3 rounded-full bg-[#8B263E] hover:bg-[#731E32] text-white font-semibold text-xs sm:text-sm inline-flex items-center gap-2 transition-all shadow-md shadow-[#8B263E]/20 active:scale-95 cursor-pointer"
                >
                  <span>Our Story</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Right Split (5 cols): Deep Wine/Maroon Block with 3 Icons & Quote */}
          <div className="lg:col-span-5 bg-gradient-to-br from-[#7B1E34] via-[#6F1A2E] to-[#501320] text-white p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
            {/* Subtle floral watermark */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
              <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor">
                <circle cx="85" cy="15" r="28" />
                <circle cx="15" cy="85" r="35" />
              </svg>
            </div>

            {/* 3 Columns matching Reference: Sustainable Mobility | Happy Customers | Trusted Support */}
            <div className="grid grid-cols-3 gap-2 text-center pb-8 border-b border-white/15 relative z-10">
              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                  <Leaf className="w-5 h-5 text-[#F5C7D0]" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-rose-100 leading-tight">
                  Sustainable <br /> Mobility
                </span>
              </div>

              <div className="flex flex-col items-center border-x border-white/15">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                  <Users className="w-5 h-5 text-[#F5C7D0]" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-rose-100 leading-tight">
                  Happy <br /> Customers
                </span>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center mb-2">
                  <Settings className="w-5 h-5 text-[#F5C7D0]" />
                </div>
                <span className="text-[11px] sm:text-xs font-medium text-rose-100 leading-tight">
                  Trusted <br /> Support
                </span>
              </div>
            </div>

            {/* Large Quote matching Reference: “Drive Change, Not Pollution.” */}
            <div className="pt-8 sm:pt-10 relative z-10 text-left">
              <blockquote className="text-3xl sm:text-4xl font-serif font-normal italic leading-snug text-white">
                “Drive Change, <br />
                Not Pollution.”
              </blockquote>
              <div className="w-12 h-[2px] bg-[#F5C7D0] mt-4" />
            </div>
          </div>
        </div>

        {/* Section 6: Full-Width TEST RIDE CTA Banner matching Reference Image */}
        <div 
          id="cta-test-ride-banner"
          className="rounded-3xl bg-gradient-to-r from-[#6F1A2E] via-[#7B1E34] to-[#501320] text-white p-7 sm:p-10 shadow-xl border border-white/10 relative overflow-hidden"
        >
          {/* Floral lace watermark pattern */}
          <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-15 pointer-events-none">
            <svg className="h-full w-full object-cover" viewBox="0 0 200 200" fill="currentColor">
              <path d="M 100 0 C 120 50, 150 80, 200 100 C 150 120, 120 150, 100 200 C 80 150, 50 120, 0 100 C 50 80, 80 50, 100 0 Z" />
              <circle cx="100" cy="100" r="30" />
            </svg>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
            {/* Banner Text */}
            <div className="space-y-1 text-left">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif font-normal text-white tracking-tight">
                Book a Test Ride Today
              </h3>
              <p className="text-xs sm:text-sm text-rose-100/90 font-normal max-w-xl">
                Experience the smooth, silent and powerful ride for yourself.
              </p>
            </div>

            {/* Two Action Buttons matching Reference Image */}
            <div className="flex flex-wrap items-center gap-3.5 shrink-0">
              {/* White pill button */}
              <button
                id="banner-book-test-ride-btn"
                onClick={onBookTestRide}
                className="px-7 py-3 rounded-full bg-white hover:bg-rose-50 text-[#8B263E] font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-[#8B263E]" />
                <span>Book a Test Ride</span>
              </button>

              {/* Chat on WhatsApp pill button */}
              <button
                id="banner-whatsapp-btn"
                onClick={handleWhatsAppChat}
                className="px-7 py-3 rounded-full bg-black/25 hover:bg-black/35 text-white border border-white/35 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-white" />
                <span>Chat on WhatsApp</span>
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
