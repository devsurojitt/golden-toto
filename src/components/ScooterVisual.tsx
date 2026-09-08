import React from 'react';

interface ScooterVisualProps {
  colorway?: 'dusty-rose' | 'pearl-white' | 'matte-black';
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'hero';
}

export const ScooterVisual: React.FC<ScooterVisualProps> = ({
  colorway = 'dusty-rose',
  className = 'w-full h-full',
}) => {
  // Colorway configurations matching the reference image:
  // - dusty-rose: #C68A98 metallic finish with #8B263E / #D89EA8 highlights (Golden E1 & Hero)
  // - pearl-white: #F6F4F0 with #FFFFFF specular and subtle grey shadow (Golden E2)
  // - matte-black: #26262B with #3F3F46 subtle metallic sheen (Golden E3)

  const colors = {
    'dusty-rose': {
      bodyMain: 'url(#roseBodyGrad)',
      bodyDark: '#9E5B6A',
      bodyLight: '#D89FA9',
      bodyHighlight: '#F3D2D9',
      seat: '#1C1C1E',
      seatStitch: '#C68A98',
      accents: '#8B263E',
      trim: '#323236',
    },
    'pearl-white': {
      bodyMain: 'url(#whiteBodyGrad)',
      bodyDark: '#C8C4BE',
      bodyLight: '#FFFFFF',
      bodyHighlight: '#FFFFFF',
      seat: '#1E1E20',
      seatStitch: '#D4AF37',
      accents: '#2D151D',
      trim: '#2B2B30',
    },
    'matte-black': {
      bodyMain: 'url(#blackBodyGrad)',
      bodyDark: '#121214',
      bodyLight: '#383840',
      bodyHighlight: '#52525B',
      seat: '#18181A',
      seatStitch: '#8B263E',
      accents: '#8B263E',
      trim: '#18181B',
    },
  }[colorway];

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <svg
        viewBox="0 0 540 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full max-h-full object-contain filter drop-shadow-[0_12px_18px_rgba(45,15,22,0.18)]"
      >
        <defs>
          {/* Gradients for Dusty Rose / Mauve Metallic */}
          <linearGradient id="roseBodyGrad" x1="120" y1="120" x2="380" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#E4ABB5" />
            <stop offset="25%" stopColor="#C88493" />
            <stop offset="65%" stopColor="#B36878" />
            <stop offset="100%" stopColor="#893D4E" />
          </linearGradient>

          <linearGradient id="roseApronGrad" x1="280" y1="140" x2="360" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F0BBC5" />
            <stop offset="40%" stopColor="#C67F8E" />
            <stop offset="100%" stopColor="#944758" />
          </linearGradient>

          {/* Gradients for Pearl White */}
          <linearGradient id="whiteBodyGrad" x1="120" y1="120" x2="380" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="35%" stopColor="#FAF8F5" />
            <stop offset="70%" stopColor="#E5E0D8" />
            <stop offset="100%" stopColor="#BFB8AD" />
          </linearGradient>

          <linearGradient id="whiteApronGrad" x1="280" y1="140" x2="360" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#F4F0E8" />
            <stop offset="100%" stopColor="#D5CEC3" />
          </linearGradient>

          {/* Gradients for Matte Obsidian Black */}
          <linearGradient id="blackBodyGrad" x1="120" y1="120" x2="380" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#404046" />
            <stop offset="30%" stopColor="#2A2A30" />
            <stop offset="70%" stopColor="#1C1C20" />
            <stop offset="100%" stopColor="#0F0F12" />
          </linearGradient>

          <linearGradient id="blackApronGrad" x1="280" y1="140" x2="360" y2="280" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#4A4A52" />
            <stop offset="50%" stopColor="#25252A" />
            <stop offset="100%" stopColor="#141416" />
          </linearGradient>

          {/* Wheel & Metallic Finishes */}
          <radialGradient id="tireGrad" cx="50%" cy="50%" r="50%">
            <stop offset="70%" stopColor="#1A1A1E" />
            <stop offset="92%" stopColor="#2A2A30" />
            <stop offset="100%" stopColor="#121214" />
          </radialGradient>

          <linearGradient id="rimGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#E4E4E7" />
            <stop offset="40%" stopColor="#71717A" />
            <stop offset="70%" stopColor="#A1A1AA" />
            <stop offset="100%" stopColor="#3F3F46" />
          </linearGradient>

          <linearGradient id="headlightGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="50%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>

          {/* Cast Floor Shadow */}
          <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#2D1219" stopOpacity="0.45" />
            <stop offset="50%" stopColor="#2D1219" stopOpacity="0.25" />
            <stop offset="85%" stopColor="#2D1219" stopOpacity="0.05" />
            <stop offset="100%" stopColor="#2D1219" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* 1. Floor Ground Shadow under wheels */}
        <ellipse cx="265" cy="355" rx="195" ry="24" fill="url(#groundShadow)" />
        <ellipse cx="370" cy="350" rx="65" ry="14" fill="#2D1219" fillOpacity="0.3" />
        <ellipse cx="165" cy="350" rx="70" ry="14" fill="#2D1219" fillOpacity="0.35" />

        {/* 2. Rear Wheel Assembly */}
        <g id="rear-wheel">
          {/* Tire */}
          <circle cx="165" cy="305" r="54" fill="url(#tireGrad)" stroke="#111113" strokeWidth="4" />
          <circle cx="165" cy="305" r="42" fill="#212126" />
          {/* Rim with 5 curved spokes */}
          <circle cx="165" cy="305" r="34" stroke="url(#rimGrad)" strokeWidth="6" fill="#18181B" />
          <circle cx="165" cy="305" r="26" fill="#121214" stroke="#71717A" strokeWidth="2" strokeDasharray="6 3" />
          {/* Hub */}
          <circle cx="165" cy="305" r="14" fill="url(#rimGrad)" />
          <circle cx="165" cy="305" r="5" fill="#18181B" />
          {/* Rear Hugger / Mudguard */}
          <path
            d="M 120 300 C 120 258, 150 244, 185 244 L 195 258 C 168 258, 138 274, 132 305 Z"
            fill="#27272A"
          />
        </g>

        {/* 3. Underbody / Floorboard Chassis Tray */}
        <path
          d="M 175 285 L 290 285 Q 315 285 330 250 L 342 225 L 320 220 L 285 270 L 190 270 Z"
          fill="#1E1E22"
        />
        {/* Footboard textured mat */}
        <path
          d="M 205 274 L 295 274 Q 310 274 318 258 L 295 258 Q 285 270 205 270 Z"
          fill="#2C2C32"
          stroke="#3F3F46"
          strokeWidth="1.2"
        />

        {/* 4. Rear Bodywork Sculpted Fairing */}
        <g id="rear-cowl">
          {/* Main rear quarter panel */}
          <path
            d="M 140 240 C 145 200, 180 185, 235 185 C 285 185, 305 210, 310 265 C 275 272, 210 274, 170 265 C 150 260, 140 250, 140 240 Z"
            fill={colors.bodyMain}
          />
          {/* Glossy top curvature reflection */}
          <path
            d="M 152 232 C 160 198, 190 190, 240 190 C 275 190, 290 200, 298 225 C 270 205, 205 205, 152 232 Z"
            fill={colors.bodyLight}
            fillOpacity="0.45"
          />
          {/* Subtle Golden Toto badge on rear flank */}
          <ellipse cx="230" cy="225" rx="14" ry="4" fill="#D4AF37" fillOpacity="0.8" />
          <path d="M 222 225 L 238 225" stroke="#FFFFFF" strokeWidth="1" />
        </g>

        {/* 5. Cushioned Dual Seat */}
        <g id="saddle">
          {/* Deep contoured saddle with slight pillion rise */}
          <path
            d="M 135 198 C 135 186, 150 178, 175 178 C 215 178, 245 188, 275 188 C 295 188, 305 182, 312 188 C 316 193, 314 200, 305 202 C 275 204, 210 202, 142 205 C 136 205, 135 202, 135 198 Z"
            fill={colors.seat}
          />
          {/* Premium stitching / piping accent line */}
          <path
            d="M 145 194 C 180 190, 240 194, 302 195"
            stroke={colors.seatStitch}
            strokeWidth="1.6"
            strokeDasharray="4 2"
            strokeOpacity="0.8"
          />
          {/* Rear passenger pillion grab rail in brushed chrome */}
          <path
            d="M 130 206 C 124 206, 120 202, 126 195 C 132 188, 142 192, 148 195"
            stroke="#A1A1AA"
            strokeWidth="4"
            strokeLinecap="round"
          />
        </g>

        {/* 6. Front Apron & Steering Assembly */}
        <g id="front-chassis">
          {/* Lower front inner shield */}
          <path
            d="M 285 265 L 340 185 L 362 188 L 325 272 Z"
            fill="#1E1E22"
          />
          {/* Front aerodynamic apron body panel */}
          <path
            d="M 320 240 C 335 160, 350 145, 382 145 C 395 145, 405 170, 400 230 C 395 270, 370 290, 345 285 C 330 282, 320 265, 320 240 Z"
            fill={
              colorway === 'dusty-rose'
                ? 'url(#roseApronGrad)'
                : colorway === 'pearl-white'
                ? 'url(#whiteApronGrad)'
                : 'url(#blackApronGrad)'
            }
          />
          {/* Apron highlight shine */}
          <path
            d="M 345 160 C 365 152, 385 160, 390 190 C 375 168, 355 165, 345 160 Z"
            fill="#FFFFFF"
            fillOpacity="0.4"
          />
          {/* Sleek V-shaped LED DRL on front apron */}
          <path
            d="M 368 190 L 380 205 L 392 190"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="filter drop-shadow-[0_0_4px_rgba(255,255,255,0.8)]"
          />
          {/* Golden Toto Front Emblem */}
          <circle cx="380" cy="175" r="5" fill="#D4AF37" />
        </g>

        {/* 7. Front Telescopic Fork & Front Wheel */}
        <g id="front-wheel">
          {/* Front suspension fork */}
          <line x1="365" y1="230" x2="385" y2="300" stroke="#71717A" strokeWidth="9" strokeLinecap="round" />
          <line x1="368" y1="235" x2="382" y2="295" stroke="#D4D4D8" strokeWidth="4" strokeLinecap="round" />
          {/* Front Aerodynamic Mudguard / Fender */}
          <path
            d="M 348 275 C 352 245, 395 242, 420 270 L 415 282 C 390 262, 360 262, 352 284 Z"
            fill={colors.bodyMain}
          />
          {/* Front Tire */}
          <circle cx="390" cy="305" r="52" fill="url(#tireGrad)" stroke="#111113" strokeWidth="4" />
          <circle cx="390" cy="305" r="40" fill="#212126" />
          {/* Front Alloy Rim with Brake Disc Rotor */}
          <circle cx="390" cy="305" r="32" stroke="url(#rimGrad)" strokeWidth="6" fill="#18181B" />
          <circle cx="390" cy="305" r="24" stroke="#D4D4D8" strokeWidth="2.5" strokeDasharray="4 2" fill="none" />
          {/* Disc brake calliper in maroon or gold */}
          <rect x="366" y="292" width="12" height="18" rx="3" fill="#8B263E" />
          {/* Center Axle Nut */}
          <circle cx="390" cy="305" r="12" fill="url(#rimGrad)" />
          <circle cx="390" cy="305" r="4" fill="#18181B" />
        </g>

        {/* 8. Handlebar Cowling, Headlight & Rearview Mirrors */}
        <g id="handlebars">
          {/* Steering stem neck */}
          <line x1="358" y1="155" x2="368" y2="115" stroke="#27272A" strokeWidth="12" strokeLinecap="round" />

          {/* Handlebar cowl head */}
          <path
            d="M 330 115 C 335 100, 360 92, 395 95 C 415 98, 425 108, 415 120 C 395 128, 345 128, 330 115 Z"
            fill={colors.bodyMain}
          />

          {/* Integrated Jewel LED Projector Headlamp */}
          <path
            d="M 378 100 C 388 98, 404 102, 408 112 C 404 116, 388 116, 376 112 Z"
            fill="url(#headlightGrad)"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            className="filter drop-shadow-[0_0_8px_rgba(224,242,254,0.9)]"
          />
          {/* Chrome bezel around headlamp */}
          <path
            d="M 374 100 Q 394 96 410 112"
            stroke="#E4E4E7"
            strokeWidth="1.8"
            fill="none"
          />

          {/* Left Grip Handle */}
          <path d="M 326 116 L 312 118" stroke="#18181B" strokeWidth="7" strokeLinecap="round" />
          <line x1="316" y1="124" x2="328" y2="120" stroke="#71717A" strokeWidth="2.5" strokeLinecap="round" />

          {/* Right Grip Handle */}
          <path d="M 405 110 L 420 112" stroke="#18181B" strokeWidth="7" strokeLinecap="round" />

          {/* Left Rearview Mirror (Stem + Teardrop mirror) */}
          <path d="M 338 108 Q 330 85 315 72" stroke="#27272A" strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="310" cy="68" rx="14" ry="9" transform="rotate(-15 310 68)" fill={colors.bodyMain} stroke="#3F3F46" strokeWidth="2" />
          <ellipse cx="310" cy="68" rx="11" ry="6.5" transform="rotate(-15 310 68)" fill="#E0F2FE" fillOpacity="0.75" />

          {/* Right Rearview Mirror */}
          <path d="M 390 102 Q 396 82 408 66" stroke="#27272A" strokeWidth="3" fill="none" strokeLinecap="round" />
          <ellipse cx="414" cy="62" rx="14" ry="9" transform="rotate(25 414 62)" fill={colors.bodyMain} stroke="#3F3F46" strokeWidth="2" />
          <ellipse cx="414" cy="62" rx="11" ry="6.5" transform="rotate(25 414 62)" fill="#E0F2FE" fillOpacity="0.75" />
        </g>
      </svg>
    </div>
  );
};
