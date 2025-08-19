import { createClient } from '@supabase/supabase-js';

// NOTE: Using hardcoded keys for this interactive environment.
// In a production app, these should be loaded from secure environment variables.
const supabaseUrl = 'https://addkslxiwlluqskpwzuz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZGtzbHhpd2xsdXFza3B3enV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MzQ0MjUsImV4cCI6MjA3MTIxMDQyNX0.fVJsd0SHaiJDSGeSyg4b--ZTF1430Jq_swxxoFiKjS4';

export const supabase = createClient(supabaseUrl, supabaseKey);

// This will now always be true since the keys are hardcoded.
export const isSupabaseConfigured = !!(supabaseUrl && supabaseKey);
