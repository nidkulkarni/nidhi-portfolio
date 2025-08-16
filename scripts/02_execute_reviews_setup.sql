-- Execute the reviews table creation
-- This script will create the reviews table and set up proper security policies

-- Create reviews table for portfolio comments
CREATE TABLE IF NOT EXISTS reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  comment TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  is_approved BOOLEAN DEFAULT true,
  CONSTRAINT comment_length CHECK (char_length(comment) >= 10 AND char_length(comment) <= 1000)
);

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON reviews(is_approved);

-- Enable Row Level Security
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist to avoid conflicts
DROP POLICY IF EXISTS "Anyone can read approved reviews" ON reviews;
DROP POLICY IF EXISTS "Authenticated users can insert reviews" ON reviews;
DROP POLICY IF EXISTS "Only owner can manage reviews" ON reviews;

-- Policy: Anyone can read approved reviews
CREATE POLICY "Anyone can read approved reviews" ON reviews
  FOR SELECT USING (is_approved = true);

-- Policy: Authenticated users can insert reviews
CREATE POLICY "Authenticated users can insert reviews" ON reviews
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Policy: Only portfolio owner can delete/update reviews
CREATE POLICY "Only owner can manage reviews" ON reviews
  FOR ALL USING (auth.jwt() ->> 'email' = 'nidhikulkarnicg2@gmail.com');

-- Insert a sample review for testing
INSERT INTO reviews (user_email, user_name, user_avatar, comment, is_approved) 
VALUES (
  'sample@example.com', 
  'Sample User', 
  'https://via.placeholder.com/40', 
  'This is a beautiful portfolio! Great work showcasing your projects and skills.', 
  true
) ON CONFLICT DO NOTHING;
