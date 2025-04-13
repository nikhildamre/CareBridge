"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Doctor } from "@/types/doctor";
import {
  Calendar,
  Mail,
  Phone,
  Award,
  Briefcase,
  Building,
  DollarSign,
  Clock,
  Edit,
  Trash2,
} from "lucide-react";

interface DoctorDetailsProps {
  doctor: Doctor;
  onEdit: () => void;
  onDelete: () => void;
}

export function DoctorDetails({
  doctor,
  onEdit,
  onDelete,
}: DoctorDetailsProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-start">
        <div className="flex flex-col items-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
            {doctor.firstName.charAt(0)}
            {doctor.lastName.charAt(0)}
          </div>
          <Badge
            variant={doctor.isAvailable ? "success" : "destructive"}
            className="mt-2"
          >
            {doctor.isAvailable ? "Available" : "Unavailable"}
          </Badge>
        </div>
        <div className="flex-1 space-y-2 text-center sm:text-left">
          <h3 className="text-2xl font-bold">
            {doctor.firstName} {doctor.lastName}
          </h3>
          <p className="text-muted-foreground">{doctor.designation}</p>
          <div className="mt-2 flex flex-wrap justify-center gap-2 sm:justify-start">
            <Badge variant="outline" className="flex items-center gap-1">
              <Award className="h-3 w-3" />
              {doctor.qualification}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Briefcase className="h-3 w-3" />
              {doctor.specialization}
            </Badge>
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {doctor.experience} years
            </Badge>
          </div>
        </div>
      </div>

      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">
                Contact Information
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{doctor.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{doctor.phone || "Not provided"}</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="text-sm font-medium text-muted-foreground">
                Professional Details
              </h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <span>{doctor.department}</span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                  <span>
                    ${doctor.consultationFee.toFixed(2)} per consultation
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <h4 className="text-sm font-medium text-muted-foreground">
              System Information
            </h4>
            <div className="grid grid-cols-1 gap-2 text-sm md:grid-cols-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Created: {doctor.createdAt.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Updated: {doctor.updatedAt.toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t px-6 py-4">
          <Button variant="outline" onClick={onEdit}>
            <Edit className="mr-2 h-4 w-4" />
            Edit
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            <Trash2 className="mr-2 h-4 w-4" />
            Delete
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}
