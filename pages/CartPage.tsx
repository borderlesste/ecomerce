
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { CartItem } from '../types';

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();
    return (
        <div className="flex items-center py-4 border-b">
            <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
            <div className="flex-grow ml-4">
                <h3 className="font-semibold">{item.name}</h3>
                <p className="text-sm text-text-light">{item.brand}</p>
                 <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:underline mt-1">Eliminar</button>
            </div>
            <div className="flex items-center">
                <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    min="1"
                    className="w-16 text-center border rounded-md"
                />
            </div>
            <div className="w-24 text-right font-semibold">
                ${(item.price * item.quantity).toFixed(2)}
            </div>
        </div>
    );
};


const CartPage: React.FC = () => {
    const { cartItems, totalAmount } = useCart();
    const shippingCost = 5.00;
    const totalWithShipping = totalAmount + shippingCost;

    if (cartItems.length === 0) {
        return (
            <div className="text-center py-20 bg-white rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold text-text-main">Tu carrito está vacío</h1>
                <p className="mt-2 text-text-light">Parece que no has añadido nada a tu carrito.</p>
                <Link to="/" className="mt-6 inline-block bg-primary text-white font-semibold py-3 px-6 rounded-md hover:bg-rose-700 transition-colors">
                    Continuar Comprando
                </Link>
            </div>
        );
    }

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h1 className="text-3xl font-bold mb-6">Tu Carrito</h1>
            <div>
                {cartItems.map(item => <CartItemRow key={item.id} item={item} />)}
            </div>
            <div className="mt-6 flex justify-end">
                <div className="w-full max-w-sm">
                    <div className="flex justify-between text-text-light">
                        <span>Subtotal</span>
                        <span>${totalAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-text-light mt-2">
                        <span>Envío</span>
                        <span>${shippingCost.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                        <span>Total</span>
                        <span>${totalWithShipping.toFixed(2)}</span>
                    </div>
                    <button className="mt-6 w-full bg-primary text-white font-semibold py-3 rounded-md hover:bg-rose-700 transition-colors">
                       Proceder al Pago
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartPage;
