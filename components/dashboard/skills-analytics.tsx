"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Zap } from "lucide-react"
import { useSkillsAnalytics } from "@/lib/api/hooks"

export default function SkillsAnalytics() {
  const { data: skills = [], isLoading } = useSkillsAnalytics()
  const topSkills = skills.slice(0, 8)

  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-lg sm:text-xl font-semibold text-foreground">
          Top Skills
        </CardTitle>
      </CardHeader>

      <CardContent>
        {isLoading ? (
          <p className="text-muted-foreground text-sm text-center py-6">Loading...</p>
        ) : topSkills.length > 0 ? (
          <div className="space-y-4 overflow-x-auto sm:overflow-visible">
            {topSkills.map((skill, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-4 p-3 border border-border rounded-lg hover:bg-border/30 transition-colors"
              >
                {/* Skill Name */}
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <Zap size={16} className="text-yellow-500 shrink-0" />
                  <span className="text-sm sm:text-base text-foreground truncate">
                    {skill.skillName}
                  </span>
                </div>

                {/* Bar and Count */}
                <div className="flex items-center gap-3 sm:w-1/2">
                  <div className="flex-1 bg-border rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-primary h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min((skill.averageProficiency / 10) * 100, 100)}%`,
                      }}
                    />
                  </div>
                  <span className="text-xs sm:text-sm text-muted-foreground w-8 text-right">
                    {skill.candidatesCount}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground text-sm text-center py-6">
            No skills data available
          </p>
        )}
      </CardContent>
    </Card>
  )
}
