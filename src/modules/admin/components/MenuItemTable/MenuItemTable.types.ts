import type { MenuCategory, MenuItem } from '@/modules/menu/types/menu.types';

export interface MenuItemTableProps {
  category: MenuCategory;
  onEditItem: (item: MenuItem) => void;
}
