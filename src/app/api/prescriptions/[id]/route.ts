import { NextRequest, NextResponse } from "next/server";
import { clinicDb } from "@/lib/db/database";
import { requireUserWithRole } from "@/lib/auth/session";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const authResult = await requireUserWithRole(["ADMIN", "DOCTOR", "RECEPTIONIST", "BILLING"]);
    if ("error" in authResult) {
      return NextResponse.json({ error: authResult.error }, { status: authResult.status });
    }

    const { id } = await params;
    const prescription = clinicDb.getPrescriptionById(id);
    if (!prescription) {
      return NextResponse.json({ error: "Prescription not found." }, { status: 404 });
    }

    const patient = clinicDb.getPatientById(prescription.patientId);
    const doctor = clinicDb.getUserById(prescription.doctorId);
    const settings = clinicDb.getClinicSettings();

    return NextResponse.json({
      success: true,
      prescription: {
        ...prescription,
        patient,
        doctor,
        clinic: settings
      }
    });
  } catch (err: unknown) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
