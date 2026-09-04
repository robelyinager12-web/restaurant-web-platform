// File: frontend/src/components/layout/Navbar.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { User as UserIcon, ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { SearchOverlay } from './SearchOverlay';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';

export function Navbar() {
  const { itemCount } = useCart();
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const NAV_LINKS = [
    { label: t.nav.home, href: '/' },
    { label: t.nav.menu, href: '/menu' },
    { label: t.nav.about, href: '/about' },
    { label: t.nav.bookTable, href: '/book-table' },
    { label: t.nav.contact, href: '/contact' },
  ];

  const closeMobile = () => setMobileOpen(false);

  const openSearch = () => {
    closeMobile();
    setSearchOpen(true);
  };

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-30">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-10">
          <Logo onClick={closeMobile} />

          <nav className="hidden items-center gap-6 text-sm font-medium tracking-wide lg:flex">
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

          <div className="hidden items-center gap-4 sm:flex">
            <LanguageSwitcher />

            {user ? (
              <button onClick={logout} className="text-sm text-white/90 hover:text-brand-gold">
                {t.nav.signOut} ({user.name.split(' ')[0]})
              </button>
            ) : (
              <Link href="/login" aria-label="Account" className="text-white/90 hover:text-brand-gold">
                <UserIcon size={20} />
              </Link>
            )}

            <Link href="/cart" aria-label="Cart" className="relative text-white/90 hover:text-brand-gold">
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold text-brand-dark">
                  {itemCount}
                </span>
              )}
            </Link>
            <button onClick={openSearch} aria-label="Search" className="text-white/90 hover:text-brand-gold">
              <Search size={20} />
            </button>
            <Link
              href="/menu"
              className="rounded-full bg-brand-gold px-6 py-2.5 text-sm font-semibold text-brand-dark hover:brightness-110 transition"
            >
              {t.nav.orderOnline}
            </Link>
          </div>

          <div className="flex items-center gap-3 lg:hidden">
            <LanguageSwitcher />
            <Link href="/cart" aria-label="Cart" className="relative text-white/90">
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-brand-gold text-[10px] font-bold text-brand-dark">
                  {itemCount}
                </span>
              )}
            </Link>
            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              className="text-white"
            >
              {mobileOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div className="border-t border-white/10 bg-brand-dark lg:hidden">
            <nav className="flex flex-col gap-1 px-6 py-6">
              {NAV_LINKS.map((link, idx) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeMobile}
                  className={`rounded-lg px-3 py-3 text-sm font-medium ${
                    idx === 0 ? 'text-brand-gold' : 'text-white/90 hover:bg-white/5'
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="mt-4 flex items-center gap-6 border-t border-white/10 px-3 pt-4">
                {user ? (
                  <button
                    onClick={() => {
                      logout();
                      closeMobile();
                    }}
                    className="text-sm text-white/70"
                  >
                    {t.nav.signOut} ({user.name.split(' ')[0]})
                  </button>
                ) : (
                  <Link href="/login" onClick={closeMobile} className="flex items-center gap-2 text-sm text-white/70">
                    <UserIcon size={18} /> {t.nav.signIn}
                  </Link>
                )}
                <button onClick={openSearch} className="flex items-center gap-2 text-sm text-white/70">
                  <Search size={18} /> {t.nav.search}
                </button>
              </div>

              <Link
                href="/menu"
                onClick={closeMobile}
                className="mt-4 rounded-full bg-brand-gold px-6 py-3 text-center text-sm font-semibold text-brand-dark"
              >
                {t.nav.orderOnline}
              </Link>
            </nav>
          </div>
        )}
      </header>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}