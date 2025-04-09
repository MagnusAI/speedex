-- Drop existing RLS policies
DROP POLICY IF EXISTS "Allow authenticated users to insert dogs" ON dogs;
DROP POLICY IF EXISTS "Allow authenticated users to select dogs" ON dogs;
DROP POLICY IF EXISTS "Allow authenticated users to update their own dogs" ON dogs;
DROP POLICY IF EXISTS "Allow authenticated users to delete their own dogs" ON dogs;

-- Create new RLS policies for the dogs table
CREATE POLICY "Allow public access to insert dogs"
ON dogs
FOR INSERT
WITH CHECK (true);

CREATE POLICY "Allow public access to select dogs"
ON dogs
FOR SELECT
USING (true);

CREATE POLICY "Allow public access to update dogs"
ON dogs
FOR UPDATE
USING (true)
WITH CHECK (true);

CREATE POLICY "Allow public access to delete dogs"
ON dogs
FOR DELETE
USING (true); 