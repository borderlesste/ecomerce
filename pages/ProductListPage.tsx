import React, { useState, useMemo } from 'react';
import { Product, FilterOptions } from '../types';
import ProductCard from '../components/product/ProductCard';

interface ProductListPageProps {
  title: string;
  products: Product[];
  filterOptions: FilterOptions;
  heroImageUrl?: string;
  heroTitle?: string;
  heroSubtitle?: string;
}

const FilterIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
    </svg>
);

const CloseIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const ProductListPage: React.FC<ProductListPageProps> = ({ title, products, filterOptions, heroImageUrl, heroTitle, heroSubtitle }) => {
  const [filters, setFilters] = useState<Record<string, string[]>>({});
  const [sortOrder, setSortOrder] = useState('default');
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  
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
        
        switch (category) {
            case 'Marca':
                return values.includes(product.brand);
            case 'Categoría':
                return values.includes(product.category);
            case 'Público':
                return values.includes(product.audience);
            default:
                return values.some(value => product.tags.includes(value.toLowerCase()));
        }
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

  const FilterSidebar = () => (
    <>
      <h2 className="text-xl font-bold mb-4 px-6 lg:px-0">Filtros</h2>
      {Object.entries(filterOptions).map(([category, options]) => (
          <div key={category} className="mb-4 px-6 lg:px-0">
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
    </>
  );


  return (
    <div className="space-y-8">
        {heroImageUrl && (
            <section 
                className="relative bg-cover bg-center rounded-lg p-8 md:p-16 text-center overflow-hidden h-64 flex flex-col justify-center items-center"
                style={{ backgroundImage: `url(${heroImageUrl})` }}
            >
                <div className="absolute inset-0 bg-black bg-opacity-50"></div>
                <div className="relative z-10">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-white">{heroTitle || title}</h1>
                    {heroSubtitle && <p className="mt-4 text-lg text-gray-200 max-w-2xl mx-auto">{heroSubtitle}</p>}
                </div>
            </section>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
            {/* Mobile Filter Button */}
             {Object.keys(filterOptions).length > 0 && (
                <div className="lg:hidden flex justify-end">
                    <button 
                        onClick={() => setIsFilterOpen(true)}
                        className="inline-flex items-center gap-2 bg-white px-4 py-2 border rounded-md shadow-sm text-sm font-medium hover:bg-gray-50"
                    >
                        <FilterIcon className="h-5 w-5" />
                        Filtros
                    </button>
                </div>
             )}

            {/* Filters Sidebar for Desktop */}
            {Object.keys(filterOptions).length > 0 && (
                <aside className="hidden lg:block w-full lg:w-1/4">
                    <div className="p-6 bg-white rounded-lg shadow-md sticky top-24">
                       <FilterSidebar />
                    </div>
                </aside>
            )}

            {/* Mobile Filter Drawer */}
            {Object.keys(filterOptions).length > 0 && isFilterOpen && (
                 <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsFilterOpen(false)}></div>
                    <div className="relative bg-white w-4/5 max-w-sm h-full shadow-xl py-6 flex flex-col">
                        <button onClick={() => setIsFilterOpen(false)} className="self-end px-6 mb-4">
                            <CloseIcon className="h-6 w-6" />
                        </button>
                        <div className="overflow-y-auto">
                            <FilterSidebar />
                        </div>
                    </div>
                </div>
            )}

            {/* Product Grid */}
            <main className={`w-full ${Object.keys(filterOptions).length > 0 ? 'lg:w-3/4' : ''}`}>
                <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
                <h1 className="text-2xl md:text-3xl font-bold">{title}</h1>
                <select 
                    className="border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring-primary text-sm"
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
    </div>
  );
};

export default ProductListPage;