
import React from 'react';

const BoxIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const OrderHistory: React.FC = () => {
    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-text-main mb-6">Mis Pedidos</h2>
            <div className="text-center py-12 border-2 border-dashed rounded-lg">
                 <BoxIcon className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-medium text-text-main">Aún no hay pedidos</h3>
                <p className="mt-1 text-sm text-text-light">Tu historial de pedidos aparecerá aquí una vez que realices una compra.</p>
            </div>
        </div>
    );
};

export default OrderHistory;
