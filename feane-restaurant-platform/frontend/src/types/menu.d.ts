// File: frontend/src/types/menu.d.ts
export interface MenuCategory {
  id: string;
  name: string;
  slug: string;
  display_order: number;
}

export interface MenuItem {
  id: string;
  category_id: string;
  category_name: string;
  category_slug: string;
  name: string;
  description: string | null;
  price: string; // numeric comes back as a string from pg — parse with Number() before math
  image_url: string | null;
  is_available: boolean;
}