import React from 'react';
import { EVModel } from '../types';
import { ScooterVisual } from './ScooterVisual';
import { BatteryMedium, Gauge, MapPin, ArrowRight } from 'lucide-react';

interface ProductCardProps { model: EVModel; onViewDetails: (slug: string) => void; }

export const ProductCard: React.FC<ProductCardProps> = ({ model, onViewDetails }) => {
  const colorway = model.slug === 'golden-e2' ? 'pearl-white' : model.slug === 'golden-e3' ? 'matte-black' : 'dusty-rose';
  return <article id={`product-card-${model.slug}`} className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#eadcda] bg-white/80 shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-[#8d2946]/10">
    {model.badge && <span className="absolute left-3 top-3 z-10 rounded-full bg-[#8d2946] px-3 py-1 text-[10px] font-bold text-white">{model.badge}</span>}
    <button onClick={() => onViewDetails(model.slug)} className="relative flex aspect-[1.35] w-full cursor-pointer items-center justify-center overflow-hidden bg-gradient-to-b from-[#fffdfb] to-[#f5ece9] px-6 pt-6">
      <div className="h-full w-full transition duration-500 group-hover:scale-105"><ScooterVisual colorway={colorway} className="h-full w-full" /></div>
    </button>
    <div className="flex flex-1 flex-col p-4 text-center sm:p-5">
      <h3 onClick={() => onViewDetails(model.slug)} className="cursor-pointer font-serif text-lg font-semibold text-[#3b2028] transition group-hover:text-[#8d2946] sm:text-xl">{model.name}</h3>
      <p className="mt-0.5 text-[11px] text-[#765b62]">{model.tagline}</p>
      <div className="mt-2"><strong className="block text-lg font-bold text-[#8d2946] sm:text-xl">{model.priceDisplay}</strong><span className="text-[9px] uppercase tracking-wider text-[#987b82]">Starting Price</span></div>
      <div className="my-4 grid grid-cols-3 border-y border-[#efe2df] py-3">
        <div className="flex flex-col items-center gap-0.5"><MapPin className="h-3.5 w-3.5 text-[#8d2946]" /><b className="text-[10px] text-[#3b2028] sm:text-xs">{model.specs.rangeIdc}</b><span className="text-[9px] text-[#765b62]">Range</span></div>
        <div className="flex flex-col items-center gap-0.5 border-x border-[#efe2df]"><BatteryMedium className="h-3.5 w-3.5 text-[#8d2946]" /><b className="text-[10px] text-[#3b2028] sm:text-xs">{model.specs.batteryCapacity}</b><span className="text-[9px] text-[#765b62]">Battery</span></div>
        <div className="flex flex-col items-center gap-0.5"><Gauge className="h-3.5 w-3.5 text-[#8d2946]" /><b className="text-[10px] text-[#3b2028] sm:text-xs">{model.specs.topSpeed}</b><span className="text-[9px] text-[#765b62]">Top Speed</span></div>
      </div>
      <button onClick={() => onViewDetails(model.slug)} className="mt-auto inline-flex w-full items-center justify-center gap-1.5 rounded-full bg-[#8d2946] py-2.5 text-[11px] font-bold text-white transition hover:bg-[#6f1e37] active:scale-95">View Details <ArrowRight className="h-3.5 w-3.5" /></button>
    </div>
  </article>;
};
