-- Add RLS policies for contact_messages table to allow admin operations

-- Allow admins to delete contact messages
CREATE POLICY "Only admins can delete contact messages" 
ON public.contact_messages 
FOR DELETE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'founder')
  )
);

-- Allow admins to update contact messages (for status changes)
CREATE POLICY "Only admins can update contact messages" 
ON public.contact_messages 
FOR UPDATE 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'founder')
  )
);

-- Allow admins to read all contact messages
CREATE POLICY "Only admins can read contact messages" 
ON public.contact_messages 
FOR SELECT 
USING (
  EXISTS (
    SELECT 1 FROM public.profiles 
    WHERE user_id = auth.uid() 
    AND role IN ('admin', 'founder')
  )
);
