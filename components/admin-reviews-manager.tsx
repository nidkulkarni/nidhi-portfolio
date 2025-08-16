"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trash2, Eye, EyeOff, Calendar, MessageSquare, CheckCircle, XCircle, BarChart3, ArrowLeft } from "lucide-react"
import { getAllReviews, toggleReviewApproval, deleteReview, getReviewStats } from "@/lib/admin-actions"
import Link from "next/link"

interface Review {
  id: string
  user_email: string
  user_name: string
  user_avatar?: string
  comment: string
  created_at: string
  is_approved: boolean
}

interface ReviewStats {
  total: number
  approved: number
  pending: number
  thisMonth: number
}

export default function AdminReviewsManager() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [stats, setStats] = useState<ReviewStats>({ total: 0, approved: 0, pending: 0, thisMonth: 0 })
  const [loading, setLoading] = useState(true)
  const [selectedReviews, setSelectedReviews] = useState<Set<string>>(new Set())
  const [activeTab, setActiveTab] = useState("all")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    setLoading(true)
    try {
      const [reviewsResult, statsResult] = await Promise.all([getAllReviews(), getReviewStats()])

      if (reviewsResult.success && reviewsResult.data) {
        setReviews(reviewsResult.data)
      }

      if (statsResult.success && statsResult.data) {
        setStats(statsResult.data)
      }
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleToggleApproval = async (reviewId: string, currentStatus: boolean) => {
    try {
      const result = await toggleReviewApproval(reviewId, !currentStatus)
      if (result.success) {
        setReviews((prev) =>
          prev.map((review) => (review.id === reviewId ? { ...review, is_approved: !currentStatus } : review)),
        )
        setStats((prev) => ({
          ...prev,
          approved: currentStatus ? prev.approved - 1 : prev.approved + 1,
          pending: currentStatus ? prev.pending + 1 : prev.pending - 1,
        }))
      }
    } catch (error) {
      console.error("Failed to toggle approval:", error)
    }
  }

  const handleDelete = async (reviewId: string) => {
    if (!confirm("Are you sure you want to delete this review? This action cannot be undone.")) return

    try {
      const result = await deleteReview(reviewId)
      if (result.success) {
        const deletedReview = reviews.find((r) => r.id === reviewId)
        setReviews((prev) => prev.filter((review) => review.id !== reviewId))
        setStats((prev) => ({
          ...prev,
          total: prev.total - 1,
          approved: deletedReview?.is_approved ? prev.approved - 1 : prev.approved,
          pending: !deletedReview?.is_approved ? prev.pending - 1 : prev.pending,
        }))
        setSelectedReviews((prev) => {
          const newSet = new Set(prev)
          newSet.delete(reviewId)
          return newSet
        })
      }
    } catch (error) {
      console.error("Failed to delete review:", error)
    }
  }

  const handleBulkAction = async (action: "approve" | "disapprove" | "delete") => {
    if (selectedReviews.size === 0) return

    const confirmMessage =
      action === "delete"
        ? `Are you sure you want to delete ${selectedReviews.size} review(s)? This action cannot be undone.`
        : `Are you sure you want to ${action} ${selectedReviews.size} review(s)?`

    if (!confirm(confirmMessage)) return

    try {
      const promises = Array.from(selectedReviews).map((reviewId) => {
        if (action === "delete") {
          return deleteReview(reviewId)
        } else {
          const review = reviews.find((r) => r.id === reviewId)
          return toggleReviewApproval(reviewId, action === "approve")
        }
      })

      await Promise.all(promises)
      await fetchData()
      setSelectedReviews(new Set())
    } catch (error) {
      console.error(`Failed to perform bulk ${action}:`, error)
    }
  }

  const toggleSelectReview = (reviewId: string) => {
    setSelectedReviews((prev) => {
      const newSet = new Set(prev)
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId)
      } else {
        newSet.add(reviewId)
      }
      return newSet
    })
  }

  const selectAll = () => {
    const filteredReviews = getFilteredReviews()
    setSelectedReviews(new Set(filteredReviews.map((r) => r.id)))
  }

  const deselectAll = () => {
    setSelectedReviews(new Set())
  }

  const getFilteredReviews = () => {
    switch (activeTab) {
      case "approved":
        return reviews.filter((r) => r.is_approved)
      case "pending":
        return reviews.filter((r) => !r.is_approved)
      default:
        return reviews
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-8 h-8 border-2 border-blue-400 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-400">Loading reviews...</p>
      </div>
    )
  }

  const filteredReviews = getFilteredReviews()

  return (
    <div className="space-y-6">
      {/* Back to Portfolio Link */}
      <Link href="/" className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors">
        <ArrowLeft className="w-4 h-4" />
        Back to Portfolio
      </Link>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="glass-card p-6 rounded-xl border border-white/10 backdrop-blur-md bg-white/5">
          <div className="flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-blue-400" />
            <div>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
              <p className="text-sm text-gray-400">Total Reviews</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-white/10 backdrop-blur-md bg-white/5">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-8 h-8 text-green-400" />
            <div>
              <p className="text-2xl font-bold text-white">{stats.approved}</p>
              <p className="text-sm text-gray-400">Approved</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-white/10 backdrop-blur-md bg-white/5">
          <div className="flex items-center gap-3">
            <XCircle className="w-8 h-8 text-yellow-400" />
            <div>
              <p className="text-2xl font-bold text-white">{stats.pending}</p>
              <p className="text-sm text-gray-400">Pending</p>
            </div>
          </div>
        </div>

        <div className="glass-card p-6 rounded-xl border border-white/10 backdrop-blur-md bg-white/5">
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-purple-400" />
            <div>
              <p className="text-2xl font-bold text-white">{stats.thisMonth}</p>
              <p className="text-sm text-gray-400">This Month</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedReviews.size > 0 && (
        <div className="glass-card p-4 rounded-xl border border-white/10 backdrop-blur-md bg-white/5">
          <div className="flex items-center justify-between">
            <span className="text-white">{selectedReviews.size} review(s) selected</span>
            <div className="flex items-center gap-2">
              <Button onClick={() => handleBulkAction("approve")} size="sm" className="bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-1" />
                Approve
              </Button>
              <Button
                onClick={() => handleBulkAction("disapprove")}
                size="sm"
                className="bg-yellow-600 hover:bg-yellow-700"
              >
                <XCircle className="w-4 h-4 mr-1" />
                Disapprove
              </Button>
              <Button onClick={() => handleBulkAction("delete")} size="sm" className="bg-red-600 hover:bg-red-700">
                <Trash2 className="w-4 h-4 mr-1" />
                Delete
              </Button>
              <Button onClick={deselectAll} size="sm" variant="outline">
                Deselect All
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between">
          <TabsList className="bg-black/20 border border-white/10">
            <TabsTrigger value="all" className="data-[state=active]:bg-blue-600">
              All ({reviews.length})
            </TabsTrigger>
            <TabsTrigger value="approved" className="data-[state=active]:bg-green-600">
              Approved ({stats.approved})
            </TabsTrigger>
            <TabsTrigger value="pending" className="data-[state=active]:bg-yellow-600">
              Pending ({stats.pending})
            </TabsTrigger>
          </TabsList>

          <Button onClick={selectAll} size="sm" variant="outline">
            Select All Visible
          </Button>
        </div>

        <TabsContent value={activeTab} className="space-y-4">
          {filteredReviews.length === 0 ? (
            <div className="text-center py-12 glass-card rounded-xl border border-white/10 backdrop-blur-md bg-white/5">
              <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No reviews found</h3>
              <p className="text-gray-400">No reviews match the current filter.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredReviews.map((review) => (
                <div
                  key={review.id}
                  className={`glass-card p-6 rounded-xl border backdrop-blur-md transition-all duration-200 ${
                    selectedReviews.has(review.id)
                      ? "border-blue-400/50 bg-blue-500/10"
                      : "border-white/10 bg-white/5 hover:bg-white/10"
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={selectedReviews.has(review.id)}
                      onChange={() => toggleSelectReview(review.id)}
                      className="mt-1 w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />

                    <div className="flex-1">
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
                            <p className="text-sm text-gray-400">{review.user_email}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-400">{formatDate(review.created_at)}</span>
                              <Badge
                                variant={review.is_approved ? "default" : "secondary"}
                                className={
                                  review.is_approved
                                    ? "bg-green-600 hover:bg-green-700"
                                    : "bg-yellow-600 hover:bg-yellow-700"
                                }
                              >
                                {review.is_approved ? "Approved" : "Pending"}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => handleToggleApproval(review.id, review.is_approved)}
                            size="sm"
                            variant="outline"
                            className="border-gray-600 text-gray-300 hover:bg-gray-800"
                          >
                            {review.is_approved ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </Button>
                          <Button
                            onClick={() => handleDelete(review.id)}
                            size="sm"
                            variant="outline"
                            className="border-red-600 text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <p className="text-gray-200 leading-relaxed">{review.comment}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
