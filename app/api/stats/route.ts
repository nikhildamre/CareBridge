import { NextResponse } from "next/server";
import prisma from "@/lib/db"; // Ensure this points to your Prisma client

export async function GET() {
  try {
    const [
      totalPatients,
      totalDoctors,
      totalAppointments,
      appointmentsByStatus,
      appointmentsByType,
      appointmentsLast7Days,
      appointmentsPerDoctor,
      genderDistribution,
    ] = await Promise.all([
      prisma.patient.count(),
      prisma.doctor.count(),
      prisma.appointment.count(),
      prisma.appointment.groupBy({
        by: ["status"],
        _count: true,
      }),
      prisma.appointment.groupBy({
        by: ["type"],
        _count: true,
      }),
      prisma.appointment.count({
        where: {
          date: {
            gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          },
        },
      }),
      prisma.appointment.groupBy({
        by: ["doctorId"],
        _count: true,
      }),
      prisma.patient.groupBy({
        by: ["gender"],
        _count: true,
      }),
    ]);

    return NextResponse.json({
      totalPatients,
      totalDoctors,
      totalAppointments,
      appointmentsByStatus,
      appointmentsByType,
      appointmentsLast7Days,
      appointmentsPerDoctor,
      genderDistribution,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 },
    );
  }
}
