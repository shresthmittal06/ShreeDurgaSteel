import React from 'react';
import { useContent } from '../context/ContentContext';
import {
  ArrowUpRight,
  MessageSquare,
  Radio,
  MapPin,
} from 'lucide-react';
import { IndiaNetworkVisual } from './IndiaNetworkVisual';

export const HeroSection: React.FC = () => {
  const {
    hero,
    brand,
    setActivePage,
  } = useContent();

  const waUrl = `https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Shree%20Durga%20Steels,%20I%20am%20interested%20in%20commercial%20kitchen%20equipment%20and%20manufacturing%20products.`;

  return (
    <section
      id="hero-section"
      className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 sm:pt-32 pb-16 lg:pb-20 overflow-hidden bg-[#F3E7DA] text-[#292321]"
    >
      {/* Background Architectural Texture */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <img
          src={
            hero.heroImage ||
            'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=2000&q=85'
          }
          alt="Shree Durga Steels Commercial Kitchen Equipment"
          className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-[14000ms] hover:scale-100 ease-out opacity-10 mix-blend-multiply"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#F3E7DA] via-[#F3E7DA]/92 to-[#F3E7DA]/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#F3E7DA] via-[#F3E7DA]/85 to-transparent" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 xl:col-span-7">
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-xs border border-[#D8BFA8] bg-[#FAF4EE] shadow-xs">
                <span className="text-[11px] font-tech uppercase tracking-[0.22em] font-bold text-[#292321]">
                  COMMERCIAL KITCHEN EQUIPMENT
                </span>
              </div>

              <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs text-[10px] font-tech font-bold uppercase tracking-wider bg-[#5B1018] text-[#F3E7DA] border border-[#5B1018]">
                <Radio className="w-3 h-3 text-[#D8BFA8]" />
                <span>UP Factory Hub • Pan-India Network</span>
              </div>
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 uppercase text-[#292321]">
              ENGINEERED FOR
              <br />
              <span className="text-[#5B1018]">
                PROFESSIONAL KITCHENS.
              </span>
            </h1>

            <p className="text-base sm:text-lg font-normal leading-relaxed max-w-xl mb-8 text-[#4D423E]">
              Professional commercial kitchen equipment designed for demanding food-service environments, backed by manufacturing expertise and reliable B2B supply.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 mb-8">
              <button
                id="hero-explore-btn"
                onClick={() => {
                  setActivePage('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 sm:px-7 py-3.5 font-semibold text-xs tracking-[0.14em] uppercase rounded-xs transition-all flex items-center gap-2 shadow-sm active:scale-[0.98] bg-[#5B1018] text-[#F3E7DA] hover:bg-[#440B11]"
              >
                <span>EXPLORE PRODUCTS</span>
                <ArrowUpRight className="w-4 h-4 opacity-90" />
              </button>

              <button
                id="hero-quote-btn"
                onClick={() => {
                  setActivePage('quote');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-6 sm:px-7 py-3.5 font-semibold text-xs tracking-[0.14em] uppercase rounded-xs transition-all flex items-center gap-2 border border-[#292321] bg-[#FAF4EE] text-[#292321] hover:bg-[#292321] hover:text-[#F3E7DA] active:scale-[0.98] shadow-xs"
              >
                <span>GET A QUOTE</span>
              </button>

              <a
                id="hero-whatsapp-btn"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-6 py-3.5 text-xs font-semibold tracking-[0.12em] uppercase rounded-xs bg-[#D8BFA8]/50 border border-[#D8BFA8] text-[#292321] hover:bg-[#5B1018] hover:border-[#5B1018] hover:text-[#F3E7DA] transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4 text-[#5B1018] group-hover:text-[#F3E7DA]" />
                <span>CHAT ON WHATSAPP</span>
              </a>
            </div>

            {/* Factory Hub Info Tagline */}
            <div className="flex items-center gap-4 text-xs font-tech text-[#5A4F4B] pt-3 border-t border-[#D8BFA8] max-w-lg">
              <div className="flex items-center gap-1.5 font-semibold text-[#292321]">
                <MapPin className="w-3.5 h-3.5 text-[#5B1018] shrink-0" />
                <span>Manufacturing Hub: Hathras, Uttar Pradesh</span>
              </div>
              <span className="text-[#B8B8B3]">•</span>
              <span>Pan-India Transit & Hospitality Distribution</span>
            </div>
          </div>

          {/* Right Column: India Nationwide Connectivity Visual */}
          <div className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-center">
            <div className="relative w-full aspect-square max-w-[480px] lg:max-w-[540px] rounded-xl p-3 sm:p-5 bg-gradient-to-b from-[#FAF4EE] to-[#EBDACC]/70 border border-[#D8BFA8] shadow-xl shadow-[#292321]/10">
              {/* Subtle Metallic Silver Corner Accents */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-[#5B1018]" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-[#5B1018]" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-[#5B1018]" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-[#5B1018]" />

              {/* Status Header */}
              <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-tech font-bold uppercase tracking-widest text-[#292321]">
                    LIVE SUPPLY CONNECTIVITY
                  </span>
                </div>
                <div className="text-[10px] font-tech font-bold uppercase px-2 py-0.5 rounded bg-[#5B1018] text-[#F3E7DA] border border-[#5B1018]">
                  ORIGIN: UP
                </div>
              </div>

              <div className="w-full h-full pt-4">
                <IndiaNetworkVisual />
              </div>

              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[9px] font-tech uppercase tracking-wider text-[#5A4F4B] pointer-events-none z-20">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#5B1018] shadow-xs" />
                  <span>Central Factory Node</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#B8B8B3] ring-1 ring-[#292321]/40" />
                  <span>Regional State Distribution</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
