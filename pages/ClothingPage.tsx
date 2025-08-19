import React, { useContext } from 'react';
import ProductListPage from './ProductListPage';
import { FilterOptions } from '../types';
import { ProductContext } from '../context/ProductContext';

const ClothingPage: React.FC = () => {
  const { products } = useContext(ProductContext);
  const clothingProducts = products.filter(p => p.category === 'Ropa');

  const filterOptions: FilterOptions = {
    'Marca': ['Calvin Klein', 'Zara', 'Levi\'s', 'Nike'],
    'Tipo de Prenda': ['camiseta', 'vestido', 'jeans', 'sudadera'],
    'Estilo': ['casual', 'elegante', 'verano', 'algodón', 'deportivo'],
  };

  return (
    <ProductListPage
      title="Ropa"
      products={clothingProducts}
      filterOptions={filterOptions}
    />
  );
};

export default ClothingPage;