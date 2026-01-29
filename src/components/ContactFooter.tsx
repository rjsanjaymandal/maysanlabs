"use client";

import Link from "next/link";
import { Mail, MapPin, ArrowUpRight } from "lucide-react";

export default function ContactFooter() {
  return (
    <footer id="contact" className="py-24 bg-muted/10 border-t border-border">
      <div className="container">
        <div className="mb-24 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 text-foreground">
            Engineering the next
            <br />
            <span className="text-primary">high-tech enterprise.</span>
          </h2>

          <p className="text-xl text-muted-foreground mb-12">
            We build the infrastructure, you lead the growth.
          </p>

          <div className="flex justify-center">
            <Link
              href="mailto:business@maysanlabs.com"
              className="inline-flex items-center gap-3 bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:opacity-90 transition-opacity"
            >
              <Mail size={20} />
              <span>Request Infrastructure Audit</span>
              <ArrowUpRight size={20} />
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 border-t border-border pt-12">
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold text-foreground mb-4">Maysan Labs</h4>
            <p className="text-muted-foreground max-w-xs">
              The architects behind modern, automated enterprise systems.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Contact</h4>
            <div>
              <Link
                href="mailto:business@maysanlabs.com"
                className="text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
              >
                <Mail size={16} /> business@maysanlabs.com
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4">Location</h4>
            <p className="text-muted-foreground flex items-center gap-2">
              <MapPin size={16} /> Gurgaon, India
            </p>
          </div>
        </div>

        <div className="mt-12 text-center text-sm text-muted-foreground/50 flex flex-col md:flex-row justify-between items-center">
          <p>© {new Date().getFullYear()} Maysan Labs.</p>
          <p>Built for the Future.</p>
        </div>
      </div>
    </footer>
  );
}
