import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AuthCallback({
  searchParams,
}: {
  searchParams: { code?: string; error?: string }
}) {
  const supabase = createClient()

  if (searchParams.error) {
    console.error("Auth error:", searchParams.error)
    redirect("/auth/login?error=Authentication failed")
  }

  if (searchParams.code) {
    const { error } = await supabase.auth.exchangeCodeForSession(searchParams.code)

    if (error) {
      console.error("Session exchange error:", error)
      redirect("/auth/login?error=Authentication failed")
    }
  }

  // Successful authentication, redirect to home
  redirect("/#reviews")
}
