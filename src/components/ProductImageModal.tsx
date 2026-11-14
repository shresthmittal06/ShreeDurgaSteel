import React, { useState, useRef, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import {
  X,
  Upload,
  Link,
  Trash2,
  Check,
  Camera,
  Image as ImageIcon,
  Star,
  Plus,
  Layers,
  Eye,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { compressImageFile } from '../utils/imageStorage';

const SUGGESTED_ANGLES = [
  'Front View',
  'Side View',
  'Top View',
  'Angle 3/4',
  'Control Panel / Thermostat',
  'Internal Chamber / Basket',
  'Installed / In Use',
];

export const ProductImageModal: React.FC = () => {
  const {
    imageEditModalProduct,
    closeImageEditModal,
    updateProductImages,
    setSelectedProductForDetail,
    isAdmin,
  } = useContent();

  const product = imageEditModalProduct;

  const [activeTab, setActiveTab] = useState<'main' | 'gallery'>('main');
  const [mainImage, setMainImage] = useState<string>('');
  const [galleryImages, setGalleryImages] = useState<string[]>([]);
  const [urlInput, setUrlInput] = useState<string>('');
  const [galleryUrlInput, setGalleryUrlInput] = useState<string>('');
  const [isDraggingMain, setIsDraggingMain] = useState<boolean>(false);
  const [isDraggingGallery, setIsDraggingGallery] = useState<boolean>(false);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const mainFileInputRef = useRef<HTMLInputElement>(null);
  const galleryFileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (product) {
      setMainImage(product.mainImage || '');
      setGalleryImages(Array.isArray(product.galleryImages) ? [...product.galleryImages] : []);
      setUrlInput('');
      setGalleryUrlInput('');
      setToastMessage(null);
      setSaveSuccess(false);
      setIsSaving(false);
      setActiveTab('main');
    }
  }, [product]);

  if (!product || !isAdmin) return null;

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 3500);
  };

  const handleMainFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const dataUrl = await compressImageFile(file);
      setMainImage(dataUrl);
      updateProductImages(product.id, dataUrl, galleryImages);
      setSaveSuccess(true);
      showToast('Photo uploaded and saved to catalogue!');
    } catch (err) {
      console.error(err);
      showToast('Failed to read image file');
    } finally {
      setIsProcessing(false);
      if (mainFileInputRef.current) mainFileInputRef.current.value = '';
    }
  };

  const handleMainDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingMain(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    try {
      setIsProcessing(true);
      const dataUrl = await compressImageFile(file);
      setMainImage(dataUrl);
      updateProductImages(product.id, dataUrl, galleryImages);
      setSaveSuccess(true);
      showToast('Photo uploaded and saved to catalogue!');
    } catch (err) {
      console.error(err);
      showToast('Failed to read dropped file');
    } finally {
      setIsProcessing(false);
    }
  };

  const applyMainUrl = () => {
    if (!urlInput.trim()) return;
    const url = urlInput.trim();
    setMainImage(url);
    setUrlInput('');
    updateProductImages(product.id, url, galleryImages);
    setSaveSuccess(true);
    showToast('Photo URL saved to catalogue!');
  };

  const handleGalleryFilesUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    try {
      setIsProcessing(true);
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const dataUrl = await compressImageFile(files[i]);
        newUrls.push(dataUrl);
      }
      const updatedGallery = [...galleryImages, ...newUrls];
      setGalleryImages(updatedGallery);
      updateProductImages(product.id, mainImage, updatedGallery);
      setSaveSuccess(true);
      showToast(`Added & saved ${newUrls.length} angle photo(s)!`);
    } catch (err) {
      console.error(err);
      showToast('Failed to read gallery image file(s)');
    } finally {
      setIsProcessing(false);
      if (galleryFileInputRef.current) galleryFileInputRef.current.value = '';
    }
  };

  const handleGalleryDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingGallery(false);
    const files = e.dataTransfer.files;
    if (!files || files.length === 0) return;

    try {
      setIsProcessing(true);
      const newUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const dataUrl = await compressImageFile(files[i]);
        newUrls.push(dataUrl);
      }
      const updatedGallery = [...galleryImages, ...newUrls];
      setGalleryImages(updatedGallery);
      updateProductImages(product.id, mainImage, updatedGallery);
      setSaveSuccess(true);
      showToast(`Added & saved ${newUrls.length} angle photo(s)!`);
    } catch (err) {
      console.error(err);
      showToast('Failed to read dropped image(s)');
    } finally {
      setIsProcessing(false);
    }
  };

  const applyGalleryUrl = () => {
    if (!galleryUrlInput.trim()) return;
    const updatedGallery = [...galleryImages, galleryUrlInput.trim()];
    setGalleryImages(updatedGallery);
    setGalleryUrlInput('');
    updateProductImages(product.id, mainImage, updatedGallery);
    setSaveSuccess(true);
    showToast('Angle photo URL saved!');
  };

  const removeGalleryImage = (index: number) => {
    const updated = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(updated);
    updateProductImages(product.id, mainImage, updated);
    showToast('Removed angle image');
  };

  const setAsCover = (imgUrl: string) => {
    const prevMain = mainImage;
    const filtered = galleryImages.filter((img) => img !== imgUrl);
    const updatedGallery = prevMain && prevMain !== imgUrl ? [prevMain, ...filtered] : filtered;
    setMainImage(imgUrl);
    setGalleryImages(updatedGallery);
    updateProductImages(product.id, imgUrl, updatedGallery);
    setSaveSuccess(true);
    showToast('Set as main cover image & saved!');
  };

  const handleSave = (viewAfterSave = false) => {
    setIsSaving(true);
    try {
      updateProductImages(product.id, mainImage, galleryImages);
      setSaveSuccess(true);
      showToast('Photo saved successfully to catalogue!');

      setTimeout(() => {
        closeImageEditModal();
        if (viewAfterSave) {
          setSelectedProductForDetail({
            ...product,
            mainImage,
            galleryImages,
          });
        }
      }, 350);
    } catch (err) {
      console.error('Error saving image:', err);
      showToast('Failed to save image');
    } finally {
      setIsSaving(false);
    }
  };

  const handleClearAllImages = () => {
    if (window.confirm(`Clear all images for ${product.name}?`)) {
      setMainImage('');
      setGalleryImages([]);
      updateProductImages(product.id, '', []);
      showToast('Cleared all photos for this product');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#292321]/80 backdrop-blur-xs overflow-y-auto animate-fadeIn">
      <div
        className="w-full max-w-3xl rounded-sm border shadow-2xl overflow-hidden my-auto flex flex-col max-h-[92vh] bg-[#FAF4EE] border-[#D8BFA8] text-[#292321]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="p-5 border-b border-[#D8BFA8] flex items-start justify-between gap-4 bg-[#F3E7DA]">
          <div className="flex items-center gap-3.5">
            <button
              type="button"
              onClick={closeImageEditModal}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-sm bg-[#292321] hover:bg-[#5B1018] text-[#F3E7DA] font-tech text-xs font-bold uppercase tracking-wider transition-colors shrink-0"
              title="Back / Close"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK</span>
            </button>
            <div className="w-10 h-10 rounded-sm bg-[#5B1018]/10 text-[#5B1018] flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-[10px] font-tech font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-[#292321] text-[#F3E7DA]">
                  MODEL: {product.model}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#5B1018]/10 text-[#5B1018] border border-[#5B1018]/25 font-bold uppercase">
                  {product.category}
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[#E9D9C8] text-[#4D423E]">
                  {product.division === 'commercial' ? 'Commercial Equipment' : 'In-House Mfg'}
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-tech font-black uppercase tracking-tight mt-1 text-[#292321]">
                Add / Edit Product Images • {product.name}
              </h2>
            </div>
          </div>

          <button
            onClick={closeImageEditModal}
            className="p-1.5 rounded-sm hover:bg-[#E9D9C8] text-[#5A4F4B] hover:text-[#292321] transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast inside modal */}
        {toastMessage && (
          <div className="bg-[#5B1018] text-[#F3E7DA] px-4 py-2 text-xs font-tech font-bold uppercase tracking-wider flex items-center justify-between transition-all">
            <span>{toastMessage}</span>
            <button onClick={() => setToastMessage(null)}>
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex border-b border-[#D8BFA8] px-5 pt-3 bg-[#F3E7DA]/70">
          <button
            type="button"
            onClick={() => setActiveTab('main')}
            className={`pb-3 px-4 text-xs font-tech font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'main'
                ? 'border-[#5B1018] text-[#5B1018]'
                : 'border-transparent text-[#5A4F4B] hover:text-[#292321]'
            }`}
          >
            <Star className="w-3.5 h-3.5" />
            <span>Primary Cover Image</span>
            {mainImage && (
              <span className="w-2 h-2 rounded-full bg-[#5B1018] inline-block" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('gallery')}
            className={`pb-3 px-4 text-xs font-tech font-bold uppercase tracking-wider border-b-2 transition-all flex items-center gap-2 ${
              activeTab === 'gallery'
                ? 'border-[#5B1018] text-[#5B1018]'
                : 'border-transparent text-[#5A4F4B] hover:text-[#292321]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Multi-Angle Gallery ({galleryImages.length})</span>
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-5 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {activeTab === 'main' && (
            <div className="space-y-6">
              {/* Preview Box */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-tech font-bold uppercase tracking-wider text-[#4D423E] flex items-center gap-1.5">
                    <ImageIcon className="w-3.5 h-3.5" />
                    <span>Current Primary Cover Photo</span>
                  </label>
                  {mainImage && (
                    <button
                      type="button"
                      onClick={() => {
                        setMainImage('');
                        showToast('Primary image removed');
                      }}
                      className="text-[11px] font-tech text-[#5B1018] hover:underline flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove Photo</span>
                    </button>
                  )}
                </div>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDraggingMain(true);
                  }}
                  onDragLeave={() => setIsDraggingMain(false)}
                  onDrop={handleMainDrop}
                  className={`h-64 sm:h-72 w-full rounded-sm border-2 transition-all flex flex-col items-center justify-center p-4 relative overflow-hidden ${
                    isDraggingMain
                      ? 'border-[#5B1018] bg-[#5B1018]/10'
                      : mainImage
                      ? 'border-[#D8BFA8] bg-white'
                      : 'border-dashed border-[#D8BFA8] bg-[#F3E7DA]'
                  }`}
                >
                  {mainImage ? (
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={mainImage}
                        alt="Product preview"
                        className="max-h-full max-w-full object-contain select-none"
                      />
                      <div className="absolute bottom-2.5 left-2.5 bg-[#292321]/85 text-[#F3E7DA] px-2.5 py-1 rounded text-[10px] font-tech uppercase tracking-wider backdrop-blur-xs flex items-center gap-1.5">
                        <Check className="w-3.5 h-3.5 text-[#D8BFA8]" />
                        <span>Ready to Save</span>
                      </div>
                      <div className="absolute bottom-2.5 right-2.5">
                        <button
                          type="button"
                          onClick={() => handleSave(false)}
                          disabled={isSaving}
                          className="px-3.5 py-1.5 rounded bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech font-black text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-lg transition-transform hover:scale-105 active:scale-95"
                          title="Save this photo now"
                        >
                          {isSaving ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Check className="w-3.5 h-3.5" />
                          )}
                          <span>SAVE PHOTO NOW</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-4">
                      <div className="w-14 h-14 mx-auto mb-3 rounded-full bg-[#E9D9C8] text-[#5B1018] flex items-center justify-center">
                        <Camera className="w-7 h-7" />
                      </div>
                      <h4 className="font-tech text-sm font-bold uppercase tracking-wider text-[#292321]">
                        No Image Added Yet
                      </h4>
                      <p className="text-xs text-[#5A4F4B] mt-1 max-w-xs mx-auto">
                        Drag and drop your product photo here, or use the upload buttons below.
                      </p>
                    </div>
                  )}

                  {isProcessing && (
                    <div className="absolute inset-0 bg-[#292321]/75 backdrop-blur-xs flex flex-col items-center justify-center text-[#F3E7DA] z-20">
                      <div className="w-8 h-8 border-2 border-[#D8BFA8] border-t-transparent rounded-full animate-spin mb-2" />
                      <span className="text-xs font-tech font-bold uppercase tracking-wider">
                        Processing image...
                      </span>
                    </div>
                  )}
                </div>

                {/* Prominent Save Option right after upload */}
                {mainImage && (
                  <div
                    className={`mt-4 p-4 rounded-sm border flex flex-col sm:flex-row items-center justify-between gap-3 shadow-xs ${
                      saveSuccess
                        ? 'bg-[#5B1018]/10 border-[#5B1018]/40 text-[#5B1018]'
                        : 'bg-[#F3E7DA] border-[#D8BFA8] text-[#292321]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 w-full sm:w-auto">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                          saveSuccess
                            ? 'bg-[#5B1018] text-[#F3E7DA]'
                            : 'bg-[#292321] text-[#F3E7DA]'
                        }`}
                      >
                        {saveSuccess ? <Check className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
                      </div>
                      <div>
                        <span className="font-tech text-xs font-bold uppercase tracking-wider block">
                          {saveSuccess ? 'Photo Permanently Saved' : 'Photo Ready to Save'}
                        </span>
                        <span className="text-[11px] opacity-80 block">
                          {saveSuccess
                            ? 'Retained permanently across browser reloads & sessions.'
                            : 'Click "SAVE IMAGE NOW" to lock this image in the catalogue permanently.'}
                        </span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleSave(false)}
                      disabled={isSaving}
                      className="w-full sm:w-auto px-5 py-2.5 rounded bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech font-black text-xs uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 shrink-0 hover:scale-102"
                    >
                      {saveSuccess ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>PHOTO SAVED</span>
                        </>
                      ) : isSaving ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          <span>SAVING...</span>
                        </>
                      ) : (
                        <>
                          <Check className="w-4 h-4" />
                          <span>SAVE IMAGE NOW</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
              </div>

              {/* Upload Action Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* 1. Device Upload Button */}
                <div className="p-4 rounded-sm border bg-[#F3E7DA] border-[#D8BFA8]">
                  <div className="flex items-center gap-2 mb-2 font-tech text-xs font-bold uppercase tracking-wider text-[#292321]">
                    <Upload className="w-3.5 h-3.5 text-[#5B1018]" />
                    <span>Upload from Computer / Phone</span>
                  </div>
                  <p className="text-[11px] text-[#5A4F4B] mb-3">
                    Select a JPEG, PNG, or WEBP photo from your files.
                  </p>
                  <input
                    type="file"
                    ref={mainFileInputRef}
                    onChange={handleMainFileUpload}
                    accept="image/*"
                    className="hidden"
                    id="main-file-upload"
                  />
                  <label
                    htmlFor="main-file-upload"
                    className="w-full py-2 px-3 rounded-sm bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech text-xs font-black uppercase tracking-wider shadow-sm transition-colors text-center cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Choose File from Device</span>
                  </label>
                </div>

                {/* 2. URL Input */}
                <div className="p-4 rounded-sm border bg-[#F3E7DA] border-[#D8BFA8]">
                  <div className="flex items-center gap-2 mb-2 font-tech text-xs font-bold uppercase tracking-wider text-[#292321]">
                    <Link className="w-3.5 h-3.5 text-[#5B1018]" />
                    <span>Or Paste Image Web Link</span>
                  </div>
                  <p className="text-[11px] text-[#5A4F4B] mb-3">
                    Paste an HTTPS link to an online image.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      placeholder="https://example.com/photo.jpg"
                      onKeyDown={(e) => e.key === 'Enter' && applyMainUrl()}
                      className="flex-1 px-3 py-1.5 text-xs rounded-sm border bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={applyMainUrl}
                      disabled={!urlInput.trim()}
                      className="px-3 py-1.5 rounded-sm bg-[#292321] hover:bg-[#5B1018] disabled:opacity-50 text-[#F3E7DA] font-tech text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Set
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'gallery' && (
            <div className="space-y-6">
              {/* Gallery Explanation */}
              <div className="p-3 rounded-sm border text-xs flex items-center justify-between gap-3 bg-[#F3E7DA] border-[#D8BFA8] text-[#292321]">
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 shrink-0 text-[#5B1018]" />
                  <span>
                    Add multiple angles (Front, Side, Top, Interior Chamber, Nameplate) to give buyers a complete view of this product.
                  </span>
                </div>
                {galleryImages.length > 0 && (
                  <span className="font-mono font-bold text-xs bg-[#5B1018] text-[#F3E7DA] px-2 py-0.5 rounded tabular-nums">
                    {galleryImages.length} {galleryImages.length === 1 ? 'Angle' : 'Angles'}
                  </span>
                )}
              </div>

              {/* Gallery Grid of Existing Images */}
              {galleryImages.length > 0 ? (
                <div>
                  <h4 className="text-xs font-tech font-bold uppercase tracking-wider text-[#4D423E] mb-3">
                    Current Angle Photos:
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {galleryImages.map((img, idx) => (
                      <div
                        key={idx}
                        className="relative rounded-sm border overflow-hidden group flex flex-col justify-between bg-white border-[#D8BFA8] shadow-xs"
                      >
                        <div className="h-32 w-full flex items-center justify-center p-2 bg-white">
                          <img
                            src={img}
                            alt={`Angle ${idx + 1}`}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                        <div className="p-2 border-t border-[#D8BFA8] bg-[#FAF4EE] flex items-center justify-between gap-1">
                          <button
                            type="button"
                            onClick={() => setAsCover(img)}
                            className="text-[10px] font-tech uppercase font-bold text-[#5B1018] hover:underline flex items-center gap-0.5"
                            title="Set as Main Cover Photo"
                          >
                            <Star className="w-2.5 h-2.5" />
                            <span>Set Cover</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => removeGalleryImage(idx)}
                            className="text-[10px] font-tech uppercase font-bold text-[#5B1018] hover:underline flex items-center gap-0.5"
                            title="Remove Angle"
                          >
                            <Trash2 className="w-2.5 h-2.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="py-8 text-center rounded-sm border border-dashed border-[#D8BFA8] bg-[#F3E7DA]">
                  <Camera className="w-8 h-8 mx-auto text-[#B8B8B3] mb-2" />
                  <p className="text-xs font-tech font-bold uppercase tracking-wider text-[#292321]">
                    No Gallery Angles Uploaded Yet
                  </p>
                  <p className="text-[11px] text-[#5A4F4B] mt-0.5">
                    Upload additional angles to enable interactive image inspection.
                  </p>
                </div>
              )}

              {/* Add New Gallery Image Section */}
              <div
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDraggingGallery(true);
                }}
                onDragLeave={() => setIsDraggingGallery(false)}
                onDrop={handleGalleryDrop}
                className={`p-4 rounded-sm border ${
                  isDraggingGallery
                    ? 'border-[#5B1018] bg-[#5B1018]/10'
                    : 'bg-[#F3E7DA] border-[#D8BFA8]'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-tech text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 text-[#292321]">
                    <Plus className="w-3.5 h-3.5 text-[#5B1018]" />
                    <span>Upload New Gallery Angle(s)</span>
                  </span>
                  <span className="text-[10px] text-[#5A4F4B]">
                    Supports multiple files selection
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="file"
                      ref={galleryFileInputRef}
                      onChange={handleGalleryFilesUpload}
                      accept="image/*"
                      multiple
                      className="hidden"
                      id="gallery-files-upload"
                    />
                    <label
                      htmlFor="gallery-files-upload"
                      className="w-full py-2.5 px-3 rounded-sm bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech text-xs font-black uppercase tracking-wider shadow-sm transition-colors text-center cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Select Angle Photos from Device</span>
                    </label>
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={galleryUrlInput}
                      onChange={(e) => setGalleryUrlInput(e.target.value)}
                      placeholder="Or paste angle photo URL..."
                      onKeyDown={(e) => e.key === 'Enter' && applyGalleryUrl()}
                      className="flex-1 px-3 py-2 text-xs rounded-sm border bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018] focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={applyGalleryUrl}
                      disabled={!galleryUrlInput.trim()}
                      className="px-3 py-2 rounded-sm bg-[#292321] hover:bg-[#5B1018] disabled:opacity-50 text-[#F3E7DA] font-tech text-xs font-bold uppercase tracking-wider transition-colors"
                    >
                      Add
                    </button>
                  </div>
                </div>

                {/* Suggested angle labels guide */}
                <div className="mt-3 pt-3 border-t border-[#D8BFA8]">
                  <span className="text-[10px] font-tech uppercase tracking-wider text-[#5A4F4B] font-bold block mb-1.5">
                    Recommended Views to Capture:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {SUGGESTED_ANGLES.map((angle) => (
                      <span
                        key={angle}
                        className="text-[10px] px-2 py-0.5 rounded bg-[#E9D9C8] text-[#292321] font-tech"
                      >
                        {angle}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-[#D8BFA8] bg-[#F3E7DA] flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {(mainImage || galleryImages.length > 0) && (
              <button
                type="button"
                onClick={handleClearAllImages}
                className="text-xs text-[#5B1018] hover:underline font-tech font-bold uppercase tracking-wider flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Images</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <button
              type="button"
              onClick={closeImageEditModal}
              className="flex-1 sm:flex-none px-4 py-2 rounded-sm border font-tech text-xs font-bold uppercase tracking-wider transition-colors border-[#D8BFA8] hover:bg-[#E9D9C8] text-[#4D423E]"
            >
              Cancel
            </button>

            <button
              type="button"
              onClick={() => handleSave(false)}
              disabled={isSaving}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-sm bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech text-xs font-black uppercase tracking-wider shadow-md transition-all flex items-center justify-center gap-2 hover:scale-102"
              title="Save changes to this product"
            >
              {saveSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>SAVED!</span>
                </>
              ) : isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>SAVING...</span>
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  <span>SAVE IMAGE</span>
                </>
              )}
            </button>

            <button
              type="button"
              onClick={() => handleSave(true)}
              disabled={isSaving}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-sm font-tech text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 bg-[#292321] hover:bg-[#5B1018] text-[#F3E7DA]"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Save & View</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
