import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "DesisHub - Candidate Portal",
  description: "Register and assess your skills with DesisHub",
}

export default function CandidateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
