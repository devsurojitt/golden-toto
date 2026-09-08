import React from 'react';

interface GoldenTotoLogoProps {
  className?: string;
  variant?: 'maroon' | 'white' | 'gold';
  compact?: boolean;
}

export const GoldenTotoLogo: React.FC<GoldenTotoLogoProps> = ({ className = 'h-12', variant = 'maroon' }) => {
  if (variant === 'white') {
    return <div className={`inline-flex items-center justify-center overflow-hidden ${className}`}><img src="./assets/goldentotologo.jpg" alt="Golden Toto" className="h-full w-full object-contain mix-blend-screen brightness-0 invert" /></div>;
  }
  return <div className={`inline-flex items-center justify-center overflow-hidden ${className}`}><img src="./assets/goldentotologo.jpg" alt="Golden Toto" className="h-full w-full object-contain" /></div>;
};
