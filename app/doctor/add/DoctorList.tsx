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
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { DoctorForm } from "./DoctorForm";
import { DoctorDetails } from "./DoctorDetails";
import type { Doctor } from "@/types/doctor";
import { Search, Plus, MoreHorizontal, Filter } from "lucide-react";

// Mock data based on the schema
const mockDoctors: Doctor[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    specialization: "Cardiology",
    qualification: "MD",
    experience: 10,
    designation: "Senior Consultant",
    department: "Cardiology",
    consultationFee: 150.0,
    isAvailable: true,
    createdAt: new Date("2023-01-15"),
    updatedAt: new Date("2023-06-20"),
    appointments: [],
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    phone: "+1 (555) 987-6543",
    specialization: "Neurology",
    qualification: "MBBS, MD",
    experience: 8,
    designation: "Consultant",
    department: "Neurology",
    consultationFee: 175.0,
    isAvailable: true,
    createdAt: new Date("2023-02-10"),
    updatedAt: new Date("2023-07-15"),
    appointments: [],
  },
  {
    id: 3,
    firstName: "Robert",
    lastName: "Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 (555) 456-7890",
    specialization: "Orthopedics",
    qualification: "MBBS, MS",
    experience: 15,
    designation: "Head of Department",
    department: "Orthopedics",
    consultationFee: 200.0,
    isAvailable: false,
    createdAt: new Date("2022-11-05"),
    updatedAt: new Date("2023-08-01"),
    appointments: [],
  },
];

export function DoctorList() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.department.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleAddDoctor = (newDoctor: Doctor) => {
    setDoctors([...doctors, { ...newDoctor, id: doctors.length + 1 }]);
    setIsFormOpen(false);
  };

  const handleEditDoctor = (updatedDoctor: Doctor) => {
    setDoctors(
      doctors.map((doctor) =>
        doctor.id === updatedDoctor.id ? updatedDoctor : doctor,
      ),
    );
    setIsFormOpen(false);
    setIsEditMode(false);
  };

  const handleDeleteDoctor = (id: number) => {
    setDoctors(doctors.filter((doctor) => doctor.id !== id));
    setIsDetailsOpen(false);
  };

  const openEditForm = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsEditMode(true);
    setIsFormOpen(true);
    setIsDetailsOpen(false);
  };

  const openDetails = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setIsDetailsOpen(true);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Doctors</CardTitle>
            <CardDescription>Manage your medical staff</CardDescription>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search doctors..."
                className="w-full pl-8 sm:w-[250px]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() =>
                    setDoctors(
                      [...doctors].sort((a, b) =>
                        a.lastName.localeCompare(b.lastName),
                      ),
                    )
                  }
                >
                  Sort by Name
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setDoctors(
                      [...doctors].sort(
                        (a, b) => b.experience! - a.experience!,
                      ),
                    )
                  }
                >
                  Sort by Experience
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setDoctors(
                      [...doctors].sort(
                        (a, b) =>
                          Number(b.consultationFee) - Number(a.consultationFee),
                      ),
                    )
                  }
                >
                  Sort by Fee
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    setDoctors(
                      mockDoctors.filter((doctor) => doctor.isAvailable),
                    )
                  }
                >
                  Available Only
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setDoctors(mockDoctors)}>
                  Reset Filters
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
              <DialogTrigger asChild>
                <Button
                  onClick={() => {
                    setSelectedDoctor(null);
                    setIsEditMode(false);
                  }}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add Doctor
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px]">
                <DialogHeader>
                  <DialogTitle>
                    {isEditMode ? "Edit Doctor" : "Add New Doctor"}
                  </DialogTitle>
                  <DialogDescription>
                    {isEditMode
                      ? "Update the doctor's information in the form below."
                      : "Fill in the details to add a new doctor to the system."}
                  </DialogDescription>
                </DialogHeader>
                <DoctorForm
                  doctor={selectedDoctor}
                  onSubmit={isEditMode ? handleEditDoctor : handleAddDoctor}
                  isEditMode={isEditMode}
                />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Specialization</TableHead>
                <TableHead className="hidden md:table-cell">
                  Department
                </TableHead>
                <TableHead className="hidden md:table-cell">
                  Experience
                </TableHead>
                <TableHead className="hidden md:table-cell">Fee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={7}
                    className="py-8 text-center text-muted-foreground"
                  >
                    No doctors found. Try adjusting your search or add a new
                    doctor.
                  </TableCell>
                </TableRow>
              ) : (
                filteredDoctors.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span>
                          {doctor.firstName} {doctor.lastName}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {doctor.qualification}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{doctor.specialization}</TableCell>
                    <TableCell className="hidden md:table-cell">
                      {doctor.department}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      {doctor.experience} years
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      ${doctor.consultationFee.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={doctor.isAvailable ? "success" : "destructive"}
                      >
                        {doctor.isAvailable ? "Available" : "Unavailable"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <Dialog
                        open={isDetailsOpen && selectedDoctor?.id === doctor.id}
                        onOpenChange={setIsDetailsOpen}
                      >
                        <DialogTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openDetails(doctor)}
                          >
                            View
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle>Doctor Details</DialogTitle>
                            <DialogDescription>
                              Comprehensive information about the doctor
                            </DialogDescription>
                          </DialogHeader>
                          {selectedDoctor && (
                            <DoctorDetails
                              doctor={selectedDoctor}
                              onEdit={() => openEditForm(selectedDoctor)}
                              onDelete={() =>
                                handleDeleteDoctor(selectedDoctor.id)
                              }
                            />
                          )}
                        </DialogContent>
                      </Dialog>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => openEditForm(doctor)}
                          >
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDeleteDoctor(doctor.id)}
                            className="text-destructive"
                          >
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
