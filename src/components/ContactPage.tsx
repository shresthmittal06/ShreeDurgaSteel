import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { TopPageBackButton } from './TopPageBackButton';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  Building,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { brand, categories, themeMode } = useContent();
  const isLight = themeMode === 'light';

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    city: '',
    businessType: 'Restaurant',
    selectedCategories: ['cooking'] as string[],
    quantity: '',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const businessTypes = [
    'Restaurant',
    'Hotel',
    'Café',
    'Bakery',
    'Cloud Kitchen',
    'Caterer',
    'Distributor',
    'Institution',
    'Other',
  ];

  const toggleCategory = (slug: string) => {
    setFormData((prev) => {
      const exists = prev.selectedCategories.includes(slug);
      return {
        ...prev,
        selectedCategories: exists
          ? prev.selectedCategories.filter((s) => s !== slug)
          : [...prev.selectedCategories, slug],
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const generateWhatsAppUrl = () => {
    const text = `Hello ${brand.brandName},\nI would like to discuss commercial kitchen equipment.\n\nName: ${formData.name}\nCompany: ${formData.companyName}\nCity: ${formData.city}\nBusiness: ${formData.businessType}\nCategories: ${formData.selectedCategories.join(', ')}\nQuantity: ${formData.quantity}\nNotes: ${formData.message}`;
    return `https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      id="contact-page"
      className={`py-16 min-h-screen transition-colors ${
        isLight ? 'bg-white text-slate-700' : 'bg-[#090b0e] text-zinc-200'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TopPageBackButton currentPageTitle="Direct B2B Procurement & Contact" />

        {/* Header */}
        <div className={`mb-16 pb-8 border-b ${isLight ? 'border-slate-200' : 'border-white/10'}`}>
          <div
            className={`text-[11px] font-tech uppercase tracking-[0.25em] mb-2 ${
              isLight ? 'text-slate-500 font-semibold' : 'text-zinc-400'
            }`}
          >
            DIRECT B2B PROCUREMENT & FACTORY CONTACT
          </div>
          <h1
            className={`text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-tight ${
              isLight ? 'text-slate-900' : 'text-white'
            }`}
          >
            LET'S BUILD YOUR KITCHEN.
          </h1>
          <p
            className={`text-sm sm:text-base mt-3 max-w-2xl leading-relaxed font-normal ${
              isLight ? 'text-slate-600' : 'text-zinc-400'
            }`}
          >
            Connect directly with our engineering sales desk for unit pricing, CAD layout assistance, custom stainless fabrication quotes, and dealer distributorship terms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Company Information */}
          <div className="lg:col-span-5 space-y-6">
            <div
              className={`p-6 sm:p-8 rounded-sm space-y-6 border shadow-sm ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900/60 border-white/10'
              }`}
            >
              <h2
                className={`text-base font-bold uppercase tracking-wider font-tech ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                CONTACT INFORMATION
              </h2>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div
                  className={`p-2.5 rounded shrink-0 mt-0.5 border ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800'
                      : 'bg-white/5 border-white/10 text-zinc-300'
                  }`}
                >
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span
                    className={`text-[10px] uppercase font-tech block tracking-wider ${
                      isLight ? 'text-slate-500' : 'text-zinc-400'
                    }`}
                  >
                    DIRECT PHONE / SALES
                  </span>
                  <a
                    href={`tel:${brand.phone}`}
                    className={`text-sm font-tech font-bold hover:underline mt-0.5 block ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {brand.phone}
                  </a>
                  {brand.phone2 && (
                    <a
                      href={`tel:${brand.phone2}`}
                      className={`text-sm font-tech font-bold hover:underline mt-0.5 block ${
                        isLight ? 'text-slate-700' : 'text-zinc-300'
                      }`}
                    >
                      {brand.phone2} <span className="text-[10px] font-normal text-amber-500">(Plant & Works)</span>
                    </a>
                  )}
                  <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
                    Mon - Sat: 9:00 AM – 7:00 PM IST
                  </span>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span
                    className={`text-[10px] uppercase font-tech block tracking-wider ${
                      isLight ? 'text-slate-500' : 'text-zinc-400'
                    }`}
                  >
                    WHATSAPP FAST RESPONSE
                  </span>
                  <a
                    href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-tech font-bold text-emerald-600 hover:underline mt-0.5 block"
                  >
                    {brand.whatsapp}
                  </a>
                  <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
                    Instant PDF specs & quotes
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div
                  className={`p-2.5 rounded shrink-0 mt-0.5 border ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800'
                      : 'bg-white/5 border-white/10 text-zinc-300'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span
                    className={`text-[10px] uppercase font-tech block tracking-wider ${
                      isLight ? 'text-slate-500' : 'text-zinc-400'
                    }`}
                  >
                    OFFICIAL PROCUREMENT EMAIL
                  </span>
                  <a
                    href={`mailto:${brand.email}`}
                    className={`text-sm font-tech font-bold hover:underline mt-0.5 block ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    {brand.email}
                  </a>
                  <span className={`text-[11px] ${isLight ? 'text-slate-500' : 'text-zinc-500'}`}>
                    RFP / Tender submissions
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div
                  className={`p-2.5 rounded shrink-0 mt-0.5 border ${
                    isLight
                      ? 'bg-white border-slate-200 text-slate-800'
                      : 'bg-white/5 border-white/10 text-zinc-300'
                  }`}
                >
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span
                    className={`text-[10px] uppercase font-tech block tracking-wider ${
                      isLight ? 'text-slate-500' : 'text-zinc-400'
                    }`}
                  >
                    FACTORY & HEADQUARTERS
                  </span>
                  <p
                    className={`text-xs leading-relaxed mt-0.5 ${
                      isLight ? 'text-slate-700' : 'text-zinc-300'
                    }`}
                  >
                    {brand.address}
                  </p>
                  <span
                    className={`text-[11px] font-tech mt-1 block ${
                      isLight ? 'text-slate-500' : 'text-zinc-500'
                    }`}
                  >
                    Region: {brand.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Turnkey Project Consultation Card */}
            <div
              className={`p-6 rounded-sm border shadow-sm ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900/30 border-white/10'
              }`}
            >
              <span
                className={`text-[10px] font-tech uppercase tracking-wider block mb-1 ${
                  isLight ? 'text-slate-500' : 'text-zinc-400'
                }`}
              >
                DEALERSHIP & EXPORTS
              </span>
              <h3
                className={`text-sm font-bold uppercase tracking-tight mb-2 ${
                  isLight ? 'text-slate-900' : 'text-white'
                }`}
              >
                BECOME AN AUTHORIZED DISTRIBUTOR
              </h3>
              <p
                className={`text-xs leading-relaxed ${
                  isLight ? 'text-slate-600' : 'text-zinc-400'
                }`}
              >
                We supply tier-1 commercial equipment distributors and foodservice consultants with competitive OEM margins, guaranteed spares, and marketing collateral.
              </p>
            </div>
          </div>

          {/* Right Column: B2B ENQUIRY FORM */}
          <div className="lg:col-span-7">
            <div
              className={`p-6 sm:p-10 rounded-sm border shadow-sm ${
                isLight ? 'bg-slate-50 border-slate-200' : 'bg-zinc-900/70 border-white/15'
              }`}
            >
              <div className="mb-6">
                <h2
                  className={`text-xl sm:text-2xl font-bold uppercase tracking-tight mb-1 ${
                    isLight ? 'text-slate-900' : 'text-white'
                  }`}
                >
                  SEND B2B SPECIFICATION ENQUIRY
                </h2>
                <p className={`text-xs font-normal ${isLight ? 'text-slate-600' : 'text-zinc-400'}`}>
                  All requests receive itemized quotations with electrical specifications and delivery timelines.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3
                    className={`text-lg font-bold uppercase tracking-wider mb-2 ${
                      isLight ? 'text-slate-900' : 'text-white'
                    }`}
                  >
                    Enquiry Logged Successfully
                  </h3>
                  <p
                    className={`text-xs max-w-md mx-auto leading-relaxed mb-6 font-normal ${
                      isLight ? 'text-slate-600' : 'text-zinc-300'
                    }`}
                  >
                    Thank you, <strong className={isLight ? 'text-slate-950' : 'text-white'}>{formData.name}</strong> from{' '}
                    <strong className={isLight ? 'text-slate-950' : 'text-white'}>{formData.companyName}</strong>. Our engineering desk has received your equipment requirement and will contact you shortly.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-tech font-bold text-xs tracking-wider uppercase rounded-sm flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>FORWARD TO WHATSAPP DESK</span>
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className={`px-6 py-3 text-xs font-tech tracking-wider uppercase rounded-sm ${
                        isLight
                          ? 'bg-slate-200 text-slate-800 hover:bg-slate-300'
                          : 'bg-zinc-800 text-zinc-200 hover:bg-zinc-700'
                      }`}
                    >
                      SUBMIT ANOTHER ENQUIRY
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className={`block text-[11px] uppercase font-tech mb-1 tracking-wider ${
                          isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'
                        }`}
                      >
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Executive Chef / Director"
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
                        Company / Establishment Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Apex Hospitality Group"
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
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98200..."
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
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="chef@restaurant.com"
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
                        City / Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Bangalore, Karnataka"
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
                        Business Type *
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className={`w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border ${
                          isLight
                            ? 'bg-white border-slate-300 text-slate-900 focus:border-slate-600'
                            : 'bg-zinc-900 border-white/15 text-white focus:border-white'
                        }`}
                      >
                        {businessTypes.map((t) => (
                          <option key={t} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Multi-Select Product Categories */}
                  <div>
                    <label
                      className={`block text-[11px] uppercase font-tech mb-2 tracking-wider ${
                        isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'
                      }`}
                    >
                      Products Interested In (Select all that apply)
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                      {categories.map((c) => {
                        const active = formData.selectedCategories.includes(c.slug);
                        return (
                          <button
                            type="button"
                            key={c.id}
                            onClick={() => toggleCategory(c.slug)}
                            className={`p-2.5 text-left text-xs font-tech tracking-wider rounded-sm border transition-colors flex items-center justify-between ${
                              active
                                ? isLight
                                  ? 'bg-slate-950 text-white border-slate-950 font-bold'
                                  : 'bg-white text-zinc-950 border-white font-bold'
                                : isLight
                                ? 'bg-white text-slate-700 border-slate-300 hover:border-slate-500'
                                : 'bg-zinc-900 text-zinc-400 border-white/10 hover:border-white/20'
                            }`}
                          >
                            <span>{c.name}</span>
                            {active && <span className="text-[10px]">✓</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      className={`block text-[11px] uppercase font-tech mb-1 tracking-wider ${
                        isLight ? 'text-slate-600 font-semibold' : 'text-zinc-400'
                      }`}
                    >
                      Quantity / Project Requirement
                    </label>
                    <input
                      type="text"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      placeholder="e.g. 2 x Fryers + 1 x Pizza Oven (Delivery by next month)"
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
                      Message & Specification Requirements
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your kitchen footprint, target cuisine throughput, power phase (single vs 3-phase), or dealership enquiry..."
                      className={`w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border ${
                        isLight
                          ? 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-slate-600'
                          : 'bg-zinc-900 border-white/15 text-white placeholder-zinc-500 focus:border-white'
                      }`}
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className={`w-full py-4 font-bold text-xs tracking-[0.2em] uppercase rounded-sm transition-colors flex items-center justify-center gap-2 active:scale-[0.99] shadow-lg ${
                        isLight
                          ? 'bg-slate-950 text-white hover:bg-slate-800'
                          : 'bg-white text-zinc-950 hover:bg-zinc-200'
                      }`}
                    >
                      <Send className="w-4 h-4" />
                      <span>SEND ENQUIRY</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
