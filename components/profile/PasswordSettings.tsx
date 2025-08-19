
import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const PasswordSettings: React.FC = () => {
    const { updateUser } = useAuth();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            setMessage({ type: 'error', text: 'Las contraseñas no coinciden.' });
            return;
        }
        if(password.length < 6) {
            setMessage({ type: 'error', text: 'La contraseña debe tener al menos 6 caracteres.' });
            return;
        }

        setLoading(true);
        setMessage(null);

        const { error } = await updateUser({ password });

        if (error) {
            setMessage({ type: 'error', text: 'Error al cambiar la contraseña. Inténtalo de nuevo.' });
        } else {
            setMessage({ type: 'success', text: '¡Contraseña cambiada con éxito!' });
            setPassword('');
            setConfirmPassword('');
        }
        setLoading(false);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-text-main mb-6">Seguridad</h2>
            <form onSubmit={handleSubmit} className="space-y-6 max-w-md">
                <div>
                    <label htmlFor="password" className="block text-sm font-medium text-text-main">
                        Nueva Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        required
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-text-main">
                        Confirmar Nueva Contraseña
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-primary focus:border-primary"
                        required
                    />
                </div>
                 <div className="flex items-center gap-4">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-primary text-white font-semibold py-2 px-6 rounded-md hover:bg-rose-700 transition-colors disabled:bg-gray-400"
                    >
                        {loading ? 'Cambiando...' : 'Cambiar Contraseña'}
                    </button>
                    {message && (
                        <span className={`text-sm font-medium ${message.type === 'success' ? 'text-green-600' : 'text-red-600'}`}>
                            {message.text}
                        </span>
                    )}
                </div>
            </form>
        </div>
    );
};

export default PasswordSettings;
