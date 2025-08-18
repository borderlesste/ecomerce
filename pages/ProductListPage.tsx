
import React, { useState, useMemo } from 'react';
import { Product, FilterOptions } from '../types';
import ProductCard from '../components/product/ProductCard';

interface ProductListPageProps {
  title: string;
  products: Product[];
  filterOptions: FilterOptions;
}

const ProductListPage: React.FC<ProductListPageProps> = ({ title, products, filterOptions }) => {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [sortOrder, setSortOrder] = useState('default');
  
  const handleFilterChange = (category: string, value: string) => {
    setFilters(prev => {
      const newCategoryFilters = prev[category] ? [...prev[category]] : [];
      if (newCategoryFilters.includes(value)) {
        return { ...prev, [category]: newCategoryFilters.filter(item => item !== value) };
      } else {
        return { ...prev, [category]: [...newCategoryFilters, value] };
      }
    });
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      return Object.entries(filters).every(([category, values]) => {
        if (values.length === 0) return true;
        if (category === 'Marca') {
          return values.includes(product.brand);
        }
        return values.some(value => product.tags.includes(value.toLowerCase()));
      });
    });

    switch (sortOrder) {
      case 'price_asc':
        return filtered.sort((a, b) => a.price - b.price);
      case 'price_desc':
        return filtered.sort((a, b) => b.price - a.price);
      case 'rating_desc':
        return filtered.sort((a, b) => b.rating - a.rating);
      default:
        return filtered;
    }
  }, [products, filters, sortOrder]);

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filters Sidebar */}
      <aside className="w-full lg:w-1/4">
        <div className="p-6 bg-white rounded-lg shadow-md sticky top-24">
          <h2 className="text-xl font-bold mb-4">Filtros</h2>
          {Object.entries(filterOptions).map(([category, options]) => (
            <div key={category} className="mb-4">
              <h3 className="font-semibold mb-2">{category}</h3>
              <div className="space-y-2">
                {options.map(option => (
                  <label key={option} className="flex items-center text-sm">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                      onChange={() => handleFilterChange(category, option)}
                      checked={filters[category]?.includes(option) || false}
                    />
                    <span className="ml-2 text-text-light">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* Product Grid */}
      <main className="w-full lg:w-3/4">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{title}</h1>
          <select 
            className="border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary"
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
          >
            <option value="default">Ordenar por</option>
            <option value="price_asc">Precio: Menor a Mayor</option>
            <option value="price_desc">Precio: Mayor a Menor</option>
            <option value="rating_desc">Mejor Calificados</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredAndSortedProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
         {filteredAndSortedProducts.length === 0 && (
            <div className="col-span-full text-center py-12 bg-white rounded-lg shadow-md">
                <p className="text-text-light">No se encontraron productos con los filtros seleccionados.</p>
            </div>
        )}
      </main>
    </div>
  );
};

export default ProductListPage;
