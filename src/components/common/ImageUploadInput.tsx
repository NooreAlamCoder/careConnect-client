'use client';

import React, { useState, useRef } from 'react';
import { UploadCloud, Link as LinkIcon, Image as ImageIcon, X, Check, Loader2 } from 'lucide-react';
import toast from 'react-hot-toast';

interface ImageUploadInputProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  required?: boolean;
}

export const ImageUploadInput: React.FC<ImageUploadInputProps> = ({
  value,
  onChange,
  label = 'Event Thumbnail Image',
  required = true,
}) => {
  const [tab, setTab] = useState<'upload' | 'url'>('upload');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Compress and convert image to clean Base64 Data URL
  const processImageFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload a valid image file (PNG, JPG, WebP, etc.)');
      return;
    }

    // Limit raw file to 10MB
    if (file.size > 10 * 1024 * 1024) {
      toast.error('Image size must be less than 10MB');
      return;
    }

    setIsProcessing(true);
    const reader = new FileReader();

    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        // Create canvas to resize to reasonable max dimension for fast DB storage and instant loading
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 800;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.82);
          onChange(compressedDataUrl);
          toast.success('Image uploaded & optimized successfully!');
        } else {
          onChange(e.target?.result as string);
        }
        setIsProcessing(false);
      };
      img.onerror = () => {
        toast.error('Failed to process image');
        setIsProcessing(false);
      };
      img.src = e.target?.result as string;
    };

    reader.onerror = () => {
      toast.error('Error reading file');
      setIsProcessing(false);
    };

    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processImageFile(files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      processImageFile(files[0]);
    }
  };

  const clearImage = () => {
    onChange('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="space-y-3">
      {/* Header with Label and Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <label className="block text-xs font-semibold uppercase tracking-wider text-foreground-muted">
          {label} {required && '*'}
        </label>

        {/* Mode Switcher Tabs */}
        <div className="inline-flex rounded-lg bg-surface-secondary p-1 border border-border self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setTab('upload')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
              tab === 'upload'
                ? 'bg-surface text-primary shadow-sm font-semibold'
                : 'text-foreground-muted hover:text-foreground'
            }`}
          >
            <UploadCloud className="w-3.5 h-3.5" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setTab('url')}
            className={`flex items-center gap-1.5 px-3 py-1 text-xs font-medium rounded-md transition-all cursor-pointer ${
              tab === 'url'
                ? 'bg-surface text-primary shadow-sm font-semibold'
                : 'text-foreground-muted hover:text-foreground'
            }`}
          >
            <LinkIcon className="w-3.5 h-3.5" />
            <span>Image Link</span>
          </button>
        </div>
      </div>

      {/* Tab 1: Upload from Device */}
      {tab === 'upload' && (
        <div>
          {value ? (
            /* Image Selected Preview Card */
            <div className="relative rounded-2xl overflow-hidden border border-border bg-surface-secondary/40 p-3 group">
              <div className="relative w-full h-52 sm:h-64 rounded-xl overflow-hidden bg-surface-secondary">
                <img
                  src={value}
                  alt="Thumbnail preview"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 right-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-1.5 rounded-lg bg-black/70 hover:bg-black text-white text-xs font-medium backdrop-blur-md transition-colors cursor-pointer"
                  >
                    Change
                  </button>
                  <button
                    type="button"
                    onClick={clearImage}
                    className="p-1.5 rounded-lg bg-red-500/80 hover:bg-red-500 text-white backdrop-blur-md transition-colors cursor-pointer"
                    title="Remove Image"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="absolute bottom-3 left-3">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-600/90 text-white shadow-md backdrop-blur-sm">
                    <Check className="w-3 h-3" />
                    <span>Image Ready</span>
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Upload Drop Area */
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 ${
                isDragging
                  ? 'border-primary bg-primary/10 scale-[1.01]'
                  : 'border-border hover:border-primary/60 bg-surface-secondary/30 hover:bg-surface-secondary/60'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />

              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                  {isProcessing ? (
                    <Loader2 className="w-7 h-7 animate-spin" />
                  ) : (
                    <UploadCloud className="w-7 h-7" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {isProcessing ? 'Optimizing Image...' : 'Click to browse or drag & drop image'}
                  </p>
                  <p className="text-xs text-foreground-muted mt-1">
                    Supports PNG, JPG, JPEG, WebP, GIF (Max 10MB)
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Paste Image URL */}
      {tab === 'url' && (
        <div className="space-y-3">
          <div className="relative">
            <ImageIcon className="w-5 h-5 text-foreground-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="url"
              value={value.startsWith('data:') ? '' : value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="https://images.unsplash.com/photo-..."
              className="w-full pl-11 pr-4 py-3 rounded-xl border border-border bg-surface-secondary text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
            />
          </div>

          {/* URL Live Preview if valid */}
          {value && !value.startsWith('data:') && (
            <div className="relative w-full h-44 rounded-xl overflow-hidden border border-border bg-surface-secondary">
              <img
                src={value}
                alt="URL Preview"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    'https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&w=800&q=80';
                }}
              />
              <button
                type="button"
                onClick={clearImage}
                className="absolute top-2 right-2 p-1.5 rounded-lg bg-black/60 hover:bg-black text-white transition-colors"
                title="Clear"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};


// Drag and drop file listeners

// Fallback URL preview card
