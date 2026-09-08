import React, { useState } from 'react';
import { FAQ_DATA, FAQ_CATEGORIES, SERVICE_POLICIES } from '../data/faq';
import { 
  ShieldCheck, 
  Wrench, 
  HelpCircle, 
  ChevronDown, 
  CheckCircle2, 
  PhoneCall
} from 'lucide-react';

interface ServiceWarrantyFaqProps {
  onBookTestRide: () => void;
  onContactSupport: () => void;
}

export const ServiceWarrantyFaq: React.FC<ServiceWarrantyFaqProps> = ({
  onBookTestRide,
  onContactSupport,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [expandedFaqId, setExpandedFaqId] = useState<string | null>(FAQ_DATA[0]?.id || null);

  const filteredFaqs = FAQ_DATA.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  const toggleFaq = (id: string) => {
    setExpandedFaqId((prev) => (prev === id ? null : id));
  };

  return (
    <div id="service-warranty-faq-view" className="py-12 md:py-20 bg-[#FAF6F0] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B263E] mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>Ownership Peace of Mind</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#2D1219] font-serif">
            Service, Warranty & FAQ
          </h1>
          <p className="text-sm sm:text-base text-[#73525A] mt-2 font-normal">
            Comprehensive coverage guidelines, free periodic service milestones, and clear answers to frequently asked EV questions.
          </p>
        </div>

        {/* Section 1: Periodic Service Schedule */}
        <div className="mb-16">
          <div className="flex items-center gap-2.5 mb-6">
            <div className="w-9 h-9 rounded-full bg-rose-100 flex items-center justify-center text-[#8B263E]">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-[#2D1219] font-serif">
                Complimentary Periodic Inspection Schedule
              </h2>
              <p className="text-xs text-[#73525A]">Included free with every new Golden Toto vehicle</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SERVICE_POLICIES.freeServices.map((srv, idx) => (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-white border border-[#EBDCD4] space-y-3 shadow-sm"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-rose-100 text-[#8B263E]">
                    {srv.number}
                  </span>
                  <span className="text-xs font-mono font-semibold text-[#2D1219]">
                    {srv.interval}
                  </span>
                </div>
                <p className="text-xs text-[#5A3E45] leading-relaxed pt-2">
                  {srv.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Warranty Terms & RSA Band */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-16">
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-[#EBDCD4] space-y-4 shadow-sm">
            <h3 className="text-xl font-bold text-[#2D1219] font-serif flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-[#8B263E]" />
              <span>Manufacturer Battery & Powertrain Warranty</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#5A3E45] leading-relaxed">
              Every Golden Toto battery pack is backed by our comprehensive warranty ensuring minimum 75% capacity retention across 3 to 5 years (depending on the model).
            </p>
            <div className="space-y-2.5 pt-2">
              {SERVICE_POLICIES.warrantyTerms.map((term, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-[#5A3E45]">
                  <CheckCircle2 className="w-4 h-4 text-[#8B263E] flex-shrink-0 mt-0.5" />
                  <span>{term}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#7A1E34] to-[#501320] text-white border border-white/10 flex flex-col justify-between space-y-4 shadow-lg">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-rose-200 block mb-1">
                24x7 Roadside Assistance (RSA)
              </span>
              <h3 className="text-2xl font-serif font-medium text-white">
                Always Covered On The Road
              </h3>
              <p className="text-xs text-rose-100/90 leading-relaxed mt-2">
                {SERVICE_POLICIES.roadsideAssistance.description}
              </p>
            </div>

            <div className="pt-2 border-t border-white/20">
              <span className="text-xs text-rose-200 block mb-1">Emergency RSA Hotline:</span>
              <a 
                href={`tel:${SERVICE_POLICIES.roadsideAssistance.hotline.replace(/\s+/g, '')}`}
                className="inline-flex items-center gap-2 text-base sm:text-lg font-bold text-white hover:underline font-mono"
              >
                <PhoneCall className="w-4 h-4 text-rose-200" />
                <span>{SERVICE_POLICIES.roadsideAssistance.hotline}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Section 3: Interactive FAQ Accordion */}
        <div id="faq-section" className="border-t border-[#EBDCD4] pt-14">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B263E] mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Got Questions?</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-normal text-[#2D1219] font-serif">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-[#73525A] mt-1 font-normal">
              Tap any question below to view detailed policy answers.
            </p>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {FAQ_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                id={`faq-cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#8B263E] text-white shadow-sm'
                    : 'bg-white text-[#5A3E45] hover:text-[#8B263E] border border-[#EBDCD4]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Accordion Items */}
          <div className="max-w-3xl mx-auto space-y-3">
            {filteredFaqs.map((faq) => {
              const isExpanded = expandedFaqId === faq.id;
              return (
                <div
                  key={faq.id}
                  id={`faq-item-${faq.id}`}
                  className="rounded-2xl bg-white border border-[#EBDCD4] overflow-hidden transition-colors shadow-sm"
                >
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                    aria-expanded={isExpanded}
                  >
                    <span className="text-sm sm:text-base font-semibold text-[#2D1219]">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8B263E] flex-shrink-0 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {isExpanded && (
                    <div className="px-4 sm:px-5 pb-5 pt-1 border-t border-[#EBDCD4] text-xs sm:text-sm text-[#5A3E45] leading-relaxed animate-in fade-in duration-200">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Still have questions CTA */}
          <div className="mt-12 text-center p-6 rounded-3xl bg-white border border-[#EBDCD4] max-w-xl mx-auto shadow-sm">
            <h4 className="text-lg font-serif font-bold text-[#2D1219] mb-1">
              Need Further Clarification?
            </h4>
            <p className="text-xs text-[#73525A] mb-4">
              Our technical support and dealership team is available 6 days a week.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={onContactSupport}
                className="px-5 py-2.5 rounded-full bg-[#FAF6F0] hover:bg-[#F3E7E2] text-[#2D1219] font-semibold text-xs border border-[#EBDCD4] transition-colors cursor-pointer"
              >
                Send an Enquiry
              </button>
              <button
                onClick={onBookTestRide}
                className="px-5 py-2.5 rounded-full bg-[#8B263E] hover:bg-[#731E32] text-white font-bold text-xs shadow-sm cursor-pointer"
              >
                Book a Test Ride
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
