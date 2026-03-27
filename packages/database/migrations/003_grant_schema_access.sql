-- Grant access to the website schema for Supabase API roles
GRANT USAGE ON SCHEMA website TO anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA website TO anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA website TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA website GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA website GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;
