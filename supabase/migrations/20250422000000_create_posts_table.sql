-- Create posts table
CREATE TABLE IF NOT EXISTS public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT NOT NULL,
    tags TEXT[] DEFAULT '{}',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create indexes for better query performance
CREATE INDEX idx_posts_user_id ON posts(user_id);
CREATE INDEX idx_posts_created_at ON posts(created_at DESC);
CREATE INDEX idx_posts_tags ON posts USING GIN (tags);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_posts_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_posts_updated_at
    BEFORE UPDATE ON public.posts
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_posts_updated_at();

-- Enable Row Level Security
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON public.posts
    FOR SELECT
    TO authenticated, anon
    USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.posts
    FOR INSERT
    TO authenticated
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable update for users based on user_id" ON public.posts
    FOR UPDATE
    TO authenticated
    USING (auth.uid() = user_id)
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Enable delete for users based on user_id" ON public.posts
    FOR DELETE
    TO authenticated
    USING (auth.uid() = user_id);

-- Create storage bucket for post images
INSERT INTO storage.buckets (id, name, public)
VALUES ('post_images', 'post_images', true);

-- Create storage policies for post images bucket
CREATE POLICY "Allow public read access to post images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'post_images');

CREATE POLICY "Allow authenticated users to upload post images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'post_images');

CREATE POLICY "Allow authenticated users to update their own post images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'post_images' AND auth.uid() = owner);

CREATE POLICY "Allow authenticated users to delete their own post images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'post_images' AND auth.uid() = owner);

-- Add comments
COMMENT ON TABLE public.posts IS 'Table storing user posts with images and tags';
COMMENT ON COLUMN public.posts.id IS 'Unique identifier for the post';
COMMENT ON COLUMN public.posts.user_id IS 'ID of the user who created the post';
COMMENT ON COLUMN public.posts.title IS 'Title of the post';
COMMENT ON COLUMN public.posts.description IS 'Description/content of the post';
COMMENT ON COLUMN public.posts.image IS 'URL to the post image';
COMMENT ON COLUMN public.posts.tags IS 'Array of tags associated with the post';
COMMENT ON COLUMN public.posts.created_at IS 'Timestamp when the post was created';
COMMENT ON COLUMN public.posts.updated_at IS 'Timestamp when the post was last updated';

COMMENT ON POLICY "Enable read access for all users" ON public.posts IS 'Allows all users to read posts';
COMMENT ON POLICY "Enable insert for authenticated users" ON public.posts IS 'Allows authenticated users to create posts';
COMMENT ON POLICY "Enable update for users based on user_id" ON public.posts IS 'Allows users to update their own posts';
COMMENT ON POLICY "Enable delete for users based on user_id" ON public.posts IS 'Allows users to delete their own posts';

COMMENT ON POLICY "Allow public read access to post images" ON storage.objects IS 'Allows public read access to post images';
COMMENT ON POLICY "Allow authenticated users to upload post images" ON storage.objects IS 'Allows authenticated users to upload post images';
COMMENT ON POLICY "Allow authenticated users to update their own post images" ON storage.objects IS 'Allows authenticated users to update their own post images';
COMMENT ON POLICY "Allow authenticated users to delete their own post images" ON storage.objects IS 'Allows authenticated users to delete their own post images'; 