import React from 'react';
import { useContent } from '../context/ContentContext';
import { ActivePage } from '../types';
import { Phone, Mail, MapPin, MessageSquare, ArrowUp, Lock, ShieldCheck, LogOut } from 'lucide-react';
import { PRODUCT_DOMAINS } from '../data/productDomains';

export const Footer: React.FC = () => {
  const {
    brand,
    setActivePage,
    setSelectedCategoryFilter,
    setSelectedDomainFilter,
    isAdmin,
    logoutAdmin,
  } = useContent();

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

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="main-footer"
      className="border-t border-[#D8BFA8]/30 bg-[#292321] text-[#D8BFA8] pt-20 pb-12 text-xs transition-colors duration-300"
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
                    alt={brand.brandName || 'SHREE DURGA STEELS'}
                    className="h-10 max-h-10 max-w-[180px] object-contain rounded-sm"
                    referrerPolicy="no-referrer"
                  />
                  <span className="font-extrabold text-xl tracking-[0.18em] text-[#F3E7DA]">
                    {brand.brandName || 'SHREE DURGA STEELS'}
                  </span>
                </div>
              ) : (
                <>
                  <div className="w-8 h-8 border border-[#B8B8B3]/50 bg-[#5B1018] text-[#F3E7DA] flex items-center justify-center font-tech font-bold text-base rounded-sm">
                    {brand.logoText ? brand.logoText.slice(0, 1) : 'S'}
                  </div>
                  <span className="font-extrabold text-xl tracking-[0.18em] text-[#F3E7DA]">
                    {brand.brandName}
                  </span>
                </>
              )}
            </div>

            <p className="leading-relaxed max-w-sm font-normal text-xs text-[#D8BFA8]/90">
              {brand.tagline}. High-performance commercial kitchen equipment manufacturer and turnkey B2B supplier for hotels, restaurants, bakeries, cloud kitchens, and institutional food service facilities.
            </p>

            <div className="pt-2 font-tech text-[11px] text-[#B8B8B3]">
              <div>ESTABLISHED {brand.established} • {brand.location}</div>
              <div className="text-[#F3E7DA] mt-1 font-semibold">
                {brand.businessType}
              </div>
            </div>

            <div className="pt-2">
              {isAdmin ? (
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={() => handleNav('admin-panel')}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-tech font-bold uppercase tracking-wider transition-colors border bg-[#5B1018] border-[#D8BFA8]/40 text-[#F3E7DA] hover:bg-[#731620]"
                  >
                    <ShieldCheck className="w-3.5 h-3.5 text-[#D8BFA8]" />
                    <span>ADMIN CONTROL PANEL</span>
                  </button>
                  <button
                    onClick={logoutAdmin}
                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded text-[10px] font-tech text-[#F3E7DA] hover:bg-[#5B1018] transition-colors border border-[#B8B8B3]/30"
                  >
                    <LogOut className="w-3 h-3" />
                    <span>LOGOUT</span>
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => handleNav('admin-login')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-[11px] font-tech transition-colors border bg-[#1F1A18] border-[#D8BFA8]/30 text-[#D8BFA8] hover:text-[#F3E7DA] hover:border-[#D8BFA8]"
                  title="Administrative login for authorized personnel"
                >
                  <Lock className="w-3 h-3 text-[#B8B8B3]" />
                  <span>STAFF / ADMIN LOGIN</span>
                </button>
              )}
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] font-tech text-[#F3E7DA]">
              QUICK LINKS
            </h4>
            <ul className="space-y-2.5 font-tech text-xs text-[#D8BFA8]">
              <li>
                <button onClick={() => handleNav('home')} className="hover:text-[#F3E7DA] transition-colors">
                  HOME
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('pricesheet')} className="hover:text-[#F3E7DA] transition-colors">
                  QUOTATION SELECTOR
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('quote')} className="hover:text-[#F3E7DA] transition-colors">
                  GET A QUOTE
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('about')} className="hover:text-[#F3E7DA] transition-colors">
                  ABOUT US
                </button>
              </li>
              <li>
                <button onClick={() => handleNav('contact')} className="hover:text-[#F3E7DA] transition-colors">
                  CONTACT
                </button>
              </li>
            </ul>
          </div>

          {/* Product Domains Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] font-tech text-[#F3E7DA]">
              PRODUCT DOMAINS
            </h4>
            <ul className="space-y-2 font-tech text-xs text-[#D8BFA8]">
              {PRODUCT_DOMAINS.map((domain, index) => (
                <li key={domain.id}>
                  <button
                    onClick={() => handleDomainNav(domain.id)}
                    className="text-left uppercase flex items-center gap-2 hover:text-[#F3E7DA] transition-colors"
                  >
                    <span className="text-[10px] text-[#B8B8B3] font-bold font-mono">
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
                  className="text-left text-[11px] uppercase text-[#F3E7DA] hover:text-[#D8BFA8] font-semibold transition-colors underline underline-offset-4 decoration-[#5B1018]"
                >
                  + VIEW ALL DOMAINS & CATALOGUE
                </button>
              </li>
            </ul>
          </div>

          {/* Direct Factory Contact Column */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-[0.18em] font-tech text-[#F3E7DA]">
              DIRECT FACTORY CONTACT
            </h4>
            <div className="space-y-3 font-tech text-xs text-[#D8BFA8]">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 shrink-0 mt-0.5 text-[#B8B8B3]" />
                <a
                  href={`tel:${(brand.phone || '+91 99978 90127').replace(/\s+/g, '')}`}
                  className="hover:text-[#F3E7DA]"
                >
                  {brand.phone || '+91 99978 90127'}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 shrink-0 mt-0.5 text-[#B8B8B3]" />
                <a
                  href={`tel:${(brand.phone2 || '+91 84450 77779').replace(/\s+/g, '')}`}
                  className="hover:text-[#F3E7DA]"
                >
                  {brand.phone2 || '+91 84450 77779'}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <MessageSquare className="w-4 h-4 text-[#D8BFA8] shrink-0 mt-0.5" />
                <a
                  href={`https://wa.me/${(brand.whatsapp || '+91 70178 23423').replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[#F3E7DA] hover:underline font-semibold"
                >
                  {brand.whatsapp || '+91 70178 23423'} (WhatsApp)
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 shrink-0 mt-0.5 text-[#B8B8B3]" />
                <a href={`mailto:${brand.email}`} className="truncate hover:text-[#F3E7DA]">
                  {brand.email}
                </a>
              </div>

              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-[#B8B8B3]" />
                <span className="leading-normal text-[#D8BFA8]/90">
                  {brand.address}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-[#D8BFA8]/20 flex flex-col sm:flex-row items-center justify-between gap-4 font-tech text-[11px] text-[#B8B8B3]">
          <div>
            © {brand.established ? `${brand.established} - ${new Date().getFullYear()}` : new Date().getFullYear()}{' '}
            <span className="text-[#F3E7DA] font-bold">{brand.companyName}</span>. All Rights Reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[#D8BFA8] hover:text-[#F3E7DA] cursor-pointer">
              Commercial Terms & Warranties
            </span>
            <span className="text-[#D8BFA8] hover:text-[#F3E7DA] cursor-pointer">
              Privacy Policy
            </span>
            <button
              onClick={scrollToTop}
              className="p-1.5 rounded transition-colors border bg-[#5B1018] border-[#D8BFA8]/30 hover:bg-[#731620] text-[#F3E7DA]"
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
