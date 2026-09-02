// File: frontend/src/lib/menu.ts
import { apiClient } from './api-client';
import type { MenuCategory, MenuItem } from '../types/menu';

export function getCategories() {
  return apiClient.get<{ categories: MenuCategory[] }>('/menu/categories');
}

export function getItems(params?: { categorySlug?: string; availableOnly?: boolean }) {
  const query = new URLSearchParams();
  if (params?.categorySlug) query.set('categorySlug', params.categorySlug);
  if (params?.availableOnly) query.set('availableOnly', 'true');
  const qs = query.toString();
  return apiClient.get<{ items: MenuItem[] }>(`/menu/items${qs ? `?${qs}` : ''}`);
}