-- Create junction table for blog post dog tags
CREATE TABLE IF NOT EXISTS blog_post_dogs (
    blog_post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
    dog_id UUID REFERENCES dogs(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    PRIMARY KEY (blog_post_id, dog_id)
);

-- Add comment to explain the table
COMMENT ON TABLE blog_post_dogs IS 'Junction table linking blog posts to dogs they mention';

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_post_dogs_blog_post_id ON blog_post_dogs(blog_post_id);
CREATE INDEX IF NOT EXISTS idx_blog_post_dogs_dog_id ON blog_post_dogs(dog_id);

-- Set up RLS policies
ALTER TABLE blog_post_dogs ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Enable read access for all users"
ON blog_post_dogs FOR SELECT
USING (true);

-- Allow authenticated users to insert
CREATE POLICY "Enable insert for authenticated users only"
ON blog_post_dogs FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update
CREATE POLICY "Enable update for authenticated users only"
ON blog_post_dogs FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to delete
CREATE POLICY "Enable delete for authenticated users only"
ON blog_post_dogs FOR DELETE
USING (auth.role() = 'authenticated'); 