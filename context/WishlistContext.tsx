
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface WishlistContextType {
  wishlistItems: string[]; // Store product IDs
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  itemCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

const getInitialWishlist = (): string[] => {
    try {
        const item = window.localStorage.getItem('wishlist');
        return item ? JSON.parse(item) : [];
    } catch (error) {
        console.error("Error reading wishlist from localStorage", error);
        return [];
    }
};

export const WishlistProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState<string[]>(getInitialWishlist);

  useEffect(() => {
    try {
        window.localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    } catch (error) {
        console.error("Error saving wishlist to localStorage", error);
    }
  }, [wishlistItems]);

  const addToWishlist = (productId: string) => {
    setWishlistItems(prevItems => {
      if (prevItems.includes(productId)) {
        return prevItems;
      }
      return [...prevItems, productId];
    });
  };

  const removeFromWishlist = (productId: string) => {
    setWishlistItems(prevItems => prevItems.filter(id => id !== productId));
  };

  const isInWishlist = (productId: string): boolean => {
    return wishlistItems.includes(productId);
  };
  
  const itemCount = wishlistItems.length;

  return (
    <WishlistContext.Provider value={{ wishlistItems, addToWishlist, removeFromWishlist, isInWishlist, itemCount }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};
