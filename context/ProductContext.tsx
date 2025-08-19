
import React, { createContext, useState, ReactNode } from 'react';
import { Product, HomePageContent } from '../types';
import { mockProducts } from '../data/products';

interface ProductContextType {
  products: Product[];
  homePageContent: HomePageContent;
  addProduct: (product: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (productId: string) => void;
  updateHomePageContent: (content: HomePageContent) => void;
}

export const ProductContext = createContext<ProductContextType>({} as ProductContextType);

const initialHomePageContent: HomePageContent = {
    bannerTitle: 'Belleza Auténtica',
    bannerSubtitle: 'Descubre nuestra colección premium de perfumes, productos para el cabello y cosméticos de las mejores marcas del mundo.',
    newProductIds: ['p1', 'h1', 'c1', 'h2'],
    popularProductIds: ['p3', 'h3', 'c2', 'c3'],
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [homePageContent, setHomePageContent] = useState<HomePageContent>(initialHomePageContent);

  const addProduct = (product: Omit<Product, 'id' | 'rating' | 'reviewCount'>) => {
    const newProduct: Product = {
      ...product,
      id: `new_${Date.now()}`,
      rating: 0,
      reviewCount: 0,
    };
    setProducts(prevProducts => [newProduct, ...prevProducts]);
  };

  const updateProduct = (updatedProduct: Product) => {
    setProducts(prevProducts => 
      prevProducts.map(p => p.id === updatedProduct.id ? updatedProduct : p)
    );
  };

  const deleteProduct = (productId: string) => {
    setProducts(prevProducts => prevProducts.filter(p => p.id !== productId));
    // Also remove from featured lists
    setHomePageContent(prevContent => ({
      ...prevContent,
      newProductIds: prevContent.newProductIds.filter(id => id !== productId),
      popularProductIds: prevContent.popularProductIds.filter(id => id !== productId),
    }));
  };
  
  const updateHomePageContent = (content: HomePageContent) => {
    setHomePageContent(content);
  };

  return (
    <ProductContext.Provider value={{ products, homePageContent, addProduct, updateProduct, deleteProduct, updateHomePageContent }}>
      {children}
    </ProductContext.Provider>
  );
};