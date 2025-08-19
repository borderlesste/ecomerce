
import React from 'react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import StarRating from './StarRating';
import { Link } from 'react-router-dom';

const HeartIcon: React.FC<{ className?: string; filled: boolean }> = ({ className, filled }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill={filled ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const onSale = product.sale_price && product.sale_price < product.price;
  const isFavorited = isInWishlist(product.id);

  const handleWishlistToggle = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (isFavorited) {
          removeFromWishlist(product.id);
      } else {
          addToWishlist(product.id);
      }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300 group">
      <div className="relative">
        <Link to={`/producto/${product.id}`}>
          <img className="w-full h-56 object-cover" src={product.image_url} alt={product.name} />
        </Link>
        <button 
            onClick={handleWishlistToggle}
            className="absolute top-3 right-3 bg-white/70 backdrop-blur-sm rounded-full p-2 z-20 hover:bg-white transition-colors"
            aria-label={isFavorited ? 'Quitar de la lista de deseos' : 'Añadir a la lista de deseos'}
        >
            <HeartIcon className={`h-5 w-5 ${isFavorited ? 'text-primary' : 'text-gray-600'}`} filled={isFavorited} />
        </button>
        {onSale && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-bold z-10">
                OFERTA
            </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-xs text-text-light uppercase tracking-wide">{product.brand}</h3>
        <Link to={`/producto/${product.id}`}>
          <h2 className="text-lg font-semibold text-text-main truncate hover:text-primary transition-colors">{product.name}</h2>
        </Link>
        <div className="flex items-center mt-1">
          <StarRating rating={product.rating_average} />
          <span className="text-xs text-text-light ml-2">({product.review_count} reseñas)</span>
        </div>
        <div className="mt-2 text-lg font-bold text-text-main">
          {onSale ? (
            <div className="flex items-baseline gap-2">
              <span className="text-primary">${product.sale_price?.toFixed(2)}</span>
              <span className="text-base text-text-light line-through">${product.price.toFixed(2)}</span>
            </div>
          ) : (
            <span>${product.price.toFixed(2)}</span>
          )}
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
