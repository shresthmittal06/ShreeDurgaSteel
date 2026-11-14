import React from 'react';
import { useContent } from '../context/ContentContext';
import { ShieldCheck, Factory, Truck, CheckCircle2 } from 'lucide-react';

export const TrustStatsSection: React.FC = () => {
  const { products } = useContent();

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
      className="py-24 border-t border-[#D8BFA8]/30 bg-[#5B1018] text-[#F3E7DA]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-[#F3E7DA] mb-3 px-3 py-1 rounded-xs bg-[#292321]/60 border border-[#D8BFA8]/40">
            <ShieldCheck className="w-3.5 h-3.5 text-[#D8BFA8]" />
            <span>QUALITY & RELIABILITY BENCHMARK</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase leading-tight text-[#F3E7DA]">
            BUILT ON FACTUAL REPUTATION.
          </h2>

          <p className="mt-4 text-xs sm:text-sm text-[#D8BFA8] leading-relaxed font-normal">
            Direct manufacturing transparency, verified material certifications, and quarter-century engineering heritage backing professional kitchens across the country.
          </p>
        </div>

        {/* Factual Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-8 rounded-xs border border-[#D8BFA8]/35 bg-[#292321]/35 flex flex-col justify-between"
            >
              <div>
                <span className="text-4xl sm:text-5xl font-black font-tech tracking-tight text-[#F3E7DA] mb-2 block tabular-nums">
                  {stat.value}
                </span>
                <span className="text-xs font-tech font-bold uppercase tracking-[0.18em] text-[#D8BFA8] block mb-2">
                  {stat.label}
                </span>
              </div>
              <p className="text-xs text-[#F3E7DA]/85 font-normal leading-relaxed">
                {stat.detail}
              </p>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="pt-10 border-t border-[#D8BFA8]/25 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-tech">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xs bg-[#292321]/50 border border-[#B8B8B3]/40 flex items-center justify-center text-[#F3E7DA] shrink-0">
              <CheckCircle2 className="w-4 h-4 text-[#B8B8B3]" />
            </div>
            <div>
              <span className="font-bold uppercase tracking-wider text-[#F3E7DA] block">100% Non-Magnetic Alloy</span>
              <span className="text-[#D8BFA8] text-[11px]">Strict acid and brine corrosion resistance</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xs bg-[#292321]/50 border border-[#B8B8B3]/40 flex items-center justify-center text-[#F3E7DA] shrink-0">
              <Factory className="w-4 h-4 text-[#B8B8B3]" />
            </div>
            <div>
              <span className="font-bold uppercase tracking-wider text-[#F3E7DA] block">In-House Stamping Tooling</span>
              <span className="text-[#D8BFA8] text-[11px]">Seamless corners drawn without joint welds</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xs bg-[#292321]/50 border border-[#B8B8B3]/40 flex items-center justify-center text-[#F3E7DA] shrink-0">
              <Truck className="w-4 h-4 text-[#B8B8B3]" />
            </div>
            <div>
              <span className="font-bold uppercase tracking-wider text-[#F3E7DA] block">Verified Freight Packaging</span>
              <span className="text-[#D8BFA8] text-[11px]">Protective film, foam guards and heavy strapping</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
