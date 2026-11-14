import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { X, Download, FileText, Check, Phone, MessageSquare, Printer, ArrowLeft } from 'lucide-react';

export const CatalogueDownloadModal: React.FC = () => {
  const { brand, categories, catalogueModalOpen, setCatalogueModalOpen } = useContent();
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  if (!catalogueModalOpen) return null;

  const handleSimulatedDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      setTimeout(() => {
        window.print();
      }, 500);
    }, 1000);
  };

  return (
    <div
      id="catalogue-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#292321]/75 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        id="catalogue-modal"
        className="rounded-sm max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border bg-[#FAF4EE] border-[#D8BFA8] text-[#292321] transition-colors"
      >
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#D8BFA8]">
          <button
            type="button"
            onClick={() => {
              setCatalogueModalOpen(false);
              setDownloadSuccess(false);
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-tech font-bold uppercase tracking-wider transition-colors bg-[#F3E7DA] border border-[#D8BFA8] hover:bg-[#5B1018] hover:text-[#F3E7DA] hover:border-[#5B1018] text-[#292321]"
            title="Go back / Close"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK</span>
          </button>
          <button
            onClick={() => {
              setCatalogueModalOpen(false);
              setDownloadSuccess(false);
            }}
            className="p-1 transition-colors text-[#4D423E] hover:text-[#5B1018]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <div className="text-[10px] font-tech uppercase tracking-[0.25em] mb-1 font-semibold text-[#5B1018]">
            B2B TECHNICAL DOCUMENTATION
          </div>
          <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#292321]">
            {brand.brandName} MASTER EQUIPMENT CATALOGUE
          </h3>
          <p className="text-xs mt-1 font-normal text-[#4D423E]">
            Complete engineering specifications, dimensions, wiring requirements, and warranty terms.
          </p>
        </div>

        {downloadSuccess ? (
          <div className="p-6 rounded-sm text-center border bg-[#F3E7DA] border-[#D8BFA8] text-[#292321]">
            <div className="w-12 h-12 bg-[#5B1018]/10 border border-[#5B1018]/25 rounded-full flex items-center justify-center mx-auto mb-3 text-[#5B1018]">
              <Check className="w-6 h-6" />
            </div>
            <h4 className="text-sm font-bold uppercase tracking-wider mb-1 text-[#292321]">
              Catalogue Ready
            </h4>
            <p className="text-xs mb-6 text-[#4D423E]">
              A printable specification document has been generated. Our team has also logged your request.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.print()}
                className="px-6 py-2.5 font-bold text-xs font-tech tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 shadow-sm bg-[#5B1018] text-[#F3E7DA] hover:bg-[#440B11]"
              >
                <Printer className="w-4 h-4" />
                <span>PRINT / SAVE AS PDF</span>
              </button>
              <button
                onClick={() => {
                  setCatalogueModalOpen(false);
                  setDownloadSuccess(false);
                }}
                className="px-6 py-2.5 text-xs font-tech tracking-wider uppercase rounded-sm bg-[#D8BFA8]/60 text-[#292321] hover:bg-[#D8BFA8]"
              >
                CLOSE
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Catalogue Features Box */}
            <div className="p-4 rounded-sm mb-6 space-y-2.5 border bg-[#F3E7DA] border-[#D8BFA8] text-[#4D423E]">
              <div className="text-xs font-bold uppercase tracking-wider mb-2 text-[#292321]">
                Included in this edition:
              </div>
              <div className="grid grid-cols-2 gap-2 text-[11px] font-tech text-[#4D423E]">
                {categories.map((c) => (
                  <div key={c.id} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#5B1018]" />
                    <span>{c.name}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B1018]" />
                  <span>Wiring & Phase Diagrams</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5B1018]" />
                  <span>NSF & CE Compliance</span>
                </div>
              </div>
            </div>

            {/* Quick Request Form */}
            <form onSubmit={handleSimulatedDownload} className="space-y-4">
              <div>
                <label className="block text-xs uppercase font-tech mb-1 tracking-wider text-[#292321] font-semibold">
                  Work Email (to receive direct PDF updates)
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="procurement@hotelgroup.com"
                  className="w-full px-4 py-3 rounded-sm text-xs focus:outline-none transition-colors border bg-white border-[#D8BFA8] text-[#292321] placeholder-[#B8B8B3] focus:border-[#5B1018]"
                />
              </div>

              <button
                type="submit"
                disabled={downloading}
                className="w-full py-3.5 font-bold text-xs tracking-[0.18em] uppercase rounded-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm bg-[#5B1018] text-[#F3E7DA] hover:bg-[#440B11]"
              >
                {downloading ? (
                  <span>GENERATING SPEC SHEET...</span>
                ) : (
                  <>
                    <Download className="w-4 h-4 text-[#F3E7DA]" />
                    <span>DOWNLOAD CATALOGUE (PDF)</span>
                  </>
                )}
              </button>
            </form>

            <div className="mt-4 pt-4 border-t border-[#D8BFA8] flex items-center justify-between text-[11px] text-[#4D423E]">
              <span>Prefer WhatsApp delivery?</span>
              <a
                href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello ${brand.brandName}, please share your latest commercial equipment catalogue PDF to my phone.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className="hover:underline flex items-center gap-1 font-semibold text-[#5B1018]"
              >
                <MessageSquare className="w-3.5 h-3.5 text-[#5B1018]" />
                <span>REQUEST VIA WHATSAPP</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
