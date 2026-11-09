import { useState } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { TESTIMONIALS } from '../data/photographyData';

export default function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const current = TESTIMONIALS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section id="philosophy" className="py-24 sm:py-32 bg-[#0c0c0c] text-[#f5f2eb] relative border-t border-b border-[#27272a]/60">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <div className="text-xs tracking-[0.24em] uppercase text-[#c5a880] font-medium">
            Client Words & Critical Acclaim
          </div>
          <h2 className="text-3xl sm:text-5xl font-editorial font-light tracking-tight text-[#f5f2eb]">
            Echoes of Trust & Artistry
          </h2>
        </div>

        {/* Featured Testimonial Card Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative p-8 sm:p-14 bg-[#121212] border border-[#27272a] rounded-sm shadow-2xl">
            <Quote className="w-10 h-10 text-[#c5a880]/30 mb-6" />

            <blockquote className="text-lg sm:text-2xl font-editorial font-light text-[#f5f2eb] leading-relaxed italic mb-8">
              "{current.quote}"
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-6 border-t border-[#27272a]">
              <div>
                <h3 className="text-lg font-editorial text-[#f5f2eb]">{current.clientName}</h3>
                <p className="text-xs text-[#c5a880] font-mono tracking-wider uppercase mt-0.5">
                  {current.roleOrOccasion} · {current.location} ({current.year})
                </p>
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="p-2.5 rounded-full border border-[#27272a] text-[#f5f2eb] hover:border-[#c5a880] hover:text-[#c5a880] transition-colors"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <span className="text-xs font-mono text-[#a1a1aa]">
                  {currentIndex + 1} / {TESTIMONIALS.length}
                </span>
                <button
                  onClick={handleNext}
                  className="p-2.5 rounded-full border border-[#27272a] text-[#f5f2eb] hover:border-[#c5a880] hover:text-[#c5a880] transition-colors"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Stage Bespoke Process Ribbon */}
        <div className="mt-24 pt-16 border-t border-[#27272a]">
          <div className="text-xs tracking-[0.24em] uppercase text-[#c5a880] font-mono mb-8 text-center sm:text-left">
            The Bespoke Four-Stage Atelier Journey
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#121212] border border-[#27272a] rounded-sm space-y-2">
              <span className="text-xs font-mono text-[#c5a880]">Phase 01</span>
              <h4 className="text-lg font-editorial text-[#f5f2eb]">Discovery & Moodboard</h4>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                A private consultation in Paris or via digital salon to curate lighting themes, wardrobe palettes, and venue geometry.
              </p>
            </div>

            <div className="p-6 bg-[#121212] border border-[#27272a] rounded-sm space-y-2">
              <span className="text-xs font-mono text-[#c5a880]">Phase 02</span>
              <h4 className="text-lg font-editorial text-[#f5f2eb]">The Photographic Day</h4>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Quiet, discreet documentation using medium-format cameras, balancing spontaneous tender glances with monumental architectural portraits.
              </p>
            </div>

            <div className="p-6 bg-[#121212] border border-[#27272a] rounded-sm space-y-2">
              <span className="text-xs font-mono text-[#c5a880]">Phase 03</span>
              <h4 className="text-lg font-editorial text-[#f5f2eb]">Darkroom File Mastering</h4>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Every selected frame is individually graded for skin luminosity, 16-bit shadow tones, and timeless fine-art color balance.
              </p>
            </div>

            <div className="p-6 bg-[#121212] border border-[#27272a] rounded-sm space-y-2">
              <span className="text-xs font-mono text-[#c5a880]">Phase 04</span>
              <h4 className="text-lg font-editorial text-[#f5f2eb]">The Heirloom Presentation</h4>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                Your private encrypted digital cloud archive followed by white-glove delivery of hand-bound Florentine leather heirloom volumes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
