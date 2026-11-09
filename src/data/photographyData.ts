export interface GalleryItem {
  id: string;
  title: string;
  category: string;
  categoryLabel: string;
  imageSrc: string;
  location: string;
  year: string;
  aspectRatio: 'landscape' | 'portrait' | 'square' | 'tall';
  exif: {
    camera: string;
    lens: string;
    aperture: string;
    shutter: string;
    iso: string;
  };
  clientOrSubject: string;
  curatorNote: string;
  featured?: boolean;
}

export interface ServicePackage {
  id: string;
  number: string;
  name: string;
  category: string;
  subtitle: string;
  description: string;
  investmentStartingAt: string;
  duration: string;
  deliverables: string[];
  inclusions: string[];
  imageSrc: string;
  recommendedFor: string;
}

export interface Testimonial {
  id: string;
  quote: string;
  clientName: string;
  roleOrOccasion: string;
  location: string;
  year: string;
}

// 5 Masterpiece generated photos
export const HERO_IMAGE = '/src/assets/images/hero_luxury_editorial_1794249740032.jpg';
export const WEDDING_CHATEAU_IMAGE = '/src/assets/images/portfolio_wedding_chateau_1794249740737.jpg';
export const FASHION_COUTURE_IMAGE = '/src/assets/images/portfolio_fashion_couture_1794249741991.jpg';
export const FINE_PORTRAIT_IMAGE = '/src/assets/images/portfolio_fine_portrait_1794249742329.jpg';
export const PHOTOGRAPHER_STUDIO_IMAGE = '/src/assets/images/about_photographer_studio_1794249743005.jpg';

