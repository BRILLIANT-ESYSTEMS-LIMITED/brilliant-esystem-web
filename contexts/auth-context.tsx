"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { supabase } from "@/lib/supabase/client"

type AuthContextType = {
  user: User | null
  session: Session | null
  isLoading: boolean
  isAdmin: boolean
  signInWithGoogle: () => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    async function getSession() {
      setIsLoading(true)

      // Get session
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession()

      if (error) {
        console.error("Error getting session:", error)
      } else {
        setSession(session)
        setUser(session?.user ?? null)

        // Check if user is admin
        if (session?.user) {
          const { data, error } = await supabase.from("admins").select("*").eq("user_id", session.user.id).single()

          setIsAdmin(!!data)
        }
      }

      setIsLoading(false)
    }

    getSession()

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)

      // Check if user is admin
      if (session?.user) {
        const { data, error } = await supabase.from("admins").select("*").eq("user_id", session.user.id).single()

        setIsAdmin(!!data)
      } else {
        setIsAdmin(false)
      }

      setIsLoading(false)
    })

    return () => {
      subscription.unsubscribe()
    }
  }, [])

  const signInWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    })

    if (error) {
      console.error("Error signing in with Google:", error)
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()

    if (error) {
      console.error("Error signing out:", error)
    }
  }

  const value = {
    user,
    session,
    isLoading,
    isAdmin,
    signInWithGoogle,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}

