import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { ProductItem, BusinessDivision } from '../types';
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
  Building,
  DollarSign,
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
  } = useContent();

  // If not logged in, show access denied prompt with redirect to login
  if (!isAdmin) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center p-6 bg-[#F3E7DA] text-[#292321]">
        <div className="max-w-md w-full p-8 rounded-xs border border-[#D8BFA8] bg-[#FAF4EE] text-center shadow-lg">
          <div className="w-14 h-14 rounded-full bg-[#5B1018]/10 text-[#5B1018] border border-[#5B1018]/25 flex items-center justify-center mx-auto mb-4">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <h2 className="text-xl font-tech font-bold uppercase tracking-wider mb-2 text-[#292321]">
            ADMINISTRATOR ACCESS REQUIRED
          </h2>
          <p className="text-xs mb-6 text-[#4D423E]">
            This section is restricted to authorized Shree Durga Steels administrators. Normal users can only view the website.
          </p>
          <button
            onClick={() => setActivePage('admin-login')}
            className="w-full py-2.5 px-4 rounded-xs bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech font-bold text-xs uppercase tracking-wider transition-colors shadow-sm"
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
      a.download = `shree-durga-steels-cms-backup-${new Date().toISOString().slice(0, 10)}.json`;
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
    <div className="min-h-screen bg-[#F3E7DA] text-[#292321]">
      {/* Top Admin Banner */}
      <div className="border-b border-[#D8BFA8] px-4 sm:px-8 py-4 bg-[#FAF4EE]/95 backdrop-blur-md sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xs bg-[#5B1018] text-[#F3E7DA] flex items-center justify-center shadow-sm font-tech font-black">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1 className="text-base sm:text-lg font-tech font-black uppercase tracking-wider text-[#292321]">
                  MASTER ADMIN CONTROL PANEL
                </h1>
                <span className="px-2 py-0.5 rounded text-[10px] font-tech font-bold uppercase bg-[#5B1018]/10 text-[#5B1018] border border-[#5B1018]/25">
                  Active Admin ({adminUser || 'Admin'})
                </span>
              </div>
              <p className="text-[11px] text-[#5A4F4B]">
                {brand.brandName} • Manage catalog, pricing, divisions, and website layout
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setActivePage('home')}
              className="px-3 py-1.5 rounded-xs text-xs font-tech font-bold uppercase tracking-wider border border-[#D8BFA8] bg-white hover:bg-[#E9D9C8] text-[#292321] flex items-center gap-1.5 transition-colors"
              title="Return to public site to view changes live"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>View Live Website</span>
            </button>

            <button
              onClick={() => setAdminModalOpen(true)}
              className="px-3.5 py-1.5 rounded-xs text-xs font-tech font-bold uppercase tracking-wider bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] flex items-center gap-1.5 transition-colors shadow-sm"
              title="Launch full popup CMS with detailed specifications editor"
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Full CMS Editor</span>
            </button>

            <button
              onClick={logoutAdmin}
              className="px-3 py-1.5 rounded-xs text-xs font-tech font-bold uppercase tracking-wider border border-[#5B1018]/30 text-[#5B1018] hover:bg-[#5B1018] hover:text-[#F3E7DA] flex items-center gap-1.5 transition-colors"
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
          <div className="p-3.5 rounded-xs bg-[#E9D9C8] border border-[#5B1018]/30 text-[#5B1018] text-xs font-tech font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-[#5B1018]" />
            <span>{notification}</span>
          </div>
        )}

        {/* Dashboard Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="p-4 rounded-xs border border-[#D8BFA8] bg-[#FAF4EE] shadow-xs">
            <div className="flex items-center justify-between text-[#4D423E] mb-1">
              <span className="text-[11px] font-tech font-bold uppercase tracking-wider">
                Total Products
              </span>
              <Package className="w-4 h-4 text-[#5B1018]" />
            </div>
            <div className="text-2xl font-tech font-black text-[#292321] tabular-nums">{products.length}</div>
            <span className="text-[10px] text-[#5A4F4B]">Live in catalog</span>
          </div>

          <div className="p-4 rounded-xs border border-[#D8BFA8] bg-[#FAF4EE] shadow-xs">
            <div className="flex items-center justify-between text-[#4D423E] mb-1">
              <span className="text-[11px] font-tech font-bold uppercase tracking-wider">
                Commercial Kitchen
              </span>
              <Building className="w-4 h-4 text-[#5B1018]" />
            </div>
            <div className="text-2xl font-tech font-black text-[#292321] tabular-nums">{commercialProducts.length}</div>
            <span className="text-[10px] text-[#5A4F4B]">Equipment models</span>
          </div>

          <div className="p-4 rounded-xs border border-[#D8BFA8] bg-[#FAF4EE] shadow-xs">
            <div className="flex items-center justify-between text-[#4D423E] mb-1">
              <span className="text-[11px] font-tech font-bold uppercase tracking-wider">
                Manufacturing Trays
              </span>
              <Layers className="w-4 h-4 text-[#5B1018]" />
            </div>
            <div className="text-2xl font-tech font-black text-[#292321] tabular-nums">{manufacturingProducts.length}</div>
            <span className="text-[10px] text-[#5A4F4B]">In-house fabricated items</span>
          </div>

          <div className="p-4 rounded-xs border border-[#D8BFA8] bg-[#FAF4EE] shadow-xs">
            <div className="flex items-center justify-between text-[#4D423E] mb-1">
              <span className="text-[11px] font-tech font-bold uppercase tracking-wider">
                Gastronorm Pans
              </span>
              <DollarSign className="w-4 h-4 text-[#5B1018]" />
            </div>
            <div className="text-2xl font-tech font-black text-[#292321] tabular-nums">{gnPanProducts.length}</div>
            <span className="text-[10px] text-[#5A4F4B]">GN sizes & food pans</span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="border-b border-[#D8BFA8] flex items-center gap-1 sm:gap-2 overflow-x-auto">
          <button
            onClick={() => setActiveTab('products')}
            className={`py-3 px-4 text-xs font-tech font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'products'
                ? 'border-[#5B1018] text-[#5B1018] font-black'
                : 'border-transparent text-[#4D423E] hover:text-[#292321]'
            }`}
          >
            <Package className="w-3.5 h-3.5" />
            <span>Products & Equipment ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('categories')}
            className={`py-3 px-4 text-xs font-tech font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'categories'
                ? 'border-[#5B1018] text-[#5B1018] font-black'
                : 'border-transparent text-[#4D423E] hover:text-[#292321]'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Categories ({categories.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('quick-settings')}
            className={`py-3 px-4 text-xs font-tech font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'quick-settings'
                ? 'border-[#5B1018] text-[#5B1018] font-black'
                : 'border-transparent text-[#4D423E] hover:text-[#292321]'
            }`}
          >
            <Menu className="w-3.5 h-3.5" />
            <span>Top Bar & Brand Info</span>
          </button>

          <button
            onClick={() => setActiveTab('backup')}
            className={`py-3 px-4 text-xs font-tech font-bold uppercase tracking-wider border-b-2 whitespace-nowrap transition-colors flex items-center gap-2 ${
              activeTab === 'backup'
                ? 'border-[#5B1018] text-[#5B1018] font-black'
                : 'border-transparent text-[#4D423E] hover:text-[#292321]'
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
            <div className="p-4 rounded-xs border border-[#D8BFA8] bg-[#FAF4EE] flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
              {/* Search */}
              <div className="relative flex-grow max-w-md">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#5A4F4B]" />
                <input
                  type="text"
                  value={productSearch}
                  onChange={(e) => setProductSearch(e.target.value)}
                  placeholder="Search products by model, title, or category..."
                  className="w-full pl-9 pr-3 py-2 rounded-xs text-xs font-tech bg-white border border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018] outline-none"
                />
              </div>

              {/* Filters & Add Action */}
              <div className="flex flex-wrap items-center gap-2">
                <select
                  value={divisionFilter}
                  onChange={(e) => setDivisionFilter(e.target.value as any)}
                  className="px-3 py-2 rounded-xs text-xs font-tech font-bold uppercase bg-white border border-[#D8BFA8] text-[#292321] outline-none focus:border-[#5B1018]"
                >
                  <option value="all">All Divisions</option>
                  <option value="commercial">Commercial Kitchen</option>
                  <option value="manufacturing">Manufacturing (Trays)</option>
                </select>

                <select
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="px-3 py-2 rounded-xs text-xs font-tech font-bold uppercase bg-white border border-[#D8BFA8] text-[#292321] outline-none max-w-[160px] truncate focus:border-[#5B1018]"
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
                  className="px-3.5 py-2 rounded-xs bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] text-xs font-tech font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors shadow-sm ml-auto sm:ml-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>+ ADD PRODUCT</span>
                </button>
              </div>
            </div>

            {/* Products Table */}
            <div className="rounded-xs border border-[#D8BFA8] bg-white overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="text-[10px] font-tech font-bold uppercase tracking-wider border-b border-[#D8BFA8] bg-[#E9D9C8] text-[#292321]">
                      <th className="py-3 px-4">Item & Model</th>
                      <th className="py-3 px-4">Division</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price Matrix</th>
                      <th className="py-3 px-4 text-center">Featured</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#D8BFA8]/60 text-xs font-tech">
                    {filteredProducts.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="py-12 text-center text-[#5A4F4B]">
                          No products found matching your search criteria.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product) => {
                        const hasImg = Boolean(product.mainImage);
                        return (
                          <tr key={product.id} className="hover:bg-[#FAF4EE] transition-colors">
                            {/* Item & Model */}
                            <td className="py-3 px-4">
                              <div className="flex items-center gap-3">
                                <div
                                  onClick={() => openImageEditModal(product)}
                                  className="w-12 h-12 rounded-xs border border-[#D8BFA8] bg-[#FAF4EE] shrink-0 overflow-hidden flex items-center justify-center cursor-pointer group relative"
                                  title="Click to edit product photos"
                                >
                                  {hasImg ? (
                                    <img
                                      src={product.mainImage}
                                      alt={product.name}
                                      className="w-full h-full object-contain p-0.5"
                                    />
                                  ) : (
                                    <Camera className="w-4 h-4 text-[#B8B8B3] group-hover:text-[#5B1018]" />
                                  )}
                                  <div className="absolute inset-0 bg-[#292321]/65 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                                    <Camera className="w-3.5 h-3.5 text-[#F3E7DA]" />
                                  </div>
                                </div>
                                <div className="min-w-0">
                                  <div className="font-bold text-[#292321] truncate max-w-xs">
                                    {product.name}
                                  </div>
                                  <div className="text-[11px] font-mono text-[#5B1018] font-bold">
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
                                    ? 'bg-[#5B1018]/10 text-[#5B1018] border border-[#5B1018]/25'
                                    : 'bg-[#E9D9C8] text-[#292321] border border-[#D8BFA8]'
                                }`}
                              >
                                {product.division}
                              </span>
                            </td>

                            {/* Category */}
                            <td className="py-3 px-4 uppercase text-[#4D423E] font-semibold text-[11px]">
                              {product.category}
                            </td>

                            {/* Price */}
                            <td className="py-3 px-4 tabular-nums">
                              {product.finalCustomerPrice ? (
                                <div>
                                  <div className="font-bold text-[#292321]">
                                    ₹{product.finalCustomerPrice.toLocaleString('en-IN')}
                                  </div>
                                  {product.listPrice && product.listPrice > product.finalCustomerPrice && (
                                    <div className="text-[10px] text-[#5A4F4B] line-through">
                                      ₹{product.listPrice.toLocaleString('en-IN')}
                                    </div>
                                  )}
                                </div>
                              ) : product.netPrice ? (
                                <div className="font-bold text-[#292321]">
                                  ₹{product.netPrice.toLocaleString('en-IN')} (Net)
                                </div>
                              ) : (
                                <span className="text-[#5A4F4B] text-[11px]">B2B On Request</span>
                              )}
                            </td>

                            {/* Featured */}
                            <td className="py-3 px-4 text-center">
                              <button
                                type="button"
                                onClick={() => toggleProductFeatured(product.id)}
                                className={`p-1 rounded transition-colors ${
                                  product.isFeatured
                                    ? 'text-[#5B1018] hover:text-[#440B11]'
                                    : 'text-[#B8B8B3] hover:text-[#5B1018]'
                                }`}
                                title={product.isFeatured ? 'Featured on homepage' : 'Set as featured'}
                              >
                                <Star
                                  className={`w-4 h-4 ${product.isFeatured ? 'fill-[#5B1018]' : ''}`}
                                />
                              </button>
                            </td>

                            {/* Actions */}
                            <td className="py-3 px-4 text-right">
                              <div className="inline-flex items-center gap-1.5">
                                <button
                                  onClick={() => openAdminModalForProduct(product.id)}
                                  className="p-1.5 rounded-xs border border-[#5B1018]/30 text-[#5B1018] hover:bg-[#5B1018]/10 transition-colors"
                                  title="Edit Product in CMS"
                                >
                                  <Edit2 className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => openImageEditModal(product)}
                                  className="p-1.5 rounded-xs border border-[#D8BFA8] text-[#292321] hover:bg-[#E9D9C8] transition-colors"
                                  title="Edit Images"
                                >
                                  <Camera className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => {
                                    duplicateProduct(product.id);
                                    showToast(`Duplicated product: ${product.name}`);
                                  }}
                                  className="p-1.5 rounded-xs border border-[#D8BFA8] text-[#4D423E] hover:text-[#292321] hover:bg-[#E9D9C8] transition-colors"
                                  title="Duplicate as new product"
                                >
                                  <Plus className="w-3.5 h-3.5" />
                                </button>

                                <button
                                  onClick={() => setProductToDelete(product)}
                                  className="p-1.5 rounded-xs border border-[#5B1018]/30 text-[#5B1018] hover:bg-[#5B1018] hover:text-[#F3E7DA] transition-colors"
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
            <div className="p-6 rounded-xs border border-[#D8BFA8] bg-[#FAF4EE] space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-[#D8BFA8] gap-2">
                <div>
                  <div className="flex items-center gap-2 text-[#5B1018] text-xs font-tech font-bold uppercase tracking-wider mb-1">
                    <Camera className="w-4 h-4" />
                    <span>HOMEPAGE CATEGORY SHOWCASE IMAGES</span>
                  </div>
                  <h3 className="font-tech font-bold uppercase text-base text-[#292321]">
                    Category Portal Cards (Category 01, Category 02, Category 03)
                  </h3>
                  <p className="text-xs text-[#4D423E]">
                    Change, upload, or replace the showcase photos displayed on the 3 primary homepage portal cards.
                  </p>
                </div>
                <div className="text-[11px] font-tech text-[#5B1018] font-bold shrink-0">
                  ✓ Instant real-time update
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {/* Card 1: Commercial */}
                <div className="p-4 rounded-xs border border-[#D8BFA8] bg-[#F3E7DA] flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-tech font-bold uppercase tracking-wider text-[#5B1018]">
                        CATEGORY 01
                      </span>
                      <span className="text-[10px] font-tech text-[#4D423E]">Commercial</span>
                    </div>
                    <h4 className="font-tech font-bold text-sm uppercase text-[#292321] mb-2">
                      Commercial Kitchen Equipment
                    </h4>
                    <div className="w-full h-36 rounded-xs bg-white border border-[#D8BFA8] flex items-center justify-center overflow-hidden mb-2">
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
                    className="w-full py-2 px-3 rounded-xs bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Change Image & Save</span>
                  </button>
                </div>

                {/* Card 2: GN Pans */}
                <div className="p-4 rounded-xs border border-[#D8BFA8] bg-[#F3E7DA] flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-tech font-bold uppercase tracking-wider text-[#5B1018]">
                        CATEGORY 02
                      </span>
                      <span className="text-[10px] font-tech text-[#4D423E]">Food Storage</span>
                    </div>
                    <h4 className="font-tech font-bold text-sm uppercase text-[#292321] mb-2">
                      Gastronorm (GN) Pans & Covers
                    </h4>
                    <div className="w-full h-36 rounded-xs bg-white border border-[#D8BFA8] flex items-center justify-center overflow-hidden mb-2">
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
                    className="w-full py-2 px-3 rounded-xs bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Change Image & Save</span>
                  </button>
                </div>

                {/* Card 3: Manufacturing */}
                <div className="p-4 rounded-xs border border-[#D8BFA8] bg-[#F3E7DA] flex flex-col justify-between space-y-3">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-tech font-bold uppercase tracking-wider text-[#5B1018]">
                        CATEGORY 03
                      </span>
                      <span className="text-[10px] font-tech text-[#4D423E]">In-House Manufacturing</span>
                    </div>
                    <h4 className="font-tech font-bold text-sm uppercase text-[#292321] mb-2">
                      Kitchenware & Utility (In-House)
                    </h4>
                    <div className="w-full h-36 rounded-xs bg-white border border-[#D8BFA8] flex items-center justify-center overflow-hidden mb-2">
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
                    className="w-full py-2 px-3 rounded-xs bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Change Image & Save</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xs border border-[#D8BFA8] bg-[#FAF4EE] flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-tech font-bold uppercase text-sm text-[#292321]">Product Categories Hierarchy</h3>
                <p className="text-xs text-[#4D423E]">
                  Organized by Commercial Kitchen Equipment and In-House Stainless Steel Manufacturing.
                </p>
              </div>
              <button
                onClick={() => setAdminModalOpen(true)}
                className="px-3 py-1.5 rounded-xs bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech font-bold text-xs uppercase tracking-wider transition-colors"
              >
                + ADD / MANAGE CATEGORIES IN CMS
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categories.map((c) => (
                <div key={c.id} className="p-4 rounded-xs border border-[#D8BFA8] bg-[#FAF4EE] space-y-2">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-[9px] font-tech font-bold uppercase px-2 py-0.5 rounded ${
                        c.division === 'commercial'
                          ? 'bg-[#5B1018]/10 text-[#5B1018]'
                          : 'bg-[#E9D9C8] text-[#292321]'
                      }`}
                    >
                      {c.division}
                    </span>
                    <span className="text-xs font-mono text-[#5A4F4B]">/{c.slug}</span>
                  </div>
                  <h4 className="font-tech font-bold uppercase text-base text-[#292321]">
                    {c.name}
                  </h4>
                  <p className="text-xs text-[#4D423E] line-clamp-2">{c.shortDescription}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Quick Top Bar & Brand Settings */}
        {activeTab === 'quick-settings' && (
          <div className="p-6 rounded-xs border border-[#D8BFA8] bg-[#FAF4EE] space-y-6">
            <div className="border-b border-[#D8BFA8] pb-4 flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-tech font-bold uppercase text-base text-[#292321]">
                  Top Bar Header & Brand Configuration
                </h3>
                <p className="text-xs text-[#4D423E]">
                  Update brand title, header subtitle tagline, phone numbers, and WhatsApp numbers.
                </p>
              </div>
              <button
                onClick={() => setAdminModalOpen(true)}
                className="px-3.5 py-1.5 rounded-xs bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech font-bold text-xs uppercase tracking-wider transition-colors"
              >
                LAUNCH FULL CMS MODAL
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-tech">
              <div>
                <span className="font-bold uppercase text-[#4D423E] block mb-1">Company / Brand Name</span>
                <div className="p-2.5 rounded-xs bg-white border border-[#D8BFA8] text-[#292321] font-mono">
                  {brand.brandName}
                </div>
              </div>

              <div>
                <span className="font-bold uppercase text-[#4D423E] block mb-1">Header Subtitle Tagline</span>
                <div className="p-2.5 rounded-xs bg-white border border-[#D8BFA8] text-[#292321] font-mono">
                  {brand.headerTagline || brand.tagline}
                </div>
              </div>

              <div>
                <span className="font-bold uppercase text-[#4D423E] block mb-1">Sales Phone</span>
                <div className="p-2.5 rounded-xs bg-white border border-[#D8BFA8] text-[#292321] font-mono">
                  {brand.phone}
                </div>
              </div>

              <div>
                <span className="font-bold uppercase text-[#4D423E] block mb-1">WhatsApp Dispatch</span>
                <div className="p-2.5 rounded-xs bg-white border border-[#D8BFA8] text-[#292321] font-mono">
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
            <div className="p-6 rounded-xs border border-[#D8BFA8] bg-[#FAF4EE] space-y-4">
              <h3 className="font-tech font-bold uppercase text-base text-[#292321] flex items-center gap-2">
                <Download className="w-4 h-4 text-[#5B1018]" />
                <span>JSON Export & Backup</span>
              </h3>
              <p className="text-xs text-[#4D423E]">
                Download a complete JSON snapshot of all your products, pricing tables, categories, and top-bar configuration.
              </p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  onClick={handleExportJson}
                  className="px-4 py-2.5 rounded-xs bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-colors"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD JSON BACKUP</span>
                </button>

                <label className="px-4 py-2.5 rounded-xs border border-[#D8BFA8] bg-white hover:bg-[#E9D9C8] text-[#292321] font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 cursor-pointer transition-colors">
                  <Upload className="w-4 h-4 text-[#5B1018]" />
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
            <div className="p-6 rounded-xs border border-[#D8BFA8] bg-[#FAF4EE] space-y-4">
              <h3 className="font-tech font-bold uppercase text-base text-[#5B1018] flex items-center gap-2">
                <RotateCcw className="w-4 h-4" />
                <span>Reset to Factory Defaults</span>
              </h3>
              <p className="text-xs text-[#4D423E]">
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
                  className="px-4 py-2.5 rounded-xs border border-[#5B1018]/40 text-[#5B1018] hover:bg-[#5B1018] hover:text-[#F3E7DA] font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors"
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
        />
      )}

      {/* Safety Deletion Modal */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 bg-[#292321]/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full p-6 rounded-xs border border-[#D8BFA8] bg-[#FAF4EE] text-[#292321] space-y-4 shadow-2xl">
            <div className="flex items-center gap-2 text-[#5B1018]">
              <AlertTriangle className="w-5 h-5" />
              <h3 className="font-tech font-bold uppercase text-base">Delete Product Confirmation</h3>
            </div>
            <p className="text-xs text-[#4D423E]">
              Are you sure you want to delete <span className="font-bold text-[#292321]">"{productToDelete.name}"</span> (Model: {productToDelete.model})?
            </p>
            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setProductToDelete(null)}
                className="px-3 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-xs border border-[#D8BFA8] bg-white hover:bg-[#E9D9C8] text-[#292321]"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  deleteProduct(productToDelete.id);
                  showToast(`Deleted ${productToDelete.name}`);
                  setProductToDelete(null);
                }}
                className="px-3.5 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-xs bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA]"
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
