import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { CLINIC_DETAILS, DOCTOR_DETAILS } from "@/data/doctorData";
import { ShieldCheck, Lock, FileText, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy | Dr. Abhishek Anand | New Life Clinic",
  description: "Privacy policy for the official website concept of Dr. Abhishek Anand, Paediatric Surgeon at New Life Clinic, Soubhagya Nagar, Bhubaneswar."
};

export default function PrivacyPolicyPage() {
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
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-light text-teal-dark text-xs font-semibold uppercase tracking-wider mb-3">
            <Lock className="w-3.5 h-3.5" />
            <span>Data Protection & Privacy</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-navy tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs text-charcoal-muted mt-1">
            Last updated: October 2026 • Prepared by JOVIX Technologies
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-6 text-sm text-charcoal leading-relaxed">
          <section className="space-y-3">
            <h2 className="text-lg font-bold text-navy">
              1. Purpose of This Website
            </h2>
            <p>
              This website serves exclusively as a professional identity concept and informational platform for Dr. Abhishek Anand, Consultant Paediatric Surgeon practicing at New Life Clinic, Soubhagya Nagar, Bhubaneswar, Odisha.
            </p>
            <p>
              In this initial release (Phase 1), the website is informational. It does not store patient medical charts, clinical consultation records, or diagnostic imaging on public web servers.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-border-subtle">
            <h2 className="text-lg font-bold text-navy">
              2. Information Collected via General Enquiries
            </h2>
            <p>
              When visitors choose to submit a general enquiry using the website form, we may collect:
            </p>
            <ul className="list-disc pl-5 space-y-1 text-charcoal-muted">
              <li>Parent or guardian name</li>
              <li>Child&apos;s approximate age or developmental category</li>
              <li>Contact telephone number and optional email address</li>
              <li>General non-emergency query text</li>
            </ul>
            <p>
              We explicitly request that parents <strong>do not submit confidential medical scans, laboratory panels, or acute surgical emergency messages</strong> through standard web contact forms.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-border-subtle">
            <h2 className="text-lg font-bold text-navy">
              3. Use and Retention of Information
            </h2>
            <p>
              Any contact information submitted is used solely by the clinic reception team to answer your administrative questions, confirm consultation hours, or assist with clinic directions. We do not sell, rent, lease, or distribute visitor details to third-party commercial marketing entities.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-border-subtle">
            <h2 className="text-lg font-bold text-navy">
              4. Cookies and Analytical Data
            </h2>
            <p>
              This website utilizes minimal standard session cookies necessary for website performance, accessibility, and navigation routing. No intrusive third-party cross-site behavioral tracking or advertisement cookies are employed.
            </p>
          </section>

          <section className="space-y-3 pt-4 border-t border-border-subtle">
            <h2 className="text-lg font-bold text-navy">
              5. Contact for Privacy Questions
            </h2>
            <p>
              If you have any questions regarding this Privacy Policy or wish to request the deletion of any contact information you provided, please contact New Life Clinic:
            </p>
            <div className="p-4 rounded-xl bg-light-bg border border-border-subtle text-xs space-y-1">
              <p className="font-semibold text-navy">{CLINIC_DETAILS.name}</p>
              <p>{CLINIC_DETAILS.address}</p>
              <p>Telephone: {CLINIC_DETAILS.phone}</p>
              <p>Email: {CLINIC_DETAILS.email}</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
