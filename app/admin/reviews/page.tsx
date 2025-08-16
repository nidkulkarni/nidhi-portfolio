import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminReviewsManager from "@/components/admin-reviews-manager"

export default async function AdminReviewsPage() {
  const supabase = createClient()

  // Check if user is authenticated and is the owner
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user || user.email !== "nidhikulkarnicg2@gmail.com") {
    redirect("/auth/login")
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">Reviews Management</h1>
          <p className="text-gray-400">Manage and moderate portfolio reviews</p>
        </div>

        <AdminReviewsManager />
      </div>
    </div>
  )
}
