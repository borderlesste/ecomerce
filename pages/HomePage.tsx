import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/product/ProductCard';
import StarRating from '../components/product/StarRating';
import { ProductContext } from '../context/ProductContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const SparkleIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v3.5a.75.75 0 01-1.5 0v-3.5A.75.75 0 0110 2zM5.44 5.44a.75.75 0 011.06 0l2.47 2.47a.75.75 0 01-1.06 1.06l-2.47-2.47a.75.75 0 010-1.06zM2 10a.75.75 0 01.75-.75h3.5a.75.75 0 010 1.5h-3.5A.75.75 0 012 10zm3.44 4.56a.75.75 0 010 1.06l-2.47 2.47a.75.75 0 01-1.06-1.06l2.47-2.47a.75.75 0 011.06 0zm11.12-1.06a.75.75 0 011.06 0l2.47 2.47a.75.75 0 01-1.06 1.06l-2.47-2.47a.75.75 0 010-1.06zM18 10a.75.75 0 01-.75.75h-3.5a.75.75 0 010-1.5h3.5a.75.75 0 01.75.75zm-3.44-4.56a.75.75 0 010-1.06l2.47-2.47a.75.75 0 111.06 1.06l-2.47 2.47a.75.75 0 01-1.06 0zM10 18a.75.75 0 01-.75-.75v-3.5a.75.75 0 011.5 0v3.5A.75.75 0 0110 18z" clipRule="evenodd" />
    </svg>
);


const HomePage: React.FC = () => {
  const { products, homePageContent, loading } = useContext(ProductContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  const newProducts = products.filter(p => homePageContent.newProductIds.includes(p.id));
  const popularProducts = products.filter(p => homePageContent.popularProductIds.includes(p.id));
  
  const [bannerTitle1, ...bannerTitleRest] = homePageContent.bannerTitle.split(' ');
  const bannerTitle2 = bannerTitleRest.join(' ');

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center justify-center lg:justify-between gap-8 py-10">
          
          {/* Left Column - Text Content */}
          <div className="flex-1 max-w-xl text-center lg:text-left">
             <div className="inline-flex items-center bg-primary-light text-primary font-semibold px-4 py-1 rounded-full text-sm mb-4">
               <SparkleIcon className="w-4 h-4 mr-2" />
               Nuevos productos disponibles
             </div>
            <h1 className="text-5xl md:text-7xl font-extrabold text-text-main leading-tight">
              {bannerTitle1} <span className="text-primary">{bannerTitle2}</span>
            </h1>
            <p className="mt-6 text-lg text-text-light">
              {homePageContent.bannerSubtitle}
            </p>
            <div className="mt-6 flex items-center justify-center lg:justify-start gap-x-6 gap-y-2 flex-wrap">
                <div className="flex items-center gap-1">
                    <StarRating rating={5} />
                    <span className="text-sm text-text-light font-medium">+10,000 clientes satisfechos</span>
                </div>
                <span className="text-sm text-text-light hidden sm:inline">|</span>
                <span className="text-sm text-text-light font-medium">Envío gratis en compras +$50</span>
            </div>
            <div className="mt-8 flex justify-center lg:justify-start gap-4">
              <Link to="/mujer" className="bg-gradient-to-r from-primary to-accent text-white font-semibold py-3 px-8 rounded-full shadow-lg hover:opacity-90 transition-all">
                Explorar Productos
              </Link>
              <Link to="/ofertas" className="bg-white text-text-main font-semibold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition-colors border border-gray-200">
                Ver Ofertas
              </Link>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex-1 mt-8 lg:mt-0 lg:flex justify-end">
            <img 
              src="https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?q=80&w=800&auto=format&fit=crop" 
              alt="Colección de productos de belleza" 
              className="rounded-3xl shadow-2xl max-w-sm md:max-w-md w-full"
            />
          </div>

        </div>
      </section>

      {/* New Products Section */}
      <section>
        <h2 className="text-3xl font-bold text-text-main mb-8 text-center">Nuevos Productos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {newProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Most Popular Section */}
      <section>
        <h2 className="text-3xl font-bold text-text-main mb-8 text-center">Más Populares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {popularProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;