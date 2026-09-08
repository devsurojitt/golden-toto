export type ScreenRoute = 
  | 'home' 
  | 'models' 
  | 'model-detail' 
  | 'compare' 
  | 'test-ride' 
  | 'contact' 
  | 'enquiry'
  | 'dealers' 
  | 'about' 
  | 'service' 
  | 'faq' 
  | 'calculator'
  | 'emi-calculator'
  | 'privacy' 
  | 'terms';

export interface ModelColor {
  name: string;
  hex: string;
  secondaryHex?: string;
  image: string;
}

export interface ModelSpecs {
  price: number; // in INR
  priceDisplay: string;
  rangeIdc: string;
  rangeTrue: string;
  batteryCapacity: string;
  batteryType: string;
  topSpeed: string;
  motorType: string;
  peakPower: string;
  chargingTime: string;
  fastCharging: string;
  warranty: string;
  payload: string;
  dimensions: string;
  kerbWeight: string;
  brakes: string;
  groundClearance: string;
  suspension: string;
  ridingModes: string[];
}

export interface EVModel {
  id: string;
  slug: string;
  name: string;
  category: 'scooter' | 'cargo-toto';
  tagline: string;
  description: string;
  startingPrice: number;
  priceDisplay: string;
  heroImage: string;
  badge?: string;
  specs: ModelSpecs;
  colors: ModelColor[];
  highlights: {
    icon: string;
    title: string;
    description: string;
  }[];
  gallery: {
    url: string;
    caption: string;
  }[];
}

export interface Dealer {
  id: string;
  name: string;
  city: 'Kolkata' | 'Asansol' | 'Siliguri';
  address: string;
  phone: string;
  timing: string;
  mapsQuery: string;
  mapsUrl: string;
  isFlagship?: boolean;
}

export interface TestRideLead {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  modelSlug: string;
  modelName: string;
  preferredDate: string;
  preferredLocation: string;
  message?: string;
  status: 'new' | 'contacted' | 'scheduled';
}

export interface EnquiryLead {
  id: string;
  createdAt: string;
  fullName: string;
  phone: string;
  email: string;
  modelSlug?: string;
  modelName?: string;
  city: string;
  message: string;
  status: 'new' | 'responded';
}

export interface AnalyticsEvent {
  id: string;
  timestamp: number;
  eventName: 
    | 'page_view' 
    | 'model_view' 
    | 'color_change' 
    | 'test_ride_start' 
    | 'test_ride_submit' 
    | 'enquiry_submit' 
    | 'whatsapp_click' 
    | 'dealer_map_click' 
    | 'compare_view' 
    | 'emi_calculate'
    | 'emi_cta_click';
  metadata?: Record<string, string | number>;
}
