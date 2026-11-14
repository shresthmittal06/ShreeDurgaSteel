import React from 'react';
import { useContent } from '../context/ContentContext';
import { ShieldCheck, Award, Factory, Truck, CheckCircle2 } from 'lucide-react';

export const TrustStatsSection: React.FC = () => {
  const { brand, products, themeMode } = useContent();
  const isLight = themeMode === 'light';

  const stats = [
    {
      value: '26+',
      label: 'YEARS IN BUSINESS',
      detail: 'Established 1998 in commercial kitchen & SS manufacturing',
    },
    {
      value: `${products.length}+`,
      label: 'VERIFIED PRODUCTS',
      detail: 'Commercial cooking appliances & precision SS hardware',
    },
    {
      value: 'AISI 304',
      label: 'METALLURGICAL GRADE',
      detail: 'Certified austenitic prime food-grade stainless steel',
    },
    {
      value: 'PAN-INDIA',
      label: 'SUPPLY & FREIGHT',
      detail: 'Direct factory logistics across India & export partners',
    },
  ];

  return (
    <section
      id="trust-stats-section"
      className={`py-24 border-t transition-colors ${
        isLight ? 'bg-slate-950 text-white border-slate-900' : 'bg-[#07080b] text-white border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-amber-400 mb-3 px-3 py-1 rounded-xs bg-amber-500/10 border border-amber-500/20">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>QUALITY & RELIABILITY BENCHMARK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight">
            BUILT ON FACTUAL REPUTATION.
          </h2>

          <p className="mt-4 text-xs sm:text-sm text-zinc-400 leading-relaxed font-normal">
            Direct manufacturing transparency, verified material certifications, and quarter-century engineering heritage backing professional kitchens across the country.
          </p>
        </div>

        {/* Factual Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xs border border-white/10 bg-white/[0.02] flex flex-col justify-between"
            >
              <div>
                <span className="text-4xl sm:text-5xl font-black font-tech tracking-tight text-white mb-2 block">
                  {stat.value}
                </span>
                <span className="text-xs font-tech font-bold uppercase tracking-[0.18em] text-amber-400 block mb-2">
                  {stat.label}
                </span>
              </div>
              <p className="text-xs text-zinc-400 font-normal leading-relaxed">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="pt-10 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-tech">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xs bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400 shrink-0">
              <CheckCircle2 className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold uppercase tracking-wider text-white block">100% Non-Magnetic Alloy</span>
              <span className="text-zinc-400 text-[11px]">Strict acid and brine corrosion resistance</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xs bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 shrink-0">
              <Factory className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold uppercase tracking-wider text-white block">In-House Stamping Tooling</span>
              <span className="text-zinc-400 text-[11px]">Seamless corners drawn without joint welds</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xs bg-white/5 border border-white/10 flex items-center justify-center text-blue-400 shrink-0">
              <Truck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold uppercase tracking-wider text-white block">Verified Freight Packaging</span>
              <span className="text-zinc-400 text-[11px]">Protective film, foam guards and heavy strapping</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
