// File: frontend/src/components/admin/CategoryManager.tsx
'use client';

import { useState, type FormEvent } from 'react';
import { Trash2 } from 'lucide-react';
import { adminMenuApi } from '../../lib/adminMenu';
import type { MenuCategory } from '../../types/menu';

interface Props {
  categories: MenuCategory[];
  onChange: () => void;
}

export function CategoryManager({ categories, onChange }: Props) {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleAdd = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await adminMenuApi.createCategory({ name, slug });
      setName('');
      setSlug('');
      onChange();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not add category');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Delete this category? This only works if it has no menu items.')) return;
    try {
      await adminMenuApi.deleteCategory(id);
      onChange();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Could not delete category');
    }
  };

  return (
    <div className="rounded-2xl bg-white/5 p-6">
      <h2 className="font-display text-xl text-white">Categories</h2>

      <ul className="mt-4 space-y-2">
        {categories.map((cat) => (
          <li key={cat.id} className="flex items-center justify-between rounded-lg bg-white/5 px-4 py-2.5">
            <span className="text-sm text-white">
              {cat.name} <span className="text-white/40">/{cat.slug}</span>
            </span>
            <button onClick={() => handleDelete(cat.id)} className="text-white/40 hover:text-red-400">
              <Trash2 size={16} />
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAdd} className="mt-4 flex gap-2">
        <input
          required
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
        />
        <input
          required
          placeholder="slug"
          pattern="[a-z0-9-]+"
          title="lowercase letters, numbers, hyphens only"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className="w-32 rounded-lg bg-white/5 px-3 py-2 text-sm text-white outline-none ring-1 ring-white/10 focus:ring-brand-gold"
        />
        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-brand-gold px-4 py-2 text-sm font-semibold text-brand-dark hover:brightness-110 disabled:opacity-60"
        >
          Add
        </button>
      </form>
      {error && <p className="mt-2 text-sm text-red-400">{error}</p>}
    </div>
  );
}