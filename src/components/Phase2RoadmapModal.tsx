"use client";

import React from "react";
import { PHASE_2_ROADMAP } from "@/data/doctorData";
import { X, Layers, ShieldCheck, ArrowRight, Check } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function Phase2RoadmapModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/75 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="phase2-title"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-warm-white rounded-xl shadow-2xl border border-border-subtle overflow-hidden">
        {/* Header */}
        <div className="flex items-start justify-between p-6 bg-navy text-warm-white border-b border-navy-light">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-teal/20 text-teal-light border border-teal/30 mb-2">
              <Layers className="w-3.5 h-3.5" />
              Strategic Concept Roadmap
            </div>
            <h2 id="phase2-title" className="text-xl font-bold tracking-tight text-white">
              Phase 2: Clinic Management System (CMS) Roadmap
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-xl">
              Future clinical management capabilities prepared by JOVIX Technologies for separate review and discussion with Dr. Abhishek Anand.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-300 hover:text-white rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Advisory banner */}
        <div className="px-6 py-3.5 bg-amber-50 border-b border-amber-200/80 text-xs text-amber-900 flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-amber-700 shrink-0" />
          <span>
            <strong>Phase 1 Scope Note:</strong> This public website strictly presents Dr. Anand&apos;s professional profile and educational guidance. No clinical records, patient logins, or payment workflows are active until Phase 2 is formally commissioned and secured.
          </span>
        </div>

        {/* Roadmap Cards */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {PHASE_2_ROADMAP.map((item, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-border-subtle bg-white hover:border-teal/50 transition-all shadow-editorial"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal">
                    {item.phase}
                  </span>
                  <h3 className="text-base font-semibold text-charcoal">
                    {item.title}
                  </h3>
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded bg-slate-100 text-charcoal-muted">
                  Proposed
                </span>
              </div>
              <p className="text-xs text-charcoal-muted mb-3 leading-relaxed">
                {item.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-border-subtle/60">
                {item.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-xs text-charcoal">
                    <Check className="w-3.5 h-3.5 text-teal shrink-0" />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-4 bg-light-bg border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-charcoal-muted">
          <div className="flex items-center gap-1.5">
            <span>Prepared by JOVIX Technologies • Dedicated Healthcare Software</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="https://www.jovix.co.uk"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-border-subtle bg-white text-charcoal hover:bg-slate-50 transition-colors"
            >
              Visit JOVIX UK
              <ArrowRight className="w-3 h-3 text-slate-400" />
            </a>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-1.5 rounded-md bg-navy text-white hover:bg-navy-light font-medium transition-colors"
            >
              Close Roadmap
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
