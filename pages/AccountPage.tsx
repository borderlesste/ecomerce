
import React, { useState } from 'react';

const AccountPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-text-main">
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h2>
        
        <form className="space-y-6">
          {!isLogin && (
             <div>
                <label htmlFor="name" className="text-sm font-medium text-text-main block mb-2">Nombre</label>
                <input type="text" id="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" required />
            </div>
          )}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-text-main block mb-2">Correo Electrónico</label>
            <input type="email" id="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" required />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-text-main block mb-2">Contraseña</label>
            <input type="password" id="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" required />
          </div>
          {isLogin && (
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input type="checkbox" id="remember" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"/>
                <label htmlFor="remember" className="ml-2 block text-sm text-text-light">Recuérdame</label>
              </div>
              <a href="#" className="text-sm text-primary hover:underline">¿Olvidaste tu contraseña?</a>
            </div>
          )}
          <div>
            <button type="submit" className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-rose-700 transition-colors">
              {isLogin ? 'Entrar' : 'Registrarse'}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-text-light">
          {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
          <button onClick={() => setIsLogin(!isLogin)} className="font-medium text-primary hover:underline ml-1">
            {isLogin ? 'Regístrate' : 'Inicia Sesión'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AccountPage;
