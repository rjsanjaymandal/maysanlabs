import type { Metadata } from "next";
import StartClient from "./StartClient";

export const metadata: Metadata = {
  title: "Start a Project – Maysan Labs",
  description: "Kick off your custom software development project with Maysan Labs. Fill out the form and our team will get back to you within 24 hours.",
  openGraph: {
    title: "Start a Project with Maysan Labs",
    description: "Tell us about your project and get a free consultation within 24 hours.",
  },
};

export default function StartPage() {
  return <StartClient />;
}
