
import React, { useContext } from 'react';
import ProductListPage from './ProductListPage';
import { FilterOptions } from '../types';
import { ProductContext } from '../context/ProductContext';

const HairProductsPage: React.FC = () => {
  const { products } = useContext(ProductContext);
  const hairProducts = products.filter(p => p.category === 'Cabello');

  const filterOptions: FilterOptions = {
    'Marca': ['Kérastase', 'Moroccanoil', 'Olaplex', 'Redken'],
    'Problema del Cabello': ['reparación', 'cabello seco', 'anti-frizz', 'hidratación', 'brillo', 'cabello teñido'],
    'Tipo de Cabello': ['todo tipo de cabello'],
  };

  return (
    <ProductListPage
      title="Productos para el Cabello"
      products={hairProducts}
      filterOptions={filterOptions}
    />
  );
};

export default HairProductsPage;
