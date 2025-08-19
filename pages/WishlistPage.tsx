
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { ProductContext } from '../context/ProductContext';
import ProductCard from '../components/product/ProductCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const WishlistPage: React.FC = () => {
    const { wishlistItems } = useWishlist();
    const { products, loading } = useContext(ProductContext);

    if (loading) {
        return <LoadingSpinner />;
    }

    const favoritedProducts = products.filter(product => wishlistItems.includes(product.id));

    if (favoritedProducts.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-text-main">Tu lista de deseos está vacía</h1>
                <p className="mt-2 text-text-light">Guarda los productos que te encantan para no perderlos de vista.</p>
                <Link to="/" className="mt-6 inline-block bg-primary text-white font-semibold py-3 px-6 rounded-md hover:bg-rose-700 transition-colors">
                    Explorar Productos
                </Link>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-text-main">Mi Lista de Deseos</h1>
             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {favoritedProducts.map(product => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </div>
    );
};

export default WishlistPage;
