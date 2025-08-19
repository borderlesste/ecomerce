
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ProfileDetails from '../components/profile/ProfileDetails';
import PasswordSettings from '../components/profile/PasswordSettings';
import OrderHistory from '../components/profile/OrderHistory';

type ProfileView = 'details' | 'password' | 'orders';

const UserIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
    </svg>
  );
  
const LockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
    </svg>
);

const BoxIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
    </svg>
);

const ProfilePage: React.FC = () => {
    const { session, user, loading: authLoading, signOut } = useAuth();
    const navigate = useNavigate();
    const [activeView, setActiveView] = useState<ProfileView>('details');

    useEffect(() => {
        if (!authLoading && !session) {
            navigate('/cuenta');
        }
    }, [session, authLoading, navigate]);

    if (authLoading || !user) {
        return <LoadingSpinner />;
    }
    
    const getNavButtonClass = (view: ProfileView) => 
        `flex items-center gap-3 w-full text-left px-4 py-3 rounded-md text-sm font-medium transition-colors ${
        activeView === view
            ? 'bg-primary-light text-primary'
            : 'text-text-light hover:bg-gray-100 hover:text-text-main'
        }`;

    const renderContent = () => {
        switch (activeView) {
            case 'details':
                return <ProfileDetails />;
            case 'password':
                return <PasswordSettings />;
            case 'orders':
                return <OrderHistory />;
            default:
                return null;
        }
    };

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Sidebar Navigation */}
            <aside className="md:col-span-1 bg-white p-4 rounded-lg shadow-lg h-fit">
                <div className="flex flex-col items-center text-center p-4 border-b mb-4">
                    <div className="w-24 h-24 rounded-full bg-primary-light flex items-center justify-center mb-3">
                         <UserIcon className="w-12 h-12 text-primary" />
                    </div>
                    <h2 className="font-bold text-text-main text-lg truncate">{user.user_metadata.full_name || 'Usuario'}</h2>
                    <p className="text-text-light text-sm truncate">{user.email}</p>
                </div>
                <nav className="flex md:flex-col gap-2">
                    <button onClick={() => setActiveView('details')} className={getNavButtonClass('details')}>
                        <UserIcon className="w-5 h-5"/>
                        <span className="flex-grow">Mi Perfil</span>
                    </button>
                    <button onClick={() => setActiveView('password')} className={getNavButtonClass('password')}>
                        <LockIcon className="w-5 h-5"/>
                        <span className="flex-grow">Seguridad</span>
                    </button>
                     <button onClick={() => setActiveView('orders')} className={getNavButtonClass('orders')}>
                        <BoxIcon className="w-5 h-5"/>
                        <span className="flex-grow">Mis Pedidos</span>
                    </button>
                </nav>
                 <div className="mt-4 border-t pt-4">
                     <button
                        onClick={signOut}
                        className="w-full text-left px-4 py-3 rounded-md text-sm font-medium text-text-light hover:bg-red-50 hover:text-red-600 transition-colors"
                    >
                        Cerrar Sesión
                    </button>
                </div>
            </aside>

            {/* Content Area */}
            <main className="md:col-span-3">
                {renderContent()}
            </main>
        </div>
    );
};

export default ProfilePage;
