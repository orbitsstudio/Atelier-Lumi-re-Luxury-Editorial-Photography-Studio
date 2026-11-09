import { useState } from 'react';
import { ArrowDown, ArrowUpRight, Camera, Sparkles } from 'lucide-react';
import { HERO_IMAGE } from '../data/photographyData';

interface HeroSectionProps {
  onExplorePortfolio: () => void;
  onBookSession: () => void;
}

export default function HeroSection({ onExplorePortfolio, onBookSession }: HeroSectionProps) {
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <section id="hero" className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-[#0a0a0a]">
      {/* Background Image Container with Ken Burns / Cinematic Motion */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={HERO_IMAGE}
          alt="Palais de Versailles Haute Couture Wedding Photography by Atelier Lumière"
          referrerPolicy="no-referrer"
          onLoad={() => setImageLoaded(true)}
          className={`w-full h-full object-cover object-center scale-105 transition-all duration-1000 ease-out motion-safe:animate-pulse-subtle ${
            imageLoaded ? 'opacity-90 filter brightness-[0.78] contrast-[1.05]' : 'opacity-0'
          }`}
          style={{
            animation: 'kenburns 24s ease-in-out infinite alternate',
          }}
        />

        {/* Fallback styling if image is loading */}
        {!imageLoaded && (
          <div className="w-full h-full bg-gradient-to-br from-[#121212] via-[#1a1815] to-[#0a0a0a] flex items-center justify-center">
            <div className="text-center space-y-2 opacity-40">
              <Camera className="w-10 h-10 mx-auto text-[#c5a880]" />
              <p className="text-xs uppercase tracking-widest text-[#e5d3b3]">Loading Master Visual...</p>
            </div>
          </div>
        )}

        {/* Measured Luxury Contrast Scrims */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/50 to-[#0a0a0a]/30 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/90 via-[#0a0a0a]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 luxury-noise pointer-events-none opacity-40" />
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 sm:px-8 pt-36 sm:pt-44 pb-16 w-full my-auto">
        <div className="max-w-3xl space-y-8">
          {/* Unboxed Metadata Kicker (Zero-pill discipline) */}
          <div className="flex items-center gap-3 text-xs sm:text-sm tracking-[0.24em] uppercase text-[#c5a880] font-medium">
            <span>PARIS</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span>LAKE COMO</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span>NEW YORK</span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span>WORLDWIDE</span>
          </div>

          {/* Headline: "Capturing Moments. Creating Legacies." */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-light tracking-tight text-[#f5f2eb] leading-[1.08] text-balance">
              Capturing Moments.{' '}
              <span className="italic font-normal text-[#e5d3b3] block sm:inline">
                Creating Legacies.
              </span>
            </h1>
          </div>

          {/* Short Premium Brand Introduction */}
          <p className="text-base sm:text-lg text-[#f5f2eb]/80 font-light leading-relaxed max-w-2xl text-balance">
            An elite Parisian photography atelier sculpting natural light, genuine emotion, and medium-format analog depth into generational fine-art heirlooms for the world’s most discerning couples, houses, and visionaries.
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
            <button
              onClick={onExplorePortfolio}
              className="inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs font-semibold tracking-[0.18em] uppercase text-[#0a0a0a] bg-[#c5a880] hover:bg-[#d4af37] active:scale-[0.99] transition-all duration-200 rounded-sm shadow-xl shadow-[#c5a880]/15"
            >
              <span>Explore Portfolio</span>
              <ArrowDown className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={onBookSession}
              className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-medium tracking-[0.18em] uppercase text-[#f5f2eb] border border-[#f5f2eb]/30 hover:border-[#c5a880] hover:text-[#c5a880] hover:bg-[#c5a880]/5 transition-all duration-200 rounded-sm"
            >
              <span>Book a Session</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Claim-to-Proof Adjacency Strip (Full-width below hero split) */}
      <div className="relative z-10 border-t border-[#27272a]/70 bg-[#0a0a0a]/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 py-5">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="space-y-0.5">
              <span className="text-xs uppercase tracking-[0.2em] text-[#a1a1aa] block">Experience</span>
              <span className="text-base sm:text-lg font-editorial text-[#f5f2eb] font-normal tracking-wide">
                16+ Years Mastery
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-xs uppercase tracking-[0.2em] text-[#a1a1aa] block">Reach</span>
              <span className="text-base sm:text-lg font-editorial text-[#f5f2eb] font-normal tracking-wide">
                28 Global Destinations
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-xs uppercase tracking-[0.2em] text-[#a1a1aa] block">Medium</span>
              <span className="text-base sm:text-lg font-editorial text-[#f5f2eb] font-normal tracking-wide">
                Hasselblad 100MP Optics
              </span>
            </div>
            <div className="space-y-0.5">
              <span className="text-xs uppercase tracking-[0.2em] text-[#a1a1aa] block">Artifacts</span>
              <span className="text-base sm:text-lg font-editorial text-[#f5f2eb] font-normal tracking-wide">
                Florentine Leather Folios
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
