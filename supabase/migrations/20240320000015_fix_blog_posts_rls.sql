-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON blog_posts;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON blog_posts;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON blog_posts;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON blog_posts;

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Create new policies
CREATE POLICY "Enable read access for all users"
ON blog_posts FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert for authenticated users only"
ON blog_posts FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only"
ON blog_posts FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users only"
ON blog_posts FOR DELETE
TO authenticated
USING (true);

-- Add comment to explain the policies
COMMENT ON TABLE blog_posts IS 'Blog posts table with RLS policies: public read access, authenticated users can create/update/delete'; 