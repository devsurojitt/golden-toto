import React from 'react';

interface GoldenTotoLogoProps {
  className?: string;
  variant?: 'maroon' | 'white' | 'gold';
  compact?: boolean;
}

export const GoldenTotoLogo: React.FC<GoldenTotoLogoProps> = ({
  className = 'h-12',
  variant = 'maroon',
  compact = false,
}) => {
  const primaryColor = variant === 'white' ? '#FFFFFF' : variant === 'gold' ? '#D4AF37' : '#8B263E';
  const subtextColor = variant === 'white' ? '#F5E6E8' : variant === 'gold' ? '#F7F6F3' : '#6A1E30';

  return (
    <div className={`inline-flex flex-col items-center select-none text-center ${className}`}>
      <svg
        viewBox="0 0 240 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-w-[190px]"
      >
        {/* Outer Arch Floral Laurel / Oval Seal */}
        <path
          d="M 50 85 C 50 35, 190 35, 190 85 C 190 100, 185 105, 175 108"
          stroke={primaryColor}
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray="4 2"
        />
        <path
          d="M 65 108 C 55 105, 50 100, 50 85"
          stroke={primaryColor}
          strokeWidth="2.5"
          strokeLinecap="round"
        />

        {/* Top Decorative Sunburst / Lotus Crown */}
        <path
          d="M 120 18 C 117 24, 120 28, 120 30 C 120 28, 123 24, 120 18 Z"
          fill={primaryColor}
        />
        <circle cx="112" cy="24" r="2.2" fill={primaryColor} />
        <circle cx="128" cy="24" r="2.2" fill={primaryColor} />
        <circle cx="103" cy="30" r="1.8" fill={primaryColor} />
        <circle cx="137" cy="30" r="1.8" fill={primaryColor} />

        {/* Central Electric Toto / E-Rickshaw Silhouette Illustration */}
        <g transform="translate(76, 32)">
          {/* Toto Cabin Roof & Frame */}
          <path
            d="M 12 36 L 24 16 C 28 10, 56 10, 64 16 L 76 36 L 72 58 L 16 58 Z"
            fill={primaryColor}
            fillOpacity="0.12"
          />
          {/* Curved Curved Roof Canopy */}
          <path
            d="M 10 24 Q 44 10 78 24"
            stroke={primaryColor}
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          {/* Windshield Pillar */}
          <line x1="22" y1="23" x2="16" y2="44" stroke={primaryColor} strokeWidth="2.5" />
          <line x1="66" y1="23" x2="72" y2="44" stroke={primaryColor} strokeWidth="2.5" />
          {/* Cabin Divider */}
          <line x1="44" y1="18" x2="44" y2="46" stroke={primaryColor} strokeWidth="1.8" />
          {/* Passenger Bench / Bodywork */}
          <rect x="14" y="44" width="60" height="15" rx="3" fill={primaryColor} />
          {/* Headlamp */}
          <circle cx="44" cy="52" r="3.2" fill={variant === 'maroon' ? '#FAF6F0' : '#FFD700'} />
          {/* Left Wheel */}
          <circle cx="24" cy="62" r="8.5" stroke={primaryColor} strokeWidth="2.5" fill="none" />
          <circle cx="24" cy="62" r="3.5" fill={primaryColor} />
          {/* Right Wheel */}
          <circle cx="64" cy="62" r="8.5" stroke={primaryColor} strokeWidth="2.5" fill="none" />
          <circle cx="64" cy="62" r="3.5" fill={primaryColor} />
        </g>

        {/* Small Ribbon Flares */}
        <path d="M 40 106 L 200 106" stroke={primaryColor} strokeWidth="1.2" strokeOpacity="0.6" />
        <circle cx="120" cy="106" r="3" fill={primaryColor} />

        {/* Brand Name: Golden Toto */}
        <text
          x="120"
          y="132"
          textAnchor="middle"
          fill={primaryColor}
          fontFamily="'Playfair Display', Georgia, serif"
          fontSize="24"
          fontWeight="800"
          letterSpacing="0.5"
        >
          Golden Toto
        </text>

        {!compact && (
          <>
            {/* Tagline 1 */}
            <text
              x="120"
              y="148"
              textAnchor="middle"
              fill={subtextColor}
              fontFamily="'Plus Jakarta Sans', sans-serif"
              fontSize="6.8"
              fontWeight="700"
              letterSpacing="1.2"
            >
              CLEAN RIDE • A BRIGHTER TOMORROW
            </text>

            {/* Tagline 2 */}
            <text
              x="120"
              y="160"
              textAnchor="middle"
              fill={subtextColor}
              fontFamily="'Plus Jakarta Sans', sans-serif"
              fontSize="6.2"
              fontWeight="600"
              letterSpacing="1.5"
            >
              ELECTRIC TOTO FOR A GREENER INDIA
            </text>
          </>
        )}
      </svg>
    </div>
  );
};
