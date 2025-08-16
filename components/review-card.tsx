"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Trash2, Calendar } from "lucide-react"
import { deleteReview } from "@/lib/review-actions"

interface Review {
  id: string
  user_email: string
  user_name: string
  user_avatar?: string
  comment: string
  created_at: string
}

interface ReviewCardProps {
  review: Review
  isOwner?: boolean
  onDelete?: (id: string) => void
}

export default function ReviewCard({ review, isOwner = false, onDelete }: ReviewCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this review?")) return

    setIsDeleting(true)
    try {
      const result = await deleteReview(review.id)
      if (result.success) {
        onDelete?.(review.id)
      } else {
        alert("Failed to delete review")
      }
    } catch (error) {
      console.error("Delete error:", error)
      alert("Failed to delete review")
    } finally {
      setIsDeleting(false)
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    })
  }

  return (
    <div className="glass-card p-6 rounded-xl border border-white/10 backdrop-blur-md bg-white/5 hover:bg-white/10 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {review.user_avatar ? (
            <img
              src={review.user_avatar || "/placeholder.svg"}
              alt={review.user_name}
              className="w-10 h-10 rounded-full border-2 border-blue-400/30"
            />
          ) : (
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
              {review.user_name.charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h4 className="font-semibold text-white">{review.user_name}</h4>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <Calendar className="w-3 h-3" />
              {formatDate(review.created_at)}
            </div>
          </div>
        </div>

        {isOwner && (
          <Button
            onClick={handleDelete}
            disabled={isDeleting}
            variant="ghost"
            size="sm"
            className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        )}
      </div>

      <p className="text-gray-200 leading-relaxed">{review.comment}</p>
    </div>
  )
}