export const GALLERY_CATEGORIES = [
  { id: 'all', label: 'All Collections' },
  { id: 'wedding', label: 'Wedding Photography' },
  { id: 'pre-wedding', label: 'Pre-Wedding Photography' },
  { id: 'fashion', label: 'Fashion Photography' },
  { id: 'portrait', label: 'Portrait Photography' },
  { id: 'luxury-events', label: 'Luxury Events' },
  { id: 'commercial', label: 'Commercial Photography' },
  { id: 'product', label: 'Product Photography' },
  { id: 'lifestyle', label: 'Lifestyle Photography' },
] as const;

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-01',
    title: 'Nuptials at Palais de Versailles',
    category: 'wedding',
    categoryLabel: 'Wedding Photography',
    imageSrc: HERO_IMAGE,
    location: 'Versailles, France',
    year: '2026',
    aspectRatio: 'landscape',
    exif: {
      camera: 'Hasselblad H6D-100c',
      lens: 'HC 2.2/100mm',
      aperture: 'f/2.8',
      shutter: '1/320s',
      iso: 'ISO 64',
    },
    clientOrSubject: 'Eleanor & Christian Beaumont',
    curatorNote: 'Captured during the golden morning radiance flowing through the Grand Gallery French casements, capturing hand-embroidered veil details.',
    featured: true,
  },
  {
    id: 'gal-02',
    title: 'Twilight on Lake Como Terrace',
    category: 'wedding',
    categoryLabel: 'Wedding Photography',
    imageSrc: WEDDING_CHATEAU_IMAGE,
    location: 'Bellagio, Lake Como, Italy',
    year: '2026',
    aspectRatio: 'landscape',
    exif: {
      camera: 'Leica SL2-S',
      lens: 'Summilux-SL 50mm f/1.4 ASPH',
      aperture: 'f/1.8',
      shutter: '1/250s',
      iso: 'ISO 200',
    },
    clientOrSubject: 'Countess Camilla & Julian Rossi',
    curatorNote: 'The bride standing above the calm azure waters of Lake Como at twilight with candlelit villa reflections.',
    featured: true,
  },
  {
    id: 'gal-03',
    title: 'Draped Gold Silk Architectural Study',
    category: 'fashion',
    categoryLabel: 'Fashion Photography',
    imageSrc: FASHION_COUTURE_IMAGE,
    location: 'Fondation Louis Vuitton, Paris',
    year: '2026',
    aspectRatio: 'portrait',
    exif: {
      camera: 'Phase One IQ4 150MP',
      lens: 'Schneider Kreuznach 80mm LS',
      aperture: 'f/5.6',
      shutter: '1/160s',
      iso: 'ISO 50',
    },
    clientOrSubject: 'Haute Couture Editorial Commission',
    curatorNote: 'A sculptural pleating dialogue between hand-spun ochre silk and brutalist poured concrete illumination.',
    featured: true,
  },
  {
    id: 'gal-04',
    title: 'The Contemplative Sculptor',
    category: 'portrait',
    categoryLabel: 'Portrait Photography',
    imageSrc: FINE_PORTRAIT_IMAGE,
    location: 'Montmartre Studio, Paris',
    year: '2025',
    aspectRatio: 'tall',
    exif: {
      camera: 'Leica M11 Monochrom',
      lens: 'Noctilux-M 50mm f/0.95',
      aperture: 'f/1.4',
      shutter: '1/500s',
      iso: 'ISO 125',
    },
    clientOrSubject: 'Antoine Laurent, Fine Sculptor',
    curatorNote: 'Silver gelatin tonal spectrum honoring five decades of working marble and charcoal in soft northern daylight.',
    featured: true,
  },
  {
    id: 'gal-05',
    title: 'The Atelier Solitude',
    category: 'lifestyle',
    categoryLabel: 'Lifestyle Photography',
    imageSrc: PHOTOGRAPHER_STUDIO_IMAGE,
    location: '450 Avenue Montaigne, Paris',
    year: '2026',
    aspectRatio: 'landscape',
    exif: {
      camera: 'Hasselblad 907X 50C',
      lens: 'XCD 45mm f/4 P',
      aperture: 'f/4.0',
      shutter: '1/125s',
      iso: 'ISO 400',
    },
    clientOrSubject: 'Julien Vance, Master Photographer',
    curatorNote: 'Examining silver bromide contact sheets under natural Parisian mansard skylights.',
    featured: true,
  },
  {
    id: 'gal-06',
    title: 'Capri Riviera Escape',
    category: 'pre-wedding',
    categoryLabel: 'Pre-Wedding Photography',
    imageSrc: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=85',
    location: 'Faraglioni Rocks, Capri, Italy',
    year: '2026',
    aspectRatio: 'landscape',
    exif: {
      camera: 'Leica SL2',
      lens: 'Vario-Elmarit-SL 24-90mm',
      aperture: 'f/2.8',
      shutter: '1/800s',
      iso: 'ISO 100',
    },
    clientOrSubject: 'Serena & Marcian von Waldeck',
    curatorNote: 'Private mahogany Riva tender excursion along the limestone sea cliffs of Marina Piccola.',
    featured: true,
  },
  {
    id: 'gal-07',
    title: 'Gala Des Étoiles at Opera Garnier',
    category: 'luxury-events',
    categoryLabel: 'Luxury Events',
    imageSrc: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=85',
    location: 'Palais Garnier, Paris',
    year: '2025',
    aspectRatio: 'portrait',
    exif: {
      camera: 'Hasselblad H6D-100c',
      lens: 'HC 3.5/35mm',
      aperture: 'f/3.5',
      shutter: '1/125s',
      iso: 'ISO 800',
    },
    clientOrSubject: 'Annual Philanthropic Winter Ball',
    curatorNote: 'Grand staircase descent amidst crystal chandeliers, black tie elegance, and marble colonnades.',
    featured: false,
  },
  {
    id: 'gal-08',
    title: 'Haute Horlogerie Chronograph Nocturne',
    category: 'product',
    categoryLabel: 'Product Photography',
    imageSrc: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1200&q=85',
    location: 'Geneva Atelier, Switzerland',
    year: '2026',
    aspectRatio: 'square',
    exif: {
      camera: 'Phase One XF IQ4',
      lens: '120mm Macro f/4.0',
      aperture: 'f/11',
      shutter: '1/60s',
      iso: 'ISO 50',
    },
    clientOrSubject: 'Bespoke Tourbillon Manufacture',
    curatorNote: 'Micro-focus stacking capturing hand-beveled chamfers, Geneva stripes, and blued titanium escapement.',
    featured: true,
  },
  {
    id: 'gal-09',
    title: 'Villa d\'Este Tuscan Dawn',
    category: 'pre-wedding',
    categoryLabel: 'Pre-Wedding Photography',
    imageSrc: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=85',
    location: 'Val d\'Orcia, Tuscany, Italy',
    year: '2026',
    aspectRatio: 'landscape',
    exif: {
      camera: 'Leica M11',
      lens: 'Summicron-M 35mm f/2 ASPH',
      aperture: 'f/2.8',
      shutter: '1/1000s',
      iso: 'ISO 64',
    },
    clientOrSubject: 'Vivienne & Arthur Chen',
    curatorNote: 'Cypress-lined private driveway at sunrise with dew mist rising above the rolling Tuscan hills.',
    featured: false,
  },
  {
    id: 'gal-10',
    title: 'Minimalist Architecture & Spatial Stillness',
    category: 'commercial',
    categoryLabel: 'Commercial Photography',
    imageSrc: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    location: 'Bel Air Private Residence, Los Angeles',
    year: '2026',
    aspectRatio: 'landscape',
    exif: {
      camera: 'Hasselblad H6D-100c',
      lens: 'HC 24mm f/4.8 Ultra-Wide',
      aperture: 'f/8.0',
      shutter: '1/30s',
      iso: 'ISO 64',
    },
    clientOrSubject: 'Studio K Architectes',
    curatorNote: 'Interplay of board-formed concrete, water reflection pools, and cantilevered bronze terraces.',
    featured: false,
  },
  {
    id: 'gal-11',
    title: 'Monochromatic Haute Couture Silhouette',
    category: 'fashion',
    categoryLabel: 'Fashion Photography',
    imageSrc: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85',
    location: 'Studio Marais, Paris',
    year: '2025',
    aspectRatio: 'portrait',
    exif: {
      camera: 'Leica SL2-S',
      lens: 'APO-Summicron-SL 75mm',
      aperture: 'f/2.0',
      shutter: '1/400s',
      iso: 'ISO 100',
    },
    clientOrSubject: 'Maison Noir Autumn Preview',
    curatorNote: 'Crisp editorial precision highlighting bespoke tailored lines against chalk textured backdrop.',
    featured: false,
  },
  {
    id: 'gal-12',
    title: 'The Vintage Cellar Reserve',
    category: 'lifestyle',
    categoryLabel: 'Lifestyle Photography',
    imageSrc: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=85',
    location: 'Épernay, Champagne, France',
    year: '2025',
    aspectRatio: 'square',
    exif: {
      camera: 'Leica M11',
      lens: 'Summilux-M 35mm f/1.4 FLE',
      aperture: 'f/1.4',
      shutter: '1/90s',
      iso: 'ISO 640',
    },
    clientOrSubject: 'Private Chateau Sommelier Experience',
    curatorNote: 'Low-light ambient capture preserving the cellar dust and century-old oak aging riddling racks.',
    featured: false,
  },
  {
    id: 'gal-13',
    title: 'Venetian Masquerade Ball',
    category: 'luxury-events',
    categoryLabel: 'Luxury Events',
    imageSrc: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=85',
    location: 'Palazzo Pisani Moretta, Venice, Italy',
    year: '2026',
    aspectRatio: 'landscape',
    exif: {
      camera: 'Hasselblad H6D-100c',
      lens: 'HC 50mm II f/3.5',
      aperture: 'f/2.8',
      shutter: '1/160s',
      iso: 'ISO 800',
    },
    clientOrSubject: 'Carnevale Private International Circle',
    curatorNote: 'Candelabra light illuminating gold leaf masks, Murano glass, and velvet tapestries.',
    featured: false,
  },
  {
    id: 'gal-14',
    title: 'Artisanal Perfumery Botanical Extract',
    category: 'product',
    categoryLabel: 'Product Photography',
    imageSrc: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1200&q=85',
    location: 'Grasse, Provence, France',
    year: '2026',
    aspectRatio: 'portrait',
    exif: {
      camera: 'Phase One IQ4',
      lens: '120mm Macro',
      aperture: 'f/8.0',
      shutter: '1/125s',
      iso: 'ISO 50',
    },
    clientOrSubject: 'Atelier de Parfumerie Rare',
    curatorNote: 'Crystal flacon illuminated by soft side daylight with wild bergamot blossoms and raw vetiver roots.',
    featured: false,
  },
  {
    id: 'gal-15',
    title: 'The Virtuoso Cellist',
    category: 'portrait',
    categoryLabel: 'Portrait Photography',
    imageSrc: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=85',
    location: 'Philharmonie de Paris',
    year: '2025',
    aspectRatio: 'portrait',
    exif: {
      camera: 'Leica M11 Monochrom',
      lens: 'APO-Summicron-M 50mm',
      aperture: 'f/2.0',
      shutter: '1/320s',
      iso: 'ISO 200',
    },
    clientOrSubject: 'Helena Vane, Principal Soloist',
    curatorNote: 'Subtle chiaroscuro framing the natural poise of the master musician with her 1740 Montagnana cello.',
    featured: false,
  },
  {
    id: 'gal-16',
    title: 'Vow Exchange on Sant’Angelo Cliffs',
    category: 'wedding',
    categoryLabel: 'Wedding Photography',
    imageSrc: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=1200&q=85',
    location: 'Ischia, Bay of Naples, Italy',
    year: '2025',
    aspectRatio: 'landscape',
    exif: {
      camera: 'Leica SL2-S',
      lens: 'Summilux-SL 35mm f/1.4',
      aperture: 'f/2.2',
      shutter: '1/1200s',
      iso: 'ISO 100',
    },
    clientOrSubject: 'Lord Henrik & Astrid Lindqvist',
    curatorNote: 'Dramatic coastal promontory ceremony bathed in late afternoon Mediterranean sun rays.',
    featured: false,
  },
];

