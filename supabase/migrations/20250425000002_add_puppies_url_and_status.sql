-- Add URL and status fields to puppies_settings table
ALTER TABLE public.puppies_settings 
ADD COLUMN IF NOT EXISTS url TEXT,
ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';

-- Insert default settings for the new fields
INSERT INTO public.puppies_settings (setting_key, setting_value, description)
VALUES 
    ('puppy_listing_url', '', 'URL to external puppy listing (e.g., DKK hvalpeliste)'),
    ('display_status', 'active', 'Controls visibility of puppies section: active, inactive, or hidden')
ON CONFLICT (setting_key) DO NOTHING;

-- Add comments for the new columns
COMMENT ON COLUMN public.puppies_settings.url IS 'Optional URL field for external links (e.g., DKK hvalpeliste when puppies are available)';
COMMENT ON COLUMN public.puppies_settings.status IS 'Status field for controlling component behavior and visibility';

-- Update the description of the table to reflect new functionality
COMMENT ON TABLE public.puppies_settings IS 'Table for storing puppies-related settings including expected dates, external URLs, and display status'; 