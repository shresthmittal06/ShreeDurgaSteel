import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { HeaderNavItem, ActivePage, BrandConfig } from '../types';
import { defaultHeaderNavItems } from '../data/defaultData';
import { ImageUploadField } from './ImageUploadField';
import {
  X,
  Sliders,
  CheckCircle,
  Save,
  Plus,
  Trash2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  RotateCcw,
  MessageSquare,
  ChevronRight,
  Sparkles,
  Info,
} from 'lucide-react';

interface HeaderEditModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AVAILABLE_PAGES: { value: ActivePage; label: string; description: string }[] = [
  { value: 'manufacturing', label: 'Kitchenware & Home Utility', description: 'Manufactured Kitchenware, Cookware, Serving, Storage & Home Utility' },
  { value: 'commercial', label: 'Kitchen Equipment', description: 'Commercial Kitchen Equipment, Professional Cooking & Food-Service' },
  { value: 'gnpans', label: 'GN Pans', description: 'Standard Gastronorm (GN) Pans, Lids & Ice Cream Storage Containers' },
  { value: 'products', label: 'Full Catalogue', description: 'All Machinery & Hardware Showcase' },
  { value: 'solutions', label: 'Industries / Solutions', description: 'Commercial Kitchens, Sweet Houses, Bakeries, Hotels' },
  { value: 'about', label: 'About Us & Infrastructure', description: 'Company Heritage, Factory Story, Quality Standards' },
  { value: 'projects', label: 'Projects / Applications', description: 'Turnkey Commercial Kitchen Installations' },
  { value: 'pricesheet', label: 'Resources / Price Sheet', description: 'Industrial Equipment Specifications & Price Matrix' },
  { value: 'quote', label: 'Get a Quote', description: 'B2B RFQ & Custom Machinery Order Form' },
  { value: 'contact', label: 'Contact Us', description: 'Direct Sales, Office & Dispatch Support Desk' },
  { value: 'catalogue', label: 'PDF Catalogues', description: 'Downloadable B2B Technical Equipment PDFs' },
  { value: 'home', label: 'Homepage', description: 'Main Landing Experience' },
];

export const HeaderEditModal: React.FC<HeaderEditModalProps> = ({ isOpen, onClose }) => {
  const { brand, updateBrand } = useContent();

  const [brandName, setBrandName] = useState(brand.brandName || 'SHRI DURGA STEELS');
  const [headerTagline, setHeaderTagline] = useState(
    brand.headerTagline || brand.tagline || 'COMMERCIAL KITCHEN & MANUFACTURING'
  );
  const [logoImage, setLogoImage] = useState(brand.logoImage || '');
  const [logoStyle, setLogoStyle] = useState<'both' | 'image' | 'text'>(brand.logoStyle || 'both');
  const [logoText, setLogoText] = useState(brand.logoText || 'SD');

  const [navItems, setNavItems] = useState<HeaderNavItem[]>(() => {
    if (brand.headerNavItems && brand.headerNavItems.length > 0) {
      return brand.headerNavItems;
    }
    return defaultHeaderNavItems;
  });

  const [whatsappText, setWhatsappText] = useState(brand.headerWhatsappText || 'WHATSAPP');
  const [whatsappNumber, setWhatsappNumber] = useState(brand.whatsapp || '+91 98200 84720');
  const [showWhatsapp, setShowWhatsapp] = useState(brand.showHeaderWhatsapp ?? true);

  const [quoteText, setQuoteText] = useState(brand.headerQuoteText || 'GET A QUOTE');
  const [showQuote, setShowQuote] = useState(brand.showHeaderQuote ?? true);

  const [activeSubTab, setActiveSubTab] = useState<'general' | 'navigation' | 'actions'>('general');
  const [successToast, setSuccessToast] = useState('');

  // Sync state whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setBrandName(brand.brandName || 'SHRI DURGA STEELS');
      setHeaderTagline(brand.headerTagline || brand.tagline || 'COMMERCIAL KITCHEN & MANUFACTURING');
      setLogoImage(brand.logoImage || '');
      setLogoStyle(brand.logoStyle || 'both');
      setLogoText(brand.logoText || 'SD');
      setNavItems(
        brand.headerNavItems && brand.headerNavItems.length > 0
          ? brand.headerNavItems
          : defaultHeaderNavItems
      );
      setWhatsappText(brand.headerWhatsappText || 'WHATSAPP');
      setWhatsappNumber(brand.whatsapp || '+91 98200 84720');
      setShowWhatsapp(brand.showHeaderWhatsapp ?? true);
      setQuoteText(brand.headerQuoteText || 'GET A QUOTE');
      setShowQuote(brand.showHeaderQuote ?? true);
      setSuccessToast('');
    }
  }, [isOpen, brand]);

  if (!isOpen) return null;

  const showNotice = (msg: string) => {
    setSuccessToast(msg);
    setTimeout(() => setSuccessToast(''), 3500);
  };

  const handleSave = () => {
    const updated: Partial<BrandConfig> = {
      brandName,
      headerTagline,
      logoImage,
      logoStyle,
      logoText,
      headerNavItems: navItems,
      headerWhatsappText: whatsappText,
      whatsapp: whatsappNumber,
      showHeaderWhatsapp: showWhatsapp,
      headerQuoteText: quoteText,
      showHeaderQuote: showQuote,
    };

    updateBrand(updated);
    showNotice('✓ Top bar & navigation updated live across the entire website!');
  };

  const handleResetToDefault = () => {
    setBrandName('SHRI DURGA STEELS');
    setHeaderTagline('COMMERCIAL KITCHEN & MANUFACTURING');
    setLogoStyle('both');
    setLogoText('SHRI DURGA STEELS');
    setNavItems(defaultHeaderNavItems);
    setWhatsappText('WHATSAPP');
    setShowWhatsapp(true);
    setQuoteText('GET A QUOTE');
    setShowQuote(true);
    showNotice('Reset to initial factory top bar settings. Click SAVE CHANGES to apply.');
  };

  const handleUpdateNavItem = (index: number, field: keyof HeaderNavItem, value: any) => {
    const updated = [...navItems];
    updated[index] = { ...updated[index], [field]: value };
    setNavItems(updated);
  };

  const handleToggleNavVisibility = (index: number) => {
    const updated = [...navItems];
    const currentVis = updated[index].visible ?? true;
    updated[index] = { ...updated[index], visible: !currentVis };
    setNavItems(updated);
  };

  const handleMoveNavItem = (index: number, direction: 'up' | 'down') => {
    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === navItems.length - 1) return;
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    const updated = [...navItems];
    const item = updated[index];
    updated.splice(index, 1);
    updated.splice(targetIdx, 0, item);
    setNavItems(updated);
  };

  const handleDeleteNavItem = (index: number) => {
    const updated = navItems.filter((_, i) => i !== index);
    setNavItems(updated);
  };

  const handleAddNavItem = () => {
    const newItem: HeaderNavItem = {
      id: `nav-custom-${Date.now()}`,
      label: 'New Link',
      page: 'products',
      visible: true,
    };
    setNavItems([...navItems, newItem]);
  };

  return (
    <div
      id="header-edit-modal-backdrop"
      className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        id="header-edit-modal-card"
        className="bg-[#0e1116] border border-white/20 rounded-sm w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-zinc-950 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-amber-500/15 border border-amber-500/30 rounded text-amber-400">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-tech text-amber-400 uppercase tracking-[0.25em] font-bold">
                TOP BAR & NAVIGATION CUSTOMIZER
              </div>
              <h2 className="text-base sm:text-lg font-bold uppercase text-white tracking-tight">
                Edit Header, Logo, Title, Subtitle & Menu Links
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {successToast && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-emerald-400 font-tech font-semibold animate-pulse">
                <CheckCircle className="w-4 h-4" /> {successToast}
              </span>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-white/10 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Preview Strip */}
        <div className="p-3 bg-zinc-900 border-b border-white/10 shrink-0">
          <div className="text-[10px] font-tech uppercase text-zinc-400 flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1.5 text-amber-400 font-bold">
              <Sparkles className="w-3.5 h-3.5" /> LIVE TOP BAR PREVIEW
            </span>
            <span>Real-time preview of your modifications</span>
          </div>

          <div className="p-3 rounded-sm border border-white/10 bg-[#090b0e] text-white flex items-center justify-between gap-4 overflow-x-auto">
            {/* Logo + Title + Subtitle Preview */}
            <div className="flex items-center gap-2.5 shrink-0">
              {logoImage && (logoStyle === 'image' || logoStyle === 'both') ? (
                <img
                  src={logoImage}
                  alt=""
                  className="h-8 max-h-8 max-w-[130px] object-contain rounded-xs bg-black/40"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-8 h-8 rounded-xs border border-white/20 bg-white/5 flex items-center justify-center font-tech font-bold text-xs text-white">
                  {logoText ? logoText.slice(0, 2) : 'SD'}
                </div>
              )}

              {/* Company Name & Subtitle Preview */}
              <div>
                <div className="font-black text-xs uppercase tracking-[0.14em] text-white leading-tight">
                  {brandName || 'SHRI DURGA STEELS'}
                </div>
                <div className="text-[8px] uppercase tracking-[0.18em] font-tech text-amber-400 font-bold">
                  {headerTagline || 'COMMERCIAL KITCHEN & MANUFACTURING'}
                </div>
              </div>
            </div>

            {/* Nav links preview */}
            <div className="hidden md:flex items-center gap-4 text-[10px] font-tech font-bold uppercase tracking-wider text-zinc-300">
              {navItems
                .filter((item) => item.visible ?? true)
                .slice(0, 5)
                .map((item) => (
                  <span key={item.id} className="hover:text-white whitespace-nowrap">
                    {item.label}
                  </span>
                ))}
              {navItems.filter((item) => item.visible ?? true).length > 5 && (
                <span className="text-zinc-500 font-mono">+{navItems.filter((item) => item.visible ?? true).length - 5}</span>
              )}
            </div>

            {/* Action buttons preview */}
            <div className="flex items-center gap-2 shrink-0">
              {showWhatsapp && (
                <span className="px-2 py-1 text-[9px] font-tech font-bold uppercase rounded-xs border border-emerald-500/40 text-emerald-400 bg-emerald-500/10 flex items-center gap-1">
                  <MessageSquare className="w-2.5 h-2.5" />
                  <span>{whatsappText || 'WHATSAPP'}</span>
                </span>
              )}
              {showQuote && (
                <span className="px-2.5 py-1 text-[9px] font-tech font-bold uppercase rounded-xs bg-white text-zinc-950 flex items-center gap-0.5">
                  <span>{quoteText || 'GET A QUOTE'}</span>
                  <ChevronRight className="w-2.5 h-2.5" />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-zinc-950 border-b border-white/10 px-4 sm:px-6 flex items-center gap-2 shrink-0 py-2">
          {[
            { id: 'general', label: '1. Brand Title, Subtitle & Logo' },
            { id: 'navigation', label: `2. Navigation Menu Links (${navItems.length})` },
            { id: 'actions', label: '3. WhatsApp & Quote Buttons' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveSubTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-sm text-xs font-tech tracking-wider uppercase whitespace-nowrap transition-colors ${
                activeSubTab === tab.id
                  ? 'bg-amber-400 text-black font-bold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 1: BRAND TITLE, SUBTITLE & LOGO */}
          {activeSubTab === 'general' && (
            <div className="space-y-5 max-w-3xl">
              <div className="p-4 bg-zinc-900/80 border border-white/10 rounded-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-tech font-bold text-amber-400 uppercase tracking-wider">
                  <Info className="w-4 h-4" />
                  <span>BRAND TITLE & TOP BAR SUBTITLE</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-300 font-bold mb-1">
                      Main Brand Name (Top Line)
                    </label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="e.g., SHRI DURGA STEELS"
                      className="w-full px-3 py-2 bg-zinc-950 border border-white/20 text-white rounded-sm font-tech text-xs focus:outline-hidden focus:border-amber-400"
                    />
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Displayed prominently in bold uppercase on the header.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-300 font-bold mb-1">
                      Header Subtitle / Tagline (Bottom Line)
                    </label>
                    <input
                      type="text"
                      value={headerTagline}
                      onChange={(e) => setHeaderTagline(e.target.value)}
                      placeholder="e.g., COMMERCIAL KITCHEN & MANUFACTURING"
                      className="w-full px-3 py-2 bg-zinc-950 border border-white/20 text-amber-300 rounded-sm font-tech text-xs focus:outline-hidden focus:border-amber-400 font-semibold"
                    />
                    <p className="text-[10px] text-zinc-500 mt-1">
                      The amber subtitle displayed directly beneath your brand name.
                    </p>
                  </div>
                </div>
              </div>

              {/* Logo Settings */}
              <div className="p-4 bg-zinc-900/80 border border-white/10 rounded-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-tech font-bold text-amber-400 uppercase tracking-wider">
                  <Info className="w-4 h-4" />
                  <span>BRAND LOGO & BADGE</span>
                </div>

                <ImageUploadField
                  label="Header Logo Photography / Vector"
                  value={logoImage}
                  onChange={(val) => setLogoImage(val)}
                  helperText="Upload or paste (Ctrl+V) your company logo with transparent background (PNG, SVG, or high-res JPG)."
                  recommendedSize="PNG with transparent background (approx 200 × 50 px)"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      Logo Display Preference
                    </label>
                    <select
                      value={logoStyle}
                      onChange={(e) => setLogoStyle(e.target.value as any)}
                      className="w-full px-3 py-2 bg-zinc-950 border border-white/15 text-white rounded-sm text-xs font-tech"
                    >
                      <option value="both">Both (Show Logo Image + Brand Title & Subtitle)</option>
                      <option value="image">Logo Image Only (Hide text next to logo)</option>
                      <option value="text">Text Monogram Only (Show fallback initial badge)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      Monogram Fallback Initial(s)
                    </label>
                    <input
                      type="text"
                      value={logoText}
                      onChange={(e) => setLogoText(e.target.value)}
                      placeholder="e.g., SD or SDS"
                      className="w-full px-3 py-2 bg-zinc-950 border border-white/15 text-white rounded-sm font-tech text-xs"
                    />
                  </div>
                </div>

                {logoImage && (
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setLogoImage('')}
                      className="text-xs text-rose-400 hover:text-rose-300 font-tech flex items-center gap-1"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Remove Uploaded Logo Image</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* TAB 2: NAVIGATION MENU LINKS */}
          {activeSubTab === 'navigation' && (
            <div className="space-y-4 max-w-4xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-white/10">
                <div>
                  <h3 className="text-sm font-bold uppercase text-white font-tech tracking-wide">
                    Top Navigation Links Manager
                  </h3>
                  <p className="text-[11px] text-zinc-400">
                    Customize labels (e.g. Products, Industries, Manufacturing), change destinations, reorder or toggle visibility.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleAddNavItem}
                    className="px-3 py-1.5 bg-amber-400 hover:bg-amber-300 text-black font-bold font-tech text-xs uppercase rounded-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD LINK</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNavItems(defaultHeaderNavItems);
                      showNotice('Reset navigation links to standard 6 defaults.');
                    }}
                    className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-bold font-tech text-xs uppercase rounded-sm flex items-center gap-1.5 transition-colors border border-white/15"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Links</span>
                  </button>
                </div>
              </div>

              {/* Nav Items List */}
              <div className="space-y-2.5">
                {navItems.map((item, index) => {
                  const isVisible = item.visible ?? true;
                  return (
                    <div
                      key={item.id}
                      className={`p-3 rounded-sm border transition-all flex flex-col md:flex-row md:items-center justify-between gap-3 ${
                        isVisible
                          ? 'bg-zinc-900/90 border-white/15'
                          : 'bg-zinc-950/60 border-white/5 opacity-60'
                      }`}
                    >
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="w-5 text-center font-mono text-xs text-zinc-500 font-bold">
                          {index + 1}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveNavItem(index, 'up')}
                            disabled={index === 0}
                            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveNavItem(index, 'down')}
                            disabled={index === navItems.length - 1}
                            className="p-1 rounded text-zinc-400 hover:text-white hover:bg-white/10 disabled:opacity-20 disabled:cursor-not-allowed"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Label Input */}
                      <div className="flex-1 min-w-[180px]">
                        <label className="block text-[9px] font-tech uppercase text-zinc-500 mb-0.5">
                          Link Display Label
                        </label>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => handleUpdateNavItem(index, 'label', e.target.value)}
                          placeholder="e.g. Products"
                          className="w-full px-2.5 py-1.5 bg-zinc-950 border border-white/15 text-white rounded-sm font-tech text-xs focus:outline-hidden focus:border-amber-400 font-bold"
                        />
                      </div>

                      {/* Target Page Selector */}
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-[9px] font-tech uppercase text-zinc-500 mb-0.5">
                          Destination Page
                        </label>
                        <select
                          value={item.page}
                          onChange={(e) => handleUpdateNavItem(index, 'page', e.target.value as ActivePage)}
                          className="w-full px-2.5 py-1.5 bg-zinc-950 border border-white/15 text-zinc-200 rounded-sm font-tech text-xs focus:outline-hidden focus:border-amber-400"
                        >
                          {AVAILABLE_PAGES.map((page) => (
                            <option key={page.value} value={page.value}>
                              {page.label} ({page.value})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Controls */}
                      <div className="flex items-center justify-end gap-2 shrink-0 pt-2 md:pt-0">
                        <button
                          type="button"
                          onClick={() => handleToggleNavVisibility(index)}
                          className={`px-2.5 py-1.5 rounded-sm font-tech text-xs uppercase flex items-center gap-1 transition-colors ${
                            isVisible
                              ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                              : 'bg-zinc-800 text-zinc-500 border border-white/10'
                          }`}
                          title={isVisible ? 'Visible on top bar' : 'Hidden from top bar'}
                        >
                          {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          <span>{isVisible ? 'Shown' : 'Hidden'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteNavItem(index)}
                          className="p-1.5 rounded text-zinc-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                          title="Delete Link"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* TAB 3: WHATSAPP & QUOTE BUTTONS */}
          {activeSubTab === 'actions' && (
            <div className="space-y-5 max-w-3xl">
              {/* WhatsApp Button Configuration */}
              <div className="p-4 bg-zinc-900/80 border border-white/10 rounded-sm space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2 text-xs font-tech font-bold text-emerald-400 uppercase tracking-wider">
                    <MessageSquare className="w-4 h-4" />
                    <span>WHATSAPP CTA BUTTON</span>
                  </div>
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-tech text-zinc-300">
                    <input
                      type="checkbox"
                      checked={showWhatsapp}
                      onChange={(e) => setShowWhatsapp(e.target.checked)}
                      className="rounded text-emerald-500"
                    />
                    <span>Show on Header</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      Button Label
                    </label>
                    <input
                      type="text"
                      value={whatsappText}
                      onChange={(e) => setWhatsappText(e.target.value)}
                      placeholder="e.g. WHATSAPP"
                      className="w-full px-3 py-2 bg-zinc-950 border border-white/15 text-white rounded-sm font-tech text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      WhatsApp Phone Number (with Country Code)
                    </label>
                    <input
                      type="text"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="e.g. +91 98200 84720"
                      className="w-full px-3 py-2 bg-zinc-950 border border-white/15 text-white rounded-sm font-tech text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Get a Quote Button Configuration */}
              <div className="p-4 bg-zinc-900/80 border border-white/10 rounded-sm space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-2">
                  <div className="flex items-center gap-2 text-xs font-tech font-bold text-white uppercase tracking-wider">
                    <ChevronRight className="w-4 h-4" />
                    <span>"GET A QUOTE" CTA BUTTON</span>
                  </div>
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-tech text-zinc-300">
                    <input
                      type="checkbox"
                      checked={showQuote}
                      onChange={(e) => setShowQuote(e.target.checked)}
                      className="rounded text-white"
                    />
                    <span>Show on Header</span>
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={quoteText}
                    onChange={(e) => setQuoteText(e.target.value)}
                    placeholder="e.g. GET A QUOTE"
                    className="w-full px-3 py-2 bg-zinc-950 border border-white/15 text-white rounded-sm font-tech text-xs"
                  />
                  <p className="text-[10px] text-zinc-500 mt-1">
                    Opens the instant B2B Request For Quotation (RFQ) wizard with dual-division equipment selection.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-zinc-950 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-3.5 py-2 text-xs font-tech font-bold uppercase rounded-sm border border-white/15 text-zinc-400 hover:text-white hover:bg-white/5 transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset To Default Header</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-tech font-bold uppercase rounded-sm border border-white/15 text-zinc-300 hover:bg-zinc-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                handleSave();
                setTimeout(() => onClose(), 600);
              }}
              className="px-6 py-2 bg-amber-400 hover:bg-amber-300 text-black font-tech font-bold text-xs uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-all shadow-md active:scale-98"
            >
              <Save className="w-4 h-4" />
              <span>SAVE & COMMIT TOP BAR</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
