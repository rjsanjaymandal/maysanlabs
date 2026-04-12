import type { Metadata } from "next";
import EduMaysanClient from "./EduMaysanClient";

export const metadata: Metadata = {
  title: "EduMaysan - School Management Software & ERP",
  description: "EduMaysan is a comprehensive school management software and ERP system. Manage admissions, fees, examinations, and more with our cloud-based platform.",
  keywords: ["school management software", "education ERP", "school management system", "admission management", "fee management software"],
  openGraph: {
    title: "EduMaysan - School Management ERP",
    description: "Comprehensive school management software and ERP system for modern educational institutions.",
  },
};

export default function EduMaysanPage() {
  return <EduMaysanClient />;
}
