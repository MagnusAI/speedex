-- Add insert policy for authenticated users
CREATE POLICY "Allow authenticated users to insert dogs"
ON public.dogs
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Add update policy for authenticated users
CREATE POLICY "Allow authenticated users to update dogs"
ON public.dogs
FOR UPDATE
TO authenticated
USING (true);

-- Add delete policy for authenticated users
CREATE POLICY "Allow authenticated users to delete dogs"
ON public.dogs
FOR DELETE
TO authenticated
USING (true);

-- Add comments
COMMENT ON POLICY "Allow authenticated users to insert dogs" ON public.dogs IS 'Allows authenticated users to add new dogs';
COMMENT ON POLICY "Allow authenticated users to update dogs" ON public.dogs IS 'Allows authenticated users to update existing dogs';
COMMENT ON POLICY "Allow authenticated users to delete dogs" ON public.dogs IS 'Allows authenticated users to delete dogs'; 