import {
  BrandConfig,
  HeroConfig,
  CompanyStat,
  IndustrySolution,
  QualityDetail,
  ProductItem,
  HeaderNavItem,
  PartyLogo,
} from '../types';
import { defaultCategories } from './categories';
import { commercialProducts } from './commercialProducts';
import { gnPanProducts } from './gnPanProducts';
import { manufacturingProducts } from './manufacturingProducts';

export { defaultCategories } from './categories';
export { commercialProducts } from './commercialProducts';
export { gnPanProducts } from './gnPanProducts';
export { manufacturingProducts } from './manufacturingProducts';

export const defaultHeaderNavItems: HeaderNavItem[] = [
  { id: 'nav-kitchenware-utility', label: 'Kitchenware & Home Utility', page: 'manufacturing', visible: true },
  { id: 'nav-kitchen-equipment', label: 'Kitchen Equipment', page: 'commercial', visible: true },
  { id: 'nav-gn-pans', label: 'GN Pans', page: 'gnpans', visible: true },
  { id: 'nav-solutions', label: 'Industries / Solutions', page: 'solutions', visible: true },
  { id: 'nav-about', label: 'About Us', page: 'about', visible: true },
  { id: 'nav-projects', label: 'Projects / Applications', page: 'projects', visible: true },
  { id: 'nav-resources', label: 'Quotation Selector', page: 'pricesheet', visible: true },
];

export const defaultBrand: BrandConfig = {
  brandName: 'SHREE DURGA STEELS',
  companyName: 'Shree Durga Steels',
  tagline: 'Commercial Kitchen Equipment & In-House Stainless Steel Manufacturing',
  headerTagline: 'COMMERCIAL KITCHEN & MANUFACTURING',
  established: '1998',
  location: 'India',
  phone: '+91 99978 90127',
  phone2: '+91 84450 77779',
  whatsapp: '+91 70178 23423',
  email: 'info@shreedurgasteels.com',
  website: 'https://shreedurgasteels.com',
  address: 'Infront of Ganesh city colony, Kalvari Rd, near FCI Godown, Hathras, Uttar Pradesh 204101',
  primaryMarket: 'Pan-India & International Hospitality Markets',
  businessType: 'Dual Pillar: Commercial Kitchen Equipment & In-House Manufacturing',
  mainUSP: 'Prime Food-Grade Stainless Steel, Rigorous Thermal Engineering & High-Capacity Confectionery Hardware',
  logoText: 'SHREE DURGA STEELS',
  logoStyle: 'both',
  headerNavItems: defaultHeaderNavItems,
  headerWhatsappText: 'WHATSAPP',
  headerQuoteText: 'GET A QUOTE',
  showHeaderWhatsapp: true,
  showHeaderQuote: true,
  portalCategoryImages: {
    commercial: '/images/products/tsl81_front.jpg',
    gnpans: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
    manufacturing: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
  },
  contacts: [
    {
      id: 'c-sales',
      label: 'Direct Commercial Sales Desk',
      number: '+91 99978 90127',
      type: 'sales',
      isPrimary: true,
    },
    {
      id: 'c-factory',
      label: 'Factory & Plant Operations Desk',
      number: '+91 84450 77779',
      type: 'office',
    },
    {
      id: 'c-wa',
      label: 'Direct WhatsApp B2B Inquiry',
      number: '+91 70178 23423',
      type: 'whatsapp',
    },
    {
      id: 'c-dispatch',
      label: 'Factory Dispatch & Logistics',
      number: '+91 22 2847 1100',
      type: 'phone',
    },
  ],
};

export const defaultHero: HeroConfig = {
  mainHeadline: 'EQUIPPING THE WORLD’S FINEST KITCHENS & CONFECTIONERIES.',
  supportingText:
    'Two distinct pillars under one revered brand: Commercial Kitchen & Cooking Appliances alongside In-House Precision Stainless Steel Manufacturing for hotels, restaurants, and luxury sweet houses.',
  primaryCtaText: 'COMMERCIAL KITCHEN',
  secondaryCtaText: 'IN-HOUSE MANUFACTURING',
  heroImage:
    'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=2000&q=85',
};

