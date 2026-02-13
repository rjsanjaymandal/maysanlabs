import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Get in Touch",
  description:
    "Connect with Maysan Labs to start your next enterprise project. Share your requirements and our engineering team will get back to you.",
  alternates: {
    canonical: "/init",
  },
};

export default function InitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
