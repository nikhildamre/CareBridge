"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

import { Patient } from "@prisma/client";

const PatientList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  // Initialize patients state as an array
  const [patients, setPatients] = useState<Patient[]>([]);
  const [isLoading, setIsLoading] = useState(false); // Optional: for loading state
  const [error, setError] = useState<string | null>(null); // Optional: for error handling

  const handleSearchByPhoneNumber = async () => {
    setIsLoading(true);
    setError(null);
    setPatients([]); // Clear previous results

    try {
      const response = await fetch(`/api/patient?phone=${searchQuery}`, {
        method: "GET",
      });

      if (!response.ok) {
        // Handle non-successful responses (e.g., 404 Not Found)
        const errorData = await response.json();
        throw new Error(errorData.message || `Error: ${response.status}`);
      }

      const data = await response.json();

      // Ensure the API response structure matches expectations
      // The original code expected data.patient, which might be a single object
      // If the API can return multiple patients or always an array, adjust accordingly.
      // This version assumes the API returns { patient: Patient } or { patient: null }
      // Let's adjust to handle potentially an array OR a single object named 'patient'
      let foundPatients: Patient[] = [];
      if (data && data.patient) {
        if (Array.isArray(data.patient)) {
          foundPatients = data.patient;
        } else {
          // If it's a single object, wrap it in an array
          foundPatients = [data.patient];
        }
      } else if (data && Array.isArray(data)) {
        // Handle case where API directly returns an array
        foundPatients = data;
      }

      setPatients(foundPatients);
    } catch (err: any) {
      console.error("Error fetching patient by phone number:", err);
      setError(err.message || "Failed to fetch patient data.");
      setPatients([]); // Ensure patients is empty on error
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-between px-4 py-6 sm:px-10">
      {" "}
      {/* Added padding Y and responsive padding X */}
      <h1 className="pb-8 text-center text-3xl font-bold sm:text-left sm:text-4xl">
        Search Patients
      </h1>
      <div className="flex flex-col space-y-4 pb-8 sm:flex-row sm:space-x-4 sm:space-y-0">
        {/* Search Input */}
        <Input
          type="text" // Consider type="tel" for phone numbers
          placeholder="Search For Patient By Phone Number"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-grow" // Allow input to take available space
        />
        {/* Search Button */}
        <Button
          onClick={handleSearchByPhoneNumber}
          disabled={isLoading || !searchQuery.trim()}
        >
          {isLoading ? "Searching..." : "Find Patient"}
        </Button>
      </div>
      {/* Display Area: Loading, Error, No Results, or Patient Cards */}
      <div className="pb-4">
        {isLoading && <p className="text-center">Loading patients...</p>}
        {error && <p className="text-center text-red-600">Error: {error}</p>}
        {!isLoading &&
          !error &&
          (patients.length > 0 ? (
            // Grid layout for patient cards
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {patients.map((patient) => (
                <Card key={patient.id} className="flex flex-col">
                  {" "}
                  {/* Ensure card layout is flex column */}
                  <CardHeader>
                    <CardTitle>
                      <h1 className="text-lg font-semibold">
                        {patient.firstName} {patient.lastName}
                      </h1>
                    </CardTitle>
                    {/* Optional: You can add a CardDescription here if needed */}
                  </CardHeader>
                  <CardContent className="flex-grow space-y-2">
                    {" "}
                    {/* flex-grow pushes footer down */}
                    <p>
                      <strong>Phone:</strong> {patient.phone || "N/A"}
                    </p>
                    <p>
                      <strong>Gender:</strong> {patient.gender || "N/A"}
                    </p>
                    <p>
                      <strong>Age:</strong> {patient.address || "N/A"}
                    </p>
                  </CardContent>
                  <CardFooter>
                    <Link
                      href={`/patient/${patient.id}/addapp`}
                      className="w-full"
                    >
                      {/* Make button full width */}
                      <Button className="w-full">Add Appointment</Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          ) : (
            // Show message only if not loading, no error, and search was attempted (or initial state)
            // We might want to distinguish between initial state and "no results found" after a search.
            // Let's assume if !isLoading && !error && patients.length === 0, it means no results.
            // You might need more state (e.g., `searchAttempted`) for a clearer message.
            <p className="text-center text-gray-500">
              {searchQuery
                ? "No patients found matching that phone number."
                : "Enter a phone number to search."}
            </p>
          ))}
      </div>
      {/* Add New Patient Button */}
      <div className="mt-4 flex justify-center sm:justify-start">
        {" "}
        {/* Center on small screens, left align otherwise */}
        <Link href="/patient/add">
          <Button>Add New Patient</Button>
        </Link>
      </div>
    </div>
  );
};

export default PatientList;
