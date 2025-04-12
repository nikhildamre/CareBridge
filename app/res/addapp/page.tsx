"use client"; // Required for hooks

import React, { useEffect, useState, useCallback } from "react";
import { useSearchParams } from "next/navigation"; // To get patientId
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea"; // For notes
import { z } from "zod"; // For potential validation

// --- Assumed Types (adjust based on your actual Prisma schema) ---
interface NewAppointmentData {
  dateTime: string; // Use string for datetime-local input
  reason: string;
  notes?: string;
}

interface PreviousAppointment {
  id: string; // Or number, depending on your schema
  dateTime: string; // Assuming string from API, parse for display
  reason: string;
  notes?: string;
  // Add other relevant fields like status, etc.
}
// --- End Assumed Types ---

// Optional Zod schema for client-side validation
const appointmentSchema = z.object({
  dateTime: z.string().min(1, "Appointment date and time are required"),
  reason: z.string().min(1, "Reason for appointment is required"),
  notes: z.string().optional(),
});

function ResAddAppointment() {
  const searchParams = useSearchParams();
  const [patientId, setPatientId] = useState<string | null>(null);
  const [isLoadingPatientId, setIsLoadingPatientId] = useState(true);

  // State for the new appointment form
  const [formData, setFormData] = useState<NewAppointmentData>({
    dateTime: "",
    reason: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [validationErrors, setValidationErrors] = useState<z.ZodError | null>(
    null,
  );

  // State for previous appointments
  const [previousAppointments, setPreviousAppointments] = useState<
    PreviousAppointment[]
  >([]);
  const [isLoadingPrevious, setIsLoadingPrevious] = useState(false);
  const [errorPrevious, setErrorPrevious] = useState<string | null>(null);

  // --- Effects ---

  // 1. Get patientId from URL
  useEffect(() => {
    const idFromUrl = searchParams.get("patientId");
    setPatientId(idFromUrl);
    setIsLoadingPatientId(false);
    if (!idFromUrl) {
      console.error("Patient ID not found in URL.");
      setErrorPrevious("Patient ID missing from URL."); // Set error if ID is crucial
    }
  }, [searchParams]);

  // 2. Fetch previous appointments when patientId is available
  const fetchPreviousAppointments = useCallback(async () => {
    if (!patientId) return; // Don't fetch if no patientId

    setIsLoadingPrevious(true);
    setErrorPrevious(null);
    try {
      // *** ASSUMPTION: Replace with your actual API endpoint ***
      const response = await fetch(`/api/appointments?patientId=${patientId}`);
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({})); // Try to parse error
        throw new Error(
          errorData.message ||
            `Failed to fetch previous appointments (${response.status})`,
        );
      }
      const data = await response.json();
      // *** ASSUMPTION: Adjust data access based on your API response structure ***
      setPreviousAppointments(data.appointments || []); // Assume response is { appointments: [...] }
    } catch (error: any) {
      console.error("Error fetching previous appointments:", error);
      setErrorPrevious(
        error.message || "Could not load previous appointments.",
      );
      setPreviousAppointments([]); // Clear appointments on error
    } finally {
      setIsLoadingPrevious(false);
    }
  }, [patientId]); // Dependency: patientId

  useEffect(() => {
    fetchPreviousAppointments();
  }, [fetchPreviousAppointments]); // Run when fetch function instance changes (due to patientId)

  // --- Handlers ---

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear errors on change
    setSubmitError(null);
    setSubmitSuccess(null);
    setValidationErrors(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!patientId) {
      setSubmitError("Cannot submit without a valid patient ID.");
      return;
    }

    // Reset states
    setSubmitError(null);
    setSubmitSuccess(null);
    setValidationErrors(null);

    // Client-side validation (optional but recommended)
    const validationResult = appointmentSchema.safeParse(formData);
    if (!validationResult.success) {
      setValidationErrors(validationResult.error);
      return;
    }

    setIsSubmitting(true);

    try {
      // *** ASSUMPTION: Replace with your actual API endpoint ***
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...validationResult.data, // Send validated data
          patientId: patientId, // Add patientId to the request body
        }),
      });

      const result = await response.json(); // Try to parse response regardless of status

      if (!response.ok) {
        throw new Error(
          result.message || `Failed to add appointment (${response.status})`,
        );
      }

      setSubmitSuccess("Appointment added successfully!");
      setFormData({ dateTime: "", reason: "", notes: "" }); // Reset form

      // Refresh previous appointments list after successful submission
      fetchPreviousAppointments();

      // Clear success message after a delay
      setTimeout(() => setSubmitSuccess(null), 3000);
    } catch (error: any) {
      console.error("Error adding appointment:", error);
      setSubmitError(error.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Helper to get Zod errors
  const getError = (fieldName: keyof NewAppointmentData) => {
    return validationErrors?.flatten().fieldErrors[fieldName]?.[0];
  };

  // Helper to format date/time string for display
  const formatDisplayDateTime = (dateTimeString: string) => {
    if (!dateTimeString) return "N/A";
    try {
      return new Date(dateTimeString).toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
    } catch (e) {
      return "Invalid Date";
    }
  };

  // --- Render Logic ---

  if (isLoadingPatientId) {
    return <div className="p-6">Loading patient information...</div>;
  }

  if (!patientId && !isLoadingPatientId) {
    // Render specific message or redirect if ID is missing and required
    return (
      <div className="p-6 text-red-500">
        Error: Patient ID is missing from the URL. Cannot add or view
        appointments.
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-8 p-4 md:p-6">
      {/* Top Section: Add Appointment Form */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Add New Appointment</CardTitle>
          <CardDescription>
            Schedule a new appointment for Patient ID: {patientId}. Fill in the
            details below.
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            {/* Date and Time */}
            <div className="space-y-2">
              <Label htmlFor="dateTime">Date & Time *</Label>
              <Input
                type="datetime-local" // Use appropriate input type
                id="dateTime"
                name="dateTime"
                value={formData.dateTime}
                onChange={handleChange}
                aria-invalid={!!getError("dateTime")}
                aria-describedby="dateTime-error"
              />
              {getError("dateTime") && (
                <p id="dateTime-error" className="text-sm text-red-600">
                  {getError("dateTime")}
                </p>
              )}
            </div>

            {/* Reason */}
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Appointment *</Label>
              <Input
                type="text"
                id="reason"
                name="reason"
                placeholder="e.g., Follow-up, Checkup, Consultation"
                value={formData.reason}
                onChange={handleChange}
                aria-invalid={!!getError("reason")}
                aria-describedby="reason-error"
              />
              {getError("reason") && (
                <p id="reason-error" className="text-sm text-red-600">
                  {getError("reason")}
                </p>
              )}
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                name="notes"
                placeholder="e.g., Patient reported symptoms X, Y, Z..."
                value={formData.notes || ""}
                onChange={handleChange}
                rows={4}
                aria-invalid={!!getError("notes")}
                aria-describedby="notes-error"
              />
              {getError("notes") && (
                <p id="notes-error" className="text-sm text-red-600">
                  {getError("notes")}
                </p>
              )}
            </div>

            {/* Submission Feedback */}
            {submitError && (
              <p className="text-sm text-red-600">{submitError}</p>
            )}
            {submitSuccess && (
              <p className="text-sm text-green-600">{submitSuccess}</p>
            )}
          </CardContent>
          <CardFooter>
            <Button
              type="submit"
              className="w-full md:w-auto"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Scheduling..." : "Schedule Appointment"}
            </Button>
          </CardFooter>
        </form>
      </Card>

      {/* Bottom Section: Previous Appointments */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold">Previous Appointments</h2>
        {isLoadingPrevious && <p>Loading previous appointments...</p>}
        {errorPrevious && (
          <p className="text-red-600">Error: {errorPrevious}</p>
        )}

        {!isLoadingPrevious &&
          !errorPrevious &&
          (previousAppointments.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {previousAppointments.map((appt) => (
                <Card key={appt.id}>
                  <CardHeader>
                    {/* Format the date/time for display */}
                    <CardTitle>
                      {formatDisplayDateTime(appt.dateTime)}
                    </CardTitle>
                    <CardDescription>Reason: {appt.reason}</CardDescription>
                  </CardHeader>
                  {appt.notes && ( // Only show content if notes exist
                    <CardContent>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <strong>Notes:</strong> {appt.notes}
                      </p>
                    </CardContent>
                  )}
                  {/* Add CardFooter for actions if needed, e.g., view details */}
                </Card>
              ))}
            </div>
          ) : (
            // Message when no appointments are found (and not loading/error)
            !isLoadingPrevious &&
            !errorPrevious && (
              <p className="text-gray-500">
                No previous appointments found for this patient.
              </p>
            )
          ))}
      </div>
    </div>
  );
}

export default ResAddAppointment;
