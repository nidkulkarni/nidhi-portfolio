"use server"

import { createClient } from "@/lib/supabase/server"

export async function getAllReviews() {
  const supabase = createClient()

  // Check if user is authenticated and is the owner
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user || user.email !== "nidhikulkarnicg2@gmail.com") {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const { data, error } = await supabase.from("reviews").select("*").order("created_at", { ascending: false })

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

export async function getReviewStats() {
  const supabase = createClient()

  // Check if user is authenticated and is the owner
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user || user.email !== "nidhikulkarnicg2@gmail.com") {
    return { success: false, error: "Unauthorized" }
  }

  try {
    // Get total count
    const { count: total } = await supabase.from("reviews").select("*", { count: "exact", head: true })

    // Get approved count
    const { count: approved } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("is_approved", true)

    // Get pending count
    const { count: pending } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .eq("is_approved", false)

    // Get this month's count
    const startOfMonth = new Date()
    startOfMonth.setDate(1)
    startOfMonth.setHours(0, 0, 0, 0)

    const { count: thisMonth } = await supabase
      .from("reviews")
      .select("*", { count: "exact", head: true })
      .gte("created_at", startOfMonth.toISOString())

    return {
      success: true,
      data: {
        total: total || 0,
        approved: approved || 0,
        pending: pending || 0,
        thisMonth: thisMonth || 0,
      },
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function toggleReviewApproval(reviewId: string, isApproved: boolean) {
  const supabase = createClient()

  // Check if user is authenticated and is the owner
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user || user.email !== "nidhikulkarnicg2@gmail.com") {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const { error } = await supabase.from("reviews").update({ is_approved: isApproved }).eq("id", reviewId)

    if (error) {
      console.error("Database error:", error)
      return { success: false, error: "Failed to update review" }
    }

    return { success: true }
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

  if (authError || !user || user.email !== "nidhikulkarnicg2@gmail.com") {
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

export async function bulkDeleteReviews(reviewIds: string[]) {
  const supabase = createClient()

  // Check if user is authenticated and is the owner
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user || user.email !== "nidhikulkarnicg2@gmail.com") {
    return { success: false, error: "Unauthorized" }
  }

  try {
    const { error } = await supabase.from("reviews").delete().in("id", reviewIds)

    if (error) {
      console.error("Database error:", error)
      return { success: false, error: "Failed to delete reviews" }
    }

    return { success: true }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
