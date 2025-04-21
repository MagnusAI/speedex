-- Create ancestors table
CREATE TABLE ancestors (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    dog_id TEXT NOT NULL REFERENCES dogs(id) ON DELETE CASCADE,
    ancestor_id TEXT NOT NULL,
    relation TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT unique_dog_ancestor_relation UNIQUE (dog_id, ancestor_id, relation)
);

-- Create indexes for better query performance
CREATE INDEX idx_ancestors_dog_id ON ancestors(dog_id);
CREATE INDEX idx_ancestors_ancestor_id ON ancestors(ancestor_id);

-- Add RLS policies
ALTER TABLE ancestors ENABLE ROW LEVEL SECURITY;

-- Policy for authenticated users to read ancestors
CREATE POLICY "Allow authenticated users to read ancestors"
    ON ancestors FOR SELECT
    TO authenticated
    USING (true);

-- Policy for authenticated users to insert ancestors
CREATE POLICY "Allow authenticated users to insert ancestors"
    ON ancestors FOR INSERT
    TO authenticated
    WITH CHECK (true);

-- Policy for authenticated users to update ancestors
CREATE POLICY "Allow authenticated users to update ancestors"
    ON ancestors FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Policy for authenticated users to delete ancestors
CREATE POLICY "Allow authenticated users to delete ancestors"
    ON ancestors FOR DELETE
    TO authenticated
    USING (true);

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_ancestors_updated_at
    BEFORE UPDATE ON ancestors
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column(); 