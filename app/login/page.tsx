"use client"

import type React from "react"
import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertCircle } from "lucide-react"
import { useLogin } from "@/lib/api/hooks"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const router = useRouter()

  const loginMutation = useLogin()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    try {
      const data = await loginMutation.mutateAsync({ email, password })
      localStorage.setItem("token", data.access_token)
      router.push("/dashboard")
    } catch (err: any) {
      setError(err?.response?.data?.message || "Invalid email or password")
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card border-border shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl text-center text-foreground">DesisHub</CardTitle>
          <p className="text-center text-muted-foreground text-sm mt-2">Admin Login</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            {error && (
              <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                <AlertCircle size={16} className="text-red-500" />
                <p className="text-sm text-red-500">{error}</p>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                Email
              </label>
              <Input
                id="email"
                type="email"
                placeholder="admin@desishub.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border text-foreground"
                disabled={loginMutation.isPending}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-foreground">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-input border-border text-foreground"
                disabled={loginMutation.isPending}
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={loginMutation.isPending}
            >
              {loginMutation.isPending ? "Logging in..." : "Login"}
            </Button>

            {/* ✅ Registration link for candidates */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Not registered yet?{" "}
              <Link href="/candidate/register" className="text-primary font-medium hover:underline">
                Register as Candidate
              </Link>
            </p>

            
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
