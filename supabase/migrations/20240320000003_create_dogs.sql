-- Create dogs table
CREATE TABLE dogs (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    breed TEXT NOT NULL,
    gender TEXT NOT NULL,
    color TEXT NOT NULL,
    birth_date DATE NOT NULL,
    image_url TEXT,
    description TEXT,
    family_tree JSONB DEFAULT '{"father": null, "mother": null}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Enable Row Level Security
ALTER TABLE dogs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Public read access for dogs"
    ON dogs FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can create dogs"
    ON dogs FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update dogs"
    ON dogs FOR UPDATE
    USING (auth.role() = 'authenticated')
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete dogs"
    ON dogs FOR DELETE
    USING (auth.role() = 'authenticated');

-- Create updated_at trigger
CREATE TRIGGER set_updated_at
    BEFORE UPDATE ON dogs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Create storage bucket for dog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('dog-images', 'dog-images', true);

-- Create storage policies
CREATE POLICY "Public read access for dog images"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'dog-images');

CREATE POLICY "Authenticated users can upload dog images"
    ON storage.objects FOR INSERT
    WITH CHECK (
        bucket_id = 'dog-images' 
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    );

CREATE POLICY "Authenticated users can delete dog images"
    ON storage.objects FOR DELETE
    USING (
        bucket_id = 'dog-images' 
        AND auth.role() = 'authenticated'
        AND (storage.foldername(name))[1] = auth.uid()::text
    ); 