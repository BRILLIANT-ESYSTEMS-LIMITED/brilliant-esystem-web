"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, LogIn, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { useAuth } from "@/context/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Portfolio", href: "/portfolio" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
]

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isAdmin, signInWithGoogle, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center space-x-2">
            <div className="relative h-8 w-8 overflow-hidden rounded-full bg-primary">
              <span className="sr-only">Brilliant Esystems Logo</span>
              <div className="flex h-full w-full items-center justify-center text-lg font-bold text-primary-foreground">
                BE
              </div>
            </div>
            <span className="hidden font-bold sm:inline-block">Brilliant Esystems</span>
          </Link>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex md:gap-6 lg:gap-10">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className="text-sm font-medium transition-colors hover:text-primary">
              {link.name}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin/dashboard"
              className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
            >
              Admin
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />

          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  {user.user_metadata.avatar_url ? (
                    <Image
                      src={user.user_metadata.avatar_url || "/placeholder.svg"}
                      alt={user.user_metadata.full_name || "User"}
                      width={32}
                      height={32}
                      className="rounded-full"
                    />
                  ) : (
                    <User className="h-5 w-5" />
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{user.user_metadata.full_name || user.email}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link href="/admin/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem asChild>
                  <Link href="/profile">Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button variant="ghost" size="sm" onClick={() => signInWithGoogle()}>
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>
          )}

          <Button asChild className="hidden md:inline-flex">
            <Link href="/contact">Get Started</Link>
          </Button>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className={cn("container md:hidden", mobileMenuOpen ? "block" : "hidden")}>
        <nav className="flex flex-col space-y-4 pb-6">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="text-sm font-medium transition-colors hover:text-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          {isAdmin && (
            <Link
              href="/admin/dashboard"
              className="text-sm font-medium text-primary transition-colors hover:text-primary/80"
              onClick={() => setMobileMenuOpen(false)}
            >
              Admin
            </Link>
          )}
          <Button asChild className="w-full">
            <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>
              Get Started
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}

