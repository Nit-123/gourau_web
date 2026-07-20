# SQL Script to set up database tables in your Supabase SQL Editor:
# Copy and run the following in the SQL Editor on your Supabase dashboard:

CREATE TABLE IF NOT EXISTS public.site_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text,
  updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;

-- Create policies allowing everyone to read and write without authentication (for simplification)
CREATE POLICY "Allow public read content" ON public.site_content FOR SELECT USING (true);
CREATE POLICY "Allow public insert content" ON public.site_content FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update content" ON public.site_content FOR UPDATE USING (true);
CREATE POLICY "Allow public delete content" ON public.site_content FOR DELETE USING (true);
