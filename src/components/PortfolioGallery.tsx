import { useState, useMemo } from 'react';
import { ArrowUpRight, Camera } from 'lucide-react';
import { GALLERY_CATEGORIES, GALLERY_ITEMS, GalleryItem } from '../data/photographyData';

interface PortfolioGalleryProps {
  onSelectItem: (item: GalleryItem) => void;
  onBookCommission: (category?: string) => void;
}

export default function PortfolioGallery({ onSelectItem, onBookCommission }: PortfolioGalleryProps) {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredItems = useMemo(() => {
    if (activeCategory === 'all') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  const handleImageError = (id: string) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 md:py-32 bg-[#0a0a0a] text-[#f5f2eb] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-8 mb-8 sm:mb-12 border-b border-[#27272a] pb-6 sm:pb-8">
          <div className="space-y-2 sm:space-y-3 max-w-2xl">
            <div className="text-[11px] sm:text-xs tracking-[0.2em] sm:tracking-[0.24em] uppercase text-[#c5a880] font-medium">
              Curated Portfolio · Volume IV
            </div>
            <h2 className="text-2xl sm:text-4xl md:text-5xl font-editorial font-light tracking-tight text-[#f5f2eb]">
              Visual Works & Commissions
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-[#a1a1aa] font-light leading-relaxed">
              Explore our comprehensive archive spanning haute couture nuptials, architectural still life, fine-art portraiture, and international editorial assignments.
            </p>
          </div>

          <div className="flex items-center gap-3 text-xs font-mono text-[#a1a1aa]">
            <span className="text-[#c5a880] font-semibold">{filteredItems.length}</span>
            <span>Frames Exhibited</span>
          </div>
        </div>

        {/* Category Filter Bar (Smooth Touch Scroll on Mobile) */}
        <div className="mb-8 sm:mb-12 overflow-x-auto pb-2 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0">
          <div className="flex items-center gap-1.5 p-1 bg-[#121212] border border-[#27272a] rounded-sm w-max">
            {GALLERY_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3.5 sm:px-4 py-2 sm:py-2.5 text-[11px] sm:text-xs font-medium tracking-wider uppercase transition-all duration-200 rounded-sm whitespace-nowrap shrink-0 min-h-[40px] flex items-center ${
                    isActive
                      ? 'bg-[#c5a880] text-[#0a0a0a] font-semibold shadow-sm'
                      : 'text-[#a1a1aa] hover:text-[#f5f2eb] hover:bg-white/5 active:bg-white/10'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Editorial Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8">
          {filteredItems.map((item, idx) => {
            const isWide = item.aspectRatio === 'landscape' && idx % 4 === 0;
            const isFailed = failedImages[item.id];

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item)}
                data-cursor-image
                className={`group relative overflow-hidden bg-[#121212] border border-[#27272a]/70 rounded-sm transition-all duration-300 hover:border-[#c5a880]/60 active:scale-[0.99] cursor-pointer ${
                  isWide ? 'sm:col-span-2' : 'col-span-1'
                }`}
              >
                {/* Visual Media Container */}
                <div
                  className={`relative w-full overflow-hidden ${
                    item.aspectRatio === 'tall'
                      ? 'aspect-[3/4]'
                      : item.aspectRatio === 'square'
                      ? 'aspect-square'
                      : 'aspect-[4/3]'
                  }`}
                >
                  {!isFailed ? (
                    <img
                      src={item.imageSrc}
                      alt={item.title}
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      onError={() => handleImageError(item.id)}
                      className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105 group-hover:filter group-hover:brightness-95"
                    />
                  ) : (
                    /* Fallback container complying with zero broken image policy */
                    <div className="w-full h-full bg-gradient-to-br from-[#18181b] to-[#121212] flex flex-col items-center justify-center p-6 text-center">
                      <Camera className="w-8 h-8 text-[#c5a880] mb-2 opacity-50" />
                      <span className="text-xs uppercase tracking-widest text-[#a1a1aa]">
                        {item.title}
                      </span>
                      <span className="text-[11px] text-[#71717a] mt-1 font-mono">
                        {item.location} · {item.year}
                      </span>
                    </div>
                  )}

                  {/* Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-85 group-hover:opacity-95 transition-opacity duration-300" />

                  {/* Top Right Quick Affordance */}
                  <div className="absolute top-3 right-3 sm:top-4 sm:right-4 z-10 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-[#f5f2eb] opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-200">
                    <ArrowUpRight className="w-4 h-4 text-[#c5a880]" />
                  </div>

                  {/* Bottom Image Details (Clearly legible on mobile and desktop) */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 z-10 space-y-1 sm:space-y-1.5 transition-transform duration-300">
                    <div className="flex items-center gap-2 text-[11px] sm:text-xs text-[#c5a880] font-mono tracking-wider">
                      <span>{item.categoryLabel}</span>
                      <span aria-hidden="true">·</span>
                      <span className="text-[#a1a1aa] truncate">{item.location}</span>
                    </div>

                    <h3 className="text-base sm:text-lg md:text-xl font-editorial font-light text-[#f5f2eb] leading-snug">
                      {item.title}
                    </h3>

                    {/* Exif summary */}
                    <div className="text-[10px] sm:text-[11px] font-mono text-[#a1a1aa]/90 opacity-80 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300 pt-1 flex items-center justify-between border-t border-white/10 mt-1 sm:mt-2">
                      <span className="truncate pr-2">{item.exif.camera}</span>
                      <span className="shrink-0">{item.exif.aperture}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Inquiry Prompt banner */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-10 md:p-12 bg-gradient-to-r from-[#121212] via-[#171614] to-[#121212] border border-[#27272a] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div className="space-y-1.5 max-w-xl">
            <h4 className="text-lg sm:text-2xl font-editorial text-[#f5f2eb]">
              Seeking a bespoke commission or private destination coverage?
            </h4>
            <p className="text-xs sm:text-sm text-[#a1a1aa]">
              Our calendar opens twelve months in advance for select destination nuptials and editorial assignments worldwide.
            </p>
          </div>
          <button
            onClick={() => onBookCommission(activeCategory !== 'all' ? activeCategory : undefined)}
            className="w-full sm:w-auto px-6 py-3.5 text-xs font-semibold tracking-[0.16em] uppercase text-[#0a0a0a] bg-[#c5a880] hover:bg-[#d4af37] active:scale-[0.98] transition-colors rounded-sm whitespace-nowrap shrink-0 shadow-lg shadow-[#c5a880]/10 min-h-[44px] flex items-center justify-center"
          >
            Inquire About Availability
          </button>
        </div>
      </div>
    </section>
  );
}
