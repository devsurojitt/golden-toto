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
          <GoldenTotoLogo className="h-20 sm:h-24" variant="maroon" />
        </button>
        <div className="footer-column">
          <h4>Quick Links</h4>
          <button onClick={() => onNavigate('home')}>Home</button>
          <button onClick={() => scrollTo('models-showcase')}>Models</button>
          <button onClick={() => onNavigate('compare')}>Compare</button>
          <button onClick={() => onNavigate('test-ride')}>Test Ride</button>
          <button onClick={() => onNavigate('dealers')}>Dealers</button>
        </div>
        <div className="footer-column">
          <h4>Company</h4>
          <button onClick={() => onNavigate('about')}>About Us</button>
          <button onClick={() => onNavigate('service')}>Service &amp; Warranty</button>
          <button onClick={() => onNavigate('service')}>FAQ</button>
          <button onClick={() => onNavigate('enquiry')}>Contact</button>
        </div>
        <div className="footer-column footer-social">
          <h4>Follow Us</h4>
          <div className="social-links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram /></a>
            <a href="https://facebook.com" target="_blank" rel="noreferrer"><Facebook /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer"><Youtube /></a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer"><Linkedin /></a>
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
