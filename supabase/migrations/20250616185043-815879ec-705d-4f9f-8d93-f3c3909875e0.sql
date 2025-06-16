
-- First, remove the overly permissive policy that allows public read access
DROP POLICY IF EXISTS "Enable read for registration confirmation" ON public.registrations;

-- Create user roles table for proper admin management
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Enable RLS on user_roles table
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check user roles (prevents RLS recursion)
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM public.user_roles
        WHERE user_id = _user_id AND role = _role
    )
$$;

-- Create function to get current user role
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS app_role
LANGUAGE SQL
STABLE
SECURITY DEFINER
AS $$
    SELECT role 
    FROM public.user_roles 
    WHERE user_id = auth.uid() 
    LIMIT 1
$$;

-- Update registrations policies to be more secure
DROP POLICY IF EXISTS "Enable insert for all users" ON public.registrations;

-- Allow public registration (insert only)
CREATE POLICY "Allow public registration" 
    ON public.registrations 
    FOR INSERT 
    WITH CHECK (true);

-- Only allow admins to read registration data
CREATE POLICY "Admins can view all registrations" 
    ON public.registrations 
    FOR SELECT 
    USING (public.has_role(auth.uid(), 'admin'));

-- Allow users to read only their own registration for confirmation
CREATE POLICY "Users can view own registration" 
    ON public.registrations 
    FOR SELECT 
    USING (auth.uid() IS NOT NULL AND email = (SELECT email FROM auth.users WHERE id = auth.uid()));

-- User roles policies
CREATE POLICY "Users can view their own roles" 
    ON public.user_roles 
    FOR SELECT 
    USING (user_id = auth.uid());

CREATE POLICY "Admins can manage all roles" 
    ON public.user_roles 
    FOR ALL 
    USING (public.has_role(auth.uid(), 'admin'));

-- Create indexes for performance
CREATE INDEX idx_user_roles_user_id ON public.user_roles(user_id);
CREATE INDEX idx_user_roles_role ON public.user_roles(role);

-- Insert a default admin user (you'll need to update this with your actual admin user ID after creating an account)
-- This is a placeholder - you should replace the UUID with your actual admin user ID
-- INSERT INTO public.user_roles (user_id, role) 
-- VALUES ('00000000-0000-0000-0000-000000000000', 'admin');
