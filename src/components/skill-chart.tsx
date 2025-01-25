"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from "recharts"

const data = [
  { skill: "React", level: 90 },
  { skill: "Node.js", level: 85 },
  { skill: "TypeScript", level: 80 },
  { skill: "GraphQL", level: 70 },
  { skill: "Python", level: 75 },
  { skill: "Docker", level: 65 },
]

export default function SkillChart() {
  return (
    <ChartContainer
      config={{
        radar: {
          label: "Skill Level",
          color: "hsl(var(--primary))",
        },
      }}
      className="h-[400px] text-white"
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="rgba(255, 253, 253, 0.1)" />
          <PolarAngleAxis dataKey="skill" tick={{ fill: "hsl(var(--neutral-200))" }} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={{ fill: "hsl(var(--neutral-200))" }} />
          <Radar
            name="Skill Level"
            dataKey="level"
            stroke="rgba(255, 255, 255, 0.8)"
            fill="rgba(140, 140, 140, 0.6)"
            fillOpacity={0.6}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
        </RadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}

