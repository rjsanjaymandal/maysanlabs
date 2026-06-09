import type { Metadata } from "next";
import { generatePageSEO } from "@/lib/seo/helpers";
import StartClient from "./StartClient";

export const metadata: Metadata = generatePageSEO({
  title: "Start a Project — Custom Software Development",
  description: "Kick off your custom software development project with Maysan Labs. Fill out the form and our team will get back to you within 24 hours.",
  path: "/start",
  keywords: ["start a project", "hire developers", "software development consultation", "custom software project request"]
});

export default function StartPage() {
  return <StartClient />;
}
