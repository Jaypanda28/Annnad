import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { DOCTOR_DETAILS, CLINIC_DETAILS } from "@/data/doctorData";
import { 
  GraduationCap, 
  Award, 
  ShieldCheck, 
  Building2, 
  Phone, 
  CheckCircle2, 
  AlertCircle, 
  Heart, 
  Stethoscope,
  ExternalLink,
  Clock
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Dr. Abhishek Anand | Paediatric Surgeon in Bhubaneswar",
  description: "Learn about Dr. Abhishek Anand, Consultant Paediatric & Neonatal Surgeon with super-specialty DrNB training from the Institute of Child Health, Kolkata. Practicing at New Life Clinic, Soubhagya Nagar, Bhubaneswar."
};

export default function AboutPage() {
  return (
    <div className="space-y-16 py-10 sm:py-16">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-light text-teal-dark text-xs font-semibold uppercase tracking-wider">
            <Stethoscope className="w-3.5 h-3.5 text-teal" />
            <span>Professional Profile & Credentials</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            Dr. Abhishek Anand
          </h1>
          <p className="text-lg text-medical font-semibold">
            {DOCTOR_DETAILS.title}
          </p>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            Providing specialized, gentle surgical care and family guidance for newborns, infants, children, and teenagers in Bhubaneswar, Odisha.
          </p>
        </div>
      </section>

      {/* Main Profile Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Portrait & Verification Card */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl overflow-hidden border border-border-subtle bg-white shadow-editorial">
              <Image
                src="/images/dr-abhishek-anand.jpg"
                alt="Dr. Abhishek Anand, Consultant Paediatric Surgeon"
                width={500}
                height={660}
                priority
                className="w-full h-auto object-cover object-top aspect-3/4"
              />
              <div className="p-5 bg-white border-t border-border-subtle space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-base font-bold text-navy">Dr. Abhishek Anand</span>
                  <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
                    Verified Profile
                  </span>
                </div>
                <p className="text-xs text-charcoal-muted leading-relaxed">
                  Specialist Paediatric & Neonatal Surgeon
                </p>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-charcoal-muted">
                  <span>Affiliation: New Life Clinic</span>
                  <span className="text-teal font-medium">Bhubaneswar, Odisha</span>
                </div>
              </div>
            </div>

            {/* Credential Status Box */}
            <div className="p-5 rounded-xl bg-light-bg border border-border-subtle text-xs space-y-3">
              <div className="flex items-center gap-2 font-bold text-navy">
                <ShieldCheck className="w-4 h-4 text-teal" />
                <span>Credibility & Transparency Standard</span>
              </div>
              <p className="text-charcoal-muted leading-relaxed">
                All degrees and clinical training details displayed on this website are cross-verified against verified professional records. No exaggerated marketing claims or unreviewed personal stories are used.
              </p>
              <div className="pt-2 border-t border-border-subtle/80 flex items-center justify-between">
                <span className="text-[11px] text-slate-500">Identity Reference:</span>
                <a
                  href="https://www.practo.com/bhubaneswar/doctor/abhishek-anand-2-pediatric-surgeon"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-medical hover:underline inline-flex items-center gap-1"
                >
                  <span>Practo Verification</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Biography & Ethos */}
          <div className="lg:col-span-7 space-y-8">
            {/* Biography */}
            <div className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-navy tracking-tight">
                Professional Biography
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-charcoal leading-relaxed">
                {DOCTOR_DETAILS.biography.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Clinical Ethos / Philosophy */}
            <div className="p-6 rounded-xl bg-white border border-border-subtle shadow-editorial space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-teal">
                <Heart className="w-4 h-4 text-teal" />
                <span>Clinical Approach</span>
              </div>
              <h3 className="text-lg font-bold text-navy">
                Why Children Need a Dedicated Paediatric Surgeon
              </h3>
              <p className="text-sm text-charcoal-muted leading-relaxed">
                A surgical consultation for a child is an emotional experience for the entire family. Dr. Anand believes in three core clinical tenets:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                <div className="p-3 bg-light-bg rounded-lg space-y-1">
                  <span className="font-bold text-navy block">1. Gentle Technique</span>
                  <span className="text-charcoal-muted">Micro-instruments and minimally invasive access suited for tiny, growing tissues.</span>
                </div>
                <div className="p-3 bg-light-bg rounded-lg space-y-1">
                  <span className="font-bold text-navy block">2. Non-Surgical First</span>
                  <span className="text-charcoal-muted">Conservative monitoring whenever a condition can safely resolve with growth.</span>
                </div>
                <div className="p-3 bg-light-bg rounded-lg space-y-1">
                  <span className="font-bold text-navy block">3. Plain English</span>
                  <span className="text-charcoal-muted">Every question answered honestly so parents can make confident decisions.</span>
                </div>
              </div>
            </div>

            {/* Confirmed Clinical Interests */}
            <div className="space-y-3">
              <h3 className="text-lg font-bold text-navy">
                Confirmed Areas of Clinical Interest
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {DOCTOR_DETAILS.clinicalInterests.map((interest, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 p-3 rounded-lg bg-white border border-border-subtle text-xs text-charcoal"
                  >
                    <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                    <span className="font-medium">{interest}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Qualifications & Medical Registration Section */}
      <section className="bg-light-bg py-16 border-y border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="max-w-2xl space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-medical">
              <GraduationCap className="w-4 h-4" />
              <span>Medical Education & Certifications</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
              Verified Medical Qualifications
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted">
              Dr. Abhishek Anand completed extensive surgical education leading to super-specialty certification in paediatric surgery.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DOCTOR_DETAILS.qualifications.map((qual, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-white border border-border-subtle shadow-editorial flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <span className="inline-block px-2.5 py-0.5 rounded text-[11px] font-semibold bg-medical-light text-medical">
                    {qual.status}
                  </span>
                  <h3 className="text-xl font-bold text-navy">
                    {qual.degree}
                  </h3>
                  <div className="text-xs text-charcoal space-y-1">
                    <p className="font-semibold text-slate-800">{qual.institution}</p>
                    <p className="text-charcoal-muted">{qual.university}</p>
                  </div>
                  <p className="text-xs text-charcoal-muted leading-relaxed pt-2 border-t border-slate-100">
                    {qual.notes}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Medical Registration Transparency Note */}
          <div className="p-6 rounded-xl bg-white border border-border-subtle shadow-2xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-charcoal-muted">
                    Medical Council Registration
                  </span>
                  <span className="text-[11px] font-medium bg-amber-50 text-amber-800 px-2 py-0.5 rounded border border-amber-200">
                    Pending Doctor Submission
                  </span>
                </div>
                <h3 className="text-base font-bold text-navy">
                  State Medical Council Registration Status
                </h3>
                <p className="text-xs text-charcoal-muted max-w-2xl leading-relaxed">
                  The exact state medical council registration certificate number is currently pending official submission by Dr. Anand for inclusion on this website, in accordance with JOVIX pre-launch accuracy protocols.
                </p>
              </div>

              <div className="shrink-0">
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-light-bg text-charcoal-muted text-xs border border-border-subtle">
                  <Clock className="w-3.5 h-3.5 text-amber-600" />
                  <span>On Verification Checklist</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital & Clinic Network Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-teal">
            <Building2 className="w-4 h-4" />
            <span>Practice Affiliations</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
            Consultation & Surgical Facilities
          </h2>
          <p className="text-sm text-charcoal-muted">
            Distinguishing outpatient consultation locations from hospital operating facilities.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* New Life Clinic */}
          <div className="p-6 rounded-xl bg-white border border-border-subtle shadow-editorial space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-teal uppercase tracking-wider">
                Primary Outpatient Location
              </span>
              <span className="text-xs bg-slate-100 text-charcoal px-2 py-0.5 rounded">
                Evening OPD
              </span>
            </div>
            <h3 className="text-xl font-bold text-navy">
              New Life Clinic
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Dr. Anand conducts outpatient clinical evaluations, infant checks, surgical second opinions, and dressing reviews at New Life Clinic in Soubhagya Nagar, Bhubaneswar.
            </p>
            <div className="pt-2 text-xs space-y-2 text-charcoal">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-teal" />
                <span>Mon – Sat: 5:00 PM – 9:00 PM</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-teal" />
                <a href={`tel:${CLINIC_DETAILS.phone.replace(/\s+/g, "")}`} className="hover:underline font-semibold text-medical">
                  {CLINIC_DETAILS.phone}
                </a>
              </div>
            </div>
            <div className="pt-3 border-t border-border-subtle">
              <Link
                href="/clinic"
                className="text-xs font-semibold text-medical hover:underline inline-flex items-center gap-1"
              >
                <span>View Clinic Details & Directions</span>
                <span>→</span>
              </Link>
            </div>
          </div>

          {/* Tertiary Hospitals */}
          <div className="p-6 rounded-xl bg-white border border-border-subtle shadow-editorial space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-medical uppercase tracking-wider">
                Inpatient & Surgical Admissions
              </span>
              <span className="text-xs bg-slate-100 text-charcoal px-2 py-0.5 rounded">
                Operating Theatres
              </span>
            </div>
            <h3 className="text-xl font-bold text-navy">
              Rahat Hospital & Tertiary Partners
            </h3>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              Elective and complex paediatric surgeries requiring general anaesthesia, operating theatre instrumentation, and post-operative nursing care are performed at affiliated hospitals including Rahat Hospital (Centre for Woman & Child Care).
            </p>
            <div className="pt-2 text-xs space-y-2 text-charcoal">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-medical" />
                <span>Modern operating theatres with paediatric anaesthetists</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-medical" />
                <span>Neonatal Intensive Care Unit (NICU) backup</span>
              </div>
            </div>
            <div className="pt-3 border-t border-border-subtle">
              <Link
                href="/services"
                className="text-xs font-semibold text-medical hover:underline inline-flex items-center gap-1"
              >
                <span>Learn About Surgical Procedures</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h2 className="text-xl sm:text-2xl font-bold text-navy">
          Schedule an Outpatient Consultation with Dr. Anand
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-xl mx-auto">
          Contact New Life Clinic during evening OPD hours to arrange a convenient consultation slot.
        </p>
        <div className="pt-2 flex justify-center gap-3">
          <a
            href={`tel:${CLINIC_DETAILS.phone.replace(/\s+/g, "")}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-navy hover:bg-navy-light text-white text-xs font-semibold transition-all shadow-xs"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>Call Clinic: {CLINIC_DETAILS.phone}</span>
          </a>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-subtle bg-white hover:bg-light-bg text-charcoal text-xs font-semibold transition-all"
          >
            <span>Clinic Contact Page</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
