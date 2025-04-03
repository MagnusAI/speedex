-- Drop existing policies
DROP POLICY IF EXISTS "Enable read access for all users" ON dogs;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON dogs;
DROP POLICY IF EXISTS "Enable update for authenticated users only" ON dogs;
DROP POLICY IF EXISTS "Enable delete for authenticated users only" ON dogs;

-- Create RLS policies with correct permissions
CREATE POLICY "Enable read access for all users"
ON dogs FOR SELECT
USING (true);

CREATE POLICY "Enable insert for authenticated users only"
ON dogs FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable update for authenticated users only"
ON dogs FOR UPDATE
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Enable delete for authenticated users only"
ON dogs FOR DELETE
USING (auth.role() = 'authenticated'); 