import React, { useState } from 'react';
import { EVModel } from '../types';
import { Calculator, IndianRupee, Percent, Clock, CalendarCheck, ShieldCheck } from 'lucide-react';
import { trackEvent } from '../utils/analytics';

interface EmiCalculatorProps {
  models: EVModel[];
  initialPrice?: number;
  onBookTestRideWithEmi: (modelSlug: string, emi: number) => void;
}

export const EmiCalculator: React.FC<EmiCalculatorProps> = ({
  models,
  initialPrice,
  onBookTestRideWithEmi,
}) => {
  const [selectedModelSlug, setSelectedModelSlug] = useState<string>(
    models[0]?.slug || 'golden-e1'
  );
  const [vehiclePrice, setVehiclePrice] = useState<number>(
    initialPrice || models[0]?.startingPrice || 74999
  );
  const [downPayment, setDownPayment] = useState<number>(
    Math.round((initialPrice || models[0]?.startingPrice || 74999) * 0.2) // default 20%
  );
  const [tenureMonths, setTenureMonths] = useState<number>(36);
  const [interestRate, setInterestRate] = useState<number>(9.5); // 9.5% p.a. standard EV loan rate

  const handleModelChange = (slug: string) => {
    setSelectedModelSlug(slug);
    const m = models.find((mod) => mod.slug === slug);
    if (m) {
      setVehiclePrice(m.startingPrice);
      setDownPayment(Math.round(m.startingPrice * 0.2));
    }
  };

  const handleVehiclePriceChange = (val: number) => {
    const safeVal = Math.max(0, val || 0);
    setVehiclePrice(safeVal);
    if (downPayment > safeVal) {
      setDownPayment(safeVal);
    }
  };

  const handleDownPaymentChange = (val: number) => {
    const safeVal = Math.max(0, Math.min(val || 0, vehiclePrice));
    setDownPayment(safeVal);
  };

  const loanPrincipal = Math.max(0, vehiclePrice - downPayment);
  let monthlyEmi = 0;
  let totalInterest = 0;
  let totalPayable = 0;

  if (loanPrincipal > 0 && tenureMonths > 0 && interestRate > 0) {
    const monthlyRate = interestRate / 12 / 100;
    const numerator = loanPrincipal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths);
    const denominator = Math.pow(1 + monthlyRate, tenureMonths) - 1;
    monthlyEmi = Math.round(numerator / denominator);
    totalPayable = monthlyEmi * tenureMonths;
    totalInterest = Math.max(0, totalPayable - loanPrincipal);
  } else if (loanPrincipal > 0 && interestRate === 0) {
    monthlyEmi = Math.round(loanPrincipal / tenureMonths);
    totalPayable = loanPrincipal;
    totalInterest = 0;
  }

  const tenureOptions = [12, 24, 36, 48, 60];

  return (
    <div id="emi-calculator-view" className="py-12 md:py-20 bg-[#FAF6F0] min-h-screen">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B263E] mb-2">
            <Calculator className="w-4 h-4" />
            <span>Financing Made Simple</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#2D1219] font-serif">
            Smart EV Loan EMI Estimator
          </h1>
          <p className="text-sm sm:text-base text-[#73525A] mt-2 font-normal">
            Customize your down payment, preferred loan tenure, and interest rate to calculate your tailored monthly budget.
          </p>
        </div>

        {/* 2-Column Calculator Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form */}
          <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-white border border-[#EBDCD4] shadow-sm space-y-6">
            {/* Model Select */}
            <div>
              <label 
                htmlFor="emi-model-select"
                className="block text-xs font-semibold uppercase tracking-wider text-[#4A2D35] mb-1.5"
              >
                Select EV Model
              </label>
              <select
                id="emi-model-select"
                value={selectedModelSlug}
                onChange={(e) => handleModelChange(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#EBDCD4] text-[#2D1219] text-sm focus:outline-none focus:border-[#8B263E]"
              >
                {models.map((m) => (
                  <option key={m.slug} value={m.slug}>
                    {m.name} ({m.priceDisplay})
                  </option>
                ))}
              </select>
            </div>

            {/* Vehicle Price Input */}
            <div>
              <label 
                htmlFor="emi-price-input"
                className="block text-xs font-semibold uppercase tracking-wider text-[#4A2D35] mb-1.5"
              >
                Ex-Showroom Price (₹)
              </label>
              <div className="relative">
                <IndianRupee className="w-4 h-4 text-[#8C6D75] absolute left-3.5 top-3.5" />
                <input
                  id="emi-price-input"
                  type="number"
                  min={20000}
                  step={1000}
                  value={vehiclePrice}
                  onChange={(e) => handleVehiclePriceChange(Number(e.target.value))}
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#EBDCD4] text-[#2D1219] text-sm font-semibold focus:outline-none focus:border-[#8B263E]"
                />
              </div>
            </div>

            {/* Down Payment Slider & Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label 
                  htmlFor="emi-downpayment-slider"
                  className="text-xs font-semibold uppercase tracking-wider text-[#4A2D35]"
                >
                  Down Payment (₹)
                </label>
                <span className="text-sm font-bold text-[#8B263E] font-mono">
                  ₹{downPayment.toLocaleString('en-IN')} ({vehiclePrice > 0 ? Math.round((downPayment / vehiclePrice) * 100) : 0}%)
                </span>
              </div>
              <input
                id="emi-downpayment-slider"
                type="range"
                min={0}
                max={vehiclePrice}
                step={1000}
                value={downPayment}
                onChange={(e) => handleDownPaymentChange(Number(e.target.value))}
                className="w-full h-2 bg-[#FAF6F0] rounded-lg appearance-none cursor-pointer accent-[#8B263E]"
              />
              <div className="flex justify-between text-[11px] text-[#73525A]">
                <span>Min: ₹0 (Zero Down Payment*)</span>
                <span>Max: ₹{vehiclePrice.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Loan Tenure Pills */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#4A2D35] mb-2">
                Loan Tenure
              </label>
              <div className="grid grid-cols-5 gap-2">
                {tenureOptions.map((months) => (
                  <button
                    key={months}
                    type="button"
                    onClick={() => setTenureMonths(months)}
                    className={`py-2 px-1 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      tenureMonths === months
                        ? 'bg-[#8B263E] text-white shadow-sm'
                        : 'bg-[#FAF6F0] text-[#5A3E45] hover:text-[#8B263E] border border-[#EBDCD4]'
                    }`}
                  >
                    {months} Mo
                  </button>
                ))}
              </div>
            </div>

            {/* Interest Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label 
                  htmlFor="emi-interest-slider"
                  className="text-xs font-semibold uppercase tracking-wider text-[#4A2D35]"
                >
                  Annual Interest Rate (% p.a.)
                </label>
                <span className="text-sm font-bold text-[#8B263E] font-mono">
                  {interestRate.toFixed(1)}% p.a.
                </span>
              </div>
              <input
                id="emi-interest-slider"
                type="range"
                min={7.5}
                max={15.0}
                step={0.1}
                value={interestRate}
                onChange={(e) => setInterestRate(Number(e.target.value))}
                className="w-full h-2 bg-[#FAF6F0] rounded-lg appearance-none cursor-pointer accent-[#8B263E]"
              />
              <div className="flex justify-between text-[11px] text-[#73525A]">
                <span>7.5% (Special EV Rate)</span>
                <span>15.0%</span>
              </div>
            </div>
          </div>

          {/* Results Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#7A1E34] to-[#501320] text-white shadow-xl space-y-6 border border-white/10">
              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-rose-200">
                  Estimated Monthly Installment
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-4xl sm:text-5xl font-normal text-white font-serif">
                    ₹{monthlyEmi.toLocaleString('en-IN')}
                  </span>
                  <span className="text-sm text-rose-200 font-medium">/ month</span>
                </div>
              </div>

              {/* Breakdown List */}
              <div className="p-4 rounded-2xl bg-black/20 border border-white/10 text-xs space-y-3">
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-rose-100">Principal Loan Amount:</span>
                  <span className="text-white font-semibold font-mono">
                    ₹{loanPrincipal.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-rose-100">Total Interest Payable:</span>
                  <span className="text-amber-200 font-semibold font-mono">
                    ₹{totalInterest.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between pb-2 border-b border-white/10">
                  <span className="text-rose-100">Down Payment Paid:</span>
                  <span className="text-white font-semibold font-mono">
                    ₹{downPayment.toLocaleString('en-IN')}
                  </span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-white font-bold">Total Amount Payable:</span>
                  <span className="text-white font-bold font-mono text-sm">
                    ₹{(totalPayable + downPayment).toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              {/* Visual Proportion Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-[11px] text-rose-200">
                  <span>Principal ({loanPrincipal > 0 ? Math.round((loanPrincipal / totalPayable) * 100) : 0}%)</span>
                  <span>Interest ({totalPayable > 0 ? Math.round((totalInterest / totalPayable) * 100) : 0}%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-black/30 overflow-hidden flex">
                  <div 
                    className="bg-white h-full transition-all duration-300"
                    style={{ width: `${totalPayable > 0 ? (loanPrincipal / totalPayable) * 100 : 100}%` }}
                  />
                  <div 
                    className="bg-amber-300 h-full transition-all duration-300"
                    style={{ width: `${totalPayable > 0 ? (totalInterest / totalPayable) * 100 : 0}%` }}
                  />
                </div>
              </div>

              {/* Action Button */}
              <button
                id="btn-apply-emi-test-ride"
                onClick={() => onBookTestRideWithEmi(selectedModelSlug, monthlyEmi)}
                className="w-full py-3.5 px-4 rounded-full bg-white hover:bg-rose-50 text-[#8B263E] font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-[0.98] cursor-pointer"
              >
                <CalendarCheck className="w-4 h-4" />
                <span>Book Test Ride with this EMI</span>
              </button>

              <div className="flex items-center gap-2 text-[11px] text-rose-200">
                <ShieldCheck className="w-4 h-4 flex-shrink-0" />
                <span>Instant loan approvals available through partner nationalized banks.</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
