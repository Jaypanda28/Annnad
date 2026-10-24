"use client";

import React, { useState } from "react";
import { VERIFICATION_CHECKLIST } from "@/data/doctorData";
import { CheckCircle2, AlertCircle, Clock, X, FileCheck, ExternalLink } from "lucide-react";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function DoctorApprovalModal({ isOpen, onClose }: Props) {
  const [filter, setFilter] = useState<string>("all");

  if (!isOpen) return null;

  const filteredItems = filter === "all" 
    ? VERIFICATION_CHECKLIST 
    : VERIFICATION_CHECKLIST.filter(item => {
        if (filter === "verified") return item.currentStatus === "Verified from Practice Records";
        if (filter === "pending-signoff") return item.currentStatus === "Pending Doctor Signoff";
        if (filter === "pending-docs") return item.currentStatus === "Pending Document Submission";
        return true;
      });

  const verifiedCount = VERIFICATION_CHECKLIST.filter(i => i.currentStatus === "Verified from Practice Records").length;
  const pendingCount = VERIFICATION_CHECKLIST.length - verifiedCount;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-xs transition-opacity"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div className="relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-warm-white rounded-xl shadow-2xl border border-border-subtle overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-start justify-between p-6 bg-navy text-warm-white border-b border-navy-light">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-xs font-medium bg-teal/20 text-teal-light border border-teal/30 mb-2">
              <FileCheck className="w-3.5 h-3.5" />
              JOVIX Pre-Launch Governance
            </div>
            <h2 id="modal-title" className="text-xl font-bold tracking-tight text-white">
              Doctor Approval & Verification Checklist
            </h2>
            <p className="text-sm text-slate-300 mt-1">
              Every item below must be formally confirmed by Dr. Abhishek Anand before public release.
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

        {/* Status Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-light-bg border-b border-border-subtle text-xs">
          <div className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-border-subtle">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <div>
              <span className="block font-semibold text-charcoal">{verifiedCount} Items</span>
              <span className="text-charcoal-muted">Verified from practice data</span>
            </div>
          </div>
          <div className="flex items-center gap-2 p-2.5 bg-white rounded-lg border border-border-subtle">
            <Clock className="w-4 h-4 text-amber-600 shrink-0" />
            <div>
              <span className="block font-semibold text-charcoal">{pendingCount} Items</span>
              <span className="text-charcoal-muted">Awaiting Doctor Signoff</span>
            </div>
          </div>
          <div className="hidden sm:flex items-center gap-2 p-2.5 bg-white rounded-lg border border-border-subtle">
            <AlertCircle className="w-4 h-4 text-medical shrink-0" />
            <div>
              <span className="block font-semibold text-charcoal">Zero Assumptions</span>
              <span className="text-charcoal-muted">No unreviewed claims</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-2 px-6 py-3 border-b border-border-subtle bg-white text-xs">
          <span className="text-charcoal-muted font-medium mr-1">Filter:</span>
          <button
            onClick={() => setFilter("all")}
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              filter === "all" ? "bg-navy text-white" : "bg-light-bg text-charcoal hover:bg-slate-200"
            }`}
          >
            All Items ({VERIFICATION_CHECKLIST.length})
          </button>
          <button
            onClick={() => setFilter("verified")}
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              filter === "verified" ? "bg-emerald-700 text-white" : "bg-light-bg text-charcoal hover:bg-slate-200"
            }`}
          >
            Verified ({verifiedCount})
          </button>
          <button
            onClick={() => setFilter("pending-signoff")}
            className={`px-3 py-1 rounded-full font-medium transition-colors ${
              filter === "pending-signoff" ? "bg-amber-700 text-white" : "bg-light-bg text-charcoal hover:bg-slate-200"
            }`}
          >
            Needs Signoff
          </button>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-3 divide-y divide-border-subtle/50">
          {filteredItems.map((item) => (
            <div key={item.id} className="pt-3 first:pt-0">
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-charcoal-muted bg-slate-100 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-semibold text-charcoal">
                      {item.item}
                    </h3>
                  </div>
                  <p className="text-xs text-charcoal-muted leading-relaxed">
                    {item.sourceOrNote}
                  </p>
                </div>
                <div className="shrink-0 self-start sm:self-center">
                  {item.currentStatus === "Verified from Practice Records" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-50 text-emerald-800 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Verified
                    </span>
                  )}
                  {item.currentStatus === "Pending Doctor Signoff" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-800 border border-amber-200">
                      <Clock className="w-3.5 h-3.5 text-amber-600" />
                      Doctor Review Needed
                    </span>
                  )}
                  {item.currentStatus === "Pending Document Submission" && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-800 border border-blue-200">
                      <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
                      Doc Submission Pending
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-light-bg border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-charcoal-muted">
          <div className="flex items-center gap-1.5">
            <span>Prepared by JOVIX Technologies for Dr. Abhishek Anand</span>
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <a
              href="https://www.practo.com/bhubaneswar/doctor/abhishek-anand-2-pediatric-surgeon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md border border-border-subtle bg-white text-charcoal hover:bg-slate-50 transition-colors"
            >
              Practo Reference
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-1.5 rounded-md bg-navy text-white hover:bg-navy-light font-medium transition-colors"
            >
              Close Checklist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
