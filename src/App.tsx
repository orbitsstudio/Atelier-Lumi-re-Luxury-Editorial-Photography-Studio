import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import PortfolioGallery from './components/PortfolioGallery';
import LightboxModal from './components/LightboxModal';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import TestimonialsSection from './components/TestimonialsSection';
import BookingSystem from './components/BookingSystem';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CustomCursor from './components/CustomCursor';
import { GALLERY_ITEMS, GalleryItem } from './data/photographyData';

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<GalleryItem | null>(null);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>(undefined);
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  // Initial cinematic entrance
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsInitialLoading(false);
    }, 900);
    return () => clearTimeout(timer);
  }, []);

  // Scroll spy to update active nav link
  useEffect(() => {
    const sections = ['hero', 'gallery', 'about', 'services', 'philosophy', 'booking', 'contact'];
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const targetElement = document.getElementById(sectionId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookSession = (serviceId?: string) => {
    if (serviceId) {
      setBookingServiceId(serviceId);
    }
    handleNavigate('booking');
  };

  const handleCommissionStyle = (item: GalleryItem) => {
    // Map item category to relevant service if applicable
    const categoryToServiceMap: Record<string, string> = {
      wedding: 'haute-wedding',
      'pre-wedding': 'pre-wedding',
      fashion: 'fashion-editorial',
      portrait: 'fine-portrait',
      'luxury-events': 'luxury-events',
      commercial: 'commercial-architectural',
    };
    const targetService = categoryToServiceMap[item.category] || 'haute-wedding';
    setBookingServiceId(targetService);
    handleNavigate('booking');
  };

  return (
    <div className="relative min-h-screen bg-[#0a0a0a] text-[#f5f2eb] font-sans selection:bg-[#c5a880] selection:text-[#0a0a0a]">
      {/* Desktop Luxury Custom Cursor */}
      <CustomCursor />

      {/* Subtle Initial Brand Loading Reveal */}
      {isInitialLoading && (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#0a0a0a] text-[#f5f2eb] transition-opacity duration-700">
          <div className="text-center space-y-3">
            <div className="text-2xl sm:text-3xl font-editorial tracking-[0.25em] uppercase font-light text-[#f5f2eb]">
              <span>ATELIER</span> <span className="text-[#c5a880] italic">LUMIÈRE</span>
            </div>
            <div className="text-xs font-mono tracking-widest text-[#a1a1aa] uppercase">
              Paris · Lake Como · New York
            </div>
            <div className="w-12 h-[1px] bg-[#c5a880]/60 mx-auto mt-4 animate-pulse" />
          </div>
        </div>
      )}

      {/* Top Bar Contract Navigation */}
      <Navigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onBookClick={() => handleBookSession()}
      />

      {/* Home / Hero Section */}
      <HeroSection
        onExplorePortfolio={() => handleNavigate('gallery')}
        onBookSession={() => handleBookSession()}
      />

      {/* Visual Portfolio & Gallery with 8 Categories */}
      <PortfolioGallery
        onSelectItem={(item) => setSelectedLightboxItem(item)}
        onBookCommission={(cat) => handleBookSession(cat ? 'haute-wedding' : undefined)}
      />

      {/* About The Photographer & Creative Direction */}
      <AboutSection />

      {/* Services & Investment Collections */}
      <ServicesSection
        onSelectServiceForBooking={(serviceId) => handleBookSession(serviceId)}
      />

      {/* Testimonials & 4-Stage Atelier Creative Process */}
      <TestimonialsSection />

      {/* Functional Booking & Consultation System */}
      <BookingSystem
        key={bookingServiceId || 'default-booking'}
        initialServiceId={bookingServiceId}
      />

      {/* Contact Section & Concierge Desks */}
      <ContactSection onOpenBooking={() => handleBookSession()} />

      {/* Luxury Footer */}
      <Footer
        onNavigate={handleNavigate}
        onBookClick={() => handleBookSession()}
      />

      {/* High-Resolution Lightbox Modal */}
      {selectedLightboxItem && (
        <LightboxModal
          item={selectedLightboxItem}
          allItems={GALLERY_ITEMS}
          onClose={() => setSelectedLightboxItem(null)}
          onNavigate={(newItem) => setSelectedLightboxItem(newItem)}
          onInquireStyle={handleCommissionStyle}
        />
      )}
    </div>
  );
}
