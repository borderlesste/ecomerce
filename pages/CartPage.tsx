
import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { CartItem } from '../types';

const CartItemRow: React.FC<{ item: CartItem }> = ({ item }) => {
    const { updateQuantity, removeFromCart } = useCart();
    const onSale = item.salePrice && item.salePrice < item.price;
    const priceToUse = onSale ? item.salePrice! : item.price;

    return (
        <div className="flex flex-col sm:flex-row items-start sm:items-center py-4 border-b gap-4">
            <div className="flex items-center gap-4 flex-grow w-full sm:w-auto">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md" />
                <div className="flex-grow">
                    <h3 className="font-semibold">{item.name}</h3>
                    <p className="text-sm text-text-light">{item.brand}</p>
                    <button onClick={() => removeFromCart(item.id)} className="text-xs text-red-500 hover:underline mt-1">Eliminar</button>
                </div>
            </div>
            <div className="flex items-center justify-between w-full sm:w-auto sm:justify-end gap-4">
                <input 
                    type="number" 
                    value={item.quantity} 
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    min="1"
                    className="w-20 text-center border rounded-md p-1"
                    aria-label={`Cantidad para ${item.name}`}
                />
                <div className="w-24 text-right">
                    <p className="font-semibold text-base">${(priceToUse * item.quantity).toFixed(2)}</p>
                    {onSale && (
                        <p className="line-through text-sm text-text-light">${(item.price * item.quantity).toFixed(2)}</p>
                    )}
                </div>
            </div>
        </div>
    );
};


const CartPage: React.FC = () => {
    const { cartItems, totalAmount } = useCart();
    const shippingCost = 5.00;
    const totalWithShipping = totalAmount > 0 ? totalAmount + shippingCost : 0;

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
        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6">Tu Carrito</h1>
            <div>
                {cartItems.map(item => <CartItemRow key={item.id} item={item} />)}
            </div>
            <div className="mt-6 flex justify-end">
                <div className="w-full max-w-sm">
                    <div className="space-y-2">
                        <div className="flex justify-between text-text-light">
                            <span>Subtotal</span>
                            <span>${totalAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-text-light">
                            <span>Envío</span>
                            <span>${totalAmount > 0 ? shippingCost.toFixed(2) : '0.00'}</span>
                        </div>
                    </div>
                    <div className="flex justify-between font-bold text-lg mt-4 pt-4 border-t">
                        <span>Total</span>
                        <span>${totalWithShipping.toFixed(2)}</span>
                    </div>
                    <Link to="/checkout" className="mt-6 block w-full text-center bg-primary text-white font-semibold py-3 rounded-md hover:bg-rose-700 transition-colors">
                       Proceder al Pago
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default CartPage;