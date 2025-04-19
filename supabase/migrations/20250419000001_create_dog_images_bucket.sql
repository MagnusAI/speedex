-- Create storage bucket for dog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('dog_images', 'dog_images', true);

-- Create storage policies for dog images bucket
CREATE POLICY "Allow public read access to dog images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'dog_images');

CREATE POLICY "Allow authenticated users to upload dog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'dog_images');

CREATE POLICY "Allow authenticated users to update their own dog images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'dog_images' AND auth.uid() = owner);

CREATE POLICY "Allow authenticated users to delete their own dog images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'dog_images' AND auth.uid() = owner);

-- Add comments
COMMENT ON POLICY "Allow public read access to dog images" ON storage.objects IS 'Allows public read access to dog images';
COMMENT ON POLICY "Allow authenticated users to upload dog images" ON storage.objects IS 'Allows authenticated users to upload dog images';
COMMENT ON POLICY "Allow authenticated users to update their own dog images" ON storage.objects IS 'Allows authenticated users to update their own dog images';
COMMENT ON POLICY "Allow authenticated users to delete their own dog images" ON storage.objects IS 'Allows authenticated users to delete their own dog images'; 