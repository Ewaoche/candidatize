"use client"

import { useState } from "react"
import Sidebar from "@/components/dashboard/sidebar"
import Header from "@/components/dashboard/header"
import DashboardStats from "@/components/dashboard/stats"
import TierDistributionChart from "@/components/dashboard/tier-chart"
import CandidatesList from "@/components/dashboard/candidates-list"
import SkillsAnalytics from "@/components/dashboard/skills-analytics"
import { useDashboardStats } from "@/lib/api/hooks"

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { data: stats, isLoading, error } = useDashboardStats()

  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content */}
      <div className="flex-1 flex flex-col h-full">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Dashboard</h1>
            <p className="text-muted-foreground">Welcome to DesisHub Candidate Management</p>
          </div>

          {isLoading ? (
            <div className="flex justify-center items-center h-96">
              <div className="text-muted-foreground">Loading...</div>
            </div>
          ) : error ? (
            <div className="flex justify-center items-center h-96">
              <div className="text-red-500">Failed to load dashboard stats</div>
            </div>
          ) : (
            <>
              <DashboardStats stats={stats} />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
                <TierDistributionChart distribution={stats?.tierDistribution} />
                <SkillsAnalytics />
              </div>

              <div className="mt-8">
                <CandidatesList />
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  )
}
