"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { BarChart3, Users, Settings, LogOut, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("token")
    router.push("/login")
  }

  const menuItems = [
    { label: "Dashboard", icon: BarChart3, href: "/dashboard" },
    { label: "Candidates", icon: Users, href: "#" },
    { label: "Settings", icon: Settings, href: "#" },
  ]

  return (
    <>
      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed lg:static top-0 left-0 h-full bg-card border-r border-border z-40 transition-transform duration-300 ease-in-out flex flex-col
          ${isOpen ? "translate-x-0 w-64" : "-translate-x-full w-64 lg:translate-x-0 lg:w-64"}`}
      >
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-xl font-bold text-primary">DesisHub</h2>
          <button onClick={onClose} className="lg:hidden">
            <X size={22} className="text-muted-foreground" />
          </button>
        </div>

        <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <Button
                variant="ghost"
                className="w-full justify-start text-foreground hover:bg-accent"
                asChild
              >
                <span className="flex items-center gap-3">
                  <item.icon size={20} />
                  {item.label}
                </span>
              </Button>
            </Link>
          ))}
        </nav>

        <div className="p-6 border-t border-border">
          <Button
            onClick={handleLogout}
            variant="outline"
            className="w-full justify-start bg-transparent"
          >
            <LogOut size={20} className="mr-2" />
            Logout
          </Button>
        </div>
      </aside>
    </>
  )
}
