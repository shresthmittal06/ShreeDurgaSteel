import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { ProductDetailView } from './ProductDetailView';
import { ProductCardImage } from './ProductCardImage';
import { TopPageBackButton } from './TopPageBackButton';
import {
  Flame,
  Zap,
  ArrowRight,
  Search,
  Upload,
} from 'lucide-react';

export const CommercialKitchenPage: React.FC = () => {
  const {
    commercialProducts,
    categories,
    selectedCategoryFilter,
    setSelectedCategoryFilter,
    selectedProductForDetail,
    setSelectedProductForDetail,
    openImageEditModal,
    isAdmin,
  } = useContent();

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
    <div className="pt-24 pb-20 transition-colors bg-[#F3E7DA] text-[#292321]">
      {/* Header Banner with Equipment Visual Card */}
      <div className="border-b py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF4EE] border-[#D8BFA8]">
        <div className="max-w-7xl mx-auto">
          <TopPageBackButton currentPageTitle="Kitchen Equipment" categoryName="Commercial Kitchen" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-tech font-bold uppercase tracking-[0.2em] bg-[#5B1018]/10 text-[#5B1018] border border-[#5B1018]/25 mb-4">
                <Flame className="w-3.5 h-3.5" />
                <span>CATEGORY 2 • COMMERCIAL KITCHEN EQUIPMENT</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4 text-[#292321]">
                Kitchen Equipment
              </h1>

              <p className="text-base sm:text-lg max-w-3xl leading-relaxed mb-6 text-[#4D423E]">
                Heavy-duty commercial cooking equipment, high-output electric fryers, contact sandwich grills, refractory stone pizza ovens, commercial induction cooktops, salamanders, griddles, toasters, and food-service machinery. Engineered for continuous duty in high-output restaurants, sweet houses, hotels, and cloud kitchens.
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-[#D8BFA8]">
                <div>
                  <span className="block text-xl font-black text-[#292321] tabular-nums">
                    {commercialProducts.length}
                  </span>
                  <span className="text-[11px] font-tech text-[#5A4F4B] uppercase">
                    Appliances & Units
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-black text-[#292321]">
                    AISI 304
                  </span>
                  <span className="text-[11px] font-tech text-[#5A4F4B] uppercase">
                    Stainless Metallurgy
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-black text-[#292321]">
                    EGO / German
                  </span>
                  <span className="text-[11px] font-tech text-[#5A4F4B] uppercase">
                    Thermal Controllers
                  </span>
                </div>
                <div>
                  <span className="block text-xl font-black text-[#292321]">
                    100% Bench
                  </span>
                  <span className="text-[11px] font-tech text-[#5A4F4B] uppercase">
                    Load Stress Tested
                  </span>
                </div>
              </div>
            </div>

            {/* Visual Header Equipment Showcase Card */}
            <div className="w-full lg:w-96 shrink-0 rounded-sm overflow-hidden border border-[#D8BFA8] bg-white shadow-xl relative group">
              <div className="relative h-60 w-full overflow-hidden bg-white flex items-center justify-center p-4">
                <img
                  src="/uploads/products/prod_comm-fryer-tsl81_1790565801586_ri7pg6.webp"
                  alt="Commercial Kitchen Appliances"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/products/tsl81_front.jpg';
                  }}
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase bg-[#5B1018] text-[#F3E7DA]">
                  COMMERCIAL LINE
                </span>
              </div>
              <div className="p-3 bg-[#292321] border-t border-[#D8BFA8]/30 flex items-center justify-between text-xs">
                <div>
                  <div className="font-tech font-bold uppercase text-[#F3E7DA]">Commercial Appliances</div>
                  <div className="text-[10px] text-[#D8BFA8] font-sans">Electric Fryers, Ovens, Grills & Induction</div>
                </div>
                <span className="text-[11px] font-tech font-bold px-2 py-1 rounded bg-[#5B1018] text-[#F3E7DA] border border-[#D8BFA8]/30 tabular-nums">
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
                  ? 'bg-[#5B1018] text-[#F3E7DA]'
                  : 'bg-[#FAF4EE] text-[#4D423E] border border-[#D8BFA8] hover:border-[#5B1018]'
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
                      ? 'bg-[#5B1018] text-[#F3E7DA]'
                      : 'bg-[#FAF4EE] text-[#4D423E] border border-[#D8BFA8] hover:border-[#5B1018]'
                  }`}
                >
                  {cat.name.toUpperCase()} ({count})
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div className="relative min-w-[260px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A4F4B]" />
            <input
              type="text"
              placeholder="Search appliances, model..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs rounded border transition-colors focus:outline-none bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
            />
          </div>
        </div>

        {/* Selected Category Feature Banner with Photo and Description */}
        {selectedCategory !== 'all' && (() => {
          const activeCat = commercialCategories.find((c) => c.slug === selectedCategory);
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
                  <span>CATEGORY LINE • {activeCat.name.toUpperCase()}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-2 text-[#292321]">
                  {activeCat.name}
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-[#4D423E]">
                  {activeCat.shortDescription}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] font-tech text-[#5A4F4B] uppercase font-semibold">
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
                className="self-start md:self-center px-3 py-1.5 text-xs font-tech font-bold uppercase rounded border border-[#D8BFA8] bg-[#F3E7DA] hover:bg-[#E9D9C8] text-[#292321] transition-colors whitespace-nowrap"
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
          <div className="text-center py-20 rounded border bg-[#FAF4EE] border-[#D8BFA8] text-[#5A4F4B]">
            <p className="text-base font-semibold mb-2">No commercial appliances match your filter.</p>
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
                      heightClass="h-72 sm:h-80 md:h-88"
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

                        {/* 2. COMPACT MODEL & POWER INFO ROW */}
                        <div className="flex flex-wrap items-center gap-1.5 mb-3">
                          {product.model && (
                            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#F3E7DA] text-[#292321] border border-[#D8BFA8]">
                              {product.model}
                            </span>
                          )}
                          <span className="text-[10px] uppercase font-tech font-bold px-2 py-0.5 rounded bg-[#5B1018]/10 border border-[#5B1018]/25 text-[#5B1018]">
                            {product.category}
                          </span>
                          {product.specifications.power && (
                            <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-[#E9D9C8] border border-[#D8BFA8] text-[#292321] flex items-center gap-1">
                              <Zap className="w-2.5 h-2.5 text-[#5B1018]" />
                              {product.specifications.power}
                            </span>
                          )}
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
                            title="Upload new image and save to catalogue"
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
