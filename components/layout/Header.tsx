
import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';

const Logo: React.FC = () => (
  <NavLink to="/" className="flex items-center gap-2">
    <span className="bg-accent text-white font-bold text-xl w-9 h-9 flex items-center justify-center rounded-full">B</span>
    <span className="text-2xl font-bold text-text-main">Belleza</span>
  </NavLink>
);

const Header: React.FC = () => {
  const { itemCount } = useCart();
  const { session } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const navLinkClass = ({ isActive }: { isActive: boolean }): string => 
    `text-sm font-medium transition-colors hover:text-primary ${isActive ? 'text-primary' : 'text-text-main'}`;

  const mobileNavLinkClass = ({ isActive }: { isActive: boolean }): string => 
    `block py-2 px-4 text-lg font-medium transition-colors hover:text-primary ${isActive ? 'text-primary bg-primary-light rounded-md' : 'text-text-main'}`;


  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          <div className="flex-shrink-0">
            <Logo />
          </div>

          <nav className="hidden lg:flex lg:gap-x-8">
            <NavLink to="/mujer" className={navLinkClass}>Mujer</NavLink>
            <NavLink to="/hombre" className={navLinkClass}>Hombre</NavLink>
            <NavLink to="/ninos" className={navLinkClass}>Niños</NavLink>
            <NavLink to="/ninas" className={navLinkClass}>Niñas</NavLink>
          </nav>

          <div className="flex items-center gap-x-4">
            <form onSubmit={handleSearchSubmit} className="relative hidden md:block">
              <input 
                type="search" 
                placeholder="Buscar productos..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full lg:w-64 pl-4 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary-light"
              />
              <button type="submit" aria-label="Buscar" className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-primary">
                <SearchIcon className="h-5 w-5" />
              </button>
            </form>

            <div className="flex items-center gap-x-4">
              <NavLink to="#" className={`${navLinkClass} relative`} aria-label="Lista de deseos">
                <HeartIcon className="h-6 w-6" />
                <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">3</span>
              </NavLink>
              <NavLink to="/cuenta" className={navLinkClass} aria-label="Mi cuenta">
                <UserIcon className="h-6 w-6" />
                 {session && <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-green-400 ring-2 ring-white" />}
              </NavLink>
              <NavLink to="/carrito" className={`${navLinkClass} relative`} aria-label={`Carrito con ${itemCount} productos`}>
                <ShoppingCartIcon className="h-6 w-6" />
                {itemCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {itemCount}
                  </span>
                )}
              </NavLink>
            </div>
             <button
              className="lg:hidden text-text-main"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Abrir menú"
            >
              <MenuIcon className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

       {/* Mobile Menu */}
       <div className={`fixed inset-0 z-50 transform ${isMobileMenuOpen ? "translate-x-0" : "translate-x-full"} transition-transform duration-300 ease-in-out lg:hidden`}>
            <div className="fixed inset-0 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="relative bg-white w-4/5 max-w-sm h-full ml-auto p-6 flex flex-col">
                <button
                    className="self-end mb-6"
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-label="Cerrar menú"
                >
                    <CloseIcon className="h-6 w-6 text-text-main" />
                </button>
                <nav className="flex flex-col gap-y-4 mb-8">
                    <NavLink to="/mujer" className={mobileNavLinkClass}>Mujer</NavLink>
                    <NavLink to="/hombre" className={mobileNavLinkClass}>Hombre</NavLink>
                    <NavLink to="/ninos" className={mobileNavLinkClass}>Niños</NavLink>
                    <NavLink to="/ninas" className={mobileNavLinkClass}>Niñas</NavLink>
                </nav>
                 <form onSubmit={handleSearchSubmit} className="relative">
                    <input 
                        type="search" 
                        placeholder="Buscar productos..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-4 pr-10 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary-light"
                    />
                    <button type="submit" aria-label="Buscar" className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-primary">
                        <SearchIcon className="h-5 w-5" />
                    </button>
                </form>
            </div>
        </div>
    </header>
  );
};

const SearchIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
  </svg>
);

const HeartIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
    </svg>
);

const UserIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
  </svg>
);

const ShoppingCartIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
  </svg>
);

const MenuIcon: React.FC<{ className: string }> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

const CloseIcon: React.FC<{ className: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);


export default Header;