-- Drop existing storage policies
DROP POLICY IF EXISTS "Allow public read access to dog images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to upload dog images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to update their own dog images" ON storage.objects;
DROP POLICY IF EXISTS "Allow authenticated users to delete their own dog images" ON storage.objects;

-- Create new storage policies for the dog-images bucket
CREATE POLICY "Allow public read access to dog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'dog-images');

CREATE POLICY "Allow public uploads to dog images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'dog-images');

CREATE POLICY "Allow public updates to dog images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'dog-images')
WITH CHECK (bucket_id = 'dog-images');

CREATE POLICY "Allow public deletes to dog images"
ON storage.objects FOR DELETE
USING (bucket_id = 'dog-images'); 