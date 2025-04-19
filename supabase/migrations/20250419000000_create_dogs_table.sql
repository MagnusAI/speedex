-- Create dogs table
CREATE TABLE IF NOT EXISTS public.dogs (
    id TEXT PRIMARY KEY,  -- Official registration ID
    name TEXT NOT NULL,
    nickname TEXT,
    breed TEXT NOT NULL,
    image TEXT NOT NULL,
    breeder TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_dogs_updated_at
    BEFORE UPDATE ON public.dogs
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- Enable Row Level Security
ALTER TABLE public.dogs ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON public.dogs
    FOR SELECT
    TO authenticated, anon
    USING (true);

-- Add comments
COMMENT ON TABLE public.dogs IS 'Table storing information about dogs';
COMMENT ON COLUMN public.dogs.id IS 'Official registration ID of the dog';
COMMENT ON COLUMN public.dogs.name IS 'Official name of the dog';
COMMENT ON COLUMN public.dogs.nickname IS 'Optional nickname for the dog';
COMMENT ON COLUMN public.dogs.breed IS 'Breed of the dog';
COMMENT ON COLUMN public.dogs.image IS 'URL to the dog''s image';
COMMENT ON COLUMN public.dogs.breeder IS 'Name of the breeder';
COMMENT ON COLUMN public.dogs.created_at IS 'Timestamp when the record was created';
COMMENT ON COLUMN public.dogs.updated_at IS 'Timestamp when the record was last updated'; 