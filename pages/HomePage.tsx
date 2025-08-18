
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import { ProductContext } from '../context/ProductContext';

const HomePage: React.FC = () => {
  const { products, homePageContent } = useContext(ProductContext);

  const newProducts = products.filter(p => homePageContent.newProductIds.includes(p.id));
  const popularProducts = products.filter(p => homePageContent.popularProductIds.includes(p.id));

  return (
    <div className="space-y-12">
      {/* Banner Section */}
      <section className="relative bg-gradient-to-r from-pink-100 to-rose-100 rounded-lg p-8 md:p-12 text-center overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-extrabold text-text-main">{homePageContent.bannerTitle}</h1>
          <p className="mt-4 text-lg text-text-light max-w-2xl mx-auto">{homePageContent.bannerSubtitle}</p>
          <div className="mt-8 flex justify-center gap-4">
            <Link to="/perfumes" className="bg-primary text-white font-semibold py-3 px-6 rounded-md hover:bg-rose-700 transition-colors">
              Ver Perfumes
            </Link>
            <Link to="/cabello" className="bg-white text-primary font-semibold py-3 px-6 rounded-md hover:bg-gray-100 transition-colors">
              Cuidado del Cabello
            </Link>
          </div>
        </div>
      </section>

      {/* New Products Section */}
      <section>
        <h2 className="text-2xl font-bold text-text-main mb-6">Nuevos Productos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Most Popular Section */}
      <section>
        <h2 className="text-2xl font-bold text-text-main mb-6">Más Populares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
