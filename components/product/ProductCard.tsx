import React from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import StarRating from './StarRating';
import { Link } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const onSale = product.salePrice && product.salePrice < product.price;

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative">
        <Link to={`/producto/${product.id}`}>
          <img className="w-full h-56 object-cover" src={product.imageUrl} alt={product.name} />
        </Link>
        {onSale && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold z-10">
                OFERTA
            </div>
        )}
        <div className="absolute top-0 right-0 bg-primary text-white px-2 py-1 m-2 rounded-md text-sm font-semibold">
          {onSale ? (
            <>
              <span className="line-through opacity-75 mr-2">${product.price.toFixed(2)}</span>
              <span>${product.salePrice?.toFixed(2)}</span>
            </>
          ) : (
            <span>${product.price.toFixed(2)}</span>
          )}
        </div>
      </div>
      <div className="p-4">
        <h3 className="text-xs text-text-light uppercase tracking-wide">{product.brand}</h3>
        <Link to={`/producto/${product.id}`}>
          <h2 className="text-lg font-semibold text-text-main truncate hover:text-primary transition-colors">{product.name}</h2>
        </Link>
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