import React, { useState } from 'react';
import { EVModel } from '../types';
import { ImageWithFallback } from './ImageWithFallback';
import { 
  Check, 
  Layers, 
  ArrowRight, 
  CalendarCheck, 
  ToggleLeft, 
  ToggleRight,
  Info
} from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface CompareModelsProps {
  models: EVModel[];
  onViewDetails: (slug: string) => void;
  onBookTestRide: (slug: string) => void;
}

export const CompareModels: React.FC<CompareModelsProps> = ({
  models,
  onViewDetails,
  onBookTestRide,
}) => {
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  const toggleHighlights = () => {
    const nextVal = !highlightDifferences;
    setHighlightDifferences(nextVal);
    trackEvent('compare_view', { highlightDifferences: nextVal ? 'yes' : 'no' });
  };

  const specRows: {
    key: string;
    label: string;
    description: string;
    values: (model: EVModel) => string | React.ReactNode;
    isDifferent?: boolean;
  }[] = [
    {
      key: 'price',
      label: 'Ex-Showroom Price',
      description: 'Starting ex-showroom price',
      values: (m) => (
        <span className="text-base font-extrabold text-[#8B263E] font-heading">
          {m.priceDisplay}
        </span>
      ),
      isDifferent: true,
    },
    {
      key: 'category',
      label: 'Vehicle Category',
      description: 'Design form factor',
      values: (m) => (m.category === 'cargo-toto' ? 'Commercial E-Toto' : 'Electric Scooter'),
      isDifferent: true,
    },
    {
      key: 'rangeIdc',
      label: 'Certified Range',
      description: 'ARAI/ICAT certified range',
      values: (m) => (
        <span className="font-bold text-[#2D1219]">{m.specs.rangeIdc}</span>
      ),
      isDifferent: true,
    },
    {
      key: 'rangeTrue',
      label: 'Real-World TrueRange™',
      description: 'Tested city commute range',
      values: (m) => (
        <span className="font-bold text-[#8B263E]">{m.specs.rangeTrue}</span>
      ),
      isDifferent: true,
    },
    {
      key: 'batteryCapacity',
      label: 'Battery Capacity',
      description: 'Nominal energy capacity',
      values: (m) => m.specs.batteryCapacity,
      isDifferent: true,
    },
    {
      key: 'batteryType',
      label: 'Battery Chemistry',
      description: 'Thermal & safety architecture',
      values: (m) => m.specs.batteryType,
      isDifferent: false,
    },
    {
      key: 'topSpeed',
      label: 'Top Velocity',
      description: 'Maximum engineered road speed',
      values: (m) => (
        <span className="font-bold text-[#2D1219]">{m.specs.topSpeed}</span>
      ),
      isDifferent: true,
    },
    {
      key: 'peakPower',
      label: 'Peak Power Output',
      description: 'Motor torque & peak output',
      values: (m) => m.specs.peakPower,
      isDifferent: true,
    },
    {
      key: 'chargingTime',
      label: 'Full Charging Time',
      description: '0 to 100% on standard 15A socket',
      values: (m) => m.specs.chargingTime,
      isDifferent: true,
    },
    {
      key: 'warranty',
      label: 'Comprehensive Warranty',
      description: 'Battery, motor & vehicle cover',
      values: (m) => m.specs.warranty,
      isDifferent: true,
    },
    {
      key: 'payload',
      label: 'Certified Payload',
      description: 'Maximum passenger & cargo capacity',
      values: (m) => m.specs.payload,
      isDifferent: true,
    },
    {
      key: 'brakes',
      label: 'Braking Architecture',
      description: 'Brakes & safety assist',
      values: (m) => m.specs.brakes,
      isDifferent: true,
    },
    {
      key: 'groundClearance',
      label: 'Ground Clearance',
      description: 'Pothole & monsoon road clearance',
      values: (m) => m.specs.groundClearance,
      isDifferent: true,
    }
  ];

  return (
    <div id="compare-models-section" className="py-12 md:py-20 bg-[#FAF6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B263E] mb-2">
              <Layers className="w-4 h-4" />
              <span>Transparent Comparison</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#2D1219] font-serif tracking-tight">
              Compare Golden Toto Lineup
            </h1>
            <p className="text-sm sm:text-base text-[#73525A] mt-2 max-w-2xl font-normal">
              Directly evaluate real-world range, battery capacity, motor power, and payload side-by-side to make the smartest choice.
            </p>
          </div>

          {/* Toggle Highlight Differences */}
          <div className="flex items-center gap-3">
            <button
              id="toggle-highlight-diffs"
              onClick={toggleHighlights}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-[#EBDCD4] text-xs font-semibold text-[#2D1219] hover:bg-rose-50 transition-all shadow-sm cursor-pointer"
            >
              {highlightDifferences ? (
                <ToggleRight className="w-5 h-5 text-[#8B263E]" />
              ) : (
                <ToggleLeft className="w-5 h-5 text-[#73525A]" />
              )}
              <span>Highlight Differences</span>
            </button>
          </div>
        </div>

        {/* Desktop Comparison Table (Clean White Card on Cream) */}
        <div className="hidden md:block rounded-3xl border border-[#EBDCD4] bg-white overflow-hidden shadow-lg mb-12">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#EBDCD4] bg-[#FAF6F0]/60">
                <th className="p-6 w-1/4 align-top">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#8B263E]">
                    Key Specifications
                  </span>
                  <p className="text-xs text-[#73525A] mt-1">
                    Select a model to view full details or reserve a slot.
                  </p>
                </th>
                {models.map((model) => (
                  <th key={model.id} className="p-5 w-1/4 align-top border-l border-[#EBDCD4]">
                    <div className="space-y-3 text-center">
                      <div className="aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-b from-[#FBF8F5] to-[#F5ECE8] border border-[#EBDCD4] p-3 flex items-center justify-center">
                        <img
                          src={model.heroImage}
                          alt={model.name}
                          className="max-h-full w-auto object-contain drop-shadow-sm"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-bold text-[#8B263E]">
                          {model.category === 'cargo-toto' ? 'E-Toto' : 'Scooter'}
                        </span>
                        <h3 className="text-lg font-bold text-[#2D1219] font-serif">
                          {model.name}
                        </h3>
                        <span className="text-xl font-extrabold text-[#8B263E] block mt-0.5">
                          {model.priceDisplay}
                        </span>
                      </div>
                      <div className="flex flex-col gap-2 pt-1">
                        <button
                          onClick={() => onBookTestRide(model.slug)}
                          className="w-full py-2 px-3 rounded-full bg-[#8B263E] hover:bg-[#731E32] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
                        >
                          <CalendarCheck className="w-3.5 h-3.5" />
                          <span>Book Test Ride</span>
                        </button>
                        <button
                          onClick={() => onViewDetails(model.slug)}
                          className="w-full py-1.5 px-3 rounded-full bg-[#FAF6F0] hover:bg-[#F3E7E2] text-[#2D1219] font-semibold text-xs border border-[#EBDCD4] flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <span>Full Details</span>
                          <ArrowRight className="w-3 h-3 text-[#8B263E]" />
                        </button>
                      </div>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EBDCD4]/80 text-sm">
              {specRows.map((row) => {
                const shouldHighlight = highlightDifferences && row.isDifferent;
                return (
                  <tr 
                    key={row.key} 
                    className={`transition-colors ${
                      shouldHighlight ? 'bg-rose-50/70' : 'hover:bg-[#FAF6F0]/50'
                    }`}
                  >
                    <td className="p-4 sm:p-5 align-middle">
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold text-[#2D1219]">{row.label}</span>
                        {shouldHighlight && (
                          <span className="w-2 h-2 rounded-full bg-[#8B263E]" title="Differs between models" />
                        )}
                      </div>
                      <span className="text-[11px] text-[#73525A] block mt-0.5">{row.description}</span>
                    </td>
                    {models.map((model) => (
                      <td 
                        key={model.id} 
                        className={`p-4 sm:p-5 align-middle border-l border-[#EBDCD4]/80 text-center ${
                          shouldHighlight ? 'text-[#8B263E] font-semibold' : 'text-[#5A3E45]'
                        }`}
                      >
                        {row.values(model)}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile View: Stacked Cards with Clean Row-by-Row Layout */}
        <div className="block md:hidden space-y-6">
          {models.map((model) => (
            <div 
              key={model.id}
              className="rounded-3xl border border-[#EBDCD4] bg-white p-5 shadow-md space-y-4"
            >
              {/* Header with image */}
              <div className="flex gap-4 items-center">
                <div className="w-24 h-20 rounded-2xl overflow-hidden bg-[#FAF6F0] flex-shrink-0 border border-[#EBDCD4] p-2 flex items-center justify-center">
                  <img
                    src={model.heroImage}
                    alt={model.name}
                    className="max-h-full w-auto object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-[#8B263E] uppercase tracking-wider">
                    {model.category === 'cargo-toto' ? 'Commercial E-Toto' : 'Electric Scooter'}
                  </span>
                  <h3 className="text-lg font-bold text-[#2D1219] font-serif">
                    {model.name}
                  </h3>
                  <span className="text-xl font-extrabold text-[#8B263E] font-heading block">
                    {model.priceDisplay}
                  </span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[#EBDCD4]">
                <button
                  onClick={() => onBookTestRide(model.slug)}
                  className="py-2.5 px-3 rounded-full bg-[#8B263E] text-white font-bold text-xs flex items-center justify-center gap-1 shadow-sm"
                >
                  <CalendarCheck className="w-3.5 h-3.5" />
                  <span>Book Ride</span>
                </button>
                <button
                  onClick={() => onViewDetails(model.slug)}
                  className="py-2.5 px-3 rounded-full bg-[#FAF6F0] border border-[#EBDCD4] text-[#2D1219] font-semibold text-xs flex items-center justify-center gap-1"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#8B263E]" />
                </button>
              </div>

              {/* Spec list for this model */}
              <div className="divide-y divide-[#EBDCD4]/80 pt-2 text-xs">
                {specRows.map((row) => (
                  <div key={row.key} className="py-2.5 flex items-center justify-between gap-3">
                    <span className="text-[#73525A] font-medium">{row.label}</span>
                    <span className="text-right text-[#2D1219] font-semibold max-w-[55%]">
                      {row.values(model)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
