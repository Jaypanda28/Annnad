"use client";

import { useEffect, useState, use } from "react";
import Link from "next/link";
import { 
  ArrowLeft, 
  Printer, 
  FileText, 
  CheckCircle2, 
  Clock, 
  Calendar, 
  User, 
  ShieldCheck, 
  AlertCircle,
  Activity,
  HeartPulse,
  Phone,
  MapPin,
  Stethoscope
} from "lucide-react";

interface PrescriptionItem {
  id: string;
  medicineName: string;
  dosageForm: string;
  strength: string;
  dosage: string;
  route: string;
  frequency: string;
  duration: string;
  instructions: string;
}

interface PrescriptionDetails {
  id: string;
  patientId: string;
  doctorId: string;
  consultationId?: string;
  date: string;
  diagnosis: string;
  items: PrescriptionItem[];
  instructions: string;
  followUpAdvice: string;
  nextReviewDate?: string;
  status: "DRAFT" | "FINALIZED";
  signedAt?: string;
  signedByName?: string;
  patient?: {
    id: string;
    fullName: string;
    dateOfBirth: string;
    gender: string;
    guardianName: string;
    guardianRelationship: string;
    phone: string;
    address?: string;
    allergies?: string[];
  };
  doctor?: {
    id: string;
    name: string;
    specialization: string;
    qualifications: string;
    regNumber: string;
  };
  clinic?: {
    clinicName: string;
    doctorName: string;
    specialization: string;
    address: string;
    phone: string;
    email: string;
  };
}

