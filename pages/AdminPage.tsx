
import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../types';
import ProductTable from '../components/admin/ProductTable';
import ProductModal from '../components/admin/ProductModal';
import HomePageManager from '../components/admin/HomePageManager';
import { ProductContext } from '../context/ProductContext';
import { useAuth } from '../context/AuthContext';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import { Database } from '../supabase/client';

const AccessDenied: React.FC = () => (
    <div className="text-center py-20 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-red-600">Acceso Denegado</h1>
        <p className="mt-2 text-text-light">No tienes permiso para ver esta página.</p>
        <p className="mt-2 text-sm text-text-light">Por favor, inicia sesión con una cuenta de administrador.</p>
        <Link to="/cuenta" className="mt-6 inline-block bg-primary text-white font-semibold py-3 px-6 rounded-md hover:bg-rose-700 transition-colors">
            Ir a Iniciar Sesión
        </Link>
    </div>
);

const AdminPage: React.FC = () => {
    const { user, loading: authLoading } = useAuth();
    const { products, addProduct, updateProduct, deleteProduct, loading: productLoading } = useContext(ProductContext);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    // For demonstration, admin access is granted to a specific email.
    // In a real application, this should be managed by roles in the database.
    const ADMIN_EMAIL = 'admin@bellezapura.com';

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

    const handleSaveProduct = async (productToSave: Database['public']['Tables']['products']['Insert']) => {
        if (editingProduct) {
            await updateProduct({ ...editingProduct, ...productToSave });
        } else {
            await addProduct(productToSave);
        }
        handleCloseModal();
    };

    const handleDeleteProduct = async (productId: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
            await deleteProduct(productId);
        }
    };

    if(authLoading || productLoading) {
        return <LoadingSpinner />;
    }

    if (user?.email !== ADMIN_EMAIL) {
        return <AccessDenied />;
    }

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