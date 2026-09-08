import React from 'react';
import { GoldenTotoLogo } from './GoldenTotoLogo';
import { ScooterVisual } from './ScooterVisual';
import { ArrowRight, CalendarCheck } from 'lucide-react';

interface HeroProps {
  onExploreModels: () => void;
  onBookTestRide: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onExploreModels,
  onBookTestRide,
}) => {
  return (
    <section 
      id="hero-section"
      className="relative pt-24 sm:pt-28 pb-10 sm:pb-16 lg:pt-32 lg:pb-16 overflow-hidden bg-gradient-to-b from-[#FAF5F0] via-[#FAF6F0] to-[#FAF6F0]"
    >
      {/* Background Soft Floral Ambient Petals */}
      <div className="absolute inset-0 pointer-events-none opacity-30 overflow-hidden" aria-hidden="true">
        <div className="absolute top-10 right-1/4 w-96 h-96 rounded-full bg-[#E8B6C0]/40 blur-3xl" />
        <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-[#F4D2DA]/50 blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Content Column matching Reference Exactly */}
          <div className="lg:col-span-6 space-y-6 text-left">
            {/* Small Eyebrow */}
            <div className="inline-block">
              <span className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.22em] text-[#8B263E] select-none">
                CLEAN RIDE • A BRIGHTER TOMORROW
              </span>
            </div>

            {/* Large Elegant Serif Headline */}
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-normal text-[#2D1219] font-serif leading-[1.06] tracking-tight">
              Ride a <br />
              <span className="text-[#8B263E] font-medium">Greener Future</span>
            </h1>

            {/* Supporting Copy */}
            <p className="text-base sm:text-lg text-[#5A3E45] leading-relaxed max-w-lg font-normal">
              Golden Toto&apos;s electric vehicles are built for a smarter, cleaner and better tomorrow.
            </p>

            {/* Two CTA Buttons matching Reference Shape & Colors */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <button
                id="hero-explore-models-btn"
                onClick={onExploreModels}
                className="px-7 py-3.5 rounded-full bg-[#8B263E] hover:bg-[#731E32] text-white font-semibold text-sm flex items-center gap-2 transition-all shadow-md shadow-[#8B263E]/25 active:scale-95 cursor-pointer"
              >
                <span>Explore Models</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                id="hero-book-test-ride-btn"
                onClick={onBookTestRide}
                className="px-7 py-3.5 rounded-full bg-[#FAF6F0] hover:bg-white text-[#8B263E] border border-[#8B263E] font-semibold text-sm flex items-center gap-2 transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4 text-[#8B263E]" />
                <span>Book a Test Ride</span>
              </button>
            </div>

            {/* Bottom 3 Feature Indicators with Thin Vertical Dividers */}
            <div className="pt-8 sm:pt-10 flex items-center gap-6 sm:gap-10 border-t border-[#E8D4D8]/80 text-left">
              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1219] block leading-none">
                  100%
                </span>
                <span className="text-xs sm:text-sm text-[#73525A] font-medium mt-1.5 block">
                  Electric
                </span>
              </div>

              <div className="w-[1px] h-10 bg-[#D9BEC5]" />

              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1219] block leading-none">
                  Low
                </span>
                <span className="text-xs sm:text-sm text-[#73525A] font-medium mt-1.5 block">
                  Running Cost
                </span>
              </div>

              <div className="w-[1px] h-10 bg-[#D9BEC5]" />

              <div>
                <span className="text-2xl sm:text-3xl font-serif font-bold text-[#2D1219] block leading-none">
                  Zero
                </span>
                <span className="text-xs sm:text-sm text-[#73525A] font-medium mt-1.5 block">
                  Emissions
                </span>
              </div>
            </div>
          </div>

          {/* Right Hero Stage: Grand Arched Portal with Floral Backdrop, White Logo & Dusty Rose Scooter */}
          <div className="lg:col-span-6 relative">
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/12] max-w-xl mx-auto rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-tr from-[#6E1A2D] via-[#8B263E] to-[#A8435A] p-2.5 sm:p-4">
              
              {/* Internal Arched Composition matching Reference Image */}
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#F9EDEA] via-[#F4DDD8] to-[#ECD0D6] flex items-center justify-center">
                
                {/* 1. Floral Blossom Garland Framing Top & Left of Arch */}
                <div className="absolute top-0 left-0 right-0 h-28 pointer-events-none z-10 overflow-hidden">
                  <svg className="w-full h-full" viewBox="0 0 500 120" preserveAspectRatio="none" fill="none">
                    {/* Soft cherry blossom / peach flower branches */}
                    <path d="M -20 10 Q 120 70 250 20 T 520 10" stroke="#8B263E" strokeWidth="2.5" opacity="0.3" />
                    <path d="M 50 -10 Q 180 50 340 10" stroke="#8B263E" strokeWidth="1.8" opacity="0.25" />
                    {/* Flower clusters */}
                    <circle cx="80" cy="35" r="14" fill="#E8A7B3" opacity="0.85" />
                    <circle cx="80" cy="35" r="8" fill="#FFFFFF" opacity="0.7" />
                    <circle cx="130" cy="55" r="18" fill="#DE8D9E" opacity="0.8" />
                    <circle cx="130" cy="55" r="10" fill="#FCEFF2" opacity="0.75" />
                    <circle cx="175" cy="40" r="15" fill="#E8A7B3" opacity="0.85" />
                    <circle cx="220" cy="28" r="12" fill="#DE8D9E" opacity="0.75" />
                    <circle cx="270" cy="22" r="16" fill="#E8A7B3" opacity="0.8" />
                    <circle cx="320" cy="26" r="13" fill="#DE8D9E" opacity="0.7" />
                    {/* Small falling petals */}
                    <ellipse cx="60" cy="75" rx="5" ry="3" fill="#DE8D9E" opacity="0.7" transform="rotate(25 60 75)" />
                    <ellipse cx="160" cy="80" rx="6" ry="3" fill="#E8A7B3" opacity="0.65" transform="rotate(-30 160 80)" />
                    <ellipse cx="230" cy="65" rx="5" ry="3" fill="#DE8D9E" opacity="0.6" transform="rotate(45 230 65)" />
                  </svg>
                </div>

                {/* 2. Deep Maroon Arch Element on the Right Side of the Stage */}
                <div 
                  className="absolute right-0 top-0 bottom-0 w-[46%] bg-gradient-to-br from-[#731E32] via-[#8B263E] to-[#5C1425] rounded-l-[100px] z-0 p-4 sm:p-6 flex flex-col items-center justify-between text-white text-center shadow-inner overflow-hidden"
                >
                  {/* Subtle floral watermark inside the maroon arch */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none">
                    <svg className="w-full h-full" viewBox="0 0 100 100" fill="currentColor">
                      <circle cx="80" cy="20" r="25" />
                      <circle cx="30" cy="90" r="30" />
                    </svg>
                  </div>

                  {/* Golden Toto Medallion Logo in Pure White inside the Arch */}
                  <div className="relative z-10 w-full pt-1 sm:pt-2">
                    <GoldenTotoLogo className="h-14 sm:h-18 mx-auto" variant="white" />
                  </div>

                  {/* "Move with Purpose" Cursive Script in White underneath Logo */}
                  <div className="relative z-10 pb-4 sm:pb-6 select-none">
                    <span className="font-script text-3xl sm:text-4xl text-white font-normal block leading-tight drop-shadow-md">
                      Move with Purpose
                    </span>
                  </div>
                </div>

                {/* 3. The Photorealistic Metallic Dusty Rose Scooter centered in the composition */}
                <div className="relative z-20 w-full h-full flex items-center justify-center p-2 pt-6">
                  <div className="w-[88%] sm:w-[84%] max-h-[92%] transition-transform duration-500 hover:scale-105">
                    <ScooterVisual colorway="dusty-rose" className="w-full h-full" />
                  </div>
                </div>

                {/* 4. Bottom Platform Glow */}
                <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#E2BCC5]/50 to-transparent pointer-events-none z-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