export default function PrescriptionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const prescriptionId = resolvedParams.id;

  const [prescription, setPrescription] = useState<PrescriptionDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPrescription() {
      try {
        setLoading(true);
        const res = await fetch(`/api/prescriptions/${prescriptionId}`);
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to load prescription.");
        }
        setPrescription(data.prescription);
      } catch (err: unknown) {
        const e = err as Error;
        setError(e.message || "Failed to fetch prescription details.");
      } finally {
        setLoading(false);
      }
    }
    fetchPrescription();
  }, [prescriptionId]);

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] gap-3">
        <Activity className="w-8 h-8 text-[#1769D2] animate-spin" />
        <p className="text-sm font-medium text-slate-600">Loading prescription record...</p>
      </div>
    );
  }

  if (error || !prescription) {
    return (
      <div className="max-w-xl mx-auto my-12 bg-white rounded-2xl p-8 border border-red-200 text-center shadow-sm">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-3" />
        <h2 className="text-lg font-bold text-slate-800">Prescription Unavailable</h2>
        <p className="text-sm text-slate-600 mt-1 mb-6">{error || "The requested prescription could not be retrieved."}</p>
        <Link
          href="/portal/prescriptions"
          className="inline-flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Prescriptions
        </Link>
      </div>
    );
  }

  const doctorName = prescription.doctor?.name || prescription.clinic?.doctorName || "Dr. Abhishek Anand";
  const doctorSpec = prescription.doctor?.specialization || prescription.clinic?.specialization || "Paediatric Surgeon & Neonatal Specialist";
  const doctorQual = prescription.doctor?.qualifications || "MBBS, MS (Gen Surgery), DrNB (Paediatric Surgery - ICH Kolkata)";
  const regNo = prescription.doctor?.regNumber || "OMC / Reg No. 18247";

  return (
    <div className="space-y-6">
      {/* Top Action Bar - Hidden in Print */}
      <div className="print:hidden flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="flex items-center gap-3">
          <Link
            href="/portal/prescriptions"
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors"
            title="Back to prescriptions"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-[#12304A]">Prescription {prescription.id}</h1>
              {prescription.status === "FINALIZED" ? (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Signed & Finalized
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  <Clock className="w-3.5 h-3.5" /> Clinical Draft
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500">
              Generated on {new Date(prescription.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {prescription.patient && (
            <Link
              href={`/portal/patients/${prescription.patient.id}`}
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors inline-flex items-center gap-1.5"
            >
              <User className="w-4 h-4 text-slate-500" />
              Patient Profile
            </Link>
          )}
          <button
            onClick={handlePrint}
            className="px-4 py-2 bg-[#1769D2] hover:bg-[#1258b5] text-white text-xs font-semibold rounded-lg shadow-sm transition-colors inline-flex items-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print Prescription
          </button>
        </div>
      </div>

      {/* Main Prescription Paper Document (Formatted for Screen & High-Res Print) */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md p-8 sm:p-12 max-w-4xl mx-auto print:border-none print:shadow-none print:p-0 print:max-w-none">
        
        {/* Prescription Header / Clinic Letterhead */}
        <div className="border-b-2 border-[#12304A] pb-6 mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 text-[#1769D2]">
                <HeartPulse className="w-6 h-6" />
                <span className="text-xs font-bold tracking-wider uppercase">Paediatric Surgery & Child Wellness</span>
              </div>
              <h2 className="text-2xl font-black text-[#12304A] tracking-tight">{doctorName}</h2>
              <p className="text-sm font-semibold text-slate-700">{doctorSpec}</p>
              <p className="text-xs text-slate-500 mt-0.5">{doctorQual}</p>
              <p className="text-xs font-mono font-medium text-slate-600 mt-1">{regNo}</p>
            </div>

            <div className="text-left sm:text-right text-xs text-slate-600 space-y-1">
              <div className="font-bold text-sm text-[#12304A]">NEW LIFE CLINIC</div>
              <p className="flex items-center sm:justify-end gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                Soubhagya Nagar, Bhubaneswar, Odisha
              </p>
              <p className="flex items-center sm:justify-end gap-1.5">
                <Phone className="w-3.5 h-3.5 text-slate-400" />
                OPD Consultations: +91 94372 05244
              </p>
              <p className="text-slate-500">OPD Timings: Monday – Saturday (5:00 PM – 9:00 PM)</p>
            </div>
          </div>
        </div>

        {/* Patient Demographic & Consultation Info Bar */}
        <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs mb-6 print:bg-transparent print:border-slate-300">
          <div>
            <span className="text-slate-400 block font-medium">Patient Name</span>
            <span className="font-bold text-slate-900 text-sm">{prescription.patient?.fullName || "Child Patient"}</span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Patient ID / Gender</span>
            <span className="font-semibold text-slate-800 font-mono">
              {prescription.patient?.id || prescription.patientId} ({prescription.patient?.gender || "N/A"})
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Guardian / Relationship</span>
            <span className="font-semibold text-slate-800">
              {prescription.patient?.guardianName ? `${prescription.patient.guardianName} (${prescription.patient.guardianRelationship || "Guardian"})` : "N/A"}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block font-medium">Date & Rx ID</span>
            <span className="font-semibold text-slate-800">
              {new Date(prescription.date).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}
            </span>
          </div>
        </div>

        {/* Clinical Assessment & Diagnosis Banner */}
        <div className="mb-6 p-4 rounded-xl bg-blue-50/60 border border-blue-100 print:bg-transparent print:border-slate-200">
          <div className="flex items-start gap-2">
            <Stethoscope className="w-4 h-4 text-[#1769D2] mt-0.5 shrink-0" />
            <div>
              <span className="text-xs font-bold text-[#12304A] uppercase tracking-wide">Clinical Impression / Diagnosis:</span>
              <p className="text-sm font-semibold text-slate-900 mt-0.5">{prescription.diagnosis || "Clinical Review"}</p>
            </div>
          </div>
        </div>

        {/* Rx Symbol & Medication Table */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl font-serif font-black text-[#1769D2]">℞</span>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700">Prescribed Medication</h3>
          </div>

          <div className="border border-slate-200 rounded-xl overflow-hidden print:border-slate-400">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-100 border-b border-slate-200 print:bg-slate-50 print:border-slate-400 text-slate-700 font-bold">
                  <th className="py-2.5 px-3 w-10 text-center">#</th>
                  <th className="py-2.5 px-4">Medicine & Form</th>
                  <th className="py-2.5 px-3">Strength</th>
                  <th className="py-2.5 px-3">Dosage & Route</th>
                  <th className="py-2.5 px-3">Frequency</th>
                  <th className="py-2.5 px-3">Duration</th>
                  <th className="py-2.5 px-4">Instructions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 print:divide-slate-300">
                {prescription.items && prescription.items.length > 0 ? (
                  prescription.items.map((item, idx) => (
                    <tr key={item.id || idx} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 text-center text-slate-400 font-medium">{idx + 1}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">
                        {item.medicineName}
                        <span className="block text-[11px] font-normal text-slate-500 uppercase tracking-wide">
                          {item.dosageForm}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-700 font-medium">{item.strength || "-"}</td>
                      <td className="py-3 px-3 text-slate-700">
                        <span className="font-semibold text-slate-900">{item.dosage}</span>
                        <span className="block text-[10px] text-slate-500 uppercase">{item.route}</span>
                      </td>
                      <td className="py-3 px-3 font-semibold text-slate-800">{item.frequency}</td>
                      <td className="py-3 px-3 text-slate-700">{item.duration}</td>
                      <td className="py-3 px-4 text-slate-600 italic">{item.instructions || "-"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-slate-400">
                      No specific medication listed in this prescription.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* General Advice & Warning Signals */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 print:grid-cols-2">
          {prescription.instructions && (
            <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 print:bg-transparent">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-[#1769D2]" /> General Advice & Nursing Care
              </h4>
              <p className="text-xs text-slate-600 whitespace-pre-line leading-relaxed">
                {prescription.instructions}
              </p>
            </div>
          )}

          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 print:bg-transparent">
            <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-600" /> Follow-up & Review
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {prescription.followUpAdvice || "Review as advised or immediately if child shows high fever, continuous crying, vomiting, or breathing distress."}
            </p>
            {prescription.nextReviewDate && (
              <div className="mt-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded inline-block">
                Next Review Date: {new Date(prescription.nextReviewDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
              </div>
            )}
          </div>
        </div>

        {/* Doctor Signature & Authentication Footer */}
        <div className="pt-8 border-t border-slate-200 flex flex-col sm:flex-row justify-between items-end gap-6">
          <div className="text-[11px] text-slate-400 space-y-1">
            <p className="flex items-center gap-1 text-slate-500 font-mono">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              Verified Electronic Medical Record • New Life Clinic
            </p>
            <p>System Ref: {prescription.id} | Printed on {new Date().toLocaleString("en-IN")}</p>
          </div>

          <div className="text-center sm:text-right space-y-1 min-w-[200px]">
            {prescription.status === "FINALIZED" ? (
              <div className="space-y-1">
                <div className="inline-block border border-emerald-300 bg-emerald-50/60 rounded px-3 py-1 text-[11px] font-mono text-emerald-800 font-semibold">
                  DIGITALLY SIGNED & VERIFIED
                </div>
                <div className="text-sm font-bold text-[#12304A]">{doctorName}</div>
                <div className="text-xs text-slate-500">M.S., DrNB (Paediatric Surgery)</div>
                <div className="text-[11px] text-slate-400">Reg No: {regNo}</div>
              </div>
            ) : (
              <div className="border border-dashed border-amber-300 bg-amber-50 rounded px-3 py-2 text-xs text-amber-800">
                Draft — Pending Final Signature
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
