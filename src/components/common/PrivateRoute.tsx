'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { Loader2 } from 'lucide-react';

interface PrivateRouteProps {
  children: React.ReactNode;
}

export const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // Only redirect if authentication check is completely done and no user exists
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  // While auth state is verifying on initial load / reload, show loader
  if (loading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
        <Loader2 className="w-10 h-10 text-primary animate-spin" />
        <p className="text-sm text-foreground-muted">Checking authentication status...</p>
      </div>
    );
  }

  // If unauthenticated, return null while redirect triggers
  if (!user) {
    return null;
  }

  return <>{children}</>;
};

