import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { TopPageBackButton } from './TopPageBackButton';
import {
  FileText,
  MessageSquare,
  Send,
  CheckCircle2,
  Upload,
} from 'lucide-react';

export const GetAQuotePage: React.FC = () => {
  const { brand } = useContent();

  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    whatsapp: '',
    country: 'India',
    businessType: 'Restaurant',
    productsRequired: '',
    estimatedQuantity: '1-5 Units',
    projectRequirement: 'Complete Kitchen Setup',
    message: '',
    fileName: '',
    fileData: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [leadRef, setLeadRef] = useState('');

  const businessTypes = [
    'Hotel / Resort',
    'Restaurant / Café',
    'Cloud Kitchen / Ghost Kitchen',
    'Catering & Banquet Facility',
    'Sweet House / Confectionery',
    'Commercial Kitchen Contractor',
    'Kitchen Consultant / Architect',
    'Dealer / Distributor',
    'Institutional Canteen / Hospital',
    'Export Buyer',
    'Other Food-Service Business',
  ];

  const projectRequirements = [
    'Complete Commercial Kitchen Project',
    'High-Output Cooking Line Upgrade',
    'Sweet & Confectionery Counter Setup',
    'In-House Stainless Steel Custom Fabrication',
    'B2B Wholesale / Bulk Equipment Order',
    'Gastronorm (GN) Pan System Supply',
    'Individual Equipment Replacement',
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      alert('File size exceeds 15MB limit.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setFormData((prev) => ({
        ...prev,
        fileName: file.name,
        fileData: reader.result as string,
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const ref = `SDS-${Date.now().toString().slice(-6)}`;
    setLeadRef(ref);

    // Persist lead locally in browser storage
    try {
      const existingLeads = JSON.parse(localStorage.getItem('shri_durga_leads') || '[]');
      existingLeads.unshift({
        id: ref,
        date: new Date().toISOString(),
        ...formData,
      });
      localStorage.setItem('shri_durga_leads', JSON.stringify(existingLeads));
    } catch {
      // safe fallback
    }

    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getWhatsAppLink = () => {
    const text = `*NEW B2B KITCHEN ENQUIRY [Ref: ${leadRef || 'SDS-WEB'}]*
*Name:* ${formData.name}
*Company:* ${formData.company || 'N/A'}
*Business Type:* ${formData.businessType}
*Phone/WA:* ${formData.whatsapp || formData.phone}
*Email:* ${formData.email}
*Location:* ${formData.country}
*Project Scope:* ${formData.projectRequirement}
*Products Required:* ${formData.productsRequired || 'Commercial Kitchen Equipment'}
*Estimated Qty:* ${formData.estimatedQuantity}
*Message:* ${formData.message || 'Please share product specifications, lead times and B2B pricing.'}`;

    return `https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="pt-28 pb-24 transition-colors min-h-screen bg-[#F3E7DA] text-[#292321]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <TopPageBackButton currentPageTitle="B2B Procurement & Consultation" />

        {/* Page Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 text-[11px] font-tech font-bold uppercase tracking-[0.25em] text-[#5B1018] mb-4 px-3 py-1 rounded-xs bg-[#5B1018]/10 border border-[#5B1018]/25">
            <FileText className="w-3.5 h-3.5" />
            <span>B2B PROCUREMENT & PROJECT CONSULTATION</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight uppercase leading-[1.05] mb-6 text-[#292321]">
            TELL US WHAT YOUR
            <br />
            <span className="text-[#5B1018]">
              KITCHEN NEEDS.
            </span>
          </h1>

          <p className="text-base sm:text-lg leading-relaxed font-normal text-[#4D423E]">
            Submit your commercial kitchen equipment requirements, architectural layouts, or bespoke stainless steel manufacturing inquiries. Our technical sales cell responds with itemized B2B quotations and engineering specifications.
          </p>
        </div>

        {/* Confirmation State */}
        {submitted ? (
          <div className="p-8 sm:p-14 rounded-xs border max-w-3xl bg-[#FAF4EE] border-[#D8BFA8] shadow-xl">
            <div className="w-16 h-16 rounded-full bg-[#5B1018]/10 border border-[#5B1018]/30 flex items-center justify-center text-[#5B1018] mb-6">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <span className="text-xs font-tech uppercase tracking-widest text-[#5B1018] font-bold block mb-2">
              ENQUIRY SUBMITTED SUCCESSFULLY • REF: {leadRef}
            </span>

            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight mb-4 text-[#292321]">
              Thank You, {formData.name}.
            </h2>

            <p className="text-sm sm:text-base leading-relaxed mb-8 font-normal text-[#4D423E]">
              We have received your requirement for <strong>{formData.projectRequirement}</strong>. A dedicated technical consultant from our commercial sales team will review your specifications and get in touch shortly.
            </p>

            <div className="p-6 rounded-xs bg-[#F3E7DA] border border-[#D8BFA8] mb-8 font-tech text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#5A4F4B]">Company:</span>
                <span className="font-bold text-[#292321]">{formData.company || 'Individual'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A4F4B]">Business Format:</span>
                <span className="font-bold text-[#292321]">{formData.businessType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#5A4F4B]">Products / Scope:</span>
                <span className="font-bold text-[#292321]">{formData.productsRequired || 'Commercial Equipment'}</span>
              </div>
              {formData.fileName && (
                <div className="flex justify-between">
                  <span className="text-[#5A4F4B]">Attached Drawing:</span>
                  <span className="font-bold text-[#5B1018]">{formData.fileName}</span>
                </div>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href={getWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 font-tech text-xs font-bold uppercase tracking-[0.18em] rounded-xs bg-[#5B1018] text-[#F3E7DA] hover:bg-[#440B11] transition-colors flex items-center gap-2 shadow-lg"
              >
                <MessageSquare className="w-4 h-4" />
                <span>CONTINUE ON WHATSAPP</span>
              </a>

              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-4 font-tech text-xs font-bold uppercase tracking-[0.16em] rounded-xs border transition-colors border-[#D8BFA8] text-[#292321] hover:bg-[#E9D9C8]"
              >
                SUBMIT ANOTHER REQUIREMENT
              </button>
            </div>
          </div>
        ) : (
          /* Form Layout */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Main Form */}
            <form
              onSubmit={handleSubmit}
              className="lg:col-span-8 p-8 sm:p-12 rounded-xs border bg-[#FAF4EE] border-[#D8BFA8] shadow-md"
            >
              <h3 className="text-xl font-bold uppercase tracking-tight mb-8 pb-4 border-b text-[#292321] border-[#D8BFA8]">
                Commercial Kitchen Quotation Request
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-xs font-tech font-bold uppercase tracking-wider mb-2 text-[#4D423E]">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikram Sharma"
                    className="w-full px-4 py-3 rounded-xs text-sm font-sans border transition-colors bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-tech font-bold uppercase tracking-wider mb-2 text-[#4D423E]">
                    Company / Establishment Name
                  </label>
                  <input
                    type="text"
                    value={formData.company}
                    onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                    placeholder="e.g. The Grand Palace Hotel / Royal Sweets"
                    className="w-full px-4 py-3 rounded-xs text-sm font-sans border transition-colors bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-tech font-bold uppercase tracking-wider mb-2 text-[#4D423E]">
                    Business Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. procurement@hotel.com"
                    className="w-full px-4 py-3 rounded-xs text-sm font-sans border transition-colors bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-tech font-bold uppercase tracking-wider mb-2 text-[#4D423E]">
                    Direct Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98200 12345"
                    className="w-full px-4 py-3 rounded-xs text-sm font-sans border transition-colors bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-tech font-bold uppercase tracking-wider mb-2 text-[#4D423E]">
                    WhatsApp Number (for instant quote)
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                    placeholder="e.g. +91 98200 12345"
                    className="w-full px-4 py-3 rounded-xs text-sm font-sans border transition-colors bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-tech font-bold uppercase tracking-wider mb-2 text-[#4D423E]">
                    City / State / Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    placeholder="e.g. Mumbai, Maharashtra, India"
                    className="w-full px-4 py-3 rounded-xs text-sm font-sans border transition-colors bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-tech font-bold uppercase tracking-wider mb-2 text-[#4D423E]">
                    Business Type
                  </label>
                  <select
                    value={formData.businessType}
                    onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xs text-sm font-sans border transition-colors bg-white border-[#D8BFA8] text-[#292321] focus:border-[#5B1018] focus:outline-none"
                  >
                    {businessTypes.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-tech font-bold uppercase tracking-wider mb-2 text-[#4D423E]">
                    Project Scope
                  </label>
                  <select
                    value={formData.projectRequirement}
                    onChange={(e) => setFormData({ ...formData, projectRequirement: e.target.value })}
                    className="w-full px-4 py-3 rounded-xs text-sm font-sans border transition-colors bg-white border-[#D8BFA8] text-[#292321] focus:border-[#5B1018] focus:outline-none"
                  >
                    {projectRequirements.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Products Required & Estimated Quantity */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-tech font-bold uppercase tracking-wider mb-2 text-[#4D423E]">
                    Products Required (e.g. Electric Fryers, Barfi Trays, GN Pans)
                  </label>
                  <input
                    type="text"
                    value={formData.productsRequired}
                    onChange={(e) => setFormData({ ...formData, productsRequired: e.target.value })}
                    placeholder="e.g. 2x Double Tank Fryer, 50x Barfi Tray No. 00, 20x 1/1 GN Pan"
                    className="w-full px-4 py-3 rounded-xs text-sm font-sans border transition-colors bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018] focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-tech font-bold uppercase tracking-wider mb-2 text-[#4D423E]">
                    Estimated Quantity
                  </label>
                  <select
                    value={formData.estimatedQuantity}
                    onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                    className="w-full px-4 py-3 rounded-xs text-sm font-sans border transition-colors bg-white border-[#D8BFA8] text-[#292321] focus:border-[#5B1018] focus:outline-none"
                  >
                    <option value="1-5 Units">1-5 Units (Sample / Initial)</option>
                    <option value="6-20 Units">6-20 Units (Mid Volume)</option>
                    <option value="21-50 Units">21-50 Units (Commercial Bulk)</option>
                    <option value="50+ Units">50+ Units (Institutional / Project)</option>
                  </select>
                </div>
              </div>

              {/* Message / Requirement Details */}
              <div className="mb-6">
                <label className="block text-xs font-tech font-bold uppercase tracking-wider mb-2 text-[#4D423E]">
                  Specific Dimensions, Power Requirements or Notes
                </label>
                <textarea
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Specify custom tray depths, electrical phase requirements, expected delivery timeframe, or turnkey kitchen layout details..."
                  className="w-full px-4 py-3 rounded-xs text-sm font-sans border transition-colors bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018] focus:outline-none"
                />
              </div>

              {/* File / Drawing Upload */}
              <div className="mb-8">
                <label className="block text-xs font-tech font-bold uppercase tracking-wider mb-2 text-[#4D423E]">
                  Upload Architectural Drawing / Specification Sheet (PDF, DWG, JPG up to 15MB)
                </label>
                <div className="relative border border-dashed rounded-xs p-6 flex flex-col items-center justify-center text-center cursor-pointer transition-colors border-[#D8BFA8] bg-[#F3E7DA] hover:bg-[#E9D9C8]">
                  <Upload className="w-6 h-6 text-[#5B1018] mb-2" />
                  <span className="text-xs font-tech font-semibold text-[#292321]">
                    {formData.fileName ? formData.fileName : 'Click or drag drawing file here'}
                  </span>
                  <span className="text-[10px] text-[#5A4F4B] font-tech mt-1">
                    Accepts PDF, DWG, DXF, PNG, JPEG
                  </span>
                  <input
                    type="file"
                    onChange={handleFileUpload}
                    className="opacity-0 absolute inset-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 font-tech text-xs font-bold uppercase tracking-[0.2em] rounded-xs bg-[#5B1018] text-[#F3E7DA] hover:bg-[#440B11] transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Send className="w-4 h-4" />
                <span>REQUEST QUOTATION</span>
              </button>
            </form>

            {/* Sidebar / Direct B2B Help */}
            <div className="lg:col-span-4 space-y-6">
              {/* Direct WhatsApp Callout */}
              <div className="p-8 rounded-xs border bg-[#FAF4EE] border-[#D8BFA8]">
                <div className="flex items-center gap-2 text-[10px] font-tech font-bold uppercase tracking-[0.2em] text-[#5B1018] mb-4">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>DIRECT SALES CHAT</span>
                </div>
                <h4 className="text-lg font-black uppercase tracking-tight mb-2 text-[#292321]">
                  Need Immediate Technical Assistance?
                </h4>
                <p className="text-xs leading-relaxed mb-6 font-normal text-[#4D423E]">
                  Our commercial sales managers are available directly on WhatsApp for instantaneous size recommendations, stock checks, and dealer quotations.
                </p>

                <a
                  href={`https://wa.me/${brand.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20Shree%20Durga%20Steels,%20I%20have%20an%20urgent%20commercial%20kitchen%20equipment%20requirement.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3.5 font-tech text-xs font-bold uppercase tracking-[0.16em] rounded-xs bg-[#5B1018] text-[#F3E7DA] hover:bg-[#440B11] transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>CHAT ON WHATSAPP NOW</span>
                </a>
              </div>

              {/* Direct Calling & Factory Contacts */}
              <div className="p-8 rounded-xs border bg-[#FAF4EE] border-[#D8BFA8]">
                <span className="text-[10px] font-tech font-bold uppercase tracking-[0.2em] block mb-4 text-[#5A4F4B]">
                  DIRECT PHONE CHANNELS
                </span>

                <div className="space-y-4 text-xs font-tech">
                  <div className="pb-3 border-b border-[#D8BFA8]">
                    <span className="text-[#5A4F4B] block text-[10px]">
                      Commercial Kitchen Sales
                    </span>
                    <a
                      href={`tel:${brand.phone.replace(/\s+/g, '')}`}
                      className="font-bold text-[#292321] text-sm hover:text-[#5B1018] hover:underline"
                    >
                      {brand.phone}
                    </a>
                  </div>

                  <div className="pb-3 border-b border-[#D8BFA8]">
                    <span className="text-[#5A4F4B] block text-[10px]">
                      Email Quotation Desk
                    </span>
                    <a
                      href={`mailto:${brand.email}`}
                      className="font-bold text-[#292321] text-sm hover:text-[#5B1018] hover:underline"
                    >
                      {brand.email}
                    </a>
                  </div>

                  <div>
                    <span className="text-[#5A4F4B] block text-[10px]">
                      Response Guarantee
                    </span>
                    <span className="font-bold text-[#5B1018]">
                      Within 4 business hours with itemized PDF specs
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
