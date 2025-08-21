-- Check current user authentication and role
SELECT 
  auth.uid() as current_user_id,
  get_current_user_role() as current_role
FROM profiles 
WHERE user_id = auth.uid()
LIMIT 1;

-- Fix RLS policies for projects table to allow any authenticated admin
DROP POLICY IF EXISTS "Only admins can insert projects" ON public.projects;
CREATE POLICY "Only admins can insert projects" 
ON public.projects 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'founder')
  )
);

DROP POLICY IF EXISTS "Only admins can update projects" ON public.projects;
CREATE POLICY "Only admins can update projects" 
ON public.projects 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'founder')
  )
);

DROP POLICY IF EXISTS "Only admins can delete projects" ON public.projects;
CREATE POLICY "Only admins can delete projects" 
ON public.projects 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'founder')
  )
);

-- Fix RLS policies for client_feedbacks table
DROP POLICY IF EXISTS "Only admins can insert feedbacks" ON public.client_feedbacks;
CREATE POLICY "Only admins can insert feedbacks" 
ON public.client_feedbacks 
FOR INSERT 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'founder')
  )
);

DROP POLICY IF EXISTS "Only admins can update feedbacks" ON public.client_feedbacks;
CREATE POLICY "Only admins can update feedbacks" 
ON public.client_feedbacks 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'founder')
  )
);

DROP POLICY IF EXISTS "Only admins can delete feedbacks" ON public.client_feedbacks;
CREATE POLICY "Only admins can delete feedbacks" 
ON public.client_feedbacks 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'founder')
  )
);

DROP POLICY IF EXISTS "Only admins can read full feedback data" ON public.client_feedbacks;
CREATE POLICY "Only admins can read full feedback data" 
ON public.client_feedbacks 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'founder')
  )
);