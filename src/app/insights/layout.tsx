import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Insights | Maysan Labs",
  description: "Deep-dives into modular architecture, tactical automation, and the future of digital SaaS platforms. Quantified engineering excellence from Maysan Labs.",
  openGraph: {
    title: "Technical Insights | Maysan Labs",
    description: "Discover the industrial data and research driving Maysan Labs' innovation.",
  }
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
