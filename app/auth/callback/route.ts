import { createServerClient } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  try {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")
    const next = searchParams.get("next") || "/"

    if (code) {
      const supabase = createServerClient()

      // Exchange the code for a session
      const { data, error } = await supabase.auth.exchangeCodeForSession(code)
      
      if (error) {
        console.error("Auth error:", error.message)
        return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(error.message)}`)
      }

      // Check if user is admin
      const { data: roles } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.user?.id)
        .eq("role", "admin")
        .single()

      // Redirect to appropriate page
      if (roles) {
        return NextResponse.redirect(`${origin}/admin/dashboard`)
      }
    }

    // Default redirect to home page
    return NextResponse.redirect(`${origin}${next}`)
  } catch (error) {
    console.error("Callback error:", error)
    return NextResponse.redirect(`${origin}/login?error=Something went wrong`)
  }
}

