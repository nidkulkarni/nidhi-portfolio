"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { LogOut, User } from "lucide-react"
import { supabase } from "@/lib/supabase/client"
import { signOut } from "@/lib/auth-actions"
import type { User as SupabaseUser } from "@supabase/supabase-js"

export default function AuthStatus() {
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
      setLoading(false)
    }

    getSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-400">
        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin" />
        Loading...
      </div>
    )
  }

  if (!user) {
    return (
      <Button
        onClick={() => (window.location.href = "/auth/login")}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
      >
        <User className="w-4 h-4" />
        Sign in to Review
      </Button>
    )
  }

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center gap-2 text-sm">
        {user.user_metadata?.avatar_url && (
          <img
            src={user.user_metadata.avatar_url || "/placeholder.svg"}
            alt="Profile"
            className="w-6 h-6 rounded-full"
          />
        )}
        <span className="text-white">{user.user_metadata?.full_name || user.email}</span>
      </div>
      <form action={signOut}>
        <Button
          type="submit"
          variant="outline"
          size="sm"
          className="border-gray-600 text-gray-300 hover:bg-gray-800 bg-transparent"
        >
          <LogOut className="w-4 h-4" />
        </Button>
      </form>
    </div>
  )
}
