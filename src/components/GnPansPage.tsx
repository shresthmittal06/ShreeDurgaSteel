import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { ProductDetailView } from './ProductDetailView';
import { ProductCardImage } from './ProductCardImage';
import { TopPageBackButton } from './TopPageBackButton';
import {
  Layers,
  Search,
  CheckCircle2,
  Boxes,
  Maximize2,
  Upload,
} from 'lucide-react';
import { ProductItem } from '../types';

export const GnPansPage: React.FC = () => {
  const {
    gnPanProducts,
    selectedProductForDetail,
    setSelectedProductForDetail,
  } = useContent();

  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedDepthFilter] = useState<string>('all');

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
    <div className="pt-24 pb-20 transition-colors bg-[#F3E7DA] text-[#292321]">
      {/* Header Banner */}
      <div className="border-b py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-[#FAF4EE] border-[#D8BFA8]">
        <div className="max-w-7xl mx-auto">
          <TopPageBackButton currentPageTitle="Gastronorm (GN) Pans & Covers" categoryName="Modular Catering" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-tech font-bold uppercase tracking-[0.2em] bg-[#5B1018]/10 text-[#5B1018] border border-[#5B1018]/25 mb-4">
                <Layers className="w-3.5 h-3.5" />
                <span>CATEGORY 3 • GASTRONORM (GN) PANS & COVERS</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight mb-4 text-[#292321]">
                Gastronorm (GN) Pans & Covers
              </h1>

              <p className="max-w-3xl text-sm sm:text-base leading-relaxed text-[#4D423E] font-sans mb-8">
                Complete European EN-631 standard Gastronorm pan ecosystem manufactured from certified food-grade Austenitic Stainless Steel. Featuring anti-jam stacking shoulders, reinforced corner rims, precision matching stainless covers, and gelato storage pans.
              </p>

              {/* Quick Technical Badges */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#D8BFA8]">
                <div className="flex items-center gap-2 text-xs font-tech font-bold uppercase tracking-wider text-[#292321]">
                  <CheckCircle2 className="w-4 h-4 text-[#5B1018] shrink-0" />
                  <span>EN-631 European Standard</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-tech font-bold uppercase tracking-wider text-[#292321]">
                  <CheckCircle2 className="w-4 h-4 text-[#5B1018] shrink-0" />
                  <span>Anti-Jam Stacking Shoulders</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-tech font-bold uppercase tracking-wider text-[#292321]">
                  <CheckCircle2 className="w-4 h-4 text-[#5B1018] shrink-0" />
                  <span>-40°C to +300°C Oven/Chiller</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-tech font-bold uppercase tracking-wider text-[#292321]">
                  <CheckCircle2 className="w-4 h-4 text-[#5B1018] shrink-0" />
                  <span>Prime Food-Grade Steel</span>
                </div>
              </div>
            </div>

            {/* Visual Header GN Pan Showcase Card */}
            <div className="w-full lg:w-96 shrink-0 rounded-sm overflow-hidden border border-[#D8BFA8] bg-white shadow-xl relative group">
              <div className="relative h-60 w-full overflow-hidden bg-white flex items-center justify-center p-4">
                <img
                  src="/uploads/products/prod_gn-pan-1-1_1790565801588_pjn1tf.webp"
                  alt="Gastronorm EN-631 Pans"
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/products/tsl81_front.jpg';
                  }}
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase bg-[#5B1018] text-[#F3E7DA]">
                  EN-631 CERTIFIED
                </span>
              </div>
              <div className="p-3 bg-[#292321] border-t border-[#D8BFA8]/30 flex items-center justify-between text-xs">
                <div>
                  <div className="font-tech font-bold uppercase text-[#F3E7DA]">Gastronorm Pan Series</div>
                  <div className="text-[10px] text-[#D8BFA8] font-sans">Full modular 1/1 to 2/1 in all depths</div>
                </div>
                <span className="text-[11px] font-tech font-bold px-2 py-1 rounded bg-[#5B1018] text-[#F3E7DA] border border-[#D8BFA8]/30 tabular-nums">
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
                    ? 'bg-[#5B1018] text-[#F3E7DA] shadow-xs'
                    : 'bg-[#FAF4EE] border border-[#D8BFA8] text-[#4D423E] hover:bg-[#E9D9C8]'
                }`}
              >
                {sub.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full lg:w-72 shrink-0">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A4F4B]" />
            <input
              type="text"
              placeholder="Search GN size, model, depth..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded text-xs font-mono border transition-colors bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018] focus:outline-hidden"
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
            <div className="mb-8 p-6 rounded-sm border overflow-hidden transition-all flex flex-col md:flex-row items-center gap-6 bg-[#FAF4EE] border-[#D8BFA8] shadow-sm">
              <div className="w-full md:w-56 h-36 shrink-0 rounded-xs overflow-hidden bg-white flex items-center justify-center border border-[#D8BFA8] shadow-xs">
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
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[10px] font-tech font-bold uppercase tracking-wider bg-[#5B1018]/10 text-[#5B1018] border border-[#5B1018]/25 mb-2">
                  <span>EN-631 SERIES • {matchingProduct.model}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight mb-2 text-[#292321]">
                  {matchingProduct.name}
                </h2>
                <p className="text-xs sm:text-sm leading-relaxed text-[#4D423E]">
                  {matchingProduct.shortDescription}
                </p>
                <div className="flex flex-wrap items-center gap-3 mt-3 text-[11px] font-tech text-[#5A4F4B] uppercase font-semibold">
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
                className="self-start md:self-center px-3 py-1.5 text-xs font-tech font-bold uppercase rounded border border-[#D8BFA8] bg-[#F3E7DA] hover:bg-[#E9D9C8] text-[#292321] transition-colors whitespace-nowrap"
              >
                View All GN Sizes
              </button>
            </div>
          );
        })()}

        {/* Standard EN-631 Gastronorm Dimension Guide */}
        <div className="p-5 rounded-sm border mb-10 bg-[#FAF4EE] border-[#D8BFA8] shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-[#D8BFA8]">
            <div className="flex items-center gap-2">
              <Boxes className="w-4 h-4 text-[#5B1018]" />
              <h3 className="font-tech font-bold uppercase tracking-wider text-xs sm:text-sm text-[#292321]">
                European Standard EN-631 Dimension & Depth Matrix
              </h3>
            </div>
            <span className="text-[11px] font-mono text-[#5A4F4B]">
              Universal Modular Bain-Marie & Prep Counter Compatibility
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#D8BFA8] font-tech uppercase text-[11px] text-[#5A4F4B]">
                  <th className="py-2 pr-4">GN Size</th>
                  <th className="py-2 px-3">Dimensions (L × W)</th>
                  <th className="py-2 px-3">Standard Depths</th>
                  <th className="py-2 px-3">Capacity Range</th>
                  <th className="py-2 px-3">Matching Lid</th>
                  <th className="py-2 pl-3 text-right">Common Usage</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D8BFA8]/60 font-mono text-[11px] text-[#292321]">
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[#5B1018]">GN 2/1 Jumbo</td>
                  <td className="py-2.5 px-3">650 × 530 mm</td>
                  <td className="py-2.5 px-3">65, 100, 150, 200 mm</td>
                  <td className="py-2.5 px-3">19.0 L – 58.0 L</td>
                  <td className="py-2.5 px-3">2/1 GN Lid</td>
                  <td className="py-2.5 pl-3 text-right font-sans text-[#4D423E]">Combi Trolleys & Bulk Banquet Chilling</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[#5B1018]">GN 1/1 Full</td>
                  <td className="py-2.5 px-3">530 × 325 mm</td>
                  <td className="py-2.5 px-3">65, 100, 150, 200 mm</td>
                  <td className="py-2.5 px-3">9.5 L – 28.0 L</td>
                  <td className="py-2.5 px-3">1/1 GN Lid</td>
                  <td className="py-2.5 pl-3 text-right font-sans text-[#4D423E]">Steam Tables, Chafing Dishes, Combi Steamers</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[#5B1018]">GN 1/2 Half</td>
                  <td className="py-2.5 px-3">325 × 265 mm</td>
                  <td className="py-2.5 px-3">65, 100, 150, 200 mm</td>
                  <td className="py-2.5 px-3">4.0 L – 12.5 L</td>
                  <td className="py-2.5 px-3">1/2 GN Lid</td>
                  <td className="py-2.5 pl-3 text-right font-sans text-[#4D423E]">Buffet Wells, Bain-Maries, Sandwich Tables</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[#5B1018]">GN 1/3 Third</td>
                  <td className="py-2.5 px-3">325 × 176 mm</td>
                  <td className="py-2.5 px-3">65, 100, 150, 200 mm</td>
                  <td className="py-2.5 px-3">2.5 L – 7.8 L</td>
                  <td className="py-2.5 px-3">1/3 GN Lid</td>
                  <td className="py-2.5 pl-3 text-right font-sans text-[#4D423E]">Salad Counters, Sauces, Pasta Rails</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[#5B1018]">GN 1/4 Quarter</td>
                  <td className="py-2.5 px-3">265 × 162 mm</td>
                  <td className="py-2.5 px-3">65, 100, 150, 200 mm</td>
                  <td className="py-2.5 px-3">1.7 L – 5.5 L</td>
                  <td className="py-2.5 px-3">1/4 GN Lid</td>
                  <td className="py-2.5 pl-3 text-right font-sans text-[#4D423E]">Burger Prep Stations, Condiments</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[#5B1018]">GN 1/6 Sixth</td>
                  <td className="py-2.5 px-3">176 × 162 mm</td>
                  <td className="py-2.5 px-3">65, 100, 150, 200 mm</td>
                  <td className="py-2.5 px-3">1.0 L – 3.4 L</td>
                  <td className="py-2.5 px-3">1/6 GN Lid</td>
                  <td className="py-2.5 pl-3 text-right font-sans text-[#4D423E]">Pizza Toppings, Salad Rails, Taco Stations</td>
                </tr>
                <tr>
                  <td className="py-2.5 pr-4 font-bold text-[#5B1018]">GN 1/9 Ninth</td>
                  <td className="py-2.5 px-3">176 × 108 mm</td>
                  <td className="py-2.5 px-3">65, 100, 150 mm</td>
                  <td className="py-2.5 px-3">0.6 L – 1.5 L</td>
                  <td className="py-2.5 px-3">1/9 GN Lid</td>
                  <td className="py-2.5 pl-3 text-right font-sans text-[#4D423E]">Seeds, Spices, Bar Garnishes, Ice Cream Sprinkles</td>
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
  onSelect: () => void;
}

const GnPanCard: React.FC<GnPanCardProps> = ({
  product,
  onSelect,
}) => {
  const { openImageEditModal, isAdmin } = useContent();
  const [selectedVariantIndex] = useState<number>(0);
  const variants = product.variants || [];
  const currentVariant = variants[selectedVariantIndex];

  return (
    <div className="rounded-sm border flex flex-col transition-all duration-200 overflow-hidden group bg-[#FAF4EE] border-[#D8BFA8] hover:border-[#5B1018] shadow-xs hover:shadow-md">
      {/* Product Image */}
      <ProductCardImage
        product={product}
        onSelect={onSelect}
        heightClass="h-72 sm:h-80"
        imageFit="contain"
        customModelCode={currentVariant ? currentVariant.modelCode || product.model : product.model}
        subcategoryBadge={product.subcategory || 'EN-631'}
      />

      {/* Body Content */}
      <div className="p-3.5 flex-1 flex flex-col justify-between">
        <div>
          <h3
            onClick={onSelect}
            className="font-tech font-black text-sm sm:text-base uppercase tracking-tight line-clamp-1 mb-1.5 cursor-pointer hover:text-[#5B1018] transition-colors text-[#292321]"
            title={product.name}
          >
            {product.name}
          </h3>

          <div className="flex flex-wrap items-center gap-1.5 mb-3">
            <span className="text-[10px] font-mono font-bold uppercase px-2 py-0.5 rounded bg-[#5B1018]/10 border border-[#5B1018]/25 text-[#5B1018]">
              {product.model}
            </span>
            {variants.length > 0 && (
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-[#E9D9C8] text-[#4D423E] tabular-nums">
                {variants.length} Depths Available
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

        {/* Card Footer: View Specs + Admin Upload */}
        <div className="pt-2 flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={onSelect}
            className="flex-1 py-2 px-2.5 rounded-sm font-tech text-xs font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 bg-[#292321] hover:bg-[#5B1018] text-[#F3E7DA] shadow-xs"
          >
            <Maximize2 className="w-3.5 h-3.5" />
            <span>SPECS</span>
          </button>
          {isAdmin && (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                openImageEditModal(product);
              }}
              className="py-2 px-3 rounded-sm font-tech text-xs font-black uppercase tracking-wider bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] shadow-sm flex items-center justify-center gap-1.5 transition-all hover:scale-102 active:scale-98"
              title="Upload image and save to catalogue"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>UPLOAD / SAVE</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
