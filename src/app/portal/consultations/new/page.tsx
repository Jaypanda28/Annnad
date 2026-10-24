"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { 
  FileText, 
  Stethoscope, 
  Pill, 
  Plus, 
  Trash2, 
  CheckCircle2, 
  AlertCircle, 
  ArrowLeft, 
  Save, 
  ShieldCheck, 
  Building2,
  Calendar,
  Baby
} from "lucide-react";
import { Patient, PrescriptionItem } from "@/lib/db/types";

function NewConsultationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const preselectedPatientId = searchParams.get("patientId") || "";
  const linkedAppointmentId = searchParams.get("appointmentId") || "";

  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatientId, setSelectedPatientId] = useState(preselectedPatientId);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  // Clinical EMR fields
  const [presentingComplaints, setPresentingComplaints] = useState("");
  const [historyOfIllness, setHistoryOfIllness] = useState("");
  const [pastMedicalHistory, setPastMedicalHistory] = useState("");
  const [pastSurgicalHistory, setPastSurgicalHistory] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [heightCm, setHeightCm] = useState("");
  const [tempF, setTempF] = useState("98.6");
  const [heartRateBpm, setHeartRateBpm] = useState("");
  const [examinationFindings, setExaminationFindings] = useState("");
  const [primaryDiagnosis, setPrimaryDiagnosis] = useState("");
  const [secondaryDiagnosis, setSecondaryDiagnosis] = useState("");
  const [investigationRecommendations, setInvestigationRecommendations] = useState("");
  const [treatmentPlan, setTreatmentPlan] = useState("");
  const [surgeryRecommended, setSurgeryRecommended] = useState(false);
  const [surgicalProcedureDetails, setSurgicalProcedureDetails] = useState("");
  const [followUpDate, setFollowUpDate] = useState("");
  const [followUpInstructions, setFollowUpInstructions] = useState("");

  // Prescription medicines
  const [medications, setMedications] = useState<Array<{
    medicineName: string;
    composition: string;
    strength: string;
    form: PrescriptionItem["form"];
    dosage: string;
    route: PrescriptionItem["route"];
    frequency: PrescriptionItem["frequency"];
    duration: string;
    instructions: string;
  }>>([
    {
      medicineName: "",
      composition: "",
      strength: "",
      form: "Syrup",
      dosage: "",
      route: "Oral",
      frequency: "BD (Twice daily)",
      duration: "5 days",
      instructions: ""
    }
  ]);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    fetch("/api/patients")
      .then(res => res.json())
      .then(data => {
        if (data.patients) {
          setPatients(data.patients);
          if (preselectedPatientId) {
            const found = data.patients.find((p: Patient) => p.id === preselectedPatientId || p.patientId === preselectedPatientId);
            if (found) {
              setSelectedPatient(found);
              setSelectedPatientId(found.id);
            }
          }
        }
      });
  }, [preselectedPatientId]);

  const handlePatientChange = (pId: string) => {
    setSelectedPatientId(pId);
    const found = patients.find(p => p.id === pId);
    setSelectedPatient(found || null);
  };

  const handleAddMedication = () => {
    setMedications([
      ...medications,
      {
        medicineName: "",
        composition: "",
        strength: "",
        form: "Syrup",
        dosage: "",
        route: "Oral",
        frequency: "BD (Twice daily)",
        duration: "5 days",
        instructions: ""
      }
    ]);
  };

  const handleRemoveMedication = (index: number) => {
    if (medications.length === 1) return;
    setMedications(medications.filter((_, i) => i !== index));
  };

  const handleMedChange = (index: number, field: string, val: string) => {
    const updated = [...medications];
    (updated[index] as any)[field] = val;
    setMedications(updated);
  };

  const handleSubmit = async (signAndFinalize: boolean) => {
    setFormError("");
    if (!selectedPatientId) {
      setFormError("Please select a patient.");
      return;
    }
    if (!presentingComplaints.trim()) {
      setFormError("Please record presenting complaints.");
      return;
    }
    if (!primaryDiagnosis.trim()) {
      setFormError("Please record a primary clinical diagnosis.");
      return;
    }
    if (!treatmentPlan.trim()) {
      setFormError("Please specify a treatment plan.");
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Create Consultation
      const cnsRes = await fetch("/api/consultations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          patientId: selectedPatientId,
          appointmentId: linkedAppointmentId || undefined,
          presentingComplaints,
          historyOfPresentIllness: historyOfIllness,
          pastMedicalHistory,
          pastSurgicalHistory,
          vitalsWeightKg: weightKg,
          vitalsHeightCm: heightCm,
          vitalsTempF: tempF,
          vitalsHeartRateBpm: heartRateBpm,
          examinationFindings,
          primaryDiagnosis,
          secondaryDiagnosis,
          investigationRecommendations,
          treatmentPlan,
          surgeryRecommended,
          surgicalProcedureDetails,
          followUpInstructions,
          followUpDate,
          isSigned: signAndFinalize
        })
      });

      const cnsData = await cnsRes.json();
      if (!cnsRes.ok) {
        setFormError(cnsData.error || "Failed to record consultation.");
        setIsSubmitting(false);
        return;
      }

      // 2. If medications entered, create Prescription
      const validMeds = medications.filter(m => m.medicineName.trim().length > 0);
      if (validMeds.length > 0) {
        await fetch("/api/prescriptions", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            consultationId: cnsData.consultation.id,
            patientId: selectedPatientId,
            diagnosisSummary: primaryDiagnosis,
            generalAdvice: treatmentPlan,
            followUpAdvice: followUpInstructions,
            items: validMeds,
            isSigned: signAndFinalize
          })
        });
      }

      router.push(`/portal/patients/${selectedPatientId}`);
    } catch {
      setFormError("Network error saving consultation record.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <Link
          href="/portal/doctor"
          className="inline-flex items-center gap-2 text-xs font-semibold text-charcoal-muted hover:text-navy transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Doctor Dashboard</span>
        </Link>
        <span className="text-xs font-bold text-teal flex items-center gap-1.5">
          <Stethoscope className="w-4 h-4" />
          Dr. Abhishek Anand Clinical EMR Workspace
        </span>
      </div>

      <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy">
            Clinical Consultation & Prescription Workspace
          </h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Electronic Medical Record (EMR) documentation for New Life Clinic, Soubhagya Nagar.
          </p>
        </div>

        {formError && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
            <span>{formError}</span>
          </div>
        )}

        {/* Section 1: Patient Selection */}
        <div className="p-4 rounded-xl bg-light-bg border border-border-subtle space-y-3">
          <label className="block text-xs font-bold text-navy uppercase tracking-wider">
            Select Patient <span className="text-red-500">*</span>
          </label>
          <select
            value={selectedPatientId}
            onChange={(e) => handlePatientChange(e.target.value)}
            className="w-full px-3.5 py-2.5 rounded-lg border border-border-subtle bg-white text-xs font-medium text-navy"
          >
            <option value="">-- Choose child from registered patients --</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.fullName} ({p.patientId}) — Parent: {p.parentGuardianName} ({p.contactNumber})
              </option>
            ))}
          </select>

          {selectedPatient && (
            <div className="pt-2 border-t border-border-subtle/80 flex flex-wrap items-center gap-4 text-xs">
              <div>
                <span className="text-charcoal-muted">DOB:</span> <strong>{selectedPatient.dateOfBirth}</strong>
              </div>
              <div>
                <span className="text-charcoal-muted">Gender:</span> <strong>{selectedPatient.gender}</strong>
              </div>
              {selectedPatient.bloodGroup && (
                <div>
                  <span className="text-charcoal-muted">Blood:</span> <strong>{selectedPatient.bloodGroup}</strong>
                </div>
              )}
              {selectedPatient.allergies && (
                <div className="text-red-700 font-bold bg-red-50 px-2 py-0.5 rounded border border-red-200">
                  ⚠️ Allergies: {selectedPatient.allergies}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Section 2: Presenting Complaints & Vitals */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-teal">
            1. History & Paediatric Vitals
          </h2>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div>
              <label className="font-semibold text-charcoal block mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.1"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                placeholder="e.g. 9.2"
                className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-charcoal block mb-1">Height (cm)</label>
              <input
                type="number"
                step="0.5"
                value={heightCm}
                onChange={(e) => setHeightCm(e.target.value)}
                placeholder="e.g. 74"
                className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-charcoal block mb-1">Temperature (°F)</label>
              <input
                type="number"
                step="0.1"
                value={tempF}
                onChange={(e) => setTempF(e.target.value)}
                placeholder="98.6"
                className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-charcoal block mb-1">Heart Rate (bpm)</label>
              <input
                type="number"
                value={heartRateBpm}
                onChange={(e) => setHeartRateBpm(e.target.value)}
                placeholder="e.g. 110"
                className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg text-xs"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-charcoal block mb-1 text-xs">
              Presenting Complaints & Duration <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={presentingComplaints}
              onChange={(e) => setPresentingComplaints(e.target.value)}
              placeholder="e.g. Swelling in right groin since 3 weeks, prominent on crying..."
              className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg text-xs focus:bg-white"
            />
          </div>

          <div>
            <label className="font-semibold text-charcoal block mb-1 text-xs">
              History of Present Illness & Systemic Enquiry
            </label>
            <textarea
              rows={2}
              value={historyOfIllness}
              onChange={(e) => setHistoryOfIllness(e.target.value)}
              placeholder="Full details of symptom onset, aggravating factors, bowel and bladder habits..."
              className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg text-xs focus:bg-white"
            />
          </div>
        </div>

        {/* Section 3: Physical Examination & Diagnosis */}
        <div className="space-y-4 pt-4 border-t border-border-subtle">
          <h2 className="text-sm font-bold uppercase tracking-wider text-teal">
            2. Clinical Examination & Diagnosis
          </h2>

          <div>
            <label className="font-semibold text-charcoal block mb-1 text-xs">
              Physical Examination Findings
            </label>
            <textarea
              rows={3}
              value={examinationFindings}
              onChange={(e) => setExaminationFindings(e.target.value)}
              placeholder="Abdominal palpation, groin examination, testicular position, scrotum, tenderness, silk-sign..."
              className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg text-xs focus:bg-white"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-semibold text-charcoal block mb-1">
                Primary Diagnosis <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={primaryDiagnosis}
                onChange={(e) => setPrimaryDiagnosis(e.target.value)}
                placeholder="e.g. Right Inguinal Hernia (Reducible)"
                className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg text-xs focus:bg-white font-semibold text-navy"
              />
            </div>
            <div>
              <label className="font-semibold text-charcoal block mb-1">
                Secondary Diagnosis / Differential
              </label>
              <input
                type="text"
                value={secondaryDiagnosis}
                onChange={(e) => setSecondaryDiagnosis(e.target.value)}
                placeholder="e.g. Associated Right Hydrocele"
                className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg text-xs focus:bg-white"
              />
            </div>
          </div>

          <div>
            <label className="font-semibold text-charcoal block mb-1 text-xs">
              Investigations Recommended
            </label>
            <input
              type="text"
              value={investigationRecommendations}
              onChange={(e) => setInvestigationRecommendations(e.target.value)}
              placeholder="e.g. USG Inguinoscrotal Region, Complete Blood Count, Urine Routine"
              className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg text-xs focus:bg-white"
            />
          </div>
        </div>

        {/* Section 4: Treatment & Surgical Recommendation */}
        <div className="space-y-4 pt-4 border-t border-border-subtle">
          <h2 className="text-sm font-bold uppercase tracking-wider text-teal">
            3. Treatment Plan & Surgical Action
          </h2>

          <div>
            <label className="font-semibold text-charcoal block mb-1 text-xs">
              Treatment Plan & Clinical Advice <span className="text-red-500">*</span>
            </label>
            <textarea
              rows={2}
              required
              value={treatmentPlan}
              onChange={(e) => setTreatmentPlan(e.target.value)}
              placeholder="Clinical recommendations, non-surgical observation, or planned operative steps..."
              className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg text-xs focus:bg-white"
            />
          </div>

          <div className="p-4 rounded-xl bg-light-bg border border-border-subtle space-y-3 text-xs">
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="surgeryRecommended"
                checked={surgeryRecommended}
                onChange={(e) => setSurgeryRecommended(e.target.checked)}
                className="w-4 h-4 text-navy rounded border-slate-300"
              />
              <label htmlFor="surgeryRecommended" className="font-bold text-navy cursor-pointer">
                Surgical Procedure Recommended at Partner Tertiary Facility
              </label>
            </div>

            {surgeryRecommended && (
              <div className="pt-2">
                <label className="font-semibold text-charcoal block mb-1">
                  Proposed Surgical Procedure Details
                </label>
                <input
                  type="text"
                  value={surgicalProcedureDetails}
                  onChange={(e) => setSurgicalProcedureDetails(e.target.value)}
                  placeholder="e.g. Right Paediatric Herniotomy under General Anaesthesia"
                  className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-white text-xs font-semibold text-navy"
                />
              </div>
            )}
          </div>
        </div>

        {/* Section 5: Digital Prescription Builder */}
        <div className="space-y-4 pt-4 border-t border-border-subtle">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Pill className="w-4 h-4 text-medical" />
              <h2 className="text-sm font-bold uppercase tracking-wider text-navy">
                4. Digital Prescription (Medications & Dosing)
              </h2>
            </div>
            <button
              type="button"
              onClick={handleAddMedication}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-light text-teal-dark font-semibold text-xs border border-teal/20 hover:bg-teal-subtle cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Medication</span>
            </button>
          </div>

          <div className="space-y-3">
            {medications.map((med, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl border border-border-subtle bg-warm-white space-y-3 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-navy">Medicine 0{idx + 1}</span>
                  {medications.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMedication(idx)}
                      className="text-red-500 hover:text-red-700 flex items-center gap-1 text-[11px]"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                      <span>Remove</span>
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <div className="sm:col-span-2">
                    <label className="font-semibold text-charcoal block mb-0.5">Medicine Name</label>
                    <input
                      type="text"
                      value={med.medicineName}
                      onChange={(e) => handleMedChange(idx, "medicineName", e.target.value)}
                      placeholder="e.g. Syrup Paracetamol Paediatric"
                      className="w-full px-3 py-1.5 rounded-lg border border-border-subtle bg-white text-xs font-semibold"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-charcoal block mb-0.5">Form</label>
                    <select
                      value={med.form}
                      onChange={(e) => handleMedChange(idx, "form", e.target.value)}
                      className="w-full px-3 py-1.5 rounded-lg border border-border-subtle bg-white text-xs"
                    >
                      <option value="Syrup">Syrup</option>
                      <option value="Suspension">Suspension</option>
                      <option value="Drops">Drops</option>
                      <option value="Tablet">Tablet</option>
                      <option value="Capsule">Capsule</option>
                      <option value="Ointment">Ointment</option>
                      <option value="Suppository">Suppository</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div>
                    <label className="font-semibold text-charcoal block mb-0.5">Strength</label>
                    <input
                      type="text"
                      value={med.strength}
                      onChange={(e) => handleMedChange(idx, "strength", e.target.value)}
                      placeholder="e.g. 120mg/5ml"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-border-subtle bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-charcoal block mb-0.5">Dose</label>
                    <input
                      type="text"
                      value={med.dosage}
                      onChange={(e) => handleMedChange(idx, "dosage", e.target.value)}
                      placeholder="e.g. 3.5 ml"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-border-subtle bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="font-semibold text-charcoal block mb-0.5">Frequency</label>
                    <select
                      value={med.frequency}
                      onChange={(e) => handleMedChange(idx, "frequency", e.target.value)}
                      className="w-full px-2 py-1.5 rounded-lg border border-border-subtle bg-white text-xs"
                    >
                      <option value="OD (Once daily)">OD (Once daily)</option>
                      <option value="BD (Twice daily)">BD (Twice daily)</option>
                      <option value="TDS (Three times daily)">TDS (Three times daily)</option>
                      <option value="QID (Four times daily)">QID (Four times daily)</option>
                      <option value="SOS (As needed)">SOS (As needed)</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-semibold text-charcoal block mb-0.5">Duration</label>
                    <input
                      type="text"
                      value={med.duration}
                      onChange={(e) => handleMedChange(idx, "duration", e.target.value)}
                      placeholder="e.g. 5 days"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-border-subtle bg-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-charcoal block mb-0.5">Specific Instructions for Parents</label>
                  <input
                    type="text"
                    value={med.instructions}
                    onChange={(e) => handleMedChange(idx, "instructions", e.target.value)}
                    placeholder="e.g. After feeding with lukewarm water"
                    className="w-full px-3 py-1.5 rounded-lg border border-border-subtle bg-white text-xs"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 6: Follow-up & Actions */}
        <div className="space-y-4 pt-4 border-t border-border-subtle">
          <h2 className="text-sm font-bold uppercase tracking-wider text-teal">
            5. Follow-Up Schedule
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="font-semibold text-charcoal block mb-1">Follow-up Review Date</label>
              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg text-xs"
              />
            </div>
            <div>
              <label className="font-semibold text-charcoal block mb-1">Parent Instructions</label>
              <input
                type="text"
                value={followUpInstructions}
                onChange={(e) => setFollowUpInstructions(e.target.value)}
                placeholder="e.g. Review with repeat ultrasound in 2 weeks"
                className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg text-xs"
              />
            </div>
          </div>
        </div>

        {/* Submit Actions */}
        <div className="pt-6 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-charcoal-muted">
            <ShieldCheck className="w-4 h-4 text-teal" />
            <span>Signing locks record with Dr. Abhishek Anand digital signature audit stamp.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit(false)}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-lg border border-border-subtle text-charcoal hover:bg-slate-100 text-xs font-semibold transition-colors disabled:opacity-50 cursor-pointer"
            >
              <Save className="w-3.5 h-3.5 inline mr-1" />
              <span>Save as Draft</span>
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => handleSubmit(true)}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-lg bg-navy hover:bg-navy-light text-white text-xs font-semibold shadow-md transition-colors disabled:opacity-50 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4 inline mr-1 text-teal-light" />
              <span>{isSubmitting ? "Finalizing..." : "Sign & Finalize Consultation"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function NewConsultationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-xs">Loading EMR Workspace...</div>}>
      <NewConsultationForm />
    </Suspense>
  );
}
