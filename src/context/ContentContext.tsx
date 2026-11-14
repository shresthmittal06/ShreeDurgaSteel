import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import {
  BrandConfig,
  HeroConfig,
  CompanyStat,
  ProductCategory,
  ProductItem,
  ActivePage,
  BusinessDivision,
  ContactEntry,
  PartyLogo,
  NavigationHistorySnapshot,
} from '../types';
import {
  defaultBrand,
  defaultHero,
  defaultStats,
  defaultCategories,
  defaultProducts,
  defaultHeaderNavItems,
  defaultPartyLogos,
} from '../data/defaultData';
import {
  persistProductImages,
  loadAllPersistedProductImages,
  deletePersistedProductImages,
  cleanupLegacyStorageQuota,
  getStoredImagesMapSync,
  saveImageToSyncMap,
} from '../utils/imageStorage';

export interface AboutContentConfig {
  storyTitle: string;
  storyText: string;
  approachTitle: string;
  approachText: string;
  productsTitle: string;
  productsText: string;
  customersTitle: string;
  customersText: string;
  commitmentTitle: string;
  commitmentText: string;
}

export const defaultAboutContent: AboutContentConfig = {
  storyTitle: 'ENGINEERING FOR THE HEAVY DEMANDS OF COMMERCIAL CATERING & CONFECTIONERY',
  storyText:
    'SHREE DURGA STEELS stands as an established enterprise with two distinct operational lines: Commercial Kitchen Equipment & Appliances for restaurants and hotels, alongside our in-house Manufacturing Facility producing certified food-grade stainless steel trays, confectioner hardware, and custom banqueting equipment.',
  approachTitle: 'ARCHITECTURAL PRECISION & HYGIENIC SIMPLICITY',
  approachText:
    'Every piece of equipment and fabricated tray is planned for intense duty cycles, seamless cleaning, and long-term serviceability. We reject flimsy, short-lived components in favor of certified non-magnetic stainless steel alloys and industrial-grade heating components.',
  productsTitle: 'COMMERCIAL APPLIANCES & IN-HOUSE STAINLESS HARDWARE',
  productsText:
    'Our commercial appliances cover precision induction ranges, continuous fryers, contact grills, pizza deck ovens, and heavy steamers. Simultaneously, our manufacturing facility stamps, deep-draws, and hand-finishes over 40 varieties of Barfi, Rasgulla, and Sandesh trays, spice consoles, and PVD titanium luxury hardware.',
  customersTitle: 'SERVING PREMIER HOSPITALITY & CONFECTIONERY HOUSES',
  customersText:
    'Trusted by 5-star & 7-star hotel banquet operations, renowned traditional sweet brands, fast-growing restaurant chains, commercial cloud kitchens, and institutional caterers across India and overseas.',
  commitmentTitle: 'OUR FACTORY COMMITMENT',
  commitmentText:
    '100% bench quality testing, certified food-grade metallurgy, transparent B2B pricing with structured dealer margins, and responsive sales & factory support desks.',
};

export interface PriceCalculation {
  listPrice?: number;
  discountPercent?: number;
  finalCustomerPrice?: number;
  discountAmount?: number;
  formattedListPrice?: string;
  formattedFinalPrice?: string;
}

interface ContentContextType {
  brand: BrandConfig;
  setBrand: React.Dispatch<React.SetStateAction<BrandConfig>>;
  updateBrand: (data: Partial<BrandConfig>) => void;
  updateContacts: (contacts: ContactEntry[]) => void;

  hero: HeroConfig;
  setHero: React.Dispatch<React.SetStateAction<HeroConfig>>;
  updateHero: (data: Partial<HeroConfig>) => void;

  stats: CompanyStat[];
  setStats: React.Dispatch<React.SetStateAction<CompanyStat[]>>;
  updateStat: (id: string, value: string, label?: string) => void;
  updateStats: (stats: CompanyStat[]) => void;

  categories: ProductCategory[];
  setCategories: React.Dispatch<React.SetStateAction<ProductCategory[]>>;
  updateCategories: (categories: ProductCategory[]) => void;
  addCategory: (category: Omit<ProductCategory, 'id'>) => void;
  updateCategory: (id: string, data: Partial<ProductCategory>) => void;
  deleteCategory: (id: string) => void;

  products: ProductItem[];
  setProducts: React.Dispatch<React.SetStateAction<ProductItem[]>>;
  updateProducts: (products: ProductItem[]) => void;
  addProduct: (product: Omit<ProductItem, 'id'>) => void;
  updateProduct: (id: string, data: Partial<ProductItem>) => void;
  deleteProduct: (id: string) => void;
  toggleProductFeatured: (id: string) => void;
  duplicateProduct: (id: string) => void;

