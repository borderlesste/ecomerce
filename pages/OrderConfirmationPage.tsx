

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CartItem } from '../types';

interface OrderDetails {
    items: CartItem[];
    total: number;
    shipping: number;
}

const CheckCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);


const OrderConfirmationPage: React.FC = () => {
    const location = useLocation();
    const { order } = (location.state || {}) as { order?: OrderDetails };

    if (!order) {
        return (
            <div className="text-center py-20 bg-white p-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-text-main">No se encontró información del pedido</h1>
                <p className="mt-2 text-text-light">Parece que has llegado aquí por error.</p>
                <Link to="/" className="mt-6 inline-block bg-primary text-white font-semibold py-3 px-6 rounded-md hover:bg-rose-700 transition-colors">
                    Volver a la Página de Inicio
                </Link>
            </div>
        );
    }

    const subtotal = order.total - order.shipping;

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg text-center">
            <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-text-main">¡Gracias por tu pedido!</h1>
            <p className="mt-2 text-text-light">Hemos recibido tu pedido y lo estamos procesando. Recibirás una confirmación por correo electrónico en breve.</p>

            <div className="mt-8 text-left border-t pt-6">
                 <h2 className="text-xl font-bold mb-4">Resumen del Pedido</h2>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2 mb-4">
                    {order.items.map(item => (
                        <div key={item.id} className="flex justify-between items-center text-sm">
                            <div className="flex items-center gap-3">
                                <img src={item.image_url} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-text-light">Cantidad: {item.quantity}</p>
                                </div>
                            </div>
                            <p className="font-medium">${(item.sale_price || item.price).toFixed(2)}</p>
                        </div>
                    ))}
                </div>
                 <div className="mt-4 pt-4 border-t space-y-2">
                     <div className="flex justify-between text-text-light">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-text-light">
                        <span>Envío</span>
                        <span>${order.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                        <span>Total Pagado</span>
                        <span>${order.total.toFixed(2)}</span>
                    </div>
                </div>
            </div>

             <Link to="/" className="mt-8 inline-block w-full bg-primary text-white font-semibold py-3 px-6 rounded-md hover:bg-rose-700 transition-colors">
                Seguir Comprando
            </Link>
        </div>
    );
};

export default OrderConfirmationPage;