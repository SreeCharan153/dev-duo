-- Drop the overly permissive public read policy
DROP POLICY IF EXISTS "Feedbacks are publicly readable" ON public.client_feedbacks;

-- Create a new policy that allows public access but only to non-sensitive fields
-- We'll create a view for public access instead
CREATE OR REPLACE VIEW public.public_feedbacks AS
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

-- Add RLS policy for the original table - only admins can read full data
CREATE POLICY "Only admins can read full feedback data" 
ON public.client_feedbacks 
FOR SELECT 
USING (get_current_user_role() = ANY (ARRAY['admin'::text, 'founder'::text]));