"use client"

import { Menu, Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  onMenuClick: () => void
}

export default function Header({ onMenuClick }: HeaderProps) {
  return (
    <header className="border-b border-border bg-card px-8 py-4 flex items-center justify-between">
      <Button variant="ghost" size="icon" onClick={onMenuClick} className="text-muted-foreground">
        <Menu size={20} />
      </Button>

      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <Bell size={20} />
        </Button>
        <Button variant="ghost" size="icon" className="text-muted-foreground">
          <User size={20} />
        </Button>
      </div>
    </header>
  )
}
