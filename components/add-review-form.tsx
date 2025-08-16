"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Send, Loader2 } from "lucide-react"
import { addReview } from "@/lib/review-actions"
import type { User } from "@supabase/supabase-js"

interface AddReviewFormProps {
  user: User
  onReviewAdded: () => void
}

export default function AddReviewForm({ user, onReviewAdded }: AddReviewFormProps) {
  const [comment, setComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!comment.trim() || comment.length < 10) {
      alert("Please write at least 10 characters for your review.")
      return
    }

    if (comment.length > 1000) {
      alert("Review must be less than 1000 characters.")
      return
    }

    setIsSubmitting(true)
    try {
      const result = await addReview({
        user_email: user.email!,
        user_name: user.user_metadata?.full_name || user.email!.split("@")[0],
        user_avatar: user.user_metadata?.avatar_url,
        comment: comment.trim(),
      })

      if (result.success) {
        setComment("")
        onReviewAdded()
      } else {
        alert(result.error || "Failed to submit review")
      }
    } catch (error) {
      console.error("Submit error:", error)
      alert("Failed to submit review")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-card p-6 rounded-xl border border-white/10 backdrop-blur-md bg-white/5"
    >
      <div className="flex items-center gap-3 mb-4">
        {user.user_metadata?.avatar_url ? (
          <img
            src={user.user_metadata.avatar_url || "/placeholder.svg"}
            alt="Your profile"
            className="w-10 h-10 rounded-full border-2 border-blue-400/30"
          />
        ) : (
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold">
            {(user.user_metadata?.full_name || user.email!).charAt(0).toUpperCase()}
          </div>
        )}
        <div>
          <h4 className="font-semibold text-white">{user.user_metadata?.full_name || user.email!.split("@")[0]}</h4>
          <p className="text-sm text-gray-400">Share your thoughts about this portfolio</p>
        </div>
      </div>

      <Textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Write your review here... What did you think of Nidhi's work, projects, or portfolio design?"
        className="min-h-[120px] bg-black/20 border-white/20 text-white placeholder:text-gray-400 resize-none focus:border-blue-400/50 focus:ring-blue-400/20"
        maxLength={1000}
      />

      <div className="flex items-center justify-between mt-4">
        <span className="text-sm text-gray-400">
          {comment.length}/1000 characters {comment.length < 10 && comment.length > 0 && "(minimum 10)"}
        </span>

        <Button
          type="submit"
          disabled={isSubmitting || comment.length < 10 || comment.length > 1000}
          className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-6 py-2 rounded-lg flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Submitting...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              Submit Review
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
