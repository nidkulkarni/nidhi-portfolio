"use server"

import { createClient } from "@/lib/supabase/server"

interface AddReviewData {
  user_email: string
  user_name: string
  user_avatar_url?: string
  comment: string
  rating?: number
}

export async function addReview(data: AddReviewData) {
  const supabase = createClient()

  // Check if user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: "You must be signed in to leave a review" }
  }

  // Validate comment length
  if (data.comment.length < 10 || data.comment.length > 1000) {
    return { success: false, error: "Comment must be between 10 and 1000 characters" }
  }

  try {
    const { error } = await supabase.from("reviews").insert([
      {
        user_email: data.user_email,
        user_name: data.user_name,
        user_avatar_url: data.user_avatar_url,
        comment: data.comment,
        rating: data.rating || 5,
        is_approved: true, // Auto-approve for now
      },
    ])

    if (error) {
      console.error("Database error:", error)
      return { success: false, error: "Failed to save review" }
    }

    return { success: true }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getReviews() {
  const supabase = createClient()

  try {
    const { data, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Database error:", error)
      return { success: false, error: "Failed to fetch reviews" }
    }

    return { success: true, data }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function deleteReview(reviewId: string) {
  const supabase = createClient()

  // Check if user is authenticated and is the owner
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { success: false, error: "You must be signed in" }
  }

  if (user.email !== "nidhikulkarnicg2@gmail.com") {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const { error } = await supabase.from("reviews").delete().eq("id", reviewId)

    if (error) {
      console.error("Database error:", error)
      return { success: false, error: "Failed to delete review" }
    }

    return { success: true }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
