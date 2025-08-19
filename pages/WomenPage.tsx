import React, { useContext } from 'react';
import ProductListPage from './ProductListPage';
import { FilterOptions } from '../types';
import { ProductContext } from '../context/ProductContext';

const WomenPage: React.FC = () => {
  const { products } = useContext(ProductContext);
  const womenProducts = products.filter(p => p.audience === 'Mujer');

  const brands = [...new Set(womenProducts.map(p => p.brand))];
  const categories = [...new Set(womenProducts.map(p => p.category))];
  const tags = [...new Set(womenProducts.flatMap(p => p.tags))];

  const filterOptions: FilterOptions = {
    'Categoría': categories,
    'Marca': brands,
    'Etiquetas': tags.slice(0, 10),
  };

  return (
    <ProductListPage
      title="Para Ella"
      products={womenProducts}
      filterOptions={filterOptions}
      heroImageUrl="https://picsum.photos/seed/women-hero/1200/400"
      heroTitle="Moda y Belleza para Ella"
      heroSubtitle="Descubre las últimas tendencias y los clásicos atemporales en nuestra colección para mujer."
    />
  );
};

export default WomenPage;