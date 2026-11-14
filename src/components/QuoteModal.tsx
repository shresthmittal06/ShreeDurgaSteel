import React, { useState, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { X, Send, CheckCircle2, MessageSquare, ArrowLeft } from 'lucide-react';

export const QuoteModal: React.FC = () => {
  const {
    brand,
    quoteModalOpen,
    setQuoteModalOpen,
    quotePrefill,
  } = useContent();

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
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#292321]/80 backdrop-blur-sm animate-in fade-in duration-200"
    >
      <div
        id="quote-modal-card"
        className="rounded-sm max-w-xl w-full p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto border transition-colors bg-[#FAF4EE] border-[#D8BFA8] text-[#292321]"
      >
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#D8BFA8]">
          <button
            type="button"
            onClick={() => setQuoteModalOpen(false)}
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-sm text-xs font-tech font-bold uppercase tracking-wider transition-colors bg-[#292321] hover:bg-[#5B1018] text-[#F3E7DA]"
            title="Go back / Close"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>BACK</span>
          </button>
          <button
            onClick={() => setQuoteModalOpen(false)}
            className="p-1 transition-colors text-[#5A4F4B] hover:text-[#292321]"
            aria-label="Close quote modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <span className="text-[10px] font-tech uppercase tracking-[0.25em] block mb-1 font-semibold text-[#5B1018]">
            B2B QUOTATION & SPECIFICATIONS
          </span>
          <h3 className="text-xl sm:text-2xl font-extrabold uppercase tracking-tight text-[#292321]">
            REQUEST COMMERCIAL PRICING
          </h3>
          <p className="text-xs mt-1 font-normal text-[#4D423E]">
            Direct factory quotation for procurement managers, hotel consultants, and restaurant operators.
          </p>
        </div>

        {isSubmitted ? (
          <div className="py-8 text-center p-6 rounded-sm border bg-[#F3E7DA] border-[#5B1018]/30 text-[#292321]">
            <div className="w-12 h-12 rounded-full bg-[#5B1018]/10 border border-[#5B1018]/30 text-[#5B1018] flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold uppercase tracking-wider mb-2 text-[#292321]">
              Quotation Request Received
            </h4>
            <p className="text-xs max-w-md mx-auto leading-relaxed mb-6 font-normal text-[#4D423E]">
              Thank you, <strong className="text-[#292321]">{formData.name}</strong>. Our commercial sales engineering desk for {brand.brandName} will prepare a line-item quotation for <strong className="text-[#292321]">{formData.productName} ({formData.model})</strong> within 2–4 business hours.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-2.5 bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech font-bold text-xs tracking-wider uppercase rounded-sm flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                <span>EXPEDITE ON WHATSAPP</span>
              </a>

              <button
                onClick={() => setQuoteModalOpen(false)}
                className="px-5 py-2.5 text-xs font-tech tracking-wider uppercase rounded-sm bg-[#E9D9C8] text-[#292321] hover:bg-[#D8BFA8]"
              >
                CLOSE
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Auto-Populated Product Information Card */}
            <div className="p-3 rounded-sm flex items-center justify-between border bg-[#F3E7DA] border-[#D8BFA8]">
              <div>
                <span className="text-[10px] font-tech uppercase tracking-wider block text-[#5A4F4B]">
                  SELECTED EQUIPMENT
                </span>
                <span className="text-xs font-bold uppercase text-[#292321]">
                  {formData.productName}
                </span>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-tech uppercase tracking-wider block text-[#5A4F4B]">
                  MODEL
                </span>
                <span className="text-xs font-tech font-bold uppercase px-2 py-0.5 rounded border bg-white text-[#292321] border-[#D8BFA8]">
                  {formData.model}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-tech mb-1 tracking-wider text-[#4D423E] font-semibold">
                  Contact Person *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Chef / Procurement Lead"
                  className="w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-tech mb-1 tracking-wider text-[#4D423E] font-semibold">
                  Company / Restaurant Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  placeholder="e.g. Grand Horizon Hotel"
                  className="w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-tech mb-1 tracking-wider text-[#4D423E] font-semibold">
                  Phone / WhatsApp *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+91 98..."
                  className="w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-tech mb-1 tracking-wider text-[#4D423E] font-semibold">
                  Work Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="procurement@company.com"
                  className="w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase font-tech mb-1 tracking-wider text-[#4D423E] font-semibold">
                  Estimated Quantity *
                </label>
                <input
                  type="text"
                  required
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                  placeholder="e.g. 2 Units / Bulk"
                  className="w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
                />
              </div>

              <div>
                <label className="block text-[11px] uppercase font-tech mb-1 tracking-wider text-[#4D423E] font-semibold">
                  Installation City / State *
                </label>
                <input
                  type="text"
                  required
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  placeholder="e.g. Mumbai, Maharashtra"
                  className="w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase font-tech mb-1 tracking-wider text-[#4D423E] font-semibold">
                Specific Technical Questions or Project Notes
              </label>
              <textarea
                rows={3}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Mention single-phase vs 3-phase power availability, timeline, or custom fabrication requirements..."
                className="w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                type="submit"
                className="flex-1 py-3.5 font-bold text-xs tracking-[0.18em] uppercase rounded-sm transition-colors flex items-center justify-center gap-2 active:scale-[0.99] shadow-sm bg-[#5B1018] text-[#F3E7DA] hover:bg-[#440B11]"
              >
                <Send className="w-3.5 h-3.5" />
                <span>SUBMIT FORM ENQUIRY</span>
              </button>

              <a
                href={generateWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="px-5 py-3.5 text-xs font-tech font-semibold tracking-wider uppercase rounded-sm flex items-center justify-center gap-2 border bg-[#292321] text-[#F3E7DA] border-[#292321] hover:bg-[#5B1018] hover:border-[#5B1018]"
              >
                <MessageSquare className="w-4 h-4" />
                <span>OR VIA WHATSAPP</span>
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
