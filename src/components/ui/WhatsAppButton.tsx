"use client";

import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const phoneNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE || "919660641530";
  const message = "Hi Maysan Labs, I'd like to discuss a project.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  const handleClick = () => {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ event: "whatsapp_click" });
  };

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className="fixed bottom-24 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-[#25D366] to-[#20BD5A] shadow-[0_0_25px_rgba(37,211,102,0.35)] transition-transform duration-200 hover:scale-105 hover:shadow-[0_0_35px_rgba(37,211,102,0.5)] focus-ring active:scale-95 group md:bottom-8 md:right-8 lg:bottom-6 lg:right-6"
      aria-label="Contact on WhatsApp"
    >
      <MessageCircle size={26} className="text-white" />
      <span className="absolute right-full mr-3 px-3 py-1.5 bg-white text-black text-xs font-semibold rounded-full opacity-0 group-hover:opacity-100 transition-all duration-200 whitespace-nowrap hidden md:block">
        Chat with us
      </span>
    </a>
  );
}
