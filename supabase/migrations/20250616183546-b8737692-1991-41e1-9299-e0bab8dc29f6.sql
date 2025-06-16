
-- Add subject column to registrations table
ALTER TABLE public.registrations 
ADD COLUMN subject TEXT;

-- Create index for better performance on subject queries
CREATE INDEX idx_registrations_subject ON public.registrations(subject);

-- Update the existing teachers column to be nullable since we're changing its purpose
-- (keeping it for now to avoid breaking existing data, but it will be unused)
