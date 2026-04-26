import { ArrowRightIcon } from "lucide-react";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const BentoGrid = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        "grid w-full auto-rows-[22rem] grid-cols-3 gap-4",
        className,
      )}
    >
      {children}
    </div>
  );
};

const BentoCard = ({
  name,
  className,
  background,
  Icon,
  description,
  href,
  cta,
}: {
  name: string;
  className?: string;
  background: ReactNode;
  Icon: React.ComponentType<{ className?: string }>;
  description: string;
  href: string;
  cta: string;
}) => (
  <div
    key={name}
    className={cn(
      "group relative col-span-3 flex flex-col justify-between overflow-hidden rounded-3xl",
      "bg-black/40 backdrop-blur-xl border border-white/10 transition-all duration-500 hover:border-[var(--brand-primary)]/50",
      className,
    )}
  >
    <div>{background}</div>
    <div className="pointer-events-none z-10 flex transform-gpu flex-col gap-1 p-6 transition-all duration-300 group-hover:-translate-y-10">
      <Icon className="h-12 w-12 origin-left transform-gpu text-[var(--brand-primary)] transition-all duration-300 ease-in-out group-hover:scale-75" />
      <h3 className="text-xl font-black tracking-tighter uppercase text-white">
        {name}
      </h3>
      <p className="max-w-lg text-white/60 font-medium text-sm leading-relaxed">{description}</p>
    </div>

    <div
      className={cn(
        "pointer-events-none absolute bottom-0 flex w-full translate-y-10 transform-gpu flex-row items-center p-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100",
      )}
    >
      <a
        href={href}
        className="pointer-events-auto flex items-center gap-1 text-sm font-black uppercase tracking-widest text-[var(--brand-primary)] group-hover:gap-3 transition-all duration-300"
      >
        {cta}
        <ArrowRightIcon className="ml-2 h-4 w-4" />
      </a>
    </div>
    <div className="pointer-events-none absolute inset-0 transform-gpu transition-all duration-300 group-hover:bg-black/[.03] group-hover:dark:bg-neutral-800/10" />
  </div>
);

export { BentoCard, BentoGrid };
