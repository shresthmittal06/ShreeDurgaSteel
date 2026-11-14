import { ProductItem } from '../types';

export const manufacturingTraditional: ProductItem[] = [
  // 1. POOJA PETI
  {
    id: 'mfg-pooja-peti',
    division: 'manufacturing',
    name: 'Pooja Peti',
    model: 'SDS-PETI Series (5 Sizes)',
    category: 'pooja-traditional',
    subcategory: 'Devotional & Cash Lockboxes',
    productCode: 'SDS-M-PETI',
    shortDescription: 'Heavy-gauge handcrafted stainless steel devotional cash and sacred offerings box with internal compartments and secure padlock hasp.',
    longDescription:
      'Engineered for temple trusts, domestic shrines, and retail cash counters. Features double-folded safety seams, internal removable cash dividers, and a heavy brass-compatible locking latch for tamper resistance.',
    mainImage: '',
    galleryImages: [],
    keyFeatures: [
      '5 Traditional Sizes (0 No. to 4 No.)',
      'Heavy-Gauge Austenitic Stainless Steel',
      'Internal Removable Partition Tray',
      'Tamper-Resistant Padlock-Ready Locking Hasp',
    ],
    specifications: {
      model: 'SDS-PETI Series',
      material: 'Stainless Steel',
      dimensions: '4" × 7" up to 8" × 12"',
      weight: '320 gm to 950 gm',
    },
    applications: ['Temples & Gurudwaras', 'Home Shrines / Pooja Rooms', 'Retail Counter Safes'],
    listPrice: 650,
    discountPercent: 10,
    finalCustomerPrice: 585,
    variants: [
      { id: 'peti-0', sizeName: '0 No. (4" × 7" × 2.4")', dimensions: '4" × 7" × 2.4"', depth: '2.4"', weight: '0.320 kg', modelCode: 'SDS-PETI-0', listPrice: 420, finalCustomerPrice: 378 },
      { id: 'peti-1', sizeName: '1 No. (5" × 8" × 2.6")', dimensions: '5" × 8" × 2.6"', depth: '2.6"', weight: '0.450 kg', modelCode: 'SDS-PETI-1', listPrice: 540, finalCustomerPrice: 486 },
      { id: 'peti-2', sizeName: '2 No. (6" × 9" × 2.8")', dimensions: '6" × 9" × 2.8"', depth: '2.8"', weight: '0.620 kg', modelCode: 'SDS-PETI-2', listPrice: 680, finalCustomerPrice: 612 },
      { id: 'peti-3', sizeName: '3 No. (7" × 10" × 3.0")', dimensions: '7" × 10" × 3.0"', depth: '3.0"', weight: '0.780 kg', modelCode: 'SDS-PETI-3', listPrice: 850, finalCustomerPrice: 765 },
      { id: 'peti-4', sizeName: '4 No. (8" × 12" × 3.5")', dimensions: '8" × 12" × 3.5"', depth: '3.5"', weight: '0.950 kg', modelCode: 'SDS-PETI-4', listPrice: 1100, finalCustomerPrice: 990 },
    ],
  },

  // 2. GULLAK
  {
    id: 'mfg-gullak',
    division: 'manufacturing',
    name: 'Gullak',
    model: 'SDS-GLK Series',
    category: 'pooja-traditional',
    subcategory: 'Traditional Money Boxes',
    productCode: 'SDS-M-GLK',
    shortDescription: 'All-stainless-steel money savings piggy bank (Gullak) with welded coin drop slot and tamper-proof rolled body.',
    longDescription:
      'Traditional indestructible Indian savings bank made entirely from heavy-gauge stainless steel. Features a laser-cut coin and currency slot on top with a seamless welded cylindrical body for lifetime durability.',
    mainImage: '',
    galleryImages: [],
    keyFeatures: [
      'Laser-Cut Precision Coin & Currency Drop Slot',
      '100% Rust-Proof Austenitic Stainless Steel',
      'Double-Seamed Base Resists Prying & Dropping',
      'High-Mirror Exterior Polish',
    ],
    specifications: {
      model: 'SDS-GLK Series',
      material: 'Austenitic Stainless Steel',
      dimensions: '4" Dia × 5" Height up to 6" Dia × 8" Height',
      weight: '280 gm to 620 gm',
    },
    applications: ['Traditional Savings', 'Temple Hundi & Danpatra', 'Gift Item'],
    listPrice: 450,
    discountPercent: 10,
    finalCustomerPrice: 405,
    variants: [
      { id: 'glk-1', sizeName: 'Small (4" Dia × 5" Height)', dimensions: '4.0" Dia × 5.0" H', depth: '5.0"', weight: '0.280 kg', modelCode: 'SDS-GLK-01', listPrice: 450, finalCustomerPrice: 405 },
      { id: 'glk-2', sizeName: 'Medium (5" Dia × 6" Height)', dimensions: '5.0" Dia × 6.0" H', depth: '6.0"', weight: '0.420 kg', modelCode: 'SDS-GLK-02', listPrice: 580, finalCustomerPrice: 522 },
      { id: 'glk-3', sizeName: 'Large (6" Dia × 8" Height)', dimensions: '6.0" Dia × 8.0" H', depth: '8.0"', weight: '0.620 kg', modelCode: 'SDS-GLK-03', listPrice: 750, finalCustomerPrice: 675 },
    ],
  },

  // 3. CHOWKI
  {
    id: 'mfg-chowki',
    division: 'manufacturing',
    name: 'Chowki',
    model: 'SDS-CWK Series',
    category: 'pooja-traditional',
    subcategory: 'Devotional Pedestals',
    productCode: 'SDS-M-CWK',
    shortDescription: 'Elevated square devotional stainless steel chowki / altar platform with embossed floral borders and heavy tubular support legs.',
    longDescription:
      'Engineered for temple sanctums, household deities, and festive celebrations. Stamped from heavy stainless steel sheet with ornate traditional border embossing and sturdy anti-slip leg supports.',
    mainImage: '',
    galleryImages: [],
    keyFeatures: [
      'Heavy Stamped Stainless Steel Top Platform',
      'Traditional Embossed Border Pattern',
      'Solid Tubular Feet with Protective Non-Slip Caps',
      'Supports High Idol Weights Without Deflection',
    ],
    specifications: {
      model: 'SDS-CWK Series',
      material: 'Prime Stainless Steel',
      dimensions: '10" × 10" up to 15" × 15"',
      weight: '750 gm to 1.650 kg',
    },
    applications: ['Home Mandir Altar', 'Temple Offerings Platform', 'Aarti & Festival Rituals'],
    listPrice: 750,
    discountPercent: 10,
    finalCustomerPrice: 675,
    variants: [
      { id: 'cwk-1', sizeName: 'Small (10" × 10" × 4")', dimensions: '10" × 10" × 4"', depth: '4"', weight: '0.750 kg', modelCode: 'SDS-CWK-1010', listPrice: 750, finalCustomerPrice: 675 },
      { id: 'cwk-2', sizeName: 'Medium (12" × 12" × 4.5")', dimensions: '12" × 12" × 4.5"', depth: '4.5"', weight: '1.100 kg', modelCode: 'SDS-CWK-1212', listPrice: 950, finalCustomerPrice: 855 },
      { id: 'cwk-3', sizeName: 'Large (15" × 15" × 5")', dimensions: '15" × 15" × 5"', depth: '5"', weight: '1.650 kg', modelCode: 'SDS-CWK-1515', listPrice: 1250, finalCustomerPrice: 1125 },
    ],
  },

  // 4. PATLA
  {
    id: 'mfg-patla',
    division: 'manufacturing',
    name: 'Patla',
    model: 'SDS-PTL Series',
    category: 'pooja-traditional',
    subcategory: 'Low Stools & Utility Platforms',
    productCode: 'SDS-M-PTL',
    shortDescription: 'Heavy-duty stainless steel low stool (patla) with ribbed anti-skid sitting platform and cross-braced heavy legs.',
    longDescription:
      'Robust low seating stool manufactured by Shree Durga Steels for kitchen preparation, traditional dining, prayer rituals, and bathroom utility. Constructed with heavy gauge steel tested for 150+ kg load bearing.',
    mainImage: '',
    galleryImages: [],
    keyFeatures: [
      'Ribbed Anti-Skid Surface for Safe Seating',
      'Cross-Braced Tubular Legs with Rubber Shoes',
      '150+ kg Structural Load Capacity',
      '100% Water-Resistant & Rust-Proof Lifetime Utility',
    ],
    specifications: {
      model: 'SDS-PTL Series',
      material: 'Stainless Steel',
      dimensions: '12" × 16" × 8" up to 16" × 20" × 10"',
      weight: '1.450 kg to 2.800 kg',
    },
    applications: ['Kitchen Floor Prep Work', 'Pooja Seating', 'Bathroom Utility Stool'],
    listPrice: 950,
    discountPercent: 10,
    finalCustomerPrice: 855,
    variants: [
      { id: 'ptl-1', sizeName: 'Standard (12" × 16" × 8")', dimensions: '12" × 16" × 8"', depth: '8"', weight: '1.450 kg', modelCode: 'SDS-PTL-1216', listPrice: 950, finalCustomerPrice: 855 },
      { id: 'ptl-2', sizeName: 'Heavy (14" × 18" × 9")', dimensions: '14" × 18" × 9"', depth: '9"', weight: '2.100 kg', modelCode: 'SDS-PTL-1418', listPrice: 1250, finalCustomerPrice: 1125 },
      { id: 'ptl-3', sizeName: 'Extra Heavy (16" × 20" × 10")', dimensions: '16" × 20" × 10"', depth: '10"', weight: '2.800 kg', modelCode: 'SDS-PTL-1620', listPrice: 1550, finalCustomerPrice: 1395 },
    ],
  },

  // 5. JHAVA (CHONGA)
  {
    id: 'mfg-jhava-chonga',
    division: 'manufacturing',
    name: 'Jhava (Chonga)',
    model: 'SDS-JHV Series (No. 10 to 18)',
    category: 'pooja-traditional',
    subcategory: 'Confectionery Frying Skimmers',
    productCode: 'SDS-M-JHV',
    shortDescription: 'Industrial halwai confectionery perforated frying skimmer and boondi/jalebi chonga with reinforced tubular steel handle up to 36 inches.',
    longDescription:
      'The essential high-temperature tool for commercial halwais and sweet makers. Deep perforated stainless steel dish formed for lifting hot frying sweets, straining boondi, and skimming large sugar syrup cauldrons.',
    mainImage: '',
    galleryImages: [],
    keyFeatures: [
      'Reinforced Tubular Welded Steel Handle Up to 36" Length',
      'Even Laser-Perforated Holes for Rapid Oil Drainage',
      'Solid Forged Rivets & TIG Seam Welds',
      'Heavy-Gauge Dish Resists Bending Under Dense Batches',
    ],
    specifications: {
      model: 'SDS-JHV Series',
      material: 'Heavy-Gauge Stainless Steel',
      dimensions: '10" Dia / 24" Handle up to 18" Dia / 36" Handle',
      weight: '850 gm to 2.450 kg',
    },
    applications: ['Halwai Frying Kadais', 'Boondi & Jalebi Production', 'Large-Scale Namkeen Frying'],
    listPrice: 850,
    discountPercent: 10,
    finalCustomerPrice: 765,
    isFeatured: true,
    variants: [
      { id: 'jh-10', sizeName: 'No. 10 (10" Dia / 24" Handle)', dimensions: '10" Dia × 24" Handle', depth: '3.0"', weight: '0.850 kg', modelCode: 'SDS-JHV-10', listPrice: 850, finalCustomerPrice: 765 },
      { id: 'jh-12', sizeName: 'No. 12 (12" Dia / 28" Handle)', dimensions: '12" Dia × 28" Handle', depth: '3.5"', weight: '1.150 kg', modelCode: 'SDS-JHV-12', listPrice: 1050, finalCustomerPrice: 945 },
      { id: 'jh-14', sizeName: 'No. 14 (14" Dia / 32" Handle)', dimensions: '14" Dia × 32" Handle', depth: '4.0"', weight: '1.500 kg', modelCode: 'SDS-JHV-14', listPrice: 1350, finalCustomerPrice: 1215 },
      { id: 'jh-16', sizeName: 'No. 16 (16" Dia / 36" Handle)', dimensions: '16" Dia × 36" Handle', depth: '4.5"', weight: '1.950 kg', modelCode: 'SDS-JHV-16', listPrice: 1750, finalCustomerPrice: 1575 },
      { id: 'jh-18', sizeName: 'No. 18 (18" Dia / 36" Handle)', dimensions: '18" Dia × 36" Handle', depth: '5.0"', weight: '2.450 kg', modelCode: 'SDS-JHV-18', listPrice: 2150, finalCustomerPrice: 1935 },
    ],
  },
];
