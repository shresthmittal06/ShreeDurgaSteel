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
    openImageEditModal,
    isAdmin,
  } = useContent();

  const [activeDomain, setActiveDomain] = useState<string>('all');

  const domainCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    PRODUCT_DOMAINS.forEach((d) => {
      counts[d.id] = products.filter((p) => getProductDomain(p) === d.id).length;
    });
    return counts;
  }, [products]);

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

  const getDomainColor = (_domainId: ProductDomainId) => {
    return 'text-[#F3E7DA] border-[#D8BFA8]/40 bg-[#5B1018]/90';
  };

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
      className="py-24 sm:py-28 border-t bg-[#FAF4EE] border-[#D8BFA8] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 pb-8 border-b border-[#D8BFA8]">
          <div>
            <div className="flex items-center gap-2 text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-[#5B1018] mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>COMMERCIAL APPLIANCES & IN-HOUSE STAINLESS FABRICATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight text-[#292321]">
              FEATURED PRODUCTS.
            </h2>
            <p className="mt-2 text-xs sm:text-sm font-normal max-w-2xl leading-relaxed text-[#4D423E]">
              Browse our high-duty commercial cooking machines and certified food-grade stainless steel products, organized across 8 dedicated culinary and foodservice domains.
            </p>
          </div>

          <div className="mt-6 sm:mt-0 flex flex-wrap items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => openQuoteModal('Featured Equipment Selection Inquiry', 'FEATURED-RANGE')}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-tech font-black tracking-wider uppercase bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] transition-all rounded-xs shadow-sm"
            >
              <span>GET A QUOTE</span>
            </button>
            <button
              onClick={() => {
                setActivePage('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-flex items-center gap-2 text-xs font-bold font-tech tracking-[0.2em] uppercase transition-colors text-[#292321] hover:text-[#5B1018]"
            >
              <span>VIEW COMPLETE CATALOGUE ({products.length})</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Categories Domain Navigation Tabs */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-xs font-tech uppercase font-bold text-[#4D423E] tracking-wider mb-3">
            <span>FILTER BY DOMAIN CATEGORY:</span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-none">
            <button
              onClick={() => setActiveDomain('all')}
              className={`px-4 py-2.5 rounded-xs text-xs font-tech font-bold uppercase tracking-wider shrink-0 transition-all flex items-center gap-2 border ${
                activeDomain === 'all'
                  ? 'bg-[#5B1018] text-[#F3E7DA] border-[#5B1018] shadow-md'
                  : 'bg-[#F3E7DA] text-[#292321] border-[#D8BFA8] hover:border-[#5B1018] hover:bg-[#E9D9C8]'
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>ALL DOMAINS</span>
              <span className="text-[10px] opacity-80 font-normal tabular-nums">({products.length})</span>
            </button>

            {PRODUCT_DOMAINS.map((domain) => {
              const count = domainCounts[domain.id] || 0;
              const isActive = activeDomain === domain.id;

              return (
                <button
                  key={domain.id}
                  onClick={() => setActiveDomain(domain.id)}
                  className={`px-4 py-2.5 rounded-xs text-xs font-tech font-bold uppercase tracking-wider shrink-0 transition-all flex items-center gap-2 border ${
                    isActive
                      ? 'bg-[#5B1018] text-[#F3E7DA] border-[#5B1018] shadow-md'
                      : 'bg-[#F3E7DA] text-[#292321] border-[#D8BFA8] hover:border-[#5B1018] hover:bg-[#E9D9C8]'
                  }`}
                >
                  {getDomainIcon(domain.id)}
                  <span>{domain.name}</span>
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono tabular-nums ${
                      isActive
                        ? 'bg-[#F3E7DA]/20 text-[#F3E7DA] font-bold'
                        : 'bg-[#E9D9C8] text-[#4D423E]'
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
            <div className="mt-4 p-4 rounded-xs border flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#F3E7DA] border-[#D8BFA8]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-tech font-bold tracking-widest uppercase text-[#5B1018]">
                    {activeDomainInfo.badge}
                  </span>
                  <span className="text-xs text-[#B8B8B3]">•</span>
                  <span className="text-xs font-bold text-[#292321]">
                    {activeDomainInfo.tagline}
                  </span>
                </div>
                <p className="text-xs text-[#4D423E] max-w-3xl leading-relaxed">
                  {activeDomainInfo.description}
                </p>
              </div>

              <button
                onClick={() => handleExploreDomainInCatalogue(activeDomainInfo.id)}
                className="px-3.5 py-2 text-xs font-tech font-bold uppercase tracking-wider rounded-xs shrink-0 flex items-center gap-1.5 transition-colors bg-[#292321] text-[#F3E7DA] hover:bg-[#5B1018]"
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
            const variantCount = product.variants ? product.variants.length : 0;
            const domainId = getProductDomain(product);
            const domainLabel = DOMAIN_LABEL_MAP[domainId] || 'Commercial';

            return (
              <div
                key={product.id}
                id={`featured-${product.model.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                className="rounded-xs overflow-hidden flex flex-col justify-between transition-all duration-300 group border shadow-sm bg-[#F3E7DA] border-[#D8BFA8] hover:border-[#5B1018] hover:shadow-xl"
              >
                {/* Product Image Area */}
                <div
                  onClick={() => handleViewProduct(product)}
                  className="relative h-80 sm:h-96 overflow-hidden cursor-pointer flex items-center justify-center border-b border-[#D8BFA8] bg-white transition-colors"
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
                      {isAdmin && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openImageEditModal(product);
                          }}
                          className="absolute bottom-4 right-4 px-2.5 py-1 rounded-sm bg-[#292321]/85 hover:bg-[#5B1018] text-[#F3E7DA] transition-all shadow-md flex items-center gap-1.5 text-[10px] font-tech font-bold uppercase tracking-wider backdrop-blur-xs z-20"
                          title="Add or Edit Product Images"
                        >
                          <Camera className="w-3 h-3" />
                          <span>Edit Photo</span>
                        </button>
                      )}
                    </>
                  ) : isAdmin ? (
                    <div
                      onClick={(e) => {
                        e.stopPropagation();
                        openImageEditModal(product);
                      }}
                      className="w-full h-full flex flex-col items-center justify-center p-6 text-center hover:bg-[#F3E7DA]/50 transition-colors cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#5B1018]/10 group-hover:bg-[#5B1018] text-[#5B1018] group-hover:text-[#F3E7DA] flex items-center justify-center mb-2 transition-all">
                        <Camera className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-tech font-bold uppercase tracking-wider text-[#292321]">
                        + Add Product Image
                      </span>
                      <span className="text-[10px] text-[#4D423E] mt-0.5">
                        Click to upload photos
                      </span>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#FAF4EE]">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center mb-2 bg-[#E9D9C8] text-[#4D423E]">
                        <Package className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-tech font-bold uppercase tracking-wider text-[#292321]">
                        {product.name}
                      </span>
                      <span className="text-[10px] text-[#4D423E] mt-0.5">
                        Model {product.model} • High-Precision Commercial
                      </span>
                    </div>
                  )}

                  {/* Top Badges */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="text-[10px] font-tech font-bold uppercase tracking-widest px-2.5 py-1 rounded-xs bg-[#292321]/90 text-[#F3E7DA] backdrop-blur-md border border-[#D8BFA8]/30">
                      {product.model}
                    </span>

                    <span
                      className={`text-[9px] font-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded-xs border backdrop-blur-md ${getDomainColor(
                        domainId
                      )}`}
                    >
                      {domainLabel}
                    </span>
                  </div>

                  {/* Variant Count */}
                  <div className="absolute bottom-3 left-4 flex items-center gap-2">
                    {variantCount > 0 && (
                      <span className="text-[10px] font-tech font-bold uppercase tracking-wider px-2 py-1 rounded-xs bg-[#5B1018] text-[#F3E7DA] shrink-0 shadow-xs tabular-nums">
                        {variantCount} Sizes
                      </span>
                    )}
                  </div>
                </div>

                {/* Compact Product Details */}
                <div className="p-4 sm:p-5 flex flex-col justify-between flex-grow bg-[#FAF4EE]">
                  <div>
                    <h3
                      onClick={() => handleViewProduct(product)}
                      className="text-base sm:text-lg font-bold uppercase tracking-tight mb-2 cursor-pointer transition-colors line-clamp-1 text-[#292321] hover:text-[#5B1018]"
                      title={product.name}
                    >
                      {product.name}
                    </h3>

                    <div className="flex flex-wrap items-center gap-1.5 mb-3">
                      <span className="text-[10px] font-semibold font-tech tracking-wider px-2 py-0.5 rounded bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8]">
                        MODEL: {product.model}
                      </span>
                      <span className="text-[10px] font-semibold text-[#5A4F4B]">
                        {product.division === 'manufacturing' ? 'IN-HOUSE MFG' : 'COMMERCIAL'}
                      </span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <button
                      onClick={() => handleViewProduct(product)}
                      className="w-full py-2.5 text-xs font-semibold uppercase tracking-[0.14em] rounded-xs transition-colors flex items-center justify-center gap-2 bg-[#292321] text-[#F3E7DA] hover:bg-[#5B1018]"
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

        {/* Quotation Banner at End of Featured Products */}
        <div className="mt-14 p-8 rounded-sm border bg-[#292321] text-[#F3E7DA] border-[#D8BFA8]/30 shadow-xl">
          <div className="max-w-3xl mx-auto text-center space-y-4">
            <span className="text-[#D8BFA8] font-tech text-xs font-bold uppercase tracking-[0.2em] block">
              BULK & COMMERCIAL KITCHEN ESTIMATES
            </span>
            <h3 className="text-2xl sm:text-3xl font-black font-tech uppercase tracking-tight text-[#F3E7DA]">
              Get an Official Quotation for Your Kitchen Project
            </h3>
            <p className="text-xs sm:text-sm text-[#D8BFA8] max-w-xl mx-auto leading-relaxed">
              Our engineering sales desk provides itemized B2B quotations, container rates, CAD kitchen layouts, and GST invoices.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => openQuoteModal('Featured Product Line Inquiry', 'FEATURED-ALL')}
                className="px-6 py-3 rounded-sm bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech font-black text-xs uppercase tracking-wider transition-all shadow-lg flex items-center gap-2 border border-[#D8BFA8]/30"
              >
                <span>GET A QUOTATION NOW</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActivePage('pricesheet');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-5 py-3 rounded-sm bg-[#F3E7DA] hover:bg-[#D8BFA8] text-[#292321] font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
              >
                <span>OPEN QUOTATION SELECTOR</span>
              </button>
              <a
                href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello ${brand.brandName}, I would like to request a commercial kitchen equipment quotation.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3 rounded-sm border border-[#D8BFA8]/50 hover:bg-[#F3E7DA]/10 text-[#F3E7DA] font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
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
              className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-tech font-bold uppercase tracking-[0.2em] bg-[#5B1018] text-[#F3E7DA] hover:bg-[#440B11] transition-colors rounded-xs shadow-md"
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
