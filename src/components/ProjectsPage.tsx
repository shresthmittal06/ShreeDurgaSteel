import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { TopPageBackButton } from './TopPageBackButton';
import {
  ChefHat,
  ArrowUpRight,
  CheckCircle2,
} from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  const { openQuoteModal } = useContent();

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const applicationProjects = [
    {
      id: 'proj-1',
      title: 'Luxury Sweet Confectionery Counter & Syrup Immersion Setup',
      type: 'Sweet Mart & Traditional Confectionery',
      category: 'confectionery',
      image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=1200&q=80',
      description:
        'Continuous refrigerated display and syrup immersion counters engineered for traditional sweet houses. Integrated jointless Barfi display trays (depths 0.4" to 1.6") and deep Rasgulla syrup storage containers.',
      equipmentSupplied: [
        'Stainless Steel Barfi Trays (All 9 Factory Depths)',
        'Deep Rasgulla Syrup Retention Trays',
        'Commercial 9-Cup & 6-Cup Masala Consoles',
        'Heavy Stainless Jhavas & Skimmers',
      ],
      standards: 'Sanitary TIG finish • Zero fluid leakage • Austenitic AISI 304',
    },
    {
      id: 'proj-2',
      title: 'High-Volume QSR Burger & Continental Live Cooking Line',
      type: 'QSR & Fast Casual Line',
      category: 'cooking',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1200&q=80',
      description:
        'Heavy-duty commercial cooking line designed for continuous rush hour ticket times. Features sub-second thermal recovery electric fryers, cast iron double contact grills, and heavy plate griddles.',
      equipmentSupplied: [
        'Commercial Double Tank Electric Fryers (2x 6L)',
        'Heavy-Duty Double Contact Grill (Grooved Cast Iron)',
        '8mm Solid Steel Flat Griddle with Splash Guard',
        'Full Depth Gastronorm Pan Prep Tables',
      ],
      standards: 'Dual safety thermostat cut-off • Rapid oil recovery • Incoloy heating',
    },
    {
      id: 'proj-3',
      title: 'Artisan Bakery & High-Output Steaming Station',
      type: 'Commercial Bakery & Steaming Unit',
      category: 'baking',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1200&q=80',
      description:
        'Deck baking and continuous high-pressure steaming installation for multi-outlet bakery and snack central kitchens. Includes refractory stone pizza deck ovens and heavy-gauge Dhokla steaming trays.',
      equipmentSupplied: [
        'Refractory Stone Pizza Deck Ovens (350°C rating)',
        'Heavy Stainless Dhokla Steaming Trays (With Handles)',
        'Standard Bakery Sheet Pans & Cooling Racks',
        'Commercial Multi-Tier Steamer Systems',
      ],
      standards: 'Precision heat balance • Heavy sheet gauge • Non-warping under steam',
    },
    {
      id: 'proj-4',
      title: 'Hotel Banquet Buffet Holding & Gastronorm Storage Matrix',
      type: '5-Star Hotel Banquets & Buffets',
      category: 'hotel',
      image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&w=1200&q=80',
      description:
        'Standardized Gastronorm pan deployment across hot buffet wells, refrigerated salad counters, and banquet transit trolleys, complemented by luxury PVD titanium golden display platters.',
      equipmentSupplied: [
        '1/1, 1/2, 1/3, 1/6 Gastronorm (GN) Pans (65mm, 100mm, 150mm)',
        'PVD Titanium Golden Luxury Display Platters',
        'Stainless Wire Glass Racks (6 to 24 Khana)',
        'Perforated Steam Trays & Drain Shelves',
      ],
      standards: 'Universal Gastronorm EN 631 • Anti-jamming rims • Food-grade metallurgy',
    },
  ];

  const filteredProjects = applicationProjects.filter(
    (p) => activeCategory === 'all' || p.category === activeCategory
  );

  return (
    <div className="pt-28 pb-24 transition-colors min-h-screen bg-[#F3E7DA] text-[#292321]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TopPageBackButton currentPageTitle="Turnkey Projects & Applications" />

        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-[#5B1018] mb-4 px-3 py-1 rounded-xs bg-[#5B1018]/10 border border-[#5B1018]/25">
            <ChefHat className="w-3.5 h-3.5" />
            <span>COMMERCIAL DEPLOYMENTS & APPLICATION SHOWCASE</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase leading-[1.05] mb-6 text-[#292321]">
            COMMERCIAL KITCHEN
            <br />
            <span className="text-[#5B1018]">
              PROJECTS & APPLICATIONS.
            </span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed font-normal text-[#4D423E]">
            Explore how our commercial cooking lines and in-house manufactured stainless steel hardware integrate into demanding commercial foodservice facilities, hotel banquets, and high-volume confectioneries.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-[#D8BFA8]">
          {[
            { id: 'all', label: 'ALL APPLICATIONS' },
            { id: 'confectionery', label: 'SWEET & CONFECTIONERY' },
            { id: 'cooking', label: 'COMMERCIAL COOKING LINES' },
            { id: 'baking', label: 'BAKERY & STEAMING' },
            { id: 'hotel', label: 'HOTEL BANQUETS & BUFFETS' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-4 py-2 text-xs font-tech font-bold uppercase tracking-wider rounded-xs transition-colors ${
                activeCategory === cat.id
                  ? 'bg-[#5B1018] text-[#F3E7DA]'
                  : 'bg-[#FAF4EE] text-[#4D423E] hover:bg-[#E9D9C8] border border-[#D8BFA8]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {filteredProjects.map((p) => (
            <div
              key={p.id}
              className="rounded-xs border overflow-hidden flex flex-col justify-between transition-all duration-300 group bg-[#FAF4EE] border-[#D8BFA8] hover:border-[#5B1018] hover:shadow-xl"
            >
              {/* Image */}
              <div className="relative h-72 sm:h-80 overflow-hidden">
                <img
                  src={p.image}
                  alt={p.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#292321] via-[#292321]/40 to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[10px] font-tech font-bold uppercase tracking-widest px-3 py-1 bg-[#292321]/90 text-[#F3E7DA] rounded-xs border border-[#D8BFA8]/30">
                    {p.type}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 text-[#F3E7DA]">
                  <h3 className="text-xl font-black uppercase tracking-tight">
                    {p.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-8 flex flex-col justify-between flex-grow">
                <div>
                  <p className="text-xs sm:text-sm leading-relaxed mb-6 font-normal text-[#4D423E]">
                    {p.description}
                  </p>

                  <div className="mb-6">
                    <span className="text-[10px] font-tech font-bold uppercase tracking-[0.2em] block mb-2.5 text-[#5A4F4B]">
                      TYPICAL EQUIPMENT CONFIGURATION
                    </span>
                    <div className="space-y-2">
                      {p.equipmentSupplied.map((eq, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs font-tech">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#5B1018] shrink-0" />
                          <span className="text-[#292321]">{eq}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-[#D8BFA8]/60 flex flex-wrap items-center justify-between gap-4">
                  <span className="text-[11px] font-tech text-[#5A4F4B]">
                    {p.standards}
                  </span>

                  <button
                    onClick={() => openQuoteModal(`Project Setup: ${p.title}`, p.type)}
                    className="inline-flex items-center gap-1.5 text-xs font-tech font-bold uppercase tracking-wider text-[#292321] hover:text-[#5B1018] transition-colors"
                  >
                    <span>REQUEST THIS SETUP</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Global Turnkey Consultation Banner */}
        <div className="p-10 sm:p-14 rounded-xs border text-center flex flex-col items-center justify-center bg-[#292321] text-[#F3E7DA] border-[#D8BFA8]/30 shadow-xl">
          <span className="text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-[#D8BFA8] mb-3">
            TURNKEY COMMERCIAL CONSULTATION
          </span>
          <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight max-w-2xl mb-4">
            Planning a New Commercial Kitchen or Central Production Unit?
          </h2>
          <p className="text-sm sm:text-base text-[#D8BFA8] max-w-xl mb-8 leading-relaxed font-normal">
            Speak directly with our commercial kitchen consultants. We assist in equipment capacity calculations, electrical load planning, and custom stainless steel layout fabrication.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => openQuoteModal('Turnkey Kitchen Project Consultation', 'Commercial Projects')}
              className="px-8 py-4 font-tech text-xs font-bold uppercase tracking-[0.18em] rounded-xs bg-[#5B1018] text-[#F3E7DA] hover:bg-[#440B11] transition-colors shadow-lg border border-[#D8BFA8]/30"
            >
              BOOK PROJECT CONSULTATION
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
