import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { ProductItem, ProductDomainId } from '../types';
import {
  ArrowUpRight,
  MessageSquare,
  Sparkles,
  Send,
  Flame,
  Cake,
  CloudFog,
  Boxes,
  Grid,
  UtensilsCrossed,
  Layers,
  ShieldCheck,
  ChevronRight,
  Camera,
  Upload,
  Package,
} from 'lucide-react';
import { PRODUCT_DOMAINS, getProductDomain, DOMAIN_LABEL_MAP } from '../data/productDomains';

export const FeaturedProductsSection: React.FC = () => {
  const {
    brand,
    products,
    setSelectedProductForDetail,
    openQuoteModal,
    setActivePage,
    setSelectedDomainFilter,
    themeMode,
    openImageEditModal,
    isAdmin,
  } = useContent();

  const isLight = themeMode === 'light';
  const [activeDomain, setActiveDomain] = useState<string>('all');

  // Compute products per domain
  const domainCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    PRODUCT_DOMAINS.forEach((d) => {
      counts[d.id] = products.filter((p) => getProductDomain(p) === d.id).length;
    });
    return counts;
  }, [products]);

  // Filter products by selected domain
  const displayProducts = React.useMemo(() => {
    if (activeDomain === 'all') {
      const featured = products.filter((p) => p.isFeatured);
      return featured.length > 0 ? featured.slice(0, 12) : products.slice(0, 12);
    }
    return products.filter((p) => getProductDomain(p) === activeDomain);
  }, [products, activeDomain]);

  const activeDomainInfo = PRODUCT_DOMAINS.find((d) => d.id === activeDomain);

  const handleViewProduct = (product: ProductItem) => {
    setSelectedProductForDetail(product);
    setActivePage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExploreDomainInCatalogue = (domainId: string) => {
    setSelectedDomainFilter(domainId);
    setActivePage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getWhatsAppUrl = (product: ProductItem) => {
    const text = `Hello ${brand.brandName}, I am interested in your equipment: ${product.name} (Model: ${product.model}). Please share the latest specifications and B2B quotation.`;
    return `https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  };

  const getSpecSummary = (product: ProductItem) => {
    const s = product.specifications;
    const parts = [];
    if (s.power) parts.push(s.power);
    if (s.temperatureRange) parts.push(s.temperatureRange);
    if (s.capacity) parts.push(s.capacity);
    else if (s.dimensions) parts.push(s.dimensions);
    else if (s.material) parts.push(s.material);
    return parts.slice(0, 2).join(' • ');
  };

  // Badge color by domain
  const getDomainColor = (domainId: ProductDomainId) => {
    switch (domainId) {
      case 'cooking':
        return 'text-amber-500 border-amber-500/30 bg-amber-500/10';
      case 'baking':
        return 'text-orange-500 border-orange-500/30 bg-orange-500/10';
      case 'steaming':
        return 'text-sky-500 border-sky-500/30 bg-sky-500/10';
      case 'food-storage':
        return 'text-blue-500 border-blue-500/30 bg-blue-500/10';
      case 'grilling':
        return 'text-rose-500 border-rose-500/30 bg-rose-500/10';
      case 'toasting':
        return 'text-amber-600 border-amber-600/30 bg-amber-600/10';
      case 'serving-presentation':
        return 'text-emerald-500 border-emerald-500/30 bg-emerald-500/10';
      case 'traditional-specialty':
        return 'text-purple-500 border-purple-500/30 bg-purple-500/10';
      default:
        return 'text-zinc-400 border-zinc-700 bg-zinc-800';
    }
  };

  // Domain Icon
  const getDomainIcon = (domainId: string) => {
    switch (domainId) {
      case 'cooking':
        return <Flame className="w-3.5 h-3.5" />;
      case 'baking':
        return <Cake className="w-3.5 h-3.5" />;
      case 'steaming':
        return <CloudFog className="w-3.5 h-3.5" />;
      case 'food-storage':
        return <Boxes className="w-3.5 h-3.5" />;
      case 'grilling':
        return <UtensilsCrossed className="w-3.5 h-3.5" />;
      case 'toasting':
        return <Sparkles className="w-3.5 h-3.5" />;
      case 'serving-presentation':
        return <Layers className="w-3.5 h-3.5" />;
      case 'traditional-specialty':
        return <ShieldCheck className="w-3.5 h-3.5" />;
      default:
        return <Grid className="w-3.5 h-3.5" />;
    }
  };

  return (
    <section
      id="featured-products-section"
      className={`py-28 border-t transition-colors ${
        isLight ? 'bg-white border-slate-200' : 'bg-[#0c0e12] border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-8 border-b border-slate-200 dark:border-white/10">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400 mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMERCIAL APPLIANCES & IN-HOUSE STAINLESS FABRICATION</span>
            </div>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              FEATURED PRODUCTS.
            </h2>
            <p
              className={`mt-2 text-xs sm:text-sm font-normal max-w-2xl leading-relaxed ${
                isLight ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              Browse our high-duty commercial cooking machines and certified food-grade stainless steel products, organized across 8 dedicated culinary and foodservice domains.
            </p>
          </div>

          <div className="mt-6 sm:mt-0 flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openQuoteModal('Featured Equipment Selection Inquiry', 'FEATURED-RANGE')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-tech font-black tracking-wider uppercase bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all rounded-xs shadow-sm hover:scale-105"
            >
              <span>GET A QUOTE</span>
            </button>
            <button
              onClick={() => {
                setActivePage('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`inline-flex items-center gap-2 text-xs font-bold font-tech tracking-[0.2em] uppercase transition-colors ${
                isLight ? 'text-slate-800 hover:text-slate-950' : 'text-zinc-300 hover:text-white'
              }`}
            >
              <span>VIEW COMPLETE CATALOGUE ({products.length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categories Domain Navigation Tabs */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-tech uppercase font-bold text-slate-500 dark:text-zinc-400 tracking-wider mb-3">
            <span>FILTER BY DOMAIN CATEGORY:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
            {/* All Domains Tab */}
            <button
              onClick={() => setActiveDomain('all')}
              className={`px-4 py-2.5 rounded-xs text-xs font-tech font-bold uppercase tracking-wider shrink-0 transition-all flex items-center gap-2 border ${
                activeDomain === 'all'
                  ? isLight
                    ? 'bg-slate-950 text-white border-slate-950 shadow-md'
                    : 'bg-white text-zinc-950 border-white shadow-md'
                  : isLight
                  ? 'bg-slate-100 text-slate-700 border-slate-200 hover:border-slate-400 hover:bg-slate-200'
                  : 'bg-zinc-900/80 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>ALL DOMAINS</span>
              <span className="text-[10px] opacity-75 font-normal">({products.length})</span>
            </button>

            {/* 8 Explicit Domain Categories */}
            {PRODUCT_DOMAINS.map((domain) => {
              const count = domainCounts[domain.id] || 0;
              const isActive = activeDomain === domain.id;

              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveDomain(domain.id)}
                  className={`px-4 py-2.5 rounded-xs text-xs font-tech font-bold uppercase tracking-wider shrink-0 transition-all flex items-center gap-2 border ${
                    isActive
                      ? 'bg-amber-500 text-black border-amber-500 shadow-md'
                      : isLight
                      ? 'bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                      : 'bg-zinc-900/60 text-zinc-300 border-zinc-800 hover:border-zinc-700 hover:bg-zinc-800'
                  }`}
                >
                  {getDomainIcon(domain.id)}
                  <span>{domain.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                      isActive
                        ? 'bg-black/20 text-black font-black'
                        : isLight
                        ? 'bg-slate-100 text-slate-500'
                        : 'bg-zinc-800 text-zinc-400'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Active Domain Info Box */}
          {activeDomainInfo && (
            <div
              className={`mt-4 p-4 rounded-xs border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-zinc-900/40 border-white/10'
              }`}
            >
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-tech font-bold tracking-widest uppercase text-amber-600 dark:text-amber-400">
                    {activeDomainInfo.badge}
                  </span>
                  <span className="text-xs text-slate-400 dark:text-zinc-500">•</span>
                  <span className="text-xs font-bold text-slate-900 dark:text-white">
                    {activeDomainInfo.tagline}
                  </span>
                </div>
                <p className="text-xs text-slate-600 dark:text-zinc-300 max-w-3xl leading-relaxed">
                  {activeDomainInfo.description}
                </p>
              </div>

              <button
                onClick={() => handleExploreDomainInCatalogue(activeDomainInfo.id)}
                className={`px-3.5 py-2 text-xs font-tech font-bold uppercase tracking-wider rounded-xs shrink-0 flex items-center gap-1.5 transition-colors ${
                  isLight
                    ? 'bg-slate-900 text-white hover:bg-slate-800'
                    : 'bg-white text-zinc-950 hover:bg-zinc-200'
                }`}
              >
                <span>EXPLORE ALL ({domainCounts[activeDomainInfo.id] || 0})</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>

        {/* Large Industrial Product Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayProducts.map((product) => {
            const specBadge = getSpecSummary(product);
            const variantCount = product.variants ? product.variants.length : 0;
            const domainId = getProductDomain(product);
            const domainLabel = DOMAIN_LABEL_MAP[domainId] || 'Commercial';

            return (
              <div
                key={product.id}
                id={`featured-${product.model.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className={`rounded-xs overflow-hidden flex flex-col justify-between transition-all duration-300 group border shadow-sm ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 hover:border-slate-400 hover:shadow-xl'
                    : 'bg-[#11141a] border-white/10 hover:border-white/30 hover:bg-[#131720]'
                }`}
              >
                {/* Product Image Area - Expanded space for hero photo */}
                <div
                  onClick={() => handleViewProduct(product)}
                  className={`relative h-80 sm:h-96 overflow-hidden cursor-pointer flex items-center justify-center border-b transition-colors ${
                    isLight ? 'bg-slate-50 border-slate-100' : 'bg-zinc-950/80 border-white/5'
                  }`}
                >
                  {product.mainImage ? (
                    <>
                      <img
                        src={product.mainImage}
                        alt={product.name}
                        className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-700"
                        referrerPolicy="no-referrer"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/images/products/tsl81_front.jpg';
                        }}
                      />
                      {/* Edit Photo Button - ADMIN ONLY */}
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openImageEditModal(product);
                          }}
                          className="absolute bottom-4 right-4 px-2.5 py-1 rounded-sm bg-black/80 hover:bg-amber-500 text-white hover:text-black transition-all shadow-md flex items-center gap-1.5 text-[10px] font-tech font-bold uppercase tracking-wider backdrop-blur-xs z-20"
                          title="Add or Edit Product Images"
                        >
                          <Camera className="w-3 h-3" />
                          <span>Edit Photo</span>
                        </button>
                      )}
                    </>
                  ) : (
                    isAdmin ? (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          openImageEditModal(product);
                        }}
                        className="w-full h-full flex flex-col items-center justify-center p-6 text-center hover:bg-amber-500/10 transition-colors cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-full bg-amber-500/15 group-hover:bg-amber-500 text-amber-600 dark:text-amber-400 group-hover:text-black flex items-center justify-center mb-2 transition-all">
                          <Camera className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-tech font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-200">
                          + Add Product Image
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-zinc-400 mt-0.5">
                          Click to upload photos
                        </span>
                      </div>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                          isLight ? 'bg-slate-200 text-slate-500' : 'bg-zinc-800 text-zinc-400'
                        }`}>
                          <Package className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-tech font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-200">
                          {product.name}
                        </span>
                        <span className="text-[10px] text-slate-500 dark:text-zinc-400 mt-0.5">
                          Model {product.model} • High-Precision Commercial
                        </span>
                      </div>
                    )
                  )}

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[10px] font-tech font-bold uppercase tracking-widest px-2.5 py-1 rounded-xs bg-black/80 text-white backdrop-blur-md border border-white/15">
                      {product.model}
                    </span>

                    {/* Domain Pill Badge */}
                    <span
                      className={`text-[9px] font-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs border backdrop-blur-md ${getDomainColor(
                        domainId
                      )}`}
                    >
                      {domainLabel}
                    </span>
                  </div>

                  {/* Technical Spec Strip & Variant Count */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    {variantCount > 0 && (
                      <span className="text-[10px] font-tech font-bold uppercase tracking-wider px-2 py-1 rounded-xs bg-amber-500 text-slate-950 shrink-0 shadow-xs">
                        {variantCount} Sizes
                      </span>
                    )}
                  </div>
                </div>

                {/* Compact Product Details - Giving less space to other things */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow">
                  <div>
                    {/* PRODUCT NAME */}
                    <h3
                      onClick={() => handleViewProduct(product)}
                      className={`text-base sm:text-lg font-bold uppercase tracking-tight mb-2 cursor-pointer transition-colors line-clamp-1 ${
                        isLight ? 'text-[#171717] hover:text-[#b45309]' : 'text-[#ffffff] hover:text-amber-300'
                      }`}
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    {/* MODEL NUMBER & CATEGORY ROW */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      <span className="text-[10px] font-semibold font-tech tracking-wider px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-[#4a4a4a] dark:text-zinc-300 border border-slate-200 dark:border-white/10">
                        MODEL: {product.model}
                      </span>
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-zinc-400">
                        {product.division === 'manufacturing' ? 'IN-HOUSE MFG' : 'COMMERCIAL'}
                      </span>
                    </div>
                  </div>

                  {/* ACTIONS: Clean View Specifications Action */}
                  <div className="pt-2">
                    <button
                      onClick={() => handleViewProduct(product)}
                      className={`w-full py-2.5 text-xs font-semibold uppercase tracking-[0.14em] rounded-xs transition-colors flex items-center justify-center gap-2 ${
                        isLight
                          ? 'bg-[#171717] text-white hover:bg-amber-500 hover:text-black'
                          : 'bg-zinc-800 text-white hover:bg-amber-400 hover:text-zinc-950'
                      }`}
                    >
                      <span>VIEW PRODUCT SPECIFICATIONS</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2. LAST OPTION: GET A QUOTE AT THE END OF FEATURED PRODUCTS */}
        <div
          className={`mt-14 p-8 rounded-sm border ${
            isLight
              ? 'bg-slate-900 text-white border-slate-800 shadow-xl'
              : 'bg-zinc-900 border-white/20 text-white shadow-2xl'
          }`}
        >
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-amber-400 font-tech text-xs font-bold uppercase tracking-[0.2em] block">
              BULK & COMMERCIAL KITCHEN ESTIMATES
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-tech uppercase tracking-tight">
              Get an Official Quotation for Your Kitchen Project
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
              Our engineering sales desk provides itemized B2B quotations, container rates, CAD kitchen layouts, and GST invoices.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => openQuoteModal('Featured Product Line Inquiry', 'FEATURED-ALL')}
                className="px-6 py-3 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span>GET A QUOTATION NOW</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePage('pricesheet');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-sm bg-blue-600 hover:bg-blue-500 text-white font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
              >
                <span>OPEN QUOTATION SELECTOR</span>
              </button>
              <a
                href="https://wa.me/917017823423?text=Hello%20Shree%20Durga%20Steels%2C%20I%20would%20like%20to%20request%20a%20commercial%20kitchen%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
              >
                <span>WHATSAPP SALES</span>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Banner to Explore All in Catalogue */}
        {activeDomain !== 'all' && displayProducts.length > 0 && (
          <div className="mt-12 text-center">
            <button
              onClick={() => handleExploreDomainInCatalogue(activeDomain)}
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-tech font-bold uppercase tracking-[0.2em] bg-amber-500 text-black hover:bg-amber-400 transition-colors rounded-xs shadow-md"
            >
              <span>VIEW ALL {domainCounts[activeDomain] || 0} {activeDomainInfo?.name.toUpperCase()} PRODUCTS IN CATALOGUE</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
