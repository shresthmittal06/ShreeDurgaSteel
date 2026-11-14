import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { ActivePage, HeaderNavItem } from '../types';
import { defaultHeaderNavItems } from '../data/defaultData';
import { HeaderEditModal } from './HeaderEditModal';
import {
  Menu,
  X,
  Sliders,
  ChevronRight,
  ChevronDown,
  Sun,
  Moon,
  Phone,
  MessageSquare,
  FileText,
  Pencil,
  Flame,
  Factory,
  Utensils,
  Layers,
  Sparkles,
  Zap,
  Boxes,
  Lock,
  ShieldCheck,
  LogOut,
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    brand,
    activePage,
    setActivePage,
    navigateTo,
    isAdmin,
    adminUser,
    logoutAdmin,
    openQuoteModal,
    setAdminModalOpen,
    setSelectedProductForDetail,
    setActiveDivisionFilter,
    setSelectedCategoryFilter,
    commercialProducts,
    gnPanProducts,
    manufacturingProducts,
    themeMode,
    toggleThemeMode,
  } = useContent();

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [headerEditModalOpen, setHeaderEditModalOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<'manufacturing' | 'commercial' | 'gnpans' | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Dynamic Navigation items matching user-configured links or default hierarchy
  const rawNavItems: HeaderNavItem[] =
    brand.headerNavItems && brand.headerNavItems.length > 0
      ? brand.headerNavItems
      : defaultHeaderNavItems;

  // Filter only visible links
  const navItems = rawNavItems.filter((item) => item.visible !== false);

  const handleDropdownEnter = (type: 'manufacturing' | 'commercial' | 'gnpans') => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setActiveDropdown(type);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 180);
  };

  const handleNavClick = (page: ActivePage, categorySlug?: string) => {
    setSelectedProductForDetail(null);
    if (page === 'home') {
      setActiveDivisionFilter('all');
      setSelectedCategoryFilter('all');
      setActivePage('home');
      setActiveDropdown(null);
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    if (page === 'manufacturing') {
      setActiveDivisionFilter('manufacturing');
      if (categorySlug) {
        setSelectedCategoryFilter(categorySlug);
      } else {
        setSelectedCategoryFilter('all');
      }
    } else if (page === 'commercial') {
      setActiveDivisionFilter('commercial');
      if (categorySlug) {
        setSelectedCategoryFilter(categorySlug);
      } else {
        setSelectedCategoryFilter('all');
      }
    } else if (page === 'gnpans') {
      setActiveDivisionFilter('commercial');
      setSelectedCategoryFilter('gn-pans');
    } else {
      setActiveDivisionFilter('all');
    }
    setActivePage(page);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isLight = themeMode === 'light';

  const salesContact = brand.contacts?.find((c) => c.type === 'sales') || {
    number: brand.phone,
    label: 'Sales',
  };

  const waNumber = (brand.whatsapp || brand.phone || '919820084720').replace(/[^0-9]/g, '');
  const waUrl = `https://wa.me/${waNumber}?text=Hello%20${encodeURIComponent(
    brand.brandName || 'Shree Durga Steels'
  )},%20I%20am%20interested%20in%20commercial%20kitchen%20equipment%20and%20manufacturing%20products.`;

  const headerTagline =
    brand.headerTagline || brand.tagline || 'COMMERCIAL KITCHEN & MANUFACTURING';
  const showWhatsapp = brand.showHeaderWhatsapp ?? true;
  const showQuote = brand.showHeaderQuote ?? true;
  const whatsappLabel = brand.headerWhatsappText || 'WHATSAPP';
  const quoteLabel = brand.headerQuoteText || 'GET A QUOTE';
  const logoStyle = brand.logoStyle || 'both';

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isLight
              ? 'py-2.5 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm'
              : 'py-2.5 bg-[#090b0e]/95 backdrop-blur-md border-b border-white/10 shadow-2xl'
            : isLight
            ? 'py-3.5 bg-white/90 backdrop-blur-sm border-b border-slate-200'
            : 'py-4 bg-[#090b0e]/85 backdrop-blur-sm border-b border-white/10'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Title with quick edit hover trigger */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              id="header-brand"
              onClick={() => handleNavClick('home')}
              className="cursor-pointer group flex items-center gap-3 select-none"
            >
              {/* Logo icon/image */}
              {brand.logoImage ? (
                <img
                  src={brand.logoImage}
                  alt={brand.brandName || 'SHREE DURGA STEELS'}
                  className="h-8 sm:h-9 max-h-9 max-w-[120px] object-contain rounded-xs"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div
                  className={`w-9 h-9 border flex items-center justify-center font-tech font-bold text-sm tracking-wider rounded-xs transition-colors shrink-0 ${
                    isLight
                      ? 'border-slate-300 bg-slate-100 text-slate-900 group-hover:border-slate-500'
                      : 'border-white/25 bg-gradient-to-br from-white/10 to-transparent text-white group-hover:border-white/60'
                  }`}
                >
                  {brand.logoText ? brand.logoText.slice(0, 2) : 'SD'}
                </div>
              )}

              {/* Company Name & Subtitle - ALWAYS DISPLAYED PROMINENTLY */}
              <div className="flex flex-col justify-center">
                <span
                  className={`font-black text-xs sm:text-sm md:text-base tracking-[0.14em] block uppercase leading-tight whitespace-nowrap transition-colors ${
                    isLight ? 'text-slate-950 group-hover:text-amber-800' : 'text-white group-hover:text-amber-300'
                  }`}
                >
                  {brand.brandName || 'SHREE DURGA STEELS'}
                </span>
                <span
                  className={`text-[8px] sm:text-[9px] tracking-[0.18em] block uppercase font-tech font-semibold whitespace-nowrap transition-colors ${
                    isLight ? 'text-amber-700' : 'text-amber-400'
                  }`}
                >
                  {headerTagline || 'COMMERCIAL KITCHEN & MANUFACTURING'}
                </span>
              </div>
            </div>

            {/* Quick pencil edit button on header brand hover - ADMIN ONLY */}
            {isAdmin && (
              <button
                type="button"
                onClick={() => setHeaderEditModalOpen(true)}
                title="Quick Edit Top Bar Title, Subtitle, Logo & Navigation"
                className="hidden md:flex p-1 rounded-sm text-zinc-400 hover:text-amber-400 hover:bg-amber-400/10 transition-colors"
              >
                <Pencil className="w-3 h-3" />
              </button>
            )}
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav" className="hidden lg:flex items-center gap-5 xl:gap-6">
            {navItems.map((item) => {
              const isActive = activePage === item.page;
              const isKitchenware = item.page === 'manufacturing';
              const isKitchenEquipment = item.page === 'commercial';
              const isGnPans = item.page === 'gnpans';
              const hasDropdown = isKitchenware || isKitchenEquipment || isGnPans;

              const currentDropdownType: 'manufacturing' | 'commercial' | 'gnpans' | null =
                isKitchenware ? 'manufacturing' : isKitchenEquipment ? 'commercial' : isGnPans ? 'gnpans' : null;

              return (
                <div
                  key={item.id || item.page}
                  className="relative py-2"
                  onMouseEnter={() => {
                    if (currentDropdownType) handleDropdownEnter(currentDropdownType);
                  }}
                  onMouseLeave={handleDropdownLeave}
                >
                  <button
                    id={`nav-${item.page}`}
                    onClick={() => handleNavClick(item.page)}
                    className={`inline-flex items-center gap-1.5 text-xs font-tech font-bold uppercase tracking-[0.13em] transition-all relative py-1 ${
                      isActive
                        ? isLight
                          ? 'text-slate-950 font-black'
                          : 'text-white font-black'
                        : isLight
                        ? 'text-slate-700 hover:text-slate-950'
                        : 'text-zinc-300 hover:text-white'
                    }`}
                  >
                    {isKitchenware && (
                      <Factory className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                    )}
                    {isKitchenEquipment && (
                      <Flame className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                    )}
                    {isGnPans && (
                      <Layers className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    )}
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          activeDropdown === currentDropdownType
                            ? 'rotate-180 text-amber-500'
                            : 'opacity-50'
                        }`}
                      />
                    )}
                    {isActive && (
                      <span
                        className={`absolute -bottom-1 left-0 right-0 h-[2px] rounded-full ${
                          isLight ? 'bg-slate-950' : 'bg-amber-400'
                        }`}
                      />
                    )}
                  </button>

                  {/* Dropdown for KITCHENWARE & HOME UTILITY */}
                  {isKitchenware && activeDropdown === 'manufacturing' && (
                    <div
                      onMouseEnter={() => handleDropdownEnter('manufacturing')}
                      onMouseLeave={handleDropdownLeave}
                      className={`absolute left-0 top-full mt-1.5 w-[520px] p-4 rounded-sm border shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                        isLight
                          ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/80'
                          : 'bg-zinc-950 border-zinc-800 text-white shadow-black/80'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-zinc-800">
                        <div>
                          <span className="text-[10px] font-tech font-bold tracking-widest text-emerald-600 dark:text-emerald-400 uppercase">
                            CATEGORY 1 • IN-HOUSE MANUFACTURING
                          </span>
                          <h4 className="text-sm font-black uppercase tracking-tight">
                            Kitchenware & Home Utility
                          </h4>
                        </div>
                        <span className="text-[10px] font-tech font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20">
                          {manufacturingProducts.length} PRODUCTS
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div className="p-2 rounded bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800/80">
                          <div className="font-tech font-bold uppercase tracking-wider text-[11px] text-slate-900 dark:text-zinc-200 flex items-center gap-1.5 mb-0.5">
                            <Layers className="w-3 h-3 text-emerald-500" />
                            <span>Trays (12 Types)</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-zinc-400 leading-snug">
                            Barfi, Rasgulla, Sandesh, Dyna, Mithai Joint-Free, Taper & Jumbo Trays in 0.4"–2.0" depths.
                          </p>
                        </div>

                        <div className="p-2 rounded bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800/80">
                          <div className="font-tech font-bold uppercase tracking-wider text-[11px] text-slate-900 dark:text-zinc-200 flex items-center gap-1.5 mb-0.5">
                            <Boxes className="w-3 h-3 text-emerald-500" />
                            <span>Storage / Masala Dani</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-zinc-400 leading-snug">
                            Domestic Masal Dani, Commercial 7-Cup Station, and Jumbo Masal Dani for kitchens & spice storage.
                          </p>
                        </div>

                        <div className="p-2 rounded bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800/80">
                          <div className="font-tech font-bold uppercase tracking-wider text-[11px] text-slate-900 dark:text-zinc-200 flex items-center gap-1.5 mb-0.5">
                            <Sparkles className="w-3 h-3 text-emerald-500" />
                            <span>Pooja / Traditional</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-zinc-400 leading-snug">
                            Pooja Peti, Heavy Stainless Gullak, Chowki, Patla & Perforated Confectionery Jhava (Chonga).
                          </p>
                        </div>

                        <div className="p-2 rounded bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800/80">
                          <div className="font-tech font-bold uppercase tracking-wider text-[11px] text-slate-900 dark:text-zinc-200 flex items-center gap-1.5 mb-0.5">
                            <Factory className="w-3 h-3 text-emerald-500" />
                            <span>Display & Custom Works</span>
                          </div>
                          <p className="text-[10px] text-slate-500 dark:text-zinc-400 leading-snug">
                            Glass Stands (6–24 Khana), Golden Stands, PVD Titanium Trays, Dust Lifters & Bread Moulds.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleNavClick('manufacturing')}
                        className="w-full py-2 px-3 text-center text-xs font-tech font-bold uppercase tracking-wider rounded bg-emerald-600 hover:bg-emerald-700 text-white transition-colors"
                      >
                        Explore All Kitchenware & Home Utility Products ({manufacturingProducts.length}) →
                      </button>
                    </div>
                  )}

                  {/* Dropdown for KITCHEN EQUIPMENT */}
                  {isKitchenEquipment && activeDropdown === 'commercial' && (
                    <div
                      onMouseEnter={() => handleDropdownEnter('commercial')}
                      onMouseLeave={handleDropdownLeave}
                      className={`absolute left-0 top-full mt-1.5 w-[540px] p-4 rounded-sm border shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                        isLight
                          ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/80'
                          : 'bg-zinc-950 border-zinc-800 text-white shadow-black/80'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-zinc-800">
                        <div>
                          <span className="text-[10px] font-tech font-bold tracking-widest text-amber-600 dark:text-amber-400 uppercase">
                            CATEGORY 2 • COMMERCIAL KITCHEN EQUIPMENT
                          </span>
                          <h4 className="text-sm font-black uppercase tracking-tight">
                            Kitchen Equipment
                          </h4>
                        </div>
                        <span className="text-[10px] font-tech font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/20">
                          {commercialProducts.length} APPLIANCE MODELS
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 text-xs mb-3">
                        <div className="p-2.5 rounded bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800/80">
                          <div className="font-tech font-bold uppercase tracking-wider text-[11px] text-slate-900 dark:text-zinc-200 flex items-center gap-1.5 mb-1">
                            <Flame className="w-3.5 h-3.5 text-amber-500" />
                            <span>Fryers, Grills & Ovens</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-snug">
                            Electric Fryers (TSL-81/82/88/89), Contact Grills (TSL-811/813), Stone Pizza Ovens (TSL-46/55/1-ST).
                          </p>
                        </div>

                        <div className="p-2.5 rounded bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800/80">
                          <div className="font-tech font-bold uppercase tracking-wider text-[11px] text-slate-900 dark:text-zinc-200 flex items-center gap-1.5 mb-1">
                            <Zap className="w-3.5 h-3.5 text-amber-500" />
                            <span>Induction, Griddles & Steamers</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-snug">
                            Commercial Induction (3.5kW/5kW), Pop-Up Toasters, Salamanders, Flat/Grooved Griddles, Momo Steamers.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleNavClick('commercial')}
                        className="w-full py-2 px-3 text-center text-xs font-tech font-bold uppercase tracking-wider rounded bg-amber-600 hover:bg-amber-700 text-white transition-colors"
                      >
                        Explore All Commercial Kitchen Equipment ({commercialProducts.length}) →
                      </button>
                    </div>
                  )}

                  {/* Dropdown for GN PANS */}
                  {isGnPans && activeDropdown === 'gnpans' && (
                    <div
                      onMouseEnter={() => handleDropdownEnter('gnpans')}
                      onMouseLeave={handleDropdownLeave}
                      className={`absolute left-0 top-full mt-1.5 w-[540px] p-4 rounded-sm border shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150 ${
                        isLight
                          ? 'bg-white border-slate-200 text-slate-900 shadow-slate-200/80'
                          : 'bg-zinc-950 border-zinc-800 text-white shadow-black/80'
                      }`}
                    >
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100 dark:border-zinc-800">
                        <div>
                          <span className="text-[10px] font-tech font-bold tracking-widest text-blue-600 dark:text-blue-400 uppercase">
                            CATEGORY 3 • GASTRONORM STANDARDS
                          </span>
                          <h4 className="text-sm font-black uppercase tracking-tight">
                            Gastronorm (GN) Pans & Covers
                          </h4>
                        </div>
                        <span className="text-[10px] font-tech font-bold px-2 py-0.5 rounded bg-blue-500/10 text-blue-700 dark:text-blue-400 border border-blue-500/20">
                          {gnPanProducts.length} SERIES • EN-631
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 text-xs mb-3">
                        <div className="p-2.5 rounded bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800/80">
                          <div className="font-tech font-bold uppercase tracking-wider text-[11px] text-slate-900 dark:text-zinc-200 flex items-center gap-1.5 mb-1">
                            <Boxes className="w-3.5 h-3.5 text-blue-500" />
                            <span>Standard GN Pans (1/1 to 2/1)</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-snug">
                            GN 1/1, 1/2, 1/3, 1/4, 1/6, 1/9 and GN 2/1 in 65mm, 100mm, 150mm & 200mm depths with anti-jam rims.
                          </p>
                        </div>

                        <div className="p-2.5 rounded bg-slate-50 dark:bg-zinc-900/60 border border-slate-100 dark:border-zinc-800/80">
                          <div className="font-tech font-bold uppercase tracking-wider text-[11px] text-slate-900 dark:text-zinc-200 flex items-center gap-1.5 mb-1">
                            <Layers className="w-3.5 h-3.5 text-blue-500" />
                            <span>Lids & Gelato Containers</span>
                          </div>
                          <p className="text-[11px] text-slate-500 dark:text-zinc-400 leading-snug">
                            Matching recessed-handle GN lids (all sizes) and stainless ice cream storage containers with lids.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleNavClick('gnpans')}
                        className="w-full py-2 px-3 text-center text-xs font-tech font-bold uppercase tracking-wider rounded bg-blue-600 hover:bg-blue-700 text-white transition-colors"
                      >
                        Explore Full Gastronorm (GN) Pan Catalogue →
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Side: WhatsApp, Get a Quote, Edit Top Bar, Theme, Admin */}
          <div className="flex items-center gap-2.5">
            {/* WhatsApp CTA (Desktop) */}
            {showWhatsapp && (
              <a
                id="header-wa-cta"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-tech font-bold uppercase tracking-wider rounded-xs border border-emerald-500/30 text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-zinc-950 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{whatsappLabel}</span>
              </a>
            )}

            {/* Get a Quote CTA (Desktop) */}
            {showQuote && (
              <button
                id="header-quote-button"
                onClick={() => {
                  setActivePage('quote');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`hidden sm:inline-flex items-center gap-1 px-3.5 py-2 font-tech font-bold text-xs tracking-[0.16em] uppercase rounded-xs transition-all active:scale-[0.98] shadow-sm ${
                  isLight
                    ? 'bg-slate-950 text-white hover:bg-slate-800'
                    : 'bg-white text-zinc-950 hover:bg-zinc-200'
                }`}
              >
                <span>{quoteLabel}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            {/* Dedicated EDIT TOP BAR Button - ADMIN ONLY */}
            {isAdmin && (
              <button
                id="header-edit-topbar-button"
                onClick={() => setHeaderEditModalOpen(true)}
                title="Edit Top Bar Header: Brand Name, Subtitle, Logo & Navigation Links"
                className={`hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-tech font-bold uppercase rounded-xs transition-colors border shadow-xs ${
                  isLight
                    ? 'bg-amber-100 hover:bg-amber-200 text-amber-950 border-amber-300'
                    : 'bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 border-amber-500/30'
                }`}
              >
                <Pencil className="w-3 h-3 text-amber-500" />
                <span>EDIT TOP BAR</span>
              </button>
            )}

            {/* Theme Toggle */}
            <button
              onClick={toggleThemeMode}
              title={isLight ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
              className={`p-2 rounded-xs text-xs border transition-colors ${
                isLight
                  ? 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                  : 'bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-300 border-white/10'
              }`}
            >
              {isLight ? <Moon className="w-3.5 h-3.5" /> : <Sun className="w-3.5 h-3.5 text-amber-300" />}
            </button>

            {/* Admin Controls */}
            {isAdmin ? (
              <button
                id="admin-cms-button"
                onClick={() => setActivePage('admin-panel')}
                title="Open Master Admin Control Panel"
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-tech font-bold uppercase rounded-xs transition-colors bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-sm"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>ADMIN PANEL</span>
              </button>
            ) : (
              <button
                onClick={() => setActivePage('admin-login')}
                title="Admin Portal Login (Authorized Personnel Only)"
                className={`hidden md:flex items-center gap-1 px-2 py-1.5 rounded-xs text-[11px] font-tech border transition-colors ${
                  isLight
                    ? 'bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 border-slate-300'
                    : 'bg-zinc-800/80 hover:bg-zinc-700/80 text-zinc-400 hover:text-white border-white/10'
                }`}
              >
                <Lock className="w-3 h-3" />
                <span>ADMIN</span>
              </button>
            )}

            {/* Mobile menu trigger */}
            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={`p-2 lg:hidden focus:outline-none ${
                isLight ? 'text-slate-900' : 'text-zinc-300 hover:text-white'
              }`}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div
            id="mobile-drawer"
            className={`lg:hidden border-b px-6 py-6 space-y-5 animate-in fade-in duration-200 max-h-[85vh] overflow-y-auto ${
              isLight
                ? 'bg-white border-slate-200 text-slate-900 shadow-xl'
                : 'bg-[#0c0e11] border-white/10 text-white shadow-2xl'
            }`}
          >
            {/* Primary Three Product Categories */}
            <div>
              <div className="text-[10px] font-tech font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400 mb-2.5 px-1">
                PRODUCT CATEGORIES
              </div>
              <div className="space-y-2.5">
                {/* 1. Kitchenware & Home Utility */}
                <button
                  onClick={() => handleNavClick('manufacturing')}
                  className={`w-full p-3.5 rounded-sm text-left border transition-all ${
                    activePage === 'manufacturing'
                      ? isLight
                        ? 'border-emerald-600 bg-emerald-50/70 text-emerald-950 ring-1 ring-emerald-600'
                        : 'border-emerald-500/60 bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30'
                      : isLight
                      ? 'border-slate-200 bg-slate-50/60 hover:bg-white text-slate-900'
                      : 'border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800/80 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 text-emerald-700 dark:text-emerald-400">
                      <Factory className="w-3.5 h-3.5" />
                      <span>1. KITCHENWARE & HOME UTILITY</span>
                    </span>
                    <span className="text-[10px] font-tech px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold">
                      {manufacturingProducts.length} ITEMS
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600 dark:text-zinc-400">
                    Manufactured kitchenware, cookware, confectionery serving products, storage products, and home utility items.
                  </p>
                </button>

                {/* 2. Kitchen Equipment */}
                <button
                  onClick={() => handleNavClick('commercial')}
                  className={`w-full p-3.5 rounded-sm text-left border transition-all ${
                    activePage === 'commercial'
                      ? isLight
                        ? 'border-amber-600 bg-amber-50/70 text-amber-950 ring-1 ring-amber-600'
                        : 'border-amber-500/60 bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/30'
                      : isLight
                      ? 'border-slate-200 bg-slate-50/60 hover:bg-white text-slate-900'
                      : 'border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800/80 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 text-amber-700 dark:text-amber-400">
                      <Flame className="w-3.5 h-3.5" />
                      <span>2. KITCHEN EQUIPMENT</span>
                    </span>
                    <span className="text-[10px] font-tech px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400 font-bold">
                      {commercialProducts.length} ITEMS
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600 dark:text-zinc-400">
                    Commercial kitchen equipment, professional cooking equipment, fryers, grills, ovens, and food-service equipment.
                  </p>
                </button>

                {/* 3. GN Pans */}
                <button
                  onClick={() => handleNavClick('gnpans')}
                  className={`w-full p-3.5 rounded-sm text-left border transition-all ${
                    activePage === 'gnpans'
                      ? isLight
                        ? 'border-blue-600 bg-blue-50/70 text-blue-950 ring-1 ring-blue-600'
                        : 'border-blue-500/60 bg-blue-500/10 text-blue-300 ring-1 ring-blue-500/30'
                      : isLight
                      ? 'border-slate-200 bg-slate-50/60 hover:bg-white text-slate-900'
                      : 'border-zinc-800 bg-zinc-900/80 hover:bg-zinc-800/80 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 text-blue-700 dark:text-blue-400">
                      <Layers className="w-3.5 h-3.5" />
                      <span>3. GASTRONORM (GN) PANS & COVERS</span>
                    </span>
                    <span className="text-[10px] font-tech px-1.5 py-0.5 rounded bg-blue-500/15 text-blue-700 dark:text-blue-400 font-bold">
                      {gnPanProducts.length} SERIES
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-slate-600 dark:text-zinc-400">
                    European EN-631 food pans (1/1 to 2/1, 65mm to 200mm depths), matching covers, and gelato storage pans.
                  </p>
                </button>
              </div>
            </div>

            {/* Other Navigation Links */}
            <div className="pt-2 border-t border-slate-200 dark:border-white/10 space-y-1">
              <div className="text-[10px] font-tech font-bold uppercase tracking-[0.2em] text-slate-500 dark:text-zinc-400 mb-1.5 px-1">
                MORE PAGES
              </div>
              {navItems
                .filter((item) => item.page !== 'manufacturing' && item.page !== 'commercial' && item.page !== 'gnpans')
                .map((item) => (
                  <button
                    key={item.id || item.page}
                    onClick={() => handleNavClick(item.page)}
                    className={`w-full py-2.5 px-3 rounded-xs text-left text-xs font-tech font-bold uppercase tracking-wider flex items-center justify-between ${
                      activePage === item.page
                        ? isLight
                          ? 'bg-slate-100 text-slate-950 font-black'
                          : 'bg-zinc-800 text-white font-black'
                        : isLight
                        ? 'text-slate-700 hover:bg-slate-50'
                        : 'text-zinc-300 hover:bg-white/5'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 opacity-50" />
                  </button>
                ))}
            </div>

            {/* Mobile Actions */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/10 space-y-2">
              {showQuote && (
                <button
                  onClick={() => {
                    setActivePage('quote');
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`w-full py-3.5 font-tech text-xs font-bold uppercase tracking-wider rounded-xs flex items-center justify-center gap-2 ${
                    isLight ? 'bg-slate-950 text-white' : 'bg-white text-zinc-950'
                  }`}
                >
                  <span>{quoteLabel}</span>
                </button>
              )}

              {showWhatsapp && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 font-tech text-xs font-bold uppercase tracking-wider rounded-xs border border-emerald-500/40 text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{whatsappLabel}</span>
                </a>
              )}

              {/* Admin vs Visitor Actions in Mobile Drawer */}
              {isAdmin ? (
                <>
                  <button
                    onClick={() => {
                      setActivePage('admin-panel');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 font-tech text-xs font-bold uppercase tracking-wider rounded-xs bg-amber-500 text-slate-950 flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>ADMIN CONTROL PANEL</span>
                  </button>

                  <button
                    onClick={() => {
                      setHeaderEditModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 font-tech text-xs font-bold uppercase tracking-wider rounded-xs border border-amber-500/40 text-amber-400 bg-amber-500/10 flex items-center justify-center gap-1.5"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                    <span>EDIT TOP BAR & NAVIGATION</span>
                  </button>

                  <button
                    onClick={() => {
                      logoutAdmin();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 font-tech text-xs font-bold uppercase tracking-wider rounded-xs border border-red-500/30 text-red-500 flex items-center justify-center gap-1.5"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>LOGOUT ADMINISTRATOR</span>
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setActivePage('admin-login');
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full py-2.5 font-tech text-xs font-bold uppercase tracking-wider rounded-xs border flex items-center justify-center gap-1.5 transition-colors ${
                    isLight
                      ? 'border-slate-300 text-slate-600 hover:text-slate-900 bg-slate-100'
                      : 'border-white/10 text-zinc-400 hover:text-white bg-zinc-900'
                  }`}
                >
                  <Lock className="w-3.5 h-3.5" />
                  <span>ADMIN PORTAL LOGIN</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Top Bar / Header Edit Modal */}
      <HeaderEditModal
        isOpen={headerEditModalOpen}
        onClose={() => setHeaderEditModalOpen(false)}
      />

      {/* Sticky Mobile Bottom Bar: WhatsApp, Call Now, Get Quote */}
      <div
        id="mobile-sticky-bottom-bar"
        className={`fixed bottom-0 left-0 right-0 z-40 sm:hidden border-t backdrop-blur-md px-3 py-2 flex items-center justify-between gap-2 transition-colors ${
          isLight
            ? 'bg-white/95 border-slate-200 shadow-lg text-slate-900'
            : 'bg-[#0a0c0f]/95 border-white/10 shadow-2xl text-white'
        }`}
      >
        {showWhatsapp && (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-2 rounded-xs bg-emerald-600 text-white font-tech text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>{whatsappLabel}</span>
          </a>
        )}

        <a
          href={`tel:${salesContact.number.replace(/\s+/g, '')}`}
          className={`flex-1 py-2.5 px-2 rounded-xs border font-tech text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 ${
            isLight
              ? 'border-slate-300 text-slate-900 bg-slate-100 hover:bg-slate-200'
              : 'border-white/15 text-white bg-zinc-900 hover:bg-zinc-800'
          }`}
        >
          <Phone className="w-3.5 h-3.5" />
          <span>Call Now</span>
        </a>

        {showQuote && (
          <button
            onClick={() => {
              setActivePage('quote');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`flex-1 py-2.5 px-2 rounded-xs font-tech text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow-xs ${
              isLight ? 'bg-slate-950 text-white' : 'bg-white text-zinc-950'
            }`}
          >
            <span>{quoteLabel}</span>
          </button>
        )}
      </div>
    </>
  );
};
