import React, { useState, useMemo } from 'react';
import { useContent } from '../context/ContentContext';
import { TopPageBackButton } from './TopPageBackButton';
import {
  Search,
  Mail,
  FileText,
  Download,
  CheckCircle2,
  Send,
  MessageSquare,
  Printer,
  Copy,
  Plus,
  Minus,
  Trash2,
  Layers,
  X,
  ChevronRight,
  ClipboardList,
  Check,
  Eye,
  Info,
} from 'lucide-react';

export const PriceMatrixPage: React.FC = () => {
  const { products, brand, setSelectedProductForDetail } = useContent();

  // Selection state: map of productId -> quantity
  const [selectedItems, setSelectedItems] = useState<Record<string, number>>({});
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showOnlySelected, setShowOnlySelected] = useState<boolean>(false);

  // Modals and dialogs
  const [quoteModalOpen, setQuoteModalOpen] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);
  const [quoteSentSuccess, setQuoteSentSuccess] = useState<boolean>(false);

  // Client details for the quotation request
  const [clientDetails, setClientDetails] = useState({
    name: '',
    company: '',
    phone: '',
    email: '',
    city: '',
    notes: '',
  });

  // Filtered products based on search and selected toggle
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const isSelected = Boolean(selectedItems[p.id]);
      if (showOnlySelected && !isSelected) return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.model.toLowerCase().includes(q) ||
        p.productCode.toLowerCase().includes(q) ||
        (p.shortDescription && p.shortDescription.toLowerCase().includes(q)) ||
        (p.specifications?.dimensions && p.specifications.dimensions.toLowerCase().includes(q)) ||
        (p.specifications?.material && p.specifications.material.toLowerCase().includes(q))
      );
    });
  }, [products, selectedItems, showOnlySelected, searchQuery]);

  // Selected products array
  const selectedProductList = useMemo(() => {
    return products
      .filter((p) => Boolean(selectedItems[p.id]))
      .map((p) => ({
        product: p,
        quantity: selectedItems[p.id] || 1,
      }));
  }, [products, selectedItems]);

  const selectedCount = Object.keys(selectedItems).length;
  const totalUnits: number = Object.values(selectedItems).reduce<number>(
    (sum, qty) => sum + (typeof qty === 'number' ? qty : Number(qty) || 1),
    0
  );

  // Toggle selection for an item
  const toggleSelectItem = (id: string) => {
    setSelectedItems((prev) => {
      const next = { ...prev };
      if (next[id]) {
        delete next[id];
      } else {
        next[id] = 1;
      }
      return next;
    });
  };

  // Update quantity
  const updateQuantity = (id: string, delta: number) => {
    setSelectedItems((prev) => {
      const current = prev[id] || 1;
      const updated = Math.max(1, current + delta);
      return { ...prev, [id]: updated };
    });
  };

  const setExplicitQuantity = (id: string, qty: number) => {
    const valid = Math.max(1, isNaN(qty) ? 1 : qty);
    setSelectedItems((prev) => ({ ...prev, [id]: valid }));
  };

  // Select all currently visible products
  const handleSelectAll = () => {
    if (filteredProducts.length === 0) return;
    const allVisibleSelected = filteredProducts.every((p) => Boolean(selectedItems[p.id]));

    if (allVisibleSelected) {
      setSelectedItems((prev) => {
        const next = { ...prev };
        filteredProducts.forEach((p) => {
          delete next[p.id];
        });
        return next;
      });
    } else {
      setSelectedItems((prev) => {
        const next = { ...prev };
        filteredProducts.forEach((p) => {
          if (!next[p.id]) {
            next[p.id] = 1;
          }
        });
        return next;
      });
    }
  };

  const handleClearSelection = () => {
    setSelectedItems({});
    setShowOnlySelected(false);
  };

  // Quotation Reference Number (persistent per session/view)
  const quotationRefNumber = useMemo(() => {
    return `RFQ-SDS-${Math.floor(100000 + Math.random() * 900000)}`;
  }, []);

  // Format the text summary of the quotation
  const generateQuotationText = () => {
    const header = `=========================================
OFFICIAL COMMERCIAL QUOTATION REQUEST
Ref: ${quotationRefNumber}
Date: ${new Date().toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })}
Supplier: ${brand.brandName || 'SHREE DURGA STEELS'}
Contact: ${brand.phone} | Email: ${brand.email}
Address: ${brand.address}
=========================================

CUSTOMER DETAILS:
Name: ${clientDetails.name || 'Valued Client'}
Company: ${clientDetails.company || 'Not Specified'}
Phone: ${clientDetails.phone || 'Not Specified'}
Email: ${clientDetails.email || 'Not Specified'}
City / Delivery Location: ${clientDetails.city || 'Not Specified'}
${clientDetails.notes ? `Additional Instructions: ${clientDetails.notes}\n` : ''}
SELECTED EQUIPMENT & PRODUCTS (${selectedCount} items, ${totalUnits} units):
--------------------------------------------------`;

    const itemsText = selectedProductList
      .map((item, idx) => {
        const p = item.product;
        const specs = [
          p.model ? `Model: ${p.model}` : '',
          p.variantOrSize ? `Size: ${p.variantOrSize}` : '',
          p.specifications?.dimensions ? `Dimensions: ${p.specifications.dimensions}` : '',
          p.specifications?.material ? `Material: ${p.specifications.material}` : '',
        ]
          .filter(Boolean)
          .join(' | ');

        return `${idx + 1}. [${p.productCode}] ${p.name}
   - Required Quantity: ${item.quantity} Unit(s)
   ${specs ? `- Specifications: ${specs}` : ''}`;
      })
      .join('\n\n');

    const footer = `
--------------------------------------------------
Please provide your official commercial quotation including:
- Wholesale unit prices & applicable taxes (GST)
- Delivery timeline & transit freight to ${clientDetails.city || 'our location'}
- Warranty terms & technical specification sheets.

Thank you.`;

    return `${header}\n\n${itemsText}\n${footer}`;
  };

  // 1. Direct Email Option (mailto)
  const handleDirectMailQuotation = () => {
    if (selectedCount === 0) {
      alert('Please select at least one product before requesting a quotation.');
      return;
    }

    const subject = encodeURIComponent(
      `Quotation Request: ${selectedCount} Items (${totalUnits} Units) - ${
        clientDetails.company || clientDetails.name || 'Commercial Procurement'
      }`
    );
    const body = encodeURIComponent(generateQuotationText());
    const mailtoUrl = `mailto:${brand.email}?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  // 2. Direct WhatsApp Option
  const handleWhatsAppQuotation = () => {
    if (selectedCount === 0) {
      alert('Please select at least one product before requesting a quotation.');
      return;
    }

    const waNumber = (brand.whatsapp || brand.phone || '919997890127').replace(/[^0-9]/g, '');
    const text = encodeURIComponent(generateQuotationText());
    const waUrl = `https://wa.me/${waNumber}?text=${text}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  // 3. Copy Quotation to Clipboard
  const handleCopyQuotation = () => {
    const text = generateQuotationText();
    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 3000);
  };

  // 4. Download CSV Quotation Sheet
  const handleDownloadCsv = () => {
    if (selectedCount === 0) {
      alert('Please select at least one product before downloading a quotation.');
      return;
    }

    const headers = [
      'Item No.',
      'Product Code',
      'Product Name',
      'Model / Variant',
      'Requested Quantity',
      'Dimensions',
      'Material / Specs',
    ];

    const rows = selectedProductList.map((item, idx) => {
      const p = item.product;
      return [
        idx + 1,
        `"${p.productCode}"`,
        `"${p.name.replace(/"/g, '""')}"`,
        `"${(p.model || p.variantOrSize || '').replace(/"/g, '""')}"`,
        item.quantity,
        `"${(p.specifications?.dimensions || '').replace(/"/g, '""')}"`,
        `"${(p.specifications?.material || 'Stainless Steel').replace(/"/g, '""')}"`,
      ].join(',');
    });

    const csvContent = [headers.join(','), ...rows].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute(
      'download',
      `Quotation_Request_${quotationRefNumber}_${Date.now()}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // 5. Print Quotation Sheet
  const handlePrintQuotation = () => {
    window.print();
  };

  return (
    <div className="pt-24 pb-28 transition-colors bg-[#F3E7DA] text-[#292321]">
      {/* Header Banner */}
      <div className="border-b py-12 px-4 sm:px-6 lg:px-8 bg-[#FAF4EE] border-[#D8BFA8]">
        <div className="max-w-7xl mx-auto">
          <TopPageBackButton currentPageTitle="Select Products & Get Quotation" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-tech font-bold uppercase tracking-[0.2em] bg-[#5B1018]/10 text-[#5B1018] border border-[#5B1018]/25 mb-4">
            <ClipboardList className="w-3.5 h-3.5" />
            <span>PRODUCT SELECTION & QUOTATION BUILDER</span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div>
              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight mb-3 text-[#292321]">
                Select Products & Get Quotation
              </h1>
              <p className="text-sm sm:text-base max-w-2xl leading-relaxed text-[#4D423E]">
                Browse our complete manufacturing and commercial catalogue. Select the items you need, specify quantities, and instantly get your quotation. You can email the request directly to our sales team or download your quotation sheet.
              </p>
            </div>

            {/* Quick Action Buttons on Desktop */}
            <div className="flex flex-wrap items-center gap-2.5">
              {selectedCount > 0 ? (
                <>
                  <button
                    onClick={() => setQuoteModalOpen(true)}
                    className="px-4 py-2.5 text-xs font-tech font-bold rounded flex items-center gap-2 transition-all bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] shadow-md active:scale-95 tabular-nums"
                  >
                    <FileText className="w-4 h-4" />
                    <span>GET QUOTATION ({selectedCount})</span>
                  </button>

                  <button
                    onClick={handleDirectMailQuotation}
                    className="px-3.5 py-2.5 text-xs font-tech font-bold rounded border flex items-center gap-2 transition-colors bg-[#FAF4EE] border-[#D8BFA8] text-[#292321] hover:bg-[#E9D9C8] shadow-xs"
                    title="Send quotation request directly via email"
                  >
                    <Mail className="w-4 h-4 text-[#5B1018]" />
                    <span>EMAIL QUOTE</span>
                  </button>

                  <button
                    onClick={handleDownloadCsv}
                    className="px-3.5 py-2.5 text-xs font-tech font-bold rounded border flex items-center gap-2 transition-colors bg-[#FAF4EE] border-[#D8BFA8] text-[#292321] hover:bg-[#E9D9C8] shadow-xs"
                    title="Download item list as CSV spreadsheet"
                  >
                    <Download className="w-4 h-4 text-[#5B1018]" />
                    <span>DOWNLOAD</span>
                  </button>
                </>
              ) : (
                <div className="text-xs font-tech px-4 py-2.5 rounded border flex items-center gap-2 bg-[#F3E7DA] text-[#4D423E] border-[#D8BFA8]">
                  <Info className="w-4 h-4 text-[#5B1018]" />
                  <span>Select items below to generate quotation</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search & Control Filter Bar */}
        <div className="p-4 sm:p-5 rounded border mb-6 bg-[#FAF4EE] border-[#D8BFA8] shadow-xs">
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            {/* Live Search */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5A4F4B]" />
              <input
                type="text"
                placeholder="Search products by item name, model, product code, specifications, dimensions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-xs rounded border transition-colors focus:outline-none bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5A4F4B] hover:text-[#292321]"
                  title="Clear search"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Quick Filter Buttons & Counters */}
            <div className="flex flex-wrap items-center gap-2 shrink-0">
              <button
                onClick={() => setShowOnlySelected(false)}
                className={`px-3 py-2 text-xs font-tech font-bold rounded transition-colors ${
                  !showOnlySelected
                    ? 'bg-[#292321] text-[#F3E7DA]'
                    : 'bg-[#F3E7DA] text-[#4D423E] border border-[#D8BFA8] hover:bg-[#E9D9C8]'
                }`}
              >
                All Products ({products.length})
              </button>

              <button
                onClick={() => setShowOnlySelected(true)}
                className={`px-3 py-2 text-xs font-tech font-bold rounded flex items-center gap-1.5 transition-colors ${
                  showOnlySelected
                    ? 'bg-[#5B1018] text-[#F3E7DA]'
                    : 'bg-[#F3E7DA] text-[#4D423E] border border-[#D8BFA8] hover:bg-[#E9D9C8]'
                }`}
              >
                <span>Selected Items</span>
                <span
                  className={`px-1.5 py-0.2 rounded text-[10px] tabular-nums ${
                    selectedCount > 0
                      ? 'bg-[#D8BFA8] text-[#292321] font-extrabold'
                      : 'bg-[#E9D9C8] text-[#4D423E]'
                  }`}
                >
                  {selectedCount}
                </span>
              </button>

              {selectedCount > 0 && (
                <button
                  onClick={handleClearSelection}
                  className="px-2.5 py-2 text-xs font-tech text-[#5B1018] hover:underline transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Clear All</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Product Items Table */}
        <div className="rounded border overflow-hidden bg-[#FAF4EE] border-[#D8BFA8] shadow-sm">
          {/* Table Action Header */}
          <div className="p-4 border-b border-[#D8BFA8] flex flex-wrap items-center justify-between gap-3 bg-[#E9D9C8]/50">
            <div className="flex items-center gap-3">
              <button
                onClick={handleSelectAll}
                className="text-xs font-tech font-bold text-[#292321] hover:text-[#5B1018] flex items-center gap-1.5"
              >
                <input
                  type="checkbox"
                  checked={
                    filteredProducts.length > 0 &&
                    filteredProducts.every((p) => Boolean(selectedItems[p.id]))
                  }
                  onChange={handleSelectAll}
                  className="accent-[#5B1018] rounded cursor-pointer w-4 h-4"
                />
                <span>
                  {filteredProducts.length > 0 &&
                  filteredProducts.every((p) => Boolean(selectedItems[p.id]))
                    ? 'Deselect All Visible'
                    : 'Select All Visible'}
                </span>
              </button>

              <span className="text-[#D8BFA8]">|</span>

              <span className="text-xs text-[#5A4F4B] font-tech tabular-nums">
                Showing {filteredProducts.length} items
              </span>
            </div>

            {selectedCount > 0 && (
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#5B1018] font-tech tabular-nums">
                  {selectedCount} item{selectedCount > 1 ? 's' : ''} selected ({totalUnits} total unit{totalUnits > 1 ? 's' : ''})
                </span>
                <button
                  onClick={() => setQuoteModalOpen(true)}
                  className="px-3 py-1 text-xs font-tech font-bold rounded bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] transition-colors flex items-center gap-1"
                >
                  <Send className="w-3 h-3" />
                  <span>Get Quotation</span>
                </button>
              </div>
            )}
          </div>

          {/* Table Container */}
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center">
              <ClipboardList className="w-12 h-12 mx-auto text-[#B8B8B3] mb-3" />
              <h3 className="text-base font-bold font-tech uppercase mb-1 text-[#292321]">
                No Matching Products Found
              </h3>
              <p className="text-xs text-[#5A4F4B] max-w-sm mx-auto mb-4">
                {showOnlySelected
                  ? "You haven't selected any products yet. Switch back to 'All Products' to start selecting items for your quotation."
                  : 'Try searching with a different product name, model code, or keyword.'}
              </p>
              {showOnlySelected && (
                <button
                  onClick={() => setShowOnlySelected(false)}
                  className="px-4 py-2 text-xs font-tech font-bold rounded bg-[#5B1018] text-[#F3E7DA] hover:bg-[#440B11] transition-colors"
                >
                  Show All Products
                </button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b font-tech uppercase text-[11px] tracking-wider bg-[#E9D9C8] text-[#292321] border-[#D8BFA8]">
                    <th className="p-3.5 w-12 text-center">
                      <span className="sr-only">Select</span>
                    </th>
                    <th className="p-3.5 min-w-[280px]">Product / Item</th>
                    <th className="p-3.5 whitespace-nowrap">Product Code</th>
                    <th className="p-3.5 min-w-[240px]">Specifications & Dimensions</th>
                    <th className="p-3.5 w-36 text-center whitespace-nowrap">Quotation Qty</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#D8BFA8]/60 bg-white">
                  {filteredProducts.map((product) => {
                    const isSelected = Boolean(selectedItems[product.id]);
                    const quantity = selectedItems[product.id] || 1;

                    return (
                      <tr
                        key={product.id}
                        onClick={(e) => {
                          const target = e.target as HTMLElement;
                          if (
                            target.tagName === 'BUTTON' ||
                            target.tagName === 'INPUT' ||
                            target.closest('button') ||
                            target.closest('input')
                          ) {
                            return;
                          }
                          toggleSelectItem(product.id);
                        }}
                        className={`cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#5B1018]/10 hover:bg-[#5B1018]/15'
                            : 'hover:bg-[#FAF4EE]'
                        }`}
                      >
                        {/* Checkbox */}
                        <td className="p-3.5 text-center">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleSelectItem(product.id)}
                            className="accent-[#5B1018] rounded cursor-pointer w-4 h-4"
                            aria-label={`Select ${product.name}`}
                          />
                        </td>

                        {/* Product Photo & Name */}
                        <td className="p-3.5">
                          <div className="flex items-center gap-3.5">
                            {/* Product Thumbnail */}
                            <div
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedProductForDetail(product);
                              }}
                              className="w-14 h-14 shrink-0 rounded overflow-hidden border flex items-center justify-center relative group cursor-pointer bg-[#FAF4EE] border-[#D8BFA8]"
                              title="Click to view full product details"
                            >
                              {product.mainImage ? (
                                <img
                                  src={product.mainImage}
                                  alt={product.name}
                                  className="w-full h-full object-contain p-1 object-center group-hover:scale-105 transition-transform duration-200"
                                  loading="lazy"
                                />
                              ) : (
                                <Layers className="w-5 h-5 text-[#B8B8B3] group-hover:scale-110 transition-transform" />
                              )}
                              <div className="absolute inset-0 bg-[#292321]/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <Eye className="w-4 h-4 text-[#F3E7DA]" />
                              </div>
                            </div>

                            {/* Name, Model & Description */}
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2 mb-0.5">
                                <span
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    setSelectedProductForDetail(product);
                                  }}
                                  className="font-bold hover:underline cursor-pointer leading-snug text-xs sm:text-sm text-[#292321] hover:text-[#5B1018]"
                                >
                                  {product.name}
                                </span>
                              </div>

                              <div className="text-[11px] text-[#5A4F4B] flex flex-wrap items-center gap-2">
                                {product.model && (
                                  <span className="font-tech font-semibold text-[#4D423E]">
                                    Model: {product.model}
                                  </span>
                                )}
                                {product.variantOrSize && (
                                  <span>• Size: {product.variantOrSize}</span>
                                )}
                              </div>

                              {product.shortDescription && (
                                <p className="text-[11px] text-[#5A4F4B] line-clamp-1 mt-0.5">
                                  {product.shortDescription}
                                </p>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Product Code */}
                        <td className="p-3.5 whitespace-nowrap">
                          <span className="font-mono text-xs font-bold px-2.5 py-1 rounded border inline-block bg-[#FAF4EE] text-[#292321] border-[#D8BFA8]">
                            {product.productCode}
                          </span>
                        </td>

                        {/* Specifications & Dimensions */}
                        <td className="p-3.5">
                          <div className="space-y-1 text-[11px]">
                            {product.specifications?.dimensions && (
                              <div className="font-tech text-[#292321]">
                                <span className="text-[#5A4F4B] font-normal">Dims: </span>
                                <span className="font-semibold">
                                  {product.specifications.dimensions}
                                </span>
                              </div>
                            )}

                            {product.specifications?.material && (
                              <div className="text-[#4D423E] font-tech">
                                <span className="text-[#5A4F4B]">Material: </span>
                                <span>{product.specifications.material}</span>
                              </div>
                            )}

                            {product.specifications?.capacity && (
                              <div className="text-[#4D423E] font-tech">
                                <span className="text-[#5A4F4B]">Capacity: </span>
                                <span>{product.specifications.capacity}</span>
                              </div>
                            )}

                            {product.specifications?.power && (
                              <div className="text-[#4D423E] font-tech">
                                <span className="text-[#5A4F4B]">Power: </span>
                                <span>{product.specifications.power}</span>
                              </div>
                            )}

                            {!product.specifications?.dimensions &&
                              !product.specifications?.material &&
                              !product.specifications?.capacity && (
                                <span className="text-[#5A4F4B] italic">
                                  Standard commercial stainless steel specifications
                                </span>
                              )}
                          </div>
                        </td>

                        {/* Quantity Selector */}
                        <td
                          className="p-3.5 text-center whitespace-nowrap"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {isSelected ? (
                            <div className="inline-flex items-center rounded border border-[#5B1018] bg-[#FAF4EE] shadow-xs overflow-hidden">
                              <button
                                type="button"
                                onClick={() => updateQuantity(product.id, -1)}
                                className="px-2 py-1 text-[#292321] hover:bg-[#E9D9C8] transition-colors"
                                title="Decrease quantity"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <input
                                type="number"
                                min="1"
                                max="999"
                                value={quantity}
                                onChange={(e) =>
                                  setExplicitQuantity(product.id, parseInt(e.target.value, 10))
                                }
                                className="w-12 text-center text-xs font-tech font-bold bg-transparent text-[#292321] focus:outline-none border-x border-[#D8BFA8] py-1 tabular-nums"
                              />
                              <button
                                type="button"
                                onClick={() => updateQuantity(product.id, 1)}
                                className="px-2 py-1 text-[#292321] hover:bg-[#E9D9C8] transition-colors"
                                title="Increase quantity"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>
                          ) : (
                            <button
                              type="button"
                              onClick={() => toggleSelectItem(product.id)}
                              className="px-3 py-1.5 text-[11px] font-tech font-bold uppercase rounded border transition-colors bg-[#FAF4EE] hover:bg-[#5B1018] hover:text-[#F3E7DA] text-[#292321] border-[#D8BFA8]"
                            >
                              + Select
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Table Footer Notice */}
          <div className="p-4 border-t border-[#D8BFA8] bg-[#E9D9C8]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-tech text-[#5A4F4B]">
            <div>
              * Official manufacturer quotation with customized freight, GST invoicing, and volume terms will be provided upon submission.
            </div>
            <div className="flex items-center gap-3">
              <span>Direct Sales Desk: {brand.phone}</span>
              <span>•</span>
              <span>{brand.email}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Sticky Bottom Bar when items are selected */}
      {selectedCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 z-40 p-3 sm:p-4 bg-[#FAF4EE]/95 backdrop-blur-md border-t border-[#D8BFA8] shadow-2xl animate-in slide-in-from-bottom duration-200">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            {/* Selected Count & Preview */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-[#5B1018]/10 border border-[#5B1018]/30 flex items-center justify-center text-[#5B1018] font-bold">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <div className="font-extrabold text-sm sm:text-base text-[#292321] flex items-center gap-2 tabular-nums">
                  <span>{selectedCount} Products Selected</span>
                  <span className="text-xs font-normal text-[#5A4F4B]">
                    ({totalUnits} units total)
                  </span>
                </div>
                <div className="text-[11px] text-[#5A4F4B] font-tech">
                  Ready to generate quotation via Email, WhatsApp, or Download.
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
              <button
                onClick={handleDirectMailQuotation}
                className="flex-1 sm:flex-initial px-3.5 py-2 text-xs font-tech font-bold uppercase rounded border flex items-center justify-center gap-1.5 transition-colors bg-white border-[#D8BFA8] text-[#292321] hover:bg-[#E9D9C8] shadow-xs"
                title="Send quotation request via your email application"
              >
                <Mail className="w-3.5 h-3.5 text-[#5B1018]" />
                <span>Mail Quotation</span>
              </button>

              <button
                onClick={handleWhatsAppQuotation}
                className="flex-1 sm:flex-initial px-3.5 py-2 text-xs font-tech font-bold uppercase rounded border border-[#292321] bg-[#292321] text-[#F3E7DA] hover:bg-[#5B1018] hover:border-[#5B1018] transition-colors flex items-center justify-center gap-1.5"
                title="Send quotation request via WhatsApp"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>

              <button
                onClick={() => setQuoteModalOpen(true)}
                className="flex-1 sm:flex-initial px-5 py-2 text-xs font-tech font-bold uppercase tracking-wider rounded bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] shadow-md transition-all flex items-center justify-center gap-1.5 active:scale-95"
              >
                <FileText className="w-4 h-4" />
                <span>Get Quotation Now</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Quotation Review & Dispatch Modal */}
      {quoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-[#292321]/80 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="rounded-sm max-w-3xl w-full p-5 sm:p-7 shadow-2xl relative max-h-[92vh] overflow-y-auto border transition-colors bg-[#FAF4EE] border-[#D8BFA8] text-[#292321]">
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D8BFA8]">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded bg-[#5B1018]/10 text-[#5B1018] border border-[#5B1018]/25">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-black uppercase tracking-tight text-[#292321]">
                    Official Quotation Request
                  </h3>
                  <div className="text-[11px] font-mono text-[#5A4F4B]">
                    Ref: {quotationRefNumber} • {new Date().toLocaleDateString('en-IN')}
                  </div>
                </div>
              </div>

              <button
                onClick={() => setQuoteModalOpen(false)}
                className="p-1.5 rounded-sm hover:bg-[#E9D9C8] text-[#5A4F4B] hover:text-[#292321] transition-colors"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {quoteSentSuccess ? (
              <div className="py-10 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#5B1018]/10 text-[#5B1018] flex items-center justify-center">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-bold uppercase text-[#292321]">
                  Quotation Request Prepared!
                </h4>
                <p className="text-xs text-[#4D423E] max-w-md mx-auto">
                  Your quotation inquiry for {selectedCount} items ({totalUnits} units) has been compiled. Our commercial sales engineering desk will contact you with wholesale pricing and technical sheets.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
                  <button
                    onClick={handleDirectMailQuotation}
                    className="px-4 py-2 text-xs font-tech font-bold rounded bg-[#292321] text-[#F3E7DA] hover:bg-[#5B1018] transition-colors flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    <span>Open in Email App</span>
                  </button>
                  <button
                    onClick={handleWhatsAppQuotation}
                    className="px-4 py-2 text-xs font-tech font-bold rounded bg-[#5B1018] text-[#F3E7DA] hover:bg-[#440B11] transition-colors flex items-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send via WhatsApp</span>
                  </button>
                  <button
                    onClick={() => {
                      setQuoteSentSuccess(false);
                      setQuoteModalOpen(false);
                    }}
                    className="px-4 py-2 text-xs font-tech font-bold rounded border border-[#D8BFA8] bg-[#F3E7DA] text-[#292321] hover:bg-[#E9D9C8] transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* Selected Products Table Preview */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-tech font-bold uppercase tracking-wider text-[#5A4F4B] tabular-nums">
                      Selected Items ({selectedCount} items, {totalUnits} units)
                    </span>
                    <button
                      onClick={handleCopyQuotation}
                      className="text-xs font-tech text-[#5B1018] hover:underline flex items-center gap-1 font-semibold"
                    >
                      {copiedSummary ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#5B1018]" />
                          <span>Copied to Clipboard!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Summary</span>
                        </>
                      )}
                    </button>
                  </div>

                  <div className="rounded border max-h-56 overflow-y-auto bg-white border-[#D8BFA8]">
                    <table className="w-full text-left text-xs">
                      <thead>
                        <tr className="border-b text-[10px] font-tech uppercase bg-[#E9D9C8] text-[#292321] border-[#D8BFA8]">
                          <th className="p-2.5">Item</th>
                          <th className="p-2.5">Code</th>
                          <th className="p-2.5">Specs</th>
                          <th className="p-2.5 text-center">Qty</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#D8BFA8]/60">
                        {selectedProductList.map((item, idx) => (
                          <tr key={item.product.id}>
                            <td className="p-2.5 font-bold text-[#292321]">
                              {idx + 1}. {item.product.name}
                            </td>
                            <td className="p-2.5 font-mono text-[11px] text-[#5A4F4B]">
                              {item.product.productCode}
                            </td>
                            <td className="p-2.5 text-[11px] text-[#4D423E] line-clamp-1">
                              {item.product.specifications?.dimensions ||
                                item.product.model ||
                                'Standard'}
                            </td>
                            <td className="p-2.5 text-center font-bold font-tech text-[#5B1018] tabular-nums">
                              {item.quantity}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Customer Details Form */}
                <div>
                  <span className="text-[11px] font-tech font-bold uppercase tracking-wider text-[#5A4F4B] block mb-2">
                    Your Contact Details (Optional for Direct Inquiries)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <label className="block text-[10px] font-tech uppercase text-[#5A4F4B] mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Rajesh Kumar"
                        value={clientDetails.name}
                        onChange={(e) =>
                          setClientDetails({ ...clientDetails, name: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded border focus:outline-none bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-tech uppercase text-[#5A4F4B] mb-1">
                        Company / Hotel / Restaurant Name
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Royal Sweets & Banquet"
                        value={clientDetails.company}
                        onChange={(e) =>
                          setClientDetails({ ...clientDetails, company: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded border focus:outline-none bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-tech uppercase text-[#5A4F4B] mb-1">
                        Phone / Mobile
                      </label>
                      <input
                        type="tel"
                        placeholder="e.g. +91 98765 43210"
                        value={clientDetails.phone}
                        onChange={(e) =>
                          setClientDetails({ ...clientDetails, phone: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded border focus:outline-none bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-tech uppercase text-[#5A4F4B] mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. purchase@company.com"
                        value={clientDetails.email}
                        onChange={(e) =>
                          setClientDetails({ ...clientDetails, email: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded border focus:outline-none bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-tech uppercase text-[#5A4F4B] mb-1">
                        City / Delivery State
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Mumbai, Maharashtra"
                        value={clientDetails.city}
                        onChange={(e) =>
                          setClientDetails({ ...clientDetails, city: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded border focus:outline-none bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
                      />
                    </div>

                    <div>
                      <label className="block text-[10px] font-tech uppercase text-[#5A4F4B] mb-1">
                        Custom Specifications / Remarks
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Require SS 304 grade certification, urgency 10 days"
                        value={clientDetails.notes}
                        onChange={(e) =>
                          setClientDetails({ ...clientDetails, notes: e.target.value })
                        }
                        className="w-full px-3 py-2 rounded border focus:outline-none bg-white border-[#D8BFA8] text-[#292321] placeholder:text-[#B8B8B3] focus:border-[#5B1018]"
                      />
                    </div>
                  </div>
                </div>

                {/* Primary Action Dispatch Buttons */}
                <div className="pt-4 border-t border-[#D8BFA8] space-y-3">
                  <span className="text-[11px] font-tech font-bold uppercase tracking-wider text-[#5A4F4B] block">
                    Choose How You Would Like to Get or Send Your Quotation:
                  </span>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {/* Option 1: Mail Quotation */}
                    <button
                      onClick={handleDirectMailQuotation}
                      className="p-3.5 rounded border border-[#D8BFA8] bg-[#F3E7DA] hover:bg-[#E9D9C8] text-[#292321] font-tech font-bold text-xs uppercase flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95"
                    >
                      <Mail className="w-5 h-5 text-[#5B1018]" />
                      <span>Mail Quotation Request</span>
                      <span className="text-[10px] font-normal text-[#5A4F4B]">
                        To: {brand.email}
                      </span>
                    </button>

                    {/* Option 2: WhatsApp Quotation */}
                    <button
                      onClick={handleWhatsAppQuotation}
                      className="p-3.5 rounded border border-[#5B1018] bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] font-tech font-bold text-xs uppercase flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95"
                    >
                      <MessageSquare className="w-5 h-5" />
                      <span>Send via WhatsApp</span>
                      <span className="text-[10px] font-normal opacity-80">
                        Direct to Sales Team
                      </span>
                    </button>

                    {/* Option 3: Download / Print Quotation Sheet */}
                    <button
                      onClick={handleDownloadCsv}
                      className="p-3.5 rounded border font-tech font-bold text-xs uppercase flex flex-col items-center justify-center gap-1.5 transition-all active:scale-95 border-[#D8BFA8] bg-white hover:bg-[#E9D9C8] text-[#292321]"
                    >
                      <Download className="w-5 h-5 text-[#5B1018]" />
                      <span>Download Quotation</span>
                      <span className="text-[10px] font-normal text-[#5A4F4B]">
                        CSV / Spreadsheet File
                      </span>
                    </button>
                  </div>

                  <div className="flex items-center justify-between pt-2">
                    <button
                      onClick={handlePrintQuotation}
                      className="text-xs font-tech text-[#5A4F4B] hover:text-[#292321] flex items-center gap-1"
                    >
                      <Printer className="w-3.5 h-3.5" />
                      <span>Print Quotation Sheet</span>
                    </button>

                    <button
                      onClick={() => setQuoteSentSuccess(true)}
                      className="px-4 py-2 text-xs font-tech font-bold rounded bg-[#292321] text-[#F3E7DA] hover:bg-[#5B1018] transition-colors"
                    >
                      Submit In-App Request
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
