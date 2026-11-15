import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { ProductDetailView } from './ProductDetailView';
import { ProductCardImage } from './ProductCardImage';
import { TopPageBackButton } from './TopPageBackButton';
import {
  Layers,
  ShieldCheck,
  ArrowRight,
  Filter,
  Search,
  CheckCircle2,
  SlidersHorizontal,
  FileSpreadsheet,
  Download,
  Boxes,
  Maximize2,
  Sparkles,
  MessageSquare,
  Phone,
  Upload,
  Camera,
} from 'lucide-react';
import { ProductItem } from '../types';

export const GnPansPage: React.FC = () => {
  const {
    gnPanProducts,
    selectedProductForDetail,
    setSelectedProductForDetail,
    themeMode,
  } = useContent();

  const isLight = themeMode === 'light';
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDepthFilter, setSelectedDepthFilter] = useState<string>('all');

  if (selectedProductForDetail) {
    return (
      <ProductDetailView
        product={selectedProductForDetail}
        onBack={() => setSelectedProductForDetail(null)}
      />
    );
  }

  const filteredProducts = gnPanProducts.filter((product) => {
    const matchesSubcategory =
      selectedSubcategory === 'all' ||
      (product.subcategory && product.subcategory.toLowerCase().includes(selectedSubcategory.toLowerCase())) ||
      product.name.toLowerCase().includes(selectedSubcategory.toLowerCase());

    const matchesSearch =
      searchQuery === '' ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.productCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.variants && product.variants.some((v) => v.sizeName.toLowerCase().includes(searchQuery.toLowerCase())));

    const matchesDepth =
      selectedDepthFilter === 'all' ||
      (product.variants && product.variants.some((v) => v.depth === selectedDepthFilter)) ||
      product.shortDescription.includes(selectedDepthFilter);

    return matchesSubcategory && matchesSearch && matchesDepth;
  });

  const subcategories = [
    { id: 'all', label: 'All GN Products' },
    { id: '1/1', label: 'GN Pan 1/1' },
    { id: '1/2', label: 'GN Pan 1/2' },
    { id: '1/3', label: 'GN Pan 1/3' },
    { id: '1/4', label: 'GN Pan 1/4' },
    { id: '1/6', label: 'GN Pan 1/6' },
    { id: '1/9', label: 'GN Pan 1/9' },
    { id: '2/1', label: 'GN Pan 2/1 Jumbo' },
    { id: 'Lids', label: 'GN Covers / Lids' },
    { id: 'Ice Cream', label: 'Ice Cream Pans' },
  ];

  return (
    <div className={`pt-24 pb-20 transition-colors ${isLight ? 'bg-slate-50' : 'bg-[#090b0e]'}`}>
      {/* Header Banner */}
      <div
        className={`border-b py-12 sm:py-16 px-4 sm:px-6 lg:px-8 ${
          isLight
            ? 'bg-white border-slate-200'
            : 'bg-zinc-900/40 border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto">
          <TopPageBackButton currentPageTitle="Gastronorm (GN) Pans & Covers" categoryName="Modular Catering" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-tech font-bold uppercase tracking-[0.2em] bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20 mb-4">
                <Layers className="w-3.5 h-3.5" />
                <span>CATEGORY 3 • GASTRONORM (GN) PANS & COVERS</span>
              </div>

              <h1
                className={`text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4 ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                Gastronorm (GN) Pans & Covers
              </h1>

              <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-slate-600 dark:text-zinc-300 font-sans mb-8">
                Complete European EN-631 standard Gastronorm pan ecosystem manufactured from certified food-grade Austenitic Stainless Steel. Featuring anti-jam stacking shoulders, reinforced corner rims, precision matching stainless covers, and gelato storage pans.
              </p>

              {/* Quick Technical Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-slate-200 dark:border-white/10">
                <div className="flex items-center gap-2 text-xs font-tech font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>EN-631 European Standard</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-tech font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Anti-Jam Stacking Shoulders</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-tech font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>-40°C to +300°C Oven/Chiller</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-tech font-bold uppercase tracking-wider text-slate-700 dark:text-zinc-300">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                  <span>Prime Food-Grade Steel</span>
                </div>
              </div>
            </div>

            {/* Visual Header GN Pan Showcase Card */}
            <div className="w-full lg:w-96 shrink-0 rounded-sm overflow-hidden border border-blue-500/30 bg-zinc-950 shadow-xl relative group">
              <div className="relative h-60 w-full overflow-hidden bg-zinc-950 flex items-center justify-center p-4">
                <img
                  src="/uploads/products/prod_gn-pan-1-1_1790565801588_pjn1tf.webp"
                  alt="Gastronorm EN-631 Pans"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/products/tsl81_front.jpg';
                  }}
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase bg-blue-600 text-white">
                  EN-631 CERTIFIED
                </span>
              </div>
              <div className="p-3 bg-zinc-900 border-t border-white/10 flex items-center justify-between text-xs">
                <div>
                  <div className="font-tech font-bold uppercase text-white">Gastronorm Pan Series</div>
                  <div className="text-[10px] text-zinc-400 font-sans">Full modular 1/1 to 2/1 in all depths</div>
                </div>
                <span className="text-[11px] font-tech font-bold px-2 py-1 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {gnPanProducts.length} Models
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        {/* Controls: Subcategory Pills & Search */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          {/* Subcategory Scroll Bar */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 sm:pb-0 scrollbar-none">
            {subcategories.map((sub) => (
              <button
                key={sub.id}
                onClick={() => setSelectedSubcategory(sub.id)}
                className={`px-3 py-1.5 rounded text-xs font-tech font-bold uppercase tracking-wider whitespace-nowrap transition-all ${
                  selectedSubcategory === sub.id
                    ? isLight
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-blue-500 text-white shadow-xs'
                    : isLight
                    ? 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-300 hover:bg-zinc-800'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search GN size, model, depth..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-9 pr-4 py-2 rounded text-xs font-mono border transition-colors ${
                isLight
                  ? 'bg-white border-slate-300 text-slate-900 placeholder:text-slate-400 focus:border-blue-600 focus:outline-hidden'
                  : 'bg-zinc-900 border-zinc-800 text-white placeholder:text-zinc-500 focus:border-blue-500 focus:outline-hidden'
              }`}
            />
          </div>
        </div>

        {/* Selected Subcategory Feature Banner */}
        {selectedSubcategory !== 'all' && (() => {
          const matchingProduct = gnPanProducts.find(
            (p) =>
              (p.subcategory && p.subcategory.toLowerCase().includes(selectedSubcategory.toLowerCase())) ||
              p.name.toLowerCase().includes(selectedSubcategory.toLowerCase())
          );
          if (!matchingProduct) return null;
          return (
            <div
              className={`mb-8 p-6 rounded-sm border overflow-hidden transition-all flex flex-col md:flex-row items-center gap-6 ${
                isLight
                  ? 'bg-white border-blue-500/30 shadow-sm'
                  : 'bg-zinc-900/80 border-blue-500/30 shadow-md'
              }`}
            >
              <div className="w-full md:w-56 h-36 shrink-0 rounded-xs overflow-hidden bg-zinc-950 flex items-center justify-center border border-white/10 shadow-xs">
                <img
                  src={matchingProduct.mainImage}
                  alt={matchingProduct.name}
                  className="w-full h-full object-contain p-2"
                  loading="lazy"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/products/tsl81_front.jpg';
                  }}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-tech font-bold uppercase tracking-wider bg-blue-500/15 text-blue-700 dark:text-blue-400 border border-blue-500/30 mb-2">
                  <span>EN-631 SERIES • {matchingProduct.model}</span>
                </div>
                <h2
                  className={`text-xl sm:text-2xl font-black uppercase tracking-tight mb-2 ${
                    isLight ? 'text-slate-950' : 'text-white'
                  }`}
                >
                  {matchingProduct.name}
                </h2>
                <p
                  className={`text-xs sm:text-sm leading-relaxed ${
                    isLight ? 'text-slate-600' : 'text-zinc-300'
                  }`}
                >
                  {matchingProduct.shortDescription}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] font-tech text-slate-500 dark:text-zinc-400 uppercase font-semibold">
                  <span>Prime 304 Austenitic Stainless</span>
                  <span>•</span>
                  <span>Anti-Jam Stacking Rim</span>
                  <span>•</span>
                  <span>Universal Bain-Marie Fit</span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedSubcategory('all')}
                className="self-start md:self-center px-3 py-1.5 text-xs font-tech font-bold uppercase rounded border border-slate-300 dark:border-white/20 hover:bg-slate-100 dark:hover:bg-zinc-800 transition-colors whitespace-nowrap"
              >
                View All GN Sizes
              </button>
            </div>
          );
        })()}

        {/* Standard EN-631 Gastronorm Dimension Guide (Collapsible or Scannable Card) */}
        <div
          className={`p-5 rounded-sm border mb-10 ${
            isLight
              ? 'bg-white border-slate-200 shadow-xs'
              : 'bg-zinc-900/60 border-white/10 shadow-xs'
          }`}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-slate-100 dark:border-zinc-800">
            <div className="flex items-center gap-2">
              <Boxes className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <h3 className="font-tech font-bold uppercase tracking-wider text-xs sm:text-sm text-slate-900 dark:text-white">
                European Standard EN-631 Dimension & Depth Matrix
              </h3>
            </div>
            <span className="text-[11px] font-mono text-slate-500 dark:text-zinc-400">
              Universal Modular Bain-Marie & Prep Counter Compatibility
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-zinc-800 font-tech uppercase text-[11px] text-slate-500 dark:text-zinc-400">
                  <th className="py-2 pr-4">GN Size</th>
                  <th className="py-2 px-3">Dimensions (L × W)</th>
                  <th className="py-2 px-3">Standard Depths</th>
                  <th className="py-2 px-3">Capacity Range</th>
                  <th className="py-2 px-3">Matching Lid</th>
                  <th className="py-2 pl-3 text-right">Common Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-zinc-800/60 font-mono text-[11px]">
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-blue-600 dark:text-blue-400">GN 2/1 Jumbo</td>
                  <td className="py-2.5 px-3">650 × 530 mm</td>
                  <td className="py-2.5 px-3">65, 100, 150, 200 mm</td>
                  <td className="py-2.5 px-3">19.0 L – 58.0 L</td>
                  <td className="py-2.5 px-3">2/1 GN Lid</td>
                  <td className="py-2.5 pl-3 text-right font-sans text-slate-500 dark:text-zinc-400">Combi Trolleys & Bulk Banquet Chilling</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-blue-600 dark:text-blue-400">GN 1/1 Full</td>
                  <td className="py-2.5 px-3">530 × 325 mm</td>
                  <td className="py-2.5 px-3">65, 100, 150, 200 mm</td>
                  <td className="py-2.5 px-3">9.5 L – 28.0 L</td>
                  <td className="py-2.5 px-3">1/1 GN Lid</td>
                  <td className="py-2.5 pl-3 text-right font-sans text-slate-500 dark:text-zinc-400">Steam Tables, Chafing Dishes, Combi Steamers</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-blue-600 dark:text-blue-400">GN 1/2 Half</td>
                  <td className="py-2.5 px-3">325 × 265 mm</td>
                  <td className="py-2.5 px-3">65, 100, 150, 200 mm</td>
                  <td className="py-2.5 px-3">4.0 L – 12.5 L</td>
                  <td className="py-2.5 px-3">1/2 GN Lid</td>
                  <td className="py-2.5 pl-3 text-right font-sans text-slate-500 dark:text-zinc-400">Buffet Wells, Bain-Maries, Sandwich Tables</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-blue-600 dark:text-blue-400">GN 1/3 Third</td>
                  <td className="py-2.5 px-3">325 × 176 mm</td>
                  <td className="py-2.5 px-3">65, 100, 150, 200 mm</td>
                  <td className="py-2.5 px-3">2.5 L – 7.8 L</td>
                  <td className="py-2.5 px-3">1/3 GN Lid</td>
                  <td className="py-2.5 pl-3 text-right font-sans text-slate-500 dark:text-zinc-400">Salad Counters, Sauces, Pasta Rails</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-blue-600 dark:text-blue-400">GN 1/4 Quarter</td>
                  <td className="py-2.5 px-3">265 × 162 mm</td>
                  <td className="py-2.5 px-3">65, 100, 150, 200 mm</td>
                  <td className="py-2.5 px-3">1.7 L – 5.5 L</td>
                  <td className="py-2.5 px-3">1/4 GN Lid</td>
                  <td className="py-2.5 pl-3 text-right font-sans text-slate-500 dark:text-zinc-400">Burger Prep Stations, Condiments</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-blue-600 dark:text-blue-400">GN 1/6 Sixth</td>
                  <td className="py-2.5 px-3">176 × 162 mm</td>
                  <td className="py-2.5 px-3">65, 100, 150, 200 mm</td>
                  <td className="py-2.5 px-3">1.0 L – 3.4 L</td>
                  <td className="py-2.5 px-3">1/6 GN Lid</td>
                  <td className="py-2.5 pl-3 text-right font-sans text-slate-500 dark:text-zinc-400">Pizza Toppings, Salad Rails, Taco Stations</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-blue-600 dark:text-blue-400">GN 1/9 Ninth</td>
                  <td className="py-2.5 px-3">176 × 108 mm</td>
                  <td className="py-2.5 px-3">65, 100, 150 mm</td>
                  <td className="py-2.5 px-3">0.6 L – 1.5 L</td>
                  <td className="py-2.5 px-3">1/9 GN Lid</td>
                  <td className="py-2.5 pl-3 text-right font-sans text-slate-500 dark:text-zinc-400">Seeds, Spices, Bar Garnishes, Ice Cream Sprinkles</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredProducts.map((product) => (
            <GnPanCard
              key={product.id}
              product={product}
              isLight={isLight}
              onSelect={() => setSelectedProductForDetail(product)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Internal GN Pan Card Component with interactive variant selector
interface GnPanCardProps {
  product: ProductItem;
  isLight: boolean;
  onSelect: () => void;
}

const GnPanCard: React.FC<GnPanCardProps> = ({
  product,
  isLight,
  onSelect,
}) => {
  const { openImageEditModal } = useContent();
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number>(0);
  const variants = product.variants || [];
  const currentVariant = variants[selectedVariantIndex];

  return (
    <div
      className={`rounded-sm border flex flex-col transition-all duration-200 overflow-hidden group ${
        isLight
          ? 'bg-white border-slate-200 hover:border-blue-400 shadow-xs hover:shadow-md'
          : 'bg-zinc-900/70 border-zinc-800 hover:border-blue-500/50 hover:shadow-xl'
      }`}
    >
      {/* Product Image - Expanded space */}
      <ProductCardImage
        product={product}
        onSelect={onSelect}
        heightClass="h-72 sm:h-80"
        imageFit="contain"
        customModelCode={currentVariant ? currentVariant.modelCode || product.model : product.model}
        subcategoryBadge={product.subcategory || 'EN-631'}
      />

      {/* Body Content - Compact and streamlined */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <h3
            onClick={onSelect}
            className={`font-tech font-black text-sm sm:text-base uppercase tracking-tight line-clamp-1 mb-1.5 cursor-pointer hover:text-blue-600 transition-colors ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
            title={product.name}
          >
            {product.name}
          </h3>

          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-blue-500/10 border border-blue-500/20 text-blue-700 dark:text-blue-300">
              {product.model}
            </span>
            {variants.length > 0 && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-zinc-800 text-slate-600 dark:text-zinc-400">
                {variants.length} Depths Available
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

        {/* Card Footer: View Specs + Upload / Save Image */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={onSelect}
            className={`flex-1 py-2 px-2.5 rounded-sm font-tech text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 ${
              isLight
                ? 'bg-slate-900 hover:bg-slate-800 text-white shadow-xs'
                : 'bg-zinc-800 hover:bg-zinc-700 text-white shadow-xs'
            }`}
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>SPECS</span>
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openImageEditModal(product);
            }}
            className="py-2 px-3 rounded-sm font-tech text-xs font-black uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-sm flex items-center justify-center gap-1.5 transition-all hover:scale-102 active:scale-98"
            title="Upload image and save to catalogue"
          >
            <Upload className="w-3.5 h-3.5" />
            <span>UPLOAD / SAVE</span>
          </button>
        </div>
      </div>
    </div>
  );
};
