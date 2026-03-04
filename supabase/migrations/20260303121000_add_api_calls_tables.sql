-- API call providers for dynamic vendor configurations
CREATE TABLE public.api_call_providers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  vendor_id TEXT NOT NULL DEFAULT 'custom',
  name TEXT NOT NULL,
  base_url TEXT NOT NULL,
  api_key TEXT NOT NULL,
  auth_mode TEXT NOT NULL DEFAULT 'bearer',
  auth_header_name TEXT,
  enabled BOOLEAN NOT NULL DEFAULT true,
  sort_order INTEGER NOT NULL DEFAULT 0,
  request_schema JSONB NOT NULL DEFAULT '[]'::jsonb,
  defaults JSONB NOT NULL DEFAULT '{}'::jsonb,
  favorite_models JSONB NOT NULL DEFAULT '[]'::jsonb,
  sample_snippets JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.api_call_providers ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_api_call_providers_updated_at
BEFORE UPDATE ON public.api_call_providers
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

CREATE INDEX idx_api_call_providers_user_order
ON public.api_call_providers (user_id, sort_order, created_at DESC);

CREATE POLICY "Users can view own api_call_providers"
  ON public.api_call_providers
  FOR SELECT
  TO authenticated
  USING (public.is_owner(user_id));

CREATE POLICY "Users can insert own api_call_providers"
  ON public.api_call_providers
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own api_call_providers"
  ON public.api_call_providers
  FOR UPDATE
  TO authenticated
  USING (public.is_owner(user_id));

CREATE POLICY "Users can delete own api_call_providers"
  ON public.api_call_providers
  FOR DELETE
  TO authenticated
  USING (public.is_owner(user_id));

-- API call history with masked request/response snapshots
CREATE TABLE public.api_call_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  provider_id UUID NOT NULL REFERENCES public.api_call_providers(id) ON DELETE CASCADE,
  request_mode TEXT NOT NULL DEFAULT 'chat',
  selected_model TEXT,
  request_snapshot JSONB NOT NULL DEFAULT '{}'::jsonb,
  response_status INTEGER,
  latency_ms INTEGER,
  success BOOLEAN NOT NULL DEFAULT false,
  response_snapshot TEXT,
  error_message TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.api_call_history ENABLE ROW LEVEL SECURITY;

CREATE INDEX idx_api_call_history_user_created
ON public.api_call_history (user_id, created_at DESC);

CREATE INDEX idx_api_call_history_provider_created
ON public.api_call_history (provider_id, created_at DESC);

CREATE POLICY "Users can view own api_call_history"
  ON public.api_call_history
  FOR SELECT
  TO authenticated
  USING (public.is_owner(user_id));

CREATE POLICY "Users can insert own api_call_history"
  ON public.api_call_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own api_call_history"
  ON public.api_call_history
  FOR DELETE
  TO authenticated
  USING (public.is_owner(user_id));

-- Optional cleanup helper, can be called by cron or manual admin SQL
CREATE OR REPLACE FUNCTION public.cleanup_api_call_history(retention_days INTEGER DEFAULT 30)
RETURNS INTEGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  deleted_count INTEGER := 0;
BEGIN
  DELETE FROM public.api_call_history
  WHERE created_at < now() - make_interval(days => retention_days);

  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$;
