import { useMenuStore } from '@/store/menuStore';
import type { MenuCategory } from '../types/menu.types';

/**
 * Returns the full public menu — active items only, sourced from the
 * owner-editable menuStore (seeded from the transcribed menu data).
 *
 * TODO: once a real backend (e.g. Supabase) is configured, fetch from it
 * here instead of reading the local menuStore.
 */
export function getMenu(): Promise<MenuCategory[]> {
  const { categories } = useMenuStore.getState();

  const activeCategories = categories
    .map((category) => ({
      ...category,
      items: category.items.filter((item) => item.isActive !== false),
    }))
    .filter((category) => category.items.length > 0);

  return Promise.resolve(activeCategories);
}
