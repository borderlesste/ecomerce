
import React, { useState, useContext, useEffect } from 'react';
import { ProductContext } from '../../context/ProductContext';
import { HomePageContent } from '../../types';

const HomePageManager: React.FC = () => {
    const { products, homePageContent, updateHomePageContent } = useContext(ProductContext);
    const [formData, setFormData] = useState<HomePageContent>(homePageContent);
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        setFormData(homePageContent);
    }, [homePageContent]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>, field: keyof HomePageContent) => {
        const selectedIds = Array.from(e.target.selectedOptions, option => option.value);
        setFormData({ ...formData, [field]: selectedIds });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        updateHomePageContent(formData);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 3000); // Hide message after 3 seconds
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-8">
            <div>
                <h2 className="text-2xl font-bold mb-4">Gestión de la Página de Inicio</h2>
                <div className="p-6 border rounded-lg space-y-4 bg-gray-50">
                     <div>
                        <label htmlFor="bannerTitle" className="block text-sm font-medium text-gray-700">Título del Banner</label>
                        <input
                            type="text"
                            name="bannerTitle"
                            id="bannerTitle"
                            value={formData.bannerTitle}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                        />
                    </div>
                    <div>
                        <label htmlFor="bannerSubtitle" className="block text-sm font-medium text-gray-700">Subtítulo del Banner</label>
                        <textarea
                            name="bannerSubtitle"
                            id="bannerSubtitle"
                            rows={3}
                            value={formData.bannerSubtitle}
                            onChange={handleChange}
                            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                        />
                    </div>
                </div>
            </div>

            <div>
                 <h3 className="text-xl font-semibold mb-4">Selección de Productos Destacados</h3>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border rounded-lg bg-gray-50">
                        <label htmlFor="newProductIds" className="block text-sm font-medium text-gray-700 mb-2">Nuevos Productos</label>
                        <select
                            multiple
                            name="newProductIds"
                            id="newProductIds"
                            value={formData.newProductIds}
                            onChange={(e) => handleSelectChange(e, 'newProductIds')}
                            className="mt-1 block w-full h-48 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                        >
                            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                         <p className="text-xs text-gray-500 mt-1">Mantén presionado Ctrl (o Cmd en Mac) para seleccionar varios.</p>
                    </div>
                     <div className="p-6 border rounded-lg bg-gray-50">
                        <label htmlFor="popularProductIds" className="block text-sm font-medium text-gray-700 mb-2">Más Populares</label>
                        <select
                            multiple
                            name="popularProductIds"
                            id="popularProductIds"
                            value={formData.popularProductIds}
                            onChange={(e) => handleSelectChange(e, 'popularProductIds')}
                            className="mt-1 block w-full h-48 border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                        >
                            {products.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                        </select>
                         <p className="text-xs text-gray-500 mt-1">Mantén presionado Ctrl (o Cmd en Mac) para seleccionar varios.</p>
                    </div>
                 </div>
            </div>
            
            <div className="flex items-center gap-4">
                <button type="submit" className="bg-primary text-white font-semibold py-2 px-6 rounded-md hover:bg-rose-700 transition-colors">
                    Guardar Cambios
                </button>
                {isSaved && <span className="text-green-600 font-medium">¡Guardado con éxito!</span>}
            </div>
        </form>
    );
};

export default HomePageManager;
