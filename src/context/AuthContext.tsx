'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { IUser } from '@/types';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: IUser | null;
  token: string | null;
  loading: boolean;
  login: (email: string, name?: string, photoURL?: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  logout: () => void;
  updateUserProfile: (name: string, photoURL: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // Restore session from localStorage or Better Auth session on initial load
  useEffect(() => {
    const restoreSession = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        const storedToken = localStorage.getItem('token');

        if (storedUser && storedToken) {
          setUser(JSON.parse(storedUser));
          setToken(storedToken);
        } else {
          // Check if Better Auth has an active session (e.g. after Google OAuth redirect)
          const session = await authClient.getSession();
          if (session.data?.user) {
            const bUser = session.data.user;
            await login(bUser.email, bUser.name || '', bUser.image || '');
          }
        }
      } catch (error) {
        console.error('Error restoring session:', error);
      } finally {
        setLoading(false);
      }
    };

    restoreSession();
  }, []);

  // Standard Login/Session handler
  const login = async (email: string, name?: string, photoURL?: string): Promise<void> => {
    try {
      const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5050/api';
      const displayName = name || email.split('@')[0];
      const avatar =
        photoURL ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(displayName)}`;

      // Request JWT token from backend
      const res = await fetch(`${API_BASE_URL}/auth/jwt`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name: displayName }),
      });

      let jwtToken = 'mock_jwt_token_fallback';
      if (res.ok) {
        const data = await res.json();
        if (data.token) {
          jwtToken = data.token;
        }
      }

      const userData: IUser = {
        email,
        displayName,
        photoURL: avatar,
      };

      setUser(userData);
      setToken(jwtToken);

      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', jwtToken);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  // Google OAuth Login with Better Auth
  const signInWithGoogle = async (): Promise<void> => {
    try {
      await authClient.signIn.social({
        provider: 'google',
        callbackURL: '/events',
      });
    } catch (error) {
      console.error('Better Auth Google Sign-in error:', error);
      throw error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error('Better Auth sign out error:', error);
    }
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    toast.success('Logged out successfully');
  };

  const updateUserProfile = async (name: string, photoURL: string): Promise<void> => {
    if (!user) return;
    const updatedUser: IUser = {
      ...user,
      displayName: name,
      photoURL: photoURL || user.photoURL,
    };
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    toast.success('Profile updated successfully');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        signInWithGoogle,
        logout,
        updateUserProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
