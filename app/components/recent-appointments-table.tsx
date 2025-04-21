import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function RecentAppointmentsTable() {
  // This would typically come from an API or database
  const recentAppointments = [
    {
      id: 1,
      patientName: "John Doe",
      patientAvatar: "/placeholder.svg?height=40&width=40",
      doctorName: "Dr. Smith",
      doctorAvatar: "/placeholder.svg?height=40&width=40",
      date: "2023-04-20",
      time: "09:00 AM",
      type: "regular",
      status: "scheduled",
    },
    {
      id: 2,
      patientName: "Jane Smith",
      patientAvatar: "/placeholder.svg?height=40&width=40",
      doctorName: "Dr. Johnson",
      doctorAvatar: "/placeholder.svg?height=40&width=40",
      date: "2023-04-20",
      time: "10:30 AM",
      type: "followup",
      status: "scheduled",
    },
    {
      id: 3,
      patientName: "John Doe",
      patientAvatar: "/placeholder.svg?height=40&width=40",
      doctorName: "Dr. Williams",
      doctorAvatar: "/placeholder.svg?height=40&width=40",
      date: "2023-04-19",
      time: "02:00 PM",
      type: "regular",
      status: "done",
    },
    {
      id: 4,
      patientName: "Jane Smith",
      patientAvatar: "/placeholder.svg?height=40&width=40",
      doctorName: "Dr. Brown",
      doctorAvatar: "/placeholder.svg?height=40&width=40",
      date: "2023-04-21",
      time: "11:15 AM",
      type: "emergency",
      status: "scheduled",
    },
    {
      id: 5,
      patientName: "Robert Johnson",
      patientAvatar: "/placeholder.svg?height=40&width=40",
      doctorName: "Dr. Smith",
      doctorAvatar: "/placeholder.svg?height=40&width=40",
      date: "2023-04-22",
      time: "03:30 PM",
      type: "regular",
      status: "scheduled",
    },
    {
      id: 6,
      patientName: "Emily Davis",
      patientAvatar: "/placeholder.svg?height=40&width=40",
      doctorName: "Dr. Jones",
      doctorAvatar: "/placeholder.svg?height=40&width=40",
      date: "2023-04-22",
      time: "04:45 PM",
      type: "ada",
      status: "scheduled",
    },
  ]

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Patient</TableHead>
            <TableHead>Doctor</TableHead>
            <TableHead className="hidden md:table-cell">Date & Time</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recentAppointments.map((appointment) => (
            <TableRow key={appointment.id}>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={appointment.patientAvatar || "/placeholder.svg"} alt={appointment.patientName} />
                    <AvatarFallback>{appointment.patientName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="font-medium">{appointment.patientName}</div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={appointment.doctorAvatar || "/placeholder.svg"} alt={appointment.doctorName} />
                    <AvatarFallback>{appointment.doctorName.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>{appointment.doctorName}</div>
                </div>
              </TableCell>
              <TableCell className="hidden md:table-cell">{`${appointment.date} ${appointment.time}`}</TableCell>
              <TableCell>
                <Badge variant={getTypeVariant(appointment.type)} className="capitalize">
                  {appointment.type}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge variant={getStatusVariant(appointment.status)} className="capitalize">
                  {appointment.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

function getTypeVariant(type: string): "default" | "secondary" | "destructive" | "outline" {
  switch (type) {
    case "regular":
      return "default"
    case "followup":
      return "secondary"
    case "emergency":
      return "destructive"
    default:
      return "outline"
  }
}

function getStatusVariant(status: string): "default" | "secondary" | "outline" {
  switch (status) {
    case "scheduled":
      return "default"
    case "done":
      return "secondary"
    default:
      return "outline"
  }
}
