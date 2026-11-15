import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Link, Check, RefreshCw, Image as ImageIcon, Sparkles, AlertCircle } from 'lucide-react';
import { compressImageFile } from '../utils/imageStorage';

export interface CategoryPresetImage {
  title: string;
  url: string;
  description: string;
}

const CATEGORY_PRESETS: Record<'commercial' | 'gnpans' | 'manufacturing', CategoryPresetImage[]> = {
  commercial: [
    {
      title: 'Commercial Deep Fryer (TSL-81)',
      url: '/images/products/tsl81_front.jpg',
      description: 'Single tank 6L electric fryer in AISI 304 SS',
    },
    {
      title: 'Heavy-Duty Double Tank Fryer',
      url: '/images/products/tsl82.jpg',
      description: 'Dual tank 12L counter electric fryer',
    },
    {
      title: 'Pizza Deck Oven',
      url: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80',
      description: 'Refractory stone deck commercial oven',
    },
    {
      title: 'Commercial Induction Hob',
      url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=800&q=80',
      description: 'High power commercial ceramic induction cooker',
    },
    {
      title: 'Contact Panini Grill',
      url: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?auto=format&fit=crop&w=800&q=80',
      description: 'Cast iron ribbed contact sandwich griller',
    },
  ],
  gnpans: [
    {
      title: 'GN 1/1 Food Pan (AISI 304)',
      url: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
      description: 'European standard EN 631 full size gastro container',
    },
    {
      title: 'GN Pans In Kitchen Chiller',
      url: 'https://images.unsplash.com/photo-1584990347449-399c51f4c399?auto=format&fit=crop&w=800&q=80',
      description: 'Organized GN pan configurations in prep counter',
    },
    {
      title: 'Stainless Steel Food Containers',
      url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
      description: 'Stackable heavy-gauge SS gastro insert pans',
    },
    {
      title: 'Buffet Service Pan Display',
      url: 'https://images.unsplash.com/photo-1501443762994-82bd5dace89a?auto=format&fit=crop&w=800&q=80',
      description: 'Commercial bain-marie standard pans',
    },
  ],
  manufacturing: [
    {
      title: 'Confectionery Barfi & Sweet Display Tray',
      url: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80',
      description: 'AISI 304 food-grade welded jointless sweet tray',
    },
    {
      title: 'Stainless Steel Commercial Kitchenware',
      url: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80',
      description: 'In-house fabricated stainless steel trays & containers',
    },
    {
      title: 'Commercial Masala & Spice Console',
      url: 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=80',
      description: 'Multi-compartment stainless steel masala storage',
    },
    {
      title: 'Wire Glass Carrier & Utilities',
      url: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=80',
      description: 'Electropolished heavy-duty SS wire glass basket',
    },
    {
      title: 'Bakery & Sweets Display Counter',
      url: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=800&q=80',
      description: 'Stainless steel showcase counter equipment',
    },
  ],
};

interface CategoryImageEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryKey: 'commercial' | 'gnpans' | 'manufacturing';
  categoryTitle: string;
  categoryBadge: string;
  currentImage: string;
  defaultImage: string;
  onSave: (newUrl: string) => void;
  themeMode?: 'dark' | 'light';
}

