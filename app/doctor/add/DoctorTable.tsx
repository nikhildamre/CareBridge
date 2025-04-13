// src/components/doctors/DoctorsTable.tsx
"use client";

import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Search, Filter, Plus, MoreHorizontal } from "lucide-react";

interface Doctor {
  id: string; // Unique identifier
  name: string;
  credentials: string; // e.g., "MD", "MBBS, MD", "MBBS, MS"
  specialization: string;
  department: string;
  experience: number; // Years of experience
  fee: number; // Consultation fee
  status: "Available" | "Unavailable";
}

// Sample Data (replace with actual data fetching)
const sampleDoctors: Doctor[] = [
  {
    id: "doc1",
    name: "John Doe",
    credentials: "MD",
    specialization: "Cardiology",
    department: "Cardiology",
    experience: 10,
    fee: 150.0,
    status: "Available",
  },
  {
    id: "doc2",
    name: "Jane Smith",
    credentials: "MBBS, MD",
    specialization: "Neurology",
    department: "Neurology",
    experience: 8,
    fee: 175.0,
    status: "Available",
  },
  {
    id: "doc3",
    name: "Robert Johnson",
    credentials: "MBBS, MS",
    specialization: "Orthopedics",
    department: "Orthopedics",
    experience: 15,
    fee: 200.0,
    status: "Unavailable",
  },
  // Add more sample doctors if needed
];

export function DoctorsTable() {
  // In a real app, you'd fetch data here using useEffect or a data fetching library
  const [doctors] = React.useState<Doctor[]>(sampleDoctors);
  const [searchTerm, setSearchTerm] = React.useState("");

  // Basic filtering logic (can be expanded)
  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddDoctor = () => {
    // Implement logic to open a modal or navigate to an add doctor page
    console.log("Add Doctor clicked");
    alert("Add Doctor functionality not implemented yet.");
  };

  const handleViewDoctor = (id: string) => {
    // Implement logic to view doctor details
    console.log("View Doctor clicked:", id);
    alert(`View Doctor ${id} functionality not implemented yet.`);
  };

  const handleEditDoctor = (id: string) => {
    // Implement logic to edit doctor details
    console.log("Edit Doctor clicked:", id);
    alert(`Edit Doctor ${id} functionality not implemented yet.`);
  };

  const handleDeleteDoctor = (id: string) => {
    // Implement logic to delete doctor
    console.log("Delete Doctor clicked:", id);
    alert(`Delete Doctor ${id} functionality not implemented yet.`);
  };

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:p-6 lg:p-8">
      {/* Header Section */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Doctors</h1>
        <p className="text-sm text-gray-500">Manage your medical staff</p>
      </div>

      {/* Action Bar Section */}
      <div className="mb-4 flex flex-col items-center justify-between gap-2 sm:flex-row">
        <div className="relative w-full sm:w-auto sm:max-w-xs">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search doctors..."
            className="w-full pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex w-full gap-2 sm:w-auto">
          <Button variant="outline" size="icon" className="w-full sm:w-auto">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filter</span>
          </Button>
          <Button
            onClick={handleAddDoctor}
            className="flex-grow sm:flex-grow-0"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Doctor
          </Button>
        </div>
      </div>

      {/* Table Section */}
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="w-[200px] sm:w-[250px]">Name</TableHead>
              <TableHead>Specialization</TableHead>
              <TableHead>Department</TableHead>
              <TableHead className="hidden text-right md:table-cell">
                Experience
              </TableHead>
              <TableHead className="text-right">Fee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  <TableCell className="font-medium">
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900">
                        {doctor.name}
                      </span>
                      <span className="text-xs text-gray-500">
                        {doctor.credentials}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{doctor.specialization}</TableCell>
                  <TableCell>{doctor.department}</TableCell>
                  <TableCell className="hidden text-right md:table-cell">
                    {doctor.experience} years
                  </TableCell>
                  <TableCell className="text-right">
                    ${doctor.fee.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        doctor.status === "Available"
                          ? "default"
                          : "destructive"
                      }
                      className={
                        doctor.status === "Available"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-red-100 text-red-800 hover:bg-red-200"
                      }
                    >
                      {doctor.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => handleViewDoctor(doctor.id)}
                        >
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleEditDoctor(doctor.id)}
                        >
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-red-600 focus:bg-red-50 focus:text-red-600"
                          onClick={() => handleDeleteDoctor(doctor.id)}
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    {/* You can add a direct "View" button if preferred */}
                    {/* <Button variant="link" size="sm" className="p-0 h-auto" onClick={() => handleViewDoctor(doctor.id)}>View</Button> */}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={7} className="h-24 text-center">
                  No doctors found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
