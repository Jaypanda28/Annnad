"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Pill, 
  Search, 
  Printer, 
  Calendar, 
  CheckCircle2, 
  ChevronRight, 
  Stethoscope, 
  ArrowRight,
  Plus
} from "lucide-react";
import { Prescription } from "@/lib/db/types";

export default function PrescriptionsListPage() {
  const [prescriptions, setPrescriptions] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("/api/prescriptions")
      .then(res => res.json())
      .then(data => {
        if (data.prescriptions) {
          setPrescriptions(data.prescriptions);
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const filtered = prescriptions.filter(p => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      p.prescriptionNumber.toLowerCase().includes(q) ||
      (p.patient?.fullName && p.patient.fullName.toLowerCase().includes(q)) ||
      (p.patient?.patientId && p.patient.patientId.toLowerCase().includes(q)) ||
      p.diagnosisSummary.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy">
            Digital Prescriptions (Rx)
          </h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Signed paediatric prescriptions with weight-based dosing, formulation schedules, and clinic letterhead.
          </p>
        </div>

        <Link
          href="/portal/consultations/new"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-navy hover:bg-navy-light text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Write Prescription</span>
        </Link>
      </div>

      <div className="p-4 rounded-xl bg-white border border-border-subtle shadow-2xs">
        <div className="relative w-full max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Patient Name, ID (NLC-...), Rx Number or Diagnosis..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border-subtle bg-light-bg text-xs focus:bg-white focus:border-medical transition-all placeholder:text-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-charcoal-muted">
            Loading digital prescriptions...
          </div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-charcoal-muted space-y-2">
            <Pill className="w-8 h-8 text-slate-300 mx-auto" />
            <p className="font-semibold text-navy">No Prescriptions Found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border-subtle text-charcoal-muted uppercase text-[10px] tracking-wider">
                  <th className="py-3 px-3">Rx Number</th>
                  <th className="py-3 px-3">Date</th>
                  <th className="py-3 px-3">Patient</th>
                  <th className="py-3 px-3">Diagnosis</th>
                  <th className="py-3 px-3">Items Count</th>
                  <th className="py-3 px-3">Doctor Signature</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/60">
                {filtered.map((rx) => (
                  <tr key={rx.id} className="hover:bg-light-bg/50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-navy">
                      {rx.prescriptionNumber}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-slate-700">
                      {rx.prescriptionDate}
                    </td>
                    <td className="py-3 px-3">
                      <Link
                        href={`/portal/patients/${rx.patientId}`}
                        className="font-bold text-navy hover:text-medical block"
                      >
                        {rx.patient?.fullName || "Patient"}
                      </Link>
                      <span className="text-[11px] text-charcoal-muted">
                        {rx.patient?.patientId}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-semibold text-teal-dark max-w-xs truncate">
                      {rx.diagnosisSummary}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-100 text-slate-700">
                        {rx.items?.length || 0} Meds
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="font-semibold text-navy block">{rx.signedByDoctorName}</span>
                      <span className="text-[10px] text-emerald-700">✓ Digitally Signed</span>
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <Link
                        href={`/portal/prescriptions/${rx.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-medical hover:bg-medical-hover text-white font-semibold text-[11px] shadow-xs transition-colors"
                      >
                        <Printer className="w-3.5 h-3.5" />
                        <span>Print Rx</span>
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
