-- Create storage bucket for ancestor images
INSERT INTO storage.buckets (id, name, public)
VALUES ('ancestor-images', 'ancestor-images', true);

-- Create storage policies for ancestor images bucket
CREATE POLICY "Allow public read access to ancestor images"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'ancestor-images');

CREATE POLICY "Allow authenticated users to upload ancestor images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'ancestor-images');

CREATE POLICY "Allow authenticated users to update their own ancestor images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'ancestor-images' AND auth.uid() = owner);

CREATE POLICY "Allow authenticated users to delete their own ancestor images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'ancestor-images' AND auth.uid() = owner);

-- Add comments
COMMENT ON POLICY "Allow public read access to ancestor images" ON storage.objects IS 'Allows public read access to ancestor images';
COMMENT ON POLICY "Allow authenticated users to upload ancestor images" ON storage.objects IS 'Allows authenticated users to upload ancestor images';
COMMENT ON POLICY "Allow authenticated users to update their own ancestor images" ON storage.objects IS 'Allows authenticated users to update their own ancestor images';
COMMENT ON POLICY "Allow authenticated users to delete their own ancestor images" ON storage.objects IS 'Allows authenticated users to delete their own ancestor images'; 