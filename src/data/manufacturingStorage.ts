import { ProductItem } from '../types';

export const manufacturingStorage: ProductItem[] = [
  // 1. MASAL DANI (DOMESTIC)
  {
    id: 'mfg-masal-dani-domestic',
    division: 'manufacturing',
    name: 'Masal Dani (Domestic)',
    model: 'SDS-MDD Series (7 Cups)',
    category: 'storage-masala',
    subcategory: 'Domestic Spice Organizers',
    productCode: 'SDS-M-MDD',
    shortDescription: 'Classic round stainless steel 7-compartment spice box (Masala Dabba) with snug-fit aroma seal lid and spice measuring spoon for domestic kitchens.',
    longDescription:
      'Crafted from high-grade food-safe stainless steel with smooth rolled edges. Includes 7 individual stainless steel cups and a precision measuring spoon. Designed to preserve spice aromas and protect essential seasonings from moisture.',
    mainImage: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
    galleryImages: [],
    keyFeatures: [
      '7 Seamless Removable Inner Spice Cups',
      'Air-Snug Lid Preserves Natural Essential Spice Oils',
      'Food-Grade Non-Reactive Stainless Steel Alloy',
      'Includes Stainless Steel Measuring Spoon',
    ],
    specifications: {
      model: 'SDS-MDD Series',
      material: 'Food-Grade Stainless Steel',
      dimensions: '8" Diameter up to 10" Diameter',
      weight: '650 gm to 950 gm',
      tankCount: '7 Internal Cups',
    },
    applications: ['Domestic Home Kitchens', 'Gourmet Cooking', 'Traditional Spice Storage'],
    listPrice: 650,
    discountPercent: 10,
    finalCustomerPrice: 585,
    variants: [
      { id: 'mdd-8', sizeName: 'Small (8" Diameter / 7 Cups)', dimensions: '8.0" Dia × 3.0" Height', depth: '3.0"', weight: '0.650 kg', modelCode: 'SDS-MDD-08', listPrice: 650, finalCustomerPrice: 585 },
      { id: 'mdd-9', sizeName: 'Standard (9" Diameter / 7 Cups)', dimensions: '9.0" Dia × 3.2" Height', depth: '3.2"', weight: '0.800 kg', modelCode: 'SDS-MDD-09', listPrice: 750, finalCustomerPrice: 675 },
      { id: 'mdd-10', sizeName: 'Large (10" Diameter / 7 Cups)', dimensions: '10.0" Dia × 3.5" Height', depth: '3.5"', weight: '0.950 kg', modelCode: 'SDS-MDD-10', listPrice: 880, finalCustomerPrice: 792 },
    ],
  },

  // 2. MASAL DANI (COMMERCIAL)
  {
    id: 'mfg-masal-dani-commercial',
    division: 'manufacturing',
    name: 'Masal Dani (Commercial)',
    model: 'SDS-MDC Series (6 to 9 Cups)',
    category: 'storage-masala',
    subcategory: 'Commercial Kitchen Spice Stations',
    productCode: 'SDS-M-MDC',
    shortDescription: 'Heavy-duty rectangular stainless steel commercial chef spice station with 6 or 9 removable deep cups and heavy hinged cover.',
    longDescription:
      'Engineered for restaurant cook lines, tandoor stations, and fast-paced commercial kitchens. Features heavy-gauge stainless steel casing with a smooth-hinged cover that stays open during rush hours and locks tight during clean-down.',
    mainImage: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=80',
    galleryImages: [],
    keyFeatures: [
      'Heavy-Gauge Commercial Stainless Steel Housing',
      'Hinged Heavy Cover for Fast One-Handed Operation',
      '6 or 9 Deep Removable Commercial Cups',
      'Easy Dishwasher Sanitization for All Components',
    ],
    specifications: {
      model: 'SDS-MDC Series',
      material: 'AISI 304 Stainless Steel',
      dimensions: '14" × 10" up to 18" × 12"',
      weight: '2.100 kg to 3.400 kg',
      tankCount: '6 or 9 Commercial Cups',
    },
    applications: ['Restaurant Cook Lines', 'Tandoor & Curry Stations', 'Hotel Banquet Prep'],
    listPrice: 1850,
    discountPercent: 10,
    finalCustomerPrice: 1665,
    isFeatured: true,
    variants: [
      { id: 'mdc-6', sizeName: '6-Cup Commercial Console', dimensions: '14.0" × 10.0" × 3.5"', depth: '3.5"', weight: '2.100 kg', modelCode: 'SDS-MDC-06', listPrice: 1850, finalCustomerPrice: 1665 },
      { id: 'mdc-8', sizeName: '8-Cup Commercial Console', dimensions: '16.0" × 11.0" × 3.5"', depth: '3.5"', weight: '2.700 kg', modelCode: 'SDS-MDC-08', listPrice: 2250, finalCustomerPrice: 2025 },
      { id: 'mdc-9', sizeName: '9-Cup Commercial Console', dimensions: '18.0" × 12.0" × 3.8"', depth: '3.8"', weight: '3.400 kg', modelCode: 'SDS-MDC-09', listPrice: 2650, finalCustomerPrice: 2385 },
    ],
  },

  // 3. MASAL DANI (JUMBO)
  {
    id: 'mfg-masal-dani-jumbo',
    division: 'manufacturing',
    name: 'Masal Dani (Jumbo)',
    model: 'SDS-MDJ Series (12 Containers)',
    category: 'storage-masala',
    subcategory: 'High-Capacity Spice Consoles',
    productCode: 'SDS-M-MDJ',
    shortDescription: 'High-capacity 12-compartment jumbo spice console engineered for central kitchens, catering commissaries, and large banquet lines.',
    longDescription:
      'Massive capacity spice management station featuring 12 deep GN-style rectangular or square spice wells. Designed to hold full bulk batches of whole and ground spices without needing frequent mid-service refills.',
    mainImage: 'https://images.unsplash.com/photo-1506368249639-73a05d6f6488?auto=format&fit=crop&w=800&q=80',
    galleryImages: [],
    keyFeatures: [
      '12 Individual High-Volume Deep Compartments',
      'Dual-Fold Heavy-Duty Counter Lid',
      'Resistant to Acidic Masala Salts, Turmeric & Oil Stains',
      'Sturdy Base with Rubber Dampener Feet',
    ],
    specifications: {
      model: 'SDS-MDJ Series',
      material: 'AISI 304 Prime Stainless Steel',
      dimensions: '22" × 14" × 4.2"',
      weight: '4.800 kg',
      tankCount: '12 Deep Jumbo Wells',
    },
    applications: ['Central Prep Kitchens', 'Institutional Caterers', 'Bulk Biryani & Curry Operations'],
    listPrice: 3400,
    discountPercent: 10,
    finalCustomerPrice: 3060,
    variants: [
      { id: 'mdj-12', sizeName: 'Jumbo 12-Container Station', dimensions: '22.0" × 14.0" × 4.2"', depth: '4.2"', weight: '4.800 kg', modelCode: 'SDS-MDJ-12', listPrice: 3400, finalCustomerPrice: 3060 },
      { id: 'mdj-12d', sizeName: 'Jumbo 12-Container Dual-Tier Station', dimensions: '20.0" × 12.0" × 8.0"', depth: '8.0"', weight: '5.600 kg', modelCode: 'SDS-MDJ-12DT', listPrice: 4200, finalCustomerPrice: 3780 },
    ],
  },
];
