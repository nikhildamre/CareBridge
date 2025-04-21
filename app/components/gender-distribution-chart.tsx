"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

interface GenderDistributionChartProps {
  data: Array<{
    _count: number
    gender: string
  }>
}

export function GenderDistributionChart({ data }: GenderDistributionChartProps) {
  const formattedData = data.map((item) => ({
    name: item.gender,
    value: item._count,
  }))

  const COLORS = ["#ec4899", "#3b82f6"]

  return (
    <ChartContainer
      config={{
        female: {
          label: "Female",
          color: "#ec4899",
        },
        male: {
          label: "Male",
          color: "#3b82f6",
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
            formatter={(value, name) => [`${value} patients`, name]}
            contentStyle={{ borderRadius: "8px", border: "none", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
