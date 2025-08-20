
import type { Session, User } from '@supabase/supabase-js';
import type { Database } from '../supabase/client';

export type Product = Database['public']['Tables']['products']['Row'];

export interface CartItem extends Product {
  quantity: number;
}

export interface FilterOptions {
  [key: string]: string[];
}

export interface HomePageContent {
  bannerTitle: string;
  bannerSubtitle: string;
  newProductIds: string[];
  popularProductIds: string[];
}

export type OrderItem = Database['public']['Tables']['order_items']['Row'] & {
  products: Product | null;
};

export type Order = Database['public']['Tables']['orders']['Row'] & {
  order_items: OrderItem[];
};


export type { Session, User };