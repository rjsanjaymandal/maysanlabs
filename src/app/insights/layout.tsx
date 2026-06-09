import { Metadata } from "next";

export const metadata: Metadata = {
  description: "Deep-dives into modular architecture, tactical automation, and the future of digital SaaS platforms. Quantified engineering excellence from Maysan Labs.",
};

export default function InsightsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
    </>
  );
}
