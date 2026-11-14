import { ProductItem } from '../types';

export const manufacturingOther: ProductItem[] = [
  // 1. DUST LIFTER
  {
    id: 'mfg-dust-lifter',
    division: 'manufacturing',
    name: 'Dust Lifter',
    model: 'SDS-DLF Series',
    category: 'other-manufactured',
    subcategory: 'Sanitary Waste & Flour Scoops',
    productCode: 'SDS-M-DLF',
    shortDescription: 'Heavy-duty food-grade stainless steel dust lifter / debris scoop with ergonomically welded tubular handle for commercial food processing facilities.',
    longDescription:
      'Engineered for industrial sweet production units, commercial bakeries, and food processing lines. Crafted from thick stainless steel with reinforced bottom edge to collect floor dust, dry flour spills, and food prep debris without cracking or degrading like plastic pans.',
    mainImage: '',
    galleryImages: [],
    keyFeatures: [
      'Heavy 1.2 mm Food-Safe Stainless Steel Construction',
      'Solid Welded Tubular Steel Handle (Upright & Angled Options)',
      'Sharp Ground Leading Edge for Complete Floor Contact',
      'Impervious to Moisture, Oil, Chemicals & Thermal Cleaning',
    ],
    specifications: {
      model: 'SDS-DLF Series',
      material: 'Stainless Steel AISI 304',
      dimensions: '12" × 12" Scoop with 30" Upright Handle',
      weight: '1.450 kg to 2.200 kg',
    },
    applications: ['Industrial Food Bakeries', 'Sweet Production Plants', 'Commercial Kitchen Hygiene Maintenance'],
    listPrice: 850,
    discountPercent: 10,
    finalCustomerPrice: 765,
    variants: [
      { id: 'dlf-std', sizeName: 'Standard Handheld Dust Lifter', dimensions: '10" × 10" × 3" (Short Handle)', depth: '3.0"', weight: '0.950 kg', modelCode: 'SDS-DLF-SH', listPrice: 850, finalCustomerPrice: 765 },
      { id: 'dlf-long', sizeName: 'Long-Handle Commercial Dust Lifter', dimensions: '12" × 12" × 4" with 32" Upright Pipe', depth: '4.0"', weight: '1.850 kg', modelCode: 'SDS-DLF-LH', listPrice: 1350, finalCustomerPrice: 1215 },
    ],
  },

  // 2. BREAD MOULD
  {
    id: 'mfg-bread-mould',
    division: 'manufacturing',
    name: 'Bread Mould',
    model: 'SDS-BMD Series',
    category: 'other-manufactured',
    subcategory: 'Commercial Bakery Moulds',
    productCode: 'SDS-M-BMD',
    shortDescription: 'Industrial commercial bakery loaf bread mould with sliding lock-cover manufactured from heavy aluminized/stainless steel.',
    longDescription:
      'Manufactured for commercial sandwich bread and artisan loaf production. Built with rigid folded corners, wire-reinforced rims, and drop-forged sliding covers to produce uniform, square sandwich bread slices with tender crumb texture.',
    mainImage: '',
    galleryImages: [],
    keyFeatures: [
      'Heavy-Gauge Heat-Conductive Metallurgy',
      'Sliding Lock-Lid for Perfect Pullman Square Loaves',
      'Smooth Internal Corrugation for Clean Loaf Release',
      'Available in Single Loaf and Multiple Gang Sets',
    ],
    specifications: {
      model: 'SDS-BMD Series',
      material: 'Aluminized Steel / Stainless Steel',
      dimensions: '8" × 4" × 4" up to 16" × 4.5" × 4.5"',
      weight: '650 gm to 2.400 kg',
    },
    applications: ['Commercial Bread Bakeries', 'Sandwich Bread Factories', 'Artisan Toast Bakeries'],
    listPrice: 550,
    discountPercent: 10,
    finalCustomerPrice: 495,
    variants: [
      { id: 'bmd-400', sizeName: '400 gm Loaf Mould with Lid', dimensions: '8.5" × 4.0" × 4.0"', depth: '4.0"', weight: '0.650 kg', modelCode: 'SDS-BMD-400', listPrice: 550, finalCustomerPrice: 495 },
      { id: 'bmd-800', sizeName: '800 gm Jumbo Sandwich Mould with Lid', dimensions: '13.0" × 4.5" × 4.5"', depth: '4.5"', weight: '0.980 kg', modelCode: 'SDS-BMD-800', listPrice: 780, finalCustomerPrice: 702 },
      { id: 'bmd-gang3', sizeName: '3-Strap Connected Gang Mould', dimensions: '14.0" × 14.0" × 4.5"', depth: '4.5"', weight: '2.400 kg', modelCode: 'SDS-BMD-G3', listPrice: 1850, finalCustomerPrice: 1665 },
    ],
  },

  // 3. GOLDEN TRAY – CUSTOMIZED
  {
    id: 'mfg-golden-tray-customized',
    division: 'manufacturing',
    name: 'Golden Tray – Customized',
    model: 'SDS-CUS-GOLD',
    category: 'custom-manufacturing',
    subcategory: 'Bespoke Luxury Metalware',
    productCode: 'SDS-M-CUS-GOLD',
    shortDescription: 'Custom-dimensioned PVD titanium gold luxury display trays with personalized brand logo laser-etching, custom border contours, and custom depths.',
    longDescription:
      'Shree Durga Steels provides end-to-end bespoke customization for leading confectionery brands, royal palace catering, and luxury hotel chains. We fabricate custom tray geometries to fit client display counter showcases exactly, coated in custom PVD hues including Royal Gold, Rose Gold, Antique Bronze, and Champagne Gold.',
    mainImage: '',
    galleryImages: [],
    keyFeatures: [
      'Bespoke Dimensions to Exact Counter Millimeter Tolerances',
      'High-Precision Fiber Laser Logo Branding & Monograms',
      'PVD Coating Options: Royal Gold, Rose Gold, Black Titanium, Champagne',
      'Food-Grade Vacuum Deposition (100% Food-Safe & Dishwasher Safe)',
    ],
    specifications: {
      model: 'SDS-CUS-GOLD Series',
      material: 'AISI 304 Prime Stainless Steel + Titanium PVD',
      dimensions: 'Custom Manufactured to Order (6" to 36" Spans)',
      weight: 'Custom According to Gauge & Size',
    },
    applications: ['Flagship Confectionery Showrooms', 'Luxury Hotel Presidential Suites', 'Corporate Festive Gift Hampers'],
    listPrice: 2200,
    discountPercent: 10,
    finalCustomerPrice: 1980,
    isFeatured: true,
    variants: [
      { id: 'cusg-logo', sizeName: 'Custom Size with Laser Logo Etching', dimensions: 'Client Specified', depth: '0.4" to 2.5"', weight: 'As Specified', modelCode: 'SDS-CG-LOGO', listPrice: 2200, finalCustomerPrice: 1980 },
      { id: 'cusg-rose', sizeName: 'Custom Rose Gold Titanium Tray', dimensions: 'Client Specified', depth: '0.4" to 2.5"', weight: 'As Specified', modelCode: 'SDS-CG-ROSE', listPrice: 2450, finalCustomerPrice: 2205 },
      { id: 'cusg-champagne', sizeName: 'Custom Champagne / Bronze Titanium Tray', dimensions: 'Client Specified', depth: '0.4" to 2.5"', weight: 'As Specified', modelCode: 'SDS-CG-CHAMP', listPrice: 2450, finalCustomerPrice: 2205 },
    ],
  },

  // 4. FUTURE CUSTOM STAINLESS-STEEL TRAY PRODUCTS
  {
    id: 'mfg-future-custom-tray-products',
    division: 'manufacturing',
    name: 'Future Custom Stainless-Steel Tray Products',
    model: 'SDS-OEM-CUSTOM',
    category: 'custom-manufacturing',
    subcategory: 'OEM & Contract Fabrication',
    productCode: 'SDS-M-OEM-CUSTOM',
    shortDescription: 'In-house tooling, die development, and custom deep-drawing contract manufacturing for bespoke stainless steel trays and specialized food service hardware.',
    longDescription:
      'Backed by 25+ years of in-house tooling, press shops, hydraulic deep-drawing machines, and TIG welding infrastructure at Shree Durga Steels. We partner with commercial kitchen consultants, chain restaurateurs, and confectionery enterprises to prototype, test, and mass-produce custom stainless steel products tailored to exact specifications.',
    mainImage: '',
    galleryImages: [],
    keyFeatures: [
      'Full In-House Tool Room, Dies & Hydraulic Press Lines',
      'Rapid Prototyping (CAD Design to Sample in 7-10 Days)',
      'High-Volume Contract Production Scalability',
      'Certified Material Test Certificates (304 / 316 Food Grade)',
    ],
    specifications: {
      model: 'SDS-OEM-CUSTOM',
      material: 'Prime 304, 316, or 200-Series Stainless Steel',
      dimensions: 'Custom Tooling According to Client Drawings',
      weight: 'Custom Specifications',
    },
    applications: ['Turnkey Commercial Kitchen Chains', 'Export Private Label Brands', 'Custom Food Processing Machines'],
    listPrice: 5000,
    discountPercent: 10,
    finalCustomerPrice: 4500,
    variants: [
      { id: 'oem-proto', sizeName: 'Custom Tooling & Prototype Batch', dimensions: 'Client CAD Spec', depth: 'Custom', weight: 'Custom', modelCode: 'SDS-OEM-PROTO', listPrice: 5000, finalCustomerPrice: 4500 },
      { id: 'oem-volume', sizeName: 'High-Volume Production Run (1000+ Units)', dimensions: 'Client CAD Spec', depth: 'Custom', weight: 'Custom', modelCode: 'SDS-OEM-MASS', listPrice: 15000, finalCustomerPrice: 13500 },
    ],
  },
];
