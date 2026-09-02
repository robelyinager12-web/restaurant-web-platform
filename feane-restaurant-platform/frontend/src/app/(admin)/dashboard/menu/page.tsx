// File: frontend/src/app/(admin)/dashboard/menu/page.tsx
'use client';

import { useCallback, useEffect, useState } from 'react';
import { RequireAdmin } from '../../../../components/auth/RequireAdmin';
import { AdminLayout } from '../../../../components/admin/AdminLayout';
import { CategoryManager } from '../../../../components/admin/CategoryManager';
import { MenuItemManager } from '../../../../components/admin/MenuItemManager';
import { getCategories, getItems } from '../../../../lib/menu';
import type { MenuCategory, MenuItem } from '../../../../types/menu';

function AdminMenuPage() {
  const [categories, setCategories] = useState<MenuCategory[]>([]);
  const [items, setItems] = useState<MenuItem[]>([]);

  const refresh = useCallback(() => {
    getCategories().then((d) => setCategories(d.categories));
    getItems().then((d) => setItems(d.items)); // no availableOnly filter — admin sees everything
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <div>
      <h1 className="font-display text-3xl italic text-white">Menu Management</h1>
      <CategoryManager categories={categories} onChange={refresh} />
      <MenuItemManager items={items} categories={categories} onChange={refresh} />
    </div>
  );
}

export default function DashboardMenuPage() {
  return (
    <RequireAdmin>
      <AdminLayout>
        <AdminMenuPage />
      </AdminLayout>
    </RequireAdmin>
  );
}