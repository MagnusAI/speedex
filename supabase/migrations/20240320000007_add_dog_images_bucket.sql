-- Create a new storage bucket for dog images if it doesn't exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM storage.buckets WHERE id = 'dogs'
  ) THEN
    INSERT INTO storage.buckets (id, name, public)
    VALUES ('dogs', 'dogs', true);
  END IF;
END $$;

-- Set up storage policies if they don't exist
DO $$
BEGIN
  -- Public read access policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Public Access'
  ) THEN
    CREATE POLICY "Public Access"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'dogs');
  END IF;

  -- Upload policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Authenticated users can upload images'
  ) THEN
    CREATE POLICY "Authenticated users can upload images"
    ON storage.objects FOR INSERT
    WITH CHECK (
      bucket_id = 'dogs' 
      AND auth.role() = 'authenticated'
    );
  END IF;

  -- Update policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Authenticated users can update their own images'
  ) THEN
    CREATE POLICY "Authenticated users can update their own images"
    ON storage.objects FOR UPDATE
    USING (
      bucket_id = 'dogs' 
      AND auth.role() = 'authenticated'
    );
  END IF;

  -- Delete policy
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'objects' 
    AND policyname = 'Authenticated users can delete their own images'
  ) THEN
    CREATE POLICY "Authenticated users can delete their own images"
    ON storage.objects FOR DELETE
    USING (
      bucket_id = 'dogs' 
      AND auth.role() = 'authenticated'
    );
  END IF;
END $$; 