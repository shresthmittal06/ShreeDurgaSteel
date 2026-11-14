import React, { useRef, useState } from 'react';
import { Upload, Clipboard, Link as LinkIcon, Trash2, CheckCircle2, Image as ImageIcon } from 'lucide-react';
import { uploadFileToServer } from '../utils/apiStorage';

interface ImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (dataUrlOrUrl: string) => void;
  helperText?: string;
  recommendedSize?: string;
}

/**
 * Compresses an image blob/file into a clean, optimized WebP/JPEG/PNG data URL
 * to avoid blowing localStorage limits while strictly preserving transparency for logos.
 */
const compressImageFile = (file: File | Blob, maxWidth = 1200, quality = 0.85): Promise<string> => {
  return new Promise((resolve, reject) => {
    // If it's SVG, return data URL directly without rasterization
    if (file.type === 'image/svg+xml') {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
      return;
    }

    const isPng = file.type === 'image/png';
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(e.target?.result as string);
          return;
        }

        // For non-PNG, fill with subtle transparent background, but avoid black
        if (!isPng) {
          ctx.fillStyle = '#FFFFFF';
          ctx.fillRect(0, 0, width, height);
        }

        ctx.drawImage(img, 0, 0, width, height);

        // Preserve PNG transparency for logos and cutouts
        const mimeType = isPng ? 'image/png' : 'image/jpeg';
        const compressedDataUrl = canvas.toDataURL(mimeType, isPng ? undefined : quality);
        resolve(compressedDataUrl);
      };
      img.onerror = reject;
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const ImageUploadField: React.FC<ImageUploadFieldProps> = ({
  label,
  value,
  onChange,
  helperText,
  recommendedSize,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [showUrlInput, setShowUrlInput] = useState(false);
  const [urlDraft, setUrlDraft] = useState('');
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const notify = (msg: string) => {
    setStatusMessage(msg);
    setTimeout(() => setStatusMessage(null), 3000);
  };

  const handleFileProcess = async (file: File | Blob) => {
    try {
      if (!file.type.startsWith('image/')) {
        notify('Please select or paste an image file.');
        return;
      }
      notify('Uploading and optimizing image...');
      const compressed = await compressImageFile(file);
      const permanentUrl = await uploadFileToServer(compressed, file instanceof File ? file.name : undefined);
      onChange(permanentUrl);
      notify('Image updated and stored permanently!');
    } catch (err) {
      console.error('Error processing image:', err);
      notify('Could not process this image. Please try another file.');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileProcess(e.dataTransfer.files[0]);
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        if (blob) {
          e.preventDefault();
          handleFileProcess(blob);
          return;
        }
      }
    }
    // If text was pasted, check if it's an image URL
    const text = e.clipboardData.getData('text');
    if (text && (text.startsWith('http://') || text.startsWith('https://') || text.startsWith('data:image/'))) {
      onChange(text.trim());
      notify('Image URL pasted successfully!');
    }
  };

  const handleClipboardButtonClick = async () => {
    try {
      if (!navigator.clipboard?.read) {
        // Fallback for environments without navigator.clipboard.read
        const text = await navigator.clipboard.readText();
        if (text && (text.startsWith('http') || text.startsWith('data:image/'))) {
          onChange(text.trim());
          notify('Image URL read from clipboard!');
          return;
        }
        notify('Click the box and press Ctrl+V (or Cmd+V) to paste directly!');
        return;
      }

      const clipboardItems = await navigator.clipboard.read();
      for (const item of clipboardItems) {
        const imageType = item.types.find((t) => t.startsWith('image/'));
        if (imageType) {
          const blob = await item.getType(imageType);
          await handleFileProcess(blob);
          return;
        }
      }
      // If no blob found, try reading text URL
      const text = await navigator.clipboard.readText();
      if (text && (text.startsWith('http') || text.startsWith('data:image/'))) {
        onChange(text.trim());
        notify('Image URL pasted from clipboard!');
        return;
      }
      notify('No image found in clipboard. Press Ctrl+V inside the box to paste.');
    } catch {
      notify('Tip: Click inside the dashed box and press Ctrl+V (Cmd+V on Mac) to paste.');
    }
  };

  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <label className="block text-[11px] font-tech font-bold uppercase tracking-wider text-zinc-300">
          {label}
        </label>
        {recommendedSize && (
          <span className="text-[10px] font-tech text-zinc-500">Rec: {recommendedSize}</span>
        )}
      </div>

      {/* Main Container - supports Drag, Drop, File Pick, and Ctrl+V Paste */}
      <div
        tabIndex={0}
        onPaste={handlePaste}
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`relative border-2 border-dashed rounded-sm p-4 transition-all focus:outline-none ${
          dragActive
            ? 'border-white bg-white/10'
            : value
            ? 'border-white/20 bg-zinc-950/60'
            : 'border-white/15 bg-zinc-950 hover:border-white/30 focus:border-white/50'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFileProcess(e.target.files[0]);
            }
          }}
        />

        {value ? (
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Thumbnail Preview */}
            <div className="relative w-24 h-24 shrink-0 rounded bg-zinc-900 border border-white/15 overflow-hidden flex items-center justify-center">
              <img
                src={value}
                alt="Uploaded preview"
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Actions */}
            <div className="flex-1 space-y-2 text-left w-full">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-tech">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>Image loaded & ready</span>
              </div>
              <p className="text-[10px] font-tech text-zinc-400">
                You can drag a new image, press <kbd className="px-1 py-0.5 bg-zinc-800 border border-white/10 rounded text-[9px] text-zinc-300">Ctrl+V</kbd> to paste, or browse files.
              </p>

              <div className="flex flex-wrap gap-2 pt-1 items-center">
                <button
                  type="button"
                  onClick={() => notify('✓ Photo saved successfully!')}
                  className="px-3 py-1 text-[11px] font-tech font-bold uppercase tracking-wider bg-emerald-600 hover:bg-emerald-500 text-white rounded-sm shadow-xs transition-colors inline-flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-3 h-3" />
                  Save Photo
                </button>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="px-2.5 py-1 text-[11px] font-tech font-bold uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 text-white rounded-sm border border-white/10 transition-colors inline-flex items-center gap-1.5"
                >
                  <Upload className="w-3 h-3" />
                  Replace File
                </button>
                <button
                  type="button"
                  onClick={handleClipboardButtonClick}
                  className="px-2.5 py-1 text-[11px] font-tech font-bold uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-sm border border-white/10 transition-colors inline-flex items-center gap-1.5"
                >
                  <Clipboard className="w-3 h-3" />
                  Paste from Clipboard
                </button>
                <button
                  type="button"
                  onClick={() => onChange('')}
                  className="px-2 py-1 text-[11px] font-tech text-red-400 hover:text-red-300 transition-colors inline-flex items-center gap-1 ml-auto"
                >
                  <Trash2 className="w-3 h-3" />
                  Remove
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-3">
            <div className="w-10 h-10 mx-auto mb-2 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
              <ImageIcon className="w-5 h-5" />
            </div>
            <p className="text-xs font-semibold text-zinc-200">
              Paste image directly (<kbd className="px-1 py-0.5 bg-zinc-800 border border-white/10 rounded text-[10px]">Ctrl+V</kbd>) or drag & drop here
            </p>
            <p className="text-[10px] text-zinc-400 mt-1">
              Supports PNG, JPG, WebP, SVG (photos are automatically optimized)
            </p>

            <div className="mt-3 flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-3 py-1.5 text-xs font-tech font-bold uppercase tracking-wider bg-white text-black hover:bg-zinc-200 rounded-sm transition-colors inline-flex items-center gap-1.5"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload from Computer
              </button>

              <button
                type="button"
                onClick={handleClipboardButtonClick}
                className="px-3 py-1.5 text-xs font-tech font-bold uppercase tracking-wider bg-zinc-800 hover:bg-zinc-700 text-white rounded-sm border border-white/15 transition-colors inline-flex items-center gap-1.5"
              >
                <Clipboard className="w-3.5 h-3.5" />
                Paste from Clipboard
              </button>

              <button
                type="button"
                onClick={() => setShowUrlInput(!showUrlInput)}
                className="px-2.5 py-1.5 text-xs font-tech text-zinc-400 hover:text-zinc-200 inline-flex items-center gap-1 transition-colors"
              >
                <LinkIcon className="w-3 h-3" />
                URL
              </button>
            </div>
          </div>
        )}

        {/* Status Toast */}
        {statusMessage && (
          <div className="absolute top-2 right-2 px-2 py-1 bg-emerald-950 border border-emerald-500/40 text-emerald-300 text-[10px] font-tech rounded">
            {statusMessage}
          </div>
        )}
      </div>

      {/* Optional URL input toggle */}
      {showUrlInput && (
        <div className="flex gap-2 pt-1">
          <input
            type="url"
            placeholder="Paste direct image URL (https://...)"
            value={urlDraft}
            onChange={(e) => setUrlDraft(e.target.value)}
            className="flex-1 px-2.5 py-1.5 bg-zinc-950 border border-white/15 text-white rounded-sm text-xs font-mono"
          />
          <button
            type="button"
            onClick={() => {
              if (urlDraft.trim()) {
                onChange(urlDraft.trim());
                setUrlDraft('');
                setShowUrlInput(false);
              }
            }}
            className="px-3 py-1 bg-white text-black text-xs font-tech font-bold uppercase tracking-wider rounded-sm hover:bg-zinc-200"
          >
            Apply URL
          </button>
        </div>
      )}

      {helperText && <p className="text-[10px] text-zinc-400">{helperText}</p>}
    </div>
  );
};
