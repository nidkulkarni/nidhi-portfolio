export type Database = {
  public: {
    Tables: {
      reviews: {
        Row: {
          id: string
          user_email: string
          user_name: string
          user_avatar_url: string | null
          comment: string
          rating: number
          is_approved: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_email: string
          user_name: string
          user_avatar_url?: string | null
          comment: string
          rating: number
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_email?: string
          user_name?: string
          user_avatar_url?: string | null
          comment?: string
          rating?: number
          is_approved?: boolean
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
