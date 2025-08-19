

import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

type PaymentMethod = 'credit-card' | 'paypal' | 'cash';

const CheckoutPage: React.FC = () => {
    const { cartItems, totalAmount, clearCart } = useCart();
    const navigate = useNavigate();
    const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
    const [isProcessing, setIsProcessing] = useState(false);

    const shippingCost = totalAmount > 0 ? 5.00 : 0;
    const totalWithShipping = totalAmount + shippingCost;
    
    if (cartItems.length === 0 && !isProcessing) {
       return (
         <div className="text-center py-20 bg-white rounded-lg shadow-lg">
           <h1 className="text-3xl font-bold text-text-main">Tu carrito está vacío</h1>
           <p className="mt-2 text-text-light">No puedes proceder al pago sin productos.</p>
         </div>
       );
    }

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);
        
        // Simulate API call
        setTimeout(() => {
            const orderDetails = {
                items: [...cartItems],
                total: totalWithShipping,
                shipping: shippingCost,
            };
            
            clearCart();
            navigate('/confirmacion-pedido', { state: { order: orderDetails } });
        }, 2000);
    };

    const renderPaymentDetails = () => {
        switch (paymentMethod) {
            case 'credit-card':
                return (
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">Número de Tarjeta</label>
                            <input type="text" id="card-number" placeholder="**** **** **** 1234" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700">Expiración</label>
                                <input type="text" id="expiry-date" placeholder="MM/AA" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                            <div className="col-span-2">
                                <label htmlFor="cvc" className="block text-sm font-medium text-gray-700">CVC</label>
                                <input type="text" id="cvc" placeholder="123" className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                        </div>
                    </div>
                );
            case 'paypal':
                return (
                    <div className="text-center bg-gray-100 p-6 rounded-md">
                        <p className="text-text-light mb-4">Serás redirigido a PayPal para completar tu pago.</p>
                        <button type="button" className="bg-[#00457C] text-white font-bold py-3 px-8 rounded-full shadow-lg hover:opacity-90 transition-opacity flex items-center justify-center w-full max-w-xs mx-auto">
                           <span className="italic font-serif text-lg">PayPal</span>
                        </button>
                    </div>
                );
            case 'cash':
                 return (
                    <div className="text-center bg-gray-100 p-6 rounded-md">
                        <p className="text-text-light">Pagarás en efectivo al momento de la entrega.</p>
                    </div>
                );
            default:
                return null;
        }
    };
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Shipping & Payment */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <form onSubmit={handlePayment}>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-4">Información de Envío</h2>
                        <div className="space-y-4">
                            <input type="text" placeholder="Nombre completo" required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            <input type="email" placeholder="Correo Electrónico" required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            <input type="text" placeholder="Dirección" required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" placeholder="Ciudad" required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                                <input type="text" placeholder="Código Postal" required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                        </div>
                    </div>

                    <div>
                        <h2 className="text-2xl font-bold mb-4">Método de Pago</h2>
                        <div className="space-y-4">
                            <div className="flex gap-4 mb-4">
                                <button type="button" onClick={() => setPaymentMethod('credit-card')} className={`flex-1 p-4 border rounded-md text-sm ${paymentMethod === 'credit-card' ? 'border-primary ring-2 ring-primary' : ''}`}>Tarjeta de Crédito</button>
                                <button type="button" onClick={() => setPaymentMethod('paypal')} className={`flex-1 p-4 border rounded-md text-sm ${paymentMethod === 'paypal' ? 'border-primary ring-2 ring-primary' : ''}`}>PayPal</button>
                                <button type="button" onClick={() => setPaymentMethod('cash')} className={`flex-1 p-4 border rounded-md text-sm ${paymentMethod === 'cash' ? 'border-primary ring-2 ring-primary' : ''}`}>Efectivo</button>
                            </div>
                            {renderPaymentDetails()}
                        </div>
                    </div>
                    
                    <button type="submit" disabled={isProcessing} className="mt-8 w-full bg-primary text-white font-semibold py-3 rounded-md hover:bg-rose-700 transition-colors disabled:bg-gray-400">
                        {isProcessing ? 'Procesando...' : `Pagar $${totalWithShipping.toFixed(2)}`}
                    </button>
                </form>
            </div>
            
            {/* Right Column: Order Summary */}
            <div className="bg-white p-8 rounded-lg shadow-lg h-fit sticky top-24">
                <h2 className="text-2xl font-bold mb-4">Resumen del Pedido</h2>
                <div className="space-y-3 max-h-64 overflow-y-auto pr-2">
                    {cartItems.map(item => (
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
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-text-light">
                        <span>Envío</span>
                        <span>${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-2 pt-2 border-t">
                        <span>Total</span>
                        <span>${totalWithShipping.toFixed(2)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;