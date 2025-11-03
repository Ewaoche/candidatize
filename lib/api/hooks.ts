"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getApiClient } from "./client"
import type {
  Candidate,
  DashboardStats,
  CandidatesResponse,
  SkillAnalytics,
  AuthResponse,
  RegisterRequest,
  AddSkillRequest,
  AssessRequest,
} from "./types"

const apiClient = getApiClient()

// Auth Queries & Mutations
export const useLogin = () => {
  return useMutation({
    mutationFn: async ({ email, password }: { email: string; password: string }) => {
      const response = await apiClient.post<AuthResponse>("/auth/login", { email, password })
      return response.data
    },
  })
}

export const useRegisterCandidate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await apiClient.post<Candidate>("/candidates/register", data)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["candidates"] })
      return data
    },
  })
}

// Candidate Queries
export const useDashboardStats = () => {
  return useQuery({
    queryKey: ["dashboardStats"],
    queryFn: async () => {
      const response = await apiClient.get<DashboardStats>("/analytics/dashboard")
      return response.data
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (previously cacheTime)
  })
}

export const useCandidates = (skip = 0, take = 10, search = "") => {
  return useQuery({
    queryKey: ["candidates", skip, take, search],
    queryFn: async () => {
      const params = new URLSearchParams({
        skip: skip.toString(),
        take: take.toString(),
        ...(search && { search }),
      })
      const response = await apiClient.get<CandidatesResponse>(`/candidates?${params}`)
      return response.data
    },
    staleTime: 3 * 60 * 1000, // 3 minutes
    gcTime: 5 * 60 * 1000,
  })
}

export const useCandidate = (id: string) => {
  return useQuery({
    queryKey: ["candidate", id],
    queryFn: async () => {
      const response = await apiClient.get<Candidate>(`/candidates/${id}`)
      return response.data
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    enabled: !!id,
  })
}

export const useSkillsAnalytics = () => {
  return useQuery({
    queryKey: ["skillsAnalytics"],
    queryFn: async () => {
      const response = await apiClient.get<SkillAnalytics[]>("/analytics/skills")
      return response.data
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
  })
}

// Skill Mutations
export const useAddSkill = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ candidateId, skill }: { candidateId: string; skill: AddSkillRequest }) => {
      const response = await apiClient.post(`/candidates/${candidateId}/skills`, skill)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["candidate"] })
    },
  })
}

export const useAssessCandidate = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ candidateId, data }: { candidateId: string; data: AssessRequest }) => {
      const response = await apiClient.post<Candidate>(`/tier/assess/${candidateId}`, data)
      return response.data
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["candidate", data.id] })
      queryClient.invalidateQueries({ queryKey: ["dashboardStats"] })
      queryClient.invalidateQueries({ queryKey: ["candidates"] })
    },
  })
}

// Export Mutations
export const useExportCandidates = () => {
  return useMutation({
    mutationFn: async () => {
      const response = await apiClient.get("/export/excel", {
        responseType: "blob",
      })
      return response.data
    },
    onSuccess: (blob: Blob) => {
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `candidates_${new Date().toISOString().split("T")[0]}.xlsx`
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)
    },
  })
}
