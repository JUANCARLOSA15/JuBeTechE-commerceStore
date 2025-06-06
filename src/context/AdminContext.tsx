import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';

interface AdminContextType {
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  loading: boolean;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkSession();
    
    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('Auth state changed:', event, session?.user?.email);
      if (session?.user) {
        // Check if user has admin role
        const isAdmin = session.user.user_metadata?.role === 'admin' || 
                       session.user.app_metadata?.role === 'admin';
        console.log('User role check:', {
          user_metadata: session.user.user_metadata,
          app_metadata: session.user.app_metadata,
          isAdmin
        });
        setIsAuthenticated(isAdmin);
      } else {
        setIsAuthenticated(false);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkSession = async () => {
    try {
      console.log('Checking current session...');
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error) {
        console.error('Error getting user:', error);
        setIsAuthenticated(false);
        setLoading(false);
        return;
      }

      console.log('Current user:', user);
      
      if (user) {
        const isAdmin = user.user_metadata?.role === 'admin' || 
                       user.app_metadata?.role === 'admin';
        console.log('Admin check result:', isAdmin);
        setIsAuthenticated(isAdmin);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error in checkSession:', error);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    try {
      console.log('Attempting login for:', email);
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        console.error('Login error:', error);
        throw error;
      }

      console.log('Login successful:', data.user?.email);
      console.log('User metadata:', data.user?.user_metadata);
      console.log('App metadata:', data.user?.app_metadata);

      // Check if user has admin role
      const isAdmin = data.user?.user_metadata?.role === 'admin' || 
                     data.user?.app_metadata?.role === 'admin';
      
      console.log('Is admin?', isAdmin);

      if (isAdmin) {
        setIsAuthenticated(true);
        return true;
      } else {
        // If not admin, sign out
        console.log('User is not admin, signing out...');
        await supabase.auth.signOut();
        setIsAuthenticated(false);
        return false;
      }
    } catch (error) {
      console.error('Error in login:', error);
      setIsAuthenticated(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      console.log('Logging out...');
      setLoading(true);
      await supabase.auth.signOut();
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminContext.Provider value={{ isAuthenticated, login, logout, loading }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};