
-- Role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Helper: check ownership
CREATE OR REPLACE FUNCTION public.is_owner(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT auth.uid() = _user_id
$$;

-- ==================== TABLES ====================

-- User Roles (created FIRST so has_role can reference it)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- NOW create has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- Profiles
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, COALESCE(NEW.raw_user_meta_data->>'display_name', NEW.email));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Providers
CREATE TABLE public.providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  provider_type TEXT NOT NULL DEFAULT 'custom',
  api_key TEXT,
  base_url TEXT,
  endpoints JSONB DEFAULT '[]'::jsonb,
  model_config JSONB DEFAULT '{}'::jsonb,
  sort_order INTEGER NOT NULL DEFAULT 0,
  app_type TEXT NOT NULL DEFAULT 'claude',
  enabled BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.providers ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_providers_updated_at BEFORE UPDATE ON public.providers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- MCP Servers
CREATE TABLE public.mcp_servers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  transport_type TEXT NOT NULL DEFAULT 'stdio',
  command TEXT,
  args JSONB DEFAULT '[]'::jsonb,
  url TEXT,
  env JSONB DEFAULT '{}'::jsonb,
  enabled BOOLEAN NOT NULL DEFAULT true,
  app_bindings JSONB DEFAULT '["claude"]'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.mcp_servers ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_mcp_servers_updated_at BEFORE UPDATE ON public.mcp_servers
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Skills Repos
CREATE TABLE public.skills_repos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  owner TEXT NOT NULL,
  repo TEXT NOT NULL,
  branch TEXT NOT NULL DEFAULT 'main',
  subdirectory TEXT DEFAULT '',
  is_default BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.skills_repos ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_skills_repos_updated_at BEFORE UPDATE ON public.skills_repos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Skills
CREATE TABLE public.skills (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  repo_id UUID NOT NULL REFERENCES public.skills_repos(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  installed BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_skills_updated_at BEFORE UPDATE ON public.skills
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Prompts
CREATE TABLE public.prompts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  content TEXT DEFAULT '',
  target_file TEXT NOT NULL DEFAULT 'CLAUDE.md',
  is_active BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.prompts ENABLE ROW LEVEL SECURITY;
CREATE TRIGGER update_prompts_updated_at BEFORE UPDATE ON public.prompts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ==================== RLS POLICIES ====================

-- Profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT TO authenticated USING (public.is_owner(user_id));
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE TO authenticated USING (public.is_owner(user_id));
CREATE POLICY "Users can delete own profile" ON public.profiles FOR DELETE TO authenticated USING (public.is_owner(user_id));

-- User Roles
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT TO authenticated USING (public.is_owner(user_id));
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Providers
CREATE POLICY "Users can view own providers" ON public.providers FOR SELECT TO authenticated USING (public.is_owner(user_id));
CREATE POLICY "Users can insert own providers" ON public.providers FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own providers" ON public.providers FOR UPDATE TO authenticated USING (public.is_owner(user_id));
CREATE POLICY "Users can delete own providers" ON public.providers FOR DELETE TO authenticated USING (public.is_owner(user_id));

-- MCP Servers
CREATE POLICY "Users can view own mcp_servers" ON public.mcp_servers FOR SELECT TO authenticated USING (public.is_owner(user_id));
CREATE POLICY "Users can insert own mcp_servers" ON public.mcp_servers FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own mcp_servers" ON public.mcp_servers FOR UPDATE TO authenticated USING (public.is_owner(user_id));
CREATE POLICY "Users can delete own mcp_servers" ON public.mcp_servers FOR DELETE TO authenticated USING (public.is_owner(user_id));

-- Skills Repos
CREATE POLICY "Users can view own skills_repos" ON public.skills_repos FOR SELECT TO authenticated USING (public.is_owner(user_id));
CREATE POLICY "Users can insert own skills_repos" ON public.skills_repos FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own skills_repos" ON public.skills_repos FOR UPDATE TO authenticated USING (public.is_owner(user_id));
CREATE POLICY "Users can delete own skills_repos" ON public.skills_repos FOR DELETE TO authenticated USING (public.is_owner(user_id));

-- Skills
CREATE POLICY "Users can view own skills" ON public.skills FOR SELECT TO authenticated USING (public.is_owner(user_id));
CREATE POLICY "Users can insert own skills" ON public.skills FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own skills" ON public.skills FOR UPDATE TO authenticated USING (public.is_owner(user_id));
CREATE POLICY "Users can delete own skills" ON public.skills FOR DELETE TO authenticated USING (public.is_owner(user_id));

-- Prompts
CREATE POLICY "Users can view own prompts" ON public.prompts FOR SELECT TO authenticated USING (public.is_owner(user_id));
CREATE POLICY "Users can insert own prompts" ON public.prompts FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own prompts" ON public.prompts FOR UPDATE TO authenticated USING (public.is_owner(user_id));
CREATE POLICY "Users can delete own prompts" ON public.prompts FOR DELETE TO authenticated USING (public.is_owner(user_id));
