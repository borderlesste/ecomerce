
import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import { supabase } from '../supabase/client';
import { Session, User } from '../types';
import { UserAttributes } from '@supabase/supabase-js';

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string) => Promise<any>;
  signIn: (email: string, password: string) => Promise<any>;
  signOut: () => Promise<any>;
  updateUser: (attributes: UserAttributes) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // setLoading es true por defecto.
    // onAuthStateChange dispara un evento inmediatamente con la sesión inicial.
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setUser(session?.user ?? null);
      // Una vez que se recupera la sesión inicial, se detiene la carga.
      setLoading(false);
    });

    // Limpiar la suscripción cuando el componente se desmonte.
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, fullName: string) => {
    return supabase.auth.signUp({ 
      email, 
      password,
      options: {
        data: {
          full_name: fullName,
        }
      }
    });
  };
  
  const signIn = async (email: string, password: string) => {
    return supabase.auth.signInWithPassword({ email, password });
  };
  
  const signOut = async () => {
    return supabase.auth.signOut();
  };

  const updateUser = async (attributes: UserAttributes) => {
      const { data, error } = await supabase.auth.updateUser(attributes);
      if (data.user) {
          // Actualizar manualmente el estado local porque onAuthStateChange podría no dispararse para actualizaciones de metadatos
          setUser(prevUser => prevUser ? { ...prevUser, ...data.user } : data.user);
      }
      return { data, error };
  }
  
  const value = {
    session,
    user,
    loading,
    signUp,
    signIn,
    signOut,
    updateUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
