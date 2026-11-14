import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { ProductCardImage } from './ProductCardImage';
import { TopPageBackButton } from './TopPageBackButton';
import {
  Factory,
  Sparkles,
  ShieldCheck,
  Search,
  Layers,
  ArrowRight,
  Upload,
} from 'lucide-react';

export const ManufacturingPage: React.FC = () => {
  const {
    manufacturingProducts,
    categories,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    setSelectedProductForDetail,
    openQuoteModal,
    openImageEditModal,
    isAdmin,
  } = useContent();

  const manufacturingCategories = categories.filter((c) => c.division === 'manufacturing');

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (selectedCategoryFilter && selectedCategoryFilter !== 'all') {
      const match = manufacturingCategories.some((c) => c.slug === selectedCategoryFilter);
      if (match) return selectedCategoryFilter;
    }
    return 'all';
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Keep in sync with global category filter
  React.useEffect(() => {
    if (selectedCategoryFilter && selectedCategoryFilter !== 'all') {
      const match = manufacturingCategories.some((c) => c.slug === selectedCategoryFilter);
      if (match) {
        setSelectedCategory(selectedCategoryFilter);
      }
    } else if (selectedCategoryFilter === 'all') {
      setSelectedCategory('all');
    }
  }, [selectedCategoryFilter]);

  const handleCategoryChange = (slug: string) => {
    setSelectedCategory(slug);
    setSelectedCategoryFilter(slug);
  };

  const filteredProducts = manufacturingProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;

    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.subcategory && product.subcategory.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.variantOrSize &&
        product.variantOrSize.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.productCode.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="pt-24 pb-20 transition-colors bg-[#F3E7DA] text-[#292321]">
      {/* Hero Header Banner */}
      <div className="border-b py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF4EE] border-[#D8BFA8]">
        <div className="max-w-7xl mx-auto">
          <TopPageBackButton currentPageTitle="Kitchenware & Home Utility" categoryName="Manufacturing" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-tech font-bold uppercase tracking-[0.2em] bg-[#5B1018]/10 text-[#5B1018] border border-[#5B1018]/25 mb-4">
                <Factory className="w-3.5 h-3.5" />
                <span>MANUFACTURED BY SHREE DURGA STEELS • IN-HOUSE PRODUCTION RANGE</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4 text-[#292321]">
                Manufactured by Shree Durga Steels
              </h1>
              <p className="text-sm sm:text-base font-tech uppercase tracking-wider text-[#5B1018] font-bold mb-4">
                Kitchenware & Home Utility — Authentic Factory Metal Fabrication
              </p>

              <p className="text-base sm:text-lg max-w-3xl leading-relaxed mb-6 text-[#4D423E]">
                A dedicated manufacturing range produced in-house by Shree Durga Steels. Spanning precision confectionery sweet display trays, commercial and domestic masala dani spice stations, traditional devotional metalware, wire glass racks, bakery moulds, and bespoke PVD titanium gold luxury products.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#D8BFA8]">
                <div>
                  <span className="block text-xl font-black text-[#292321] tabular-nums">
                    {manufacturingProducts.length} Products
                  </span>
                  <span className="text-[11px] font-tech text-[#5A4F4B] uppercase">
                    Manufactured Range
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-black text-[#292321]">
                    6 Product Groups
                  </span>
                  <span className="text-[11px] font-tech text-[#5A4F4B] uppercase">
                    Trays, Masala, Pooja, Wire & Gold
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-black text-[#292321]">
                    PVD Titanium
                  </span>
                  <span className="text-[11px] font-tech text-[#5A4F4B] uppercase">
                    Royal Gold Finish
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-black text-[#292321]">
                    Zero Crevice
                  </span>
                  <span className="text-[11px] font-tech text-[#5A4F4B] uppercase">
                    Deep Drawn Metallurgy
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Header Manufacturing Showcase Card */}
            <div className="w-full lg:w-96 shrink-0 rounded-sm overflow-hidden border border-[#D8BFA8] bg-white shadow-xl relative group">
              <div className="relative h-60 w-full overflow-hidden bg-white flex items-center justify-center p-4">
                <img
                  src="/uploads/products/prod_mfg-barfi-tray_1790565801591_1ozrb1.webp"
                  alt="In-House Manufactured Steel Products"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/products/tsl81_front.jpg';
                  }}
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase bg-[#5B1018] text-[#F3E7DA]">
                  IN-HOUSE FACTORY
                </span>
              </div>
              <div className="p-3 bg-[#292321] border-t border-[#D8BFA8]/30 flex items-center justify-between text-xs">
                <div>
                  <div className="font-tech font-bold uppercase text-[#F3E7DA]">Kitchenware & Utility</div>
                  <div className="text-[10px] text-[#D8BFA8] font-sans">Barfi Trays, Masala Dani, Glass Stands</div>
                </div>
                <span className="text-[11px] font-tech font-bold px-2 py-1 rounded bg-[#5B1018] text-[#F3E7DA] border border-[#D8BFA8]/30 tabular-nums">
                  {manufacturingCategories.length} Lines
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Craftsmanship Highlights */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded border bg-[#FAF4EE] border-[#D8BFA8]">
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-[#5B1018]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#292321]">
                Multiple Verified Depths
              </h4>
            </div>
            <p className="text-xs leading-relaxed text-[#4D423E]">
              Barfi Trays in 0.4&quot;, 0.6&quot;, 1&quot;, and 1.2&quot; depths; Rasgulla Trays in 1.4&quot;, 1.6&quot;, and 2&quot; syrup-retaining formats for traditional confectioneries.
            </p>
          </div>

          <div className="p-5 rounded border bg-[#FAF4EE] border-[#D8BFA8]">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-[#5B1018]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#292321]">
                PVD Gold Luxury Hardware
              </h4>
            </div>
            <p className="text-xs leading-relaxed text-[#4D423E]">
              Titanium vacuum-coated trays and glass racks for 5-star & 7-star hotel suites, presidential banquets, and high-end sweet gifting.
            </p>
          </div>

          <div className="p-5 rounded border bg-[#FAF4EE] border-[#D8BFA8]">
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-[#5B1018]" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#292321]">
                Sanitary Drawn Corners
              </h4>
            </div>
            <p className="text-xs leading-relaxed text-[#4D423E]">
              Deep drawn without joints to eliminate bacterial crevice buildup, syrup crystallization pockets, and ensure effortless daily washdown.
            </p>
          </div>
        </div>
      </div>

      {/* Filter and Search Console */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-6">
        <div className="flex flex-col gap-4">
          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            <button
              onClick={() => handleCategoryChange('all')}
              className={`px-3.5 py-1.5 rounded text-xs font-semibold tracking-wider whitespace-nowrap transition-colors ${
                selectedCategory === 'all'
                  ? 'bg-[#5B1018] text-[#F3E7DA]'
                  : 'bg-[#FAF4EE] text-[#4D423E] border border-[#D8BFA8] hover:border-[#5B1018]'
              }`}
            >
              ALL KITCHENWARE & UTILITY ({manufacturingProducts.length})
            </button>
            {manufacturingCategories.map((cat) => {
              const count = manufacturingProducts.filter((p) => p.category === cat.slug).length;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.slug)}
                  className={`px-3 py-1.5 rounded text-xs font-semibold tracking-wider whitespace-nowrap transition-colors ${
                    selectedCategory === cat.slug
                      ? 'bg-[#5B1018] text-[#F3E7DA]'
                      : 'bg-[#FAF4EE] text-[#4D423E] border border-[#D8BFA8] hover:border-[#5B1018]'
                  }`}
                >
                  {cat.name.toUpperCase()} ({count})
                </button>
              );
            })}
          </div>

          {/* Sub-Filters: Tray Depth & Search Input */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {(selectedCategory === 'all' || selectedCategory === 'trays') ? (
              <div className="flex flex-wrap items-center gap-1.5 w-full sm:w-auto py-1">
                <span className="text-[11px] font-tech text-[#5A4F4B] uppercase font-bold tracking-wider shrink-0 mr-1">
                  TRAY DEPTHS:
                </span>
                {['0.4"', '0.6"', '1.0"', '1.2"', '1.4"', '2.0"', '2.4"'].map((d) => (
                  <span
                    key={d}
                    className="px-2 py-0.5 text-[11px] font-tech font-bold rounded border select-none bg-[#FAF4EE] border-[#D8BFA8] text-[#292321]"
                  >
                    {d}
                  </span>
                ))}
                <span
                  onClick={() => openQuoteModal('Custom Tray Depth / Bespoke Fabrication', 'CUSTOM-TRAY')}
                  className="px-2.5 py-0.5 text-[11px] font-tech font-bold rounded border bg-[#5B1018]/10 hover:bg-[#5B1018]/20 border-[#5B1018]/30 text-[#5B1018] flex items-center gap-1 cursor-pointer transition-colors shadow-xs ml-0.5"
                  title="Click to request custom dimensions, gauges, or depths"
                >
                  <Sparkles className="w-3 h-3 text-[#5B1018]" />
                  <span>+ Customization Available</span>
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-tech text-[#5A4F4B]">
                <span className="font-bold uppercase text-[#292321]">
                  {categories.find((c) => c.slug === selectedCategory)?.name}
                </span>
                <span>• In-House Production by Shree Durga Steels</span>
              </div>
            )}

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A4F4B]" />
              <input
                type="text"
                placeholder="Search by tray size, model, code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-xs rounded border transition-colors focus:outline-none bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
              />
            </div>
          </div>

          {/* Selected Category Feature Banner with Photo and Description */}
          {selectedCategory !== 'all' && (() => {
            const activeCat = manufacturingCategories.find((c) => c.slug === selectedCategory);
            if (!activeCat) return null;
            return (
              <div className="mt-6 p-6 rounded-sm border overflow-hidden transition-all flex flex-col md:flex-row items-center gap-6 bg-[#FAF4EE] border-[#D8BFA8] shadow-sm">
                {activeCat.image && (
                  <div className="w-full md:w-56 h-36 shrink-0 rounded-xs overflow-hidden bg-white flex items-center justify-center border border-[#D8BFA8] shadow-xs">
                    <img
                      src={activeCat.image}
                      alt={activeCat.name}
                      className="w-full h-full object-contain p-2"
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = '/images/products/tsl81_front.jpg';
                      }}
                    />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-tech font-bold uppercase tracking-wider bg-[#5B1018]/10 text-[#5B1018] border border-[#5B1018]/25 mb-2">
                    <span>IN-HOUSE FABRICATION • {activeCat.name.toUpperCase()}</span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-2 text-[#292321]">
                    {activeCat.name}
                  </h2>
                  <p className="text-xs sm:text-sm leading-relaxed text-[#4D423E]">
                    {activeCat.shortDescription}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] font-tech text-[#5A4F4B] uppercase font-semibold">
                    <span>Deep Drawn Metallurgy</span>
                    <span>•</span>
                    <span>Zero Crevice Sanitation</span>
                    <span>•</span>
                    <span>Direct Factory Supply</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCategoryChange('all')}
                  className="self-start md:self-center px-3 py-1.5 text-xs font-tech font-bold uppercase rounded border border-[#D8BFA8] bg-[#F3E7DA] hover:bg-[#E9D9C8] text-[#292321] transition-colors whitespace-nowrap"
                >
                  View All Categories
                </button>
              </div>
            );
          })()}
        </div>
      </div>

      {/* Manufacturing Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 rounded border bg-[#FAF4EE] border-[#D8BFA8] text-[#5A4F4B]">
            <p className="text-base font-semibold mb-2">No manufacturing products match your filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs text-[#5B1018] font-bold underline"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filteredProducts.map((product) => {
              return (
                <div
                  key={product.id}
                  className="group rounded-sm border overflow-hidden transition-all duration-300 flex flex-col justify-between bg-[#FAF4EE] border-[#D8BFA8] hover:border-[#5B1018] hover:shadow-md"
                >
                  <div className="flex flex-col flex-1 justify-between">
                    {/* Image Area */}
                    <ProductCardImage
                      product={product}
                      onSelect={() => setSelectedProductForDetail(product)}
                      heightClass="h-72 sm:h-80"
                      imageFit="contain"
                    />

                    {/* Compact Content Area */}
                    <div className="p-3.5 flex flex-col justify-between flex-1">
                      <div>
                        {/* 1. PRODUCT NAME */}
                        <h3
                          onClick={() => setSelectedProductForDetail(product)}
                          className="text-sm sm:text-base font-bold uppercase tracking-tight line-clamp-1 leading-snug mb-1.5 cursor-pointer hover:underline text-[#292321] hover:text-[#5B1018]"
                          title={product.name}
                        >
                          {product.name}
                        </h3>

                        {/* 2. COMPACT MODEL & SIZE INFO ROW */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-3">
                          {product.model && (
                            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8]">
                              {product.model}
                            </span>
                          )}
                          {product.variants && product.variants.length > 0 ? (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#5B1018]/10 border border-[#5B1018]/25 text-[#5B1018] tabular-nums">
                              {product.variants.length} Sizes
                            </span>
                          ) : product.variantOrSize ? (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#E9D9C8] text-[#4D423E]">
                              {product.variantOrSize}
                            </span>
                          ) : product.specifications?.capacity ? (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#E9D9C8] border border-[#D8BFA8] text-[#292321]">
                              {product.specifications.capacity}
                            </span>
                          ) : null}
                        </div>

                        {/* PRODUCT SHORT DESCRIPTION */}
                        {product.shortDescription && (
                          <p className="text-xs leading-relaxed line-clamp-2 mb-3.5 text-[#4D423E]">
                            {product.shortDescription}
                          </p>
                        )}
                      </div>

                      {/* 3. VIEW SPECIFICATIONS & ADMIN UPLOAD BUTTONS */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedProductForDetail(product)}
                          className="flex-1 py-2 px-2.5 text-xs font-tech font-bold uppercase tracking-wider rounded-sm border transition-all flex items-center justify-center gap-1.5 bg-[#292321] border-[#292321] text-[#F3E7DA] hover:bg-[#5B1018] hover:border-[#5B1018] shadow-xs"
                        >
                          <span>SPECS</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        {isAdmin && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              openImageEditModal(product);
                            }}
                            className="py-2 px-3 text-xs font-tech font-black uppercase tracking-wider rounded-sm bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] transition-all flex items-center justify-center gap-1.5 shadow-sm hover:scale-102 active:scale-98"
                            title="Upload image and save to catalogue"
                          >
                            <Upload className="w-3.5 h-3.5" />
                            <span>UPLOAD / SAVE</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
