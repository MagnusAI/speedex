-- Create storage bucket for dog images
INSERT INTO storage.buckets (id, name, public)
VALUES ('dog-images', 'dog-images', true);

-- Create storage policies for the dog-images bucket
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