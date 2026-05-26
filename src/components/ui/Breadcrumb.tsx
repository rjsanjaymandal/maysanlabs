"use client";

import Link from "next/link";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
      <Link 
        href="/" 
        className="text-foreground/60 hover:text-brand-primary transition-colors"
      >
        Home
      </Link>
      {items.map((item, index) => (
        <span key={index} className="flex items-center gap-2">
          <span className="text-foreground/40">/</span>
          {item.href ? (
            <Link 
              href={item.href}
              className="text-foreground/60 hover:text-brand-primary transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground/90" aria-current="page">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}