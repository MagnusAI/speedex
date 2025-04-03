-- Drop existing storage policies
DROP POLICY IF EXISTS "Public Access" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can upload images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update their own images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete their own images" ON storage.objects;

-- Create storage policies with correct permissions
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
USING (bucket_id = 'dogs');

CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'dogs' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can update images"
ON storage.objects FOR UPDATE
USING (
  bucket_id = 'dogs' 
  AND auth.role() = 'authenticated'
)
WITH CHECK (
  bucket_id = 'dogs' 
  AND auth.role() = 'authenticated'
);

CREATE POLICY "Authenticated users can delete images"
ON storage.objects FOR DELETE
USING (
  bucket_id = 'dogs' 
  AND auth.role() = 'authenticated'
); 