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
    themeMode,
  } = useContent();

  const isLight = themeMode === 'light';
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
      className={`py-24 transition-colors relative ${isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#090b0e] text-white'}`}
    >
      {/* Toast Notification on Save */}
      {saveNotification && (
        <div className="fixed top-20 right-4 z-50 max-w-md animate-in slide-in-from-top-4 duration-300">
          <div className="bg-emerald-600 text-white px-5 py-3.5 rounded-sm shadow-2xl flex items-center gap-3 border border-emerald-400">
            <CheckCircle className="w-5 h-5 shrink-0" />
            <div className="text-xs font-tech font-bold uppercase tracking-wider">
              {saveNotification}
            </div>
            <button
              onClick={() => setSaveNotification(null)}
              className="ml-auto text-white/80 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400 mb-3">
              <Grid className="w-3.5 h-3.5" />
              <span>DEDICATED PRODUCT CATALOGUES & RANGES</span>
            </div>
            <h2
              className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-[1.08] ${
                isLight ? 'text-[#171717]' : 'text-[#ffffff]'
              }`}
            >
              CHOOSE YOUR
              <br />
              <span className={isLight ? 'text-[#b45309]' : 'text-[#f59e0b]'}>
                CATEGORY PAGE.
              </span>
            </h2>
          </div>
          <div className="mt-6 md:mt-0 flex flex-col items-start md:items-end gap-3">
            <p
              className={`text-xs sm:text-sm max-w-md leading-relaxed font-normal ${
                isLight ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              Explore dedicated catalogue pages for Commercial Equipment, Gastronorm (GN) Pans, and In-House Stainless Steel Fabrication.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              {/* Quick Image Customization Button */}
              <button
                type="button"
                onClick={() => handleInitiateEdit('commercial')}
                className={`px-3 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-xs border transition-all flex items-center gap-1.5 shadow-xs ${
                  isAdmin
                    ? 'bg-amber-500/15 border-amber-500/50 text-amber-400 hover:bg-amber-500 hover:text-slate-950'
                    : isLight
                    ? 'bg-white border-slate-300 text-slate-700 hover:bg-slate-100'
                    : 'bg-zinc-900 border-white/20 text-zinc-300 hover:text-white hover:bg-zinc-800'
                }`}
                title="Change and save category showcase photos"
              >
                <Camera className="w-3.5 h-3.5 text-amber-500" />
                <span>Change Category Images</span>
              </button>

              {/* View Switcher: Product Categories vs Application Domains */}
              <div
                className={`p-1 rounded-xs border inline-flex items-center gap-1 ${
                  isLight ? 'bg-white border-slate-300' : 'bg-zinc-900 border-white/15'
                }`}
              >
                <button
                  onClick={() => setViewMode('divisions')}
                  className={`px-3.5 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 ${
                    viewMode === 'divisions'
                      ? isLight
                        ? 'bg-slate-950 text-white shadow-xs'
                        : 'bg-white text-zinc-950'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-950'
                      : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <Boxes className="w-3 h-3" />
                  <span>CATEGORIES</span>
                </button>

                <button
                  onClick={() => setViewMode('domains')}
                  className={`px-3.5 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-xs transition-all flex items-center gap-1.5 ${
                    viewMode === 'domains'
                      ? isLight
                        ? 'bg-slate-950 text-white shadow-xs'
                        : 'bg-white text-zinc-950'
                      : isLight
                      ? 'text-slate-600 hover:text-slate-950'
                      : 'text-zinc-400 hover:text-white'
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
              className={`rounded-xs border p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
                isLight
                  ? 'bg-white border-slate-200 shadow-sm hover:border-slate-400 hover:shadow-xl'
                  : 'bg-[#11141a] border-white/10 hover:border-amber-500/50 hover:bg-[#131720]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xs bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                      <Flame className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] font-tech font-bold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
                      CATEGORY 01
                    </span>
                  </div>
                  <span className="text-[11px] font-tech font-bold px-3 py-1 rounded-xs bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-white/10">
                    {commercialProducts.length} PRODUCTS
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3">
                  Commercial Kitchen Equipment
                </h3>

                {/* Category Visual Showcase Photo with Change Image Option */}
                <div className="relative group/imagebox w-full h-48 mb-5 rounded-xs overflow-hidden bg-zinc-950 flex items-center justify-center border border-white/10 group-hover:border-amber-500/40 transition-colors shadow-inner">
                  <img
                    src={commercialImg}
                    alt="Commercial Kitchen Equipment"
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = DEFAULT_CATEGORY_IMAGES.commercial;
                    }}
                  />

                  {/* Change Image Action Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInitiateEdit('commercial');
                    }}
                    className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-xs bg-black/90 hover:bg-amber-500 text-white hover:text-black font-tech font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-all flex items-center gap-1.5 border border-white/20 hover:border-amber-400 shadow-xl backdrop-blur-xs cursor-pointer z-20 group-hover/imagebox:opacity-100 opacity-90 sm:opacity-85"
                    title="Change and save this category image"
                  >
                    <Camera className="w-3.5 h-3.5 text-amber-400 group-hover/imagebox:text-black" />
                    <span>Change Image</span>
                  </button>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                  Heavy-duty electric deep fryers, commercial induction ranges, pizza deck ovens, contact sandwich grillers, and food warming equipment designed for continuous commercial kitchen duty.
                </p>

                <div className="space-y-2 mb-8">
                  <div className="text-[10px] font-tech font-bold uppercase tracking-wider text-slate-400 mb-2">
                    INCLUDED EQUIPMENT LINES:
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-medium">
                    <span className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                      Electric Fryers (6L - 24L)
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                      Commercial Induction
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                      Stone Deck Pizza Ovens
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                      Contact Sandwich Grills
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                      Salamanders & Warmers
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  id="open-commercial-page-btn"
                  onClick={() => navigateToPage('commercial')}
                  className={`w-full py-4 px-6 text-xs font-tech font-bold uppercase tracking-[0.16em] rounded-xs transition-all flex items-center justify-between shadow-xs ${
                    isLight
                      ? 'bg-slate-950 text-white hover:bg-slate-800'
                      : 'bg-amber-500 text-slate-950 hover:bg-amber-400 font-extrabold'
                  }`}
                >
                  <span>OPEN KITCHEN EQUIPMENT PAGE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* PORTAL 2: Gastronorm (GN) Pans & Covers */}
            <div
              id="portal-card-gnpans"
              className={`rounded-xs border p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
                isLight
                  ? 'bg-white border-slate-200 shadow-sm hover:border-slate-400 hover:shadow-xl'
                  : 'bg-[#11141a] border-white/10 hover:border-blue-500/50 hover:bg-[#131720]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xs bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20">
                      <Boxes className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] font-tech font-bold uppercase tracking-[0.2em] text-blue-700 dark:text-blue-400">
                      CATEGORY 02
                    </span>
                  </div>
                  <span className="text-[11px] font-tech font-bold px-3 py-1 rounded-xs bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-white/10">
                    {gnPanProducts.length} PRODUCTS
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3">
                  Gastronorm (GN) Pans & Covers
                </h3>

                {/* Category Visual Showcase Photo with Change Image Option */}
                <div className="relative group/imagebox w-full h-48 mb-5 rounded-xs overflow-hidden bg-zinc-950 flex items-center justify-center border border-white/10 group-hover:border-blue-500/40 transition-colors shadow-inner">
                  <img
                    src={gnPanImg}
                    alt="Gastronorm (GN) Pans & Covers"
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = DEFAULT_CATEGORY_IMAGES.gnpans;
                    }}
                  />

                  {/* Change Image Action Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInitiateEdit('gnpans');
                    }}
                    className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-xs bg-black/90 hover:bg-blue-600 text-white font-tech font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-all flex items-center gap-1.5 border border-white/20 hover:border-blue-400 shadow-xl backdrop-blur-xs cursor-pointer z-20 group-hover/imagebox:opacity-100 opacity-90 sm:opacity-85"
                    title="Change and save this category image"
                  >
                    <Camera className="w-3.5 h-3.5 text-blue-400" />
                    <span>Change Image</span>
                  </button>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                  Full EN 631 standard commercial food storage pan series. Precision stamped in AISI 304 food-grade stainless steel & shatterproof polycarbonate with anti-jamming stackable rims.
                </p>

                <div className="space-y-2 mb-8">
                  <div className="text-[10px] font-tech font-bold uppercase tracking-wider text-slate-400 mb-2">
                    STANDARDIZED CONFIGURATIONS:
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-medium">
                    <span className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                      GN 1/1 Full Size
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                      GN 1/2 Half Size
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                      GN 1/3, 1/4, 1/6, 1/9
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                      Perforated Steam Pans
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                      Clear & SS Lids
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  id="open-gnpans-page-btn"
                  onClick={() => navigateToPage('gnpans')}
                  className={`w-full py-4 px-6 text-xs font-tech font-bold uppercase tracking-[0.16em] rounded-xs transition-all flex items-center justify-between shadow-xs ${
                    isLight
                      ? 'bg-slate-950 text-white hover:bg-slate-800'
                      : 'bg-blue-600 text-white hover:bg-blue-500 font-extrabold'
                  }`}
                >
                  <span>OPEN GN PAN PAGE</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* PORTAL 3: Kitchenware & Utility (In-House Manufacturing) */}
            <div
              id="portal-card-manufacturing"
              className={`rounded-xs border p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden group ${
                isLight
                  ? 'bg-white border-slate-200 shadow-sm hover:border-slate-400 hover:shadow-xl'
                  : 'bg-[#11141a] border-white/10 hover:border-emerald-500/50 hover:bg-[#131720]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="p-2 rounded-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                      <Factory className="w-5 h-5" />
                    </span>
                    <span className="text-[10px] font-tech font-bold uppercase tracking-[0.2em] text-emerald-700 dark:text-emerald-400">
                      CATEGORY 03
                    </span>
                  </div>
                  <span className="text-[11px] font-tech font-bold px-3 py-1 rounded-xs bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-white/10">
                    {manufacturingProducts.length} PRODUCTS
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-3">
                  Kitchenware & Utility (In-House)
                </h3>

                {/* Category Visual Showcase Photo with Change Image Option */}
                <div className="relative group/imagebox w-full h-48 mb-5 rounded-xs overflow-hidden bg-zinc-950 flex items-center justify-center border border-white/10 group-hover:border-emerald-500/40 transition-colors shadow-inner">
                  <img
                    src={manufacturingImg}
                    alt="Kitchenware & Utility Manufacturing"
                    className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src = DEFAULT_CATEGORY_IMAGES.manufacturing;
                    }}
                  />

                  {/* Change Image Action Button */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleInitiateEdit('manufacturing');
                    }}
                    className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-xs bg-black/90 hover:bg-emerald-600 text-white font-tech font-bold text-[10px] sm:text-[11px] uppercase tracking-wider transition-all flex items-center gap-1.5 border border-white/20 hover:border-emerald-400 shadow-xl backdrop-blur-xs cursor-pointer z-20 group-hover/imagebox:opacity-100 opacity-90 sm:opacity-85"
                    title="Change and save this category image"
                  >
                    <Camera className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Change Image</span>
                  </button>
                </div>

                <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                  Direct factory fabrication of Barfi & Mithai display trays across all 9 depth dimensions, jointless leakproof sweet containers, multi-compartment masala consoles, and stainless wire glass racks.
                </p>

                <div className="space-y-2 mb-8">
                  <div className="text-[10px] font-tech font-bold uppercase tracking-wider text-slate-400 mb-2">
                    PRECISION FABRICATED LINES:
                  </div>
                  <div className="flex flex-wrap gap-2 text-xs font-medium">
                    <span className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                      Barfi Trays (9 Depths)
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                      Jointless Mithai Trays
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                      Masala Dabba Consoles
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                      Wire Glass Baskets
                    </span>
                    <span className="px-2.5 py-1 rounded-xs bg-slate-100 dark:bg-zinc-800/80 text-slate-700 dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                      Custom Countertops
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <button
                  id="open-manufacturing-page-btn"
                  onClick={() => navigateToPage('manufacturing')}
                  className={`w-full py-4 px-6 text-xs font-tech font-bold uppercase tracking-[0.16em] rounded-xs transition-all flex items-center justify-between shadow-xs ${
                    isLight
                      ? 'bg-slate-950 text-white hover:bg-slate-800'
                      : 'bg-emerald-600 text-white hover:bg-emerald-500 font-extrabold'
                  }`}
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
                  className={`group relative flex flex-col justify-between rounded-xs overflow-hidden transition-all duration-300 cursor-pointer h-[420px] border shadow-sm ${
                    isLight
                      ? 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-xl'
                      : 'bg-[#11141a] border-white/10 hover:border-white/30 hover:bg-[#131720]'
                  }`}
                >
                  {/* Background Image with Vignette */}
                  <div className="absolute inset-0 z-0">
                    <img
                      src={domain.image}
                      alt={domain.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 opacity-40 group-hover:opacity-50"
                      referrerPolicy="no-referrer"
                    />
                    <div
                      className={`absolute inset-0 ${
                        isLight
                          ? 'bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-900/30'
                          : 'bg-gradient-to-t from-[#090b0e] via-[#090b0e]/80 to-transparent'
                      }`}
                    />
                  </div>

                  {/* Top Badge */}
                  <div className="relative z-10 p-6 flex items-center justify-between">
                    <span className="text-[10px] font-tech tracking-[0.2em] uppercase px-3 py-1 bg-black/80 backdrop-blur-md border border-white/20 text-white rounded-xs">
                      {count} {count === 1 ? 'PRODUCT' : 'PRODUCTS'}
                    </span>
                    <div className="w-8 h-8 rounded-xs bg-white/10 backdrop-blur-md flex items-center justify-center text-white group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="relative z-10 p-6 flex flex-col justify-end">
                    <span className="text-[10px] font-tech uppercase tracking-widest text-amber-400 block mb-1">
                      {domain.badge}
                    </span>
                    <h3 className="text-2xl font-bold uppercase tracking-tight text-white mb-1 group-hover:text-amber-300 transition-colors">
                      {domain.name}
                    </h3>
                    <p className="text-[11px] font-tech tracking-wider text-amber-200/90 uppercase mb-2">
                      {domain.tagline}
                    </p>
                    <p className="text-xs text-zinc-200 line-clamp-2 leading-relaxed mb-5 font-normal">
                      {domain.description}
                    </p>

                    <div className="pt-3 border-t border-white/15 flex items-center justify-between text-xs font-tech font-semibold tracking-wider text-white group-hover:text-amber-300">
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
          themeMode={themeMode}
        />
      )}

      {/* Admin Authorization Modal (Shown when unauthenticated user attempts to edit images) */}
      {showAdminAuthModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowAdminAuthModal(false);
          }}
        >
          <div
            className={`w-full max-w-md p-6 rounded-xs border shadow-2xl ${
              isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-zinc-900 border-white/20 text-white'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-amber-500">
                <Shield className="w-5 h-5" />
                <span className="font-tech font-bold uppercase text-xs tracking-wider">
                  Admin Sign-In Required
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowAdminAuthModal(false)}
                className="text-zinc-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <h3 className="text-lg font-bold uppercase tracking-tight mb-1">
              Administrator Login
            </h3>
            <p className="text-xs text-zinc-400 mb-5 leading-relaxed">
              Only authorized administrators can edit and save website images. Enter your Admin credentials to change this category photo.
            </p>

            <form onSubmit={handleAuthSubmit} className="space-y-4">
              <div>
                <label className="text-[11px] font-tech font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Admin Username
                </label>
                <input
                  type="text"
                  value={authUsername}
                  onChange={(e) => setAuthUsername(e.target.value)}
                  required
                  placeholder="Admin"
                  className={`w-full px-3 py-2 text-xs rounded-xs border outline-none font-mono ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                      : 'bg-zinc-950 border-white/20 text-white focus:border-amber-500'
                  }`}
                />
              </div>

              <div>
                <label className="text-[11px] font-tech font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Admin Password
                </label>
                <input
                  type="password"
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  required
                  placeholder="admin123"
                  className={`w-full px-3 py-2 text-xs rounded-xs border outline-none font-mono ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                      : 'bg-zinc-950 border-white/20 text-white focus:border-amber-500'
                  }`}
                />
                <p className="text-[10px] text-zinc-500 mt-1">
                  Default credentials: Username <span className="font-mono text-amber-400">Admin</span>, Password <span className="font-mono text-amber-400">admin123</span>
                </p>
              </div>

              {authError && (
                <div className="p-2.5 rounded-xs bg-red-500/15 border border-red-500/30 text-red-400 text-xs">
                  {authError}
                </div>
              )}

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowAdminAuthModal(false)}
                  className="px-4 py-2 text-xs font-tech font-bold uppercase tracking-wider text-zinc-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5"
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
