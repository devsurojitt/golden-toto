import React from 'react';
import { Leaf, Users, Settings, ArrowRight, CalendarCheck, MessageCircle } from 'lucide-react';

interface AboutSectionProps {
  onExploreModels: () => void;
  onBookTestRide?: () => void;
  onViewDealers: () => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onBookTestRide, onViewDealers }) => {
  const handleWhatsAppChat = () => {
    const message = encodeURIComponent("Hello Golden Toto! I'm interested in booking a test ride and learning more about your EV models.");
    window.open(`https://wa.me/919830123456?text=${message}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="about-brand-section" className="bg-[#fcf8f5]">
      <div className="about-reference-grid">
        <div className="about-story-panel">
          <div className="about-photo-frame">
            <img src="./assets/shanta-about.jpg" alt="A cleaner, brighter tomorrow" />
          </div>
          <div className="about-copy">
            <span className="eyebrow">ABOUT GOLDEN TOTO</span>
            <h3>A Cleaner,<br />Brighter Tomorrow</h3>
            <p>At Golden Toto, we believe in mobility that respects people and the planet. Our electric scooters are designed for real Indian roads — reliable, stylish, and affordable.</p>
            <button onClick={onViewDealers} className="reference-pill">
              Our Story <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="about-belief-panel">
          <div className="belief-icons">
            <div><Leaf /><span>Sustainable<br />Mobility</span></div>
            <div><Users /><span>Happy<br />Customers</span></div>
            <div><Settings /><span>Trusted<br />Support</span></div>
          </div>
          <div className="belief-quote">
            <span className="quote-flower-mark" aria-hidden="true"><i /><i /><i /><b /></span>
            <blockquote>“Drive Change,<br />Not Pollution.”</blockquote>
            <i />
          </div>
        </div>
      </div>

      <div id="cta-test-ride-banner" className="reference-cta">
        <div>
          <h3>Book a Test Ride Today</h3>
          <p>Experience the smooth, silent and powerful ride<br className="hidden sm:block" /> for yourself.</p>
        </div>
        <div className="cta-actions">
          <button onClick={onBookTestRide} className="cta-light"><CalendarCheck className="w-4 h-4" /> Book a Test Ride</button>
          <button onClick={handleWhatsAppChat} className="cta-outline"><MessageCircle className="w-4 h-4" /> Chat on WhatsApp</button>
        </div>
      </div>
    </section>
  );
};
