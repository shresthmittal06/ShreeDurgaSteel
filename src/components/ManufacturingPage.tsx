import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { ProductCardImage } from './ProductCardImage';
import { TopPageBackButton } from './TopPageBackButton';
import {
  Factory,
  Sparkles,
  ShieldCheck,
  Search,
  CheckCircle2,
  Layers,
  ArrowRight,
  Info,
  Upload,
  Camera,
} from 'lucide-react';
import { ProductItem } from '../types';

export const ManufacturingPage: React.FC = () => {
  const {
    manufacturingProducts,
    categories,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    setSelectedProductForDetail,
    openQuoteModal,
    computePricing,
    themeMode,
    openImageEditModal,
  } = useContent();

  const isLight = themeMode === 'light';
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
    <div className={`pt-24 pb-20 transition-colors ${isLight ? 'bg-slate-50' : 'bg-[#090b0e]'}`}>
      {/* Hero Header Banner */}
      <div
        className={`border-b py-12 sm:py-16 px-4 sm:px-6 lg:px-8 ${
          isLight
            ? 'bg-white border-slate-200'
            : 'bg-zinc-900/40 border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <TopPageBackButton currentPageTitle="Kitchenware & Home Utility" categoryName="Manufacturing" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-[10px] font-tech font-bold uppercase tracking-[0.2em] bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20 mb-4">
                <Factory className="w-3.5 h-3.5" />
                <span>MANUFACTURED BY SHRI DURGA STEELS • IN-HOUSE PRODUCTION RANGE</span>
              </div>

              <h1
                className={`text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4 ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                Manufactured by Shree Durga Steels
              </h1>
              <p className="text-sm sm:text-base font-tech uppercase tracking-wider text-amber-600 dark:text-amber-400 font-bold mb-4">
                Kitchenware & Home Utility — Authentic Factory Metal Fabrication
              </p>

              <p
                className={`text-base sm:text-lg max-w-3xl leading-relaxed mb-6 ${
                  isLight ? 'text-slate-600' : 'text-zinc-400'
                }`}
              >
                A dedicated manufacturing range produced in-house by Shree Durga Steels. Spanning precision confectionery sweet display trays, commercial and domestic masala dani spice stations, traditional devotional metalware, wire glass racks, bakery moulds, and bespoke PVD titanium gold luxury products.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-zinc-800">
                <div>
                  <span className="block text-xl font-black text-slate-950 dark:text-white">
                    {manufacturingProducts.length} Products
                  </span>
                  <span className="text-[11px] font-tech text-slate-500 dark:text-zinc-400 uppercase">
                    Manufactured Range
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-black text-slate-950 dark:text-white">
                    6 Product Groups
                  </span>
                  <span className="text-[11px] font-tech text-slate-500 dark:text-zinc-400 uppercase">
                    Trays, Masala, Pooja, Wire & Gold
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-black text-slate-950 dark:text-white">
                    PVD Titanium
                  </span>
                  <span className="text-[11px] font-tech text-slate-500 dark:text-zinc-400 uppercase">
                    Royal Gold Finish
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-black text-slate-950 dark:text-white">
                    Zero Crevice
                  </span>
                  <span className="text-[11px] font-tech text-slate-500 dark:text-zinc-400 uppercase">
                    Deep Drawn Metallurgy
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Header Manufacturing Showcase Card */}
            <div className="w-full lg:w-96 shrink-0 rounded-sm overflow-hidden border border-emerald-500/30 bg-zinc-950 shadow-xl relative group">
              <div className="relative h-60 w-full overflow-hidden bg-zinc-950 flex items-center justify-center p-4">
                <img
                  src="/uploads/products/prod_mfg-barfi-tray_1790565801591_1ozrb1.webp"
                  alt="In-House Manufactured Steel Products"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/products/tsl81_front.jpg';
                  }}
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase bg-emerald-600 text-white">
                  IN-HOUSE FACTORY
                </span>
              </div>
              <div className="p-3 bg-zinc-900 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-tech font-bold uppercase text-white">Kitchenware & Utility</div>
                  <div className="text-[10px] text-zinc-400 font-sans">Barfi Trays, Masala Dani, Glass Stands</div>
                </div>
                <span className="text-[11px] font-tech font-bold px-2 py-1 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
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
          <div
            className={`p-5 rounded border ${
              isLight ? 'bg-white border-slate-200' : 'bg-zinc-900/70 border-zinc-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-white">
                Multiple Verified Depths
              </h4>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
              Barfi Trays in 0.4", 0.6", 1", and 1.2" depths; Rasgulla Trays in 1.4", 1.6", and 2" syrup-retaining formats for traditional confectioneries.
            </p>
          </div>

          <div
            className={`p-5 rounded border ${
              isLight ? 'bg-white border-slate-200' : 'bg-zinc-900/70 border-zinc-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-white">
                PVD Gold Luxury Hardware
              </h4>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
              Titanium vacuum-coated trays and glass racks for 5-star & 7-star hotel suites, presidential banquets, and high-end sweet gifting.
            </p>
          </div>

          <div
            className={`p-5 rounded border ${
              isLight ? 'bg-white border-slate-200' : 'bg-zinc-900/70 border-zinc-800'
            }`}
          >
            <div className="flex items-center gap-2 mb-2">
              <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-950 dark:text-white">
                Sanitary Drawn Corners
              </h4>
            </div>
            <p className="text-xs leading-relaxed text-slate-600 dark:text-zinc-400">
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
                  ? isLight
                    ? 'bg-slate-900 text-white'
                    : 'bg-white text-zinc-950 font-bold'
                  : isLight
                  ? 'bg-white text-slate-700 border border-slate-200 hover:border-slate-400'
                  : 'bg-zinc-800/80 text-zinc-300 border border-zinc-700/80 hover:border-zinc-500'
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
                      ? isLight
                        ? 'bg-slate-900 text-white'
                        : 'bg-white text-zinc-950 font-bold'
                      : isLight
                      ? 'bg-white text-slate-700 border border-slate-200 hover:border-slate-400'
                      : 'bg-zinc-800/80 text-zinc-300 border border-zinc-700/80 hover:border-zinc-500'
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
                <span className="text-[11px] font-tech text-slate-500 dark:text-zinc-400 uppercase font-bold tracking-wider shrink-0 mr-1">
                  TRAY DEPTHS:
                </span>
                {['0.4"', '0.6"', '1.0"', '1.2"', '1.4"', '2.0"', '2.4"'].map((d) => (
                  <span
                    key={d}
                    className={`px-2 py-0.5 text-[11px] font-tech font-bold rounded border select-none ${
                      isLight
                        ? 'bg-slate-100 border-slate-200 text-slate-700'
                        : 'bg-zinc-800/80 border-zinc-700 text-zinc-300'
                    }`}
                  >
                    {d}
                  </span>
                ))}
                <span
                  onClick={() => openQuoteModal('Custom Tray Depth / Bespoke Fabrication', 'CUSTOM-TRAY')}
                  className="px-2.5 py-0.5 text-[11px] font-tech font-bold rounded border bg-amber-500/10 hover:bg-amber-500/20 border-amber-500/40 text-amber-700 dark:text-amber-400 flex items-center gap-1 cursor-pointer transition-colors shadow-xs ml-0.5"
                  title="Click to request custom dimensions, gauges, or depths"
                >
                  <Sparkles className="w-3 h-3 text-amber-500" />
                  <span>+ Customization Available</span>
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs font-tech text-slate-500 dark:text-zinc-400">
                <span className="font-bold uppercase text-slate-700 dark:text-zinc-300">
                  {categories.find((c) => c.slug === selectedCategory)?.name}
                </span>
                <span>• In-House Production by Shree Durga Steels</span>
              </div>
            )}

            <div className="relative w-full sm:w-72">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search by tray size, model, code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`w-full pl-9 pr-4 py-2 text-xs rounded border transition-colors focus:outline-none ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-900 focus:border-slate-500'
                    : 'bg-zinc-900 border-zinc-800 text-white focus:border-zinc-500'
                }`}
              />
            </div>
          </div>

          {/* Selected Category Feature Banner with Photo and Description */}
          {selectedCategory !== 'all' && (() => {
            const activeCat = manufacturingCategories.find((c) => c.slug === selectedCategory);
            if (!activeCat) return null;
            return (
              <div
                className={`mt-6 p-6 rounded-sm border overflow-hidden transition-all flex flex-col md:flex-row items-center gap-6 ${
                  isLight
                    ? 'bg-white border-emerald-500/30 shadow-sm'
                    : 'bg-zinc-900/80 border-emerald-500/30 shadow-md'
                }`}
              >
                {activeCat.image && (
                  <div className="w-full md:w-56 h-36 shrink-0 rounded-xs overflow-hidden bg-zinc-950 flex items-center justify-center border border-white/10 shadow-xs">
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
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-tech font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 border border-emerald-500/30 mb-2">
                    <span>IN-HOUSE FABRICATION • {activeCat.name.toUpperCase()}</span>
                  </div>
                  <h2
                    className={`text-xl sm:text-2xl font-black uppercase tracking-tight mb-2 ${
                      isLight ? 'text-slate-950' : 'text-white'
                    }`}
                  >
                    {activeCat.name}
                  </h2>
                  <p
                    className={`text-xs sm:text-sm leading-relaxed ${
                      isLight ? 'text-slate-600' : 'text-zinc-300'
                    }`}
                  >
                    {activeCat.shortDescription}
                  </p>
                  <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] font-tech text-slate-500 dark:text-zinc-400 uppercase font-semibold">
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
                  className="self-start md:self-center px-3 py-1.5 text-xs font-tech font-bold uppercase rounded border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
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
          <div
            className={`text-center py-20 rounded border ${
              isLight ? 'bg-white border-slate-200 text-slate-500' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
            }`}
          >
            <p className="text-base font-semibold mb-2">No manufacturing products match your filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
              }}
              className="text-xs text-amber-600 font-bold underline"
            >
              Reset Filters
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
                    <ProductCardImage
                      product={product}
                      onSelect={() => setSelectedProductForDetail(product)}
                      heightClass="h-72 sm:h-80"
                      imageFit="contain"
                    />

                    {/* Compact Content Area - Giving less space to other things and more to the image */}
                    <div className="p-3.5 flex flex-col justify-between flex-1">
                      <div>
                        {/* 1. PRODUCT NAME */}
                        <h3
                          onClick={() => setSelectedProductForDetail(product)}
                          className={`text-sm sm:text-base font-bold uppercase tracking-tight line-clamp-1 leading-snug mb-1.5 cursor-pointer hover:underline ${
                            isLight ? 'text-slate-950' : 'text-white'
                          }`}
                          title={product.name}
                        >
                          {product.name}
                        </h3>

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

                        {/* PRODUCT SHORT DESCRIPTION */}
                        {product.shortDescription && (
                          <p
                            className={`text-xs leading-relaxed line-clamp-2 mb-3.5 ${
                              isLight ? 'text-slate-600' : 'text-zinc-400'
                            }`}
                          >
                            {product.shortDescription}
                          </p>
                        )}
                      </div>

                      {/* 3. VIEW SPECIFICATIONS & UPLOAD/SAVE IMAGE BUTTONS */}
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          type="button"
                          onClick={() => setSelectedProductForDetail(product)}
                          className={`flex-1 py-2 px-2.5 text-xs font-tech font-bold uppercase tracking-wider rounded-sm border transition-all flex items-center justify-center gap-1.5 ${
                            isLight
                              ? 'bg-slate-900 border-slate-900 text-white hover:bg-slate-800 shadow-xs'
                              : 'bg-zinc-800 border-zinc-700 text-white hover:bg-zinc-700 shadow-xs'
                          }`}
                        >
                          <span>SPECS</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            openImageEditModal(product);
                          }}
                          className="py-2 px-3 text-xs font-tech font-bold uppercase tracking-wider rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white transition-all flex items-center justify-center gap-1.5 shadow-sm font-black hover:scale-102 active:scale-98"
                          title="Upload image and save to catalogue"
                        >
                          <Upload className="w-3.5 h-3.5" />
                          <span>UPLOAD / SAVE</span>
                        </button>
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
