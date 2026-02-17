"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Navbar from "@/components/Navbar";
import ContactFooter from "@/components/ContactFooter";
import {
  User,
  Mail,
  Phone,
  Link as LinkIcon,
  FileUp,
  CheckCircle,
  ArrowLeft,
  Loader2,
  MessageSquare,
  Globe,
} from "lucide-react";
import Link from "next/link";
import { applyJob } from "@/app/actions/applyJob";
import { jobPositions } from "@/lib/careers-data";

function ApplyForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const jobId = searchParams.get("role");
  const job = jobPositions.find((j) => j.id === jobId);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    linkedIn: "",
    portfolio: "",
    message: "",
  });

  const [resume, setResume] = useState<File | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResume(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume) {
      setError("Please upload your resume.");
      return;
    }

    setIsSubmitting(true);
    setError(null);

    const data = new FormData();
    data.append("name", formData.name);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("linkedIn", formData.linkedIn);
    data.append("portfolio", formData.portfolio);
    data.append("message", formData.message);
    data.append("resume", resume);
    data.append("jobId", jobId || "general");
    data.append("jobTitle", job?.title || "General Application");

    const result = await applyJob(data);
    setIsSubmitting(false);

    if (result.success) {
      setIsSubmitted(true);
    } else {
      setError(
        result.message || "Failed to submit application. Please try again.",
      );
    }
  };

  return (
    <div className="bg-card border border-border/50 rounded-xl shadow-2xl p-8 backdrop-blur-sm">
      {!isSubmitted ? (
        <>
          <div className="mb-8">
            <Link
              href="/careers"
              className="inline-flex items-center gap-2 text-xs text-primary font-mono uppercase tracking-widest mb-6 hover:gap-3 transition-all"
            >
              <ArrowLeft size={14} /> Back to Careers
            </Link>
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              Apply for {job?.title || "Role"}
            </h1>
            <p className="text-muted-foreground">
              Please share your details and we'll be in touch soon.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <User size={16} className="text-primary" /> Full Name
                </label>
                <input
                  id="name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Mail size={16} className="text-primary" /> Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              {/* Phone */}
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Phone size={16} className="text-primary" /> Phone Number
                </label>
                <input
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              {/* Resume Upload */}
              <div className="space-y-2">
                <label
                  htmlFor="resume"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <FileUp size={16} className="text-primary" /> Resume / CV
                  (PDF/Word)
                </label>
                <input
                  id="resume"
                  name="resume"
                  type="file"
                  required
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-[9px] focus:ring-2 focus:ring-primary/20 outline-none transition-all file:mr-4 file:py-1 file:px-2 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-primary/20 file:text-primary hover:file:bg-primary/30"
                />
              </div>

              {/* LinkedIn */}
              <div className="space-y-2">
                <label
                  htmlFor="linkedIn"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <LinkIcon size={16} className="text-primary" /> LinkedIn
                  Profile
                </label>
                <input
                  id="linkedIn"
                  name="linkedIn"
                  value={formData.linkedIn}
                  onChange={handleChange}
                  placeholder="https://linkedin.com/in/..."
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>

              {/* Portfolio */}
              <div className="space-y-2">
                <label
                  htmlFor="portfolio"
                  className="text-sm font-medium flex items-center gap-2"
                >
                  <Globe size={16} className="text-primary" /> Portfolio /
                  Github
                </label>
                <input
                  id="portfolio"
                  name="portfolio"
                  value={formData.portfolio}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                  className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label
                htmlFor="message"
                className="text-sm font-medium flex items-center gap-2"
              >
                <MessageSquare size={16} className="text-primary" /> Cover
                Letter / Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell us why you're a great fit for Maysan Labs..."
                className="w-full bg-background/50 border border-border rounded-lg px-4 py-3 focus:ring-2 focus:ring-primary/20 outline-none transition-all resize-none"
              />
            </div>

            {error && (
              <p className="text-destructive text-sm font-medium">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-lg hover:opacity-90 transition-opacity uppercase tracking-widest text-sm shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 size={18} className="animate-spin" /> Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </button>
          </form>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center text-center py-12 animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <CheckCircle size={32} className="text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Application Received</h2>
          <p className="text-muted-foreground max-w-md mb-8">
            Thank you,{" "}
            <span className="text-foreground font-bold">{formData.name}</span>.
            We've received your application for the{" "}
            <span className="text-foreground font-bold">{job?.title}</span>{" "}
            position. Our team will review your profile and get back to you
            shortly.
          </p>
          <Link
            href="/careers"
            className="text-sm text-primary hover:underline underline-offset-4"
          >
            Return to Careers
          </Link>
        </div>
      )}
    </div>
  );
}

export default function CareerApplyPage() {
  return (
    <main className="min-h-screen bg-background flex flex-col pt-20">
      <Navbar />
      <div className="container max-w-3xl flex-1 flex flex-col justify-center py-16 px-4">
        <Suspense
          fallback={
            <div className="flex items-center justify-center py-20">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          }
        >
          <ApplyForm />
        </Suspense>
      </div>
      <ContactFooter />
    </main>
  );
}
