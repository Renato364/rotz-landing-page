import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if variables are missing or still placeholders
const isConfigured = 
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseUrl !== 'https://your-project-url.supabase.co' &&
  supabaseAnonKey !== 'your-anon-key';

export const supabase = isConfigured ? createClient(supabaseUrl, supabaseAnonKey) : null;
