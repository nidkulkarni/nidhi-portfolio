"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Star, Send } from "lucide-react"

interface Review {
  id: string
  name: string
  email?: string
  comment: string
  rating: number
  created_at: string
  is_approved: boolean
}

export default function SimpleReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [submitting, setSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    comment: "",
    rating: 5,
  })

  // Load from localStorage when component mounts
  useEffect(() => {
    const saved = localStorage.getItem("portfolio_reviews")
    if (saved) {
      setReviews(JSON.parse(saved))
    }
  }, [])

  // Save to localStorage whenever reviews change
  useEffect(() => {
    localStorage.setItem("portfolio_reviews", JSON.stringify(reviews))
  }, [reviews])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name.trim() || !formData.comment.trim()) return

    setSubmitting(true)

    const newReview: Review = {
      id: Date.now().toString(),
      name: formData.name,
      email: formData.email,
      comment: formData.comment,
      rating: formData.rating,
      created_at: new Date().toISOString(),
      is_approved: true,
    }

    // Optimistic update
    setReviews((prev) => [newReview, ...prev])

    // Reset form
    setFormData({ name: "", email: "", comment: "", rating: 5 })
    setSubmitting(false)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-500"}`}
      />
    ))
  }

  return (
    <section id="reviews" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Portfolio Reviews
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-300">
            Share your thoughts about my portfolio and projects
          </p>
        </div>

        {/* Add Review Form */}
        <div className="glass-card p-8 mb-12 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-xl shadow">
          <h3 className="text-2xl font-semibold mb-6 text-gray-900 dark:text-white">Leave a Review</h3>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Rating</label>
              <div className="flex gap-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setFormData({ ...formData, rating: i + 1 })}
                    className="p-1"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        i < formData.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-400 dark:text-gray-500"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Comment *</label>
              <textarea
                required
                rows={4}
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                className="w-full px-4 py-3 bg-gray-100 dark:bg-white/10 border border-gray-300 dark:border-white/20 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Share your thoughts about the portfolio..."
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              {submitting ? "Submitting..." : "Submit Review"}
            </button>
          </form>
        </div>

        {/* Reviews Display */}
        <div className="space-y-6">
          <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-8">
            What others are saying ({reviews.length})
          </h3>

          {reviews.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-400">No reviews yet. Be the first to leave one!</p>
            </div>
          ) : (
            reviews.map((review) => (
              <div
                key={review.id}
                className="glass-card p-6 bg-white dark:bg-white/10 border border-gray-200 dark:border-white/20 rounded-xl shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">{review.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(review.created_at).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{review.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  )
}
