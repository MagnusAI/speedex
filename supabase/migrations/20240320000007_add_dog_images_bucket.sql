-- Create a new storage bucket for dog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('dogs', 'dogs', true);

-- Set up storage policy to allow public read access
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'dogs');

-- Set up storage policy to allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'dogs' 
  AND auth.role() = 'authenticated'
);

-- Set up storage policy to allow authenticated users to update their own images
CREATE POLICY "Authenticated users can update their own images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'dogs' 
  AND auth.role() = 'authenticated'
);

-- Set up storage policy to allow authenticated users to delete their own images
CREATE POLICY "Authenticated users can delete their own images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'dogs' 
  AND auth.role() = 'authenticated'
); 