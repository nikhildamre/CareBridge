// components/DoctorProfile.tsx
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Doctor } from "@prisma/client";

const AddDoctor = ({ doctor }: { doctor: Doctor }) => {
  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Main Container */}
      <Card className="mx-auto max-w-4xl border border-gray-300 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold">
            Dr. {doctor.firstName} {doctor.lastName}
          </CardTitle>
          <p className="text-sm text-gray-500">{doctor.designation}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Specialization */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Specialization:</p>
            <Badge>{doctor.specialization}</Badge>
          </div>

          {/* Qualification */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Qualification:</p>
            <span>{doctor.qualification}</span>
          </div>

          {/* Experience */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Experience:</p>
            <span>{doctor.experience || "N/A"} years</span>
          </div>

          {/* Department */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Department:</p>
            <span>{doctor.department}</span>
          </div>

          {/* Consultation Fee */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Consultation Fee:</p>
            <span>${doctor.consultationFee.toFixed(2)}</span>
          </div>

          {/* Availability */}
          <div className="flex items-center justify-between">
            <p className="font-medium text-gray-700">Availability:</p>
            {doctor.isAvailable ? (
              <Badge variant="default">Available</Badge>
            ) : (
              <Badge variant="destructive">Unavailable</Badge>
            )}
          </div>

          {/* Contact Details */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Contact Information</h3>
            <p>Email: {doctor.email}</p>
            {doctor.phone && <p>Phone: {doctor.phone}</p>}
          </div>

          {/* Action Buttons */}
          <div className="mt-4 flex space-x-4">
            <Button variant="default">Edit Profile</Button>
            <Button variant="destructive">Delete Profile</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AddDoctor;
