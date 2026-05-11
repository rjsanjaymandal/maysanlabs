"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, CheckCircle, Briefcase, Code, Mail, Send } from "lucide-react";
import { sendEmail } from "@/app/actions/sendEmail";

const steps = [
  { id: 1, title: "Project Type", icon: Briefcase },
  { id: 2, title: "Requirements", icon: Code },
  { id: 3, title: "Contact", icon: Mail },
];

const projectTypes = [
  { id: "web", label: "Web Application", desc: "Custom web app development" },
  { id: "mobile", label: "Mobile App", desc: "iOS & Android development" },
  { id: "ecommerce", label: "E-Commerce", desc: "Online store development" },
  { id: "saas", label: "SaaS Product", desc: "Software as a service" },
  { id: "custom", label: "Custom Solution", desc: "Other custom development" },
];

const budgets = ["<$5K", "$5K-$15K", "$15K-$50K", "$50K+", "Not sure yet"];

export default function MultiStepForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    projectType: "",
    budget: "",
    description: "",
    name: "",
    email: "",
    phone: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const data = new FormData();
    data.append("companyName", formData.name);
    data.append("email", formData.email);
    data.append("contact", formData.phone);
    data.append("requirements", `Type: ${formData.projectType}, Budget: ${formData.budget}. Description: ${formData.description}`);

    try {
      const result = await sendEmail(data);
      if (result.success) {
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto text-center py-16"
      >
        <div className="w-20 h-20 rounded-full bg-brand-primary/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle size={40} className="text-brand-primary" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Thank You!</h3>
        <p className="text-white/50 mb-6">We&apos;ve received your request and will get back to you within 24 hours.</p>
        <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary rounded-full font-semibold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] transition-all">
          Back to Home
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress Bar */}
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              currentStep >= step.id
                ? "bg-brand-primary text-black"
                : "bg-white/[0.05] text-white/30 border border-white/10"
            }`}>
              {currentStep > step.id ? <CheckCircle size={18} /> : <step.icon size={18} />}
            </div>
            {index < steps.length - 1 && (
              <div className={`w-16 h-0.5 mx-2 ${currentStep > step.id ? "bg-brand-primary" : "bg-white/5"}`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white/[0.02] border border-white/5 rounded-2xl p-8">
        <AnimatePresence mode="wait">
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-xl font-semibold text-white mb-6">What type of project?</h3>
              <div className="space-y-3">
                {projectTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => updateFormData("projectType", type.id)}
                    className={`w-full p-4 rounded-xl text-left transition-all ${
                      formData.projectType === type.id
                        ? "bg-brand-primary/10 border border-brand-primary/30"
                        : "bg-white/[0.02] border border-white/5 hover:border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-white font-medium">{type.label}</p>
                        <p className="text-white/40 text-sm">{type.desc}</p>
                      </div>
                      {formData.projectType === type.id && (
                        <CheckCircle size={20} className="text-brand-primary" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
              <div className="mt-6">
                <p className="text-white/40 text-sm mb-3">Budget Range</p>
                <div className="flex flex-wrap gap-2">
                  {budgets.map((budget) => (
                    <button
                      key={budget}
                      onClick={() => updateFormData("budget", budget)}
                      className={`px-4 py-2 rounded-full text-sm transition-all ${
                        formData.budget === budget
                          ? "bg-brand-primary text-black"
                          : "bg-white/[0.03] text-white/60 border border-white/5 hover:border-white/10"
                      }`}
                    >
                      {budget}
                    </button>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-xl font-semibold text-white mb-6">Tell us about your project</h3>
              <textarea
                value={formData.description}
                onChange={(e) => updateFormData("description", e.target.value)}
                placeholder="Describe your project, goals, timeline, and any specific requirements..."
                rows={6}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-brand-primary/50 focus:outline-none transition-all resize-none"
              />
              <p className="text-white/30 text-sm mt-3">The more details you provide, the better we can help you.</p>
            </motion.div>
          )}

          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
            >
              <h3 className="text-xl font-semibold text-white mb-6">Your contact information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-white/40 text-sm mb-2 block">Name / Company *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    placeholder="John Doe / Acme Corp"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-brand-primary/50 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-sm mb-2 block">Email *</label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
                    placeholder="john@example.com"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-brand-primary/50 focus:outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="text-white/40 text-sm mb-2 block">Phone (optional)</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => updateFormData("phone", e.target.value)}
                    placeholder="+1 234 567 8900"
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/30 focus:border-brand-primary/50 focus:outline-none transition-all"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-between mt-8">
          {currentStep > 1 ? (
            <button
              onClick={prevStep}
              className="flex items-center gap-2 px-5 py-3 rounded-full border border-white/10 text-white/60 hover:text-white hover:border-white/20 transition-all"
            >
              <ArrowLeft size={16} />
              Back
            </button>
          ) : (
            <div />
          )}
          
          {currentStep < 3 ? (
            <button
              onClick={nextStep}
              disabled={currentStep === 1 && !formData.projectType}
              className="flex items-center gap-2 px-6 py-3 bg-brand-primary rounded-full font-semibold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
              <ArrowRight size={16} />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !formData.name || !formData.email}
              className="flex items-center gap-2 px-6 py-3 bg-brand-primary rounded-full font-semibold text-sm text-black hover:shadow-[0_0_30px_rgba(26,109,214,0.5)] transition-all disabled:opacity-50"
            >
              {isSubmitting ? "Sending..." : "Submit"}
              <Send size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}