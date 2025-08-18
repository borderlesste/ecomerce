
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-text-main">Belleza Pura</h3>
            <p className="mt-2 text-text-light text-sm">Tu tienda de confianza para cosméticos de lujo.</p>
          </div>
          <div>
            <h4 className="font-semibold text-text-main">Contacto</h4>
            <ul className="mt-2 space-y-1 text-sm text-text-light">
              <li>info@bellezapura.com</li>
              <li>+1 (234) 567-890</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-main">Legal</h4>
            <ul className="mt-2 space-y-1 text-sm text-text-light">
              <li><a href="#" className="hover:text-primary">Política de Privacidad</a></li>
              <li><a href="#" className="hover:text-primary">Términos y Condiciones</a></li>
              <li><a href="#/admin" className="hover:text-primary">Panel de Administración</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-text-main">Síguenos</h4>
            <div className="flex mt-2 space-x-4">
              <a href="#" className="text-text-light hover:text-primary">
                <span className="sr-only">Facebook</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-text-light hover:text-primary">
                <span className="sr-only">Instagram</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.012-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.08 2.525c.636-.247 1.363-.416 2.427-.465C9.53 2.013 9.884 2 12.315 2zM12 7.177a4.823 4.823 0 100 9.646 4.823 4.823 0 000-9.646zm0 7.646a2.823 2.823 0 110-5.646 2.823 2.823 0 010 5.646zM18.255 6.167a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-200 pt-8 text-center text-sm text-text-light">
          <p>&copy; {new Date().getFullYear()} Cosméticos Belleza Pura. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;