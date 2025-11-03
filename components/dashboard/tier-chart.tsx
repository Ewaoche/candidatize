"use client"

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface TierChartProps {
  distribution: any[]
}

export default function TierDistributionChart({ distribution }: TierChartProps) {
  const chartData =
    distribution?.map((item) => ({
      name: item.tierName,
      count: item.count,
      percentage: Number.parseFloat(item.percentage),
    })) || []

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-lg text-foreground">Tier Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#2d3748" />
            <XAxis dataKey="name" stroke="#a0a9b8" style={{ fontSize: "12px" }} />
            <YAxis stroke="#a0a9b8" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1a1f2e",
                border: "1px solid #2d3748",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#f5f5f5" }}
            />
            <Legend />
            <Bar dataKey="count" fill="#3b82f6" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
