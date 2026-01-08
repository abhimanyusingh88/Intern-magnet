import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Debug: Check if credentials are loaded
if (!serviceRoleKey || serviceRoleKey.length < 20) {
  console.error('❌ SUPABASE_SERVICE_ROLE_KEY is missing or invalid!');
  console.error('Key length:', serviceRoleKey?.length || 0);
} else {
  console.log('✅ Supabase admin client initialized');
  console.log('Key preview:', serviceRoleKey.substring(0, 10) + '...' + serviceRoleKey.substring(serviceRoleKey.length - 10));
}

export const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey)
