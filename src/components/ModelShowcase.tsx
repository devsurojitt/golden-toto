import React from 'react';
import { EVModel } from '../types';
import { ProductCard } from './ProductCard';
import { 
  Leaf, 
  ArrowRight, 
  IndianRupee, 
  ShieldCheck, 
  Wrench, 
  Users 
} from 'lucide-react';

interface ModelShowcaseProps {
  models: EVModel[];
  onSelectModel: (slug: string) => void;
  onBookTestRide: (slug: string) => void;
  onCompare: () => void;
}

export const ModelShowcase: React.FC<ModelShowcaseProps> = ({
  models,
  onSelectModel,
  onBookTestRide,
  onCompare,
}) => {
  // Select the 3 flagship electric scooter models shown in the reference:
  // Golden E1, Golden E2, Golden E3
  const displayModels = models.filter((m) => ['golden-e1', 'golden-e2', 'golden-e3'].includes(m.slug));
  const threeModels = displayModels.length === 3 ? displayModels : models.slice(0, 3);

  return (
    <section id="models-showcase" className="py-12 sm:py-16 bg-[#FAF6F0]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Centered Heading with Botanical Leaf Motif matching Reference Image */}
        <div className="relative text-center mb-10 sm:mb-12">
          {/* Decorative Three-Leaf Emblem */}
          <div className="inline-flex items-center justify-center text-[#8B263E] mb-2.5" aria-hidden="true">
            <svg width="34" height="26" viewBox="0 0 40 30" fill="currentColor">
              <path d="M 20 2 C 22 10, 30 14, 38 12 C 34 20, 24 24, 20 28 C 16 24, 6 20, 2 12 C 10 14, 18 10, 20 2 Z" opacity="0.9" />
              <path d="M 12 14 C 7 11, 2 16, 5 21 C 9 20, 11 17, 12 14 Z" opacity="0.65" />
              <path d="M 28 14 C 33 11, 38 16, 35 21 C 31 20, 29 17, 28 14 Z" opacity="0.65" />
            </svg>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-normal text-[#2D1219] tracking-tight">
            Our EV Models
          </h2>
          <p className="text-sm sm:text-base text-[#73525A] mt-2 font-normal">
            Three models. One cleaner tomorrow.
          </p>

          {/* Desktop Right Link: "View All Models →" */}
          <div className="sm:absolute sm:right-0 sm:bottom-1 mt-4 sm:mt-0 flex justify-center sm:justify-end">
            <button
              onClick={onCompare}
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#8B263E] hover:underline cursor-pointer group"
            >
              <span>View All Models</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>

        {/* 3 Model Cards Grid in one row on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {threeModels.map((model) => (
            <ProductCard
              key={model.id}
              model={model}
              onViewDetails={onSelectModel}
            />
          ))}
        </div>

        {/* Section 4: Horizontal Feature Strip matching Reference Image */}
        <div 
          id="feature-strip"
          className="mt-12 sm:mt-16 bg-white border border-[#EBDCD4] rounded-2xl p-5 sm:p-7 shadow-sm"
        >
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 sm:gap-4 divide-y sm:divide-y-0 lg:divide-x divide-[#F0E4DE]">
            {/* 1. Eco Friendly */}
            <div className="flex items-center gap-3.5 pt-3 sm:pt-0 lg:px-3">
              <div className="w-9 h-9 rounded-full bg-[#8B263E] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Leaf className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-bold text-[#2D1219]">Eco Friendly</h4>
                <p className="text-[11px] text-[#73525A]">Zero emissions</p>
              </div>
            </div>

            {/* 2. Low Running Cost */}
            <div className="flex items-center gap-3.5 pt-3 sm:pt-0 lg:px-3">
              <div className="w-9 h-9 rounded-full bg-[#8B263E] text-white flex items-center justify-center shrink-0 shadow-sm">
                <IndianRupee className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-bold text-[#2D1219]">Low Running Cost</h4>
                <p className="text-[11px] text-[#73525A]">Save every day</p>
              </div>
            </div>

            {/* 3. Reliable & Safe */}
            <div className="flex items-center gap-3.5 pt-3 sm:pt-0 lg:px-3">
              <div className="w-9 h-9 rounded-full bg-[#8B263E] text-white flex items-center justify-center shrink-0 shadow-sm">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-bold text-[#2D1219]">Reliable & Safe</h4>
                <p className="text-[11px] text-[#73525A]">Built for India</p>
              </div>
            </div>

            {/* 4. Wide Service Network */}
            <div className="flex items-center gap-3.5 pt-3 sm:pt-0 lg:px-3">
              <div className="w-9 h-9 rounded-full bg-[#8B263E] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Wrench className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-bold text-[#2D1219]">Wide Service Network</h4>
                <p className="text-[11px] text-[#73525A]">Always near you</p>
              </div>
            </div>

            {/* 5. Trusted by Thousands */}
            <div className="flex items-center gap-3.5 pt-3 sm:pt-0 lg:px-3">
              <div className="w-9 h-9 rounded-full bg-[#8B263E] text-white flex items-center justify-center shrink-0 shadow-sm">
                <Users className="w-4 h-4" />
              </div>
              <div className="text-left">
                <h4 className="text-xs sm:text-sm font-bold text-[#2D1219]">Trusted by Thousands</h4>
                <p className="text-[11px] text-[#73525A]">Growing EV community</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
