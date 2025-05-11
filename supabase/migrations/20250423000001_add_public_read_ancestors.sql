-- Add public read policy for ancestors table
CREATE POLICY "Allow public read access to ancestors"
    ON ancestors FOR SELECT
    TO public
    USING (true);

-- Add comment
COMMENT ON POLICY "Allow public read access to ancestors" ON ancestors IS 'Allows public read access to ancestor data for viewing ancestry trees'; 