"use client"

import { useEffect, useState } from "react"
import { MessageSquare, Star } from "lucide-react"
import ReviewCard from "./review-card"
import AddReviewForm from "./add-review-form"
import AuthStatus from "./auth-status"
import { getReviews } from "@/lib/review-actions"
import { supabase } from "@/lib/supabase/client"
import type { User } from "@supabase/supabase-js"

interface Review {
  id: string
  user_email: string
  user_name: string
  user_avatar?: string
  comment: string
  created_at: string
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [refreshKey, setRefreshKey] = useState(0)

  const isOwner = user?.email === "nidhikulkarnicg2@gmail.com"

  useEffect(() => {
    // Get initial session
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      setUser(session?.user ?? null)
    }

    getSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true)
      try {
        const result = await getReviews()
        if (result.success && result.data) {
          setReviews(result.data)
        }
      } catch (error) {
        console.error("Failed to fetch reviews:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchReviews()
  }, [refreshKey])

  const handleReviewAdded = () => {
    setRefreshKey((prev) => prev + 1)
  }

  const handleReviewDeleted = (deletedId: string) => {
    setReviews((prev) => prev.filter((review) => review.id !== deletedId))
  }

  return (
    <section id="reviews" className="py-20 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30">
            <MessageSquare className="w-8 h-8 text-blue-400" />
          </div>
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">Portfolio Reviews</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
          Share your thoughts about my work, projects, and portfolio. Your feedback helps me grow as a developer.
        </p>
      </div>

      <div className="flex justify-center mb-8">
        <AuthStatus />
      </div>

      {user && (
        <div className="mb-12">
          <AddReviewForm user={user} onReviewAdded={handleReviewAdded} />
        </div>
      )}

      <div className="space-y-6">
        {loading ? (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-400">Loading reviews...</p>
          </div>
        ) : reviews.length === 0 ? (
          <div className="text-center py-12 glass-card rounded-xl border border-white/10 backdrop-blur-md bg-white/5">
            <Star className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No reviews yet</h3>
            <p className="text-gray-400">Be the first to share your thoughts about this portfolio!</p>
          </div>
        ) : (
          <>
            <div className="text-center mb-8">
              <p className="text-gray-300">
                <span className="font-semibold text-blue-400">{reviews.length}</span> review
                {reviews.length !== 1 ? "s" : ""}
              </p>
            </div>
            <div className="grid gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} isOwner={isOwner} onDelete={handleReviewDeleted} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}
