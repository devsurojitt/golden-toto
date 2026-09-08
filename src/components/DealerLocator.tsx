import React, { useState } from 'react';
import { Dealer } from '../types';
import { DEALERS_DATA } from '../data/dealers';
import { trackEvent } from '../utils/analytics';
import { 
  MapPin, 
  Phone, 
  Clock, 
  ExternalLink, 
  Building2, 
  Sparkles,
  Search,
  MessageSquare
} from 'lucide-react';

interface DealerLocatorProps {
  onContactSupport: () => void;
  onBookTestRideAtShowroom: (showroomName: string) => void;
}

export const DealerLocator: React.FC<DealerLocatorProps> = ({
  onContactSupport,
  onBookTestRideAtShowroom,
}) => {
  const [selectedCity, setSelectedCity] = useState<'All' | 'Kolkata' | 'Asansol' | 'Siliguri'>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const cities: ('All' | 'Kolkata' | 'Asansol' | 'Siliguri')[] = ['All', 'Kolkata', 'Asansol', 'Siliguri'];

  const filteredDealers = DEALERS_DATA.filter((dealer) => {
    const matchesCity = selectedCity === 'All' || dealer.city === selectedCity;
    const matchesSearch = 
      dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesSearch;
  });

  const handleOpenMaps = (dealer: Dealer) => {
    trackEvent('dealer_map_click', {
      dealerId: dealer.id,
      city: dealer.city
    });
    window.open(dealer.mapsUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="dealer-locator-view" className="py-12 md:py-20 bg-[#FAF6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B263E] mb-2">
            <Building2 className="w-4 h-4" />
            <span>Authorized Experience Network</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#2D1219] font-serif">
            Find an Authorized Showroom
          </h1>
          <p className="text-sm sm:text-base text-[#73525A] mt-2 font-normal">
            Step into our authorized showrooms across West Bengal for live demonstrations, test rides, financing guidance, and genuine service parts.
          </p>
        </div>

        {/* Filter Controls: City Pills & Search Box */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 p-4 rounded-3xl bg-white border border-[#EBDCD4] shadow-sm">
          {/* City Pills */}
          <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto">
            {cities.map((city) => (
              <button
                key={city}
                id={`filter-city-${city.toLowerCase()}`}
                onClick={() => setSelectedCity(city)}
                className={`px-4 py-2 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCity === city
                    ? 'bg-[#8B263E] text-white shadow-sm'
                    : 'bg-[#FAF6F0] text-[#5A3E45] hover:text-[#8B263E] border border-[#EBDCD4]'
                }`}
              >
                {city} {city === 'All' ? `(${DEALERS_DATA.length})` : ''}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#8C6D75] absolute left-3.5 top-3" />
            <input
              id="dealer-search-input"
              type="text"
              placeholder="Search area, road, or city..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-full bg-[#FAF6F0] border border-[#EBDCD4] text-[#2D1219] text-xs placeholder:text-[#8C6D75] focus:outline-none focus:border-[#8B263E]"
            />
          </div>
        </div>

        {/* Dealers Grid */}
        {filteredDealers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDealers.map((dealer) => (
              <div
                key={dealer.id}
                id={`dealer-card-${dealer.id}`}
                className={`flex flex-col justify-between p-6 rounded-3xl bg-white border transition-all duration-200 shadow-sm hover:shadow-md ${
                  dealer.isFlagship
                    ? 'border-[#8B263E]/60 ring-1 ring-[#8B263E]/20'
                    : 'border-[#EBDCD4] hover:border-[#8B263E]/30'
                }`}
              >
                <div>
                  {/* Flagship Badge */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[11px] font-bold text-[#8B263E] uppercase tracking-wider">
                      {dealer.city}
                    </span>
                    {dealer.isFlagship && (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-[#8B263E]">
                        <Sparkles className="w-3 h-3 text-[#D4AF37]" />
                        Flagship Experience Hub
                      </span>
                    )}
                  </div>

                  <h3 className="text-xl font-bold text-[#2D1219] font-serif mb-3">
                    {dealer.name}
                  </h3>

                  <div className="space-y-2.5 text-xs text-[#5A3E45] mb-6">
                    <div className="flex items-start gap-2.5">
                      <MapPin className="w-4 h-4 text-[#8B263E] flex-shrink-0 mt-0.5" />
                      <p className="leading-relaxed">{dealer.address}</p>
                    </div>

                    <div className="flex items-center gap-2.5">
                      <Phone className="w-4 h-4 text-[#8B263E] flex-shrink-0" />
                      <a 
                        href={`tel:${dealer.phone.replace(/\s+/g, '')}`} 
                        className="hover:text-[#8B263E] transition-colors font-medium"
                      >
                        {dealer.phone}
                      </a>
                    </div>

                    <div className="flex items-start gap-2.5">
                      <Clock className="w-4 h-4 text-[#8B263E] flex-shrink-0 mt-0.5" />
                      <p className="text-[#73525A]">{dealer.timing}</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Actions */}
                <div className="space-y-2 pt-3 border-t border-[#EBDCD4]">
                  <button
                    id={`btn-maps-${dealer.id}`}
                    onClick={() => handleOpenMaps(dealer)}
                    className="w-full py-2.5 px-4 rounded-full bg-[#FAF6F0] hover:bg-[#F3E7E2] text-[#2D1219] font-semibold text-xs border border-[#EBDCD4] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <span>Open in Google Maps</span>
                    <ExternalLink className="w-3.5 h-3.5 text-[#8B263E]" />
                  </button>

                  <button
                    onClick={() => onBookTestRideAtShowroom(dealer.name)}
                    className="w-full py-2.5 px-4 rounded-full bg-[#8B263E] hover:bg-[#731E32] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm cursor-pointer"
                  >
                    <span>Book Test Ride Here</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div 
            id="dealer-empty-state"
            className="p-10 rounded-3xl bg-white border border-[#EBDCD4] text-center max-w-md mx-auto space-y-4 shadow-sm"
          >
            <div className="w-12 h-12 rounded-full bg-rose-50 border border-rose-200 flex items-center justify-center mx-auto text-[#8B263E]">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#2D1219] font-serif">
                No Showroom Found In This Area Yet
              </h3>
              <p className="text-xs text-[#73525A] mt-1">
                We are actively expanding our authorized dealer network across India. Contact our sales office for doorstep delivery or franchise inquiries.
              </p>
            </div>
            <button
              id="empty-state-contact-us-btn"
              onClick={onContactSupport}
              className="px-5 py-2.5 rounded-full bg-[#8B263E] hover:bg-[#731E32] text-white font-bold text-xs inline-flex items-center gap-2 cursor-pointer shadow-sm"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>Contact Showroom Support</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
