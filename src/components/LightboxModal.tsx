import { useEffect, useState, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, Info, ZoomIn, ZoomOut, MapPin, Calendar, Camera } from 'lucide-react';
import { GalleryItem } from '../data/photographyData';

interface LightboxModalProps {
  item: GalleryItem | null;
  allItems: GalleryItem[];
  onClose: () => void;
  onNavigate: (newItem: GalleryItem) => void;
  onInquireStyle?: (item: GalleryItem) => void;
}

export default function LightboxModal({
  item,
  allItems,
  onClose,
  onNavigate,
  onInquireStyle,
}: LightboxModalProps) {
  const [showInfo, setShowInfo] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  useEffect(() => {
    if (!item) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [item, allItems]);

  if (!item) return null;

  const currentIndex = allItems.findIndex((i) => i.id === item.id);
  const handlePrev = () => {
    const prevIndex = (currentIndex - 1 + allItems.length) % allItems.length;
    setIsZoomed(false);
    onNavigate(allItems[prevIndex]);
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % allItems.length;
    setIsZoomed(false);
    onNavigate(allItems[nextIndex]);
  };

  // Mobile Touch Swipe Handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isSignificantSwipe = Math.abs(distance) > 50;

    if (isSignificantSwipe) {
      if (distance > 0) {
        handleNext(); // swipe left
      } else {
        handlePrev(); // swipe right
      }
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/98 backdrop-blur-2xl animate-in fade-in duration-200 select-none"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Top Bar Controls */}
      <div className="absolute top-0 left-0 right-0 z-30 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 bg-gradient-to-b from-black/90 via-black/60 to-transparent">
        <div className="flex items-center gap-2 sm:gap-3 text-xs tracking-widest text-[#a1a1aa] font-mono">
          <span className="text-[#f5f2eb] font-semibold">{String(currentIndex + 1).padStart(2, '0')}</span>
          <span>/</span>
          <span>{String(allItems.length).padStart(2, '0')}</span>
          <span className="hidden sm:inline text-[#c5a880]">· {item.categoryLabel}</span>
        </div>

        <div className="flex items-center gap-1 sm:gap-3">
          <button
            onClick={() => setIsZoomed(!isZoomed)}
            className="w-10 h-10 flex items-center justify-center text-[#f5f2eb]/80 hover:text-[#f5f2eb] active:bg-white/10 rounded-full transition-colors"
            title={isZoomed ? 'Reset view' : 'Zoom into detail'}
            aria-label="Toggle zoom"
          >
            {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setShowInfo(!showInfo)}
            className={`w-10 h-10 flex items-center justify-center rounded-full transition-colors ${
              showInfo
                ? 'text-[#c5a880] bg-[#c5a880]/15'
                : 'text-[#f5f2eb]/80 hover:text-[#f5f2eb] active:bg-white/10'
            }`}
            title="Toggle details & EXIF panel"
            aria-label="Toggle details panel"
          >
            <Info className="w-5 h-5" />
          </button>

          <button
            onClick={onClose}
            className="w-11 h-11 flex items-center justify-center text-[#f5f2eb] hover:text-[#c5a880] active:bg-white/10 rounded-full transition-colors ml-1"
            title="Close viewer (Esc)"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Main Image Viewport */}
      <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-8 md:p-12 overflow-hidden">
        <div
          className={`relative max-w-full max-h-full transition-all duration-300 flex items-center justify-center ${
            isZoomed ? 'cursor-zoom-out scale-125 md:scale-135' : 'cursor-zoom-in'
          }`}
          onClick={() => setIsZoomed(!isZoomed)}
        >
          <img
            src={item.imageSrc}
            alt={item.title}
            referrerPolicy="no-referrer"
            className="max-h-[75vh] sm:max-h-[82vh] max-w-[94vw] object-contain shadow-2xl rounded-sm mx-auto select-none"
          />
        </div>
      </div>

      {/* Navigation Arrows (Thumbs friendly) */}
      <button
        onClick={handlePrev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-[#f5f2eb]/80 hover:text-[#f5f2eb] bg-black/40 hover:bg-black/70 backdrop-blur-sm rounded-full transition-all duration-200"
        aria-label="Previous photograph"
      >
        <ChevronLeft className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      <button
        onClick={handleNext}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 flex items-center justify-center text-[#f5f2eb]/80 hover:text-[#f5f2eb] bg-black/40 hover:bg-black/70 backdrop-blur-sm rounded-full transition-all duration-200"
        aria-label="Next photograph"
      >
        <ChevronRight className="w-6 h-6 sm:w-7 sm:h-7" />
      </button>

      {/* Bottom Technical & Editorial Information Drawer */}
      {showInfo && (
        <div className="absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black via-black/95 to-transparent pt-6 pb-6 px-4 sm:px-8 md:px-12 pointer-events-auto max-h-[45vh] overflow-y-auto">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 border-t border-[#27272a] pt-4">
            <div className="space-y-1.5 max-w-xl">
              <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-[#c5a880] tracking-wider uppercase font-medium">
                <span>{item.categoryLabel}</span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-[#a1a1aa]">
                  <MapPin className="w-3 h-3" /> {item.location}
                </span>
                <span aria-hidden="true">·</span>
                <span className="flex items-center gap-1 text-[#a1a1aa]">
                  <Calendar className="w-3 h-3" /> {item.year}
                </span>
              </div>

              <h2 className="text-lg sm:text-2xl font-editorial font-light text-[#f5f2eb]">
                {item.title}
              </h2>
              <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                {item.curatorNote}
              </p>
            </div>

            {/* EXIF Data Panel */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 text-xs text-[#a1a1aa] font-mono pt-2 sm:pt-0">
              <div className="space-y-0.5 border-l border-[#27272a] pl-3 sm:pl-4">
                <div className="flex items-center gap-1.5 text-[#e5d3b3]">
                  <Camera className="w-3.5 h-3.5" />
                  <span>{item.exif.camera}</span>
                </div>
                <div>{item.exif.lens}</div>
                <div className="text-[10px] sm:text-[11px] text-[#71717a]">
                  {item.exif.aperture} · {item.exif.shutter} · {item.exif.iso}
                </div>
              </div>

              {onInquireStyle && (
                <button
                  onClick={() => {
                    onClose();
                    onInquireStyle(item);
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 text-[11px] font-sans font-medium tracking-widest uppercase text-[#0a0a0a] bg-[#c5a880] hover:bg-[#d4af37] transition-colors rounded-sm whitespace-nowrap min-h-[40px] flex items-center justify-center"
                >
                  Commission This Style
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
