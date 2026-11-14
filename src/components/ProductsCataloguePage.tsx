import React, { useState, useMemo } from 'react';
import { useContent } from '../context/ContentContext';
import { ProductItem, BusinessDivision } from '../types';
import { ProductDetailView } from './ProductDetailView';
import { TopPageBackButton } from './TopPageBackButton';
import {
  Search,
  Flame,
  Factory,
  X,
  ChevronRight,
  Sun,
  Moon,
  Info,
  Sliders,
  Edit2,
  Plus,
  Star,
  Trash2,
  Copy,
  Check,
  Sparkles,
  AlertTriangle,
  Layers,
  Camera,
  Upload,
  FileText,
  ArrowRight,
  MessageSquare,
  Package,
} from 'lucide-react';
import { PRODUCT_DOMAINS, getProductDomain, DOMAIN_LABEL_MAP } from '../data/productDomains';

export const ProductsCataloguePage: React.FC = () => {
  const {
    products,
    categories,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    selectedDomainFilter,
    setSelectedDomainFilter,
    selectedProductForDetail,
    setSelectedProductForDetail,
    activeDivisionFilter,
    setActiveDivisionFilter,
    openQuoteModal,
    computePricing,
    themeMode,
    toggleThemeMode,
    isAdmin,
    setAdminModalOpen,
    openAdminModalForProduct,
    deleteProduct,
    toggleProductFeatured,
    duplicateProduct,
    addProduct,
    openImageEditModal,
    setActivePage,
  } = useContent();

  const isLight = themeMode === 'light';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedApplication, setSelectedApplication] = useState('all');
  const [onlyFeaturedFilter, setOnlyFeaturedFilter] = useState(false);
  const [productToDelete, setProductToDelete] = useState<ProductItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  const featuredCount = useMemo(() => {
    return products.filter((p) => p.isFeatured).length;
  }, [products]);

  // Categories filtered by active division
  const visibleCategories = useMemo(() => {
    if (activeDivisionFilter === 'all') return categories;
    return categories.filter((c) => c.division === activeDivisionFilter);
  }, [categories, activeDivisionFilter]);

  // Distinct applications from current products
  const availableApplications = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      p.applications?.forEach((app) => set.add(app));
    });
    return Array.from(set);
  }, [products]);

  // Filtered product list
  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      // Featured Only filter
      if (onlyFeaturedFilter && !item.isFeatured) {
        return false;
      }

      // Division filter
      if (activeDivisionFilter !== 'all' && item.division !== activeDivisionFilter) {
        return false;
      }

      // Category filter
      if (selectedCategoryFilter !== 'all') {
        if (item.category.toLowerCase() !== selectedCategoryFilter.toLowerCase()) {
          return false;
        }
      }

      // Domain filter (Cooking, Baking, Steaming, Food Storage, Grilling, Toasting, Serving & Presentation, Traditional & Specialty)
      if (selectedDomainFilter !== 'all') {
        const domain = getProductDomain(item);
        if (domain !== selectedDomainFilter) {
          return false;
        }
      }

      // Application filter
      if (selectedApplication !== 'all') {
        const matchesApp = item.applications?.some(
          (a) => a.toLowerCase() === selectedApplication.toLowerCase()
        );
        if (!matchesApp) return false;
      }

      // Search Query filter
      if (searchQuery.trim() !== '') {
        const q = searchQuery.toLowerCase();
        const inName = item.name.toLowerCase().includes(q);
        const inModel = item.model.toLowerCase().includes(q);
        const inCode = item.productCode.toLowerCase().includes(q);
        const inDesc = item.shortDescription.toLowerCase().includes(q);
        const inVariant = item.variantOrSize ? item.variantOrSize.toLowerCase().includes(q) : false;
        const inPower = item.specifications.power?.toLowerCase().includes(q);
        const inMaterial = item.specifications.material?.toLowerCase().includes(q);
        if (!inName && !inModel && !inCode && !inDesc && !inVariant && !inPower && !inMaterial) {
          return false;
        }
      }

      return true;
    });
  }, [products, onlyFeaturedFilter, activeDivisionFilter, selectedCategoryFilter, selectedDomainFilter, selectedApplication, searchQuery]);

  const handleQuickAddProduct = () => {
    const randomCode = Math.floor(Math.random() * 900 + 100);
    const newProduct: Omit<ProductItem, 'id'> = {
      division: activeDivisionFilter === 'manufacturing' ? 'manufacturing' : 'commercial',
      name: 'New Commercial Equipment',
      model: `SDS-${randomCode}`,
      productCode: `SDS-${randomCode}`,
      category: selectedCategoryFilter !== 'all' ? selectedCategoryFilter : 'cooking',
      shortDescription: 'Heavy-duty stainless steel commercial equipment engineered for industrial kitchens.',
      longDescription: 'Commercial-grade equipment manufactured with food-grade AISI 304 stainless steel. Designed for continuous daily commercial operations with maximum energy efficiency.',
      mainImage: '',
      galleryImages: [],
      keyFeatures: [
        'Heavy gauge AISI 304 food-grade stainless steel fabrication',
        'Engineered for 24/7 continuous commercial service',
        'Standard B2B commercial warranty included',
      ],
      specifications: {
        model: `SDS-${randomCode}`,
        material: 'AISI 304 Stainless Steel',
        voltage: '220V - 240V / 50Hz',
        power: '2.5 kW',
      },
      applications: ['Restaurants', 'Hotels', 'Banquets', 'Industrial Kitchens'],
      isFeatured: true,
      variants: [
        {
          id: `var-${Date.now()}-1`,
          sizeName: 'Standard Size Option',
          dimensions: '24" × 30" × 34"',
          weight: '45 kg',
          modelCode: `SDS-${randomCode}-STD`,
          finalCustomerPrice: 18500,
        },
      ],
    };
    addProduct(newProduct);
    showToast(`Added new product! You can now edit its specifications and sizes.`);
  };

  if (selectedProductForDetail) {
    return (
      <ProductDetailView
        product={selectedProductForDetail}
        onBack={() => setSelectedProductForDetail(null)}
      />
    );
  }

  return (
    <div
      id="products-catalogue-page"
      className={`py-14 min-h-screen transition-colors duration-300 ${
        isLight ? 'bg-[#f4f6f9] text-slate-800' : 'bg-[#0a0c0f] text-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TopPageBackButton currentPageTitle="Equipment & Manufacturing Catalogue" />

        {/* Page Header */}
        <div
          className={`mb-8 pb-8 border-b flex flex-col md:flex-row md:items-end justify-between gap-6 ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}
        >
          <div>
            <div
              className={`text-[11px] font-tech uppercase tracking-[0.25em] mb-2 font-bold ${
                isLight ? 'text-amber-700' : 'text-amber-400'
              }`}
            >
              SHRI DURGA STEELS • COMPLETE B2B CATALOGUE
            </div>
            <h1
              className={`text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight leading-tight ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              Equipment & Manufacturing Catalogue
            </h1>
            <p
              className={`text-sm sm:text-base mt-2 max-w-2xl leading-relaxed font-normal ${
                isLight ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              Explore our full range across two specialized divisions: Commercial Kitchen Cooking Appliances and Shree Durga Steels In-House Stainless Steel Manufacturing.
            </p>
          </div>

          {/* Theme Switcher Pill */}
          <div className="shrink-0">
            <button
              onClick={toggleThemeMode}
              className={`px-3 py-2 rounded-sm text-xs font-tech font-bold uppercase tracking-wider flex items-center gap-2 border transition-colors ${
                isLight
                  ? 'bg-white text-slate-800 border-slate-300 hover:bg-slate-100 shadow-xs'
                  : 'bg-zinc-900 text-zinc-200 border-white/15 hover:bg-zinc-800'
              }`}
            >
              {isLight ? (
                <>
                  <Moon className="w-3.5 h-3.5 text-slate-700" />
                  <span>DARK THEME</span>
                </>
              ) : (
                <>
                  <Sun className="w-3.5 h-3.5 text-amber-400" />
                  <span>LIGHT THEME</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Division Master Switcher */}
        <div className="mb-6">
          <div
            className={`p-1.5 rounded-sm border inline-flex flex-wrap items-center gap-1.5 w-full ${
              isLight ? 'bg-white border-slate-300 shadow-xs' : 'bg-zinc-900 border-white/15'
            }`}
          >
            <button
              onClick={() => {
                setActiveDivisionFilter('all');
                setSelectedCategoryFilter('all');
                setOnlyFeaturedFilter(false);
              }}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-xs transition-all ${
                activeDivisionFilter === 'all' && !onlyFeaturedFilter
                  ? isLight
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-white text-zinc-950'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              ALL ITEMS ({products.length})
            </button>

            <button
              onClick={() => {
                setActiveDivisionFilter('commercial');
                setSelectedCategoryFilter('all');
                setOnlyFeaturedFilter(false);
              }}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-1.5 transition-all ${
                activeDivisionFilter === 'commercial' && !onlyFeaturedFilter
                  ? isLight
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-white text-zinc-950'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>KITCHEN EQUIPMENT ({products.filter((p) => p.division === 'commercial').length})</span>
            </button>

            <button
              onClick={() => {
                setActiveDivisionFilter('manufacturing');
                setSelectedCategoryFilter('all');
                setOnlyFeaturedFilter(false);
              }}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-1.5 transition-all ${
                activeDivisionFilter === 'manufacturing' && !onlyFeaturedFilter
                  ? isLight
                    ? 'bg-slate-950 text-white shadow-xs'
                    : 'bg-white text-zinc-950'
                  : isLight
                  ? 'text-slate-600 hover:text-slate-950 hover:bg-slate-100'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Factory className="w-3.5 h-3.5 text-emerald-500" />
              <span>KITCHENWARE & HOME UTILITY ({products.filter((p) => p.division === 'manufacturing').length})</span>
            </button>

            {/* Featured Only Filter Pill */}
            <button
              onClick={() => setOnlyFeaturedFilter(!onlyFeaturedFilter)}
              className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-xs flex items-center gap-1.5 transition-all ${
                onlyFeaturedFilter
                  ? 'bg-amber-500 text-black shadow-xs font-black'
                  : isLight
                  ? 'text-amber-800 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30'
                  : 'text-amber-300 bg-amber-500/15 hover:bg-amber-500/25 border border-amber-500/30'
              }`}
              title="Show only products selected to appear in homepage featured section"
            >
              <Star className={`w-3.5 h-3.5 ${onlyFeaturedFilter ? 'fill-black' : 'fill-amber-500 text-amber-500'}`} />
              <span>FEATURED ON HOMEPAGE ({featuredCount})</span>
            </button>

            {/* Quick Actions Right Side */}
            <div className="flex items-center gap-2 ml-auto">
              {/* 1. STARTING OPTION: GET A QUOTE */}
              <button
                type="button"
                onClick={() => openQuoteModal('Full Product Line Inquiry', 'CATALOGUE-ALL')}
                className="px-3.5 py-2 text-xs font-tech font-black uppercase tracking-wider rounded-xs flex items-center gap-1.5 bg-slate-950 text-white dark:bg-white dark:text-zinc-950 hover:bg-amber-500 hover:text-black dark:hover:bg-amber-400 transition-all shadow-md active:scale-95 border border-amber-500/40"
                title="Get quotation for catalogue products"
              >
                <FileText className="w-3.5 h-3.5 text-amber-500 dark:text-amber-600" />
                <span>GET A QUOTE</span>
              </button>

              {/* Admin-only quick actions */}
              {isAdmin && (
                <>
                  <button
                    onClick={handleQuickAddProduct}
                    className="px-3 py-2 text-xs font-tech font-bold uppercase tracking-wider rounded-xs flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white transition-colors shadow-xs"
                    title="Create a new equipment product and configure its specifications"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ ADD PRODUCT</span>
                  </button>

                  <button
                    onClick={() => setAdminModalOpen(true)}
                    className="px-3.5 py-2 text-xs font-tech font-bold uppercase tracking-wider rounded-xs flex items-center gap-1.5 bg-amber-500 text-black hover:bg-amber-400 transition-colors shadow-xs"
                    title="Open Admin CMS to edit products, sizes, categories, and contact info"
                  >
                    <Sliders className="w-3.5 h-3.5" />
                    <span>CMS / EDIT</span>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center">
            {/* Search Input */}
            <div className="relative flex-1 max-w-md">
              <Search
                className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${
                  isLight ? 'text-slate-400' : 'text-zinc-400'
                }`}
              />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by name, model, dimensions, material..."
                className={`w-full pl-10 pr-10 py-2.5 rounded-sm text-xs font-tech focus:outline-none transition-colors ${
                  isLight
                    ? 'bg-white border border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-slate-800 shadow-xs'
                    : 'bg-zinc-900 border border-white/15 text-white placeholder-zinc-500 focus:border-white'
                }`}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className={`absolute right-3 top-1/2 -translate-y-1/2 ${
                    isLight ? 'text-slate-400 hover:text-slate-900' : 'text-zinc-400 hover:text-white'
                  }`}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Total Results Count */}
            <div
              className={`text-xs font-tech tracking-wider ${
                isLight ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              SHOWING <span className="font-bold text-slate-950 dark:text-white">{filteredProducts.length}</span> OF{' '}
              <span className="font-semibold">{products.length}</span> MODELS
            </div>
          </div>

          {/* Domain Classification Tabs */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-2 text-[10px] font-tech uppercase font-bold text-slate-500 dark:text-zinc-400 tracking-wider">
              <Layers className="w-3 h-3 text-amber-500" />
              <span>CORE FOODSERVICE DOMAINS:</span>
            </div>
            <div
              className={`flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none ${
                isLight ? 'border-b border-slate-200' : 'border-b border-white/10'
              }`}
            >
              <button
                onClick={() => {
                  setSelectedDomainFilter('all');
                }}
                className={`px-3 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-sm shrink-0 transition-colors ${
                  selectedDomainFilter === 'all'
                    ? isLight
                      ? 'bg-amber-500 text-black shadow-xs font-black'
                      : 'bg-amber-500 text-black shadow-xs font-black'
                    : isLight
                    ? 'bg-white text-slate-700 hover:text-slate-950 border border-slate-200'
                    : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/10'
                }`}
              >
                ALL DOMAINS ({products.length})
              </button>

              {PRODUCT_DOMAINS.map((domain) => {
                const domainCount = products.filter((p) => getProductDomain(p) === domain.id).length;
                const isDomainActive = selectedDomainFilter === domain.id;
                return (
                  <button
                    key={domain.id}
                    onClick={() => {
                      setSelectedDomainFilter(domain.id);
                      setSelectedCategoryFilter('all');
                    }}
                    className={`px-3 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-sm shrink-0 transition-colors ${
                      isDomainActive
                        ? 'bg-amber-500 text-black shadow-xs font-black'
                        : isLight
                        ? 'bg-white text-slate-700 hover:text-slate-950 border border-slate-200'
                        : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/10'
                    }`}
                  >
                    {domain.name} ({domainCount})
                  </button>
                );
              })}
            </div>
          </div>

          {/* Category Tabs */}
          <div
            className={`flex items-center gap-1.5 overflow-x-auto pb-2 border-b scrollbar-none ${
              isLight ? 'border-slate-200' : 'border-white/10'
            }`}
          >
            <button
              onClick={() => {
                setSelectedCategoryFilter('all');
                setSelectedDomainFilter('all');
              }}
              className={`px-3 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-sm shrink-0 transition-colors ${
                selectedCategoryFilter === 'all'
                  ? isLight
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-zinc-950'
                  : isLight
                  ? 'bg-white text-slate-700 hover:text-slate-950 border border-slate-200'
                  : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/10'
              }`}
            >
              ALL CATEGORIES
            </button>
            {visibleCategories.map((cat) => {
              const catCount = products.filter(
                (p) => p.category.toLowerCase() === cat.slug.toLowerCase()
              ).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategoryFilter(cat.slug);
                    setSelectedDomainFilter('all');
                  }}
                  className={`px-3 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-sm shrink-0 transition-colors ${
                    selectedCategoryFilter === cat.slug
                      ? isLight
                        ? 'bg-slate-900 text-white shadow-xs'
                        : 'bg-white text-zinc-950'
                      : isLight
                      ? 'bg-white text-slate-700 hover:text-slate-950 border border-slate-200'
                      : 'bg-zinc-900/60 text-zinc-400 hover:text-white border border-white/10'
                  }`}
                >
                  {cat.name} ({catCount})
                </button>
              );
            })}
          </div>

          {/* Venue filter */}
          {availableApplications.length > 0 && (
            <div
              className={`flex items-center gap-2 text-xs font-tech overflow-x-auto pb-1 ${
                isLight ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              <span className="shrink-0 uppercase text-[10px] tracking-wider font-semibold">
                Venue:
              </span>
              <button
                onClick={() => setSelectedApplication('all')}
                className={`px-2 py-0.5 rounded text-[11px] uppercase tracking-wider shrink-0 transition-colors ${
                  selectedApplication === 'all'
                    ? isLight
                      ? 'text-white bg-slate-900 font-bold'
                      : 'text-white bg-zinc-800'
                    : 'text-slate-600 dark:text-zinc-400 hover:underline'
                }`}
              >
                All
              </button>
              {availableApplications.slice(0, 6).map((app) => (
                <button
                  key={app}
                  onClick={() => setSelectedApplication(app)}
                  className={`px-2 py-0.5 rounded text-[11px] uppercase tracking-wider shrink-0 transition-colors ${
                    selectedApplication === app
                      ? isLight
                        ? 'text-white bg-slate-900 font-bold'
                        : 'text-white bg-zinc-800'
                      : 'text-slate-600 dark:text-zinc-400 hover:underline'
                  }`}
                >
                  {app}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div
            className={`py-20 text-center rounded-sm border ${
              isLight ? 'bg-white border-slate-200 text-slate-500' : 'bg-zinc-900 border-white/10 text-zinc-400'
            }`}
          >
            <p className="text-base font-semibold mb-2">No products match your criteria.</p>
            <button
              onClick={() => {
                setActiveDivisionFilter('all');
                setSelectedCategoryFilter('all');
                setSelectedApplication('all');
                setSearchQuery('');
              }}
              className="text-xs text-amber-600 font-bold underline"
            >
              Reset all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => {
              const pricing = computePricing(product);
              return (
                <div
                  key={product.id}
                  className={`group rounded-sm border overflow-hidden transition-all duration-300 flex flex-col justify-between ${
                    isLight
                      ? 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-md'
                      : 'bg-zinc-900/60 border-white/10 hover:border-white/30 hover:bg-zinc-900'
                  }`}
                >
                  <div className="flex flex-col flex-1 justify-between">
                    {/* Image Area - Maximum prominence and space for the product photo */}
                    <div
                      onClick={() => setSelectedProductForDetail(product)}
                      className={`relative h-72 sm:h-80 w-full overflow-hidden cursor-pointer flex items-center justify-center border-b transition-colors ${
                        isLight ? 'bg-slate-50 hover:bg-slate-100/80 border-slate-100' : 'bg-zinc-950/70 hover:bg-zinc-950 border-white/5'
                      }`}
                    >
                      {product.mainImage ? (
                        <img
                          src={product.mainImage}
                          alt={product.name}
                          className="w-full h-full object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                          onError={(e) => {
                            // Fallback to local fryer image or subtle placeholder if external url fails
                            (e.currentTarget as HTMLImageElement).src = '/images/products/tsl81_front.jpg';
                          }}
                        />
                      ) : (
                        <div
                          onClick={(e) => {
                            if (isAdmin) {
                              e.stopPropagation();
                              openImageEditModal(product);
                            }
                          }}
                          className={`w-full h-full flex flex-col items-center justify-center p-4 text-center transition-colors ${
                            isAdmin ? 'cursor-pointer hover:bg-amber-500/10' : ''
                          }`}
                        >
                          <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-2 transition-all">
                            {isAdmin ? <Camera className="w-5 h-5" /> : <Package className="w-5 h-5 text-zinc-400" />}
                          </div>
                          <span className="text-xs font-tech font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-200">
                            {isAdmin ? '+ Add Image' : (product.model || 'Specification Sheet')}
                          </span>
                          <span className="text-[10px] text-slate-500 dark:text-zinc-400">
                            {isAdmin ? 'Upload photos' : 'Photos & CAD on request'}
                          </span>
                        </div>
                      )}

                      {/* Top Badges */}
                      <div className="absolute top-2.5 left-2.5 flex flex-wrap items-center gap-1 z-10 max-w-[70%]">
                        <span
                          className={`text-[9px] font-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow-xs ${
                            product.division === 'commercial'
                              ? 'bg-amber-500 text-black'
                              : 'bg-emerald-600 text-white'
                          }`}
                        >
                          {product.division === 'commercial' ? 'Commercial' : 'In-House Mfg'}
                        </span>
                        {product.isFeatured && (
                          <span className="text-[9px] font-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400 text-black flex items-center gap-0.5 shadow-xs font-black">
                            <Star className="w-2.5 h-2.5 fill-black" />
                            <span>FEATURED</span>
                          </span>
                        )}
                        {product.model && (
                          <span className="text-[9px] font-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/80 text-white border border-white/10 shadow-xs">
                            {product.model}
                          </span>
                        )}
                      </div>

                      {/* Quick Action Floating Bar on Card - ADMIN ONLY */}
                      {isAdmin && (
                        <div className="absolute top-2.5 right-2.5 flex items-center gap-1 z-20">
                          {/* Edit Image Button */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openImageEditModal(product);
                            }}
                            className={`p-1.5 rounded-full transition-all shadow-md ${
                              isLight
                                ? 'bg-white/90 text-slate-700 hover:bg-amber-500 hover:text-black'
                                : 'bg-zinc-800/90 text-zinc-300 hover:bg-amber-500 hover:text-black'
                            }`}
                            title="Add or Edit Product Images"
                          >
                            <Camera className="w-3.5 h-3.5" />
                          </button>

                          {/* Toggle Featured */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleProductFeatured(product.id);
                              showToast(
                                product.isFeatured
                                  ? `Removed "${product.name}" from homepage featured`
                                  : `⭐ Added "${product.name}" to homepage featured!`
                              );
                            }}
                            className={`p-1.5 rounded-full transition-all shadow-md ${
                              product.isFeatured
                                ? 'bg-amber-400 text-black ring-2 ring-amber-300 hover:bg-amber-300 scale-105'
                                : isLight
                                ? 'bg-white/90 text-slate-400 hover:text-amber-500 hover:bg-white'
                                : 'bg-black/75 text-zinc-400 hover:text-amber-400 hover:bg-black'
                            }`}
                            title={product.isFeatured ? '⭐ Currently Featured on Homepage (Click to unfeature)' : 'Click to feature this product on homepage'}
                          >
                            <Star className={`w-3.5 h-3.5 ${product.isFeatured ? 'fill-black' : ''}`} />
                          </button>

                          {/* Quick Edit in CMS */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openAdminModalForProduct(product.id);
                            }}
                            className={`p-1.5 rounded-full transition-all shadow-md ${
                              isLight
                                ? 'bg-white/90 text-slate-700 hover:text-slate-950 hover:bg-white'
                                : 'bg-black/75 text-zinc-300 hover:text-white hover:bg-black'
                            }`}
                            title="Edit product details & size variants in CMS"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>

                          {/* Remove / Delete Product */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setProductToDelete(product);
                            }}
                            className={`p-1.5 rounded-full transition-all shadow-md ${
                              isLight
                                ? 'bg-white/90 text-slate-400 hover:text-rose-600 hover:bg-rose-50'
                                : 'bg-black/75 text-zinc-400 hover:text-rose-400 hover:bg-rose-950/80'
                            }`}
                            title="Remove product from catalogue"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Compact Content Area - Giving less space to text and more to the photo */}
                    <div className="p-3.5 flex flex-col justify-between flex-1">
                      <div>
                        {/* 1. PRODUCT NAME - Clean, prominent */}
                        <div className="flex items-start justify-between gap-1.5 mb-1.5">
                          <h3
                            onClick={() => setSelectedProductForDetail(product)}
                            className={`text-sm sm:text-base font-bold uppercase tracking-tight line-clamp-1 leading-snug cursor-pointer hover:underline ${
                              isLight ? 'text-[#171717]' : 'text-[#ffffff]'
                            }`}
                            title={product.name}
                          >
                            {product.name}
                          </h3>
                        </div>

                        {/* 2. COMPACT MODEL & SIZE INFO ROW */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-3">
                          {product.model && (
                            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-white/10">
                              {product.model}
                            </span>
                          )}
                          {product.variants && product.variants.length > 0 ? (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300">
                              {product.variants.length} Sizes
                            </span>
                          ) : product.variantOrSize ? (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                              {product.variantOrSize}
                            </span>
                          ) : product.specifications?.capacity ? (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300">
                              {product.specifications.capacity}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      {/* 3. CLEAN FULL-WIDTH VIEW SPECIFICATIONS BUTTON */}
                      <button
                        type="button"
                        onClick={() => setSelectedProductForDetail(product)}
                        className={`w-full py-2 px-3 text-xs font-tech font-bold uppercase tracking-wider rounded-sm border transition-all flex items-center justify-center gap-2 ${
                          isLight
                            ? 'bg-slate-900 border-slate-900 text-white hover:bg-amber-500 hover:text-black hover:border-amber-500 shadow-xs'
                            : 'bg-zinc-800 border-zinc-700 text-white hover:bg-amber-400 hover:text-zinc-950 hover:border-amber-400 shadow-xs'
                        }`}
                      >
                        <span>VIEW SPECIFICATIONS</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 2. LAST OPTION: DEDICATED GET A QUOTE CARD AT THE END */}
        <div
          className={`mt-16 p-8 rounded-sm border ${
            isLight
              ? 'bg-slate-900 text-white border-slate-800 shadow-xl'
              : 'bg-zinc-900 border-white/20 text-white shadow-2xl'
          }`}
        >
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-amber-400 font-tech text-xs font-bold uppercase tracking-[0.2em] block">
              OFFICIAL B2B EQUIPMENT INQUIRY
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-tech uppercase tracking-tight">
              Request a Formal Equipment Quotation
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
              Select specific models or get an itemized commercial kitchen estimate. Direct manufacturer wholesale rates, turnkey delivery, and bespoke stainless steel manufacturing.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => openQuoteModal('General Commercial Kitchen Inquiry', 'CATALOGUE-FULL')}
                className="px-6 py-3 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <FileText className="w-4 h-4" />
                <span>GET A QUOTE NOW</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePage('pricesheet');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-sm bg-blue-600 hover:bg-blue-500 text-white font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
              >
                <Layers className="w-4 h-4" />
                <span>OPEN QUOTATION SELECTOR</span>
              </button>
              <a
                href="https://wa.me/917017823423?text=Hello%20Shree%20Durga%20Steels%2C%20I%20would%20like%20to%20request%20a%20commercial%20kitchen%20equipment%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
              >
                <MessageSquare className="w-4 h-4" />
                <span>WHATSAPP SALES</span>
              </a>
            </div>
          </div>
        </div>

        {/* Delete Product Confirmation Modal */}
        {productToDelete && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xs">
            <div
              className={`max-w-md w-full rounded-sm border p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-150 ${
                isLight ? 'bg-white border-slate-300 text-slate-900' : 'bg-zinc-900 border-white/20 text-white'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-full bg-rose-500/15 text-rose-500 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold uppercase font-tech text-rose-500 tracking-wide">
                    Remove Product from Catalogue?
                  </h3>
                  <p className="text-xs text-zinc-400 mt-1">
                    Are you sure you want to delete this equipment item? This action will remove it and all of its size variants from the catalogue.
                  </p>
                </div>
              </div>

              <div
                className={`p-3 rounded border flex items-center gap-3 ${
                  isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-950 border-white/10'
                }`}
              >
                {productToDelete.mainImage ? (
                  <img
                    src={productToDelete.mainImage}
                    alt=""
                    className="w-12 h-12 rounded object-cover border border-white/10"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="w-12 h-12 rounded bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-500">
                    NO IMG
                  </div>
                )}
                <div>
                  <div className="font-bold text-xs font-tech">{productToDelete.name}</div>
                  <div className="text-[11px] text-zinc-400 font-tech">
                    Model: {productToDelete.model} • Code: {productToDelete.productCode}
                  </div>
                  {productToDelete.variants && productToDelete.variants.length > 0 && (
                    <div className="text-[10px] text-amber-500 font-tech">
                      Includes {productToDelete.variants.length} size options
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setProductToDelete(null)}
                  className={`px-4 py-2 text-xs font-tech font-bold uppercase rounded-sm border transition-colors ${
                    isLight
                      ? 'border-slate-300 text-slate-700 hover:bg-slate-100'
                      : 'border-white/15 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const name = productToDelete.name;
                    deleteProduct(productToDelete.id);
                    setProductToDelete(null);
                    showToast(`Deleted "${name}" from catalogue.`);
                  }}
                  className="px-5 py-2 text-xs font-tech font-bold uppercase rounded-sm bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 transition-colors shadow-sm"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Confirm Delete</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Floating Feedback Toast */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-3 duration-200">
            <div className="bg-zinc-950 text-white px-4 py-3 rounded-sm border border-amber-500/40 shadow-2xl flex items-center gap-2.5 text-xs font-tech">
              <Sparkles className="w-4 h-4 text-amber-400 shrink-0" />
              <span>{toastMessage}</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
