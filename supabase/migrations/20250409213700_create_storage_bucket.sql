-- Create storage bucket for dog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('dog-images', 'dog-images', true);

-- Create storage policies for the dog-images bucket
CREATE POLICY "Allow public read access to dog images"
ON storage.objects FOR SELECT
USING (bucket_id = 'dog-images');

CREATE POLICY "Allow authenticated users to upload dog images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'dog-images');

CREATE POLICY "Allow authenticated users to update their own dog images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'dog-images')
WITH CHECK (bucket_id = 'dog-images');

CREATE POLICY "Allow authenticated users to delete their own dog images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'dog-images'); 