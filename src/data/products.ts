import type { Product } from '../types';

export const products: Product[] = [
  {
    id: 'solus-heavyweight-hoodie',
    name: 'SOLUS Heavyweight Hoodie',
    category: 'Oversized',
    price: 140,
    originalPrice: 165,
    rating: 4.9,
    reviewCount: 84,
    image: '/images/hoodie.png',
    hoverImage: '/images/hoodie_hover.png',
    description: 'A masterpiece of structural geometry. Crafted from 480GSM premium double-knit brushed loopback cotton, featuring drop shoulders, a seamless double-layered hood, and a clean ribbed hem. Designed to offer a structural, protective silhouette that thrives in cold, intense training conditions.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Obsidian Black', class: 'bg-[#0F0F0F]' },
      { name: 'Raw Concrete', class: 'bg-[#8F8F8F]' },
      { name: 'Chalk White', class: 'bg-[#E5E5E5]' }
    ],
    details: [
      '480GSM heavyweight brushed loopback organic cotton',
      'Double-layered structured hood with no drawstrings for a clean profile',
      'Drop shoulder pattern with custom side panelling for unrestricted overhead movement',
      'Garment dyed and pre-shrunk for an enduring custom fit',
      'Embroidered tonal signature insignia on the sleeve'
    ],
    materials: '85% Organic Cotton, 15% Recycled Polyester. Ribbing: 98% Cotton, 2% Elastane.',
    shipping: 'Complimentary standard shipping on orders over $150. Express overnight dispatch available. All purchases are packed in our signature matte-black dust protection bags.'
  },
  {
    id: 'solus-tactical-compression',
    name: 'SOLUS Tactical Compression Tee',
    category: 'Compression',
    price: 85,
    originalPrice: 110,
    rating: 4.8,
    reviewCount: 62,
    image: '/images/compression.png',
    hoverImage: '/images/compression_hover.png',
    description: 'An elite second-skin armor. Engineered with multi-zone muscle compression map stitching and moisture-expelling microfibers. Designed to lock down muscles, boost blood circulation, and reduce recovery time. The ultimate training layer for high-intensity warrior-athletes.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Concrete Grey', class: 'bg-[#555555]' },
      { name: 'Obsidian Black', class: 'bg-[#0F0F0F]' }
    ],
    details: [
      'High-tension 240GSM elastane-nylon blend for targeted muscle lock',
      'Flatlock comfort stitching prevents friction chafing over hours of exertion',
      'Laser-perforated lumbar and underarm heat venting zones',
      'Antimicrobial silver-ion technology prevents odor retention',
      'Reflective matte-black sleeve accents'
    ],
    materials: '72% Nylon, 28% Elastane with integrated silver-ion treatment.',
    shipping: 'Ships in 1-2 business days. Free returns and size exchanges within 30 days of purchase.'
  },
  {
    id: 'solus-obsidian-joggers',
    name: 'SOLUS Obsidian Joggers',
    category: 'Performance',
    price: 120,
    rating: 4.7,
    reviewCount: 91,
    image: '/images/joggers.png',
    hoverImage: '/images/joggers_hover.png',
    description: 'Form meets function. Engineered from four-way stretch technical nylon, these joggers offer a tailored tapered leg with adjustable ankle gussets and hidden waterproof YKK zippers. Crafted for the athletic lifestyle transition from the road to the weight rack.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Obsidian Black', class: 'bg-[#0F0F0F]' },
      { name: 'Raw Concrete', class: 'bg-[#8F8F8F]' }
    ],
    details: [
      'Four-way stretch technical weaving with water-resistant DWR coating',
      'Dual hidden side zipper pockets with internal mesh key/card sleeve',
      'Ergonomic knee darts for natural joint articulation without bagginess',
      'Matte-black metal tipped adjustments and custom elastic waistband',
      'Zipped ankle openings for custom ventilation and quick shoe-changes'
    ],
    materials: '88% Recycled Tech-Nylon, 12% Spandex.',
    shipping: 'Complimentary shipping. Standard transit time 2-4 days. Custom shipping tracker link provided via SMS.'
  },
  {
    id: 'solus-aerorunning-shorts',
    name: 'SOLUS AeroRunning Shorts',
    category: 'Running',
    price: 70,
    originalPrice: 90,
    rating: 4.9,
    reviewCount: 43,
    image: '/images/shorts.png',
    hoverImage: '/images/shorts_hover.png',
    description: 'Weightless speed. Features a shell constructed from featherlight ripstop running nylon paired with an integrated anti-friction compression liner. With laser-cut drainage ports, a zip pocket on the rear waist for secure storage, and reflective safety decals.',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Obsidian Black', class: 'bg-[#0F0F0F]' },
      { name: 'Concrete Grey', class: 'bg-[#555555]' }
    ],
    details: [
      '95g ultra-lightweight water-repellent ripstop outer shell',
      'Integrated soft-touch anti-chafing boxer brief compression liner',
      'Rear waistband waterproof zipper pocket to keep cards and large phones secure',
      'Laser-cut micro ventilation holes along side seams for ultimate airflow',
      'Split-hem design for unrestricted running strides'
    ],
    materials: 'Shell: 90% Polyester, 10% Elastane. Liner: 82% Nylon, 18% Elastane.',
    shipping: 'Ships in 1-2 business days. Eco-friendly recycled card packaging.'
  }
];
