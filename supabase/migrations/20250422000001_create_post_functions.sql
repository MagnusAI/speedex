-- Function to fetch the latest posts with pagination
CREATE OR REPLACE FUNCTION public.get_latest_posts(
    p_limit INTEGER DEFAULT 10,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    user_id UUID,
    title TEXT,
    description TEXT,
    image TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    user_email TEXT
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
        p.updated_at,
        u.email as user_email
    FROM public.posts p
    LEFT JOIN auth.users u ON p.user_id = u.id
    ORDER BY p.created_at DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$;

-- Function to fetch posts by tag with pagination
CREATE OR REPLACE FUNCTION public.get_posts_by_tag(
    p_tag TEXT,
    p_limit INTEGER DEFAULT 10,
    p_offset INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    user_id UUID,
    title TEXT,
    description TEXT,
    image TEXT,
    tags TEXT[],
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ,
    user_email TEXT
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
        p.updated_at,
        u.email as user_email
    FROM public.posts p
    LEFT JOIN auth.users u ON p.user_id = u.id
    WHERE p_tag = ANY(p.tags)
    ORDER BY p.created_at DESC
    LIMIT p_limit
    OFFSET p_offset;
END;
$$;

-- Add comments
COMMENT ON FUNCTION public.get_latest_posts IS 'Fetches the latest posts with pagination support';
COMMENT ON FUNCTION public.get_posts_by_tag IS 'Fetches posts that contain a specific tag with pagination support';

-- Create RLS policies for the functions
CREATE POLICY "Enable read access for all users on latest posts"
ON public.posts
FOR SELECT
TO authenticated, anon
USING (true);

CREATE POLICY "Enable read access for all users on posts by tag"
ON public.posts
FOR SELECT
TO authenticated, anon
USING (true); 