// app/api/patients/[patientId]/appointments/route.ts

import prisma from "@/lib/db"; // Your Prisma client instance
import { NextRequest, NextResponse } from "next/server";

// Define the structure of the parameters we expect in the URL
interface RouteContext {
  params: {
    patientId: string; // The dynamic part of the URL will be a string initially
  };
}

export async function GET(request: NextRequest, { params }: RouteContext) {
  const patientId = parseInt(params.patientId, 10);

  // --- Input Validation ---
  if (isNaN(patientId)) {
    return NextResponse.json(
      { error: "Invalid Patient ID provided" },
      { status: 400 },
    );
  }

  try {
    // --- Database Query ---
    // Check if the patient actually exists first (optional but good practice)
    const patientExists = await prisma.patient.findUnique({
      where: { id: patientId },
      select: { id: true }, // Only select 'id' for efficiency
    });

    if (!patientExists) {
      return NextResponse.json({ error: "Patient not found" }, { status: 404 });
    }

    // Fetch appointments for the given patientId
    const appointments = await prisma.appointment.findMany({
      where: {
        patientId: patientId, // Filter by the validated patient ID
      },
      // Optional: Include related data if you need it on the frontend
      include: {
        doctor: {
          // Select only the necessary doctor fields
          select: {
            id: true,
            firstName: true,
            lastName: true,
            specialization: true,
          },
        },
        // Note: No need to include 'patient' here as we already know the patientId
      },
      // Optional: Order the results (e.g., by date descending)
      orderBy: {
        date: "desc", // Show most recent appointments first
      },
    });

    // --- Response ---
    // Return the found appointments (or an empty array if none exist)
    return NextResponse.json(appointments);
  } catch (error) {
    console.error(
      `Error fetching appointments for patient ${patientId}:`,
      error,
    );
    // Generic error for unexpected issues
    return NextResponse.json(
      { message: "Internal server error fetching appointments" },
      { status: 500 },
    );
  }
}
