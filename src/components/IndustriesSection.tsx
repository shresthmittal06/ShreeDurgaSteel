import React, { useState, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { PartyLogo } from '../types';
import {
  Upload,
  Plus,
  Trash2,
  Edit2,
  Image as ImageIcon,
  Check,
  X,
  RotateCcw,
  ExternalLink,
} from 'lucide-react';

export const IndustriesSection: React.FC = () => {
  const {
    partyLogos,
    updatePartyLogo,
    addPartyLogo,
    deletePartyLogo,
    setPartyLogos,
  } = useContent();

  // State for modal / edit dialog
  const [editingParty, setEditingParty] = useState<PartyLogo | null>(null);
  const [editName, setEditName] = useState('');
  const [editUrl, setEditUrl] = useState('');
  const [editWebsite, setEditWebsite] = useState('');
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [notification, setNotification] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [activeUploadId, setActiveUploadId] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Handle direct file upload from computer
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, partyId: string) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select an image file (PNG, JPG, SVG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        updatePartyLogo(partyId, {
          logoUrl: result,
          name: editingParty?.id === partyId ? editName : undefined,
        });
        showNotification('Party logo uploaded successfully');
      }
    };
    reader.readAsDataURL(file);
    e.target.value = '';
  };

  // Handle drag and drop on a specific card
  const handleDrop = (e: React.DragEvent<HTMLDivElement>, partyId: string) => {
    e.preventDefault();
    setDragOverId(null);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please drop an image file (PNG, JPG, SVG, WebP).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (uploadEvent) => {
      const result = uploadEvent.target?.result as string;
      if (result) {
        updatePartyLogo(partyId, { logoUrl: result });
        showNotification('Party logo dropped and uploaded successfully');
      }
    };
    reader.readAsDataURL(file);
  };

  const triggerUploadFor = (partyId: string) => {
    setActiveUploadId(partyId);
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const openEditModal = (party: PartyLogo) => {
    setEditingParty(party);
    setEditName(party.name || '');
    setEditUrl(party.logoUrl || '');
    setEditWebsite(party.websiteUrl || '');
  };

  const saveEditModal = () => {
    if (!editingParty) return;
    updatePartyLogo(editingParty.id, {
      name: editName.trim() || 'Party / Client Partner',
      logoUrl: editUrl.trim(),
      websiteUrl: editWebsite.trim(),
    });
    setEditingParty(null);
    showNotification('Party details updated');
  };

  const handleResetSlots = () => {
    if (window.confirm('Reset all party logo slots to default blank slots?')) {
      const defaultSlots: PartyLogo[] = Array.from({ length: 12 }, (_, i) => ({
        id: `party-${Date.now()}-${i}`,
        name: `Party / Client ${i + 1}`,
        logoUrl: '',
      }));
      setPartyLogos(defaultSlots);
      showNotification('Slots reset to defaults');
    }
  };

  return (
    <section
      id="parties-logos-section"
      className="py-12 border-t bg-[#F3E7DA] border-[#D8BFA8] transition-colors"
    >
      {/* Hidden file input for one-click upload */}
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          if (activeUploadId) {
            handleFileChange(e, activeUploadId);
          }
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle Top Utility Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            {notification && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-tech font-bold text-[#F3E7DA] bg-[#5B1018] border border-[#5B1018] rounded-xs animate-in fade-in">
                <Check className="w-3.5 h-3.5" />
                {notification}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 ml-auto">
            <button
              onClick={() => addPartyLogo()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-tech font-bold uppercase tracking-wider rounded-xs border transition-colors bg-[#FAF4EE] hover:bg-[#5B1018] text-[#292321] hover:text-[#F3E7DA] border-[#D8BFA8] hover:border-[#5B1018] shadow-xs group"
              title="Add another party slot"
            >
              <Plus className="w-3.5 h-3.5 text-[#5B1018] group-hover:text-[#F3E7DA]" />
              <span>Add Party Slot</span>
            </button>

            <button
              onClick={handleResetSlots}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-tech text-[#4D423E] hover:text-[#292321] rounded-xs border bg-[#FAF4EE] border-[#D8BFA8] transition-colors"
              title="Reset slots"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Small Modular Sections / Logo Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
          {partyLogos.map((party) => {
            const hasLogo = Boolean(party.logoUrl && party.logoUrl.trim());
            const isDragging = dragOverId === party.id;

            return (
              <div
                key={party.id}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOverId(party.id);
                }}
                onDragLeave={() => setDragOverId(null)}
                onDrop={(e) => handleDrop(e, party.id)}
                className={`relative group h-32 sm:h-36 rounded-xs p-3 flex flex-col items-center justify-center transition-all duration-200 ${
                  isDragging
                    ? 'border-2 border-dashed border-[#5B1018] bg-[#5B1018]/10 scale-102 shadow-md'
                    : hasLogo
                    ? 'bg-[#FAF4EE] border border-[#D8BFA8] shadow-xs hover:border-[#5B1018] hover:shadow-md'
                    : 'bg-[#FAF4EE]/80 border-2 border-dashed border-[#D8BFA8] hover:border-[#5B1018] hover:bg-[#FAF4EE]'
                }`}
              >
                {hasLogo ? (
                  <>
                    <div className="w-full h-full flex items-center justify-center p-2">
                      <img
                        src={party.logoUrl}
                        alt={party.name || 'Party Logo'}
                        className="max-h-16 max-w-[90%] object-contain filter drop-shadow-xs transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {party.name && (
                      <span
                        className="text-[10px] font-tech truncate max-w-[90%] px-1 text-center font-medium text-[#4D423E]"
                        title={party.name}
                      >
                        {party.name}
                      </span>
                    )}

                    {/* Hover Action Overlay */}
                    <div className="absolute inset-0 bg-[#292321]/80 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity rounded-xs flex items-center justify-center gap-2 p-2">
                      <button
                        onClick={() => triggerUploadFor(party.id)}
                        className="p-1.5 bg-[#FAF4EE]/20 hover:bg-[#5B1018] text-[#F3E7DA] rounded-xs transition-colors shadow-xs"
                        title="Upload new image"
                      >
                        <Upload className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => openEditModal(party)}
                        className="p-1.5 bg-[#FAF4EE]/20 hover:bg-[#D8BFA8] text-[#F3E7DA] hover:text-[#292321] rounded-xs transition-colors shadow-xs"
                        title="Edit name & URL"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>

                      <button
                        onClick={() => {
                          if (window.confirm(`Delete logo for ${party.name || 'this party'}?`)) {
                            updatePartyLogo(party.id, { logoUrl: '' });
                            showNotification('Logo removed');
                          }
                        }}
                        className="p-1.5 bg-[#FAF4EE]/20 hover:bg-[#5B1018] text-[#F3E7DA] rounded-xs transition-colors shadow-xs"
                        title="Clear logo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </>
                ) : (
                  <div
                    onClick={() => triggerUploadFor(party.id)}
                    className="w-full h-full flex flex-col items-center justify-center text-center cursor-pointer p-2 select-none group/slot"
                  >
                    <div className="w-9 h-9 rounded-full flex items-center justify-center mb-2 transition-transform duration-200 group-hover/slot:scale-110 bg-[#E9D9C8] text-[#4D423E] group-hover/slot:bg-[#5B1018] group-hover/slot:text-[#F3E7DA]">
                      <Upload className="w-4 h-4" />
                    </div>

                    <span className="text-[11px] font-tech font-bold uppercase tracking-wider text-[#292321]">
                      Upload Logo
                    </span>

                    <span className="text-[9px] font-tech mt-0.5 text-[#5A4F4B]">
                      Click or drop image
                    </span>

                    <div
                      className="absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-1"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <button
                        onClick={() => openEditModal(party)}
                        className="p-1 rounded-xs transition-colors bg-[#E9D9C8] hover:bg-[#D8BFA8] text-[#292321]"
                        title="Enter image URL / Name"
                      >
                        <Edit2 className="w-3 h-3" />
                      </button>
                      {partyLogos.length > 4 && (
                        <button
                          onClick={() => deletePartyLogo(party.id)}
                          className="p-1 rounded-xs bg-[#5B1018]/10 hover:bg-[#5B1018] text-[#5B1018] hover:text-[#F3E7DA] transition-colors"
                          title="Remove slot"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}

          {/* Add Another Slot Button */}
          <button
            onClick={() => addPartyLogo()}
            className="h-32 sm:h-36 rounded-xs border-2 border-dashed flex flex-col items-center justify-center p-3 transition-all duration-200 border-[#D8BFA8] hover:border-[#5B1018] hover:bg-[#FAF4EE] text-[#4D423E]"
          >
            <div className="w-8 h-8 rounded-full flex items-center justify-center mb-1.5 transition-transform bg-[#E9D9C8] text-[#5B1018]">
              <Plus className="w-4 h-4" />
            </div>
            <span className="text-[11px] font-tech font-bold uppercase tracking-wider text-[#292321]">
              Add Slot
            </span>
            <span className="text-[9px] font-tech mt-0.5 text-[#5A4F4B]">
              For new party logo
            </span>
          </button>
        </div>
      </div>

      {/* Edit Party Details / Paste Image URL Modal */}
      {editingParty && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#292321]/75 backdrop-blur-xs animate-in fade-in">
          <div className="w-full max-w-md p-6 rounded-xs border shadow-2xl bg-[#FAF4EE] border-[#D8BFA8] text-[#292321]">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#D8BFA8]">
              <div className="flex items-center gap-2">
                <ImageIcon className="w-4 h-4 text-[#5B1018]" />
                <h3 className="text-sm font-tech font-bold uppercase tracking-wider text-[#292321]">
                  Party / Client Logo Details
                </h3>
              </div>
              <button
                onClick={() => setEditingParty(null)}
                className="p-1 rounded-xs text-[#4D423E] hover:text-[#5B1018]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-tech font-semibold mb-1 text-[#4D423E]">
                  Party / Client Name
                </label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  placeholder="e.g. Haldiram, Taj Hotels, Bikanervala"
                  className="w-full px-3 py-2 text-xs font-tech border rounded-xs outline-none focus:border-[#5B1018] bg-white border-[#D8BFA8] text-[#292321]"
                />
              </div>

              <div>
                <label className="block text-xs font-tech font-semibold mb-1 text-[#4D423E]">
                  Logo Image URL (Or upload directly)
                </label>
                <input
                  type="text"
                  value={editUrl}
                  onChange={(e) => setEditUrl(e.target.value)}
                  placeholder="https://example.com/logo.png"
                  className="w-full px-3 py-2 text-xs font-tech border rounded-xs outline-none focus:border-[#5B1018] bg-white border-[#D8BFA8] text-[#292321]"
                />
                <p className="text-[10px] text-[#5A4F4B] mt-1">
                  You can also click the slot on the page to choose an image file from your device.
                </p>
              </div>

              {/* Quick file upload button inside modal */}
              <div>
                <label className="block text-xs font-tech font-semibold mb-1 text-[#4D423E]">
                  Upload File From Computer
                </label>
                <label className="inline-flex items-center gap-2 px-3 py-2 text-xs font-tech font-bold uppercase tracking-wider rounded-xs border cursor-pointer bg-[#F3E7DA] hover:bg-[#E9D9C8] border-[#D8BFA8] text-[#292321]">
                  <Upload className="w-3.5 h-3.5 text-[#5B1018]" />
                  <span>Choose Image File</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      const reader = new FileReader();
                      reader.onload = (uploadEvent) => {
                        const result = uploadEvent.target?.result as string;
                        if (result) {
                          setEditUrl(result);
                        }
                      };
                      reader.readAsDataURL(file);
                    }}
                  />
                </label>
              </div>

              {editUrl && (
                <div className="p-3 rounded-xs border flex items-center justify-center h-20 bg-white border-[#D8BFA8]">
                  <img
                    src={editUrl}
                    alt="Preview"
                    className="max-h-16 max-w-full object-contain"
                  />
                </div>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 mt-6 pt-4 border-t border-[#D8BFA8]">
              <button
                onClick={() => setEditingParty(null)}
                className="px-3 py-1.5 text-xs font-tech rounded-xs border border-[#D8BFA8] text-[#4D423E] hover:bg-[#F3E7DA]"
              >
                Cancel
              </button>
              <button
                onClick={saveEditModal}
                className="px-4 py-1.5 text-xs font-tech font-bold uppercase tracking-wider bg-[#5B1018] hover:bg-[#440B11] text-[#F3E7DA] rounded-xs shadow-xs"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
