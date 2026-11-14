import React from 'react';
import { useContent } from '../context/ContentContext';
import {
  FileDown,
  ArrowUpRight,
  MessageSquare,
  Wrench,
  Grid,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';

export const CatalogueDownloadSection: React.FC = () => {
  const { brand, products, setActivePage, setCatalogueModalOpen, openQuoteModal, themeMode } =
    useContent();
  const isLight = themeMode === 'light';

  const waSalesUrl = `https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Shree%20Durga%20Steels,%20I%20would%20like%20to%20speak%20with%20your%20commercial%20kitchen%20sales%20team%20regarding%20bulk%20equipment.`;

  return (
    <section
      id="catalogue-section"
      className={`py-28 border-t transition-colors ${
        isLight ? 'bg-slate-100 border-slate-200' : 'bg-[#090b0e] border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-amber-700 dark:text-amber-400 mb-4 px-3 py-1 rounded-xs bg-amber-500/10 border border-amber-500/20">
            <FileDown className="w-3.5 h-3.5" />
            <span>SPECIFICATIONS & B2B LITERATURE</span>
          </div>

          <h2
            className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-[1.08] mb-6 ${
              isLight ? 'text-[#171717]' : 'text-[#ffffff]'
            }`}
          >
            EXPLORE THE
            <br />
            <span className={isLight ? 'text-[#b45309]' : 'text-[#f59e0b]'}>
              FULL RANGE.
            </span>
          </h2>

          <p
            className={`text-base sm:text-lg leading-relaxed font-normal ${
              isLight ? 'text-[#4a4a4a]' : 'text-[#d4d4d8]'
            }`}
          >
            Access our complete technical specifications, dimensional matrices, and commercial foodservice hardware through instant digital resources or direct consultation.
          </p>
        </div>

        {/* 4 Options Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Option 1: View Online Catalogue */}
          <div
            onClick={() => {
              setActivePage('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className={`p-8 rounded-xs border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
              isLight
                ? 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-lg'
                : 'bg-[#11141a] border-white/10 hover:border-white/30 hover:bg-[#131720]'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-xs bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-900 dark:text-white mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <Grid className="w-6 h-6" />
              </div>
              <h3
                className={`text-lg font-bold uppercase tracking-tight mb-2 ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                View Online Catalogue
              </h3>
              <p
                className={`text-xs leading-relaxed font-normal ${
                  isLight ? 'text-slate-600' : 'text-zinc-400'
                }`}
              >
                Browse all {products.length} commercial kitchen appliances and in-house stainless steel tray variants with instant technical filters.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-tech font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <span>EXPLORE NOW</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Option 2: Download PDF Catalogue */}
          <div
            onClick={() => setCatalogueModalOpen(true)}
            className={`p-8 rounded-xs border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
              isLight
                ? 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-lg'
                : 'bg-[#11141a] border-white/10 hover:border-white/30 hover:bg-[#131720]'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-xs bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-900 dark:text-white mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <FileDown className="w-6 h-6" />
              </div>
              <h3
                className={`text-lg font-bold uppercase tracking-tight mb-2 ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                Download PDF Catalogue
              </h3>
              <p
                className={`text-xs leading-relaxed font-normal ${
                  isLight ? 'text-slate-600' : 'text-zinc-400'
                }`}
              >
                Receive the complete engineering catalogue including dimensional drawings, electrical ratings, and packing specifications.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-tech font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <span>GET PDF BROCHURE</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Option 3: Request Custom Product */}
          <div
            onClick={() => openQuoteModal('Custom Stainless Steel Product Fabrication', 'Custom SS')}
            className={`p-8 rounded-xs border transition-all duration-300 cursor-pointer flex flex-col justify-between group ${
              isLight
                ? 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-lg'
                : 'bg-[#11141a] border-white/10 hover:border-white/30 hover:bg-[#131720]'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-xs bg-slate-100 dark:bg-zinc-800 flex items-center justify-center text-slate-900 dark:text-white mb-6 group-hover:bg-amber-500 group-hover:text-slate-950 transition-colors">
                <Wrench className="w-6 h-6" />
              </div>
              <h3
                className={`text-lg font-bold uppercase tracking-tight mb-2 ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                Request Custom Product
              </h3>
              <p
                className={`text-xs leading-relaxed font-normal ${
                  isLight ? 'text-slate-600' : 'text-zinc-400'
                }`}
              >
                Submit CAD drawings or custom dimensional requests for specialized tray depths, masala consoles, and bespoke stainless hardware.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-tech font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400">
              <span>SUBMIT DRAWING</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Option 4: Speak with Sales */}
          <a
            href={waSalesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`p-8 rounded-xs border transition-all duration-300 flex flex-col justify-between group ${
              isLight
                ? 'bg-white border-slate-200 hover:border-slate-400 hover:shadow-lg'
                : 'bg-[#11141a] border-white/10 hover:border-white/30 hover:bg-[#131720]'
            }`}
          >
            <div>
              <div className="w-12 h-12 rounded-xs bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3
                className={`text-lg font-bold uppercase tracking-tight mb-2 ${
                  isLight ? 'text-slate-950' : 'text-white'
                }`}
              >
                Speak with Sales
              </h3>
              <p
                className={`text-xs leading-relaxed font-normal ${
                  isLight ? 'text-slate-600' : 'text-zinc-400'
                }`}
              >
                Instant WhatsApp and telephone consultation with our technical sales managers for commercial kitchen projects and dealer pricing.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs font-tech font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
              <span>CONNECT ON WHATSAPP</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
