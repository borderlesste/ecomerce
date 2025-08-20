import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Define types to match the database schema and provide type safety
export type Database = {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          created_at: string;
          name: string;
          brand: string;
          price: number;
          sale_price: number | null;
          rating_average: number;
          review_count: number;
          image_url: string;
          category: 'Perfume' | 'Cabello' | 'Ropa';
          audience: 'Mujer' | 'Hombre' | 'Niño' | 'Niña';
          tags: string[];
          description: string;
          ingredients: string[];
          stock: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          name: string;
          brand: string;
          price: number;
          sale_price?: number | null;
          rating_average?: number;
          review_count?: number;
          image_url: string;
          category: 'Perfume' | 'Cabello' | 'Ropa';
          audience: 'Mujer' | 'Hombre' | 'Niño' | 'Niña';
          tags: string[];
          description: string;
          ingredients: string[];
          stock: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          name?: string;
          brand?: string;
          price?: number;
          sale_price?: number | null;
          rating_average?: number;
          review_count?: number;
          image_url?: string;
          category?: 'Perfume' | 'Cabello' | 'Ropa';
          audience?: 'Mujer' | 'Hombre' | 'Niño' | 'Niña';
          tags?: string[];
          description?: string;
          ingredients?: string[];
          stock?: number;
        };
      };
      orders: {
        Row: {
          id: string;
          created_at: string;
          user_id: string;
          total: number;
          status: 'PENDING' | 'PAID' | 'FAILED';
          paypal_order_id: string | null;
          shipping_info: { [key: string]: any } | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          user_id: string;
          total: number;
          status?: 'PENDING' | 'PAID' | 'FAILED';
          paypal_order_id?: string | null;
          shipping_info?: { [key: string]: any } | null;
        };
        Update: {
          status?: 'PENDING' | 'PAID' | 'FAILED';
          paypal_order_id?: string | null;
        };
      };
      order_items: {
        Row: {
          id: number;
          created_at: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Insert: {
          id?: number;
          created_at?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Update: {};
      };
      payments: {
        Row: {
            id: number;
            created_at: string;
            order_id: string;
            paypal_transaction_id: string;
            amount: number;
            currency: string;
        };
        Insert: {
            id?: number;
            created_at?: string;
            order_id: string;
            paypal_transaction_id: string;
            amount: number;
            currency: string;
        };
        Update: {};
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// NOTE: Using hardcoded keys for this interactive environment.
// In a production app, these should be loaded from secure environment variables.
const supabaseUrl = 'https://addkslxiwlluqskpwzuz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFkZGtzbHhpd2xsdXFza3B3enV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU2MzQ0MjUsImV4cCI6MjA3MTIxMDQyNX0.fVJsd0SHaiJDSGeSyg4b--ZTF1430Jq_swxxoFiKjS4';

export const supabase: SupabaseClient<Database> = createClient<Database>(supabaseUrl, supabaseKey);

// This will now always be true since the keys are hardcoded.
export const isSupabaseConfigured = !!(supabaseUrl && supabaseKey);