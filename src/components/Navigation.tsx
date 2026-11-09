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
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
            ? 'bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#27272a]/60 py-4 shadow-xl'
            : 'bg-gradient-to-b from-black/80 via-black/30 to-transparent py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="group text-left text-xl sm:text-2xl font-editorial tracking-[0.2em] uppercase font-light text-[#f5f2eb] whitespace-nowrap shrink-0 transition-opacity hover:opacity-80"
          >
            <span className="font-medium text-[#f5f2eb]">ATELIER</span>{' '}
            <span className="font-light text-[#c5a880] italic">LUMIÈRE</span>
          </button>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-xs tracking-[0.16em] uppercase font-medium text-[#f5f2eb]/70">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`relative py-1 whitespace-nowrap shrink-0 transition-colors duration-200 hover:text-[#f5f2eb] ${
                    isActive ? 'text-[#c5a880]' : ''
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1px] bg-[#c5a880]" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              onClick={onBookClick}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#0a0a0a] bg-[#c5a880] hover:bg-[#d4af37] active:scale-[0.98] transition-all duration-200 rounded-sm whitespace-nowrap shrink-0 shadow-lg shadow-[#c5a880]/10"
            >
              <span>Book a Session</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#f5f2eb] hover:text-[#c5a880] transition-colors focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-30 bg-[#0a0a0a]/95 backdrop-blur-xl md:hidden pt-28 px-8 flex flex-col justify-between pb-12 animate-in fade-in duration-200">
          <div className="flex flex-col space-y-6">
            <span className="text-[11px] tracking-[0.25em] text-[#c5a880] uppercase font-mono">
              Navigation Menu
            </span>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left text-2xl font-editorial tracking-wider uppercase transition-colors py-1 ${
                  activeSection === link.id ? 'text-[#c5a880]' : 'text-[#f5f2eb] hover:text-[#c5a880]'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-8 border-t border-[#27272a]/80 space-y-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onBookClick();
              }}
              className="w-full flex items-center justify-center gap-2 py-4 px-6 text-xs font-semibold tracking-[0.18em] uppercase text-[#0a0a0a] bg-[#c5a880] hover:bg-[#d4af37] transition-colors rounded-sm"
            >
              <span>Book a Session</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
            <div className="text-center text-xs text-[#a1a1aa] font-mono tracking-widest pt-2">
              PARIS · LAKE COMO · NEW YORK
            </div>
          </div>
        </div>
      )}
    </>
  );
}
