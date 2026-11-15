import React from 'react';
import { useContent } from '../context/ContentContext';
import { ActivePage } from '../types';
import { Phone, Mail, MapPin, MessageSquare, ArrowUp, Sliders, Layers, Lock, ShieldCheck, LogOut } from 'lucide-react';
import { PRODUCT_DOMAINS } from '../data/productDomains';

export const Footer: React.FC = () => {
  const {
    brand,
    categories,
    setActivePage,
    setSelectedCategoryFilter,
    setSelectedDomainFilter,
    setAdminModalOpen,
    isAdmin,
    adminUser,
    logoutAdmin,
    themeMode,
  } = useContent();

  const isLight = themeMode === 'light';

  const handleNav = (page: ActivePage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDomainNav = (domainId: string) => {
    setSelectedDomainFilter(domainId);
    setSelectedCategoryFilter('all');
    setActivePage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCategoryNav = (slug: string) => {
    setSelectedCategoryFilter(slug);
    setSelectedDomainFilter('all');
    setActivePage('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className={`border-t pt-20 pb-12 text-xs transition-colors duration-300 ${
        isLight
          ? 'bg-slate-100 text-slate-600 border-slate-200'
          : 'bg-[#08090c] text-zinc-400 border-white/10'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div
              className="flex items-center gap-3 select-none cursor-pointer"
              onClick={() => handleNav('home')}
            >
              {brand.logoImage ? (
                <div className="flex items-center gap-3">
                  <img
                    src={brand.logoImage}
                    alt={brand.brandName || 'SHRI DURGA STEELS'}
                    className="h-10 max-h-10 max-w-[180px] object-contain rounded-sm"
                    referrerPolicy="no-referrer"
                  />
                  <span
                    className={`font-extrabold text-xl tracking-[0.18em] ${
                      isLight ? 'text-slate-950' : 'text-white'
                    }`}
                  >
                    {brand.brandName || 'SHRI DURGA STEELS'}
                  </span>
                </div>
              ) : (
                <>
                  <div
                    className={`w-8 h-8 border flex items-center justify-center font-tech font-bold text-base rounded-sm ${
                      isLight
                        ? 'border-slate-300 bg-white text-slate-900'
                        : 'border-white/30 bg-white/5 text-white'
                    }`}
                  >
                    {brand.logoText ? brand.logoText.slice(0, 1) : 'S'}
                  </div>
                  <span
                    className={`font-extrabold text-xl tracking-[0.18em] ${
                      isLight ? 'text-slate-950' : 'text-white'
                    }`}
                  >
                    {brand.brandName}
                  </span>
                </>
              )}
            </div>

            <p
              className={`leading-relaxed max-w-sm font-normal text-xs ${
                isLight ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              {brand.tagline}. High-performance commercial kitchen equipment manufacturer and turnkey B2B supplier for hotels, restaurants, bakeries, cloud kitchens, and institutional food service facilities.
            </p>

            <div
              className={`pt-2 font-tech text-[11px] ${
                isLight ? 'text-slate-500' : 'text-zinc-500'
              }`}
            >
              <div>ESTABLISHED {brand.established} • {brand.location}</div>
              <div className={isLight ? 'text-slate-700 mt-1 font-semibold' : 'text-zinc-400 mt-1'}>
                {brand.businessType}
              </div>
            </div>

            <div className="pt-2">
              {isAdmin ? (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleNav('admin-panel')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-tech font-bold uppercase tracking-wider transition-colors border ${
                      isLight
                        ? 'bg-amber-100 border-amber-300 text-amber-950 hover:bg-amber-200'
                        : 'bg-amber-500/15 border-amber-500/30 text-amber-300 hover:bg-amber-500/25'
                    }`}
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-amber-500" />
                    <span>ADMIN CONTROL PANEL</span>
                  </button>
                  <button
                    onClick={logoutAdmin}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-[10px] font-tech text-red-500 hover:bg-red-500/10 transition-colors border border-red-500/30"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>LOGOUT</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleNav('admin-login')}
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-tech transition-colors border ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-600 hover:text-slate-900 shadow-xs'
                      : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white'
                  }`}
                  title="Administrative login for authorized personnel"
                >
                  <Lock className="w-3 h-3 text-zinc-400" />
                  <span>STAFF / ADMIN LOGIN</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4
              className={`text-xs font-bold uppercase tracking-[0.18em] font-tech ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 font-tech text-xs">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className={isLight ? 'hover:text-slate-950 transition-colors' : 'hover:text-white transition-colors'}
                >
                  HOME
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('pricesheet')}
                  className={isLight ? 'hover:text-slate-950 transition-colors' : 'hover:text-white transition-colors'}
                >
                  QUOTATION SELECTOR
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('quote')}
                  className={isLight ? 'hover:text-slate-950 transition-colors' : 'hover:text-white transition-colors'}
                >
                  GET A QUOTE
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className={isLight ? 'hover:text-slate-950 transition-colors' : 'hover:text-white transition-colors'}
                >
                  ABOUT US
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('contact')}
                  className={isLight ? 'hover:text-slate-950 transition-colors' : 'hover:text-white transition-colors'}
                >
                  CONTACT
                </button>
              </li>
            </ul>
          </div>

          {/* Product Domains Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4
              className={`text-xs font-bold uppercase tracking-[0.18em] font-tech ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              PRODUCT DOMAINS
            </h4>
            <ul className="space-y-2 font-tech text-xs">
              {PRODUCT_DOMAINS.map((domain, index) => (
                <li key={domain.id}>
                  <button
                    onClick={() => handleDomainNav(domain.id)}
                    className={`text-left uppercase flex items-center gap-2 transition-colors ${
                      isLight ? 'hover:text-slate-950' : 'hover:text-white'
                    }`}
                  >
                    <span className="text-[10px] text-amber-500 font-bold font-mono">
                      {index + 1}.
                    </span>
                    <span>{domain.name}</span>
                  </button>
                </li>
              ))}
              <li className="pt-1.5">
                <button
                  onClick={() => {
                    setSelectedDomainFilter('all');
                    setSelectedCategoryFilter('all');
                    handleNav('products');
                  }}
                  className={`text-left text-[11px] uppercase transition-colors ${
                    isLight ? 'text-amber-700 hover:text-amber-900 font-semibold' : 'text-amber-400 hover:text-amber-300 font-semibold'
                  }`}
                >
                  + VIEW ALL DOMAINS & CATALOGUE
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Factory Contact Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4
              className={`text-xs font-bold uppercase tracking-[0.18em] font-tech ${
                isLight ? 'text-slate-950' : 'text-white'
              }`}
            >
              DIRECT FACTORY CONTACT
            </h4>
            <div className="space-y-3 font-tech text-xs">
              {/* Primary Phone */}
              <div className="flex items-start gap-2.5">
                <Phone className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`} />
                <a
                  href={`tel:${(brand.phone || '+91 99978 90127').replace(/\s+/g, '')}`}
                  className={isLight ? 'text-slate-700 hover:text-slate-950' : 'hover:text-white'}
                >
                  {brand.phone || '+91 99978 90127'}
                </a>
              </div>

              {/* Secondary Factory Phone */}
              <div className="flex items-start gap-2.5">
                <Phone className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`} />
                <a
                  href={`tel:${(brand.phone2 || '+91 84450 77779').replace(/\s+/g, '')}`}
                  className={isLight ? 'text-slate-700 hover:text-slate-950' : 'hover:text-white'}
                >
                  {brand.phone2 || '+91 84450 77779'}
                </a>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <a
                  href={`https://wa.me/${(brand.whatsapp || '+91 70178 23423').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-emerald-600 hover:underline font-semibold"
                >
                  {brand.whatsapp || '+91 70178 23423'} (WhatsApp)
                </a>
              </div>

              {/* Email */}
              <div className="flex items-start gap-2.5">
                <Mail className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`} />
                <a
                  href={`mailto:${brand.email}`}
                  className={`truncate ${isLight ? 'text-slate-700 hover:text-slate-950' : 'hover:text-white'}`}
                >
                  {brand.email}
                </a>
              </div>

              {/* Factory Location */}
              <div className="flex items-start gap-2.5">
                <MapPin className={`w-4 h-4 shrink-0 mt-0.5 ${isLight ? 'text-slate-500' : 'text-zinc-400'}`} />
                <span className={`leading-normal ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                  {brand.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div
          className={`pt-8 border-t flex flex-col sm:flex-row items-center justify-between gap-4 font-tech text-[11px] ${
            isLight ? 'border-slate-200 text-slate-500' : 'border-white/10 text-zinc-500'
          }`}
        >
          <div>
            © {brand.established ? `${brand.established} - ${new Date().getFullYear()}` : new Date().getFullYear()}{' '}
            <span className={isLight ? 'text-slate-800 font-bold' : 'text-zinc-400'}>{brand.companyName}</span>. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className={isLight ? 'text-slate-600 hover:text-slate-950 cursor-pointer' : 'text-zinc-400 hover:text-white cursor-pointer'}>
              Commercial Terms & Warranties
            </span>
            <span className={isLight ? 'text-slate-600 hover:text-slate-950 cursor-pointer' : 'text-zinc-400 hover:text-white cursor-pointer'}>
              Privacy Policy
            </span>
            <button
              onClick={scrollToTop}
              className={`p-1.5 rounded transition-colors border ${
                isLight
                  ? 'bg-white border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-950'
                  : 'bg-zinc-900 border-white/10 hover:border-white/30 text-zinc-400 hover:text-white'
              }`}
              title="Back to top"
            >
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
