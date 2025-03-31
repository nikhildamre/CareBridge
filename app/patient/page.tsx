"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

interface Patient {
  id: string;
  firstname: string;
  lastName: string;
  phone?: string;
  gender?: string;
  age?: number;
}

const PatientList = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [patients, setPatients] = useState<Patient[]>([]);

  const handleSearch = async () => {
    try {
      const response = await fetch("/api/patient", {
        method: "GET",
      });
      const data = await response.json();
      setPatients(data.patients);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between">
      <h1 className="pb-8 text-4xl font-bold">Search From Patients</h1>
      <div className="flex flex-row space-x-4 pb-4">
        {/* Search Input */}
        <Input
          type="text"
          placeholder="Search For Patient Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {/* Search Button */}
        <Button onClick={handleSearch}>Find Patient</Button>
      </div>

      {/* Patient Table */}
      <div className="pb-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Contact Number</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Add Appointment</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.length > 0 ? (
              patients.map((patient) => (
                <TableRow key={patient.id}>
                  {/* Name */}
                  <TableCell className="font-medium">
                    {patient.firstname} {patient.lastName}
                  </TableCell>
                  {/* Contact Number */}
                  <TableCell>{patient.phone || "N/A"}</TableCell>
                  {/* Gender */}
                  <TableCell>{patient.gender || "N/A"}</TableCell>
                  {/* Age */}
                  <TableCell>{patient.age || "N/A"}</TableCell>
                  {/* Add Appointment Button */}
                  <TableCell>
                    <Link href={`/appointment/add?patientId=${patient.id}`}>
                      <Button>Add Appointment</Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center">
                  No patients found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Add New Patient Button */}
      <Link href="/patient/add">
        <Button>Add New Patient</Button>
      </Link>
    </div>
  );
};

export default PatientList;
