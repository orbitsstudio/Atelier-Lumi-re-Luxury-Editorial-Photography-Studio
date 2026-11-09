import { useState, useId } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, Check, ArrowUpRight, Clock, Globe } from 'lucide-react';

interface ContactSectionProps {
  onOpenBooking: () => void;
}

export default function ContactSection({ onOpenBooking }: ContactSectionProps) {
  const formId = useId();
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Wedding Commission Inquiry',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formState.name || !formState.email || !formState.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 bg-[#0c0c0c] text-[#f5f2eb] relative border-t border-[#27272a]/70">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-16 space-y-3">
          <div className="text-xs tracking-[0.24em] uppercase text-[#c5a880] font-medium">
            Direct Concierge · Private Inquiries
          </div>
          <h2 className="text-3xl sm:text-5xl font-editorial font-light tracking-tight text-[#f5f2eb]">
            Begin the Dialogue
          </h2>
          <p className="text-sm sm:text-base text-[#a1a1aa] font-light leading-relaxed">
            Whether inquiring about international wedding commissions, editorial fashion campaigns, or private salon portraits, we welcome your correspondence.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7 bg-[#121212] border border-[#27272a] rounded-sm p-8 sm:p-10 shadow-2xl">
            {submitted ? (
              <div className="py-12 text-center space-y-4 animate-in fade-in">
                <div className="w-12 h-12 rounded-full bg-[#c5a880]/10 border border-[#c5a880] flex items-center justify-center mx-auto text-[#c5a880]">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-editorial text-[#f5f2eb]">Message Received</h3>
                <p className="text-sm text-[#a1a1aa] max-w-md mx-auto">
                  Thank you for reaching out, {formState.name}. Julien Vance and our studio concierge will review your inquiry and reply within 24 hours.
                </p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormState({
                      name: '',
                      email: '',
                      phone: '',
                      subject: 'Wedding Commission Inquiry',
                      message: '',
                    });
                  }}
                  className="mt-4 px-6 py-2.5 text-xs font-mono uppercase tracking-widest text-[#c5a880] hover:text-[#e5d3b3] transition-colors"
                >
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor={`${formId}-name`} className="block text-xs uppercase tracking-wider text-[#a1a1aa] font-mono">
                      Your Name *
                    </label>
                    <input
                      id={`${formId}-name`}
                      required
                      type="text"
                      placeholder="e.g. Eleanor Vance"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-[#27272a] focus:border-[#c5a880] text-[#f5f2eb] px-4 py-3 rounded-sm text-sm focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor={`${formId}-email`} className="block text-xs uppercase tracking-wider text-[#a1a1aa] font-mono">
                      Email Address *
                    </label>
                    <input
                      id={`${formId}-email`}
                      required
                      type="email"
                      placeholder="client@domain.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-[#27272a] focus:border-[#c5a880] text-[#f5f2eb] px-4 py-3 rounded-sm text-sm focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor={`${formId}-phone`} className="block text-xs uppercase tracking-wider text-[#a1a1aa] font-mono">
                      Telephone / WhatsApp
                    </label>
                    <input
                      id={`${formId}-phone`}
                      type="tel"
                      placeholder="+33 1 42 68 55 00"
                      value={formState.phone}
                      onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-[#27272a] focus:border-[#c5a880] text-[#f5f2eb] px-4 py-3 rounded-sm text-sm focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label htmlFor={`${formId}-commission`} className="block text-xs uppercase tracking-wider text-[#a1a1aa] font-mono">
                      Commission Scope
                    </label>
                    <select
                      id={`${formId}-commission`}
                      value={formState.subject}
                      onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                      className="w-full bg-[#0a0a0a] border border-[#27272a] focus:border-[#c5a880] text-[#f5f2eb] px-4 py-3 rounded-sm text-sm focus:outline-none"
                    >
                      <option value="Wedding Commission Inquiry">Haute Wedding Commission</option>
                      <option value="Pre-Wedding Destination Inquiry">Pre-Wedding & Destination</option>
                      <option value="Editorial Fashion Campaign">Editorial Fashion & Campaign</option>
                      <option value="Fine Art Portraiture Sitting">Fine Art Portrait Sitting</option>
                      <option value="Private Gala / Royal Event">Private Gala / Royal Event</option>
                      <option value="Architectural / Commercial">Commercial & Architectural</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor={`${formId}-message`} className="block text-xs uppercase tracking-wider text-[#a1a1aa] font-mono">
                    Message & Event Details *
                  </label>
                  <textarea
                    id={`${formId}-message`}
                    required
                    rows={4}
                    placeholder="Tell us about your celebration, date, location, or private artistic project..."
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    className="w-full bg-[#0a0a0a] border border-[#27272a] focus:border-[#c5a880] text-[#f5f2eb] px-4 py-3 rounded-sm text-sm focus:outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold tracking-[0.18em] uppercase text-[#0a0a0a] bg-[#c5a880] hover:bg-[#d4af37] disabled:opacity-50 transition-colors rounded-sm shadow-xl shadow-[#c5a880]/15"
                >
                  {isSubmitting ? (
                    <span>Transmitting Message...</span>
                  ) : (
                    <>
                      <span>Transmit Concierge Inquiry</span>
                      <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Studio Locations & Concierge Touchpoints */}
          <div className="lg:col-span-5 space-y-8">
            {/* Atelier Locations */}
            <div className="space-y-6">
              <div className="p-6 bg-[#121212] border border-[#27272a] rounded-sm space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#c5a880]">
                  <span>PRIMARY ATELIER</span>
                  <span>PARIS</span>
                </div>
                <h4 className="text-lg font-editorial text-[#f5f2eb]">Avenue Montaigne Salon</h4>
                <div className="text-xs text-[#a1a1aa] leading-relaxed space-y-1">
                  <p>450 Avenue Montaigne, 75008 Paris, France</p>
                  <p className="text-[#71717a]">By private appointment only</p>
                </div>
              </div>

              <div className="p-6 bg-[#121212] border border-[#27272a] rounded-sm space-y-3">
                <div className="flex items-center justify-between text-xs font-mono text-[#c5a880]">
                  <span>AMERICAN SALON</span>
                  <span>NEW YORK</span>
                </div>
                <h4 className="text-lg font-editorial text-[#f5f2eb]">SoHo Natural Light Loft</h4>
                <div className="text-xs text-[#a1a1aa] leading-relaxed space-y-1">
                  <p>72 Mercer Street, SoHo, New York, NY 10012</p>
                  <p className="text-[#71717a]">Seasonal residency & consultations</p>
                </div>
              </div>
            </div>

            {/* Direct Channels */}
            <div className="p-6 bg-[#121212] border border-[#27272a] rounded-sm space-y-4 text-xs font-mono">
              <div className="text-[#e5d3b3] uppercase tracking-wider">Direct Concierge Desks</div>

              <a
                href="mailto:concierge@atelierlumiere.com"
                className="flex items-center justify-between text-[#f5f2eb] hover:text-[#c5a880] transition-colors py-1.5 border-b border-[#27272a]"
              >
                <span className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#c5a880]" />
                  <span>concierge@atelierlumiere.com</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#71717a]" />
              </a>

              <a
                href="tel:+33142685500"
                className="flex items-center justify-between text-[#f5f2eb] hover:text-[#c5a880] transition-colors py-1.5 border-b border-[#27272a]"
              >
                <span className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#c5a880]" />
                  <span>+33 1 42 68 55 00</span>
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#71717a]" />
              </a>

              <div className="flex items-center justify-between text-[#a1a1aa] py-1.5 border-b border-[#27272a]">
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#c5a880]" />
                  <span>Mon – Sat: 09:30 – 19:00 CET</span>
                </span>
                <span>Paris Time</span>
              </div>
            </div>

            {/* WhatsApp Quick Action Button */}
            <a
              href="https://wa.me/33142685500?text=Hello%20Atelier%20Lumière%20Concierge,%20I%20would%20like%20to%20inquire%20about%20a%20photography%20commission."
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2.5 p-4 bg-[#1e293b]/50 border border-[#334155] hover:border-[#22c55e]/50 hover:bg-[#22c55e]/10 text-[#f5f2eb] rounded-sm transition-all duration-200 text-xs font-mono uppercase tracking-wider"
            >
              <MessageSquare className="w-4 h-4 text-[#22c55e]" />
              <span>Instant WhatsApp Concierge Chat</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
