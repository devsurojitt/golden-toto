import React, { useState } from 'react';
import { EVModel, TestRideLead } from '../types';
import { DEALERS_DATA } from '../data/dealers';
import { saveTestRideLead } from '../utils/analytics';
import { 
  CalendarCheck, 
  CheckCircle2, 
  AlertCircle, 
  Loader2, 
  MapPin, 
  Calendar, 
  Clock, 
  Phone, 
  Mail, 
  User, 
  ShieldCheck
} from 'lucide-react';

interface TestRideFormProps {
  models: EVModel[];
  prefilledModelSlug?: string;
  onSuccessClose?: () => void;
  onNavigateToDealers?: () => void;
}

export const TestRideForm: React.FC<TestRideFormProps> = ({
  models,
  prefilledModelSlug,
  onSuccessClose,
  onNavigateToDealers,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [modelSlug, setModelSlug] = useState(
    prefilledModelSlug || models[0]?.slug || 'golden-e1'
  );
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredLocation, setPreferredLocation] = useState(
    DEALERS_DATA[0]?.name || 'Salt Lake Flagship Hub, Kolkata'
  );
  const [timeSlot, setTimeSlot] = useState('11:00 AM - 01:00 PM');
  const [message, setMessage] = useState('');

  // Form states
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState<string | null>(null);
  const [submittedLead, setSubmittedLead] = useState<TestRideLead | null>(null);

  // Validation logic
  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) {
      errs.fullName = 'Full Name is required';
    } else if (fullName.trim().length < 2) {
      errs.fullName = 'Please enter at least 2 characters';
    }

    const cleanPhone = phone.replace(/[\s\-+()]/g, '');
    if (!cleanPhone) {
      errs.phone = 'Mobile phone number is required';
    } else if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      errs.phone = 'Please enter a valid 10-digit Indian mobile number';
    }

    if (!email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errs.email = 'Please enter a valid email address';
    }

    if (!preferredDate) {
      errs.preferredDate = 'Please select a date for your test ride';
    }

    return errs;
  };

  const handleBlur = (field: string) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const currentErrors = validate();
    setErrors(currentErrors);
  };

  const currentErrors = validate();
  const isValid = Object.keys(currentErrors).length === 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({
      fullName: true,
      phone: true,
      email: true,
      preferredDate: true,
    });

    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    const selectedModel = models.find((m) => m.slug === modelSlug);
    const modelName = selectedModel ? selectedModel.name : 'Golden Toto EV';

    try {
      await new Promise((resolve) => setTimeout(resolve, 800));

      const newLead: TestRideLead = {
        id: `GT-${Date.now().toString().slice(-6)}`,
        fullName: fullName.trim(),
        phone: phone.trim(),
        email: email.trim(),
        modelSlug,
        modelName,
        preferredLocation,
        preferredDate: `${preferredDate} (${timeSlot})`,
        message: message.trim(),
        createdAt: new Date().toISOString(),
        status: 'new',
      };

      saveTestRideLead(newLead);
      setSubmittedLead(newLead);
    } catch (err: unknown) {
      setServerError('An unexpected network error occurred while recording your booking. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBookAnother = () => {
    setSubmittedLead(null);
    setFullName('');
    setPhone('');
    setEmail('');
    setPreferredDate('');
    setMessage('');
    setErrors({});
    setTouched({});
  };

  const todayString = new Date().toISOString().split('T')[0];

  return (
    <div id="test-ride-booking-section" className="py-12 md:py-20 bg-[#FAF6F0] min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#8B263E] mb-2">
            <CalendarCheck className="w-4 h-4" />
            <span>Zero-Commitment Experience</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-normal text-[#2D1219] font-serif">
            Book a Free Test Ride
          </h1>
          <p className="text-sm sm:text-base text-[#73525A] mt-2 max-w-lg mx-auto font-normal">
            Feel the instantaneous electric torque and ergonomic comfort at your nearest Golden Toto showroom.
          </p>
        </div>

        {/* Success Confirmation State */}
        {submittedLead ? (
          <div 
            id="test-ride-success-card"
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EBDCD4] shadow-xl text-center space-y-5 animate-in fade-in zoom-in-95 duration-300"
          >
            <div className="w-16 h-16 rounded-full bg-[#8B263E]/10 border border-[#8B263E]/30 flex items-center justify-center mx-auto text-[#8B263E]">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-[#8B263E]">
                Booking Confirmed
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#2D1219] mt-1">
                We Can&apos;t Wait to Welcome You, {submittedLead.fullName.split(' ')[0]}!
              </h2>
              <p className="text-sm text-[#5A3E45] mt-1">
                Your test ride reservation for the <strong className="text-[#8B263E]">{submittedLead.modelName}</strong> is logged.
              </p>
            </div>

            {/* Reference info box */}
            <div className="p-4 rounded-2xl bg-[#FAF6F0] border border-[#EBDCD4] text-left text-xs space-y-2 max-w-md mx-auto">
              <div className="flex justify-between pb-1 border-b border-[#EBDCD4]">
                <span className="text-[#73525A]">Reference ID:</span>
                <span className="font-mono font-bold text-[#8B263E]">{submittedLead.id}</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-[#EBDCD4]">
                <span className="text-[#73525A]">Date & Slot:</span>
                <span className="text-[#2D1219] font-semibold">{submittedLead.preferredDate} ({submittedLead.timeSlot})</span>
              </div>
              <div className="flex justify-between pb-1 border-b border-[#EBDCD4]">
                <span className="text-[#73525A]">Showroom:</span>
                <span className="text-[#2D1219] font-semibold">{submittedLead.preferredLocation}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#73525A]">Contact Number:</span>
                <span className="text-[#2D1219] font-semibold">{submittedLead.phone}</span>
              </div>
            </div>

            <p className="text-xs text-[#73525A] max-w-md mx-auto">
              Our showroom concierge will send a WhatsApp confirmation and keep your sanitized vehicle ready. Please carry a valid driving license.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                id="btn-book-another-ride"
                onClick={handleBookAnother}
                className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#FAF6F0] hover:bg-[#F3E7E2] text-[#2D1219] font-semibold text-xs border border-[#EBDCD4] transition-colors"
              >
                Book for Another Person
              </button>
              {onSuccessClose && (
                <button
                  id="btn-close-success"
                  onClick={onSuccessClose}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-full bg-[#8B263E] text-white font-bold text-xs shadow-sm hover:bg-[#731E32]"
                >
                  Return to Showroom
                </button>
              )}
            </div>
          </div>
        ) : (
          /* Form Card */
          <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#EBDCD4] shadow-xl">
            {serverError && (
              <div 
                id="form-error-banner"
                className="mb-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3"
              >
                <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-bold block">Submission Notice</span>
                  <span>{serverError}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              {/* Row 1: Model Selection */}
              <div>
                <label 
                  htmlFor="field-model"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#4A2D35] mb-1.5"
                >
                  Select EV Model <span className="text-[#8B263E]">*</span>
                </label>
                <select
                  id="field-model"
                  value={modelSlug}
                  onChange={(e) => setModelSlug(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#EBDCD4] text-[#2D1219] text-sm focus:outline-none focus:border-[#8B263E] focus:ring-1 focus:ring-[#8B263E]"
                >
                  {models.map((m) => (
                    <option key={m.slug} value={m.slug}>
                      {m.name} ({m.priceDisplay} — {m.specs.rangeIdc} Range)
                    </option>
                  ))}
                </select>
              </div>

              {/* Row 2: Name and Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="field-fullname"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#4A2D35] mb-1.5"
                  >
                    Your Full Name <span className="text-[#8B263E]">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#8C6D75] absolute left-3.5 top-3.5" />
                    <input
                      id="field-fullname"
                      type="text"
                      placeholder="e.g. Rahul Sen"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      onBlur={() => handleBlur('fullName')}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF6F0] border text-[#2D1219] text-sm placeholder:text-[#9C8289] focus:outline-none ${
                        touched.fullName && errors.fullName
                          ? 'border-red-500 ring-1 ring-red-500'
                          : 'border-[#EBDCD4] focus:border-[#8B263E] focus:ring-1 focus:ring-[#8B263E]'
                      }`}
                    />
                  </div>
                  {touched.fullName && errors.fullName && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label 
                    htmlFor="field-phone"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#4A2D35] mb-1.5"
                  >
                    Mobile Phone <span className="text-[#8B263E]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-[#8C6D75] absolute left-3.5 top-3.5" />
                    <input
                      id="field-phone"
                      type="tel"
                      placeholder="10-digit mobile number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      onBlur={() => handleBlur('phone')}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF6F0] border text-[#2D1219] text-sm placeholder:text-[#9C8289] focus:outline-none ${
                        touched.phone && errors.phone
                          ? 'border-red-500 ring-1 ring-red-500'
                          : 'border-[#EBDCD4] focus:border-[#8B263E] focus:ring-1 focus:ring-[#8B263E]'
                      }`}
                    />
                  </div>
                  {touched.phone && errors.phone && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Email & Preferred Showroom */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="field-email"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#4A2D35] mb-1.5"
                  >
                    Email Address <span className="text-[#8B263E]">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-[#8C6D75] absolute left-3.5 top-3.5" />
                    <input
                      id="field-email"
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      onBlur={() => handleBlur('email')}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF6F0] border text-[#2D1219] text-sm placeholder:text-[#9C8289] focus:outline-none ${
                        touched.email && errors.email
                          ? 'border-red-500 ring-1 ring-red-500'
                          : 'border-[#EBDCD4] focus:border-[#8B263E] focus:ring-1 focus:ring-[#8B263E]'
                      }`}
                    />
                  </div>
                  {touched.email && errors.email && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label 
                    htmlFor="field-location"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#4A2D35] mb-1.5"
                  >
                    Preferred Showroom Location <span className="text-[#8B263E]">*</span>
                  </label>
                  <div className="relative">
                    <MapPin className="w-4 h-4 text-[#8C6D75] absolute left-3.5 top-3.5" />
                    <select
                      id="field-location"
                      value={preferredLocation}
                      onChange={(e) => setPreferredLocation(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#EBDCD4] text-[#2D1219] text-sm focus:outline-none focus:border-[#8B263E] focus:ring-1 focus:ring-[#8B263E]"
                    >
                      {DEALERS_DATA.map((dealer) => (
                        <option key={dealer.id} value={`${dealer.name} (${dealer.city})`}>
                          {dealer.name} — {dealer.city}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 4: Preferred Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label 
                    htmlFor="field-date"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#4A2D35] mb-1.5"
                  >
                    Preferred Date <span className="text-[#8B263E]">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-[#8C6D75] absolute left-3.5 top-3.5" />
                    <input
                      id="field-date"
                      type="date"
                      min={todayString}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      onBlur={() => handleBlur('preferredDate')}
                      className={`w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF6F0] border text-[#2D1219] text-sm focus:outline-none ${
                        touched.preferredDate && errors.preferredDate
                          ? 'border-red-500 ring-1 ring-red-500'
                          : 'border-[#EBDCD4] focus:border-[#8B263E] focus:ring-1 focus:ring-[#8B263E]'
                      }`}
                    />
                  </div>
                  {touched.preferredDate && errors.preferredDate && (
                    <p className="text-[11px] text-red-600 mt-1">{errors.preferredDate}</p>
                  )}
                </div>

                <div>
                  <label 
                    htmlFor="field-timeslot"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#4A2D35] mb-1.5"
                  >
                    Preferred Time Slot
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-[#8C6D75] absolute left-3.5 top-3.5" />
                    <select
                      id="field-timeslot"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#EBDCD4] text-[#2D1219] text-sm focus:outline-none focus:border-[#8B263E] focus:ring-1 focus:ring-[#8B263E]"
                    >
                      <option value="10:00 AM - 12:00 PM">Morning (10:00 AM – 12:00 PM)</option>
                      <option value="12:00 PM - 02:00 PM">Midday (12:00 PM – 02:00 PM)</option>
                      <option value="02:00 PM - 04:00 PM">Afternoon (02:00 PM – 04:00 PM)</option>
                      <option value="04:00 PM - 06:30 PM">Evening (04:00 PM – 06:30 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Row 5: Message */}
              <div>
                <label 
                  htmlFor="field-message"
                  className="block text-xs font-semibold uppercase tracking-wider text-[#4A2D35] mb-1.5"
                >
                  Notes or Specific Questions (Optional)
                </label>
                <textarea
                  id="field-message"
                  rows={3}
                  placeholder="e.g. Looking to trade in my old petrol scooter, or interested in commercial passenger route..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#FAF6F0] border border-[#EBDCD4] text-[#2D1219] text-sm placeholder:text-[#9C8289] focus:outline-none focus:border-[#8B263E] focus:ring-1 focus:ring-[#8B263E]"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-2">
                <button
                  id="submit-test-ride-btn"
                  type="submit"
                  disabled={isSubmitting || !isValid}
                  className={`w-full py-4 px-6 rounded-full font-bold text-base flex items-center justify-center gap-2 transition-all shadow-md ${
                    isValid && !isSubmitting
                      ? 'bg-[#8B263E] hover:bg-[#731E32] text-white shadow-[#8B263E]/25 active:scale-[0.99] cursor-pointer'
                      : 'bg-[#EBDCD4] text-[#9C8289] cursor-not-allowed'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>Reserving Your Slot...</span>
                    </>
                  ) : (
                    <>
                      <CalendarCheck className="w-5 h-5" />
                      <span>Confirm Free Test Ride</span>
                    </>
                  )}
                </button>
                <div className="flex items-center justify-center gap-2 text-[11px] text-[#73525A] mt-3">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8B263E]" />
                  <span>No spam guarantee. Your details are strictly shared only with the selected showroom.</span>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};
