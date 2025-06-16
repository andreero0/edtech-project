
-- Create a table for registration form submissions
CREATE TABLE public.registrations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  school TEXT NOT NULL,
  role TEXT NOT NULL,
  teachers INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) - making it public for registration purposes
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;

-- Create policy that allows anyone to insert registrations (public form)
CREATE POLICY "Anyone can create registrations" 
  ON public.registrations 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy for reading registrations (admin only - you can modify this later)
CREATE POLICY "Admin can view registrations" 
  ON public.registrations 
  FOR SELECT 
  USING (false); -- Change this to your admin logic later

-- Add an index for better performance on email queries
CREATE INDEX idx_registrations_email ON public.registrations(email);
CREATE INDEX idx_registrations_created_at ON public.registrations(created_at DESC);
