import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ProductContext } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/product/ProductCard';
import StarRating from '../components/product/StarRating';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const ProductDetailPage: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const { products, loading } = useContext(ProductContext);
    const { addToCart } = useCart();
    const [quantity, setQuantity] = useState(1);
    
    if (loading) {
        return <LoadingSpinner />;
    }

    const product = products.find(p => p.id === productId);

    if (!product) {
        return (
            <div className="text-center py-20 bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-text-main">Producto no encontrado</h1>
                <p className="mt-2 text-text-light">Lo sentimos, no pudimos encontrar el producto que buscas.</p>
                <Link to="/" className="mt-6 inline-block bg-primary text-white font-semibold py-3 px-6 rounded-md hover:bg-rose-700 transition-colors">
                    Volver a la Página de Inicio
                </Link>
            </div>
        );
    }

    const similarProducts = products
        .filter(p => p.category === product.category && p.id !== product.id)
        .slice(0, 4);

    const onSale = product.sale_price && product.sale_price < product.price;
    
    const handleAddToCart = () => {
        addToCart(product, quantity);
    };

    return (
        <div className="space-y-16">
            <section className="bg-white p-6 sm:p-8 rounded-lg shadow-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <div>
                        <img src={product.image_url} alt={product.name} className="w-full h-auto max-h-[500px] object-cover rounded-lg shadow-md" />
                    </div>
                    <div className="flex flex-col justify-center">
                        <h2 className="text-sm uppercase text-text-light">{product.brand}</h2>
                        <h1 className="text-3xl md:text-4xl font-bold text-text-main my-2">{product.name}</h1>
                        <div className="flex items-center gap-2 mb-4">
                            <StarRating rating={product.rating_average} />
                            <span className="text-sm text-text-light">({product.review_count} reseñas)</span>
                        </div>
                        <div className="text-3xl font-bold text-text-main mb-4">
                            {onSale ? (
                                <div className="flex items-baseline gap-3">
                                    <span className="text-primary">${product.sale_price?.toFixed(2)}</span>
                                    <span className="text-xl text-text-light line-through">${product.price.toFixed(2)}</span>
                                </div>
                            ) : (
                                <span>${product.price.toFixed(2)}</span>
                            )}
                        </div>
                        <p className="text-text-light mb-6 leading-relaxed">{product.description}</p>
                        
                        <div className="flex items-center gap-4 mb-6">
                            <div className="flex items-center border rounded-md">
                                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-4 py-2 text-lg font-bold text-text-light hover:bg-gray-100 rounded-l-md transition-colors" aria-label="Disminuir cantidad">-</button>
                                <input 
                                    type="number" 
                                    value={quantity} 
                                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))} 
                                    className="w-16 h-full text-center border-l border-r focus:outline-none focus:ring-2 focus:ring-primary-light"
                                    aria-label="Cantidad de producto"
                                />
                                <button onClick={() => setQuantity(q => q + 1)} className="px-4 py-2 text-lg font-bold text-text-light hover:bg-gray-100 rounded-r-md transition-colors" aria-label="Aumentar cantidad">+</button>
                            </div>
                            <button onClick={handleAddToCart} className="flex-grow bg-primary text-white font-semibold py-3 px-6 rounded-md hover:bg-rose-700 transition-colors shadow-sm">
                                Agregar al Carrito
                            </button>
                        </div>

                        {product.ingredients && product.ingredients.length > 0 && (
                            <div>
                                <h3 className="font-semibold mb-2 text-text-main">Ingredientes:</h3>
                                <p className="text-sm text-text-light italic">{product.ingredients.join(', ')}</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {similarProducts.length > 0 && (
                <section>
                    <h2 className="text-3xl font-bold text-text-main mb-8 text-center">También te podría interesar</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {similarProducts.map(p => (
                            <ProductCard key={p.id} product={p} />
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

export default ProductDetailPage;