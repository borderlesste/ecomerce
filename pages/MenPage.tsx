import React, { useContext } from 'react';
import ProductListPage from './ProductListPage';
import { FilterOptions } from '../types';
import { ProductContext } from '../context/ProductContext';

const MenPage: React.FC = () => {
  const { products } = useContext(ProductContext);
  const menProducts = products.filter(p => p.audience === 'Hombre');

  const brands = [...new Set(menProducts.map(p => p.brand))];
  const categories = [...new Set(menProducts.map(p => p.category))];
  const tags = [...new Set(menProducts.flatMap(p => p.tags))];

  const filterOptions: FilterOptions = {
    'Categoría': categories,
    'Marca': brands,
    'Etiquetas': tags.slice(0, 10),
  };

  return (
    <ProductListPage
      title="Para Él"
      products={menProducts}
      filterOptions={filterOptions}
      heroImageUrl="https://picsum.photos/seed/men-hero/1200/400"
      heroTitle="Estilo y Cuidado para Él"
      heroSubtitle="Encuentra todo lo que necesitas, desde ropa moderna hasta fragancias sofisticadas."
    />
  );
};

export default MenPage;