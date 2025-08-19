import React, { useContext, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import ProductListPage from './ProductListPage';
import { FilterOptions } from '../types';
import { ProductContext } from '../context/ProductContext';

const SearchPage: React.FC = () => {
  const { products } = useContext(ProductContext);
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults = useMemo(() => {
    if (!query) {
      return [];
    }
    const lowercasedQuery = query.toLowerCase();
    return products.filter(p =>
      p.name.toLowerCase().includes(lowercasedQuery) ||
      p.brand.toLowerCase().includes(lowercasedQuery) ||
      p.description.toLowerCase().includes(lowercasedQuery) ||
      p.category.toLowerCase().includes(lowercasedQuery) ||
      p.audience.toLowerCase().includes(lowercasedQuery) ||
      p.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery))
    );
  }, [query, products]);

  const filterOptions: FilterOptions = useMemo(() => {
    if (searchResults.length === 0) return {};
    const brands = [...new Set(searchResults.map(p => p.brand))];
    const categories = [...new Set(searchResults.map(p => p.category))];
    const audiences = [...new Set(searchResults.map(p => p.audience))];
    return {
      'Categoría': categories,
      'Público': audiences,
      'Marca': brands,
    };
  }, [searchResults]);

  if (!query) {
    return (
        <div className="text-center py-20 bg-white rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold text-text-main">Busca en nuestra tienda</h1>
            <p className="mt-2 text-text-light">Ingresa un término en la barra de búsqueda para encontrar productos.</p>
        </div>
    );
  }

  return (
    <ProductListPage
      title={`Resultados para "${query}"`}
      products={searchResults}
      filterOptions={filterOptions}
    />
  );
};

export default SearchPage;