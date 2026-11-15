import React from 'react';
import { useContent } from '../context/ContentContext';
import { Building2, UtensilsCrossed, Store, ChefHat, Briefcase, Truck, ArrowRight } from 'lucide-react';

export const B2BProjectSection: React.FC = () => {
  const { openQuoteModal, setActivePage, themeMode } = useContent();
  const isLight = themeMode === 'light';

  const projectTypes = [
    { title: 'Restaurant Projects', icon: UtensilsCrossed, desc: 'Complete hot line equipment & exhaust integration' },
    { title: 'Hotel & Banqueting', icon: Building2, desc: 'High-volume batch cooking suites & room service gear' },
    { title: 'Café & Bakery Chains', icon: Store, desc: 'Modular compact electric panini & stone pizza stations' },
    { title: 'Cloud Kitchen Hubs', icon: ChefHat, desc: 'High-density induction & frying lines optimized for delivery' },
    { title: 'Institutional Facilities', icon: Briefcase, desc: 'Hospitals, universities & corporate cafeteria production' },
    { title: 'Dealer & Channel Bulk', icon: Truck, desc: 'OEM manufacturing, container dispatch & distributor margins' },
  ];

  return (
    <section
      id="b2b-projects-section"
      className={`py-24 border-t relative transition-colors ${
        isLight ? 'bg-slate-50 border-slate-200' : 'bg-[#0d0f14] border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`border rounded-sm p-8 sm:p-12 lg:p-16 transition-colors shadow-sm ${
            isLight
              ? 'bg-white border-slate-200'
              : 'bg-gradient-to-br from-zinc-900/80 to-zinc-950 border-white/10'
          }`}
        >
          <div className="max-w-3xl mb-12">
            <span
              className={`text-[11px] font-tech uppercase tracking-[0.25em] block mb-2 ${
                isLight ? 'text-slate-500 font-semibold' : 'text-zinc-400'
              }`}
            >
              TURNKEY SUPPLY & BULK PROCUREMENT
            </span>
            <h2
              className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase leading-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              EQUIPPING YOUR NEXT KITCHEN?
            </h2>
            <p
              className={`mt-4 text-sm sm:text-base leading-relaxed font-normal ${
                isLight ? 'text-slate-600' : 'text-zinc-300'
              }`}
            >
              From individual equipment requirements to complete commercial kitchen projects, speak with our engineering and procurement team about your equipment specifications, custom layout footprints, and wholesale container deliveries.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`px-8 py-3.5 font-bold text-xs tracking-[0.18em] uppercase rounded-sm transition-colors flex items-center justify-center gap-2 ${
                  isLight
                    ? 'bg-slate-950 text-white hover:bg-slate-800'
                    : 'bg-white text-zinc-950 hover:bg-zinc-200'
                }`}
              >
                <span>DISCUSS YOUR PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => openQuoteModal('Turnkey Kitchen Project Requirement', 'B2B-PROJECT')}
                className={`px-8 py-3.5 border font-semibold text-xs tracking-[0.18em] uppercase rounded-sm transition-colors flex items-center justify-center ${
                  isLight
                    ? 'border-slate-300 text-slate-800 hover:bg-slate-100 hover:border-slate-400'
                    : 'border-white/30 text-white hover:bg-white/10'
                }`}
              >
                REQUEST A QUOTE
              </button>
            </div>
          </div>

          {/* Project Capabilities Grid */}
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-10 border-t ${
              isLight ? 'border-slate-200' : 'border-white/10'
            }`}
          >
            {projectTypes.map((pt) => {
              const Icon = pt.icon;
              return (
                <div
                  key={pt.title}
                  className={`p-5 rounded-sm flex items-start gap-4 transition-colors border ${
                    isLight
                      ? 'bg-slate-50 border-slate-200 hover:border-slate-400'
                      : 'bg-black/40 border-white/5 hover:border-white/15'
                  }`}
                >
                  <div
                    className={`p-2 rounded shrink-0 mt-0.5 border ${
                      isLight
                        ? 'bg-white border-slate-200 text-slate-800 shadow-sm'
                        : 'bg-white/5 border-white/10 text-zinc-300'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3
                      className={`text-xs font-bold uppercase tracking-wider mb-1 ${
                        isLight ? 'text-slate-900' : 'text-white'
                      }`}
                    >
                      {pt.title}
                    </h3>
                    <p
                      className={`text-[11px] leading-normal ${
                        isLight ? 'text-slate-500' : 'text-zinc-400'
                      }`}
                    >
                      {pt.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
