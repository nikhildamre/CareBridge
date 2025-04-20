"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Building2, Stethoscope } from "lucide-react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { Doctor } from "@prisma/client";

interface Appointment {
  id: number;
  patientId: number;
  doctorId: number;
  date: string;
  time: string;
  status: string;
  type: string;
  duration: number;
  diagnosis: string;
  patient: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
  };
}

export default function DoctorTimeline() {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [doctorInfo, setDoctorInfo] = useState<Doctor | null>(null);

  const { data: session, status } = useSession();

  useEffect(() => {
    const fetchDoctorInfoAndAppointments = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          // Fetch doctor info
          const doctorResponse = await fetch("/api/doctors/current", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: session.user.email }),
          });

          if (!doctorResponse.ok) {
            throw new Error("Failed to fetch doctor info");
          }

          const doctorInfo = await doctorResponse.json();
          setDoctorInfo(doctorInfo);

          // Fetch appointments for the doctor
          const appointmentsResponse = await fetch(
            `/api/doctors/current?doctorId=${doctorInfo.id}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            },
          );

          if (!appointmentsResponse.ok) {
            throw new Error("Failed to fetch appointments");
          }

          const appointments = await appointmentsResponse.json();
          setAppointments(appointments);
        } catch (error) {
          console.error("Error fetching doctor info or appointments:", error);
        }
      }
    };

    fetchDoctorInfoAndAppointments();
  }, [session, status]);

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                {appointment.patient.firstName} {appointment.patient.lastName}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                {new Date(appointment.date).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <Calendar className="ml-2 h-4 w-4" />
              <span>{new Date(appointment.date).toLocaleDateString()}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {appointment.diagnosis}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span
              className={`rounded-full px-2 py-1 text-xs ${
                appointment.type === "emergency"
                  ? "bg-red-100 text-red-800"
                  : appointment.type === "follow-up"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-green-100 text-green-800"
              }`}
            >
              {appointment.type}
            </span>
            <Link href={`/doctor/${appointment.patientId}/consult`}>
              <Button size="sm">Consult</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto p-6">
      {/* Doctor Information Card */}
      <Card className="mb-6">
        <CardContent className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-3">
          {/* Doctor Basic Info */}
          <div className="flex items-start space-x-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Stethoscope className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">
                {doctorInfo?.firstName} {doctorInfo?.lastName}
              </h2>
              <p className="text-sm text-muted-foreground">
                {doctorInfo?.designation}
              </p>
              <p className="text-sm text-muted-foreground">
                {doctorInfo?.department}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* All Appointments Section */}
      <section>
        <Card>
          <CardHeader>
            <CardTitle>All Appointments</CardTitle>
          </CardHeader>
          <CardContent>
            {appointments.length === 0 ? (
              <p className="text-muted-foreground">No appointments scheduled</p>
            ) : (
              appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const doctor = await prisma.doctor.findUnique({
      where: { email },
    });

    if (!doctor) {
      return NextResponse.json({ error: "Doctor not found" }, { status: 404 });
    }

    return NextResponse.json(doctor);
  } catch (error) {
    console.error("Error fetching doctor info:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId");

    if (!doctorId) {
      return NextResponse.json(
        { error: "Doctor ID is required" },
        { status: 400 },
      );
    }

    const appointments = await prisma.appointment.findMany({
      where: {
        doctorId: parseInt(doctorId),
      },
      orderBy: {
        date: "asc", // Sort appointments by date in ascending order
      },
      include: {
        patient: {
          select: {
            firstName: true,
            lastName: true,
            email: true,
            phone: true,
          },
        },
      },
    });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