  // Split product lists by division
  commercialProducts: ProductItem[];
  gnPanProducts: ProductItem[];
  manufacturingProducts: ProductItem[];

  aboutContent: AboutContentConfig;
  updateAboutContent: (data: Partial<AboutContentConfig>) => void;

  // Active navigation & view state
  activePage: ActivePage;
  setActivePage: (page: ActivePage) => void;
  canGoBack: boolean;
  goBack: () => void;
  previousPageTitle: string;
  navigateTo: (
    page: ActivePage,
    options?: {
      division?: BusinessDivision | 'all';
      category?: string;
      domain?: string;
      label?: string;
    }
  ) => void;

  // Division filter
  activeDivisionFilter: BusinessDivision | 'all';
  setActiveDivisionFilter: (division: BusinessDivision | 'all') => void;

  // Modals & triggers
  selectedProductForDetail: ProductItem | null;
  setSelectedProductForDetail: (product: ProductItem | null) => void;

  quoteModalOpen: boolean;
  setQuoteModalOpen: (open: boolean) => void;
  quotePrefill: { productName: string; model: string; division?: BusinessDivision };
  openQuoteModal: (productName?: string, model?: string, division?: BusinessDivision) => void;

  catalogueModalOpen: boolean;
  setCatalogueModalOpen: (open: boolean) => void;

  adminModalOpen: boolean;
  setAdminModalOpen: (open: boolean) => void;
  adminEditingProductId: string | null;
  setAdminEditingProductId: (id: string | null) => void;
  openAdminModalForProduct: (productId?: string) => void;

  // Admin Authentication & Access Control
  isAdmin: boolean;
  adminUser: string | null;
  loginAdmin: (username: string, password: string) => { success: boolean; error?: string };
  logoutAdmin: () => void;

  // Reset and export
  resetToDefaults: () => void;
  exportConfigJson: () => string;
  importConfigJson: (jsonString: string) => boolean;

  // Category filter on catalogue
  selectedCategoryFilter: string;
  setSelectedCategoryFilter: (categorySlug: string) => void;

  // Domain filter (Cooking, Baking, Steaming, Food Storage, Grilling, Toasting, Serving & Presentation, Traditional & Specialty)
  selectedDomainFilter: string;
  setSelectedDomainFilter: (domain: string) => void;

  // Theme Mode (Light / Dark)
  themeMode: 'light' | 'dark';
  setThemeMode: React.Dispatch<React.SetStateAction<'light' | 'dark'>>;
  toggleThemeMode: () => void;

  // Party / Client Logos
  partyLogos: PartyLogo[];
  setPartyLogos: React.Dispatch<React.SetStateAction<PartyLogo[]>>;
  updatePartyLogo: (id: string, data: Partial<PartyLogo>) => void;
  addPartyLogo: (party?: Partial<PartyLogo>) => void;
  deletePartyLogo: (id: string) => void;

  // Pricing helper
  computePricing: (product: ProductItem) => PriceCalculation;

  // Product image editor modal & management
  imageEditModalProduct: ProductItem | null;
  openImageEditModal: (product: ProductItem) => void;
  closeImageEditModal: () => void;
  updateProductImages: (productId: string, mainImage: string, galleryImages?: string[]) => void;
  clearAllProductImages: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

// Updated storage keys for Shri Durga Steels v2
const STORAGE_KEY_BRAND = 'sds_brand_v3';
const STORAGE_KEY_HERO = 'sds_hero_v2';
const STORAGE_KEY_STATS = 'sds_stats_v2';
const STORAGE_KEY_CATEGORIES = 'sds_categories_v6';
const STORAGE_KEY_PRODUCTS = 'sds_products_v11';
const STORAGE_KEY_ABOUT = 'sds_about_v2';
const STORAGE_KEY_PARTY_LOGOS = 'sds_party_logos_v2';

export const ContentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [brand, setBrand] = useState<BrandConfig>(() => {
    try {
      const savedStr = localStorage.getItem(STORAGE_KEY_BRAND) || localStorage.getItem('sds_brand_v2');
      if (savedStr) {
        const parsed = JSON.parse(savedStr);
        // Ensure company name is always preserved as SHREE DURGA STEELS
        const rawBrand = parsed.brandName && parsed.brandName.trim() ? parsed.brandName : 'SHREE DURGA STEELS';
        const brandName = rawBrand.replace(/\bSHRI\b/g, 'SHREE').replace(/\bShri\b/g, 'Shree');
        const rawCompany = parsed.companyName && parsed.companyName.trim() ? parsed.companyName : 'Shree Durga Steels';
        const companyName = rawCompany.replace(/\bSHRI\b/g, 'SHREE').replace(/\bShri\b/g, 'Shree');
        
        // Ensure navItems reflect the three distinct product categories and quotation selector
        const hasGnPans = parsed.headerNavItems?.some(
          (item: { id?: string }) => item.id === 'nav-gn-pans'
        );
        let headerNavItems = parsed.headerNavItems;
        if (!hasGnPans) {
          headerNavItems = defaultHeaderNavItems;
        } else if (Array.isArray(headerNavItems)) {
          headerNavItems = headerNavItems.map((item: any) =>
            item.id === 'nav-resources' && (item.label === 'Resources' || item.label === 'B2B Price Matrix')
              ? { ...item, label: 'Quotation Selector' }
              : item
          );
        }
        return {
          ...defaultBrand,
          ...parsed,
          brandName,
          companyName,
          logoStyle: 'both',
          headerNavItems: headerNavItems || defaultHeaderNavItems,
          portalCategoryImages: {
            ...defaultBrand.portalCategoryImages,
            ...(parsed.portalCategoryImages || {}),
          },
        };
      }
      return defaultBrand;
    } catch {
      return defaultBrand;
    }
  });

