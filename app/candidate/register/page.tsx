"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useRegisterCandidate, useAddSkill, useAssessCandidate } from "@/lib/api/hooks"

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    yearsOfExperience: 0,
  })
  const [error, setError] = useState("")
  const router = useRouter()

  const registerMutation = useRegisterCandidate()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "yearsOfExperience" ? Number.parseInt(value) || 0 : value,
    }))
  }

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const data = await registerMutation.mutateAsync(formData)
      localStorage.setItem("candidateId", data.id)
      localStorage.setItem("candidateEmail", data.email)
      setStep(2)
    } catch (err: any) {
      setError(err?.response?.data?.message || "Registration failed")
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <Link href="/candidate">
            <h1 className="text-2xl font-bold text-primary">DesisHub</h1>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">Step {step} of 2</span>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <div className="h-full bg-primary transition-all duration-300" style={{ width: `${(step / 2) * 100}%` }} />
          </div>
        </div>

        <Card className="bg-card border-border">
          <CardHeader>
            <CardTitle className="text-2xl text-foreground">
              {step === 1 ? "Create Your Profile" : "Add Your Skills"}
            </CardTitle>
          </CardHeader>
          <CardContent>
            {step === 1 ? (
              <RegisterForm
                formData={formData}
                handleInputChange={handleInputChange}
                handleRegister={handleRegister}
                loading={registerMutation.isPending}
                error={error}
              />
            ) : (
              <SkillsStep candidateId={localStorage.getItem("candidateId") || ""} />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

function RegisterForm({ formData, handleInputChange, handleRegister, loading, error }: any) {
  return (
    <form onSubmit={handleRegister} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <AlertCircle size={16} className="text-red-500" />
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="firstName" className="text-sm font-medium text-foreground">
            First Name *
          </label>
          <Input
            id="firstName"
            name="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={handleInputChange}
            className="bg-input border-border text-foreground"
            required
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="lastName" className="text-sm font-medium text-foreground">
            Last Name *
          </label>
          <Input
            id="lastName"
            name="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleInputChange}
            className="bg-input border-border text-foreground"
            required
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Email *
        </label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={formData.email}
          onChange={handleInputChange}
          className="bg-input border-border text-foreground"
          required
          disabled={loading}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium text-foreground">
            Phone
          </label>
          <Input
            id="phone"
            name="phone"
            type="tel"
            placeholder="+1 (555) 000-0000"
            value={formData.phone}
            onChange={handleInputChange}
            className="bg-input border-border text-foreground"
            disabled={loading}
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium text-foreground">
            Location
          </label>
          <Input
            id="location"
            name="location"
            placeholder="San Francisco, CA"
            value={formData.location}
            onChange={handleInputChange}
            className="bg-input border-border text-foreground"
            disabled={loading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="yearsOfExperience" className="text-sm font-medium text-foreground">
          Years of Experience
        </label>
        <Input
          id="yearsOfExperience"
          name="yearsOfExperience"
          type="number"
          placeholder="5"
          min="0"
          value={formData.yearsOfExperience}
          onChange={handleInputChange}
          className="bg-input border-border text-foreground"
          disabled={loading}
        />
      </div>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        disabled={loading}
      >
        {loading ? "Registering..." : "Continue to Skills"}
      </Button>
    </form>
  )
}

function SkillsStep({ candidateId }: { candidateId: string }) {
  const [skills, setSkills] = useState<Array<{ skillName: string; proficiency: number; yearsUsed: number }>>([
    { skillName: "", proficiency: 5, yearsUsed: 0 },
  ])
  const [completed, setCompleted] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const addSkillMutation = useAddSkill()
  const assessMutation = useAssessCandidate()

  const handleSkillChange = (index: number, field: string, value: any) => {
    const newSkills = [...skills]
    newSkills[index] = { ...newSkills[index], [field]: value }
    setSkills(newSkills)
  }

  const addSkill = () => {
    setSkills([...skills, { skillName: "", proficiency: 5, yearsUsed: 0 }])
  }

  const removeSkill = (index: number) => {
    if (skills.length > 1) {
      setSkills(skills.filter((_, i) => i !== index))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      for (const skill of skills) {
        if (skill.skillName.trim()) {
          await addSkillMutation.mutateAsync({ candidateId, skill })
        }
      }

      await assessMutation.mutateAsync({
        candidateId,
        data: { yearsOfExperienceMultiplier: 1.2 },
      })

      setCompleted(true)
      localStorage.setItem("registrationComplete", "true")
    } catch (err: any) {
      setError(err?.response?.data?.message || "Failed to save skills. Please try again.")
    }
  }

  const isLoading = addSkillMutation.isPending || assessMutation.isPending

  if (completed) {
    return (
      <div className="text-center space-y-4">
        <CheckCircle2 size={48} className="mx-auto text-green-500" />
        <h3 className="text-xl font-semibold text-foreground">Registration Complete!</h3>
        <p className="text-muted-foreground">
          Your skills have been assessed. Check your email for your tier assignment results.
        </p>
        <Button onClick={() => router.push("/candidate/submited")} className="w-full bg-primary hover:bg-primary/90">
          View Your Status
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
          <AlertCircle size={16} className="text-red-500" />
          <p className="text-sm text-red-500">{error}</p>
        </div>
      )}

      <p className="text-muted-foreground text-sm">Add your technical skills and rate your proficiency level (0-10).</p>

      <div className="space-y-4 max-h-96 overflow-y-auto">
        {skills.map((skill, idx) => (
          <div key={idx} className="p-4 border border-border rounded-lg bg-input/50 space-y-3">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Skill Name</label>
              <Input
                placeholder="e.g., React, Python, Docker"
                value={skill.skillName}
                onChange={(e) => handleSkillChange(idx, "skillName", e.target.value)}
                className="bg-background border-border text-foreground"
                disabled={isLoading}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Proficiency (0-10)</label>
                <div className="flex items-center gap-2">
                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={skill.proficiency}
                    onChange={(e) => handleSkillChange(idx, "proficiency", Number.parseInt(e.target.value))}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <span className="w-8 text-center font-semibold text-primary">{skill.proficiency}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Years Used</label>
                <Input
                  type="number"
                  min="0"
                  placeholder="0"
                  value={skill.yearsUsed}
                  onChange={(e) => handleSkillChange(idx, "yearsUsed", Number.parseInt(e.target.value) || 0)}
                  className="bg-background border-border text-foreground"
                  disabled={isLoading}
                />
              </div>
            </div>

            {skills.length > 1 && (
              <Button type="button" variant="outline" size="sm" onClick={() => removeSkill(idx)} disabled={isLoading}>
                Remove
              </Button>
            )}
          </div>
        ))}
      </div>

      <Button type="button" variant="outline" onClick={addSkill} disabled={isLoading} className="w-full bg-transparent">
        + Add Another Skill
      </Button>

      <Button
        type="submit"
        className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
        disabled={isLoading || skills.filter((s) => s.skillName.trim()).length === 0}
      >
        {isLoading ? "Processing..." : "Complete Registration"}
      </Button>
    </form>
  )
}
