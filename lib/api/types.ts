export interface Candidate {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  location?: string
  yearsOfExperience: number
  tier: number
  tierScore: number
  status: string
  skills: Skill[]
  createdAt: string
  updatedAt: string
}

export interface Skill {
  id: string
  skillName: string
  proficiency: number
  yearsUsed: number
  candidateId: string
}

export interface DashboardStats {
  totalCandidates: number
  assessedCandidates: number
  pendingAssessment: number
  averageTierScore: number
  tierDistribution: TierDistribution[]
}

export interface TierDistribution {
  tier: number
  tierName: string
  count: number
  percentage: string
}

export interface SkillAnalytics {
  skillName: string
  candidatesCount: number
  averageProficiency: number
}

export interface CandidatesResponse {
  data: Candidate[]
  total: number
  skip: number
  take: number
}

export interface AuthResponse {
  access_token: string
  user?: {
    id: string
    email: string
    role: string
  }
}

export interface RegisterRequest {
  firstName: string
  lastName: string
  email: string
  phone?: string
  location?: string
  yearsOfExperience: number
}

export interface AddSkillRequest {
  skillName: string
  proficiency: number
  yearsUsed: number
}

export interface AssessRequest {
  yearsOfExperienceMultiplier?: number
}
