import React from 'react';

interface GoldenTotoLogoProps {
  className?: string;
  variant?: 'maroon' | 'white' | 'gold';
  compact?: boolean;
}

export const GoldenTotoLogo: React.FC<GoldenTotoLogoProps> = ({ className = 'h-12', variant = 'maroon' }) => (
  <div className={`inline-flex items-center justify-center overflow-hidden ${className}`}>
    <img
      src="./assets/goldentotologo.jpg"
      alt="Golden Toto"
      className={`h-full w-full object-contain ${variant === 'white' ? 'mix-blend-multiply opacity-80' : ''}`}
    />
  </div>
);
