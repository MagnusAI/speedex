-- Drop the blog_post_dogs junction table since we're using tags instead
DROP TABLE IF EXISTS blog_post_dogs;

-- Update the blog_posts table to ensure it has the correct structure
ALTER TABLE blog_posts
  ALTER COLUMN image_url DROP NOT NULL;

-- Add the tags column if it doesn't exist
DO $$ 
BEGIN
  IF NOT EXISTS (
    SELECT 1 
    FROM information_schema.columns 
    WHERE table_name = 'blog_posts' 
    AND column_name = 'tags'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN tags text[] DEFAULT '{}';
  END IF;
END $$;

-- Set tags as NOT NULL after ensuring it exists
ALTER TABLE blog_posts
  ALTER COLUMN tags SET NOT NULL;

-- Add a comment to explain the tags field
COMMENT ON COLUMN blog_posts.tags IS 'Array of tags for the blog post. Can include both dog names and custom tags.';

-- Ensure the tags array is properly indexed
CREATE INDEX IF NOT EXISTS blog_posts_tags_idx ON blog_posts USING GIN(tags);

-- Update RLS policies to ensure proper access
DROP POLICY IF EXISTS "Enable read access for all users" ON blog_posts;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON blog_posts;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON blog_posts;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON blog_posts;

-- Recreate policies with proper permissions
CREATE POLICY "Enable read access for all users" ON blog_posts
    FOR SELECT USING (true);

CREATE POLICY "Enable insert for authenticated users only" ON blog_posts
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only" ON blog_posts
    FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only" ON blog_posts
    FOR DELETE USING (auth.role() = 'authenticated'); 