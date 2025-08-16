import { createClient, isSupabaseConfigured } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import GoogleAuthButton from "@/components/google-auth-button"

export default async function LoginPage() {
  // If Supabase is not configured, show setup message directly
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a]">
        <h1 className="text-2xl font-bold mb-4 text-white">Connect Supabase to get started</h1>
      </div>
    )
  }

  // Check if user is already logged in
  const supabase = createClient()
  const {
    data: { session },
  } = await supabase.auth.getSession()

  // If user is logged in, redirect to home page
  if (session) {
    redirect("/")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="space-y-2 text-center">
          <h1 className="text-4xl font-semibold tracking-tight text-white">Welcome</h1>
          <p className="text-lg text-gray-400">Sign in to leave a review on Nidhi's portfolio</p>
        </div>

        <div className="space-y-6">
          <GoogleAuthButton mode="signin" />

          <div className="text-center text-sm text-gray-400">
            By signing in, you agree to leave authentic reviews and feedback.
          </div>
        </div>
      </div>
    </div>
  )
}
