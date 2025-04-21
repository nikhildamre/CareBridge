"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

interface AppointmentStatusChartProps {
  data: Array<{
    _count: number
    status: string
  }>
}

export function AppointmentStatusChart({ data }: AppointmentStatusChartProps) {
  const formattedData = data.map((item) => ({
    name: item.status.charAt(0).toUpperCase() + item.status.slice(1).toLowerCase(),
    value: item._count,
  }))

  const COLORS = ["#4f46e5", "#10b981"]

  return (
    <ChartContainer
      config={{
        scheduled: {
          label: "Scheduled",
          color: "#4f46e5",
        },
        done: {
          label: "Done",
          color: "#10b981",
        },
      }}
      className="h-[200px] w-full"
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={formattedData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={70}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {formattedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip
            formatter={(value, name) => [`${value} appointments`, name]}
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
