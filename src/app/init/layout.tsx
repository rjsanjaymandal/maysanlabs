import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Project Initialization",
  description:
    "Secure terminal for project onboarding. Secure your architecture and define your operational sync timeline.",
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
