
import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { Database } from '../../supabase/client';

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Database['public']['Tables']['products']['Insert']) => void;
    product: Product | null;
}

const emptyProduct: Database['public']['Tables']['products']['Insert'] = {
    name: '',
    brand: '',
    price: 0,
    image_url: '',
    category: 'Perfume',
    audience: 'Mujer',
    tags: [],
    description: '',
    ingredients: [],
    stock: 0,
    sale_price: null,
    rating_average: 0,
    review_count: 0
};

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, onSave, product }) => {
    const [formData, setFormData] = useState<Database['public']['Tables']['products']['Insert']>(emptyProduct);

    useEffect(() => {
        if (product) {
            const { id, created_at, ...editableProduct } = product;
            setFormData(editableProduct);
        } else {
            setFormData(emptyProduct);
        }
    }, [product]);

    if (!isOpen) return null;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'price' || name === 'stock') {
            setFormData(prev => ({ ...prev, [name]: Number(value) }));
        } else if (name === 'sale_price') {
            setFormData(prev => ({ ...prev, [name]: value === '' ? null : Number(value) }));
        }
        else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData(prev => ({ ...prev, tags: e.target.value.split(',').map(tag => tag.trim()) }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center">
            <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
                <h2 className="text-2xl font-bold mb-6">{product ? 'Editar Producto' : 'Añadir Producto'}</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="brand" className="block text-sm font-medium text-gray-700">Marca</label>
                            <input type="text" name="brand" id="brand" value={formData.brand} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
                        </div>
                        <div>
                           <label htmlFor="price" className="block text-sm font-medium text-gray-700">Precio</label>
                           <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} step="0.01" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                         <div>
                           <label htmlFor="category" className="block text-sm font-medium text-gray-700">Categoría</label>
                            <select name="category" id="category" value={formData.category} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                                <option>Perfume</option>
                                <option>Cabello</option>
                                <option>Ropa</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="audience" className="block text-sm font-medium text-gray-700">Público</label>
                            <select name="audience" id="audience" value={formData.audience} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary">
                                <option>Mujer</option>
                                <option>Hombre</option>
                                <option>Niño</option>
                                <option>Niña</option>
                            </select>
                        </div>
                    </div>
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock</label>
                            <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
                        </div>
                         <div>
                            <label htmlFor="sale_price" className="block text-sm font-medium text-gray-700">Precio de Oferta</label>
                            <input type="number" name="sale_price" id="sale_price" value={formData.sale_price || ''} onChange={handleChange} step="0.01" placeholder="Opcional" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">URL de la Imagen</label>
                        <input type="text" name="image_url" id="image_url" value={formData.image_url} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" required />
                    </div>
                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (separados por coma)</label>
                        <input type="text" name="tags" id="tags" value={formData.tags.join(', ')} onChange={handleTagChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Descripción</label>
                        <textarea name="description" id="description" value={formData.description} onChange={handleChange} rows={3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                    </div>
                    <div className="flex justify-end gap-4 pt-4">
                        <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-semibold py-2 px-4 rounded-md hover:bg-gray-300 transition-colors">Cancelar</button>
                        <button type="submit" className="bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-rose-700 transition-colors">Guardar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ProductModal;