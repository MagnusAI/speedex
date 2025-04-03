-- Drop existing foreign key constraints and indexes
ALTER TABLE blog_post_images DROP CONSTRAINT IF EXISTS blog_post_images_blog_post_id_fkey;
ALTER TABLE blog_post_images DROP CONSTRAINT IF EXISTS fk_blog_post;
DROP INDEX IF EXISTS idx_blog_post_images_blog_post_id;

-- Create a new table with a single foreign key relationship
CREATE TABLE blog_post_images_new (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    blog_post_id UUID NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
    image_url TEXT NOT NULL,
    caption TEXT,
    display_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Copy data from old table to new table
INSERT INTO blog_post_images_new (id, blog_post_id, image_url, caption, display_order, created_at, updated_at)
SELECT id, blog_post_id, image_url, caption, display_order, created_at, updated_at
FROM blog_post_images;

-- Drop the old table
DROP TABLE blog_post_images;

-- Rename the new table to the original name
ALTER TABLE blog_post_images_new RENAME TO blog_post_images;

-- Add comments
COMMENT ON TABLE blog_post_images IS 'Stores images associated with blog posts';
COMMENT ON COLUMN blog_post_images.id IS 'Unique identifier for the image';
COMMENT ON COLUMN blog_post_images.blog_post_id IS 'Reference to the parent blog post';
COMMENT ON COLUMN blog_post_images.image_url IS 'URL of the image';
COMMENT ON COLUMN blog_post_images.caption IS 'Optional caption for the image';
COMMENT ON COLUMN blog_post_images.display_order IS 'Order in which the image should be displayed';
COMMENT ON COLUMN blog_post_images.created_at IS 'Timestamp when the record was created';
COMMENT ON COLUMN blog_post_images.updated_at IS 'Timestamp when the record was last updated';

-- Create indexes
CREATE INDEX idx_blog_post_images_blog_post_id ON blog_post_images(blog_post_id);
CREATE INDEX idx_blog_post_images_display_order ON blog_post_images(display_order);

-- Enable RLS
ALTER TABLE blog_post_images ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow public read access to blog post images"
    ON blog_post_images FOR SELECT
    USING (true);

CREATE POLICY "Allow authenticated users to insert blog post images"
    ON blog_post_images FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to update blog post images"
    ON blog_post_images FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Allow authenticated users to delete blog post images"
    ON blog_post_images FOR DELETE
    USING (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON blog_post_images
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 