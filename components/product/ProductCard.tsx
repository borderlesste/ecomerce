
import React from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import StarRating from './StarRating';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative">
        <img className="w-full h-56 object-cover" src={product.imageUrl} alt={product.name} />
        <div className="absolute top-0 right-0 bg-primary text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
          ${product.price.toFixed(2)}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xs text-text-light uppercase tracking-wide">{product.brand}</h3>
        <h2 className="text-lg font-semibold text-text-main truncate">{product.name}</h2>
        <div className="flex items-center mt-1">
          <StarRating rating={product.rating} />
          <span className="text-xs text-text-light ml-2">({product.reviewCount} reseñas)</span>
        </div>
        <button 
          onClick={() => addToCart(product)}
          className="mt-4 w-full bg-primary text-white py-2 px-4 rounded-md font-semibold hover:bg-rose-700 transition-colors duration-300 opacity-0 group-hover:opacity-100 transform translate-y-2 group-hover:translate-y-0">
          Agregar al Carrito
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
