"use client";

import { useEffect, useState } from "react";
import { 
  ShieldCheck, 
  Settings as SettingsIcon, 
  History, 
  Users, 
  Save, 
  CheckCircle2, 
  AlertCircle, 
  RefreshCw, 
  Clock, 
  Lock, 
  FileText, 
  UserCheck, 
  CreditCard, 
  Calendar,
  Building2,
  Phone,
  Mail,
  MapPin,
  Search
} from "lucide-react";

interface ClinicSettings {
  id: string;
  clinicName: string;
  doctorName: string;
  specialization: string;
  address: string;
  phone: string;
  email: string;
  opdTimings: string;
  opdDays: string;
  consultationFeeNew: number;
  consultationFeeFollowup: number;
}

interface AuditLog {
  id: string;
  action: string;
  entityType: string;
  entityId?: string;
  performedByUserId: string;
  performedByUserRole: string;
  performedByUserName: string;
  details: string;
  ipAddress?: string;
  timestamp: string;
}

export default function AdminSettingsPage() {
  const [activeTab, setActiveTab] = useState<"SETTINGS" | "AUDIT" | "ROLES">("SETTINGS");
  const [settings, setSettings] = useState<ClinicSettings | null>(null);
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [actionMessage, setActionMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);
  const [auditSearch, setAuditSearch] = useState("");

  const loadData = async () => {
    try {
      setLoading(true);
      const [settingsRes, logsRes] = await Promise.all([
        fetch("/api/admin/settings"),
        fetch("/api/admin/audit-logs?limit=100")
      ]);

      const [sData, lData] = await Promise.all([
        settingsRes.json(),
        logsRes.json()
      ]);

      if (sData.success) setSettings(sData.settings);
      if (lData.success) setLogs(lData.logs || []);
    } catch {
      setActionMessage({ text: "Failed to load clinic administration data.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!settings) return;

    try {
      setSaving(true);
      const res = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings)
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed.");

      setActionMessage({ text: "Clinic settings updated and persisted successfully.", type: "success" });
      setSettings(data.settings);
    } catch (err: unknown) {
      const e = err as Error;
      setActionMessage({ text: e.message, type: "error" });
    } finally {
      setSaving(false);
    }
  };

  const filteredLogs = logs.filter(log => {
    const term = auditSearch.toLowerCase();
    return (
      log.action.toLowerCase().includes(term) ||
      log.details.toLowerCase().includes(term) ||
      log.performedByUserName.toLowerCase().includes(term) ||
      log.performedByUserRole.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-[#12304A]">Clinic Administration & Governance</h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-purple-50 text-purple-700 border border-purple-200">
              Administrator Only
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Operational hours, clinical fee parameters, role-based controls, and immutable security audit logs.
          </p>
        </div>

        <button
          onClick={() => loadData()}
          className="p-2.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl border border-slate-200 transition-colors self-start sm:self-auto"
          title="Refresh administration data"
        >
          <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin text-[#1769D2]" : ""}`} />
        </button>
      </div>

      {/* Action Notification Alert */}
      {actionMessage && (
        <div className={`p-4 rounded-xl border flex items-center justify-between text-xs font-medium ${
          actionMessage.type === "success" 
            ? "bg-emerald-50 text-emerald-800 border-emerald-200" 
            : "bg-red-50 text-red-800 border-red-200"
        }`}>
          <div className="flex items-center gap-2">
            {actionMessage.type === "success" ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertCircle className="w-4 h-4 text-red-600" />}
            <span>{actionMessage.text}</span>
          </div>
          <button onClick={() => setActionMessage(null)} className="text-slate-400 hover:text-slate-600">
            &times;
          </button>
        </div>
      )}

      {/* Tabs */}
      <div className="inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-semibold">
        <button
          onClick={() => setActiveTab("SETTINGS")}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
            activeTab === "SETTINGS" 
              ? "bg-white text-[#12304A] shadow-sm font-bold" 
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <SettingsIcon className="w-4 h-4 text-[#1769D2]" />
          OPD Timings & Clinic Profile
        </button>
        <button
          onClick={() => setActiveTab("AUDIT")}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
            activeTab === "AUDIT" 
              ? "bg-white text-[#12304A] shadow-sm font-bold" 
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <History className="w-4 h-4 text-[#1769D2]" />
          Clinical Audit Trail ({logs.length})
        </button>
        <button
          onClick={() => setActiveTab("ROLES")}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
            activeTab === "ROLES" 
              ? "bg-white text-[#12304A] shadow-sm font-bold" 
              : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Users className="w-4 h-4 text-[#1769D2]" />
          Staff Role Governance
        </button>
      </div>

      {/* TAB 1: CLINIC PROFILE & OPD SETTINGS */}
      {activeTab === "SETTINGS" && settings && (
        <form onSubmit={handleSaveSettings} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <h2 className="text-base font-bold text-[#12304A]">Clinic Operational Configuration</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Updates to these values will reflect automatically across official prescriptions, receipts, and appointment slots.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Clinic Name</label>
              <input
                type="text"
                required
                value={settings.clinicName}
                onChange={(e) => setSettings({ ...settings, clinicName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Consulting Specialist Name</label>
              <input
                type="text"
                required
                value={settings.doctorName}
                onChange={(e) => setSettings({ ...settings, doctorName: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl font-semibold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Specialization & Credentials</label>
              <input
                type="text"
                required
                value={settings.specialization}
                onChange={(e) => setSettings({ ...settings, specialization: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Clinic Contact Helpline</label>
              <input
                type="text"
                required
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block font-bold text-slate-700 mb-1">Clinic Physical Address</label>
              <input
                type="text"
                required
                value={settings.address}
                onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">OPD Operational Days</label>
              <input
                type="text"
                required
                value={settings.opdDays}
                onChange={(e) => setSettings({ ...settings, opdDays: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">OPD Timings</label>
              <input
                type="text"
                required
                value={settings.opdTimings}
                onChange={(e) => setSettings({ ...settings, opdTimings: e.target.value })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Default New Consultation Fee (₹)</label>
              <input
                type="number"
                required
                min="0"
                value={settings.consultationFeeNew}
                onChange={(e) => setSettings({ ...settings, consultationFeeNew: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono font-bold"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Default Follow-up Review Fee (₹)</label>
              <input
                type="number"
                required
                min="0"
                value={settings.consultationFeeFollowup}
                onChange={(e) => setSettings({ ...settings, consultationFeeFollowup: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-slate-200 rounded-xl font-mono font-bold"
              />
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-end">
            <button
              type="submit"
              disabled={saving}
              className="px-6 py-2.5 bg-[#1769D2] hover:bg-[#1258b5] text-white text-xs font-bold rounded-xl shadow-sm transition-colors flex items-center gap-2 disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? "Saving Changes..." : "Save Clinic Configuration"}
            </button>
          </div>
        </form>
      )}

      {/* TAB 2: AUDIT LOGS */}
      {activeTab === "AUDIT" && (
        <div className="space-y-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search audit action, user or details..."
                value={auditSearch}
                onChange={(e) => setAuditSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-[#1769D2] outline-none"
              />
            </div>
            <div className="text-xs text-slate-500 font-mono">
              Showing {filteredLogs.length} audit entries
            </div>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Timestamp</th>
                  <th className="py-3 px-4">Action</th>
                  <th className="py-3 px-4">Module / Entity</th>
                  <th className="py-3 px-4">Performed By</th>
                  <th className="py-3 px-4">Audit Details</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-10 text-center text-slate-400 font-sans">
                      No audit events recorded.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-4 text-slate-500 whitespace-nowrap text-[11px]">
                        {new Date(log.timestamp).toLocaleString("en-IN", { 
                          day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit", second: "2-digit" 
                        })}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-100 text-slate-800">
                          {log.action}
                        </span>
                      </td>

                      <td className="py-3 px-4 text-slate-700 whitespace-nowrap font-medium">
                        {log.entityType}
                      </td>

                      <td className="py-3 px-4 whitespace-nowrap font-sans">
                        <span className="font-semibold text-slate-900 block">{log.performedByUserName}</span>
                        <span className="text-[10px] text-slate-400 font-mono uppercase">{log.performedByUserRole}</span>
                      </td>

                      <td className="py-3 px-4 font-sans text-slate-600 text-xs">
                        {log.details}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: STAFF ROLES & PERMISSIONS */}
      {activeTab === "ROLES" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1769D2] flex items-center justify-center font-bold">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#12304A]">Doctor Role</h3>
                <p className="text-xs text-slate-500">Dr. Abhishek Anand (`dr.anand`)</p>
              </div>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Full Access to Clinical EMR Workspace
              </li>
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Exclusively Authorised to Sign & Finalise Prescriptions
              </li>
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Manage OPD Queue & Live Consultations
              </li>
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Review Paediatric Medical Timelines & Ultrasound Scans
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#12304A]">Clinic Administrator</h3>
                <p className="text-xs text-slate-500">Admin Account (`admin`)</p>
              </div>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Configure Clinic OPD Timings & Fee Schedules
              </li>
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Inspect Chronological Security Audit Trail
              </li>
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Full Financial Analytics & Collection Reports
              </li>
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Override and Manage Clinical Appointments
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-xl bg-cyan-100 text-cyan-800 flex items-center justify-center font-bold">
                <UserCheck className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#12304A]">Receptionist Desk</h3>
                <p className="text-xs text-slate-500">Front Desk (`reception`)</p>
              </div>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Register New Paediatric Patients with Guardian Details
              </li>
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Prevent Duplicate Phone & Name Records
              </li>
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Schedule Appointments & Check in Patients
              </li>
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Issue Sequential Queue Tokens (T-01, T-02)
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm space-y-4">
            <div className="flex items-center gap-3 border-b border-slate-100 pb-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                <CreditCard className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[#12304A]">Billing Desk</h3>
                <p className="text-xs text-slate-500">Accounts Staff (`billing`)</p>
              </div>
            </div>
            <ul className="space-y-2 text-xs text-slate-600">
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Generate Official Invoices with Preset Paediatric Fees
              </li>
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Record Settlement (Cash, UPI QR, Card)
              </li>
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Print Tax Invoices and Money Receipts
              </li>
              <li className="flex items-center gap-2 text-emerald-700 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" /> Export Collections Data to CSV
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
