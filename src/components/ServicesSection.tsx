import { useState } from 'react';
import { ArrowUpRight, Check, Sparkles, Clock, ShieldCheck, ChevronRight } from 'lucide-react';
import { SERVICES, ServicePackage } from '../data/photographyData';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export default function ServicesSection({ onSelectServiceForBooking }: ServicesSectionProps) {
  const [activeServiceId, setActiveServiceId] = useState<string>(SERVICES[0].id);

  const selectedService = SERVICES.find((s) => s.id === activeServiceId) || SERVICES[0];

  return (
    <section id="services" className="py-24 sm:py-32 bg-[#0a0a0a] text-[#f5f2eb] relative">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 border-b border-[#27272a] pb-8">
          <div className="space-y-3 max-w-2xl">
            <div className="text-xs tracking-[0.24em] uppercase text-[#c5a880] font-medium">
              Bespoke Commissions · Investment Guide
            </div>
            <h2 className="text-3xl sm:text-5xl font-editorial font-light tracking-tight text-[#f5f2eb]">
              Photography Services & Collections
            </h2>
            <p className="text-sm sm:text-base text-[#a1a1aa] font-light leading-relaxed">
              Every commission is tailored to your unique aesthetic requirements, incorporating private consultations, medium-format capture, and museum-grade archival deliverables.
            </p>
          </div>

          <div className="text-right text-xs text-[#a1a1aa] font-mono">
            <span>Standard of Excellence</span>
            <div className="text-[#c5a880] mt-0.5">Bespoke Inclusions Guaranteed</div>
          </div>
        </div>

        {/* Services Navigation Selector (Luxury Editorial List) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Interactive Service Directory */}
          <div className="lg:col-span-5 space-y-2">
            {SERVICES.map((srv) => {
              const isCurrent = srv.id === activeServiceId;
              return (
                <button
                  key={srv.id}
                  onClick={() => setActiveServiceId(srv.id)}
                  className={`w-full text-left p-5 rounded-sm transition-all duration-200 border flex items-center justify-between group ${
                    isCurrent
                      ? 'bg-[#18181b] border-[#c5a880] shadow-lg'
                      : 'bg-[#121212] border-[#27272a] hover:border-[#3f3f46] hover:bg-[#151515]'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-[#c5a880]">{srv.number}.</span>
                      <span className="text-xs uppercase tracking-widest text-[#a1a1aa] font-mono">
                        {srv.category}
                      </span>
                    </div>
                    <div className={`text-lg font-editorial transition-colors ${
                      isCurrent ? 'text-[#f5f2eb]' : 'text-[#d4d4d8] group-hover:text-[#f5f2eb]'
                    }`}>
                      {srv.name}
                    </div>
                  </div>

                  <div className="text-right pl-4">
                    <span className="text-xs font-mono text-[#e5d3b3] block">
                      From {srv.investmentStartingAt}
                    </span>
                    <ChevronRight className={`w-4 h-4 ml-auto mt-1 transition-transform ${
                      isCurrent ? 'text-[#c5a880] translate-x-1' : 'text-[#71717a]'
                    }`} />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Column: Detailed Active Service Spotlight Card */}
          <div className="lg:col-span-7 bg-[#121212] border border-[#27272a] rounded-sm overflow-hidden shadow-2xl">
            {/* Service Visual Preview */}
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={selectedService.imageSrc}
                alt={selectedService.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#121212] via-[#121212]/40 to-transparent" />
              <div className="absolute top-4 left-4 z-10 px-3 py-1 bg-black/70 backdrop-blur-md border border-white/10 text-xs font-mono text-[#c5a880] tracking-wider uppercase rounded-sm">
                Collection {selectedService.number}
              </div>
            </div>

            {/* Service Details & Inclusions */}
            <div className="p-6 sm:p-10 space-y-8">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 border-b border-[#27272a] pb-6">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-editorial text-[#f5f2eb]">
                    {selectedService.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#c5a880] mt-1 font-mono">
                    {selectedService.subtitle}
                  </p>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-xs font-mono text-[#a1a1aa] block uppercase tracking-wider">
                    Investment Guide
                  </span>
                  <span className="text-2xl font-editorial text-[#f5f2eb]">
                    Starting at {selectedService.investmentStartingAt}
                  </span>
                </div>
              </div>

              {/* Narrative description */}
              <p className="text-sm sm:text-base text-[#a1a1aa] leading-relaxed font-light">
                {selectedService.description}
              </p>

              {/* Recommended for note */}
              <div className="p-4 bg-[#0a0a0a] border border-[#27272a] rounded-sm text-xs text-[#a1a1aa] flex items-start gap-3">
                <Sparkles className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                <div>
                  <span className="text-[#f5f2eb] font-medium">Curation Note: </span>
                  {selectedService.recommendedFor}
                </div>
              </div>

              {/* Deliverables & Inclusions Grid */}
              <div className="space-y-4">
                <h4 className="text-xs uppercase tracking-[0.2em] text-[#e5d3b3] font-mono">
                  What Is Included
                </h4>
                <div className="space-y-2.5">
                  {selectedService.deliverables.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#d4d4d8]">
                      <Check className="w-4 h-4 text-[#c5a880] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                  {selectedService.inclusions.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#a1a1aa]">
                      <Check className="w-4 h-4 text-[#c5a880]/70 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Booking CTAs */}
              <div className="pt-6 border-t border-[#27272a] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[#a1a1aa] font-mono flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-[#c5a880]" />
                  <span>Coverage: {selectedService.duration}</span>
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                  <button
                    onClick={() => onSelectServiceForBooking(selectedService.id)}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold tracking-[0.16em] uppercase text-[#0a0a0a] bg-[#c5a880] hover:bg-[#d4af37] active:scale-[0.99] transition-all duration-200 rounded-sm shadow-md"
                  >
                    <span>Book This Collection</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
