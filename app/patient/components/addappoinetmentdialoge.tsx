"use client";

import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { CalendarIcon, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Patient } from "@prisma/client";

type AppointmentDialogProps = {
  patient: Patient;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

type FormValues = {
  patientId: number;
  doctorId: number;
  date: Date;
  time: string;
  status: string;
  type: string;
  duration: number;
  bloodPressure: string;
  heartRate: string;
  temperature: string;
  o2Saturation: string;
  symptoms: string;
  diagnosis: string;
  prescription: string;
  notes: string;
};

export function AppointmentDialog({
  patient,
  open,
  onOpenChange,
}: AppointmentDialogProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<FormValues>({
    defaultValues: {
      patientId: patient.id,
      doctorId: 1, // Default doctor ID
      date: new Date(),
      time: "09:00",
      status: "scheduled",
      type: "regular",
      duration: 30,
      bloodPressure: "",
      heartRate: "",
      temperature: "",
      o2Saturation: "",
      symptoms: "",
      diagnosis: "",
      prescription: "",
      notes: "",
    },
  });

  const { toast } = useToast();

  const onSubmit = async (data: FormValues) => {
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to create appointment");
      }

      const appointment = await response.json();
      console.log("Appointment created:", appointment);

      // Show success message (you can use toast notification)
      toast({
        title: "Success",
        description: "Appointment scheduled successfully",
        duration: 3000,
      });

      onOpenChange(false);
      form.reset();
    } catch (error) {
      console.error("Error creating appointment:", error);
      // Show error message
      toast({
        title: "Error",
        description: "Failed to schedule appointment",
        variant: "destructive",
        duration: 3000,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            Book Appointment for {patient.firstName}
            {patient.lastName}
          </DialogTitle>
          <DialogDescription>
            Fill in the details below to schedule a new appointment.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              {/* Date and Time */}
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="time"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time</FormLabel>
                    <div className="relative">
                      <Clock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                      <FormControl>
                        <Input type="time" className="pl-10" {...field} />
                      </FormControl>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Doctor, Type, Status */}
              <FormField
                control={form.control}
                name="doctorId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Doctor</FormLabel>
                    <Select
                      onValueChange={(value) =>
                        field.onChange(Number.parseInt(value))
                      }
                      defaultValue={field.value.toString()}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a doctor" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="1">Dr. John Smith</SelectItem>
                        <SelectItem value="2">Dr. Sarah Johnson</SelectItem>
                        <SelectItem value="3">Dr. Michael Brown</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Appointment Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="regular">Regular</SelectItem>
                        <SelectItem value="followup">Follow-up</SelectItem>
                        <SelectItem value="emergency">Emergency</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="scheduled">Scheduled</SelectItem>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="canceled">Canceled</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration (minutes)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={5}
                        step={5}
                        {...field}
                        onChange={(e) =>
                          field.onChange(Number.parseInt(e.target.value))
                        }
                      />
                    </FormControl>
                    <FormDescription>
                      Appointment duration in minutes
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Vital Signs */}
              <div className="md:col-span-2">
                <h3 className="mb-2 text-lg font-medium">Vital Signs</h3>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="bloodPressure"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Blood Pressure</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 120/80" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="heartRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Heart Rate</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 72 bpm" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="temperature"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Temperature</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 98.6 °F" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="o2Saturation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>O2 Saturation</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g. 98%" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>

              {/* Medical Notes */}
              <div className="md:col-span-2">
                <h3 className="mb-2 text-lg font-medium">Medical Notes</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="symptoms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Symptoms</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Patient's symptoms"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="diagnosis"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Diagnosis</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Doctor's diagnosis"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="prescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prescription</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Prescribed medications"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Additional Notes</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Any additional notes"
                            className="min-h-[80px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Book Appointment"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
