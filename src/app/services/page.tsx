import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { SERVICES, CLINIC_DETAILS } from "@/data/doctorData";
import { 
  Stethoscope, 
  Baby, 
  Activity, 
  ShieldCheck, 
  Award, 
  CheckCircle2, 
  AlertCircle, 
  Building2, 
  Phone,
  ArrowRight,
  Clock,
  Sparkles
} from "lucide-react";

export const metadata: Metadata = {
  title: "Paediatric Surgical Services | Dr. Abhishek Anand | Bhubaneswar",
  description: "Specialist paediatric surgery, neonatal surgery, paediatric urology, and keyhole minimally invasive laparoscopic procedures for children in Bhubaneswar."
};

export default function ServicesPage() {
  const iconMap: Record<string, React.ReactNode> = {
    Stethoscope: <Stethoscope className="w-6 h-6 text-medical" />,
    Baby: <Baby className="w-6 h-6 text-teal" />,
    Activity: <Activity className="w-6 h-6 text-medical" />,
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-teal" />,
    HeartHandshake: <Award className="w-6 h-6 text-medical" />
  };

  return (
    <div className="space-y-16 py-10 sm:py-16">
      {/* Page Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-light text-teal-dark text-xs font-semibold uppercase tracking-wider">
            <Activity className="w-3.5 h-3.5 text-teal" />
            <span>Paediatric Surgical Scope</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            Surgical Services & Clinical Focus
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            Specialized surgical care for infants, growing children, and adolescents. Every procedure is approached with gentle, micro-surgical precision and close parental communication.
          </p>
        </div>
      </section>

      {/* Critical Facility Distinction Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 sm:p-6 rounded-2xl bg-white border border-medical/30 shadow-editorial">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2 max-w-3xl">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-medical-light text-medical">
                  <Building2 className="w-4 h-4" />
                </span>
                <h2 className="text-base font-bold text-navy">
                  Distinction Between Outpatient Consultations & Surgical Admissions
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                Initial clinical assessments, ultrasound reviews, minor wound dressings, and routine post-operative checks are carried out at <strong>New Life Clinic</strong> in Soubhagya Nagar, Bhubaneswar. Surgeries requiring general anaesthesia, operating theatre instrumentation, or inpatient recovery are arranged and performed at <strong>affiliated tertiary hospitals</strong> (including Rahat Hospital) with full paediatric anaesthesia and NICU backup.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/clinic"
                className="px-4 py-2 rounded-lg bg-light-bg text-navy hover:bg-slate-200 text-xs font-semibold text-center transition-colors border border-border-subtle"
              >
                Clinic Details
              </Link>
              <Link
                href="/contact"
                className="px-4 py-2 rounded-lg bg-navy hover:bg-navy-light text-white text-xs font-semibold text-center transition-colors"
              >
                Contact for Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Detailed Services Listing */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {SERVICES.map((service, index) => (
          <div
            key={service.id}
            id={service.id}
            className="p-6 sm:p-8 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-6 scroll-mt-24"
          >
            {/* Service Header */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-6 border-b border-border-subtle">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-light-bg border border-border-subtle shrink-0">
                  {iconMap[service.iconName] || <Stethoscope className="w-6 h-6 text-medical" />}
                </div>
                <div>
                  <span className="text-xs font-bold text-teal uppercase tracking-wider block">
                    Specialty 0{index + 1}
                  </span>
                  <h2 className="text-xl sm:text-2xl font-bold text-navy">
                    {service.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-charcoal-muted mt-1 max-w-2xl">
                    {service.shortDesc}
                  </p>
                </div>
              </div>

              <div className="self-start sm:self-center shrink-0">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-100 text-charcoal border border-slate-200">
                  <Building2 className="w-3.5 h-3.5 text-slate-500" />
                  <span>{service.careLocation}</span>
                </span>
              </div>
            </div>

            {/* Service Description & Parent Information */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-7 space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-charcoal">
                  Clinical Overview & Parental Guidance
                </h3>
                <p className="text-sm text-charcoal leading-relaxed">
                  {service.fullDesc}
                </p>

                {/* Parent Specific Reassurance Box */}
                <div className="p-4 rounded-xl bg-teal-subtle border border-teal/20 text-xs space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-teal-dark">
                    <Sparkles className="w-4 h-4 text-teal" />
                    <span>Parent Note for This Condition</span>
                  </div>
                  <p className="text-charcoal-muted leading-relaxed">
                    {service.parentNote}
                  </p>
                </div>
              </div>

              {/* Conditions Evaluated & Treated */}
              <div className="lg:col-span-5 p-5 rounded-xl bg-light-bg border border-border-subtle space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-navy">
                  Frequently Evaluated Conditions
                </h3>
                <ul className="space-y-2 text-xs text-charcoal">
                  {service.commonConditions.map((condition, cIdx) => (
                    <li key={cIdx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                      <span>{condition}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Service Footer / Action */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
              <span className="text-charcoal-muted">
                Have scan reports or a paediatrician referral for {service.title.toLowerCase()}?
              </span>
              <a
                href={`tel:${CLINIC_DETAILS.phone.replace(/\s+/g, "")}`}
                className="font-semibold text-medical hover:underline inline-flex items-center gap-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call to Enquire: {CLINIC_DETAILS.phone}</span>
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* Preparation & Journey Guide */}
      <section className="bg-light-bg py-16 border-t border-border-subtle">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="max-w-2xl space-y-2">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-navy tracking-tight">
              What to Expect: The Surgical Care Journey
            </h2>
            <p className="text-sm text-charcoal-muted">
              Step-by-step guidance designed to replace uncertainty with peace of mind.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="p-5 rounded-xl bg-white border border-border-subtle space-y-2">
              <span className="text-xs font-bold text-teal">Step 1</span>
              <h3 className="text-base font-bold text-navy">Outpatient Review</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Gentle clinical examination at New Life Clinic, reviewing existing scan reports and discussing whether surgery is actually necessary.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-border-subtle space-y-2">
              <span className="text-xs font-bold text-teal">Step 2</span>
              <h3 className="text-base font-bold text-navy">Pre-Op Planning</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                If surgery is needed, you receive clear instructions on fasting times, hospital scheduling, and paediatric anaesthesia details.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-border-subtle space-y-2">
              <span className="text-xs font-bold text-teal">Step 3</span>
              <h3 className="text-base font-bold text-navy">The Procedure</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Performed at a partner tertiary hospital with child-specific equipment and parents reunited immediately during recovery.
              </p>
            </div>

            <div className="p-5 rounded-xl bg-white border border-border-subtle space-y-2">
              <span className="text-xs font-bold text-teal">Step 4</span>
              <h3 className="text-base font-bold text-navy">Recovery & Follow-Up</h3>
              <p className="text-xs text-charcoal-muted leading-relaxed">
                Most procedures are day-care. Wound checks and long-term reassurance are conducted back at New Life Clinic.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        <h2 className="text-2xl font-bold text-navy">
          Need Guidance Regarding a Paediatric Surgical Issue?
        </h2>
        <p className="text-sm text-charcoal-muted max-w-xl mx-auto">
          Contact New Life Clinic during evening OPD hours (5:00 PM – 9:00 PM) to arrange a consultation with Dr. Abhishek Anand.
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
            href="/parent-information"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-subtle bg-white hover:bg-light-bg text-charcoal text-xs font-semibold transition-all"
          >
            <span>Read Parent Guides</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
