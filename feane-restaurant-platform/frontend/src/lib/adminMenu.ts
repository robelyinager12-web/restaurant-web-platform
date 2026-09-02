// File: frontend/src/lib/adminMenu.ts
import { apiClient } from './api-client';
import type { MenuCategory, MenuItem } from '../types/menu';

export interface CategoryPayload {
  name: string;
  slug: string;
  displayOrder?: number;
}

export interface MenuItemPayload {
  categoryId: string;
  name: string;
  description?: string;
  price: number;
  imageUrl?: string;
  isAvailable?: boolean;
}

export const adminMenuApi = {
  createCategory: (data: CategoryPayload) =>
    apiClient.post<{ category: MenuCategory }>('/menu/categories', data),
  updateCategory: (id: string, data: Partial<CategoryPayload>) =>
    apiClient.put<{ category: MenuCategory }>(`/menu/categories/${id}`, data),
  deleteCategory: (id: string) => apiClient.delete<null>(`/menu/categories/${id}`),

  createItem: (data: MenuItemPayload) => apiClient.post<{ item: MenuItem }>('/menu/items', data),
  updateItem: (id: string, data: Partial<MenuItemPayload>) =>
    apiClient.put<{ item: MenuItem }>(`/menu/items/${id}`, data),
  deleteItem: (id: string) => apiClient.delete<null>(`/menu/items/${id}`),
};