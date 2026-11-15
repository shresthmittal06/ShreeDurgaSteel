import React from 'react';
import { useContent } from '../context/ContentContext';
import {
  ArrowUpRight,
  Flame,
  Factory,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  Radio,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { IndiaNetworkVisual } from './IndiaNetworkVisual';

export const HeroSection: React.FC = () => {
  const {
    hero,
    brand,
    setActivePage,
    themeMode,
  } = useContent();
  const isLight = themeMode === 'light';

  const waUrl = `https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Shree%20Durga%20Steels,%20I%20am%20interested%20in%20commercial%20kitchen%20equipment%20and%20manufacturing%20products.`;

  return (
    <section
      id="hero-section"
      className={`relative min-h-[92vh] lg:min-h-screen flex items-center justify-center pt-28 sm:pt-32 pb-16 lg:pb-20 overflow-hidden transition-colors duration-300 ${
        isLight ? 'bg-[#f8f9fb]' : 'bg-[#090b0e]'
      }`}
    >
      {/* Background Architectural Texture with Stainless Steel Hue */}
      <div className="absolute inset-0 z-0 select-none overflow-hidden">
        <img
          src={
            hero.heroImage ||
            'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=2000&q=85'
          }
          alt="Shree Durga Steels Commercial Kitchen Equipment"
          className={`w-full h-full object-cover object-center transform scale-105 transition-transform duration-[14000ms] hover:scale-100 ease-out ${
            isLight ? 'opacity-10 mix-blend-luminosity' : 'opacity-20'
          }`}
          referrerPolicy="no-referrer"
        />
        {isLight ? (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-[#f8f9fb] via-[#f8f9fb]/90 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#f8f9fb] via-[#f8f9fb]/80 to-transparent" />
          </>
        ) : (
          <>
            <div className="absolute inset-0 bg-gradient-to-t from-[#090b0e] via-[#090b0e]/85 to-[#090b0e]/95" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#090b0e] via-transparent to-[#090b0e]/90" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#090b0e]/60 to-[#090b0e]" />
          </>
        )}
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Headlines & Call to Actions */}
          <div className="lg:col-span-7 xl:col-span-7">
            {/* Small Label with Live Network Status */}
            <div className="flex flex-wrap items-center gap-2 mb-6">
              <div
                className={`inline-flex items-center gap-2.5 px-3.5 py-1 rounded-xs border backdrop-blur-md ${
                  isLight
                    ? 'border-slate-300 bg-white/90 shadow-xs'
                    : 'border-white/10 bg-white/5'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span
                  className={`text-[11px] font-tech uppercase tracking-[0.22em] font-bold ${
                    isLight ? 'text-slate-800' : 'text-zinc-300'
                  }`}
                >
                  COMMERCIAL KITCHEN EQUIPMENT
                </span>
              </div>

              <div
                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xs text-[10px] font-tech font-bold uppercase tracking-wider ${
                  isLight
                    ? 'bg-amber-100 text-amber-900 border border-amber-300'
                    : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}
              >
                <Radio className="w-3 h-3 text-amber-500 animate-pulse" />
                <span>UP Factory Hub • Pan-India Network</span>
              </div>
            </div>

            {/* Large Headline */}
            <h1
              className={`text-4xl sm:text-6xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight leading-[1.05] mb-6 uppercase ${
                isLight ? 'text-[#171717]' : 'text-[#ffffff]'
              }`}
            >
              ENGINEERED FOR
              <br />
              <span className={isLight ? 'text-[#b45309]' : 'text-[#f59e0b]'}>
                PROFESSIONAL KITCHENS.
              </span>
            </h1>

            {/* Supporting Text */}
            <p
              className={`text-base sm:text-lg font-normal leading-relaxed max-w-xl mb-8 ${
                isLight ? 'text-[#4a4a4a]' : 'text-[#d4d4d8]'
              }`}
            >
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
                className={`px-6 sm:px-7 py-3.5 font-semibold text-xs tracking-[0.14em] uppercase rounded-xs transition-all flex items-center gap-2 shadow-sm active:scale-[0.98] ${
                  isLight
                    ? 'bg-[#171717] text-white hover:bg-[#262626]'
                    : 'bg-white text-[#171717] hover:bg-[#e5e5e5]'
                }`}
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
                className={`px-6 sm:px-7 py-3.5 font-semibold text-xs tracking-[0.14em] uppercase rounded-xs transition-all flex items-center gap-2 border active:scale-[0.98] ${
                  isLight
                    ? 'bg-white border-neutral-300 text-[#171717] hover:border-neutral-900 shadow-xs'
                    : 'bg-[#18181b] border-white/20 text-white hover:border-white'
                }`}
              >
                <span>GET A QUOTE</span>
              </button>

              <a
                id="hero-whatsapp-btn"
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 sm:px-6 py-3.5 text-xs font-semibold tracking-[0.12em] uppercase rounded-xs bg-emerald-600/10 dark:bg-emerald-500/15 border border-emerald-600/30 text-emerald-800 dark:text-emerald-400 hover:bg-emerald-600 hover:text-white dark:hover:bg-emerald-500 dark:hover:text-zinc-950 transition-all flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CHAT ON WHATSAPP</span>
              </a>
            </div>

            {/* Factory Hub Info Tagline */}
            <div className="flex items-center gap-4 text-xs font-tech text-slate-500 dark:text-zinc-400 pt-2 border-t border-slate-200/60 dark:border-white/10 max-w-lg">
              <div className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-zinc-300">
                <MapPin className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>Manufacturing Hub: Hathras, Uttar Pradesh</span>
              </div>
              <span>•</span>
              <span>Pan-India Transit & Hospitality Distribution</span>
            </div>
          </div>

          {/* Right Column: India Nationwide Connectivity Visual */}
          <div className="lg:col-span-5 xl:col-span-5 relative flex items-center justify-center">
            {/* Visual Container Card with subtle glass backdrop */}
            <div
              className={`relative w-full aspect-square max-w-[480px] lg:max-w-[540px] rounded-xl p-3 sm:p-5 transition-all duration-300 ${
                isLight
                  ? 'bg-gradient-to-b from-white/70 to-slate-100/40 border border-slate-200/80 shadow-xl shadow-slate-200/50'
                  : 'bg-gradient-to-b from-zinc-900/50 to-black/60 border border-white/10 shadow-2xl shadow-black/80'
              }`}
            >
              {/* Subtle Corner Accents */}
              <div className="absolute top-2 left-2 w-2.5 h-2.5 border-t-2 border-l-2 border-amber-500/60" />
              <div className="absolute top-2 right-2 w-2.5 h-2.5 border-t-2 border-r-2 border-amber-500/60" />
              <div className="absolute bottom-2 left-2 w-2.5 h-2.5 border-b-2 border-l-2 border-amber-500/60" />
              <div className="absolute bottom-2 right-2 w-2.5 h-2.5 border-b-2 border-r-2 border-amber-500/60" />

              {/* Status Header Badge */}
              <div className="absolute top-3 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500" />
                  </span>
                  <span className="text-[10px] font-tech font-bold uppercase tracking-widest text-slate-500 dark:text-zinc-400">
                    LIVE SUPPLY CONNECTIVITY
                  </span>
                </div>
                <div className="text-[10px] font-tech font-bold uppercase px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  ORIGIN: UP
                </div>
              </div>

              {/* High-Tech India Network Canvas Visual */}
              <div className="w-full h-full pt-4">
                <IndiaNetworkVisual isLight={isLight} />
              </div>

              {/* Bottom Visual Legend (Visual only, no state text labels as requested) */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[9px] font-tech uppercase tracking-wider text-slate-400 dark:text-zinc-500 pointer-events-none z-20">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-500 shadow-xs" />
                  <span>Central Factory Node</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 dark:bg-sky-400" />
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
