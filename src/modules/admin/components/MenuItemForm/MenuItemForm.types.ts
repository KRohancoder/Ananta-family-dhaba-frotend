import type { MenuCategory, MenuItem } from '@/modules/menu/types/menu.types';

export interface MenuItemFormProps {
  categories: MenuCategory[];
  /** Category to add the new item to. Ignored when editing an existing item. */
  initialCategoryId: string;
  /** When set, the form edits this item instead of creating a new one. */
  item?: MenuItem;
  onDone: () => void;
}
