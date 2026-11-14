import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { X, Send, CheckCircle2, MessageSquare, ArrowLeft } from 'lucide-react';

export const QuoteModal: React.FC = () => {
  const {
    brand,
    quoteModalOpen,
    setQuoteModalOpen,
    quotePrefill,
    themeMode,
  } = useContent();

  const isLight = themeMode === 'light';

  const [formData, setFormData] = useState({
    productName: '',
    model: '',
    name: '',
    company: '',
    phone: '',
    email: '',
    quantity: '1',
    location: '',
    message: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    if (quoteModalOpen) {
      setFormData((prev) => ({
        ...prev,
        productName: quotePrefill.productName || 'General Equipment Inquiry',
        model: quotePrefill.model || 'COMMERCIAL-RANGE',
      }));
      setIsSubmitted(false);
    }
  }, [quoteModalOpen, quotePrefill]);

  if (!quoteModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    const text = `Hello ${brand.brandName},\nI would like to request a commercial quote.\n\nProduct: ${formData.productName}\nModel: ${formData.model}\nQuantity: ${formData.quantity}\nName: ${formData.name}\nCompany: ${formData.company}\nLocation: ${formData.location}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nNote: ${formData.message}`;
    return `https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      id="quote-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        id="quote-modal-card"
        className={`rounded-sm max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto border transition-colors ${
          isLight
            ? 'bg-white border-slate-200 text-slate-800'
            : 'bg-[#0e1115] border-white/20 text-zinc-200'
        }`}
      >
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-100 dark:border-white/10">
          <button
            type="button"
            onClick={() => setQuoteModalOpen(false)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-tech font-bold uppercase tracking-wider transition-colors bg-slate-100 dark:bg-zinc-800 hover:bg-amber-500 hover:text-black text-slate-700 dark:text-zinc-200"
            title="Go back / Close"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK</span>
          </button>
          <button
            onClick={() => setQuoteModalOpen(false)}
            className={`p-1 transition-colors ${
              isLight ? 'text-slate-400 hover:text-slate-900' : 'text-zinc-400 hover:text-white'
            }`}
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <span
            className={`text-[10px] font-tech uppercase tracking-[0.25em] block mb-1 font-semibold ${
              isLight ? 'text-amber-700' : 'text-zinc-400'
            }`}
          >
            B2B QUOTATION & SPECIFICATIONS
          </span>
          <h3
            className={`text-xl sm:text-2xl font-extrabold uppercase tracking-tight ${
              isLight ? 'text-slate-950' : 'text-white'
            }`}
          >
            REQUEST COMMERCIAL PRICING
          </h3>
          <p className={`text-xs mt-1 font-normal ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
            Direct factory quotation for procurement managers, hotel consultants, and restaurant operators.
          </p>
        </div>

        {isSubmitted ? (
          <div
            className={`py-8 text-center p-6 rounded-sm border ${
              isLight
                ? 'bg-slate-50 border-emerald-500/40 text-slate-800'
                : 'bg-zinc-900/60 border-emerald-500/30 text-zinc-200'
            }`}
          >
            <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4
              className={`text-base font-bold uppercase tracking-wider mb-2 ${
                isLight ? 'text-slate-900' : 'text-white'
              }`}
            >
              Quotation Request Received
            </h4>
            <p
              className={`text-xs max-w-md mx-auto leading-relaxed mb-6 font-normal ${
                isLight ? 'text-slate-600' : 'text-zinc-300'
              }`}
            >
              Thank you, <strong className={isLight ? 'text-slate-950' : 'text-white'}>{formData.name}</strong>. Our commercial sales engineering desk for {brand.brandName} will prepare a line-item quotation for <strong className={isLight ? 'text-slate-950' : 'text-white'}>{formData.productName} ({formData.model})</strong> within 2–4 business hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-tech font-bold text-xs tracking-wider uppercase rounded-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>EXPEDITE ON WHATSAPP</span>
              </a>

              <button
                onClick={() => setQuoteModalOpen(false)}
                className={`px-5 py-2.5 text-xs font-tech tracking-wider uppercase rounded-sm ${
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
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Auto-Populated Product Information Card */}
            <div
              className={`p-3 rounded-sm flex items-center justify-between border ${
                isLight
                  ? 'bg-slate-50 border-slate-200'
                  : 'bg-zinc-900 border-white/10'
              }`}
            >
              <div>
                <span
                  className={`text-[10px] font-tech uppercase tracking-wider block ${
                    isLight ? 'text-slate-500' : 'text-zinc-400'
                  }`}
                >
                  SELECTED EQUIPMENT
                </span>
                <span
                  className={`text-xs font-bold uppercase ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  {formData.productName}
                </span>
              </div>
              <div className="text-right">
                <span
                  className={`text-[10px] font-tech uppercase tracking-wider block ${
                    isLight ? 'text-slate-500' : 'text-zinc-400'
                  }`}
                >
                  MODEL
                </span>
                <span
                  className={`text-xs font-tech font-bold uppercase px-2 py-0.5 rounded border ${
                    isLight
                      ? 'bg-white text-slate-900 border-slate-300'
                      : 'bg-black/50 text-zinc-200 border-white/10'
                  }`}
                >
                  {formData.model}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className={`block text-[11px] uppercase font-tech mb-1 tracking-wider ${
                    isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'
                  }`}
                >
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Chef / Procurement Lead"
                  className={`w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-600'
                      : 'bg-zinc-900 border-white/15 text-white placeholder-zinc-500 focus:border-white'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-[11px] uppercase font-tech mb-1 tracking-wider ${
                    isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'
                  }`}
                >
                  Company / Restaurant Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Grand Horizon Hotel"
                  className={`w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-600'
                      : 'bg-zinc-900 border-white/15 text-white placeholder-zinc-500 focus:border-white'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className={`block text-[11px] uppercase font-tech mb-1 tracking-wider ${
                    isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'
                  }`}
                >
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98..."
                  className={`w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-600'
                      : 'bg-zinc-900 border-white/15 text-white placeholder-zinc-500 focus:border-white'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-[11px] uppercase font-tech mb-1 tracking-wider ${
                    isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'
                  }`}
                >
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="procurement@company.com"
                  className={`w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-600'
                      : 'bg-zinc-900 border-white/15 text-white placeholder-zinc-500 focus:border-white'
                  }`}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  className={`block text-[11px] uppercase font-tech mb-1 tracking-wider ${
                    isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'
                  }`}
                >
                  Estimated Quantity *
                </label>
                <input
                  type="text"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="e.g. 2 Units / Bulk"
                  className={`w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-600'
                      : 'bg-zinc-900 border-white/15 text-white placeholder-zinc-500 focus:border-white'
                  }`}
                />
              </div>

              <div>
                <label
                  className={`block text-[11px] uppercase font-tech mb-1 tracking-wider ${
                    isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'
                  }`}
                >
                  Installation City / State *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Mumbai, Maharashtra"
                  className={`w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border ${
                    isLight
                      ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-600'
                      : 'bg-zinc-900 border-white/15 text-white placeholder-zinc-500 focus:border-white'
                  }`}
                />
              </div>
            </div>

            <div>
              <label
                className={`block text-[11px] uppercase font-tech mb-1 tracking-wider ${
                  isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'
                }`}
              >
                Specific Technical Questions or Project Notes
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mention single-phase vs 3-phase power availability, timeline, or custom fabrication requirements..."
                className={`w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border ${
                  isLight
                    ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-600'
                    : 'bg-zinc-900 border-white/15 text-white placeholder-zinc-500 focus:border-white'
                }`}
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className={`flex-1 py-3.5 font-bold text-xs tracking-[0.18em] uppercase rounded-sm transition-colors flex items-center justify-center gap-2 active:scale-[0.99] shadow-sm ${
                  isLight
                    ? 'bg-slate-950 text-white hover:bg-slate-800'
                    : 'bg-white text-zinc-950 hover:bg-zinc-200'
                }`}
              >
                <Send className="w-3.5 h-3.5" />
                <span>SUBMIT FORM ENQUIRY</span>
              </button>

              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className={`px-5 py-3.5 text-xs font-tech font-semibold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 border ${
                  isLight
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-zinc-800 hover:bg-zinc-700 text-emerald-400 border-zinc-700'
                }`}
              >
                <MessageSquare className="w-4 h-4 text-emerald-500" />
                <span>OR VIA WHATSAPP</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
