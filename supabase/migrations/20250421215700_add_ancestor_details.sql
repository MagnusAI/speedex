-- Add new columns to ancestors table
ALTER TABLE ancestors
ADD COLUMN name TEXT,
ADD COLUMN profile_image_url TEXT,
ADD COLUMN champion_titles TEXT[] DEFAULT '{}';

-- Update RLS policies to include new columns
CREATE POLICY "Allow authenticated users to read ancestor details"
    ON ancestors FOR SELECT
    TO authenticated
    USING (true);

CREATE POLICY "Allow authenticated users to insert ancestor details"
    ON ancestors FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update ancestor details"
    ON ancestors FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true); 