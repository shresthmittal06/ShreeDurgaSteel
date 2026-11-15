import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import {
  ProductItem,
  ProductCategory,
  CompanyStat,
  ProductSizeVariant,
  HeaderNavItem,
  ActivePage,
} from '../types';
import { defaultHeaderNavItems } from '../data/defaultData';
import { ImageUploadField } from './ImageUploadField';
import { DocumentUploadField } from './DocumentUploadField';
import {
  X,
  Save,
  RotateCcw,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit2,
  Layers,
  Building,
  Sliders,
  CheckCircle,
  FileText,
  Search,
  AlertTriangle,
  Star,
  Check,
  Undo2,
  ArrowUp,
  ArrowDown,
  Eye,
  EyeOff,
  Sparkles,
  MessageSquare,
  ChevronRight,
  Pencil,
  ArrowLeft,
} from 'lucide-react';

const AVAILABLE_PAGES: { value: ActivePage; label: string }[] = [
  { value: 'products', label: 'Products Catalogue' },
  { value: 'solutions', label: 'Industries / Solutions' },
  { value: 'manufacturing', label: 'Manufacturing Facility' },
  { value: 'commercial', label: 'Commercial Kitchen Equipment' },
  { value: 'about', label: 'About Us & Infrastructure' },
  { value: 'projects', label: 'Projects / Applications' },
  { value: 'pricesheet', label: 'Resources / Price Sheet' },
  { value: 'quote', label: 'Get a Quote' },
  { value: 'contact', label: 'Contact Us' },
  { value: 'catalogue', label: 'PDF Catalogues' },
  { value: 'home', label: 'Homepage' },
];

