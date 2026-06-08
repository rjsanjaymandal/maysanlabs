"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Share2, Image as ImageIcon, Download, Mail, Loader2, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";

const themes = [
  { name: "Cyber Royal Blue", from: "#1A6DD6", to: "#00d2ff" },
  { name: "Glowing Emerald", from: "#10b981", to: "#14b8a6" },
  { name: "Signal Orange", from: "#f97316", to: "#facc15" },
];

export default function OgGeneratorClient() {
  const [title, setTitle] = useState("Architecting the Future of SaaS");
  const [description, setDescription] = useState("We build custom high-performance software, robust SaaS backends, and cloud infrastructures.");
  const [domain, setDomain] = useState("maysanlabs.com");
  const [selectedTheme, setSelectedTheme] = useState(0);
  const [activePlatform, setActivePlatform] = useState<"linkedin" | "twitter" | "facebook">("linkedin");
  
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState<string | null>(null);
  const [showLeadModal, setShowLeadModal] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const theme = themes[selectedTheme];

  // Draw on canvas in real-time
  const drawCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, 1200, 630);

    // Draw background space-blue canvas
    ctx.fillStyle = "#03050d";
    ctx.fillRect(0, 0, 1200, 630);

    // Draw grid pattern (subtle)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.02)";
    ctx.lineWidth = 1;
    const gridSize = 40;
    for (let x = 0; x < 1200; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 630);
      ctx.stroke();
    }
    for (let y = 0; y < 630; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1200, y);
      ctx.stroke();
    }

    // Draw tech glows
    const gradientGlow = ctx.createRadialGradient(900, 150, 50, 900, 150, 400);
    gradientGlow.addColorStop(0, `${theme.from}15`);
    gradientGlow.addColorStop(1, "transparent");
    ctx.fillStyle = gradientGlow;
    ctx.fillRect(0, 0, 1200, 630);

    // Draw dynamic theme gradient accent bar
    const gradientBar = ctx.createLinearGradient(100, 0, 1100, 0);
    gradientBar.addColorStop(0, theme.from);
    gradientBar.addColorStop(1, theme.to);
    ctx.fillStyle = gradientBar;
    ctx.fillRect(100, 50, 1000, 6);

    // Draw branding domain
    ctx.font = "bold 20px Outfit, sans-serif";
    ctx.fillStyle = `${theme.from}`;
    ctx.fillText(domain.toUpperCase(), 100, 120);

    // Draw H1 Title (Wrapped)
    ctx.font = "bold 64px Outfit, sans-serif";
    ctx.fillStyle = "#FFFFFF";
    
    // Simple text wrapper
    const words = title.split(" ");
    let line = "";
    let y = 240;
    const maxWidth = 1000;
    const lineHeight = 76;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, 100, y);
        line = words[n] + " ";
        y += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, 100, y);

    // Draw Description (Wrapped)
    ctx.font = "300 28px Outfit, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
    
    const descWords = description.split(" ");
    let descLine = "";
    let descY = y + 70;
    const descMaxWidth = 1000;
    const descLineHeight = 38;

    for (let m = 0; m < descWords.length; m++) {
      const testLine = descLine + descWords[m] + " ";
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > descMaxWidth && m > 0) {
        ctx.fillText(descLine, 100, descY);
        descLine = descWords[m] + " ";
        descY += descLineHeight;
      } else {
        descLine = testLine;
      }
    }
    ctx.fillText(descLine, 100, descY);

    // Draw small brand tagline bottom right
    ctx.font = "bold 16px Outfit, sans-serif";
    ctx.fillStyle = "rgba(255, 255, 255, 0.25)";
    ctx.fillText("BUILD BY MAYSAN LABS", 920, 560);
  }, [title, description, domain, theme]);

  // Re-draw whenever parameters update
  useEffect(() => {
    drawCanvas();
  }, [drawCanvas]);

  const handleDownloadTrigger = () => {
    if (isSubmitted) {
      triggerDownload();
    } else {
      setShowLeadModal(true);
    }
  };

  const triggerDownload = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dataUrl = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.download = `${domain.replace(/\./g, "-")}-og-image.png`;
    link.href = dataUrl;
    link.click();
    setShowLeadModal(false);
  }, [domain]);

  const handleLeadSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !company) return;
    setLeadSubmitting(true);
    setLeadError(null);

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, company, source: `og-generator: ${title}` }),
      });

      if (res.ok) {
        setIsSubmitted(true);
        triggerDownload();
      } else {
        const data = await res.json();
        setLeadError(data.error || "Something went wrong.");
      }
    } catch {
      setLeadError("Network error. Please try again.");
    } finally {
      setLeadSubmitting(false);
    }
  }, [email, company, title, triggerDownload]);

  return (
    <main id="main-content" className="min-h-screen bg-background text-foreground flex flex-col justify-between">
      <div>
        <Navbar />

        <Link href="/tools" className="block container-main max-w-4xl mx-auto pt-24 pb-0">
          <span className="inline-flex items-center gap-1.5 text-[11px] text-foreground/40 hover:text-brand-primary transition-colors">
            <ArrowLeft size={12} />
            Back to All Tools
          </span>
        </Link>

        <div className="pb-20 px-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
          <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-primary/5 dark:bg-brand-primary/10 rounded-full blur-[140px] pointer-events-none" />

          <div className="container-main max-w-4xl mx-auto relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-10"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20 text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4">
                <Share2 size={12} />
                Traffic Magnets
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Social Share <span className="text-brand-primary">Image Editor</span>
              </h1>
              <p className="text-foreground/50 max-w-2xl mx-auto text-sm md:text-base">
                Design and preview exactly how your website looks when shared on social media, and compile customized share graphics.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
              {/* Form Config Block */}
              <div className="lg:col-span-5 bg-white/60 dark:bg-white/[0.02] border border-gray-200 dark:border-white/[0.06] rounded-3xl p-6 space-y-4 backdrop-blur-xl shadow-sm hover:border-brand-primary/40 dark:hover:border-brand-primary/30 hover:shadow-lg">
                <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                  <ImageIcon size={16} className="text-brand-primary" />
                  OG Design Settings
                </h3>

                <div>
                  <label htmlFor="card-title" className="text-[10px] font-semibold text-foreground/50 block mb-1">Page Title</label>
                  <input
                    id="card-title"
                    type="text"
                    maxLength={50}
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 font-bold"
                  />
                </div>

                <div>
                  <label htmlFor="card-desc" className="text-[10px] font-semibold text-foreground/50 block mb-1">Page Description</label>
                  <textarea
                    id="card-desc"
                    maxLength={140}
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full bg-white/50 dark:bg-black/30 border border-gray-200 dark:border-white/10 rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 leading-relaxed resize-none"
                  />
                </div>

                <div>
                  <label htmlFor="card-domain" className="text-[10px] font-semibold text-foreground/50 block mb-1">Branding Domain</label>
                  <input
                    id="card-domain"
                    type="text"
                    value={domain}
                    onChange={(e) => setDomain(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-3 py-2 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 font-mono"
                  />
                </div>

                <div>
                  <span className="text-[10px] font-semibold text-foreground/50 block mb-2">Theme Style Gradient</span>
                  <div className="grid grid-cols-3 gap-1.5" role="radiogroup" aria-label="Gradient themes">
                    {themes.map((th, idx) => (
                      <button
                        key={th.name}
                        role="radio"
                        aria-checked={selectedTheme === idx}
                        onClick={() => setSelectedTheme(idx)}
                        className={`p-2 rounded-lg border text-center transition-all ${
                          selectedTheme === idx
                            ? "bg-white/5 border-white/40 text-foreground"
                            : "bg-black/20 border-white/5 hover:border-white/10 text-foreground/60"
                        }`}
                      >
                        <div className={`w-full h-3 rounded bg-gradient-to-r ${th.from === "#1A6DD6" ? "from-[#1A6DD6] to-[#00d2ff]" : th.from === "#10b981" ? "from-[#10b981] to-[#14b8a6]" : "from-[#f97316] to-[#facc15]"} mb-1`} />
                        <span className="text-[8px] font-bold tracking-tight block leading-none">{th.name.split(" ")[1]}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Simulated Canvas (hidden, used for export) */}
                <canvas ref={canvasRef} width={1200} height={630} className="hidden" />

                <button
                  onClick={handleDownloadTrigger}
                  className="w-full py-3 bg-brand-primary text-black rounded-xl font-bold uppercase text-[10px] tracking-wider transition-all flex items-center justify-center gap-2 hover:shadow-[0_0_20px_rgba(26,109,214,0.4)]"
                >
                  <Download size={14} />
                  Download High-Res PNG
                </button>
              </div>

              {/* Dynamic Preview Area */}
              <div className="lg:col-span-7 bg-white/60 dark:bg-white/[0.04] border border-gray-200 dark:border-white/[0.1] rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden backdrop-blur-xl shadow-sm hover:border-brand-primary/40 dark:hover:border-brand-primary/30 hover:shadow-lg">
                <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl pointer-events-none" />

                <div>
                  <div className="flex items-center gap-2 border-b border-white/10 pb-4 mb-4">
                    <button
                      onClick={() => setActivePlatform("linkedin")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                        activePlatform === "linkedin"
                          ? "bg-brand-primary text-black"
                          : "bg-white/[0.02] text-foreground/45 hover:bg-white/[0.08]"
                      }`}
                    >
                      LinkedIn Post
                    </button>
                    <button
                      onClick={() => setActivePlatform("twitter")}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all ${
                        activePlatform === "twitter"
                          ? "bg-brand-primary text-black"
                          : "bg-white/[0.02] text-foreground/45 hover:bg-white/[0.08]"
                      }`}
                    >
                      Twitter Card
                    </button>
                  </div>

                  {/* LinkedIn post preview mockup */}
                  <AnimatePresence mode="wait">
                    {activePlatform === "linkedin" && (
                      <motion.div
                        key="linkedin"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-white dark:bg-[#0f1115] border border-black/10 dark:border-white/10 rounded-2xl p-4 space-y-3 shadow-md dark:shadow-none"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-full bg-brand-primary/20 flex items-center justify-center font-bold text-xs text-brand-primary">ML</div>
                          <div>
                            <p className="text-xs font-bold text-foreground">Maysan Labs</p>
                            <p className="text-[9px] text-foreground/30">Enterprise Tech Scoping</p>
                          </div>
                        </div>
                        <p className="text-xs text-foreground/75 leading-relaxed">
                          Checking out our latest platform release. Speed improvements have boosted our metrics significantly! 🚀
                        </p>
                        
                        {/* Compiled Graphic Card Mockup */}
                        <div className="border border-white/5 rounded-xl overflow-hidden bg-black">
                          <div className="aspect-[1.91/1] w-full bg-[#03050d] p-6 relative overflow-hidden flex flex-col justify-between">
                            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${theme.from === "#1A6DD6" ? "from-[#1A6DD6] to-[#00d2ff]" : theme.from === "#10b981" ? "from-[#10b981] to-[#14b8a6]" : "from-[#f97316] to-[#facc15]"} opacity-[0.05] blur-xl`} />
                            <div className={`w-full h-1 bg-gradient-to-r ${theme.from === "#1A6DD6" ? "from-[#1A6DD6] to-[#00d2ff]" : theme.from === "#10b981" ? "from-[#10b981] to-[#14b8a6]" : "from-[#f97316] to-[#facc15]"}`} />
                            <span className="text-[9px] font-bold text-brand-primary font-mono tracking-wider">{domain.toUpperCase()}</span>
                            <h4 className="text-base font-black text-white leading-tight pr-6">{title}</h4>
                            <p className="text-[10px] text-white/50 leading-relaxed pr-6 line-clamp-2">{description}</p>
                            <span className="text-[8px] font-bold text-white/20 text-right">BY MAYSAN LABS</span>
                          </div>
                          <div className="bg-[#f3f6f8] dark:bg-[#1b1f24] p-3 border-t border-black/5 dark:border-white/5 flex flex-col gap-0.5">
                            <span className="text-[9px] text-foreground/40 font-mono">{domain}</span>
                            <span className="text-[11px] text-foreground/70 font-semibold truncate">{title}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {activePlatform === "twitter" && (
                      <motion.div
                        key="twitter"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0 }}
                        className="bg-white dark:bg-[#0f1115] border border-black/10 dark:border-white/10 rounded-2xl p-4 space-y-3 shadow-md dark:shadow-none"
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-9 h-9 rounded-full bg-brand-primary/20 flex items-center justify-center font-bold text-xs text-brand-primary">ML</div>
                          <div>
                            <p className="text-xs font-bold text-foreground">Maysan Labs <span className="text-foreground/30 font-normal">@maysanlabs</span></p>
                            <p className="text-[9px] text-foreground/30">Just now</p>
                          </div>
                        </div>
                        <p className="text-xs text-foreground/75 leading-relaxed">
                          Checking out our latest platform release. Speed improvements have boosted our metrics significantly! 🚀
                        </p>
                        
                        {/* Twitter Card Mockup */}
                        <div className="border border-white/10 rounded-2xl overflow-hidden bg-black">
                          <div className="aspect-[1.91/1] w-full bg-[#03050d] p-6 relative overflow-hidden flex flex-col justify-between">
                            <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${theme.from === "#1A6DD6" ? "from-[#1A6DD6] to-[#00d2ff]" : theme.from === "#10b981" ? "from-[#10b981] to-[#14b8a6]" : "from-[#f97316] to-[#facc15]"} opacity-[0.05] blur-xl`} />
                            <div className={`w-full h-1 bg-gradient-to-r ${theme.from === "#1A6DD6" ? "from-[#1A6DD6] to-[#00d2ff]" : theme.from === "#10b981" ? "from-[#10b981] to-[#14b8a6]" : "from-[#f97316] to-[#facc15]"}`} />
                            <span className="text-[9px] font-bold text-brand-primary font-mono tracking-wider">{domain.toUpperCase()}</span>
                            <h4 className="text-base font-black text-white leading-tight pr-6">{title}</h4>
                            <p className="text-[10px] text-white/50 leading-relaxed pr-6 line-clamp-2">{description}</p>
                            <span className="text-[8px] font-bold text-white/20 text-right">BY MAYSAN LABS</span>
                          </div>
                          <div className="bg-[#f5f8fa] dark:bg-[#15181c] p-3 border-t border-black/5 dark:border-white/10 flex flex-col gap-0.5">
                            <span className="text-[9px] text-foreground/40 font-mono">{domain}</span>
                            <span className="text-[11px] text-foreground/70 font-semibold truncate">{title}</span>
                            <span className="text-[9px] text-foreground/40 line-clamp-1">{description}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="mt-4 text-center">
                  <p className="text-[9px] text-foreground/30 leading-relaxed">
                    Designed in perfect accordance with modern 1.91:1 widescreen landscape graphic dimensions (1200 x 630 pixels).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lead Capture Modal Popup */}
      <AnimatePresence>
        {showLeadModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/80 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#0f1115] border border-black/10 dark:border-brand-primary/30 max-w-md w-full rounded-3xl p-6 md:p-8 relative overflow-hidden shadow-2xl"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl pointer-events-none" />

              <div className="relative z-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-brand-primary/10 border border-brand-primary/20 flex items-center justify-center">
                    <Mail size={22} className="text-brand-primary animate-pulse" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">Unlock Dynamic PNG Exports</h3>
                    <p className="text-xs text-foreground/45">Enter your details to directly download your high-res OG Card.</p>
                  </div>
                </div>

                <form onSubmit={handleLeadSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="lead-modal-email" className="text-[10px] font-semibold text-foreground/50 block mb-1">Email Address *</label>
                    <input
                      id="lead-modal-email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all font-bold placeholder:text-foreground/45"
                    />
                  </div>

                  <div>
                    <label htmlFor="lead-modal-company" className="text-[10px] font-semibold text-foreground/50 block mb-1">Company Name *</label>
                    <input
                      id="lead-modal-company"
                      type="text"
                      required
                      placeholder="Acme Corp"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-black/5 dark:bg-black/30 border border-black/10 dark:border-white/10 rounded-xl px-4 py-2.5 text-xs text-foreground focus:outline-none focus:ring-2 focus:ring-brand-primary/50 focus:border-brand-primary/50 transition-all font-bold placeholder:text-foreground/45"
                    />
                  </div>

                  {leadError && (
                    <p className="text-red-400 text-xs">{leadError}</p>
                  )}

                  <div className="flex items-center gap-2 pt-2">
                    <button
                      type="button"
                      onClick={() => setShowLeadModal(false)}
                      className="flex-1 py-2.5 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all text-foreground/60 hover:text-foreground"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={leadSubmitting}
                      className="flex-1 py-2.5 bg-brand-primary text-black rounded-xl font-bold uppercase text-[10px] tracking-wider transition-all flex items-center justify-center gap-1.5 hover:shadow-[0_0_20px_rgba(26,109,214,0.4)]"
                    >
                      {leadSubmitting ? (
                        <>
                          <Loader2 size={12} className="animate-spin" />
                          Unlocking...
                        </>
                      ) : (
                        <>
                          <Download size={12} />
                          Download Card
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <p className="text-[8px] text-foreground/20 text-center leading-relaxed">
                  We respect your privacy. Submitting will unlock premium downloads across all Maysan Labs micro-tools.
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactFooter />
    </main>
  );
}