  const [hero, setHero] = useState<HeroConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HERO);
      return saved ? JSON.parse(saved) : defaultHero;
    } catch {
      return defaultHero;
    }
  });

  const [stats, setStats] = useState<CompanyStat[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_STATS);
      return saved ? JSON.parse(saved) : defaultStats;
    } catch {
      return defaultStats;
    }
  });

  const [categories, setCategories] = useState<ProductCategory[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CATEGORIES);
      return saved ? JSON.parse(saved) : defaultCategories;
    } catch {
      return defaultCategories;
    }
  });

  const [products, setProducts] = useState<ProductItem[]>(() => {
    // 1. Free up any stranded legacy storage quota
    cleanupLegacyStorageQuota();

    // 2. Synchronously load all saved custom product images (guarantees instant retention on reload)
    const syncImageMap = getStoredImagesMapSync();

    try {
      const saved = localStorage.getItem(STORAGE_KEY_PRODUCTS);
      const baseList = saved ? (JSON.parse(saved) as ProductItem[]) : defaultProducts;

      // Ensure all products from default catalogue are retained even if stored list is older
      const baseMap = new Map(baseList.map((p) => [p.id, p]));
      const completeList: ProductItem[] = defaultProducts.map((def) => {
        const stored = baseMap.get(def.id);
        if (stored) {
          const hasStoredImage = Boolean(stored.mainImage && stored.mainImage.trim().length > 0);
          const hasStoredGallery = Array.isArray(stored.galleryImages) && stored.galleryImages.length > 0;
          return {
            ...def,
            ...stored,
            mainImage: hasStoredImage ? stored.mainImage : def.mainImage,
            galleryImages: hasStoredGallery ? stored.galleryImages : def.galleryImages,
          };
        }
        return def;
      });

      // Retain any custom user-created products from storage
      baseList.forEach((p) => {
        if (!defaultProducts.some((def) => def.id === p.id)) {
          completeList.push(p);
        }
      });

      return completeList.map((p) => {
        const customEntry = syncImageMap[p.id];
        const defaultDef = defaultProducts.find((def) => def.id === p.id);
        let savedMain =
          customEntry?.mainImage ||
          (p.mainImage && p.mainImage.trim().length > 0 ? p.mainImage : defaultDef?.mainImage || '');
        let savedGallery =
          customEntry?.galleryImages && customEntry.galleryImages.length > 0
            ? customEntry.galleryImages
            : Array.isArray(p.galleryImages) && p.galleryImages.length > 0
            ? p.galleryImages
            : defaultDef?.galleryImages || [];

        return {
          ...p,
          mainImage: savedMain,
          galleryImages: savedGallery,
        };
      });
    } catch {
      return defaultProducts.map((p) => {
        const customEntry = syncImageMap[p.id];
        return {
          ...p,
          mainImage: customEntry?.mainImage || p.mainImage || '',
          galleryImages: customEntry?.galleryImages || p.galleryImages || [],
        };
      });
    }
  });

  // Asynchronously hydrate any extra images stored in IndexedDB
  useEffect(() => {
    let isMounted = true;
    loadAllPersistedProductImages()
      .then((persistedMap) => {
        if (!isMounted || !persistedMap || Object.keys(persistedMap).length === 0) return;
        setProducts((prev) =>
          prev.map((p) => {
            const custom = persistedMap[p.id];
            if (custom && (custom.mainImage || (custom.galleryImages && custom.galleryImages.length > 0))) {
              return {
                ...p,
                mainImage: custom.mainImage || p.mainImage,
                galleryImages:
                  custom.galleryImages && custom.galleryImages.length > 0
                    ? custom.galleryImages
                    : p.galleryImages,
              };
            }
            return p;
          })
        );
      })
      .catch((err) => console.warn('Hydrate IndexedDB product images notice:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  const [aboutContent, setAboutContent] = useState<AboutContentConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_ABOUT);
      return saved ? JSON.parse(saved) : defaultAboutContent;
    } catch {
      return defaultAboutContent;
    }
  });

  const [partyLogos, setPartyLogos] = useState<PartyLogo[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_PARTY_LOGOS);
      return saved ? JSON.parse(saved) : defaultPartyLogos;
    } catch {
      return defaultPartyLogos;
    }
  });

  // Navigation & UI States
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [activeDivisionFilter, setActiveDivisionFilter] = useState<BusinessDivision | 'all'>('all');
  const [selectedProductForDetail, setSelectedProductForDetail] = useState<ProductItem | null>(null);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedDomainFilter, setSelectedDomainFilter] = useState<string>('all');

  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [quotePrefill, setQuotePrefill] = useState<{ productName: string; model: string; division?: BusinessDivision }>({
    productName: '',
    model: '',
  });

  const [catalogueModalOpen, setCatalogueModalOpen] = useState<boolean>(false);
  const [adminModalOpen, setAdminModalOpenState] = useState<boolean>(false);
  const [adminEditingProductId, setAdminEditingProductId] = useState<string | null>(null);

  // Admin Authentication State
  const [isAdmin, setIsAdmin] = useState<boolean>(() => {
    try {
      return localStorage.getItem('sds_admin_session') === 'true';
    } catch {
      return false;
    }
  });

  const [adminUser, setAdminUser] = useState<string | null>(() => {
    try {
      return localStorage.getItem('sds_admin_session') === 'true' ? 'Admin' : null;
    } catch {
      return null;
    }
  });

  const loginAdmin = (username: string, password: string): { success: boolean; error?: string } => {
    const cleanUser = username.trim().toLowerCase();
    const cleanPass = password.trim();

    // Check credentials: Username "Admin" (case-insensitive) and Password "admin123"
    if (cleanUser === 'admin' && cleanPass === 'admin123') {
      setIsAdmin(true);
      setAdminUser('Admin');
      try {
        localStorage.setItem('sds_admin_session', 'true');
      } catch (err) {
        console.error('Failed to persist admin session:', err);
      }
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid credentials. Please use Username "Admin" and Password "admin123".',
    };
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    setAdminUser(null);
    setAdminModalOpenState(false);
    try {
      localStorage.removeItem('sds_admin_session');
    } catch (err) {
      console.error('Failed to clear admin session:', err);
    }
    if (activePage === 'admin-panel' || activePage === 'admin-login') {
      setActivePage('home');
    }
  };

  // Safe wrapper: Only allow opening admin modal if admin is authenticated
  const setAdminModalOpen = (open: boolean) => {
    if (open && !isAdmin) {
      // Normal users cannot access admin editing modal - route to admin login
      setActivePage('admin-login');
      return;
    }
    setAdminModalOpenState(open);
  };

  // Product Image Editor Modal State
  const [imageEditModalProduct, setImageEditModalProduct] = useState<ProductItem | null>(null);

  const openImageEditModal = (product: ProductItem) => {
    if (!isAdmin) {
      // Normal users cannot edit product images - only admins
      return;
    }
    setImageEditModalProduct(product);
  };

  const closeImageEditModal = () => {
    setImageEditModalProduct(null);
  };

  const [navHistory, setNavHistory] = useState<NavigationHistorySnapshot[]>([]);

  const getPageName = (page: ActivePage): string => {
    switch (page) {
      case 'home':
        return 'Home';
      case 'commercial':
        return 'Commercial Kitchen';
      case 'manufacturing':
        return 'Kitchenware & Utility (Manufacturing)';
      case 'gnpans':
        return 'Gastronorm (GN) Pans';
      case 'products':
        return 'Full Equipment Catalogue';
      case 'solutions':
        return 'Industry Solutions';
      case 'about':
        return 'About Shree Durga Steels';
      case 'projects':
        return 'Turnkey Projects';
      case 'quote':
        return 'Get a Quote';
      case 'catalogue':
        return 'Catalogue Download';
      case 'contact':
        return 'Contact & Factory';
      case 'pricesheet':
        return 'Price Matrix';
      case 'admin-login':
        return 'Admin Login';
      case 'admin-panel':
        return 'Admin Control Panel';
      default:
        return 'Home';
    }
  };

  // Support direct URL hash navigation (e.g. #admin, #login, #admin-panel)
  useEffect(() => {
    const handleHashCheck = () => {
      const hash = window.location.hash.toLowerCase();
      if (hash === '#admin' || hash === '#login' || hash === '#admin-login') {
        if (isAdmin) {
          setActivePage('admin-panel');
        } else {
          setActivePage('admin-login');
        }
      } else if (hash === '#admin-panel') {
        if (isAdmin) {
          setActivePage('admin-panel');
        } else {
          setActivePage('admin-login');
        }
      }
    };

    handleHashCheck();
    window.addEventListener('hashchange', handleHashCheck);
    return () => window.removeEventListener('hashchange', handleHashCheck);
  }, [isAdmin]);

  // Push current navigation snapshot onto history stack
  const pushCurrentSnapshot = (customLabel?: string) => {
    const snapshot: NavigationHistorySnapshot = {
      page: activePage,
      selectedProductId: selectedProductForDetail ? selectedProductForDetail.id : null,
      divisionFilter: activeDivisionFilter,
      categoryFilter: selectedCategoryFilter,
      domainFilter: selectedDomainFilter,
      label: customLabel || (selectedProductForDetail ? selectedProductForDetail.name : getPageName(activePage)),
    };

    setNavHistory((prev) => {
      if (prev.length > 0) {
        const top = prev[prev.length - 1];
        if (
          top.page === snapshot.page &&
          top.selectedProductId === snapshot.selectedProductId &&
          top.divisionFilter === snapshot.divisionFilter &&
          top.categoryFilter === snapshot.categoryFilter &&
          top.domainFilter === snapshot.domainFilter
        ) {
          return prev;
        }
      }
      return [...prev.slice(-30), snapshot];
    });
  };

  // Navigating to a page with optional filters & history record
  const navigateTo = (
    page: ActivePage,
    options?: {
      division?: BusinessDivision | 'all';
      category?: string;
      domain?: string;
      label?: string;
    }
  ) => {
    if (page === 'home' && !options?.category && !options?.division) {
      setSelectedProductForDetail(null);
      setActivePage('home');
      setNavHistory([]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page === activePage && !selectedProductForDetail && (!options || (!options.category && !options.division))) {
      return;
    }
    pushCurrentSnapshot();
    setSelectedProductForDetail(null);
    setActivePage(page);
    if (options?.division !== undefined) {
      setActiveDivisionFilter(options.division);
    }
    if (options?.category !== undefined) {
      setSelectedCategoryFilter(options.category);
    }
    if (options?.domain !== undefined) {
      setSelectedDomainFilter(options.domain);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSetActivePage = (page: ActivePage) => {
    if (page === 'home') {
      setSelectedProductForDetail(null);
      setActivePage('home');
      setNavHistory([]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (page !== activePage || selectedProductForDetail !== null) {
      pushCurrentSnapshot();
      setSelectedProductForDetail(null);
    }
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSetSelectedProductForDetail = (product: ProductItem | null) => {
    if (product && product.id !== selectedProductForDetail?.id) {
      pushCurrentSnapshot(selectedProductForDetail ? selectedProductForDetail.name : getPageName(activePage));
    }
    setSelectedProductForDetail(product);
    if (product) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const goBack = () => {
    // 1. If any modal is open, close it first
    if (imageEditModalProduct) {
      setImageEditModalProduct(null);
      return;
    }
    if (adminModalOpen) {
      setAdminModalOpen(false);
      setAdminEditingProductId(null);
      return;
    }
    if (quoteModalOpen) {
      setQuoteModalOpen(false);
      return;
    }
    if (catalogueModalOpen) {
      setCatalogueModalOpen(false);
      return;
    }

    // 2. If we have a history stack, pop the previous state
    if (navHistory.length > 0) {
      const previous = navHistory[navHistory.length - 1];
      setNavHistory((prev) => prev.slice(0, prev.length - 1));

      setActivePage(previous.page);
      setActiveDivisionFilter(previous.divisionFilter || 'all');
      setSelectedCategoryFilter(previous.categoryFilter || 'all');
      setSelectedDomainFilter(previous.domainFilter || 'all');

      if (previous.selectedProductId) {
        const found = products.find((p) => p.id === previous.selectedProductId);
        setSelectedProductForDetail(found || null);
      } else {
        setSelectedProductForDetail(null);
      }

      // If returning to the home page with no product open, clear the stack
      if (previous.page === 'home' && !previous.selectedProductId) {
        setNavHistory([]);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 3. If history stack is empty but we are viewing a product detail, exit to current page
    if (selectedProductForDetail) {
      setSelectedProductForDetail(null);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 4. If on any other page than home, go back to home and clear history
    if (activePage !== 'home') {
      setActivePage('home');
      setSelectedProductForDetail(null);
      setNavHistory([]);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
  };

  // The Back button must NEVER appear on the base Home page.
  // It should ONLY appear if the user has opened a page other than Home,
  // or opened a product detail view, or opened a modal.
  const isBaseHomePage =
    activePage === 'home' &&
    selectedProductForDetail === null &&
    imageEditModalProduct === null &&
    !adminModalOpen &&
    !quoteModalOpen &&
    !catalogueModalOpen;

  const canGoBack = !isBaseHomePage && Boolean(
    activePage !== 'home' ||
    selectedProductForDetail !== null ||
    imageEditModalProduct !== null ||
    adminModalOpen ||
    quoteModalOpen ||
    catalogueModalOpen
  );

  const previousPageTitle = useMemo(() => {
    if (isBaseHomePage) {
      return '';
    }
    if (imageEditModalProduct || adminModalOpen || quoteModalOpen || catalogueModalOpen) {
      return 'Close';
    }
    if (navHistory.length > 0) {
      const top = navHistory[navHistory.length - 1];
      if (top.page === 'home' && !top.selectedProductId) {
        return 'Home';
      }
      return top.label || getPageName(top.page);
    }
    if (selectedProductForDetail) {
      return getPageName(activePage);
    }
    if (activePage !== 'home') {
      return 'Home';
    }
    return '';
  }, [isBaseHomePage, navHistory, selectedProductForDetail, activePage, imageEditModalProduct, adminModalOpen, quoteModalOpen, catalogueModalOpen]);

  const updateProductImages = (
    productId: string,
    mainImage: string,
    galleryImages: string[] = []
  ) => {
    // 1. Immediately persist synchronously to local sync map (instant reload guarantee)
    saveImageToSyncMap(productId, mainImage, galleryImages);

    // 2. Persist to secondary multi-layer storage
    persistProductImages(productId, mainImage, galleryImages).catch((err) =>
      console.warn('Error saving product images:', err)
    );

    // 3. Immediately update in-memory React state
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? {
              ...p,
              mainImage,
              galleryImages,
            }
          : p
      )
    );
    if (selectedProductForDetail?.id === productId) {
      setSelectedProductForDetail((prev) =>
        prev ? { ...prev, mainImage, galleryImages } : null
      );
    }
  };

  const clearAllProductImages = () => {
    products.forEach((p) => {
      deletePersistedProductImages(p.id).catch(() => {});
    });
    setProducts((prev) =>
      prev.map((p) => ({
        ...p,
        mainImage: '',
        galleryImages: [],
      }))
    );
    if (selectedProductForDetail) {
      setSelectedProductForDetail((prev) =>
        prev ? { ...prev, mainImage: '', galleryImages: [] } : null
      );
    }
  };

  const openAdminModalForProduct = (productId?: string) => {
    if (productId) {
      setAdminEditingProductId(productId);
    }
    setAdminModalOpen(true);
  };

  // Division-specific lists
  const commercialProducts = useMemo(() => {
    return products.filter((p) => p.division === 'commercial' && p.category !== 'gn-pans');
  }, [products]);

  const gnPanProducts = useMemo(() => {
    return products.filter((p) => p.category === 'gn-pans' || p.category === 'food-storage');
  }, [products]);

  const manufacturingProducts = useMemo(() => {
    return products.filter((p) => p.division === 'manufacturing');
  }, [products]);

  // Theme mode: Defaults to 'light' per luxury minimal requirement
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('sds_theme_mode');
      return saved === 'dark' ? 'dark' : 'light';
    } catch {
      return 'light';
    }
  });

  const toggleThemeMode = () => {
    setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'));
  };

  useEffect(() => {
    try {
      localStorage.setItem('sds_theme_mode', themeMode);
    } catch (e) {
      console.error(e);
    }
  }, [themeMode]);

  // Sync with LocalStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_BRAND, JSON.stringify(brand));
    } catch (e) {
      console.error(e);
    }
  }, [brand]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HERO, JSON.stringify(hero));
    } catch (e) {
      console.error(e);
    }
  }, [hero]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_STATS, JSON.stringify(stats));
    } catch (e) {
      console.error(e);
    }
  }, [stats]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CATEGORIES, JSON.stringify(categories));
    } catch (e) {
      console.error(e);
    }
  }, [categories]);

  useEffect(() => {
    // Save lightweight products list (names, categories, specs, pricing edits)
    // Images are safely stored in the isolated synchronous SYNC_MAP_KEY dictionary
    try {
      const lightweight = products.map((p) => ({
        ...p,
        mainImage: p.mainImage && p.mainImage.startsWith('data:') ? '' : p.mainImage,
        galleryImages: Array.isArray(p.galleryImages)
          ? p.galleryImages.filter((img) => !img.startsWith('data:'))
          : [],
      }));
      localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(lightweight));
    } catch (err) {
      console.warn('LocalStorage metadata write notice:', err);
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_ABOUT, JSON.stringify(aboutContent));
    } catch (e) {
      console.error(e);
    }
  }, [aboutContent]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PARTY_LOGOS, JSON.stringify(partyLogos));
    } catch (e) {
      console.error(e);
    }
  }, [partyLogos]);

  const updatePartyLogo = (id: string, data: Partial<PartyLogo>) => {
    setPartyLogos((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
  };

  const addPartyLogo = (party?: Partial<PartyLogo>) => {
    const newParty: PartyLogo = {
      id: `party-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      name: party?.name || `Party / Client ${partyLogos.length + 1}`,
      logoUrl: party?.logoUrl || '',
      websiteUrl: party?.websiteUrl || '',
    };
    setPartyLogos((prev) => [...prev, newParty]);
  };

  const deletePartyLogo = (id: string) => {
    setPartyLogos((prev) => prev.filter((p) => p.id !== id));
  };

  // Updaters
  const updateBrand = (data: Partial<BrandConfig>) => {
    setBrand((prev) => {
      const brandName = data.brandName?.trim() ? data.brandName.trim() : prev.brandName || 'SHREE DURGA STEELS';
      const companyName = data.companyName?.trim() ? data.companyName.trim() : prev.companyName || 'Shree Durga Steels';
      return {
        ...prev,
        ...data,
        brandName,
        companyName,
        logoStyle: 'both',
      };
    });
  };

  const updateContacts = (contacts: ContactEntry[]) => {
    setBrand((prev) => ({ ...prev, contacts }));
  };

  const updateHero = (data: Partial<HeroConfig>) => {
    setHero((prev) => ({ ...prev, ...data }));
  };

  const updateStat = (id: string, value: string, label?: string) => {
    setStats((prev) =>
      prev.map((s) => (s.id === id ? { ...s, value, ...(label ? { label } : {}) } : s))
    );
  };

  const updateStats = (newStats: CompanyStat[]) => {
    setStats(newStats);
  };

  const updateCategories = (newCategories: ProductCategory[]) => {
    setCategories(newCategories);
  };

  const addCategory = (catData: Omit<ProductCategory, 'id'>) => {
    const newCat: ProductCategory = {
      ...catData,
      id: `cat-${Date.now()}`,
    };
    setCategories((prev) => [...prev, newCat]);
  };

  const updateCategory = (id: string, data: Partial<ProductCategory>) => {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
  };

  const deleteCategory = (id: string) => {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  };

  const updateProducts = (newProducts: ProductItem[]) => {
    newProducts.forEach((p) => {
      if (p.mainImage || (p.galleryImages && p.galleryImages.length > 0)) {
        saveImageToSyncMap(p.id, p.mainImage || '', p.galleryImages || []);
        persistProductImages(p.id, p.mainImage || '', p.galleryImages || []).catch(() => {});
      }
    });
    setProducts(newProducts);
  };

  const addProduct = (prodData: Omit<ProductItem, 'id'>) => {
    const newProd: ProductItem = {
      ...prodData,
      id: `prod-${Date.now()}`,
    };
    if (newProd.mainImage || (newProd.galleryImages && newProd.galleryImages.length > 0)) {
      saveImageToSyncMap(newProd.id, newProd.mainImage || '', newProd.galleryImages || []);
      persistProductImages(newProd.id, newProd.mainImage || '', newProd.galleryImages || []).catch(() => {});
    }
    setProducts((prev) => [newProd, ...prev]);
  };

  const updateProduct = (id: string, data: Partial<ProductItem>) => {
    if (data.mainImage !== undefined || data.galleryImages !== undefined) {
      const existing = products.find((p) => p.id === id);
      const mainImg = data.mainImage !== undefined ? data.mainImage : existing?.mainImage || '';
      const galImgs = data.galleryImages !== undefined ? data.galleryImages : existing?.galleryImages || [];
      saveImageToSyncMap(id, mainImg, galImgs);
      persistProductImages(id, mainImg, galImgs).catch(() => {});
    }
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...data } : p)));
    if (selectedProductForDetail?.id === id) {
      setSelectedProductForDetail((prev) => (prev ? { ...prev, ...data } : null));
    }
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    if (selectedProductForDetail?.id === id) {
      setSelectedProductForDetail(null);
    }
  };

  const toggleProductFeatured = (id: string) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isFeatured: !p.isFeatured } : p))
    );
    if (selectedProductForDetail?.id === id) {
      setSelectedProductForDetail((prev) =>
        prev ? { ...prev, isFeatured: !prev.isFeatured } : null
      );
    }
  };

  const duplicateProduct = (id: string) => {
    const existing = products.find((p) => p.id === id);
    if (!existing) return;
    const cloned: ProductItem = {
      ...existing,
      id: `prod-${Date.now()}`,
      model: `${existing.model}-COPY`,
      productCode: `${existing.productCode}-COPY`,
      name: `${existing.name} (Copy)`,
      isFeatured: false,
    };
    setProducts((prev) => [cloned, ...prev]);
  };

  const updateAboutContent = (data: Partial<AboutContentConfig>) => {
    setAboutContent((prev) => ({ ...prev, ...data }));
  };

  const openQuoteModal = (productName?: string, model?: string, division?: BusinessDivision) => {
    setQuotePrefill({
      productName: productName || '',
      model: model || '',
      division,
    });
    setQuoteModalOpen(true);
  };

  const computePricing = (product: ProductItem): PriceCalculation => {
    const listPrice = product.listPrice;
    const discountPercent = product.discountPercent ?? 0;
    let finalCustomerPrice = product.finalCustomerPrice;

    let discountAmount: number | undefined;
    if (listPrice != null && listPrice > 0) {
      if (finalCustomerPrice == null && discountPercent > 0) {
        discountAmount = (listPrice * discountPercent) / 100;
        finalCustomerPrice = Math.round(listPrice - discountAmount);
      } else if (finalCustomerPrice != null) {
        discountAmount = listPrice - finalCustomerPrice;
      }
    }

    const formatInr = (val?: number) =>
      val != null ? `₹${val.toLocaleString('en-IN')}` : undefined;

    return {
      listPrice,
      discountPercent,
      finalCustomerPrice,
      discountAmount,
      formattedListPrice: formatInr(listPrice),
      formattedFinalPrice: formatInr(finalCustomerPrice),
    };
  };

  const resetToDefaults = () => {
    setBrand(defaultBrand);
    setHero(defaultHero);
    setStats(defaultStats);
    setCategories(defaultCategories);
    setProducts(defaultProducts);
    setAboutContent(defaultAboutContent);
    try {
      localStorage.removeItem(STORAGE_KEY_BRAND);
      localStorage.removeItem(STORAGE_KEY_HERO);
      localStorage.removeItem(STORAGE_KEY_STATS);
      localStorage.removeItem(STORAGE_KEY_CATEGORIES);
      localStorage.removeItem(STORAGE_KEY_PRODUCTS);
      localStorage.removeItem(STORAGE_KEY_ABOUT);
      localStorage.removeItem(STORAGE_KEY_PARTY_LOGOS);
    } catch (e) {
      console.error(e);
    }
  };

  const exportConfigJson = () => {
    const fullConfig = {
      brand,
      hero,
      stats,
      categories,
      products,
      aboutContent,
      partyLogos,
      exportedAt: new Date().toISOString(),
    };
    return JSON.stringify(fullConfig, null, 2);
  };

  const importConfigJson = (jsonString: string): boolean => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed.brand) setBrand(parsed.brand);
      if (parsed.hero) setHero(parsed.hero);
      if (parsed.stats) setStats(parsed.stats);
      if (parsed.categories) setCategories(parsed.categories);
      if (parsed.products) setProducts(parsed.products);
      if (parsed.aboutContent) setAboutContent(parsed.aboutContent);
      if (parsed.partyLogos) setPartyLogos(parsed.partyLogos);
      return true;
    } catch (err) {
      console.error('Failed to parse config JSON', err);
      return false;
    }
  };

  return (
    <ContentContext.Provider
      value={{
        brand,
        setBrand,
        updateBrand,
        updateContacts,
        hero,
        setHero,
        updateHero,
        stats,
        setStats,
        updateStat,
        updateStats,
        categories,
        setCategories,
        updateCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        products,
        setProducts,
        updateProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        toggleProductFeatured,
        duplicateProduct,
        commercialProducts,
        gnPanProducts,
        manufacturingProducts,
        aboutContent,
        updateAboutContent,
        partyLogos,
        setPartyLogos,
        updatePartyLogo,
        addPartyLogo,
        deletePartyLogo,
        activePage,
        setActivePage: handleSetActivePage,
        canGoBack,
        goBack,
        previousPageTitle,
        navigateTo,
        activeDivisionFilter,
        setActiveDivisionFilter,
        selectedProductForDetail,
        setSelectedProductForDetail: handleSetSelectedProductForDetail,
        quoteModalOpen,
        setQuoteModalOpen,
        quotePrefill,
        openQuoteModal,
        catalogueModalOpen,
        setCatalogueModalOpen,
        adminModalOpen,
        setAdminModalOpen,
        adminEditingProductId,
        setAdminEditingProductId,
        openAdminModalForProduct,
        isAdmin,
        adminUser,
        loginAdmin,
        logoutAdmin,
        resetToDefaults,
        exportConfigJson,
        importConfigJson,
        selectedCategoryFilter,
        setSelectedCategoryFilter,
        selectedDomainFilter,
        setSelectedDomainFilter,
        themeMode,
        setThemeMode,
        toggleThemeMode,
        computePricing,
        imageEditModalProduct,
        openImageEditModal,
        closeImageEditModal,
        updateProductImages,
        clearAllProductImages,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
