import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { X, Download, FileText, Check, Phone, MessageSquare, Printer, ArrowLeft } from 'lucide-react';

export const CatalogueDownloadModal: React.FC = () => {
  const { brand, categories, catalogueModalOpen, setCatalogueModalOpen, themeMode } = useContent();
  const [downloading, setDownloading] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);
  const [emailInput, setEmailInput] = useState('');

  const isLight = themeMode === 'light';

  if (!catalogueModalOpen) return null;

  const handleSimulatedDownload = (e: React.FormEvent) => {
    e.preventDefault();
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      setDownloadSuccess(true);
      // Trigger browser print or download action
      setTimeout(() => {
        window.print();
      }, 500);
    }, 1000);
  };

  return (
    <div
      id="catalogue-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
    >
      <div
        id="catalogue-modal"
        className={`rounded-sm max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto border transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-[#0e1116] border-white/15 text-zinc-200'
        }`}
      >
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-white/10">
          <button
            type="button"
            onClick={() => {
              setCatalogueModalOpen(false);
              setDownloadSuccess(false);
            }}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-tech font-bold uppercase tracking-wider transition-colors bg-slate-100 dark:bg-zinc-800 hover:bg-amber-500 hover:text-black text-slate-700 dark:text-zinc-200"
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
            className={`p-1 transition-colors ${
              isLight ? 'text-slate-400 hover:text-slate-900' : 'text-zinc-400 hover:text-white'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <div
            className={`text-[10px] font-tech uppercase tracking-[0.25em] mb-1 font-semibold ${
              isLight ? 'text-amber-700' : 'text-zinc-400'
            }`}
          >
            B2B TECHNICAL DOCUMENTATION
          </div>
          <h3
            className={`text-xl sm:text-2xl font-extrabold uppercase tracking-tight ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
          >
            {brand.brandName} MASTER EQUIPMENT CATALOGUE
          </h3>
          <p className={`text-xs mt-1 font-normal ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            Complete engineering specifications, dimensions, wiring requirements, and warranty terms.
          </p>
        </div>

        {downloadSuccess ? (
          <div
            className={`p-6 rounded-sm text-center border ${
              isLight
                ? 'bg-slate-50 border-emerald-500/30 text-slate-800'
                : 'bg-zinc-900 border-emerald-500/30 text-zinc-200'
            }`}
          >
            <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center mx-auto mb-3 text-emerald-600 dark:text-emerald-400">
              <Check className="w-6 h-6" />
            </div>
            <h4
              className={`text-sm font-bold uppercase tracking-wider mb-1 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Catalogue Ready
            </h4>
            <p className={`text-xs mb-6 ${isLight ? 'text-slate-600' : 'text-zinc-300'}`}>
              A printable specification document has been generated. Our team has also logged your request.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={() => window.print()}
                className={`px-6 py-2.5 font-bold text-xs font-tech tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 shadow-sm ${
                  isLight
                    ? 'bg-slate-950 text-white hover:bg-slate-800'
                    : 'bg-white text-zinc-950 hover:bg-zinc-200'
                }`}
              >
                <Printer className="w-4 h-4" />
                <span>PRINT / SAVE AS PDF</span>
              </button>
              <button
                onClick={() => {
                  setCatalogueModalOpen(false);
                  setDownloadSuccess(false);
                }}
                className={`px-6 py-2.5 text-xs font-tech tracking-wider uppercase rounded-sm ${
                  isLight
                    ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                    : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                }`}
              >
                CLOSE
              </button>
            </div>
          </div>
        ) : (
          <div>
            {/* Catalogue Features Box */}
            <div
              className={`p-4 rounded-sm mb-6 space-y-2.5 border ${
                isLight
                  ? 'bg-slate-50 border-slate-200 text-slate-700'
                  : 'bg-zinc-900/60 border-white/10 text-zinc-400'
              }`}
            >
              <div
                className={`text-xs font-bold uppercase tracking-wider mb-2 ${
                  isLight ? 'text-slate-900' : 'text-zinc-200'
                }`}
              >
                Included in this edition:
              </div>
              <div
                className={`grid grid-cols-2 gap-2 text-[11px] font-tech ${
                  isLight ? 'text-slate-600' : 'text-zinc-400'
                }`}
              >
                {categories.map((c) => (
                  <div key={c.id} className="flex items-center gap-2">
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${
                        isLight ? 'bg-slate-400' : 'bg-zinc-400'
                      }`}
                    />
                    <span>{c.name}</span>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isLight ? 'bg-slate-400' : 'bg-zinc-400'
                    }`}
                  />
                  <span>Wiring & Phase Diagrams</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full ${
                      isLight ? 'bg-slate-400' : 'bg-zinc-400'
                    }`}
                  />
                  <span>NSF & CE Compliance</span>
                </div>
              </div>
            </div>

            {/* Quick Request Form */}
            <form onSubmit={handleSimulatedDownload} className="space-y-4">
              <div>
                <label
                  className={`block text-xs uppercase font-tech mb-1 tracking-wider ${
                    isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'
                  }`}
                >
                  Work Email (to receive direct PDF updates)
                </label>
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="procurement@hotelgroup.com"
                  className={`w-full px-4 py-3 rounded-sm text-xs focus:outline-none transition-colors border ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-600'
                      : 'bg-zinc-900 border-white/15 text-white placeholder-zinc-500 focus:border-white'
                  }`}
                />
              </div>

              <button
                type="submit"
                disabled={downloading}
                className={`w-full py-3.5 font-bold text-xs tracking-[0.18em] uppercase rounded-sm transition-colors flex items-center justify-center gap-2 disabled:opacity-50 shadow-sm ${
                  isLight
                    ? 'bg-slate-950 text-white hover:bg-slate-800'
                    : 'bg-white text-zinc-950 hover:bg-zinc-200'
                }`}
              >
                {downloading ? (
                  <span>GENERATING SPEC SHEET...</span>
                ) : (
                  <>
                    <Download className={`w-4 h-4 ${isLight ? 'text-white' : 'text-zinc-950'}`} />
                    <span>DOWNLOAD CATALOGUE (PDF)</span>
                  </>
                )}
              </button>
            </form>

            <div
              className={`mt-4 pt-4 border-t flex items-center justify-between text-[11px] ${
                isLight ? 'border-slate-200 text-slate-600' : 'border-white/10 text-zinc-400'
              }`}
            >
              <span>Prefer WhatsApp delivery?</span>
              <a
                href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                  `Hello ${brand.brandName}, please share your latest commercial equipment catalogue PDF to my phone.`
                )}`}
                target="_blank"
                rel="noreferrer"
                className={`hover:underline flex items-center gap-1 font-semibold ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                <span>REQUEST VIA WHATSAPP</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
