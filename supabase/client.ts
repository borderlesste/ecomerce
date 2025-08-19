import { createClient } from '@supabase/supabase-js';

// Asegúrate de configurar estas variables de entorno en tu entorno de desarrollo/producción
const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_ANON_KEY!;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Supabase URL and Key must be provided in environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseKey);
