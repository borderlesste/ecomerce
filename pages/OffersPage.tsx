import React, { useContext, useMemo } from 'react';
import ProductListPage from './ProductListPage';
import { FilterOptions } from '../types';
import { ProductContext } from '../context/ProductContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const OffersPage: React.FC = () => {
  const { products, loading } = useContext(ProductContext);
  
  const offerProducts = useMemo(() => 
    products.filter(p => p.sale_price && p.sale_price < p.price),
    [products]
  );

  const filterOptions: FilterOptions = useMemo(() => {
    const brands = [...new Set(offerProducts.map(p => p.brand))];
    const categories = [...new Set(offerProducts.map(p => p.category))];
    const audiences = [...new Set(offerProducts.map(p => p.audience))];

    return {
        'Categoría': categories,
        'Público': audiences,
        'Marca': brands,
    };
  }, [offerProducts]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <ProductListPage
      title="Ofertas Especiales"
      products={offerProducts}
      filterOptions={filterOptions}
      heroImageUrl="https://picsum.photos/seed/offers-hero/1200/400"
      heroTitle="¡Ofertas que no puedes dejar pasar!"
      heroSubtitle="Aprovecha nuestros descuentos especiales en productos seleccionados. ¡Unidades limitadas!"
    />
  );
};

export default OffersPage;