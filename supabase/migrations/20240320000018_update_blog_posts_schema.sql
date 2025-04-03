-- Drop existing columns that are no longer needed
ALTER TABLE blog_posts DROP COLUMN IF EXISTS author;
ALTER TABLE blog_posts DROP COLUMN IF EXISTS tags;

-- Add updated_at column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.columns 
        WHERE table_name = 'blog_posts' 
        AND column_name = 'updated_at'
    ) THEN
        ALTER TABLE blog_posts ADD COLUMN updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL;
    END IF;
END $$;

-- Make image_url nullable
ALTER TABLE blog_posts ALTER COLUMN image_url DROP NOT NULL;

-- Drop existing indexes that are no longer needed
DROP INDEX IF EXISTS blog_posts_author_idx;
DROP INDEX IF EXISTS blog_posts_tags_idx;

-- Update the table comment
COMMENT ON TABLE blog_posts IS 'Blog posts table with RLS policies: public read access, authenticated users can create/update/delete'; 