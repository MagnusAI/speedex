-- Enable RLS
ALTER TABLE dog_achievements ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public inserts
CREATE POLICY "Allow public inserts on dog_achievements" ON dog_achievements
  FOR INSERT TO public
  WITH CHECK (true);

-- Create policy to allow public reads
CREATE POLICY "Allow public reads on dog_achievements" ON dog_achievements
  FOR SELECT TO public
  USING (true); 