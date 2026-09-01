// File: frontend/src/components/layout/Navbar.tsx
'use client';

import Link from 'next/link';
import { User, ShoppingCart, Search } from 'lucide-react';

const NAV_LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'MENU', href: '/menu' },
  { label: 'ABOUT', href: '/about' },
  { label: 'BOOK TABLE', href: '/book-table' },
];

export function Navbar() {
  return (
    <header className="absolute top-0 left-0 right-0 z-20">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
        <Link href="/" className="font-display text-2xl italic text-white">
          Feane
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium tracking-wide md:flex">
          {NAV_LINKS.map((link, idx) => (
            <Link
              key={link.href}
              href={link.href}
              className={idx === 0 ? 'text-brand-gold' : 'text-white/90 hover:text-brand-gold transition-colors'}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          <button aria-label="Account" className="hidden text-white/90 hover:text-brand-gold sm:block">
            <User size={20} />
          </button>
          <Link href="/cart" aria-label="Cart" className="hidden text-white/90 hover:text-brand-gold sm:block">
            <ShoppingCart size={20} />
          </Link>
          <button aria-label="Search" className="hidden text-white/90 hover:text-brand-gold sm:block">
            <Search size={20} />
          </button>
          <Link
            href="/menu"
            className="rounded-full bg-brand-gold px-6 py-2.5 text-sm font-semibold text-brand-dark hover:brightness-110 transition"
          >
            Order Online
          </Link>
        </div>
      </div>
    </header>
  );
}