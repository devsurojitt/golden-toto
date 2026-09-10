import React from 'react';
import { ScreenRoute } from '../types';
import { GoldenTotoLogo } from './GoldenTotoLogo';
import { Instagram, Facebook, Youtube, Linkedin } from 'lucide-react';

interface FooterProps { onNavigate: (route: ScreenRoute, modelSlug?: string) => void; onOpenAnalytics?: () => void; }

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' }); else onNavigate('home');
  };

  return (
    <footer id="golden-toto-footer" className="reference-footer">
      <div className="footer-inner">
        <button onClick={() => onNavigate('home')} className="footer-brand" aria-label="Golden Toto Home">
          <GoldenTotoLogo className="footer-logo" variant="maroon" />
        </button>

        <nav className="footer-column" aria-label="Quick Links">
          <h4>Quick Links</h4>
          <button onClick={() => onNavigate('home')}>Home</button>
          <button onClick={() => scrollTo('models-showcase')}>Models</button>
          <button onClick={() => onNavigate('compare')}>Compare</button>
          <button onClick={() => onNavigate('test-ride')}>Test Ride</button>
          <button onClick={() => onNavigate('dealers')}>Dealers</button>
        </nav>

        <nav className="footer-column" aria-label="Company">
          <h4>Company</h4>
          <button onClick={() => onNavigate('about')}>About Us</button>
          <button onClick={() => onNavigate('service')}>Service &amp; Warranty</button>
          <button onClick={() => onNavigate('service')}>FAQ</button>
          <button onClick={() => onNavigate('enquiry')}>Contact</button>
        </nav>

        <div className="footer-column footer-social">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook"><Facebook /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer" aria-label="YouTube"><Youtube /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
          </div>
          <p>A Cleaner Tomorrow,<br />Starts with You.</p>
        </div>

        <div className="footer-rights">
          <div className="footer-ornament">✦</div>
          <strong>Golden Toto</strong>
          <span>All rights reserved.</span>
        </div>
      </div>
    </footer>
  );
};
