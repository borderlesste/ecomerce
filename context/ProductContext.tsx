
import React, { createContext, useState, ReactNode, useEffect } from 'react';
import { Product, HomePageContent } from '../types';
import { supabase } from '../supabase/client';

interface ProductContextType {
  products: Product[];
  loading: boolean;
  homePageContent: HomePageContent;
  addProduct: (product: Omit<Product, 'id' | 'created_at' | 'rating_average' | 'review_count'>) => Promise<void>;
  updateProduct: (product: Product) => Promise<void>;
  deleteProduct: (productId: string) => Promise<void>;
  updateHomePageContent: (content: HomePageContent) => void;
}

export const ProductContext = createContext<ProductContextType>({} as ProductContextType);

const initialHomePageContent: HomePageContent = {
    bannerTitle: 'Belleza Auténtica',
    bannerSubtitle: 'Descubre nuestra colección premium de perfumes, productos para el cabello y cosméticos de las mejores marcas del mundo.',
    newProductIds: ['a8e1b21c-3b9a-4b0d-8f3a-3c2b1a8d7e6f', 'e3i5f65g-7f5e-4f4h-3j7e-7g6f5e3h2i1j', 'i7m9j19k-2j1i-4j8l-7n2i-2k1j9i7l6m5n', 'f4j6g76h-8g4f-4g5i-4k8f-8h7g6f4i3j2k'],
    popularProductIds: ['c1g3d43e-5d7c-4d2f-1h5c-5e4d3c1f9g8h', 'g5k7h87i-9h3g-4h6j-5l9g-9i8h7g5j4k3l', 'j8n1k21l-3k9j-4k9m-8o3j-3l2k1j8m7n6o', 'k9o2l32m-4l8k-4l1n-9p4k-4m3l2k9n8o7p'],
};

export const ProductProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [homePageContent, setHomePageContent] = useState<HomePageContent>(initialHomePageContent);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error);
      } else if (data) {
        setProducts(data as Product[]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);

  const addProduct = async (product: Omit<Product, 'id' | 'created_at' | 'rating_average' | 'review_count'>) => {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select();
    
    if (error) {
      console.error('Error adding product:', error);
    } else if (data) {
      setProducts(prev => [data[0], ...prev]);
    }
  };

  const updateProduct = async (updatedProduct: Product) => {
    const { id, ...productToUpdate } = updatedProduct;
    const { data, error } = await supabase
      .from('products')
      .update(productToUpdate)
      .eq('id', id)
      .select();
      
    if (error) {
      console.error('Error updating product:', error);
    } else if (data) {
      setProducts(prev => prev.map(p => p.id === id ? data[0] : p));
    }
  };

  const deleteProduct = async (productId: string) => {
    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', productId);

    if (error) {
      console.error('Error deleting product:', error);
    } else {
      setProducts(prev => prev.filter(p => p.id !== productId));
      setHomePageContent(prevContent => ({
        ...prevContent,
        newProductIds: prevContent.newProductIds.filter(id => id !== productId),
        popularProductIds: prevContent.popularProductIds.filter(id => id !== productId),
      }));
    }
  };
  
  const updateHomePageContent = (content: HomePageContent) => {
    setHomePageContent(content);
  };

  return (
    <ProductContext.Provider value={{ products, loading, homePageContent, addProduct, updateProduct, deleteProduct, updateHomePageContent }}>
      {children}
    </ProductContext.Provider>
  );
};