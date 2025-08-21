-- Fix the security definer view issue by recreating without SECURITY DEFINER
DROP VIEW IF EXISTS public.public_feedbacks;

-- Create the view without SECURITY DEFINER (will use SECURITY INVOKER by default)
CREATE VIEW public.public_feedbacks AS
SELECT 
  id,
  rating,
  feedback,
  project_title,
  created_at,
  -- Sanitize client name to only show first name and last initial
  CASE 
    WHEN client_name IS NOT NULL AND client_name != '' THEN
      SPLIT_PART(client_name, ' ', 1) || ' ' || 
      CASE 
        WHEN LENGTH(SPLIT_PART(client_name, ' ', 2)) > 0 THEN 
          LEFT(SPLIT_PART(client_name, ' ', 2), 1) || '.'
        ELSE ''
      END
    ELSE 'Anonymous'
  END as client_name_sanitized
FROM public.client_feedbacks;

-- Grant public access to the sanitized view
GRANT SELECT ON public.public_feedbacks TO anon;
GRANT SELECT ON public.public_feedbacks TO authenticated;

-- Fix function search path mutable issue for existing functions
ALTER FUNCTION public.get_current_user_role() SET search_path = public;