export const AdminCmsModal: React.FC = () => {
  const {
    brand,
    updateBrand,
    hero,
    updateHero,
    stats,
    updateStats,
    categories,
    updateCategories,
    products,
    updateProducts,
    updateProductImages,
    adminModalOpen,
    setAdminModalOpen,
    adminEditingProductId,
    setAdminEditingProductId,
    resetToDefaults,
    isAdmin,
  } = useContent();

  const [activeTab, setActiveTab] = useState<
    'topbar' | 'brand' | 'hero' | 'stats' | 'products' | 'categories' | 'json'
  >('topbar');
  const [successNotice, setSuccessNotice] = useState('');

  // Local states for editing
  const [tempBrand, setTempBrand] = useState(brand);
  const [tempHero, setTempHero] = useState(hero);
  const [tempStats, setTempStats] = useState<CompanyStat[]>(stats);
  const [tempCategories, setTempCategories] = useState<ProductCategory[]>(categories);
  const [tempProducts, setTempProducts] = useState<ProductItem[]>(products);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Deletion, reset confirmation and search states (safe in iframe sandboxes)
  const [productToDelete, setProductToDelete] = useState<ProductItem | null>(null);
  const [recentlyDeleted, setRecentlyDeleted] = useState<{ item: ProductItem; index: number } | null>(null);
  const [showResetConfirmModal, setShowResetConfirmModal] = useState(false);
  const [productSearch, setProductSearch] = useState('');
  const [hasUncommittedChanges, setHasUncommittedChanges] = useState(false);
  const editFormRef = React.useRef<HTMLDivElement>(null);
  const prevModalOpenRef = React.useRef(false);

  // Sync state ONLY when modal is newly opened
  React.useEffect(() => {
    if (adminModalOpen && !prevModalOpenRef.current) {
      setTempBrand({
        ...brand,
        headerNavItems: brand.headerNavItems || defaultHeaderNavItems,
        headerTagline: brand.headerTagline || brand.tagline || 'COMMERCIAL KITCHEN & MANUFACTURING',
        headerWhatsappText: brand.headerWhatsappText || 'WHATSAPP',
        headerQuoteText: brand.headerQuoteText || 'GET A QUOTE',
        showHeaderWhatsapp: brand.showHeaderWhatsapp ?? true,
        showHeaderQuote: brand.showHeaderQuote ?? true,
      });
      setTempHero(hero);
      setTempStats(stats);
      setTempCategories(categories);
      setTempProducts(products);
      setSuccessNotice('');
      setProductToDelete(null);
      setRecentlyDeleted(null);
      setHasUncommittedChanges(false);
    }
    prevModalOpenRef.current = adminModalOpen;

    if (adminModalOpen && adminEditingProductId) {
      setActiveTab('products');
      setEditingProductId(adminEditingProductId);
      setAdminEditingProductId(null);
      setTimeout(() => {
        editFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }
  }, [adminModalOpen, adminEditingProductId]);

  if (!adminModalOpen || !isAdmin) return null;

  const showToast = (msg: string) => {
    setSuccessNotice(msg);
    setTimeout(() => setSuccessNotice(''), 4000);
  };

  const handleSaveTopBar = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrand(tempBrand);
    showToast('Top Bar & Navigation settings saved successfully!');
  };

  const currentNavItems = tempBrand.headerNavItems || defaultHeaderNavItems;

  const handleUpdateNavItem = (id: string, field: keyof HeaderNavItem, value: any) => {
    const updated = currentNavItems.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    setTempBrand({ ...tempBrand, headerNavItems: updated });
  };

  const handleAddNavItem = () => {
    const newItem: HeaderNavItem = {
      id: `nav-${Date.now()}`,
      label: 'New Link',
      page: 'products',
      visible: true,
    };
    setTempBrand({ ...tempBrand, headerNavItems: [...currentNavItems, newItem] });
  };

  const handleRemoveNavItem = (id: string) => {
    const updated = currentNavItems.filter((item) => item.id !== id);
    setTempBrand({ ...tempBrand, headerNavItems: updated });
  };

  const handleMoveNavItem = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= currentNavItems.length) return;
    const items = [...currentNavItems];
    const [moved] = items.splice(index, 1);
    items.splice(targetIndex, 0, moved);
    setTempBrand({ ...tempBrand, headerNavItems: items });
  };

  const handleToggleNavItemVisibility = (id: string) => {
    const updated = currentNavItems.map((item) =>
      item.id === id ? { ...item, visible: item.visible === false ? true : false } : item
    );
    setTempBrand({ ...tempBrand, headerNavItems: updated });
  };

  const handleResetNavItems = () => {
    setTempBrand({ ...tempBrand, headerNavItems: defaultHeaderNavItems });
    showToast('Navigation links reset to default structure.');
  };

  const handleSaveBrand = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrand(tempBrand);
    showToast('Brand details saved successfully!');
  };

  const handleSaveHero = (e: React.FormEvent) => {
    e.preventDefault();
    updateHero(tempHero);
    showToast('Hero section updated successfully!');
  };

  const handleSaveStats = () => {
    updateStats(tempStats);
    showToast('Statistics updated successfully!');
  };

  const handleSaveCategories = () => {
    updateCategories(tempCategories);
    showToast('Categories updated successfully!');
  };

  // Commit all product changes (additions, edits, deletions) to live site
  const handleSaveProducts = () => {
    updateProducts(tempProducts);
    setHasUncommittedChanges(false);
    setRecentlyDeleted(null);
    showToast(`✓ Changes committed! Catalog successfully updated (${tempProducts.length} items active).`);
  };

  const handleAddProduct = () => {
    const randomCode = Math.floor(Math.random() * 900 + 100);
    const newProd: ProductItem = {
      id: `prod-${Date.now()}`,
      division: 'commercial',
      name: 'New Commercial Appliance',
      model: `TSL-${randomCode}`,
      productCode: `TSL-${randomCode}`,
      category: 'cooking',
      subcategory: 'Commercial Cooking',
      shortDescription: 'Heavy-duty stainless steel commercial appliance engineered for peak kitchen operations.',
      longDescription: 'Engineered for high-volume commercial catering, restaurant kitchens, and institutional food service.',
      mainImage: '',
      galleryImages: [],
      keyFeatures: [
        'Heavy gauge AISI 304 food-grade stainless steel',
        'Precision temperature regulation controls',
        'High-density thermal insulation for energy retention',
      ],
      specifications: {
        model: `TSL-${randomCode}`,
        power: '3.0 kW',
        voltage: '220V - 240V / 50Hz',
        material: 'AISI 304 Stainless Steel',
        dimensions: '450 × 550 × 400 mm',
        weight: '16 kg',
      },
      applications: ['Restaurants', 'Hotels', 'Cafés'],
      isFeatured: true,
    };

    setTempProducts([newProd, ...tempProducts]);
    setEditingProductId(newProd.id);
    setHasUncommittedChanges(true);
    showToast(`Created new equipment (${newProd.model}). Complete details and click "COMMIT CATALOG CHANGES" to save.`);
    setTimeout(() => {
      editFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  // Request deletion (opens safe in-app confirmation modal, completely immune to iframe blocks)
  const handleRequestDeleteProduct = (prod: ProductItem) => {
    setProductToDelete(prod);
  };

  // Confirm delete product from staging catalog
  const handleConfirmDeleteProduct = () => {
    if (!productToDelete) return;
    const targetId = productToDelete.id;
    const targetIndex = tempProducts.findIndex((p) => p.id === targetId);
    const updated = tempProducts.filter((p) => p.id !== targetId);

    setRecentlyDeleted({ item: productToDelete, index: targetIndex >= 0 ? targetIndex : 0 });
    setTempProducts(updated);
    setHasUncommittedChanges(true);
    if (editingProductId === targetId) {
      setEditingProductId(null);
    }
    setProductToDelete(null);
    showToast(`Removed "${productToDelete.model} - ${productToDelete.name}" from catalog. Click "COMMIT CATALOG CHANGES" to save.`);
  };

  // Undo delete before committing
  const handleUndoDelete = () => {
    if (!recentlyDeleted) return;
    const next = [...tempProducts];
    next.splice(recentlyDeleted.index, 0, recentlyDeleted.item);
    setTempProducts(next);
    showToast(`Restored "${recentlyDeleted.item.model}" to staging.`);
    setRecentlyDeleted(null);
  };

  // Start editing product and scroll directly to editor
  const handleStartEdit = (id: string) => {
    setEditingProductId(id);
    setTimeout(() => {
      editFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 80);
  };

  // JSON Export / Import
  const handleExportJson = () => {
    const fullData = {
      brand: tempBrand,
      hero: tempHero,
      stats: tempStats,
      categories: tempCategories,
      products: tempProducts,
      exportedAt: new Date().toISOString(),
    };
    const jsonStr = JSON.stringify(fullData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${brand.brandName.toLowerCase().replace(/\s+/g, '-')}-website-cms-data.json`;
    a.click();
    URL.revokeObjectURL(url);
    showToast('Exported complete website data as JSON.');
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.brand) updateBrand(parsed.brand);
        if (parsed.hero) updateHero(parsed.hero);
        if (parsed.stats) updateStats(parsed.stats);
        if (parsed.categories) updateCategories(parsed.categories);
        if (parsed.products) updateProducts(parsed.products);
        showToast('Successfully imported and restored CMS data!');
      } catch (err) {
        alert('Invalid JSON file format.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      id="admin-cms-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/90 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        id="admin-cms-card"
        className="bg-[#0e1116] border border-white/20 rounded-sm w-full max-w-5xl h-[92vh] flex flex-col shadow-2xl overflow-hidden"
      >
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-zinc-950 border-b border-white/10 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setAdminModalOpen(false)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm bg-zinc-800 hover:bg-amber-500 text-zinc-200 hover:text-black font-tech text-xs font-bold uppercase tracking-wider transition-colors border border-white/15 hover:border-amber-500 shrink-0"
              title="Back / Close CMS"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>BACK</span>
            </button>
            <div className="p-2 bg-white/5 border border-white/15 rounded text-white">
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <div className="text-[10px] font-tech text-zinc-400 uppercase tracking-[0.25em]">
                ADMINISTRATOR PORTAL • ZERO HARDCODED CODE ARCHITECTURE
              </div>
              <h2 className="text-lg sm:text-xl font-bold uppercase text-white tracking-tight">
                CONTENT MANAGEMENT SYSTEM (CMS)
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {successNotice && (
              <span className="hidden sm:inline-flex items-center gap-1 text-xs text-emerald-400 font-tech font-semibold animate-pulse">
                <CheckCircle className="w-4 h-4" /> {successNotice}
              </span>
            )}
            <button
              onClick={() => setAdminModalOpen(false)}
              className="p-1.5 text-zinc-400 hover:text-white rounded hover:bg-white/10"
              aria-label="Close CMS"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="bg-zinc-900/80 border-b border-white/10 px-4 sm:px-6 flex items-center gap-2 overflow-x-auto shrink-0 py-2">
          {[
            { id: 'topbar', label: '1. Top Bar & Navigation' },
            { id: 'brand', label: '2. Brand & Contact' },
            { id: 'hero', label: '3. Hero Copy & Visuals' },
            { id: 'stats', label: '4. Trust Stats' },
            { id: 'products', label: `5. Products Catalog (${tempProducts.length})` },
            { id: 'categories', label: `6. Categories (${tempCategories.length})` },
            { id: 'json', label: '7. Backup / JSON' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id as any);
                setEditingProductId(null);
              }}
              className={`px-3 py-1.5 rounded-sm text-xs font-tech tracking-wider uppercase whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-zinc-950 font-bold'
                  : 'text-zinc-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-4 sm:p-8 flex-1 overflow-y-auto space-y-6 text-xs text-zinc-300">
          {/* TAB 1: TOP BAR & NAVIGATION */}
          {activeTab === 'topbar' && (
            <form onSubmit={handleSaveTopBar} className="space-y-6 max-w-4xl">
              {/* Section: Top Bar Branding */}
              <div className="p-5 bg-zinc-900/60 border border-white/10 rounded-sm space-y-4">
                <div className="flex items-center justify-between border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-sm font-bold uppercase text-white font-tech">
                      Top Bar Identity & Branding
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      Customize the brand title, subtitle tagline, and logo appearance rendered at the top of every page.
                    </p>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <span className="text-[10px] font-tech text-amber-400 uppercase bg-amber-500/10 px-2 py-1 rounded-xs border border-amber-500/20">
                      Header Bar Live Sync
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      Header Brand Name
                    </label>
                    <input
                      type="text"
                      value={tempBrand.brandName}
                      onChange={(e) => setTempBrand({ ...tempBrand, brandName: e.target.value })}
                      placeholder="e.g. SHRI DURGA STEELS"
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm font-tech text-xs"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      Header Subtitle / Tagline
                    </label>
                    <input
                      type="text"
                      value={tempBrand.headerTagline || tempBrand.tagline || ''}
                      onChange={(e) => setTempBrand({ ...tempBrand, headerTagline: e.target.value })}
                      placeholder="e.g. COMMERCIAL KITCHEN & MANUFACTURING"
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm font-tech text-xs"
                    />
                  </div>
                </div>

                {/* Logo Display Style & Upload */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      Header Logo Display Mode
                    </label>
                    <select
                      value={tempBrand.logoStyle || 'both'}
                      onChange={(e) =>
                        setTempBrand({ ...tempBrand, logoStyle: e.target.value as any })
                      }
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm font-tech text-xs"
                    >
                      <option value="both">Both Logo Image & Text Brand Name</option>
                      <option value="image">Logo Image Only</option>
                      <option value="text">Text & Monogram Only</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      Fallback Monogram Letters (2 Letters)
                    </label>
                    <input
                      type="text"
                      maxLength={3}
                      value={tempBrand.logoText || 'SD'}
                      onChange={(e) => setTempBrand({ ...tempBrand, logoText: e.target.value.toUpperCase() })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm font-tech text-xs"
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-white/10">
                  <ImageUploadField
                    label="Header Brand Logo Image"
                    value={tempBrand.logoImage || ''}
                    onChange={(val) => setTempBrand({ ...tempBrand, logoImage: val })}
                  />
                </div>
              </div>

              {/* Section: Navigation Menu Links */}
              <div className="p-5 bg-zinc-900/60 border border-white/10 rounded-sm space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-3">
                  <div>
                    <h3 className="text-sm font-bold uppercase text-white font-tech">
                      Navigation Menu Links ({currentNavItems.length})
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      Add, reorder, rename, or toggle visibility of navigation links across the desktop top bar and mobile drawer.
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={handleResetNavItems}
                      className="px-2.5 py-1 text-[11px] font-tech uppercase text-zinc-400 hover:text-white border border-white/15 rounded-xs hover:bg-white/5"
                    >
                      Reset Defaults
                    </button>
                    <button
                      type="button"
                      onClick={handleAddNavItem}
                      className="px-3 py-1 text-[11px] font-tech font-bold uppercase text-zinc-950 bg-white hover:bg-zinc-200 rounded-xs flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Link
                    </button>
                  </div>
                </div>

                <div className="space-y-2">
                  {currentNavItems.map((item, index) => (
                    <div
                      key={item.id}
                      className={`p-3 border rounded-xs flex flex-col sm:flex-row sm:items-center gap-3 transition-colors ${
                        item.visible === false
                          ? 'bg-zinc-950/50 border-white/5 opacity-60'
                          : 'bg-zinc-900/90 border-white/15'
                      }`}
                    >
                      <div className="flex items-center gap-2 shrink-0">
                        <span className="w-6 h-6 rounded-xs bg-white/10 text-zinc-300 flex items-center justify-center font-tech text-[10px] font-bold">
                          #{index + 1}
                        </span>

                        {/* Reorder Buttons */}
                        <div className="flex flex-col gap-0.5">
                          <button
                            type="button"
                            disabled={index === 0}
                            onClick={() => handleMoveNavItem(index, 'up')}
                            className="p-1 text-zinc-400 hover:text-white disabled:opacity-20 hover:bg-white/10 rounded-xs"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            disabled={index === currentNavItems.length - 1}
                            onClick={() => handleMoveNavItem(index, 'down')}
                            className="p-1 text-zinc-400 hover:text-white disabled:opacity-20 hover:bg-white/10 rounded-xs"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      {/* Link Label Input */}
                      <div className="flex-1">
                        <label className="block text-[9px] font-tech uppercase text-zinc-400 mb-0.5">
                          Menu Label
                        </label>
                        <input
                          type="text"
                          value={item.label}
                          onChange={(e) => handleUpdateNavItem(item.id, 'label', e.target.value)}
                          placeholder="e.g. Products"
                          className="w-full px-2.5 py-1.5 bg-black/40 border border-white/15 text-white rounded-xs font-tech text-xs"
                        />
                      </div>

                      {/* Target Page Select */}
                      <div className="w-full sm:w-56">
                        <label className="block text-[9px] font-tech uppercase text-zinc-400 mb-0.5">
                          Target Page
                        </label>
                        <select
                          value={item.page}
                          onChange={(e) => handleUpdateNavItem(item.id, 'page', e.target.value as ActivePage)}
                          className="w-full px-2.5 py-1.5 bg-black/40 border border-white/15 text-white rounded-xs font-tech text-xs"
                        >
                          {AVAILABLE_PAGES.map((page) => (
                            <option key={page.value} value={page.value}>
                              {page.label} ({page.value})
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Toggle Visibility & Delete */}
                      <div className="flex items-center gap-2 sm:self-end pt-1 sm:pt-0">
                        <button
                          type="button"
                          onClick={() => handleToggleNavItemVisibility(item.id)}
                          title={item.visible === false ? 'Show link in header' : 'Hide link from header'}
                          className={`px-2.5 py-1.5 rounded-xs border text-xs font-tech flex items-center gap-1 transition-colors ${
                            item.visible === false
                              ? 'border-zinc-700 bg-zinc-800 text-zinc-400 hover:text-white'
                              : 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20'
                          }`}
                        >
                          {item.visible === false ? (
                            <>
                              <EyeOff className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Hidden</span>
                            </>
                          ) : (
                            <>
                              <Eye className="w-3.5 h-3.5" />
                              <span className="hidden sm:inline">Visible</span>
                            </>
                          )}
                        </button>

                        <button
                          type="button"
                          onClick={() => handleRemoveNavItem(item.id)}
                          className="p-1.5 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 rounded-xs border border-transparent hover:border-red-500/20 transition-colors"
                          title="Delete navigation link"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Section: Action Buttons (WhatsApp & Quote CTAs) */}
              <div className="p-5 bg-zinc-900/60 border border-white/10 rounded-sm space-y-4">
                <h3 className="text-sm font-bold uppercase text-white font-tech border-b border-white/10 pb-3">
                  Call-To-Action (CTA) Buttons
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* WhatsApp CTA Controls */}
                  <div className="p-4 bg-zinc-950/60 border border-white/10 rounded-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <MessageSquare className="w-4 h-4 text-emerald-400" />
                        <span className="font-tech font-bold uppercase text-white text-xs">WhatsApp Button</span>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tempBrand.showHeaderWhatsapp ?? true}
                          onChange={(e) =>
                            setTempBrand({ ...tempBrand, showHeaderWhatsapp: e.target.checked })
                          }
                          className="rounded-xs bg-zinc-800 border-white/20 text-emerald-500 focus:ring-0"
                        />
                        <span className="text-[11px] font-tech text-zinc-400">Show in Header</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-[10px] font-tech uppercase text-zinc-400 mb-1">
                        Button Label
                      </label>
                      <input
                        type="text"
                        value={tempBrand.headerWhatsappText || 'WHATSAPP'}
                        onChange={(e) =>
                          setTempBrand({ ...tempBrand, headerWhatsappText: e.target.value })
                        }
                        className="w-full px-3 py-1.5 bg-zinc-900 border border-white/15 text-white rounded-xs font-tech text-xs"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-tech uppercase text-zinc-400 mb-1">
                        WhatsApp Number (with Country Code)
                      </label>
                      <input
                        type="text"
                        value={tempBrand.whatsapp || '919820084720'}
                        onChange={(e) => setTempBrand({ ...tempBrand, whatsapp: e.target.value })}
                        className="w-full px-3 py-1.5 bg-zinc-900 border border-white/15 text-white rounded-xs font-tech text-xs"
                      />
                    </div>
                  </div>

                  {/* Quote CTA Controls */}
                  <div className="p-4 bg-zinc-950/60 border border-white/10 rounded-xs space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <ChevronRight className="w-4 h-4 text-amber-400" />
                        <span className="font-tech font-bold uppercase text-white text-xs">Quote Button</span>
                      </div>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={tempBrand.showHeaderQuote ?? true}
                          onChange={(e) =>
                            setTempBrand({ ...tempBrand, showHeaderQuote: e.target.checked })
                          }
                          className="rounded-xs bg-zinc-800 border-white/20 text-amber-500 focus:ring-0"
                        />
                        <span className="text-[11px] font-tech text-zinc-400">Show in Header</span>
                      </label>
                    </div>

                    <div>
                      <label className="block text-[10px] font-tech uppercase text-zinc-400 mb-1">
                        Button Label
                      </label>
                      <input
                        type="text"
                        value={tempBrand.headerQuoteText || 'GET A QUOTE'}
                        onChange={(e) =>
                          setTempBrand({ ...tempBrand, headerQuoteText: e.target.value })
                        }
                        className="w-full px-3 py-1.5 bg-zinc-900 border border-white/15 text-white rounded-xs font-tech text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Button */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-white hover:bg-zinc-200 text-zinc-950 font-tech font-bold text-xs uppercase tracking-wider rounded-xs flex items-center gap-2 shadow-sm transition-all"
                >
                  <Save className="w-4 h-4" />
                  Save Top Bar & Navigation
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: BRAND & CONTACT */}
          {activeTab === 'brand' && (
            <form onSubmit={handleSaveBrand} className="space-y-6 max-w-3xl">
              <div className="p-4 bg-zinc-900/60 border border-white/10 rounded-sm">
                <h3 className="text-sm font-bold uppercase text-white mb-1 font-tech">
                  Company Identity & Naming
                </h3>
                <p className="text-[11px] text-zinc-400 mb-4">
                  Modify the legal name, marketing brand name, year established, and tagline displayed on all headers, footers, meta tags, and hero copy.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      Brand Name
                    </label>
                    <input
                      type="text"
                      value={tempBrand.brandName}
                      onChange={(e) => setTempBrand({ ...tempBrand, brandName: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm font-tech text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      Company Legal Name
                    </label>
                    <input
                      type="text"
                      value={tempBrand.companyName}
                      onChange={(e) => setTempBrand({ ...tempBrand, companyName: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm font-tech text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      General Tagline
                    </label>
                    <input
                      type="text"
                      value={tempBrand.tagline}
                      onChange={(e) => setTempBrand({ ...tempBrand, tagline: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      Header Subtitle (Under Brand Name)
                    </label>
                    <input
                      type="text"
                      value={tempBrand.headerTagline || tempBrand.tagline || ''}
                      onChange={(e) => setTempBrand({ ...tempBrand, headerTagline: e.target.value })}
                      placeholder="e.g. COMMERCIAL KITCHEN & MANUFACTURING"
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm font-tech text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      Established Year
                    </label>
                    <input
                      type="text"
                      value={tempBrand.established}
                      onChange={(e) => setTempBrand({ ...tempBrand, established: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm font-tech text-xs"
                    />
                  </div>
                </div>

                {/* Brand Logo Upload & Paste */}
                <div className="mt-5 pt-4 border-t border-white/10 space-y-3">
                  <ImageUploadField
                    label="Official Brand Logo"
                    value={tempBrand.logoImage || ''}
                    onChange={(val) => {
                      const updated = { ...tempBrand, logoImage: val };
                      setTempBrand(updated);
                      updateBrand(updated);
                      showToast('Brand logo updated and saved live to website!');
                    }}
                    helperText="Paste your logo from clipboard (Ctrl+V) or upload PNG/SVG/JPG with transparent background."
                    recommendedSize="PNG with transparent background (approx 200 × 50 px)"
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div>
                      <label className="block text-[10px] font-tech uppercase text-zinc-400 mb-1">
                        Logo Display Preference
                      </label>
                      <select
                        value={tempBrand.logoStyle || 'both'}
                        onChange={(e) => {
                          const updated = { ...tempBrand, logoStyle: e.target.value as any };
                          setTempBrand(updated);
                          updateBrand(updated);
                          showToast('Logo display preference saved!');
                        }}
                        className="w-full px-2.5 py-1.5 bg-zinc-900 border border-white/15 text-white rounded-sm text-xs font-tech"
                      >
                        <option value="both">Both (Show Logo Image + Brand Name Text)</option>
                        <option value="image">Image Only (Hide Text Next to Logo)</option>
                        <option value="text">Text Monogram Only</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-tech uppercase text-zinc-400 mb-1">
                        Monogram Letter (Fallback)
                      </label>
                      <input
                        type="text"
                        value={tempBrand.logoText || ''}
                        onChange={(e) => {
                          const updated = { ...tempBrand, logoText: e.target.value };
                          setTempBrand(updated);
                          updateBrand(updated);
                        }}
                        placeholder="e.g., S or SDS"
                        className="w-full px-2.5 py-1.5 bg-zinc-900 border border-white/15 text-white rounded-sm text-xs font-tech"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[10px] font-tech text-emerald-400">
                      ✓ Logo changes automatically apply to header & footer in real-time
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        updateBrand(tempBrand);
                        showToast('Logo & Brand settings committed!');
                      }}
                      className="px-3 py-1 bg-white hover:bg-zinc-200 text-zinc-950 text-xs font-tech font-bold uppercase rounded-sm"
                    >
                      Save Logo Now
                    </button>
                  </div>
                </div>
              </div>

              {/* Direct Communication Channels */}
              <div className="p-4 bg-zinc-900/60 border border-white/10 rounded-sm space-y-4">
                <h3 className="text-sm font-bold uppercase text-white font-tech">
                  Direct B2B Communication Channels
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      Primary Phone Number (Sales)
                    </label>
                    <input
                      type="text"
                      value={tempBrand.phone}
                      onChange={(e) => setTempBrand({ ...tempBrand, phone: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm font-tech text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      Secondary Contact Number (Factory / Plant)
                    </label>
                    <input
                      type="text"
                      value={tempBrand.phone2 || ''}
                      placeholder="+91 98200 84720"
                      onChange={(e) => setTempBrand({ ...tempBrand, phone2: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm font-tech text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      WhatsApp Number (with country code)
                    </label>
                    <input
                      type="text"
                      value={tempBrand.whatsapp}
                      onChange={(e) => setTempBrand({ ...tempBrand, whatsapp: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm font-tech text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      Official Email Address
                    </label>
                    <input
                      type="email"
                      value={tempBrand.email}
                      onChange={(e) => setTempBrand({ ...tempBrand, email: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm font-tech text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      Region / Hub
                    </label>
                    <input
                      type="text"
                      value={tempBrand.location}
                      onChange={(e) => setTempBrand({ ...tempBrand, location: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm font-tech text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                    Full Physical Factory Address
                  </label>
                  <textarea
                    rows={2}
                    value={tempBrand.address}
                    onChange={(e) => setTempBrand({ ...tempBrand, address: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                    Main Manufacturing USP Statement
                  </label>
                  <input
                    type="text"
                    value={tempBrand.mainUSP}
                    onChange={(e) => setTempBrand({ ...tempBrand, mainUSP: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm text-xs"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-white text-zinc-950 font-bold font-tech text-xs uppercase tracking-wider rounded-sm flex items-center gap-2 hover:bg-zinc-200"
                >
                  <Save className="w-4 h-4" />
                  <span>SAVE BRAND SETTINGS</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 2: HERO COPY & VISUALS */}
          {activeTab === 'hero' && (
            <form onSubmit={handleSaveHero} className="space-y-6 max-w-3xl">
              <div className="p-4 bg-zinc-900/60 border border-white/10 rounded-sm space-y-4">
                <h3 className="text-sm font-bold uppercase text-white font-tech">
                  Homepage Hero Banner Configuration
                </h3>

                <div>
                  <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                    Main Hero Headline
                  </label>
                  <input
                    type="text"
                    value={tempHero.mainHeadline}
                    onChange={(e) => setTempHero({ ...tempHero, mainHeadline: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm font-tech text-xs"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                    Supporting Text
                  </label>
                  <textarea
                    rows={3}
                    value={tempHero.supportingText}
                    onChange={(e) => setTempHero({ ...tempHero, supportingText: e.target.value })}
                    className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm text-xs"
                  />
                </div>

                <div>
                  <ImageUploadField
                    label="Hero Photography Banner"
                    value={tempHero.heroImage}
                    onChange={(val) => setTempHero({ ...tempHero, heroImage: val })}
                    helperText="Paste custom hero image (Ctrl+V) or upload JPG/PNG. High-res widescreen recommended (1920 × 1080)."
                    recommendedSize="1920 × 1080 px"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      Primary CTA Text
                    </label>
                    <input
                      type="text"
                      value={tempHero.primaryCtaText}
                      onChange={(e) => setTempHero({ ...tempHero, primaryCtaText: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm font-tech text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-tech uppercase text-zinc-400 mb-1">
                      Secondary CTA Text
                    </label>
                    <input
                      type="text"
                      value={tempHero.secondaryCtaText}
                      onChange={(e) => setTempHero({ ...tempHero, secondaryCtaText: e.target.value })}
                      className="w-full px-3 py-2 bg-zinc-900 border border-white/15 text-white rounded-sm font-tech text-xs"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-white text-zinc-950 font-bold font-tech text-xs uppercase tracking-wider rounded-sm flex items-center gap-2 hover:bg-zinc-200"
                >
                  <Save className="w-4 h-4" />
                  <span>SAVE HERO COPY</span>
                </button>
              </div>
            </form>
          )}

          {/* TAB 3: TRUST STATS */}
          {activeTab === 'stats' && (
            <div className="space-y-6 max-w-3xl">
              <div className="p-4 bg-zinc-900/60 border border-white/10 rounded-sm">
                <h3 className="text-sm font-bold uppercase text-white mb-1 font-tech">
                  Key Business Metric Counters
                </h3>
                <p className="text-[11px] text-zinc-400 mb-4">
                  Update the numerical proof points shown right below the hero section.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {tempStats.map((stat, idx) => (
                    <div key={stat.id} className="p-3 bg-zinc-900 border border-white/10 rounded-sm space-y-2">
                      <div className="flex gap-2">
                        <div className="w-1/2">
                          <label className="block text-[10px] font-tech uppercase text-zinc-400 mb-0.5">
                            Numeric Value
                          </label>
                          <input
                            type="text"
                            value={stat.value}
                            onChange={(e) => {
                              const next = [...tempStats];
                              next[idx].value = e.target.value;
                              setTempStats(next);
                            }}
                            className="w-full px-2.5 py-1.5 bg-zinc-950 border border-white/15 text-white rounded-sm font-tech text-xs"
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-[10px] font-tech uppercase text-zinc-400 mb-0.5">
                            Suffix
                          </label>
                          <input
                            type="text"
                            value={stat.suffix}
                            onChange={(e) => {
                              const next = [...tempStats];
                              next[idx].suffix = e.target.value;
                              setTempStats(next);
                            }}
                            className="w-full px-2.5 py-1.5 bg-zinc-950 border border-white/15 text-white rounded-sm font-tech text-xs"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-tech uppercase text-zinc-400 mb-0.5">
                          Label
                        </label>
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) => {
                            const next = [...tempStats];
                            next[idx].label = e.target.value;
                            setTempStats(next);
                          }}
                          className="w-full px-2.5 py-1.5 bg-zinc-950 border border-white/15 text-white rounded-sm font-tech text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleSaveStats}
                  className="px-6 py-2.5 bg-white text-zinc-950 font-bold font-tech text-xs uppercase tracking-wider rounded-sm flex items-center gap-2 hover:bg-zinc-200"
                >
                  <Save className="w-4 h-4" />
                  <span>SAVE ALL STATS</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: PRODUCTS CATALOG MANAGER */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Recently Deleted Item Undo Alert */}
              {recentlyDeleted && (
                <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-sm flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-tech animate-in fade-in">
                  <div className="flex items-center gap-2 text-amber-300">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>
                      Staged removal: <strong className="text-white">{recentlyDeleted.item.model}</strong> ({recentlyDeleted.item.name}) was removed. Click "Commit Catalog Changes" to apply permanently.
                    </span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={handleUndoDelete}
                      className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase rounded-sm flex items-center gap-1 transition-colors"
                    >
                      <Undo2 className="w-3.5 h-3.5" />
                      <span>Undo Delete</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleSaveProducts}
                      className="px-3 py-1 bg-white hover:bg-zinc-200 text-zinc-950 font-bold uppercase rounded-sm flex items-center gap-1 transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Commit Now</span>
                    </button>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
                <div>
                  <div className="flex items-center gap-2.5">
                    <h3 className="text-sm font-bold uppercase text-white font-tech tracking-wide">
                      Products & Technical Specifications Catalog
                    </h3>
                    {(hasUncommittedChanges || tempProducts.length !== products.length) && (
                      <span className="px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        {tempProducts.length < products.length
                          ? `${products.length - tempProducts.length} Deleted (Pending Commit)`
                          : tempProducts.length > products.length
                          ? `${tempProducts.length - products.length} Added (Pending Commit)`
                          : 'Edits Pending Commit'}
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-0.5">
                    Add new machinery, edit specifications, and delete obsolete equipment. Click "COMMIT CATALOG CHANGES" to apply.
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleAddProduct}
                    className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white font-bold font-tech text-xs uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-colors border border-white/15"
                  >
                    <Plus className="w-4 h-4" />
                    <span>ADD EQUIPMENT</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleSaveProducts}
                    className={`px-4 py-2 font-bold font-tech text-xs uppercase tracking-wider rounded-sm flex items-center gap-1.5 transition-all shadow-sm ${
                      hasUncommittedChanges || tempProducts.length !== products.length
                        ? 'bg-amber-400 text-black hover:bg-amber-300 ring-2 ring-amber-300'
                        : 'bg-white text-zinc-950 hover:bg-zinc-200'
                    }`}
                  >
                    <Save className="w-4 h-4" />
                    <span>COMMIT CATALOG CHANGES ({tempProducts.length})</span>
                  </button>
                </div>
              </div>

              {/* Editing Selected Product Sub-Form */}
              {editingProductId ? (
                (() => {
                  const current = tempProducts.find((p) => p.id === editingProductId);
                  if (!current) return null;

                  return (
                    <div ref={editFormRef} className="p-5 bg-zinc-900 border border-amber-500/40 rounded-sm space-y-4 shadow-xl ring-1 ring-amber-500/20">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/10 pb-3">
                        <div>
                          <div className="text-[10px] font-tech text-amber-400 uppercase tracking-widest font-bold">
                            ACTIVE PRODUCT SPECIFICATION EDITOR
                          </div>
                          <h4 className="text-sm font-bold font-tech uppercase text-white">
                            {current.name} <span className="text-amber-400 font-mono">({current.model})</span>
                          </h4>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleRequestDeleteProduct(current)}
                            className="px-3 py-1.5 bg-rose-950/40 hover:bg-rose-900/60 text-rose-300 border border-rose-600/40 font-tech font-bold text-xs uppercase rounded-sm flex items-center gap-1.5 transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>DELETE THIS ITEM</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingProductId(null)}
                            className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-tech font-bold text-xs uppercase rounded-sm border border-white/15 transition-colors"
                          >
                            CLOSE EDITOR
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-[10px] font-tech uppercase text-zinc-400 mb-1">
                            Equipment Name
                          </label>
                          <input
                            type="text"
                            value={current.name}
                            onChange={(e) => {
                              const updated = tempProducts.map((p) =>
                                p.id === current.id ? { ...p, name: e.target.value } : p
                              );
                              setTempProducts(updated);
                            }}
                            className="w-full px-2.5 py-1.5 bg-zinc-950 border border-white/15 text-white rounded-sm text-xs font-tech"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-tech uppercase text-zinc-400 mb-1">
                            Model Number
                          </label>
                          <input
                            type="text"
                            value={current.model}
                            onChange={(e) => {
                              const updated = tempProducts.map((p) =>
                                p.id === current.id ? { ...p, model: e.target.value } : p
                              );
                              setTempProducts(updated);
                            }}
                            className="w-full px-2.5 py-1.5 bg-zinc-950 border border-white/15 text-white rounded-sm text-xs font-tech"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-tech uppercase text-zinc-400 mb-1">
                            Category Slug
                          </label>
                          <select
                            value={current.category}
                            onChange={(e) => {
                              const updated = tempProducts.map((p) =>
                                p.id === current.id ? { ...p, category: e.target.value } : p
                              );
                              setTempProducts(updated);
                            }}
                            className="w-full px-2.5 py-1.5 bg-zinc-950 border border-white/15 text-white rounded-sm text-xs font-tech"
                          >
                            {tempCategories.map((c) => (
                              <option key={c.id} value={c.slug}>
                                {c.name}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>

                      {/* Product Main Photography with Image Paste & Upload */}
                      <div className="pt-2">
                        <ImageUploadField
                          label="Main Product Photography"
                          value={current.mainImage}
                          onChange={(val) => {
                            const updated = tempProducts.map((p) =>
                              p.id === current.id ? { ...p, mainImage: val } : p
                            );
                            setTempProducts(updated);
                            updateProducts(updated);
                            updateProductImages(current.id, val, current.galleryImages || []);
                            showToast(`Saved photo for ${current.model}!`);
                          }}
                          helperText="Paste your product image directly (Ctrl+V), drag & drop, or browse your files. Automatically optimized."
                          recommendedSize="High resolution equipment photo"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-[10px] font-tech uppercase text-zinc-400 mb-1">
                            Short Description (1-2 sentences)
                          </label>
                          <textarea
                            rows={2}
                            value={current.shortDescription}
                            onChange={(e) => {
                              const updated = tempProducts.map((p) =>
                                p.id === current.id ? { ...p, shortDescription: e.target.value } : p
                              );
                              setTempProducts(updated);
                            }}
                            className="w-full px-2.5 py-1.5 bg-zinc-950 border border-white/15 text-white rounded-sm text-xs"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-tech uppercase text-zinc-400 mb-1">
                            Long Engineering Description
                          </label>
                          <textarea
                            rows={2}
                            value={current.longDescription}
                            onChange={(e) => {
                              const updated = tempProducts.map((p) =>
                                p.id === current.id ? { ...p, longDescription: e.target.value } : p
                              );
                              setTempProducts(updated);
                            }}
                            className="w-full px-2.5 py-1.5 bg-zinc-950 border border-white/15 text-white rounded-sm text-xs"
                          />
                        </div>
                      </div>

                      {/* Technical Specs Sub-Table: Dimensions, Weights & Electrical */}
                      <div className="pt-3 border-t border-white/10 space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <span className="text-[10px] font-tech uppercase text-zinc-200 font-bold tracking-wider block">
                              Engineering Specs: Sizes, Weights, Electrical & Material
                            </span>
                            <span className="text-[10px] text-zinc-400 font-tech">
                              Edit dimensions, gross/net weights, power, and operating voltage
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              updateProducts(tempProducts);
                              showToast(`Specifications for ${current.model} saved!`);
                            }}
                            className="px-3 py-1 bg-white text-zinc-950 font-tech font-bold text-xs uppercase rounded-sm hover:bg-zinc-200"
                          >
                            Save Specs
                          </button>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                          <div>
                            <span className="text-[9px] text-zinc-400 font-tech uppercase block mb-1">
                              Dimensions (L × W × H)
                            </span>
                            <input
                              type="text"
                              value={current.specifications.dimensions || ''}
                              placeholder="e.g., 600 × 750 × 850 mm"
                              onChange={(e) => {
                                const updated = tempProducts.map((p) =>
                                  p.id === current.id
                                    ? {
                                        ...p,
                                        specifications: {
                                          ...p.specifications,
                                          dimensions: e.target.value,
                                        },
                                      }
                                    : p
                                );
                                setTempProducts(updated);
                              }}
                              className="w-full px-2 py-1.5 bg-zinc-950 border border-white/15 text-white text-xs font-tech rounded-sm"
                            />
                          </div>

                          <div>
                            <span className="text-[9px] text-zinc-400 font-tech uppercase block mb-1">
                              Weight (Net / Gross)
                            </span>
                            <input
                              type="text"
                              value={current.specifications.weight || ''}
                              placeholder="e.g., 75 kg (Gross: 88 kg)"
                              onChange={(e) => {
                                const updated = tempProducts.map((p) =>
                                  p.id === current.id
                                    ? {
                                        ...p,
                                        specifications: {
                                          ...p.specifications,
                                          weight: e.target.value,
                                        },
                                      }
                                    : p
                                );
                                setTempProducts(updated);
                              }}
                              className="w-full px-2 py-1.5 bg-zinc-950 border border-white/15 text-white text-xs font-tech rounded-sm"
                            />
                          </div>

                          <div>
                            <span className="text-[9px] text-zinc-400 font-tech uppercase block mb-1">
                              Power / Thermal Rating
                            </span>
                            <input
                              type="text"
                              value={current.specifications.power || ''}
                              placeholder="e.g., 9.0 kW / 30,000 BTU"
                              onChange={(e) => {
                                const updated = tempProducts.map((p) =>
                                  p.id === current.id
                                    ? {
                                        ...p,
                                        specifications: { ...p.specifications, power: e.target.value },
                                      }
                                    : p
                                );
                                setTempProducts(updated);
                              }}
                              className="w-full px-2 py-1.5 bg-zinc-950 border border-white/15 text-white text-xs font-tech rounded-sm"
                            />
                          </div>

                          <div>
                            <span className="text-[9px] text-zinc-400 font-tech uppercase block mb-1">
                              Voltage & Phase
                            </span>
                            <input
                              type="text"
                              value={current.specifications.voltage || ''}
                              placeholder="e.g., 415V 3-Phase / 230V 1P"
                              onChange={(e) => {
                                const updated = tempProducts.map((p) =>
                                  p.id === current.id
                                    ? {
                                        ...p,
                                        specifications: { ...p.specifications, voltage: e.target.value },
                                      }
                                    : p
                                );
                                setTempProducts(updated);
                              }}
                              className="w-full px-2 py-1.5 bg-zinc-950 border border-white/15 text-white text-xs font-tech rounded-sm"
                            />
                          </div>

                          <div>
                            <span className="text-[9px] text-zinc-400 font-tech uppercase block mb-1">
                              Capacity / Volume
                            </span>
                            <input
                              type="text"
                              value={current.specifications.capacity || ''}
                              placeholder="e.g., 2 × 12 Litres / 4×GN 1/1"
                              onChange={(e) => {
                                const updated = tempProducts.map((p) =>
                                  p.id === current.id
                                    ? {
                                        ...p,
                                        specifications: {
                                          ...p.specifications,
                                          capacity: e.target.value,
                                        },
                                      }
                                    : p
                                );
                                setTempProducts(updated);
                              }}
                              className="w-full px-2 py-1.5 bg-zinc-950 border border-white/15 text-white text-xs font-tech rounded-sm"
                            />
                          </div>

                          <div>
                            <span className="text-[9px] text-zinc-400 font-tech uppercase block mb-1">
                              Temperature Range
                            </span>
                            <input
                              type="text"
                              value={current.specifications.temperatureRange || ''}
                              placeholder="e.g., 50°C - 300°C"
                              onChange={(e) => {
                                const updated = tempProducts.map((p) =>
                                  p.id === current.id
                                    ? {
                                        ...p,
                                        specifications: {
                                          ...p.specifications,
                                          temperatureRange: e.target.value,
                                        },
                                      }
                                    : p
                                );
                                setTempProducts(updated);
                              }}
                              className="w-full px-2 py-1.5 bg-zinc-950 border border-white/15 text-white text-xs font-tech rounded-sm"
                            />
                          </div>

                          <div>
                            <span className="text-[9px] text-zinc-400 font-tech uppercase block mb-1">
                              Material Grade
                            </span>
                            <input
                              type="text"
                              value={current.specifications.material || ''}
                              placeholder="e.g., AISI 304 Food-Grade Stainless"
                              onChange={(e) => {
                                const updated = tempProducts.map((p) =>
                                  p.id === current.id
                                    ? {
                                        ...p,
                                        specifications: {
                                          ...p.specifications,
                                          material: e.target.value,
                                        },
                                      }
                                    : p
                                );
                                setTempProducts(updated);
                              }}
                              className="w-full px-2 py-1.5 bg-zinc-950 border border-white/15 text-white text-xs font-tech rounded-sm"
                            />
                          </div>

                          <div>
                            <span className="text-[9px] text-zinc-400 font-tech uppercase block mb-1">
                              Cooking Surface / Finish
                            </span>
                            <input
                              type="text"
                              value={current.specifications.cookingSurface || ''}
                              placeholder="e.g., 12mm Mirror Polished Plate"
                              onChange={(e) => {
                                const updated = tempProducts.map((p) =>
                                  p.id === current.id
                                    ? {
                                        ...p,
                                        specifications: {
                                          ...p.specifications,
                                          cookingSurface: e.target.value,
                                        },
                                      }
                                    : p
                                );
                                setTempProducts(updated);
                              }}
                              className="w-full px-2 py-1.5 bg-zinc-950 border border-white/15 text-white text-xs font-tech rounded-sm"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Product Sizes & Variant Configurations Manager */}
                      <div className="pt-4 border-t border-white/10 space-y-3">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="text-[11px] font-tech uppercase text-amber-400 font-bold tracking-wider">
                                SIZES & CONFIGURATIONS MANAGER
                              </span>
                              <span className="text-[10px] font-tech px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                                {(current.variants || []).length} Sizes Configured
                              </span>
                            </div>
                            <span className="text-[10px] text-zinc-400 font-tech">
                              For products with multiple sizes (Barfi trays, GN pans, Masala boxes, etc.). Add, edit, or remove each size option.
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => {
                                const currentVars = current.variants || [];
                                const newId = `var-${Date.now()}`;
                                const newVar: ProductSizeVariant = {
                                  id: newId,
                                  sizeName: `New Size Option ${(currentVars.length + 1)}`,
                                  dimensions: '10" × 14" × 1"',
                                  depth: '1"',
                                  weight: '0.800 kg',
                                  modelCode: `${current.productCode}-${currentVars.length + 1}`,
                                  finalCustomerPrice: current.finalCustomerPrice || 900,
                                };
                                const updated = tempProducts.map((p) =>
                                  p.id === current.id
                                    ? { ...p, variants: [...(p.variants || []), newVar] }
                                    : p
                                );
                                setTempProducts(updated);
                                updateProducts(updated);
                                showToast(`Added new size to ${current.name}!`);
                              }}
                              className="px-2.5 py-1 bg-amber-500 text-black font-tech font-bold text-[11px] uppercase rounded-sm hover:bg-amber-400 flex items-center gap-1"
                            >
                              <Plus className="w-3 h-3" />
                              <span>Add Size</span>
                            </button>

                            {(current.variants && current.variants.length > 0) && (
                              <button
                                type="button"
                                onClick={() => {
                                  const currentVars = current.variants || [];
                                  const lastVar = currentVars[currentVars.length - 1];
                                  const cloned: ProductSizeVariant = {
                                    ...lastVar,
                                    id: `var-${Date.now()}`,
                                    sizeName: `${lastVar.sizeName} (Copy)`,
                                    modelCode: `${lastVar.modelCode || current.productCode}-copy`,
                                  };
                                  const updated = tempProducts.map((p) =>
                                    p.id === current.id
                                      ? { ...p, variants: [...(p.variants || []), cloned] }
                                      : p
                                  );
                                  setTempProducts(updated);
                                  updateProducts(updated);
                                  showToast(`Cloned size in ${current.name}!`);
                                }}
                                className="px-2.5 py-1 bg-zinc-800 text-zinc-200 border border-white/20 font-tech font-bold text-[11px] uppercase rounded-sm hover:bg-zinc-700"
                              >
                                Clone Last Size
                              </button>
                            )}
                          </div>
                        </div>

                        {/* List of Variant Rows */}
                        {(!current.variants || current.variants.length === 0) ? (
                          <div className="p-4 rounded border border-dashed border-white/15 bg-zinc-950 text-center">
                            <p className="text-xs text-zinc-400 font-tech mb-2">
                              This product currently has no size variants. It is displayed as a single item.
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                const newVar: ProductSizeVariant = {
                                  id: `var-${Date.now()}`,
                                  sizeName: 'Standard Size',
                                  dimensions: current.specifications.dimensions || 'Standard',
                                  weight: current.specifications.weight || '',
                                  modelCode: current.productCode,
                                  finalCustomerPrice: current.finalCustomerPrice || 0,
                                };
                                const updated = tempProducts.map((p) =>
                                  p.id === current.id
                                    ? { ...p, variants: [newVar] }
                                    : p
                                );
                                setTempProducts(updated);
                                updateProducts(updated);
                                showToast(`Initialized sizes for ${current.name}!`);
                              }}
                              className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white font-tech text-xs uppercase rounded-sm"
                            >
                              Initialize Size Variants Table
                            </button>
                          </div>
                        ) : (
                          <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                            {current.variants.map((v, idx) => (
                              <div
                                key={v.id}
                                className="p-3 rounded bg-zinc-950/80 border border-white/10 hover:border-white/25 transition-colors space-y-2"
                              >
                                <div className="flex items-center justify-between gap-2 border-b border-white/10 pb-2">
                                  <div className="flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-full bg-white/10 text-amber-400 text-[10px] font-tech font-bold flex items-center justify-center">
                                      {idx + 1}
                                    </span>
                                    <span className="text-xs font-tech font-bold text-white">
                                      {v.sizeName || `Size #${idx + 1}`}
                                    </span>
                                    {v.modelCode && (
                                      <span className="text-[10px] font-tech text-zinc-400 bg-white/5 px-1.5 py-0.5 rounded">
                                        {v.modelCode}
                                      </span>
                                    )}
                                  </div>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const filtered = (current.variants || []).filter((item) => item.id !== v.id);
                                      const updated = tempProducts.map((p) =>
                                        p.id === current.id ? { ...p, variants: filtered } : p
                                      );
                                      setTempProducts(updated);
                                      updateProducts(updated);
                                      showToast(`Removed size option!`);
                                    }}
                                    className="p-1 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded transition-colors"
                                    title="Delete this size"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs font-tech">
                                  <div>
                                    <label className="block text-[9px] uppercase text-zinc-400 mb-0.5">
                                      Size / Option Name
                                    </label>
                                    <input
                                      type="text"
                                      value={v.sizeName}
                                      placeholder="e.g. No. 000 (0.4&quot; Depth)"
                                      onChange={(e) => {
                                        const updatedVars = (current.variants || []).map((item) =>
                                          item.id === v.id ? { ...item, sizeName: e.target.value } : item
                                        );
                                        const updated = tempProducts.map((p) =>
                                          p.id === current.id ? { ...p, variants: updatedVars } : p
                                        );
                                        setTempProducts(updated);
                                      }}
                                      className="w-full px-2 py-1 bg-zinc-900 border border-white/10 text-white rounded-sm text-xs font-tech"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[9px] uppercase text-zinc-400 mb-0.5">
                                      Dimensions
                                    </label>
                                    <input
                                      type="text"
                                      value={v.dimensions || ''}
                                      placeholder="e.g. 10.5&quot; × 14.5&quot; × 0.4&quot;"
                                      onChange={(e) => {
                                        const updatedVars = (current.variants || []).map((item) =>
                                          item.id === v.id ? { ...item, dimensions: e.target.value } : item
                                        );
                                        const updated = tempProducts.map((p) =>
                                          p.id === current.id ? { ...p, variants: updatedVars } : p
                                        );
                                        setTempProducts(updated);
                                      }}
                                      className="w-full px-2 py-1 bg-zinc-900 border border-white/10 text-white rounded-sm text-xs font-tech"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[9px] uppercase text-zinc-400 mb-0.5">
                                      Depth / Height
                                    </label>
                                    <input
                                      type="text"
                                      value={v.depth || ''}
                                      placeholder="e.g. 0.4&quot; or 65 mm"
                                      onChange={(e) => {
                                        const updatedVars = (current.variants || []).map((item) =>
                                          item.id === v.id ? { ...item, depth: e.target.value } : item
                                        );
                                        const updated = tempProducts.map((p) =>
                                          p.id === current.id ? { ...p, variants: updatedVars } : p
                                        );
                                        setTempProducts(updated);
                                      }}
                                      className="w-full px-2 py-1 bg-zinc-900 border border-white/10 text-white rounded-sm text-xs font-tech"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[9px] uppercase text-zinc-400 mb-0.5">
                                      Weight / Capacity
                                    </label>
                                    <input
                                      type="text"
                                      value={v.weight || v.capacity || ''}
                                      placeholder="e.g. 0.700 kg / 9.5 L"
                                      onChange={(e) => {
                                        const updatedVars = (current.variants || []).map((item) =>
                                          item.id === v.id ? { ...item, weight: e.target.value, capacity: e.target.value } : item
                                        );
                                        const updated = tempProducts.map((p) =>
                                          p.id === current.id ? { ...p, variants: updatedVars } : p
                                        );
                                        setTempProducts(updated);
                                      }}
                                      className="w-full px-2 py-1 bg-zinc-900 border border-white/10 text-white rounded-sm text-xs font-tech"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[9px] uppercase text-zinc-400 mb-0.5">
                                      Item Model / Code
                                    </label>
                                    <input
                                      type="text"
                                      value={v.modelCode || ''}
                                      placeholder="e.g. SDS-BT-000"
                                      onChange={(e) => {
                                        const updatedVars = (current.variants || []).map((item) =>
                                          item.id === v.id ? { ...item, modelCode: e.target.value } : item
                                        );
                                        const updated = tempProducts.map((p) =>
                                          p.id === current.id ? { ...p, variants: updatedVars } : p
                                        );
                                        setTempProducts(updated);
                                      }}
                                      className="w-full px-2 py-1 bg-zinc-900 border border-white/10 text-white rounded-sm text-xs font-tech"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[9px] uppercase text-zinc-400 mb-0.5">
                                      Price (₹)
                                    </label>
                                    <input
                                      type="number"
                                      value={v.finalCustomerPrice || v.netPrice || v.listPrice || ''}
                                      placeholder="e.g. 765"
                                      onChange={(e) => {
                                        const val = e.target.value ? Number(e.target.value) : undefined;
                                        const updatedVars = (current.variants || []).map((item) =>
                                          item.id === v.id
                                            ? { ...item, finalCustomerPrice: val, netPrice: val, listPrice: val }
                                            : item
                                        );
                                        const updated = tempProducts.map((p) =>
                                          p.id === current.id ? { ...p, variants: updatedVars } : p
                                        );
                                        setTempProducts(updated);
                                      }}
                                      className="w-full px-2 py-1 bg-zinc-900 border border-white/10 text-white rounded-sm text-xs font-tech"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-[9px] uppercase text-zinc-400 mb-0.5">
                                      List Price (₹)
                                    </label>
                                    <input
                                      type="number"
                                      value={v.listPrice || ''}
                                      placeholder="Optional list price"
                                      onChange={(e) => {
                                        const val = e.target.value ? Number(e.target.value) : undefined;
                                        const updatedVars = (current.variants || []).map((item) =>
                                          item.id === v.id ? { ...item, listPrice: val } : item
                                        );
                                        const updated = tempProducts.map((p) =>
                                          p.id === current.id ? { ...p, variants: updatedVars } : p
                                        );
                                        setTempProducts(updated);
                                      }}
                                      className="w-full px-2 py-1 bg-zinc-900 border border-white/10 text-white rounded-sm text-xs font-tech"
                                    />
                                  </div>

                                  <div className="flex items-end">
                                    <button
                                      type="button"
                                      onClick={() => {
                                        updateProducts(tempProducts);
                                        showToast(`Saved size "${v.sizeName}"!`);
                                      }}
                                      className="w-full py-1 bg-white/10 hover:bg-white/20 text-white text-[11px] font-tech font-bold uppercase rounded-sm transition-colors"
                                    >
                                      Save Size
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      {/* Product Technical Documents / Spec Sheets Upload */}
                      <div className="pt-4 border-t border-white/10">
                        <DocumentUploadField
                          documents={current.documents || []}
                          onChange={(docs) => {
                            const updated = tempProducts.map((p) =>
                              p.id === current.id ? { ...p, documents: docs } : p
                            );
                            setTempProducts(updated);
                            updateProducts(updated);
                            showToast(`Updated documents for ${current.model}!`);
                          }}
                        />
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-white/10">
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={current.isFeatured}
                            onChange={(e) => {
                              const updated = tempProducts.map((p) =>
                                p.id === current.id ? { ...p, isFeatured: e.target.checked } : p
                              );
                              setTempProducts(updated);
                              setHasUncommittedChanges(true);
                            }}
                            className="rounded text-white"
                          />
                          <span className="text-xs font-tech text-zinc-300">
                            Show in Featured Equipment on Homepage
                          </span>
                        </label>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingProductId(null);
                              showToast(`Staged changes for ${current.model}. Click "COMMIT CATALOG CHANGES" to save.`);
                            }}
                            className="px-4 py-1.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 font-tech font-bold text-xs uppercase rounded-sm transition-colors border border-white/15"
                          >
                            DONE WITH THIS ITEM
                          </button>
                          <button
                            type="button"
                            onClick={handleSaveProducts}
                            className="px-4 py-1.5 bg-white text-zinc-950 font-tech font-bold text-xs uppercase rounded-sm hover:bg-zinc-200 transition-colors flex items-center gap-1.5"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>COMMIT CATALOG CHANGES</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })()
              ) : null}

              {/* Search and Summary Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
                <div className="relative flex-1 max-w-sm">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
                  <input
                    type="text"
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    placeholder="Filter equipment by model, name or category..."
                    className="w-full pl-9 pr-3 py-1.5 bg-zinc-900 border border-white/15 text-white rounded-sm font-tech text-xs placeholder:text-zinc-500 focus:outline-hidden focus:border-amber-400 transition-colors"
                  />
                  {productSearch && (
                    <button
                      type="button"
                      onClick={() => setProductSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                <div className="text-xs font-tech text-zinc-400 flex items-center gap-3">
                  <span>
                    Showing <strong className="text-white">
                      {tempProducts.filter((p) => {
                        const q = productSearch.toLowerCase().trim();
                        if (!q) return true;
                        return (
                          p.name.toLowerCase().includes(q) ||
                          p.model.toLowerCase().includes(q) ||
                          p.productCode.toLowerCase().includes(q) ||
                          p.category.toLowerCase().includes(q)
                        );
                      }).length}
                    </strong> of <strong className="text-white">{tempProducts.length}</strong> items
                  </span>
                  {tempProducts.length !== products.length && (
                    <span className="text-amber-400 font-bold">
                      ({tempProducts.length < products.length
                        ? `${products.length - tempProducts.length} removed from staging`
                        : `${tempProducts.length - products.length} added to staging`})
                    </span>
                  )}
                </div>
              </div>

              {/* Product List Table */}
              <div className="border border-white/10 rounded-sm overflow-hidden">
                <table className="w-full text-left text-xs">
                  <thead className="bg-zinc-950 text-zinc-400 font-tech uppercase border-b border-white/10">
                    <tr>
                      <th className="py-2.5 px-3">Thumb</th>
                      <th className="py-2.5 px-3">Model</th>
                      <th className="py-2.5 px-3">Name</th>
                      <th className="py-2.5 px-3">Category</th>
                      <th className="py-2.5 px-3">Power</th>
                      <th className="py-2.5 px-3">Featured</th>
                      <th className="py-2.5 px-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-tech">
                    {tempProducts
                      .filter((p) => {
                        const q = productSearch.toLowerCase().trim();
                        if (!q) return true;
                        return (
                          p.name.toLowerCase().includes(q) ||
                          p.model.toLowerCase().includes(q) ||
                          p.productCode.toLowerCase().includes(q) ||
                          p.category.toLowerCase().includes(q)
                        );
                      })
                      .map((p) => {
                        const isEditingThis = editingProductId === p.id;
                        return (
                          <tr
                            key={p.id}
                            className={`transition-colors ${
                              isEditingThis
                                ? 'bg-amber-500/10 border-l-2 border-amber-400'
                                : 'hover:bg-white/[0.02]'
                            }`}
                          >
                            <td className="py-2 px-3">
                              {p.mainImage ? (
                                <img
                                  src={p.mainImage}
                                  alt=""
                                  className="w-10 h-10 object-cover rounded bg-zinc-900 border border-white/10"
                                  referrerPolicy="no-referrer"
                                />
                              ) : (
                                <div className="w-10 h-10 rounded bg-zinc-900 border border-white/10 flex items-center justify-center text-[9px] text-zinc-500 font-tech">
                                  NO IMG
                                </div>
                              )}
                            </td>
                            <td className="py-2 px-3 font-bold text-white font-mono">
                              {p.model}
                              {isEditingThis && (
                                <span className="ml-1.5 px-1 py-0.2 rounded text-[9px] font-bold uppercase bg-amber-400 text-black">
                                  EDITING
                                </span>
                              )}
                            </td>
                            <td className="py-2 px-3 text-zinc-300 max-w-[200px] truncate">{p.name}</td>
                            <td className="py-2 px-3 text-zinc-400 uppercase">{p.category}</td>
                            <td className="py-2 px-3 text-zinc-400">{p.specifications.power || '—'}</td>
                            <td className="py-2 px-3">
                              <button
                                type="button"
                                onClick={() => {
                                  const updated = tempProducts.map((item) =>
                                    item.id === p.id ? { ...item, isFeatured: !item.isFeatured } : item
                                  );
                                  setTempProducts(updated);
                                  setHasUncommittedChanges(true);
                                  showToast(
                                    p.isFeatured
                                      ? `Removed "${p.model}" from featured`
                                      : `⭐ Marked "${p.model}" as featured equipment!`
                                  );
                                }}
                                className={`px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase transition-colors flex items-center gap-1 ${
                                  p.isFeatured
                                    ? 'bg-amber-400 text-black hover:bg-amber-300'
                                    : 'bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700'
                                }`}
                                title="Click to toggle featured on homepage"
                              >
                                <Star className={`w-3 h-3 ${p.isFeatured ? 'fill-black' : ''}`} />
                                <span>{p.isFeatured ? 'YES' : 'NO'}</span>
                              </button>
                            </td>
                            <td className="py-2 px-3 text-right space-x-2 whitespace-nowrap">
                              <button
                                type="button"
                                onClick={() => handleStartEdit(p.id)}
                                className={`p-1.5 rounded transition-colors ${
                                  isEditingThis
                                    ? 'bg-amber-400 text-black'
                                    : 'text-zinc-400 hover:text-white hover:bg-white/10'
                                }`}
                                title="Edit specs & variants"
                              >
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleRequestDeleteProduct(p)}
                                className="p-1.5 rounded text-zinc-500 hover:text-rose-400 hover:bg-rose-950/40 transition-colors"
                                title="Delete this equipment item"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>
              </div>

              {/* Bottom Commit & Discard Toolbar */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-white/10">
                <div className="text-xs font-tech text-zinc-400">
                  <span>
                    Staged catalog has <strong className="text-white">{tempProducts.length}</strong> active items.
                  </span>
                  {(hasUncommittedChanges || tempProducts.length !== products.length) && (
                    <span className="block sm:inline sm:ml-2 text-amber-400 font-bold">
                      • Click "COMMIT CATALOG CHANGES" to save live.
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setTempProducts(products);
                      setEditingProductId(null);
                      setRecentlyDeleted(null);
                      setHasUncommittedChanges(false);
                      showToast('Reverted staging changes to live catalog.');
                    }}
                    disabled={!hasUncommittedChanges && tempProducts.length === products.length}
                    className="px-4 py-2.5 text-xs font-tech font-bold uppercase rounded-sm border border-white/15 text-zinc-400 hover:text-white hover:bg-white/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                  >
                    DISCARD STAGED CHANGES
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveProducts}
                    className={`px-6 py-2.5 font-bold font-tech text-xs uppercase tracking-wider rounded-sm flex items-center gap-2 transition-all shadow-md ${
                      hasUncommittedChanges || tempProducts.length !== products.length
                        ? 'bg-amber-400 text-black hover:bg-amber-300 ring-2 ring-amber-300'
                        : 'bg-white text-zinc-950 hover:bg-zinc-200'
                    }`}
                  >
                    <Save className="w-4 h-4" />
                    <span>COMMIT CATALOG CHANGES ({tempProducts.length} ITEMS)</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: CATEGORIES */}
          {activeTab === 'categories' && (
            <div className="space-y-6 max-w-3xl">
              {/* Homepage Category Portal Showcase Photos */}
              <div className="p-4 bg-zinc-900/60 border border-white/10 rounded-sm space-y-4">
                <div className="flex items-center justify-between pb-2 border-b border-white/10">
                  <div>
                    <h3 className="text-sm font-bold uppercase text-white font-tech">
                      Homepage Category Portal Showcase Photos
                    </h3>
                    <p className="text-[11px] text-zinc-400">
                      Upload or replace photos shown on the 3 primary cards on the homepage (Category 01, Category 02, Category 03).
                    </p>
                  </div>
                  <span className="text-[10px] font-tech text-emerald-400 font-bold uppercase">
                    Auto-Saves to Website
                  </span>
                </div>

                <div className="space-y-4">
                  <ImageUploadField
                    label="Category 01: Commercial Kitchen Equipment"
                    value={tempBrand.portalCategoryImages?.commercial || '/images/products/tsl81_front.jpg'}
                    onChange={(val) => {
                      const updated = {
                        ...tempBrand,
                        portalCategoryImages: {
                          ...tempBrand.portalCategoryImages,
                          commercial: val,
                        },
                      };
                      setTempBrand(updated);
                      updateBrand(updated);
                      showToast('Category 01 photo updated and saved!');
                    }}
                    helperText="Displayed on Category 01 portal card (e.g. Commercial Deep Fryer, Range, Oven)."
                  />

                  <ImageUploadField
                    label="Category 02: Gastronorm (GN) Pans & Covers"
                    value={tempBrand.portalCategoryImages?.gnpans || 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'}
                    onChange={(val) => {
                      const updated = {
                        ...tempBrand,
                        portalCategoryImages: {
                          ...tempBrand.portalCategoryImages,
                          gnpans: val,
                        },
                      };
                      setTempBrand(updated);
                      updateBrand(updated);
                      showToast('Category 02 photo updated and saved!');
                    }}
                    helperText="Displayed on Category 02 portal card (e.g. EN 631 Standard GN Food Storage Pans)."
                  />

                  <ImageUploadField
                    label="Category 03: Kitchenware & Utility (In-House)"
                    value={tempBrand.portalCategoryImages?.manufacturing || 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80'}
                    onChange={(val) => {
                      const updated = {
                        ...tempBrand,
                        portalCategoryImages: {
                          ...tempBrand.portalCategoryImages,
                          manufacturing: val,
                        },
                      };
                      setTempBrand(updated);
                      updateBrand(updated);
                      showToast('Category 03 photo updated and saved!');
                    }}
                    helperText="Displayed on Category 03 portal card (e.g. Barfi Trays, Masala Dabbas, Wire Baskets)."
                  />
                </div>
              </div>

              <div className="p-4 bg-zinc-900/60 border border-white/10 rounded-sm space-y-4">
                <h3 className="text-sm font-bold uppercase text-white font-tech">
                  Equipment Category Definitions
                </h3>

                <div className="space-y-4">
                  {tempCategories.map((cat, idx) => (
                    <div key={cat.id} className="p-3 bg-zinc-900 border border-white/10 rounded-sm space-y-2">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-tech uppercase text-zinc-400 mb-0.5">
                            Category Title
                          </label>
                          <input
                            type="text"
                            value={cat.name}
                            onChange={(e) => {
                              const next = [...tempCategories];
                              next[idx].name = e.target.value;
                              setTempCategories(next);
                            }}
                            className="w-full px-2.5 py-1.5 bg-zinc-950 border border-white/15 text-white rounded-sm text-xs font-tech"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-tech uppercase text-zinc-400 mb-0.5">
                            Category Slug
                          </label>
                          <input
                            type="text"
                            value={cat.slug}
                            onChange={(e) => {
                              const next = [...tempCategories];
                              next[idx].slug = e.target.value;
                              setTempCategories(next);
                            }}
                            className="w-full px-2.5 py-1.5 bg-zinc-950 border border-white/15 text-white rounded-sm text-xs font-mono"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-tech uppercase text-zinc-400 mb-0.5">
                          Category Image URL
                        </label>
                        <input
                          type="text"
                          value={cat.image}
                          onChange={(e) => {
                            const next = [...tempCategories];
                            next[idx].image = e.target.value;
                            setTempCategories(next);
                          }}
                          className="w-full px-2.5 py-1.5 bg-zinc-950 border border-white/15 text-white rounded-sm text-xs font-mono"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-tech uppercase text-zinc-400 mb-0.5">
                          Short Description
                        </label>
                        <input
                          type="text"
                          value={cat.shortDescription}
                          onChange={(e) => {
                            const next = [...tempCategories];
                            next[idx].shortDescription = e.target.value;
                            setTempCategories(next);
                          }}
                          className="w-full px-2.5 py-1.5 bg-zinc-950 border border-white/15 text-white rounded-sm text-xs"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleSaveCategories}
                  className="px-6 py-2.5 bg-white text-zinc-950 font-bold font-tech text-xs uppercase tracking-wider rounded-sm flex items-center gap-2 hover:bg-zinc-200"
                >
                  <Save className="w-4 h-4" />
                  <span>SAVE CATEGORIES</span>
                </button>
              </div>
            </div>
          )}

          {/* TAB 6: BACKUP & RESTORE JSON */}
          {activeTab === 'json' && (
            <div className="space-y-6 max-w-3xl">
              <div className="p-4 bg-zinc-900/60 border border-white/10 rounded-sm space-y-4">
                <h3 className="text-sm font-bold uppercase text-white font-tech">
                  Portability & JSON Data Backup
                </h3>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Export all your current brand information, custom equipment models, technical specifications, and phone numbers as a clean JSON file. You can restore this file at any time or migrate it to another server.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 pt-2">
                  <button
                    onClick={handleExportJson}
                    className="px-5 py-3 bg-white text-zinc-950 font-bold font-tech text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 hover:bg-zinc-200"
                  >
                    <Download className="w-4 h-4" />
                    <span>EXPORT COMPLETE DATA (.JSON)</span>
                  </button>

                  <label className="px-5 py-3 bg-zinc-800 hover:bg-zinc-700 text-white font-bold font-tech text-xs uppercase tracking-wider rounded-sm flex items-center justify-center gap-2 cursor-pointer border border-white/10">
                    <Upload className="w-4 h-4" />
                    <span>RESTORE FROM JSON FILE</span>
                    <input
                      type="file"
                      accept=".json"
                      onChange={handleImportJson}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              <div className="p-4 bg-rose-950/20 border border-rose-500/20 rounded-sm space-y-2">
                <h4 className="text-xs font-bold font-tech uppercase text-rose-300">
                  Reset To Factory Initial State
                </h4>
                <p className="text-[11px] text-zinc-400">
                  Revert all customized content and products back to the original default industrial equipment showcase catalog.
                </p>
                <button
                  type="button"
                  onClick={() => setShowResetConfirmModal(true)}
                  className="px-4 py-2 bg-rose-900/50 hover:bg-rose-900 text-rose-200 border border-rose-700/50 rounded-sm font-tech text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>RESET TO FACTORY DEFAULTS</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Safe In-App Delete Confirmation Modal (Works reliably in iframe sandboxes) */}
      {productToDelete && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="max-w-md w-full rounded-sm border border-rose-500/40 bg-zinc-950 text-white p-6 shadow-2xl space-y-4 ring-1 ring-rose-500/20">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-full bg-rose-500/15 text-rose-400 shrink-0">
                <Trash2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase font-tech text-white tracking-wide">
                  Remove Equipment From Catalog?
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  This item will be removed from your staging list immediately. Click <strong className="text-white">"COMMIT CATALOG CHANGES"</strong> afterwards to update the live catalog permanently.
                </p>
              </div>
            </div>

            <div className="p-3 rounded-sm border border-white/10 bg-zinc-900 flex items-center gap-3">
              {productToDelete.mainImage ? (
                <img
                  src={productToDelete.mainImage}
                  alt=""
                  className="w-12 h-12 rounded-sm object-cover border border-white/10 shrink-0 bg-zinc-950"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-12 h-12 rounded-sm bg-zinc-800 flex items-center justify-center text-[10px] text-zinc-500 font-tech shrink-0">
                  NO IMG
                </div>
              )}
              <div className="overflow-hidden min-w-0">
                <div className="font-bold text-xs font-tech text-white truncate">{productToDelete.name}</div>
                <div className="text-[11px] text-zinc-400 font-tech">
                  Model: <span className="text-amber-400 font-bold font-mono">{productToDelete.model}</span>
                </div>
                <div className="text-[10px] text-zinc-500 font-tech uppercase truncate">
                  Category: {productToDelete.category}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setProductToDelete(null)}
                className="px-4 py-2 text-xs font-tech font-bold uppercase rounded-sm border border-white/15 text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleConfirmDeleteProduct}
                className="px-5 py-2 text-xs font-tech font-bold uppercase rounded-sm bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 transition-colors shadow-md font-black"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove From Catalog</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Safe In-App Factory Reset Confirmation Modal */}
      {showResetConfirmModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="max-w-md w-full rounded-sm border border-rose-500/40 bg-zinc-950 text-white p-6 shadow-2xl space-y-4 ring-1 ring-rose-500/20">
            <div className="flex items-start gap-3">
              <div className="p-2.5 rounded-full bg-rose-500/15 text-rose-400 shrink-0">
                <RotateCcw className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold uppercase font-tech text-white tracking-wide">
                  Reset To Factory Initial State?
                </h3>
                <p className="text-xs text-zinc-400 mt-1">
                  This will revert all customized products, brand settings, categories, and specs back to default factory settings.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2.5 pt-2">
              <button
                type="button"
                onClick={() => setShowResetConfirmModal(false)}
                className="px-4 py-2 text-xs font-tech font-bold uppercase rounded-sm border border-white/15 text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  resetToDefaults();
                  setShowResetConfirmModal(false);
                  setAdminModalOpen(false);
                }}
                className="px-5 py-2 text-xs font-tech font-bold uppercase rounded-sm bg-rose-600 hover:bg-rose-500 text-white flex items-center gap-1.5 transition-colors shadow-md font-black"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Everything</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
