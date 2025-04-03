-- Drop existing foreign key constraints
ALTER TABLE blog_post_images
  DROP CONSTRAINT IF EXISTS fk_blog_post;

-- Drop existing indexes
DROP INDEX IF EXISTS blog_post_images_blog_post_id_idx;
DROP INDEX IF EXISTS blog_post_images_display_order_idx;

-- Recreate the table with a single foreign key relationship
CREATE TABLE IF NOT EXISTS blog_post_images_new (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  blog_post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  caption TEXT,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Copy data from old table to new table
INSERT INTO blog_post_images_new (id, blog_post_id, image_url, caption, display_order, created_at, updated_at)
SELECT id, blog_post_id, image_url, caption, display_order, created_at, updated_at
FROM blog_post_images;

-- Drop the old table
DROP TABLE blog_post_images;

-- Rename the new table to the original name
ALTER TABLE blog_post_images_new RENAME TO blog_post_images;

-- Add comment to explain the table
COMMENT ON TABLE blog_post_images IS 'Stores multiple images for each blog post with their order and captions';

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS blog_post_images_blog_post_id_idx ON blog_post_images(blog_post_id);
CREATE INDEX IF NOT EXISTS blog_post_images_display_order_idx ON blog_post_images(display_order);

-- Add RLS policies for blog_post_images
ALTER TABLE blog_post_images ENABLE ROW LEVEL SECURITY;

-- Allow public read access to images
CREATE POLICY "Enable read access for all users" ON blog_post_images
    FOR SELECT USING (true);

-- Allow authenticated users to insert images
CREATE POLICY "Enable insert for authenticated users only" ON blog_post_images
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Allow authenticated users to update images
CREATE POLICY "Enable update for authenticated users only" ON blog_post_images
    FOR UPDATE USING (auth.role() = 'authenticated');

-- Allow authenticated users to delete images
CREATE POLICY "Enable delete for authenticated users only" ON blog_post_images
    FOR DELETE USING (auth.role() = 'authenticated');

-- Create a trigger to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_blog_post_images_updated_at
    BEFORE UPDATE ON blog_post_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 