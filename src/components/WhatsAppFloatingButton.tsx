import React from 'react';
import { useContent } from '../context/ContentContext';
import { MessageSquare } from 'lucide-react';

export const WhatsAppFloatingButton: React.FC = () => {
  const { brand } = useContent();

  const rawNumber = brand.whatsapp.replace(/[^0-9]/g, '');
  const defaultText = `Hello, I am interested in your commercial kitchen equipment from ${brand.brandName}. I would like to know more about product specifications, pricing and lead times. Please share details and quotation.`;
  const whatsappUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(defaultText)}`;

  return (
    <aside
      id="whatsapp-floating-widget"
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 z-40 flex items-center group select-none"
    >
      {/* Tooltip on hover */}
      <span className="hidden sm:inline-block mr-3 px-3 py-1.5 bg-[#0e1116] border border-white/15 text-white text-[11px] font-tech uppercase tracking-wider rounded-sm shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
        Direct B2B WhatsApp Desk
      </span>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95 border border-emerald-400/30"
        aria-label="Chat on WhatsApp with commercial sales"
      >
        <MessageSquare className="w-6 h-6 fill-current" />
      </a>
    </aside>
  );
};
