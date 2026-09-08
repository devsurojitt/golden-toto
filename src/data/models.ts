import { EVModel } from '../types';

export const GOLDEN_TOTO_MODELS: EVModel[] = [
  {
    id: 'golden-e1',
    slug: 'golden-e1',
    name: 'Golden E1',
    category: 'scooter',
    tagline: 'Smart. Stylish. Everyday.',
    description: 'Designed for effortless everyday city navigation. Featuring an ultra-reliable IP67 LFP battery, smooth throttle response, and an operating cost of just ₹0.15 per kilometer.',
    startingPrice: 84999,
    priceDisplay: '₹ 84,999',
    badge: 'Best Value',
    heroImage: '/assets/golden-e1.jpg',
    specs: {
      price: 84999,
      priceDisplay: '₹ 84,999',
      rangeIdc: '100 km',
      rangeTrue: '88 km',
      batteryCapacity: '48V 30Ah',
      batteryType: 'Safe-Cell Advanced LFP (Lithium Iron Phosphate)',
      topSpeed: '55 km/h',
      motorType: 'BLDC High-Efficiency Hub Motor',
      peakPower: '1.6 kW Peak',
      chargingTime: '3.5 hrs (0–80%) / 4.5 hrs full',
      fastCharging: 'Standard 15A Household Socket Safe',
      warranty: '3 Years / 40,000 km Comprehensive Warranty',
      payload: '150 kg (Rider + Pillion)',
      dimensions: '1810 × 690 × 1120 mm',
      kerbWeight: '76 kg',
      brakes: 'Front Disc 220mm, Rear Drum with Combined Braking',
      groundClearance: '165 mm',
      suspension: 'Telescopic Hydraulic Front & Twin Spring Shocks',
      ridingModes: ['Eco Mode (35 km/h)', 'City Mode (55 km/h)']
    },
    colors: [
      {
        name: 'Dusty Rose & Blush',
        hex: '#C88A96',
        secondaryHex: '#FAF6F0',
        image: '/assets/golden-e1.jpg'
      },
      {
        name: 'Pearl White & Chrome',
        hex: '#FDFBF7',
        secondaryHex: '#E2D9CE',
        image: '/assets/golden-e2.jpg'
      },
      {
        name: 'Midnight Noir',
        hex: '#2B1B20',
        secondaryHex: '#8B263E',
        image: '/assets/golden-e3.jpg'
      }
    ],
    highlights: [
      {
        icon: 'sparkles',
        title: 'Lightweight Agility',
        description: 'Ultra-low kerb weight of 76kg ensures easy maneuvering through tight city traffic.'
      },
      {
        icon: 'battery-charging',
        title: 'Safe-Cell 48V 30Ah LFP',
        description: 'Fire-resistant thermal chemistry designed for high Indian summer ambient heat.'
      },
      {
        icon: 'wallet',
        title: '₹0.15 / km Running Cost',
        description: 'Save up to ₹40,000 annually compared to standard petrol commuters.'
      },
      {
        icon: 'shield-check',
        title: 'IP67 Submersible Waterproof',
        description: 'Certified water and monsoon protection across all electronic controllers.'
      }
    ],
    gallery: [
      {
        url: '/assets/golden-e1.jpg',
        caption: 'Ergonomic commuter riding posture'
      },
      {
        url: '/assets/golden-e2.jpg',
        caption: 'Spacious flat footboard with bag hook'
      },
      {
        url: '/assets/golden-e3.jpg',
        caption: 'Bright LED projector beam headlamp'
      }
    ]
  },
  {
    id: 'golden-e2',
    slug: 'golden-e2',
    name: 'Golden E2',
    category: 'scooter',
    tagline: 'More Power. More Freedom.',
    description: 'Our most popular model balancing extended 120km range, peppy 65 km/h speed, and advanced comfort suspension for family and work travel.',
    startingPrice: 104999,
    priceDisplay: '₹ 1,04,999',
    badge: 'Most Popular',
    heroImage: '/assets/golden-e2.jpg',
    specs: {
      price: 104999,
      priceDisplay: '₹ 1,04,999',
      rangeIdc: '120 km',
      rangeTrue: '105 km',
      batteryCapacity: '60V 32Ah',
      batteryType: 'Safe-Cell High Density LFP Pack',
      topSpeed: '65 km/h',
      motorType: 'PMSM High-Torque Electric Motor',
      peakPower: '2.4 kW Peak',
      chargingTime: '3.8 hrs (0–80%) / 4.8 hrs full',
      fastCharging: 'Fast Charging Supported (60 mins to 80%)',
      warranty: '3 Years / 50,000 km Battery & Motor Warranty',
      payload: '165 kg (Heavy Pillion Certified)',
      dimensions: '1840 × 710 × 1150 mm',
      kerbWeight: '84 kg',
      brakes: 'Front & Rear Disc Brakes with CBS',
      groundClearance: '175 mm',
      suspension: 'Telescopic Inverted Fork & Nitrox Rear Shocks',
      ridingModes: ['Eco (40 km/h)', 'City (55 km/h)', 'Sport (65 km/h)']
    },
    colors: [
      {
        name: 'Pearl White & Rose Gold',
        hex: '#F9F6F0',
        secondaryHex: '#D4AF37',
        image: '/assets/golden-e2.jpg'
      },
      {
        name: 'Dusty Rose Metallic',
        hex: '#C88A96',
        secondaryHex: '#3A141D',
        image: '/assets/golden-e1.jpg'
      },
      {
        name: 'Royal Wine Maroon',
        hex: '#8B263E',
        secondaryHex: '#1C080E',
        image: '/assets/golden-e3.jpg'
      }
    ],
    highlights: [
      {
        icon: 'zap',
        title: '2.4 kW PMSM Powertrain',
        description: 'Instant hill-climb torque capable of tackling flyovers even with a pillion passenger.'
      },
      {
        icon: 'gauge',
        title: '120 km True Range',
        description: 'Travel multiple days across the city on a single overnight charge.'
      },
      {
        icon: 'sparkles',
        title: 'Dual Disc Braking',
        description: 'High precision CBS hydraulic disc brakes front and back for wet road safety.'
      },
      {
        icon: 'smartphone',
        title: 'USB Smart Charging',
        description: 'Fast phone charging port integrated directly into the front glove compartment.'
      }
    ],
    gallery: [
      {
        url: '/assets/golden-e2.jpg',
        caption: 'Sleek aerodynamic profile in Pearl White'
      },
      {
        url: '/assets/golden-e1.jpg',
        caption: 'Generous cushioned seat for two adults'
      },
      {
        url: '/assets/golden-e3.jpg',
        caption: 'Digital LCD dash with real-time range estimation'
      }
    ]
  },
  {
    id: 'golden-e3',
    slug: 'golden-e3',
    name: 'Golden E3',
    category: 'scooter',
    tagline: 'Performance Meets Comfort.',
    description: 'The flagship performance electric scooter engineered for high velocity, maximum 150 km long-distance touring, and plush dual-suspension luxury.',
    startingPrice: 134999,
    priceDisplay: '₹ 1,34,999',
    badge: 'Premium',
    heroImage: '/assets/golden-e3.jpg',
    specs: {
      price: 134999,
      priceDisplay: '₹ 1,34,999',
      rangeIdc: '150 km',
      rangeTrue: '130 km',
      batteryCapacity: '72V 40Ah',
      batteryType: 'Ultra-Capacity Automotive Grade Safe LFP Pack',
      topSpeed: '75 km/h',
      motorType: 'Brushless High-Output PMSM Powertrain',
      peakPower: '3.6 kW Peak Output',
      chargingTime: '4.2 hrs (0–80%) / 5 hrs full',
      fastCharging: 'HyperCharge 45 mins to 80%',
      warranty: '5 Years / 60,000 km Extended Guarantee',
      payload: '180 kg Maximum Capacity',
      dimensions: '1880 × 730 × 1180 mm',
      kerbWeight: '92 kg',
      brakes: 'Front 240mm Disc & Rear 220mm Disc with CBS',
      groundClearance: '180 mm',
      suspension: 'Heavy-Duty Gas-Charged Monoshock & Inverted Forks',
      ridingModes: ['Eco (45 km/h)', 'City (60 km/h)', 'Sport+ (75 km/h)']
    },
    colors: [
      {
        name: 'Matte Obsidian Black',
        hex: '#18181B',
        secondaryHex: '#8B263E',
        image: '/assets/golden-e3.jpg'
      },
      {
        name: 'Rose Gold & Wine',
        hex: '#8B263E',
        secondaryHex: '#D4AF37',
        image: '/assets/golden-e1.jpg'
      },
      {
        name: 'Pearl Glacier White',
        hex: '#FAF6F0',
        secondaryHex: '#27272A',
        image: '/assets/golden-e2.jpg'
      }
    ],
    highlights: [
      {
        icon: 'rocket',
        title: '75 km/h High Top Speed',
        description: 'Fast highway passing capability with effortless acceleration.'
      },
      {
        icon: 'battery-charging',
        title: '150 km Certified Range',
        description: 'Largest 72V 40Ah battery pack in the segment for regional commuting.'
      },
      {
        icon: 'shield-check',
        title: '5 Years Extended Warranty',
        description: 'Unmatched 5-year powertrain assurance backed by factory warranty.'
      },
      {
        icon: 'award',
        title: 'Smart Bluetooth Connectivity',
        description: 'Turn-by-turn navigation alerts and live anti-theft geofencing.'
      }
    ],
    gallery: [
      {
        url: '/assets/golden-e3.jpg',
        caption: 'Commanding matte black presence'
      },
      {
        url: '/assets/golden-e1.jpg',
        caption: 'High-visibility twin projector lights'
      },
      {
        url: '/assets/golden-e2.jpg',
        caption: 'Alloy wheels with tubeless tires'
      }
    ]
  },
  {
    id: 'golden-toto-commercial',
    slug: 'golden-toto-cargo',
    name: 'Golden Toto Passenger & Cargo',
    category: 'cargo-toto',
    tagline: 'Heavy-Duty Electric Toto for Passenger & Goods Transit.',
    description: 'Built for commercial transport entrepreneurs. High-torque differential axle, reinforced steel chassis, and certified for 5 passengers or 450 kg commercial payload.',
    startingPrice: 149999,
    priceDisplay: '₹ 1,49,999',
    badge: 'Commercial Hero',
    heroImage: '/assets/golden-e3.jpg',
    specs: {
      price: 149999,
      priceDisplay: '₹ 1,49,999',
      rangeIdc: '140 km',
      rangeTrue: '120 km',
      batteryCapacity: '60V 100Ah',
      batteryType: 'Heavy-Duty Industrial LFP Chemistry',
      topSpeed: '45 km/h (Commercial RTO Capped)',
      motorType: 'High-Torque Differential BLDC Axle Motor',
      peakPower: '2.8 kW Peak Commercial Torque',
      chargingTime: '5.5 hrs (0–80%) / 7 hrs full',
      fastCharging: 'Industrial 25A Fast Charger Compatible',
      warranty: '3 Years Uncapped Commercial Battery Warranty',
      payload: '450 kg Certified Commercial Load',
      dimensions: '2780 × 990 × 1780 mm',
      kerbWeight: '220 kg',
      brakes: 'Hydraulic Drum on all 3 Wheels with Mechanical Parking Brake',
      groundClearance: '190 mm',
      suspension: 'Heavy-Duty Leaf Springs (Rear) & Dual Hydraulic Dampers (Front)',
      ridingModes: ['Eco Mode (Commercial)', 'Power Climb (Full Load)']
    },
    colors: [
      {
        name: 'Heritage Maroon & Champagne',
        hex: '#8B263E',
        secondaryHex: '#D4AF37',
        image: '/assets/golden-e3.jpg'
      },
      {
        name: 'Ivory Cream & Burgundy',
        hex: '#FAF6F0',
        secondaryHex: '#8B263E',
        image: '/assets/golden-e3.jpg'
      }
    ],
    highlights: [
      {
        icon: 'truck',
        title: '450 kg High Payload',
        description: 'Certified to carry 4 passengers plus driver or heavy freight effortlessly.'
      },
      {
        icon: 'indian-rupee',
        title: 'Daily Earnings Maximizer',
        description: 'Save over ₹300 per day in petrol expenses compared to traditional auto-rickshaws.'
      },
      {
        icon: 'award',
        title: 'RTO & Green Subsidy Approved',
        description: 'Eligible for commercial transport subsidies and low-interest bank finance.'
      }
    ],
    gallery: [
      {
        url: '/assets/golden-e3.jpg',
        caption: 'Spacious passenger cabin with deep cushioned bench seating'
      }
    ]
  }
];

export const MODELS_DATA = GOLDEN_TOTO_MODELS;
