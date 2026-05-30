"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FileImage, 
  Upload, 
  Trash2, 
  Download, 
  Maximize2, 
  Settings, 
  RefreshCw, 
  ShieldCheck, 
  Info,
  Layers,
  FileDown,
  RotateCw,
  Sliders,
  Columns,
  Eye
} from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";

interface CompressedFile {
  id: string;
  file: File;
  name: string;
  originalSize: number;
  originalUrl: string;
  rotatedOriginalUrl: string | null;
  compressedSize: number | null;
  compressedUrl: string | null;
  compressedBlob: Blob | null;
  status: "idle" | "compressing" | "success" | "error";
  originalWidth: number | null;
  originalHeight: number | null;
  compressedWidth: number | null;
  compressedHeight: number | null;
  reduction: number | null;
  rotation: number;
}

function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}

export default function ImageCompressorClient() {
  const [files, setFiles] = useState<CompressedFile[]>([]);
  const [quality, setQuality] = useState<number>(0.75);
  const [format, setFormat] = useState<"original" | "image/jpeg" | "image/webp" | "image/png">("original");
  const [scale, setScale] = useState<number>(100);
  const [activeFileId, setActiveFileId] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [isProcessingAll, setIsProcessingAll] = useState(false);
  const [comparisonMode, setComparisonMode] = useState<"slider" | "side-by-side" | "toggle">("slider");
  const [isHovered, setIsHovered] = useState(false);

  // Revoke Object URLs to prevent memory leaks
  const revokeUrls = useCallback((fileObj: CompressedFile) => {
    if (fileObj.originalUrl) {
      URL.revokeObjectURL(fileObj.originalUrl);
    }
    if (fileObj.compressedUrl) {
      URL.revokeObjectURL(fileObj.compressedUrl);
    }
    if (fileObj.rotatedOriginalUrl && fileObj.rotatedOriginalUrl !== fileObj.originalUrl) {
      URL.revokeObjectURL(fileObj.rotatedOriginalUrl);
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      files.forEach(revokeUrls);
    };
  }, [files, revokeUrls]);

  // Core compression engine utilizing Canvas
  const compressSingleImage = useCallback(
    async (fileObj: CompressedFile, currentQuality: number, currentFormat: typeof format, currentScale: number): Promise<CompressedFile> => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = new Image();
          img.onload = async () => {
            let width = img.width;
            let height = img.height;
            const rotation = fileObj.rotation || 0;

            // Apply scaling factor
            if (currentScale < 100) {
              width = Math.round((width * currentScale) / 100);
              height = Math.round((height * currentScale) / 100);
            }

            // Compute canvas dimensions based on rotation
            const isOddRotation = rotation % 180 !== 0;
            const targetWidth = isOddRotation ? height : width;
            const targetHeight = isOddRotation ? width : height;

            const canvas = document.createElement("canvas");
            canvas.width = targetWidth;
            canvas.height = targetHeight;
            const ctx = canvas.getContext("2d");

            if (!ctx) {
              resolve({
                ...fileObj,
                status: "error",
              });
              return;
            }

            // Apply rotation transformation
            ctx.translate(targetWidth / 2, targetHeight / 2);
            ctx.rotate((rotation * Math.PI) / 180);
            ctx.drawImage(img, -width / 2, -height / 2, width, height);

            // Determine target format mime-type
            let mimeType = fileObj.file.type;
            if (currentFormat !== "original") {
              mimeType = currentFormat;
            }

            const useQuality = (mimeType === "image/jpeg" || mimeType === "image/webp") ? currentQuality : undefined;

            // Helper to generate the compressed blob
            const getCompressedBlob = () => {
              return new Promise<Blob | null>((res) => {
                canvas.toBlob((blob) => res(blob), mimeType, useQuality);
              });
            };

            // Helper to generate a rotated original image blob (at 100% quality and 100% scale) for matching slider comparison
            const getRotatedOriginalUrl = (): Promise<string> => {
              if (rotation === 0) {
                return Promise.resolve(fileObj.originalUrl);
              }
              return new Promise<string>((res) => {
                const origCanvas = document.createElement("canvas");
                const origWidth = img.width;
                const origHeight = img.height;
                const targetOrigWidth = isOddRotation ? origHeight : origWidth;
                const targetOrigHeight = isOddRotation ? origWidth : origHeight;

                origCanvas.width = targetOrigWidth;
                origCanvas.height = targetOrigHeight;
                const origCtx = origCanvas.getContext("2d");

                if (!origCtx) {
                  res(fileObj.originalUrl);
                  return;
                }

                origCtx.translate(targetOrigWidth / 2, targetOrigHeight / 2);
                origCtx.rotate((rotation * Math.PI) / 180);
                origCtx.drawImage(img, -origWidth / 2, -origHeight / 2, origWidth, origHeight);

                origCanvas.toBlob((blob) => {
                  if (blob) {
                    res(URL.createObjectURL(blob));
                  } else {
                    res(fileObj.originalUrl);
                  }
                }, fileObj.file.type);
              });
            };

            const [compressedBlob, rotatedOriginalUrl] = await Promise.all([
              getCompressedBlob(),
              getRotatedOriginalUrl()
            ]);

            if (compressedBlob) {
              // Revoke previous compressed URL if it existed
              if (fileObj.compressedUrl) {
                URL.revokeObjectURL(fileObj.compressedUrl);
              }
              // Revoke previous rotated original URL if it was custom
              if (fileObj.rotatedOriginalUrl && fileObj.rotatedOriginalUrl !== fileObj.originalUrl) {
                URL.revokeObjectURL(fileObj.rotatedOriginalUrl);
              }

              const newCompressedUrl = URL.createObjectURL(compressedBlob);
              const newSize = compressedBlob.size;
              const reduction = Math.max(0, Math.round(((fileObj.originalSize - newSize) / fileObj.originalSize) * 100));

              resolve({
                ...fileObj,
                compressedSize: newSize,
                compressedUrl: newCompressedUrl,
                compressedBlob,
                compressedWidth: targetWidth,
                compressedHeight: targetHeight,
                rotatedOriginalUrl,
                reduction,
                status: "success",
              });
            } else {
              resolve({
                ...fileObj,
                status: "error",
              });
            }
          };
          img.onerror = () => {
            resolve({
              ...fileObj,
              status: "error",
            });
          };
          img.src = event.target?.result as string;
        };
        reader.onerror = () => {
          resolve({
            ...fileObj,
            status: "error",
          });
        };
        reader.readAsDataURL(fileObj.file);
      });
    },
    []
  );

  const addFiles = useCallback(
    (newFiles: File[]) => {
      const allowedTypes = ["image/jpeg", "image/png", "image/webp"];
      const validatedFiles = newFiles.filter((file) => allowedTypes.includes(file.type));

      if (validatedFiles.length === 0) return;

      const preparedFiles: CompressedFile[] = validatedFiles.map((file) => {
        const id = Math.random().toString(36).substring(2, 9);
        const originalUrl = URL.createObjectURL(file);

        // Pre-fetch original image dimensions
        const img = new Image();
        img.src = originalUrl;
        img.onload = () => {
          setFiles((current) =>
            current.map((item) =>
              item.id === id
                ? {
                    ...item,
                    originalWidth: img.width,
                    originalHeight: img.height,
                  }
                : item
            )
          );
        };

        return {
          id,
          file,
          name: file.name,
          originalSize: file.size,
          originalUrl,
          rotatedOriginalUrl: originalUrl,
          compressedSize: null,
          compressedUrl: null,
          compressedBlob: null,
          status: "idle",
          originalWidth: null,
          originalHeight: null,
          compressedWidth: null,
          compressedHeight: null,
          reduction: null,
          rotation: 0,
        };
      });

      setFiles((current) => {
        const updated = [...current, ...preparedFiles];
        // Automatically select the first file as active if none was selected
        if (!activeFileId && updated.length > 0) {
          setActiveFileId(updated[0].id);
        }
        return updated;
      });
    },
    [activeFileId]
  );

  // Drag and drop event handlers
  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      if (e.dataTransfer.files && e.dataTransfer.files[0]) {
        addFiles(Array.from(e.dataTransfer.files));
      }
    },
    [addFiles]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files && e.target.files[0]) {
        addFiles(Array.from(e.target.files));
      }
    },
    [addFiles]
  );

  // Paste shortcut integration
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent) => {
      const items = e.clipboardData?.items;
      if (!items) return;
      const pastedFiles: File[] = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].type.indexOf("image") !== -1) {
          const file = items[i].getAsFile();
          if (file) pastedFiles.push(file);
        }
      }
      if (pastedFiles.length > 0) {
        addFiles(pastedFiles);
      }
    };
    window.addEventListener("paste", handlePaste);
    return () => window.removeEventListener("paste", handlePaste);
  }, [addFiles]);

  // Remove a single file
  const removeFile = useCallback(
    (id: string) => {
      setFiles((current) => {
        const target = current.find((f) => f.id === id);
        if (target) {
          revokeUrls(target);
        }
        const updated = current.filter((f) => f.id !== id);
        if (activeFileId === id) {
          setActiveFileId(updated.length > 0 ? updated[0].id : null);
        }
        return updated;
      });
    },
    [activeFileId, revokeUrls]
  );

  // Clear all files and wipe states
  const clearAll = useCallback(() => {
    files.forEach(revokeUrls);
    setFiles([]);
    setActiveFileId(null);
  }, [files, revokeUrls]);

  // Integrated visual rotation handler
  const rotateFile = useCallback(
    (id: string) => {
      setFiles((current) =>
        current.map((item) => {
          if (item.id === id) {
            const nextRotation = ((item.rotation || 0) + 90) % 360;
            const updatedItem: CompressedFile = { 
              ...item, 
              rotation: nextRotation,
              status: item.status === "success" ? "compressing" : item.status 
            };
            
            if (item.status === "success") {
              compressSingleImage(updatedItem, quality, format, scale).then((result) => {
                setFiles((curr) => curr.map((f) => f.id === id ? result : f));
              });
            }
            return updatedItem;
          }
          return item;
        })
      );
    },
    [quality, format, scale, compressSingleImage]
  );

  // Compress specific file or batch
  const processCompression = useCallback(
    async (targetId?: string) => {
      setIsProcessingAll(true);
      
      const filesToProcess = targetId 
        ? files.filter(f => f.id === targetId)
        : files;

      // Set target files to compressing status
      setFiles(current => 
        current.map(f => 
          filesToProcess.some(p => p.id === f.id)
            ? { ...f, status: "compressing" as const }
            : f
        )
      );

      // Execute compression sequentially to avoid UI thread block
      for (const item of filesToProcess) {
        const result = await compressSingleImage(item, quality, format, scale);
        setFiles(current =>
          current.map(f => f.id === item.id ? result : f)
        );
      }

      setIsProcessingAll(false);
    },
    [files, quality, format, scale, compressSingleImage]
  );

  // Trigger compression automatically when options change and files exist
  useEffect(() => {
    if (files.length > 0 && files.some(f => f.status === "success")) {
      const reprocess = async () => {
        // Only re-compress files that have already been compressed once
        const compressedList = files.filter(f => f.status === "success");
        for (const item of compressedList) {
          const result = await compressSingleImage(item, quality, format, scale);
          setFiles(current => current.map(f => f.id === item.id ? result : f));
        }
      };
      reprocess();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quality, format, scale]);

  // Handle single file download
  const downloadSingle = useCallback((fileObj: CompressedFile) => {
    if (!fileObj.compressedUrl) return;

    const a = document.createElement("a");
    a.href = fileObj.compressedUrl;
    
    const originalName = fileObj.name;
    const dotIndex = originalName.lastIndexOf(".");
    const baseName = dotIndex !== -1 ? originalName.substring(0, dotIndex) : originalName;
    
    let ext = fileObj.file.type.split("/")[1];
    if (format !== "original") {
      ext = format.split("/")[1];
    }
    if (ext === "jpeg") ext = "jpg";

    a.download = `${baseName}-optimized.${ext}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }, [format]);

  // Sequence download files for batch save without popup block
  const downloadAll = useCallback(() => {
    const successfulFiles = files.filter((f) => f.status === "success");
    successfulFiles.forEach((fileObj, index) => {
      setTimeout(() => {
        downloadSingle(fileObj);
      }, index * 250);
    });
  }, [files, downloadSingle]);

  const activeFile = files.find((f) => f.id === activeFileId);
  const totalSavedSize = files.reduce((acc, curr) => {
    if (curr.compressedSize) {
      return acc + (curr.originalSize - curr.compressedSize);
    }
    return acc;
  }, 0);

  const averageReduction = files.filter(f => f.reduction !== null).length > 0
    ? Math.round(
        files.reduce((acc, curr) => acc + (curr.reduction || 0), 0) / 
        files.filter(f => f.reduction !== null).length
      )
    : 0;

  return (
    <main id="main-content" className="min-h-screen bg-[var(--bg-dark)] text-foreground flex flex-col justify-between selection:bg-brand-primary selection:text-black">
      <div>
        <Navbar />

        <div className="pt-36 pb-24 px-4 relative overflow-hidden">
          {/* Ambient visual flows and tech grids */}
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none" />
          <div className="absolute bottom-20 left-20 w-[300px] h-[300px] bg-cyan-500/5 rounded-full blur-[100px] pointer-events-none" />
          
          {/* Background grid wireframe overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_40%,transparent_100%)]" />

          <div className="container-main max-w-5xl mx-auto relative z-10">
            {/* Header section with geometric elements */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4">
                <FileImage size={12} className="animate-pulse" />
                Browser Utility
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Smart Image <span className="text-brand-primary">Compressor</span>
              </h1>
              <p className="text-foreground/50 max-w-2xl mx-auto text-sm md:text-base leading-relaxed mb-6">
                Reduce image file sizes instantly inside your browser canvas thread. Custom scale sizes, format outputs, and optimize your assets with zero data leaving your device.
              </p>

              {/* Strict Privacy Assurance Banner */}
              <div className="inline-flex items-center gap-2.5 px-4 py-3 bg-white/[0.01] border border-white/[0.06] backdrop-blur-xl text-foreground/70 max-w-2xl mx-auto text-[11px] text-left leading-normal rounded-xl">
                <ShieldCheck size={16} className="text-brand-primary shrink-0" />
                <span>
                  <strong className="text-white">Strict Privacy Architecture</strong>: Compression is 100% local. Your files are never uploaded to any server. Refreshing or closing this page instantly and permanently purges all active files from memory.
                </span>
              </div>
            </motion.div>

            {/* Empty Upload State */}
            {files.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="max-w-2xl mx-auto"
              >
                <div
                  onDragEnter={handleDrag}
                  onDragOver={handleDrag}
                  onDragLeave={handleDrag}
                  onDrop={handleDrop}
                  className={`relative group cursor-pointer border-2 border-dashed ${
                    dragActive 
                      ? "border-brand-primary bg-brand-primary/5 shadow-[0_0_40px_rgba(26,109,214,0.15)]" 
                      : "border-white/10 bg-white/[0.01] hover:border-white/20"
                  } rounded-3xl p-12 text-center transition-all duration-500 overflow-hidden`}
                >
                  {/* Decorative corner brackets for tech HUD styling */}
                  <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-white/20 group-hover:border-brand-primary/50 transition-colors" />
                  <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-white/20 group-hover:border-brand-primary/50 transition-colors" />
                  <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-white/20 group-hover:border-brand-primary/50 transition-colors" />
                  <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-white/20 group-hover:border-brand-primary/50 transition-colors" />

                  <input
                    type="file"
                    multiple
                    accept="image/jpeg,image/png,image/webp"
                    onChange={handleFileInput}
                    id="file-input"
                    className="hidden"
                  />
                  <label htmlFor="file-input" className="cursor-pointer block">
                    <div className="w-16 h-16 rounded-2xl bg-white/[0.03] border border-white/[0.08] flex items-center justify-center mx-auto mb-6 group-hover:scale-105 group-hover:border-brand-primary/30 transition-all duration-300">
                      <Upload size={24} className="text-foreground/50 group-hover:text-brand-primary transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 group-hover:text-white transition-colors">
                      Drag & Drop Images Here
                    </h3>
                    <p className="text-xs text-foreground/40 max-w-sm mx-auto leading-relaxed mb-4">
                      Supports PNG, JPEG, and WebP formats. Upload multiple files at once.
                    </p>
                    <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-white/[0.04] hover:bg-white/[0.08] text-xs font-semibold text-white tracking-wide rounded-full border border-white/[0.06] transition-all">
                      Browse Files
                    </span>
                  </label>
                  
                  {/* Clipboard hint */}
                  <div className="mt-8 text-[10px] text-foreground/30 font-mono flex items-center justify-center gap-1.5">
                    <Info size={11} />
                    <span>PRO TIP: You can also copy and PASTE image files directly!</span>
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Active Workspace Workspace Grid */
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Left Side Panel: Queue, Settings, Stats (7 Columns) */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Stats Counter HUD */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="grid grid-cols-3 gap-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 backdrop-blur-xl"
                  >
                    <div className="text-center py-2 relative">
                      <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-white/[0.08]" />
                      <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider mb-1">Queue</p>
                      <p className="text-2xl font-bold font-mono text-white">{files.length}</p>
                    </div>
                    <div className="text-center py-2 relative">
                      <div className="absolute right-0 top-1/4 bottom-1/4 w-[1px] bg-white/[0.08]" />
                      <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider mb-1">Average Savings</p>
                      <p className="text-2xl font-bold font-mono text-green-400">{averageReduction}%</p>
                    </div>
                    <div className="text-center py-2">
                      <p className="text-[10px] font-bold text-foreground/40 uppercase tracking-wider mb-1">Total Freed</p>
                      <p className="text-2xl font-bold font-mono text-cyan-400">{formatBytes(totalSavedSize)}</p>
                    </div>
                  </motion.div>

                  {/* Settings HUD Box */}
                  <div className="glass-strong border border-white/[0.06] rounded-3xl p-6 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl pointer-events-none" />
                    
                    <div className="flex items-center gap-2 mb-6">
                      <Settings size={16} className="text-brand-primary" />
                      <h2 className="text-xs font-bold uppercase tracking-widest text-white">Global Compression Configuration</h2>
                    </div>

                    <div className="space-y-6">
                      
                      {/* Quality Slider */}
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <label className="text-xs font-bold text-foreground/70 uppercase tracking-wider">Compression Quality</label>
                          <span className="text-xs font-mono font-bold text-white bg-white/[0.05] border border-white/[0.08] px-2.5 py-0.5 rounded-md">
                            {Math.round(quality * 100)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min="0.1"
                          max="1.0"
                          step="0.05"
                          value={quality}
                          onChange={(e) => setQuality(parseFloat(e.target.value))}
                          className="w-full h-1 bg-white/[0.08] rounded-full appearance-none cursor-pointer accent-brand-primary outline-none"
                        />
                        <div className="flex justify-between text-[10px] text-foreground/30 font-mono mt-1.5">
                          <span>Max Compress</span>
                          <span>Balanced</span>
                          <span>High Quality</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Target Format */}
                        <div>
                          <label className="text-[10px] font-bold text-foreground/70 uppercase tracking-widest mb-2 block">Convert Format</label>
                          <select
                            value={format}
                            onChange={(e) => setFormat(e.target.value as typeof format)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-foreground focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
                          >
                            <option value="original">Original Format</option>
                            <option value="image/jpeg">JPEG (.jpg)</option>
                            <option value="image/webp">WebP (.webp)</option>
                            <option value="image/png">PNG (.png - Lossless)</option>
                          </select>
                        </div>

                        {/* Scaling Down Dimensions */}
                        <div>
                          <label className="text-[10px] font-bold text-foreground/70 uppercase tracking-widest mb-2 block">Scale Dimensions</label>
                          <select
                            value={scale}
                            onChange={(e) => setScale(parseInt(e.target.value))}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-foreground focus:border-brand-primary/50 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all"
                          >
                            <option value="100">100% (Original Dimensions)</option>
                            <option value="75">75% (Scale Down)</option>
                            <option value="50">50% (Half Dimensions)</option>
                            <option value="25">25% (Quarter Dimensions)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Upload queue list */}
                  <div className="glass-strong border border-white/[0.06] rounded-3xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-2">
                        <Layers size={16} className="text-brand-primary" />
                        <h2 className="text-xs font-bold uppercase tracking-widest text-white">Active Queue ({files.length})</h2>
                      </div>
                      <div className="flex items-center gap-2">
                        {files.some(f => f.status === "idle") && (
                          <button
                            onClick={() => processCompression()}
                            disabled={isProcessingAll}
                            className="px-3.5 py-1.5 bg-gradient-to-r from-brand-primary to-brand-light text-white rounded-lg font-bold text-[10px] uppercase tracking-wider hover:shadow-[0_0_20px_rgba(26,109,214,0.3)] transition-all disabled:opacity-50"
                          >
                            Compress All
                          </button>
                        )}
                        {files.every(f => f.status === "success") && (
                          <button
                            onClick={downloadAll}
                            className="px-3.5 py-1.5 bg-white/[0.03] hover:bg-white/[0.08] text-white border border-white/[0.08] rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all inline-flex items-center gap-1.5"
                          >
                            <FileDown size={11} />
                            Download All
                          </button>
                        )}
                        <button
                          onClick={clearAll}
                          className="px-3.5 py-1.5 bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 rounded-lg font-bold text-[10px] uppercase tracking-wider transition-all"
                        >
                          Clear
                        </button>
                      </div>
                    </div>

                    <div className="space-y-3 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
                      <AnimatePresence initial={false}>
                        {files.map((fileObj) => {
                          const isActive = fileObj.id === activeFileId;
                          return (
                            <motion.div
                              key={fileObj.id}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 10 }}
                              onClick={() => setActiveFileId(fileObj.id)}
                              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setActiveFileId(fileObj.id); } }}
                              role="button"
                              tabIndex={0}
                              className={`p-4 border cursor-pointer rounded-xl flex items-center justify-between gap-4 transition-all duration-300 ${
                                isActive 
                                  ? "border-brand-primary/50 bg-brand-primary/[0.03] shadow-[inset_0_0_15px_rgba(26,109,214,0.05)]" 
                                  : "border-white/[0.04] bg-white/[0.01] hover:border-white/10 hover:bg-white/[0.03]"
                              }`}
                            >
                              <div className="flex items-center gap-3 overflow-hidden">
                                <div className="w-10 h-10 rounded-lg border border-white/10 bg-black/40 overflow-hidden flex items-center justify-center shrink-0">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img
                                    src={fileObj.originalUrl}
                                    alt="Thumbnail"
                                    loading="lazy"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="overflow-hidden">
                                  <p className="text-xs font-bold text-white truncate max-w-[150px] sm:max-w-[200px]">{fileObj.name}</p>
                                  <div className="flex items-center gap-2 mt-0.5 text-[10px] text-foreground/40 font-mono">
                                    <span>{formatBytes(fileObj.originalSize)}</span>
                                    {fileObj.originalWidth && (
                                      <>
                                        <span>•</span>
                                        <span>{fileObj.originalWidth}x{fileObj.originalHeight}</span>
                                      </>
                                    )}
                                  </div>
                                </div>
                              </div>

                              <div className="flex items-center gap-3 shrink-0">
                                {fileObj.status === "idle" && (
                                  <span className="text-[9px] font-bold tracking-wider text-foreground/40 uppercase bg-white/[0.04] border border-white/[0.08] px-2.5 py-1 rounded">
                                    Idle
                                  </span>
                                )}
                                
                                {fileObj.status === "compressing" && (
                                  <span className="text-[9px] font-bold tracking-wider text-brand-primary uppercase bg-brand-primary/10 border border-brand-primary/20 px-2.5 py-1 rounded flex items-center gap-1">
                                    <RefreshCw size={8} className="animate-spin" />
                                    Optimizing
                                  </span>
                                )}

                                {fileObj.status === "error" && (
                                  <span className="text-[9px] font-bold tracking-wider text-red-400 uppercase bg-red-400/10 border border-red-400/20 px-2.5 py-1 rounded">
                                    Failed
                                  </span>
                                )}

                                {fileObj.status === "success" && (
                                  <div className="flex items-center gap-2">
                                    <div className="text-right">
                                      <p className="text-xs font-bold font-mono text-[#10b981]">{formatBytes(fileObj.compressedSize || 0)}</p>
                                      <p className="text-[9px] font-bold font-mono text-green-400">-{fileObj.reduction}%</p>
                                    </div>
                                    <button
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        downloadSingle(fileObj);
                                      }}
                                      className="w-7 h-7 rounded-lg bg-brand-primary/10 hover:bg-brand-primary/20 border border-brand-primary/20 flex items-center justify-center text-brand-primary transition-colors"
                                      aria-label="Download individual file"
                                    >
                                      <Download size={12} />
                                    </button>
                                  </div>
                                )}

                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeFile(fileObj.id);
                                  }}
                                  className="w-7 h-7 rounded-lg bg-red-500/5 hover:bg-red-500/15 border border-red-500/10 hover:border-red-500/20 flex items-center justify-center text-foreground/40 hover:text-red-400 transition-all"
                                  aria-label="Remove file"
                                >
                                  <Trash2 size={12} />
                                </button>
                              </div>
                            </motion.div>
                          );
                        })}
                      </AnimatePresence>
                    </div>

                    {/* Drag Zone Fallback overlay */}
                    <div className="mt-4 pt-4 border-t border-white/[0.04] text-center">
                      <label htmlFor="file-input-extra" className="text-[10px] text-foreground/50 hover:text-white cursor-pointer transition-colors">
                        + Add more files to queue
                      </label>
                      <input
                        type="file"
                        multiple
                        accept="image/jpeg,image/png,image/webp"
                        onChange={handleFileInput}
                        id="file-input-extra"
                        className="hidden"
                      />
                    </div>
                  </div>
                </div>

                {/* Right Side Panel: Before/After Comparison Preview Slider (5 Columns) */}
                <div className="lg:col-span-5">
                  <div className="glass-strong border border-white/[0.06] rounded-3xl p-6 sticky top-36">
                    <div className="flex items-center gap-2 mb-6 justify-between">
                      <div className="flex items-center gap-2">
                        <Maximize2 size={16} className="text-brand-primary" />
                        <h2 className="text-xs font-bold uppercase tracking-widest text-white">Visual Quality Audit</h2>
                      </div>
                      {activeFile && activeFile.status === "idle" && (
                        <button
                          onClick={() => processCompression(activeFile.id)}
                          className="px-2.5 py-1 bg-brand-primary/10 border border-brand-primary/20 hover:bg-brand-primary/20 text-brand-primary rounded-lg font-bold text-[9px] uppercase tracking-wider transition-all"
                        >
                          Compress Single
                        </button>
                      )}
                    </div>

                    {activeFile ? (
                      <div className="space-y-6">
                        
                        {/* Interactive Toolbar for Live Workspace Controls */}
                        <div className="flex items-center justify-between gap-4 p-2 bg-black/40 border border-white/[0.06] rounded-2xl">
                          <button
                            onClick={() => rotateFile(activeFile.id)}
                            aria-label="Rotate Image 90° Clockwise"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-bold text-foreground/70 hover:text-brand-primary bg-white/[0.02] hover:bg-white/[0.06] border border-white/[0.08] hover:border-brand-primary/30 rounded-xl transition-all duration-300"
                          >
                            <RotateCw size={12} className="animate-hover-spin" />
                            Rotate 90°
                          </button>

                          <div className="flex items-center gap-1 bg-white/[0.02] border border-white/[0.08] p-1 rounded-xl">
                            <button
                              onClick={() => setComparisonMode("slider")}
                              className={`p-1.5 rounded-lg transition-all duration-200 ${
                                comparisonMode === "slider"
                                  ? "bg-brand-primary text-white shadow-[0_0_10px_rgba(26,109,214,0.3)]"
                                  : "text-foreground/50 hover:text-white hover:bg-white/[0.04]"
                              }`}
                              aria-label="Slider Mode"
                            >
                              <Sliders size={12} />
                            </button>
                            <button
                              onClick={() => setComparisonMode("side-by-side")}
                              className={`p-1.5 rounded-lg transition-all duration-200 ${
                                comparisonMode === "side-by-side"
                                  ? "bg-brand-primary text-white shadow-[0_0_10px_rgba(26,109,214,0.3)]"
                                  : "text-foreground/50 hover:text-white hover:bg-white/[0.04]"
                              }`}
                              aria-label="Side by Side Mode"
                            >
                              <Columns size={12} />
                            </button>
                            <button
                              onClick={() => setComparisonMode("toggle")}
                              className={`p-1.5 rounded-lg transition-all duration-200 ${
                                comparisonMode === "toggle"
                                  ? "bg-brand-primary text-white shadow-[0_0_10px_rgba(26,109,214,0.3)]"
                                  : "text-foreground/50 hover:text-white hover:bg-white/[0.04]"
                              }`}
                              aria-label="Quick Toggle Mode"
                            >
                              <Eye size={12} />
                            </button>
                          </div>
                        </div>

                        {/* Interactive comparison workspace */}
                        <div className="relative aspect-[4/3] w-full bg-black/40 border border-white/10 rounded-2xl overflow-hidden flex items-center justify-center shadow-2xl">
                          
                          {/* SLIDER COMPARISON MODE */}
                          {comparisonMode === "slider" && (
                            <>
                              {/* Original Image (bottom layer) */}
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={activeFile.rotatedOriginalUrl || activeFile.originalUrl}
                                alt="Original Preview"
                                loading="lazy"
                                className="absolute max-h-full max-w-full object-contain pointer-events-none select-none p-1"
                              />
                              <span className="absolute top-4 left-4 z-20 px-2 py-1 bg-black/80 border border-white/10 text-[9px] font-bold text-white uppercase tracking-wider rounded font-mono">
                                Before ({formatBytes(activeFile.originalSize)})
                              </span>

                              {/* Compressed Image (clipped top layer) */}
                              <div
                                className="absolute inset-0 flex items-center justify-center pointer-events-none p-1"
                                style={{
                                  clipPath: `polygon(0 0, ${sliderPos}% 0, ${sliderPos}% 100%, 0 100%)`,
                                }}
                              >
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={activeFile.compressedUrl || activeFile.rotatedOriginalUrl || activeFile.originalUrl}
                                  alt="Optimized Preview"
                                  loading="lazy"
                                  className="max-h-full max-w-full object-contain pointer-events-none select-none"
                                />
                              </div>
                              <span className="absolute top-4 right-4 z-20 px-2 py-1 bg-brand-primary text-white border border-white/10 text-[9px] font-bold uppercase tracking-wider rounded font-mono">
                                After ({activeFile.compressedSize ? formatBytes(activeFile.compressedSize) : "Waiting"})
                              </span>

                              {/* Divider Line */}
                              <div
                                className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-brand-primary to-brand-light pointer-events-none z-30 shadow-[0_0_10px_rgba(26,109,214,0.5)]"
                                style={{ left: `${sliderPos}%` }}
                              >
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black border border-brand-primary text-brand-primary flex items-center justify-center shadow-[0_0_20px_rgba(0,0,0,0.8)] cursor-ew-resize">
                                  <span className="text-[10px] font-bold font-mono tracking-tighter select-none">↔</span>
                                </div>
                              </div>

                              {/* Invisible range control capturing touch/mouse gestures */}
                              <input
                                type="range"
                                min="0"
                                max="100"
                                value={sliderPos}
                                onChange={(e) => setSliderPos(Number(e.target.value))}
                                className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-40"
                              />
                            </>
                          )}

                          {/* SIDE BY SIDE MODE */}
                          {comparisonMode === "side-by-side" && (
                            <div className="w-full h-full grid grid-cols-2 gap-1 p-2">
                              {/* Left Side: Original */}
                              <div className="relative w-full h-full border border-white/[0.04] bg-black/20 rounded-xl overflow-hidden flex flex-col items-center justify-center p-1">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={activeFile.rotatedOriginalUrl || activeFile.originalUrl}
                                  alt="Original Side-by-Side"
                                  loading="lazy"
                                  className="max-h-[80%] max-w-full object-contain pointer-events-none select-none"
                                />
                                <span className="absolute bottom-2 left-2 z-10 px-2 py-0.5 bg-black/80 border border-white/10 text-[8px] font-bold text-white uppercase tracking-wider rounded font-mono">
                                  Before ({formatBytes(activeFile.originalSize)})
                                </span>
                              </div>

                              {/* Right Side: Optimized */}
                              <div className="relative w-full h-full border border-white/[0.04] bg-black/20 rounded-xl overflow-hidden flex flex-col items-center justify-center p-1">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                  src={activeFile.compressedUrl || activeFile.rotatedOriginalUrl || activeFile.originalUrl}
                                  alt="Optimized Side-by-Side"
                                  loading="lazy"
                                  className="max-h-[80%] max-w-full object-contain pointer-events-none select-none"
                                />
                                <span className="absolute bottom-2 right-2 z-10 px-2 py-0.5 bg-brand-primary text-white border border-white/10 text-[8px] font-bold uppercase tracking-wider rounded font-mono">
                                  After ({activeFile.compressedSize ? formatBytes(activeFile.compressedSize) : "Waiting"})
                                </span>
                              </div>
                            </div>
                          )}

                          {/* QUICK TOGGLE MODE */}
                          {comparisonMode === "toggle" && (
                            <div 
                              className="relative w-full h-full flex items-center justify-center cursor-pointer p-2 select-none group"
                              onMouseEnter={() => setIsHovered(true)}
                              onMouseLeave={() => setIsHovered(false)}
                              onTouchStart={() => setIsHovered(true)}
                              onTouchEnd={() => setIsHovered(false)}
                              onClick={() => setIsHovered(prev => !prev)}
                              onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setIsHovered(prev => !prev); } }}
                              role="button"
                              tabIndex={0}
                            >
                              {/* Background/toggle layer */}
                              {/* eslint-disable-next-line @next/next/no-img-element */}
                              <img
                                src={isHovered ? (activeFile.rotatedOriginalUrl || activeFile.originalUrl) : (activeFile.compressedUrl || activeFile.rotatedOriginalUrl || activeFile.originalUrl)}
                                alt="Toggle Preview"
                                loading="lazy"
                                className="max-h-full max-w-full object-contain pointer-events-none"
                              />

                              <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5">
                                <span className={`px-2 py-1 border text-[9px] font-bold uppercase tracking-wider rounded font-mono transition-all duration-300 ${
                                  isHovered
                                    ? "bg-black/80 border-white/10 text-white"
                                    : "bg-brand-primary border-brand-primary/20 text-white shadow-[0_0_15px_rgba(26,109,214,0.3)]"
                                }`}>
                                  {isHovered ? "Showing Before (Original)" : "Showing After (Optimized)"}
                                </span>
                              </div>

                              <div className="absolute bottom-4 right-4 z-20 px-2.5 py-1 bg-black/80 border border-white/10 text-[8px] text-foreground/50 tracking-wider rounded font-mono uppercase group-hover:text-white transition-colors">
                                Hover / Tap to Toggle
                              </div>
                            </div>
                          )}

                        </div>

                        {/* File stats card */}
                        <div className="bg-white/[0.02] border border-white/[0.06] rounded-2xl p-4 space-y-3 font-mono text-[11px]">
                          <div className="flex items-center justify-between text-foreground/50 border-b border-white/[0.04] pb-2">
                            <span>Filename</span>
                            <span className="text-white truncate max-w-[200px]">{activeFile.name}</span>
                          </div>
                          <div className="flex items-center justify-between text-foreground/50 border-b border-white/[0.04] pb-2">
                            <span>Original Dimensions</span>
                            <span className="text-white">
                              {activeFile.originalWidth ? `${activeFile.originalWidth}x${activeFile.originalHeight}px` : "Reading..."}
                            </span>
                          </div>
                          
                          {activeFile.compressedSize ? (
                            <>
                              <div className="flex items-center justify-between text-foreground/50 border-b border-white/[0.04] pb-2">
                                <span>Optimized Dimensions</span>
                                <span className="text-white">
                                  {activeFile.compressedWidth}x{activeFile.compressedHeight}px
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-foreground/50 border-b border-white/[0.04] pb-2">
                                <span>Size Difference</span>
                                <span className="text-green-400 font-bold">
                                  -{formatBytes(activeFile.originalSize - activeFile.compressedSize)}
                                </span>
                              </div>
                              <div className="flex items-center justify-between text-foreground/50">
                                <span>Optimization Grade</span>
                                <span className="text-green-400 font-bold px-2 py-0.5 rounded bg-green-400/10 border border-green-400/20">
                                  -{activeFile.reduction}% Savings
                                </span>
                              </div>
                            </>
                          ) : (
                            <div className="text-center py-2 text-foreground/30 leading-relaxed">
                              Run compression to view size analysis and dimensional shifts.
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="py-20 text-center border border-dashed border-white/10 rounded-2xl">
                        <p className="text-xs text-foreground/30">Select an item from the queue list to trigger comparison visualizer.</p>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </div>

      <ContactFooter />
    </main>
  );
}
