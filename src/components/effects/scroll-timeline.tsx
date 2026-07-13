"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from "framer-motion";
import { Search, Layers, Code2, Rocket } from "lucide-react";

const stages = [
  {
    title: "Discovery",
    desc: "We analyze your needs and build a solid foundation for your project.",
    icon: Search,
  },
  {
    title: "Architecture",
    desc: "Scalable designs that handle growth effortlessly from day one.",
    icon: Layers,
  },
  {
    title: "Development",
    desc: "Fast execution with clean, performant code and regular updates.",
    icon: Code2,
  },
  {
    title: "Launch",
    desc: "Seamless deployment with monitoring for zero downtime.",
    icon: Rocket,
  },
];

function TimelineStep({
  stage,
  index,
  total,
  progress,
  reversed,
}: {
  stage: (typeof stages)[0];
  index: number;
  total: number;
  progress: MotionValue<number>;
  reversed: boolean;
}) {
  const threshold = index / total;

  const isActive = useTransform<number, number>(progress, (v) =>
    v >= threshold ? 1 : 0
  );

  const nodeProgress = useTransform<number, number>(
    progress,
    [threshold, (index + 1) / total],
    [0, 1]
  );

  const nodeColor = useTransform(isActive, [0, 1], [
    "rgba(148, 163, 184, 0.3)",
    "rgba(0, 210, 255, 1)",
  ]);

  const nodeScale = useTransform(nodeProgress, [0, 0.4, 1], [1, 1.3, 1]);

  const iconColor = useTransform(isActive, [0, 1], [
    "rgba(148, 163, 184, 0.5)",
    "rgba(0, 210, 255, 1)",
  ]);

  const cardBorder = useTransform(isActive, [0, 1], [
    "rgba(148, 163, 184, 0.2)",
    "rgba(0, 210, 255, 0.2)",
  ]);

  return (
    <div
      className={`relative flex items-start gap-6 md:gap-0 ${
        reversed ? "md:flex-row-reverse" : "md:flex-row"
      }`}
    >
      <div className="hidden md:flex absolute left-1/2 top-6 -translate-x-1/2 z-10 flex-col items-center">
        <motion.div
          className="w-11 h-11 bg-[var(--bg-dark)] border flex items-center justify-center rounded-full shadow-md"
          style={{ borderColor: nodeColor, scale: nodeScale }}
        >
          <motion.div style={{ color: iconColor }}>
            <stage.icon size={16} />
          </motion.div>
        </motion.div>
      </div>

      <div className="md:hidden flex flex-col items-center shrink-0 z-10 pt-5">
        <motion.div
          className="w-8 h-8 bg-[var(--glass-chip-bg)] border flex items-center justify-center rounded-lg"
          style={{ borderColor: nodeColor }}
        >
          <motion.div style={{ color: iconColor }}>
            <stage.icon size={14} />
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="flex-1 md:w-[calc(50%-2rem)] bg-[var(--glass-chip-bg)] border rounded-2xl p-5 md:p-6 transition-shadow duration-500 shadow-md hover:shadow-lg hover:shadow-brand-primary/5"
        style={{ borderColor: cardBorder }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: index * 0.08 }}
      >
        <div
          className={`flex items-center gap-3 mb-3 ${
            reversed ? "md:flex-row-reverse" : ""
          }`}
        >
          <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-brand-primary/10 text-brand-primary uppercase tracking-wider">
            0{index + 1}
          </span>
          <h3 className="text-lg font-bold text-foreground">{stage.title}</h3>
        </div>
        <p className="text-foreground/45 text-sm leading-relaxed">{stage.desc}</p>
      </motion.div>
    </div>
  );
}

export default function ScrollTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  const lineScaleY = useTransform(smoothProgress, [0, 1], [0, 1]);

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden bg-background">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[240px] sm:w-[500px] h-[240px] sm:h-[500px] bg-brand-primary/2 rounded-full blur-[60px] sm:blur-[120px] pointer-events-none" />

      <div className="container-main mb-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--glass-chip-bg)] border border-[var(--glass-chip-border)] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4">
            <Rocket size={12} className="text-brand-primary" />
            Our Process
          </span>
          <h2 className="text-3xl md:text-4xl font-semibold text-foreground">
            How <span className="text-brand-primary">Maysan Labs</span> delivers success
          </h2>
        </motion.div>
      </div>

      <div className="container-main">
        <div className="relative max-w-4xl mx-auto">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 -translate-x-1/2 z-0">
            <div className="absolute inset-0 rounded-full bg-[var(--glass-chip-border)]" />
            <motion.div
              className="absolute top-0 left-0 w-full origin-top rounded-full bg-[#00D2FF] shadow-[0_0_12px_rgba(0,210,255,0.4)]"
              style={{ scaleY: lineScaleY }}
            />
          </div>

          <div className="relative space-y-16 md:space-y-24 z-10">
            {stages.map((stage, index) => (
              <TimelineStep
                key={index}
                stage={stage}
                index={index}
                total={stages.length}
                progress={smoothProgress}
                reversed={index % 2 !== 0}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}


