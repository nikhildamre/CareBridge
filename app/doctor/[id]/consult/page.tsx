"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AIPatientSummary } from "./AIPatientSummary";
// Static patient data
const patientData = {
  id: "P123",
  name: "John Doe",
  age: 45,
  gender: "Male",
  lastVisit: "2024-04-13",
  recentVitals: {
    bloodPressure: "138/88",
    heartRate: "76",
    temperature: "98.6°F",
    oxygenSaturation: "98%",
  },
  appointments: [
    {
      date: "2024-04-13",
      reason: "Follow-up",
      diagnosis: "Hypertension - Controlled",
      prescription: "Lisinopril 10mg",
      notes: "Blood pressure showing improvement. Continue current medication.",
    },
    {
      date: "2024-03-15",
      reason: "Regular Checkup",
      diagnosis: "Diabetes Type 2 - Stable",
      prescription: "Metformin 500mg",
      notes: "Blood sugar levels stable. Maintaining diet control.",
    },
    {
      date: "2024-02-01",
      reason: "Emergency Visit",
      diagnosis: "Acute Dizziness",
      prescription: "Rest and hydration",
      notes: "Related to blood pressure spike. Adjusted medication dosage.",
    },
  ],
};

export default function ConsultPage() {
  return (
    <div className="container mx-auto max-w-7xl p-6">
      <div className="grid gap-6">
        {/* Patient Basic Info */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{patientData.name}</CardTitle>
              <CardDescription>
                ID: {patientData.id} • {patientData.age} years •{" "}
                {patientData.gender}
              </CardDescription>
            </div>
            <Button>Start Consultation</Button>
          </CardHeader>
        </Card>

        {/* Main Content Tabs */}
        <Tabs defaultValue="summary" className="space-y-4">
          <TabsList>
            <TabsTrigger value="summary">AI Summary</TabsTrigger>
            <TabsTrigger value="vitals">Recent Vitals</TabsTrigger>
            <TabsTrigger value="history">Visit History</TabsTrigger>
          </TabsList>

          {/* AI Summary Tab */}
          <TabsContent value="summary">
            <AIPatientSummary
              appointments={patientData.appointments}
              vitals={patientData.recentVitals}
              patientInfo={{
                id: patientData.id,
                name: patientData.name,
                age: patientData.age,
                gender: patientData.gender,
                lastVisit: patientData.lastVisit,
              }}
            />
          </TabsContent>

          {/* Vitals Tab */}
          <TabsContent value="vitals">
            <Card>
              <CardHeader>
                <CardTitle>Recent Vitals</CardTitle>
                <CardDescription>
                  Last recorded on {patientData.lastVisit}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Blood Pressure</p>
                    <p className="text-2xl">
                      {patientData.recentVitals.bloodPressure}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Heart Rate</p>
                    <p className="text-2xl">
                      {patientData.recentVitals.heartRate}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Temperature</p>
                    <p className="text-2xl">
                      {patientData.recentVitals.temperature}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">O2 Saturation</p>
                    <p className="text-2xl">
                      {patientData.recentVitals.oxygenSaturation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Visit History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {patientData.appointments.map((appointment, index) => (
                    <div key={index} className="border-b pb-4 last:border-0">
                      <div className="mb-2 flex items-start justify-between">
                        <h4 className="font-medium">{appointment.date}</h4>
                        <span className="text-sm text-muted-foreground">
                          {appointment.reason}
                        </span>
                      </div>
                      <p className="mb-1 text-sm">
                        Diagnosis: {appointment.diagnosis}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Rx: {appointment.prescription}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Notes: {appointment.notes}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
