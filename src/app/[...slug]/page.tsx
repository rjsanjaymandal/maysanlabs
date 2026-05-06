import Link from "next/link";
import { Home, ArrowRight } from "lucide-react";

export default function Custom404() {
  return (
    <main className="min-h-screen bg-[var(--bg-dark)] flex items-center justify-center px-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-8xl font-bold text-brand-primary mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-white mb-4">Page Not Found</h2>
        <p className="text-white/50 mb-8">
          Sorry, we couldn't find the page you're looking for. 
          The page might have been moved or deleted.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary rounded-full font-semibold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] transition-all"
          >
            <Home size={16} />
            Go Home
          </Link>
          <Link 
            href="/init" 
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 text-white/70 font-semibold text-sm hover:bg-white/5 hover:text-white transition-all"
          >
            Contact Us
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 text-left">
          <div>
            <h3 className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-3">Pages</h3>
            <ul className="space-y-2">
              <li><Link href="/services" className="text-white/50 hover:text-brand-primary text-sm">Services</Link></li>
              <li><Link href="/products" className="text-white/50 hover:text-brand-primary text-sm">Products</Link></li>
              <li><Link href="/case-studies" className="text-white/50 hover:text-brand-primary text-sm">Case Studies</Link></li>
              <li><Link href="/blog" className="text-white/50 hover:text-brand-primary text-sm">Blog</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-white/30 text-xs font-semibold uppercase tracking-wider mb-3">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about" className="text-white/50 hover:text-brand-primary text-sm">About</Link></li>
              <li><Link href="/careers" className="text-white/50 hover:text-brand-primary text-sm">Careers</Link></li>
              <li><Link href="/init" className="text-white/50 hover:text-brand-primary text-sm">Contact</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}