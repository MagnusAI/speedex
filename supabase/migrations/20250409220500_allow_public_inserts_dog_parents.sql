-- Enable RLS
ALTER TABLE dog_parents ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts
CREATE POLICY "Allow public inserts on dog_parents" ON dog_parents
  FOR INSERT TO public
  WITH CHECK (true);

-- Create policy to allow public reads
CREATE POLICY "Allow public reads on dog_parents" ON dog_parents
  FOR SELECT TO public
  USING (true); 