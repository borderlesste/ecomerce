export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  category: 'Perfume' | 'Cabello' | 'Ropa';
  audience: 'Mujer' | 'Hombre' | 'Niño' | 'Niña';
  tags: string[];
  description: string;
  ingredients: string[];
  stock: number;
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