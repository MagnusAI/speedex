-- Drop existing functions if they exist
DROP FUNCTION IF EXISTS get_latest_posts;
DROP FUNCTION IF EXISTS get_posts_by_tag;

-- Create the get_latest_posts function without user email
CREATE OR REPLACE FUNCTION get_latest_posts(
    p_limit integer DEFAULT 10,
    p_offset integer DEFAULT 0
)
RETURNS TABLE (
    id uuid,
    user_id uuid,
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
        p.user_id,
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

-- Create the get_posts_by_tag function without user email
CREATE OR REPLACE FUNCTION get_posts_by_tag(
    p_tag text,
    p_limit integer DEFAULT 10,
    p_offset integer DEFAULT 0
)
RETURNS TABLE (
    id uuid,
    user_id uuid,
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
        p.user_id,
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