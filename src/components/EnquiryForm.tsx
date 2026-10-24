"use client";

import React, { useState } from "react";
import { CLINIC_DETAILS } from "@/data/doctorData";
import { Send, CheckCircle2, ShieldAlert, Phone } from "lucide-react";

export default function EnquiryForm() {
  const [formData, setFormData] = useState({
    parentName: "",
    childAge: "",
    phoneNumber: "",
    email: "",
    querySubject: "Consultation Hours & Schedule",
    message: ""
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    // Basic validation
    if (!formData.parentName.trim()) {
      setErrorMsg("Please enter your name.");
      return;
    }
    if (!formData.phoneNumber.trim() || formData.phoneNumber.replace(/\D/g, "").length < 10) {
      setErrorMsg("Please provide a valid 10-digit mobile contact number.");
      return;
    }
    if (!formData.message.trim()) {
      setErrorMsg("Please enter a short description of your general enquiry.");
      return;
    }

    setStatus("submitting");

    // Client-side confirmation flow for Phase 1 concept
    setTimeout(() => {
      setStatus("success");
    }, 600);
  };

  const handleReset = () => {
    setFormData({
      parentName: "",
      childAge: "",
      phoneNumber: "",
      email: "",
      querySubject: "Consultation Hours & Schedule",
      message: ""
    });
    setStatus("idle");
  };

  return (
    <div className="bg-white rounded-xl border border-border-subtle p-6 sm:p-8 shadow-editorial">
      <div className="mb-6">
        <h3 className="text-xl font-bold tracking-tight text-navy">
          General Clinic Enquiry
        </h3>
        <p className="text-xs sm:text-sm text-charcoal-muted mt-1 leading-relaxed">
          For general questions regarding consultation schedules, clinic directions, or general assistance.
        </p>
      </div>

      {/* Non-emergency & privacy advisory */}
      <div className="mb-6 p-3.5 rounded-lg bg-light-bg border border-border-subtle text-xs text-charcoal-muted space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-charcoal">
          <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0" />
          <span>Non-Emergency Guidance Only</span>
        </div>
        <p>
          Please do not submit confidential medical scans or urgent clinical emergencies here. For acute paediatric conditions, call the clinic at{" "}
          <a href={`tel:${CLINIC_DETAILS.phone.replace(/\s+/g, "")}`} className="text-medical font-medium underline">
            {CLINIC_DETAILS.phone}
          </a>{" "}
          or proceed directly to the nearest emergency paediatric hospital.
        </p>
      </div>

      {status === "success" ? (
        <div className="p-6 rounded-xl bg-emerald-50/80 border border-emerald-200 text-center space-y-3">
          <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
          <h4 className="text-base font-bold text-emerald-950">
            Enquiry Received
          </h4>
          <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
            Thank you, {formData.parentName}. In the live system, your enquiry is directed to the New Life Clinic desk. To reach the reception immediately during evening OPD hours (5:00 PM – 9:00 PM), feel free to call directly.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`tel:${CLINIC_DETAILS.phone.replace(/\s+/g, "")}`}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-navy text-white text-xs font-semibold hover:bg-navy-light transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Clinic: {CLINIC_DETAILS.phone}</span>
            </a>
            <button
              onClick={handleReset}
              className="px-4 py-2 rounded-lg border border-emerald-300 text-emerald-900 text-xs font-medium bg-white hover:bg-emerald-50 transition-colors"
            >
              Send Another Enquiry
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700">
              {errorMsg}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="parentName" className="block text-xs font-semibold text-charcoal mb-1">
                Parent / Guardian Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="parentName"
                name="parentName"
                required
                value={formData.parentName}
                onChange={handleChange}
                placeholder="e.g. Priyadarshini Mohanty"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle bg-warm-white text-sm text-charcoal focus:bg-white focus:border-medical transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <label htmlFor="childAge" className="block text-xs font-semibold text-charcoal mb-1">
                Child&apos;s Age / Developmental Stage
              </label>
              <input
                type="text"
                id="childAge"
                name="childAge"
                value={formData.childAge}
                onChange={handleChange}
                placeholder="e.g. Newborn, 8 months, 4 years"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle bg-warm-white text-sm text-charcoal focus:bg-white focus:border-medical transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="phoneNumber" className="block text-xs font-semibold text-charcoal mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                required
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="e.g. +91 98765 43210"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle bg-warm-white text-sm text-charcoal focus:bg-white focus:border-medical transition-all placeholder:text-slate-400"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-charcoal mb-1">
                Email Address (Optional)
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="parent@example.com"
                className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle bg-warm-white text-sm text-charcoal focus:bg-white focus:border-medical transition-all placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label htmlFor="querySubject" className="block text-xs font-semibold text-charcoal mb-1">
              Topic of Enquiry
            </label>
            <select
              id="querySubject"
              name="querySubject"
              value={formData.querySubject}
              onChange={handleChange}
              className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle bg-warm-white text-sm text-charcoal focus:bg-white focus:border-medical transition-all"
            >
              <option value="Consultation Hours & Schedule">Consultation Hours & OPD Schedule</option>
              <option value="Directions & Finding New Life Clinic">Directions & Clinic Location (Soubhagya Nagar)</option>
              <option value="Preparing for First Consultation">Preparing for Child&apos;s First Visit</option>
              <option value="Hospital Coordination Question">Tertiary Hospital Surgical Coordination Query</option>
              <option value="Other Administrative Question">Other Administrative Question</option>
            </select>
          </div>

          <div>
            <label htmlFor="message" className="block text-xs font-semibold text-charcoal mb-1">
              Your Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              required
              value={formData.message}
              onChange={handleChange}
              placeholder="Please describe how the clinic team may assist you..."
              className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle bg-warm-white text-sm text-charcoal focus:bg-white focus:border-medical transition-all placeholder:text-slate-400"
            />
            <p className="text-[11px] text-charcoal-muted mt-1">
              Do not include confidential medical files or critical emergencies.
            </p>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-navy hover:bg-navy-light text-white text-sm font-semibold shadow-xs hover:shadow-editorial transition-all disabled:opacity-50 cursor-pointer"
          >
            <Send className="w-4 h-4" />
            <span>{status === "submitting" ? "Submitting..." : "Send General Enquiry"}</span>
          </button>
        </form>
      )}
    </div>
  );
}
