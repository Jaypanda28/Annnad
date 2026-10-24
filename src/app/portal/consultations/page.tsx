"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  Search, 
  Plus, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Pill, 
  Stethoscope,
  Clock
} from "lucide-react";
import { Consultation } from "@/lib/db/types";

export default function ConsultationsListPage() {
  const [consultations, setConsultations] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/consultations")
      .then(res => res.json())
      .then(data => {
        if (data.consultations) {
          setConsultations(data.consultations);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = consultations.filter(c => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      c.consultationNumber.toLowerCase().includes(q) ||
      (c.patient?.fullName && c.patient.fullName.toLowerCase().includes(q)) ||
      (c.patient?.patientId && c.patient.patientId.toLowerCase().includes(q)) ||
      c.primaryDiagnosis.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy">
            Clinical Consultations & EMR Archive
          </h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Signed paediatric surgical consultations, clinical evaluations, and operative plans.
          </p>
        </div>

        <Link
          href="/portal/consultations/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-navy hover:bg-navy-light text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>New Consultation</span>
        </Link>
      </div>

      <div className="p-4 rounded-xl bg-white border border-border-subtle shadow-2xs flex items-center justify-between gap-4">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Patient Name, ID (NLC-...), Consultation # or Diagnosis..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border-subtle bg-light-bg text-xs focus:bg-white focus:border-medical transition-all placeholder:text-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-charcoal-muted">
            Loading consultations from database...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-charcoal-muted space-y-2">
            <FileText className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-semibold text-navy">No Consultation Records Found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border-subtle text-charcoal-muted uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-3">Consultation #</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Patient</th>
                  <th className="py-3 px-3">Diagnosis</th>
                  <th className="py-3 px-3">Surgical Rec</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/60">
                {filtered.map((c) => (
                  <tr key={c.id} className="hover:bg-light-bg/50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-navy">
                      {c.consultationNumber}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-slate-700">
                      {c.consultationDate}
                    </td>
                    <td className="py-3 px-3">
                      <Link
                        href={`/portal/patients/${c.patientId}`}
                        className="font-bold text-navy hover:text-medical block"
                      >
                        {c.patient?.fullName || "Patient"}
                      </Link>
                      <span className="text-[11px] text-charcoal-muted">
                        {c.patient?.patientId}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-teal-dark max-w-xs truncate">
                      {c.primaryDiagnosis}
                    </td>
                    <td className="py-3 px-3">
                      {c.surgeryRecommended ? (
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          Surgery Advised
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Conservative</span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      {c.isSigned ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Signed
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                          Draft
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <Link
                        href={`/portal/patients/${c.patientId}`}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-lg bg-light-bg hover:bg-slate-200 text-charcoal font-semibold text-[11px] transition-colors"
                      >
                        <span>Open Patient EMR</span>
                        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
