"use client";

import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import { jobPositions } from "@/lib/careers-data";
import { Users, Target, Rocket, MapPin, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function CareersClient() {
  return (
    <main id="main-content" aria-label="Careers at Maysan Labs" className="min-h-screen bg-background relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(128,128,128,0.02)_1px,transparent_1px),linear-gradient(to_bottom,rgba(128,128,128,0.02)_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none z-0" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-primary/5 rounded-full blur-[140px] pointer-events-none" />

      <Navbar />

      <section className="pt-32 pb-20 relative">
        <div className="container-main relative">
          <div className="max-w-5xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-6">
              <Rocket size={12} />
              Join the Lab
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground mb-6 leading-tight">
              Shape the Future of <span className="text-brand-primary">Engineering</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/50 leading-relaxed mb-8 max-w-2xl">
              We&apos;re looking for radical thinkers and elite engineers to build mission-critical infrastructure.
            </p>
            <Link href="#openings" className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-primary/90 transition-colors">
              View Open Roles
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 border-y border-gray-100 relative">
        <div className="container-main">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: <Rocket size={20} />, title: "Velocity First", desc: "We value speed and decisiveness. We ship early, iterate fast, and maintain absolute quality standards." },
              { icon: <Users size={20} />, title: "Remote Excellence", desc: "Maysan is a globally distributed team. We trust our people to deliver high-fidelity code from anywhere." },
              { icon: <Target size={20} />, title: "Radical Integrity", desc: "We take extreme ownership of our work and its impact. Transparency is our default operational mode." }
            ].map((value, i) => (
              <div 
                key={i}
                className="bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-2xl backdrop-blur-sm shadow-sm p-6 md:p-8 hover:border-brand-primary/30 transition-all"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                  {value.icon}
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-3 tracking-tight">{value.title}</h3>
                <p className="text-foreground/60 text-sm leading-relaxed">
                  {value.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="openings" className="py-16 md:py-24">
        <div className="container-main">
          <div className="mb-12 max-w-5xl mx-auto">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.06] text-brand-primary text-xs font-semibold uppercase tracking-wider mb-4">
              <Target size={12} />
              Opportunities
            </span>
            <h2 className="text-3xl md:text-4xl font-semibold text-foreground mb-4">
              Open <span className="text-brand-primary">Roles</span>
            </h2>
            <p className="text-foreground/50 text-lg">
              Join a team engineering the world&apos;s most resilient enterprise infrastructure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {jobPositions.map((job) => (
              <div
                key={job.id}
                className="group"
              >
                <Link href={`/careers/apply?role=${job.id}`} className="block h-full">
                  <div className="bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-2xl backdrop-blur-sm shadow-sm p-6 md:p-8 transition-all hover:border-brand-primary/30 hover:shadow-md h-full flex flex-col">
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-[11px] font-semibold px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary uppercase tracking-wide">
                        {job.category}
                      </span>
                      <span className="text-[11px] text-foreground/40 font-medium uppercase tracking-wider">
                        {job.type}
                      </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-foreground mb-3 group-hover:text-brand-primary transition-colors tracking-tight">
                      {job.title}
                    </h3>
                    <p className="text-foreground/60 text-sm leading-relaxed mb-6 flex-1">
                      {job.description}
                    </p>
                    <div className="flex items-center gap-2 pt-4 border-t border-gray-100 mb-5">
                      <MapPin size={14} className="text-brand-primary shrink-0" />
                      <span className="text-sm text-foreground/60">{job.location}</span>
                    </div>
                    <div className="flex items-center gap-2 text-brand-primary text-sm font-semibold group-hover:gap-3 transition-all mt-auto">
                      Apply now <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-white/70 dark:bg-white/[0.02] border border-gray-100 dark:border-white/[0.06] rounded-2xl backdrop-blur-sm shadow-sm p-8 md:p-12 text-center max-w-5xl mx-auto">
            <h3 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">Don&apos;t see a perfect fit?</h3>
            <p className="text-foreground/60 max-w-xl mx-auto mb-8">
              We&apos;re always looking for exceptional engineers and architects. If you&apos;re building the future, we want to hear from you.
            </p>
            <Link href="/careers/apply" className="inline-flex items-center gap-2 bg-brand-primary text-white px-6 py-3 rounded-full font-semibold hover:bg-brand-primary/90 transition-colors">
              Apply for Future Roles
            </Link>
          </div>
        </div>
      </section>

      <ContactFooter />
    </main>
  );
}