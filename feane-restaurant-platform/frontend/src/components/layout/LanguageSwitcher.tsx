// File: frontend/src/components/layout/LanguageSwitcher.tsx
'use client';

import { useState, useRef, useEffect } from 'react';
import { Globe } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import type { Language } from '../../lib/translations';

const OPTIONS: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'am', label: 'አማ' },
];

export function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click.
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const current = OPTIONS.find((o) => o.code === language) ?? OPTIONS[0];

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((prev) => !prev)}
        aria-label="Change language"
        className="flex items-center gap-1.5 rounded-full bg-white/5 px-3 py-1.5 text-sm font-medium text-white/90 ring-1 ring-white/10 hover:text-brand-gold"
      >
        <Globe size={15} />
        {current.label}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-28 overflow-hidden rounded-xl bg-brand-dark py-1 ring-1 ring-white/10">
          {OPTIONS.map((opt) => (
            <button
              key={opt.code}
              onClick={() => {
                setLanguage(opt.code);
                setOpen(false);
              }}
              className={`block w-full px-4 py-2 text-left text-sm ${
                opt.code === language ? 'text-brand-gold' : 'text-white/80 hover:bg-white/5'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}