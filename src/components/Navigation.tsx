import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight } from 'lucide-react';

interface NavigationProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onBookClick: () => void;
}

export default function Navigation({ activeSection, onNavigate, onBookClick }: NavigationProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { id: 'gallery', label: 'Collections' },
    { id: 'about', label: 'Photographer' },
    { id: 'services', label: 'Services' },
    { id: 'philosophy', label: 'Philosophy' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0a0a0a]/95 backdrop-blur-md border-b border-[#27272a]/70 py-3.5 sm:py-4 shadow-xl'
            : 'bg-gradient-to-b from-black/85 via-black/40 to-transparent py-4 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 flex items-center justify-between gap-4 sm:gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="group text-left text-lg sm:text-2xl font-editorial tracking-[0.16em] sm:tracking-[0.2em] uppercase font-light text-[#f5f2eb] whitespace-nowrap shrink-0 transition-opacity hover:opacity-85 py-1 min-h-[44px] flex items-center"
            aria-label="Atelier Lumière Home"
          >
            <span className="font-medium text-[#f5f2eb]">ATELIER</span>{' '}
            <span className="font-light text-[#c5a880] italic ml-1">LUMIÈRE</span>
          </button>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-xs tracking-[0.16em] uppercase font-medium text-[#f5f2eb]/75">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-2 whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-[#f5f2eb] ${
                    isActive ? 'text-[#c5a880]' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-1 left-0 right-0 h-[1px] bg-[#c5a880]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#0a0a0a] bg-[#c5a880] hover:bg-[#d4af37] active:scale-[0.98] transition-all duration-200 rounded-sm whitespace-nowrap shrink-0 shadow-lg shadow-[#c5a880]/10 min-h-[44px]"
            >
              <span>Book a Session</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger button - strictly >= 44x44px touch target */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 flex items-center justify-center text-[#f5f2eb] hover:text-[#c5a880] active:scale-95 transition-colors focus:outline-none rounded-sm border border-transparent hover:border-[#27272a]"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer (Responsive across 360px - 768px) */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-30 bg-[#0a0a0a]/98 backdrop-blur-2xl md:hidden pt-24 px-6 flex flex-col justify-between pb-8 animate-in fade-in duration-200 overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation"
        >
          <div className="flex flex-col space-y-2 pt-2">
            <span className="text-[11px] tracking-[0.25em] text-[#c5a880] uppercase font-mono pb-2 border-b border-[#27272a]/70">
              Navigation Menu
            </span>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left text-xl sm:text-2xl font-editorial tracking-wider uppercase transition-colors py-3 min-h-[48px] flex items-center border-b border-[#1c1c1f] ${
                  activeSection === link.id ? 'text-[#c5a880]' : 'text-[#f5f2eb] hover:text-[#c5a880]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-6 border-t border-[#27272a] space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full min-h-[48px] flex items-center justify-center gap-2 py-3.5 px-6 text-xs font-semibold tracking-[0.18em] uppercase text-[#0a0a0a] bg-[#c5a880] hover:bg-[#d4af37] active:scale-[0.98] transition-colors rounded-sm shadow-lg"
            >
              <span>Book a Session</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <div className="text-center text-[11px] text-[#a1a1aa] font-mono tracking-widest pt-1">
              PARIS · LAKE COMO · NEW YORK
            </div>
          </div>
        </div>
      )}
    </>
  );
}
