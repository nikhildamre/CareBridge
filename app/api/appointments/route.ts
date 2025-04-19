import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();

    // Combine date and time into a single DateTime
    const appointmentDate = new Date(data.date);
    const [hours, minutes] = data.time.split(":");
    appointmentDate.setHours(parseInt(hours), parseInt(minutes), 0, 0);

    const appointment = await prisma.appointment.create({
      data: {
        patientId: data.patientId,
        doctorId: data.doctorId,
        date: appointmentDate,
        time: appointmentDate,
        status: data.status,
        type: data.type,
        duration: data.duration,
        bloodPressure: data.bloodPressure || null,
        heartRate: data.heartRate || null,
        Tempreture: data.temperature || null,
        O2Saturation: data.o2Saturation || null,
        symptoms: data.symptoms || null,
        diagnosis: data.diagnosis || null,
        prescription: data.prescription || null,
        notes: data.notes || null,
      },
    });

    return NextResponse.json(appointment);
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Failed to create appointment" },
      { status: 500 },
    );
  }
}
