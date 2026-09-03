// File: frontend/src/components/layout/SearchOverlay.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { getItems } from '../../lib/menu';
import type { MenuItem } from '../../types/menu';

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: Props) {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [allItems, setAllItems] = useState<MenuItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Fetch the full menu once, the first time the overlay opens — not on
  // every keystroke, since this is a small dataset well suited to
  // client-side filtering (same reasoning as the menu page's search).
  useEffect(() => {
    if (open && !loaded) {
      getItems({ availableOnly: true })
        .then((data) => {
          setAllItems(data.items);
          setLoaded(true);
        })
        .catch(() => {
          // Non-fatal: overlay still opens, just shows no results.
        });
    }
  }, [open, loaded]);

  // Close on Escape, and reset the query each time the overlay closes so
  // reopening it doesn't show a stale search.
  useEffect(() => {
    if (!open) {
      setQuery('');
      return;
    }
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [open, onClose]);

  if (!open) return null;

  const results = query.trim()
    ? allItems.filter((item) => item.name.toLowerCase().includes(query.trim().toLowerCase()))
    : [];

  const goToMenu = (categorySlug?: string) => {
    onClose();
    router.push(categorySlug ? `/menu?category=${categorySlug}` : '/menu');
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 px-6 pt-24 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl rounded-2xl bg-brand-dark ring-1 ring-white/10"
      >
        <div className="flex items-center gap-3 border-b border-white/10 px-5 py-4">
          <Search size={18} className="text-white/40" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the menu…"
            className="flex-1 bg-transparent text-white placeholder:text-white/40 outline-none"
          />
          <button onClick={onClose} aria-label="Close search" className="text-white/40 hover:text-white">
            <X size={18} />
          </button>
        </div>

        <div className="max-h-96 overflow-y-auto p-2">
          {!query.trim() && (
            <p className="px-3 py-6 text-center text-sm text-white/40">
              Start typing to search the menu.
            </p>
          )}

          {query.trim() && !loaded && (
            <p className="px-3 py-6 text-center text-sm text-white/40">Loading menu…</p>
          )}

          {query.trim() && loaded && results.length === 0 && (
            <p className="px-3 py-6 text-center text-sm text-white/40">
              No items match &ldquo;{query}&rdquo;.
            </p>
          )}

          {results.map((item) => (
            <button
              key={item.id}
              onClick={() => goToMenu(item.category_slug)}
              className="flex w-full items-center justify-between rounded-lg px-3 py-3 text-left hover:bg-white/5"
            >
              <div>
                <p className="text-sm text-white">{item.name}</p>
                <p className="text-xs text-white/40">{item.category_name}</p>
              </div>
              <span className="text-sm font-semibold text-brand-gold">
                ${Number(item.price).toFixed(2)}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}