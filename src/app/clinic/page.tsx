import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { CLINIC_DETAILS, DOCTOR_DETAILS } from "@/data/doctorData";
import { 
  Building2, 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  ExternalLink, 
  Navigation, 
  ShieldCheck, 
  AlertCircle,
  Car,
  Train,
  Plane
} from "lucide-react";

export const metadata: Metadata = {
  title: "New Life Clinic | Soubhagya Nagar, Bhubaneswar | Dr. Abhishek Anand",
  description: "Visit New Life Clinic in Soubhagya Nagar, Bhubaneswar for outpatient paediatric surgery consultations with Dr. Abhishek Anand. View address, timings, phone number, and directions."
};

export default function ClinicPage() {
  return (
    <div className="space-y-16 py-10 sm:py-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-light text-teal-dark text-xs font-semibold uppercase tracking-wider">
            <Building2 className="w-3.5 h-3.5 text-teal" />
            <span>Outpatient Medical Centre</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            New Life Clinic
          </h1>
          <p className="text-lg text-teal-dark font-medium">
            Soubhagya Nagar, Bhubaneswar, Odisha — 751003
          </p>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            A dedicated healthcare centre providing outpatient paediatric surgical consultations, child wellness reviews, and post-operative follow-up care in a calm, family-centred setting.
          </p>
        </div>
      </section>

      {/* Main Clinic Information Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Essential Clinic Details */}
          <div className="lg:col-span-7 space-y-8">
            {/* Quick Contact & Timings Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Telephone Card */}
              <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-3">
                <div className="w-10 h-10 rounded-xl bg-medical-light text-medical flex items-center justify-center">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted block">
                    Verified Clinic Helpline
                  </span>
                  <a
                    href={`tel:${CLINIC_DETAILS.phone.replace(/\s+/g, "")}`}
                    className="text-lg sm:text-xl font-bold text-navy hover:text-medical transition-colors block mt-1"
                  >
                    {CLINIC_DETAILS.phone}
                  </a>
                </div>
                <p className="text-xs text-charcoal-muted">
                  Call during evening OPD hours to check Dr. Anand&apos;s daily availability.
                </p>
                <a
                  href={`tel:${CLINIC_DETAILS.phone.replace(/\s+/g, "")}`}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-medical hover:bg-medical-hover text-white text-xs font-semibold transition-colors mt-2"
                >
                  <Phone className="w-3.5 h-3.5" />
                  <span>Call {CLINIC_DETAILS.phone}</span>
                </a>
              </div>

              {/* Consultation Timings Card */}
              <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-3">
                <div className="w-10 h-10 rounded-xl bg-teal-light text-teal flex items-center justify-center">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted block">
                    Consultation Timings
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-navy block mt-1">
                    5:00 PM – 9:00 PM
                  </span>
                </div>
                <div className="text-xs text-charcoal space-y-1">
                  <p><strong>Monday to Saturday:</strong> Evening OPD</p>
                  <p className="text-charcoal-muted"><strong>Sunday:</strong> Closed / Emergency only</p>
                </div>
                <span className="inline-block text-[11px] text-teal-dark bg-teal-light/50 px-2.5 py-0.5 rounded border border-teal/20">
                  Confirmed Evening Sessions
                </span>
              </div>
            </div>

            {/* Address & Direction Card */}
            <div className="p-6 sm:p-8 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-teal">
                    Physical Address
                  </span>
                  <h2 className="text-xl font-bold text-navy">
                    Clinic Location in Soubhagya Nagar
                  </h2>
                </div>
                <div className="p-2.5 rounded-xl bg-light-bg text-charcoal-muted">
                  <MapPin className="w-5 h-5 text-teal" />
                </div>
              </div>

              <div className="p-4 rounded-xl bg-light-bg border border-border-subtle space-y-2 text-sm text-charcoal">
                <p className="font-semibold text-navy text-base">
                  {CLINIC_DETAILS.name}
                </p>
                <p>{CLINIC_DETAILS.address}</p>
                <p className="text-xs text-charcoal-muted">
                  Landmark: {CLINIC_DETAILS.landmark}
                </p>
                <p className="text-xs text-charcoal-muted">
                  Email: <a href={`mailto:${CLINIC_DETAILS.email}`} className="text-medical underline">{CLINIC_DETAILS.email}</a>
                </p>
              </div>

              {/* Direction Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={CLINIC_DETAILS.googleMapsQuery}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-navy hover:bg-navy-light text-white text-xs font-semibold transition-all shadow-xs"
                >
                  <Navigation className="w-4 h-4 text-teal" />
                  <span>Open Directions in Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                </a>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-5 py-3 rounded-lg border border-border-subtle bg-white hover:bg-light-bg text-charcoal text-xs font-semibold transition-all"
                >
                  <span>Contact Form & Details</span>
                </Link>
              </div>
            </div>

            {/* Inpatient Care Transparency Note */}
            <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-2 text-amber-900">
              <div className="flex items-center gap-2 font-bold text-amber-950">
                <AlertCircle className="w-4 h-4 text-amber-700 shrink-0" />
                <span>Scope of Services at New Life Clinic</span>
              </div>
              <p className="leading-relaxed">
                {CLINIC_DETAILS.hospitalNote}
              </p>
            </div>
          </div>

          {/* Right Column: Photography & Access */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-border-subtle bg-white shadow-editorial">
              <Image
                src="/images/new-life-clinic.jpg"
                alt="New Life Clinic Soubhagya Nagar Interior"
                width={600}
                height={400}
                className="w-full h-auto object-cover aspect-4/3"
              />
              <div className="p-4 bg-white border-t border-border-subtle space-y-1">
                <h3 className="text-sm font-bold text-navy">
                  Child-Friendly Consultation Space
                </h3>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  Clean, quiet consultation rooms designed to keep infants and children at ease during physical examinations.
                </p>
              </div>
            </div>

            {/* Travel Directions from Bhubaneswar Hubs */}
            <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy">
                Reaching the Clinic in Bhubaneswar
              </h3>
              <div className="space-y-3 text-xs text-charcoal">
                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-light-bg">
                  <Car className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-navy block">From Baramunda Bus Terminal</span>
                    <span className="text-charcoal-muted">Approximately 5–10 minutes via local auto-rickshaw or taxi.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-light-bg">
                  <Train className="w-4 h-4 text-medical shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-navy block">From Bhubaneswar Railway Station</span>
                    <span className="text-charcoal-muted">Approximately 20–25 minutes via Master Canteen / Khandagiri road.</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-2.5 rounded-lg bg-light-bg">
                  <Plane className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-navy block">From Biju Patnaik Airport (BBI)</span>
                    <span className="text-charcoal-muted">Approximately 15–20 minutes drive.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Clinic Environment checklist */}
            <div className="p-5 rounded-xl bg-light-bg border border-border-subtle space-y-2 text-xs">
              <span className="font-bold text-navy uppercase tracking-wider text-[11px] block">
                Amenities & Accessibility:
              </span>
              <ul className="space-y-1.5 text-charcoal-muted">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0" />
                  <span>Ground floor entrance with easy pram/stroller access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0" />
                  <span>Comfortable waiting seating with children&apos;s story books</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0" />
                  <span>Private, sanitized examination beds with infant scales</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0" />
                  <span>Clean drinking water and sanitized rest rooms</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-navy">
          Plan Your Visit to New Life Clinic
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-xl mx-auto">
          Please bring your child&apos;s prior ultrasound films, laboratory reports, or hospital discharge summaries for an unhurried evaluation.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <a
            href={`tel:${CLINIC_DETAILS.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-navy hover:bg-navy-light text-white text-xs font-semibold transition-all shadow-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Clinic: {CLINIC_DETAILS.phone}</span>
          </a>
          <a
            href={CLINIC_DETAILS.googleMapsQuery}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-subtle bg-white hover:bg-light-bg text-charcoal text-xs font-semibold transition-all"
          >
            <Navigation className="w-3.5 h-3.5 text-teal" />
            <span>Google Maps</span>
          </a>
        </div>
      </section>
    </div>
  );
}
