import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Initialize Project | Maysan Labs",
  description: "Establish a high-performance communication uplink with Maysan Labs industrial compute core. State your objectives to begin the modular SaaS architecture protocol.",
  robots: {
    index: false,
    follow: false,
  },
  openGraph: {
    title: "Initialize Project | Maysan Labs",
    description: "Launch your enterprise SaaS transformation with Maysan Labs.",
  }
};

export default function InitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
