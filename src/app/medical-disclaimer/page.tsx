import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { CLINIC_DETAILS, DOCTOR_DETAILS } from "@/data/doctorData";
import { AlertTriangle, ShieldAlert, ArrowLeft, Phone, Stethoscope } from "lucide-react";

export const metadata: Metadata = {
  title: "Medical Disclaimer | Dr. Abhishek Anand | Paediatric Surgery",
  description: "Official medical disclaimer regarding informational content, clinical consultations, and emergency procedures for Dr. Abhishek Anand's practice."
};

export default function MedicalDisclaimerPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal-muted hover:text-navy transition-colors mb-6"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Home</span>
          </Link>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200 text-xs font-semibold uppercase tracking-wider mb-3">
            <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
            <span>Clinical Notice</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Medical Disclaimer
          </h1>
          <p className="text-xs text-charcoal-muted mt-1">
            Essential guidelines for parents and visitors to this website
          </p>
        </div>

        {/* Emergency Notice Callout */}
        <div className="p-5 sm:p-6 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-950 space-y-3">
          <div className="flex items-center gap-2 text-amber-900 font-bold">
            <ShieldAlert className="w-5 h-5 text-amber-600 shrink-0" />
            <h2 className="text-base sm:text-lg">Critical Emergency Disclaimer</h2>
          </div>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed">
            If your child has an acute, severe medical or surgical emergency—such as acute testicular torsion, acute severe abdominal trauma, severe vomiting with abdominal distension, respiratory distress, or severe bleeding—<strong>do not rely on this website or attempt to send an email or web form</strong>. Take your child immediately to the nearest hospital emergency room or contact the National Emergency Service (108).
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-6 text-sm text-charcoal leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy">
              1. Educational and Informational Nature Only
            </h2>
            <p>
              All materials published on this website—including articles, condition descriptions, FAQ answers, and parent guidance notes—are prepared strictly for general educational purposes.
            </p>
            <p>
              Nothing contained on this site is intended to serve as, or substitute for, formal medical diagnosis, clinical prognosis, or personalized surgical treatment recommendations for any individual infant or child.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-border-subtle">
            <h2 className="text-lg font-bold text-navy">
              2. No Doctor-Patient Relationship Established
            </h2>
            <p>
              Browsing this website, submitting an administrative enquiry via the contact form, or receiving an educational response does not establish a formal doctor-patient relationship with Dr. Abhishek Anand or New Life Clinic.
            </p>
            <p>
              A doctor-patient relationship is established only upon a direct, in-person clinical consultation, physical examination, and formal medical registration at New Life Clinic or an affiliated hospital.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-border-subtle">
            <h2 className="text-lg font-bold text-navy">
              3. Importance of In-Person Clinical Examination
            </h2>
            <p>
              Paediatric surgical diagnosis depends critically upon physical palpation, observing the child in a calm setting, reviewing authentic radiology films, and assessing developmental status. Parents must never delay seeking professional medical advice or disregard medical guidance because of information read online.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-border-subtle">
            <h2 className="text-lg font-bold text-navy">
              4. Hospital Procedures
            </h2>
            <p>
              Surgical operations and inpatient care are not conducted inside New Life Clinic itself. Operative procedures requiring general anaesthesia are performed at accredited partner hospitals (such as Rahat Hospital) where specialized paediatric anaesthetists, infant monitoring, and operating theatre facilities are established.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-border-subtle">
            <h2 className="text-lg font-bold text-navy">
              5. Questions Regarding Clinical Care
            </h2>
            <p>
              To arrange an evaluation or discuss your child&apos;s condition with Dr. Abhishek Anand, please contact New Life Clinic during OPD hours:
            </p>
            <div className="p-4 rounded-xl bg-light-bg border border-border-subtle text-xs space-y-1">
              <p className="font-semibold text-navy">Dr. Abhishek Anand — Paediatric Surgeon</p>
              <p>New Life Clinic, Soubhagya Nagar, Bhubaneswar, Odisha — 751003</p>
              <p>Telephone: {CLINIC_DETAILS.phone} (Evening OPD: 5:00 PM – 9:00 PM)</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
