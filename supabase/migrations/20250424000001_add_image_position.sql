-- Add image_position column to posts table
ALTER TABLE posts ADD COLUMN image_position INTEGER DEFAULT 50;

-- Add comment to explain the column
COMMENT ON COLUMN posts.image_position IS 'Vertical position of the image in the post card (0-100, default 50)'; 