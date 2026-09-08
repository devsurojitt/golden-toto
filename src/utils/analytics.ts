import { AnalyticsEvent, TestRideLead, EnquiryLead } from '../types';

const STORAGE_KEYS = {
  ANALYTICS: 'golden_toto_analytics_events',
  TEST_RIDES: 'golden_toto_test_ride_leads',
  ENQUIRIES: 'golden_toto_enquiry_leads',
};

export const trackEvent = (
  eventName: AnalyticsEvent['eventName'],
  metadata?: Record<string, string | number>
) => {
  try {
    const existing = getStoredEvents();
    const newEvent: AnalyticsEvent = {
      id: 'evt_' + Math.random().toString(36).substring(2, 9) + '_' + Date.now(),
      timestamp: Date.now(),
      eventName,
      metadata
    };
    const updated = [newEvent, ...existing].slice(0, 300); // keep last 300 events
    localStorage.setItem(STORAGE_KEYS.ANALYTICS, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('golden_toto_analytics_updated'));
  } catch (err) {
    console.error('Analytics tracking error:', err);
  }
};

export const trackPageView = (page: string, metadata?: Record<string, string | number>) => {
  trackEvent('page_view', { page, ...metadata });
};

export const getStoredEvents = (): AnalyticsEvent[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ANALYTICS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveTestRideLead = (lead: Omit<TestRideLead, 'id' | 'createdAt' | 'status'>): TestRideLead => {
  const existing = getStoredTestRideLeads();
  const createdLead: TestRideLead = {
    ...lead,
    id: 'TR-' + Math.floor(100000 + Math.random() * 900000),
    createdAt: new Date().toISOString(),
    status: 'new'
  };
  const updated = [createdLead, ...existing];
  localStorage.setItem(STORAGE_KEYS.TEST_RIDES, JSON.stringify(updated));
  trackEvent('test_ride_submit', {
    modelSlug: lead.modelSlug,
    location: lead.preferredLocation,
    date: lead.preferredDate
  });
  window.dispatchEvent(new CustomEvent('golden_toto_leads_updated'));
  return createdLead;
};

export const getStoredTestRideLeads = (): TestRideLead[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.TEST_RIDES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const saveEnquiryLead = (lead: Omit<EnquiryLead, 'id' | 'createdAt' | 'status'>): EnquiryLead => {
  const existing = getStoredEnquiryLeads();
  const createdLead: EnquiryLead = {
    ...lead,
    id: 'ENQ-' + Math.floor(100000 + Math.random() * 900000),
    createdAt: new Date().toISOString(),
    status: 'new'
  };
  const updated = [createdLead, ...existing];
  localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(updated));
  trackEvent('enquiry_submit', {
    modelSlug: lead.modelSlug || 'general',
    city: lead.city
  });
  window.dispatchEvent(new CustomEvent('golden_toto_leads_updated'));
  return createdLead;
};

export const getStoredEnquiryLeads = (): EnquiryLead[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
};

export const calculateConversionMetrics = () => {
  const events = getStoredEvents();
  const testRides = getStoredTestRideLeads();
  const enquiries = getStoredEnquiryLeads();

  const totalPageViews = events.filter(e => e.eventName === 'page_view').length || 1;
  const modelViews = events.filter(e => e.eventName === 'model_view').length;
  const compareViews = events.filter(e => e.eventName === 'compare_view').length;
  const whatsappClicks = events.filter(e => e.eventName === 'whatsapp_click').length;
  const mapClicks = events.filter(e => e.eventName === 'dealer_map_click').length;
  const totalLeads = testRides.length + enquiries.length;

  const conversionRate = totalPageViews > 0 
    ? ((totalLeads / totalPageViews) * 100).toFixed(1)
    : '0.0';

  return {
    totalPageViews,
    modelViews,
    compareViews,
    testRidesCount: testRides.length,
    enquiriesCount: enquiries.length,
    whatsappClicks,
    mapClicks,
    totalLeads,
    conversionRate: `${conversionRate}%`,
    recentLeads: [...testRides, ...enquiries].slice(0, 10)
  };
};
