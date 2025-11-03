"use client"

import { useState, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog"
import {
  Download,
  Search,
  Briefcase,
  MapPin,
  Mail,
  Phone,
  Award,
  X,
  Eye,
} from "lucide-react"
import { useCandidates, useExportCandidates } from "@/lib/api/hooks"

const TIER_COLORS = {
  0: "bg-gray-100 text-gray-800",
  1: "bg-blue-100 text-blue-800",
  2: "bg-cyan-100 text-cyan-800",
  3: "bg-purple-100 text-purple-800",
  4: "bg-orange-100 text-orange-800",
  5: "bg-rose-100 text-rose-800",
}

const TIER_NAMES = ["Entry Level", "Beginner", "Intermediate", "Advanced", "Expert", "Master"]

export default function CandidatesList() {
  const [search, setSearch] = useState("")
  const [skip, setSkip] = useState(0)
  const [selectedCandidate, setSelectedCandidate] = useState<any>(null)
  const take = 10

  const { data: candidatesData, isLoading } = useCandidates(skip, take, search)
  const exportMutation = useExportCandidates()

  const handleExport = useCallback(() => {
    exportMutation.mutate()
  }, [exportMutation])

  const candidates = candidatesData?.data || []

  return (
    <div className="space-y-6 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center py-6 border-b border-border">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground">TalentTrack Pro</h1>
        <p className="text-muted-foreground mt-2 text-sm sm:text-base max-w-lg mx-auto">
          Streamline your recruitment process — view, filter, and export candidate data easily.
        </p>
      </div>

      {/* Main Card */}
      <Card className="bg-card border-border">
        <CardHeader className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <CardTitle className="text-lg text-foreground">Recent Candidates</CardTitle>
          <Button
            onClick={handleExport}
            size="sm"
            className="gap-2 w-full sm:w-auto"
            disabled={exportMutation.isPending}
          >
            <Download size={16} />
            {exportMutation.isPending ? "Exporting..." : "Export"}
          </Button>
        </CardHeader>

        <CardContent>
          {/* Search Field */}
          <div className="mb-4 relative">
            <Search className="absolute left-3 top-3 text-muted-foreground" size={18} />
            <Input
              placeholder="Search candidates..."
              className="pl-10 bg-input border-border text-foreground w-full"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setSkip(0)
              }}
            />
          </div>

          {/* Table (Desktop) */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Name</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Email</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Tier</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Score</th>
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Status</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-muted-foreground">
                      Loading...
                    </td>
                  </tr>
                ) : candidates.length > 0 ? (
                  candidates.map((candidate) => (
                    <tr
                      key={candidate.id}
                      className="border-b border-border hover:bg-border/50 transition-colors"
                    >
                      <td className="py-3 px-4 text-foreground">
                        {candidate.firstName} {candidate.lastName}
                      </td>
                      <td className="py-3 px-4 text-muted-foreground">{candidate.email}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            TIER_COLORS[candidate.tier as keyof typeof TIER_COLORS]
                          }`}
                        >
                          {TIER_NAMES[candidate.tier]}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-foreground">{candidate.tierScore.toFixed(2)}</td>
                      <td className="py-3 px-4 text-muted-foreground text-xs capitalize">
                        {candidate.status}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-muted-foreground hover:text-primary"
                          onClick={() => setSelectedCandidate(candidate)}
                        >
                          <Eye size={18} />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center py-4 text-muted-foreground">
                      No candidates found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="md:hidden space-y-3">
            {isLoading ? (
              <p className="text-center text-muted-foreground">Loading...</p>
            ) : candidates.length > 0 ? (
              candidates.map((candidate) => (
                <div
                  key={candidate.id}
                  className="border border-border rounded-lg p-4 bg-background shadow-sm"
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium text-foreground text-sm">
                      {candidate.firstName} {candidate.lastName}
                    </h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-muted-foreground hover:text-primary"
                      onClick={() => setSelectedCandidate(candidate)}
                    >
                      <Eye size={18} />
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">{candidate.email}</p>
                  <div className="flex justify-between text-xs mt-2">
                    <span className="text-muted-foreground">Score: {candidate.tierScore.toFixed(2)}</span>
                    <span className="capitalize">{candidate.status}</span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-muted-foreground">No candidates found</p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
            <p className="text-sm text-muted-foreground text-center sm:text-left">
              Showing {skip + 1} to {Math.min(skip + take, candidatesData?.total || 0)} of{" "}
              {candidatesData?.total || 0}
            </p>
            <div className="flex gap-2 w-full sm:w-auto justify-center sm:justify-end">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSkip(Math.max(0, skip - take))}
                disabled={skip === 0}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setSkip(skip + take)}
                disabled={skip + take >= (candidatesData?.total || 0)}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Candidate Detail Modal */}
      <Dialog open={!!selectedCandidate} onOpenChange={() => setSelectedCandidate(null)}>
        <DialogContent className="sm:max-w-lg rounded-2xl">
          <DialogHeader className="relative">
            <DialogTitle className="text-xl font-semibold">
              {selectedCandidate?.firstName} {selectedCandidate?.lastName}
            </DialogTitle>
            <DialogDescription className="text-muted-foreground">
              Candidate Overview
            </DialogDescription>
            
           
          </DialogHeader>

          <div className="space-y-4 text-sm mt-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-primary" />
                <span>{selectedCandidate?.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-primary" />
                <span>{selectedCandidate?.phone || "N/A"}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-primary" />
                <span>{selectedCandidate?.location || "Unknown"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Briefcase size={16} className="text-primary" />
                <span>{selectedCandidate?.yearsOfExperience || 0} years experience</span>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Award size={16} className="text-primary" />
              <span className="font-medium">
                Tier:{" "}
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ml-1 ${
                    TIER_COLORS[selectedCandidate?.tier as keyof typeof TIER_COLORS]
                  }`}
                >
                  {TIER_NAMES[selectedCandidate?.tier || 0]}
                </span>
              </span>
            </div>

            <p>
              <span className="text-muted-foreground">Score:</span>{" "}
              <span className="font-medium">{selectedCandidate?.tierScore?.toFixed(2)}</span>
            </p>
            <p>
              <span className="text-muted-foreground">Status:</span>{" "}
              <span className="capitalize">{selectedCandidate?.status}</span>
            </p>

            {/* Skills */}
            <div className="mt-4">
              <h4 className="font-semibold text-foreground mb-2">Skills</h4>
              {selectedCandidate?.skills?.length ? (
                <div className="flex flex-wrap gap-2">
                  {selectedCandidate.skills.map((s: any, i: number) => (
                    <span
                      key={i}
                      className="px-3 py-1 bg-secondary text-secondary-foreground rounded-full text-xs font-medium"
                    >
                      {s.skillName} —{" "}
                      <span className="text-foreground">Proficiency {s.proficiency}</span>
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No skills listed</p>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
