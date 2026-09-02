// File: frontend/src/app/(auth)/register/page.tsx
'use client';

import { useState, type FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AuthCard } from '../../../components/auth/AuthCard';
import { useAuth } from '../../../context/AuthContext';

export default function RegisterPage() {
  const { register } = useAuth();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (field: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await register(form);
      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthCard title="Create Account">
      <form onSubmit={handleSubmit} className="mt-8 space-y-4">
        <div>
          <label className="mb-1.5 block text-sm text-white/60">Full name</label>
          <input
            required
            value={form.name}
            onChange={handleChange('name')}
            className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-white/60">Email</label>
          <input
            type="email"
            required
            value={form.email}
            onChange={handleChange('email')}
            className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-white/60">Phone (optional)</label>
          <input
            value={form.phone}
            onChange={handleChange('phone')}
            className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm text-white/60">Password</label>
          <input
            type="password"
            required
            minLength={8}
            value={form.password}
            onChange={handleChange('password')}
            className="w-full rounded-lg bg-white/5 px-4 py-3 text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
          />
          <p className="mt-1 text-xs text-white/40">At least 8 characters.</p>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-full bg-brand-gold py-3.5 text-sm font-semibold text-brand-dark hover:brightness-110 transition disabled:opacity-60"
        >
          {submitting ? 'Creating account…' : 'Register'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-white/50">
        Already have an account?{' '}
        <Link href="/login" className="text-brand-gold hover:underline">
          Sign in
        </Link>
      </p>
    </AuthCard>
  );
}