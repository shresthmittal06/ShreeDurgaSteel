import React from 'react';
import { useContent } from '../context/ContentContext';
import { Building2, UtensilsCrossed, Store, ChefHat, Briefcase, Truck, ArrowRight } from 'lucide-react';

export const B2BProjectSection: React.FC = () => {
  const { openQuoteModal, setActivePage } = useContent();

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
      className="py-24 border-t relative transition-colors bg-[#F3E7DA] border-[#D8BFA8]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border rounded-sm p-8 sm:p-12 lg:p-16 transition-colors shadow-sm bg-[#FAF4EE] border-[#D8BFA8]">
          <div className="max-w-3xl mb-12">
            <span className="text-[11px] font-tech uppercase tracking-[0.25em] block mb-2 text-[#5B1018] font-semibold">
              TURNKEY SUPPLY & BULK PROCUREMENT
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight uppercase leading-tight text-[#292321]">
              EQUIPPING YOUR NEXT KITCHEN?
            </h2>
            <p className="mt-4 text-sm sm:text-base leading-relaxed font-normal text-[#4D423E]">
              From individual equipment requirements to complete commercial kitchen projects, speak with our engineering and procurement team about your equipment specifications, custom layout footprints, and wholesale container deliveries.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => {
                  setActivePage('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="px-8 py-3.5 font-bold text-xs tracking-[0.18em] uppercase rounded-sm transition-colors flex items-center justify-center gap-2 bg-[#5B1018] text-[#F3E7DA] hover:bg-[#440B11]"
              >
                <span>DISCUSS YOUR PROJECT</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => openQuoteModal('Turnkey Kitchen Project Requirement', 'B2B-PROJECT')}
                className="px-8 py-3.5 border font-semibold text-xs tracking-[0.18em] uppercase rounded-sm transition-colors flex items-center justify-center border-[#D8BFA8] text-[#292321] hover:bg-[#E9D9C8] hover:border-[#5B1018]"
              >
                REQUEST A QUOTE
              </button>
            </div>
          </div>

          {/* Project Capabilities Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-10 border-t border-[#D8BFA8]">
            {projectTypes.map((pt) => {
              const Icon = pt.icon;
              return (
                <div
                  key={pt.title}
                  className="p-5 rounded-sm flex items-start gap-4 transition-colors border bg-[#F3E7DA] border-[#D8BFA8] hover:border-[#5B1018]"
                >
                  <div className="p-2 rounded shrink-0 mt-0.5 border bg-[#FAF4EE] border-[#D8BFA8] text-[#5B1018] shadow-sm">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-xs font-bold uppercase tracking-wider mb-1 text-[#292321]">
                      {pt.title}
                    </h3>
                    <p className="text-[11px] leading-normal text-[#4D423E]">
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
