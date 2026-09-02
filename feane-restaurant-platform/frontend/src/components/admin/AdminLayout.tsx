// File: frontend/src/components/admin/AdminLayout.tsx
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, UtensilsCrossed, ClipboardList, CalendarCheck, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import type { ReactNode } from 'react';

const NAV_ITEMS = [
  { label: 'Overview', href: '/dashboard', icon: LayoutGrid },
  { label: 'Menu', href: '/dashboard/menu', icon: UtensilsCrossed },
  { label: 'Orders', href: '/dashboard/orders', icon: ClipboardList },
  { label: 'Bookings', href: '/dashboard/bookings', icon: CalendarCheck },
];

export function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <div className="flex min-h-screen bg-brand-dark">
      <aside className="w-64 flex-shrink-0 border-r border-white/10 p-6">
        <Link href="/" className="font-display text-2xl italic text-white">
          Feane
        </Link>
        <p className="mt-1 text-xs text-white/40">Admin Dashboard</p>

        <nav className="mt-10 space-y-1">
          {NAV_ITEMS.map(({ label, href, icon: Icon }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={`flex items-center gap-3 rounded-lg px-4 py-2.5 text-sm transition-colors ${
                  active
                    ? 'bg-brand-gold text-brand-dark font-medium'
                    : 'text-white/70 hover:bg-white/5'
                }`}
              >
                <Icon size={18} />
                {label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-10 border-t border-white/10 pt-6">
          <p className="text-xs text-white/40">Signed in as</p>
          <p className="truncate text-sm text-white">{user?.email}</p>
          <button
            onClick={logout}
            className="mt-3 flex items-center gap-2 text-sm text-white/50 hover:text-red-400"
          >
            <LogOut size={16} /> Sign out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto p-8">{children}</main>
    </div>
  );
}