// File: frontend/src/app/(auth)/login/page.tsx
'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AuthCard } from '../../../components/auth/AuthCard';
import { useAuth } from '../../../context/AuthContext';
import { useLanguage } from '../../../context/LanguageContext';

export default function LoginPage() {
  const { login } = useAuth();
  const { t } = useLanguage();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      const redirect = searchParams.get('redirect');
      router.push(redirect || '/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard title={t.login.title}>
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-white/60">{t.login.email}</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-white/60">{t.login.password}</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
          />
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-brand-gold py-3.5 text-sm font-semibold text-brand-dark hover:brightness-110 transition disabled:opacity-60"
        >
          {submitting ? t.login.submitting : t.login.submit}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-white/50">
        {t.login.noAccount}{' '}
        <Link href="/register" className="text-brand-gold hover:underline">
          {t.login.register}
        </Link>
      </p>
    </AuthCard>
  );
}