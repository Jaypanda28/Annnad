export type UserRole = "ADMIN" | "DOCTOR" | "RECEPTIONIST" | "BILLING";

export interface User {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  salt: string;
  fullName: string;
  role: UserRole;
  specialty?: string;
  registrationNumber?: string;
  phone?: string;
  clinicId: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Patient {
  id: string;
  patientId: string; // e.g. NLC-2026-0001
  fullName: string;
  dateOfBirth: string; // YYYY-MM-DD
  gender: "Male" | "Female" | "Other";
  bloodGroup?: string;
  parentGuardianName: string;
  guardianRelationship: "Father" | "Mother" | "Guardian" | "Other";
  contactNumber: string;
  email?: string;
  address?: string;
  emergencyContact?: string;
  allergies?: string; // Comma-separated or text
  chronicConditions?: string;
  clinicId: string;
  registeredByUserId: string;
  createdAt: string;
  updatedAt: string;
}

export type AppointmentStatus = 
  | "SCHEDULED" 
  | "CHECKED_IN" 
  | "WAITING" 
  | "IN_CONSULTATION" 
  | "COMPLETED" 
  | "CANCELLED" 
  | "NO_SHOW";

export type ConsultationType = 
  | "NEW_CONSULTATION" 
  | "FOLLOW_UP" 
  | "POST_OP_REVIEW" 
  | "SECOND_OPINION" 
  | "ANTENATAL_COUNSELLING";

export interface Appointment {
  id: string;
  appointmentNumber: string; // e.g. APT-2026-0001
  patientId: string;
  doctorId: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // e.g. "05:30 PM"
  slotDurationMinutes: number;
  status: AppointmentStatus;
  consultationType: ConsultationType;
  reasonForVisit: string;
  tokenNumber?: number;
  tokenCode?: string; // e.g. T-01
  notes?: string;
  clinicId: string;
  bookedByUserId: string;
  createdAt: string;
  updatedAt: string;
}

export type QueueStatus = "WAITING" | "CALLED" | "IN_CONSULTATION" | "COMPLETED" | "SKIPPED";

export interface QueueEntry {
  id: string;
  tokenCode: string; // e.g. T-01
  tokenNumber: number;
  patientId: string;
  appointmentId?: string;
  doctorId: string;
  queueStatus: QueueStatus;
  queueDate: string; // YYYY-MM-DD
  checkInTime: string; // ISO string
  consultationStartTime?: string;
  consultationEndTime?: string;
  priorityLevel: "NORMAL" | "URGENT" | "INFANT_PRIORITY";
  clinicId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Consultation {
  id: string;
  consultationNumber: string; // e.g. CNS-2026-0001
  appointmentId?: string;
  patientId: string;
  doctorId: string;
  consultationDate: string; // YYYY-MM-DD
  presentingComplaints: string;
  historyOfPresentIllness?: string;
  pastMedicalHistory?: string;
  pastSurgicalHistory?: string;
  vitalsWeightKg?: number;
  vitalsHeightCm?: number;
  vitalsTempF?: number;
  vitalsHeartRateBpm?: number;
  examinationFindings: string;
  clinicalAssessment: string;
  primaryDiagnosis: string;
  secondaryDiagnosis?: string;
  investigationRecommendations?: string;
  treatmentPlan: string;
  surgeryRecommended: boolean;
  surgicalProcedureDetails?: string;
  followUpInstructions?: string;
  followUpDate?: string; // YYYY-MM-DD
  isDraft: boolean;
  isSigned: boolean;
  signedAt?: string;
  clinicId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PrescriptionItem {
  id: string;
  prescriptionId: string;
  medicineName: string;
  composition?: string;
  strength: string; // e.g. "125mg / 5ml" or "250mg"
  form: "Syrup" | "Suspension" | "Drops" | "Tablet" | "Capsule" | "Ointment" | "Suppository";
  dosage: string; // e.g. "5 ml" or "1 tab"
  route: "Oral" | "Topical" | "Rectal" | "Inhaled";
  frequency: "TDS (Three times daily)" | "BD (Twice daily)" | "OD (Once daily)" | "QID (Four times daily)" | "SOS (As needed)";
  duration: string; // e.g. "5 days"
  instructions?: string; // e.g. "After meals with warm water"
  sortOrder: number;
}

export interface Prescription {
  id: string;
  prescriptionNumber: string; // e.g. RX-2026-0001
  consultationId: string;
  patientId: string;
  doctorId: string;
  prescriptionDate: string; // YYYY-MM-DD
  diagnosisSummary: string;
  generalAdvice?: string;
  dietaryAdvice?: string;
  followUpAdvice?: string;
  isDraft: boolean;
  isSigned: boolean;
  signedAt?: string;
  signedByDoctorName: string;
  doctorRegistrationNumber: string;
  items: PrescriptionItem[];
  clinicId: string;
  createdAt: string;
  updatedAt: string;
}

export interface PatientDocument {
  id: string;
  patientId: string;
  documentTitle: string;
  documentType: "ULTRASOUND" | "X_RAY" | "CT_SCAN" | "LAB_REPORT" | "DISCHARGE_SUMMARY" | "CONSENT_FORM" | "REFERRAL_SLIP";
  fileUrl: string;
  fileName: string;
  fileSize: number;
  mimeType: string;
  uploadedByUserId: string;
  uploadedByUserName?: string;
  notes?: string;
  clinicId: string;
  createdAt: string;
}

export interface InvoiceItem {
  id: string;
  invoiceId: string;
  serviceName: string;
  unitPrice: number;
  quantity: number;
  totalPrice: number;
}

export type PaymentStatus = "PAID" | "PARTIALLY_PAID" | "UNPAID" | "REFUNDED";
export type PaymentMethod = "CASH" | "UPI_QR" | "DEBIT_CARD" | "CREDIT_CARD" | "NET_BANKING";

export interface Invoice {
  id: string;
  invoiceNumber: string; // e.g. INV-2026-0001
  patientId: string;
  appointmentId?: string;
  consultationId?: string;
  invoiceDate: string; // YYYY-MM-DD
  items: InvoiceItem[];
  subtotalAmount: number;
  taxPercent: number;
  taxAmount: number;
  discountAmount: number;
  totalAmount: number;
  paidAmount: number;
  balanceAmount: number;
  paymentStatus: PaymentStatus;
  paymentMethod?: PaymentMethod;
  transactionReference?: string;
  billingStaffId: string;
  billingStaffName?: string;
  notes?: string;
  clinicId: string;
  createdAt: string;
  updatedAt: string;
}

export type AuditAction = 
  | "LOGIN" 
  | "LOGOUT"
  | "PATIENT_REGISTERED" 
  | "PATIENT_UPDATED" 
  | "APPOINTMENT_SCHEDULED" 
  | "APPOINTMENT_RESCHEDULED"
  | "APPOINTMENT_CANCELLED"
  | "QUEUE_CHECKIN"
  | "QUEUE_STATUS_CHANGED"
  | "CONSULTATION_CREATED" 
  | "CONSULTATION_SIGNED" 
  | "PRESCRIPTION_CREATED" 
  | "PRESCRIPTION_SIGNED" 
  | "INVOICE_GENERATED" 
  | "PAYMENT_RECORDED"
  | "DOCUMENT_UPLOADED"
  | "SETTINGS_UPDATED";

export interface AuditLog {
  id: string;
  action: AuditAction;
  userId?: string;
  userRole?: string;
  userName?: string;
  entityType: "User" | "Patient" | "Appointment" | "Queue" | "Consultation" | "Prescription" | "Invoice" | "Document" | "Settings";
  entityId?: string;
  details: string;
  ipAddress?: string;
  clinicId: string;
  timestamp: string;
}

export interface ClinicSetting {
  id: string;
  clinicName: string;
  clinicCode: string;
  address: string;
  phone: string;
  email: string;
  opdStartTime: string;
  opdEndTime: string;
  slotDurationMinutes: number;
  defaultConsultationFee: number;
  defaultFollowUpFee: number;
  consultationDays: string; // e.g. "Mon,Tue,Wed,Thu,Fri,Sat"
  currency: string;
}

export interface ClinicDatabaseState {
  users: User[];
  patients: Patient[];
  appointments: Appointment[];
  queue: QueueEntry[];
  consultations: Consultation[];
  prescriptions: Prescription[];
  documents: PatientDocument[];
  invoices: Invoice[];
  auditLogs: AuditLog[];
  settings: ClinicSetting;
}
