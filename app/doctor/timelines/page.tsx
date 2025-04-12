"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Building2, Stethoscope } from "lucide-react";
import Link from "next/link";

// Sample doctor data
interface DoctorInfo {
  id: string;
  name: string;
  designation: string;
  department: string;
  room: string;
  availableHours: string;
  currentStatus: "available" | "in-consultation" | "break";
}

const doctorInfo: DoctorInfo = {
  id: "D101",
  name: "Dr. Sarah Wilson",
  designation: "Senior Consultant",
  department: "Cardiology",
  room: "Room 305",
  availableHours: "9:00 AM - 5:00 PM",
  currentStatus: "available",
};

// Sample data structure
interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  dateTime: string;
  type: "checkup" | "follow-up" | "emergency";
  status: "scheduled" | "in-progress" | "completed";
  reason: string;
}

// Sample appointments data
const sampleAppointments: Appointment[] = [
  {
    id: "1",
    patientId: "P101",
    patientName: "John Doe",
    dateTime: "2024-04-13T09:00:00",
    type: "checkup",
    status: "scheduled",
    reason: "Regular checkup",
  },
  {
    id: "2",
    patientId: "P102",
    patientName: "Jane Smith",
    dateTime: "2024-04-13T10:30:00",
    type: "follow-up",
    status: "scheduled",
    reason: "Follow-up for diabetes",
  },
  {
    id: "3",
    patientId: "P103",
    patientName: "Mike Johnson",
    dateTime: "2024-04-14T14:00:00",
    type: "emergency",
    status: "scheduled",
    reason: "Severe headache",
  },
  // Add more sample appointments as needed
];

export default function DoctorTimeline() {
  const [todayAppointments, setTodayAppointments] = useState<Appointment[]>([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState<
    Appointment[]
  >([]);

  useEffect(() => {
    // Simulate API call and filter appointments
    const today = new Date().toISOString().split("T")[0];

    const filtered = sampleAppointments.reduce(
      (acc, appointment) => {
        const appointmentDate = appointment.dateTime.split("T")[0];
        if (appointmentDate === today) {
          acc.today.push(appointment);
        } else {
          acc.upcoming.push(appointment);
        }
        return acc;
      },
      { today: [] as Appointment[], upcoming: [] as Appointment[] },
    );

    setTodayAppointments(filtered.today);
    setUpcomingAppointments(filtered.upcoming);
  }, []);

  const AppointmentCard = ({ appointment }: { appointment: Appointment }) => (
    <Card className="mb-4">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">{appointment.patientName}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>
                {new Date(appointment.dateTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
              <Calendar className="ml-2 h-4 w-4" />
              <span>{new Date(appointment.dateTime).toLocaleDateString()}</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {appointment.reason}
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
              <h2 className="text-lg font-semibold">{doctorInfo.name}</h2>
              <p className="text-sm text-muted-foreground">
                {doctorInfo.designation}
              </p>
              <p className="text-sm text-muted-foreground">
                {doctorInfo.department}
              </p>
            </div>
          </div>

          {/* Location Info */}
          <div className="flex items-start space-x-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Building2 className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Location</h3>
              <p className="text-sm text-muted-foreground">{doctorInfo.room}</p>
              <p className="text-sm text-muted-foreground">
                Working Hours: {doctorInfo.availableHours}
              </p>
            </div>
          </div>

          {/* Current Status */}
          <div className="flex items-start space-x-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="font-semibold">Current Status</h3>
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${
                  doctorInfo.currentStatus === "available"
                    ? "bg-green-100 text-green-800"
                    : doctorInfo.currentStatus === "in-consultation"
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                }`}
              >
                {doctorInfo.currentStatus.replace("-", " ")}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Existing Appointments Section */}
      <div className="grid gap-6">
        {/* Today's Appointments */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              {todayAppointments.length === 0 ? (
                <p className="text-muted-foreground">
                  No appointments scheduled for today
                </p>
              ) : (
                todayAppointments.map((appointment) => (
                  <AppointmentCard
                    key={appointment.id}
                    appointment={appointment}
                  />
                ))
              )}
            </CardContent>
          </Card>
        </section>

        {/* Upcoming Appointments */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length === 0 ? (
                <p className="text-muted-foreground">
                  No upcoming appointments
                </p>
              ) : (
                upcomingAppointments.map((appointment) => (
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
    </div>
  );
}
