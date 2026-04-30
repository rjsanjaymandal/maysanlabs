"use client";

import { motion } from "framer-motion";
import { 
  Search, 
  Layers, 
  Code2, 
  Rocket, 
  ChevronRight 
} from "lucide-react";
import styles from "./OperationsRoadmap.module.css";

const stages = [
  {
    tag: "Phase_01",
    title: "Discovery & Strategy",
    desc: "We analyze your business needs, technical requirements, and market positioning to build a solid foundation.",
    icon: Search,
  },
  {
    tag: "Phase_02",
    title: "Architecture Design",
    desc: "Crafting scalable system architectures and intuitive UX blueprints that handle growth effortlessly.",
    icon: Layers,
  },
  {
    tag: "Phase_03",
    title: "Development Sprint",
    desc: "High-velocity execution using modern stacks, ensuring clean code and rigorous performance standards.",
    icon: Code2,
  },
  {
    tag: "Phase_04",
    title: "Deployment & Scale",
    desc: "Seamless transition to production with automated pipelines and continuous monitoring for zero downtime.",
    icon: Rocket,
  },
];

export default function OperationsRoadmap() {
  return (
    <section className="sec-xl relative overflow-hidden bg-background">
      <div className="container-main mb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="label-mono mb-6 block">Execution Cycle</span>
          <h2 className="text-5xl md:text-8xl font-black tracking-tighter uppercase leading-[0.85]">
            Our <span className="text-brand-primary italic">Process</span> <br />
            Flow.
          </h2>
        </motion.div>
      </div>

      <div className={styles.roadmapContainer}>
        <div className={styles.line} />
        
        {stages.map((stage, index) => (
          <div key={index} className={styles.stage}>
            <div className={styles.marker}>
              <div className={styles.dot} />
              <div className={styles.iconBox}>
                <stage.icon size={20} />
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className={styles.content}
            >
              <span className={styles.tag}>{stage.tag}</span>
              <h3 className={styles.title}>{stage.title}</h3>
              <p className={styles.desc}>{stage.desc}</p>
            </motion.div>
          </div>
        ))}
      </div>

      {/* Industrial Footer Line */}
      <div className="mt-40 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
