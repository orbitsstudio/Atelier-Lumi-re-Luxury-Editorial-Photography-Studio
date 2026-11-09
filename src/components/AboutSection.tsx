import { useState } from 'react';
import { Camera, Compass, Award, Sparkles, BookOpen, Layers } from 'lucide-react';
import { PHOTOGRAPHER_STORY, PHOTOGRAPHER_STUDIO_IMAGE, FINE_PORTRAIT_IMAGE } from '../data/photographyData';

export default function AboutSection() {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'gear' | 'atelier'>('philosophy');

  return (
    <section id="about" className="py-24 sm:py-32 bg-[#0c0c0c] text-[#f5f2eb] relative overflow-hidden">
      {/* Background ambient accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#c5a880]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8">
        {/* Section Tag */}
        <div className="text-xs tracking-[0.24em] uppercase text-[#c5a880] font-medium mb-3">
          Behind The Lens · Creative Direction
        </div>

        {/* Master Introduction Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Photographer Story & Philosophy */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-3xl sm:text-5xl font-editorial font-light tracking-tight text-[#f5f2eb] leading-[1.15] text-balance">
              The Art of Seeing{' '}
              <span className="italic text-[#e5d3b3]">Beyond the Frame.</span>
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#a1a1aa] font-light leading-relaxed">
              <p>{PHOTOGRAPHER_STORY.bioParagraph1}</p>
              <p>{PHOTOGRAPHER_STORY.bioParagraph2}</p>
              <p>{PHOTOGRAPHER_STORY.bioParagraph3}</p>
            </div>

            {/* Photographer Quote */}
            <div className="py-6 px-8 border-l border-[#c5a880] bg-[#121212]/80 rounded-r-sm space-y-2">
              <p className="font-editorial italic text-lg sm:text-xl text-[#f5f2eb]">
                "Light is not merely a tool for illumination; it is a sculptural medium capable of carving memory into permanence."
              </p>
              <div className="text-xs tracking-wider uppercase text-[#c5a880] font-mono">
                — {PHOTOGRAPHER_STORY.name}, Founder & Principal Artist
              </div>
            </div>

            {/* 4 Principles Grid */}
            <div className="pt-4 space-y-4">
              <h3 className="text-xs uppercase tracking-[0.2em] text-[#e5d3b3] font-mono">
                The Four Pillars of Our Craft
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {PHOTOGRAPHER_STORY.approachPoints.map((point, index) => (
                  <div
                    key={index}
                    className="p-5 bg-[#121212] border border-[#27272a] rounded-sm space-y-2 hover:border-[#c5a880]/40 transition-colors"
                  >
                    <div className="text-xs font-mono text-[#c5a880]">
                      0{index + 1}.
                    </div>
                    <h4 className="text-base font-editorial text-[#f5f2eb]">
                      {point.title}
                    </h4>
                    <p className="text-xs text-[#a1a1aa] leading-relaxed">
                      {point.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Master Photographer Visuals & Atelier Snapshot */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Portrait Card */}
            <div className="relative overflow-hidden bg-[#121212] border border-[#27272a] rounded-sm group shadow-2xl">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={PHOTOGRAPHER_STUDIO_IMAGE}
                  alt="Julien Vance at the Paris Atelier with medium-format camera and contact sheets"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="p-6 bg-[#121212] space-y-2">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xl font-editorial text-[#f5f2eb]">{PHOTOGRAPHER_STORY.name}</h4>
                    <p className="text-xs text-[#a1a1aa] font-mono">{PHOTOGRAPHER_STORY.title}</p>
                  </div>
                  <div className="text-right text-xs font-mono text-[#c5a880]">
                    {PHOTOGRAPHER_STORY.origin}
                  </div>
                </div>
                <p className="text-xs text-[#71717a] pt-1 border-t border-[#27272a]">
                  Documenting fine art commissions across Europe, North America, and private international sanctuaries.
                </p>
              </div>
            </div>

            {/* Secondary Behind-the-Scenes Monograph Card */}
            <div className="p-6 bg-[#121212] border border-[#27272a] rounded-sm space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#c5a880] tracking-wider uppercase">
                <Camera className="w-3.5 h-3.5" />
                <span>Camera & Optics Arsenal</span>
              </div>
              <p className="text-xs text-[#a1a1aa] leading-relaxed">
                We believe optical rendering is identity. Every wedding and campaign is recorded with a paired system of 100MP Hasselblad medium format sensors and legendary German Leica M rangefinder lenses, creating micro-contrast and creamy organic transitions that no algorithmic smartphone or generic camera can emulate.
              </p>
              <div className="grid grid-cols-2 gap-3 pt-2 text-xs font-mono text-[#e5d3b3]">
                <div className="p-2.5 bg-[#0a0a0a] border border-[#27272a] rounded-sm">
                  Hasselblad H6D-100c
                </div>
                <div className="p-2.5 bg-[#0a0a0a] border border-[#27272a] rounded-sm">
                  Leica M11 Monochrom
                </div>
                <div className="p-2.5 bg-[#0a0a0a] border border-[#27272a] rounded-sm">
                  Noctilux 50mm f/0.95
                </div>
                <div className="p-2.5 bg-[#0a0a0a] border border-[#27272a] rounded-sm">
                  Phase One IQ4 150MP
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Craft Details Accordion / Interactive Explorer */}
        <div className="mt-20 border-t border-[#27272a] pt-12">
          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <h3 className="text-xl sm:text-2xl font-editorial text-[#f5f2eb]">
              The Atelier Experience & Production Standard
            </h3>
            <div className="flex items-center gap-1 p-1 bg-[#121212] border border-[#27272a] rounded-sm">
              <button
                onClick={() => setActiveTab('philosophy')}
                className={`px-3 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors rounded-sm ${
                  activeTab === 'philosophy' ? 'bg-[#c5a880] text-[#0a0a0a]' : 'text-[#a1a1aa] hover:text-[#f5f2eb]'
                }`}
              >
                The Vision
              </button>
              <button
                onClick={() => setActiveTab('gear')}
                className={`px-3 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors rounded-sm ${
                  activeTab === 'gear' ? 'bg-[#c5a880] text-[#0a0a0a]' : 'text-[#a1a1aa] hover:text-[#f5f2eb]'
                }`}
              >
                The Darkroom
              </button>
              <button
                onClick={() => setActiveTab('atelier')}
                className={`px-3 py-1.5 text-xs font-medium tracking-wider uppercase transition-colors rounded-sm ${
                  activeTab === 'atelier' ? 'bg-[#c5a880] text-[#0a0a0a]' : 'text-[#a1a1aa] hover:text-[#f5f2eb]'
                }`}
              >
                The Heirlooms
              </button>
            </div>
          </div>

          <div className="p-8 bg-[#121212] border border-[#27272a] rounded-sm">
            {activeTab === 'philosophy' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#c5a880]">01 / Direction</span>
                  <h4 className="text-lg font-editorial text-[#f5f2eb]">Effortless Choreography</h4>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    We never force rigid, awkward posing. Instead, we guide natural movement, dialogue, and poise under deliberate architectural angles.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#c5a880]">02 / Discretion</span>
                  <h4 className="text-lg font-editorial text-[#f5f2eb]">Quiet Presence</h4>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    At high-society celebrations and celebrity ceremonies, our team moves with utmost discretion, wearing formal black tie and respecting the sacred privacy of the event.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#c5a880]">03 / Longevity</span>
                  <h4 className="text-lg font-editorial text-[#f5f2eb]">Beyond Trends</h4>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    No muddy preset filters or fleeting orange-teal fads. Our color balance is calibrated against classical oil painting standards that look magnificent 50 years hence.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'gear' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#c5a880]">01 / Raw Processing</span>
                  <h4 className="text-lg font-editorial text-[#f5f2eb]">Individual File Mastering</h4>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    Every delivered image undergoes individual tone mapping, skin smoothing, lens correction, and highlight preservation by Julien Vance in our Paris color grading suite.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#c5a880]">02 / Dynamic Range</span>
                  <h4 className="text-lg font-editorial text-[#f5f2eb]">16-Bit Color Depth</h4>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    We record in uncompressed 16-bit RAW, preserving microscopic lace details in bright bridal gowns while holding deep, velvety shadow detail in formal evening wear.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#c5a880]">03 / Redundancy</span>
                  <h4 className="text-lg font-editorial text-[#f5f2eb]">Triple-Vault Security</h4>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    Real-time dual CFexpress mirroring on set, followed by encrypted dual-drive on-site backups and off-site cold storage replication before leaving your venue.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'atelier' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#c5a880]">01 / Tuscan Leather</span>
                  <h4 className="text-lg font-editorial text-[#f5f2eb]">Hand-Bound in Florence</h4>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    Our heirloom wedding albums are handcrafted by master bookbinders in Florence, Italy, using vegetable-tanned calfskin and 24-karat gold foil debossing.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#c5a880]">02 / Cotton Rag</span>
                  <h4 className="text-lg font-editorial text-[#f5f2eb]">Hahnemühle Archival Paper</h4>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    Printed using 12-color archival pigment inks on 310gsm museum-grade 100% cotton rag, certified to resist fading and yellowing for over 200 years.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-xs font-mono text-[#c5a880]">03 / Presentation</span>
                  <h4 className="text-lg font-editorial text-[#f5f2eb]">Solid Walnut Coffret</h4>
                  <p className="text-xs text-[#a1a1aa] leading-relaxed">
                    Delivered inside a custom solid American walnut presentation box lined with Belgian natural linen, complete with archival white cotton inspection gloves.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
