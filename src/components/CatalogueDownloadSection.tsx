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
  const { brand, products, setActivePage, setCatalogueModalOpen, openQuoteModal } =
    useContent();

  const waSalesUrl = `https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Shree%20Durga%20Steels,%20I%20would%20like%20to%20speak%20with%20your%20commercial%20kitchen%20sales%20team%20regarding%20bulk%20equipment.`;

  return (
    <section
      id="catalogue-section"
      className="py-24 sm:py-28 border-t bg-[#E9D9C8]/50 border-[#D8BFA8] transition-colors"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-[#5B1018] mb-4 px-3 py-1 rounded-xs bg-[#5B1018]/10 border border-[#5B1018]/25">
            <FileDown className="w-3.5 h-3.5" />
            <span>SPECIFICATIONS & B2B LITERATURE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight uppercase leading-[1.08] mb-6 text-[#292321]">
            EXPLORE THE
            <br />
            <span className="text-[#5B1018]">FULL RANGE.</span>
          </h2>

          <p className="text-base sm:text-lg leading-relaxed font-normal text-[#4D423E]">
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
            className="p-8 rounded-xs border bg-[#FAF4EE] border-[#D8BFA8] hover:border-[#5B1018] hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xs bg-[#F3E7DA] border border-[#D8BFA8] flex items-center justify-center text-[#292321] mb-6 group-hover:bg-[#5B1018] group-hover:text-[#F3E7DA] group-hover:border-[#5B1018] transition-colors">
                <Grid className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight mb-2 text-[#292321]">
                View Online Catalogue
              </h3>
              <p className="text-xs leading-relaxed font-normal text-[#4D423E]">
                Browse all {products.length} commercial kitchen appliances and in-house stainless steel tray variants with instant technical filters.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#D8BFA8]/70 flex items-center justify-between text-xs font-tech font-bold uppercase tracking-wider text-[#5B1018]">
              <span>EXPLORE NOW</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Option 2: Download PDF Catalogue */}
          <div
            onClick={() => setCatalogueModalOpen(true)}
            className="p-8 rounded-xs border bg-[#FAF4EE] border-[#D8BFA8] hover:border-[#5B1018] hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xs bg-[#F3E7DA] border border-[#D8BFA8] flex items-center justify-center text-[#292321] mb-6 group-hover:bg-[#5B1018] group-hover:text-[#F3E7DA] group-hover:border-[#5B1018] transition-colors">
                <FileDown className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight mb-2 text-[#292321]">
                Download PDF Catalogue
              </h3>
              <p className="text-xs leading-relaxed font-normal text-[#4D423E]">
                Receive the complete engineering catalogue including dimensional drawings, electrical ratings, and packing specifications.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#D8BFA8]/70 flex items-center justify-between text-xs font-tech font-bold uppercase tracking-wider text-[#5B1018]">
              <span>GET PDF BROCHURE</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Option 3: Request Custom Product */}
          <div
            onClick={() => openQuoteModal('Custom Stainless Steel Product Fabrication', 'Custom SS')}
            className="p-8 rounded-xs border bg-[#FAF4EE] border-[#D8BFA8] hover:border-[#5B1018] hover:shadow-lg transition-all duration-300 cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="w-12 h-12 rounded-xs bg-[#F3E7DA] border border-[#D8BFA8] flex items-center justify-center text-[#292321] mb-6 group-hover:bg-[#5B1018] group-hover:text-[#F3E7DA] group-hover:border-[#5B1018] transition-colors">
                <Wrench className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight mb-2 text-[#292321]">
                Request Custom Product
              </h3>
              <p className="text-xs leading-relaxed font-normal text-[#4D423E]">
                Submit CAD drawings or custom dimensional requests for specialized tray depths, masala consoles, and bespoke stainless hardware.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#D8BFA8]/70 flex items-center justify-between text-xs font-tech font-bold uppercase tracking-wider text-[#5B1018]">
              <span>SUBMIT DRAWING</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>

          {/* Option 4: Speak with Sales */}
          <a
            href={waSalesUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="p-8 rounded-xs border bg-[#5B1018] border-[#5B1018] hover:bg-[#440B11] hover:shadow-lg transition-all duration-300 flex flex-col justify-between group text-[#F3E7DA]"
          >
            <div>
              <div className="w-12 h-12 rounded-xs bg-[#F3E7DA]/15 border border-[#D8BFA8]/40 flex items-center justify-center text-[#F3E7DA] mb-6 group-hover:bg-[#F3E7DA] group-hover:text-[#5B1018] transition-colors">
                <MessageSquare className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold uppercase tracking-tight mb-2 text-[#F3E7DA]">
                Speak with Sales
              </h3>
              <p className="text-xs leading-relaxed font-normal text-[#D8BFA8]">
                Instant WhatsApp and telephone consultation with our technical sales managers for commercial kitchen projects and dealer pricing.
              </p>
            </div>

            <div className="pt-6 mt-6 border-t border-[#D8BFA8]/25 flex items-center justify-between text-xs font-tech font-bold uppercase tracking-wider text-[#F3E7DA]">
              <span>CONNECT ON WHATSAPP</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
