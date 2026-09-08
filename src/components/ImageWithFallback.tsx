import React, { useState } from 'react';
import { Zap } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackTitle?: string;
  fallbackSubtitle?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt,
  className = '',
  fallbackTitle = 'Golden Toto EV',
  fallbackSubtitle = 'Electric Scooter & Toto Lineup',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  if (hasError || !src) {
    return (
      <div 
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#FAF6F0] via-[#F5EBEF] to-[#EBD3D9] border border-[#E2CBD1] text-[#6A1E30] p-6 text-center select-none ${className}`}
        role="img"
        aria-label={alt || fallbackTitle}
      >
        <div className="w-12 h-12 rounded-full bg-[#8B263E]/10 border border-[#8B263E]/30 flex items-center justify-center mb-3">
          <Zap className="w-6 h-6 text-[#8B263E]" />
        </div>
        <span className="text-[#3A121A] font-semibold text-sm tracking-wide">{fallbackTitle}</span>
        <span className="text-[#845A64] text-xs mt-1">{fallbackSubtitle}</span>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#F5ECEE] ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-[#F5ECEE]/80 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-[#8B263E]/30 border-t-[#8B263E] rounded-full animate-spin" />
        </div>
      )}
      <img
        src={src}
        alt={alt || fallbackTitle}
        referrerPolicy="no-referrer"
        onLoad={() => setIsLoading(false)}
        onError={() => {
          setIsLoading(false);
          setHasError(true);
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />
    </div>
  );
};
