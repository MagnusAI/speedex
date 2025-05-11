-- Add RLS policy for authenticated users to create posts
CREATE POLICY "Allow authenticated users to create posts"
ON posts
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Add comment to explain the policy
COMMENT ON POLICY "Allow authenticated users to create posts" ON posts IS 'Allows any authenticated user to create new posts'; 