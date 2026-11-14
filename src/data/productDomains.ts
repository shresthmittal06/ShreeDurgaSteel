import { ProductDomainId, ProductDomainInfo, ProductItem } from '../types';

export const PRODUCT_DOMAINS: ProductDomainInfo[] = [
  {
    id: 'cooking',
    name: 'Cooking',
    tagline: 'Commercial Induction & Stoves',
    description: 'Heavy-duty single & double tank electric fryers, 3.5 kW & 5.0 kW flat & concave wok induction units, and high-output cooking equipment.',
    image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=900&q=80',
    badge: 'COMMERCIAL COOKING',
    order: 1,
  },
  {
    id: 'baking',
    name: 'Baking',
    tagline: 'Pizza Ovens & Loaf Bread Moulds',
    description: 'Refractory stone deck pizza ovens (up to 350°C), heavy commercial bakery loaf bread moulds with sliding covers, and waffle bakers.',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80',
    badge: 'BAKING & PIZZA',
    order: 2,
  },
  {
    id: 'steaming',
    name: 'Steaming',
    tagline: 'Multi-Tier Momo & Dim Sum Steamers',
    description: 'Heavy-duty food-grade stainless steel 4-tier and 5-tier momo steamers (400mm–450mm) engineered for uniform steam circulation.',
    image: 'https://images.unsplash.com/photo-1541696432-82c6da8ce7bf?auto=format&fit=crop&w=900&q=80',
    badge: 'STEAMING EQUIPMENT',
    order: 3,
  },
  {
    id: 'food-storage',
    name: 'Food Storage',
    tagline: 'Gastronorm GN Pans & Masala Dani',
    description: 'Certified EN-631 Gastronorm GN containers (1/1 to 2/1), gelato pans, and domestic & commercial 4–12 cup spice consoles.',
    image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=900&q=80',
    badge: 'FOOD STORAGE & PANS',
    order: 4,
  },
  {
    id: 'grilling',
    name: 'Grilling',
    tagline: 'Sandwich Contact Grills & 8mm Griddles',
    description: 'Cast-iron ribbed contact sandwich grillers, heavy 8mm steel electric griddles, and overhead salamander finishing grills.',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=900&q=80',
    badge: 'GRILLING & SEARING',
    order: 5,
  },
  {
    id: 'toasting',
    name: 'Toasting',
    tagline: 'Commercial Pop-Up Electric Toasters',
    description: 'Fast-cycle 4-slice and 6-slice electric pop-up toasters with heavy heating coils and dual side crumb retrieval trays.',
    image: 'https://images.unsplash.com/photo-1583778176476-4a8b02a64c01?auto=format&fit=crop&w=900&q=80',
    badge: 'COMMERCIAL TOASTING',
    order: 6,
  },
  {
    id: 'serving-presentation',
    name: 'Serving & Presentation',
    tagline: 'Mithai Trays & Wire Glass Stands',
    description: 'Over 12 confectionery display tray formats (Barfi, Rasgulla, Sandesh, Taper), wire glass racks (6–24 glasses), and PVD titanium gold trays.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=900&q=80',
    badge: 'SERVING & DISPLAY',
    order: 7,
  },
  {
    id: 'traditional-specialty',
    name: 'Traditional & Utility',
    tagline: 'Devotional Metalware, Safes & Halwai Gear',
    description: 'Handcrafted stainless Pooja Peti, cash Gullak safes, Chowki platforms, Patla stools, Perforated Halwai Jhavas, and hygiene dust lifters.',
    image: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?auto=format&fit=crop&w=900&q=80',
    badge: 'TRADITIONAL & UTILITY',
    order: 8,
  },
];

/**
 * Accurately determines the domain category of any product in the catalog.
 */
export function getProductDomain(product: ProductItem): ProductDomainId {
  const cat = (product.category || '').toLowerCase();
  const name = (product.name || '').toLowerCase();
  const model = (product.model || '').toLowerCase();
  const id = (product.id || '').toLowerCase();
  const subcat = (product.subcategory || '').toLowerCase();

  // 1. Toasting
  if (
    cat === 'toasters' ||
    name.includes('toaster') ||
    model.includes('ets-') ||
    name.includes('pop-up')
  ) {
    return 'toasting';
  }

  // 2. Grilling
  if (
    cat === 'sandwich-grillers' ||
    cat === 'griddles' ||
    cat === 'salamanders' ||
    name.includes('griller') ||
    name.includes('contact grill') ||
    name.includes('griddle') ||
    name.includes('salamander') ||
    model.includes('cpg-') ||
    model.includes('eg-') ||
    model.includes('eb-')
  ) {
    return 'grilling';
  }

  // 3. Baking
  if (
    cat === 'baking-equipment' ||
    cat === 'pizza-ovens' ||
    name.includes('pizza') ||
    name.includes('waffle') ||
    name.includes('bread mould') ||
    id.includes('bread-mould') ||
    subcat.includes('bread mould')
  ) {
    return 'baking';
  }

  // 4. Steaming
  if (
    cat === 'steaming-equipment' ||
    name.includes('steamer') ||
    name.includes('momo') ||
    name.includes('dim sum')
  ) {
    return 'steaming';
  }

  // 5. Food Storage
  if (
    cat === 'gn-pans' ||
    cat === 'masala-boxes' ||
    cat === 'storage-masala' ||
    name.includes('gn pan') ||
    name.includes('gastronorm') ||
    name.includes('gelato') ||
    name.includes('masal dani') ||
    name.includes('masala box') ||
    name.includes('spice box') ||
    name.includes('storage') ||
    subcat.includes('masala dani')
  ) {
    return 'food-storage';
  }

  // 6. Traditional & Specialty
  if (
    cat === 'pooja-traditional' ||
    name.includes('pooja') ||
    name.includes('gullak') ||
    name.includes('chowki') ||
    name.includes('patla') ||
    name.includes('jhava') ||
    name.includes('chonga') ||
    name.includes('dust lifter') ||
    id.includes('dust-lifter') ||
    subcat.includes('pooja') ||
    subcat.includes('traditional')
  ) {
    return 'traditional-specialty';
  }

  // 7. Serving & Presentation
  if (
    cat === 'trays' ||
    cat === 'glass-display' ||
    cat === 'custom-manufacturing' ||
    name.includes('tray') ||
    name.includes('glass stand') ||
    name.includes('golden stand') ||
    name.includes('barfi') ||
    name.includes('rasgulla') ||
    name.includes('sandesh') ||
    name.includes('mithai') ||
    subcat.includes('trays') ||
    subcat.includes('display')
  ) {
    return 'serving-presentation';
  }

  // 8. Cooking (Default for fryers, induction, etc.)
  if (
    cat === 'fryers' ||
    cat === 'induction-cookers' ||
    name.includes('fryer') ||
    name.includes('induction') ||
    name.includes('cooker') ||
    name.includes('kadai')
  ) {
    return 'cooking';
  }

  return product.division === 'manufacturing' ? 'serving-presentation' : 'cooking';
}

export const DOMAIN_LABEL_MAP: Record<ProductDomainId, string> = {
  cooking: 'Cooking',
  baking: 'Baking',
  steaming: 'Steaming',
  'food-storage': 'Food Storage',
  grilling: 'Grilling',
  toasting: 'Toasting',
  'serving-presentation': 'Serving & Presentation',
  'traditional-specialty': 'Traditional & Utility',
};
