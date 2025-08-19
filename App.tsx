import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import WomenPage from './pages/WomenPage';
import MenPage from './pages/MenPage';
import BoysPage from './pages/BoysPage';
import GirlsPage from './pages/GirlsPage';
import AccountPage from './pages/AccountPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';
import SearchPage from './pages/SearchPage';

const App: React.FC = () => {
  return (
    <ProductProvider>
      <CartProvider>
        <HashRouter>
          <div className="flex flex-col min-h-screen font-sans text-text-main">
            <Header />
            <main className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/mujer" element={<WomenPage />} />
                <Route path="/hombre" element={<MenPage />} />
                <Route path="/ninos" element={<BoysPage />} />
                <Route path="/ninas" element={<GirlsPage />} />
                <Route path="/cuenta" element={<AccountPage />} />
                <Route path="/carrito" element={<CartPage />} />
                <Route path="/admin" element={<AdminPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </HashRouter>
      </CartProvider>
    </ProductProvider>
  );
};

export default App;