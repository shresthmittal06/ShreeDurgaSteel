import React, { useRef, useState } from 'react';
import { FileText, Upload, Trash2, Download, Plus, FileSpreadsheet } from 'lucide-react';
import { uploadFileToServer } from '../utils/apiStorage';

export interface DocumentItem {
  title: string;
  type: string;
  size?: string;
  url?: string;
  fileData?: string;
  fileName?: string;
}

interface DocumentUploadFieldProps {
  documents: DocumentItem[];
  onChange: (docs: DocumentItem[]) => void;
}

export const DocumentUploadField: React.FC<DocumentUploadFieldProps> = ({ documents = [], onChange }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [showAddManual, setShowAddManual] = useState(false);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    const reader = new FileReader();

    const formattedSize =
      file.size > 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.round(file.size / 1024)} KB`;

    reader.onload = async (event) => {
      const base64Data = event.target?.result as string;
      const docType = file.name.split('.').pop()?.toUpperCase() || 'PDF';

      let permanentUrl = '';
      try {
        permanentUrl = await uploadFileToServer(base64Data, file.name, 'documents');
      } catch (err) {
        console.warn('Server document upload failed:', err);
      }

      const newDoc: DocumentItem = {
        title: file.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ').toUpperCase(),
        type: docType,
        size: formattedSize,
        url: permanentUrl || undefined,
        fileData: permanentUrl ? undefined : base64Data,
        fileName: file.name,
      };

      onChange([...documents, newDoc]);
      if (fileInputRef.current) fileInputRef.current.value = '';
    };

    reader.readAsDataURL(file);
  };

  const handleAddUrlDoc = () => {
    if (!newTitle.trim()) return;
    const newDoc: DocumentItem = {
      title: newTitle.trim(),
      type: 'PDF',
      size: 'Online Spec',
      url: newUrl.trim() || undefined,
    };
    onChange([...documents, newDoc]);
    setNewTitle('');
    setNewUrl('');
    setShowAddManual(false);
  };

  const handleRemove = (index: number) => {
    onChange(documents.filter((_, i) => i !== index));
  };

  const handleDownload = (doc: DocumentItem) => {
    const targetUrl = doc.url || doc.fileData;
    if (targetUrl) {
      const link = document.createElement('a');
      link.href = targetUrl;
      link.download = doc.fileName || `${doc.title}.${doc.type.toLowerCase()}`;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div>
          <label className="block text-[11px] font-tech font-bold uppercase tracking-wider text-zinc-300">
            Product Documents & Specification Sheets
          </label>
          <span className="text-[10px] text-zinc-400">
            Upload spec sheet PDFs, CAD dimension diagrams, manuals, or brochure links
          </span>
        </div>
        <div className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.doc,.docx,.xls,.xlsx,.dwg,.png,.jpg"
            className="hidden"
            onChange={handleFileUpload}
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-2.5 py-1 bg-white text-black hover:bg-zinc-200 text-xs font-tech font-bold uppercase tracking-wider rounded-sm inline-flex items-center gap-1.5 transition-colors"
          >
            <Upload className="w-3 h-3" />
            Upload File (PDF/Doc)
          </button>
          <button
            type="button"
            onClick={() => setShowAddManual(!showAddManual)}
            className="px-2 py-1 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-xs font-tech rounded-sm inline-flex items-center gap-1 border border-white/10"
          >
            <Plus className="w-3 h-3" />
            Add Link
          </button>
        </div>
      </div>

      {/* Manual Link Input */}
      {showAddManual && (
        <div className="p-3 bg-zinc-950 border border-white/15 rounded-sm space-y-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <input
              type="text"
              placeholder="Document Title (e.g., Installation Guide)"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="px-2.5 py-1.5 bg-zinc-900 border border-white/15 text-white rounded-sm text-xs"
            />
            <input
              type="url"
              placeholder="Document URL (https://...)"
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              className="px-2.5 py-1.5 bg-zinc-900 border border-white/15 text-white rounded-sm text-xs font-mono"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setShowAddManual(false)}
              className="px-2.5 py-1 text-xs text-zinc-400 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleAddUrlDoc}
              className="px-3 py-1 bg-white text-black text-xs font-tech font-bold uppercase tracking-wider rounded-sm hover:bg-zinc-200"
            >
              Save Document
            </button>
          </div>
        </div>
      )}

      {/* Document List */}
      {documents.length > 0 ? (
        <div className="divide-y divide-white/10 border border-white/15 rounded-sm bg-zinc-950">
          {documents.map((doc, idx) => (
            <div key={idx} className="p-2.5 flex items-center justify-between text-xs hover:bg-white/[0.02]">
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-7 h-7 rounded bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 text-zinc-300 font-tech font-bold text-[10px]">
                  {doc.type === 'XLS' || doc.type === 'XLSX' ? (
                    <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <FileText className="w-3.5 h-3.5 text-zinc-300" />
                  )}
                </div>
                <div className="min-w-0">
                  <div className="text-white font-medium truncate">{doc.title}</div>
                  <div className="text-[10px] text-zinc-500 font-tech uppercase">
                    {doc.type} {doc.size ? `• ${doc.size}` : ''} {doc.fileData ? '• Uploaded File' : ''}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {(doc.fileData || doc.url) && (
                  <button
                    type="button"
                    onClick={() => handleDownload(doc)}
                    className="p-1.5 text-zinc-400 hover:text-white transition-colors"
                    title="Download / View"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => handleRemove(idx)}
                  className="p-1.5 text-zinc-500 hover:text-red-400 transition-colors"
                  title="Remove"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="p-3 bg-zinc-950/60 border border-dashed border-white/10 rounded-sm text-center text-xs text-zinc-500">
          No documents attached yet. Click "Upload File" to attach spec sheets, sizing diagrams, or blueprints.
        </div>
      )}
    </div>
  );
};