export const CategoryImageEditModal: React.FC<CategoryImageEditModalProps> = ({
  isOpen,
  onClose,
  categoryKey,
  categoryTitle,
  categoryBadge,
  currentImage,
  defaultImage,
  onSave,
  themeMode = 'dark',
}) => {
  const [selectedImage, setSelectedImage] = useState<string>(currentImage || defaultImage);
  const [urlInput, setUrlInput] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'upload' | 'url' | 'presets'>('upload');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [previewError, setPreviewError] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setSelectedImage(currentImage || defaultImage);
      setUrlInput(currentImage && !currentImage.startsWith('data:') ? currentImage : '');
      setErrorMessage('');
      setPreviewError(false);
    }
  }, [isOpen, currentImage, defaultImage]);

  if (!isOpen) return null;

  const isLight = themeMode === 'light';

  // Handle local file upload
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage('Please select a valid image file (PNG, JPG, WebP, etc.).');
      return;
    }

    try {
      setIsProcessing(true);
      setErrorMessage('');
      setPreviewError(false);
      // Compress to high performance WebP (~15KB)
      const compressedDataUrl = await compressImageFile(file, 720, 0.72);
      setSelectedImage(compressedDataUrl);
    } catch (err) {
      console.error('Error compressing category image:', err);
      setErrorMessage('Could not process this image. Please try a different photo.');
    } finally {
      setIsProcessing(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleApplyUrl = () => {
    if (!urlInput.trim()) {
      setErrorMessage('Please enter an image URL.');
      return;
    }
    setPreviewError(false);
    setErrorMessage('');
    setSelectedImage(urlInput.trim());
  };

  const handleSave = () => {
    if (!selectedImage) {
      setErrorMessage('Please select or upload an image first.');
      return;
    }
    onSave(selectedImage);
    onClose();
  };

  const handleResetDefault = () => {
    setSelectedImage(defaultImage);
    setUrlInput(defaultImage);
    setPreviewError(false);
    setErrorMessage('');
  };

  const presets = CATEGORY_PRESETS[categoryKey] || [];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        className={`relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-md border shadow-2xl overflow-hidden ${
          isLight ? 'bg-white text-slate-900 border-slate-300' : 'bg-[#11141a] text-white border-white/20'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xs bg-amber-500/20 text-amber-500 flex items-center justify-center border border-amber-500/30">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-tech font-bold uppercase tracking-wider text-amber-500">
                  {categoryBadge}
                </span>
                <span className="text-xs text-zinc-400">• Homepage Portal Showcase</span>
              </div>
              <h3 className="text-lg font-bold tracking-tight uppercase">
                Change Image: {categoryTitle}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Live Preview Card */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-tech font-bold uppercase tracking-wider text-zinc-400">
                Live Card Preview
              </label>
              {selectedImage !== defaultImage && (
                <button
                  type="button"
                  onClick={handleResetDefault}
                  className="text-[11px] font-tech font-semibold text-amber-500 hover:text-amber-400 flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Restore Factory Default</span>
                </button>
              )}
            </div>

            <div className="relative w-full h-52 rounded-xs overflow-hidden bg-zinc-950 border border-white/15 flex items-center justify-center p-3 shadow-inner">
              {isProcessing ? (
                <div className="flex flex-col items-center gap-2 text-zinc-400">
                  <RefreshCw className="w-6 h-6 animate-spin text-amber-500" />
                  <span className="text-xs font-tech">Optimizing image...</span>
                </div>
              ) : previewError ? (
                <div className="flex flex-col items-center gap-2 text-red-400 p-4 text-center">
                  <AlertCircle className="w-6 h-6" />
                  <span className="text-xs font-tech font-bold">Image Failed to Load</span>
                  <span className="text-[11px] text-zinc-400">
                    The URL or file could not be displayed. Please check the URL or upload a file.
                  </span>
                </div>
              ) : (
                <img
                  src={selectedImage}
                  alt={categoryTitle}
                  className="w-full h-full object-contain"
                  onError={() => setPreviewError(true)}
                  onLoad={() => setPreviewError(false)}
                />
              )}

              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-xs bg-black/80 text-[10px] font-mono text-zinc-300 border border-white/20">
                {selectedImage.startsWith('data:') ? 'Custom Upload (WebP)' : 'Web Asset'}
              </span>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xs bg-red-500/15 border border-red-500/30 text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Navigation Tabs for Source Selection */}
          <div>
            <div className="flex border-b border-white/10 mb-4">
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex items-center gap-2 py-2 px-4 text-xs font-tech font-bold uppercase tracking-wider border-b-2 transition-colors ${
                  activeTab === 'upload'
                    ? 'border-amber-500 text-amber-400'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload From Device</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('presets')}
                className={`flex items-center gap-2 py-2 px-4 text-xs font-tech font-bold uppercase tracking-wider border-b-2 transition-colors ${
                  activeTab === 'presets'
                    ? 'border-amber-500 text-amber-400'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Recommended Photos</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('url')}
                className={`flex items-center gap-2 py-2 px-4 text-xs font-tech font-bold uppercase tracking-wider border-b-2 transition-colors ${
                  activeTab === 'url'
                    ? 'border-amber-500 text-amber-400'
                    : 'border-transparent text-zinc-400 hover:text-white'
                }`}
              >
                <Link className="w-3.5 h-3.5" />
                <span>Image Web URL</span>
              </button>
            </div>

            {/* Tab 1: Upload File */}
            {activeTab === 'upload' && (
              <div className="space-y-3">
                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/png, image/jpeg, image/webp, image/svg+xml"
                  onChange={handleFileChange}
                  className="hidden"
                  id="category-image-file-input"
                />
                <label
                  htmlFor="category-image-file-input"
                  className={`border-2 border-dashed rounded-xs p-6 flex flex-col items-center justify-center cursor-pointer transition-colors ${
                    isLight
                      ? 'border-slate-300 hover:border-amber-500 bg-slate-50 hover:bg-amber-50/20'
                      : 'border-white/20 hover:border-amber-500/80 bg-zinc-900/60 hover:bg-zinc-900'
                  }`}
                >
                  <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center mb-2">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-tech font-bold uppercase tracking-wider mb-1 text-slate-800 dark:text-zinc-200">
                    Click to browse or drop an image file
                  </span>
                  <span className="text-[11px] text-zinc-400">
                    Supports PNG, JPG, WebP. Automatically compressed for ultra-fast loading.
                  </span>
                </label>
              </div>
            )}

            {/* Tab 2: Recommended Presets */}
            {activeTab === 'presets' && (
              <div className="space-y-3">
                <p className="text-xs text-zinc-400">
                  Select a curated industrial product photo for this category:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-56 overflow-y-auto pr-1">
                  {presets.map((preset, index) => {
                    const isSelected = selectedImage === preset.url;
                    return (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setSelectedImage(preset.url);
                          setUrlInput(preset.url);
                          setPreviewError(false);
                          setErrorMessage('');
                        }}
                        className={`flex items-center gap-3 p-2.5 rounded-xs border text-left transition-all ${
                          isSelected
                            ? 'border-amber-500 bg-amber-500/10'
                            : isLight
                            ? 'border-slate-200 hover:border-slate-400 bg-slate-50'
                            : 'border-white/10 hover:border-white/30 bg-zinc-900'
                        }`}
                      >
                        <div className="w-14 h-14 rounded-xs bg-black shrink-0 overflow-hidden border border-white/10 flex items-center justify-center">
                          <img
                            src={preset.url}
                            alt={preset.title}
                            className="w-full h-full object-contain p-1"
                            onError={(e) => {
                              (e.currentTarget as HTMLImageElement).src = '/images/products/tsl81_front.jpg';
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-bold truncate text-slate-900 dark:text-white">
                            {preset.title}
                          </div>
                          <div className="text-[11px] text-zinc-400 line-clamp-1">
                            {preset.description}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                            <Check className="w-3 h-3 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Tab 3: Image URL */}
            {activeTab === 'url' && (
              <div className="space-y-3">
                <label className="text-xs font-tech font-bold uppercase tracking-wider text-zinc-400 block">
                  Paste Direct Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className={`flex-1 px-3 py-2 rounded-xs border text-xs font-mono outline-none ${
                      isLight
                        ? 'bg-white border-slate-300 text-slate-900 focus:border-amber-500'
                        : 'bg-zinc-900 border-white/20 text-white focus:border-amber-500'
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-4 py-2 rounded-xs bg-zinc-800 hover:bg-zinc-700 text-white text-xs font-tech font-bold uppercase tracking-wider transition-colors border border-white/10"
                  >
                    Preview
                  </button>
                </div>
                <p className="text-[11px] text-zinc-500">
                  Tip: You can use any public HTTPS image link from Unsplash, Imgur, or your CDN.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-white/10 bg-slate-50 dark:bg-black/40 shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-tech font-bold uppercase tracking-wider text-zinc-400 hover:text-white transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <Check className="w-4 h-4 stroke-[2.5]" />
              <span>Save & Apply Image</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
