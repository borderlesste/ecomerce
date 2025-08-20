
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase/client';

// Agrega la definición de 'paypal' al objeto window para TypeScript
declare global {
  interface Window {
    paypal: any;
  }
}

const PayPalButtonsComponent: React.FC<{
  shippingInfo: object;
  onSuccessfulCheckout: (orderId: string) => void;
}> = ({ shippingInfo, onSuccessfulCheckout }) => {
  const { cartItems } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const paypalRef = useRef<HTMLDivElement>(null);

  // Use a ref to hold the latest props. This allows the effect that
  // renders the buttons to run only once, while the callbacks inside
  // it can still access the most recent prop values.
  const latestProps = useRef({ shippingInfo, cartItems, onSuccessfulCheckout });
  useEffect(() => {
    latestProps.current = { shippingInfo, cartItems, onSuccessfulCheckout };
  });

  useEffect(() => {
    // Render the PayPal buttons only once, when the component mounts.
    // An empty dependency array [] ensures this effect runs only on mount and unmount.
    if (window.paypal && paypalRef.current && paypalRef.current.innerHTML === '') {
      window.paypal.Buttons({
        createOrder: async () => {
          setIsProcessing(true);
          setError(null);
          try {
            // Access latest props via the ref inside the callback
            const { cartItems, shippingInfo } = latestProps.current;
            const { data, error: funcError } = await supabase.functions.invoke('create-order', {
              body: { cartItems, shippingInfo },
            });
            if (funcError) throw new Error(funcError.message);
            setIsProcessing(false);
            return data.paypalOrderId;
          } catch (err: any) {
            setError('No se pudo crear el pedido de PayPal. Por favor, inténtelo de nuevo.');
            setIsProcessing(false);
            return null;
          }
        },
        onApprove: async (data: { orderID: string }) => {
          setIsProcessing(true);
          setError(null);
          try {
            const { onSuccessfulCheckout } = latestProps.current;
            const { data: result, error: funcError } = await supabase.functions.invoke('capture-order', {
              body: { paypalOrderId: data.orderID },
            });
            if (funcError) throw new Error(funcError.message);
            onSuccessfulCheckout(result.orderId);
          } catch (err: any) {
            setError('Error al procesar el pago. No se le ha cobrado. Por favor, inténtelo de nuevo.');
            setIsProcessing(false);
          }
        },
        onError: (err: any) => {
          setError('Ocurrió un error con PayPal. Por favor, refresque la página e inténtelo de nuevo.');
          setIsProcessing(false);
        },
      }).render(paypalRef.current);
    }
  }, []);

  return (
    <div className="mt-6 min-h-[100px]">
      {isProcessing && <div className="text-center text-text-light">Procesando...</div>}
      {error && <div className="text-red-600 text-center p-2 bg-red-50 rounded-md">{error}</div>}
      <div ref={paypalRef} className={`${isProcessing ? 'hidden' : ''}`}></div>
    </div>
  );
};


const CheckoutPage: React.FC = () => {
    const { cartItems, totalAmount, clearCart } = useCart();
    const navigate = useNavigate();
    const [shippingInfo, setShippingInfo] = useState({
        fullName: '',
        email: '',
        address: '',
        city: '',
        postalCode: '',
    });
    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const shippingCost = totalAmount > 0 ? 5.00 : 0;
    const totalWithShipping = totalAmount + shippingCost;
    
    useEffect(() => {
        if (cartItems.length === 0) {
           navigate('/carrito');
        }
    }, [cartItems, navigate]);

    const handleShippingSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsFormSubmitted(true);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setShippingInfo(prev => ({ ...prev, [name]: value }));
    };

    const onSuccessfulCheckout = useCallback((orderId: string) => {
        clearCart();
        navigate('/confirmacion-pedido', { state: { orderId } });
    }, [clearCart, navigate]);
    
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Left Column: Shipping & Payment */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <div className="mb-8">
                    <h2 className="text-2xl font-bold mb-4">Información de Envío</h2>
                    <form onSubmit={handleShippingSubmit} className={`${isFormSubmitted ? 'opacity-50 pointer-events-none' : ''}`}>
                        <div className="space-y-4">
                            <input type="text" name="fullName" placeholder="Nombre completo" value={shippingInfo.fullName} onChange={handleInputChange} required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            <input type="email" name="email" placeholder="Correo Electrónico" value={shippingInfo.email} onChange={handleInputChange} required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            <input type="text" name="address" placeholder="Dirección" value={shippingInfo.address} onChange={handleInputChange} required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            <div className="grid grid-cols-2 gap-4">
                                <input type="text" name="city" placeholder="Ciudad" value={shippingInfo.city} onChange={handleInputChange} required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                                <input type="text" name="postalCode" placeholder="Código Postal" value={shippingInfo.postalCode} onChange={handleInputChange} required className="block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                            </div>
                        </div>
                        <button type="submit" className="mt-8 w-full bg-primary text-white font-semibold py-3 rounded-md hover:bg-rose-700 transition-colors">
                            Continuar al Pago
                        </button>
                    </form>
                </div>

                {isFormSubmitted && (
                    <div>
                        <h2 className="text-2xl font-bold mb-4">Método de Pago</h2>
                        <PayPalButtonsComponent 
                            shippingInfo={shippingInfo}
                            onSuccessfulCheckout={onSuccessfulCheckout}
                        />
                    </div>
                )}
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
