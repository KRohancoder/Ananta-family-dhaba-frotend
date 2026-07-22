import { menuCategories } from '../data/menuData';
import type { MenuItem } from '../types/menu.types';

const allItems: MenuItem[] = menuCategories.flatMap((category) => category.items);

/** Looks up specific menu items by id, in the given order — used for curated picks like home page highlights. */
export function getMenuItemsByIds(ids: string[]): MenuItem[] {
  const byId = new Map(allItems.map((item) => [item.id, item]));
  return ids.map((id) => {
    const item = byId.get(id);
    if (!item) throw new Error(`Unknown menu item id: ${id}`);
    return item;
  });
}
