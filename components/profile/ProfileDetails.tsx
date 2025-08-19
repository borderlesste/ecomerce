
import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

const ProfileDetails: React.FC = () => {
    const { user, updateUser } = useAuth();
    const [fullName, setFullName] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    useEffect(() => {
        if (user?.user_metadata.full_name) {
            setFullName(user.user_metadata.full_name);
        }
    }, [user]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        const { error } = await updateUser({ data: { full_name: fullName } });

        if (error) {
            setMessage({ type: 'error', text: 'Hubo un error al actualizar tu perfil.' });
        } else {
            setMessage({ type: 'success', text: '¡Perfil actualizado con éxito!' });
        }
        setLoading(false);
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-text-main mb-6">Mi Perfil</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-text-main">
                        Correo Electrónico
                    </label>
                    <input
                        type="email"
                        id="email"
                        value={user?.email || ''}
                        disabled
                        className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100 cursor-not-allowed"
                    />
                </div>
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-text-main">
                        Nombre Completo
                    </label>
                    <input
                        type="text"
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
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
                        {loading ? 'Guardando...' : 'Guardar Cambios'}
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

export default ProfileDetails;
