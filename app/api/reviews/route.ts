import { type NextRequest, NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!)

export async function GET() {
  try {
    const { data: reviews, error } = await supabase
      .from("reviews")
      .select("*")
      .eq("is_approved", true)
      .order("created_at", { ascending: false })

    if (error) throw error

    return NextResponse.json(reviews)
  } catch (error) {
    console.error("Error fetching reviews:", error)
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name, email, comment, rating } = await request.json()

    if (!name?.trim() || !comment?.trim()) {
      return NextResponse.json({ error: "Name and comment are required" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("reviews")
      .insert([
        {
          name: name.trim(),
          email: email?.trim() || null,
          comment: comment.trim(),
          rating: rating || 5,
        },
      ])
      .select()

    if (error) throw error

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("Error creating review:", error)
    return NextResponse.json({ error: "Failed to create review" }, { status: 500 })
  }
}
