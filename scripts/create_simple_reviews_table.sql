-- Creating simplified anonymous reviews table
CREATE TABLE IF NOT EXISTS public.reviews (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  email text,
  comment text NOT NULL,
  rating integer DEFAULT 5 CHECK (rating >= 1 AND rating <= 5),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  is_approved boolean DEFAULT true
);

-- Create index for performance
CREATE INDEX IF NOT EXISTS reviews_created_at_idx ON public.reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS reviews_approved_idx ON public.reviews(is_approved);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Policy to allow anyone to read approved reviews
CREATE POLICY "Anyone can view approved reviews" ON public.reviews
  FOR SELECT USING (is_approved = true);

-- Policy to allow anyone to insert reviews
CREATE POLICY "Anyone can insert reviews" ON public.reviews
  FOR INSERT WITH CHECK (true);

-- Policy to allow only admin (your email) to update/delete
CREATE POLICY "Admin can manage all reviews" ON public.reviews
  FOR ALL USING (auth.jwt() ->> 'email' = 'nidhikulkarnicg2@gmail.com');

-- Insert a sample review
INSERT INTO public.reviews (name, email, comment, rating) 
VALUES ('Sample User', 'user@example.com', 'Great portfolio! Love the design and projects.', 5)
ON CONFLICT DO NOTHING;
