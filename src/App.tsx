/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useTransition } from 'react';
import { ScreenRoute } from './types';
import { MODELS_DATA } from './data/models';
import { trackPageView, trackEvent } from './utils/analytics';

// Core Components matching the Reference Image Structure
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ModelShowcase } from './components/ModelShowcase';
import { AboutSection } from './components/AboutSection';
import { Footer } from './components/Footer';

// Interactive Functional Views
import { ModelDetail } from './components/ModelDetail';
import { CompareModels } from './components/CompareModels';
import { TestRideForm } from './components/TestRideForm';
import { EnquiryForm } from './components/EnquiryForm';
import { DealerLocator } from './components/DealerLocator';
import { ServiceWarrantyFaq } from './components/ServiceWarrantyFaq';
import { EmiCalculator } from './components/EmiCalculator';
import { AnalyticsDrawer } from './components/AnalyticsDrawer';

// Mobile sticky conversion icons
import { CalendarCheck, PhoneCall, Layers } from 'lucide-react';

export default function App() {
  const [currentRoute, setCurrentRoute] = useState<ScreenRoute>('home');
  const [selectedModelSlug, setSelectedModelSlug] = useState<string>('golden-e1');
  const [prefilledShowroom, setPrefilledShowroom] = useState<string | undefined>(undefined);
  const [isAnalyticsOpen, setIsAnalyticsOpen] = useState(false);
  const [, startTransition] = useTransition();

  // Find currently selected model object
  const currentModel = MODELS_DATA.find((m) => m.slug === selectedModelSlug) || MODELS_DATA[0];

  // Hash-based routing synchronization
  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash || hash === 'home') {
        setCurrentRoute('home');
      } else if (hash.startsWith('model/')) {
        const slug = hash.replace('model/', '');
        const found = MODELS_DATA.find((m) => m.slug === slug);
        if (found) {
          setSelectedModelSlug(slug);
          setCurrentRoute('model-detail');
        } else {
          setCurrentRoute('home');
        }
      } else if (['compare', 'test-ride', 'enquiry', 'dealers', 'about', 'service', 'emi-calculator'].includes(hash)) {
        setCurrentRoute(hash as ScreenRoute);
      }
    };

    parseHash();
    window.addEventListener('hashchange', parseHash);
    return () => window.removeEventListener('hashchange', parseHash);
  }, []);

  // Navigation handler
  const navigateTo = (route: ScreenRoute, modelSlug?: string) => {
    startTransition(() => {
      if (modelSlug) {
        setSelectedModelSlug(modelSlug);
      }
      setCurrentRoute(route);

      // Update URL hash
      if (route === 'home') {
        window.location.hash = '';
      } else if (route === 'model-detail') {
        window.location.hash = `model/${modelSlug || selectedModelSlug}`;
      } else {
        window.location.hash = route;
      }

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Track page view event in local analytics
      trackPageView(route, { modelSlug: modelSlug || selectedModelSlug });
    });
  };

  // Quick Action Handlers
  const handleBookTestRide = (modelSlug?: string) => {
    if (modelSlug) {
      setSelectedModelSlug(modelSlug);
    }
    navigateTo('test-ride', modelSlug || selectedModelSlug);
  };

  const handleBookTestRideAtShowroom = (showroomName: string) => {
    setPrefilledShowroom(showroomName);
    navigateTo('test-ride');
  };

  const handleBookWithEmi = (modelSlug: string, emiAmount: number) => {
    setSelectedModelSlug(modelSlug);
    trackEvent('emi_cta_click', { modelSlug, emiAmount });
    navigateTo('test-ride', modelSlug);
  };

  return (
    <div className="min-h-screen bg-[#FAF6F0] text-[#2D1219] selection:bg-[#8B263E] selection:text-white flex flex-col font-sans">
      
      {/* 1. HEADER matching Reference Image */}
      <Navbar
        currentRoute={currentRoute}
        onNavigate={navigateTo}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentRoute === 'home' && (
          <div>
            {/* 2. HERO SECTION matching Reference Image */}
            <Hero
              onExploreModels={() => {
                const el = document.getElementById('models-showcase');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onBookTestRide={() => handleBookTestRide('golden-e1')}
            />

            {/* 3. OUR EV MODELS & 4. FEATURE STRIP matching Reference Image */}
            <ModelShowcase
              models={MODELS_DATA}
              onSelectModel={(slug) => navigateTo('model-detail', slug)}
              onBookTestRide={handleBookTestRide}
              onCompare={() => navigateTo('compare')}
            />

            {/* 5. ABOUT SECTION & 6. TEST RIDE CTA matching Reference Image */}
            <AboutSection
              onExploreModels={() => {
                const el = document.getElementById('models-showcase');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              onBookTestRide={() => handleBookTestRide('golden-e1')}
              onViewDealers={() => navigateTo('dealers')}
            />
          </div>
        )}

        {/* Dedicated Interactive Views accessible via navigation */}
        {currentRoute === 'model-detail' && (
          <ModelDetail
            model={currentModel}
            allModels={MODELS_DATA}
            onBack={() => navigateTo('home')}
            onSwitchModel={(slug) => navigateTo('model-detail', slug)}
            onBookTestRide={(slug) => handleBookTestRide(slug)}
            onEnquire={(slug) => navigateTo('enquiry', slug)}
            onCompare={() => navigateTo('compare')}
            onOpenCalculator={(price) => navigateTo('emi-calculator', currentModel.slug)}
          />
        )}

        {currentRoute === 'compare' && (
          <CompareModels
            models={MODELS_DATA}
            onViewDetails={(slug) => navigateTo('model-detail', slug)}
            onBookTestRide={handleBookTestRide}
          />
        )}

        {currentRoute === 'test-ride' && (
          <TestRideForm
            models={MODELS_DATA}
            prefilledModelSlug={selectedModelSlug}
            prefilledShowroom={prefilledShowroom}
            onSuccessClose={() => navigateTo('home')}
            onNavigateToDealers={() => navigateTo('dealers')}
          />
        )}

        {currentRoute === 'enquiry' && (
          <EnquiryForm
            models={MODELS_DATA}
            prefilledModelSlug={selectedModelSlug}
            onNavigateToDealers={() => navigateTo('dealers')}
          />
        )}

        {currentRoute === 'dealers' && (
          <DealerLocator
            onContactSupport={() => navigateTo('enquiry')}
            onBookTestRideAtShowroom={handleBookTestRideAtShowroom}
          />
        )}

        {currentRoute === 'about' && (
          <div className="pt-8">
            <AboutSection
              onExploreModels={() => navigateTo('home')}
              onBookTestRide={() => handleBookTestRide('golden-e1')}
              onViewDealers={() => navigateTo('dealers')}
            />
          </div>
        )}

        {currentRoute === 'service' && (
          <div className="pt-8">
            <ServiceWarrantyFaq
              onBookTestRide={() => navigateTo('test-ride')}
              onContactSupport={() => navigateTo('enquiry')}
            />
          </div>
        )}

        {currentRoute === 'emi-calculator' && (
          <div className="pt-8">
            <EmiCalculator
              models={MODELS_DATA}
              initialPrice={currentModel.startingPrice}
              onBookTestRideWithEmi={handleBookWithEmi}
            />
          </div>
        )}
      </main>

      {/* 7. FOOTER matching Reference Image */}
      <Footer
        onNavigate={navigateTo}
        onOpenAnalytics={() => setIsAnalyticsOpen(true)}
      />

      {/* Mobile Sticky Conversion Bar for seamless test ride booking */}
      <div 
        id="mobile-bottom-conversion-bar"
        className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#EBDCD4] px-4 py-2.5 flex items-center justify-between gap-2 shadow-lg"
      >
        <button
          onClick={() => navigateTo('compare')}
          className="flex-1 py-2 px-2 rounded-full bg-[#FAF6F0] border border-[#EBDCD4] text-[#2D1219] font-semibold text-xs flex items-center justify-center gap-1 active:scale-95 cursor-pointer"
        >
          <Layers className="w-3.5 h-3.5 text-[#8B263E]" />
          <span>Compare</span>
        </button>

        <button
          onClick={() => navigateTo('test-ride', selectedModelSlug)}
          className="flex-[1.4] py-2.5 px-3 rounded-full bg-[#8B263E] hover:bg-[#731E32] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#8B263E]/20 active:scale-95 cursor-pointer"
        >
          <CalendarCheck className="w-4 h-4" />
          <span>Book Test Ride</span>
        </button>

        <button
          onClick={() => {
            trackEvent('whatsapp_click', { source: 'mobile_sticky_bar' });
            window.open('https://wa.me/919830123456?text=Hello%20Golden%20Toto!%20I%20would%20like%20more%20information%20on%20your%20EV%20lineup.', '_blank', 'noopener,noreferrer');
          }}
          className="p-2.5 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 text-[#1E7E34] active:scale-95 cursor-pointer"
          title="Chat on WhatsApp"
        >
          <PhoneCall className="w-4 h-4" />
        </button>
      </div>

      {/* Dealership Conversion & Leads Analytics Drawer */}
      <AnalyticsDrawer
        isOpen={isAnalyticsOpen}
        onClose={() => setIsAnalyticsOpen(false)}
      />
    </div>
  );
}
