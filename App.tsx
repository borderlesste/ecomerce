
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import { AuthProvider } from './context/AuthContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import WomenPage from './pages/WomenPage';
import MenPage from './pages/MenPage';
import BoysPage from './pages/BoysPage';
import GirlsPage from './pages/GirlsPage';
import AccountPage from './pages/AccountPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import SearchPage from './pages/SearchPage';
import OffersPage from './pages/OffersPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import { isSupabaseConfigured } from './supabase/client';

const WarningBanner: React.FC = () => (
  <div className="bg-yellow-400 text-center p-2 text-sm font-semibold text-yellow-900 shadow-md">
    <strong>Advertencia:</strong> La conexión a Supabase no está configurada. La aplicación no funcionará correctamente. Por favor, configure las variables de entorno <code>SUPABASE_URL</code> y <code>SUPABASE_ANON_KEY</code>.
  </div>
);

const App: React.FC = () => {
  return (
    <ProductProvider>
      <AuthProvider>
        <CartProvider>
          <HashRouter>
            <div className="flex flex-col min-h-screen font-sans text-text-main">
              {!isSupabaseConfigured && <WarningBanner />}
              <Header />
              <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/search" element={<SearchPage />} />
                  <Route path="/ofertas" element={<OffersPage />} />
                  <Route path="/mujer" element={<WomenPage />} />
                  <Route path="/hombre" element={<MenPage />} />
                  <Route path="/ninos" element={<BoysPage />} />
                  <Route path="/ninas" element={<GirlsPage />} />
                  <Route path="/cuenta" element={<AccountPage />} />
                  <Route path="/perfil" element={<ProfilePage />} />
                  <Route path="/carrito" element={<CartPage />} />
                  <Route path="/admin" element={<AdminPage />} />
                  <Route path="/producto/:productId" element={<ProductDetailPage />} />
                  <Route path="/checkout" element={<CheckoutPage />} />
                  <Route path="/confirmacion-pedido" element={<OrderConfirmationPage />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </HashRouter>
        </CartProvider>
      </AuthProvider>
    </ProductProvider>
  );
};

export default App;