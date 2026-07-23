import { useMenuStore } from '@/store/menuStore';
import type { MenuItem } from '../types/menu.types';

/**
 * Looks up specific active menu items by id, in the given order — used for
 * curated picks like home page highlights. Reads live from menuStore so an
 * owner disabling/editing an item is reflected here too; unknown or disabled
 * ids are silently skipped rather than thrown, since an admin can now remove
 * an id that a curated list still references.
 */
export function getMenuItemsByIds(ids: string[]): MenuItem[] {
  const { categories } = useMenuStore.getState();
  const byId = new Map(
    categories.flatMap((category) => category.items).map((item) => [item.id, item]),
  );

  return ids.flatMap((id) => {
    const item = byId.get(id);
    if (!item || item.isActive === false) return [];
    return [item];
  });
}
