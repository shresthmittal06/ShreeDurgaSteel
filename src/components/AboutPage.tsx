import React from 'react';
import { useContent } from '../context/ContentContext';
import { defaultQualityPillars } from '../data/defaultData';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { TopPageBackButton } from './TopPageBackButton';

export const AboutPage: React.FC = () => {
  const { brand, aboutContent, openQuoteModal } = useContent();

  return (
    <div
      id="about-us-page"
      className="py-16 min-h-screen transition-colors bg-[#F3E7DA] text-[#292321]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TopPageBackButton currentPageTitle="About Shree Durga Steels" />

        {/* About Hero */}
        <div className="mb-20 pb-12 border-b border-[#D8BFA8]">
          <div className="text-[11px] font-tech uppercase tracking-[0.25em] mb-2 text-[#5B1018] font-semibold">
            HERITAGE & CRAFTSMANSHIP • EST. {brand.established}
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-tight max-w-4xl text-[#292321]">
            ENGINEERING EQUIPMENT FOR PROFESSIONAL KITCHENS.
          </h1>
          <p className="text-sm sm:text-lg mt-4 max-w-2xl leading-relaxed font-normal text-[#4D423E]">
            Headquartered in {brand.location}, {brand.companyName} designs and fabricates heavy-duty food-service machinery that powers commercial kitchens worldwide.
          </p>
        </div>

        {/* Story & Approach Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-start">
          <div className="lg:col-span-6 space-y-12">
            <div>
              <span className="text-[11px] font-tech uppercase tracking-[0.2em] block mb-2 text-[#5B1018] font-semibold">
                SECTION 01 // HERITAGE
              </span>
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight mb-4 text-[#292321]">
                {aboutContent.storyTitle}
              </h2>
              <p className="text-sm leading-relaxed font-normal text-[#4D423E]">
                {aboutContent.storyText}
              </p>
            </div>

            <div>
              <span className="text-[11px] font-tech uppercase tracking-[0.2em] block mb-2 text-[#5B1018] font-semibold">
                SECTION 02 // METHODOLOGY
              </span>
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight mb-4 text-[#292321]">
                {aboutContent.approachTitle}
              </h2>
              <p className="text-sm leading-relaxed font-normal text-[#4D423E]">
                {aboutContent.approachText}
              </p>
            </div>

            <div>
              <span className="text-[11px] font-tech uppercase tracking-[0.2em] block mb-2 text-[#5B1018] font-semibold">
                SECTION 03 // PORTFOLIO FOCUS
              </span>
              <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight mb-4 text-[#292321]">
                {aboutContent.productsTitle}
              </h2>
              <p className="text-sm leading-relaxed font-normal text-[#4D423E]">
                {aboutContent.productsText}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div className="p-8 rounded-sm border shadow-sm bg-[#FAF4EE] border-[#D8BFA8]">
              <span className="text-[11px] font-tech uppercase tracking-[0.2em] block mb-2 text-[#5B1018] font-semibold">
                SECTION 04 // OUR CLIENT BASE
              </span>
              <h3 className="text-lg font-bold uppercase tracking-tight mb-3 text-[#292321]">
                {aboutContent.customersTitle}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed font-normal mb-6 text-[#4D423E]">
                {aboutContent.customersText}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-4 border-t font-tech text-xs border-[#D8BFA8] text-[#4D423E]">
                <div>• 5-Star Hotel Chains</div>
                <div>• QSR Food Franchises</div>
                <div>• Commercial Caterers</div>
                <div>• Dark Kitchen Hubs</div>
              </div>
            </div>

            <div className="p-8 rounded-sm border shadow-sm bg-[#FAF4EE] border-[#D8BFA8]">
              <span className="text-[11px] font-tech uppercase tracking-[0.2em] block mb-2 text-[#5B1018] font-semibold">
                SECTION 05 // FACTORY ASSURANCE
              </span>
              <h3 className="text-lg font-bold uppercase tracking-tight mb-3 text-[#292321]">
                {aboutContent.commitmentTitle}
              </h3>
              <p className="text-xs sm:text-sm leading-relaxed font-normal mb-6 text-[#4D423E]">
                {aboutContent.commitmentText}
              </p>

              <button
                onClick={() => openQuoteModal('Factory Visit / B2B Discussion', 'ABOUT-ENQUIRY')}
                className="w-full py-3 font-bold text-xs tracking-[0.18em] uppercase rounded-sm transition-colors flex items-center justify-center gap-2 bg-[#5B1018] text-[#F3E7DA] hover:bg-[#440B11]"
              >
                <span>CONSULT WITH OUR ENGINEERS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* QUALITY SECTION */}
        <div className="py-16 border-t border-[#D8BFA8]">
          <div className="max-w-3xl mb-16">
            <span className="text-[11px] font-tech uppercase tracking-[0.25em] block mb-2 text-[#5B1018] font-semibold">
              MANUFACTURING EXCELLENCE
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-[#292321]">
              QUALITY IS BUILT INTO EVERY DETAIL.
            </h2>
            <p className="text-sm sm:text-base mt-3 leading-relaxed font-normal text-[#4D423E]">
              Commercial kitchens are high-stress environments. Here is how our metallurgy, component selection, and quality control systems protect your investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {defaultQualityPillars.map((q) => (
              <div
                key={q.id}
                className="p-8 rounded-sm transition-all border shadow-sm bg-[#FAF4EE] border-[#D8BFA8] hover:border-[#5B1018]"
              >
                <div className="text-[10px] font-tech uppercase tracking-[0.2em] mb-1 text-[#5B1018] font-semibold">
                  {q.subtitle}
                </div>
                <h3 className="text-base font-bold uppercase tracking-tight mb-3 text-[#292321]">
                  {q.title}
                </h3>
                <p className="text-xs leading-relaxed font-normal mb-6 text-[#4D423E]">
                  {q.description}
                </p>

                <div className="space-y-2 pt-4 border-t border-[#D8BFA8]">
                  {q.points.map((pt, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 text-xs text-[#4D423E]"
                    >
                      <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-[#5B1018]" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