export const SERVICES: ServicePackage[] = [
  {
    id: 'haute-wedding',
    number: '01',
    name: 'Haute Wedding & Bespoke Nuptials',
    category: 'Wedding Photography',
    subtitle: 'Comprehensive multi-day coverage for discerning international celebrations.',
    description: 'Our signature bespoke wedding commission is conceived as a museum-grade visual legacy. We immerse ourselves in the atmosphere of your celebration, documenting both monumental grandeur and delicate, fleeting intimate glances with medium-format analog depth.',
    investmentStartingAt: '€12,500',
    duration: 'Full Multi-Day (2 to 3 Days)',
    deliverables: [
      'Two Master Photographers (Principal Artist & Associate Director)',
      '1,200+ Hand-Curated, Artistically Color-Graded High-Resolution Master Files',
      'Private Encrypted Client Cloud Archive with 10-Year Protected Cloud Storage',
      'Handcrafted Italian Full-Grain Leather Heirloom Album (40x30cm, Archival Cotton Paper)',
      'Boxed Suite of 30 Museum-Grade Archival Silver Gelatin Prints',
    ],
    inclusions: [
      'Preliminary in-person or private salon moodboarding session',
      'Rehearsal dinner & welcome cocktail documentation',
      'Full wedding day coverage from morning preparations through midnight soirée',
      'Worldwide travel & accommodation coordination included within Europe',
      'Private client viewing salon invitation in Paris or New York',
    ],
    imageSrc: HERO_IMAGE,
    recommendedFor: 'Chateau, villa, and destination celebrations seeking timeless heirloom artistry.',
  },
  {
    id: 'pre-wedding',
    number: '02',
    name: 'Pre-Wedding & Destination Escapes',
    category: 'Pre-Wedding Photography',
    subtitle: 'Cinematic couple monographs in the world’s most evocative landscapes.',
    description: 'An editorial couple portraiture journey set amidst historic European architecture, dramatic coastal cliffs, or secluded Alpine retreats. We design an intentional aesthetic itinerary allowing genuine romance to unfold without artificial posing.',
    investmentStartingAt: '€6,800',
    duration: '1 to 2 Days on Location',
    deliverables: [
      'Principal Photographer with Dedicated Photographic Assistant',
      '400+ Curated Master High-Resolution Files in Full Dynamic Range',
      'Bespoke Fine Art Folio with 15 Silk-Matted Fine Art Giclée Prints',
      'Expedited 14-Day Delivery for Wedding Invitations & Save-the-Date Design',
    ],
    inclusions: [
      'Curated destination scouting and sunrise/golden hour lighting blueprint',
      'Up to four wardrobe changes with high-fashion styling assistance',
      'Private luxury vehicle transit between location points',
      'Full personal printing rights and international usage license',
    ],
    imageSrc: WEDDING_CHATEAU_IMAGE,
    recommendedFor: 'Couples desiring high-fashion editorial portraits before their grand wedding celebration.',
  },
  {
    id: 'fashion-editorial',
    number: '03',
    name: 'Editorial Fashion & Haute Couture',
    category: 'Fashion Photography',
    subtitle: 'Campaign visuals and magazine editorials sculpted with directional studio light.',
    description: 'Commissioned by haute couture houses, bespoke jewelers, and luxury fashion periodicals. We execute high-concept visual narratives that elevate textiles, silhouettes, and brand identity into collectible fine art.',
    investmentStartingAt: '€9,500',
    duration: 'Full-Day Studio or Location Commission',
    deliverables: [
      'Full Creative Direction & Lighting Design by Julien Vance',
      'Ultra-High-Resolution 150-Megapixel Phase One Master Files',
      'Bespoke High-End Beauty & Texture Retouching for Print & Billboard Scale',
      'Comprehensive Commercial Worldwide Advertising & Editorial Licensing',
    ],
    inclusions: [
      'Pre-production concept deck, moodboards, and casting consultations',
      'On-set tethered preview monitors for art directors and stylists',
      'Professional digi-tech and two lighting technicians',
      'Complete color grading matching Pantone and brand textile specifications',
    ],
    imageSrc: FASHION_COUTURE_IMAGE,
    recommendedFor: 'Luxury ateliers, designer fashion labels, and international editorial publications.',
  },
  {
    id: 'fine-portrait',
    number: '04',
    name: 'Executive & Fine Art Portraiture',
    category: 'Portrait Photography',
    subtitle: 'Soulful monochrome and natural-light portraits for luminaries and visionaries.',
    description: 'More than a portrait—a study in character, gravitas, and quiet introspection. Shot using our signature Leica and medium-format optics in our natural light Paris studio or your private estate.',
    investmentStartingAt: '€3,400',
    duration: 'Half-Day Private Session (3 to 4 Hours)',
    deliverables: [
      'Principal Artist Private Sitting',
      '60 Hand-Mastered High-Resolution Fine Art Portraits (Color & Monochrom)',
      'Framed 50x70cm Hand-Crafted Museum Rag Archival Print in Custom Walnut Frame',
      'Executive Press Kit & Publishing Rights',
    ],
    inclusions: [
      'Private styling consultation and wardrobe curation',
      'In-atelier champagne reception during portfolio review',
      'Master darkroom tone curve calibration for each image',
    ],
    imageSrc: FINE_PORTRAIT_IMAGE,
    recommendedFor: 'Entrepreneurs, authors, artists, and families building generational heirlooms.',
  },
  {
    id: 'luxury-events',
    number: '05',
    name: 'Private Galas & Luxury Events',
    category: 'Luxury Events',
    subtitle: 'Discreet, high-fidelity documentation of exclusive philanthropic and cultural evenings.',
    description: 'Capturing the atmosphere of international state dinners, royal patronages, Venetian masquerades, and centenary brand anniversaries with elegance and discretion.',
    investmentStartingAt: '€8,200',
    duration: 'Evening to Multi-Day Coverage',
    deliverables: [
      'Two Discreet Editorial Photographers in Formal Evening Attire',
      '600+ Expressive High-Resolution Images',
      'Next-Morning Press & Social Media Highlight Selection (within 12 Hours)',
      'VIP Gift Print Gallery for Honored Guests',
    ],
    inclusions: [
      'Comprehensive red carpet, architectural ambiance, and candid social coverage',
      'Encrypted online portal with bespoke guest access credentials',
      'High-speed digital delivery protocol for global PR teams',
    ],
    imageSrc: 'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?auto=format&fit=crop&w=1200&q=85',
    recommendedFor: 'Philanthropic foundations, cultural institutions, and private royal circles.',
  },
  {
    id: 'commercial-architectural',
    number: '06',
    name: 'Commercial & Architectural Commissions',
    category: 'Commercial Photography',
    subtitle: 'Visual storytelling for premier hospitality, yachts, and modernist residences.',
    description: 'Documenting architectural monuments, five-star heritage hotels, and custom superyachts with meticulous attention to spatial geometry, ambient sunlight transitions, and material finishes.',
    investmentStartingAt: '€11,000',
    duration: 'Multi-Day Staging & Capture',
    deliverables: [
      'Phase One Medium-Format Architectural Shift Imagery',
      'Day, Dusk & Twilight Hero Captures with Dynamic Exposure Blending',
      'Perpetual Multi-Platform Global Commercial Rights',
    ],
    inclusions: [
      'Solar angle trajectory planning for optimal natural lighting',
      'Dedicated styling and prop staging coordination',
      'Complete perspective correction and high-end architectural retouching',
    ],
    imageSrc: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=85',
    recommendedFor: 'Architects, luxury hoteliers, developers, and shipyard designers.',
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'test-01',
    quote: 'Julien Vance and Atelier Lumière transformed our three-day wedding at Villa Balbianello into pure cinematic poetry. Every photograph possesses an ethereal, painterly quality that brought tears to our eyes. They were completely unobtrusive yet captured every tender emotion.',
    clientName: 'Lady Genevieve & Lord Alistair Croft',
    roleOrOccasion: 'Lake Como Nuptials',
    location: 'Bellagio, Italy',
    year: '2026',
  },
  {
    id: 'test-02',
    quote: 'Working with Atelier Lumière on our Autumn Couture Campaign set a new benchmark for our maison. The understanding of drapery, sculptural light, and high-fashion sensibility is unmatched in contemporary European photography.',
    clientName: 'Hélène de Saint-Germain',
    roleOrOccasion: 'Creative Director, Maison de L’Ombre Paris',
    location: 'Paris, France',
    year: '2025',
  },
  {
    id: 'test-03',
    quote: 'The heirloom Italian leather album and museum prints arrived in a solid walnut presentation case. It is without question the most treasured physical artifact in our family home. The photographic craft is of a calibre that simply does not exist elsewhere.',
    clientName: 'Julian & Claire Dupont',
    roleOrOccasion: 'Château de Chantilly Celebration',
    location: 'Chantilly, France',
    year: '2025',
  },
];

