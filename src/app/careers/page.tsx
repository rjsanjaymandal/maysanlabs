import type { Metadata } from "next";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import SpotlightCard from "@/components/SpotlightCard";
import { jobPositions } from "@/lib/careers-data";
import { Users, Target, Rocket, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Careers | Join Our SaaS Development Team",
  description: "Join Maysan Labs - a leading SaaS development company. We're hiring talented developers, engineers, and product managers. Explore career opportunities.",
  keywords: ["careers", "jobs", "hiring", "software development jobs", "SaaS company careers", "tech jobs"],
  openGraph: {
    title: "Careers | Join Maysan Labs",
    description: "Join our team of expert SaaS developers and engineers.",
  },
};

export default function CareersPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="pt-32 pb-20 bg-muted/10 border-b border-border">
        <div className="container">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-mono text-primary uppercase tracking-wider mb-4 block"
          >
            Join the Lab
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Shape the Future of <br />
            <span className="text-muted-foreground">Autonomous SaaS</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl leading-relaxed"
          >
            We&apos;re looking for radical thinkers and elite engineers to build
            the infrastructure of the modern enterprise.
          </motion.p>
        </div>
      </div>

      {/* Culture/Values Section */}
      <section className="py-24 border-b border-border">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                <Rocket size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Velocity First</h3>
              <p className="text-muted-foreground leading-relaxed">
                We value speed and decisiveness. We ship early, iterate fast,
                and maintain a high standard of quality.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                <Users size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Remote Excellence</h3>
              <p className="text-muted-foreground leading-relaxed">
                Maysan is a globally distributed team. We trust our people to
                deliver from anywhere in the world.
              </p>
            </div>
            <div>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-6 border border-primary/20">
                <Target size={24} />
              </div>
              <h3 className="text-xl font-bold mb-4">Radical Integrity</h3>
              <p className="text-muted-foreground leading-relaxed">
                We are honest with ourselves and our clients. We take ownership
                of our work and its impact.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section className="py-24 bg-muted/5">
        <div className="container">
          <div className="mb-16">
            <h2 className="text-3xl font-bold tracking-tight mb-4">
              Open Positions
            </h2>
            <p className="text-muted-foreground">
              Be part of a team engineering the world&apos;s most resilient SaaS
              infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobPositions.map((job, index) => (
              <motion.div
                key={job.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <SpotlightCard className="h-full bg-card/50 border border-border p-8 rounded-2xl flex flex-col group">
                  <div className="flex items-center justify-between mb-6">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-[10px] font-mono uppercase tracking-widest rounded-full border border-primary/20">
                      {job.category}
                    </span>
                    <span className="text-[10px] text-muted-foreground font-mono uppercase tracking-widest">
                      {job.type}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors">
                    {job.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-8 flex-1">
                    {job.description}
                  </p>
                  <div className="flex flex-wrap items-center gap-6 mb-8 pt-6 border-t border-border/10">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin size={14} className="text-primary/70" />
                      {job.location}
                    </div>
                  </div>
                  <Link
                    href={`/careers/apply?role=${job.id}`}
                    className="inline-flex items-center gap-2 text-sm font-bold text-primary group-hover:gap-3 transition-all"
                  >
                    APPLY NOW <ArrowRight size={16} />
                  </Link>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-20 p-12 border border-border rounded-2xl bg-card text-center relative overflow-hidden">
            <div className="relative z-10">
              <h3 className="text-2xl font-bold mb-4">Don&apos;t see a fit?</h3>
              <p className="text-muted-foreground max-w-xl mx-auto mb-8">
                We&apos;re always looking for exceptional talent. If you&apos;re
                building something cool or want to join our mission, say hello
                anyway.
              </p>
              <Link
                href="/careers/apply"
                className="inline-block bg-primary text-primary-foreground font-bold px-8 py-3 rounded-lg hover:opacity-90 transition-opacity uppercase tracking-widest text-sm shadow-lg shadow-primary/20"
              >
                Opportunistic Hire
              </Link>
            </div>
            <div className="absolute top-0 left-0 w-full h-full bg-primary/5 opacity-50 pointer-events-none" />
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}
