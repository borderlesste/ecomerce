import type { Session, User } from '@supabase/supabase-js';

export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  sale_price?: number;
  rating_average: number;
  review_count: number;
  image_url: string;
  category: 'Perfume' | 'Cabello' | 'Ropa';
  audience: 'Mujer' | 'Hombre' | 'Niño' | 'Niña';
  tags: string[];
  description: string;
  ingredients: string[];
  stock: number;
  created_at?: string;
}

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

export type { Session, User };