export const PHOTOGRAPHER_STORY = {
  name: 'Julien Vance',
  title: 'Principal Photographer & Creative Director',
  origin: 'Paris & New York',
  experienceYears: 16,
  bioParagraph1:
    'Born in the Marais district of Paris and trained in classic analog darkroom arts at the École Nationale Supérieure des Arts Décoratifs, Julien Vance has spent over sixteen years refining an unmistakable photographic signature: one founded upon sculptural natural light, effortless intimacy, and museum-grade tonal depth.',
  bioParagraph2:
    'Rather than manufacturing fleeting trends, Julien approaches every commission as an enduring work of cultural heritage. Whether directing a haute couture spread for international publications or documenting an intimate exchange of vows overlooking the Mediterranean, his camera searches for the timeless cadence of human devotion.',
  bioParagraph3:
    'Atelier Lumière operates exclusively on Hasselblad medium format and Leica rangefinder optical systems, pairing centuries-old European compositional sensibility with world-leading digital dynamic range and handcrafted physical albums crafted in Florence.',
  approachPoints: [
    {
      title: 'The Discipline of Natural Light',
      description: 'We prioritize morning radiance, twilight, and directional chiaroscuro window illumination over harsh artificial flash, crafting imagery that feels organic, soft, and alive.',
    },
    {
      title: 'Medium-Format Dimensionality',
      description: 'Using 100-megapixel sensors and custom-ground prime optics, each frame renders skin tones with velvety nuance and background falls off into creamy, painterly bokeh.',
    },
    {
      title: 'Unobtrusive Documentary Intuition',
      description: 'The finest moments occur between poses. We maintain an invisible, respectful presence, capturing spontaneous embraces and quiet glances as they genuinely unfold.',
    },
    {
      title: 'Handcrafted Physical Heirlooms',
      description: 'Digital files can be forgotten; physical heirlooms endure for generations. We personally oversee the printing of archival cotton rag folios and hand-stitched Tuscan leather volumes.',
    },
  ],
  stats: [
    { label: 'Years of Atelier Mastery', value: '16+' },
    { label: 'Destinations Documented', value: '28' },
    { label: 'Bespoke Heirlooms Delivered', value: '340+' },
    { label: 'International Features', value: '45' },
  ],
};
