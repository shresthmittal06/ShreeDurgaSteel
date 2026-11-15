import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { ProductDetailView } from './ProductDetailView';
import { ProductCardImage } from './ProductCardImage';
import { TopPageBackButton } from './TopPageBackButton';
import {
  Flame,
  Zap,
  ShieldCheck,
  ArrowRight,
  Filter,
  Search,
  CheckCircle2,
  SlidersHorizontal,
  Eye,
  ZoomIn,
  Upload,
  Camera,
} from 'lucide-react';
import { ProductItem } from '../types';

export const CommercialKitchenPage: React.FC = () => {
  const {
    commercialProducts,
    categories,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    selectedProductForDetail,
    setSelectedProductForDetail,
    themeMode,
    openImageEditModal,
  } = useContent();

  const isLight = themeMode === 'light';
  const commercialCategories = categories.filter((c) => c.division === 'commercial');

  const [selectedCategory, setSelectedCategory] = useState<string>(() => {
    if (selectedCategoryFilter && selectedCategoryFilter !== 'all') {
      const match = commercialCategories.some((c) => c.slug === selectedCategoryFilter);
      if (match) return selectedCategoryFilter;
    }
    return 'all';
  });
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Keep in sync with global category filter (e.g. from homepage category cards or header nav)
  React.useEffect(() => {
    if (selectedCategoryFilter && selectedCategoryFilter !== 'all') {
      const match = commercialCategories.some((c) => c.slug === selectedCategoryFilter);
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

  if (selectedProductForDetail) {
    return (
      <ProductDetailView
        product={selectedProductForDetail}
        onBack={() => setSelectedProductForDetail(null)}
      />
    );
  }

  const filteredProducts = commercialProducts.filter((product) => {
    const matchesCategory =
      selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className={`pt-24 pb-20 transition-colors ${isLight ? 'bg-slate-50' : 'bg-[#090b0e]'}`}>
      {/* Header Banner with Equipment Visual Card */}
      <div
        className={`border-b py-12 sm:py-16 px-4 sm:px-6 lg:px-8 ${
          isLight
            ? 'bg-white border-slate-200'
            : 'bg-zinc-900/40 border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <TopPageBackButton currentPageTitle="Kitchen Equipment" categoryName="Commercial Kitchen" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-tech font-bold uppercase tracking-[0.2em] bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20 mb-4">
                <Flame className="w-3.5 h-3.5" />
                <span>CATEGORY 2 • COMMERCIAL KITCHEN EQUIPMENT</span>
              </div>

              <h1
                className={`text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4 ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                Kitchen Equipment
              </h1>

              <p
                className={`text-base sm:text-lg max-w-3xl leading-relaxed mb-6 ${
                  isLight ? 'text-slate-600' : 'text-zinc-400'
                }`}
              >
                Heavy-duty commercial cooking equipment, high-output electric fryers, contact sandwich grills, refractory stone pizza ovens, commercial induction cooktops, salamanders, griddles, toasters, and food-service machinery. Engineered for continuous duty in high-output restaurants, sweet houses, hotels, and cloud kitchens.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-slate-200 dark:border-zinc-800">
                <div>
                  <span className="block text-xl font-black text-slate-950 dark:text-white">
                    {commercialProducts.length}
                  </span>
                  <span className="text-[11px] font-tech text-slate-500 dark:text-zinc-400 uppercase">
                    Appliances & Units
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-black text-slate-950 dark:text-white">
                    AISI 304
                  </span>
                  <span className="text-[11px] font-tech text-slate-500 dark:text-zinc-400 uppercase">
                    Stainless Metallurgy
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-black text-slate-950 dark:text-white">
                    EGO / German
                  </span>
                  <span className="text-[11px] font-tech text-slate-500 dark:text-zinc-400 uppercase">
                    Thermal Controllers
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-black text-slate-950 dark:text-white">
                    100% Bench
                  </span>
                  <span className="text-[11px] font-tech text-slate-500 dark:text-zinc-400 uppercase">
                    Load Stress Tested
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Header Equipment Showcase Card */}
            <div className="w-full lg:w-96 shrink-0 rounded-sm overflow-hidden border border-amber-500/30 bg-zinc-950 shadow-xl relative group">
              <div className="relative h-60 w-full overflow-hidden bg-zinc-950 flex items-center justify-center p-4">
                <img
                  src="/uploads/products/prod_comm-fryer-tsl81_1790565801586_ri7pg6.webp"
                  alt="Commercial Kitchen Appliances"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/products/tsl81_front.jpg';
                  }}
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase bg-amber-500 text-black">
                  COMMERCIAL LINE
                </span>
              </div>
              <div className="p-3 bg-zinc-900 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-tech font-bold uppercase text-white">Commercial Appliances</div>
                  <div className="text-[10px] text-zinc-400 font-sans">Electric Fryers, Ovens, Grills & Induction</div>
                </div>
                <span className="text-[11px] font-tech font-bold px-2 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  {commercialCategories.length} Lines
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Category Tabs */}
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
              ALL KITCHEN EQUIPMENT ({commercialProducts.length})
            </button>
            {commercialCategories.map((cat) => {
              const count = commercialProducts.filter((p) => p.category === cat.slug).length;
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

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search appliances, model..."
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
          const activeCat = commercialCategories.find((c) => c.slug === selectedCategory);
          if (!activeCat) return null;
          return (
            <div
              className={`mt-6 p-6 rounded-sm border overflow-hidden transition-all flex flex-col md:flex-row items-center gap-6 ${
                isLight
                  ? 'bg-white border-amber-500/30 shadow-sm'
                  : 'bg-zinc-900/80 border-amber-500/30 shadow-md'
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
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-tech font-bold uppercase tracking-wider bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30 mb-2">
                  <span>CATEGORY LINE • {activeCat.name.toUpperCase()}</span>
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
                  <span>AISI 304 Prime Food-Grade</span>
                  <span>•</span>
                  <span>Heavy Heating Elements</span>
                  <span>•</span>
                  <span>100% Bench Tested</span>
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

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProducts.length === 0 ? (
          <div
            className={`text-center py-20 rounded border ${
              isLight ? 'bg-white border-slate-200 text-slate-500' : 'bg-zinc-900 border-zinc-800 text-zinc-400'
            }`}
          >
            <p className="text-base font-semibold mb-2">No commercial appliances match your filter.</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => {
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
                    {/* Image Area - Expanded space with contain fit so equipment is fully visible */}
                    <ProductCardImage
                      product={product}
                      onSelect={() => setSelectedProductForDetail(product)}
                      heightClass="h-72 sm:h-80 md:h-88"
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

                        {/* 2. COMPACT MODEL & POWER INFO ROW */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-3">
                          {product.model && (
                            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 border border-slate-200 dark:border-white/10">
                              {product.model}
                            </span>
                          )}
                          <span className="text-[10px] uppercase font-tech font-bold px-2 py-0.5 rounded bg-amber-500/15 border border-amber-500/30 text-amber-900 dark:text-amber-300">
                            {product.category}
                          </span>
                          {product.specifications.power && (
                            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300 flex items-center gap-1">
                              <Zap className="w-2.5 h-2.5 text-amber-500" />
                              {product.specifications.power}
                            </span>
                          )}
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
                          className="py-2 px-3 text-xs font-tech font-bold uppercase tracking-wider rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-950 transition-all flex items-center justify-center gap-1.5 shadow-sm font-black hover:scale-102 active:scale-98"
                          title="Upload new image and save to catalogue"
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
