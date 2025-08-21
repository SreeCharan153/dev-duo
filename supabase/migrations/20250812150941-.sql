-- The issue is that we still have a view that bypasses RLS. 
-- Instead, let's create a function that returns sanitized data and use it in the frontend
DROP VIEW IF EXISTS public.public_feedbacks;

-- Create a function that returns sanitized feedback data
CREATE OR REPLACE FUNCTION public.get_public_feedbacks()
RETURNS TABLE (
  id uuid,
  rating integer,
  feedback text,
  project_title text,
  created_at timestamp with time zone,
  client_name_sanitized text
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT 
    cf.id,
    cf.rating,
    cf.feedback,
    cf.project_title,
    cf.created_at,
    -- Sanitize client name to only show first name and last initial
    CASE 
      WHEN cf.client_name IS NOT NULL AND cf.client_name != '' THEN
        SPLIT_PART(cf.client_name, ' ', 1) || ' ' || 
        CASE 
          WHEN LENGTH(SPLIT_PART(cf.client_name, ' ', 2)) > 0 THEN 
            LEFT(SPLIT_PART(cf.client_name, ' ', 2), 1) || '.'
          ELSE ''
        END
      ELSE 'Anonymous'
    END as client_name_sanitized
  FROM public.client_feedbacks cf
$$;

-- Grant execute permission to public
GRANT EXECUTE ON FUNCTION public.get_public_feedbacks() TO anon;
GRANT EXECUTE ON FUNCTION public.get_public_feedbacks() TO authenticated;