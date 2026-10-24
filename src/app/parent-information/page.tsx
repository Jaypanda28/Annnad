import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { PARENT_ARTICLES, CLINIC_DETAILS } from "@/data/doctorData";
import { 
  BookOpen, 
  Clock, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle, 
  Heart,
  HelpCircle,
  FileText
} from "lucide-react";

export const metadata: Metadata = {
  title: "Parent Information & Educational Guides | Paediatric Surgery",
  description: "Reputable educational articles for parents on paediatric surgery, preparing for consultations, common surgical conditions, and questions to ask your surgeon."
};

export default function ParentInformationPage() {
  return (
    <div className="space-y-16 py-10 sm:py-16">
      {/* Header */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-light text-teal-dark text-xs font-semibold uppercase tracking-wider">
            <BookOpen className="w-3.5 h-3.5 text-teal" />
            <span>Family Resources & Education</span>
          </div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-navy tracking-tight">
            Information for Parents
          </h1>
          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed">
            Finding out that your child may require a surgical consultation can bring up a great deal of anxiety. These concise guides are written to answer everyday parental questions with warmth, clarity, and reputable paediatric surgical facts.
          </p>
        </div>
      </section>

      {/* Editorial Standards Notice */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-5 rounded-xl bg-white border border-border-subtle shadow-2xs flex items-start gap-3 text-xs text-charcoal-muted">
          <AlertCircle className="w-5 h-5 text-teal shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold text-navy block">
              Educational Purpose & Clinical Governance Note
            </span>
            <p className="leading-relaxed">
              These articles have been compiled by the JOVIX clinical editorial team based on standard paediatric surgical reference guidelines for Dr. Abhishek Anand&apos;s review. They are provided purely for parental education and general reassurance, not as personal medical advice or a substitute for an in-person clinical examination.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {PARENT_ARTICLES.map((article, idx) => (
            <article
              key={article.slug}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-border-subtle shadow-editorial hover:border-medical/40 transition-all flex flex-col justify-between space-y-6"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between text-xs text-charcoal-muted">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-teal">Article 0{idx + 1}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {article.readTime}
                    </span>
                  </div>
                  <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-charcoal-muted">
                    Parent Guide
                  </span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-navy hover:text-medical transition-colors">
                    <Link href={`/parent-information/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h2>
                  <p className="text-xs font-medium text-teal-dark">
                    {article.subtitle}
                  </p>
                  <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
                    {article.summary}
                  </p>
                </div>

                {/* Key Takeaways */}
                <div className="p-4 rounded-xl bg-light-bg border border-border-subtle space-y-2 text-xs">
                  <span className="font-bold text-navy uppercase tracking-wider text-[11px] block">
                    What You&apos;ll Learn:
                  </span>
                  <ul className="space-y-1.5 text-charcoal-muted">
                    {article.keyTakeaways.slice(0, 3).map((takeaway, tIdx) => (
                      <li key={tIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal shrink-0 mt-0.5" />
                        <span>{takeaway}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Read button */}
              <div className="pt-4 border-t border-border-subtle flex items-center justify-between">
                <span className="text-[11px] text-slate-400">
                  {article.reviewStatus.split("—")[0]}
                </span>
                <Link
                  href={`/parent-information/${article.slug}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-navy hover:bg-navy-light text-white text-xs font-semibold transition-colors"
                >
                  <span>Read Guide</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Reassurance FAQ Callout */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 rounded-2xl bg-teal-subtle border border-teal/20 space-y-4 text-center">
          <Heart className="w-8 h-8 text-teal mx-auto" />
          <h2 className="text-xl font-bold text-navy">
            A Note of Reassurance for Parents
          </h2>
          <p className="text-xs sm:text-sm text-charcoal-muted max-w-2xl mx-auto leading-relaxed">
            Most childhood conditions requiring surgical evaluation turn out to be straightforward, non-emergency issues that can be managed calmly with watchful waiting or minor day-care procedures. If you have questions about your child&apos;s symptoms, Dr. Abhishek Anand is here to provide clear guidance.
          </p>
          <div className="pt-2">
            <Link
              href="/clinic"
              className="inline-flex items-center gap-2 text-xs font-semibold text-teal-dark hover:underline"
            >
              <span>Visit New Life Clinic in Soubhagya Nagar</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
