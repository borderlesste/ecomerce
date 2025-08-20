
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { supabase } from '../../supabase/client';
import { Order } from '../../types';
import LoadingSpinner from '../ui/LoadingSpinner';

const BoxIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const statusStyles = {
    PAID: 'bg-green-100 text-green-800',
    PENDING: 'bg-yellow-100 text-yellow-800',
    FAILED: 'bg-red-100 text-red-800',
};

const OrderHistory: React.FC = () => {
    const { user } = useAuth();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                const { data, error } = await supabase
                    .from('orders')
                    .select(`*, order_items(*, products(*))`)
                    .eq('user_id', user.id)
                    .order('created_at', { ascending: false });

                if (error) throw error;
                setOrders(data as Order[]);
            } catch (error) {
                console.error("Error fetching orders:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, [user]);

    if (loading) {
        return (
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <h2 className="text-2xl font-bold text-text-main mb-6">Mis Pedidos</h2>
                <LoadingSpinner />
            </div>
        );
    }

    if (orders.length === 0) {
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
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-text-main mb-6">Mis Pedidos</h2>
            <div className="space-y-6">
                {orders.map(order => (
                    <div key={order.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start flex-wrap gap-2 mb-4">
                            <div>
                                <h3 className="font-bold text-text-main">Pedido #{order.id.substring(0, 8)}</h3>
                                <p className="text-sm text-text-light">
                                    {new Date(order.created_at).toLocaleDateString()}
                                </p>
                            </div>
                            <div className="text-right">
                                <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusStyles[order.status] || 'bg-gray-100 text-gray-800'}`}>
                                    {order.status === 'PAID' ? 'PAGADO' : order.status}
                                </span>
                                <p className="font-bold text-lg mt-1">${order.total.toFixed(2)}</p>
                            </div>
                        </div>
                        <div className="border-t pt-4 space-y-3">
                            {order.order_items.map(item => (
                                <div key={item.id} className="flex items-center gap-4 text-sm">
                                    <img 
                                      src={item.products?.image_url} 
                                      alt={item.products?.name} 
                                      className="w-12 h-12 object-cover rounded-md"
                                    />
                                    <div className="flex-grow">
                                        <p className="font-semibold text-text-main">{item.products?.name}</p>
                                        <p className="text-text-light">Cantidad: {item.quantity}</p>
                                    </div>
                                    <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrderHistory;