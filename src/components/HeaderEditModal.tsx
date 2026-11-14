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

  const [brandName, setBrandName] = useState(brand.brandName || 'SHREE DURGA STEELS');
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
      setBrandName(brand.brandName || 'SHREE DURGA STEELS');
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
    setBrandName('SHREE DURGA STEELS');
    setHeaderTagline('COMMERCIAL KITCHEN & MANUFACTURING');
    setLogoStyle('both');
    setLogoText('SHREE DURGA STEELS');
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
      className="fixed inset-0 z-60 flex items-center justify-center p-3 sm:p-6 bg-[#292321]/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        id="header-edit-modal-card"
        className="bg-[#FAF4EE] border border-[#D8BFA8] rounded-sm w-full max-w-4xl max-h-[94vh] flex flex-col shadow-2xl overflow-hidden text-[#292321]"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-5 bg-[#F3E7DA] border-b border-[#D8BFA8] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#5B1018]/10 border border-[#5B1018]/25 rounded text-[#5B1018]">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-tech text-[#5B1018] uppercase tracking-[0.25em] font-bold">
                TOP BAR & NAVIGATION CUSTOMIZER
              </div>
              <h2 className="text-base sm:text-lg font-bold uppercase text-[#292321] tracking-tight">
                Edit Header, Logo, Title, Subtitle & Menu Links
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {successToast && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-[#5B1018] font-tech font-semibold">
                <CheckCircle className="w-4 h-4" /> {successToast}
              </span>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-[#5A4F4B] hover:text-[#5B1018] rounded hover:bg-[#E9D9C8] transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Preview Strip */}
        <div className="p-3 bg-[#E9D9C8] border-b border-[#D8BFA8] shrink-0">
          <div className="text-[10px] font-tech uppercase text-[#4D423E] flex items-center justify-between mb-1.5">
            <span className="flex items-center gap-1.5 text-[#5B1018] font-bold">
              <Sparkles className="w-3.5 h-3.5" /> LIVE TOP BAR PREVIEW
            </span>
            <span>Real-time preview of your modifications</span>
          </div>

          <div className="p-3 rounded-sm border border-[#D8BFA8] bg-[#F3E7DA] text-[#292321] flex items-center justify-between gap-4 overflow-x-auto">
            {/* Logo + Title + Subtitle Preview */}
            <div className="flex items-center gap-2.5 shrink-0">
              {logoImage && (logoStyle === 'image' || logoStyle === 'both') ? (
                <img
                  src={logoImage}
                  alt=""
                  className="h-8 max-h-8 max-w-[130px] object-contain rounded-xs bg-white border border-[#D8BFA8]"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-8 h-8 rounded-xs border border-[#D8BFA8] bg-[#FAF4EE] flex items-center justify-center font-tech font-bold text-xs text-[#5B1018]">
                  {logoText ? logoText.slice(0, 2) : 'SD'}
                </div>
              )}

              {/* Company Name & Subtitle Preview */}
              <div>
                <div className="font-black text-xs uppercase tracking-[0.14em] text-[#292321] leading-tight">
                  {brandName || 'SHREE DURGA STEELS'}
                </div>
                <div className="text-[8px] uppercase tracking-[0.18em] font-tech text-[#5B1018] font-bold">
                  {headerTagline || 'COMMERCIAL KITCHEN & MANUFACTURING'}
                </div>
              </div>
            </div>

            {/* Nav links preview */}
            <div className="hidden md:flex items-center gap-4 text-[10px] font-tech font-bold uppercase tracking-wider text-[#4D423E]">
              {navItems
                .filter((item) => item.visible ?? true)
                .slice(0, 5)
                .map((item) => (
                  <span key={item.id} className="hover:text-[#5B1018] whitespace-nowrap">
                    {item.label}
                  </span>
                ))}
              {navItems.filter((item) => item.visible ?? true).length > 5 && (
                <span className="text-[#5A4F4B] font-mono">+{navItems.filter((item) => item.visible ?? true).length - 5}</span>
              )}
            </div>

            {/* Action buttons preview */}
            <div className="flex items-center gap-2 shrink-0">
              {showWhatsapp && (
                <span className="px-2 py-1 text-[9px] font-tech font-bold uppercase rounded-xs border border-[#D8BFA8] text-[#292321] bg-[#FAF4EE] flex items-center gap-1">
                  <MessageSquare className="w-2.5 h-2.5 text-[#5B1018]" />
                  <span>{whatsappText || 'WHATSAPP'}</span>
                </span>
              )}
              {showQuote && (
                <span className="px-2.5 py-1 text-[9px] font-tech font-bold uppercase rounded-xs bg-[#5B1018] text-[#F3E7DA] flex items-center gap-0.5">
                  <span>{quoteText || 'GET A QUOTE'}</span>
                  <ChevronRight className="w-2.5 h-2.5" />
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-[#FAF4EE] border-b border-[#D8BFA8] px-4 sm:px-6 flex items-center gap-2 shrink-0 py-2 overflow-x-auto">
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
                  ? 'bg-[#5B1018] text-[#F3E7DA] font-bold shadow-sm'
                  : 'text-[#4D423E] hover:text-[#292321] hover:bg-[#E9D9C8]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Scrollable Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-6 bg-[#FAF4EE]">
          {/* TAB 1: BRAND TITLE, SUBTITLE & LOGO */}
          {activeSubTab === 'general' && (
            <div className="space-y-5 max-w-3xl">
              <div className="p-4 bg-[#F3E7DA] border border-[#D8BFA8] rounded-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-tech font-bold text-[#5B1018] uppercase tracking-wider">
                  <Info className="w-4 h-4" />
                  <span>BRAND TITLE & TOP BAR SUBTITLE</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-tech uppercase text-[#292321] font-bold mb-1">
                      Main Brand Name (Top Line)
                    </label>
                    <input
                      type="text"
                      value={brandName}
                      onChange={(e) => setBrandName(e.target.value)}
                      placeholder="e.g., SHREE DURGA STEELS"
                      className="w-full px-3 py-2 bg-white border border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] rounded-sm font-tech text-xs focus:outline-hidden focus:border-[#5B1018]"
                    />
                    <p className="text-[10px] text-[#5A4F4B] mt-1">
                      Displayed prominently in bold uppercase on the header.
                    </p>
                  </div>

                  <div>
                    <label className="block text-[11px] font-tech uppercase text-[#292321] font-bold mb-1">
                      Header Subtitle / Tagline (Bottom Line)
                    </label>
                    <input
                      type="text"
                      value={headerTagline}
                      onChange={(e) => setHeaderTagline(e.target.value)}
                      placeholder="e.g., COMMERCIAL KITCHEN & MANUFACTURING"
                      className="w-full px-3 py-2 bg-white border border-[#D8BFA8] text-[#5B1018] placeholder:text-[#B8B8B3] rounded-sm font-tech text-xs focus:outline-hidden focus:border-[#5B1018] font-semibold"
                    />
                    <p className="text-[10px] text-[#5A4F4B] mt-1">
                      The oxblood subtitle displayed directly beneath your brand name.
                    </p>
                  </div>
                </div>
              </div>

              {/* Logo Settings */}
              <div className="p-4 bg-[#F3E7DA] border border-[#D8BFA8] rounded-sm space-y-4">
                <div className="flex items-center gap-2 text-xs font-tech font-bold text-[#5B1018] uppercase tracking-wider">
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
                    <label className="block text-[11px] font-tech uppercase text-[#4D423E] font-bold mb-1">
                      Logo Display Preference
                    </label>
                    <select
                      value={logoStyle}
                      onChange={(e) => setLogoStyle(e.target.value as any)}
                      className="w-full px-3 py-2 bg-white border border-[#D8BFA8] text-[#292321] rounded-sm text-xs font-tech focus:outline-hidden focus:border-[#5B1018]"
                    >
                      <option value="both">Both (Show Logo Image + Brand Title & Subtitle)</option>
                      <option value="image">Logo Image Only (Hide text next to logo)</option>
                      <option value="text">Text Monogram Only (Show fallback initial badge)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-tech uppercase text-[#4D423E] font-bold mb-1">
                      Monogram Fallback Initial(s)
                    </label>
                    <input
                      type="text"
                      value={logoText}
                      onChange={(e) => setLogoText(e.target.value)}
                      placeholder="e.g., SD or SDS"
                      className="w-full px-3 py-2 bg-white border border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] rounded-sm font-tech text-xs focus:outline-hidden focus:border-[#5B1018]"
                    />
                  </div>
                </div>

                {logoImage && (
                  <div className="pt-2 flex justify-end">
                    <button
                      type="button"
                      onClick={() => setLogoImage('')}
                      className="text-xs text-[#5B1018] hover:underline font-tech font-bold flex items-center gap-1"
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
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D8BFA8]">
                <div>
                  <h3 className="text-sm font-bold uppercase text-[#292321] font-tech tracking-wide">
                    Top Navigation Links Manager
                  </h3>
                  <p className="text-[11px] text-[#4D423E]">
                    Customize labels (e.g. Products, Industries, Manufacturing), change destinations, reorder or toggle visibility.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleAddNavItem}
                    className="px-3 py-1.5 bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-bold font-tech text-xs uppercase rounded-sm flex items-center gap-1.5 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD LINK</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setNavItems(defaultHeaderNavItems);
                      showNotice('Reset navigation links to standard defaults.');
                    }}
                    className="px-3 py-1.5 bg-white hover:bg-[#E9D9C8] text-[#292321] font-bold font-tech text-xs uppercase rounded-sm flex items-center gap-1.5 transition-colors border border-[#D8BFA8]"
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
                          ? 'bg-[#F3E7DA] border-[#D8BFA8]'
                          : 'bg-[#E9D9C8]/50 border-[#D8BFA8]/60 opacity-65'
                      }`}
                    >
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="w-5 text-center font-mono text-xs text-[#5A4F4B] font-bold">
                          {index + 1}
                        </span>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => handleMoveNavItem(index, 'up')}
                            disabled={index === 0}
                            className="p-1 rounded text-[#4D423E] hover:text-[#5B1018] hover:bg-[#E9D9C8] disabled:opacity-20 disabled:cursor-not-allowed"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleMoveNavItem(index, 'down')}
                            disabled={index === navItems.length - 1}
                            className="p-1 rounded text-[#4D423E] hover:text-[#5B1018] hover:bg-[#E9D9C8] disabled:opacity-20 disabled:cursor-not-allowed"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>

                      {/* Label Input */}
                      <div className="flex-1 min-w-[180px]">
                        <label className="block text-[9px] font-tech uppercase text-[#5A4F4B] mb-0.5">
                          Link Display Label
                        </label>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => handleUpdateNavItem(index, 'label', e.target.value)}
                          placeholder="e.g. Products"
                          className="w-full px-2.5 py-1.5 bg-white border border-[#D8BFA8] text-[#292321] rounded-sm font-tech text-xs focus:outline-hidden focus:border-[#5B1018] font-bold"
                        />
                      </div>

                      {/* Target Page Selector */}
                      <div className="flex-1 min-w-[200px]">
                        <label className="block text-[9px] font-tech uppercase text-[#5A4F4B] mb-0.5">
                          Destination Page
                        </label>
                        <select
                          value={item.page}
                          onChange={(e) => handleUpdateNavItem(index, 'page', e.target.value as ActivePage)}
                          className="w-full px-2.5 py-1.5 bg-white border border-[#D8BFA8] text-[#292321] rounded-sm font-tech text-xs focus:outline-hidden focus:border-[#5B1018]"
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
                              ? 'bg-[#5B1018]/10 text-[#5B1018] border border-[#5B1018]/25 font-bold'
                              : 'bg-white text-[#5A4F4B] border border-[#D8BFA8]'
                          }`}
                          title={isVisible ? 'Visible on top bar' : 'Hidden from top bar'}
                        >
                          {isVisible ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                          <span>{isVisible ? 'Shown' : 'Hidden'}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDeleteNavItem(index)}
                          className="p-1.5 rounded text-[#5A4F4B] hover:text-[#5B1018] hover:bg-[#5B1018]/10 transition-colors"
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
              <div className="p-4 bg-[#F3E7DA] border border-[#D8BFA8] rounded-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#D8BFA8] pb-2">
                  <div className="flex items-center gap-2 text-xs font-tech font-bold text-[#5B1018] uppercase tracking-wider">
                    <MessageSquare className="w-4 h-4" />
                    <span>WHATSAPP CTA BUTTON</span>
                  </div>
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-tech text-[#292321]">
                    <input
                      type="checkbox"
                      checked={showWhatsapp}
                      onChange={(e) => setShowWhatsapp(e.target.checked)}
                      className="rounded accent-[#5B1018]"
                    />
                    <span>Show on Header</span>
                  </label>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-tech uppercase text-[#4D423E] font-bold mb-1">
                      Button Label
                    </label>
                    <input
                      type="text"
                      value={whatsappText}
                      onChange={(e) => setWhatsappText(e.target.value)}
                      placeholder="e.g. WHATSAPP"
                      className="w-full px-3 py-2 bg-white border border-[#D8BFA8] text-[#292321] rounded-sm font-tech text-xs focus:outline-hidden focus:border-[#5B1018]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-tech uppercase text-[#4D423E] font-bold mb-1">
                      WhatsApp Phone Number (with Country Code)
                    </label>
                    <input
                      type="text"
                      value={whatsappNumber}
                      onChange={(e) => setWhatsappNumber(e.target.value)}
                      placeholder="e.g. +91 98200 84720"
                      className="w-full px-3 py-2 bg-white border border-[#D8BFA8] text-[#292321] rounded-sm font-tech text-xs focus:outline-hidden focus:border-[#5B1018]"
                    />
                  </div>
                </div>
              </div>

              {/* Get a Quote Button Configuration */}
              <div className="p-4 bg-[#F3E7DA] border border-[#D8BFA8] rounded-sm space-y-4">
                <div className="flex items-center justify-between border-b border-[#D8BFA8] pb-2">
                  <div className="flex items-center gap-2 text-xs font-tech font-bold text-[#292321] uppercase tracking-wider">
                    <ChevronRight className="w-4 h-4 text-[#5B1018]" />
                    <span>"GET A QUOTE" CTA BUTTON</span>
                  </div>
                  <label className="inline-flex items-center gap-2 cursor-pointer text-xs font-tech text-[#292321]">
                    <input
                      type="checkbox"
                      checked={showQuote}
                      onChange={(e) => setShowQuote(e.target.checked)}
                      className="rounded accent-[#5B1018]"
                    />
                    <span>Show on Header</span>
                  </label>
                </div>

                <div>
                  <label className="block text-[11px] font-tech uppercase text-[#4D423E] font-bold mb-1">
                    Button Label
                  </label>
                  <input
                    type="text"
                    value={quoteText}
                    onChange={(e) => setQuoteText(e.target.value)}
                    placeholder="e.g. GET A QUOTE"
                    className="w-full px-3 py-2 bg-white border border-[#D8BFA8] text-[#292321] rounded-sm font-tech text-xs focus:outline-hidden focus:border-[#5B1018]"
                  />
                  <p className="text-[10px] text-[#5A4F4B] mt-1">
                    Opens the instant B2B Request For Quotation (RFQ) wizard with dual-division equipment selection.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-[#F3E7DA] border-t border-[#D8BFA8] flex flex-col sm:flex-row sm:items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="px-3.5 py-2 text-xs font-tech font-bold uppercase rounded-sm border border-[#D8BFA8] bg-white text-[#4D423E] hover:text-[#292321] hover:bg-[#E9D9C8] transition-colors flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset To Default Header</span>
          </button>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-tech font-bold uppercase rounded-sm border border-[#D8BFA8] bg-white text-[#292321] hover:bg-[#E9D9C8] transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                handleSave();
                setTimeout(() => onClose(), 600);
              }}
              className="px-6 py-2 bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech font-bold text-xs uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-all shadow-md active:scale-98"
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
