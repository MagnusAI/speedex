-- Make image field optional in posts table
ALTER TABLE posts
ALTER COLUMN image DROP NOT NULL;

-- Add comment
COMMENT ON COLUMN posts.image IS 'Optional image URL for the post. If not provided, the post will be displayed without an image.'; 