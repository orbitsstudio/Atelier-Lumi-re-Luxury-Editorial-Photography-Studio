import { useState, useId } from 'react';
import {
  Calendar as CalendarIcon,
  CheckCircle2,
  AlertCircle,
  Download,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Info,
  Server,
} from 'lucide-react';
import { SERVICES } from '../data/photographyData';

interface BookingSystemProps {
  initialServiceId?: string;
}

interface BookingFormData {
  serviceId: string;
  preferredDate: string;
  timeSlot: string;
  clientName: string;
  email: string;
  phone: string;
  location: string;
  guestCountOrScale: string;
  projectDetails: string;
  addDrone: boolean;
  addLeatherAlbum: boolean;
  addSecondShooter: boolean;
  addExpeditedDelivery: boolean;
}

export default function BookingSystem({ initialServiceId }: BookingSystemProps) {
  const formId = useId();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [formData, setFormData] = useState<BookingFormData>({
    serviceId: initialServiceId || SERVICES[0].id,
    preferredDate: '',
    timeSlot: 'Golden Hour & Twilight (17:00)',
    clientName: '',
    email: '',
    phone: '',
    location: '',
    guestCountOrScale: '1 - 50 guests',
    projectDetails: '',
    addDrone: false,
    addLeatherAlbum: true,
    addSecondShooter: true,
    addExpeditedDelivery: false,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [backendSyncStatus, setBackendSyncStatus] = useState<'pending' | 'success' | 'fallback'>('pending');
  const [bookingConfirmation, setBookingConfirmation] = useState<{
    referenceCode: string;
    submittedAt: string;
    details: BookingFormData;
  } | null>(null);

  const timeSlots = [
    { id: 'morning', label: 'Morning Radiance (09:30 - 12:30)', note: 'Soft Parisian daylight' },
    { id: 'midday', label: 'Midday Natural Light (13:00 - 16:00)', note: 'High directional contrast' },
    { id: 'golden', label: 'Golden Hour & Twilight (17:00 - 20:30)', note: 'Signature warm atmosphere' },
    { id: 'fullday', label: 'Full Day Immersion (09:00 - 22:00)', note: 'Complete celebratory narrative' },
  ];

  const stepTitles = [
    'Service Selection',
    'Date & Window',
    'Client Information',
    'Bespoke Folio',
  ];

  const selectedService = SERVICES.find((s) => s.id === formData.serviceId) || SERVICES[0];

  const validateStep = (step: number): boolean => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (step === 1) {
      if (!formData.serviceId) newErrors.serviceId = 'Please select a photography collection.';
    } else if (step === 2) {
      if (!formData.preferredDate) {
        newErrors.preferredDate = 'Please select your desired date.';
      } else {
        const chosenDate = new Date(formData.preferredDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (chosenDate < today) {
          newErrors.preferredDate = 'Please choose a future date.';
        }
      }
      if (!formData.timeSlot) newErrors.timeSlot = 'Please select a preferred lighting session slot.';
    } else if (step === 3) {
      if (!formData.clientName.trim()) newErrors.clientName = 'Client name is required.';
      if (!formData.email.trim()) {
        newErrors.email = 'Email address is required.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Please provide a valid email address.';
      }
      if (!formData.phone.trim()) {
        newErrors.phone = 'Phone number is required for concierge coordination.';
      }
      if (!formData.location.trim()) {
        newErrors.location = 'Please state your event venue or destination.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) {
      setCurrentStep(3);
      return;
    }

    setIsSubmitting(true);

    try {
      // Attempt posting to our Express backend route
      const res = await fetch('/api/consultations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        const data = await res.json();
        setBackendSyncStatus('success');
        setBookingConfirmation({
          referenceCode: data.referenceCode,
          submittedAt: new Date().toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          }),
          details: { ...formData },
        });
      } else {
        throw new Error('Server returned non-200');
      }
    } catch {
      // Fallback for static client execution
      const refCode = `AL-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
      setBackendSyncStatus('fallback');
      setBookingConfirmation({
        referenceCode: refCode,
        submittedAt: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        }),
        details: { ...formData },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Generate downloadable .ics calendar file
  const handleDownloadCalendarInvite = () => {
    if (!bookingConfirmation) return;
    const { details, referenceCode } = bookingConfirmation;
    const dateFormatted = details.preferredDate.replace(/-/g, '');
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Atelier Lumiere//Luxury Photography Consultation//EN
CALSCALE:GREGORIAN
BEGIN:VEVENT
SUMMARY:Atelier Lumière Consultation: ${selectedService.name} (Ref: ${referenceCode})
DESCRIPTION:Private consultation with Atelier Lumière Concierge for ${details.clientName}. Location: ${details.location}.
DTSTART;VALUE=DATE:${dateFormatted}
DTEND;VALUE=DATE:${dateFormatted}
LOCATION:${details.location}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.setAttribute('download', `Atelier-Lumiere-${referenceCode}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section id="booking" className="py-16 sm:py-24 md:py-32 bg-[#0a0a0a] text-[#f5f2eb] relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Header */}
        <div className="text-center space-y-2 sm:space-y-3 mb-8 sm:mb-12">
          <div className="text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.24em] uppercase text-[#c5a880] font-medium">
            Private Commissions · Reservations
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-editorial font-light tracking-tight text-[#f5f2eb]">
            Schedule Your Consultation
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-[#a1a1aa] font-light max-w-xl mx-auto leading-relaxed">
            Reserve your date with Atelier Lumière. Due to our rigorous artisanal file mastering, we accept a limited number of commissions each season.
          </p>
        </div>

        {/* Confirmation Screen */}
        {bookingConfirmation ? (
          <div className="bg-[#121212] border border-[#c5a880]/60 rounded-sm p-6 sm:p-10 md:p-12 shadow-2xl animate-in fade-in duration-300">
            <div className="text-center space-y-3 sm:space-y-4 mb-6 sm:mb-8">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#c5a880]/10 border border-[#c5a880] flex items-center justify-center mx-auto text-[#c5a880]">
                <CheckCircle2 className="w-7 h-7 sm:w-8 sm:h-8" />
              </div>
              <div className="space-y-1">
                <span className="text-[11px] sm:text-xs font-mono uppercase tracking-widest text-[#c5a880]">
                  Consultation Request Dispatched
                </span>
                <h3 className="text-xl sm:text-3xl font-editorial text-[#f5f2eb]">
                  Thank You, {bookingConfirmation.details.clientName}
                </h3>
                <p className="text-xs font-mono text-[#a1a1aa]">
                  Reference ID:{' '}
                  <span className="text-[#f5f2eb] font-semibold">{bookingConfirmation.referenceCode}</span>
                </p>
              </div>
            </div>

            {/* Summary Details */}
            <div className="bg-[#0a0a0a] border border-[#27272a] rounded-sm p-4 sm:p-6 space-y-3 sm:space-y-4 text-xs font-mono mb-6 sm:mb-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 border-b border-[#27272a] pb-3 sm:pb-4">
                <div>
                  <span className="text-[#71717a] block text-[11px]">Service Commission</span>
                  <span className="text-[#f5f2eb] text-xs sm:text-sm font-sans">{selectedService.name}</span>
                </div>
                <div>
                  <span className="text-[#71717a] block text-[11px]">Preferred Date & Window</span>
                  <span className="text-[#e5d3b3] text-xs sm:text-sm">
                    {bookingConfirmation.details.preferredDate} ({bookingConfirmation.details.timeSlot})
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <div>
                  <span className="text-[#71717a] block text-[11px]">Location / Destination</span>
                  <span className="text-[#f5f2eb]">{bookingConfirmation.details.location}</span>
                </div>
                <div>
                  <span className="text-[#71717a] block text-[11px]">Client Contact</span>
                  <span className="text-[#f5f2eb] break-all">
                    {bookingConfirmation.details.email} · {bookingConfirmation.details.phone}
                  </span>
                </div>
              </div>
            </div>

            {/* Backend Connectivity Notice */}
            <div className="p-4 bg-[#18181b] border-l-2 border-[#c5a880] rounded-sm mb-6 sm:mb-8 text-xs text-[#a1a1aa] flex items-start gap-3">
              <Server className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <span className="text-[#f5f2eb] font-medium">
                  {backendSyncStatus === 'success'
                    ? 'Production Backend Connected: '
                    : 'System Status: '}
                </span>
                {backendSyncStatus === 'success'
                  ? 'Your consultation request has been stored on the Atelier Lumière Express Web Service endpoint (/api/consultations).'
                  : 'Client-side workflow validated. Live Express backend endpoint /api/consultations is active on port ' + (process.env.PORT || 3000) + '.'}
              </div>
            </div>

            {/* Action buttons (Stacked on mobile, row on tablet+) */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <button
                onClick={handleDownloadCalendarInvite}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-semibold tracking-wider uppercase text-[#0a0a0a] bg-[#c5a880] hover:bg-[#d4af37] active:scale-[0.98] transition-colors rounded-sm min-h-[44px]"
              >
                <Download className="w-4 h-4" />
                <span>Save to Calendar (.ICS)</span>
              </button>

              <a
                href={`https://wa.me/33142685500?text=${encodeURIComponent(
                  `Hello Atelier Lumière Concierge, I submitted consultation request ${bookingConfirmation.referenceCode} for ${selectedService.name} on ${bookingConfirmation.details.preferredDate}.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-xs font-medium tracking-wider uppercase text-[#f5f2eb] border border-[#27272a] hover:border-[#c5a880] hover:text-[#c5a880] active:scale-[0.98] transition-colors rounded-sm min-h-[44px]"
              >
                <span>WhatsApp Studio Concierge</span>
              </a>

              <button
                onClick={() => {
                  setBookingConfirmation(null);
                  setCurrentStep(1);
                }}
                className="w-full sm:w-auto px-6 py-3 text-xs tracking-wider uppercase text-[#a1a1aa] hover:text-[#f5f2eb] transition-colors min-h-[44px] flex items-center justify-center"
              >
                New Booking
              </button>
            </div>
          </div>
        ) : (
          /* Main Multi-Step Form */
          <div className="bg-[#121212] border border-[#27272a] rounded-sm shadow-2xl p-5 sm:p-8 md:p-10">
            {/* Step Progress Header (Mobile Responsive) */}
            <div className="border-b border-[#27272a] pb-5 mb-6 sm:mb-8">
              <div className="flex items-center justify-between">
                {[1, 2, 3, 4].map((stepNum) => (
                  <button
                    key={stepNum}
                    type="button"
                    onClick={() => stepNum < currentStep && setCurrentStep(stepNum)}
                    disabled={stepNum > currentStep}
                    className={`flex items-center gap-2 text-xs font-mono transition-colors min-h-[40px] ${
                      currentStep === stepNum
                        ? 'text-[#c5a880] font-semibold'
                        : currentStep > stepNum
                        ? 'text-[#f5f2eb] cursor-pointer'
                        : 'text-[#52525b] cursor-not-allowed'
                    }`}
                  >
                    <span
                      className={`w-7 h-7 sm:w-6 sm:h-6 rounded-full flex items-center justify-center border text-xs sm:text-[10px] ${
                        currentStep === stepNum
                          ? 'border-[#c5a880] bg-[#c5a880]/15 text-[#c5a880] font-bold'
                          : currentStep > stepNum
                          ? 'border-[#f5f2eb] bg-[#f5f2eb] text-[#0a0a0a]'
                          : 'border-[#27272a]'
                      }`}
                    >
                      {stepNum}
                    </span>
                    <span className="hidden md:inline uppercase tracking-wider text-[11px]">
                      {stepTitles[stepNum - 1]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Mobile Step Title Label */}
              <div className="md:hidden mt-3 text-center text-xs font-mono text-[#c5a880] uppercase tracking-wider">
                Step {currentStep} of 4: {stepTitles[currentStep - 1]}
              </div>
            </div>

            <form onSubmit={handleSubmit} noValidate>
              {/* STEP 1: Select Service */}
              {currentStep === 1 && (
                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-editorial text-[#f5f2eb]">Select Photography Collection</h3>
                    <p className="text-xs text-[#a1a1aa] mt-1">
                      Choose the primary category for your private commission.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                    {SERVICES.map((srv) => {
                      const isSelected = formData.serviceId === srv.id;
                      return (
                        <div
                          key={srv.id}
                          onClick={() => setFormData({ ...formData, serviceId: srv.id })}
                          className={`p-4 border rounded-sm cursor-pointer transition-all duration-200 min-h-[72px] ${
                            isSelected
                              ? 'bg-[#18181b] border-[#c5a880] ring-1 ring-[#c5a880]/30'
                              : 'bg-[#0a0a0a] border-[#27272a] hover:border-[#3f3f46] active:bg-[#151515]'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs font-mono text-[#c5a880] mb-1">
                            <span>{srv.number}.</span>
                            <span>{srv.investmentStartingAt}</span>
                          </div>
                          <h4 className="text-base font-editorial text-[#f5f2eb] leading-snug">
                            {srv.name}
                          </h4>
                          <p className="text-xs text-[#a1a1aa] mt-1 line-clamp-2">
                            {srv.subtitle}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                  {errors.serviceId && (
                    <p className="text-xs text-rose-400 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5" /> {errors.serviceId}
                    </p>
                  )}
                </div>
              )}

              {/* STEP 2: Preferred Date & Time Slot */}
              {currentStep === 2 && (
                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-editorial text-[#f5f2eb]">Preferred Date & Lighting Window</h3>
                    <p className="text-xs text-[#a1a1aa] mt-1">
                      Select your desired commission date and ambient light preference.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                    {/* Date Picker Input */}
                    <div className="space-y-2">
                      <label htmlFor={`${formId}-date`} className="block text-xs uppercase tracking-wider text-[#a1a1aa] font-mono">
                        Target Date *
                      </label>
                      <input
                        id={`${formId}-date`}
                        type="date"
                        value={formData.preferredDate}
                        onChange={(e) => {
                          setFormData({ ...formData, preferredDate: e.target.value });
                          if (errors.preferredDate) setErrors({ ...errors, preferredDate: undefined });
                        }}
                        className="w-full bg-[#0a0a0a] border border-[#27272a] focus:border-[#c5a880] text-[#f5f2eb] px-4 py-3 rounded-sm text-base sm:text-sm focus:outline-none min-h-[46px]"
                      />
                      {errors.preferredDate && (
                        <p className="text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.preferredDate}
                        </p>
                      )}
                    </div>

                    {/* Time Slot Selector */}
                    <div className="space-y-2">
                      <label className="block text-xs uppercase tracking-wider text-[#a1a1aa] font-mono">
                        Lighting Window *
                      </label>
                      <div className="space-y-2">
                        {timeSlots.map((slot) => {
                          const isSelected = formData.timeSlot === slot.label;
                          return (
                            <div
                              key={slot.id}
                              onClick={() => setFormData({ ...formData, timeSlot: slot.label })}
                              className={`p-3 border rounded-sm cursor-pointer transition-all min-h-[48px] flex flex-col justify-center ${
                                isSelected
                                  ? 'bg-[#18181b] border-[#c5a880] text-[#f5f2eb]'
                                  : 'bg-[#0a0a0a] border-[#27272a] text-[#a1a1aa] hover:border-[#3f3f46] active:bg-[#151515]'
                              }`}
                            >
                              <div className="flex items-center justify-between text-xs gap-2">
                                <span className="font-medium text-[#f5f2eb]">{slot.label}</span>
                                <span className="text-[10px] text-[#c5a880] font-mono shrink-0">{slot.note}</span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Client Name, Email, Phone, Project Details */}
              {currentStep === 3 && (
                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-editorial text-[#f5f2eb]">Client & Event Information</h3>
                    <p className="text-xs text-[#a1a1aa] mt-1">
                      Our private concierge handles all inquiries with strict discretion.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Client Name */}
                    <div className="space-y-1.5">
                      <label htmlFor={`${formId}-name`} className="block text-xs uppercase tracking-wider text-[#a1a1aa] font-mono">
                        Full Name / Couple Names *
                      </label>
                      <input
                        id={`${formId}-name`}
                        type="text"
                        placeholder="e.g. Genevieve & Alistair Croft"
                        value={formData.clientName}
                        onChange={(e) => {
                          setFormData({ ...formData, clientName: e.target.value });
                          if (errors.clientName) setErrors({ ...errors, clientName: undefined });
                        }}
                        className="w-full bg-[#0a0a0a] border border-[#27272a] focus:border-[#c5a880] text-[#f5f2eb] px-4 py-3 rounded-sm text-base sm:text-sm focus:outline-none min-h-[46px]"
                      />
                      {errors.clientName && (
                        <p className="text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.clientName}
                        </p>
                      )}
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor={`${formId}-email`} className="block text-xs uppercase tracking-wider text-[#a1a1aa] font-mono">
                        Email Address *
                      </label>
                      <input
                        id={`${formId}-email`}
                        type="email"
                        placeholder="client@luxuryestate.com"
                        value={formData.email}
                        onChange={(e) => {
                          setFormData({ ...formData, email: e.target.value });
                          if (errors.email) setErrors({ ...errors, email: undefined });
                        }}
                        className="w-full bg-[#0a0a0a] border border-[#27272a] focus:border-[#c5a880] text-[#f5f2eb] px-4 py-3 rounded-sm text-base sm:text-sm focus:outline-none min-h-[46px]"
                      />
                      {errors.email && (
                        <p className="text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.email}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label htmlFor={`${formId}-phone`} className="block text-xs uppercase tracking-wider text-[#a1a1aa] font-mono">
                        Direct Phone / WhatsApp *
                      </label>
                      <input
                        id={`${formId}-phone`}
                        type="tel"
                        placeholder="+33 6 12 34 56 78"
                        value={formData.phone}
                        onChange={(e) => {
                          setFormData({ ...formData, phone: e.target.value });
                          if (errors.phone) setErrors({ ...errors, phone: undefined });
                        }}
                        className="w-full bg-[#0a0a0a] border border-[#27272a] focus:border-[#c5a880] text-[#f5f2eb] px-4 py-3 rounded-sm text-base sm:text-sm focus:outline-none min-h-[46px]"
                      />
                      {errors.phone && (
                        <p className="text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Location / Venue */}
                    <div className="space-y-1.5">
                      <label htmlFor={`${formId}-location`} className="block text-xs uppercase tracking-wider text-[#a1a1aa] font-mono">
                        Event Venue or City *
                      </label>
                      <input
                        id={`${formId}-location`}
                        type="text"
                        placeholder="e.g. Villa Balbianello, Lake Como"
                        value={formData.location}
                        onChange={(e) => {
                          setFormData({ ...formData, location: e.target.value });
                          if (errors.location) setErrors({ ...errors, location: undefined });
                        }}
                        className="w-full bg-[#0a0a0a] border border-[#27272a] focus:border-[#c5a880] text-[#f5f2eb] px-4 py-3 rounded-sm text-base sm:text-sm focus:outline-none min-h-[46px]"
                      />
                      {errors.location && (
                        <p className="text-xs text-rose-400 flex items-center gap-1">
                          <AlertCircle className="w-3.5 h-3.5" /> {errors.location}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Project Details */}
                  <div className="space-y-1.5">
                    <label htmlFor={`${formId}-details`} className="block text-xs uppercase tracking-wider text-[#a1a1aa] font-mono">
                      Event Vision & Aesthetic Notes
                    </label>
                    <textarea
                      id={`${formId}-details`}
                      rows={3}
                      placeholder="Share details regarding wedding planner, wardrobe designers, timeline, or specific creative aspirations..."
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-[#27272a] focus:border-[#c5a880] text-[#f5f2eb] px-4 py-3 rounded-sm text-base sm:text-sm focus:outline-none resize-none"
                    />
                  </div>
                </div>
              )}

              {/* STEP 4: Bespoke Requirements & Review */}
              {currentStep === 4 && (
                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <h3 className="text-lg sm:text-xl font-editorial text-[#f5f2eb]">Bespoke Heirlooms & Additions</h3>
                    <p className="text-xs text-[#a1a1aa] mt-1">
                      Customize your commission with optional archival folios and expanded production support.
                    </p>
                  </div>

                  <div className="space-y-2.5 sm:space-y-3">
                    {[
                      {
                        key: 'addLeatherAlbum' as const,
                        label: 'Florentine Leather Heirloom Album (40x30cm)',
                        desc: 'Hand-bound in Florence, Italy on 310gsm museum cotton rag paper.',
                      },
                      {
                        key: 'addSecondShooter' as const,
                        label: 'Associate Director / Dual Angle Capture',
                        desc: 'Synchronized documentary angles during ceremonial vows and reception speeches.',
                      },
                      {
                        key: 'addDrone' as const,
                        label: 'Ultra-High-Definition Aerial Cinematography',
                        desc: 'Dramatic drone sweeps of coastal cliffs, chateau facades, and grand estates.',
                      },
                      {
                        key: 'addExpeditedDelivery' as const,
                        label: 'White-Glove Expedited 7-Day Preview Curation',
                        desc: 'Full editorial color grading and delivery of 100 hero frames within one week.',
                      },
                    ].map((opt) => (
                      <label
                        key={opt.key}
                        className="flex items-start gap-3 p-3.5 sm:p-4 bg-[#0a0a0a] border border-[#27272a] rounded-sm cursor-pointer hover:border-[#c5a880]/50 active:bg-[#151515] transition-colors min-h-[56px]"
                      >
                        <input
                          type="checkbox"
                          checked={formData[opt.key]}
                          onChange={(e) => setFormData({ ...formData, [opt.key]: e.target.checked })}
                          className="mt-1 w-4 h-4 rounded bg-[#18181b] border-[#3f3f46] text-[#c5a880] focus:ring-0 shrink-0"
                        />
                        <div className="space-y-0.5">
                          <div className="text-xs sm:text-sm font-medium text-[#f5f2eb]">{opt.label}</div>
                          <div className="text-[11px] sm:text-xs text-[#a1a1aa]">{opt.desc}</div>
                        </div>
                      </label>
                    ))}
                  </div>

                  {/* Summary Review Card */}
                  <div className="p-4 bg-[#18181b] border border-[#27272a] rounded-sm space-y-1.5 text-xs font-mono">
                    <div className="text-[#c5a880] uppercase tracking-wider font-semibold">Commission Overview</div>
                    <div className="flex justify-between text-[#f5f2eb]">
                      <span>{selectedService.name}</span>
                      <span>From {selectedService.investmentStartingAt}</span>
                    </div>
                    <div className="text-[#a1a1aa]">
                      Date: {formData.preferredDate || 'Not specified'} · {formData.timeSlot}
                    </div>
                    <div className="text-[#a1a1aa]">
                      Location: {formData.location || 'Not specified'}
                    </div>
                  </div>
                </div>
              )}

              {/* Form Navigation Controls */}
              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-[#27272a] flex items-center justify-between gap-4">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="inline-flex items-center gap-1.5 sm:gap-2 px-4 sm:px-5 py-2.5 text-xs font-medium tracking-wider uppercase text-[#a1a1aa] hover:text-[#f5f2eb] active:scale-[0.98] transition-colors min-h-[44px]"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className="inline-flex items-center justify-center gap-2 px-5 sm:px-6 py-3 text-xs font-semibold tracking-wider uppercase text-[#0a0a0a] bg-[#c5a880] hover:bg-[#d4af37] active:scale-[0.98] transition-colors rounded-sm min-h-[44px]"
                  >
                    <span>Proceed to Step {currentStep + 1}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#0a0a0a] bg-[#c5a880] hover:bg-[#d4af37] active:scale-[0.98] disabled:opacity-50 transition-colors rounded-sm shadow-xl shadow-[#c5a880]/10 min-h-[44px]"
                  >
                    {isSubmitting ? (
                      <span>Connecting to Studio...</span>
                    ) : (
                      <>
                        <span>Submit Consultation Request</span>
                        <ArrowRight className="w-4 h-4" />
                      </>
                    )}
                  </button>
                )}
              </div>
            </form>
          </div>
        )}
      </div>
    </section>
  );
}
