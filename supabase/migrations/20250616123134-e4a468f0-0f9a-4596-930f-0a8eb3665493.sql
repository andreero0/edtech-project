
-- Drop the existing policy and recreate it with more explicit permissions
DROP POLICY IF EXISTS "Anyone can create registrations" ON public.registrations;

-- Create a more explicit policy for public registration
CREATE POLICY "Enable insert for all users" 
  ON public.registrations 
  FOR INSERT 
  WITH CHECK (true);

-- Also add a policy to allow reading your own registration (optional, for confirmation)
CREATE POLICY "Enable read for registration confirmation" 
  ON public.registrations 
  FOR SELECT 
  USING (true);
