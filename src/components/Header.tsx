import React, { useState, useEffect, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { ActivePage, HeaderNavItem } from '../types';
import { defaultHeaderNavItems } from '../data/defaultData';
import { HeaderEditModal } from './HeaderEditModal';
import {
  Menu,
  X,
  ChevronRight,
  ChevronDown,
  Phone,
  MessageSquare,
  Pencil,
  Flame,
  Factory,
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
    isAdmin,
    logoutAdmin,
    setSelectedProductForDetail,
    setActiveDivisionFilter,
    setSelectedCategoryFilter,
    commercialProducts,
    gnPanProducts,
    manufacturingProducts,
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

  const rawNavItems: HeaderNavItem[] =
    brand.headerNavItems && brand.headerNavItems.length > 0
      ? brand.headerNavItems
      : defaultHeaderNavItems;

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

  return (
    <>
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-[#D8BFA8] ${
          scrolled
            ? 'py-2.5 bg-[#FAF4EE]/95 backdrop-blur-md shadow-sm'
            : 'py-3.5 bg-[#F3E7DA]/95 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo & Title */}
          <div className="flex items-center gap-2 shrink-0">
            <div
              id="header-brand"
              onClick={() => handleNavClick('home')}
              className="cursor-pointer group flex items-center gap-3 select-none"
            >
              {brand.logoImage ? (
                <img
                  src={brand.logoImage}
                  alt={brand.brandName || 'SHREE DURGA STEELS'}
                  className="h-8 sm:h-9 max-h-9 max-w-[120px] object-contain rounded-xs"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-9 h-9 border border-[#B8B8B3] bg-[#5B1018] text-[#F3E7DA] flex items-center justify-center font-tech font-bold text-sm tracking-wider rounded-xs transition-colors shrink-0 group-hover:bg-[#440B11]">
                  {brand.logoText ? brand.logoText.slice(0, 2) : 'SD'}
                </div>
              )}

              <div className="flex flex-col justify-center">
                <span className="font-black text-xs sm:text-sm md:text-base tracking-[0.14em] block uppercase leading-tight whitespace-nowrap text-[#292321] group-hover:text-[#5B1018] transition-colors">
                  {brand.brandName || 'SHREE DURGA STEELS'}
                </span>
                <span className="text-[8px] sm:text-[9px] tracking-[0.18em] block uppercase font-tech font-semibold whitespace-nowrap text-[#5B1018]">
                  {headerTagline || 'COMMERCIAL KITCHEN & MANUFACTURING'}
                </span>
              </div>
            </div>

            {isAdmin && (
              <button
                type="button"
                onClick={() => setHeaderEditModalOpen(true)}
                title="Quick Edit Top Bar Title, Subtitle, Logo & Navigation"
                className="hidden md:flex p-1 rounded-sm text-[#5A4F4B] hover:text-[#5B1018] hover:bg-[#D8BFA8]/30 transition-colors"
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
                    className={`inline-flex items-center gap-1.5 text-xs font-tech font-bold uppercase tracking-[0.13em] transition-all relative py-1 whitespace-nowrap shrink-0 ${
                      isActive
                        ? 'text-[#5B1018] font-black'
                        : 'text-[#292321]/80 hover:text-[#5B1018]'
                    }`}
                  >
                    {isKitchenware && <Factory className="w-3.5 h-3.5 text-[#5B1018]" />}
                    {isKitchenEquipment && <Flame className="w-3.5 h-3.5 text-[#5B1018]" />}
                    {isGnPans && <Layers className="w-3.5 h-3.5 text-[#5B1018]" />}
                    <span>{item.label}</span>
                    {hasDropdown && (
                      <ChevronDown
                        className={`w-3 h-3 transition-transform duration-200 ${
                          activeDropdown === currentDropdownType
                            ? 'rotate-180 text-[#5B1018]'
                            : 'text-[#B8B8B3]'
                        }`}
                      />
                    )}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 right-0 h-[2px] rounded-full bg-[#5B1018]" />
                    )}
                  </button>

                  {/* Dropdown for KITCHENWARE & HOME UTILITY */}
                  {isKitchenware && activeDropdown === 'manufacturing' && (
                    <div
                      onMouseEnter={() => handleDropdownEnter('manufacturing')}
                      onMouseLeave={handleDropdownLeave}
                      className="absolute left-0 top-full mt-1.5 w-[520px] p-4 rounded-sm border border-[#D8BFA8] bg-[#FAF4EE] text-[#292321] shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D8BFA8]/60">
                        <div>
                          <span className="text-[10px] font-tech font-bold tracking-widest text-[#5B1018] uppercase">
                            CATEGORY 1 • IN-HOUSE MANUFACTURING
                          </span>
                          <h4 className="text-sm font-black uppercase tracking-tight text-[#292321]">
                            Kitchenware & Home Utility
                          </h4>
                        </div>
                        <span className="text-[10px] font-tech font-bold px-2 py-0.5 rounded bg-[#D8BFA8]/40 text-[#5B1018] border border-[#D8BFA8]">
                          {manufacturingProducts.length} PRODUCTS
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                        <div className="p-2.5 rounded bg-[#F3E7DA] border border-[#D8BFA8]/70">
                          <div className="font-tech font-bold uppercase tracking-wider text-[11px] text-[#292321] flex items-center gap-1.5 mb-0.5">
                            <Layers className="w-3 h-3 text-[#5B1018]" />
                            <span>Trays (12 Types)</span>
                          </div>
                          <p className="text-[10px] text-[#5A4F4B] leading-snug">
                            Barfi, Rasgulla, Sandesh, Dyna, Mithai Joint-Free, Taper & Jumbo Trays in 0.4"–2.0" depths.
                          </p>
                        </div>

                        <div className="p-2.5 rounded bg-[#F3E7DA] border border-[#D8BFA8]/70">
                          <div className="font-tech font-bold uppercase tracking-wider text-[11px] text-[#292321] flex items-center gap-1.5 mb-0.5">
                            <Boxes className="w-3 h-3 text-[#5B1018]" />
                            <span>Storage / Masala Dani</span>
                          </div>
                          <p className="text-[10px] text-[#5A4F4B] leading-snug">
                            Domestic Masal Dani, Commercial 7-Cup Station, and Jumbo Masal Dani for kitchens & spice storage.
                          </p>
                        </div>

                        <div className="p-2.5 rounded bg-[#F3E7DA] border border-[#D8BFA8]/70">
                          <div className="font-tech font-bold uppercase tracking-wider text-[11px] text-[#292321] flex items-center gap-1.5 mb-0.5">
                            <Sparkles className="w-3 h-3 text-[#5B1018]" />
                            <span>Pooja / Traditional</span>
                          </div>
                          <p className="text-[10px] text-[#5A4F4B] leading-snug">
                            Pooja Peti, Heavy Stainless Gullak, Chowki, Patla & Perforated Confectionery Jhava (Chonga).
                          </p>
                        </div>

                        <div className="p-2.5 rounded bg-[#F3E7DA] border border-[#D8BFA8]/70">
                          <div className="font-tech font-bold uppercase tracking-wider text-[11px] text-[#292321] flex items-center gap-1.5 mb-0.5">
                            <Factory className="w-3 h-3 text-[#5B1018]" />
                            <span>Display & Custom Works</span>
                          </div>
                          <p className="text-[10px] text-[#5A4F4B] leading-snug">
                            Glass Stands (6–24 Khana), Golden Stands, PVD Titanium Trays, Dust Lifters & Bread Moulds.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleNavClick('manufacturing')}
                        className="w-full py-2.5 px-3 text-center text-xs font-tech font-bold uppercase tracking-wider rounded bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] transition-colors"
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
                      className="absolute left-0 top-full mt-1.5 w-[540px] p-4 rounded-sm border border-[#D8BFA8] bg-[#FAF4EE] text-[#292321] shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D8BFA8]/60">
                        <div>
                          <span className="text-[10px] font-tech font-bold tracking-widest text-[#5B1018] uppercase">
                            CATEGORY 2 • COMMERCIAL KITCHEN EQUIPMENT
                          </span>
                          <h4 className="text-sm font-black uppercase tracking-tight text-[#292321]">
                            Kitchen Equipment
                          </h4>
                        </div>
                        <span className="text-[10px] font-tech font-bold px-2 py-0.5 rounded bg-[#D8BFA8]/40 text-[#5B1018] border border-[#D8BFA8]">
                          {commercialProducts.length} APPLIANCE MODELS
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 text-xs mb-3">
                        <div className="p-2.5 rounded bg-[#F3E7DA] border border-[#D8BFA8]/70">
                          <div className="font-tech font-bold uppercase tracking-wider text-[11px] text-[#292321] flex items-center gap-1.5 mb-1">
                            <Flame className="w-3.5 h-3.5 text-[#5B1018]" />
                            <span>Fryers, Grills & Ovens</span>
                          </div>
                          <p className="text-[11px] text-[#5A4F4B] leading-snug">
                            Electric Fryers (TSL-81/82/88/89), Contact Grills (TSL-811/813), Stone Pizza Ovens (TSL-46/55/1-ST).
                          </p>
                        </div>

                        <div className="p-2.5 rounded bg-[#F3E7DA] border border-[#D8BFA8]/70">
                          <div className="font-tech font-bold uppercase tracking-wider text-[11px] text-[#292321] flex items-center gap-1.5 mb-1">
                            <Zap className="w-3.5 h-3.5 text-[#5B1018]" />
                            <span>Induction, Griddles & Steamers</span>
                          </div>
                          <p className="text-[11px] text-[#5A4F4B] leading-snug">
                            Commercial Induction (3.5kW/5kW), Pop-Up Toasters, Salamanders, Flat/Grooved Griddles, Momo Steamers.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleNavClick('commercial')}
                        className="w-full py-2.5 px-3 text-center text-xs font-tech font-bold uppercase tracking-wider rounded bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] transition-colors"
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
                      className="absolute left-0 top-full mt-1.5 w-[540px] p-4 rounded-sm border border-[#D8BFA8] bg-[#FAF4EE] text-[#292321] shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-150"
                    >
                      <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#D8BFA8]/60">
                        <div>
                          <span className="text-[10px] font-tech font-bold tracking-widest text-[#5B1018] uppercase">
                            CATEGORY 3 • GASTRONORM STANDARDS
                          </span>
                          <h4 className="text-sm font-black uppercase tracking-tight text-[#292321]">
                            Gastronorm (GN) Pans & Covers
                          </h4>
                        </div>
                        <span className="text-[10px] font-tech font-bold px-2 py-0.5 rounded bg-[#D8BFA8]/40 text-[#5B1018] border border-[#D8BFA8]">
                          {gnPanProducts.length} SERIES • EN-631
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2.5 text-xs mb-3">
                        <div className="p-2.5 rounded bg-[#F3E7DA] border border-[#D8BFA8]/70">
                          <div className="font-tech font-bold uppercase tracking-wider text-[11px] text-[#292321] flex items-center gap-1.5 mb-1">
                            <Boxes className="w-3.5 h-3.5 text-[#5B1018]" />
                            <span>Standard GN Pans (1/1 to 2/1)</span>
                          </div>
                          <p className="text-[11px] text-[#5A4F4B] leading-snug">
                            GN 1/1, 1/2, 1/3, 1/4, 1/6, 1/9 and GN 2/1 in 65mm, 100mm, 150mm & 200mm depths with anti-jam rims.
                          </p>
                        </div>

                        <div className="p-2.5 rounded bg-[#F3E7DA] border border-[#D8BFA8]/70">
                          <div className="font-tech font-bold uppercase tracking-wider text-[11px] text-[#292321] flex items-center gap-1.5 mb-1">
                            <Layers className="w-3.5 h-3.5 text-[#5B1018]" />
                            <span>Lids & Gelato Containers</span>
                          </div>
                          <p className="text-[11px] text-[#5A4F4B] leading-snug">
                            Matching recessed-handle GN lids (all sizes) and stainless ice cream storage containers with lids.
                          </p>
                        </div>
                      </div>

                      <button
                        onClick={() => handleNavClick('gnpans')}
                        className="w-full py-2.5 px-3 text-center text-xs font-tech font-bold uppercase tracking-wider rounded bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] transition-colors"
                      >
                        Explore Full Gastronorm (GN) Pan Catalogue →
                      </button>
                    </div>
                  )}
                </div>
              );
            })}
          </nav>

          {/* Right Side Actions (Theme Toggle Removed) */}
          <div className="flex items-center gap-2.5 shrink-0">
            {showWhatsapp && (
              <a
                id="header-wa-cta"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-tech font-bold uppercase tracking-wider rounded-xs border border-[#5B1018]/30 text-[#5B1018] bg-[#D8BFA8]/40 hover:bg-[#5B1018] hover:text-[#F3E7DA] transition-colors whitespace-nowrap"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>{whatsappLabel}</span>
              </a>
            )}

            {showQuote && (
              <button
                id="header-quote-button"
                onClick={() => {
                  setActivePage('quote');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hidden sm:inline-flex items-center gap-1 px-3.5 py-2 font-tech font-bold text-xs tracking-[0.16em] uppercase rounded-xs bg-[#5B1018] text-[#F3E7DA] hover:bg-[#440B11] transition-all active:scale-[0.98] shadow-sm whitespace-nowrap"
              >
                <span>{quoteLabel}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}

            {isAdmin && (
              <button
                id="header-edit-topbar-button"
                onClick={() => setHeaderEditModalOpen(true)}
                title="Edit Top Bar Header: Brand Name, Subtitle, Logo & Navigation Links"
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-tech font-bold uppercase rounded-xs transition-colors border bg-[#D8BFA8]/50 hover:bg-[#D8BFA8] text-[#292321] border-[#B8B8B3] shadow-xs whitespace-nowrap"
              >
                <Pencil className="w-3 h-3 text-[#5B1018]" />
                <span>EDIT TOP BAR</span>
              </button>
            )}

            {isAdmin ? (
              <button
                id="admin-cms-button"
                onClick={() => setActivePage('admin-panel')}
                title="Open Master Admin Control Panel"
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-[11px] font-tech font-bold uppercase rounded-xs transition-colors bg-[#292321] hover:bg-[#3f3734] text-[#F3E7DA] shadow-sm whitespace-nowrap"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-[#D8BFA8]" />
                <span>ADMIN PANEL</span>
              </button>
            ) : (
              <button
                onClick={() => setActivePage('admin-login')}
                title="Admin Portal Login (Authorized Personnel Only)"
                className="hidden md:flex items-center gap-1 px-2.5 py-1.5 rounded-xs text-[11px] font-tech font-semibold border border-[#D8BFA8] bg-[#FAF4EE] hover:bg-[#D8BFA8]/40 text-[#292321] transition-colors whitespace-nowrap"
              >
                <Lock className="w-3 h-3 text-[#5B1018]" />
                <span>ADMIN</span>
              </button>
            )}

            <button
              id="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 lg:hidden focus:outline-none text-[#292321] hover:text-[#5B1018]"
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
            className="lg:hidden border-b border-[#D8BFA8] bg-[#FAF4EE] text-[#292321] shadow-2xl px-6 py-6 space-y-5 animate-in fade-in duration-200 max-h-[85vh] overflow-y-auto"
          >
            <div>
              <div className="text-[10px] font-tech font-bold uppercase tracking-[0.2em] text-[#5A4F4B] mb-2.5 px-1">
                PRODUCT CATEGORIES
              </div>
              <div className="space-y-2.5">
                <button
                  onClick={() => handleNavClick('manufacturing')}
                  className={`w-full p-3.5 rounded-sm text-left border transition-all ${
                    activePage === 'manufacturing'
                      ? 'border-[#5B1018] bg-[#5B1018]/10 text-[#292321] ring-1 ring-[#5B1018]'
                      : 'border-[#D8BFA8] bg-[#F3E7DA] hover:bg-white text-[#292321]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 text-[#5B1018]">
                      <Factory className="w-3.5 h-3.5" />
                      <span>1. KITCHENWARE & HOME UTILITY</span>
                    </span>
                    <span className="text-[10px] font-tech px-1.5 py-0.5 rounded bg-[#D8BFA8]/50 text-[#5B1018] font-bold">
                      {manufacturingProducts.length} ITEMS
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#5A4F4B]">
                    Manufactured kitchenware, cookware, confectionery serving products, storage products, and home utility items.
                  </p>
                </button>

                <button
                  onClick={() => handleNavClick('commercial')}
                  className={`w-full p-3.5 rounded-sm text-left border transition-all ${
                    activePage === 'commercial'
                      ? 'border-[#5B1018] bg-[#5B1018]/10 text-[#292321] ring-1 ring-[#5B1018]'
                      : 'border-[#D8BFA8] bg-[#F3E7DA] hover:bg-white text-[#292321]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 text-[#5B1018]">
                      <Flame className="w-3.5 h-3.5" />
                      <span>2. KITCHEN EQUIPMENT</span>
                    </span>
                    <span className="text-[10px] font-tech px-1.5 py-0.5 rounded bg-[#D8BFA8]/50 text-[#5B1018] font-bold">
                      {commercialProducts.length} ITEMS
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#5A4F4B]">
                    Commercial kitchen equipment, professional cooking equipment, fryers, grills, ovens, and food-service equipment.
                  </p>
                </button>

                <button
                  onClick={() => handleNavClick('gnpans')}
                  className={`w-full p-3.5 rounded-sm text-left border transition-all ${
                    activePage === 'gnpans'
                      ? 'border-[#5B1018] bg-[#5B1018]/10 text-[#292321] ring-1 ring-[#5B1018]'
                      : 'border-[#D8BFA8] bg-[#F3E7DA] hover:bg-white text-[#292321]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-tech font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 text-[#5B1018]">
                      <Layers className="w-3.5 h-3.5" />
                      <span>3. GASTRONORM (GN) PANS & COVERS</span>
                    </span>
                    <span className="text-[10px] font-tech px-1.5 py-0.5 rounded bg-[#D8BFA8]/50 text-[#5B1018] font-bold">
                      {gnPanProducts.length} SERIES
                    </span>
                  </div>
                  <p className="text-[11px] leading-relaxed text-[#5A4F4B]">
                    European EN-631 food pans (1/1 to 2/1, 65mm to 200mm depths), matching covers, and gelato storage pans.
                  </p>
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-[#D8BFA8] space-y-1">
              <div className="text-[10px] font-tech font-bold uppercase tracking-[0.2em] text-[#5A4F4B] mb-1.5 px-1">
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
                        ? 'bg-[#D8BFA8]/40 text-[#5B1018] font-black'
                        : 'text-[#292321] hover:bg-[#F3E7DA]'
                    }`}
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-4 h-4 text-[#B8B8B3]" />
                  </button>
                ))}
            </div>

            <div className="pt-4 border-t border-[#D8BFA8] space-y-2">
              {showQuote && (
                <button
                  onClick={() => {
                    setActivePage('quote');
                    setMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="w-full py-3.5 font-tech text-xs font-bold uppercase tracking-wider rounded-xs bg-[#5B1018] text-[#F3E7DA] flex items-center justify-center gap-2"
                >
                  <span>{quoteLabel}</span>
                </button>
              )}

              {showWhatsapp && (
                <a
                  href={waUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 font-tech text-xs font-bold uppercase tracking-wider rounded-xs border border-[#5B1018]/30 text-[#5B1018] bg-[#D8BFA8]/40 flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>{whatsappLabel}</span>
                </a>
              )}

              {isAdmin ? (
                <>
                  <button
                    onClick={() => {
                      setActivePage('admin-panel');
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 font-tech text-xs font-bold uppercase tracking-wider rounded-xs bg-[#292321] text-[#F3E7DA] flex items-center justify-center gap-1.5 shadow-sm"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D8BFA8]" />
                    <span>ADMIN CONTROL PANEL</span>
                  </button>

                  <button
                    onClick={() => {
                      setHeaderEditModalOpen(true);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2.5 font-tech text-xs font-bold uppercase tracking-wider rounded-xs border border-[#D8BFA8] text-[#292321] bg-[#F3E7DA] flex items-center justify-center gap-1.5"
                  >
                    <Pencil className="w-3.5 h-3.5 text-[#5B1018]" />
                    <span>EDIT TOP BAR & NAVIGATION</span>
                  </button>

                  <button
                    onClick={() => {
                      logoutAdmin();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full py-2 font-tech text-xs font-bold uppercase tracking-wider rounded-xs border border-[#5B1018]/40 text-[#5B1018] flex items-center justify-center gap-1.5"
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
                  className="w-full py-2.5 font-tech text-xs font-bold uppercase tracking-wider rounded-xs border border-[#D8BFA8] text-[#292321] bg-[#F3E7DA] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Lock className="w-3.5 h-3.5 text-[#5B1018]" />
                  <span>ADMIN PORTAL LOGIN</span>
                </button>
              )}
            </div>
          </div>
        )}
      </header>

      <HeaderEditModal
        isOpen={headerEditModalOpen}
        onClose={() => setHeaderEditModalOpen(false)}
      />

      {/* Sticky Mobile Bottom Bar */}
      <div
        id="mobile-sticky-bottom-bar"
        className="fixed bottom-0 left-0 right-0 z-40 sm:hidden border-t border-[#D8BFA8] bg-[#FAF4EE]/95 backdrop-blur-md shadow-lg text-[#292321] px-3 py-2 flex items-center justify-between gap-2"
      >
        {showWhatsapp && (
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 px-2 rounded-xs bg-[#292321] text-[#F3E7DA] font-tech text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-xs"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#D8BFA8]" />
            <span>{whatsappLabel}</span>
          </a>
        )}

        <a
          href={`tel:${salesContact.number.replace(/\s+/g, '')}`}
          className="flex-1 py-2.5 px-2 rounded-xs border border-[#D8BFA8] font-tech text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 text-[#292321] bg-[#F3E7DA]"
        >
          <Phone className="w-3.5 h-3.5 text-[#5B1018]" />
          <span>Call Now</span>
        </a>

        {showQuote && (
          <button
            onClick={() => {
              setActivePage('quote');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="flex-1 py-2.5 px-2 rounded-xs font-tech text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 shadow-xs bg-[#5B1018] text-[#F3E7DA]"
          >
            <span>{quoteLabel}</span>
          </button>
        )}
      </div>
    </>
  );
};
