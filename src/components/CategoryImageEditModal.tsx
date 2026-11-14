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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#292321]/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-md border shadow-2xl overflow-hidden bg-[#FAF4EE] text-[#292321] border-[#D8BFA8]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#D8BFA8] shrink-0 bg-[#F3E7DA]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xs bg-[#5B1018]/10 text-[#5B1018] flex items-center justify-center border border-[#5B1018]/25">
              <ImageIcon className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-tech font-bold uppercase tracking-wider text-[#5B1018]">
                  {categoryBadge}
                </span>
                <span className="text-xs text-[#4D423E]">• Homepage Portal Showcase</span>
              </div>
              <h3 className="text-lg font-bold tracking-tight uppercase text-[#292321]">
                Change Image: {categoryTitle}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded text-[#4D423E] hover:text-[#5B1018] hover:bg-[#D8BFA8]/30 transition-colors"
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
              <label className="text-xs font-tech font-bold uppercase tracking-wider text-[#4D423E]">
                Live Card Preview
              </label>
              {selectedImage !== defaultImage && (
                <button
                  type="button"
                  onClick={handleResetDefault}
                  className="text-[11px] font-tech font-semibold text-[#5B1018] hover:text-[#440B11] flex items-center gap-1 transition-colors"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Restore Factory Default</span>
                </button>
              )}
            </div>

            <div className="relative w-full h-52 rounded-xs overflow-hidden bg-white border border-[#D8BFA8] flex items-center justify-center p-3 shadow-inner">
              {isProcessing ? (
                <div className="flex flex-col items-center gap-2 text-[#4D423E]">
                  <RefreshCw className="w-6 h-6 animate-spin text-[#5B1018]" />
                  <span className="text-xs font-tech">Optimizing image...</span>
                </div>
              ) : previewError ? (
                <div className="flex flex-col items-center gap-2 text-[#5B1018] p-4 text-center">
                  <AlertCircle className="w-6 h-6" />
                  <span className="text-xs font-tech font-bold">Image Failed to Load</span>
                  <span className="text-[11px] text-[#4D423E]">
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

              <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded-xs bg-[#292321]/85 text-[10px] font-mono text-[#F3E7DA] border border-[#D8BFA8]/30">
                {selectedImage.startsWith('data:') ? 'Custom Upload (WebP)' : 'Web Asset'}
              </span>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xs bg-[#5B1018]/10 border border-[#5B1018]/30 text-[#5B1018] text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Navigation Tabs for Source Selection */}
          <div>
            <div className="flex border-b border-[#D8BFA8] mb-4">
              <button
                type="button"
                onClick={() => setActiveTab('upload')}
                className={`flex items-center gap-2 py-2 px-4 text-xs font-tech font-bold uppercase tracking-wider border-b-2 transition-colors ${
                  activeTab === 'upload'
                    ? 'border-[#5B1018] text-[#5B1018]'
                    : 'border-transparent text-[#4D423E] hover:text-[#292321]'
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
                    ? 'border-[#5B1018] text-[#5B1018]'
                    : 'border-transparent text-[#4D423E] hover:text-[#292321]'
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
                    ? 'border-[#5B1018] text-[#5B1018]'
                    : 'border-transparent text-[#4D423E] hover:text-[#292321]'
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
                  className="border-2 border-dashed rounded-xs p-6 flex flex-col items-center justify-center cursor-pointer transition-colors border-[#D8BFA8] hover:border-[#5B1018] bg-[#F3E7DA]/70 hover:bg-[#E9D9C8]/60"
                >
                  <div className="w-12 h-12 rounded-full bg-[#5B1018]/10 text-[#5B1018] flex items-center justify-center mb-2">
                    <Upload className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-tech font-bold uppercase tracking-wider mb-1 text-[#292321]">
                    Click to browse or drop an image file
                  </span>
                  <span className="text-[11px] text-[#4D423E]">
                    Supports PNG, JPG, WebP. Automatically compressed for ultra-fast loading.
                  </span>
                </label>
              </div>
            )}

            {/* Tab 2: Recommended Presets */}
            {activeTab === 'presets' && (
              <div className="space-y-3">
                <p className="text-xs text-[#4D423E]">
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
                            ? 'border-[#5B1018] bg-[#5B1018]/10'
                            : 'border-[#D8BFA8] hover:border-[#5B1018] bg-[#F3E7DA]/60'
                        }`}
                      >
                        <div className="w-14 h-14 rounded-xs bg-white shrink-0 overflow-hidden border border-[#D8BFA8] flex items-center justify-center">
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
                          <div className="text-xs font-bold truncate text-[#292321]">
                            {preset.title}
                          </div>
                          <div className="text-[11px] text-[#4D423E] line-clamp-1">
                            {preset.description}
                          </div>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 rounded-full bg-[#5B1018] text-[#F3E7DA] flex items-center justify-center shrink-0">
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
                <label className="text-xs font-tech font-bold uppercase tracking-wider text-[#4D423E] block">
                  Paste Direct Image URL
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    placeholder="https://example.com/photo.jpg"
                    value={urlInput}
                    onChange={(e) => setUrlInput(e.target.value)}
                    className="flex-1 px-3 py-2 rounded-xs border text-xs font-mono outline-none bg-white border-[#D8BFA8] text-[#292321] focus:border-[#5B1018]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyUrl}
                    className="px-4 py-2 rounded-xs bg-[#292321] hover:bg-[#5B1018] text-[#F3E7DA] text-xs font-tech font-bold uppercase tracking-wider transition-colors"
                  >
                    Preview
                  </button>
                </div>
                <p className="text-[11px] text-[#5A4F4B]">
                  Tip: You can use any public HTTPS image link from Unsplash, Imgur, or your CDN.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-[#D8BFA8] bg-[#F3E7DA] shrink-0">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-tech font-bold uppercase tracking-wider text-[#4D423E] hover:text-[#292321] transition-colors"
          >
            Cancel
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={isProcessing}
              className="px-6 py-2.5 rounded-xs bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech font-bold text-xs uppercase tracking-wider transition-colors shadow-sm flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
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
