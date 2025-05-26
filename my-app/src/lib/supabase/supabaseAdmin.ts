import { createClient } from '@supabase/supabase-js';

// Security Note:
// Only import this file in server components or API routes.
// Importing in client components could potentially leak the admin key

// Only Admin account can access this file
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error(
    'Supabase管理者用の環境変数を設定してください'
  );
}

// Server-side client with admin privileges
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});