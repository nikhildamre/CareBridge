import { NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function GET() {
  try {
    const doctors = await prisma.doctor.findMany({
      orderBy: {
        firstName: "asc",
      },
    });

    return NextResponse.json(doctors);
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      { error: "Error fetching doctors" },
      { status: 500 },
    );
  }
}
