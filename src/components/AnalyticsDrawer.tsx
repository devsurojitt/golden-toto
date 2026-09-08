import React, { useState, useEffect } from 'react';
import { 
  X, 
  BarChart3, 
  TrendingUp, 
  PhoneCall, 
  MapPin, 
  Download, 
  RefreshCw, 
  Trash2
} from 'lucide-react';
import { 
  calculateConversionMetrics, 
  getStoredTestRideLeads, 
  getStoredEnquiryLeads, 
  saveTestRideLead 
} from '../utils/analytics';

interface AnalyticsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AnalyticsDrawer: React.FC<AnalyticsDrawerProps> = ({
  isOpen,
  onClose,
}) => {
  const [metrics, setMetrics] = useState(calculateConversionMetrics());
  const [testRideLeads, setTestRideLeads] = useState(getStoredTestRideLeads());
  const [enquiryLeads, setEnquiryLeads] = useState(getStoredEnquiryLeads());
  const [activeTab, setActiveTab] = useState<'overview' | 'test-rides' | 'enquiries'>('overview');

  const refreshData = () => {
    setMetrics(calculateConversionMetrics());
    setTestRideLeads(getStoredTestRideLeads());
    setEnquiryLeads(getStoredEnquiryLeads());
  };

  useEffect(() => {
    if (isOpen) {
      refreshData();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleExportCSV = () => {
    const rows = [
      ['Type', 'ID', 'Date', 'Name', 'Phone', 'Email', 'Model', 'Location/City', 'Notes'],
      ...testRideLeads.map((tr) => [
        'Test Ride',
        tr.id,
        tr.createdAt,
        tr.fullName,
        tr.phone,
        tr.email || '',
        tr.modelName,
        tr.preferredLocation,
        tr.message || ''
      ]),
      ...enquiryLeads.map((enq) => [
        'Enquiry',
        enq.id,
        enq.createdAt,
        enq.fullName,
        enq.phone,
        enq.email,
        enq.modelName,
        enq.city,
        enq.message
      ])
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map((e) => e.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `golden_toto_leads_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCreateSampleLead = () => {
    saveTestRideLead({
      fullName: 'Vikram Roy',
      phone: '9830012345',
      email: 'vikram.roy@example.com',
      modelSlug: 'golden-toto-city',
      modelName: 'Golden Toto City',
      preferredDate: '2026-09-12 (Morning)',
      preferredLocation: 'Salt Lake Flagship Hub, Kolkata',
      message: 'Demo booking sample via conversion panel.'
    });
    refreshData();
  };

  const handleClearAll = () => {
    if (window.confirm('Clear all stored test leads and local analytics history?')) {
      localStorage.removeItem('golden_toto_analytics_events');
      localStorage.removeItem('golden_toto_test_ride_leads');
      localStorage.removeItem('golden_toto_enquiry_leads');
      refreshData();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex justify-end">
      <div 
        className="w-full max-w-2xl bg-[#FAF6F0] border-l border-[#EBDCD4] h-full flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-right duration-300"
      >
        {/* Header */}
        <div className="p-5 border-b border-[#EBDCD4] flex items-center justify-between bg-white">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center text-[#8B263E]">
              <BarChart3 className="w-4 h-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-[#2D1219] font-serif">
                Dealership Lead & Conversion Analytics
              </h2>
              <p className="text-[11px] text-[#73525A]">
                Live visitor engagement & test ride pipeline
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={refreshData}
              className="p-1.5 rounded-full bg-[#FAF6F0] border border-[#EBDCD4] text-[#73525A] hover:text-[#8B263E] cursor-pointer"
              title="Refresh Stats"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-full bg-[#FAF6F0] border border-[#EBDCD4] text-[#73525A] hover:text-[#8B263E] cursor-pointer"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="px-5 pt-3 border-b border-[#EBDCD4] bg-white flex items-center gap-4 text-xs">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 font-semibold border-b-2 transition-colors cursor-pointer ${
              activeTab === 'overview'
                ? 'text-[#8B263E] border-[#8B263E]'
                : 'text-[#73525A] border-transparent hover:text-[#2D1219]'
            }`}
          >
            Funnel Overview
          </button>
          <button
            onClick={() => setActiveTab('test-rides')}
            className={`pb-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'test-rides'
                ? 'text-[#8B263E] border-[#8B263E]'
                : 'text-[#73525A] border-transparent hover:text-[#2D1219]'
            }`}
          >
            <span>Test Rides</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FAF6F0] text-[10px] text-[#8B263E] font-bold border border-[#EBDCD4]">
              {testRideLeads.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('enquiries')}
            className={`pb-3 font-semibold border-b-2 transition-colors flex items-center gap-1.5 cursor-pointer ${
              activeTab === 'enquiries'
                ? 'text-[#8B263E] border-[#8B263E]'
                : 'text-[#73525A] border-transparent hover:text-[#2D1219]'
            }`}
          >
            <span>Enquiries</span>
            <span className="px-2 py-0.5 rounded-full bg-[#FAF6F0] text-[10px] text-[#8B263E] font-bold border border-[#EBDCD4]">
              {enquiryLeads.length}
            </span>
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Primary Conversion KPI Trio */}
              <div className="grid grid-cols-3 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-[#EBDCD4] shadow-sm">
                  <span className="text-[11px] font-semibold text-[#73525A] block uppercase">
                    Conversion Rate
                  </span>
                  <p className="text-2xl font-bold text-[#8B263E] font-serif mt-1">
                    {metrics.conversionRate}
                  </p>
                  <span className="text-[10px] text-[#9C8289]">Visitors to Lead</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#EBDCD4] shadow-sm">
                  <span className="text-[11px] font-semibold text-[#73525A] block uppercase">
                    Total Leads
                  </span>
                  <p className="text-2xl font-bold text-[#2D1219] font-serif mt-1">
                    {metrics.totalLeads}
                  </p>
                  <span className="text-[10px] text-[#9C8289]">Test Rides + Enquiries</span>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#EBDCD4] shadow-sm">
                  <span className="text-[11px] font-semibold text-[#73525A] block uppercase">
                    Page Views
                  </span>
                  <p className="text-2xl font-bold text-[#2D1219] font-serif mt-1">
                    {metrics.totalPageViews}
                  </p>
                  <span className="text-[10px] text-[#9C8289]">Browsing Sessions</span>
                </div>
              </div>

              {/* Conversion Funnel Breakdown */}
              <div className="p-5 rounded-3xl bg-white border border-[#EBDCD4] shadow-sm space-y-4">
                <h3 className="text-xs uppercase font-bold tracking-wider text-[#2D1219] flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4 text-[#8B263E]" />
                  <span>Customer Conversion Funnel</span>
                </h3>

                <div className="space-y-3 text-xs">
                  {/* Step 1 */}
                  <div>
                    <div className="flex justify-between text-[#5A3E45] mb-1">
                      <span>1. Landing & Home Exploration</span>
                      <span className="font-mono font-bold text-[#2D1219]">{metrics.totalPageViews} views</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#FAF6F0] border border-[#EBDCD4] overflow-hidden">
                      <div className="h-full bg-[#8B263E]/40 w-full" />
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div>
                    <div className="flex justify-between text-[#5A3E45] mb-1">
                      <span>2. Model Detail Deep-Dive</span>
                      <span className="font-mono font-bold text-[#2D1219]">{metrics.modelViews} views</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#FAF6F0] border border-[#EBDCD4] overflow-hidden">
                      <div 
                        className="h-full bg-[#8B263E]/60" 
                        style={{ width: `${Math.min(100, (metrics.modelViews / Math.max(1, metrics.totalPageViews)) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div>
                    <div className="flex justify-between text-[#5A3E45] mb-1">
                      <span>3. Model Comparisons & EMI Calculations</span>
                      <span className="font-mono font-bold text-[#2D1219]">{metrics.compareViews} interactions</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#FAF6F0] border border-[#EBDCD4] overflow-hidden">
                      <div 
                        className="h-full bg-[#8B263E]/80" 
                        style={{ width: `${Math.min(100, (metrics.compareViews / Math.max(1, metrics.totalPageViews)) * 100)}%` }}
                      />
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div>
                    <div className="flex justify-between text-[#5A3E45] mb-1">
                      <span>4. Qualified Leads (Test Ride / Enquiry)</span>
                      <span className="font-mono font-bold text-[#8B263E]">{metrics.totalLeads} conversions</span>
                    </div>
                    <div className="w-full h-2 rounded-full bg-[#FAF6F0] border border-[#EBDCD4] overflow-hidden">
                      <div 
                        className="h-full bg-[#8B263E]" 
                        style={{ width: `${Math.min(100, (metrics.totalLeads / Math.max(1, metrics.totalPageViews)) * 100)}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Engagement Channels */}
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl bg-white border border-[#EBDCD4] shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#25D366]/15 text-[#1E7E34] flex items-center justify-center">
                    <PhoneCall className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#73525A] block uppercase">WhatsApp Chats</span>
                    <span className="text-lg font-bold text-[#2D1219] font-mono">{metrics.whatsappClicks} clicks</span>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-[#EBDCD4] shadow-sm flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-rose-100 text-[#8B263E] flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-[#73525A] block uppercase">Maps Directions</span>
                    <span className="text-lg font-bold text-[#2D1219] font-mono">{metrics.mapClicks} clicks</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'test-rides' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#73525A]">
                  {testRideLeads.length} Test Ride Reservations Captured
                </span>
              </div>

              {testRideLeads.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white border border-[#EBDCD4] text-center text-[#73525A] text-xs">
                  No test ride submissions yet. Use the website or tap &quot;Add Demo Lead&quot; below to test.
                </div>
              ) : (
                <div className="space-y-3">
                  {testRideLeads.map((tr) => (
                    <div 
                      key={tr.id}
                      className="p-4 rounded-2xl bg-white border border-[#EBDCD4] text-xs space-y-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#2D1219] text-sm">{tr.fullName}</span>
                        <span className="font-mono text-[11px] text-[#8B263E] font-bold">{tr.id}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[#5A3E45]">
                        <div>
                          <span className="text-[#73525A] block text-[10px]">Model:</span>
                          <span className="font-semibold text-[#2D1219]">{tr.modelName}</span>
                        </div>
                        <div>
                          <span className="text-[#73525A] block text-[10px]">Contact:</span>
                          <span>{tr.phone}</span>
                        </div>
                        <div>
                          <span className="text-[#73525A] block text-[10px]">Date Slot:</span>
                          <span>{tr.preferredDate}</span>
                        </div>
                        <div>
                          <span className="text-[#73525A] block text-[10px]">Showroom:</span>
                          <span>{tr.preferredLocation}</span>
                        </div>
                      </div>
                      {tr.message && (
                        <p className="text-[#73525A] text-[11px] pt-1 border-t border-[#EBDCD4]">
                          &quot;{tr.message}&quot;
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'enquiries' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-[#73525A]">
                  {enquiryLeads.length} General Enquiries Captured
                </span>
              </div>

              {enquiryLeads.length === 0 ? (
                <div className="p-8 rounded-2xl bg-white border border-[#EBDCD4] text-center text-[#73525A] text-xs">
                  No enquiries logged yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {enquiryLeads.map((enq) => (
                    <div 
                      key={enq.id}
                      className="p-4 rounded-2xl bg-white border border-[#EBDCD4] text-xs space-y-2 shadow-sm"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-[#2D1219] text-sm">{enq.fullName}</span>
                        <span className="font-mono text-[11px] text-[#8B263E] font-bold">{enq.id}</span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-[#5A3E45]">
                        <div>
                          <span className="text-[#73525A] block text-[10px]">Phone:</span>
                          <span>{enq.phone}</span>
                        </div>
                        <div>
                          <span className="text-[#73525A] block text-[10px]">City:</span>
                          <span>{enq.city}</span>
                        </div>
                      </div>
                      <p className="text-[#5A3E45] text-[11px] pt-1 border-t border-[#EBDCD4]">
                        &quot;{enq.message}&quot;
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-[#EBDCD4] bg-white flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <button
              onClick={handleExportCSV}
              disabled={metrics.totalLeads === 0}
              className={`px-4 py-2 rounded-full font-bold flex items-center gap-1.5 transition-colors ${
                metrics.totalLeads > 0
                  ? 'bg-[#8B263E] hover:bg-[#731E32] text-white cursor-pointer shadow-sm'
                  : 'bg-[#EBDCD4] text-[#9C8289] cursor-not-allowed'
              }`}
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export CSV</span>
            </button>

            <button
              onClick={handleCreateSampleLead}
              className="px-3.5 py-2 rounded-full bg-[#FAF6F0] hover:bg-[#F3E7E2] border border-[#EBDCD4] text-[#2D1219] font-medium cursor-pointer"
            >
              + Add Sample Lead
            </button>
          </div>

          <button
            onClick={handleClearAll}
            className="p-2 text-[#73525A] hover:text-red-600 transition-colors cursor-pointer"
            title="Clear All Local Leads"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
