import { ArrowUp, Instagram, Globe, Sparkles } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onBookClick: () => void;
}

export default function Footer({ onNavigate, onBookClick }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#080808] text-[#f5f2eb] border-t border-[#27272a] pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16 border-b border-[#27272a]">
          {/* Brand & Editorial Ethos */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-2xl font-editorial tracking-[0.2em] uppercase font-light text-[#f5f2eb]">
              <span>ATELIER</span> <span className="text-[#c5a880] italic">LUMIÈRE</span>
            </div>
            <p className="text-xs sm:text-sm text-[#a1a1aa] font-light leading-relaxed max-w-sm">
              Capturing moments. Creating legacies. An elite photography atelier sculpting light, intimate emotion, and medium-format analog depth into timeless fine-art heirlooms.
            </p>
            <div className="pt-2 text-xs font-mono text-[#c5a880] tracking-widest uppercase">
              PARIS · LAKE COMO · NEW YORK · WORLDWIDE
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-mono tracking-widest uppercase text-[#e5d3b3] block">
              Atelier Collections
            </span>
            <ul className="space-y-2 text-xs font-sans text-[#a1a1aa]">
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#f5f2eb] transition-colors"
                >
                  Haute Nuptials & Weddings
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#f5f2eb] transition-colors"
                >
                  Editorial Fashion & Campaigns
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#f5f2eb] transition-colors"
                >
                  Monochrome Fine Art Portraits
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('gallery')}
                  className="hover:text-[#f5f2eb] transition-colors"
                >
                  Architectural & Commercial Still Life
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#f5f2eb] transition-colors"
                >
                  Investment & Package Inclusions
                </button>
              </li>
            </ul>
          </div>

          {/* Studio Desks & Appointments */}
          <div className="lg:col-span-4 space-y-3">
            <span className="text-xs font-mono tracking-widest uppercase text-[#e5d3b3] block">
              Private Salon Inquiries
            </span>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              Appointments in Paris (Avenue Montaigne) and New York (Mercer Street) are scheduled twelve months in advance.
            </p>
            <div className="pt-2">
              <button
                onClick={onBookClick}
                className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#0a0a0a] bg-[#c5a880] hover:bg-[#d4af37] transition-colors rounded-sm"
              >
                Inquire For Availability
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Quiet Copyright & Social Marks */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#71717a]">
          <div>
            © {new Date().getFullYear()} Atelier Lumière Studio Paris. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-[#c5a880] transition-colors flex items-center gap-1.5"
            >
              <Instagram className="w-3.5 h-3.5" />
              <span>Instagram</span>
            </a>
            <span aria-hidden="true">·</span>
            <span className="hover:text-[#f5f2eb] transition-colors">Vogue Weddings Archival Contributor</span>
            <span aria-hidden="true">·</span>
            <button
              onClick={scrollToTop}
              className="hover:text-[#c5a880] transition-colors flex items-center gap-1"
              aria-label="Scroll back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
