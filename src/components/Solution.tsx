"use client";

import {
  Store,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Layout,
  BarChart3,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";
import TextReveal from "./TextReveal";
import SpotlightCard from "./SpotlightCard";

export default function Solution() {
  const solutions = [
    {
      title: "Enterprise Commerce Architecture",
      desc: "End-to-end e-commerce solutions to establish, manage, and scale your online presence.",
      icon: <Store size={28} />,
      features: [
        "Integrated Payment Gateways",
        "Inventory Management",
        "User-friendly Experience",
      ],
    },
    {
      title: "CRM Module",
      desc: "Manage and enhance customer interactions with centralized data and automation.",
      icon: <TrendingUp size={28} />,
      features: [
        "Engagement Tracking",
        "Communication Automation",
        "Relationship Building",
      ],
    },
    {
      title: "Customized Software",
      desc: "Tailored applications that align with your organizational workflows and growth.",
      icon: <Cpu size={28} />,
      features: [
        "Scalable Architecture",
        "Secure Development",
        "Operational Performance",
      ],
    },
    {
      title: "Cloud Solutions",
      desc: "Securely store and process data on high-performance, scalable cloud infrastructure.",
      icon: <ShieldCheck size={28} />,
      features: ["Cloud Migration", "Optimization", "High Availability"],
    },
    {
      title: "Employee Management",
      desc: "Streamline human resource operations and improve team productivity.",
      icon: <Layout size={28} />,
      features: [
        "Attendance & Records",
        "Performance Tracking",
        "Payroll Integration",
      ],
    },
    {
      title: "Digital & Performance Marketing",
      desc: "Enhance brand visibility and audience engagement with measurable business growth.",
      icon: <BarChart3 size={28} />,
      features: [
        "Campaign Strategy",
        "Content Creation",
        "Performance Analytics",
      ],
    },
  ];

  return (
    <section id="solution" className="py-24 relative noise-bg">
      {/* Subtle gradient accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="container relative z-10">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="section-label">Our Solutions</span>
          <TextReveal
            as="h2"
            className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-4"
          >
            The Engineering Excellence
          </TextReveal>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-lg text-muted-foreground"
          >
            Scalable architectures designed for modern digital dominance.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solutions.map((sol, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
            >
              <SpotlightCard className="glass-card gradient-border p-8 glow-hover group h-full">
                <div className="relative z-10">
                  {/* Number Badge */}
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 bg-primary/10 text-primary flex items-center justify-center rounded-lg group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                      {sol.icon}
                    </div>
                    <span className="text-xs font-mono text-muted-foreground/40 tracking-wider">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold mb-3 text-foreground">
                    {sol.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 min-h-[4rem] text-sm leading-relaxed">
                    {sol.desc}
                  </p>

                  <ul className="space-y-2.5 border-t border-border/50 pt-5">
                    {sol.features.map((feature, fIndex) => (
                      <li
                        key={fIndex}
                        className="flex items-center text-sm text-foreground/80"
                      >
                        <CheckCircle2
                          size={14}
                          className="text-primary mr-2.5 shrink-0"
                        />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
