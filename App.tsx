
import React from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ProductProvider } from './context/ProductContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './pages/HomePage';
import PerfumesPage from './pages/PerfumesPage';
import HairProductsPage from './pages/HairProductsPage';
import ClothingPage from './pages/ClothingPage';
import AccountPage from './pages/AccountPage';
import CartPage from './pages/CartPage';
import AdminPage from './pages/AdminPage';

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
                <Route path="/perfumes" element={<PerfumesPage />} />
                <Route path="/cabello" element={<HairProductsPage />} />
                <Route path="/ropa" element={<ClothingPage />} />
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
