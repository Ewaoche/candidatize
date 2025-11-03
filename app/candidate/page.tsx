"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function CandidateHomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">DesisHub</h1>
          <nav className="flex gap-4">
            <Link href="/candidate/register">
              <Button variant="ghost">Register</Button>
            </Link>
            <Link href="/candidate/results">
              <Button variant="outline">View Results</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl font-bold text-foreground mb-6">
          Assess Your Skills,
          <br />
          Find Your Perfect Fit
        </h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Register with DesisHub to showcase your expertise. Our intelligent algorithm will categorize you into the
          right skill tier, opening doors to matched opportunities.
        </p>
        <Link href="/candidate/register">
          <Button size="lg" className="gap-2 bg-primary hover:bg-primary/90">
            Get Started <ArrowRight size={20} />
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="bg-card border-y border-border py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h3 className="text-3xl font-bold text-foreground mb-12 text-center">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Register Your Profile",
                description: "Create your account and provide basic information about your professional background.",
              },
              {
                step: "02",
                title: "Add Your Skills",
                description: "List your technical skills and rate your proficiency level on a scale of 0-10.",
              },
              {
                step: "03",
                title: "Get Tier Assignment",
                description: "Our algorithm analyzes your skills and assigns you to a tier from Entry Level to Master.",
              },
            ].map((feature, idx) => (
              <div key={idx} className="text-center">
                <div className="text-4xl font-bold text-primary mb-4">{feature.step}</div>
                <h4 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h4>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tiers */}
      <section className="py-20 max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold text-foreground mb-12 text-center">Skill Tiers</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[
            { tier: 0, name: "Entry Level", color: "bg-gray-500/10 border-gray-500/20" },
            { tier: 1, name: "Beginner", color: "bg-blue-500/10 border-blue-500/20" },
            { tier: 2, name: "Intermediate", color: "bg-cyan-500/10 border-cyan-500/20" },
            { tier: 3, name: "Advanced", color: "bg-purple-500/10 border-purple-500/20" },
            { tier: 4, name: "Expert", color: "bg-orange-500/10 border-orange-500/20" },
            { tier: 5, name: "Master", color: "bg-rose-500/10 border-rose-500/20" },
          ].map((tierInfo) => (
            <Card key={tierInfo.tier} className={`border ${tierInfo.color} bg-transparent`}>
              <CardHeader>
                <CardTitle className="text-lg text-foreground">Tier {tierInfo.tier}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">{tierInfo.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary/10 border-t border-border py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-foreground mb-4">Ready to Get Started?</h3>
          <p className="text-muted-foreground mb-8">
            Join thousands of professionals already using DesisHub to showcase their skills.
          </p>
          <Link href="/candidate/register">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Register Now
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="max-w-6xl mx-auto px-4 text-center text-muted-foreground text-sm">
          <p>&copy; 2025 DesisHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
