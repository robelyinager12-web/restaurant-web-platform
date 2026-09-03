// File: frontend/src/components/auth/RequireAuth.tsx
'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

// Wrap any page that requires a logged-in user. Redirects to /login,
// preserving the original destination so we can send them back after.
export function RequireAuth({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      const redirectTo = typeof window !== 'undefined' ? window.location.pathname : '/';
      router.push(`/login?redirect=${encodeURIComponent(redirectTo)}`);
    }
  }, [loading, user, router]);

  if (loading || !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-brand-dark">
        <p className="text-white/50">Loading…</p>
      </div>
    );
  }

  return <>{children}</>;
}
