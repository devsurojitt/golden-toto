import React from 'react';
import { EVModel } from '../types';
import { ScooterVisual } from './ScooterVisual';
import { 
  Clock, 
  BatteryMedium, 
  Gauge, 
  ArrowRight
} from 'lucide-react';

interface ProductCardProps {
  model: EVModel;
  onViewDetails: (slug: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  model,
  onViewDetails,
}) => {
  // Determine colorway based on model slug
  const colorway = model.slug === 'golden-e2' 
    ? 'pearl-white' 
    : model.slug === 'golden-e3' 
    ? 'matte-black' 
    : 'dusty-rose';

  return (
    <div 
      id={`product-card-${model.slug}`}
      className="group relative flex flex-col bg-white rounded-3xl border border-[#EBDCD4] hover:border-[#8B263E]/40 shadow-sm hover:shadow-xl hover:shadow-[#8B263E]/10 transition-all duration-300 overflow-hidden"
    >
      {/* Top Left Badge (Best Value / Most Popular / Premium) matching Reference Image */}
      {model.badge && (
        <div className="absolute top-4 left-4 z-10">
          <span className="inline-block text-[11px] font-semibold px-3 py-1 rounded-full bg-[#8B263E] text-white shadow-sm tracking-wide">
            {model.badge}
          </span>
        </div>
      )}

      {/* Scooter Presentation Stage with Clean Light Background */}
      <div 
        onClick={() => onViewDetails(model.slug)}
        className="relative aspect-[16/11] w-full overflow-hidden cursor-pointer bg-gradient-to-b from-[#FAF8F5] via-[#F6EEEA] to-[#F1E5E0] flex items-center justify-center p-4 pt-6"
      >
        <div className="w-[85%] h-[85%] flex items-center justify-center transition-transform duration-500 group-hover:scale-105">
          <ScooterVisual colorway={colorway} className="w-full h-full" />
        </div>
      </div>

      {/* Card Body */}
      <div className="p-6 flex-1 flex flex-col justify-between text-center">
        <div>
          {/* Model Title */}
          <h3 
            onClick={() => onViewDetails(model.slug)}
            className="text-2xl font-serif font-bold text-[#2D1219] group-hover:text-[#8B263E] transition-colors cursor-pointer"
          >
            {model.name}
          </h3>

          {/* Model Tagline */}
          <p className="text-xs sm:text-sm text-[#73525A] mt-1 mb-3">
            {model.tagline}
          </p>

          {/* Price Display */}
          <div className="mb-5">
            <span className="text-2xl sm:text-3xl font-serif font-bold text-[#8B263E] block leading-tight">
              {model.priceDisplay}
            </span>
            <span className="text-[11px] text-[#8C6D75] uppercase tracking-wider font-semibold">
              Starting Price
            </span>
          </div>

          {/* 3 Specifications with Icons matching Reference */}
          <div className="grid grid-cols-3 gap-1 py-3.5 border-t border-b border-[#F0E4DE] text-center mb-6">
            {/* Range */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-[#8B263E] mb-1">
                <Clock className="w-3.5 h-3.5" />
                <span className="text-xs font-bold text-[#2D1219]">{model.specs.rangeIdc}</span>
              </div>
              <span className="text-[10px] text-[#73525A] font-medium">Range</span>
            </div>

            {/* Battery */}
            <div className="flex flex-col items-center border-x border-[#F0E4DE]">
              <div className="flex items-center gap-1 text-[#8B263E] mb-1">
                <BatteryMedium className="w-3.5 h-3.5" />
                <span className="text-xs font-bold text-[#2D1219]">{model.specs.batteryCapacity}</span>
              </div>
              <span className="text-[10px] text-[#73525A] font-medium">Battery</span>
            </div>

            {/* Top Speed */}
            <div className="flex flex-col items-center">
              <div className="flex items-center gap-1 text-[#8B263E] mb-1">
                <Gauge className="w-3.5 h-3.5" />
                <span className="text-xs font-bold text-[#2D1219]">{model.specs.topSpeed}</span>
              </div>
              <span className="text-[10px] text-[#73525A] font-medium">Top Speed</span>
            </div>
          </div>
        </div>

        {/* View Details Button matching Reference Image */}
        <button
          id={`btn-view-details-${model.slug}`}
          onClick={() => onViewDetails(model.slug)}
          className="w-full py-3 px-4 rounded-full bg-[#8B263E] hover:bg-[#731E32] text-white font-semibold text-sm flex items-center justify-center gap-2 transition-all shadow-md shadow-[#8B263E]/20 active:scale-95 cursor-pointer"
        >
          <span>View Details</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
