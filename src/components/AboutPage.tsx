import React from 'react';
import { useContent } from '../context/ContentContext';
import { defaultQualityPillars } from '../data/defaultData';
import { CheckCircle2, ShieldCheck, Award, Factory, ArrowRight } from 'lucide-react';
import { TopPageBackButton } from './TopPageBackButton';

export const AboutPage: React.FC = () => {
  const { brand, aboutContent, setActivePage, openQuoteModal, themeMode } = useContent();
  const isLight = themeMode === 'light';

  return (
    <div
      id="about-us-page"
      className={`py-16 min-h-screen transition-colors ${
        isLight ? 'bg-white text-slate-700' : 'bg-[#0a0c0f] text-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TopPageBackButton currentPageTitle="About Shree Durga Steels" />

        {/* About Hero */}
        <div className={`mb-20 pb-12 border-b ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
          <div
            className={`text-[11px] font-tech uppercase tracking-[0.25em] mb-2 ${
              isLight ? 'text-slate-500 font-semibold' : 'text-zinc-400'
            }`}
          >
            HERITAGE & CRAFTSMANSHIP • EST. {brand.established}
          </div>
          <h1
            className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-tight max-w-4xl ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            ENGINEERING EQUIPMENT FOR PROFESSIONAL KITCHENS.
          </h1>
          <p
            className={`text-sm sm:text-lg mt-4 max-w-2xl leading-relaxed font-normal ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            Headquartered in {brand.location}, {brand.companyName} designs and fabricates heavy-duty food-service machinery that powers commercial kitchens worldwide.
          </p>
        </div>

        {/* Story & Approach Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-24 items-start">
          <div className="lg:col-span-6 space-y-12">
            <div>
              <span
                className={`text-[11px] font-tech uppercase tracking-[0.2em] block mb-2 ${
                  isLight ? 'text-slate-500 font-semibold' : 'text-zinc-400'
                }`}
              >
                SECTION 01 // HERITAGE
              </span>
              <h2
                className={`text-xl sm:text-2xl font-bold uppercase tracking-tight mb-4 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {aboutContent.storyTitle}
              </h2>
              <p
                className={`text-sm leading-relaxed font-normal ${
                  isLight ? 'text-slate-600' : 'text-zinc-300'
                }`}
              >
                {aboutContent.storyText}
              </p>
            </div>

            <div>
              <span
                className={`text-[11px] font-tech uppercase tracking-[0.2em] block mb-2 ${
                  isLight ? 'text-slate-500 font-semibold' : 'text-zinc-400'
                }`}
              >
                SECTION 02 // METHODOLOGY
              </span>
              <h2
                className={`text-xl sm:text-2xl font-bold uppercase tracking-tight mb-4 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {aboutContent.approachTitle}
              </h2>
              <p
                className={`text-sm leading-relaxed font-normal ${
                  isLight ? 'text-slate-600' : 'text-zinc-300'
                }`}
              >
                {aboutContent.approachText}
              </p>
            </div>

            <div>
              <span
                className={`text-[11px] font-tech uppercase tracking-[0.2em] block mb-2 ${
                  isLight ? 'text-slate-500 font-semibold' : 'text-zinc-400'
                }`}
              >
                SECTION 03 // PORTFOLIO FOCUS
              </span>
              <h2
                className={`text-xl sm:text-2xl font-bold uppercase tracking-tight mb-4 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {aboutContent.productsTitle}
              </h2>
              <p
                className={`text-sm leading-relaxed font-normal ${
                  isLight ? 'text-slate-600' : 'text-zinc-300'
                }`}
              >
                {aboutContent.productsText}
              </p>
            </div>
          </div>

          <div className="lg:col-span-6 space-y-8">
            <div
              className={`p-8 rounded-sm border shadow-sm ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900/50 border-white/10'
              }`}
            >
              <span
                className={`text-[11px] font-tech uppercase tracking-[0.2em] block mb-2 ${
                  isLight ? 'text-slate-500 font-semibold' : 'text-zinc-400'
                }`}
              >
                SECTION 04 // OUR CLIENT BASE
              </span>
              <h3
                className={`text-lg font-bold uppercase tracking-tight mb-3 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {aboutContent.customersTitle}
              </h3>
              <p
                className={`text-xs sm:text-sm leading-relaxed font-normal mb-6 ${
                  isLight ? 'text-slate-600' : 'text-zinc-300'
                }`}
              >
                {aboutContent.customersText}
              </p>

              <div
                className={`grid grid-cols-2 gap-3 pt-4 border-t font-tech text-xs ${
                  isLight ? 'border-slate-200 text-slate-600' : 'border-white/10 text-zinc-400'
                }`}
              >
                <div>• 5-Star Hotel Chains</div>
                <div>• QSR Food Franchises</div>
                <div>• Commercial Caterers</div>
                <div>• Dark Kitchen Hubs</div>
              </div>
            </div>

            <div
              className={`p-8 rounded-sm border shadow-sm ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900/50 border-white/10'
              }`}
            >
              <span
                className={`text-[11px] font-tech uppercase tracking-[0.2em] block mb-2 ${
                  isLight ? 'text-slate-500 font-semibold' : 'text-zinc-400'
                }`}
              >
                SECTION 05 // FACTORY ASSURANCE
              </span>
              <h3
                className={`text-lg font-bold uppercase tracking-tight mb-3 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                {aboutContent.commitmentTitle}
              </h3>
              <p
                className={`text-xs sm:text-sm leading-relaxed font-normal mb-6 ${
                  isLight ? 'text-slate-600' : 'text-zinc-300'
                }`}
              >
                {aboutContent.commitmentText}
              </p>

              <button
                onClick={() => openQuoteModal('Factory Visit / B2B Discussion', 'ABOUT-ENQUIRY')}
                className={`w-full py-3 font-bold text-xs tracking-[0.18em] uppercase rounded-sm transition-colors flex items-center justify-center gap-2 ${
                  isLight
                    ? 'bg-slate-950 text-white hover:bg-slate-800'
                    : 'bg-white text-zinc-950 hover:bg-zinc-200'
                }`}
              >
                <span>CONSULT WITH OUR ENGINEERS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* QUALITY SECTION */}
        <div className={`py-16 border-t ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
          <div className="max-w-3xl mb-16">
            <span
              className={`text-[11px] font-tech uppercase tracking-[0.25em] block mb-2 ${
                isLight ? 'text-slate-500 font-semibold' : 'text-zinc-400'
              }`}
            >
              MANUFACTURING EXCELLENCE
            </span>
            <h2
              className={`text-3xl sm:text-4xl font-extrabold uppercase tracking-tight ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              QUALITY IS BUILT INTO EVERY DETAIL.
            </h2>
            <p
              className={`text-sm sm:text-base mt-3 leading-relaxed font-normal ${
                isLight ? 'text-slate-600' : 'text-zinc-400'
              }`}
            >
              Commercial kitchens are high-stress environments. Here is how our metallurgy, component selection, and quality control systems protect your investment.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {defaultQualityPillars.map((q) => (
              <div
                key={q.id}
                className={`p-8 rounded-sm transition-all border shadow-sm ${
                  isLight
                    ? 'bg-slate-50 border-slate-200 hover:border-slate-400'
                    : 'bg-zinc-900/40 border-white/10 hover:border-white/20'
                }`}
              >
                <div
                  className={`text-[10px] font-tech uppercase tracking-[0.2em] mb-1 ${
                    isLight ? 'text-slate-500' : 'text-zinc-400'
                  }`}
                >
                  {q.subtitle}
                </div>
                <h3
                  className={`text-base font-bold uppercase tracking-tight mb-3 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {q.title}
                </h3>
                <p
                  className={`text-xs leading-relaxed font-normal mb-6 ${
                    isLight ? 'text-slate-600' : 'text-zinc-300'
                  }`}
                >
                  {q.description}
                </p>

                <div className={`space-y-2 pt-4 border-t ${isLight ? 'border-slate-200' : 'border-white/5'}`}>
                  {q.points.map((pt, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-2.5 text-xs ${
                        isLight ? 'text-slate-600' : 'text-zinc-400'
                      }`}
                    >
                      <CheckCircle2
                        className={`w-4 h-4 shrink-0 mt-0.5 ${
                          isLight ? 'text-emerald-600' : 'text-zinc-300'
                        }`}
                      />
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
