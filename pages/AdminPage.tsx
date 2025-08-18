
import React, { useState, useContext } from 'react';
import { Product } from '../types';
import ProductTable from '../components/admin/ProductTable';
import ProductModal from '../components/admin/ProductModal';
import HomePageManager from '../components/admin/HomePageManager';
import { ProductContext } from '../context/ProductContext';

const AdminPage: React.FC = () => {
    const { products, addProduct, updateProduct, deleteProduct } = useContext(ProductContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const handleOpenModalForNew = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    };

    const handleOpenModalForEdit = (product: Product) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingProduct(null);
    };

    const handleSaveProduct = (productToSave: Product) => {
        if (editingProduct) {
            updateProduct(productToSave);
        } else {
            addProduct(productToSave);
        }
        handleCloseModal();
    };

    const handleDeleteProduct = (productId: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            deleteProduct(productId);
        }
    };

    return (
        <div className="space-y-12">
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <HomePageManager />
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold">Gestión de Productos</h1>
                    <button
                        onClick={handleOpenModalForNew}
                        className="bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-rose-700 transition-colors"
                    >
                        Añadir Producto
                    </button>
                </div>
                <ProductTable 
                    products={products} 
                    onEdit={handleOpenModalForEdit} 
                    onDelete={handleDeleteProduct} 
                />
            </div>
            
            {isModalOpen && (
                 <ProductModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSave={handleSaveProduct}
                    product={editingProduct}
                />
            )}
        </div>
    );
};

export default AdminPage;
