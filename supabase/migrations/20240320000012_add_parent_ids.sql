-- Add father_id and mother_id columns to dogs table
ALTER TABLE dogs
ADD COLUMN IF NOT EXISTS father_id UUID REFERENCES dogs(id),
ADD COLUMN IF NOT EXISTS mother_id UUID REFERENCES dogs(id);

-- Add comments to explain the fields
COMMENT ON COLUMN dogs.father_id IS 'Reference to the father dog''s ID';
COMMENT ON COLUMN dogs.mother_id IS 'Reference to the mother dog''s ID';

-- Add indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_dogs_father_id ON dogs(father_id);
CREATE INDEX IF NOT EXISTS idx_dogs_mother_id ON dogs(mother_id); 