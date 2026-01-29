import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Technical Insights",
  description:
    "Deep-dives into modular architecture, tactical automation, and the future of digital SaaS platforms. Access our technical logs and research.",
  alternates: {
    canonical: "/insights",
  },
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
