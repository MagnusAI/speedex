-- Drop existing read policy
DROP POLICY IF EXISTS "Anyone can view posts" ON posts;

-- Create new policy for public read access
CREATE POLICY "Enable public read access for posts"
ON posts
FOR SELECT
TO public
USING (true);

-- Add comment to explain the policy
COMMENT ON POLICY "Enable public read access for posts" ON posts 
IS 'Allows anyone to read posts, regardless of authentication status'; 