import type React from "react"
import { CalendarIcon, UsersIcon, UserIcon, ActivityIcon } from "lucide-react"

interface DashboardHeaderProps {
  totalPatients: number
  totalDoctors: number
  totalAppointments: number
  appointmentsLast7Days: number
}

export function DashboardHeader({
  totalPatients,
  totalDoctors,
  totalAppointments,
  appointmentsLast7Days,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col space-y-2">
      <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      <p className="text-muted-foreground">Overview of your medical practice</p>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-4">
        <StatCard
          title="Total Patients"
          value={totalPatients}
          icon={<UsersIcon className="h-4 w-4 text-muted-foreground" />}
          description="Active patients in system"
        />
        <StatCard
          title="Total Doctors"
          value={totalDoctors}
          icon={<UserIcon className="h-4 w-4 text-muted-foreground" />}
          description="Practicing physicians"
        />
        <StatCard
          title="Total Appointments"
          value={totalAppointments}
          icon={<CalendarIcon className="h-4 w-4 text-muted-foreground" />}
          description="All time appointments"
        />
        <StatCard
          title="Recent Appointments"
          value={appointmentsLast7Days}
          icon={<ActivityIcon className="h-4 w-4 text-muted-foreground" />}
          description="Last 7 days"
        />
      </div>
    </div>
  )
}

interface StatCardProps {
  title: string
  value: number
  icon: React.ReactNode
  description: string
}

function StatCard({ title, value, icon, description }: StatCardProps) {
  return (
    <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
      <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium">{title}</h3>
        {icon}
      </div>
      <div className="p-6 pt-0">
        <div className="text-2xl font-bold">{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </div>
    </div>
  )
}
