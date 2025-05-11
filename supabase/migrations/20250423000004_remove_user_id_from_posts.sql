-- First drop all functions that depend on user_id
DROP FUNCTION IF EXISTS get_latest_posts;
DROP FUNCTION IF EXISTS get_posts_by_tag;

-- Drop all RLS policies that depend on user_id
DROP POLICY IF EXISTS "Users can create posts" ON posts;
DROP POLICY IF EXISTS "Users can update their own posts" ON posts;
DROP POLICY IF EXISTS "Users can delete their own posts" ON posts;
DROP POLICY IF EXISTS "Users can view their own posts" ON posts;
DROP POLICY IF EXISTS "Enable read access for all users" ON posts;
DROP POLICY IF EXISTS "Enable insert for authenticated users" ON posts;
DROP POLICY IF EXISTS "Enable update for users based on user_id" ON posts;
DROP POLICY IF EXISTS "Enable delete for users based on user_id" ON posts;
DROP POLICY IF EXISTS "Enable read access for all users on latest posts" ON posts;
DROP POLICY IF EXISTS "Enable read access for all users on posts by tag" ON posts;
DROP POLICY IF EXISTS "Allow authenticated users to create posts" ON posts;

-- Drop the index on user_id
DROP INDEX IF EXISTS idx_posts_user_id;

-- Now we can safely remove the user_id column
ALTER TABLE posts DROP COLUMN user_id;

-- Recreate the functions without user_id
CREATE OR REPLACE FUNCTION get_latest_posts(
    p_limit integer DEFAULT 10,
    p_offset integer DEFAULT 0
)
RETURNS TABLE (
    id uuid,
    title text,
    description text,
    image text,
    tags text[],
    created_at timestamptz,
    updated_at timestamptz
) 
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.title,
        p.description,
        p.image,
        p.tags,
        p.created_at,
        p.updated_at
    FROM posts p
    ORDER BY p.created_at DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$;

CREATE OR REPLACE FUNCTION get_posts_by_tag(
    p_tag text,
    p_limit integer DEFAULT 10,
    p_offset integer DEFAULT 0
)
RETURNS TABLE (
    id uuid,
    title text,
    description text,
    image text,
    tags text[],
    created_at timestamptz,
    updated_at timestamptz
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.title,
        p.description,
        p.image,
        p.tags,
        p.created_at,
        p.updated_at
    FROM posts p
    WHERE p.tags @> ARRAY[p_tag]::text[]
    ORDER BY p.created_at DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$;

-- Create simpler RLS policies that just check for authentication
CREATE POLICY "Authenticated users can create posts"
ON posts FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Authenticated users can update posts"
ON posts FOR UPDATE
TO authenticated
USING (true);

CREATE POLICY "Authenticated users can delete posts"
ON posts FOR DELETE
TO authenticated
USING (true);

CREATE POLICY "Anyone can view posts"
ON posts FOR SELECT
TO authenticated
USING (true); 