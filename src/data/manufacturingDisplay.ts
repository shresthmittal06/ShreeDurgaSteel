import { ProductItem } from '../types';

export const manufacturingDisplay: ProductItem[] = [
  // 1. GLASS STAND
  {
    id: 'mfg-glass-stand',
    division: 'manufacturing',
    name: 'Glass Stand',
    model: 'SDS-WGS Series (6 to 24 Khana)',
    category: 'glass-display',
    subcategory: 'Beverage Racks & Carriers',
    productCode: 'SDS-M-WGS',
    shortDescription: 'Heavy-gauge stainless steel wire glass holder and carrier with solid central carry handle for chai counters, juice bars, and cafes.',
    longDescription:
      'Engineered with electro-welded heavy stainless steel wires that will not bend or deform under fully loaded glasses. Designed with anti-rattle cell dimensions to prevent chipping of glass rims during fast transit.',
    mainImage: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
    galleryImages: [],
    keyFeatures: [
      'Heavy-Gauge Spot-Welded Stainless Wire Construction',
      'Solid Central Ergonomic Transport Handle',
      'Electro-Polished Chrome Finish Resists Water Marks',
      'Elevated Feet Prevent Counter Water Contact',
    ],
    specifications: {
      model: 'SDS-WGS Series',
      material: 'Austenitic Stainless Wire',
      dimensions: '6-Glass to 24-Glass Arrays',
      weight: '450 gm to 1.650 kg',
    },
    applications: ['Tea & Chai Stalls', 'Juice Centers & Cafes', 'Restaurant Pantry Service'],
    listPrice: 420,
    discountPercent: 10,
    finalCustomerPrice: 378,
    variants: [
      { id: 'wgs-6', sizeName: '6-Glass Stand', dimensions: '8" × 5.5" × 7"', depth: '7"', weight: '0.450 kg', modelCode: 'SDS-WGS-06', listPrice: 420, finalCustomerPrice: 378 },
      { id: 'wgs-8', sizeName: '8-Glass Stand', dimensions: '11" × 5.5" × 7"', depth: '7"', weight: '0.580 kg', modelCode: 'SDS-WGS-08', listPrice: 520, finalCustomerPrice: 468 },
      { id: 'wgs-12', sizeName: '12-Glass Stand', dimensions: '11" × 8" × 7.5"', depth: '7.5"', weight: '0.850 kg', modelCode: 'SDS-WGS-12', listPrice: 720, finalCustomerPrice: 648 },
      { id: 'wgs-18', sizeName: '18-Glass Stand', dimensions: '16" × 8" × 7.5"', depth: '7.5"', weight: '1.250 kg', modelCode: 'SDS-WGS-18', listPrice: 980, finalCustomerPrice: 882 },
      { id: 'wgs-24', sizeName: '24-Glass Stand', dimensions: '16" × 11" × 8"', depth: '8"', weight: '1.650 kg', modelCode: 'SDS-WGS-24', listPrice: 1280, finalCustomerPrice: 1152 },
    ],
  },

  // 2. GOLDEN GLASS STAND
  {
    id: 'mfg-golden-glass-stand',
    division: 'manufacturing',
    name: 'Golden Glass Stand',
    model: 'SDS-GGS Series',
    category: 'glass-display',
    subcategory: 'Luxury PVD Coated Carriers',
    productCode: 'SDS-M-GGS',
    shortDescription: 'Luxury PVD titanium gold coated stainless steel wire glass rack for VIP banquets, luxury hotels, and premium beverage presentation.',
    longDescription:
      'Coated with durable vacuum-deposited Titanium Nitride (PVD) gold over heavy stainless steel wire. Delivers an opulent gold sheen that does not tarnish, peel, or corrode from beverage spills or frequent cleaning.',
    mainImage: 'https://images.unsplash.com/photo-1577741314755-048d8525d31e?auto=format&fit=crop&w=800&q=80',
    galleryImages: [],
    keyFeatures: [
      'High-Durability PVD Titanium Gold Coating',
      'Scratch-Resistant Molecular Bonding',
      'Ideal for Luxury High-Tea & VIP Hospitality',
      'Solid Welded Carry Handle with Polished Tips',
    ],
    specifications: {
      model: 'SDS-GGS Series',
      material: 'PVD Titanium Gold on Stainless Steel',
      dimensions: '6-Glass & 12-Glass Arrays',
      weight: '520 gm to 980 gm',
    },
    applications: ['5-Star Hotel Lounges', 'High-Tea & Banquet Service', 'Boutique Cafes'],
    listPrice: 950,
    discountPercent: 10,
    finalCustomerPrice: 855,
    isFeatured: true,
    variants: [
      { id: 'ggs-6', sizeName: '6-Glass Royal Gold Stand', dimensions: '8" × 5.5" × 7"', depth: '7"', weight: '0.520 kg', modelCode: 'SDS-GGS-06', listPrice: 950, finalCustomerPrice: 855 },
      { id: 'ggs-12', sizeName: '12-Glass Royal Gold Stand', dimensions: '11" × 8" × 7.5"', depth: '7.5"', weight: '0.980 kg', modelCode: 'SDS-GGS-12', listPrice: 1550, finalCustomerPrice: 1395 },
    ],
  },

  // 3. GOLDEN TRAY
  {
    id: 'mfg-golden-tray',
    division: 'manufacturing',
    name: 'Golden Tray',
    model: 'SDS-PGT Series',
    category: 'glass-display',
    subcategory: 'Luxury PVD Gold Serving Trays',
    productCode: 'SDS-M-PGT',
    shortDescription: 'High-mirror PVD titanium gold finished stainless steel serving and counter showcase tray for luxury confectionery and elite banquet service.',
    longDescription:
      'Engineered for premium mithai houses, 5-star & 7-star hotel suites, and royal wedding banquets. The molecular PVD titanium gold finish is food-safe, scratch-resistant, and provides an extraordinary opulent presentation for premium sweets, dry fruits, and welcome drinks.',
    mainImage: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
    galleryImages: [],
    keyFeatures: [
      'Molecular PVD Titanium Gold Coating',
      'Food-Safe, Non-Toxic & Chemically Inert',
      'Ultra-Gloss Mirror Buffed Presentation Surface',
      'Elevates Confectionery Value in Luxury Counter Displays',
    ],
    specifications: {
      model: 'SDS-PGT Series',
      material: 'PVD Titanium Gold on Prime Stainless Steel',
      dimensions: '10.5" × 14.5" up to 16" × 24"',
      weight: '850 gm to 2.200 kg',
    },
    applications: ['Luxury Sweet Boutiques', '5-Star Hotel Banquet Displays', 'Wedding Welcome Trays'],
    listPrice: 1650,
    discountPercent: 10,
    finalCustomerPrice: 1485,
    isFeatured: true,
    variants: [
      { id: 'pgt-0', sizeName: 'No. 0 (10.5" × 14.5" Gold)', dimensions: '10.5" × 14.5" × 1.0"', depth: '1.0"', weight: '0.850 kg', modelCode: 'SDS-PGT-0', listPrice: 1650, finalCustomerPrice: 1485 },
      { id: 'pgt-1', sizeName: 'No. 1 (11.5" × 15.5" Gold)', dimensions: '11.5" × 15.5" × 1.0"', depth: '1.0"', weight: '0.980 kg', modelCode: 'SDS-PGT-1', listPrice: 1850, finalCustomerPrice: 1665 },
      { id: 'pgt-2', sizeName: 'No. 2 (12.5" × 16.5" Gold)', dimensions: '12.5" × 16.5" × 1.0"', depth: '1.0"', weight: '1.200 kg', modelCode: 'SDS-PGT-2', listPrice: 2150, finalCustomerPrice: 1935 },
      { id: 'pgt-3', sizeName: 'No. 3 (14.0" × 18.0" Gold)', dimensions: '14.0" × 18.0" × 1.0"', depth: '1.0"', weight: '1.450 kg', modelCode: 'SDS-PGT-3', listPrice: 2450, finalCustomerPrice: 2205 },
      { id: 'pgt-5', sizeName: 'No. 5 (16.0" × 24.0" Gold)', dimensions: '16.0" × 24.0" × 1.2"', depth: '1.2"', weight: '2.200 kg', modelCode: 'SDS-PGT-5', listPrice: 3200, finalCustomerPrice: 2880 },
    ],
  },
];
