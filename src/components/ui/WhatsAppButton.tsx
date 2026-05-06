"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = "919660641530";
  const message = "Hi Maysan Labs, I'd like to discuss a project.";
  const whatsappUrl = `https://wa.me/919660641530?text=${encodeURIComponent(message)}`;

  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-[100] w-14 h-14 bg-gradient-to-br from-[#25D366] to-[#20BD5A] rounded-full flex items-center justify-center shadow-[0_0_25px_rgba(37,211,102,0.4)] hover:shadow-[0_0_35px_rgba(37,211,102,0.6)] transition-all duration-300 group"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={26} className="text-white" />
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-white text-black text-xs font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap hidden md:block">
        Chat with us
      </span>
    </motion.a>
  );
}
