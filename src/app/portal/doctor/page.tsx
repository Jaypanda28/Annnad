"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Users, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Play, 
  Plus, 
  FileText, 
  Pill, 
  Search, 
  AlertCircle, 
  ArrowRight, 
  Stethoscope,
  Building2,
  ChevronRight,
  Sparkles,
  Baby
} from "lucide-react";

interface QueueItem {
  id: string;
  tokenCode: string;
  tokenNumber: number;
  queueStatus: string;
  checkInTime: string;
  priorityLevel: string;
  patient?: {
    id: string;
    patientId: string;
    fullName: string;
    dateOfBirth: string;
    gender: string;
    contactNumber: string;
    parentGuardianName: string;
    allergies?: string;
  };
  appointment?: {
    id: string;
    appointmentTime: string;
    reasonForVisit: string;
    consultationType: string;
  };
}

interface AppointmentItem {
  id: string;
  appointmentNumber: string;
  appointmentTime: string;
  status: string;
  consultationType: string;
  reasonForVisit: string;
  patient?: {
    id: string;
    patientId: string;
    fullName: string;
    dateOfBirth: string;
    gender: string;
    contactNumber: string;
    parentGuardianName: string;
  };
}

export default function DoctorDashboardPage() {
  const router = useRouter();
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [appointments, setAppointments] = useState<AppointmentItem[]>([]);
  const [recentConsultations, setRecentConsultations] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [patientSearchQuery, setPatientSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);

  const todayStr = new Date().toISOString().split("T")[0];

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [queueRes, aptRes, cnsRes] = await Promise.all([
        fetch("/api/queue"),
        fetch(`/api/appointments?date=${todayStr}`),
        fetch("/api/consultations")
      ]);

      const queueData = await queueRes.json();
      const aptData = await aptRes.json();
      const cnsData = await cnsRes.json();

      if (queueData.queue) setQueue(queueData.queue);
      if (aptData.appointments) setAppointments(aptData.appointments);
      if (cnsData.consultations) setRecentConsultations(cnsData.consultations.slice(0, 5));
    } catch (err) {
      console.error("Error loading doctor dashboard data:", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSearchPatient = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientSearchQuery.trim()) return;

    try {
      const res = await fetch(`/api/patients?q=${encodeURIComponent(patientSearchQuery.trim())}`);
      const data = await res.json();
      if (data.patients) {
        setSearchResults(data.patients);
      }
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  const handleUpdateQueueStatus = async (queueId: string, newStatus: string) => {
    try {
      await fetch("/api/queue", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ queueId, status: newStatus })
      });
      fetchData();
    } catch (err) {
      console.error("Queue update error:", err);
    }
  };

  // Metrics computation from real database values
  const waitingPatients = queue.filter(q => q.queueStatus === "WAITING");
  const inConsultationPatient = queue.find(q => q.queueStatus === "IN_CONSULTATION");
  const completedTodayCount = queue.filter(q => q.queueStatus === "COMPLETED").length;
  const totalTodayApts = appointments.length;

  return (
    <div className="space-y-8">
      {/* Welcome & Clinician Banner */}
      <div className="p-6 rounded-2xl bg-navy text-white shadow-editorial border border-navy-light flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal/20 text-teal-light text-xs font-semibold tracking-wide uppercase">
            <Stethoscope className="w-3.5 h-3.5" />
            <span>Paediatric Surgery & Urology OPD</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Welcome, Dr. Abhishek Anand
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
            New Life Clinic, Soubhagya Nagar, Bhubaneswar • Evening Session Active (5:00 PM – 9:00 PM). Manage today&apos;s waiting queue, start patient consultations, and review surgical follow-ups.
          </p>
        </div>

        <div className="shrink-0 flex flex-wrap items-center gap-3">
          <Link
            href="/portal/consultations/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-teal text-white hover:bg-teal-dark font-semibold text-xs shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>New Consultation</span>
          </Link>
          <Link
            href="/portal/appointments"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/10 hover:bg-white/20 text-white font-semibold text-xs border border-white/20 transition-colors"
          >
            <Calendar className="w-4 h-4 text-teal-light" />
            <span>Today&apos;s Schedule</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="p-4 rounded-xl bg-white border border-border-subtle shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-charcoal-muted">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Today&apos;s Slots</span>
            <Calendar className="w-4 h-4 text-medical" />
          </div>
          <div className="text-2xl font-bold text-navy">{totalTodayApts}</div>
          <p className="text-[11px] text-charcoal-muted">Booked consultations</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-amber-300/80 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-amber-800">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Waiting Queue</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-amber-900">{waitingPatients.length}</div>
          <p className="text-[11px] text-amber-700">Patients in waiting room</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-teal/40 shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-teal-dark">
            <span className="font-semibold uppercase tracking-wider text-[11px]">In Consultation</span>
            <Play className="w-4 h-4 text-teal" />
          </div>
          <div className="text-2xl font-bold text-navy">
            {inConsultationPatient ? "1 Active" : "None"}
          </div>
          <p className="text-[11px] text-teal-dark">Currently in doctor room</p>
        </div>

        <div className="p-4 rounded-xl bg-white border border-border-subtle shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-charcoal-muted">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Completed</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-navy">{completedTodayCount}</div>
          <p className="text-[11px] text-charcoal-muted">Signed consultations</p>
        </div>

        <div className="col-span-2 lg:col-span-1 p-4 rounded-xl bg-white border border-border-subtle shadow-2xs space-y-1">
          <div className="flex items-center justify-between text-xs text-charcoal-muted">
            <span className="font-semibold uppercase tracking-wider text-[11px]">Follow-ups Due</span>
            <Users className="w-4 h-4 text-teal" />
          </div>
          <div className="text-2xl font-bold text-navy">3 Due</div>
          <p className="text-[11px] text-charcoal-muted">Surgical review this week</p>
        </div>
      </div>

      {/* Main Grid: Waiting Queue + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Live Queue & Current Consultation */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Patient In Consultation Card */}
          {inConsultationPatient && inConsultationPatient.patient && (
            <div className="p-5 rounded-2xl bg-teal-subtle border-2 border-teal shadow-editorial space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal text-white">
                    {inConsultationPatient.tokenCode}
                  </span>
                  <span className="text-xs font-bold uppercase tracking-wider text-teal-dark">
                    Currently Inside Consultation Room
                  </span>
                </div>
                <span className="text-xs text-charcoal-muted">
                  Checked in {inConsultationPatient.checkInTime ? new Date(inConsultationPatient.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Earlier"}
                </span>
              </div>

              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-xl font-bold text-navy">
                    {inConsultationPatient.patient.fullName}
                  </h3>
                  <p className="text-xs text-charcoal-muted mt-0.5">
                    Patient ID: <span className="font-semibold text-navy">{inConsultationPatient.patient.patientId}</span> • Gender: {inConsultationPatient.patient.gender} • Parent: {inConsultationPatient.patient.parentGuardianName} ({inConsultationPatient.patient.contactNumber})
                  </p>
                  {inConsultationPatient.appointment && (
                    <p className="text-xs text-charcoal font-medium mt-1">
                      Reason: {inConsultationPatient.appointment.reasonForVisit}
                    </p>
                  )}
                  {inConsultationPatient.patient.allergies && inConsultationPatient.patient.allergies !== "None" && (
                    <span className="inline-block mt-2 text-[11px] bg-red-50 text-red-700 px-2 py-0.5 rounded border border-red-200 font-medium">
                      Allergy Alert: {inConsultationPatient.patient.allergies}
                    </span>
                  )}
                </div>

                <div className="shrink-0 flex flex-col gap-2">
                  <Link
                    href={`/portal/consultations/new?patientId=${inConsultationPatient.patient.id}&appointmentId=${inConsultationPatient.appointment?.id || ""}`}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-navy hover:bg-navy-light text-white text-xs font-semibold shadow-xs transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Open EMR Notes</span>
                  </Link>
                  <button
                    onClick={() => handleUpdateQueueStatus(inConsultationPatient.id, "COMPLETED")}
                    className="inline-flex items-center justify-center gap-1.5 px-4 py-1.5 rounded-lg border border-border-subtle bg-white text-charcoal hover:bg-slate-100 text-xs font-medium transition-colors"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Complete Visit</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Waiting Room Queue */}
          <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <div>
                <h2 className="text-base font-bold text-navy">
                  Live Waiting Queue — Dr. Abhishek Anand
                </h2>
                <p className="text-xs text-charcoal-muted">
                  Patients waiting at New Life Clinic front desk for consultation.
                </p>
              </div>
              <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                {waitingPatients.length} Waiting
              </span>
            </div>

            {isLoading ? (
              <div className="p-8 text-center text-xs text-charcoal-muted">
                Loading queue records from database...
              </div>
            ) : waitingPatients.length === 0 ? (
              <div className="p-8 text-center rounded-xl bg-light-bg text-xs text-charcoal-muted space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <p className="font-semibold text-navy">Waiting Room is Currently Clear</p>
                <p>No patients are currently marked as waiting in the OPD queue.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {waitingPatients.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl border border-border-subtle hover:border-teal/50 bg-warm-white transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-800 font-bold text-sm flex items-center justify-center shrink-0 border border-amber-200">
                        {item.tokenCode}
                      </div>
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-navy">
                            {item.patient?.fullName || "Patient"}
                          </h4>
                          <span className="text-[10px] text-charcoal-muted font-mono">
                            {item.patient?.patientId}
                          </span>
                          {item.priorityLevel === "INFANT_PRIORITY" && (
                            <span className="text-[10px] font-semibold bg-blue-50 text-blue-700 px-1.5 py-0.5 rounded border border-blue-200 flex items-center gap-1">
                              <Baby className="w-3 h-3" />
                              Infant Priority
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-charcoal-muted">
                          Parent: {item.patient?.parentGuardianName} • Contact: {item.patient?.contactNumber}
                        </p>
                        {item.appointment && (
                          <p className="text-xs text-charcoal">
                            Reason: {item.appointment.reasonForVisit}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <button
                        onClick={() => handleUpdateQueueStatus(item.id, "IN_CONSULTATION")}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-medical hover:bg-medical-hover text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                      >
                        <Play className="w-3 h-3" />
                        <span>Call In Patient</span>
                      </button>
                      <Link
                        href={`/portal/patients/${item.patient?.id}`}
                        className="px-3 py-1.5 rounded-lg border border-border-subtle bg-white hover:bg-slate-50 text-xs font-medium text-charcoal transition-colors"
                      >
                        View History
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Today's Full Schedule Table */}
          <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <div>
                <h3 className="text-base font-bold text-navy">
                  Today&apos;s Booked Consultation Slots
                </h3>
                <p className="text-xs text-charcoal-muted">
                  All scheduled appointments for {todayStr}.
                </p>
              </div>
              <Link
                href="/portal/appointments"
                className="text-xs text-medical font-semibold hover:underline"
              >
                Manage Schedule →
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border-subtle text-charcoal-muted uppercase tracking-wider text-[11px]">
                    <th className="py-2.5">Time</th>
                    <th className="py-2.5">Patient Details</th>
                    <th className="py-2.5">Visit Type</th>
                    <th className="py-2.5">Reason</th>
                    <th className="py-2.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle/60">
                  {appointments.map((apt) => (
                    <tr key={apt.id} className="hover:bg-light-bg/50">
                      <td className="py-3 font-bold text-navy whitespace-nowrap">
                        {apt.appointmentTime}
                      </td>
                      <td className="py-3">
                        <Link 
                          href={`/portal/patients/${apt.patient?.id}`}
                          className="font-bold text-medical hover:underline block"
                        >
                          {apt.patient?.fullName}
                        </Link>
                        <span className="text-[11px] text-charcoal-muted">
                          {apt.patient?.patientId} • Parent: {apt.patient?.parentGuardianName}
                        </span>
                      </td>
                      <td className="py-3">
                        <span className="capitalize text-slate-700">
                          {apt.consultationType.toLowerCase().replace("_", " ")}
                        </span>
                      </td>
                      <td className="py-3 max-w-xs text-charcoal-muted truncate">
                        {apt.reasonForVisit}
                      </td>
                      <td className="py-3">
                        <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-semibold ${
                          apt.status === "COMPLETED" ? "bg-emerald-50 text-emerald-700 border border-emerald-200" :
                          apt.status === "IN_CONSULTATION" ? "bg-teal-light text-teal-dark border border-teal/20" :
                          apt.status === "WAITING" ? "bg-amber-50 text-amber-700 border border-amber-200" :
                          "bg-slate-100 text-slate-700"
                        }`}>
                          {apt.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Search Patient, Quick Actions, Recent Clinical Records */}
        <div className="lg:col-span-5 space-y-6">
          {/* Quick Patient Search Widget */}
          <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-4">
            <div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-navy">
                Search Patient Records
              </h3>
              <p className="text-xs text-charcoal-muted mt-0.5">
                Quickly locate a child&apos;s previous surgical notes or prescription.
              </p>
            </div>

            <form onSubmit={handleSearchPatient} className="flex gap-2">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={patientSearchQuery}
                  onChange={(e) => setPatientSearchQuery(e.target.value)}
                  placeholder="Patient Name, ID or Phone..."
                  className="w-full pl-9 pr-3.5 py-2 rounded-lg border border-border-subtle bg-light-bg text-xs focus:bg-white focus:border-medical transition-all placeholder:text-slate-400"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              </div>
              <button
                type="submit"
                className="px-4 py-2 rounded-lg bg-navy hover:bg-navy-light text-white text-xs font-semibold transition-colors"
              >
                Search
              </button>
            </form>

            {searchResults.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-border-subtle max-h-56 overflow-y-auto">
                <span className="text-[11px] font-semibold text-charcoal-muted block">
                  Found {searchResults.length} Match(es):
                </span>
                {searchResults.map((p) => (
                  <Link
                    key={p.id}
                    href={`/portal/patients/${p.id}`}
                    className="p-2.5 rounded-lg border border-border-subtle hover:border-medical bg-light-bg/40 hover:bg-light-bg flex items-center justify-between transition-colors block text-xs"
                  >
                    <div>
                      <span className="font-bold text-navy">{p.fullName}</span>
                      <span className="text-[11px] text-charcoal-muted ml-2">({p.patientId})</span>
                      <p className="text-[11px] text-charcoal-muted mt-0.5">
                        Parent: {p.parentGuardianName} • {p.contactNumber}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400" />
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Actions Shortcuts */}
          <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-navy">
              Clinical Quick Actions
            </h3>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <Link
                href="/portal/consultations/new"
                className="p-3 rounded-xl border border-border-subtle hover:border-teal bg-light-bg hover:bg-teal-subtle transition-all flex flex-col space-y-1"
              >
                <FileText className="w-4 h-4 text-teal" />
                <span className="font-bold text-navy">New Clinical Note</span>
                <span className="text-[10px] text-charcoal-muted">Start fresh EMR record</span>
              </Link>

              <Link
                href="/portal/patients"
                className="p-3 rounded-xl border border-border-subtle hover:border-medical bg-light-bg hover:bg-medical-light transition-all flex flex-col space-y-1"
              >
                <Users className="w-4 h-4 text-medical" />
                <span className="font-bold text-navy">Register Patient</span>
                <span className="text-[10px] text-charcoal-muted">Add new child file</span>
              </Link>

              <Link
                href="/portal/prescriptions"
                className="p-3 rounded-xl border border-border-subtle hover:border-teal bg-light-bg hover:bg-teal-subtle transition-all flex flex-col space-y-1"
              >
                <Pill className="w-4 h-4 text-teal" />
                <span className="font-bold text-navy">Write Prescription</span>
                <span className="text-[10px] text-charcoal-muted">Digital Rx orders</span>
              </Link>

              <Link
                href="/portal/appointments"
                className="p-3 rounded-xl border border-border-subtle hover:border-medical bg-light-bg hover:bg-medical-light transition-all flex flex-col space-y-1"
              >
                <Clock className="w-4 h-4 text-medical" />
                <span className="font-bold text-navy">Token Queue</span>
                <span className="text-[10px] text-charcoal-muted">Live waiting room</span>
              </Link>
            </div>
          </div>

          {/* Recent Signed EMR Consultations */}
          <div className="p-6 rounded-2xl bg-white border border-border-subtle shadow-editorial space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-border-subtle">
              <div>
                <h3 className="text-sm font-bold uppercase tracking-wider text-navy">
                  Recent Signed Consultations
                </h3>
                <p className="text-xs text-charcoal-muted">
                  Audited surgical and outpatient entries.
                </p>
              </div>
              <Link
                href="/portal/consultations"
                className="text-xs text-teal font-semibold hover:underline"
              >
                All Records →
              </Link>
            </div>

            {recentConsultations.length === 0 ? (
              <p className="text-xs text-charcoal-muted text-center py-4">
                No recent consultations recorded.
              </p>
            ) : (
              <div className="space-y-3">
                {recentConsultations.map((c) => (
                  <div
                    key={c.id}
                    className="p-3 rounded-xl border border-border-subtle hover:border-teal/40 bg-light-bg/40 text-xs space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-navy">
                        {c.patient?.fullName || "Patient"}
                      </span>
                      <span className="text-[10px] text-charcoal-muted">
                        {c.consultationDate}
                      </span>
                    </div>
                    <p className="text-xs font-semibold text-teal-dark">
                      Diagnosis: {c.primaryDiagnosis}
                    </p>
                    <p className="text-[11px] text-charcoal-muted line-clamp-2">
                      Plan: {c.treatmentPlan}
                    </p>
                    <div className="pt-1 flex items-center justify-between text-[11px]">
                      <span className="text-slate-500 font-mono">{c.consultationNumber}</span>
                      <Link
                        href={`/portal/patients/${c.patientId}`}
                        className="text-medical font-medium hover:underline inline-flex items-center gap-1"
                      >
                        <span>Open History</span>
                        <ChevronRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
