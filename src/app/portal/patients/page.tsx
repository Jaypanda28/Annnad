"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { 
  Users, 
  Search, 
  Plus, 
  Filter, 
  Baby, 
  Calendar, 
  Phone, 
  AlertCircle, 
  CheckCircle2, 
  ChevronRight, 
  FileText, 
  X,
  CreditCard,
  Building2,
  Clock
} from "lucide-react";
import { Patient } from "@/lib/db/types";

export default function PatientsDirectoryPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [genderFilter, setGenderFilter] = useState("ALL");
  const [isLoading, setIsLoading] = useState(true);

  // Registration modal states
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "Male" as "Male" | "Female" | "Other",
    bloodGroup: "O+",
    parentGuardianName: "",
    guardianRelationship: "Father" as "Father" | "Mother" | "Guardian",
    contactNumber: "",
    email: "",
    address: "",
    allergies: "None reported",
    chronicConditions: "",
    ignoreDuplicateWarning: false
  });
  const [formError, setFormError] = useState("");
  const [duplicateWarning, setDuplicateWarning] = useState<any | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchPatients = async () => {
    try {
      setIsLoading(true);
      const url = searchQuery.trim() 
        ? `/api/patients?q=${encodeURIComponent(searchQuery.trim())}` 
        : "/api/patients";
      const res = await fetch(url);
      const data = await res.json();
      if (data.patients) {
        setPatients(data.patients);
      }
    } catch (err) {
      console.error("Error fetching patients:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [searchQuery]);

  const handleRegisterPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setDuplicateWarning(null);
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/patients", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (!res.ok) {
        if (data.isDuplicateWarning) {
          setDuplicateWarning(data.existingPatient);
          setFormError(data.error);
        } else {
          setFormError(data.error || "Failed to register patient.");
        }
        setIsSubmitting(false);
        return;
      }

      setIsModalOpen(false);
      resetForm();
      fetchPatients();
    } catch {
      setFormError("Network error submitting patient registration.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: "",
      dateOfBirth: "",
      gender: "Male",
      bloodGroup: "O+",
      parentGuardianName: "",
      guardianRelationship: "Father",
      contactNumber: "",
      email: "",
      address: "",
      allergies: "None reported",
      chronicConditions: "",
      ignoreDuplicateWarning: false
    });
    setFormError("");
    setDuplicateWarning(null);
  };

  const filteredPatients = patients.filter(p => {
    if (genderFilter === "ALL") return true;
    return p.gender.toUpperCase() === genderFilter;
  });

  const calculateAge = (dobString: string) => {
    const dob = new Date(dobString);
    const today = new Date();
    const diffMonths = (today.getFullYear() - dob.getFullYear()) * 12 + (today.getMonth() - dob.getMonth());
    if (diffMonths < 1) return "< 1 month";
    if (diffMonths < 12) return `${diffMonths} months`;
    const years = Math.floor(diffMonths / 12);
    const remMonths = diffMonths % 12;
    return remMonths > 0 ? `${years}y ${remMonths}m` : `${years} years`;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-navy">
            Patient Directory
          </h1>
          <p className="text-xs text-charcoal-muted mt-0.5">
            Manage paediatric medical records, demographic profiles, and guardian contacts.
          </p>
        </div>

        <button
          onClick={() => {
            resetForm();
            setIsModalOpen(true);
          }}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-navy hover:bg-navy-light text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-center"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Patient</span>
        </button>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 rounded-xl bg-white border border-border-subtle shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="relative w-full md:max-w-md">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Child Name, Patient ID (NLC-...), Parent, or Phone..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-border-subtle bg-light-bg text-xs focus:bg-white focus:border-medical transition-all placeholder:text-slate-400"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="flex items-center gap-1.5 text-xs text-charcoal-muted">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span>Gender:</span>
          </div>
          <div className="flex rounded-lg border border-border-subtle p-0.5 bg-light-bg text-xs">
            {["ALL", "MALE", "FEMALE"].map((g) => (
              <button
                key={g}
                onClick={() => setGenderFilter(g)}
                className={`px-3 py-1 rounded-md text-[11px] font-semibold transition-colors ${
                  genderFilter === g
                    ? "bg-white text-navy shadow-xs"
                    : "text-charcoal-muted hover:text-navy"
                }`}
              >
                {g}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Patient List Table */}
      <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial overflow-hidden">
        {isLoading ? (
          <div className="p-12 text-center text-xs text-charcoal-muted">
            Loading patient records from database...
          </div>
        ) : filteredPatients.length === 0 ? (
          <div className="p-12 text-center text-xs text-charcoal-muted space-y-2">
            <Users className="w-8 h-8 text-slate-400 mx-auto" />
            <p className="font-semibold text-navy">No Patients Found</p>
            <p>Try modifying your search criteria or register a new child.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-border-subtle text-charcoal-muted uppercase tracking-wider text-[11px]">
                  <th className="py-3 px-3">Patient ID</th>
                  <th className="py-3 px-3">Child Name & Age</th>
                  <th className="py-3 px-3">Gender / Blood</th>
                  <th className="py-3 px-3">Parent / Guardian</th>
                  <th className="py-3 px-3">Contact</th>
                  <th className="py-3 px-3">Allergies</th>
                  <th className="py-3 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-subtle/60">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-light-bg/50 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-navy whitespace-nowrap">
                      {patient.patientId}
                    </td>
                    <td className="py-3 px-3">
                      <Link
                        href={`/portal/patients/${patient.id}`}
                        className="font-bold text-navy hover:text-medical transition-colors block text-sm"
                      >
                        {patient.fullName}
                      </Link>
                      <span className="text-[11px] text-charcoal-muted">
                        DOB: {patient.dateOfBirth} ({calculateAge(patient.dateOfBirth)})
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="text-slate-800 font-medium">{patient.gender}</span>
                      {patient.bloodGroup && (
                        <span className="ml-2 text-[10px] bg-red-50 text-red-700 px-1.5 py-0.5 rounded font-bold border border-red-200">
                          {patient.bloodGroup}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-medium text-navy block">{patient.parentGuardianName}</span>
                      <span className="text-[11px] text-charcoal-muted">({patient.guardianRelationship})</span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      <a href={`tel:${patient.contactNumber.replace(/\D/g, "")}`} className="text-medical font-medium hover:underline">
                        {patient.contactNumber}
                      </a>
                    </td>
                    <td className="py-3 px-3">
                      {patient.allergies && patient.allergies !== "None" && patient.allergies !== "None reported" ? (
                        <span className="text-[10px] font-semibold bg-red-50 text-red-700 px-2 py-0.5 rounded border border-red-200 inline-block">
                          {patient.allergies}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">NKDA</span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right whitespace-nowrap">
                      <Link
                        href={`/portal/patients/${patient.id}`}
                        className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-light-bg hover:bg-slate-200 text-charcoal font-semibold text-[11px] transition-colors"
                      >
                        <span>Full Profile & History</span>
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

      {/* New Patient Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-dark/70 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl max-h-[92vh] flex flex-col bg-white rounded-2xl shadow-2xl border border-border-subtle overflow-hidden">
            {/* Header */}
            <div className="p-5 bg-navy text-white flex items-center justify-between border-b border-navy-light">
              <div className="flex items-center gap-2.5">
                <div className="p-2 rounded-lg bg-teal text-white">
                  <Baby className="w-5 h-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold">New Paediatric Patient Registration</h2>
                  <p className="text-xs text-slate-300">Creates unique patient ID in New Life Clinic database</p>
                </div>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleRegisterPatient} className="flex-1 overflow-y-auto p-6 space-y-4 text-xs">
              {formError && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 space-y-2">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                    <span>{formError}</span>
                  </div>
                  {duplicateWarning && (
                    <div className="pt-2 border-t border-red-200/80 flex items-center justify-between">
                      <span className="text-[11px]">Would you like to register anyway?</span>
                      <button
                        type="button"
                        onClick={() => {
                          setFormData({ ...formData, ignoreDuplicateWarning: true });
                          setFormError("");
                          setDuplicateWarning(null);
                        }}
                        className="px-2.5 py-1 rounded bg-red-700 text-white font-semibold text-[11px] hover:bg-red-800"
                      >
                        Override & Register Duplicate
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Child Details */}
              <div className="space-y-3 pb-3 border-b border-border-subtle">
                <span className="font-bold uppercase tracking-wider text-teal text-[11px] block">
                  1. Child Information
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-charcoal block mb-1">
                      Child Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      placeholder="e.g. Aarav Patnaik"
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg focus:bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-charcoal block mb-1">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={(e) => setFormData({ ...formData, dateOfBirth: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg focus:bg-white text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-charcoal block mb-1">Gender <span className="text-red-500">*</span></label>
                    <select
                      value={formData.gender}
                      onChange={(e) => setFormData({ ...formData, gender: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg focus:bg-white text-xs"
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="font-semibold text-charcoal block mb-1">Blood Group</label>
                    <select
                      value={formData.bloodGroup}
                      onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg focus:bg-white text-xs"
                    >
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="Unknown">Unknown</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Guardian Information */}
              <div className="space-y-3 pb-3 border-b border-border-subtle">
                <span className="font-bold uppercase tracking-wider text-teal text-[11px] block">
                  2. Parent / Guardian Details
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2">
                    <label className="font-semibold text-charcoal block mb-1">
                      Parent / Guardian Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.parentGuardianName}
                      onChange={(e) => setFormData({ ...formData, parentGuardianName: e.target.value })}
                      placeholder="e.g. Subhashree Patnaik"
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg focus:bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-charcoal block mb-1">Relationship</label>
                    <select
                      value={formData.guardianRelationship}
                      onChange={(e) => setFormData({ ...formData, guardianRelationship: e.target.value as any })}
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg focus:bg-white text-xs"
                    >
                      <option value="Father">Father</option>
                      <option value="Mother">Mother</option>
                      <option value="Guardian">Legal Guardian</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-charcoal block mb-1">
                      Primary Contact Number <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.contactNumber}
                      onChange={(e) => setFormData({ ...formData, contactNumber: e.target.value })}
                      placeholder="e.g. +91 98610 12345"
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg focus:bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-charcoal block mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="parent@example.com"
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg focus:bg-white text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold text-charcoal block mb-1">Residential Address</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="e.g. Soubhagya Nagar, Bhubaneswar"
                    className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg focus:bg-white text-xs"
                  />
                </div>
              </div>

              {/* Medical Alerts */}
              <div className="space-y-3">
                <span className="font-bold uppercase tracking-wider text-teal text-[11px] block">
                  3. Clinical Background Alerts
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold text-charcoal block mb-1">Drug Allergies</label>
                    <input
                      type="text"
                      value={formData.allergies}
                      onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                      placeholder="e.g. Penicillin, Amoxicillin, or None"
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg focus:bg-white text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-semibold text-charcoal block mb-1">Known Conditions / Past Surgeries</label>
                    <input
                      type="text"
                      value={formData.chronicConditions}
                      onChange={(e) => setFormData({ ...formData, chronicConditions: e.target.value })}
                      placeholder="e.g. Inguinal hernia, PUJ obstruction"
                      className="w-full px-3 py-2 rounded-lg border border-border-subtle bg-light-bg focus:bg-white text-xs"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-4 border-t border-border-subtle flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg border border-border-subtle text-charcoal hover:bg-slate-100 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-lg bg-navy hover:bg-navy-light text-white font-semibold transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {isSubmitting ? "Registering..." : "Complete Registration"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
