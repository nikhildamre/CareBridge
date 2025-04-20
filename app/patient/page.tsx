"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppointmentDialog } from "./components/addappoinetmentdialoge";
import { Patient } from "@prisma/client";
import { useRouter } from "next/navigation";

const PatientList = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [patients, setPatients] = useState<Patient[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSearchByPhoneNumber = async () => {
    setIsLoading(true);
    setError(null);
    setPatients([]);

    try {
      const response = await fetch(`/api/patient?phone=${searchQuery}`, {
        method: "GET",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const data = await response.json();

      let foundPatients: Patient[] = [];
      if (data && data.patient) {
        if (Array.isArray(data.patient)) {
          foundPatients = data.patient;
        } else {
          foundPatients = [data.patient];
        }
      } else if (data && Array.isArray(data)) {
        foundPatients = data;
      }

      setPatients(foundPatients);
    } catch (err: any) {
      console.error("Error fetching patient by phone number:", err);
      setError(err.message || "Failed to fetch patient data.");
      setPatients([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDialogClose = (open: boolean) => {
    setIsDialogOpen(open);
    if (!open) {
      // Clear the search state and refresh the page
      setSearchQuery("");
      setPatients([]);
      router.refresh();
    }
  };

  return (
    <div className="flex flex-col justify-between px-4 py-6 sm:px-10">
      <div className="flex flex-col space-y-4 pb-8 sm:flex-row sm:space-x-4 sm:space-y-0">
        <Input
          type="text"
          placeholder="Search For Patient By Phone Number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow"
        />
        <Button
          onClick={handleSearchByPhoneNumber}
          disabled={isLoading || !searchQuery.trim()}
        >
          {isLoading ? "Searching..." : "Find Patient"}
        </Button>
      </div>

      <div className="pb-4">
        {isLoading && <p className="text-center">Loading patients...</p>}
        {error && <p className="text-center text-red-600">Error: {error}</p>}
        {!isLoading &&
          !error &&
          (patients.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {patients.map((patient) => (
                <Card key={patient.id} className="flex flex-col">
                  <CardHeader>
                    <CardTitle>
                      <h1 className="text-lg font-semibold">
                        {patient.firstName} {patient.lastName}
                      </h1>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow space-y-2">
                    <p>
                      <strong>Phone:</strong> {patient.phone || "N/A"}
                    </p>
                    <p>
                      <strong>Gender:</strong> {patient.gender || "N/A"}
                    </p>
                    <p>
                      <strong>Age:</strong> {patient.age || "N/A"}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full"
                      onClick={() => {
                        setSelectedPatient(patient);
                        setIsDialogOpen(true);
                      }}
                    >
                      Add Appointment
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">
              {searchQuery
                ? "No patients found matching that phone number."
                : "Enter a phone number to search."}
            </p>
          ))}
      </div>

      {selectedPatient && (
        <AppointmentDialog
          patient={selectedPatient}
          open={isDialogOpen}
          onOpenChange={handleDialogClose}
        />
      )}
    </div>
  );
};

export default PatientList;
