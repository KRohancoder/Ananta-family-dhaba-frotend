import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { menuCategories as seedCategories } from '@/modules/menu/data/menuData';
import type { MenuCategory, MenuItem } from '@/modules/menu/types/menu.types';

interface MenuState {
  categories: MenuCategory[];
  addCategory: (category: MenuCategory) => void;
  updateCategory: (categoryId: string, updates: Partial<Omit<MenuCategory, 'items'>>) => void;
  addItem: (categoryId: string, item: MenuItem) => void;
  updateItem: (itemId: string, updates: Partial<MenuItem>) => void;
  toggleItemActive: (itemId: string) => void;
  resetToDefaults: () => void;
}

/**
 * Owner-editable menu data. Seeded once from the transcribed menu cards, then
 * persisted to localStorage so admin edits survive a reload.
 *
 * TODO: once a real backend (e.g. Supabase) is configured, this store's writes
 * should also sync there, and `resetToDefaults`/the seed should come from the
 * backend instead of the static `menuData.ts` file.
 */
export const useMenuStore = create<MenuState>()(
  persist(
    (set) => ({
      categories: seedCategories,

      addCategory: (category) => set((state) => ({ categories: [...state.categories, category] })),

      updateCategory: (categoryId, updates) =>
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === categoryId ? { ...category, ...updates } : category,
          ),
        })),

      addItem: (categoryId, item) =>
        set((state) => ({
          categories: state.categories.map((category) =>
            category.id === categoryId
              ? { ...category, items: [...category.items, item] }
              : category,
          ),
        })),

      updateItem: (itemId, updates) =>
        set((state) => ({
          categories: state.categories.map((category) => ({
            ...category,
            items: category.items.map((item) =>
              item.id === itemId ? { ...item, ...updates } : item,
            ),
          })),
        })),

      toggleItemActive: (itemId) =>
        set((state) => ({
          categories: state.categories.map((category) => ({
            ...category,
            items: category.items.map((item) =>
              item.id === itemId ? { ...item, isActive: item.isActive === false } : item,
            ),
          })),
        })),

      resetToDefaults: () => set({ categories: seedCategories }),
    }),
    { name: 'afd-menu' },
  ),
);
