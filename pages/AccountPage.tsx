
import React, { useState, FormEvent } from 'react';
import { useAuth } from '../context/AuthContext';

const AccountPage: React.FC = () => {
  const { session, user, signUp, signIn, signOut } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) throw error;
      } else {
        const { error } = await signUp(email, password, fullName);
        if (error) throw error;
      }
    } catch (err: any) {
      setError(err.error_description || err.message);
    } finally {
      setLoading(false);
    }
  };

  if (session) {
    return (
      <div className="flex justify-center items-center py-10">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md text-center">
          <h2 className="text-2xl font-bold text-text-main">Bienvenido de nuevo</h2>
          <p className="text-text-light">
            Has iniciado sesión como <span className="font-semibold text-text-main">{user?.email}</span>
          </p>
          <button
            onClick={signOut}
            className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-rose-700 transition-colors"
          >
            Cerrar Sesión
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center py-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-text-main">
          {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
        </h2>
        
        {error && <p className="text-red-500 text-center text-sm">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
             <div>
                <label htmlFor="name" className="text-sm font-medium text-text-main block mb-2">Nombre Completo</label>
                <input 
                  type="text" 
                  id="name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)} 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" 
                  required 
                />
            </div>
          )}
          <div>
            <label htmlFor="email" className="text-sm font-medium text-text-main block mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              id="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" 
              required 
            />
          </div>
          <div>
            <label htmlFor="password" className="text-sm font-medium text-text-main block mb-2">Contraseña</label>
            <input 
              type="password" 
              id="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary" 
              required 
            />
          </div>
          
          <div>
            <button type="submit" disabled={loading} className="w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-rose-700 transition-colors disabled:bg-gray-400">
              {loading ? 'Procesando...' : (isLogin ? 'Entrar' : 'Registrarse')}
            </button>
          </div>
        </form>

        <p className="text-sm text-center text-text-light">
          {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
          <button onClick={() => { setIsLogin(!isLogin); setError(null); }} className="font-medium text-primary hover:underline ml-1">
            {isLogin ? 'Regístrate' : 'Inicia Sesión'}
          </button>
        </p>
        
        <div className="text-center text-xs text-gray-500 mt-6 pt-4 border-t border-gray-200">
            <p>
                <span className="font-semibold">Sugerencia:</span> Para probar el panel de administración, <button onClick={() => {setIsLogin(false); setEmail('admin@bellezapura.com');}} className="text-primary underline font-semibold">regístrate</button> con el correo <code className="bg-gray-200 text-gray-700 px-1 py-0.5 rounded">admin@bellezapura.com</code> y luego inicia sesión.
            </p>
        </div>

      </div>
    </div>
  );
};

export default AccountPage;
