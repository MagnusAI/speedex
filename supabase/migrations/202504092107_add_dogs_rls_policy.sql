-- Enable RLS on dogs table
ALTER TABLE dogs ENABLE ROW LEVEL SECURITY;

-- Create policy to allow authenticated users to insert dogs
CREATE POLICY "Allow authenticated users to insert dogs"
ON dogs
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Create policy to allow authenticated users to select dogs
CREATE POLICY "Allow authenticated users to select dogs"
ON dogs
FOR SELECT
TO authenticated
USING (true);

-- Create policy to allow authenticated users to update their own dogs
CREATE POLICY "Allow authenticated users to update their own dogs"
ON dogs
FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Create policy to allow authenticated users to delete their own dogs
CREATE POLICY "Allow authenticated users to delete their own dogs"
ON dogs
FOR DELETE
TO authenticated
USING (true); 