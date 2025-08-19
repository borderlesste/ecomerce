import React, { useContext } from 'react';
import ProductListPage from './ProductListPage';
import { FilterOptions } from '../types';
import { ProductContext } from '../context/ProductContext';

const BoysPage: React.FC = () => {
  const { products } = useContext(ProductContext);
  const boysProducts = products.filter(p => p.audience === 'Niño');

  const brands = [...new Set(boysProducts.map(p => p.brand))];
  const categories = [...new Set(boysProducts.map(p => p.category))];
  const tags = [...new Set(boysProducts.flatMap(p => p.tags))];

  const filterOptions: FilterOptions = {
    'Categoría': categories,
    'Marca': brands,
    'Etiquetas': tags.slice(0, 10),
  };

  return (
    <ProductListPage
      title="Para Niños"
      products={boysProducts}
      filterOptions={filterOptions}
      heroImageUrl="https://picsum.photos/seed/boys-hero/1200/400"
      heroTitle="Aventura y Diversión para Niños"
      heroSubtitle="Ropa cómoda y divertida para los pequeños exploradores de la casa."
    />
  );
};

export default BoysPage;