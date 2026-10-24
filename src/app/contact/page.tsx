import React from "react";
import type { Metadata } from "next";
import { CLINIC_DETAILS, DOCTOR_DETAILS } from "@/data/doctorData";
import EnquiryForm from "@/components/EnquiryForm";
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Navigation, 
  AlertTriangle, 
  Building2, 
  Calendar,
  ExternalLink,
  ShieldCheck
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact New Life Clinic & Dr. Abhishek Anand | Bhubaneswar",
  description: "Contact Dr. Abhishek Anand at New Life Clinic, Soubhagya Nagar, Bhubaneswar. Verified phone: +91 91246 16273. Timings: Mon-Sat 5:00 PM - 9:00 PM."
};

export default function ContactPage() {
  return (
    <div className="space-y-16 py-10 sm:py-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-light text-teal-dark text-xs font-semibold uppercase tracking-wider">
            <Phone className="w-3.5 h-3.5 text-teal" />
            <span>Clinic Contact & Hours</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            Contact Dr. Abhishek Anand
          </h1>
          <p className="text-base text-teal-dark font-medium">
            New Life Clinic, Soubhagya Nagar, Bhubaneswar, Odisha
          </p>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            Reach out by telephone to schedule an outpatient paediatric surgery consultation, confirm daily OPD timings, or obtain directions to the clinic.
          </p>
        </div>
      </section>

      {/* Emergency Advisory Strip */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 sm:p-5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 flex items-start sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-amber-950 text-sm block">
                Urgent Medical Notice for Acute Emergencies
              </span>
              <p className="mt-0.5 leading-relaxed text-amber-900">
                For acute surgical emergencies (such as acute severe abdominal pain, acute testicular pain/swelling, severe breathing difficulty, or critical newborn illness), do not wait for email or web responses. Take your child immediately to the nearest hospital 24/7 paediatric emergency triage.
              </p>
            </div>
          </div>
          <a
            href="tel:108"
            className="shrink-0 px-3 py-1.5 rounded-lg bg-amber-700 text-white font-semibold text-xs hover:bg-amber-800 transition-colors"
          >
            Emergency: 108
          </a>
        </div>
      </section>

      {/* Main Grid: Details + Enquiry Form */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            {/* Primary Helpline */}
            <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-medical-light text-medical flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted block">
                    Verified Clinic Telephone
                  </span>
                  <a
                    href={`tel:${CLINIC_DETAILS.phone.replace(/\s+/g, "")}`}
                    className="text-xl font-bold text-navy hover:text-medical transition-colors block"
                  >
                    {CLINIC_DETAILS.phone}
                  </a>
                </div>
              </div>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Working telephone link. Tap to dial directly from your smartphone during evening OPD hours.
              </p>
              <a
                href={`tel:${CLINIC_DETAILS.phone.replace(/\s+/g, "")}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-medical hover:bg-medical-hover text-white text-xs font-semibold shadow-xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Clinic Now</span>
              </a>
            </div>

            {/* Email Contact */}
            <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-teal-light text-teal flex items-center justify-center">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted block">
                    Administrative Email
                  </span>
                  <a
                    href={`mailto:${CLINIC_DETAILS.email}`}
                    className="text-sm sm:text-base font-bold text-navy hover:text-teal transition-colors block"
                  >
                    {CLINIC_DETAILS.email}
                  </a>
                </div>
              </div>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Working mailto link for general non-emergency enquiries or doctor correspondence.
              </p>
              <a
                href={`mailto:${CLINIC_DETAILS.email}`}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg border border-border-subtle bg-light-bg hover:bg-slate-200 text-charcoal text-xs font-semibold transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Compose Email</span>
              </a>
            </div>

            {/* Consultation Hours */}
            <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-3">
              <div className="flex items-center gap-2 font-bold text-navy text-sm">
                <Clock className="w-4 h-4 text-teal" />
                <span>Confirmed Consultation Timings</span>
              </div>
              <div className="space-y-2 text-xs text-charcoal">
                <div className="flex items-center justify-between p-2 rounded bg-light-bg">
                  <span className="font-semibold">Monday – Saturday:</span>
                  <span className="font-bold text-navy">5:00 PM – 9:00 PM</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-light-bg text-charcoal-muted">
                  <span>Sunday:</span>
                  <span>Closed (Emergency only)</span>
                </div>
              </div>
              <p className="text-[11px] text-charcoal-muted pt-1">
                Note: Exact token timings may vary on festival days or due to emergency operating theatre cases.
              </p>
            </div>

            {/* Address & Google Maps */}
            <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-3">
              <div className="flex items-center gap-2 font-bold text-navy text-sm">
                <MapPin className="w-4 h-4 text-teal" />
                <span>Clinic Address</span>
              </div>
              <div className="text-xs text-charcoal leading-relaxed">
                <p className="font-semibold text-navy">{CLINIC_DETAILS.name}</p>
                <p>{CLINIC_DETAILS.address}</p>
                <p className="text-charcoal-muted">{CLINIC_DETAILS.landmark}</p>
              </div>
              <a
                href={CLINIC_DETAILS.googleMapsQuery}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-teal-dark hover:underline pt-1"
              >
                <Navigation className="w-3.5 h-3.5 text-teal" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>
            </div>
          </div>

          {/* Right Column: General Enquiry Form */}
          <div className="lg:col-span-7">
            <EnquiryForm />
          </div>
        </div>
      </section>
    </div>
  );
}
