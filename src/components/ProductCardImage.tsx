import React, { useRef, useState } from 'react';
import { useContent } from '../context/ContentContext';
import { Camera, Upload, Check, Loader2, Package } from 'lucide-react';
import { ProductItem } from '../types';
import { compressImageFile } from '../utils/imageStorage';

interface ProductCardImageProps {
  product: ProductItem;
  onSelect?: () => void;
  heightClass?: string;
  imageFit?: 'cover' | 'contain';
  customModelCode?: string;
  subcategoryBadge?: string;
  showBadges?: boolean;
}

export const ProductCardImage: React.FC<ProductCardImageProps> = ({
  product,
  onSelect,
  heightClass = 'h-72 sm:h-80 md:h-88',
  imageFit = 'contain',
  customModelCode,
  subcategoryBadge,
  showBadges = true,
}) => {
  const { openImageEditModal, updateProductImages, themeMode, isAdmin } = useContent();
  const isLight = themeMode === 'light';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [justSaved, setJustSaved] = useState<boolean>(false);
  const [imageError, setImageError] = useState<boolean>(false);

  const hasImage = Boolean(product.mainImage && product.mainImage.trim().length > 0 && !imageError);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openImageEditModal(product);
  };

  const handleDirectUploadClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  const handleFileSelected = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const dataUrl = await compressImageFile(file);
      updateProductImages(product.id, dataUrl, product.galleryImages || []);
      setJustSaved(true);
      setTimeout(() => setJustSaved(false), 3000);
    } catch (err) {
      console.error('Direct upload failed:', err);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelected}
        accept="image/*"
        className="hidden"
      />

      {!hasImage ? (
        isAdmin ? (
          <div
            onClick={handleEditClick}
            className={`relative ${heightClass} w-full flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all duration-300 group border-b ${
              isLight
                ? 'bg-slate-100/80 hover:bg-amber-500/10 border-slate-200'
                : 'bg-zinc-800/40 hover:bg-zinc-800/80 border-white/10'
            }`}
            title="Click to add or upload product images"
          >
            {/* Model Badge */}
            {showBadges && (
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                <span className="text-[10px] font-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/80 text-white shadow-xs">
                  {customModelCode || product.model}
                </span>
                {subcategoryBadge && (
                  <span className="text-[9px] font-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white shadow-xs">
                    {subcategoryBadge}
                  </span>
                )}
              </div>
            )}

            {/* Uploading or Saved Overlay */}
            {isUploading && (
              <div className="absolute inset-0 bg-black/75 z-20 flex flex-col items-center justify-center text-white">
                <Loader2 className="w-6 h-6 animate-spin text-amber-500 mb-1.5" />
                <span className="text-xs font-tech font-bold uppercase tracking-wider">Saving Photo...</span>
              </div>
            )}

            {justSaved && (
              <div className="absolute inset-0 bg-emerald-950/85 z-20 flex flex-col items-center justify-center text-emerald-300">
                <Check className="w-8 h-8 text-emerald-400 mb-1" />
                <span className="text-xs font-tech font-black uppercase tracking-wider">Saved Successfully!</span>
              </div>
            )}

            {/* Center Prompt Icon & Text */}
            <div className="flex flex-col items-center justify-center pointer-events-none">
              <div className="w-12 h-12 rounded-full bg-amber-500/15 group-hover:bg-amber-500 text-amber-600 dark:text-amber-400 group-hover:text-slate-950 flex items-center justify-center mb-2 transition-all duration-200 group-hover:scale-110 shadow-xs">
                <Upload className="w-5 h-5" />
              </div>
              <span className="text-xs font-tech font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-200 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                + Add Product Image
              </span>
              <span className="text-[10px] text-slate-500 dark:text-zinc-400 mt-0.5">
                Click to upload or edit photos
              </span>
            </div>

            {/* Action Buttons in bottom corners */}
            <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1.5 z-10">
              <button
                type="button"
                onClick={handleDirectUploadClick}
                className="px-2.5 py-1 rounded bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-tech font-black uppercase tracking-wider shadow-sm transition-transform hover:scale-105 flex items-center gap-1"
                title="Quick upload from device and save"
              >
                <Upload className="w-3 h-3" />
                <span>UPLOAD</span>
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={onSelect}
            className={`relative ${heightClass} w-full flex flex-col items-center justify-center p-4 text-center cursor-pointer transition-all duration-300 group border-b ${
              isLight
                ? 'bg-slate-100/70 hover:bg-slate-200/50 border-slate-200'
                : 'bg-zinc-900/50 hover:bg-zinc-800/60 border-white/10'
            }`}
            title="Click to view product specifications"
          >
            {/* Model Badge */}
            {showBadges && (
              <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                <span className="text-[10px] font-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/80 text-white shadow-xs">
                  {customModelCode || product.model}
                </span>
                {subcategoryBadge && (
                  <span className="text-[9px] font-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white shadow-xs">
                    {subcategoryBadge}
                  </span>
                )}
              </div>
            )}

            <div className="flex flex-col items-center justify-center pointer-events-none">
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 shadow-xs ${
                isLight ? 'bg-slate-200 text-slate-500' : 'bg-zinc-800 text-zinc-400'
              }`}>
                <Package className="w-5 h-5" />
              </div>
              <span className="text-xs font-tech font-bold uppercase tracking-wider text-slate-800 dark:text-zinc-200">
                {product.name}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-zinc-400 mt-0.5">
                Click to inspect specifications & details
              </span>
            </div>
          </div>
        )
      ) : (
        <div
          onClick={onSelect}
          className={`relative ${heightClass} w-full overflow-hidden cursor-pointer group flex items-center justify-center ${
            isLight ? 'bg-white' : 'bg-zinc-900/90'
          }`}
        >
          <img
            src={product.mainImage}
            alt={product.name}
            onError={() => setImageError(true)}
            className={`w-full h-full ${
              imageFit === 'contain' ? 'object-contain p-2' : 'object-cover'
            } transition-transform duration-500 group-hover:scale-105 object-center`}
            referrerPolicy="no-referrer"
          />

          {/* Badges */}
          {showBadges && (
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10 max-w-[70%] flex-wrap">
              <span className="text-[10px] font-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-black/80 text-white shadow-xs backdrop-blur-xs">
                {customModelCode || product.model}
              </span>
              {subcategoryBadge && (
                <span className="text-[9px] font-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-600 text-white shadow-xs">
                  {subcategoryBadge}
                </span>
              )}
              {product.isFeatured && (
                <span className="text-[9px] font-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-500 text-slate-950 font-bold shadow-xs">
                  Featured
                </span>
              )}
            </div>
          )}

          {/* Quick upload or saved indicator */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/75 z-20 flex flex-col items-center justify-center text-white">
              <Loader2 className="w-6 h-6 animate-spin text-amber-500 mb-1.5" />
              <span className="text-xs font-tech font-bold uppercase tracking-wider">Saving Photo...</span>
            </div>
          )}

          {justSaved && (
            <div className="absolute top-2.5 right-2.5 z-20 bg-emerald-500 text-white px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase tracking-wider flex items-center gap-1 shadow-md">
              <Check className="w-3 h-3" />
              <span>Saved!</span>
            </div>
          )}

          {/* Floating Edit Image Button - ADMIN ONLY */}
          {isAdmin && (
            <div className="absolute bottom-2 right-2 flex items-center gap-1.5 z-10">
              <button
                type="button"
                onClick={handleDirectUploadClick}
                className="px-2 py-1 rounded bg-black/80 hover:bg-amber-500 text-white hover:text-slate-950 transition-all shadow-md flex items-center gap-1 text-[10px] font-tech font-bold uppercase tracking-wider backdrop-blur-xs"
                title="Replace photo"
              >
                <Upload className="w-3 h-3" />
                <span>Replace</span>
              </button>
              <button
                type="button"
                onClick={handleEditClick}
                className="px-2 py-1 rounded bg-black/80 hover:bg-white text-white hover:text-slate-950 transition-all shadow-md flex items-center gap-1 text-[10px] font-tech font-bold uppercase tracking-wider backdrop-blur-xs"
                title="Edit angles & details"
              >
                <Camera className="w-3 h-3" />
                <span>Angles</span>
              </button>
            </div>
          )}
        </div>
      )}
    </>
  );
};
