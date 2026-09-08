import React, { useState } from 'react';
import { EVModel, EnquiryLead } from '../types';
import { saveEnquiryLead } from '../utils/analytics';
import { 
  MessageSquare, 
  PhoneCall, 
  Mail, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  Clock, 
  MapPin,
  ShieldCheck,
  User,
  Phone
} from 'lucide-react';

interface EnquiryFormProps {
  models: EVModel[];
  prefilledModelSlug?: string;
  onNavigateToDealers: () => void;
}

export const EnquiryForm: React.FC<EnquiryFormProps> = ({
  models,
  prefilledModelSlug,
  onNavigateToDealers,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [modelSlug, setModelSlug] = useState(prefilledModelSlug || 'all');
  const [city, setCity] = useState('Kolkata');
  const [message, setMessage] = useState('');

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedLead, setSubmittedLead] = useState<EnquiryLead | null>(null);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) {
      errs.fullName = 'Full Name is required';
    } else if (fullName.trim().length < 2) {
      errs.fullName = 'Please enter at least 2 characters';
    }

    const cleanPhone = phone.replace(/\D/g, '');
    if (!phone.trim()) {
      errs.phone = 'Phone number is required';
    } else if (cleanPhone.length < 10) {
      errs.phone = 'Please enter a valid 10-digit mobile number';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!emailRegex.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!message.trim()) {
      errs.message = 'Please provide details or questions in your message';
    }

    return errs;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors(validate());
  };

  const currentErrors = validate();
  const isValid = Object.keys(currentErrors).length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      message: true,
    });

    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setIsSubmitting(true);
    setServerError(null);

    const chosenModel = models.find((m) => m.slug === modelSlug);
    const modelName = modelSlug === 'all' ? 'General Product Inquiry' : chosenModel?.name || 'Golden Toto EV';

    try {
      await new Promise((res) => setTimeout(res, 750));

      const newLead: EnquiryLead = {
        id: `ENQ-${Date.now().toString().slice(-6)}`,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        modelSlug,
        modelName,
        city,
        message: message.trim(),
        createdAt: new Date().toISOString(),
        status: 'new',
      };

      saveEnquiryLead(newLead);
      setSubmittedLead(newLead);
    } catch {
      setServerError('An unexpected network error occurred while submitting your enquiry. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsApp = () => {
    const text = encodeURIComponent(
      `Hello Golden Toto sales! I am interested in learning more about your electric vehicles and dealership network.`
    );
    window.open(`https://wa.me/919830123456?text=${text}`, '_blank', 'noopener,noreferrer');
  };

  return (
    <div id="enquiry-support-view" className="py-12 md:py-20 bg-[#FAF6F0] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B263E] mb-2">
            <MessageSquare className="w-4 h-4" />
            <span>Direct Dealership Assistance</span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-normal text-[#2D1219] font-serif">
            Connect with Golden Toto
          </h1>
          <p className="text-sm sm:text-base text-[#73525A] mt-2 font-normal">
            Have questions regarding vehicle pricing, subsidies, bulk commercial fleet orders, or dealership franchises? We are here to help.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Quick Contact & WhatsApp Cards */}
          <div className="lg:col-span-5 space-y-4">
            {/* WhatsApp Quick CTA Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#EBDCD4] shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center text-[#1E7E34]">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#2D1219] font-serif">Instant WhatsApp Chat</h3>
                  <p className="text-xs text-[#73525A]">Average response time under 5 minutes</p>
                </div>
              </div>
              <p className="text-xs text-[#5A3E45] leading-relaxed">
                Connect directly with our dedicated product advisor on WhatsApp for live brochures, pricing quotes, and video walkthroughs.
              </p>
              <button
                id="btn-enquiry-whatsapp-chat"
                onClick={openWhatsApp}
                className="w-full py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold text-sm flex items-center justify-center gap-2 transition-colors shadow-md shadow-[#25D366]/20 cursor-pointer"
              >
                <span>Chat on WhatsApp (+91 98301 23456)</span>
              </button>
            </div>

            {/* Direct Phone & Email Info */}
            <div className="p-6 rounded-3xl bg-white border border-[#EBDCD4] shadow-sm space-y-4">
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#8B263E]">
                Showroom Direct Channels
              </h3>
              
              <div className="space-y-3 text-sm">
                <a 
                  href="tel:+919830123456" 
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF6F0] hover:bg-[#F3E7E2] border border-[#EBDCD4] text-[#2D1219] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#8B263E]" />
                  <div>
                    <span className="text-xs text-[#73525A] block">Sales Helpline</span>
                    <span className="font-semibold">+91 98301 23456</span>
                  </div>
                </a>

                <a 
                  href="mailto:dealership@goldentotoev.com" 
                  className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF6F0] hover:bg-[#F3E7E2] border border-[#EBDCD4] text-[#2D1219] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#8B263E]" />
                  <div>
                    <span className="text-xs text-[#73525A] block">Official Email</span>
                    <span className="font-semibold">dealership@goldentotoev.com</span>
                  </div>
                </a>

                <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#FAF6F0] border border-[#EBDCD4] text-[#2D1219]">
                  <Clock className="w-4 h-4 text-[#8B263E]" />
                  <div>
                    <span className="text-xs text-[#73525A] block">Operating Hours</span>
                    <span className="font-semibold text-xs">Mon – Sat: 9:30 AM – 8:00 PM IST</span>
                  </div>
                </div>
              </div>

              <button
                onClick={onNavigateToDealers}
                className="w-full py-2.5 text-xs text-[#73525A] hover:text-[#8B263E] flex items-center justify-center gap-1 transition-colors border-t border-[#EBDCD4] pt-3 cursor-pointer"
              >
                <MapPin className="w-3.5 h-3.5 text-[#8B263E]" />
                <span>View all authorized dealer showrooms →</span>
              </button>
            </div>
          </div>

          {/* Right: Enquiry Form */}
          <div className="lg:col-span-7">
            {submittedLead ? (
              <div 
                id="enquiry-success-card"
                className="p-8 rounded-3xl bg-white border border-[#EBDCD4] text-center space-y-4 shadow-xl"
              >
                <div className="w-14 h-14 rounded-full bg-rose-100 border border-rose-200 flex items-center justify-center mx-auto text-[#8B263E]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h2 className="text-2xl font-serif font-bold text-[#2D1219]">
                  Enquiry Submitted Successfully!
                </h2>
                <p className="text-sm text-[#5A3E45] max-w-md mx-auto">
                  Thank you, <strong className="text-[#2D1219]">{submittedLead.fullName}</strong>. Your enquiry (Ref: <span className="font-mono text-[#8B263E] font-bold">{submittedLead.id}</span>) has been assigned to our {submittedLead.city} regional team.
                </p>
                <button
                  onClick={() => {
                    setSubmittedLead(null);
                    setMessage('');
                  }}
                  className="px-6 py-2.5 rounded-full bg-[#FAF6F0] hover:bg-[#F3E7E2] text-[#2D1219] font-semibold text-xs border border-[#EBDCD4] cursor-pointer"
                >
                  Submit Another Question
                </button>
              </div>
            ) : (
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EBDCD4] shadow-xl">
                <h2 className="text-2xl font-normal text-[#2D1219] font-serif mb-1">
                  Send Us a Message
                </h2>
                <p className="text-xs text-[#73525A] mb-6 font-normal">
                  Fill out the form below and an EV specialist will respond within 2 business hours.
                </p>

                {serverError && (
                  <div className="mb-5 p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />
                    <span>{serverError}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  {/* Full Name */}
                  <div>
                    <label 
                      htmlFor="enquiry-fullname"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#4A2D35] mb-1.5"
                    >
                      Your Full Name <span className="text-[#8B263E]">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-[#8C6D75] absolute left-3.5 top-3.5" />
                      <input
                        id="enquiry-fullname"
                        type="text"
                        placeholder="e.g. Sourav Mukherjee"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        onBlur={() => handleBlur('fullName')}
                        className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF6F0] border text-[#2D1219] text-sm placeholder:text-[#9C8289] focus:outline-none ${
                          touched.fullName && errors.fullName
                            ? 'border-red-500 ring-1 ring-red-500'
                            : 'border-[#EBDCD4] focus:border-[#8B263E]'
                        }`}
                      />
                    </div>
                    {touched.fullName && errors.fullName && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                    )}
                  </div>

                  {/* Phone and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label 
                        htmlFor="enquiry-phone"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#4A2D35] mb-1.5"
                      >
                        Mobile Phone <span className="text-[#8B263E]">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="w-4 h-4 text-[#8C6D75] absolute left-3.5 top-3.5" />
                        <input
                          id="enquiry-phone"
                          type="tel"
                          placeholder="10-digit number"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          onBlur={() => handleBlur('phone')}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF6F0] border text-[#2D1219] text-sm placeholder:text-[#9C8289] focus:outline-none ${
                            touched.phone && errors.phone
                              ? 'border-red-500 ring-1 ring-red-500'
                              : 'border-[#EBDCD4] focus:border-[#8B263E]'
                          }`}
                        />
                      </div>
                      {touched.phone && errors.phone && (
                        <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>
                      )}
                    </div>

                    <div>
                      <label 
                        htmlFor="enquiry-email"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#4A2D35] mb-1.5"
                      >
                        Email Address <span className="text-[#8B263E]">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="w-4 h-4 text-[#8C6D75] absolute left-3.5 top-3.5" />
                        <input
                          id="enquiry-email"
                          type="email"
                          placeholder="name@domain.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          onBlur={() => handleBlur('email')}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF6F0] border text-[#2D1219] text-sm placeholder:text-[#9C8289] focus:outline-none ${
                            touched.email && errors.email
                              ? 'border-red-500 ring-1 ring-red-500'
                              : 'border-[#EBDCD4] focus:border-[#8B263E]'
                          }`}
                        />
                      </div>
                      {touched.email && errors.email && (
                        <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Model of Interest & City */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label 
                        htmlFor="enquiry-model"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#4A2D35] mb-1.5"
                      >
                        Model of Interest
                      </label>
                      <select
                        id="enquiry-model"
                        value={modelSlug}
                        onChange={(e) => setModelSlug(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#EBDCD4] text-[#2D1219] text-sm focus:outline-none focus:border-[#8B263E]"
                      >
                        <option value="all">General Query / All Models</option>
                        {models.map((m) => (
                          <option key={m.slug} value={m.slug}>
                            {m.name} ({m.priceDisplay})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label 
                        htmlFor="enquiry-city"
                        className="block text-xs font-semibold uppercase tracking-wider text-[#4A2D35] mb-1.5"
                      >
                        Your City
                      </label>
                      <input
                        id="enquiry-city"
                        type="text"
                        placeholder="e.g. Kolkata, Asansol, Durgapur..."
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#EBDCD4] text-[#2D1219] text-sm focus:outline-none focus:border-[#8B263E]"
                      />
                    </div>
                  </div>

                  {/* Question/Message Details */}
                  <div>
                    <label 
                      htmlFor="enquiry-message"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#4A2D35] mb-1.5"
                    >
                      Question or Details <span className="text-[#8B263E]">*</span>
                    </label>
                    <textarea
                      id="enquiry-message"
                      rows={4}
                      placeholder="Please ask about corporate delivery, subsidies, test ride booking, or technical questions..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onBlur={() => handleBlur('message')}
                      className={`w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border text-[#2D1219] text-sm placeholder:text-[#9C8289] focus:outline-none ${
                        touched.message && errors.message
                          ? 'border-red-500 ring-1 ring-red-500'
                          : 'border-[#EBDCD4] focus:border-[#8B263E]'
                      }`}
                    />
                    {touched.message && errors.message && (
                      <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2">
                    <button
                      id="submit-enquiry-btn"
                      type="submit"
                      disabled={isSubmitting || !isValid}
                      className={`w-full py-4 px-6 rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md ${
                        isValid && !isSubmitting
                          ? 'bg-[#8B263E] hover:bg-[#731E32] text-white shadow-[#8B263E]/20 active:scale-[0.99] cursor-pointer'
                          : 'bg-[#EBDCD4] text-[#9C8289] cursor-not-allowed'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-5 h-5 animate-spin" />
                          <span>Submitting Query...</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-5 h-5" />
                          <span>Send Enquiry to Showroom</span>
                        </>
                      )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-[11px] text-[#73525A] mt-3">
                      <ShieldCheck className="w-3.5 h-3.5 text-[#8B263E]" />
                      <span>Privacy guaranteed. Your contact number is used solely to respond to this inquiry.</span>
                    </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
