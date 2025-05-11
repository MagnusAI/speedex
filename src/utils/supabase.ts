import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

console.log('[Supabase] Initializing client with URL:', supabaseUrl);

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
  },
  db: {
    schema: 'public',
  }
});

// Test the connection
supabase.from('dogs').select('*').limit(1)
  .then(({ error }) => {
    if (error) {
      console.error('[Supabase] Connection test failed:', error);
    } else {
      console.log('[Supabase] Connection test successful');
    }
  }); 