-- Create profiles table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.profiles (
  id uuid DEFAULT auth.uid() PRIMARY KEY,
  email text,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  content text NOT NULL,
  excerpt text,
  featured_image text,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  published_at timestamptz,
  author_id uuid REFERENCES public.profiles(id) ON DELETE CASCADE
);

-- Create user_roles table
CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin', 'editor', 'user')),
  created_at timestamptz DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

-- Create user_roles policies
CREATE POLICY "User roles are viewable by everyone"
  ON public.user_roles FOR SELECT
  USING (true);

CREATE POLICY "User roles are insertable by admin users only"
  ON public.user_roles FOR INSERT
  WITH CHECK (
    auth.uid() IN (
      SELECT user_id FROM public.user_roles WHERE role = 'admin'
    )
  );

-- Create blog posts policies
CREATE POLICY "Published posts are viewable by everyone"
  ON public.blog_posts FOR SELECT
  USING (published = true);

CREATE POLICY "Posts are editable by admin users"
  ON public.blog_posts FOR ALL
  USING (
    auth.uid() IN (
      SELECT user_id FROM public.user_roles WHERE role = 'admin'
    )
  );

-- Create a default profile for the system
INSERT INTO public.profiles (id, email, full_name, avatar_url)
VALUES (
  '00000000-0000-0000-0000-000000000000',
  'system@example.com',
  'System',
  'https://picsum.photos/200'
) ON CONFLICT (id) DO NOTHING;

-- Create some sample blog posts
INSERT INTO public.blog_posts (title, slug, content, excerpt, published, published_at, author_id)
VALUES 
(
  'Welcome to Our Blog',
  'welcome-to-our-blog',
  'We are excited to launch our new blog where we will share insights about technology, innovation, and digital transformation. Stay tuned for regular updates!',
  'Welcome to our new blog. We are excited to share our journey with you.',
  true,
  now(),
  '00000000-0000-0000-0000-000000000000'
),
(
  'The Future of Web Development',
  'future-of-web-development',
  'The web development landscape is constantly evolving. In this post, we explore upcoming trends and technologies that will shape the future of web development.',
  'Exploring the latest trends and technologies in web development.',
  true,
  now(),
  '00000000-0000-0000-0000-000000000000'
);

-- Create function to handle profile updates
CREATE OR REPLACE FUNCTION public.handle_profile_updates()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for profile updates
CREATE TRIGGER on_profile_updated
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_profile_updates(); 