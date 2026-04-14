import AboutClient from "./AboutClient";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us | Maysan Labs",
  description: "Learn about Maysan Labs - we build websites, apps, and software that help businesses grow.",
};

export default function AboutPage() {
  return <AboutClient />;
}
