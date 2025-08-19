import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabaseClient: any;

export let isSupabaseConfigured = false;

if (supabaseUrl && supabaseKey) {
  supabaseClient = createClient(supabaseUrl, supabaseKey);
  isSupabaseConfigured = true;
} else {
  // This will be logged in the developer console for the user to see.
  console.warn("*****************************************************************");
  console.warn("ADVERTENCIA: Las variables de entorno de Supabase no están configuradas.");
  console.warn("La aplicación no se conectará a una base de datos.");
  console.warn("Para solucionarlo, configure SUPABASE_URL y SUPABASE_ANON_KEY.");
  console.warn("*****************************************************************");
  
  const mockError = { 
    message: `Supabase no está configurado. Por favor, configure las variables de entorno SUPABASE_URL y SUPABASE_ANON_KEY.`
  };
  
  // This mock will intercept any method calls on the query builder (like .select, .order, etc.)
  // and return a promise that resolves to empty data. This prevents the app from crashing.
  const mockPromise = Promise.resolve({ data: [], error: null });
  const mockQueryBuilder = new Proxy({}, {
    get() {
      return () => mockPromise;
    }
  });
  
  supabaseClient = {
    from: () => mockQueryBuilder,
    auth: {
      getSession: () => Promise.resolve({ data: { session: null }, error: null }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      signUp: () => Promise.resolve({ data: { user: null, session: null }, error: mockError }),
      signInWithPassword: () => Promise.resolve({ data: { user: null, session: null }, error: mockError }),
      signOut: () => Promise.resolve({ error: null }),
    },
  };
}

export const supabase = supabaseClient;
