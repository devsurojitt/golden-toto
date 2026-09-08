export interface FAQItem {
  id: string;
  category: 'range-charging' | 'battery-safety' | 'warranty-service' | 'booking-delivery' | 'financing';
  question: string;
  answer: string;
}

export const FAQ_CATEGORIES = [
  { id: 'all', label: 'All Questions' },
  { id: 'range-charging', label: 'Range & Charging' },
  { id: 'battery-safety', label: 'Battery & Safety' },
  { id: 'warranty-service', label: 'Warranty & Service' },
  { id: 'booking-delivery', label: 'Booking & Delivery' },
  { id: 'financing', label: 'Financing & Subsidy' },
] as const;

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    category: 'range-charging',
    question: 'How do I charge a Golden Toto EV at home?',
    answer: 'Every Golden Toto scooter and commercial e-toto ships with a portable Smart Home Charger that plugs directly into any standard 15-Amp 3-pin household wall socket. No special electrical substation or high-voltage installation is required.'
  },
  {
    id: 'faq-2',
    category: 'range-charging',
    question: 'What is the real-world range compared to the certified IDC range?',
    answer: 'Certified IDC (Indian Driving Cycle) represents lab-tested standard conditions. In actual daily urban riding with stop-and-go city traffic, Golden Toto City yields 75 km TrueRange, Golden Toto Pro yields 120 km TrueRange, and Golden Toto Classic E-Toto delivers 100–110 km on a full 4-passenger payload.'
  },
  {
    id: 'faq-3',
    category: 'battery-safety',
    question: 'Are Golden Toto batteries fireproof and waterproof in monsoons?',
    answer: 'Yes. Golden Toto vehicles utilize AIS-156 Amendment 3 Phase 2 certified battery packs encased in IP67-rated waterproof extruded aluminum enclosures with multi-layer thermal management and automated overcharge/over-discharge cutoffs.'
  },
  {
    id: 'faq-4',
    category: 'battery-safety',
    question: 'How long does a Golden Toto battery pack last?',
    answer: 'Our Lithium Iron Phosphate (LFP) safe-chemistry battery cells are engineered for over 1,500 to 2,000 charge cycles, easily translating to 6 to 8+ years of regular daily operation before cell capacity dips below 80%.'
  },
  {
    id: 'faq-5',
    category: 'warranty-service',
    question: 'What is covered under the Golden Toto manufacturer warranty?',
    answer: 'Golden Toto City and Classic E-Toto carry a 3-Year / 40,000 km manufacturer warranty on the battery pack, motor, and controller. The flagship Golden Toto Pro is backed by an extended 5-Year / 60,000 km comprehensive powertrain warranty.'
  },
  {
    id: 'faq-6',
    category: 'warranty-service',
    question: 'What are the service intervals and periodic maintenance costs?',
    answer: 'Electric vehicles have no engine oil, spark plugs, or clutch plates to replace. We provide 3 Free Scheduled Inspections at 1,000 km (1 month), 5,000 km (6 months), and 10,000 km (12 months). Routine service costs average under ₹400 for brake checks and chassis lubrication.'
  },
  {
    id: 'faq-7',
    category: 'booking-delivery',
    question: 'How does the test ride booking process work?',
    answer: 'Simply select your preferred vehicle and showroom on our website. Our local dealership concierge will verify your phone number via WhatsApp/call and reserve your vehicle slot. A valid driving license is required for test rides of the City and Pro models.'
  },
  {
    id: 'faq-8',
    category: 'booking-delivery',
    question: 'How soon can I take delivery after booking?',
    answer: 'Standard color models are available for same-week drive-away delivery from our authorized dealer showrooms upon loan or payment clearance. Custom accessory fittings take 48 to 72 hours.'
  },
  {
    id: 'faq-9',
    category: 'financing',
    question: 'What financing and EMI options are available?',
    answer: 'We partner with leading national and regional EV financing institutions offering up to 90% on-road funding, tenures from 12 to 48 months, and subsidized interest rates starting as low as 8.5% p.a.'
  },
  {
    id: 'faq-10',
    category: 'financing',
    question: 'Are Golden Toto vehicles eligible for government EV subsidies?',
    answer: 'Yes, Golden Toto models comply with central EMPS / FAME guidelines and state-level EV road tax waivers, registration exemptions, and green vehicle scrap bonuses where applicable.'
  }
];

export const SERVICE_POLICIES = {
  freeServices: [
    { number: '1st Service', interval: '1 Month / 1,000 km', details: 'Full diagnostic check, brake caliper alignment, tire pressure, fastener torquing, electrical safety inspection.' },
    { number: '2nd Service', interval: '6 Months / 5,000 km', details: 'Battery health BMS scan, suspension damping check, brake pad inspection, controller firmware updates.' },
    { number: '3rd Service', interval: '12 Months / 10,000 km', details: 'Deep powertrain evaluation, wheel bearing check, steering stem lubrication, IP67 seal verification.' }
  ],
  roadsideAssistance: {
    title: '24x7 Emergency Roadside Assistance (RSA)',
    description: 'Every Golden Toto customer enjoys complimentary 1-year 24x7 Roadside Assistance covering puncture support, towing to the nearest authorized service hub, and emergency mobile charging in key coverage zones.',
    hotline: '+91 1800 212 9090'
  },
  warrantyTerms: [
    'Battery pack capacity retention guaranteed at ≥75% over warranty period.',
    'IP67 electrical protection certified against monsoons and high waterlogged streets.',
    'Zero paperwork claim processing at any authorized Golden Toto state service dealer.',
    'Original equipment replacement parts stocked across all regional hubs.'
  ]
};
