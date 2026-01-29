"use client";

import { motion } from "framer-motion";
import { TrendingUp, Activity, BarChart2, PieChart } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";

const insights = [
  {
    title: "Market Velocity",
    value: "+14.5%",
    desc: "Year-over-year growth in digital adoption across target sectors.",
    icon: <TrendingUp size={24} />,
  },
  {
    title: "System Latency",
    value: "45ms",
    desc: "Average response time for edge-hosted application logic.",
    icon: <Activity size={24} />,
  },
  {
    title: "User Engagement",
    value: "8.2m",
    desc: "Active sessions processed daily on client infrastructure.",
    icon: <BarChart2 size={24} />,
  },
  {
    title: "Retention Rate",
    value: "92%",
    desc: "Customer loyalty metrics exceeding industry standards.",
    icon: <PieChart size={24} />,
  },
];

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      <div className="pt-32 pb-16 bg-muted/10 border-b border-border">
        <div className="container">
          <span className="text-sm font-mono text-primary uppercase tracking-wider mb-4 block">
            Data Stream
          </span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Technical Insights
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Deep-dives into modular architecture, tactical automation, and the
            future of digital platforms.
          </p>
        </div>
      </div>

      <div className="flex-1 py-16">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {insights.map((item, index) => (
              <motion.div
                key={index}
                className="bg-card border border-border p-8 rounded-lg text-center hover:border-primary/50 transition-colors group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="inline-flex p-4 bg-muted rounded-full text-primary mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-4xl font-bold text-foreground mb-2">
                  {item.value}
                </h3>
                <h4 className="text-xs font-semibold text-muted-foreground mb-4 font-mono uppercase tracking-wider">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 p-12 border border-border rounded-lg bg-card text-center">
            <h3 className="text-2xl font-bold mb-4">
              Live Telemetry Coming Soon
            </h3>
            <p className="text-muted-foreground max-w-xl mx-auto">
              We are integrating a real-time dashboard for client-accessible
              metrics.
            </p>
          </div>
        </div>
      </div>
      <ContactFooter />
    </main>
  );
}
