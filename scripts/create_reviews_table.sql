-- Create reviews table for portfolio feedback system
CREATE TABLE IF NOT EXISTS public.reviews (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_email TEXT NOT NULL,
    user_name TEXT NOT NULL,
    user_avatar_url TEXT,
    comment TEXT NOT NULL,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
    is_approved BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for better query performance
CREATE INDEX IF NOT EXISTS idx_reviews_created_at ON public.reviews(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_approved ON public.reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_reviews_user_email ON public.reviews(user_email);

-- Enable Row Level Security
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

-- Create policies for Row Level Security
-- Allow everyone to read approved reviews
CREATE POLICY "Anyone can view approved reviews" ON public.reviews
    FOR SELECT USING (is_approved = true);

-- Allow authenticated users to insert their own reviews
CREATE POLICY "Authenticated users can insert reviews" ON public.reviews
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow the portfolio owner (Nidhi) to manage all reviews
CREATE POLICY "Portfolio owner can manage all reviews" ON public.reviews
    FOR ALL USING (
        auth.jwt() ->> 'email' = 'nidhikulkarnicg2@gmail.com'
    );

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_reviews_updated_at 
    BEFORE UPDATE ON public.reviews 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- Insert a sample review for testing
INSERT INTO public.reviews (user_email, user_name, comment, rating, user_avatar_url) 
VALUES (
    'sample@example.com', 
    'Sample User', 
    'Amazing portfolio! The design is beautiful and the projects showcase impressive technical skills.',
    5,
    'https://via.placeholder.com/40'
) ON CONFLICT DO NOTHING;
