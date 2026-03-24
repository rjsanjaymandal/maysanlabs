"use client";

import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import {
  Store,
  Cpu,
  ShieldCheck,
  TrendingUp,
  Layout,
  BarChart3,
  ArrowUpRight,
} from "lucide-react";
import { motion, Variants, Transition } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    } as Transition,
  },
};

export default function SolutionsPage() {
  const solutions = [
    {
      id: "COMMERCE",
      title: "Online Stores",
      desc: "We build powerful online stores that handle thousands of customers at once without slowing down.",
      icon: <Store size={20} />,
      features: [
        "Secure Payments",
        "Stock Syncing",
        "Fast Checkout",
      ],
    },
    {
      id: "CRM",
      title: "Customer Management",
      desc: "Keep all your customer info in one place and automate your daily tasks to save time.",
      icon: <TrendingUp size={20} />,
      features: [
        "All Data in One Place",
        "Auto Workflows",
        "Better Sales tracking",
      ],
    },
    {
      id: "CUSTOM",
      title: "Custom Software",
      desc: "Software made just for you, designed to fit exactly how your business works.",
      icon: <Cpu size={20} />,
      features: [
        "Made to Order",
        "Secure & Reliable",
        "Built to Scale",
      ],
    },
    {
      id: "CLOUD",
      title: "Cloud Services",
      desc: "Fast and secure cloud hosting that grows instantly as your business gets bigger.",
      icon: <ShieldCheck size={20} />,
      features: ["Easy Migration", "Always Online", "Fast Speeds"],
    },
    {
      id: "TOOLS",
      title: "Internal Tools",
      desc: "Custom tools to help your internal team work faster and stay organized.",
      icon: <Layout size={20} />,
      features: [
        "Better Planning",
        "Team Tracking",
        "Auto Payroll",
      ],
    },
    {
      id: "GROWTH",
      title: "Business Growth",
      desc: "Get more customers with data-driven marketing and show up first on Google search.",
      icon: <BarChart3 size={20} />,
      features: [
        "Growth Strategy",
        "Content Help",
        "Search Optimization",
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground relative overflow-hidden">
      <Navbar />

      {/* Premium Background */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="grid-overlay opacity-20" />
        <div className="radial-glow top-0 right-0 opacity-30" />
        <div className="radial-glow bottom-0 left-0 opacity-20" />
      </div>

      <section className="pt-40 pb-24 relative z-10">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-baseline justify-between mb-24 space-y-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="max-w-3xl"
            >
              <span className="font-bold text-[10px] tracking-[0.4em] uppercase text-primary block mb-6 px-4 py-1.5 bg-primary/10 rounded-full w-fit">
                What we offer
              </span>
              <h1 className="text-massive leading-[1.1] mb-0 font-bold">
                 Smart <span className="font-accent lowercase text-primary italic">tools</span> for<br />
                 Business Growth.
              </h1>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="lg:max-w-sm border-l border-primary/20 pl-8"
            >
               <p className="text-sm font-medium text-foreground/50 leading-loose">
                  We build the technology you need to grow your business. Simple, fast, and reliable software designed for modern companies.
               </p>
            </motion.div>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {solutions.map((sol, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="group p-10 flex flex-col h-full bg-white/50 backdrop-blur-sm rounded-[2.5rem] relative overflow-hidden transition-all duration-700 border border-foreground/5 hover:border-primary/20 hover:bg-white hover:shadow-2xl hover:shadow-primary/5"
              >
                <div className="flex justify-between items-start mb-12">
                  <div className="w-14 h-14 bg-white text-primary border border-foreground/5 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:border-primary/20 transition-all duration-700 shadow-sm">
                    {sol.icon}
                  </div>
                  <span className="text-[10px] text-primary font-bold opacity-20 group-hover:opacity-100 transition-opacity duration-700 font-accent italic text-xl">0{index + 1}</span>
                </div>

                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-4 tracking-tight group-hover:text-primary transition-colors duration-700">
                    {sol.title}
                  </h2>
                  <p className="text-base font-medium leading-relaxed text-foreground/50 mb-8">
                    {sol.desc}
                  </p>

                  <div className="space-y-4 pt-10 border-t border-primary/10">
                    {sol.features.map((feature, fIndex) => (
                      <div
                        key={fIndex}
                        className="flex items-center gap-4 text-[11px] font-bold uppercase tracking-wider text-foreground/40 group-hover:text-foreground/70 transition-colors"
                      >
                        <div className="w-1.5 h-1.5 rounded-full bg-primary/20 group-hover:bg-primary transition-colors duration-700" />
                        {feature}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 flex justify-end items-center opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-2 group-hover:translate-y-0">
                   <div className="flex items-center gap-3 text-primary">
                     <span className="text-[10px] font-bold tracking-widest uppercase">Select Solution</span>
                     <ArrowUpRight size={18} />
                   </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Decorative Asset */}
      <img src="/assets/wireframe-nodes.png" alt="" className="absolute bottom-0 right-0 w-[500px] h-[500px] opacity-20 pointer-events-none mix-blend-screen mask-radial-fade" />

      <ContactFooter />
    </main>
  );
}