export const defaultStats: CompanyStat[] = [
  {
    id: 'stat-products',
    value: '100',
    suffix: '+',
    label: 'CATALOGUE PRODUCTS',
    sublabel: 'Commercial appliances & manufacturing items',
  },
  {
    id: 'stat-years',
    value: '26',
    suffix: '+',
    label: 'YEARS OF CRAFTSMANSHIP',
    sublabel: 'Dedicated foodservice & confectionery engineering',
  },
  {
    id: 'stat-clients',
    value: '5,000',
    suffix: '+',
    label: 'INSTALLATIONS & CLIENTS',
    sublabel: 'Hotels, sweet chains, QSRs & caterers',
  },
  {
    id: 'stat-markets',
    value: '100',
    suffix: '%',
    label: 'FOOD-GRADE STAINLESS STEEL',
    sublabel: 'Heavy-gauge prime alloy precision metallurgy',
  },
];

export const defaultProducts: ProductItem[] = [
  ...commercialProducts,
  ...gnPanProducts,
  ...manufacturingProducts,
];

export const defaultSolutions: IndustrySolution[] = [
  {
    id: 'sol-hotels',
    name: '5-Star & 7-Star Hotels & Resorts',
    tagline: 'Heavy-Duty Culinary Reliability & Luxury Presentation',
    description:
      'Engineered appliances and PVD Titanium Gold banqueting hardware meeting strict international hotel safety, NSF hygiene norms, and aesthetic standards.',
    equipmentFocus: [
      'High-Output Induction & Salamanders',
      'Refractory Stone Deck Pizza Ovens',
      'PVD Golden Banquet Trays & Stands',
      'Standard Gastronorm (GN) Pan Systems',
    ],
    image:
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sol-confectionery',
    name: 'Confectioneries & Traditional Sweet Houses',
    tagline: 'Crafted Trays & Syrups Retention Systems',
    description:
      'Over 40 configurations of Barfi, Rasgulla, Sandesh, and Mithai display trays manufactured in-house with leak-proof drawn corners and mirror finishes.',
    equipmentFocus: [
      'Barfi Trays in 1", 0.4", 0.6" & 1.2" Depths',
      'Deep Rasgulla Trays With Syrup Retention',
      'Seamless Joint-Free Mithai Trays',
      'Heavy Stainless Masal Danis & Jhavas',
    ],
    image:
      'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sol-restaurants',
    name: 'Restaurants, QSRs & Cloud Kitchens',
    tagline: 'Continuous High-Volume Production Equipment',
    description:
      'Rapid recovery electric fryers, heavy cast-iron contact grills, 8mm steel griddles, and induction ranges built for nonstop rush hour cooking.',
    equipmentFocus: [
      'Single & Double Tank Electric Fryers',
      'Dual Head Cast-Iron Contact Grills',
      'Electric Salamanders & Flat Griddles',
      'GN Food Prep & Storage Containers',
    ],
    image:
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'sol-banquets',
    name: 'Banquets, Caterers & Institutional Kitchens',
    tagline: 'Mass Capacity Batching & Transport Logistics',
    description:
      'Durable trays with covers, jumbo batch trays, wire glass racks, and multi-tier steamers built for rapid setup and heavy transit.',
    equipmentFocus: [
      'Stainless Trays With Matching Covers',
      'Wire Glass Racks (6 to 24 Khana)',
      'Jumbo Preparation Trays (Up to 29.4")',
      'Heavy Food Grade Momos & Dim Sum Steamers',
    ],
    image:
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
  },
];

export const defaultIndustries: IndustrySolution[] = defaultSolutions;

