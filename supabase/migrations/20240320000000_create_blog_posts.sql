-- Create the blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    image_url TEXT NOT NULL,
    author TEXT NOT NULL,
    tags TEXT[] NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create policies
-- Allow public read access
CREATE POLICY "Enable read access for all users" ON blog_posts
    FOR SELECT USING (true);

-- Allow authenticated users to create posts
CREATE POLICY "Enable insert for authenticated users only" ON blog_posts
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update their own posts
CREATE POLICY "Enable update for authenticated users only" ON blog_posts
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete their own posts
CREATE POLICY "Enable delete for authenticated users only" ON blog_posts
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS blog_posts_created_at_idx ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS blog_posts_author_idx ON blog_posts(author);
CREATE INDEX IF NOT EXISTS blog_posts_tags_idx ON blog_posts USING GIN(tags); 