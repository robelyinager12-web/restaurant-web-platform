// File: frontend/src/components/auth/AuthCard.tsx
import type { ReactNode } from 'react';

export function AuthCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-dark px-6">
      <div className="w-full max-w-md rounded-2xl bg-white/5 p-8">
        <h1 className="font-display text-3xl italic text-white text-center">{title}</h1>
        {children}
      </div>
    </div>
  );
}