export const defaultQualityPillars: QualityDetail[] = [
  {
    id: 'qual-mat',
    title: 'PRIME FOOD-GRADE STAINLESS STEEL',
    subtitle: 'Uncompromising Metallurgy',
    description:
      'We use certified food-grade Austenitic Stainless Steel with heavy sheet gauges (1.2mm to 2.0mm) that resist acid pitting, high salinity, and continuous commercial washdowns.',
    points: [
      'Certified non-magnetic food-grade composition',
      'Laser-cut edges deburred and buffed to silk mirror finish',
      'Superior resistance in high-steam and acidic kitchen environments',
    ],
  },
  {
    id: 'qual-heat',
    title: 'THERMAL EFFICIENCY & HEAT CONTROL',
    subtitle: 'Instant Recovery & Longevity',
    description:
      'High-density Incoloy immersion elements, heavy refractory pizza stones, and pure copper induction coils engineered for continuous commercial duty cycles without burn-out.',
    points: [
      'Sub-second thermal reaction times',
      'Dual safety temperature limiters with automatic cut-off',
      'Solid-state relays and high-density heating elements',
    ],
  },
  {
    id: 'qual-erg',
    title: 'PRACTICAL SANITARY ENGINEERING',
    subtitle: 'Zero Grease & Zero Crevice Philosophy',
    description:
      'Every corner, weld, and seam is planned for zero-food entrapment. Seamless deep-drawn sweet trays without joint crevices, rounded internal corners, and tool-free maintenance.',
    points: [
      'Seamless without-joint deep drawn mithai trays',
      'Splash-proof appliance control panels with high heat gaskets',
      'Removable fryer oil tanks and easy-clean grease drawers',
    ],
  },
  {
    id: 'qual-test',
    title: 'IN-HOUSE WORKMANSHIP & FACTORY TESTING',
    subtitle: 'Zero-Defect B2B Delivery Standard',
    description:
      'Each appliance and manufactured stainless piece undergoes strict bench testing, dimension checking, and surface inspection prior to dispatch.',
    points: [
      'Electrical dielectric breakdown and earth bond tests',
      'Leak-test verification for all deep sweet & rasgulla trays',
      'Heavy wood-crate and protective bubble packaging for transit',
    ],
  },
];

export const whyChooseUsPillars = [
  {
    title: 'DUAL-PILLAR CAPABILITY',
    desc: 'One reliable partner for both branded commercial cooking equipment and custom in-house stainless steel fabrication.',
  },
  {
    title: 'AUTHENTIC MANUFACTURING DEPTH',
    desc: 'Decades of metal stamping, deep-drawing, and tig-welding experience producing over 40 tray varieties and specialized culinary hardware.',
  },
  {
    title: 'DIRECT B2B TRANSPARENCY & PRICING',
    desc: 'Structured wholesale list pricing, transparent volume discounts, and verified net pricing for institutional buyers.',
  },
  {
    title: 'STRICT FOOD HYGIENE & SANITATION',
    desc: 'Every tray, pot, and appliance is manufactured exclusively with certified food-grade stainless steel with smooth radiused corners.',
  },
  {
    title: 'CUSTOM SPECIFICATION SUPPORT',
    desc: 'Ability to customize dimensions, sheet gauges, and PVD titanium finishes for boutique hotels and signature hospitality projects.',
  },
  {
    title: 'DEDICATED MULTI-CHANNEL DESK',
    desc: 'Direct access to equipment specialists, factory dispatch coordinators, and rapid WhatsApp quotation services.',
  },
];

export const defaultPartyLogos: PartyLogo[] = [
  { id: 'party-1', name: 'Party / Client 01', logoUrl: '' },
  { id: 'party-2', name: 'Party / Client 02', logoUrl: '' },
  { id: 'party-3', name: 'Party / Client 03', logoUrl: '' },
  { id: 'party-4', name: 'Party / Client 04', logoUrl: '' },
  { id: 'party-5', name: 'Party / Client 05', logoUrl: '' },
  { id: 'party-6', name: 'Party / Client 06', logoUrl: '' },
  { id: 'party-7', name: 'Party / Client 07', logoUrl: '' },
  { id: 'party-8', name: 'Party / Client 08', logoUrl: '' },
  { id: 'party-9', name: 'Party / Client 09', logoUrl: '' },
  { id: 'party-10', name: 'Party / Client 10', logoUrl: '' },
  { id: 'party-11', name: 'Party / Client 11', logoUrl: '' },
  { id: 'party-12', name: 'Party / Client 12', logoUrl: '' },
];
