"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data - replace with actual API call
const samplePatientData = {
  id: "P123",
  name: "John Doe",
  age: 45,
  gender: "Male",
  lastVisit: "2024-04-10",
  aiSummary: `Patient has a history of hypertension and Type 2 diabetes. 
  Last three visits showed consistent high blood pressure readings (140/90 mmHg average). 
  Currently on Metformin (500mg) and Lisinopril (10mg). 
  Recent complaints include occasional dizziness and fatigue. 
  Regular follow-ups every 3 months. 
  Lifestyle changes recommended: low-sodium diet and regular exercise.`,
  recentVitals: {
    bloodPressure: "138/88",
    heartRate: "76",
    temperature: "98.6°F",
    oxygenSaturation: "98%",
  },
  appointments: [
    {
      date: "2024-04-10",
      reason: "Follow-up",
      diagnosis: "Hypertension - Controlled",
      prescription: "Lisinopril 10mg",
    },
    {
      date: "2024-01-15",
      reason: "Regular Checkup",
      diagnosis: "Diabetes Type 2 - Stable",
      prescription: "Metformin 500mg",
    },
  ],
};

export default function ConsultPage() {
  const [activeTab, setActiveTab] = useState("summary");

  return (
    <div className="container mx-auto max-w-7xl p-6">
      <div className="grid gap-6">
        {/* Patient Basic Info */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{samplePatientData.name}</CardTitle>
              <CardDescription>
                ID: {samplePatientData.id} • {samplePatientData.age} years •{" "}
                {samplePatientData.gender}
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
            <Card>
              <CardHeader>
                <CardTitle>AI-Generated Patient Summary</CardTitle>
                <CardDescription>
                  Generated based on patient history
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm leading-6">
                  {samplePatientData.aiSummary}
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Vitals Tab */}
          <TabsContent value="vitals">
            <Card>
              <CardHeader>
                <CardTitle>Recent Vitals</CardTitle>
                <CardDescription>
                  Last recorded on {samplePatientData.lastVisit}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Blood Pressure</p>
                    <p className="text-2xl">
                      {samplePatientData.recentVitals.bloodPressure}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Heart Rate</p>
                    <p className="text-2xl">
                      {samplePatientData.recentVitals.heartRate}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">Temperature</p>
                    <p className="text-2xl">
                      {samplePatientData.recentVitals.temperature}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">O2 Saturation</p>
                    <p className="text-2xl">
                      {samplePatientData.recentVitals.oxygenSaturation}
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
                  {samplePatientData.appointments.map((appointment, index) => (
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
