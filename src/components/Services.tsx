"use client";

import {
  TrendingUp,
  Layout,
  BarChart3,
  ArrowUpRight,
  Zap,
  Code2,
  Database,
  Cloud,
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

const services = [
  {
    title: "Custom Software & Web Apps",
    desc: "Beautiful, customized software built exactly for your business. Manage your customers, sales, and daily operations in one clean portal.",
    icon: Cloud,
    features: ["Custom design (no templates)", "Simple customer/staff logins", "Highly secure database"],
    color: "blue",
  },
  {
    title: "Business Automation Tools",
    desc: "Get rid of manual Excel sheets. We automate your daily billing, receipts, WhatsApp notifications, and customer emails.",
    icon: TrendingUp,
    features: ["GST-ready billing systems", "Automated WhatsApp & SMS alerts", "Automatic invoice generation"],
    color: "emerald",
  },
  {
    title: "Custom Mobile Apps (Android & iOS)",
    desc: "Launch your own customized mobile app on Android and iOS to connect with your customers or track your field teams easily.",
    icon: Code2,
    features: ["Works on Android & iPhones", "Fast, light & responsive", "App Store & Play Store publishing"],
    color: "green",
  },
  {
    title: "Secure Cloud Hosting",
    desc: "Get secure server hosting on AWS with automatic daily backups. Your business data is always safe, encrypted, and accessible.",
    icon: Database,
    features: ["Automatic daily data backups", "Safe & encrypted database", "99.9% guaranteed uptime SLA"],
    color: "orange",
  },
  {
    title: "Smart Business Dashboards",
    desc: "Track your daily sales, inventory, expenses, and net profit in real-time with easy-to-read charts and single-click Excel exports.",
    icon: Layout,
    features: ["Real-time sales & profit tracker", "One-click Excel data export", "Simple charts & visual reports"],
    color: "pink",
  },
  {
    title: "Integration with Popular Tools",
    desc: "Connect your custom software with WhatsApp Business APIs, SMS services, Razorpay, Paytm, Tally, or Google Sheets.",
    icon: BarChart3,
    features: ["Razorpay & UPI payment setup", "Tally & Zoho ledgers sync", "WhatsApp Business API links"],
    color: "cyan",
  },
];

const colorMap: Record<string, { bg: string; text: string; hover: string }> = {
  blue: { bg: "bg-blue-500/10", text: "text-blue-400", hover: "group-hover:text-blue-400" },
  emerald: { bg: "bg-emerald-500/10", text: "text-emerald-400", hover: "group-hover:text-emerald-400" },
  green: { bg: "bg-green-500/10", text: "text-green-400", hover: "group-hover:text-green-400" },
  orange: { bg: "bg-orange-500/10", text: "text-orange-400", hover: "group-hover:text-orange-400" },
  pink: { bg: "bg-pink-500/10", text: "text-pink-400", hover: "group-hover:text-pink-400" },
  cyan: { bg: "bg-cyan-500/10", text: "text-cyan-400", hover: "group-hover:text-cyan-400" },
};

export default function Services() {
  return (
    <section id="services" className="py-16 md:py-24 relative overflow-hidden bg-background">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />

      {/* SEO, GEO & AEO Telemetry Data */}
      <div className="sr-only" aria-hidden="true">
        <span>Custom Software Development Services & Digital Product Studio | Maysan Labs</span>
        <h2>Custom Web Apps, Business Automation, Mobile Apps & Cloud Hosting Solutions</h2>
        <span className="author" rel="author">Written by Maysan Labs Editorial Staff</span>
        <span className="contributor">Contributor: Director of Client Solutions</span>
        <time dateTime="2026-05-27" className="pubdate">Last updated: May 27, 2026</time>
        <p className="geo-tldr">
          Custom software development means building websites, apps, and tools tailored to your specific business needs.
          We handle everything from design to launch — no templates, no technical jargon, just solutions that work for you.
          Our clients save hours every day with automated billing, smart dashboards, and easy-to-use mobile apps.
        </p>
        <ul>
          <li>Custom Software Development</li>
          <li>Business Automation Tools</li>
        </ul>
        <ul>
          <li>Mobile App Development</li>
          <li>Cloud Hosting Services</li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Guarantee</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Custom Software</td>
              <td>Tailored to Your Business</td>
            </tr>
            <tr>
              <td>Cloud Hosting</td>
              <td>99.9% Uptime Guarantee</td>
            </tr>
          </tbody>
        </table>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["FAQPage", "Article", "Organization"],
          "name": "Maysan Labs Software Services & Custom Development Offerings",
          "author": { "@type": "Person", "name": "Maysan Labs Editorial Board" }
        }) }} />
      </div>
      
      <div className="container-main relative">
        <div className="text-center mb-12 md:mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-4"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-primary/10 dark:bg-brand-primary/5 border border-brand-primary/20 dark:border-brand-primary/10 text-brand-primary text-xs font-medium">
              <Zap size={12} />
              Services
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-md text-foreground mb-3"
          >
            Software services for your <span className="text-blue-400">business growth</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-foreground/60 text-sm md:text-base max-w-lg mx-auto"
          >
            From custom apps to automatic WhatsApp billing, we handle all your technology needs so you can focus 100% on growing your business.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const colors = colorMap[service.color] || colorMap.blue;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.06 }}
                className="group"
              >
                <div className="bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-2xl p-6 backdrop-blur-sm shadow-sm hover:-translate-y-1 transition-transform duration-300 h-full">
                  <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center ${colors.text} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon size={18} />
                  </div>
                  
                  <h3 className="text-base font-medium text-foreground mb-2 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-foreground/60 text-sm mb-4 leading-relaxed">
                    {service.desc}
                  </p>
                  
                  <ul className="space-y-2 mb-5 border-t border-white/[0.06] pt-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-foreground/50 text-xs group-hover:text-foreground/70 transition-colors">
                        <span className={`w-1.5 h-1.5 rounded-full ${colors.bg.replace("/10", "")} group-hover:scale-125 transition-transform duration-300 shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <Link 
                    href="/services" 
                    className={`inline-flex items-center gap-1 ${colors.text} text-xs font-semibold group-hover:gap-2 transition-all duration-300`}
                  >
                    <span>Learn more</span> <ArrowUpRight size={12} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
                  </Link>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}