"use client";

import Link from "next/link";
import { Mail, MapPin, ArrowUpRight, ArrowRight } from "lucide-react";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";
import { motion } from "framer-motion";

export default function ContactFooter() {
  return (
    <footer id="contact" className="relative overflow-hidden">
      {/* CTA Section */}
      <div className="py-32 relative noise-bg">
        {/* Gradient orb behind CTA */}
        <div
          className="orb"
          style={{
            width: 500,
            height: 500,
            background: "hsla(82, 85%, 55%, 0.06)",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />

        <div className="container relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="mb-8">
              <TextReveal
                as="h2"
                className="text-4xl md:text-6xl lg:text-7xl font-black tracking-tighter text-foreground leading-[0.95]"
              >
                Engineering the next high-tech enterprise.
              </TextReveal>
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl text-muted-foreground mb-12 max-w-xl mx-auto"
            >
              We build the infrastructure, you lead the growth.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row justify-center gap-4"
            >
              <MagneticButton
                href="/init"
                className="btn btn-primary text-lg px-8 py-4"
              >
                <Mail size={20} className="mr-1" />
                Get in Touch
                <ArrowRight size={20} className="ml-1" />
              </MagneticButton>
              <MagneticButton
                href="mailto:business@maysanlabs.com"
                className="btn btn-secondary text-lg px-8 py-4"
              >
                <span>business@maysanlabs.com</span>
                <ArrowUpRight size={18} />
              </MagneticButton>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer Grid */}
      <div className="border-t border-border bg-card/30 backdrop-blur-sm py-12">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="col-span-1 md:col-span-2">
              <h4 className="font-bold text-foreground text-lg mb-3">
                Maysan Labs
              </h4>
              <p className="text-muted-foreground max-w-xs text-sm leading-relaxed">
                The architects behind modern, automated enterprise systems.
                Building digital infrastructure that scales.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
                Contact
              </h4>
              <Link
                href="mailto:business@maysanlabs.com"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 text-sm"
              >
                <Mail size={14} /> business@maysanlabs.com
              </Link>
            </div>

            <div>
              <h4 className="font-bold text-foreground mb-4 text-sm uppercase tracking-wider">
                Location
              </h4>
              <p className="text-muted-foreground flex items-center gap-2 text-sm">
                <MapPin size={14} /> Gurgaon, India
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-border/50 text-center text-xs text-muted-foreground/40 flex flex-col md:flex-row justify-between items-center gap-2">
            <p>
              © {new Date().getFullYear()} Maysan Labs. All rights reserved.
            </p>
            <p className="font-mono tracking-wider">Built for the Future.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
