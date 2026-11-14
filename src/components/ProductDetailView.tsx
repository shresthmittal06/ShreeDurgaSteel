import React from 'react';
import { useContent } from '../context/ContentContext';
import { ProductItem, ProductSizeVariant } from '../types';
import {
  ArrowLeft,
  MessageSquare,
  FileDown,
  CheckCircle,
  Building,
  ArrowRight,
  ShieldCheck,
  Zap,
  Clock,
  Flame,
  FileText,
  Download,
  ExternalLink,
  Sliders,
  Upload,
  Mail,
  Phone,
  Share2,
  Copy,
  Check,
  Star,
  Trash2,
  AlertTriangle,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  Move,
  RotateCcw,
  X,
  Eye,
  Camera,
  Plus,
  Package,
} from 'lucide-react';

interface ProductDetailViewProps {
  product: ProductItem;
  onBack: () => void;
}

export const ProductDetailView: React.FC<ProductDetailViewProps> = ({ product, onBack }) => {
  const {
    brand,
    products,
    openQuoteModal,
    setSelectedProductForDetail,
    setCatalogueModalOpen,
    themeMode,
    openAdminModalForProduct,
    deleteProduct,
    toggleProductFeatured,
    openImageEditModal,
    isAdmin,
    goBack,
    previousPageTitle,
  } = useContent();

  const isLight = themeMode === 'light';

  const [activeImage, setActiveImage] = React.useState(
    product.mainImage || (product.galleryImages && product.galleryImages[0]) || ''
  );
  const [showDeleteModal, setShowDeleteModal] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3200);
  };

  // Active variant state for multi-size products
  const [selectedVariantId, setSelectedVariantId] = React.useState<string | null>(
    product.variants && product.variants.length > 0 ? product.variants[0].id : null
  );

  // Sync active image & selected variant if product changes and scroll to top
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setActiveImage(product.mainImage || (product.galleryImages && product.galleryImages[0]) || '');
    setSelectedVariantId(
      product.variants && product.variants.length > 0 ? product.variants[0].id : null
    );
  }, [product]);

  // Zoom inspection states
  const [isHoverZooming, setIsHoverZooming] = React.useState(false);
  const [zoomCoords, setZoomCoords] = React.useState({ x: 50, y: 50 });
  const [isZoomModalOpen, setIsZoomModalOpen] = React.useState(false);
  const [modalZoomScale, setModalZoomScale] = React.useState(1.5);
  const [modalPan, setModalPan] = React.useState({ x: 0, y: 0 });
  const [isDraggingModal, setIsDraggingModal] = React.useState(false);
  const [dragStart, setDragStart] = React.useState({ x: 0, y: 0 });

  // Keyboard and body scroll lock for zoom modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZoomModalOpen(false);
      }
    };
    if (isZoomModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setModalZoomScale(1.5);
      setModalPan({ x: 0, y: 0 });
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isZoomModalOpen]);

  const activeVariant = product.variants?.find((v) => v.id === selectedVariantId) || product.variants?.[0];

  const getAngleLabel = (imgUrl: string, index: number) => {
    if (imgUrl.includes('straight_front')) return 'Front View';
    if (imgUrl.includes('front')) return 'Front 3/4 Angle';
    if (imgUrl.includes('side')) return 'Side View';
    if (imgUrl.includes('top')) return 'Top View';
    if (imgUrl.includes('detail')) return 'Control Panel';
    if (imgUrl.includes('overview')) return 'All Angles Specs';
    return `Angle ${index + 1}`;
  };

  // Related products from the same category, excluding current
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const generateWhatsAppUrl = (customVariant?: ProductSizeVariant) => {
    const targetVar = customVariant || activeVariant;
    const varText = targetVar
      ? ` (Size: ${targetVar.sizeName}${targetVar.dimensions ? ` - ${targetVar.dimensions}` : ''})`
      : '';
    const text = `Hello ${brand.brandName}, I am interested in your equipment: ${product.name}${varText} (Model: ${targetVar?.modelCode || product.model}). Please share the latest specifications and B2B quotation.`;
    return `https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  };

  const handleDownloadDoc = (doc: {
    title: string;
    fileData?: string;
    url?: string;
    fileName?: string;
  }) => {
    if (doc.fileData) {
      const link = document.createElement('a');
      link.href = doc.fileData;
      link.download = doc.fileName || `${product.model}_${doc.title.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (doc.url) {
      window.open(doc.url, '_blank');
    } else {
      setCatalogueModalOpen(true);
    }
  };

  const specs = product.specifications;

  const [copiedToast, setCopiedToast] = React.useState(false);

  const handleShareProduct = async () => {
    const shareData = {
      title: `${product.name} | ${brand.brandName}`,
      text: `${product.shortDescription} - Model: ${product.model}`,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
        return;
      } catch {
        // user cancelled or fallback
      }
    }

    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedToast(true);
      setTimeout(() => setCopiedToast(false), 3000);
    } catch {
      // fallback
    }
  };

  const getEmailEnquiryUrl = () => {
    const subject = encodeURIComponent(`B2B Quotation Request: ${product.name} [Model: ${product.model}]`);
    const body = encodeURIComponent(
      `Hello ${brand.brandName} Sales Team,\n\nI would like to request a commercial quotation and specification sheet for:\n- Product: ${product.name}\n- Model: ${product.model}\n- Category: ${product.category}\n${activeVariant ? `- Selected Variant / Size: ${activeVariant.sizeName} (${activeVariant.dimensions || ''})\n` : ''}\nPlease let us know the B2B price, delivery timeframe, and packing specifications.`
    );
    return `mailto:${brand.email}?subject=${subject}&body=${body}`;
  };

  return (
    <div
      id="product-detail-view"
      className={`py-12 transition-colors duration-300 min-h-screen ${
        isLight ? 'bg-[#f8fafc] text-slate-800' : 'bg-[#0b0d10] text-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation Bar */}
        <div
          className={`mb-8 flex items-center justify-between pb-4 border-b ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}
        >
          <button
            id="back-to-catalogue-btn"
            type="button"
            onClick={goBack}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-sm text-xs font-tech font-bold uppercase tracking-wider transition-all border group ${
              isLight
                ? 'bg-slate-900 text-white hover:bg-amber-500 hover:text-slate-950 border-slate-900 shadow-xs'
                : 'bg-amber-500 text-slate-950 hover:bg-amber-400 border-amber-500 font-black shadow-xs'
            }`}
            title={`Go back to ${previousPageTitle || 'previous view'}`}
          >
            <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-0.5" />
            <span>BACK TO {previousPageTitle ? previousPageTitle.toUpperCase() : 'ALL EQUIPMENT'}</span>
          </button>

          <div className="flex items-center gap-2.5">
            {/* 1. STARTING OPTION: GET A QUOTE */}
            <button
              type="button"
              onClick={() => openQuoteModal(product.name, product.model, product.division)}
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-sm text-xs font-tech font-black uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md transition-all hover:scale-105 active:scale-95"
              title="Request commercial quotation for this model"
            >
              <FileText className="w-3.5 h-3.5" />
              <span>GET A QUOTE</span>
            </button>

            <div
              className={`text-xs font-tech uppercase tracking-widest hidden sm:block ${
                isLight ? 'text-slate-500 font-semibold' : 'text-zinc-500'
              }`}
            >
              {product.category.toUpperCase()} • MODEL: {product.model}
            </div>

            {/* Feature on Homepage Toggle */}
            <button
              type="button"
              onClick={() => {
                toggleProductFeatured(product.id);
                showToast(
                  product.isFeatured
                    ? `Removed "${product.name}" from homepage featured`
                    : `⭐ Marked "${product.name}" as featured on homepage!`
                );
              }}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-sm border transition-all ${
                product.isFeatured
                  ? 'bg-amber-400 text-black border-amber-400 shadow-xs'
                  : isLight
                  ? 'bg-white border-slate-300 text-slate-700 hover:border-amber-400 hover:text-amber-700 shadow-xs'
                  : 'bg-zinc-900 border-white/20 text-zinc-300 hover:border-amber-400 hover:text-amber-300'
              }`}
              title={product.isFeatured ? 'Currently featured on homepage (Click to unfeature)' : 'Click to feature on homepage'}
            >
              <Star className={`w-3.5 h-3.5 ${product.isFeatured ? 'fill-black text-black' : 'text-amber-500'}`} />
              <span>{product.isFeatured ? 'FEATURED ON HOMEPAGE' : 'FEATURE ON HOMEPAGE'}</span>
            </button>

            {/* Admin Management Actions - ADMIN ONLY */}
            {isAdmin && (
              <>
                {/* Edit in CMS */}
                <button
                  type="button"
                  onClick={() => openAdminModalForProduct(product.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-sm border transition-colors ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-700 hover:text-slate-950 hover:border-slate-400 shadow-xs'
                      : 'bg-zinc-900 border-white/20 text-zinc-300 hover:text-white hover:border-white/40'
                  }`}
                  title="Edit sizes, specifications, description & images in CMS"
                >
                  <Sliders className="w-3.5 h-3.5 text-amber-500" />
                  <span>EDIT IN CMS</span>
                </button>

                {/* Add / Edit Images Button */}
                <button
                  type="button"
                  onClick={() => openImageEditModal(product)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-950 transition-colors shadow-sm"
                  title="Upload or change product photos and angles"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>ADD / EDIT IMAGES</span>
                </button>

                {/* Remove Product */}
                <button
                  type="button"
                  onClick={() => setShowDeleteModal(true)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-sm border border-rose-500/30 text-rose-600 dark:text-rose-400 bg-rose-500/10 hover:bg-rose-600 hover:text-white transition-colors"
                  title="Remove this product from the equipment catalogue"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>REMOVE PRODUCT</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* 13. PRODUCT HERO - EXPANDED SPACE FOR IMAGE VIEWER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">
          {/* Left Side: Large Product Visual & Thumbnail Gallery (8 Cols for maximum image size) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Main Interactive Zoomable Image Preview */}
            <div
              className={`rounded-sm overflow-hidden h-[500px] sm:h-[620px] relative flex items-center justify-center border shadow-sm ${
                activeImage ? 'cursor-crosshair group' : ''
              } ${
                isLight ? 'bg-white border-slate-200' : 'bg-zinc-900 border-white/15'
              }`}
              onMouseEnter={() => {
                if (activeImage) setIsHoverZooming(true);
              }}
              onMouseLeave={() => setIsHoverZooming(false)}
              onMouseMove={(e) => {
                if (!activeImage) return;
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.max(0, Math.min(100, ((e.clientX - rect.left) / rect.width) * 100));
                const y = Math.max(0, Math.min(100, ((e.clientY - rect.top) / rect.height) * 100));
                setZoomCoords({ x, y });
              }}
              onClick={() => {
                if (activeImage) setIsZoomModalOpen(true);
              }}
            >
              {!activeImage ? (
                isAdmin ? (
                  <div
                    onClick={() => openImageEditModal(product)}
                    className="w-full h-full flex flex-col items-center justify-center p-8 text-center cursor-pointer hover:bg-amber-500/5 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-full bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-3">
                      <Upload className="w-8 h-8" />
                    </div>
                    <h4 className="font-tech text-base font-bold uppercase tracking-tight text-slate-950 dark:text-white">
                      No Product Image Added Yet
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mt-1 mb-4">
                      Upload your custom equipment photos from your computer or phone to inspect this product with high-resolution zoom and multi-angle views.
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openImageEditModal(product);
                      }}
                      className="px-4 py-2 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech text-xs font-black uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <Camera className="w-4 h-4" />
                      <span>Upload / Add Images</span>
                    </button>
                  </div>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center">
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${
                      isLight ? 'bg-slate-200 text-slate-500' : 'bg-zinc-800 text-zinc-400'
                    }`}>
                      <Package className="w-8 h-8" />
                    </div>
                    <h4 className="font-tech text-base font-bold uppercase tracking-tight text-slate-950 dark:text-white">
                      {product.name} (Model: {product.model})
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-zinc-400 max-w-sm mt-1 mb-4">
                      Official engineering CAD drawings, technical certifications, and factory dimensions available on request.
                    </p>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        openQuoteModal(product.name, product.model, product.division);
                      }}
                      className="px-4 py-2 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech text-xs font-black uppercase tracking-wider shadow-sm transition-all flex items-center gap-1.5"
                    >
                      <FileText className="w-4 h-4" />
                      <span>Request Factory Specs & Quote</span>
                    </button>
                  </div>
                )
              ) : (
                <>
                  <img
                    src={activeImage}
                    alt={`${product.name} - Model ${product.model}`}
                    style={{
                      transformOrigin: `${zoomCoords.x}% ${zoomCoords.y}%`,
                      transform: isHoverZooming ? 'scale(2.3)' : 'scale(1)',
                    }}
                    className="w-full h-full object-contain p-4 object-center transition-transform duration-75 ease-out select-none"
                    referrerPolicy="no-referrer"
                  />

                  {/* Model & Angle Badges */}
                  <div className="absolute top-4 left-4 flex flex-wrap gap-2 z-10 pointer-events-none">
                    <span
                      className={`text-[11px] font-tech font-bold tracking-wider uppercase px-3 py-1 rounded-sm shadow-sm ${
                        isLight ? 'bg-slate-950 text-white' : 'bg-black/80 backdrop-blur-md text-white border border-white/15'
                      }`}
                    >
                      MODEL: {product.model}
                    </span>
                    <span className="text-[11px] font-tech font-bold tracking-wider uppercase px-2.5 py-1 rounded-sm shadow-sm bg-amber-500 text-slate-950">
                      {getAngleLabel(activeImage, 0)}
                    </span>
                  </div>

                  {/* Top-Right: Zoom & Edit Buttons */}
                  <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                    {/* Edit Photo - ADMIN ONLY */}
                    {isAdmin && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          openImageEditModal(product);
                        }}
                        className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-950 text-[11px] font-tech font-bold uppercase tracking-wider shadow-md transition-all border border-amber-400"
                        title="Edit or add images"
                      >
                        <Camera className="w-3.5 h-3.5" />
                        <span>Edit Photo</span>
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsZoomModalOpen(true);
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-slate-950/90 hover:bg-slate-950 text-white text-[11px] font-tech font-bold uppercase tracking-wider shadow-md backdrop-blur-xs transition-all hover:scale-105 border border-white/20"
                    >
                      <ZoomIn className="w-3.5 h-3.5 text-amber-400" />
                      <span>Inspect Zoom & Specs</span>
                    </button>
                  </div>

                  {/* Bottom Hint Banner */}
                  <div className="absolute bottom-3 inset-x-0 flex justify-center pointer-events-none z-10">
                    <span className="text-[10px] font-tech font-medium uppercase tracking-wider px-3 py-1 rounded-full bg-black/75 text-white/90 backdrop-blur-xs shadow-md">
                      {isHoverZooming ? 'Magnifying details (2.3x) • Click for Fullscreen' : 'Hover to magnify • Click to open Fullscreen Zoom with Specs'}
                    </span>
                  </div>
                </>
              )}
            </div>

            {/* Gallery Thumbnails & Add Angle Button */}
            <div className="flex gap-3 overflow-x-auto pb-2 items-center">
              {product.galleryImages &&
                product.galleryImages
                  .filter((img) => Boolean(img && img.trim()))
                  .map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImage(img)}
                      className={`relative h-20 w-24 shrink-0 rounded-sm overflow-hidden border transition-all ${
                        activeImage === img
                          ? isLight
                            ? 'border-slate-900 ring-2 ring-slate-900 opacity-100'
                            : 'border-white opacity-100 ring-1 ring-white'
                          : isLight
                          ? 'border-slate-300 opacity-70 hover:opacity-100'
                          : 'border-white/15 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={getAngleLabel(img, idx)}
                        className="w-full h-full object-contain p-1 bg-white object-center"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[8px] font-tech font-semibold text-white text-center py-0.5 px-0.5 truncate backdrop-blur-xs">
                        {getAngleLabel(img, idx)}
                      </div>
                    </button>
                  ))}

              {/* Add Angle Button - ADMIN ONLY */}
              {isAdmin && (
                <button
                  type="button"
                  onClick={() => openImageEditModal(product)}
                  className={`h-20 w-24 shrink-0 rounded-sm border-2 border-dashed flex flex-col items-center justify-center p-2 text-center transition-colors ${
                    isLight
                      ? 'border-slate-300 hover:border-amber-500 bg-slate-50 hover:bg-amber-500/10 text-slate-600'
                      : 'border-white/20 hover:border-amber-400 bg-zinc-900 hover:bg-zinc-800 text-zinc-400'
                  }`}
                  title="Add another angle or photo for this product"
                >
                  <Plus className="w-4 h-4 text-amber-500 mb-1" />
                  <span className="text-[9px] font-tech font-bold uppercase tracking-wider">
                    + Add Angle
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Right Side: Product Identity & B2B CTAs (Compact 4-column layout) */}
          <div className="lg:col-span-4 flex flex-col justify-between">
            <div>
              <div
                className={`text-[11px] font-tech uppercase tracking-[0.25em] mb-2 font-semibold ${
                  isLight ? 'text-amber-700' : 'text-zinc-400'
                }`}
              >
                COMMERCIAL {product.subcategory || product.category.toUpperCase()}
              </div>
              {/* Division Badge & Product Code */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={`text-[10px] font-tech font-bold uppercase tracking-wider px-2.5 py-0.5 rounded ${
                    product.division === 'commercial'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                      : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}
                >
                  {product.division === 'commercial'
                    ? 'Commercial Trading & Appliances'
                    : 'Shree Durga Steels In-House Manufacturing'}
                </span>
                <span className="text-xs font-mono font-semibold text-slate-400">
                  {product.productCode}
                </span>
              </div>

              <h1
                className={`text-3xl sm:text-4xl font-extrabold uppercase tracking-tight leading-tight mb-2 ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                {product.name}
              </h1>

              <div className="flex flex-wrap items-center gap-2 mb-4">
                {(activeVariant?.modelCode || product.model) && (
                  <div
                    className={`font-tech text-xs font-semibold px-2.5 py-1 rounded-sm border ${
                      isLight
                        ? 'bg-slate-100 border-slate-300 text-slate-900'
                        : 'bg-white/5 border-white/10 text-zinc-300'
                    }`}
                  >
                    MODEL / CODE: {activeVariant?.modelCode || product.model}
                  </div>
                )}
                {product.variants && product.variants.length > 0 ? (
                  <div
                    className={`font-tech text-xs font-semibold px-2.5 py-1 rounded-sm border ${
                      isLight
                        ? 'bg-amber-50 border-amber-300 text-amber-900'
                        : 'bg-amber-950/40 border-amber-800 text-amber-300'
                    }`}
                  >
                    {product.variants.length} FACTORY SIZES AVAILABLE
                  </div>
                ) : product.variantOrSize ? (
                  <div
                    className={`font-tech text-xs font-semibold px-2.5 py-1 rounded-sm border ${
                      isLight
                        ? 'bg-amber-50 border-amber-200 text-amber-900'
                        : 'bg-amber-950/30 border-amber-800 text-amber-300'
                    }`}
                  >
                    SIZE / VARIANT: {product.variantOrSize}
                  </div>
                ) : null}
              </div>

              {/* Multi-Size Variant Selector Pills */}
              {product.variants && product.variants.length > 0 && (
                <div className="mb-5 p-3 rounded-sm border border-amber-500/30 bg-amber-500/[0.04]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-tech uppercase font-bold text-amber-700 dark:text-amber-400 tracking-wider">
                      SELECT SIZE / CONFIGURATION ({product.variants.length} Sizes)
                    </span>
                    <button
                      type="button"
                      onClick={() => openAdminModalForProduct(product.id)}
                      className="text-[10px] font-tech text-slate-500 hover:text-amber-600 dark:hover:text-amber-300 underline"
                    >
                      Edit Sizes in CMS
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-1.5 max-h-48 overflow-y-auto pr-1">
                    {product.variants.map((v) => {
                      const isSelected = v.id === (activeVariant?.id || selectedVariantId);
                      return (
                        <button
                          key={v.id}
                          type="button"
                          onClick={() => setSelectedVariantId(v.id)}
                          className={`px-3 py-1.5 text-xs font-tech rounded-sm border transition-all text-left flex items-center gap-2 ${
                            isSelected
                              ? isLight
                                ? 'bg-slate-950 text-white border-slate-950 shadow-sm'
                                : 'bg-white text-zinc-950 border-white shadow-md'
                              : isLight
                              ? 'bg-white border-slate-300 text-slate-800 hover:border-slate-400'
                              : 'bg-zinc-900 border-white/10 text-zinc-300 hover:border-white/30'
                          }`}
                        >
                          <span className="font-semibold">{v.sizeName}</span>
                        </button>
                      );
                    })}
                  </div>
                  {activeVariant && (
                    <div className="mt-2 pt-2 border-t border-amber-500/20 text-[11px] font-tech text-slate-600 dark:text-zinc-400 flex flex-wrap gap-x-4 gap-y-1">
                      {activeVariant.dimensions && (
                        <span>
                          <strong>Dimensions:</strong> {activeVariant.dimensions}
                        </span>
                      )}
                      {activeVariant.depth && (
                        <span>
                          <strong>Depth:</strong> {activeVariant.depth}
                        </span>
                      )}
                      {activeVariant.weight && (
                        <span>
                          <strong>Weight:</strong> {activeVariant.weight}
                        </span>
                      )}
                      {activeVariant.modelCode && (
                        <span>
                          <strong>Code:</strong> {activeVariant.modelCode}
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Flagged Note (e.g. verified weight clarification) */}
              {product.flaggedNote && (
                <div className="p-3 rounded-sm mb-5 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 text-xs font-tech">
                  <span className="font-bold block mb-0.5">Note:</span>
                  {product.flaggedNote}
                </div>
              )}

              <p
                className={`text-sm leading-relaxed font-normal mb-6 ${
                  isLight ? 'text-slate-600' : 'text-zinc-300'
                }`}
              >
                {product.shortDescription}
              </p>

              {/* Quick Specs Highlight Box */}
              <div
                className={`p-4 rounded-sm mb-6 space-y-2 font-tech text-xs border ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                    : 'bg-zinc-900/60 border-white/10 text-zinc-200'
                }`}
              >
                {specs.power && (
                  <div
                    className={`flex justify-between py-1 border-b ${
                      isLight ? 'border-slate-100' : 'border-white/5'
                    }`}
                  >
                    <span className={isLight ? 'text-slate-500' : 'text-zinc-400'}>Power Rating:</span>
                    <span className={`font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                      {specs.power}
                    </span>
                  </div>
                )}
                {specs.temperatureRange && (
                  <div
                    className={`flex justify-between py-1 border-b ${
                      isLight ? 'border-slate-100' : 'border-white/5'
                    }`}
                  >
                    <span className={isLight ? 'text-slate-500' : 'text-zinc-400'}>Temperature:</span>
                    <span className={`font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                      {specs.temperatureRange}
                    </span>
                  </div>
                )}
                {(activeVariant?.dimensions || specs.dimensions) && (
                  <div
                    className={`flex justify-between py-1 border-b ${
                      isLight ? 'border-slate-100' : 'border-white/5'
                    }`}
                  >
                    <span className={isLight ? 'text-slate-500' : 'text-zinc-400'}>Dimensions:</span>
                    <span className={`font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                      {activeVariant?.dimensions || specs.dimensions}
                    </span>
                  </div>
                )}
                {activeVariant?.depth && (
                  <div
                    className={`flex justify-between py-1 border-b ${
                      isLight ? 'border-slate-100' : 'border-white/5'
                    }`}
                  >
                    <span className={isLight ? 'text-slate-500' : 'text-zinc-400'}>Depth / Height:</span>
                    <span className={`font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                      {activeVariant.depth}
                    </span>
                  </div>
                )}
                {(activeVariant?.weight || specs.weight) && (
                  <div
                    className={`flex justify-between py-1 border-b ${
                      isLight ? 'border-slate-100' : 'border-white/5'
                    }`}
                  >
                    <span className={isLight ? 'text-slate-500' : 'text-zinc-400'}>Weight:</span>
                    <span className={`font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                      {activeVariant?.weight || specs.weight}
                    </span>
                  </div>
                )}
                {specs.material && (
                  <div
                    className={`flex justify-between py-1 ${
                      (activeVariant?.capacity || specs.capacity) ? `border-b ${isLight ? 'border-slate-100' : 'border-white/5'}` : ''
                    }`}
                  >
                    <span className={isLight ? 'text-slate-500' : 'text-zinc-400'}>Construction:</span>
                    <span className={`font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                      {specs.material}
                    </span>
                  </div>
                )}
                {(activeVariant?.capacity || specs.capacity) && (
                  <div className="flex justify-between py-1">
                    <span className={isLight ? 'text-slate-500' : 'text-zinc-400'}>Operating Capacity:</span>
                    <span className={`font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                      {activeVariant?.capacity || specs.capacity}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* B2B Action Buttons */}
            <div
              className={`space-y-3 pt-4 border-t ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}
            >
              {/* Primary Quote CTA */}
              <button
                onClick={() => openQuoteModal(product.name, product.model, product.division)}
                className={`w-full py-4 font-bold text-xs tracking-[0.2em] uppercase rounded-sm transition-colors flex items-center justify-center gap-2 active:scale-[0.99] shadow-md ${
                  isLight
                    ? 'bg-slate-950 text-white hover:bg-slate-800'
                    : 'bg-white text-zinc-950 hover:bg-zinc-200'
                }`}
              >
                <span>REQUEST A QUOTE</span>
              </button>

              {/* Primary Inquiries: WhatsApp & Email */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={generateWhatsAppUrl()}
                  target="_blank"
                  rel="noreferrer"
                  className={`py-3 px-3 text-xs font-tech font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-1.5 transition-colors border ${
                    isLight
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
                      : 'bg-zinc-900 border-emerald-500/40 text-emerald-400 hover:bg-zinc-800'
                  }`}
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>WHATSAPP ENQUIRY</span>
                </a>

                <a
                  href={getEmailEnquiryUrl()}
                  className={`py-3 px-3 text-xs font-tech font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-1.5 transition-colors border ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-800 hover:bg-slate-100'
                      : 'bg-zinc-900 border-white/20 text-zinc-200 hover:bg-zinc-800'
                  }`}
                >
                  <Mail className="w-4 h-4 text-amber-500" />
                  <span>EMAIL ENQUIRY</span>
                </a>
              </div>

              {/* Secondary Actions: Call Now & Share Product */}
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={`tel:${brand.phone.replace(/\s+/g, '')}`}
                  className={`py-2.5 px-3 text-xs font-tech font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-1.5 transition-colors border ${
                    isLight
                      ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                      : 'bg-zinc-900 border-white/15 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>CALL NOW</span>
                </a>

                <button
                  type="button"
                  onClick={handleShareProduct}
                  className={`py-2.5 px-3 text-xs font-tech font-bold tracking-wider uppercase rounded-sm flex items-center justify-center gap-1.5 transition-colors border ${
                    copiedToast
                      ? 'bg-emerald-600 border-emerald-600 text-white'
                      : isLight
                      ? 'bg-slate-100 border-slate-300 text-slate-800 hover:bg-slate-200'
                      : 'bg-zinc-900 border-white/15 text-zinc-300 hover:bg-zinc-800'
                  }`}
                >
                  {copiedToast ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>COPIED LINK</span>
                    </>
                  ) : (
                    <>
                      <Share2 className="w-3.5 h-3.5" />
                      <span>SHARE PRODUCT</span>
                    </>
                  )}
                </button>
              </div>

              {/* Download Spec Sheet Link */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => {
                    if (product.documents && product.documents.length > 0) {
                      handleDownloadDoc(product.documents[0]);
                    } else {
                      setCatalogueModalOpen(true);
                    }
                  }}
                  className={`inline-flex items-center gap-1.5 text-xs font-tech font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400 hover:underline`}
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download Spec Sheet PDF</span>
                </button>

                <span
                  className={`text-[10px] font-tech ${
                    isLight ? 'text-slate-400' : 'text-zinc-500'
                  }`}
                >
                  Factory OEM Available
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 13. PRODUCT OVERVIEW */}
        <div
          className={`py-12 border-t ${
            isLight ? 'border-slate-200' : 'border-white/10'
          }`}
        >
          <div className="max-w-3xl mb-8">
            <span
              className={`text-[11px] font-tech uppercase tracking-[0.25em] block mb-1 font-semibold ${
                isLight ? 'text-amber-700' : 'text-zinc-400'
              }`}
            >
              ENGINEERING PERSPECTIVE
            </span>
            <h2
              className={`text-2xl sm:text-3xl font-extrabold uppercase tracking-tight mb-4 ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              BUILT FOR PROFESSIONAL PERFORMANCE
            </h2>
            <p
              className={`text-sm sm:text-base leading-relaxed font-normal ${
                isLight ? 'text-slate-600' : 'text-zinc-300'
              }`}
            >
              {product.longDescription}
            </p>
          </div>

          {/* 13. KEY FEATURES */}
          <div className="mb-14">
            <h3
              className={`text-base font-bold uppercase tracking-wider mb-6 font-tech ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              KEY ARCHITECTURAL FEATURES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {product.keyFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className={`p-4 rounded-sm flex items-start gap-3 border ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                      : 'bg-zinc-900/40 border-white/10 text-zinc-200'
                  }`}
                >
                  <CheckCircle
                    className={`w-4 h-4 shrink-0 mt-0.5 ${
                      isLight ? 'text-amber-700' : 'text-zinc-300'
                    }`}
                  />
                  <span className="text-xs leading-relaxed font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* 13.5 SIZES & VARIANTS TABLE (For multi-size items like Barfi Trays, GN Pans, Masala Boxes) */}
          {product.variants && product.variants.length > 0 && (
            <div className="mb-14">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h3
                      className={`text-base font-bold uppercase tracking-wider font-tech ${
                        isLight ? 'text-slate-950' : 'text-white'
                      }`}
                    >
                      COMPLETE FACTORY SIZE MATRIX ({product.variants.length} SIZES)
                    </h3>
                    <span className="text-[10px] font-tech font-bold px-2 py-0.5 rounded bg-amber-500/20 text-amber-700 dark:text-amber-300">
                      Prime Stainless Steel
                    </span>
                  </div>
                  <p
                    className={`text-xs font-tech mt-1 ${
                      isLight ? 'text-slate-500' : 'text-zinc-400'
                    }`}
                  >
                    All sizes are manufactured under strict dimensional tolerances. Click any size row to select or request direct factory dispatch.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={() => openAdminModalForProduct(product.id)}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-sm border transition-colors shrink-0 ${
                    isLight
                      ? 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
                      : 'bg-zinc-900 border-amber-500/30 text-amber-300 hover:bg-zinc-800'
                  }`}
                >
                  <Sliders className="w-3.5 h-3.5 text-amber-500" />
                  <span>Edit Sizes in CMS</span>
                </button>
              </div>

              <div
                className={`overflow-x-auto rounded-sm border shadow-sm ${
                  isLight ? 'border-slate-200 bg-white' : 'border-white/15 bg-zinc-950'
                }`}
              >
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr
                      className={`font-tech uppercase tracking-wider border-b ${
                        isLight
                          ? 'bg-slate-100 border-slate-200 text-slate-700'
                          : 'bg-zinc-900 border-white/15 text-zinc-400'
                      }`}
                    >
                      <th className="py-3 px-4">#</th>
                      <th className="py-3 px-4">Size / Configuration</th>
                      <th className="py-3 px-4">Dimensions (L × W × H)</th>
                      <th className="py-3 px-4">Depth</th>
                      <th className="py-3 px-4">Capacity</th>
                      <th className="py-3 px-4">Weight</th>
                      <th className="py-3 px-4">Model Code</th>
                      <th className="py-3 px-4 text-center">Status</th>
                    </tr>
                  </thead>
                  <tbody
                    className={`divide-y font-tech ${
                      isLight ? 'divide-slate-200 text-slate-800' : 'divide-white/5 text-zinc-200'
                    }`}
                  >
                    {product.variants.map((v, index) => {
                      const isSelected = v.id === (activeVariant?.id || selectedVariantId);

                      return (
                        <tr
                          key={v.id}
                          className={`transition-colors cursor-pointer ${
                            isSelected
                              ? isLight
                                ? 'bg-amber-50/70 font-semibold'
                                : 'bg-amber-950/20 font-semibold'
                              : isLight
                              ? 'hover:bg-slate-50'
                              : 'hover:bg-white/[0.02]'
                          }`}
                          onClick={() => setSelectedVariantId(v.id)}
                        >
                          <td className="py-3 px-4 font-mono text-[11px] text-slate-400">
                            {String(index + 1).padStart(2, '0')}
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <span className={`font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                                {v.sizeName}
                              </span>
                              {isSelected && (
                                <span className="text-[9px] font-tech uppercase px-1.5 py-0.5 rounded bg-emerald-600 text-white font-bold">
                                  Selected
                                </span>
                              )}
                            </div>
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-700 dark:text-zinc-300">
                            {v.dimensions || '—'}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-700 dark:text-zinc-300">
                            {v.depth || '—'}
                          </td>
                          <td className="py-3 px-4 text-slate-700 dark:text-zinc-300">
                            {v.capacity || '—'}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-700 dark:text-zinc-300">
                            {v.weight || '—'}
                          </td>
                          <td className="py-3 px-4 font-mono text-slate-500 dark:text-zinc-400 text-[11px]">
                            {v.modelCode || '—'}
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="text-[10px] font-tech uppercase px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold">
                              Ready for Quote
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* 14. TECHNICAL SPECIFICATIONS TABLE */}
          <div className="mb-14">
            <div className="flex items-center justify-between mb-4">
              <h3
                className={`text-base font-bold uppercase tracking-wider font-tech ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                TECHNICAL SPECIFICATIONS & DIMENSIONS
              </h3>
              <span
                className={`text-[11px] font-tech ${
                  isLight ? 'text-slate-500 font-medium' : 'text-zinc-400'
                }`}
              >
                VERIFIED FACTORY RATINGS
              </span>
            </div>

            <div
              className={`overflow-x-auto rounded-sm border ${
                isLight ? 'border-slate-200 bg-white shadow-sm' : 'border-white/15 bg-zinc-950'
              }`}
            >
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr
                    className={`font-tech uppercase tracking-wider border-b ${
                      isLight
                        ? 'bg-slate-100 border-slate-200 text-slate-700'
                        : 'bg-zinc-900 border-white/15 text-zinc-400'
                    }`}
                  >
                    <th className="py-3 px-4 sm:px-6 w-1/3">Specification</th>
                    <th className="py-3 px-4 sm:px-6">Engineering Details</th>
                  </tr>
                </thead>
                <tbody
                  className={`divide-y font-tech ${
                    isLight ? 'divide-slate-200 text-slate-800' : 'divide-white/5 text-zinc-200'
                  }`}
                >
                  <tr className={isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'}>
                    <td className={`py-3 px-4 sm:px-6 ${isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'}`}>
                      Model Number
                    </td>
                    <td className={`py-3 px-4 sm:px-6 font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                      {specs.model}
                    </td>
                  </tr>

                  {specs.dimensions && (
                    <tr className={isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'}>
                      <td className={`py-3 px-4 sm:px-6 ${isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'}`}>
                        Dimensions (W × D × H)
                      </td>
                      <td className={`py-3 px-4 sm:px-6 font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                        {specs.dimensions}
                      </td>
                    </tr>
                  )}

                  {specs.weight && (
                    <tr className={isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'}>
                      <td className={`py-3 px-4 sm:px-6 ${isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'}`}>
                        Net Weight
                      </td>
                      <td className={`py-3 px-4 sm:px-6 font-bold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                        {specs.weight}
                      </td>
                    </tr>
                  )}

                  {specs.capacity && (
                    <tr className={isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'}>
                      <td className={`py-3 px-4 sm:px-6 ${isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'}`}>
                        Capacity
                      </td>
                      <td className="py-3 px-4 sm:px-6">{specs.capacity}</td>
                    </tr>
                  )}

                  {specs.power && (
                    <tr className={isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'}>
                      <td className={`py-3 px-4 sm:px-6 ${isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'}`}>
                        Power Rating
                      </td>
                      <td className={`py-3 px-4 sm:px-6 font-semibold ${isLight ? 'text-slate-950' : 'text-white'}`}>
                        {specs.power}
                      </td>
                    </tr>
                  )}

                  {specs.voltage && (
                    <tr className={isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'}>
                      <td className={`py-3 px-4 sm:px-6 ${isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'}`}>
                        Voltage / Frequency
                      </td>
                      <td className="py-3 px-4 sm:px-6">{specs.voltage}</td>
                    </tr>
                  )}

                  {specs.temperatureRange && (
                    <tr className={isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'}>
                      <td className={`py-3 px-4 sm:px-6 ${isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'}`}>
                        Temperature Range
                      </td>
                      <td className="py-3 px-4 sm:px-6">{specs.temperatureRange}</td>
                    </tr>
                  )}

                  {specs.material && (
                    <tr className={isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'}>
                      <td className={`py-3 px-4 sm:px-6 ${isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'}`}>
                        Material Grade
                      </td>
                      <td className="py-3 px-4 sm:px-6">{specs.material}</td>
                    </tr>
                  )}

                  {specs.cookingSurface && (
                    <tr className={isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'}>
                      <td className={`py-3 px-4 sm:px-6 ${isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'}`}>
                        Basket / Plate / Surface
                      </td>
                      <td className="py-3 px-4 sm:px-6">{specs.cookingSurface}</td>
                    </tr>
                  )}

                  {specs.additionalSpecs &&
                    specs.additionalSpecs.map((extra, i) => (
                      <tr key={i} className={isLight ? 'hover:bg-slate-50' : 'hover:bg-white/[0.02]'}>
                        <td className={`py-3 px-4 sm:px-6 ${isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'}`}>
                          {extra.label}
                        </td>
                        <td className="py-3 px-4 sm:px-6">{extra.value}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* DEDICATED TECHNICAL DOCUMENTS & DOWNLOADS SECTION */}
          <div className="mb-14">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
              <div>
                <h3
                  className={`text-base font-bold uppercase tracking-wider font-tech ${
                    isLight ? 'text-slate-950' : 'text-white'
                  }`}
                >
                  SPECIFICATION SHEETS & PRODUCT DOCUMENTS
                </h3>
                <p
                  className={`text-xs mt-1 ${
                    isLight ? 'text-slate-500' : 'text-zinc-400'
                  }`}
                >
                  Official engineering drawings, technical cut-sheets, and operating manuals.
                </p>
              </div>

              <button
                type="button"
                onClick={() => openAdminModalForProduct(product.id)}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-sm border transition-colors self-start sm:self-auto ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-700 hover:text-slate-950 hover:border-slate-400 shadow-sm'
                    : 'bg-zinc-900 border-white/20 text-zinc-300 hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5 text-amber-500" />
                <span>Upload / Attach Spec Sheet</span>
              </button>
            </div>

            {product.documents && product.documents.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {product.documents.map((doc, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-sm border flex items-center justify-between gap-3 transition-colors ${
                      isLight
                        ? 'bg-white border-slate-200 hover:border-slate-400 shadow-sm'
                        : 'bg-zinc-900/60 border-white/10 hover:border-white/25'
                    }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      <div
                        className={`w-10 h-10 rounded shrink-0 flex items-center justify-center font-bold text-xs font-tech ${
                          isLight ? 'bg-amber-100 text-amber-900' : 'bg-white/10 text-white'
                        }`}
                      >
                        <FileText className="w-5 h-5" />
                      </div>
                      <div className="overflow-hidden">
                        <div
                          className={`text-xs font-bold uppercase font-tech truncate ${
                            isLight ? 'text-slate-900' : 'text-white'
                          }`}
                          title={doc.title}
                        >
                          {doc.title}
                        </div>
                        <div
                          className={`text-[10px] font-tech ${
                            isLight ? 'text-slate-500' : 'text-zinc-400'
                          }`}
                        >
                          {doc.type.toUpperCase()} {doc.size ? `• ${doc.size}` : ''}
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownloadDoc(doc)}
                      className={`p-2 rounded-sm border transition-colors shrink-0 ${
                        isLight
                          ? 'border-slate-300 text-slate-800 hover:bg-slate-100 hover:text-slate-950'
                          : 'border-white/15 text-zinc-200 hover:bg-white/10 hover:text-white'
                      }`}
                      title="Download Document"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div
                className={`p-6 rounded-sm border flex flex-col sm:flex-row items-center justify-between gap-4 ${
                  isLight
                    ? 'bg-white border-slate-200 text-slate-700 shadow-sm'
                    : 'bg-zinc-900/40 border-white/10 text-zinc-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FileDown className="w-6 h-6 text-amber-600 shrink-0" />
                  <div>
                    <h4
                      className={`text-xs font-bold uppercase font-tech ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      DOWNLOAD {product.model} TECHNICAL SPEC SHEET
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Request the full CAD schematics, installation guidelines, and circuit diagrams.
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setCatalogueModalOpen(true)}
                  className={`px-4 py-2 text-xs font-tech font-bold uppercase tracking-wider rounded-sm transition-colors shrink-0 ${
                    isLight
                      ? 'bg-slate-950 text-white hover:bg-slate-800'
                      : 'bg-white text-zinc-950 hover:bg-zinc-200'
                  }`}
                >
                  DOWNLOAD SPEC SHEET
                </button>
              </div>
            )}
          </div>

          {/* 15. PRODUCT APPLICATIONS: IDEAL FOR */}
          <div className="mb-14">
            <h3
              className={`text-base font-bold uppercase tracking-wider mb-6 font-tech ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              IDEAL FOR
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {product.applications.map((app, idx) => (
                <div
                  key={idx}
                  className={`p-3.5 rounded-sm text-center flex flex-col items-center justify-center gap-2 border transition-colors ${
                    isLight
                      ? 'bg-white border-slate-200 hover:border-slate-400 text-slate-800 shadow-sm'
                      : 'bg-zinc-900/50 border-white/10 hover:border-white/25 text-zinc-200'
                  }`}
                >
                  <Building
                    className={`w-4 h-4 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`}
                  />
                  <span className="text-[11px] font-bold uppercase tracking-wider font-tech">
                    {app}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* 16. RELATED PRODUCTS: YOU MAY ALSO NEED */}
          {relatedProducts.length > 0 && (
            <div
              className={`pt-12 border-t ${
                isLight ? 'border-slate-200' : 'border-white/10'
              }`}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span
                    className={`text-[10px] font-tech uppercase tracking-[0.2em] block mb-1 font-semibold ${
                      isLight ? 'text-amber-700' : 'text-zinc-400'
                    }`}
                  >
                    COMPLEMENTARY LINE
                  </span>
                  <h3
                    className={`text-xl font-extrabold uppercase tracking-tight ${
                      isLight ? 'text-slate-950' : 'text-white'
                    }`}
                  >
                    YOU MAY ALSO NEED
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => {
                      setSelectedProductForDetail(rel);
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`rounded-sm p-4 cursor-pointer transition-all group flex flex-col justify-between border ${
                      isLight
                        ? 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-lg'
                        : 'bg-zinc-900/40 border-white/10 hover:border-white/30'
                    }`}
                  >
                    <div
                      className={`h-40 overflow-hidden rounded-sm mb-3 flex items-center justify-center ${
                        isLight ? 'bg-slate-100' : 'bg-zinc-950'
                      }`}
                    >
                      {rel.mainImage ? (
                        <img
                          src={rel.mainImage}
                          alt={rel.name}
                          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center p-2 text-center text-slate-400 dark:text-zinc-500">
                          <Camera className="w-5 h-5 mb-1 opacity-60" />
                          <span className="text-[9px] font-tech uppercase">No Image</span>
                        </div>
                      )}
                    </div>
                    <div>
                      <span
                        className={`text-[10px] font-tech block mb-1 font-semibold ${
                          isLight ? 'text-slate-500' : 'text-zinc-400'
                        }`}
                      >
                        MODEL: {rel.model}
                      </span>
                      <h4
                        className={`text-xs font-bold uppercase tracking-tight line-clamp-1 ${
                          isLight
                            ? 'text-slate-950 group-hover:text-amber-800'
                            : 'text-white group-hover:text-zinc-300'
                        }`}
                      >
                        {rel.name}
                      </h4>
                      <p
                        className={`text-[11px] line-clamp-2 mt-1 ${
                          isLight ? 'text-slate-600' : 'text-zinc-400'
                        }`}
                      >
                        {rel.shortDescription}
                      </p>
                    </div>

                    <div
                      className={`mt-4 pt-3 border-t flex items-center justify-between text-[11px] font-tech font-bold uppercase ${
                        isLight
                          ? 'border-slate-100 text-slate-950'
                          : 'border-white/5 text-white'
                      }`}
                    >
                      <span>VIEW MODEL</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 2. LAST OPTION: DEDICATED GET A QUOTE CARD AT THE END */}
          <div
            className={`mt-14 p-6 sm:p-8 rounded-sm border ${
              isLight
                ? 'bg-slate-900 text-white border-slate-800 shadow-xl'
                : 'bg-zinc-900 border-white/20 text-white shadow-2xl'
            }`}
          >
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <span className="text-amber-400 font-tech text-xs font-bold uppercase tracking-[0.2em] block">
                OFFICIAL B2B EQUIPMENT INQUIRY
              </span>
              <h3 className="text-xl sm:text-2xl font-black font-tech uppercase tracking-tight">
                Get a Quotation for {product.name}
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 max-w-xl mx-auto leading-relaxed">
                Direct factory pricing, custom specification options, volume tier discounts, and nationwide logistics dispatch across India.
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => openQuoteModal(product.name, product.model, product.division)}
                  className="px-6 py-3 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-black text-xs uppercase tracking-wider transition-all shadow-lg hover:scale-105 active:scale-95 flex items-center gap-2"
                >
                  <FileText className="w-4 h-4" />
                  <span>GET A QUOTE NOW</span>
                </button>
                <a
                  href={`https://wa.me/917017823423?text=${encodeURIComponent(
                    `Hello Shree Durga Steels, I would like to request an official quotation for: ${product.name} (Model: ${product.model}). Please send specifications and terms.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-5 py-3 rounded-sm bg-emerald-600 hover:bg-emerald-500 text-white font-tech font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>INQUIRE VIA WHATSAPP</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
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
                  Are you sure you want to delete <span className="font-bold text-white">{product.name}</span>? This item and its {product.variants?.length || 0} size variants will be completely removed from your catalogue.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
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
                  deleteProduct(product.id);
                  setShowDeleteModal(false);
                  onBack();
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
            <span>{toastMessage}</span>
          </div>
        </div>
      )}

      {/* Fullscreen Interactive Zoom & Specifications Lightbox Modal */}
      {isZoomModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-md flex flex-col animate-in fade-in duration-200">
          {/* Modal Header */}
          <div className="h-16 border-b border-white/10 px-4 sm:px-6 flex items-center justify-between bg-zinc-950/80 shrink-0">
            {/* Product Identity */}
            <div className="flex items-center gap-3">
              <span className="text-xs font-tech font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-amber-500 text-slate-950">
                {product.model}
              </span>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-white uppercase tracking-tight line-clamp-1">
                  {product.name}
                </h3>
                <span className="text-[11px] font-tech text-zinc-400">
                  {getAngleLabel(activeImage, 0)} • High-Resolution Inspection
                </span>
              </div>
            </div>

            {/* Zoom Controls Bar */}
            <div className="hidden md:flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-sm p-1">
              <button
                type="button"
                onClick={() => setModalZoomScale((prev) => Math.max(1, +(prev - 0.25).toFixed(2)))}
                className="p-1.5 rounded hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                title="Zoom Out"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-1 px-1">
                {[1, 1.5, 2, 3].map((lvl) => (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => {
                      setModalZoomScale(lvl);
                      setModalPan({ x: 0, y: 0 });
                    }}
                    className={`px-2 py-0.5 text-[11px] font-tech font-bold rounded transition-colors ${
                      modalZoomScale === lvl
                        ? 'bg-amber-500 text-slate-950'
                        : 'text-zinc-400 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {lvl}x
                  </button>
                ))}
              </div>

              <button
                type="button"
                onClick={() => setModalZoomScale((prev) => Math.min(4, +(prev + 0.25).toFixed(2)))}
                className="p-1.5 rounded hover:bg-white/10 text-zinc-300 hover:text-white transition-colors"
                title="Zoom In"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setModalZoomScale(1);
                  setModalPan({ x: 0, y: 0 });
                }}
                className="p-1.5 rounded hover:bg-white/10 text-zinc-400 hover:text-white transition-colors ml-1 border-l border-white/10"
                title="Reset Zoom & Position"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>

            {/* Close Button */}
            <div className="flex items-center gap-3">
              <span className="hidden sm:inline-block text-[11px] font-tech text-zinc-500">
                Press [ESC] to Exit
              </span>
              <button
                type="button"
                onClick={() => setIsZoomModalOpen(false)}
                className="p-2 rounded-sm bg-white/10 hover:bg-white/20 text-white transition-colors"
                title="Close Zoom Viewer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Modal Main Content: Zoom Stage on Left, Specifications on Right */}
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            {/* Left: Interactive Canvas */}
            <div
              className={`flex-1 relative flex flex-col items-center justify-center p-4 overflow-hidden bg-zinc-950 ${
                modalZoomScale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'
              }`}
              onMouseDown={(e) => {
                if (modalZoomScale > 1) {
                  setIsDraggingModal(true);
                  setDragStart({ x: e.clientX - modalPan.x, y: e.clientY - modalPan.y });
                }
              }}
              onMouseMove={(e) => {
                if (isDraggingModal && modalZoomScale > 1) {
                  setModalPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
                }
              }}
              onMouseUp={() => setIsDraggingModal(false)}
              onMouseLeave={() => setIsDraggingModal(false)}
              onDoubleClick={() => {
                if (modalZoomScale === 1) {
                  setModalZoomScale(2);
                } else {
                  setModalZoomScale(1);
                  setModalPan({ x: 0, y: 0 });
                }
              }}
            >
              {/* Zoom Image Stage */}
              <div className="relative w-full h-full flex items-center justify-center">
                {activeImage ? (
                  <img
                    src={activeImage}
                    alt={product.name}
                    style={{
                      transform: `translate(${modalPan.x}px, ${modalPan.y}px) scale(${modalZoomScale})`,
                      transformOrigin: 'center center',
                      transition: isDraggingModal ? 'none' : 'transform 0.15s ease-out',
                    }}
                    className="max-w-[85%] max-h-[85%] object-contain select-none pointer-events-none drop-shadow-2xl"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="text-center p-6 text-zinc-500">
                    <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="font-tech text-sm uppercase">No image available to zoom</p>
                  </div>
                )}
              </div>

              {/* Angle Switcher Strip at Bottom */}
              {product.galleryImages && product.galleryImages.length > 1 && (
                <div className="absolute bottom-4 inset-x-4 flex justify-center pointer-events-auto z-20">
                  <div className="bg-zinc-900/90 border border-white/15 backdrop-blur-md rounded-sm p-2 flex gap-2 max-w-full overflow-x-auto">
                    {product.galleryImages
                      .filter((img) => Boolean(img && img.trim()))
                      .map((img, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setActiveImage(img);
                            setModalPan({ x: 0, y: 0 });
                          }}
                          className={`relative h-14 w-20 shrink-0 rounded overflow-hidden border transition-all ${
                            activeImage === img
                              ? 'border-amber-500 ring-2 ring-amber-500/50 opacity-100 scale-105'
                              : 'border-white/10 opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img
                            src={img}
                            alt={getAngleLabel(img, idx)}
                            className="w-full h-full object-contain p-0.5 bg-white object-center"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute bottom-0 inset-x-0 bg-black/80 text-[7px] font-tech text-white text-center py-0.5 px-0.5 truncate">
                            {getAngleLabel(img, idx)}
                          </div>
                        </button>
                      ))}
                  </div>
                </div>
              )}

              {/* Interaction Hint */}
              <div className="absolute top-4 left-4 pointer-events-none bg-black/60 backdrop-blur-xs text-[10px] font-tech text-zinc-300 px-3 py-1.5 rounded border border-white/10 flex items-center gap-2">
                <Move className="w-3.5 h-3.5 text-amber-400" />
                <span>Double-click or use controls to Zoom • Drag to Pan ({modalZoomScale}x)</span>
              </div>
            </div>

            {/* Right: Technical Specifications Drawer */}
            <div className="w-full lg:w-[440px] shrink-0 border-t lg:border-t-0 lg:border-l border-white/10 bg-zinc-900/95 p-6 overflow-y-auto max-h-[45vh] lg:max-h-full">
              <div className="space-y-6">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-tech uppercase tracking-[0.2em] text-amber-400 font-semibold mb-1">
                    <Flame className="w-3.5 h-3.5" />
                    <span>EQUIPMENT SPECIFICATIONS</span>
                  </div>
                  <h4 className="text-xl font-bold uppercase tracking-tight text-white mb-1">
                    {product.name}
                  </h4>
                  <div className="flex items-center gap-2 font-mono text-xs text-zinc-400">
                    <span>MODEL: {product.model}</span>
                    <span>•</span>
                    <span>CODE: {product.productCode}</span>
                  </div>
                </div>

                {/* Key Technical Specs Grid */}
                <div className="grid grid-cols-2 gap-2 text-xs font-tech">
                  {product.specifications.capacity && (
                    <div className="p-2.5 rounded bg-white/5 border border-white/10">
                      <span className="text-[9px] uppercase tracking-wider text-zinc-400 block mb-0.5">
                        CAPACITY
                      </span>
                      <span className="font-bold text-white text-sm">
                        {product.specifications.capacity}
                      </span>
                    </div>
                  )}
                  {product.specifications.power && (
                    <div className="p-2.5 rounded bg-white/5 border border-white/10">
                      <span className="text-[9px] uppercase tracking-wider text-zinc-400 block mb-0.5">
                        POWER RATING
                      </span>
                      <span className="font-bold text-amber-400 text-sm flex items-center gap-1">
                        <Zap className="w-3.5 h-3.5" />
                        {product.specifications.power}
                      </span>
                    </div>
                  )}
                  {product.specifications.temperatureRange && (
                    <div className="p-2.5 rounded bg-white/5 border border-white/10">
                      <span className="text-[9px] uppercase tracking-wider text-zinc-400 block mb-0.5">
                        TEMPERATURE
                      </span>
                      <span className="font-bold text-white text-sm">
                        {product.specifications.temperatureRange}
                      </span>
                    </div>
                  )}
                  {product.specifications.dimensions && (
                    <div className="p-2.5 rounded bg-white/5 border border-white/10">
                      <span className="text-[9px] uppercase tracking-wider text-zinc-400 block mb-0.5">
                        DIMENSIONS (W×D×H)
                      </span>
                      <span className="font-bold text-white text-sm">
                        {product.specifications.dimensions}
                      </span>
                    </div>
                  )}
                  {product.specifications.basketCount && (
                    <div className="p-2.5 rounded bg-white/5 border border-white/10">
                      <span className="text-[9px] uppercase tracking-wider text-zinc-400 block mb-0.5">
                        BASKET CONFIGURATION
                      </span>
                      <span className="font-bold text-white text-sm">
                        {product.specifications.basketCount}
                      </span>
                    </div>
                  )}
                  {product.specifications.weight && (
                    <div className="p-2.5 rounded bg-white/5 border border-white/10">
                      <span className="text-[9px] uppercase tracking-wider text-zinc-400 block mb-0.5">
                        NET WEIGHT
                      </span>
                      <span className="font-bold text-white text-sm">
                        {product.specifications.weight}
                      </span>
                    </div>
                  )}
                  {product.specifications.material && (
                    <div className="p-2.5 rounded bg-white/5 border border-white/10 col-span-2">
                      <span className="text-[9px] uppercase tracking-wider text-zinc-400 block mb-0.5">
                        BODY & TANK MATERIAL
                      </span>
                      <span className="font-bold text-white text-sm">
                        {product.specifications.material}
                      </span>
                    </div>
                  )}
                  <div className="p-2.5 rounded bg-white/5 border border-white/10 col-span-2">
                    <span className="text-[9px] uppercase tracking-wider text-zinc-400 block mb-0.5">
                      ELECTRICAL SUPPLY
                    </span>
                    <span className="font-bold text-zinc-200 text-xs">
                      220–240V / 50–60Hz Single Phase Standard B2B Commercial Connection
                    </span>
                  </div>
                </div>

                {/* Key Features */}
                {product.keyFeatures && product.keyFeatures.length > 0 && (
                  <div>
                    <h5 className="text-[11px] font-tech font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Key Engineering Highlights
                    </h5>
                    <ul className="space-y-1.5 text-xs text-zinc-300">
                      {product.keyFeatures.map((feat, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Applications */}
                {product.applications && product.applications.length > 0 && (
                  <div>
                    <h5 className="text-[11px] font-tech font-bold uppercase tracking-wider text-zinc-300 mb-2">
                      Recommended Environments
                    </h5>
                    <div className="flex flex-wrap gap-1.5">
                      {product.applications.map((app, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 text-[10px] font-tech font-medium rounded bg-white/10 text-zinc-200"
                        >
                          {app}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* B2B Action Buttons */}
                <div className="pt-2 space-y-2 border-t border-white/10">
                  <button
                    type="button"
                    onClick={() => {
                      setIsZoomModalOpen(false);
                      openQuoteModal(product.name, product.model, product.division);
                    }}
                    className="w-full py-2.5 px-4 rounded-sm bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-tech font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Request Quotation for {product.model}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setCatalogueModalOpen(true)}
                    className="w-full py-2 px-4 rounded-sm bg-white/10 hover:bg-white/20 text-white text-xs font-tech font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all border border-white/15"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download Full Technical Catalogue</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
