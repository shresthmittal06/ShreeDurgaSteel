import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { TopPageBackButton } from './TopPageBackButton';
import {
  Phone,
  MessageSquare,
  Mail,
  MapPin,
  Send,
  CheckCircle2,
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { brand, categories } = useContent();

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
      className="py-16 min-h-screen transition-colors bg-[#F3E7DA] text-[#292321]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TopPageBackButton currentPageTitle="Direct B2B Procurement & Contact" />

        {/* Header */}
        <div className="mb-16 pb-8 border-b border-[#D8BFA8]">
          <div className="text-[11px] font-tech uppercase tracking-[0.25em] mb-2 text-[#5B1018] font-semibold">
            DIRECT B2B PROCUREMENT & FACTORY CONTACT
          </div>
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold uppercase tracking-tight leading-tight text-[#292321]">
            LET&apos;S BUILD YOUR KITCHEN.
          </h1>
          <p className="text-sm sm:text-base mt-3 max-w-2xl leading-relaxed font-normal text-[#4D423E]">
            Connect directly with our engineering sales desk for unit pricing, CAD layout assistance, custom stainless fabrication quotes, and dealer distributorship terms.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Company Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-sm space-y-6 border shadow-sm bg-[#FAF4EE] border-[#D8BFA8]">
              <h2 className="text-base font-bold uppercase tracking-wider font-tech text-[#292321]">
                CONTACT INFORMATION
              </h2>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded shrink-0 mt-0.5 border bg-[#F3E7DA] border-[#D8BFA8] text-[#5B1018]">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-tech block tracking-wider text-[#5A4F4B]">
                    DIRECT PHONE / SALES
                  </span>
                  <a
                    href={`tel:${brand.phone}`}
                    className="text-sm font-tech font-bold hover:text-[#5B1018] hover:underline mt-0.5 block text-[#292321]"
                  >
                    {brand.phone}
                  </a>
                  {brand.phone2 && (
                    <a
                      href={`tel:${brand.phone2}`}
                      className="text-sm font-tech font-bold hover:text-[#5B1018] hover:underline mt-0.5 block text-[#4D423E]"
                    >
                      {brand.phone2} <span className="text-[10px] font-normal text-[#5B1018]">(Plant & Works)</span>
                    </a>
                  )}
                  <span className="text-[11px] text-[#5A4F4B]">
                    Mon - Sat: 9:00 AM – 7:00 PM IST
                  </span>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 bg-[#5B1018]/10 border border-[#5B1018]/25 rounded text-[#5B1018] shrink-0 mt-0.5">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-tech block tracking-wider text-[#5A4F4B]">
                    WHATSAPP FAST RESPONSE
                  </span>
                  <a
                    href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-sm font-tech font-bold text-[#5B1018] hover:underline mt-0.5 block"
                  >
                    {brand.whatsapp}
                  </a>
                  <span className="text-[11px] text-[#5A4F4B]">
                    Instant PDF specs & quotes
                  </span>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded shrink-0 mt-0.5 border bg-[#F3E7DA] border-[#D8BFA8] text-[#5B1018]">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-tech block tracking-wider text-[#5A4F4B]">
                    OFFICIAL PROCUREMENT EMAIL
                  </span>
                  <a
                    href={`mailto:${brand.email}`}
                    className="text-sm font-tech font-bold hover:text-[#5B1018] hover:underline mt-0.5 block text-[#292321]"
                  >
                    {brand.email}
                  </a>
                  <span className="text-[11px] text-[#5A4F4B]">
                    RFP / Tender submissions
                  </span>
                </div>
              </div>

              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded shrink-0 mt-0.5 border bg-[#F3E7DA] border-[#D8BFA8] text-[#5B1018]">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-tech block tracking-wider text-[#5A4F4B]">
                    FACTORY & HEADQUARTERS
                  </span>
                  <p className="text-xs leading-relaxed mt-0.5 text-[#4D423E]">
                    {brand.address}
                  </p>
                  <span className="text-[11px] font-tech mt-1 block text-[#5A4F4B]">
                    Region: {brand.location}
                  </span>
                </div>
              </div>
            </div>

            {/* Turnkey Project Consultation Card */}
            <div className="p-6 rounded-sm border shadow-sm bg-[#FAF4EE] border-[#D8BFA8]">
              <span className="text-[10px] font-tech uppercase tracking-wider block mb-1 text-[#5B1018] font-semibold">
                DEALERSHIP & EXPORTS
              </span>
              <h3 className="text-sm font-bold uppercase tracking-tight mb-2 text-[#292321]">
                BECOME AN AUTHORIZED DISTRIBUTOR
              </h3>
              <p className="text-xs leading-relaxed text-[#4D423E]">
                We supply tier-1 commercial equipment distributors and foodservice consultants with competitive OEM margins, guaranteed spares, and marketing collateral.
              </p>
            </div>
          </div>

          {/* Right Column: B2B ENQUIRY FORM */}
          <div className="lg:col-span-7">
            <div className="p-6 sm:p-10 rounded-sm border shadow-sm bg-[#FAF4EE] border-[#D8BFA8]">
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold uppercase tracking-tight mb-1 text-[#292321]">
                  SEND B2B SPECIFICATION ENQUIRY
                </h2>
                <p className="text-xs font-normal text-[#4D423E]">
                  All requests receive itemized quotations with electrical specifications and delivery timelines.
                </p>
              </div>

              {submitted ? (
                <div className="py-12 text-center">
                  <div className="w-14 h-14 rounded-full bg-[#5B1018]/10 border border-[#5B1018]/30 text-[#5B1018] flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="text-lg font-bold uppercase tracking-wider mb-2 text-[#292321]">
                    Enquiry Logged Successfully
                  </h3>
                  <p className="text-xs max-w-md mx-auto leading-relaxed mb-6 font-normal text-[#4D423E]">
                    Thank you, <strong className="text-[#292321]">{formData.name}</strong> from{' '}
                    <strong className="text-[#292321]">{formData.companyName}</strong>. Our engineering desk has received your equipment requirement and will contact you shortly.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <a
                      href={generateWhatsAppUrl()}
                      target="_blank"
                      rel="noreferrer"
                      className="px-6 py-3 bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech font-bold text-xs tracking-wider uppercase rounded-sm flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-4 h-4" />
                      <span>FORWARD TO WHATSAPP DESK</span>
                    </a>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-6 py-3 text-xs font-tech tracking-wider uppercase rounded-sm bg-[#E9D9C8] text-[#292321] hover:bg-[#D8BFA8]"
                    >
                      SUBMIT ANOTHER ENQUIRY
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-tech mb-1 tracking-wider text-[#4D423E] font-semibold">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Executive Chef / Director"
                        className="w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-tech mb-1 tracking-wider text-[#4D423E] font-semibold">
                        Company / Establishment Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.companyName}
                        onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                        placeholder="e.g. Apex Hospitality Group"
                        className="w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-tech mb-1 tracking-wider text-[#4D423E] font-semibold">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 98200..."
                        className="w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-tech mb-1 tracking-wider text-[#4D423E] font-semibold">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="chef@restaurant.com"
                        className="w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] uppercase font-tech mb-1 tracking-wider text-[#4D423E] font-semibold">
                        City / Location *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="e.g. Bangalore, Karnataka"
                        className="w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] uppercase font-tech mb-1 tracking-wider text-[#4D423E] font-semibold">
                        Business Type *
                      </label>
                      <select
                        value={formData.businessType}
                        onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border bg-white border-[#D8BFA8] text-[#292321] focus:border-[#5B1018]"
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
                    <label className="block text-[11px] uppercase font-tech mb-2 tracking-wider text-[#4D423E] font-semibold">
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
                                ? 'bg-[#5B1018] text-[#F3E7DA] border-[#5B1018] font-bold'
                                : 'bg-white text-[#292321] border-[#D8BFA8] hover:border-[#5B1018]'
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
                    <label className="block text-[11px] uppercase font-tech mb-1 tracking-wider text-[#4D423E] font-semibold">
                      Quantity / Project Requirement
                    </label>
                    <input
                      type="text"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
                      placeholder="e.g. 2 x Fryers + 1 x Pizza Oven (Delivery by next month)"
                      className="w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] uppercase font-tech mb-1 tracking-wider text-[#4D423E] font-semibold">
                      Message & Specification Requirements
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your kitchen footprint, target cuisine throughput, power phase (single vs 3-phase), or dealership enquiry..."
                      className="w-full px-3.5 py-2.5 rounded-sm text-xs focus:outline-none transition-colors border bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      className="w-full py-4 font-bold text-xs tracking-[0.2em] uppercase rounded-sm transition-colors flex items-center justify-center gap-2 active:scale-[0.99] shadow-lg bg-[#5B1018] text-[#F3E7DA] hover:bg-[#440B11]"
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
