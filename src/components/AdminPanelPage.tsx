import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { ProductItem, ProductCategory, BusinessDivision } from '../types';
import {
  ShieldCheck,
  Package,
  Layers,
  Sliders,
  LogOut,
  ExternalLink,
  Plus,
  Search,
  Edit2,
  Trash2,
  Camera,
  Star,
  Download,
  Upload,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  Menu,
  Phone,
  Building,
  DollarSign,
  ArrowRight,
  Filter,
} from 'lucide-react';
import { CategoryImageEditModal } from './CategoryImageEditModal';

export const AdminPanelPage: React.FC = () => {
  const {
    brand,
    updateBrand,
    products,
    categories,
    commercialProducts,
    manufacturingProducts,
    gnPanProducts,
    isAdmin,
    adminUser,
    logoutAdmin,
    setActivePage,
    setAdminModalOpen,
    openAdminModalForProduct,
    openImageEditModal,
    deleteProduct,
    toggleProductFeatured,
    duplicateProduct,
    resetToDefaults,
    exportConfigJson,
    importConfigJson,
    themeMode,
  } = useContent();

  const isLight = themeMode === 'light';

  // If not logged in, show access denied prompt with redirect to login
  if (!isAdmin) {
    return (
      <div
        className={`min-h-[80vh] flex items-center justify-center p-6 ${
          isLight ? 'bg-slate-50 text-slate-900' : 'bg-[#0a0c0f] text-zinc-100'
        }`}
      >
        <div
          className={`max-w-md w-full p-8 rounded-xs border text-center ${
            isLight ? 'bg-white border-slate-300' : 'bg-zinc-900 border-white/10'
          }`}
        >
          <div className="w-14 h-14 rounded-full bg-red-500/10 text-red-500 border border-red-500/20 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-tech font-bold uppercase tracking-wider mb-2">
            ADMINISTRATOR ACCESS REQUIRED
          </h2>
          <p
            className={`text-xs mb-6 ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            This section is restricted to authorized Shree Durga Steels administrators. Normal users can only view the website.
          </p>
          <button
            onClick={() => setActivePage('admin-login')}
            className="w-full py-2.5 px-4 rounded-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
          >
            GO TO ADMIN LOGIN PAGE
          </button>
        </div>
      </div>
    );
  }

  const [activeTab, setActiveTab] = useState<'products' | 'categories' | 'quick-settings' | 'backup'>('products');
  const [productSearch, setProductSearch] = useState('');
  const [divisionFilter, setDivisionFilter] = useState<'all' | BusinessDivision>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [notification, setNotification] = useState('');
  const [productToDelete, setProductToDelete] = useState<ProductItem | null>(null);
  const [editingCategoryKey, setEditingCategoryKey] = useState<'commercial' | 'gnpans' | 'manufacturing' | null>(null);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 4000);
  };

  // Filter products for the products tab
  const filteredProducts = products.filter((p) => {
    if (divisionFilter !== 'all' && p.division !== divisionFilter) return false;
    if (categoryFilter !== 'all' && p.category !== categoryFilter) return false;
    if (productSearch.trim()) {
      const q = productSearch.toLowerCase();
      const matchName = p.name.toLowerCase().includes(q);
      const matchModel = p.model.toLowerCase().includes(q);
      const matchCategory = p.category.toLowerCase().includes(q);
      return matchName || matchModel || matchCategory;
    }
    return true;
  });

  const handleExportJson = () => {
    try {
      const jsonStr = exportConfigJson();
      const blob = new Blob([jsonStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `shri-durga-steels-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showToast('Configuration exported and downloaded successfully.');
    } catch {
      showToast('Export failed. Please try again.');
    }
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const ok = importConfigJson(text);
        if (ok) {
          showToast('Configuration imported successfully!');
        } else {
          showToast('Invalid JSON backup file structure.');
        }
      } catch {
        showToast('Error parsing JSON backup file.');
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div
      className={`min-h-screen ${
        isLight ? 'bg-slate-100 text-slate-900' : 'bg-[#0a0c0f] text-zinc-100'
      }`}
    >
      {/* Top Admin Banner */}
      <div
        className={`border-b px-4 sm:px-8 py-4 backdrop-blur-md sticky top-0 z-30 ${
          isLight
            ? 'bg-white/95 border-slate-300 shadow-xs'
            : 'bg-zinc-950/95 border-white/10 shadow-md'
        }`}
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xs bg-amber-500 text-slate-950 flex items-center justify-center shadow-sm font-tech font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base sm:text-lg font-tech font-black uppercase tracking-wider">
                  MASTER ADMIN CONTROL PANEL
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30">
                  Active Admin ({adminUser || 'Admin'})
                </span>
              </div>
              <p className="text-[11px] text-zinc-500">
                {brand.brandName} • Manage catalog, pricing, divisions, and website layout
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActivePage('home')}
              className={`px-3 py-1.5 rounded-xs text-xs font-tech font-bold uppercase tracking-wider border flex items-center gap-1.5 transition-colors ${
                isLight
                  ? 'border-slate-300 hover:bg-slate-200 text-slate-800'
                  : 'border-white/10 hover:bg-zinc-800 text-zinc-300'
              }`}
              title="Return to public site to view changes live"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </button>

            <button
              onClick={() => setAdminModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xs text-xs font-tech font-bold uppercase tracking-wider bg-amber-500 hover:bg-amber-400 text-slate-950 flex items-center gap-1.5 transition-colors shadow-sm"
              title="Launch full popup CMS with detailed specifications editor"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Full CMS Editor</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="px-3 py-1.5 rounded-xs text-xs font-tech font-bold uppercase tracking-wider border border-red-500/30 text-red-500 hover:bg-red-500/10 flex items-center gap-1.5 transition-colors"
              title="Log out of administrator mode"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-8 space-y-6">
        {/* Notification Toast */}
        {notification && (
          <div className="p-3.5 rounded-xs bg-emerald-500/10 border border-emerald-500/40 text-emerald-700 dark:text-emerald-300 text-xs font-tech font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-500" />
            <span>{notification}</span>
          </div>
        )}

        {/* Dashboard Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div
            className={`p-4 rounded-xs border ${
              isLight ? 'bg-white border-slate-300' : 'bg-zinc-900 border-white/10'
            }`}
          >
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[11px] font-tech font-bold uppercase tracking-wider">
                Total Products
              </span>
              <Package className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-tech font-black">{products.length}</div>
            <span className="text-[10px] text-zinc-500">Live in catalog</span>
          </div>

          <div
            className={`p-4 rounded-xs border ${
              isLight ? 'bg-white border-slate-300' : 'bg-zinc-900 border-white/10'
            }`}
          >
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[11px] font-tech font-bold uppercase tracking-wider">
                Commercial Kitchen
              </span>
              <Building className="w-4 h-4 text-blue-500" />
            </div>
            <div className="text-2xl font-tech font-black">{commercialProducts.length}</div>
            <span className="text-[10px] text-zinc-500">Equipment models</span>
          </div>

          <div
            className={`p-4 rounded-xs border ${
              isLight ? 'bg-white border-slate-300' : 'bg-zinc-900 border-white/10'
            }`}
          >
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[11px] font-tech font-bold uppercase tracking-wider">
                Manufacturing Trays
              </span>
              <Layers className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-tech font-black">{manufacturingProducts.length}</div>
            <span className="text-[10px] text-zinc-500">In-house fabricated items</span>
          </div>

          <div
            className={`p-4 rounded-xs border ${
              isLight ? 'bg-white border-slate-300' : 'bg-zinc-900 border-white/10'
            }`}
          >
            <div className="flex items-center justify-between text-zinc-400 mb-1">
              <span className="text-[11px] font-tech font-bold uppercase tracking-wider">
                Gastronorm Pans
              </span>
              <DollarSign className="w-4 h-4 text-purple-500" />
            </div>
            <div className="text-2xl font-tech font-black">{gnPanProducts.length}</div>
            <span className="text-[10px] text-zinc-500">GN sizes & food pans</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div
          className={`border-b flex items-center gap-1 sm:gap-2 overflow-x-auto ${
            isLight ? 'border-slate-300' : 'border-white/10'
          }`}
        >
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-4 text-xs font-tech font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'products'
                ? 'border-amber-500 text-amber-500 font-black'
                : isLight
                ? 'border-transparent text-slate-600 hover:text-slate-900'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Products & Equipment ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`py-3 px-4 text-xs font-tech font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'categories'
                ? 'border-amber-500 text-amber-500 font-black'
                : isLight
                ? 'border-transparent text-slate-600 hover:text-slate-900'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('quick-settings')}
            className={`py-3 px-4 text-xs font-tech font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'quick-settings'
                ? 'border-amber-500 text-amber-500 font-black'
                : isLight
                ? 'border-transparent text-slate-600 hover:text-slate-900'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Menu className="w-3.5 h-3.5" />
            <span>Top Bar & Brand Info</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`py-3 px-4 text-xs font-tech font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'backup'
                ? 'border-amber-500 text-amber-500 font-black'
                : isLight
                ? 'border-transparent text-slate-600 hover:text-slate-900'
                : 'border-transparent text-zinc-400 hover:text-white'
            }`}
          >
            <Download className="w-3.5 h-3.5" />
            <span>Backup & Factory Reset</span>
          </button>
        </div>

        {/* Tab 1: Products Management */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {/* Controls Bar */}
            <div
              className={`p-4 rounded-xs border flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3 ${
                isLight ? 'bg-white border-slate-300' : 'bg-zinc-900 border-white/10'
              }`}
            >
              {/* Search */}
              <div className="relative flex-grow max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by model, title, or category..."
                  className={`w-full pl-9 pr-3 py-2 rounded-xs text-xs font-tech border outline-none ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-900 focus:border-amber-500'
                      : 'bg-zinc-950 border-white/10 text-white focus:border-amber-500'
                  }`}
                />
              </div>

              {/* Filters & Add Action */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={divisionFilter}
                  onChange={(e) => setDivisionFilter(e.target.value as any)}
                  className={`px-3 py-2 rounded-xs text-xs font-tech font-bold uppercase border outline-none ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-800'
                      : 'bg-zinc-950 border-white/10 text-zinc-300'
                  }`}
                >
                  <option value="all">All Divisions</option>
                  <option value="commercial">Commercial Kitchen</option>
                  <option value="manufacturing">Manufacturing (Trays)</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className={`px-3 py-2 rounded-xs text-xs font-tech font-bold uppercase border outline-none max-w-[160px] truncate ${
                    isLight
                      ? 'bg-slate-50 border-slate-300 text-slate-800'
                      : 'bg-zinc-950 border-white/10 text-zinc-300'
                  }`}
                >
                  <option value="all">All Categories</option>
                  {categories.map((c) => (
                    <option key={c.id} value={c.slug}>
                      {c.name}
                    </option>
                  ))}
                </select>

                <button
                  onClick={() => openAdminModalForProduct()}
                  className="px-3.5 py-2 rounded-xs bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-tech font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm ml-auto sm:ml-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ ADD PRODUCT</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div
              className={`rounded-xs border overflow-hidden ${
                isLight ? 'bg-white border-slate-300' : 'bg-zinc-900 border-white/10'
              }`}
            >
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr
                      className={`text-[10px] font-tech font-bold uppercase tracking-wider border-b ${
                        isLight
                          ? 'bg-slate-50 border-slate-300 text-slate-600'
                          : 'bg-zinc-950 border-white/10 text-zinc-400'
                      }`}
                    >
                      <th className="py-3 px-4">Item & Model</th>
                      <th className="py-3 px-4">Division</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price Matrix</th>
                      <th className="py-3 px-4 text-center">Featured</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody
                    className={`divide-y text-xs font-tech ${
                      isLight ? 'divide-slate-200' : 'divide-white/5'
                    }`}
                  >
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-zinc-500">
                          No products found matching your search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product) => {
                        const hasImg = Boolean(product.mainImage);
                        return (
                          <tr
                            key={product.id}
                            className={`transition-colors ${
                              isLight ? 'hover:bg-slate-50' : 'hover:bg-zinc-800/50'
                            }`}
                          >
                            {/* Item & Model */}
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div
                                  onClick={() => openImageEditModal(product)}
                                  className={`w-12 h-12 rounded-xs border shrink-0 overflow-hidden flex items-center justify-center cursor-pointer group relative ${
                                    isLight ? 'bg-slate-100 border-slate-300' : 'bg-zinc-950 border-white/10'
                                  }`}
                                  title="Click to edit product photos"
                                >
                                  {hasImg ? (
                                    <img
                                      src={product.mainImage}
                                      alt={product.name}
                                      className="w-full h-full object-contain p-0.5"
                                    />
                                  ) : (
                                    <Camera className="w-4 h-4 text-zinc-400 group-hover:text-amber-500" />
                                  )}
                                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <Camera className="w-3.5 h-3.5 text-white" />
                                  </div>
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-slate-900 dark:text-white truncate max-w-xs">
                                    {product.name}
                                  </div>
                                  <div className="text-[11px] font-mono text-amber-600 dark:text-amber-400">
                                    {product.model}
                                  </div>
                                </div>
                              </div>
                            </td>

                            {/* Division */}
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                                  product.division === 'commercial'
                                    ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400 border border-blue-500/30'
                                    : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30'
                                }`}
                              >
                                {product.division}
                              </span>
                            </td>

                            {/* Category */}
                            <td className="py-3 px-4 uppercase text-zinc-500 font-semibold text-[11px]">
                              {product.category}
                            </td>

                            {/* Price */}
                            <td className="py-3 px-4">
                              {product.finalCustomerPrice ? (
                                <div>
                                  <div className="font-bold text-slate-900 dark:text-white">
                                    ₹{product.finalCustomerPrice.toLocaleString('en-IN')}
                                  </div>
                                  {product.listPrice && product.listPrice > product.finalCustomerPrice && (
                                    <div className="text-[10px] text-zinc-400 line-through">
                                      ₹{product.listPrice.toLocaleString('en-IN')}
                                    </div>
                                  )}
                                </div>
                              ) : product.netPrice ? (
                                <div className="font-bold">
                                  ₹{product.netPrice.toLocaleString('en-IN')} (Net)
                                </div>
                              ) : (
                                <span className="text-zinc-400 text-[11px]">B2B On Request</span>
                              )}
                            </td>

                            {/* Featured */}
                            <td className="py-3 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => toggleProductFeatured(product.id)}
                                className={`p-1 rounded transition-colors ${
                                  product.isFeatured
                                    ? 'text-amber-500 hover:text-amber-400'
                                    : 'text-zinc-400 hover:text-zinc-600'
                                }`}
                                title={product.isFeatured ? 'Featured on homepage' : 'Set as featured'}
                              >
                                <Star
                                  className={`w-4 h-4 ${product.isFeatured ? 'fill-amber-500' : ''}`}
                                />
                              </button>
                            </td>

                            {/* Actions */}
                            <td className="py-3 px-4 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  onClick={() => openAdminModalForProduct(product.id)}
                                  className="p-1.5 rounded-xs border border-amber-500/40 text-amber-600 dark:text-amber-400 hover:bg-amber-500/10 transition-colors"
                                  title="Edit Product in CMS"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => openImageEditModal(product)}
                                  className="p-1.5 rounded-xs border border-blue-500/40 text-blue-600 dark:text-blue-400 hover:bg-blue-500/10 transition-colors"
                                  title="Edit Images"
                                >
                                  <Camera className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => {
                                    duplicateProduct(product.id);
                                    showToast(`Duplicated product: ${product.name}`);
                                  }}
                                  className="p-1.5 rounded-xs border border-zinc-500/30 text-zinc-500 hover:text-white hover:bg-zinc-800 transition-colors"
                                  title="Duplicate as new product"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => setProductToDelete(product)}
                                  className="p-1.5 rounded-xs border border-red-500/30 text-red-500 hover:bg-red-500/10 transition-colors"
                                  title="Delete Product"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Categories */}
        {activeTab === 'categories' && (
          <div className="space-y-6">
            {/* Dedicated Homepage Category Portal Images Section */}
            <div
              className={`p-6 rounded-xs border space-y-4 ${
                isLight ? 'bg-white border-slate-300' : 'bg-zinc-900 border-white/10'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-white/10 gap-2">
                <div>
                  <div className="flex items-center gap-2 text-amber-500 text-xs font-tech font-bold uppercase tracking-wider mb-1">
                    <Camera className="w-4 h-4" />
                    <span>HOMEPAGE CATEGORY SHOWCASE IMAGES</span>
                  </div>
                  <h3 className="font-tech font-bold uppercase text-base text-slate-900 dark:text-white">
                    Category Portal Cards (Category 01, Category 02, Category 03)
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Change, upload, or replace the showcase photos displayed on the 3 primary homepage portal cards.
                  </p>
                </div>
                <div className="text-[11px] font-tech text-emerald-400 shrink-0">
                  ✓ Instant real-time update
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Card 1: Commercial */}
                <div className="p-4 rounded-xs border border-white/10 bg-zinc-950/60 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-tech font-bold uppercase tracking-wider text-amber-500">
                        CATEGORY 01
                      </span>
                      <span className="text-[10px] font-tech text-zinc-400">Commercial</span>
                    </div>
                    <h4 className="font-tech font-bold text-sm uppercase text-white mb-2">
                      Commercial Kitchen Equipment
                    </h4>
                    <div className="w-full h-36 rounded-xs bg-black border border-white/10 flex items-center justify-center overflow-hidden mb-2">
                      <img
                        src={brand.portalCategoryImages?.commercial || '/images/products/tsl81_front.jpg'}
                        alt="Commercial Kitchen"
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/images/products/tsl81_front.jpg';
                        }}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingCategoryKey('commercial')}
                    className="w-full py-2 px-3 rounded-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Change Image & Save</span>
                  </button>
                </div>

                {/* Card 2: GN Pans */}
                <div className="p-4 rounded-xs border border-white/10 bg-zinc-950/60 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-tech font-bold uppercase tracking-wider text-blue-400">
                        CATEGORY 02
                      </span>
                      <span className="text-[10px] font-tech text-zinc-400">Food Storage</span>
                    </div>
                    <h4 className="font-tech font-bold text-sm uppercase text-white mb-2">
                      Gastronorm (GN) Pans & Covers
                    </h4>
                    <div className="w-full h-36 rounded-xs bg-black border border-white/10 flex items-center justify-center overflow-hidden mb-2">
                      <img
                        src={brand.portalCategoryImages?.gnpans || 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'}
                        alt="Gastronorm GN Pans"
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingCategoryKey('gnpans')}
                    className="w-full py-2 px-3 rounded-xs bg-blue-600 hover:bg-blue-500 text-white font-tech font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Change Image & Save</span>
                  </button>
                </div>

                {/* Card 3: Manufacturing */}
                <div className="p-4 rounded-xs border border-white/10 bg-zinc-950/60 flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-tech font-bold uppercase tracking-wider text-emerald-400">
                        CATEGORY 03
                      </span>
                      <span className="text-[10px] font-tech text-zinc-400">In-House Manufacturing</span>
                    </div>
                    <h4 className="font-tech font-bold text-sm uppercase text-white mb-2">
                      Kitchenware & Utility (In-House)
                    </h4>
                    <div className="w-full h-36 rounded-xs bg-black border border-white/10 flex items-center justify-center overflow-hidden mb-2">
                      <img
                        src={brand.portalCategoryImages?.manufacturing || 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80'}
                        alt="Kitchenware & Utility"
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80';
                        }}
                      />
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setEditingCategoryKey('manufacturing')}
                    className="w-full py-2 px-3 rounded-xs bg-emerald-600 hover:bg-emerald-500 text-white font-tech font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Change Image & Save</span>
                  </button>
                </div>
              </div>
            </div>

            <div
              className={`p-4 rounded-xs border flex items-center justify-between ${
                isLight ? 'bg-white border-slate-300' : 'bg-zinc-900 border-white/10'
              }`}
            >
              <div>
                <h3 className="font-tech font-bold uppercase text-sm">Product Categories Hierarchy</h3>
                <p className="text-xs text-zinc-500">
                  Organized by Commercial Kitchen Equipment and In-House Stainless Steel Manufacturing.
                </p>
              </div>
              <button
                onClick={() => setAdminModalOpen(true)}
                className="px-3 py-1.5 rounded-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-bold text-xs uppercase tracking-wider transition-colors"
              >
                + ADD / MANAGE CATEGORIES IN CMS
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((c) => (
                <div
                  key={c.id}
                  className={`p-4 rounded-xs border space-y-2 ${
                    isLight ? 'bg-white border-slate-300' : 'bg-zinc-900 border-white/10'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-tech font-bold uppercase px-2 py-0.5 rounded ${
                        c.division === 'commercial'
                          ? 'bg-blue-500/15 text-blue-600 dark:text-blue-400'
                          : 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                      }`}
                    >
                      {c.division}
                    </span>
                    <span className="text-xs font-mono text-zinc-500">/{c.slug}</span>
                  </div>
                  <h4 className="font-tech font-bold uppercase text-base text-slate-900 dark:text-white">
                    {c.name}
                  </h4>
                  <p className="text-xs text-zinc-500 line-clamp-2">{c.shortDescription}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Quick Top Bar & Brand Settings */}
        {activeTab === 'quick-settings' && (
          <div
            className={`p-6 rounded-xs border space-y-6 ${
              isLight ? 'bg-white border-slate-300' : 'bg-zinc-900 border-white/10'
            }`}
          >
            <div className="border-b pb-4 flex items-center justify-between">
              <div>
                <h3 className="font-tech font-bold uppercase text-base">Top Bar Header & Brand Configuration</h3>
                <p className="text-xs text-zinc-500">
                  Update brand title, header subtitle tagline, phone numbers, and WhatsApp numbers.
                </p>
              </div>
              <button
                onClick={() => setAdminModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-bold text-xs uppercase tracking-wider"
              >
                LAUNCH FULL CMS MODAL
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-tech">
              <div>
                <span className="font-bold uppercase text-zinc-400 block mb-1">Company / Brand Name</span>
                <div className="p-2.5 rounded-xs bg-zinc-950/20 border border-white/10 font-mono">
                  {brand.brandName}
                </div>
              </div>

              <div>
                <span className="font-bold uppercase text-zinc-400 block mb-1">Header Subtitle Tagline</span>
                <div className="p-2.5 rounded-xs bg-zinc-950/20 border border-white/10 font-mono">
                  {brand.headerTagline || brand.tagline}
                </div>
              </div>

              <div>
                <span className="font-bold uppercase text-zinc-400 block mb-1">Sales Phone</span>
                <div className="p-2.5 rounded-xs bg-zinc-950/20 border border-white/10 font-mono">
                  {brand.phone}
                </div>
              </div>

              <div>
                <span className="font-bold uppercase text-zinc-400 block mb-1">WhatsApp Dispatch</span>
                <div className="p-2.5 rounded-xs bg-zinc-950/20 border border-white/10 font-mono">
                  {brand.whatsapp}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Backup & Reset */}
        {activeTab === 'backup' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Export & Import */}
            <div
              className={`p-6 rounded-xs border space-y-4 ${
                isLight ? 'bg-white border-slate-300' : 'bg-zinc-900 border-white/10'
              }`}
            >
              <h3 className="font-tech font-bold uppercase text-base flex items-center gap-2">
                <Download className="w-4 h-4 text-amber-500" />
                <span>JSON Export & Backup</span>
              </h3>
              <p className="text-xs text-zinc-500">
                Download a complete JSON snapshot of all your products, pricing tables, categories, and top-bar configuration.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={handleExportJson}
                  className="px-4 py-2.5 rounded-xs bg-amber-500 hover:bg-amber-400 text-slate-950 font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD JSON BACKUP</span>
                </button>

                <label className="px-4 py-2.5 rounded-xs border border-zinc-500/40 hover:border-white font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors">
                  <Upload className="w-4 h-4" />
                  <span>RESTORE FROM JSON</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJson}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Factory Reset */}
            <div
              className={`p-6 rounded-xs border space-y-4 ${
                isLight ? 'bg-white border-slate-300' : 'bg-zinc-900 border-white/10'
              }`}
            >
              <h3 className="font-tech font-bold uppercase text-base text-red-500 flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                <span>Reset to Factory Defaults</span>
              </h3>
              <p className="text-xs text-zinc-500">
                Restores the verified Shree Durga Steels default industrial catalog, pricing tiers, specifications, and layout.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    if (window.confirm('Are you sure you want to restore factory default products and categories? Any unsaved edits will be reset.')) {
                      resetToDefaults();
                      showToast('Factory catalog restored successfully.');
                    }
                  }}
                  className="px-4 py-2.5 rounded-xs border border-red-500/40 text-red-500 hover:bg-red-500/10 font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>RESTORE FACTORY DATA</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Category Image Edit Modal */}
      {editingCategoryKey && (
        <CategoryImageEditModal
          isOpen={true}
          onClose={() => setEditingCategoryKey(null)}
          categoryKey={editingCategoryKey}
          categoryTitle={
            editingCategoryKey === 'commercial'
              ? 'Commercial Kitchen Equipment'
              : editingCategoryKey === 'gnpans'
              ? 'Gastronorm (GN) Pans & Covers'
              : 'Kitchenware & Utility (In-House)'
          }
          categoryBadge={
            editingCategoryKey === 'commercial'
              ? 'CATEGORY 01'
              : editingCategoryKey === 'gnpans'
              ? 'CATEGORY 02'
              : 'CATEGORY 03'
          }
          currentImage={
            editingCategoryKey === 'commercial'
              ? brand.portalCategoryImages?.commercial || '/images/products/tsl81_front.jpg'
              : editingCategoryKey === 'gnpans'
              ? brand.portalCategoryImages?.gnpans || 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'
              : brand.portalCategoryImages?.manufacturing || 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80'
          }
          defaultImage={
            editingCategoryKey === 'commercial'
              ? '/images/products/tsl81_front.jpg'
              : editingCategoryKey === 'gnpans'
              ? 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80'
              : 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=800&q=80'
          }
          onSave={(newUrl) => {
            updateBrand({
              portalCategoryImages: {
                ...brand.portalCategoryImages,
                [editingCategoryKey]: newUrl,
              },
            });
            showToast(
              `Category ${
                editingCategoryKey === 'commercial' ? '01' : editingCategoryKey === 'gnpans' ? '02' : '03'
              } image saved successfully!`
            );
          }}
          themeMode={themeMode}
        />
      )}

      {/* Safety Deletion Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div
            className={`max-w-md w-full p-6 rounded-xs border space-y-4 ${
              isLight ? 'bg-white border-slate-300' : 'bg-zinc-900 border-white/10'
            }`}
          >
            <div className="flex items-center gap-2 text-red-500">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-tech font-bold uppercase text-base">Delete Product Confirmation</h3>
            </div>
            <p className="text-xs text-zinc-400">
              Are you sure you want to delete <span className="font-bold text-white">"{productToDelete.name}"</span> (Model: {productToDelete.model})?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-3 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-xs border border-white/10 hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProduct(productToDelete.id);
                  showToast(`Deleted ${productToDelete.name}`);
                  setProductToDelete(null);
                }}
                className="px-3.5 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-xs bg-red-600 hover:bg-red-500 text-white"
              >
                Delete Product
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
