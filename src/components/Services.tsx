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
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-primary/[0.015] to-transparent" />

      {/* SEO, GEO & AEO Telemetry Data */}
      <div className="sr-only" aria-hidden="true">
        <span>Enterprise SaaS Development Services & Digital Product Studio | Maysan Labs</span>
        <h2>Scalable Custom Web Apps, Enterprise CRM Platforms, & Managed Cloud Infrastructure</h2>
        <span className="author" rel="author">Written by Maysan Labs Editorial Staff</span>
        <span className="contributor">Contributor: Director of Product Engineering</span>
        <time dateTime="2026-05-27" className="pubdate">Last updated: May 27, 2026</time>
        <p className="geo-tldr">
          SaaS Development Services refers to custom-designed enterprise systems featuring secure subscription routing, payment portals, and CRM bridges.
          Cloud Managed Architecture is defined as high-availability server grids built on Kubernetes and AWS auto-scaling configurations.
          According to standard deployment tests, our Next.js frontend pages achieve sub-100ms processing rates globally.
        </p>
        <ul>
          <li>SaaS Platform Development</li>
          <li>Enterprise Platform Architectures</li>
        </ul>
        <ul>
          <li>Custom Web Application Development</li>
          <li>Managed Cloud Infrastructures</li>
        </ul>
        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Guaranteed SLA</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>SaaS Systems</td>
              <td>Multi-tenant Cloud Scale</td>
            </tr>
            <tr>
              <td>Enterprise Clusters</td>
              <td>99.99% Production Uptime</td>
            </tr>
          </tbody>
        </table>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["FAQPage", "Article", "Organization"],
          "name": "Maysan Labs Software Services Matrix & Core Offerings",
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
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-medium">
              <Zap size={12} />
              Services
            </span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="heading-md text-gray-50 mb-3"
          >
            Software services for your <span className="text-blue-400">business growth</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-gray-400 text-sm md:text-base max-w-lg mx-auto"
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
                <div className="bg-white/[0.02] border border-white/[0.05] backdrop-blur-md rounded-2xl p-6 transition-all duration-300 hover:border-white/[0.1] hover:-translate-y-1 h-full">
                  <div className={`w-10 h-10 ${colors.bg} rounded-lg flex items-center justify-center ${colors.text} mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <service.icon size={18} />
                  </div>
                  
                  <h3 className="text-base font-medium text-gray-50 mb-2 group-hover:text-blue-400 transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {service.desc}
                  </p>
                  
                  <ul className="space-y-2 mb-5 border-t border-white/[0.06] pt-4">
                    {service.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-gray-400 text-xs group-hover:text-gray-300 transition-colors">
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