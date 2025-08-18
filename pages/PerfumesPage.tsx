
import React, { useContext } from 'react';
import ProductListPage from './ProductListPage';
import { FilterOptions } from '../types';
import { ProductContext } from '../context/ProductContext';

const PerfumesPage: React.FC = () => {
  const { products } = useContext(ProductContext);
  const perfumeProducts = products.filter(p => p.category === 'Perfume');
  
  const filterOptions: FilterOptions = {
    'Marca': ['Chanel', 'Dior', 'Tom Ford', 'Guerlain'],
    'Categoría': ['floral', 'cítrico', 'amaderado', 'dulce', 'oriental', 'fresco', 'intenso', 'lujo']
  };

  return (
    <ProductListPage
      title="Perfumes"
      products={perfumeProducts}
      filterOptions={filterOptions}
    />
  );
};

export default PerfumesPage;
