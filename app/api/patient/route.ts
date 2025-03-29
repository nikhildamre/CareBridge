import prisma from '@/lib/db'; // Ensure this points to your Prisma client
import { NextResponse } from "next/server";
import { z } from "zod";

export async function GET(req: Request) {
  try {
    // Fetch all patients from the database
    const patients = await prisma.patient.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        phone: true,
        gender: true,
        dateOfBirth: true,
      },
    });

    // Return the patients as JSON
    return NextResponse.json({ patients });
  } catch (error) {
    console.error("Error fetching patients:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

// Define the schema for patient data validation
export const patientSchema = z.object({
  firstName: z.string().min(1, { message: "First name is required" }),
  lastName: z.string().min(1, { message: "Last name is required" }),
  email: z.string().email({ message: "Invalid email format" }),
  phone: z.string().optional(),
  dateOfBirth: z.string().optional(), // Accept date as a string
  gender: z.enum(["Male", "Female", "Other"], {
    required_error: "Gender is required",
  }),
  address: z.string().optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const patientData = patientSchema.parse(body);

    // Convert dateOfBirth to a Date object if provided
    const parsedDateOfBirth = patientData.dateOfBirth
      ? new Date(patientData.dateOfBirth)
      : null;

    // Check if the date conversion was successful
    if (parsedDateOfBirth && isNaN(parsedDateOfBirth.getTime())) {
      throw new Error("Invalid date format for dateOfBirth");
    }

    // Create a new patient record in the database
    const newPatient = await prisma.patient.create({
      data: {
        firstName: patientData.firstName,
        lastName: patientData.lastName,
        email: patientData.email,
        phone: patientData.phone || null,
        dateOfBirth: parsedDateOfBirth,
        gender: patientData.gender,
        address: patientData.address || null,
      },
    });
    console.log("Patient created:", newPatient);

    return NextResponse.json(
      { patient: newPatient, message: "Patient created successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating patient:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
