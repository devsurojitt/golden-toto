import React, { useState } from 'react';
import { EVModel } from '../types';
import { 
  ArrowLeft, 
  CalendarCheck, 
  MessageSquare, 
  PhoneCall, 
  Check, 
  Battery, 
  Gauge, 
  Milestone, 
  Zap, 
  ShieldCheck, 
  Truck, 
  Sparkles,
  Layers,
  Maximize2,
  X,
  Calculator
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface ModelDetailProps {
  model: EVModel;
  allModels: EVModel[];
  onBack: () => void;
  onBookTestRide: (modelSlug: string) => void;
  onEnquire: (modelSlug: string) => void;
  onCompare: () => void;
  onSwitchModel: (slug: string) => void;
  onOpenCalculator: (price: number) => void;
}

export const ModelDetail: React.FC<ModelDetailProps> = ({
  model,
  allModels,
  onBack,
  onBookTestRide,
  onEnquire,
  onCompare,
  onSwitchModel,
  onOpenCalculator,
}) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const activeColor = model.colors[selectedColorIndex] || model.colors[0];

  const handleColorChange = (index: number) => {
    setSelectedColorIndex(index);
    trackEvent('color_change', {
      model: model.slug,
      color: model.colors[index]?.name || ''
    });
  };

  const handleWhatsAppChat = () => {
    const msg = encodeURIComponent(
      `Hello Golden Toto! I am interested in the ${model.name} (${model.priceDisplay}) in ${activeColor.name}. Please share official on-road quotes and brochure.`
    );
    window.open(`https://wa.me/919830123456?text=${msg}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="model-detail-view" className="py-10 md:py-16 bg-[#FAF6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb & Back button */}
        <div className="flex items-center justify-between gap-4 mb-8">
          <button
            id="back-to-models-btn"
            onClick={onBack}
            className="inline-flex items-center gap-2 text-xs font-semibold text-[#5A3E45] hover:text-[#8B263E] transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4 text-[#8B263E]" />
            <span>Back to All Models</span>
          </button>

          {/* Quick Model Switcher */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-[#73525A] hidden sm:inline font-medium">Switch Model:</span>
            {allModels.map((m) => (
              <button
                key={m.id}
                onClick={() => onSwitchModel(m.slug)}
                className={`text-xs px-3 py-1.5 rounded-full transition-all cursor-pointer ${
                  m.slug === model.slug
                    ? 'bg-[#8B263E] text-white font-bold shadow-sm'
                    : 'bg-white text-[#5A3E45] hover:text-[#8B263E] border border-[#EBDCD4]'
                }`}
              >
                {m.name.replace('Golden Toto ', '')}
              </button>
            ))}
          </div>
        </div>

        {/* Hero Section: Vehicle Image & Top Conversion Zone */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16 items-start">
          {/* Left / Top: Interactive Vehicle Media & Color Selector */}
          <div className="lg:col-span-7 space-y-4">
            {/* Main Stage Image Container */}
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden bg-gradient-to-b from-[#FBF8F5] to-[#F5ECE8] border border-[#EBDCD4] shadow-md p-6 flex items-center justify-center">
              <img
                key={activeColor.image}
                src={activeColor.image || model.heroImage}
                alt={`${model.name} in ${activeColor.name}`}
                className="max-h-full w-auto object-contain drop-shadow-md transition-opacity duration-300"
                referrerPolicy="no-referrer"
              />

              {/* Expand Lightbox Trigger */}
              <button
                id="expand-hero-lightbox-btn"
                onClick={() => setLightboxImage(activeColor.image || model.heroImage)}
                className="absolute bottom-4 right-4 p-2.5 rounded-full bg-white/80 hover:bg-white text-[#8B263E] shadow-sm transition-colors border border-[#EBDCD4] cursor-pointer"
                title="View Full Size"
              >
                <Maximize2 className="w-4 h-4" />
              </button>

              {/* Active Color Label Overlay */}
              <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-sm border border-[#EBDCD4] text-xs font-semibold text-[#2D1219] shadow-sm">
                <span>Color: </span>
                <span className="text-[#8B263E] font-bold">{activeColor.name}</span>
              </div>
            </div>

            {/* Color Swatches Selection */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#EBDCD4] shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs uppercase font-bold tracking-wider text-[#73525A] block mb-1">
                  Choose Color Finish
                </span>
                <p className="text-sm font-semibold text-[#2D1219]">
                  {activeColor.name}
                </p>
              </div>

              <div className="flex items-center gap-3">
                {model.colors.map((color, idx) => {
                  const isSelected = selectedColorIndex === idx;
                  return (
                    <button
                      key={color.name}
                      id={`color-swatch-${idx}`}
                      onClick={() => handleColorChange(idx)}
                      title={color.name}
                      className={`relative p-1 rounded-full transition-all focus:outline-none cursor-pointer ${
                        isSelected 
                          ? 'ring-2 ring-[#8B263E] ring-offset-2 ring-offset-[#FAF6F0] scale-110' 
                          : 'hover:scale-105 opacity-80 hover:opacity-100'
                      }`}
                    >
                      <div 
                        className="w-7 h-7 rounded-full border border-black/10 shadow-sm flex items-center justify-center"
                        style={{
                          background: color.secondaryHex 
                            ? `linear-gradient(135deg, ${color.hex} 50%, ${color.secondaryHex} 50%)`
                            : color.hex
                        }}
                      >
                        {isSelected && (
                          <Check className="w-3.5 h-3.5 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Thumbnail Gallery Row */}
            <div className="grid grid-cols-3 gap-3">
              {model.gallery.map((item, index) => (
                <div
                  key={index}
                  onClick={() => setLightboxImage(item.url)}
                  className="group relative aspect-[4/3] rounded-2xl overflow-hidden cursor-pointer border border-[#EBDCD4] hover:border-[#8B263E] bg-[#FAF6F0] transition-all p-2 flex items-center justify-center shadow-sm"
                >
                  <img
                    src={item.url}
                    alt={item.caption}
                    className="max-h-full w-auto object-contain group-hover:scale-105 transition-transform duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-end p-2">
                    <span className="text-[10px] text-white font-medium line-clamp-1">
                      {item.caption}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right / Top: Pricing, Value Props & CTAs */}
          <div className="lg:col-span-5 space-y-6">
            {/* Header info */}
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 border border-rose-200 text-[#8B263E] text-xs font-bold uppercase tracking-wider mb-2">
                <Zap className="w-3 h-3 fill-current" />
                <span>{model.category === 'cargo-toto' ? 'Commercial E-Toto' : 'Smart Electric Scooter'}</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-normal text-[#2D1219] font-serif tracking-tight mb-2">
                {model.name}
              </h1>
              <p className="text-sm sm:text-base text-[#5A3E45] leading-relaxed font-normal">
                {model.tagline}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-6 rounded-3xl bg-white border border-[#EBDCD4] shadow-sm">
              <div className="flex items-baseline justify-between gap-2 mb-1">
                <span className="text-xs uppercase font-bold tracking-wider text-[#73525A]">
                  Starting Ex-Showroom Price
                </span>
                <span className="text-xs text-emerald-700 font-semibold">
                  FAME / State Subsidy Eligible
                </span>
              </div>
              <div className="flex items-baseline gap-3">
                <span className="text-3xl sm:text-4xl font-extrabold text-[#8B263E] font-heading">
                  {model.priceDisplay}
                </span>
                <span className="text-xs text-[#73525A] font-medium">
                  + applicable state RTO & insurance
                </span>
              </div>

              {/* EMI mini teaser */}
              <div className="mt-3 pt-3 border-t border-[#EBDCD4] flex items-center justify-between text-xs">
                <span className="text-[#5A3E45]">
                  Estimated EMI from <strong className="text-[#8B263E]">₹{Math.round(model.startingPrice * 0.031)}/mo</strong>
                </span>
                <button
                  onClick={() => onOpenCalculator(model.startingPrice)}
                  className="text-xs text-[#8B263E] hover:underline inline-flex items-center gap-1 font-semibold cursor-pointer"
                >
                  <Calculator className="w-3.5 h-3.5" />
                  <span>Calculate EMI</span>
                </button>
              </div>
            </div>

            {/* Key 4 Highlights Pills */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-2xl bg-white border border-[#EBDCD4] shadow-sm">
                <div className="flex items-center gap-1.5 text-[#8B263E] text-xs font-semibold mb-1">
                  <Milestone className="w-4 h-4" />
                  <span>Certified Range</span>
                </div>
                <p className="text-lg font-bold text-[#2D1219] font-serif">{model.specs.rangeIdc}</p>
                <p className="text-[11px] text-[#73525A]">TrueRange: {model.specs.rangeTrue}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#EBDCD4] shadow-sm">
                <div className="flex items-center gap-1.5 text-[#8B263E] text-xs font-semibold mb-1">
                  <Battery className="w-4 h-4" />
                  <span>Battery Pack</span>
                </div>
                <p className="text-lg font-bold text-[#2D1219] font-serif">{model.specs.batteryCapacity}</p>
                <p className="text-[11px] text-[#73525A]">IP67 Waterproof</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#EBDCD4] shadow-sm">
                <div className="flex items-center gap-1.5 text-[#8B263E] text-xs font-semibold mb-1">
                  <Gauge className="w-4 h-4" />
                  <span>Top Speed</span>
                </div>
                <p className="text-lg font-bold text-[#2D1219] font-serif">{model.specs.topSpeed}</p>
                <p className="text-[11px] text-[#73525A]">{model.specs.peakPower}</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#EBDCD4] shadow-sm">
                <div className="flex items-center gap-1.5 text-[#8B263E] text-xs font-semibold mb-1">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Warranty</span>
                </div>
                <p className="text-sm font-bold text-[#2D1219] font-serif mt-0.5">{model.specs.warranty.split(' ')[0]} {model.specs.warranty.split(' ')[1]}</p>
                <p className="text-[11px] text-[#73525A]">Battery & Motor</p>
              </div>
            </div>

            {/* Primary Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                id="detail-book-test-ride-btn"
                onClick={() => onBookTestRide(model.slug)}
                className="w-full py-3.5 px-6 rounded-full bg-[#8B263E] hover:bg-[#731E32] text-white font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md shadow-[#8B263E]/20 active:scale-[0.98] cursor-pointer"
              >
                <CalendarCheck className="w-5 h-5 text-white" />
                <span>Book Test Ride for {model.name}</span>
              </button>

              <div className="grid grid-cols-2 gap-3">
                <button
                  id="detail-enquire-btn"
                  onClick={() => onEnquire(model.slug)}
                  className="py-3 px-4 rounded-full bg-white hover:bg-rose-50 border border-[#EBDCD4] text-[#2D1219] font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <MessageSquare className="w-4 h-4 text-[#8B263E]" />
                  <span>Enquire Now</span>
                </button>

                <button
                  id="detail-whatsapp-btn"
                  onClick={handleWhatsAppChat}
                  className="py-3 px-4 rounded-full bg-[#25D366]/10 hover:bg-[#25D366]/20 border border-[#25D366]/40 text-[#1E7E34] font-semibold text-sm flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <PhoneCall className="w-4 h-4" />
                  <span>WhatsApp Chat</span>
                </button>
              </div>

              <button
                id="detail-compare-action-btn"
                onClick={onCompare}
                className="w-full py-2 text-xs text-[#73525A] hover:text-[#8B263E] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Layers className="w-3.5 h-3.5 text-[#8B263E]" />
                <span>Compare {model.name} against other models →</span>
              </button>
            </div>
          </div>
        </div>

        {/* Detailed Spec Grid */}
        <div id="full-spec-grid" className="mt-16 pt-12 border-t border-[#EBDCD4]">
          <div className="max-w-3xl mb-8">
            <h2 className="text-2xl sm:text-3xl font-normal text-[#2D1219] font-serif">
              Technical Specifications
            </h2>
            <p className="text-sm text-[#73525A] mt-1 font-normal">
              Verified manufacturer engineering benchmarks and structural dimensions for {model.name}.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Spec Group 1: Powertrain & Battery */}
            <div className="p-6 rounded-3xl bg-white border border-[#EBDCD4] shadow-sm space-y-4">
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#8B263E] flex items-center gap-1.5 border-b border-[#EBDCD4] pb-2">
                <Battery className="w-4 h-4" />
                <span>Battery & Powertrain</span>
              </h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs text-[#73525A] block">Battery Chemistry</span>
                  <span className="text-[#2D1219] font-semibold">{model.specs.batteryType}</span>
                </div>
                <div>
                  <span className="text-xs text-[#73525A] block">Battery Capacity</span>
                  <span className="text-[#2D1219] font-semibold">{model.specs.batteryCapacity}</span>
                </div>
                <div>
                  <span className="text-xs text-[#73525A] block">Motor Configuration</span>
                  <span className="text-[#2D1219] font-semibold">{model.specs.motorType}</span>
                </div>
                <div>
                  <span className="text-xs text-[#73525A] block">Peak / Rated Power</span>
                  <span className="text-[#2D1219] font-semibold">{model.specs.peakPower}</span>
                </div>
                <div>
                  <span className="text-xs text-[#73525A] block">Charging Duration</span>
                  <span className="text-[#2D1219] font-semibold">{model.specs.chargingTime}</span>
                </div>
                <div>
                  <span className="text-xs text-[#73525A] block">Fast Charge Support</span>
                  <span className="text-[#2D1219] font-semibold">{model.specs.fastCharging}</span>
                </div>
              </div>
            </div>

            {/* Spec Group 2: Performance & Dynamics */}
            <div className="p-6 rounded-3xl bg-white border border-[#EBDCD4] shadow-sm space-y-4">
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#8B263E] flex items-center gap-1.5 border-b border-[#EBDCD4] pb-2">
                <Gauge className="w-4 h-4" />
                <span>Performance & Range</span>
              </h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs text-[#73525A] block">Certified Range (IDC)</span>
                  <span className="text-[#2D1219] font-semibold">{model.specs.rangeIdc}</span>
                </div>
                <div>
                  <span className="text-xs text-[#73525A] block">Real-World TrueRange</span>
                  <span className="text-[#2D1219] font-semibold">{model.specs.rangeTrue}</span>
                </div>
                <div>
                  <span className="text-xs text-[#73525A] block">Top Speed</span>
                  <span className="text-[#2D1219] font-semibold">{model.specs.topSpeed}</span>
                </div>
                <div>
                  <span className="text-xs text-[#73525A] block">Ride Modes</span>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {model.specs.ridingModes.map((mode) => (
                      <span key={mode} className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#FAF6F0] text-[#2D1219] border border-[#EBDCD4]">
                        {mode}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <span className="text-xs text-[#73525A] block">Braking System</span>
                  <span className="text-[#2D1219] font-semibold">{model.specs.brakes}</span>
                </div>
                <div>
                  <span className="text-xs text-[#73525A] block">Suspension</span>
                  <span className="text-[#2D1219] font-semibold">{model.specs.suspension}</span>
                </div>
              </div>
            </div>

            {/* Spec Group 3: Dimensions & Warranty */}
            <div className="p-6 rounded-3xl bg-white border border-[#EBDCD4] shadow-sm space-y-4">
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#8B263E] flex items-center gap-1.5 border-b border-[#EBDCD4] pb-2">
                <Truck className="w-4 h-4" />
                <span>Build, Weight & Warranty</span>
              </h3>
              
              <div className="space-y-3 text-sm">
                <div>
                  <span className="text-xs text-[#73525A] block">Payload Capacity</span>
                  <span className="text-[#2D1219] font-semibold">{model.specs.payload}</span>
                </div>
                <div>
                  <span className="text-xs text-[#73525A] block">Kerb Weight</span>
                  <span className="text-[#2D1219] font-semibold">{model.specs.kerbWeight}</span>
                </div>
                <div>
                  <span className="text-xs text-[#73525A] block">Dimensions (L × W × H)</span>
                  <span className="text-[#2D1219] font-semibold">{model.specs.dimensions}</span>
                </div>
                <div>
                  <span className="text-xs text-[#73525A] block">Ground Clearance</span>
                  <span className="text-[#2D1219] font-semibold">{model.specs.groundClearance}</span>
                </div>
                <div>
                  <span className="text-xs text-[#73525A] block">Manufacturer Warranty</span>
                  <span className="text-[#2D1219] font-semibold">{model.specs.warranty}</span>
                </div>
                <div>
                  <span className="text-xs text-[#73525A] block">Water & Dust Ingress</span>
                  <span className="text-[#2D1219] font-semibold">IP67 Submersion Safe</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Feature Highlights Cards */}
        <div className="mt-16 pt-12 border-t border-[#EBDCD4]">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-2xl sm:text-3xl font-normal text-[#2D1219] font-serif">
              Engineered For The Everyday
            </h2>
            <p className="text-sm text-[#73525A] mt-1 font-normal">
              Thoughtful features built to withstand monsoons, city traffic, and heavy daily usage.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {model.highlights.map((h, i) => (
              <div 
                key={i} 
                className="p-6 rounded-3xl bg-white border border-[#EBDCD4] hover:border-[#8B263E]/40 transition-colors shadow-sm"
              >
                <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center text-[#8B263E] mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h4 className="text-base font-bold text-[#2D1219] mb-1.5 font-serif">
                  {h.title}
                </h4>
                <p className="text-xs text-[#5A3E45] leading-relaxed">
                  {h.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Conversion Band */}
        <div className="mt-16 p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-[#6E1A2D] via-[#7A1E34] to-[#501320] text-white border border-white/10 text-center relative overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-serif font-medium text-white mb-2">
              Ready to Experience the {model.name}?
            </h3>
            <p className="text-sm text-rose-100/90 mb-6 font-normal">
              Reserve your priority test ride slot at our nearest Golden Toto dealership with zero commitment.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                onClick={() => onBookTestRide(model.slug)}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-white hover:bg-rose-50 text-[#8B263E] font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Book Test Ride Slot
              </button>
              <button
                onClick={() => onEnquire(model.slug)}
                className="w-full sm:w-auto px-7 py-3 rounded-full bg-black/20 hover:bg-black/30 text-white font-semibold text-sm transition-colors border border-white/40 cursor-pointer"
              >
                Contact Sales Team
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div 
          id="gallery-lightbox-modal"
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div 
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-6"
          >
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-[#FAF6F0] text-[#2D1219] hover:bg-[#F3E7E2] transition-colors cursor-pointer"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
            <div className="aspect-[16/10] sm:aspect-[16/9] w-full flex items-center justify-center">
              <img
                src={lightboxImage}
                alt="Enlarged view"
                className="max-h-full max-w-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
