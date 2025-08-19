import React, { useContext } from 'react';
import ProductListPage from './ProductListPage';
import { FilterOptions } from '../types';
import { ProductContext } from '../context/ProductContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';

const GirlsPage: React.FC = () => {
  const { products, loading } = useContext(ProductContext);

  if (loading) {
    return <LoadingSpinner />;
  }

  const girlsProducts = products.filter(p => p.audience === 'Niña');

  const brands = [...new Set(girlsProducts.map(p => p.brand))];
  const categories = [...new Set(girlsProducts.map(p => p.category))];
  const tags = [...new Set(girlsProducts.flatMap(p => p.tags))];

  const filterOptions: FilterOptions = {
    'Categoría': categories,
    'Marca': brands,
    'Etiquetas': tags.slice(0, 10),
  };

  return (
    <ProductListPage
      title="Para Niñas"
      products={girlsProducts}
      filterOptions={filterOptions}
      heroImageUrl="https://picsum.photos/seed/girls-hero/1200/400"
      heroTitle="Magia y Encanto para Niñas"
      heroSubtitle="Vestidos, conjuntos y accesorios para que brillen en cada ocasión."
    />
  );
};

export default GirlsPage;