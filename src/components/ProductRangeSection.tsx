import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import {
  ArrowUpRight,
  ChevronRight,
  Grid,
  Layers,
  Flame,
  Boxes,
  Factory,
  ArrowRight,
  Camera,
  CheckCircle,
  Lock,
  Shield,
  X,
  Sliders,
} from 'lucide-react';
import { PRODUCT_DOMAINS, getProductDomain } from '../data/productDomains';
import { CategoryImageEditModal } from './CategoryImageEditModal';

const DEFAULT_CATEGORY_IMAGES = {
  commercial: '/images/products/tsl81_front.jpg',
  gnpans: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
  manufacturing: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
};

export const ProductRangeSection: React.FC = () => {
  const {
    products,
    commercialProducts,
    gnPanProducts,
    manufacturingProducts,
    setActivePage,
    setActiveDivisionFilter,
    setSelectedCategoryFilter,
    setSelectedDomainFilter,
    setSelectedProductForDetail,
    brand,
    updateBrand,
    isAdmin,
    loginAdmin,
  } = useContent();

  const [viewMode, setViewMode] = useState<'divisions' | 'domains'>('divisions');

  // Category image editing states
  const [editingCategory, setEditingCategory] = useState<'commercial' | 'gnpans' | 'manufacturing' | null>(null);
  const [pendingCategory, setPendingCategory] = useState<'commercial' | 'gnpans' | 'manufacturing' | null>(null);
  const [showAdminAuthModal, setShowAdminAuthModal] = useState<boolean>(false);
  const [authUsername, setAuthUsername] = useState<string>('Admin');
  const [authPassword, setAuthPassword] = useState<string>('');
  const [authError, setAuthError] = useState<string>('');
  const [saveNotification, setSaveNotification] = useState<string | null>(null);

  const commercialImg = brand.portalCategoryImages?.commercial || DEFAULT_CATEGORY_IMAGES.commercial;
  const gnPanImg = brand.portalCategoryImages?.gnpans || DEFAULT_CATEGORY_IMAGES.gnpans;
  const manufacturingImg = brand.portalCategoryImages?.manufacturing || DEFAULT_CATEGORY_IMAGES.manufacturing;

  const navigateToPage = (
    targetPage: 'commercial' | 'gnpans' | 'manufacturing',
    categorySlug: string = 'all'
  ) => {
    setSelectedProductForDetail(null);
    if (targetPage === 'commercial') {
      setActiveDivisionFilter('commercial');
      setSelectedCategoryFilter(categorySlug);
      setActivePage('commercial');
    } else if (targetPage === 'gnpans') {
      setActiveDivisionFilter('commercial');
      setSelectedCategoryFilter('gn-pans');
      setActivePage('gnpans');
    } else if (targetPage === 'manufacturing') {
      setActiveDivisionFilter('manufacturing');
      setSelectedCategoryFilter(categorySlug);
      setActivePage('manufacturing');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDomainClick = (domainId: string) => {
    setSelectedProductForDetail(null);
    if (domainId === 'food-storage') {
      navigateToPage('gnpans');
    } else if (domainId === 'utility' || domainId === 'sweets-bakery') {
      setActiveDivisionFilter('manufacturing');
      setSelectedCategoryFilter('all');
      setSelectedDomainFilter(domainId);
      setActivePage('manufacturing');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setActiveDivisionFilter('commercial');
      setSelectedCategoryFilter('all');
      setSelectedDomainFilter(domainId);
      setActivePage('commercial');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleInitiateEdit = (catKey: 'commercial' | 'gnpans' | 'manufacturing') => {
    if (isAdmin) {
      setEditingCategory(catKey);
    } else {
      setPendingCategory(catKey);
      setAuthPassword('');
      setAuthError('');
      setShowAdminAuthModal(true);
    }
  };

  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');
    const res = loginAdmin(authUsername.trim(), authPassword);
    if (res.success) {
      setShowAdminAuthModal(false);
      if (pendingCategory) {
        setEditingCategory(pendingCategory);
        setPendingCategory(null);
      }
    } else {
      setAuthError(res.error || 'Invalid credentials. Please use Admin / admin123.');
    }
  };

  const handleSaveCategoryImage = (newUrl: string) => {
    if (!editingCategory) return;
    updateBrand({
      portalCategoryImages: {
        ...brand.portalCategoryImages,
        [editingCategory]: newUrl,
      },
    });

    const categoryNames: Record<'commercial' | 'gnpans' | 'manufacturing', string> = {
      commercial: 'Commercial Kitchen Equipment (Category 01)',
      gnpans: 'Gastronorm (GN) Pans & Covers (Category 02)',
      manufacturing: 'Kitchenware & Utility (Category 03)',
    };

    setSaveNotification(`✓ ${categoryNames[editingCategory]} image saved successfully!`);
    setTimeout(() => {
      setSaveNotification(null);
    }, 4500);
  };

  return (
    <section
      id="product-categories-section"
      className="py-24 transition-colors relative bg-[#F3E7DA] text-[#292321]"
    >
      {/* Toast Notification on Save */}
      {saveNotification && (
        <div className="fixed top-20 right-4 z-50 max-w-md animate-in slide-in-from-top-4 duration-300">
          <div className="bg-[#5B1018] text-[#F3E7DA] px-5 py-3.5 rounded-sm shadow-2xl flex items-center gap-3 border border-[#D8BFA8]/50">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <div className="text-xs font-tech font-bold uppercase tracking-wider">
              {saveNotification}
            </div>
            <button
              onClick={() => setSaveNotification(null)}
              className="ml-auto text-[#F3E7DA]/80 hover:text-[#F3E7DA] p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-[#D8BFA8]">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-[#5B1018] mb-3">
              <Grid className="w-3.5 h-3.5" />
              <span>DEDICATED PRODUCT CATALOGUES & RANGES</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-[1.08] text-[#292321]">
              CHOOSE YOUR
              <br />
              <span className="text-[#5B1018]">CATEGORY PAGE.</span>
            </h2>
          </div>
          <div className="mt-6 md:mt-0 flex flex-col items-start md:items-end gap-3">
            <p className="text-xs sm:text-sm max-w-md leading-relaxed font-normal text-[#4D423E]">
              Explore dedicated catalogue pages for Commercial Equipment, Gastronorm (GN) Pans, and In-House Stainless Steel Fabrication.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {/* Quick Image Customization Button */}
              <button
                type="button"
                onClick={() => handleInitiateEdit('commercial')}
                className={`px-3 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-xs border transition-all flex items-center gap-1.5 shadow-xs ${
                  isAdmin
                    ? 'bg-[#5B1018] border-[#5B1018] text-[#F3E7DA] hover:bg-[#440B11]'
                    : 'bg-[#FAF4EE] border-[#D8BFA8] text-[#292321] hover:border-[#5B1018] hover:text-[#5B1018]'
                }`}
                title="Change and save category showcase photos"
              >
                <Camera className={`w-3.5 h-3.5 ${isAdmin ? 'text-[#F3E7DA]' : 'text-[#5B1018]'}`} />
                <span>Change Category Images</span>
              </button>

              {/* View Switcher: Product Categories vs Application Domains */}
              <div className="p-1 rounded-xs border inline-flex items-center gap-1 bg-[#FAF4EE] border-[#D8BFA8]">
                <button
                  onClick={() => setViewMode('divisions')}
                  className={`px-3.5 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 ${
                    viewMode === 'divisions'
                      ? 'bg-[#5B1018] text-[#F3E7DA] shadow-xs'
                      : 'text-[#4D423E] hover:text-[#292321]'
                  }`}
                >
                  <Boxes className="w-3 h-3" />
                  <span>CATEGORIES</span>
                </button>

                <button
                  onClick={() => setViewMode('domains')}
                  className={`px-3.5 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 ${
                    viewMode === 'domains'
                      ? 'bg-[#5B1018] text-[#F3E7DA] shadow-xs'
                      : 'text-[#4D423E] hover:text-[#292321]'
                  }`}
                >
                  <Layers className="w-3 h-3" />
                  <span>DOMAINS</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* PRODUCT DIVISIONS VIEW (Default) */}
        {viewMode === 'divisions' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* PORTAL 1: Commercial Kitchen Equipment */}
            <div
              id="portal-card-commercial"
              className="rounded-xs border p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group bg-[#FAF4EE] border-[#D8BFA8] shadow-sm hover:border-[#5B1018] hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xs bg-[#5B1018]/10 text-[#5B1018] border border-[#5B1018]/25">
                      <Flame className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] font-tech font-bold uppercase tracking-[0.2em] text-[#5B1018]">
                      CATEGORY 01
                    </span>
                  </div>
                  <span className="text-[11px] font-tech font-bold px-3 py-1 rounded-xs bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8] tabular-nums">
                    {commercialProducts.length} PRODUCTS
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3 text-[#292321]">
                  Commercial Kitchen Equipment
                </h3>

                {/* Category Visual Showcase Photo with Change Image Option */}
                <div className="relative group/imagebox w-full h-48 mb-5 rounded-xs overflow-hidden bg-white flex items-center justify-center border border-[#D8BFA8] group-hover:border-[#5B1018]/60 transition-colors shadow-inner">
                  <img
                    src={commercialImg}
                    alt="Commercial Kitchen Equipment"
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = DEFAULT_CATEGORY_IMAGES.commercial;
                    }}
                  />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInitiateEdit('commercial');
                    }}
                    className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-xs bg-[#292321]/90 hover:bg-[#5B1018] text-[#F3E7DA] font-tech font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-all flex items-center gap-1.5 border border-[#D8BFA8]/40 shadow-xl backdrop-blur-xs cursor-pointer z-20 group-hover/imagebox:opacity-100 opacity-90 sm:opacity-85"
                    title="Change and save this category image"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#D8BFA8]" />
                    <span>Change Image</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed mb-6 text-[#4D423E]">
                  Heavy-duty electric deep fryers, commercial induction ranges, pizza deck ovens, contact sandwich grillers, and food warming equipment designed for continuous commercial kitchen duty.
                </p>

                <div className="space-y-2 mb-8">
                  <div className="text-[10px] font-tech font-bold uppercase tracking-wider text-[#5A4F4B] mb-2">
                    INCLUDED EQUIPMENT LINES:
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-medium">
                    <span className="px-2.5 py-1 rounded-xs bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8]">
                      Electric Fryers (6L - 24L)
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8]">
                      Commercial Induction
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8]">
                      Stone Deck Pizza Ovens
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8]">
                      Contact Sandwich Grills
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8]">
                      Salamanders & Warmers
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  id="open-commercial-page-btn"
                  onClick={() => navigateToPage('commercial')}
                  className="w-full py-4 px-6 text-xs font-tech font-bold uppercase tracking-[0.16em] rounded-xs transition-all flex items-center justify-between shadow-xs bg-[#5B1018] text-[#F3E7DA] hover:bg-[#440B11]"
                >
                  <span>OPEN KITCHEN EQUIPMENT PAGE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* PORTAL 2: Gastronorm (GN) Pans & Covers */}
            <div
              id="portal-card-gnpans"
              className="rounded-xs border p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group bg-[#FAF4EE] border-[#D8BFA8] shadow-sm hover:border-[#5B1018] hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xs bg-[#292321]/10 text-[#292321] border border-[#B8B8B3]">
                      <Boxes className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] font-tech font-bold uppercase tracking-[0.2em] text-[#5B1018]">
                      CATEGORY 02
                    </span>
                  </div>
                  <span className="text-[11px] font-tech font-bold px-3 py-1 rounded-xs bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8] tabular-nums">
                    {gnPanProducts.length} PRODUCTS
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3 text-[#292321]">
                  Gastronorm (GN) Pans & Covers
                </h3>

                {/* Category Visual Showcase Photo with Change Image Option */}
                <div className="relative group/imagebox w-full h-48 mb-5 rounded-xs overflow-hidden bg-white flex items-center justify-center border border-[#D8BFA8] group-hover:border-[#5B1018]/60 transition-colors shadow-inner">
                  <img
                    src={gnPanImg}
                    alt="Gastronorm (GN) Pans & Covers"
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = DEFAULT_CATEGORY_IMAGES.gnpans;
                    }}
                  />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInitiateEdit('gnpans');
                    }}
                    className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-xs bg-[#292321]/90 hover:bg-[#5B1018] text-[#F3E7DA] font-tech font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-all flex items-center gap-1.5 border border-[#D8BFA8]/40 shadow-xl backdrop-blur-xs cursor-pointer z-20 group-hover/imagebox:opacity-100 opacity-90 sm:opacity-85"
                    title="Change and save this category image"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#D8BFA8]" />
                    <span>Change Image</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed mb-6 text-[#4D423E]">
                  Full EN 631 standard commercial food storage pan series. Precision stamped in AISI 304 food-grade stainless steel & shatterproof polycarbonate with anti-jamming stackable rims.
                </p>

                <div className="space-y-2 mb-8">
                  <div className="text-[10px] font-tech font-bold uppercase tracking-wider text-[#5A4F4B] mb-2">
                    STANDARDIZED CONFIGURATIONS:
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-medium">
                    <span className="px-2.5 py-1 rounded-xs bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8]">
                      GN 1/1 Full Size
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8]">
                      GN 1/2 Half Size
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8]">
                      GN 1/3, 1/4, 1/6, 1/9
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8]">
                      Perforated Steam Pans
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8]">
                      Clear & SS Lids
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  id="open-gnpans-page-btn"
                  onClick={() => navigateToPage('gnpans')}
                  className="w-full py-4 px-6 text-xs font-tech font-bold uppercase tracking-[0.16em] rounded-xs transition-all flex items-center justify-between shadow-xs bg-[#292321] text-[#F3E7DA] hover:bg-[#5B1018]"
                >
                  <span>OPEN GN PAN PAGE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* PORTAL 3: Kitchenware & Utility (In-House Manufacturing) */}
            <div
              id="portal-card-manufacturing"
              className="rounded-xs border p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group bg-[#FAF4EE] border-[#D8BFA8] shadow-sm hover:border-[#5B1018] hover:shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xs bg-[#5B1018]/10 text-[#5B1018] border border-[#5B1018]/25">
                      <Factory className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] font-tech font-bold uppercase tracking-[0.2em] text-[#5B1018]">
                      CATEGORY 03
                    </span>
                  </div>
                  <span className="text-[11px] font-tech font-bold px-3 py-1 rounded-xs bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8] tabular-nums">
                    {manufacturingProducts.length} PRODUCTS
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3 text-[#292321]">
                  Kitchenware & Utility (In-House)
                </h3>

                {/* Category Visual Showcase Photo with Change Image Option */}
                <div className="relative group/imagebox w-full h-48 mb-5 rounded-xs overflow-hidden bg-white flex items-center justify-center border border-[#D8BFA8] group-hover:border-[#5B1018]/60 transition-colors shadow-inner">
                  <img
                    src={manufacturingImg}
                    alt="Kitchenware & Utility Manufacturing"
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = DEFAULT_CATEGORY_IMAGES.manufacturing;
                    }}
                  />

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInitiateEdit('manufacturing');
                    }}
                    className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-xs bg-[#292321]/90 hover:bg-[#5B1018] text-[#F3E7DA] font-tech font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-all flex items-center gap-1.5 border border-[#D8BFA8]/40 shadow-xl backdrop-blur-xs cursor-pointer z-20 group-hover/imagebox:opacity-100 opacity-90 sm:opacity-85"
                    title="Change and save this category image"
                  >
                    <Camera className="w-3.5 h-3.5 text-[#D8BFA8]" />
                    <span>Change Image</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm leading-relaxed mb-6 text-[#4D423E]">
                  Direct factory fabrication of Barfi & Mithai display trays across all 9 depth dimensions, jointless leakproof sweet containers, multi-compartment masala consoles, and stainless wire glass racks.
                </p>

                <div className="space-y-2 mb-8">
                  <div className="text-[10px] font-tech font-bold uppercase tracking-wider text-[#5A4F4B] mb-2">
                    PRECISION FABRICATED LINES:
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-medium">
                    <span className="px-2.5 py-1 rounded-xs bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8]">
                      Barfi Trays (9 Depths)
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8]">
                      Jointless Mithai Trays
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8]">
                      Masala Dabba Consoles
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8]">
                      Wire Glass Baskets
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8]">
                      Custom Countertops
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  id="open-manufacturing-page-btn"
                  onClick={() => navigateToPage('manufacturing')}
                  className="w-full py-4 px-6 text-xs font-tech font-bold uppercase tracking-[0.16em] rounded-xs transition-all flex items-center justify-between shadow-xs bg-[#5B1018] text-[#F3E7DA] hover:bg-[#440B11]"
                >
                  <span>OPEN KITCHENWARE & UTILITY</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* DOMAINS VIEW */}
        {viewMode === 'domains' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {PRODUCT_DOMAINS.map((domain) => {
              const count = products.filter((p) => getProductDomain(p) === domain.id).length;

              return (
                <div
                  key={domain.id}
                  id={`domain-card-${domain.id}`}
                  onClick={() => handleDomainClick(domain.id)}
                  className="group relative flex flex-col justify-between rounded-xs overflow-hidden transition-all duration-300 cursor-pointer h-[420px] border shadow-sm bg-[#292321] border-[#D8BFA8] hover:border-[#5B1018] hover:shadow-xl"
                >
                  {/* Background Image with Warm Charcoal Vignette */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={domain.image}
                      alt={domain.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-45 group-hover:opacity-55"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#292321] via-[#292321]/80 to-[#292321]/30" />
                  </div>

                  {/* Top Badge */}
                  <div className="relative z-10 p-6 flex items-center justify-between">
                    <span className="text-[10px] font-tech tracking-[0.2em] uppercase px-3 py-1 bg-[#292321]/85 backdrop-blur-md border border-[#D8BFA8]/40 text-[#F3E7DA] rounded-xs tabular-nums">
                      {count} {count === 1 ? 'PRODUCT' : 'PRODUCTS'}
                    </span>
                    <div className="w-8 h-8 rounded-xs bg-[#F3E7DA]/15 backdrop-blur-md flex items-center justify-center text-[#F3E7DA] group-hover:bg-[#5B1018] group-hover:text-[#F3E7DA] transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-10 p-6 flex flex-col justify-end">
                    <span className="text-[10px] font-tech uppercase tracking-widest text-[#D8BFA8] block mb-1">
                      {domain.badge}
                    </span>
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-[#F3E7DA] mb-1 group-hover:text-[#D8BFA8] transition-colors">
                      {domain.name}
                    </h3>
                    <p className="text-[11px] font-tech tracking-wider text-[#D8BFA8] uppercase mb-2">
                      {domain.tagline}
                    </p>
                    <p className="text-xs text-[#F3E7DA]/85 line-clamp-2 leading-relaxed mb-5 font-normal">
                      {domain.description}
                    </p>

                    <div className="pt-3 border-t border-[#D8BFA8]/25 flex items-center justify-between text-xs font-tech font-semibold tracking-wider text-[#F3E7DA] group-hover:text-[#D8BFA8]">
                      <span>OPEN DEDICATED SECTION</span>
                      <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Category Image Edit Modal */}
      {editingCategory && (
        <CategoryImageEditModal
          isOpen={true}
          onClose={() => setEditingCategory(null)}
          categoryKey={editingCategory}
          categoryTitle={
            editingCategory === 'commercial'
              ? 'Commercial Kitchen Equipment'
              : editingCategory === 'gnpans'
              ? 'Gastronorm (GN) Pans & Covers'
              : 'Kitchenware & Utility (In-House)'
          }
          categoryBadge={
            editingCategory === 'commercial'
              ? 'CATEGORY 01'
              : editingCategory === 'gnpans'
              ? 'CATEGORY 02'
              : 'CATEGORY 03'
          }
          currentImage={
            editingCategory === 'commercial'
              ? commercialImg
              : editingCategory === 'gnpans'
              ? gnPanImg
              : manufacturingImg
          }
          defaultImage={DEFAULT_CATEGORY_IMAGES[editingCategory]}
          onSave={handleSaveCategoryImage}
        />
      )}

      {/* Admin Authorization Modal */}
      {showAdminAuthModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#292321]/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAdminAuthModal(false);
          }}
        >
          <div className="w-full max-w-md p-6 rounded-xs border shadow-2xl bg-[#FAF4EE] border-[#D8BFA8] text-[#292321]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-[#5B1018]">
                <Shield className="w-5 h-5" />
                <span className="font-tech font-bold uppercase text-xs tracking-wider">
                  Admin Sign-In Required
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowAdminAuthModal(false)}
                className="text-[#4D423E] hover:text-[#5B1018]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-lg font-bold uppercase tracking-tight mb-1 text-[#292321]">
              Administrator Login
            </h3>
            <p className="text-xs text-[#4D423E] mb-5 leading-relaxed">
              Only authorized administrators can edit and save website images. Enter your Admin credentials to change this category photo.
            </p>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-tech font-bold uppercase tracking-wider text-[#4D423E] block mb-1">
                  Admin Username
                </label>
                <input
                  type="text"
                  value={authUsername}
                  onChange={(e) => setAuthUsername(e.target.value)}
                  required
                  placeholder="Admin"
                  className="w-full px-3 py-2 text-xs rounded-xs border outline-none font-mono bg-white border-[#D8BFA8] text-[#292321] focus:border-[#5B1018]"
                />
              </div>

              <div>
                <label className="text-[11px] font-tech font-bold uppercase tracking-wider text-[#4D423E] block mb-1">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  required
                  placeholder="admin123"
                  className="w-full px-3 py-2 text-xs rounded-xs border outline-none font-mono bg-white border-[#D8BFA8] text-[#292321] focus:border-[#5B1018]"
                />
                <p className="text-[10px] text-[#5A4F4B] mt-1">
                  Default credentials: Username <span className="font-mono text-[#5B1018] font-bold">Admin</span>, Password <span className="font-mono text-[#5B1018] font-bold">admin123</span>
                </p>
              </div>

              {authError && (
                <div className="p-2.5 rounded-xs bg-[#5B1018]/10 border border-[#5B1018]/30 text-[#5B1018] text-xs">
                  {authError}
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdminAuthModal(false)}
                  className="px-4 py-2 text-xs font-tech font-bold uppercase tracking-wider text-[#4D423E] hover:text-[#292321]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xs bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5"
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>Log In & Edit Image</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
