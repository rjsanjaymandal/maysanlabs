"use client";

import {
  Store,
  Cpu,
  Zap,
  ShieldCheck,
  TrendingUp,
  Layout,
  BarChart3,
} from "lucide-react";

export default function Solution() {
  const solutions = [
    {
      title: "Enterprise Commerce Architecture",
      desc: "End-to-end e-commerce solutions to establish, manage, and scale your online presence.",
      icon: <Store size={32} />,
      features: [
        "Integrated Payment Gateways",
        "Inventory Management",
        "User-friendly Experience",
      ],
    },
    {
      title: "CRM Module",
      desc: "Manage and enhance customer interactions with centralized data and automation.",
      icon: <TrendingUp size={32} />,
      features: [
        "Engagement Tracking",
        "Communication Automation",
        "Relationship Building",
      ],
    },
    {
      title: "Customized Software",
      desc: "Tailored applications that align with your organizational workflows and growth.",
      icon: <Cpu size={32} />,
      features: [
        "Scalable Architecture",
        "Secure Development",
        "Operational Performance",
      ],
    },
    {
      title: "Cloud Solutions",
      desc: "Securely store and process data on high-performance, scalable cloud infrastructure.",
      icon: <ShieldCheck size={32} />,
      features: ["Cloud Migration", "Optimization", "High Availability"],
    },
    {
      title: "Employee Management",
      desc: "Streamline human resource operations and improve team productivity.",
      icon: <Layout size={32} />,
      features: [
        "Attendance & Records",
        "Performance Tracking",
        "Payroll Integration",
      ],
    },
    {
      title: "Digital & Performance Marketing",
      desc: "Enhance brand visibility and audience engagement with measurable business growth. Note: Marketing shoots conducted exclusively in Jaipur and Chandigarh.",
      icon: <BarChart3 size={32} />,
      features: [
        "Campaign Strategy",
        "Content Creation",
        "Performance Analytics",
      ],
    },
  ];

  return (
    <section
      id="solution"
      className="py-24 bg-background border-t border-border"
    >
      <div className="container">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <span className="text-primary font-mono text-sm uppercase tracking-widest mb-2 block">
            Our Solutions
          </span>
          <h2 className="text-4xl font-bold tracking-tight text-foreground mb-4">
            The Engineering Excellence
          </h2>
          <p className="text-xl text-muted-foreground">
            Scalable architectures designed for modern digital dominance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((sol, index) => (
            <div
              key={index}
              className="p-8 bg-card rounded-lg border border-border hover:shadow-xl transition-shadow group"
            >
              <div className="w-14 h-14 bg-primary/10 text-primary flex items-center justify-center rounded-lg mb-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                {sol.icon}
              </div>
              <h3 className="text-xl font-bold mb-3 text-foreground">
                {sol.title}
              </h3>
              <p className="text-muted-foreground mb-6 min-h-[5rem]">
                {sol.desc}
              </p>
              <ul className="space-y-2">
                {sol.features.map((feature, fIndex) => (
                  <li
                    key={fIndex}
                    className="flex items-center text-sm text-foreground/80"
                  >
                    <Zap size={14} className="text-primary mr-2" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
