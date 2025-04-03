-- Drop existing policies for blog_posts
DROP POLICY IF EXISTS "Enable read access for all users" ON blog_posts;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON blog_posts;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON blog_posts;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON blog_posts;

-- Drop existing policies for blog_post_dogs
DROP POLICY IF EXISTS "Enable read access for all users" ON blog_post_dogs;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON blog_post_dogs;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON blog_post_dogs;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON blog_post_dogs;

-- Enable RLS on both tables
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_dogs ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts
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

-- Create policies for blog_post_dogs
CREATE POLICY "Enable read access for all users"
ON blog_post_dogs FOR SELECT
TO public
USING (true);

CREATE POLICY "Enable insert for authenticated users only"
ON blog_post_dogs FOR INSERT
TO authenticated
WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users only"
ON blog_post_dogs FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users only"
ON blog_post_dogs FOR DELETE
TO authenticated
USING (true);

-- Add comments to explain the policies
COMMENT ON TABLE blog_posts IS 'Blog posts table with RLS policies: public read access, authenticated users can create/update/delete';
COMMENT ON TABLE blog_post_dogs IS 'Blog post dogs junction table with RLS policies: public read access, authenticated users can create/update/delete'; 