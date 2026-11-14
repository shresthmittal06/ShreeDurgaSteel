export interface ContactEntry {
  id: string;
  label: string; // e.g. 'Sales', 'Office', 'WhatsApp', 'Factory / Dispatch'
  number: string;
  type: 'phone' | 'whatsapp' | 'office' | 'sales';
  isPrimary?: boolean;
}

export interface HeaderNavItem {
  id: string;
  label: string;
  page: ActivePage;
  visible?: boolean;
}

export interface BrandConfig {
  brandName: string;
  companyName: string;
  tagline: string;
  headerTagline?: string; // Subtitle/tagline specifically displayed under the brand title in top header
  established: string;
  location: string;
  phone: string;
  phone2?: string;
  whatsapp: string;
  email: string;
  website: string;
  address: string;
  primaryMarket: string;
  businessType: string;
  mainUSP: string;
  logoText: string;
  logoImage?: string;
  logoStyle?: 'image' | 'text' | 'both';
  contacts: ContactEntry[];

  // Top Bar / Header Customization
  headerNavItems?: HeaderNavItem[];
  headerWhatsappText?: string;
  headerQuoteText?: string;
  showHeaderWhatsapp?: boolean;
  showHeaderQuote?: boolean;

  // Portal Category Images on Homepage (Category 01, Category 02, Category 03)
  portalCategoryImages?: {
    commercial?: string;
    gnpans?: string;
    manufacturing?: string;
  };
}

export interface HeroConfig {
  mainHeadline: string;
  supportingText: string;
  primaryCtaText: string;
  secondaryCtaText: string;
  heroImage: string;
}

export interface CompanyStat {
  id: string;
  value: string;
  suffix: string;
  label: string;
  sublabel?: string;
}

export interface PartyLogo {
  id: string;
  name: string;
  logoUrl?: string;
  websiteUrl?: string;
}

export type BusinessDivision = 'commercial' | 'manufacturing';

export type ProductDomainId =
  | 'cooking'
  | 'baking'
  | 'steaming'
  | 'food-storage'
  | 'grilling'
  | 'toasting'
  | 'serving-presentation'
  | 'traditional-specialty';

export interface ProductDomainInfo {
  id: ProductDomainId;
  name: string;
  tagline: string;
  description: string;
  image: string;
  badge: string;
  order: number;
}

export interface ProductCategory {
  id: string;
  slug: string;
  name: string;
  division: BusinessDivision;
  shortDescription: string;
  image: string;
  order: number;
}

export interface KeySpecification {
  label: string;
  value: string;
}

export interface ProductSizeVariant {
  id: string;
  sizeName: string; // e.g. 'No. 000 (0.4" depth)', '1/1 GN Pan (65mm)', '6-Cup Box'
  dimensions?: string; // e.g. '10.5" × 14.5" × 0.4"', '530 × 325 × 65 mm'
  depth?: string; // e.g. '0.4"', '65 mm'
  weight?: string; // e.g. '0.700 kg'
  capacity?: string; // e.g. '9.5 L'
  modelCode?: string; // e.g. 'SDS-BT-000', 'GN-1/1-65'
  listPrice?: number;
  discountPercent?: number;
  finalCustomerPrice?: number;
  netPrice?: number;
}

export interface ProductSpecifications {
  model: string;
  capacity?: string;
  power?: string;
  voltage?: string;
  frequency?: string;
  temperatureRange?: string;
  material?: string;
  dimensions?: string;
  weight?: string;
  cookingSurface?: string;
  cookingArea?: string;
  heatingSystem?: string;
  safetyFeatures?: string;
  timer?: string;
  basketCount?: string;
  tankCount?: string;
  sliceCapacity?: string;
  additionalSpecs?: KeySpecification[];
}

export interface ProductItem {
  id: string;
  division: BusinessDivision;
  name: string;
  variantOrSize?: string;
  model: string;
  catalogueNumber?: string;
  category: string; // matches ProductCategory.slug or id
  subcategory?: string;
  productCode: string;
  shortDescription: string;
  longDescription: string;
  mainImage: string;
  galleryImages: string[];
  keyFeatures: string[];
  specifications: ProductSpecifications;
  applications: string[];
  variants?: ProductSizeVariant[]; // Unified sizes list for trays, boxes, GN pans, etc.
  documents?: {
    title: string;
    type: string;
    size?: string;
    url?: string;
    fileData?: string;
    fileName?: string;
  }[];
  // Pricing System
  listPrice?: number; // List Price / MRP
  discountPercent?: number; // Discount %
  discountAmount?: number; // Discount Amount = List Price * Discount % / 100
  finalCustomerPrice?: number; // Final Customer Price = List Price - Discount Amount
  netPrice?: number; // For items with supplied net price (e.g. GN pans)
  priceNote?: string;
  isFeatured?: boolean;
  flaggedNote?: string; // For data consistency verification flags
}

export interface IndustrySolution {
  id: string;
  name: string;
  tagline: string;
  description: string;
  equipmentFocus: string[];
  image: string;
}

export interface QualityDetail {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  points: string[];
}

export interface B2BEnquiryForm {
  name: string;
  companyName: string;
  phone: string;
  email: string;
  city: string;
  businessType: string;
  divisionInterested?: BusinessDivision | 'both';
  productsInterested: string[];
  quantityRequirement: string;
  message: string;
  selectedProduct?: string;
  selectedModel?: string;
}

export type ActivePage =
  | 'home'
  | 'commercial'
  | 'manufacturing'
  | 'gnpans'
  | 'products'
  | 'solutions'
  | 'about'
  | 'projects'
  | 'quote'
  | 'catalogue'
  | 'contact'
  | 'pricesheet'
  | 'admin-login'
  | 'admin-panel';

export interface NavigationHistorySnapshot {
  page: ActivePage;
  selectedProductId?: string | null;
  divisionFilter?: BusinessDivision | 'all';
  categoryFilter?: string;
  domainFilter?: string;
  label?: string;
}

export type UserRole = 'owner' | 'editor' | 'viewer';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  token?: string;
}

export type AdminViewMode = 'published' | 'edit';


