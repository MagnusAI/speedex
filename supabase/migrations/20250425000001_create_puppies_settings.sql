-- Create puppies settings table for managing puppy-related configurations
CREATE TABLE IF NOT EXISTS public.puppies_settings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    setting_key TEXT UNIQUE NOT NULL,
    setting_value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create index for better query performance
CREATE INDEX idx_puppies_settings_key ON puppies_settings(setting_key);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION public.handle_puppies_settings_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER handle_puppies_settings_updated_at
    BEFORE UPDATE ON public.puppies_settings
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_puppies_settings_updated_at();

-- Enable Row Level Security
ALTER TABLE public.puppies_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Enable read access for all users" ON public.puppies_settings
    FOR SELECT
    TO authenticated, anon
    USING (true);

CREATE POLICY "Enable insert for authenticated users" ON public.puppies_settings
    FOR INSERT
    TO authenticated
    WITH CHECK (true);

CREATE POLICY "Enable update for authenticated users" ON public.puppies_settings
    FOR UPDATE
    TO authenticated
    USING (true)
    WITH CHECK (true);

CREATE POLICY "Enable delete for authenticated users" ON public.puppies_settings
    FOR DELETE
    TO authenticated
    USING (true);

-- Insert default setting for next expected puppies date
INSERT INTO public.puppies_settings (setting_key, setting_value, description)
VALUES (
    'next_expected_date',
    '2025-06-01',
    'Expected date for next litter of puppies (YYYY-MM-DD format)'
) ON CONFLICT (setting_key) DO NOTHING;

-- Add comments
COMMENT ON TABLE public.puppies_settings IS 'Table for storing puppies-related settings and configurations';
COMMENT ON COLUMN public.puppies_settings.id IS 'Unique identifier for the setting';
COMMENT ON COLUMN public.puppies_settings.setting_key IS 'Unique key for the setting (e.g., next_expected_date)';
COMMENT ON COLUMN public.puppies_settings.setting_value IS 'Value of the setting';
COMMENT ON COLUMN public.puppies_settings.description IS 'Description of what this setting controls';
COMMENT ON COLUMN public.puppies_settings.created_at IS 'Timestamp when the setting was created';
COMMENT ON COLUMN public.puppies_settings.updated_at IS 'Timestamp when the setting was last updated';

COMMENT ON POLICY "Enable read access for all users" ON public.puppies_settings IS 'Allows all users to read puppies settings';
COMMENT ON POLICY "Enable insert for authenticated users" ON public.puppies_settings IS 'Allows authenticated users to create new settings';
COMMENT ON POLICY "Enable update for authenticated users" ON public.puppies_settings IS 'Allows authenticated users to update settings';
COMMENT ON POLICY "Enable delete for authenticated users" ON public.puppies_settings IS 'Allows authenticated users to delete settings'; 