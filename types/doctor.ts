export interface Appointment {
  id: number
  patientId: number
  doctorId: number
  date: Date
  status: string
  // Add other appointment fields as needed
}

export interface Doctor {
  id: number
  firstName: string
  lastName: string
  email: string
  phone?: string
  specialization: string
  qualification: string
  experience?: number
  designation: string
  department: string
  consultationFee: number
  isAvailable: boolean
  createdAt: Date
  updatedAt: Date
  appointments: Appointment[]
}
