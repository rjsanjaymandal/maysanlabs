"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Services", href: "/services" },
    { name: "Products", href: "/products" },
    { name: "Case Studies", href: "/case-studies" },
    { name: "Blog", href: "/blog" },
    { name: "Careers", href: "/careers" },
  ];

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-background/80 backdrop-blur-xl py-3 border-b border-white/5" : "bg-transparent py-5"
      }`}>
        <div className="container-main flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center relative z-10 overflow-hidden bg-white/5 border border-white/10">
               <Image src="/logo.png" alt="Maysan Labs" width={24} height={24} className="object-cover" priority />
            </div>
            <span className="font-semibold text-white text-lg">Maysan Labs</span>
          </Link>

          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-all duration-200 relative ${
                  pathname === item.href ? "text-brand-primary" : "text-white/50 hover:text-white"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Link href="/init" className="px-5 py-2 bg-brand-primary rounded-full font-medium text-sm text-black hover:shadow-[0_0_20px_rgba(163,230,53,0.3)] transition-all duration-200">
              Start Project
            </Link>
          </div>

          <button 
            className="lg:hidden p-2 text-white/50 hover:text-white transition-colors"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-background/95 backdrop-blur-xl lg:hidden"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-12">
                 <Link href="/" className="flex items-center gap-3" onClick={() => setIsOpen(false)}>
                     <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-white/5 border border-white/10">
                       <Image src="/logo.png" alt="Maysan Labs" width={24} height={24} className="object-cover" />
                     </div>
                     <span className="font-semibold text-white text-lg">Maysan Labs</span>
                 </Link>
                 <button onClick={() => setIsOpen(false)} className="p-2 text-white/50 hover:text-white">
                    <X size={24} />
                 </button>
              </div>

              <div className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`text-2xl font-semibold ${
                        pathname === item.href ? "text-brand-primary" : "text-white/70"
                      }`}
                    >
                      {item.name}
                    </Link>
                  </motion.div>
                ))}
              </div>

              <div className="mt-auto">
                <Link 
                  href="/init" 
                  onClick={() => setIsOpen(false)}
                  className="block w-full py-4 bg-brand-primary rounded-full font-semibold text-center text-black"
                >
                  Start Project
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}